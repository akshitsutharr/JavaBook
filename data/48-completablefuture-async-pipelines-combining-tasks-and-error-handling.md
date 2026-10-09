# Chapter 48: CompletableFuture, Asynchronous Pipelines, Combining Tasks, and Error Handling

## 1. Learning Objectives

By the end of this chapter, you will understand:

- Why `CompletableFuture` is useful beyond a basic `Future`.
- How to create completed and asynchronous futures.
- The difference between `thenApply()`, `thenCompose()`, and `thenCombine()`.
- How to run tasks with or without a custom executor.
- How to wait for several asynchronous tasks using `allOf()` and `anyOf()`.
- How to handle errors with `exceptionally()`, `handle()`, and `whenComplete()`.
- How to apply timeouts and cancellation.
- How to build readable asynchronous pipelines.
- Common pitfalls such as blocking, shared mutable state, and accidental use of the common pool.

This chapter builds on Chapter 47. A `Future` is useful for representing one pending result, but composing several dependent asynchronous tasks with ordinary `Future` objects can become awkward. `CompletableFuture` adds methods for chaining, combining, and handling asynchronous computations.

---

## 2. What Is `CompletableFuture`?

`CompletableFuture<T>` is a Java class that represents a result that may become available later. It implements `Future<T>` and `CompletionStage<T>`, so it supports both result retrieval and a large collection of methods for building asynchronous workflows.

Imagine an online shopping application:

1. Fetch the customer's profile.
2. Use the profile to fetch recommendations.
3. Fetch current offers independently.
4. Combine recommendations and offers into one response.
5. Handle a failure if one of the required operations fails.

A chain of `CompletableFuture` operations can express these relationships without manually creating and coordinating a thread for every step.

### Basic example

```java
import java.util.concurrent.CompletableFuture;

public class CompletableFutureDemo {
    public static void main(String[] args) {
        CompletableFuture<String> future =
                CompletableFuture.supplyAsync(() -> "Hello");

        future.thenAccept(result -> System.out.println(result));

        future.join();
    }
}
```

Output:

```text
Hello
```

`supplyAsync()` starts a task that produces a result. `thenAccept()` registers an action to consume the result. `join()` waits for the computation to complete.

For a tiny example, the output order may look simple. In a real pipeline, use the returned stage or an explicit completion point to make sure the program waits for all required work before exiting.

---

## 3. `Future` vs. `CompletableFuture`

| Feature | `Future<T>` | `CompletableFuture<T>` |
|---|---|---|
| Represents a future result | Yes | Yes |
| Retrieve result with `get()` | Yes | Yes |
| Retrieve result with `join()` | No | Yes |
| Chain dependent computations | Limited | Yes |
| Combine asynchronous results | Limited | Yes |
| Register completion actions | Not directly in the same fluent style | Yes |
| Handle errors in a pipeline | Limited | Yes |
| Manually complete a result | Not generally through the `Future` interface | Yes, with methods such as `complete()` |

`Future.get()` throws checked exceptions such as `InterruptedException` and `ExecutionException`. `CompletableFuture.join()` generally throws an unchecked `CompletionException` when the computation completes exceptionally.

`CompletableFuture` is especially helpful when several steps depend on one another or when independent results need to be combined.

---

## 4. Creating a `CompletableFuture`

### 4.1 `supplyAsync()`

Use `supplyAsync()` when the task returns a value.

```java
CompletableFuture<Integer> future =
        CompletableFuture.supplyAsync(() -> 10 + 20);

System.out.println(future.join());
```

Output:

```text
30
```

The task runs asynchronously using the default asynchronous execution facility, which is normally the common `ForkJoinPool`. It is not guaranteed to use a newly created thread for each call.

### 4.2 `runAsync()`

Use `runAsync()` when the task performs an action but does not return a result.

```java
CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
    System.out.println("Sending notification");
});

future.join();
```

Output:

```text
Sending notification
```

The result type is `Void` because the task has no meaningful result value.

### 4.3 `completedFuture()`

Use `completedFuture()` when a result is already available.

```java
CompletableFuture<String> future =
        CompletableFuture.completedFuture("Already available");

System.out.println(future.join());
```

Output:

```text
Already available
```

This is useful when an API returns a `CompletableFuture` but a particular branch of the program already knows the answer.

### 4.4 Manually completing a future

```java
CompletableFuture<String> future = new CompletableFuture<>();

future.complete("Task completed");

System.out.println(future.join());
```

Output:

```text
Task completed
```

`complete(value)` attempts to complete the future with a value. If the future has already completed, a later attempt does not replace its result.

Manual completion can be useful when adapting callback-based APIs, but do not expose a mutable future to arbitrary code if that code should not be allowed to complete it. Modern Java also provides ways to expose a restricted view, such as `minimalCompletionStage()` or `copy()`, when appropriate.

---

## 5. Synchronous vs. Asynchronous Continuations

Methods that continue a computation often come in two forms:

- A non-`Async` method, such as `thenApply()`.
- An asynchronous method, such as `thenApplyAsync()`.

A non-`Async` continuation may execute in the thread that completes the previous stage or in another thread that invokes the continuation, depending on timing and implementation details. It should not be treated as a guarantee that work will run on a dedicated background thread.

An `Async` continuation without an explicit executor normally uses the default asynchronous execution facility. An overload that accepts an `Executor` uses the supplied executor.

Example:

```java
CompletableFuture<Integer> future =
        CompletableFuture.supplyAsync(() -> 10)
                .thenApply(number -> number * 2)
                .thenApplyAsync(number -> number + 5);

System.out.println(future.join());
```

Output:

```text
25
```

The value flow is:

1. `supplyAsync()` produces `10`.
2. `thenApply()` changes it to `20`.
3. `thenApplyAsync()` changes it to `25`.

Use asynchronous continuations when you need to avoid doing potentially expensive work in the thread that completes the previous stage. Do not add `Async` to every method automatically; it can add scheduling overhead and make execution harder to reason about.

---

## 6. `thenApply()`: Transform a Result

`thenApply()` takes a result and transforms it into another result. It is similar to mapping a value.

```java
import java.util.concurrent.CompletableFuture;

public class ThenApplyDemo {
    public static void main(String[] args) {
        CompletableFuture<Integer> future =
                CompletableFuture.supplyAsync(() -> 5)
                        .thenApply(n -> n * n)
                        .thenApply(n -> n + 10);

        System.out.println(future.join());
    }
}
```

Output:

```text
35
```

Step by step:

- The first task produces `5`.
- The first `thenApply()` calculates \(5 \times 5 = 25\).
- The second `thenApply()` calculates \(25 + 10 = 35\).

The type of the result can change. For example, a `CompletableFuture<Integer>` can be transformed into a `CompletableFuture<String>`:

```java
CompletableFuture<String> future =
        CompletableFuture.supplyAsync(() -> 42)
                .thenApply(number -> "Answer: " + number);
```

Use `thenApply()` when the next function takes a value and returns a value directly.

---

## 7. `thenAccept()` and `thenRun()`

These methods continue a pipeline but have different purposes.

### 7.1 `thenAccept()`

`thenAccept()` receives the previous result and performs an action without producing a new result.

```java
CompletableFuture<Void> future =
        CompletableFuture.supplyAsync(() -> "Java")
                .thenAccept(language ->
                        System.out.println("Learning " + language));

future.join();
```

Output:

```text
Learning Java
```

The resulting stage is `CompletableFuture<Void>`.

### 7.2 `thenRun()`

`thenRun()` runs an action after the previous stage completes, but it does not receive the previous result.

```java
CompletableFuture<Void> future =
        CompletableFuture.supplyAsync(() -> "Data loaded")
                .thenRun(() -> System.out.println("Next step can begin"));

future.join();
```

Output:

```text
Next step can begin
```

### Comparison

| Method | Receives previous result? | Returns a new value? |
|---|---|---|
| `thenApply()` | Yes | Yes |
| `thenAccept()` | Yes | No; returns `Void` stage |
| `thenRun()` | No | No; returns `Void` stage |

---

## 8. `thenCompose()`: Chain Dependent Asynchronous Work

Use `thenCompose()` when the next function itself returns a `CompletionStage`, such as another `CompletableFuture`.

Imagine that an application first fetches a user ID and then fetches the user's profile using that ID.

```java
import java.util.concurrent.CompletableFuture;

public class ThenComposeDemo {
    static CompletableFuture<Integer> getUserId() {
        return CompletableFuture.supplyAsync(() -> 101);
    }

    static CompletableFuture<String> getUserName(int userId) {
        return CompletableFuture.supplyAsync(() -> "User-" + userId);
    }

    public static void main(String[] args) {
        CompletableFuture<String> result =
                getUserId()
                        .thenCompose(id -> getUserName(id));

        System.out.println(result.join());
    }
}
```

Output:

```text
User-101
```

The second task depends on the first result, so it starts after the ID is available.

### Why not use `thenApply()` here?

If you use `thenApply()` with a function that returns a `CompletableFuture<String>`, the result becomes nested:

```java
CompletableFuture<CompletableFuture<String>> nested =
        getUserId().thenApply(id -> getUserName(id));
```

The outer future contains another future.

With `thenCompose()`, the two stages are flattened into one:

```java
CompletableFuture<String> flat =
        getUserId().thenCompose(id -> getUserName(id));
```

### Rule to remember

- Use `thenApply()` when the next function returns an ordinary value.
- Use `thenCompose()` when the next function returns another asynchronous stage and you want one flattened pipeline.

---

## 9. `thenCombine()`: Combine Independent Results

Use `thenCombine()` when two independent computations can run separately and their results are needed together.

Suppose an application fetches a product price and a shipping cost independently.

```java
import java.util.concurrent.CompletableFuture;

public class ThenCombineDemo {
    public static void main(String[] args) {
        CompletableFuture<Integer> price =
                CompletableFuture.supplyAsync(() -> 1200);

        CompletableFuture<Integer> shipping =
                CompletableFuture.supplyAsync(() -> 100);

        CompletableFuture<Integer> total =
                price.thenCombine(shipping, (p, s) -> p + s);

        System.out.println("Total: " + total.join());
    }
}
```

Output:

```text
Total: 1300
```

The two source computations do not depend on one another, so they can make progress concurrently. `thenCombine()` waits until both results are available and applies the combining function.

The function `(p, s) -> p + s` receives both values and produces the final value.

Use `thenCombine()` for independent tasks. Use `thenCompose()` when one task's result determines the next asynchronous task.

---

## 10. Combining Several Futures with `allOf()`

`CompletableFuture.allOf()` returns a future that completes when all supplied futures complete. If any of them completes exceptionally, the combined future also completes exceptionally.

Example:

```java
import java.util.concurrent.CompletableFuture;

public class AllOfDemo {
    public static void main(String[] args) {
        CompletableFuture<Integer> f1 =
                CompletableFuture.supplyAsync(() -> 10);

        CompletableFuture<Integer> f2 =
                CompletableFuture.supplyAsync(() -> 20);

        CompletableFuture<Integer> f3 =
                CompletableFuture.supplyAsync(() -> 30);

        CompletableFuture<Void> all =
                CompletableFuture.allOf(f1, f2, f3);

        all.join();

        int total = f1.join() + f2.join() + f3.join();
        System.out.println("Total: " + total);
    }
}
```

Output:

```text
Total: 60
```

`allOf()` returns `CompletableFuture<Void>`; it does not automatically return a list of the source results. Once the combined future completes successfully, you can retrieve each source result or explicitly collect them into a list.

### Collect results into a list

```java
import java.util.List;
import java.util.concurrent.CompletableFuture;

public class CollectFuturesDemo {
    public static void main(String[] args) {
        List<CompletableFuture<Integer>> futures = List.of(
                CompletableFuture.supplyAsync(() -> 10),
                CompletableFuture.supplyAsync(() -> 20),
                CompletableFuture.supplyAsync(() -> 30)
        );

        CompletableFuture<Void> all =
                CompletableFuture.allOf(
                        futures.toArray(new CompletableFuture<?>[0]));

        CompletableFuture<List<Integer>> results =
                all.thenApply(ignored ->
                        futures.stream()
                                .map(CompletableFuture::join)
                                .toList());

        System.out.println(results.join());
    }
}
```

Output:

```text
[10, 20, 30]
```

The collection uses `Stream.toList()`, available in modern Java versions. In older versions, use an appropriate collector such as `Collectors.toList()`.

This approach is useful when the program needs every result before moving to the next stage.

---

## 11. `anyOf()`: Continue When One Future Completes

`CompletableFuture.anyOf()` completes when any one of the supplied futures completes, whether normally or exceptionally. Its result type is `CompletableFuture<Object>` because the supplied futures may have different result types.

```java
import java.util.concurrent.CompletableFuture;

public class AnyOfDemo {
    public static void main(String[] args) {
        CompletableFuture<String> slow =
                CompletableFuture.supplyAsync(() -> {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        throw new RuntimeException(e);
                    }
                    return "Slow result";
                });

        CompletableFuture<String> fast =
                CompletableFuture.supplyAsync(() -> "Fast result");

        CompletableFuture<Object> first =
                CompletableFuture.anyOf(slow, fast);

        System.out.println(first.join());
    }
}
```

A likely output is:

```text
Fast result
```

Exact timing is not guaranteed. Also, `anyOf()` does not automatically cancel the other futures. If your application no longer needs the remaining work, decide whether and how to cancel it.

Be careful with the phrase “first successful result”: `anyOf()` completes with the first future to complete, even if that completion is exceptional. It does not skip a failure and wait for another future to succeed.

---

## 12. Error Handling with `exceptionally()`

A stage can complete exceptionally if its task throws an exception or an earlier stage fails.

`exceptionally()` lets you provide a fallback value when an earlier stage fails.

```java
import java.util.concurrent.CompletableFuture;

public class ExceptionallyDemo {
    public static void main(String[] args) {
        CompletableFuture<Integer> future =
                CompletableFuture.supplyAsync(() -> {
                    if (true) {
                        throw new IllegalStateException("Calculation failed");
                    }
                    return 100;
                }).exceptionally(error -> {
                    System.out.println("Error: " + error.getMessage());
                    return 0;
                });

        System.out.println("Result: " + future.join());
    }
}
```

Output will be similar to:

```text
Error: java.lang.IllegalStateException: Calculation failed
Result: 0
```

The exact exception text can vary. The fallback `0` completes the recovery stage normally.

Use `exceptionally()` when you want to turn a failure into a fallback result. Be cautious about returning a value such as `0` if it could be mistaken for a genuine result; in business applications, an explicit result type or propagated error may be safer.

---

## 13. Error Handling with `handle()`

`handle()` receives both the result and the exception, allowing the pipeline to transform either success or failure into a new result.

```java
CompletableFuture<Integer> future =
        CompletableFuture.supplyAsync(() -> 50)
                .handle((result, error) -> {
                    if (error != null) {
                        return -1;
                    }
                    return result * 2;
                });

System.out.println(future.join());
```

Output:

```text
100
```

If the previous stage fails, `result` will normally be `null` and `error` will describe the failure. If it succeeds, `error` will be `null`.

### `exceptionally()` vs. `handle()`

- `exceptionally()` is primarily a recovery path for failure.
- `handle()` runs for either normal completion or exceptional completion and can transform the outcome in both cases.

Use `handle()` when the next result depends on whether the previous stage succeeded or failed.

---

## 14. Observing Completion with `whenComplete()`

`whenComplete()` lets you observe a result or failure without deliberately transforming a successful value into a different one.

```java
CompletableFuture<Integer> future =
        CompletableFuture.supplyAsync(() -> 25)
                .whenComplete((result, error) -> {
                    if (error == null) {
                        System.out.println("Completed with: " + result);
                    } else {
                        System.out.println("Failed: " + error);
                    }
                });

System.out.println("Result: " + future.join());
```

Output:

```text
Completed with: 25
Result: 25
```

`whenComplete()` is useful for logging, metrics, and cleanup-related observation. If the observer itself throws, the resulting stage can become exceptional. It is not the same as a recovery function: use `exceptionally()` or `handle()` when you intend to recover from an error.

### Error-handling comparison

| Method | Runs on success? | Runs on failure? | Main purpose |
|---|---|---|---|
| `exceptionally()` | No, unless failure was already recovered earlier | Yes | Recover from failure with a fallback |
| `handle()` | Yes | Yes | Transform success or failure into a result |
| `whenComplete()` | Yes | Yes | Observe completion, commonly for logging or metrics |

---

## 15. Asynchronous Methods with a Custom Executor

By default, methods such as `supplyAsync()` and `thenApplyAsync()` usually use the common `ForkJoinPool` when no executor is supplied. This can be convenient, but it is not always appropriate for blocking operations or tasks that need isolation.

You can provide an `Executor` explicitly:

```java
import java.util.concurrent.*;

public class CustomExecutorDemo {
    public static void main(String[] args) {
        ExecutorService ioExecutor = Executors.newFixedThreadPool(4);

        try {
            CompletableFuture<String> future =
                    CompletableFuture.supplyAsync(() -> {
                        // Simulate work such as reading data.
                        return "Data loaded";
                    }, ioExecutor)
                    .thenApplyAsync(data -> data.toUpperCase(), ioExecutor);

            System.out.println(future.join());
        } finally {
            ioExecutor.shutdown();
        }
    }
}
```

Output:

```text
DATA LOADED
```

The custom executor determines where those asynchronous tasks are scheduled. It does not magically make the underlying operation non-blocking; a blocking call still occupies a worker thread while it waits.

### When is a custom executor useful?

- Isolating blocking I/O from CPU-intensive work.
- Controlling worker count and queueing behavior.
- Naming worker threads for diagnostics.
- Separating workloads with different resource needs.
- Managing a service's execution resources explicitly.

Choose the executor's configuration based on the application's workload and limits.

---

## 16. Timeouts with `orTimeout()` and `completeOnTimeout()`

Modern Java versions provide convenient timeout methods on `CompletableFuture`.

### 16.1 `orTimeout()`

`orTimeout()` completes the future exceptionally with a timeout if it has not completed within the specified time.

```java
import java.util.concurrent.*;

public class OrTimeoutDemo {
    public static void main(String[] args) {
        CompletableFuture<String> future =
                CompletableFuture.supplyAsync(() -> {
                    try {
                        Thread.sleep(3000);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        throw new RuntimeException(e);
                    }
                    return "Finished";
                }).orTimeout(1, TimeUnit.SECONDS);

        try {
            System.out.println(future.join());
        } catch (CompletionException e) {
            System.out.println("The operation did not complete successfully");
        }
    }
}
```

Typical output:

```text
The operation did not complete successfully
```

The timeout exception may be the cause of the `CompletionException`. Exact timing is affected by scheduling. A timeout on the future does not necessarily stop the underlying work that was already running.

### 16.2 `completeOnTimeout()`

`completeOnTimeout()` completes the future normally with a fallback value if it has not completed within the specified time.

```java
CompletableFuture<String> future =
        CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException(e);
            }
            return "Actual result";
        }).completeOnTimeout("Fallback result", 1, TimeUnit.SECONDS);

System.out.println(future.join());
```

Typical output:

```text
Fallback result
```

The fallback value may be useful for optional information, but it must be chosen carefully. Do not silently substitute a value that could be confused with verified business data.

---

## 17. Cancellation and Manual Completion

A `CompletableFuture` supports methods such as:

- `cancel(boolean mayInterruptIfRunning)`
- `complete(value)`
- `completeExceptionally(exception)`

Example:

```java
CompletableFuture<String> future = new CompletableFuture<>();

future.completeExceptionally(
        new IllegalStateException("No result available"));

try {
    System.out.println(future.join());
} catch (CompletionException e) {
    System.out.println("Failed: " + e.getCause().getMessage());
}
```

Output:

```text
Failed: No result available
```

Calling `cancel()` completes the future as cancelled, but cancellation does not reliably stop arbitrary underlying work. In particular, a `CompletableFuture` created with an asynchronous supplier does not guarantee that cancelling the future interrupts the worker thread executing that supplier.

Design cancellation cooperatively when the underlying work must stop. A task may need an interrupt-aware API, a cancellation token, or explicit coordination with the code that performs the work.

---

## 18. Putting It Together: A Simple Product Summary

The following example models two independent operations: fetching a product price and fetching a discount. The results are combined to calculate a final price.

```java
import java.util.concurrent.CompletableFuture;

public class ProductSummaryDemo {
    static CompletableFuture<Integer> fetchPrice() {
        return CompletableFuture.supplyAsync(() -> 1000);
    }

    static CompletableFuture<Integer> fetchDiscount() {
        return CompletableFuture.supplyAsync(() -> 150);
    }

    public static void main(String[] args) {
        CompletableFuture<String> summary =
                fetchPrice()
                        .thenCombine(fetchDiscount(),
                                (price, discount) -> price - discount)
                        .thenApply(finalPrice ->
                                "Final price: " + finalPrice)
                        .exceptionally(error ->
                                "Unable to calculate price");

        System.out.println(summary.join());
    }
}
```

Output:

```text
Final price: 850
```

The pipeline has four logical parts:

1. Fetch the price.
2. Fetch the discount independently.
3. Combine both results to calculate the final price.
4. Convert the final number to a message, with a fallback message if an earlier stage fails.

This example is deliberately small. A real pricing system would need rules for currency, discount eligibility, validation, and error reporting.

---

## 19. Common Mistakes and Best Practices

1. **Using `join()` too early.** Calling `join()` immediately after each task can make a pipeline block rather than compose asynchronous work.
2. **Confusing `thenApply()` with `thenCompose()`.** Use `thenApply()` for a normal return value and `thenCompose()` for a function returning another asynchronous stage.
3. **Assuming `anyOf()` means first success.** It completes when any supplied future completes, including exceptionally.
4. **Assuming `allOf()` returns every result.** It returns a `CompletableFuture<Void>`; retrieve or collect the source results separately.
5. **Assuming a timeout kills the task.** Timeout methods affect completion of the future, not necessarily the underlying work.
6. **Assuming cancellation forcibly stops a supplier.** Cancellation is not a reliable forced thread termination mechanism.
7. **Using the common pool for every kind of work.** Blocking operations may need a dedicated executor.
8. **Using `whenComplete()` as recovery.** It is intended for observation; use `exceptionally()` or `handle()` when you need to recover.
9. **Hiding errors with questionable fallback values.** A fallback must not look like a valid result when it is not.
10. **Sharing mutable data between asynchronous stages without protection.** Asynchronous composition does not automatically make shared objects thread-safe.
11. **Forgetting executor lifecycle.** If you create a custom executor, define who owns it and when it is shut down.
12. **Creating deeply nested, unreadable chains.** Extract meaningful operations into methods and give stages descriptive names where practical.

---

## 20. Interview Questions and Answers

### Q1. What is `CompletableFuture`?

It represents an asynchronous result and supports chaining, combining, and handling completion or failure through a fluent API.

### Q2. How does `CompletableFuture` differ from `Future`?

It adds composition methods and completion callbacks, along with APIs for combining stages and recovering from errors. It also provides `join()` and manual completion methods.

### Q3. What is the difference between `runAsync()` and `supplyAsync()`?

`runAsync()` runs a task with no result. `supplyAsync()` runs a supplier and completes with its returned value.

### Q4. What is the difference between `thenApply()` and `thenCompose()`?

`thenApply()` transforms a result into an ordinary value. `thenCompose()` chains a function that returns another asynchronous stage and flattens the nested result.

### Q5. What is the difference between `thenCombine()` and `thenCompose()`?

`thenCombine()` combines two independent stages after both produce results. `thenCompose()` starts a dependent asynchronous stage based on the previous result.

### Q6. What is the difference between `thenAccept()` and `thenRun()`?

`thenAccept()` receives the previous result and consumes it. `thenRun()` waits for completion but does not receive the previous result.

### Q7. What does `allOf()` do?

It returns a future that completes when all supplied futures complete. It does not itself return a collection of their values.

### Q8. What does `anyOf()` do?

It completes when any supplied future completes, normally or exceptionally, and exposes that result as an `Object`.

### Q9. How do you handle errors in a `CompletableFuture` chain?

Use `exceptionally()` for a failure fallback, `handle()` to transform success or failure, and `whenComplete()` to observe completion.

### Q10. What is the difference between `join()` and `get()`?

Both can wait for completion and return the result. `get()` throws checked exceptions such as `InterruptedException` and `ExecutionException`, while `join()` generally reports exceptional completion through unchecked `CompletionException`.

### Q11. What is the common pool?

It is a shared `ForkJoinPool` commonly used by asynchronous methods when no explicit executor is supplied. Its use should be considered carefully for blocking tasks.

### Q12. Does `orTimeout()` stop the underlying task?

Not necessarily. It causes the future to complete exceptionally after the timeout, but the original work may continue.

### Q13. Does cancelling a `CompletableFuture` always interrupt its worker thread?

No. Cancellation does not guarantee interruption or termination of arbitrary underlying work. The task must be designed to respond to cancellation when stopping is required.

### Q14. What happens if a stage throws an exception?

That stage generally completes exceptionally, and dependent stages follow their exceptional-completion rules unless an error-handling operation recovers or transforms the failure.

### Q15. When should you provide a custom executor?

When you need to control worker resources, isolate blocking work, configure execution policy, or separate workloads.

---

## 21. Practice Exercises

1. Use `supplyAsync()` to calculate the cube of a number.
2. Use `thenApply()` to transform a number into a formatted string.
3. Use `thenAccept()` to print a result and `thenRun()` to print a final message.
4. Write two asynchronous methods: one returns a user ID and the other returns a user name. Connect them using `thenCompose()`.
5. Fetch two independent integer values and combine them using `thenCombine()`.
6. Create three futures, wait for all with `allOf()`, and collect their values into a list.
7. Create two futures with different delays and experiment with `anyOf()`. Then make one future fail first and observe the difference.
8. Use `exceptionally()` to return a fallback value after a task fails.
9. Use `handle()` to return a different result depending on whether a stage succeeds.
10. Use `whenComplete()` to log a successful result and a failure.
11. Supply a custom executor to `supplyAsync()` and `thenApplyAsync()`.
12. Add `orTimeout()` to a slow task and handle its exceptional completion.
13. Use `completeOnTimeout()` with a clearly identifiable fallback value.
14. Explain why a timeout does not guarantee that the original computation stops.
15. Build a product-summary pipeline that fetches a price and discount independently, combines them, and handles failure.

### Suggested challenge: Student dashboard

Build a small asynchronous workflow that independently calculates a student's total marks and average. Combine the results into a dashboard message. If one operation fails, report the failure rather than silently displaying misleading values. Use a custom executor if you need to control where tasks run, and make sure the main method waits for the final stage.

---

## 22. Chapter Summary

`CompletableFuture` builds on `Future` by providing a fluent API for composing asynchronous operations. `supplyAsync()` produces a value, `runAsync()` performs an action, and `completedFuture()` represents an already available result.

Use `thenApply()` to transform a value, `thenAccept()` to consume it, and `thenRun()` to perform an action after completion without receiving the result. Use `thenCompose()` to chain dependent asynchronous operations and `thenCombine()` to combine independent results. `allOf()` waits for all supplied futures, while `anyOf()` completes when any one completes, even if that completion is a failure.

For error handling, `exceptionally()` can provide a fallback, `handle()` can transform either success or failure, and `whenComplete()` can observe completion. Custom executors can help control resources and isolate blocking tasks. Timeout and cancellation operations do not necessarily terminate the underlying work, so cooperative cancellation and clear lifecycle management remain important.

**Next chapter:** Chapter 49 — Java Virtual Machine (JVM), Memory Areas, Garbage Collection, and Performance Basics.
