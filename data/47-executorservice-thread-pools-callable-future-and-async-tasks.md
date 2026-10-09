# Chapter 47: ExecutorService, Thread Pools, Callable, Future, and Asynchronous Task Management

## 1. Learning Objectives

By the end of this chapter, you will understand:

- Why manually creating a new thread for every task is often not ideal.
- What the Executor Framework is and why Java provides it.
- How to use `Executor`, `ExecutorService`, and thread pools.
- The difference between `Runnable` and `Callable`.
- How `Future` represents a result that may become available later.
- How to submit tasks, collect results, handle exceptions, and cancel work.
- How to shut down an executor safely.
- How to use `ScheduledExecutorService` for delayed and repeated tasks.
- Common mistakes when working with executors.
- When to use higher-level concurrency APIs instead of manually managing threads.

This chapter builds on Chapters 45 and 46. Those chapters explained how threads run and how shared data can be protected. Here, you will learn how to manage groups of tasks more conveniently.

---

## 2. Why Do We Need the Executor Framework?

You already know how to create a thread:

```java
Thread worker = new Thread(() -> {
    System.out.println("Task is running");
});

worker.start();
```

This is useful for learning, but creating and managing a separate thread for every task can become difficult in a large application.

Imagine a server receiving thousands of requests. If every request creates a new thread, the application may spend too much time and memory managing threads. It also becomes harder to control how much work runs at the same time.

Java provides the **Executor Framework** to separate the work to perform from the mechanism that executes it.

Instead of creating and starting a thread for every task, you submit a task to an executor. The executor decides how to run it, often by using a pool of reusable worker threads.

```java
ExecutorService executor = Executors.newFixedThreadPool(3);

executor.submit(() -> {
    System.out.println("Task is running");
});

executor.shutdown();
```

This example is intentionally small. In a real application, you must also consider how to wait for submitted tasks, handle failures, and shut down the executor at the appropriate time.

---

## 3. What Is the Executor Framework?

The Executor Framework is a collection of interfaces and classes in `java.util.concurrent` that help applications execute tasks and manage concurrency.

Important types include:

| Type | Purpose |
|---|---|
| `Executor` | Basic interface for executing a `Runnable` task |
| `ExecutorService` | Adds task submission, result handling, and lifecycle management |
| `ScheduledExecutorService` | Supports delayed and periodic task execution |
| `Executors` | Factory methods for creating common executor configurations |
| `Callable<V>` | A task that returns a result and may throw an exception |
| `Future<V>` | Represents the result or status of an asynchronous computation |
| `ThreadFactory` | Creates threads for an executor |
| `TimeUnit` | Expresses time durations clearly, such as seconds or milliseconds |

The most common starting point is `ExecutorService`.

### A useful mental model

- **Task:** What work should be done?
- **Executor:** Who is responsible for arranging execution?
- **Worker thread:** The thread that actually performs the work.
- **Future:** A handle through which the caller can inspect or retrieve a task's result.

The caller submits work without needing to manage every worker thread directly.

---

## 4. `Executor` vs. `ExecutorService`

`Executor` is the simpler interface. Its main method is:

```java
void execute(Runnable command);
```

It accepts a task but does not provide a result handle or shutdown methods.

`ExecutorService` extends `Executor` and adds methods such as:

- `submit()` to submit tasks and receive a `Future`.
- `invokeAll()` to submit a group of tasks and collect their futures.
- `invokeAny()` to return the result of one successfully completed task from a group.
- `shutdown()` and `shutdownNow()` to manage lifecycle.

Example:

```java
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorDifference {
    public static void main(String[] args) {
        Executor simpleExecutor = command -> new Thread(command).start();

        simpleExecutor.execute(() -> System.out.println("Using Executor"));

        ExecutorService service = Executors.newSingleThreadExecutor();
        service.submit(() -> System.out.println("Using ExecutorService"));
        service.shutdown();
    }
}
```

The first executor is a simple demonstration and creates a new thread for each call. The second uses a managed single-worker executor.

---

## 5. What Is a Thread Pool?

A **thread pool** is a collection of worker threads that can be reused to execute multiple tasks.

For example, a fixed pool of three threads can execute many tasks, but it normally runs no more than three of those tasks at the same time.

```java
ExecutorService executor = Executors.newFixedThreadPool(3);
```

Suppose you submit six tasks. Three may begin first, while the remaining tasks wait until a worker becomes available. After a worker finishes one task, it can take another task from the executor's work queue.

### Benefits of thread pools

1. **Thread reuse:** A worker can execute multiple tasks over its lifetime.
2. **Resource control:** A fixed-size pool limits the number of active workers.
3. **Simpler code:** You submit tasks rather than manually starting and tracking each thread.
4. **Centralized lifecycle:** The executor provides methods for orderly shutdown.
5. **Better organization:** Task execution can be separated from application logic.

A pool is not automatically the right size for every workload. CPU-intensive work and tasks that spend most of their time waiting for input/output may need different configurations.

---

## 6. Common Ways to Create an Executor

The `Executors` class offers factory methods for common configurations. Learn what each configuration does and its trade-offs.

### 6.1 Fixed thread pool

```java
ExecutorService executor = Executors.newFixedThreadPool(4);
```

A fixed pool uses a fixed number of worker threads. If all workers are busy, additional submitted tasks wait in a queue.

This is useful when you want a predictable upper limit on concurrently active workers. However, the factory-created fixed pool uses an unbounded work queue, so a very large incoming workload can cause queued tasks to consume substantial memory. In production systems, consider queue limits and rejection policies with a directly configured `ThreadPoolExecutor`.

### 6.2 Single-thread executor

```java
ExecutorService executor = Executors.newSingleThreadExecutor();
```

This executor uses one worker thread to execute tasks sequentially. It is useful when tasks should not run simultaneously through that executor, or when a sequence of submitted tasks should be processed by one worker.

Do not confuse sequential execution within this executor with synchronization across unrelated threads. Other threads can still access shared data.

### 6.3 Cached thread pool

```java
ExecutorService executor = Executors.newCachedThreadPool();
```

A cached pool can create additional threads as demand grows and reuse threads that become idle. It can be useful for many short-lived, independent tasks, but it does not provide a strict upper bound on the number of threads. Under heavy load, it may create a very large number of threads.

Do not select it without considering workload and resource limits.

### 6.4 Scheduled thread pool

```java
ScheduledExecutorService scheduler =
        Executors.newScheduledThreadPool(2);
```

This executor supports tasks that should run after a delay or repeatedly according to a schedule. It is introduced in more detail later in this chapter.

### Choosing an executor

| Requirement | Possible choice |
|---|---|
| Fixed upper limit on active worker threads | Fixed pool |
| Tasks should execute one at a time in submission order | Single-thread executor |
| Delayed or periodic work | Scheduled thread pool |
| Need bounded queues and a custom rejection policy | Configure `ThreadPoolExecutor` directly |
| Need to compose asynchronous stages | Consider `CompletableFuture` |

For many production workloads, an executor should have a deliberate strategy for worker count, queue capacity, rejection, monitoring, and shutdown.

---

## 7. Submitting a `Runnable`

A `Runnable` represents work that does not return a result directly from its `run()` method.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class RunnableExecutorDemo {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        executor.submit(() -> {
            System.out.println("Task 1");
        });

        executor.submit(() -> {
            System.out.println("Task 2");
        });

        executor.shutdown();
    }
}
```

Possible output:

```text
Task 1
Task 2
```

The order is not guaranteed. The two tasks may execute concurrently, and output order depends on scheduling.

### `execute()` vs. `submit()`

`execute(Runnable)` runs a task but does not return a `Future`.

`submit(Runnable)` returns a `Future<?>`, which can be used to wait for completion, inspect cancellation, or observe a failure through `get()`.

```java
Future<?> future = executor.submit(() -> {
    System.out.println("Working");
});
```

Even though a `Runnable` does not return a value, its `Future` can still indicate when the task has completed.

---

## 8. `Runnable` vs. `Callable`

A `Runnable` task has a `run()` method that returns `void` and cannot declare arbitrary checked exceptions in its method signature.

A `Callable<V>` task has a `call()` method that returns a value of type `V` and can throw an exception.

### Runnable example

```java
Runnable task = () -> {
    System.out.println("Generating report");
};
```

### Callable example

```java
Callable<Integer> task = () -> {
    int a = 10;
    int b = 20;
    return a + b;
};
```

### Comparison

| Feature | `Runnable` | `Callable<V>` |
|---|---|---|
| Main method | `run()` | `call()` |
| Return value | No direct return value | Returns a value of type `V` |
| Declares checked exceptions | No `throws` clause in `run()` | Can declare `throws Exception` |
| Common submission result | `Future<?>` with `submit()` | `Future<V>` with `submit()` |
| Best suited for | Actions or tasks without a result | Computations that produce a result |

A lambda expression can implement either interface depending on the target type and the surrounding context.

---

## 9. Using `Callable` to Return a Result

Example:

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class CallableDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        Callable<Integer> calculation = () -> {
            int a = 100;
            int b = 200;
            return a + b;
        };

        Future<Integer> future = executor.submit(calculation);

        Integer result = future.get();
        System.out.println("Result: " + result);

        executor.shutdown();
    }
}
```

Output:

```text
Result: 300
```

The `submit()` call schedules the task and returns a `Future<Integer>`. Calling `future.get()` waits if necessary until the task completes and then retrieves its result.

The example declares `throws Exception` for brevity. Production code should handle expected exceptions deliberately and should ensure the executor is shut down even if a task fails.

### Why is `Callable` useful?

Suppose a program needs to:

- Calculate a student's total marks.
- Read a file and return its contents.
- Fetch a report's data.
- Compute a price.
- Perform a database query and return a result.

If the task should return a value to the caller, `Callable<V>` is often a natural fit.

---

## 10. What Is `Future`?

A `Future<V>` represents the result of a computation that may not have finished yet.

You can think of it as a receipt for submitted work. You receive the handle now and can request the result later.

Important methods include:

| Method | Purpose |
|---|---|
| `get()` | Waits for completion if needed and returns the result |
| `get(timeout, unit)` | Waits up to the specified duration |
| `isDone()` | Checks whether the computation has completed |
| `isCancelled()` | Checks whether the task was cancelled |
| `cancel(mayInterruptIfRunning)` | Attempts to cancel the task |

### Example: Check completion

```java
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});

System.out.println(future.isDone()); // Often false immediately

Integer answer = future.get();
System.out.println(answer);          // 42
```

The initial `isDone()` result is timing-dependent. The task could complete before the check on a very fast system, though the one-second delay makes that unlikely in this example. The call to `get()` waits until completion if needed.

### `get()` can block

This code may make the current thread wait:

```java
Integer answer = future.get();
```

Do not call `get()` immediately after every submission if your goal is to start several tasks concurrently and collect their results later. Doing so may make the caller wait for each task before it submits the next one.

---

## 11. Exception Handling with `Future`

Exceptions thrown by tasks submitted with `submit()` are captured as part of the task's completion. Calling `Future.get()` on a failed task throws `ExecutionException`, whose cause is the exception thrown by the task.

```java
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class FutureExceptionDemo {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        try {
            Future<Integer> future = executor.submit(() -> {
                throw new IllegalArgumentException("Invalid input");
            });

            try {
                System.out.println(future.get());
            } catch (ExecutionException e) {
                System.out.println("Task failed: " + e.getCause());
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Waiting thread was interrupted");
            }
        } finally {
            executor.shutdown();
        }
    }
}
```

Example output:

```text
Task failed: java.lang.IllegalArgumentException: Invalid input
```

Important exceptions:

- `InterruptedException`: The thread waiting in `get()` was interrupted.
- `ExecutionException`: The task failed; inspect `getCause()` to see the underlying exception.
- `TimeoutException`: A timed `get()` did not complete within the specified duration.
- `CancellationException`: The future was cancelled before a result could be retrieved.

When catching `InterruptedException`, restore the interrupt status if you cannot propagate the exception and are choosing to stop waiting, as shown in the example.

---

## 12. Waiting with a Timeout

Sometimes the caller should not wait forever for a result.

```java
import java.util.concurrent.*;

public class FutureTimeoutDemo {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        try {
            Future<String> future = executor.submit(() -> {
                Thread.sleep(3000);
                return "Completed";
            });

            try {
                String result = future.get(1, TimeUnit.SECONDS);
                System.out.println(result);
            } catch (TimeoutException e) {
                System.out.println("The task took too long");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Waiting was interrupted");
            } catch (ExecutionException e) {
                System.out.println("Task failed: " + e.getCause());
            }
        } finally {
            executor.shutdown();
        }
    }
}
```

Typical output:

```text
The task took too long
```

The timed `get()` limits how long the calling thread waits for the result. It does **not** automatically cancel the task. The task may continue running in the background.

If cancellation is appropriate, explicitly call `future.cancel(true)` or use another cancellation strategy. Whether interruption actually stops a task depends on how the task responds to interruption.

---

## 13. Cancelling a Task

`Future.cancel(boolean mayInterruptIfRunning)` attempts to cancel a task.

- `cancel(false)` does not request interruption of a task that is already running.
- `cancel(true)` requests interruption if the task is running.
- Cancellation may prevent a task from starting if it has not begun.
- A running task must cooperate with interruption for cancellation to stop its work promptly.

Example:

```java
import java.util.concurrent.*;

public class CancellationDemo {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        Future<?> future = executor.submit(() -> {
            try {
                while (!Thread.currentThread().isInterrupted()) {
                    System.out.println("Working...");
                    Thread.sleep(300);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }

            System.out.println("Task is stopping");
        });

        Thread.sleep(1000);
        future.cancel(true);
        executor.shutdown();
    }
}
```

The output may vary, and the final message is not guaranteed to print in every cancellation design. The key point is that cancellation is cooperative, not a forced kill.

Do not use `Thread.stop()` to terminate a task. It is unsafe and deprecated.

---

## 14. Submitting Multiple Tasks with `invokeAll()`

`invokeAll()` accepts a collection of `Callable` tasks and returns a list of `Future` objects. The ordinary form waits until all submitted tasks complete or the waiting thread is interrupted.

```java
import java.util.List;
import java.util.concurrent.*;

public class InvokeAllDemo {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        try {
            List<Callable<Integer>> tasks = List.of(
                () -> 10,
                () -> 20,
                () -> 30
            );

            List<Future<Integer>> futures = executor.invokeAll(tasks);

            for (Future<Integer> future : futures) {
                System.out.println(future.get());
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Waiting was interrupted");
        } catch (ExecutionException e) {
            System.out.println("A task failed: " + e.getCause());
        } finally {
            executor.shutdown();
        }
    }
}
```

Output:

```text
10
20
30
```

The futures in the returned list correspond to the order of the tasks in the input collection. The tasks themselves may execute concurrently, so their actual start and finish order can differ.

There is also a timed `invokeAll()` overload. If the timeout expires, unfinished tasks are cancelled according to the API's behavior.

---

## 15. Submitting Multiple Tasks with `invokeAny()`

`invokeAny()` submits a collection of tasks and returns the result of one task that completes successfully. It does not promise to return the result of the first task submitted. It returns a successful result from whichever eligible task completes successfully first.

```java
import java.util.List;
import java.util.concurrent.*;

public class InvokeAnyDemo {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        try {
            List<Callable<String>> tasks = List.of(
                () -> {
                    Thread.sleep(1000);
                    return "Result from task A";
                },
                () -> {
                    Thread.sleep(300);
                    return "Result from task B";
                },
                () -> "Result from task C"
            );

            String result = executor.invokeAny(tasks);
            System.out.println(result);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Waiting was interrupted");
        } catch (ExecutionException e) {
            System.out.println("All tasks failed: " + e.getCause());
        } finally {
            executor.shutdown();
        }
    }
}
```

A likely output is:

```text
Result from task C
```

However, exact completion order depends on scheduling. `invokeAny()` is useful when several independent methods can produce an acceptable result and the program only needs one successful answer. The other tasks are cancelled once a successful result is obtained, subject to the API's cancellation behavior.

---

## 16. Shutting Down an Executor Properly

An executor owns worker threads and must be shut down when it is no longer needed.

### `shutdown()`

```java
executor.shutdown();
```

This stops the executor from accepting new tasks but allows already submitted tasks to complete.

### `shutdownNow()`

```java
executor.shutdownNow();
```

This attempts to stop active tasks by interrupting worker threads and returns tasks that were waiting in the queue. It is a best-effort request; tasks that ignore interruption may continue.

### Recommended two-stage shutdown

```java
import java.util.concurrent.*;

public class ExecutorShutdownDemo {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        try {
            executor.submit(() -> System.out.println("Task running"));
        } finally {
            executor.shutdown();

            try {
                if (!executor.awaitTermination(5, TimeUnit.SECONDS)) {
                    executor.shutdownNow();

                    if (!executor.awaitTermination(5, TimeUnit.SECONDS)) {
                        System.err.println("Executor did not terminate");
                    }
                }
            } catch (InterruptedException e) {
                executor.shutdownNow();
                Thread.currentThread().interrupt();
            }
        }
    }
}
```

`awaitTermination()` waits for the executor to terminate after shutdown has been requested. It returns `true` if termination occurs within the timeout and `false` otherwise.

In a real application, choose timeouts and cancellation behavior appropriate to the work. Avoid shutting down a shared executor from a component that does not own its lifecycle.

---

## 17. Scheduled Tasks with `ScheduledExecutorService`

`ScheduledExecutorService` supports running tasks after a delay or repeatedly.

```java
ScheduledExecutorService scheduler =
        Executors.newScheduledThreadPool(2);
```

### 17.1 Run once after a delay

```java
scheduler.schedule(
    () -> System.out.println("Executed after a delay"),
    2,
    TimeUnit.SECONDS
);
```

This schedules the task to run after about two seconds, subject to scheduling and system load.

### 17.2 Run repeatedly at a fixed rate

```java
ScheduledFuture<?> future = scheduler.scheduleAtFixedRate(
    () -> System.out.println("Periodic task"),
    0,
    2,
    TimeUnit.SECONDS
);
```

The first argument after the task is the initial delay, and the next is the period. With an initial delay of `0`, the task is eligible to start immediately. A fixed-rate schedule targets a regular cadence based on the scheduled start times.

### 17.3 Run with a fixed delay after each completion

```java
scheduler.scheduleWithFixedDelay(
    () -> System.out.println("Task with fixed delay"),
    0,
    2,
    TimeUnit.SECONDS
);
```

This schedules the next execution after the previous execution finishes and the configured delay passes.

### Fixed rate vs. fixed delay

| Method | Scheduling rule |
|---|---|
| `scheduleAtFixedRate()` | Targets a regular rate based on scheduled start times |
| `scheduleWithFixedDelay()` | Waits the specified delay after one execution finishes before scheduling the next |

For a periodic task that takes longer than its fixed-rate period, that same periodic task will not execute concurrently with itself in the same scheduled future; later executions may start late. If a periodic execution throws an exception, subsequent executions of that periodic task are suppressed.

Keep periodic task exceptions visible and handled deliberately. A task that silently stops running after an exception can be difficult to diagnose.

### Cancelling and shutting down scheduled work

```java
future.cancel(false);
scheduler.shutdown();
```

Cancellation attempts to cancel that scheduled task. Shutting down the scheduler manages the executor's overall lifecycle. Understand the shutdown policies if your application depends on delayed or periodic tasks continuing during shutdown.

---

## 18. A Practical Example: Processing Student Marks

Suppose an application needs to calculate totals for several students. Each calculation is independent, so the work can be submitted to a pool.

```java
import java.util.List;
import java.util.concurrent.*;

public class StudentMarksDemo {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        List<List<Integer>> marks = List.of(
            List.of(80, 75, 90),
            List.of(60, 70, 65),
            List.of(95, 92, 98)
        );

        try {
            List<Future<Integer>> futures = marks.stream()
                .map(studentMarks -> executor.submit(() ->
                    studentMarks.stream()
                        .mapToInt(Integer::intValue)
                        .sum()
                ))
                .toList();

            for (int i = 0; i < futures.size(); i++) {
                System.out.println(
                    "Student " + (i + 1) + " total: " + futures.get(i).get()
                );
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Waiting was interrupted");
        } catch (ExecutionException e) {
            System.out.println("Calculation failed: " + e.getCause());
        } finally {
            executor.shutdown();
        }
    }
}
```

Output:

```text
Student 1 total: 245
Student 2 total: 195
Student 3 total: 285
```

This example demonstrates several concepts:

- A fixed thread pool manages the worker threads.
- Each submitted lambda returns an integer, so it is used as a `Callable<Integer>`.
- Each `Future<Integer>` represents one total.
- `get()` retrieves each total, waiting if necessary.
- The executor is shut down in a `finally` block.

The example uses `Stream.toList()`, available in modern Java versions. If using an older Java release, collect the results into a list with `Collectors.toList()`.

---

## 19. Thread Pools and Shared Data

Using an executor does not automatically make your program thread-safe.

For example, several tasks submitted to a pool can still access the same ordinary `ArrayList` or counter concurrently. If those operations are not safe for concurrent access, race conditions can still occur.

Unsafe idea:

```java
List<Integer> shared = new ArrayList<>();

for (int i = 0; i < 100; i++) {
    executor.submit(() -> shared.add(1));
}
```

Multiple workers may call `add()` at the same time. A normal `ArrayList` is not designed for concurrent modification without coordination.

Possible approaches include:

- Give each task its own local data and combine results after completion.
- Protect shared updates with a suitable lock.
- Use a concurrent collection when it fits the operation.
- Use atomic variables for suitable single-value updates.
- Redesign the work so tasks do not need shared mutable state.

Thread pools control execution resources; synchronization and concurrent data structures control how shared state is accessed.

---

## 20. Common Mistakes

1. **Forgetting to shut down an executor.** Worker threads can keep a program alive.
2. **Calling `get()` immediately after each submission.** This can serialize the caller's workflow and reduce the benefit of concurrent execution.
3. **Assuming `Future.get(timeout, unit)` cancels a task.** It only limits the waiting time; cancellation must be requested separately if desired.
4. **Assuming `cancel(true)` forcibly terminates a task.** It requests interruption; the task must respond appropriately.
5. **Ignoring exceptions from `Future.get()`.** A failed task's exception is commonly exposed through `ExecutionException`.
6. **Swallowing `InterruptedException`.** Restore the interrupt status or propagate the exception when appropriate.
7. **Choosing an unbounded queue without considering load.** Queued tasks can consume large amounts of memory.
8. **Using a cached pool without considering thread growth.** It does not impose a strict maximum worker count.
9. **Assuming the output order matches submission order.** Concurrent tasks can finish in a different order.
10. **Assuming executor-managed tasks are automatically thread-safe.** Shared mutable data still needs a safe design.
11. **Using one global executor and shutting it down from unrelated components.** The code that owns the executor should normally manage its lifecycle.
12. **Using scheduled tasks without handling failures.** An exception from a periodic task can prevent future executions of that task.

---

## 21. Interview Questions and Answers

### Q1. What is the Executor Framework?

It is a set of Java concurrency APIs that separate task submission from thread management and execution.

### Q2. What is a thread pool?

A thread pool is a set of reusable worker threads that execute submitted tasks. It reduces the need to create a new thread for every task and can limit active concurrency.

### Q3. What is the difference between `Executor` and `ExecutorService`?

`Executor` provides `execute(Runnable)`. `ExecutorService` adds methods for submitting tasks, retrieving results, coordinating groups of tasks, and managing shutdown.

### Q4. What is the difference between `execute()` and `submit()`?

`execute()` accepts a `Runnable` and returns no result handle. `submit()` returns a `Future` that can be used to inspect completion, retrieve results, or observe task failure.

### Q5. What is the difference between `Runnable` and `Callable`?

`Runnable.run()` returns no value and cannot declare checked exceptions. `Callable<V>.call()` returns a value and can declare exceptions.

### Q6. What is a `Future`?

A `Future` represents the status and possible result of an asynchronous computation. It supports waiting, timed waiting, status checks, and cancellation.

### Q7. Does `Future.get()` block?

It can. If the task has not completed, `get()` waits for completion. The timed overload waits for at most the requested duration.

### Q8. What is `ExecutionException`?

It is thrown by `Future.get()` when the submitted task failed. Its cause can be inspected with `getCause()`.

### Q9. What is the difference between `shutdown()` and `shutdownNow()`?

`shutdown()` rejects new tasks while allowing submitted tasks to complete. `shutdownNow()` attempts to interrupt active tasks and returns queued tasks that did not start.

### Q10. What does `awaitTermination()` do?

It waits for an executor to terminate after shutdown has been requested, up to a specified timeout.

### Q11. What is the difference between `invokeAll()` and `invokeAny()`?

`invokeAll()` returns futures for all tasks after they complete or the operation is otherwise ended. `invokeAny()` returns one successful result from the submitted tasks.

### Q12. What is the difference between `scheduleAtFixedRate()` and `scheduleWithFixedDelay()`?

Fixed rate targets a cadence based on scheduled start times. Fixed delay waits a specified interval after each execution finishes before the next one is scheduled.

### Q13. Can a task submitted to an executor throw an exception?

Yes. With `submit()`, a task failure is recorded and is generally observed through `Future.get()`, which throws `ExecutionException`. With `execute()`, an uncaught task exception is handled differently and may reach the thread's uncaught-exception handler.

### Q14. Does a thread pool make shared objects thread-safe?

No. It manages task execution and worker threads. Shared mutable state still requires appropriate synchronization or a thread-safe design.

### Q15. Why might a fixed thread pool be unsuitable for a very large task backlog?

The common factory-created fixed pool uses an unbounded work queue. A very large number of queued tasks can consume substantial memory. A bounded queue and explicit rejection policy may be more appropriate.

### Q16. What happens if a periodic scheduled task throws an exception?

Subsequent executions of that periodic task are suppressed. Handle and report exceptions intentionally so failures are not hidden.

---

## 22. Practice Exercises

1. Create a fixed thread pool of three workers and submit ten tasks. Print each task's number and the executing thread's name.
2. Submit a `Runnable` and use its `Future` to wait for completion.
3. Create a `Callable<Integer>` that returns the square of a number.
4. Submit five `Callable` tasks and retrieve their results using a list of futures.
5. Write a task that throws an exception and inspect the cause of the resulting `ExecutionException`.
6. Use timed `Future.get()` and handle `TimeoutException`.
7. Cancel a running task that checks its interrupt status and responds to interruption.
8. Use `invokeAll()` to calculate several values and print all results.
9. Use `invokeAny()` with three tasks that finish at different times. Observe which successful result is returned.
10. Create an executor and implement a two-stage shutdown using `shutdown()`, `awaitTermination()`, and `shutdownNow()`.
11. Schedule a one-time task to run after a delay.
12. Compare `scheduleAtFixedRate()` with `scheduleWithFixedDelay()`.
13. Submit multiple tasks that update a shared collection. First demonstrate the unsafe approach, then correct it using an appropriate design.
14. Explain why an unbounded queue can be dangerous when tasks arrive faster than workers can process them.

### Suggested challenge: Parallel report generator

Create a program that calculates totals for multiple students using a thread pool. Each task should return a total using `Callable<Integer>`. Store the futures, retrieve the results, and print a final summary only after all required calculations have completed. Handle interruption and task failure, and ensure the executor is shut down even if something goes wrong.

---

## 23. Chapter Summary

The Executor Framework separates the definition of work from the management of threads. `ExecutorService` lets you submit tasks, retrieve futures, execute groups of tasks, and control shutdown. Thread pools reuse worker threads and can limit the number of tasks running simultaneously, but queue capacity and resource usage still need to be considered.

Use `Runnable` for tasks without a direct return value and `Callable<V>` for tasks that return results or declare exceptions. A `Future<V>` provides a way to wait for a result, inspect completion, or request cancellation. `get()` can block, timed `get()` limits the wait, and failures from submitted tasks are commonly reported through `ExecutionException`.

Always manage executor lifecycle deliberately. `shutdown()` allows submitted tasks to finish, while `shutdownNow()` attempts to interrupt active work. Cancellation is cooperative, and interrupted tasks should respond appropriately.

`ScheduledExecutorService` supports delayed and periodic work. Finally, remember that a thread pool does not automatically make shared data thread-safe. Use synchronization, atomic variables, concurrent collections, or task designs that avoid shared mutable state.

**Next chapter:** Chapter 48 — `CompletableFuture`, Asynchronous Pipelines, Combining Tasks, and Error Handling.
