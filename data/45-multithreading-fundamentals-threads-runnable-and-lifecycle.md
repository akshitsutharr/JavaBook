# Chapter 45: Multithreading Fundamentals — Threads, Runnable, and Thread Lifecycle

## 1. Learning Objectives

By the end of this chapter, you will understand:

- What a process and a thread are.
- Why Java programs use multithreading.
- The difference between concurrency and parallelism.
- How to create threads using `Thread` and `Runnable`.
- Why `start()` and `run()` are different.
- How to inspect a thread's name and state.
- The thread lifecycle and all six Java thread states.
- How `sleep()`, `join()`, and `interrupt()` work.
- Thread priorities and daemon threads.
- Why shared data can cause race conditions.
- Common multithreading mistakes and interview questions.

---

## 2. What Is a Thread?

A **thread** is a path of execution inside a program. It represents a sequence of instructions that can execute independently of other threads in the same process.

Consider a music application. It may need to:

- Play audio.
- Download a song.
- Update the progress bar.
- Respond when the user clicks a button.

If the application performed every task one after another on a single thread, a long download could make the interface unresponsive. Multiple threads can help the application handle these activities without forcing every task to wait for the others.

In Java, the `Thread` class represents a thread of execution.

### A simple analogy

Imagine a restaurant kitchen:

- The **process** is the restaurant.
- The **threads** are workers inside that restaurant.
- The workers can perform different tasks.
- They may share resources such as ingredients and kitchen equipment.

Threads in the same process share much of the process's memory, including objects on the heap. Each thread has its own execution stack and execution state. Shared memory makes communication convenient, but it also creates risks when multiple threads modify the same data.

---

## 3. What Is a Process?

A **process** is a running instance of a program.

For example, when you open a browser, the operating system starts one or more processes for it. When you launch a Java application, the operating system runs a Java process that contains the JVM and your program.

A process typically has its own address space and resources. A thread exists inside a process.

### Process vs. thread

| Feature | Process | Thread |
|---|---|---|
| Meaning | Running program instance | Execution path within a process |
| Memory | Usually has its own address space | Threads in one process share heap memory |
| Communication | Often requires inter-process communication | Can communicate through shared objects |
| Creation cost | Generally higher | Generally lower |
| Failure isolation | Often stronger between processes | A serious failure can affect the whole process |
| Example | A running Java application | A worker thread inside that Java application |

These are general operating-system concepts; exact implementation details depend on the operating system and JVM.

---

## 4. Why Do We Need Multithreading?

**Multithreading** means using multiple threads within one process.

It can help with:

1. **Responsiveness:** Keep a user interface responsive while work happens in the background.
2. **Background work:** Perform downloads, logging, or scheduled tasks without blocking the main activity.
3. **Concurrent request handling:** A server can handle work for multiple clients.
4. **Better resource use:** A thread waiting for input/output may allow another thread to do useful work.
5. **Parallel computation:** On suitable hardware, independent tasks may execute simultaneously on different CPU cores.

Multithreading does not automatically make every program faster. Threads have scheduling and coordination overhead, and tasks that depend heavily on one another may gain little from running concurrently.

---

## 5. Concurrency vs. Parallelism

These terms are related, but they are not identical.

**Concurrency** means multiple tasks are in progress during overlapping periods. The system can switch between tasks, so they make progress without each task needing to finish before another begins.

**Parallelism** means multiple tasks are literally executing at the same time, such as on separate CPU cores.

Imagine one chef alternating between two dishes. That is similar to concurrency. Imagine two chefs preparing different dishes at the same time. That is similar to parallelism.

A multithreaded Java program can be concurrent even on a single CPU core, because the scheduler can switch between threads. Actual parallel execution depends on the machine, JVM, operating system, and workload.

---

## 6. The Main Thread in Java

When a Java application starts, the JVM begins executing the `main()` method on a thread commonly named `main`.

```java
public class MainThreadDemo {
    public static void main(String[] args) {
        System.out.println("Hello from Java");
        System.out.println("Thread: " + Thread.currentThread().getName());
    }
}
```

Possible output:

```text
Hello from Java
Thread: main
```

### Understanding the code

- `Thread.currentThread()` returns the thread that is currently executing this code.
- `.getName()` returns that thread's name.
- At the beginning of a typical command-line Java application, the code inside `main()` runs on the `main` thread.

The JVM may also create internal threads for its own work. The main thread is not necessarily the only thread in a Java process.

---

## 7. Creating a Thread: Two Common Approaches

The traditional introductory approaches are:

1. Extend the `Thread` class.
2. Implement the `Runnable` interface.

Both are useful for learning, but implementing `Runnable` is often the more flexible choice because your class can still extend another class.

### 7.1 Approach One: Extend `Thread`

```java
class DownloadThread extends Thread {
    @Override
    public void run() {
        System.out.println("Downloading file...");
        System.out.println("Worker: " + Thread.currentThread().getName());
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        DownloadThread worker = new DownloadThread();
        worker.start();

        System.out.println("Main method continues");
    }
}
```

Possible output:

```text
Main method continues
Downloading file...
Worker: Thread-0
```

Another valid output could print the download messages before `Main method continues`. The order is not guaranteed because the scheduler decides when each runnable thread gets CPU time.

**Important:** Creating a `DownloadThread` object does not itself begin concurrent execution. Calling `start()` asks the JVM to start a new thread, which then invokes `run()`.

### 7.2 Approach Two: Implement `Runnable`

`Runnable` is a functional interface with one abstract method:

```java
public interface Runnable {
    void run();
}
```

Example:

```java
class DownloadTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Downloading file...");
        System.out.println("Worker: " + Thread.currentThread().getName());
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        DownloadTask task = new DownloadTask();
        Thread worker = new Thread(task, "Download-Worker");

        worker.start();
        System.out.println("Main method continues");
    }
}
```

Possible output:

```text
Main method continues
Downloading file...
Worker: Download-Worker
```

Here, `DownloadTask` describes the work, while `Thread` represents the thread that executes it. The second argument to the `Thread` constructor sets a readable thread name.

### 7.3 Which approach should you prefer?

| Extending `Thread` | Implementing `Runnable` |
|---|---|
| Your class becomes a subclass of `Thread` | Your class can extend another class |
| Task logic and thread object are combined | Task logic is separated from the thread object |
| Can be straightforward for a tiny demonstration | Often more flexible and reusable |
| A `Thread` object represents both the task and the thread | A `Runnable` represents the task; a `Thread` executes it |

In real applications, higher-level APIs such as executors and thread pools are often preferred over manually creating a new thread for every task. Those APIs are covered in later concurrency topics.

---

## 8. The Difference Between `start()` and `run()`

This is one of the most important concepts in Java multithreading.

- `start()` starts a new thread of execution. The JVM eventually calls that thread's `run()` method.
- `run()` is an ordinary method. Calling it directly does not start a new thread.

### Example

```java
class MyTask extends Thread {
    @Override
    public void run() {
        System.out.println("Executing on: "
                + Thread.currentThread().getName());
    }
}

public class StartVsRun {
    public static void main(String[] args) {
        MyTask task1 = new MyTask();
        task1.run();

        MyTask task2 = new MyTask();
        task2.start();
    }
}
```

Output:

```text
Executing on: main
Executing on: Thread-0
```

The exact generated thread name can vary, but the key distinction remains:

- `task1.run()` executes on the calling `main` thread.
- `task2.start()` creates a separate thread, which executes `run()`.

### Why can't we call `start()` twice on the same thread object?

A Java `Thread` object can be started only once. Attempting to start it again after it has already been started throws `IllegalThreadStateException`.

Incorrect:

```java
Thread t = new Thread(() -> System.out.println("Working"));
t.start();
t.start(); // Throws IllegalThreadStateException
```

If the same task needs to run again, create a new `Thread` object or submit the task again through an appropriate executor.

---

## 9. Thread Names and Current Thread

Thread names help make program output and debugging easier to understand.

```java
public class ThreadNameDemo {
    public static void main(String[] args) {
        Thread worker = new Thread(() -> {
            System.out.println(Thread.currentThread().getName());
        });

        worker.setName("Report-Worker");
        worker.start();

        System.out.println(Thread.currentThread().getName());
    }
}
```

Possible output:

```text
main
Report-Worker
```

The order can vary.

Useful methods include:

| Method | Purpose |
|---|---|
| `Thread.currentThread()` | Returns the currently executing thread |
| `getName()` | Returns a thread's name |
| `setName(String name)` | Changes a thread's name |
| `isAlive()` | Checks whether a thread has started and has not yet terminated |
| `getState()` | Returns the thread's current Java state |
| `isDaemon()` | Checks whether a thread is a daemon thread |
| `getPriority()` | Returns the thread priority |
| `setPriority(int priority)` | Requests a thread priority |

A thread's state can change between checking it and using the result. Do not treat a single `getState()` result as a reliable way to coordinate threads.

---

## 10. The Java Thread Lifecycle

A Java thread moves through states during its lifetime. The `Thread.State` enum defines six states:

1. `NEW`
2. `RUNNABLE`
3. `BLOCKED`
4. `WAITING`
5. `TIMED_WAITING`
6. `TERMINATED`

### 10.1 `NEW`

A `Thread` object has been created, but `start()` has not been called.

```java
Thread t = new Thread(() -> System.out.println("Hello"));
System.out.println(t.getState()); // NEW
```

### 10.2 `RUNNABLE`

The thread is eligible to run or is currently running. Java's `RUNNABLE` state includes both the ready-to-run condition and actual execution; Java does not expose a separate `RUNNING` state in `Thread.State`.

```java
Thread t = new Thread(() -> {
    System.out.println("Working");
});

t.start();
```

The thread may move quickly through states, so inspecting it at a particular instant can be timing-dependent.

### 10.3 `BLOCKED`

A thread is waiting to acquire a monitor lock so it can enter or re-enter a `synchronized` block or method.

For example, if one thread holds an object's monitor and another thread tries to enter a synchronized section using that same object, the second thread may become `BLOCKED`.

Locks and `synchronized` are discussed in the next chapter.

### 10.4 `WAITING`

A thread is waiting indefinitely for another thread or action to perform a particular event. Examples include:

- Calling `join()` without a timeout and waiting for another thread to finish.
- Calling `wait()` without a timeout on an object's monitor.

The thread can leave the state when the relevant event occurs, such as the other thread terminating or another thread notifying a waiting thread.

### 10.5 `TIMED_WAITING`

A thread waits for a limited amount of time. Examples include:

- `Thread.sleep(milliseconds)`
- `join(milliseconds)` with a positive timeout
- `wait(milliseconds)` with a positive timeout

The thread can become eligible to run again when the timeout expires or an applicable event occurs.

### 10.6 `TERMINATED`

The thread has finished executing its `run()` method, either normally or because an uncaught exception ended that thread.

A terminated thread cannot be restarted. Create a new thread object for a new execution.

### Lifecycle overview

```text
NEW
 |
 | start()
 v
RUNNABLE <---------------------------+
 |                                   |
 | tries to acquire a held lock      | lock becomes available
 v                                   |
BLOCKED -----------------------------+
 |
 | waiting for a signal/event
 v
WAITING
 |
 | timeout-based wait
 v
TIMED_WAITING
 |
 | run() completes
 v
TERMINATED
```

This is a simplified conceptual picture, not a complete state-transition diagram. `WAITING` and `TIMED_WAITING` are not necessarily reached from `BLOCKED`; threads can enter them through different operations. A thread can also move between `RUNNABLE` and waiting states many times before termination.

---

## 11. Using `Thread.sleep()`

`Thread.sleep()` pauses the **currently executing thread** for at least approximately the requested duration, subject to scheduling and operating-system timing.

```java
public class SleepExample {
    public static void main(String[] args) throws InterruptedException {
        for (int i = 1; i <= 3; i++) {
            System.out.println(i);
            Thread.sleep(1000);
        }

        System.out.println("Finished");
    }
}
```

Typical output, with about one second between numbers:

```text
1
2
3
Finished
```

The parameter is in milliseconds:

- `1000` milliseconds = 1 second.
- `500` milliseconds = half a second.
- `2000` milliseconds = 2 seconds.

`Thread.sleep()` can throw `InterruptedException`, so code must handle or declare it.

Important details:

- `sleep()` affects the thread that calls it.
- Sleeping does not release any monitor lock that the thread already holds.
- The requested time is not a guarantee that the thread resumes at the exact instant the duration ends.
- Avoid using `sleep()` as a synchronization mechanism. A fixed delay does not prove that another thread has finished its work.

---

## 12. Using `join()`

`join()` allows one thread to wait for another thread to finish.

Suppose the main thread starts a worker. If the main thread must print a final message only after the worker completes, it can call `join()`.

```java
class Worker extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println("Worker: " + i);
        }
    }
}

public class JoinExample {
    public static void main(String[] args) throws InterruptedException {
        Worker worker = new Worker();
        worker.start();

        worker.join();

        System.out.println("Worker has finished");
    }
}
```

Output:

```text
Worker: 1
Worker: 2
Worker: 3
Worker has finished
```

The worker's three messages appear before the final message because `main()` waits at `worker.join()` until `worker` terminates.

Common forms include:

```java
worker.join();       // Wait until worker finishes
worker.join(1000);   // Wait for up to about 1000 milliseconds
```

A timed `join()` can return because the thread finished or because the timeout elapsed. If you need to know whether the worker has finished after a timed join, check its status appropriately; do not assume that the timeout means completion.

Like `sleep()`, `join()` can throw `InterruptedException`.

---

## 13. Interrupting a Thread

An interrupt is a cooperative signal asking a thread to stop what it is doing or change its behavior. It is not a forceful command that automatically kills the thread.

Calling `interrupt()` can have different effects depending on what the target thread is doing:

- If it is sleeping, waiting, or joining, it will commonly receive `InterruptedException`, and its interrupted status is cleared when that exception is thrown.
- If it is not in an interruptible blocking operation, its interrupted status is set.
- The thread's code should decide how to respond.

### Example: Responding to an interrupt

```java
public class InterruptExample {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            try {
                while (!Thread.currentThread().isInterrupted()) {
                    System.out.println("Worker is working...");
                    Thread.sleep(300);
                }
            } catch (InterruptedException e) {
                // The sleep was interrupted. Restore the status because
                // this method is choosing to end after the interruption.
                Thread.currentThread().interrupt();
            }

            System.out.println("Worker is stopping");
        });

        worker.start();

        Thread.sleep(1000);
        worker.interrupt();
        worker.join();

        System.out.println("Main finished");
    }
}
```

Typical output:

```text
Worker is working...
Worker is working...
Worker is working...
Worker is working...
Worker is stopping
Main finished
```

The exact number of “working” messages can vary.

### Why restore the interrupt status?

When an interruptible blocking method throws `InterruptedException`, the thread's interrupt status is normally cleared. If the current method cannot fully handle the interruption and wants higher-level code to know about it, a common pattern is:

```java
catch (InterruptedException e) {
    Thread.currentThread().interrupt();
    return;
}
```

Another valid approach is to let the exception propagate when the method signature and program design allow it. The right response depends on the application.

Avoid swallowing interruption silently:

```java
catch (InterruptedException e) {
    // Bad practice if the interruption is ignored without a reason.
}
```

Also avoid deprecated forced-stop techniques such as `Thread.stop()`. They can leave shared data in an inconsistent state.

---

## 14. Thread Priorities

Java defines priorities from `Thread.MIN_PRIORITY` (1) to `Thread.MAX_PRIORITY` (10), with `Thread.NORM_PRIORITY` (5) as the default.

```java
Thread worker = new Thread(() -> {
    System.out.println("Task running");
});

worker.setPriority(Thread.MAX_PRIORITY);
worker.start();
```

Priority is a scheduling hint, not a guarantee. A high-priority thread is not guaranteed to finish first, and code must never rely on priority to ensure correctness. Scheduling behavior can vary across JVM implementations and operating systems.

Use proper coordination mechanisms when the order of operations matters.

---

## 15. Daemon Threads

A **daemon thread** is a background thread that does not, by itself, prevent the JVM from exiting once all remaining threads are non-daemon threads.

```java
public class DaemonExample {
    public static void main(String[] args) throws InterruptedException {
        Thread background = new Thread(() -> {
            while (true) {
                System.out.println("Background task");
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
        });

        background.setDaemon(true); // Must be called before start()
        background.start();

        Thread.sleep(1200);
        System.out.println("Main is finishing");
    }
}
```

The JVM may exit after the main thread finishes, even if the daemon thread would otherwise continue its loop. Therefore, the last few background messages are not guaranteed to appear.

Important rules:

- Call `setDaemon(true)` before `start()`.
- Calling `setDaemon()` after the thread has started throws `IllegalThreadStateException`.
- Daemon threads are suitable for some background support tasks, but do not use them for work that must be completed or saved reliably before shutdown.
- Daemon status does not mean “low priority” and does not automatically make code thread-safe.

---

## 16. Race Conditions: A First Look

Threads in the same process can access shared objects. If several threads update shared mutable data without appropriate coordination, their operations can interfere with one another.

This can create a **race condition**: the result depends on the timing or interleaving of operations.

Consider a counter:

```java
class Counter {
    int count = 0;

    void increment() {
        count++;
    }
}
```

It may appear that `count++` simply adds one. However, it is a read-modify-write operation: conceptually, it reads the current value, calculates a new value, and writes it back. If two threads perform these steps at overlapping times, an update can be lost.

### Example of the problem

```java
class Counter {
    int count = 0;

    void increment() {
        count++;
    }
}

public class RaceConditionDemo {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Runnable task = () -> {
            for (int i = 0; i < 100_000; i++) {
                counter.increment();
            }
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Expected: 200000");
        System.out.println("Actual: " + counter.count);
    }
}
```

The expected value is `200000`, but the actual value may be lower. It might occasionally appear correct by chance; one correct run does not prove the code is thread-safe.

The fix is not to add a random delay. The program needs a proper thread-safety strategy, such as `synchronized`, a lock, or an atomic variable. These approaches are covered in the next chapter.

---

## 17. A Practical Example: Two Threads Doing Different Work

This example shows two independent tasks running concurrently.

```java
public class TwoTasksExample {
    public static void main(String[] args) throws InterruptedException {
        Runnable numbers = () -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("Numbers: " + i);
            }
        };

        Runnable letters = () -> {
            for (char ch = 'A'; ch <= 'E'; ch++) {
                System.out.println("Letters: " + ch);
            }
        };

        Thread numberThread = new Thread(numbers, "Number-Thread");
        Thread letterThread = new Thread(letters, "Letter-Thread");

        numberThread.start();
        letterThread.start();

        numberThread.join();
        letterThread.join();

        System.out.println("Both tasks are complete");
    }
}
```

The output might interleave like this:

```text
Numbers: 1
Letters: A
Numbers: 2
Letters: B
Letters: C
Numbers: 3
Numbers: 4
Letters: D
Numbers: 5
Letters: E
Both tasks are complete
```

Your output may be different. The only guaranteed ordering here is that the final message appears after both `join()` calls return, which means both worker threads have finished.

---

## 18. Common Mistakes to Avoid

1. **Calling `run()` when you intend to start a new thread.** Call `start()` to begin a separate thread of execution.
2. **Starting the same `Thread` object twice.** A thread object can be started only once.
3. **Assuming a fixed output order.** Concurrent threads may interleave differently across runs.
4. **Using `sleep()` to “make sure” another thread has finished.** Use coordination such as `join()` or suitable synchronization instead.
5. **Ignoring `InterruptedException`.** Handle it thoughtfully, propagate it, or restore the interrupt status when appropriate.
6. **Assuming thread priority guarantees order.** It does not.
7. **Assuming `count++` is thread-safe.** It is not atomic for an ordinary shared integer.
8. **Doing essential work in a daemon thread and expecting it to finish.** The JVM can exit without waiting for daemon threads.
9. **Reading a thread's state as if it were permanent.** Thread states can change immediately.
10. **Creating unlimited threads for every task.** Large numbers of threads can consume memory and scheduling resources; thread pools are often more suitable for repeated work.

---

## 19. Interview Questions and Answers

### Q1. What is a thread?

A thread is an execution path within a process. Multiple threads in one process share heap objects but have separate execution stacks.

### Q2. What is multithreading?

Multithreading is the use of multiple threads within a process so that tasks can make progress concurrently and, where supported, execute in parallel.

### Q3. What is the difference between a process and a thread?

A process is a running program instance with its own address space and resources. A thread is an execution path inside a process. Threads in the same process commonly share memory.

### Q4. What is the difference between concurrency and parallelism?

Concurrency means tasks are in progress over overlapping periods. Parallelism means tasks execute at the same time.

### Q5. How can you create a thread in Java?

Traditional approaches include extending `Thread` and implementing `Runnable`. In many applications, executors provide a more scalable way to manage tasks.

### Q6. Which is usually more flexible: extending `Thread` or implementing `Runnable`?

Implementing `Runnable` separates task logic from the thread object and allows the class to extend another class. It is therefore often more flexible.

### Q7. What is the difference between `start()` and `run()`?

`start()` begins a new thread of execution and the JVM invokes its `run()` method. Calling `run()` directly is just a normal method call on the current thread.

### Q8. Can a Java thread be started twice?

No. Calling `start()` a second time on the same `Thread` object throws `IllegalThreadStateException`.

### Q9. What are the six Java thread states?

`NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TIMED_WAITING`, and `TERMINATED`.

### Q10. Is `RUNNING` a value of `Thread.State`?

No. Java represents both ready-to-run and currently running threads using `RUNNABLE`.

### Q11. What does `Thread.sleep()` do?

It pauses the currently executing thread for a requested duration, subject to scheduling. It can throw `InterruptedException` and does not release any monitor locks held by the thread.

### Q12. What does `join()` do?

It allows the calling thread to wait for another thread to terminate. A timed `join()` waits for at most the specified time.

### Q13. What is an interrupt?

An interrupt is a cooperative signal to a thread. The thread's code decides how to respond; `interrupt()` does not automatically kill the thread.

### Q14. What is a daemon thread?

A daemon thread is a background thread that does not prevent JVM shutdown once all non-daemon threads have ended. Set daemon status before starting the thread.

### Q15. What is a race condition?

A race condition occurs when the result depends on timing or interleaving between concurrent operations. Unsynchronized updates to shared mutable data are a common cause.

### Q16. Does using multiple threads always improve performance?

No. Threads have overhead, and some tasks cannot be usefully parallelized. Coordination and contention can even make a multithreaded program slower.

### Q17. Does `sleep()` release a lock?

No. `Thread.sleep()` does not release monitor locks held by the sleeping thread.

### Q18. Are thread priorities guaranteed to determine execution order?

No. Priorities are scheduling hints, and behavior can vary across systems.

---

## 20. Practice Exercises

Try to solve these without immediately checking the examples above.

1. Create a class that extends `Thread` and prints numbers from 1 to 10.
2. Create the same program using `Runnable`.
3. Give your thread the name `File-Downloader` and print that name from inside `run()`.
4. Create two threads: one prints even numbers and the other prints odd numbers. Observe how the output changes across runs.
5. Use `join()` so the main thread prints `All tasks completed` only after two worker threads finish.
6. Create a thread that sleeps for two seconds and then prints a message. Handle `InterruptedException` correctly.
7. Write a worker that responds to an interrupt and terminates cooperatively.
8. Print a newly created thread's state before starting it, while it is running if you can observe it, and after it terminates. Remember that intermediate states are timing-dependent.
9. Create a daemon thread and observe what happens when the main thread ends. Do not rely on the exact number of printed messages.
10. Run the shared-counter example multiple times. Explain why an incorrect result indicates a race condition and why a correct result in one run is not proof of safety.

### Suggested challenge

Write a program that starts three named worker threads. Each worker prints its name and five messages. Make the main thread wait for all three workers before printing `Program completed`.

**Hint:** Create an array or list of `Thread` objects, call `start()` on each thread, and then call `join()` on each thread.

---

## 21. Chapter Summary

A thread is an execution path inside a process. Java starts a main thread to execute a typical application's `main()` method, and additional threads can be created to perform work concurrently.

The two traditional thread-creation approaches are extending `Thread` and implementing `Runnable`. Implementing `Runnable` often gives better separation between a task and the thread that runs it. Remember the central distinction: `start()` starts a new thread, while a direct call to `run()` does not.

Java defines six thread states: `NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TIMED_WAITING`, and `TERMINATED`. The `sleep()` method pauses the current thread, `join()` waits for another thread to finish, and `interrupt()` provides a cooperative signal. Thread priorities do not guarantee execution order, and daemon threads do not keep the JVM alive by themselves.

Finally, concurrent threads may share and modify the same objects. Without proper coordination, updates can be lost and race conditions can occur. Understanding synchronization and thread-safe data structures is the next step.

**Next chapter:** Chapter 46 — Synchronization, Race Conditions, `synchronized`, `volatile`, and Locks.
