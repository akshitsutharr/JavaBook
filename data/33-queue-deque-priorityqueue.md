# Chapter 33 — Queue, Deque, and PriorityQueue

> **Goal:** Understand how Java processes elements in queues, how `Deque` supports both ends, how to use `ArrayDeque` as a queue or stack, and how `PriorityQueue` orders elements by priority.

## 1. What Is a Queue?

A **queue** is a data structure that holds elements waiting to be processed. A typical queue follows **FIFO**: First In, First Out. The element added first is usually the element removed first.

Think of a line at a ticket counter. The first person to join the line is normally served first.

```text
Add:    A -> B -> C
Remove: A, then B, then C
```

Queues are useful for task scheduling, printer jobs, breadth-first search (BFS), message processing, and handling requests in arrival order.

Java defines the `Queue<E>` interface in the Collections Framework. The interface describes queue operations, while classes such as `ArrayDeque`, `LinkedList`, and `PriorityQueue` provide implementations with different behavior.

## 2. The `Queue` Interface

A queue generally provides two groups of methods for inserting, removing, and examining its head.

| Purpose | Exception-based method | Special-value method |
|---|---|---|
| Insert | `add(e)` | `offer(e)` |
| Remove head | `remove()` | `poll()` |
| Examine head | `element()` | `peek()` |

The difference is how failure is reported:

- `add(e)` may throw an exception if the element cannot be inserted; `offer(e)` returns `false`.
- `remove()` throws if the queue is empty; `poll()` returns `null`.
- `element()` throws if the queue is empty; `peek()` returns `null`.

For ordinary queue code, `offer`, `poll`, and `peek` are often convenient because failure does not require an exception.

Not every queue is FIFO. A `PriorityQueue`, for example, chooses its head by priority ordering rather than insertion time.

## 3. Using `Queue` with `ArrayDeque`

`ArrayDeque` is a resizable-array implementation of `Deque`, which extends `Queue`. It is a good general-purpose choice for a normal FIFO queue.

```java
import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Queue<String> tasks = new ArrayDeque<>();

        tasks.offer("Compile");
        tasks.offer("Test");
        tasks.offer("Deploy");

        System.out.println(tasks);
        System.out.println("Next: " + tasks.peek());
        System.out.println("Processed: " + tasks.poll());
        System.out.println("Next: " + tasks.peek());
        System.out.println(tasks);
    }
}
```

Output:

```text
[Compile, Test, Deploy]
Next: Compile
Processed: Compile
Next: Test
[Test, Deploy]
```

Explanation:

1. `offer` adds each task to the queue.
2. `peek` reads the head without removing it.
3. `poll` removes and returns the head.
4. The next task becomes the new head.

`ArrayDeque` does not allow `null` elements. That is useful because `poll()` and `peek()` use `null` to indicate that no element is available.

## 4. Queue Methods in Detail

Consider this example:

```java
Queue<Integer> queue = new ArrayDeque<>();

queue.offer(10);
queue.offer(20);
queue.offer(30);

System.out.println(queue.peek());
System.out.println(queue.poll());
System.out.println(queue.poll());
System.out.println(queue);
```

Output:

```text
10
10
20
[30]
```

### `offer(element)`

Attempts to add an element. Returns `true` when accepted, or `false` if the queue cannot accept it. Some queues have capacity limits; an unbounded queue usually has no fixed element limit, although available memory still limits growth.

### `poll()`

Removes and returns the head. If the queue is empty, it returns `null`.

```java
Queue<String> queue = new ArrayDeque<>();
System.out.println(queue.poll());
```

Output:

```text
null
```

### `peek()`

Returns the head without removing it. It returns `null` if the queue is empty.

### `add(element)`

Adds an element or throws an exception if the queue cannot accept it.

### `remove()`

Removes and returns the head, but throws `NoSuchElementException` if the queue is empty.

### `element()`

Returns the head without removing it, but throws `NoSuchElementException` if the queue is empty.

**Rule of thumb:** Prefer `offer`, `poll`, and `peek` when you want to handle an empty queue or unsuccessful insertion through return values.

## 5. What Is a `Deque`?

`Deque` is pronounced “deck” and stands for **double-ended queue**. It allows adding, removing, and examining elements at both the front and the back.

A deque can act as:

- A FIFO queue.
- A LIFO stack.
- A structure where both ends are useful, such as a sliding window or a work deque.

The main methods are:

| Front end | Back end |
|---|---|
| `addFirst(e)` | `addLast(e)` |
| `offerFirst(e)` | `offerLast(e)` |
| `removeFirst()` | `removeLast()` |
| `pollFirst()` | `pollLast()` |
| `getFirst()` | `getLast()` |
| `peekFirst()` | `peekLast()` |

The exception-based methods throw when an operation cannot be completed or when an element is missing. The `offer` and `poll` forms report failure through a return value.

## 6. Using `ArrayDeque` as a Deque

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        Deque<String> deque = new ArrayDeque<>();

        deque.addFirst("B");
        deque.addFirst("A");
        deque.addLast("C");
        deque.addLast("D");

        System.out.println(deque);
        System.out.println(deque.peekFirst());
        System.out.println(deque.peekLast());

        System.out.println(deque.removeFirst());
        System.out.println(deque.removeLast());

        System.out.println(deque);
    }
}
```

Output:

```text
[A, B, C, D]
A
D
A
D
[B, C]
```

The deque can add or remove from either end without needing to shift all its elements as an array-backed list would for a front insertion.

`ArrayDeque` is usually a good default when you need queue or stack behavior. It does not permit null elements and is not thread-safe by default.

## 7. Using `ArrayDeque` as a Stack

A **stack** follows **LIFO**: Last In, First Out. The most recently added element is removed first.

Think of a stack of plates. The last plate placed on top is the first one picked up.

Java's `Deque` interface provides stack-style methods:

- `push(e)` — push onto the top.
- `pop()` — remove and return the top; throws if empty.
- `peek()` — view the top; returns `null` if empty.

With `ArrayDeque`, the front acts as the top for these methods.

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        Deque<String> stack = new ArrayDeque<>();

        stack.push("Home");
        stack.push("Search");
        stack.push("Profile");

        System.out.println(stack);
        System.out.println("Top: " + stack.peek());
        System.out.println("Removed: " + stack.pop());
        System.out.println("New top: " + stack.peek());
    }
}
```

Output:

```text
[Profile, Search, Home]
Top: Profile
Removed: Profile
New top: Search
```

For new code, prefer `Deque` with `ArrayDeque` for ordinary stack operations rather than the legacy `Stack` class.

## 8. Queue vs. Stack vs. Deque

| Structure | Main rule | Typical operations | Common use |
|---|---|---|---|
| Queue | Usually FIFO | `offer`, `poll`, `peek` | Tasks in arrival order |
| Stack | LIFO | `push`, `pop`, `peek` | Undo, backtracking |
| Deque | Both ends available | `addFirst`, `addLast`, `pollFirst`, `pollLast` | Queue, stack, sliding window |

A deque is a general structure that can implement either a queue or a stack. Choose the operations that match the behavior you need.

## 9. What Is a `PriorityQueue`?

A `PriorityQueue` removes elements according to their priority, not their insertion time.

By default, Java's `PriorityQueue` uses natural ordering, so the **least element** is at the head. For integers, the smallest integer is removed first.

```java
import java.util.PriorityQueue;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Queue<Integer> numbers = new PriorityQueue<>();

        numbers.offer(40);
        numbers.offer(10);
        numbers.offer(30);
        numbers.offer(20);

        while (!numbers.isEmpty()) {
            System.out.println(numbers.poll());
        }
    }
}
```

Output:

```text
10
20
30
40
```

Even though `40` was inserted first, it was not removed first. The priority rule controls removal.

### Important: the queue is not a sorted list

This code:

```java
PriorityQueue<Integer> numbers = new PriorityQueue<>();
numbers.add(40);
numbers.add(10);
numbers.add(30);
numbers.add(20);

System.out.println(numbers);
```

does **not** promise to print `[10, 20, 30, 40]`. The internal heap structure keeps the highest-priority element at the head, but iteration and `toString()` do not guarantee a fully sorted order.

To retrieve elements in priority order, repeatedly call `poll()` until the queue is empty. If you need a sorted collection that remains sorted for iteration, consider a `TreeSet` when unique elements are appropriate, or copy the data into a list and sort it.

## 10. Min-Priority Queue and Max-Priority Queue

### 10.1 Min-priority queue

The default `PriorityQueue` exposes the smallest element first.

```java
PriorityQueue<Integer> minQueue = new PriorityQueue<>();
minQueue.add(50);
minQueue.add(10);
minQueue.add(30);

System.out.println(minQueue.poll());
```

Output:

```text
10
```

### 10.2 Max-priority queue

Use a reverse comparator to make the largest element come first.

```java
import java.util.Comparator;
import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> maxQueue =
                new PriorityQueue<>(Comparator.reverseOrder());

        maxQueue.add(50);
        maxQueue.add(10);
        maxQueue.add(30);

        while (!maxQueue.isEmpty()) {
            System.out.println(maxQueue.poll());
        }
    }
}
```

Output:

```text
50
30
10
```

Do not confuse “priority” with “importance” automatically. The comparator defines which element is considered first.

## 11. Custom Priority with `Comparator`

Suppose tasks have a name and a priority number, where a smaller number means a more urgent task.

```java
import java.util.Comparator;
import java.util.PriorityQueue;

class Task {
    private final String name;
    private final int priority;

    Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }

    String getName() {
        return name;
    }

    int getPriority() {
        return priority;
    }

    @Override
    public String toString() {
        return name + " (priority " + priority + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Task> tasks = new PriorityQueue<>(
                Comparator.comparingInt(Task::getPriority)
        );

        tasks.offer(new Task("Write report", 3));
        tasks.offer(new Task("Fix production bug", 1));
        tasks.offer(new Task("Reply to email", 2));

        while (!tasks.isEmpty()) {
            System.out.println(tasks.poll());
        }
    }
}
```

Output:

```text
Fix production bug (priority 1)
Reply to email (priority 2)
Write report (priority 3)
```

The comparator orders tasks by their priority number. If equal-priority tasks require a predictable tie-breaker, add another comparator, such as `.thenComparing(Task::getName)`.

A `PriorityQueue` does not guarantee stable ordering among elements that compare equally unless your comparator explicitly distinguishes them.

## 12. Common `PriorityQueue` Methods

- `offer(e)` / `add(e)`: insert an element.
- `peek()`: inspect the head without removing it.
- `poll()`: remove and return the head.
- `remove(object)`: remove a matching element if present; generally requires a linear search.
- `contains(object)`: check whether an element is present; generally requires a linear search.
- `size()`: number of elements.
- `isEmpty()`: whether it contains no elements.
- `clear()`: remove all elements.

Example:

```java
PriorityQueue<Integer> queue = new PriorityQueue<>();

queue.offer(30);
queue.offer(10);
queue.offer(20);

System.out.println(queue.peek());
System.out.println(queue.size());
System.out.println(queue.contains(30));

queue.remove(30);
System.out.println(queue.poll());
```

Output:

```text
10
3
true
10
```

`remove(30)` removes the value `30`. The next head is still `10`.

## 13. Typical Time Complexity

These are typical complexities for the standard implementations:

| Operation | `ArrayDeque` | `PriorityQueue` |
|---|---:|---:|
| Add at an end / `offer` | Amortized O(1) | O(log n) |
| Remove from an end / `poll` | Amortized O(1) | O(log n) |
| Peek at an end / `peek` | O(1) | O(1) |
| `contains` | O(n) | O(n) |
| Remove a specific object | O(n) | O(n) |
| Iterate through all elements | O(n) | O(n) |

`ArrayDeque` is array-backed and grows as needed. `PriorityQueue` is typically heap-backed, so insertion and removal restore heap order. These are standard performance expectations, not guarantees about exact elapsed time.

## 14. Queue Applications

### 14.1 Process tasks in arrival order

```java
Queue<String> jobs = new ArrayDeque<>();

jobs.offer("Job A");
jobs.offer("Job B");
jobs.offer("Job C");

while (!jobs.isEmpty()) {
    String job = jobs.poll();
    System.out.println("Processing " + job);
}
```

Output:

```text
Processing Job A
Processing Job B
Processing Job C
```

### 14.2 Breadth-First Search (BFS)

BFS explores a graph level by level. A queue holds vertices that have been discovered but not yet processed.

Simplified pattern:

```java
Queue<Integer> queue = new ArrayDeque<>();
Set<Integer> visited = new HashSet<>();

queue.offer(start);
visited.add(start);

while (!queue.isEmpty()) {
    int current = queue.poll();
    System.out.println(current);

    for (int neighbor : graph.get(current)) {
        if (visited.add(neighbor)) {
            queue.offer(neighbor);
        }
    }
}
```

This is a pattern rather than a complete runnable program: `graph` and `start` must be defined. `visited.add(neighbor)` both tests whether the vertex is new and marks it visited when the set accepts it. Marking vertices when enqueuing helps prevent the same vertex from being enqueued repeatedly.

BFS is commonly used for shortest paths in unweighted graphs and for level-order traversal of trees. Graph representation and BFS are covered in more detail in a data structures course.

### 14.3 Undo history with a stack

A stack can store actions or pages in last-in, first-out order. When the user presses Undo, the latest action is popped first.

```java
Deque<String> actions = new ArrayDeque<>();

actions.push("Typed title");
actions.push("Changed font");
actions.push("Inserted image");

System.out.println("Undo: " + actions.pop());
System.out.println("Undo: " + actions.pop());
```

Output:

```text
Undo: Inserted image
Undo: Changed font
```

A real undo system often needs to store structured action objects, not just text descriptions.

## 15. Practical Program — Customer Service Queue

```java
import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Queue<String> customers = new ArrayDeque<>();

        customers.offer("Aarav");
        customers.offer("Meera");
        customers.offer("Kabir");

        while (!customers.isEmpty()) {
            String customer = customers.poll();
            System.out.println("Now serving: " + customer);
        }

        System.out.println("Queue empty: " + customers.isEmpty());
    }
}
```

Output:

```text
Now serving: Aarav
Now serving: Meera
Now serving: Kabir
Queue empty: true
```

This is FIFO processing: the first customer added is the first served.

## 16. Practical Program — Browser Back History

This simplified example uses a stack to track pages.

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        Deque<String> history = new ArrayDeque<>();

        history.push("home.html");
        history.push("products.html");
        history.push("product-details.html");

        System.out.println("Current page: " + history.peek());
        System.out.println("Back from: " + history.pop());
        System.out.println("Current page: " + history.peek());
        System.out.println("Back from: " + history.pop());
        System.out.println("Current page: " + history.peek());
    }
}
```

Output:

```text
Current page: product-details.html
Back from: product-details.html
Current page: products.html
Back from: products.html
Current page: home.html
```

This illustrates stack behavior. A real browser usually needs separate back and forward stacks and additional navigation rules.

## 17. Practical Program — Priority-Based Job Scheduler

```java
import java.util.Comparator;
import java.util.PriorityQueue;

class Job {
    private final String name;
    private final int priority;

    Job(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }

    String getName() {
        return name;
    }

    int getPriority() {
        return priority;
    }
}

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Job> jobs = new PriorityQueue<>(
                Comparator.comparingInt(Job::getPriority)
                          .thenComparing(Job::getName)
        );

        jobs.offer(new Job("Send email", 3));
        jobs.offer(new Job("Fix bug", 1));
        jobs.offer(new Job("Build project", 2));
        jobs.offer(new Job("Backup files", 1));

        while (!jobs.isEmpty()) {
            Job job = jobs.poll();
            System.out.println(job.getPriority() + " - " + job.getName());
        }
    }
}
```

Output:

```text
1 - Backup files
1 - Fix bug
2 - Build project
3 - Send email
```

The comparator orders by the numeric priority first, then alphabetically by job name. Here, priority `1` is defined as the most urgent.

## 18. Common Mistakes and Exceptions

**Mistake 1: Assuming every queue is FIFO.** `PriorityQueue` chooses elements by its comparator or natural ordering.

**Mistake 2: Assuming `PriorityQueue` iteration is sorted.** Only the head is guaranteed to be the least element by default. Use repeated `poll()` calls for priority order.

**Mistake 3: Using `remove()` on an empty queue without checking.** It throws `NoSuchElementException`. `poll()` returns `null` instead.

**Mistake 4: Adding null to `ArrayDeque` or `PriorityQueue`.** These implementations reject null elements, usually with `NullPointerException`.

**Mistake 5: Assuming `ArrayDeque` is thread-safe.** It is not synchronized by default. Concurrent access requires a suitable design.

**Mistake 6: Using a `PriorityQueue` when you need sorted iteration all the time.** Consider a sorted collection or a sorted list if that better matches the requirement.

Common exceptions:

- `NoSuchElementException`: an exception-based head operation such as `remove()` or `element()` is called on an empty queue.
- `NullPointerException`: null is inserted into an implementation that rejects it, or another null-related operation fails.
- `ClassCastException`: elements cannot be compared as required by the queue's ordering.
- `IllegalArgumentException`: a comparator or constructor argument is invalid, depending on the specific API and usage.

## 19. Queue and Deque Null Behavior

`ArrayDeque` rejects null elements. `PriorityQueue` also rejects null elements. This matters because `peek()` and `poll()` use `null` to signal that no element is available.

Some other queue implementations may have different contracts, so check the chosen implementation's documentation before relying on null behavior.

For clean code, it is usually best not to use null as a real queue element.

## 20. Output-Based Questions

Try to predict the result before checking the answer.

### Question 1

```java
Queue<Integer> queue = new ArrayDeque<>();
queue.offer(1);
queue.offer(2);
queue.offer(3);

System.out.println(queue.poll());
System.out.println(queue.peek());
System.out.println(queue.size());
```

**Answer:**

```text
1
2
2
```

The first `poll` removes `1`. The next head is `2`, and two elements remain.

### Question 2

```java
Deque<String> deque = new ArrayDeque<>();
deque.addFirst("B");
deque.addFirst("A");
deque.addLast("C");

System.out.println(deque);
```

**Answer:**

```text
[A, B, C]
```

`addFirst` inserts at the front; `addLast` inserts at the back.

### Question 3

```java
Deque<Integer> stack = new ArrayDeque<>();
stack.push(10);
stack.push(20);
stack.push(30);

System.out.println(stack.pop());
System.out.println(stack.peek());
```

**Answer:**

```text
30
20
```

The stack is LIFO.

### Question 4

```java
PriorityQueue<Integer> queue = new PriorityQueue<>();
queue.offer(50);
queue.offer(10);
queue.offer(30);

System.out.println(queue.poll());
System.out.println(queue.poll());
```

**Answer:**

```text
10
30
```

The default priority queue removes the smallest elements first.

### Question 5

```java
Queue<String> queue = new ArrayDeque<>();
System.out.println(queue.peek());
System.out.println(queue.poll());
```

**Answer:**

```text
null
null
```

Both methods return null when the queue is empty.

### Question 6

```java
Queue<Integer> queue = new ArrayDeque<>();
queue.offer(10);
queue.remove();
queue.remove();
```

**Answer:** The first `remove()` returns `10`. The second `remove()` throws `NoSuchElementException` because the queue is empty.

### Question 7

```java
PriorityQueue<Integer> queue = new PriorityQueue<>(
        Comparator.reverseOrder()
);
queue.offer(5);
queue.offer(20);
queue.offer(10);

System.out.println(queue.poll());
```

**Answer:**

```text
20
```

The reverse comparator puts the largest value at the head.

## 21. Interview Questions and Answers

### Q1. What is a queue?

A queue is a data structure for holding elements waiting to be processed. A typical queue follows FIFO order.

### Q2. What is the difference between `add` and `offer`?

Both attempt to insert an element. `add` may throw an exception if insertion fails; `offer` reports failure by returning `false`.

### Q3. What is the difference between `remove` and `poll`?

Both remove and return the head. `remove` throws if the queue is empty; `poll` returns `null`.

### Q4. What is the difference between `element` and `peek`?

Both inspect the head without removing it. `element` throws if the queue is empty; `peek` returns `null`.

### Q5. What is a `Deque`?

A double-ended queue that supports insertion, removal, and inspection at both ends.

### Q6. How can `ArrayDeque` be used as a stack?

Use `push` to add to the top, `pop` to remove from the top, and `peek` to inspect the top.

### Q7. Why is `ArrayDeque` often preferred over `Stack`?

`ArrayDeque` provides efficient stack operations and avoids relying on the legacy `Stack` class. It is not synchronized, so concurrency must be handled separately if needed.

### Q8. How does `PriorityQueue` choose the next element?

It uses natural ordering by default or a supplied `Comparator`. The head is the least element under that ordering by default.

### Q9. Is `PriorityQueue` fully sorted?

No. It guarantees access to the highest-priority head, not sorted iteration. Repeated `poll()` calls retrieve elements in priority order.

### Q10. What is the typical time complexity of `PriorityQueue` insertion and removal?

`offer`/`add` and `poll` are typically O(log n). `peek` is O(1). Searching for an arbitrary element is generally O(n).

### Q11. Can `ArrayDeque` store null?

No. It rejects null elements.

### Q12. Where are queues used in algorithms?

Queues are used in BFS, level-order tree traversal, task processing, simulations, and other first-in-first-out workflows.

### Q13. What is the difference between a queue and a priority queue?

A normal FIFO queue processes elements by arrival order. A priority queue processes them according to an ordering or priority.

### Q14. How can you create a max-priority queue of integers?

Use `new PriorityQueue<>(Comparator.reverseOrder())`.

### Q15. Does `ArrayDeque` support indexed access like `ArrayList`?

No. It is designed for operations at the ends, not random index-based access.

## 22. Practice Exercises

1. Implement a queue of customer names. Add five customers and serve them one by one.
2. Write a program that checks whether a queue is empty before polling.
3. Use a `Deque` to add three values at the front and three at the back, then remove one from each end.
4. Implement a stack using `ArrayDeque` with push, pop, and peek operations.
5. Reverse a string using a stack.
6. Use a `PriorityQueue<Integer>` to print numbers from smallest to largest.
7. Create a max-priority queue and print values from largest to smallest.
8. Create a `Task` class and prioritize tasks using a comparator.
9. Add a tie-breaker to a priority comparator so equal priorities are ordered by task name.
10. Use a queue to implement BFS on a small graph.
11. Use two stacks to model a simple undo/redo workflow.
12. Compare the output of printing a `PriorityQueue` with repeatedly polling its elements.
13. Explain why `ArrayDeque` and `PriorityQueue` reject null elements.
14. Implement a simple help-desk simulation where incoming requests are processed in FIFO order.

## 23. Revision Checklist

- [ ] Explain FIFO and LIFO.
- [ ] Know the difference between `Queue`, `Deque`, and `PriorityQueue`.
- [ ] Use `offer`, `poll`, and `peek`.
- [ ] Explain the exception-based alternatives `add`, `remove`, and `element`.
- [ ] Use `ArrayDeque` as a queue.
- [ ] Use `ArrayDeque` as a stack with `push`, `pop`, and `peek`.
- [ ] Add and remove from both ends of a deque.
- [ ] Create a min-priority queue and a max-priority queue.
- [ ] Use a `Comparator` to define custom priority.
- [ ] Explain why a priority queue is not fully sorted during iteration.
- [ ] Know the typical time complexity of queue and priority queue operations.
- [ ] Recognize common exceptions and null restrictions.
- [ ] Explain a real use case for a queue, deque, and priority queue.

## 24. Final Summary

Use `Queue` when elements should be processed in queue order, usually FIFO. Use `Deque` when you need both ends or want a modern stack implementation. `ArrayDeque` is a good general-purpose choice for ordinary queue and stack operations.

Use `PriorityQueue` when the next element must be chosen by priority. By default, Java removes the least element first; a comparator can reverse or customize the ordering. Remember that a priority queue does not provide fully sorted iteration, and that `poll`/`peek` behave differently from the exception-based `remove`/`element` methods when the queue is empty.

**Next chapter:** Chapter 34 — Map Interface and HashMap.
