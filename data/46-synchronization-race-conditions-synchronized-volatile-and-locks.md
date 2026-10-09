# Chapter 46: Synchronization, Race Conditions, `synchronized`, `volatile`, and Locks

## 1. Learning Objectives

By the end of this chapter, you will understand:

- Why multithreaded programs need synchronization.
- What a race condition and a critical section are.
- How Java's `synchronized` methods and blocks work.
- The difference between object-level and class-level locks.
- What `volatile` guarantees—and what it does not guarantee.
- How to use atomic classes such as `AtomicInteger`.
- How explicit locks, especially `ReentrantLock`, work.
- What deadlock is and how to reduce its risk.
- How to choose an appropriate thread-safety technique.

This chapter builds on Chapter 45. The key idea is that starting multiple threads is only part of multithreading; we must also control how those threads interact with shared data.

---

## 2. Why Is Synchronization Needed?

Threads inside one Java process can share objects in heap memory. This makes it easy for threads to communicate, but it can cause problems when several threads access and modify the same data.

Consider a shared bank account. Two threads try to withdraw money at almost the same time. Each thread checks the balance, decides the withdrawal is allowed, and updates the balance. If their operations overlap without coordination, both might make decisions based on the same old balance.

**Synchronization** is a way to coordinate access to shared data so operations happen under the rules required by the program.

Synchronization can help provide:

1. **Mutual exclusion:** Only one thread at a time enters a particular protected critical section using the same lock.
2. **Visibility:** Changes made by one thread become visible to another thread under the Java Memory Model's synchronization rules.
3. **Ordering guarantees:** Certain operations are ordered relative to one another.

Synchronization does not mean that the entire program becomes single-threaded. It protects particular operations or sections of code.

---

## 3. Race Condition

A **race condition** occurs when a program's result depends on the timing or interleaving of concurrent operations.

Consider this class:

```java
class Counter {
    int count = 0;

    void increment() {
        count++;
    }
}
```

The statement `count++` is not an atomic operation for an ordinary integer. Conceptually, it performs several steps:

1. Read the current value.
2. Calculate the value plus one.
3. Write the new value.

If two threads read the same value before either writes the updated value, one increment can be lost.

For example, suppose `count` is `10`:

| Step | Thread A | Thread B |
|---|---|---|
| 1 | Reads `10` | |
| 2 | | Reads `10` |
| 3 | Calculates `11` | |
| 4 | | Calculates `11` |
| 5 | Writes `11` | |
| 6 | | Writes `11` |

The final value is `11`, although two increments were attempted. The expected value was `12`.

This is a simplified illustration of one possible interleaving. The Java language does not promise that unsynchronized threads will execute in a particular order.

---

## 4. Critical Section

A **critical section** is a portion of code that accesses shared state and must obey a coordination rule.

For example:

```java
balance = balance - amount;
```

If multiple threads can update the same account, the update may need protection. Often, the check and update must be protected together:

```java
if (balance >= amount) {
    balance = balance - amount;
}
```

Protecting only the final assignment would not be sufficient if another thread could change the balance between the check and the update.

A good critical section should generally be as small as practical while still protecting the complete operation. Avoid holding a lock while performing slow network requests or other unnecessary work.

---

## 5. The `synchronized` Keyword

Java's `synchronized` keyword uses an object's monitor lock to coordinate access. A thread must acquire the appropriate monitor before entering a synchronized section. Other threads attempting to acquire the same monitor must wait until it becomes available.

Java supports synchronized methods and synchronized blocks.

### 5.1 Synchronized instance method

```java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}
```

When a thread calls `increment()` on a particular `Counter` object, it must acquire that object's monitor lock. Another thread calling a synchronized instance method on the **same object** must wait until the lock is released.

When the synchronized method returns or exits by throwing an exception, the monitor is released automatically.

### 5.2 Complete counter example

```java
class SafeCounter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

public class SynchronizedCounterDemo {
    public static void main(String[] args) throws InterruptedException {
        SafeCounter counter = new SafeCounter();

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
        System.out.println("Actual: " + counter.getCount());
    }
}
```

Output:

```text
Expected: 200000
Actual: 200000
```

Why does this work?

- Both threads share the same `SafeCounter` object.
- `increment()` is synchronized, so only one thread at a time can execute that method on this object.
- `join()` makes the main thread wait for both worker threads to finish before it reads the result.
- `getCount()` is synchronized too, so its read is coordinated with synchronized updates.

The result is reliable for this example because every increment is protected by the same monitor and the main thread waits for both workers to finish.

### 5.3 Important detail: same object, same lock

These two calls use the same monitor only if `counterA` and `counterB` refer to the same object:

```java
counterA.increment();
counterB.increment();
```

If `counterA` and `counterB` are two different `Counter` objects, each has its own instance monitor. Synchronizing an instance method does not globally lock every object of that class.

---

## 6. Synchronized Blocks

A synchronized block lets you choose the exact object to lock and the code protected by that lock.

Syntax:

```java
synchronized (lockObject) {
    // Protected code
}
```

Example:

```java
class Counter {
    private int count = 0;
    private final Object lock = new Object();

    public void increment() {
        synchronized (lock) {
            count++;
        }
    }

    public int getCount() {
        synchronized (lock) {
            return count;
        }
    }
}
```

The block protects the shared counter with the `lock` object's monitor.

### Why use a synchronized block?

A synchronized block can protect only the critical section instead of locking for the entire method. This can improve concurrency when the rest of the method does not need the lock.

For example:

```java
public void process() {
    // Independent work can happen outside the lock.

    synchronized (lock) {
        // Access shared state safely.
    }

    // More independent work can happen outside the lock.
}
```

Keep the lock object private and stable. Do not synchronize on public objects, string literals, or objects that unrelated code might also lock, because that can create unexpected contention or deadlocks.

---

## 7. Instance Locks vs. Class Locks

### 7.1 Instance synchronized method

```java
public synchronized void instanceMethod() {
    // Uses this object's monitor.
}
```

The lock is `this`—the current object instance.

Two threads calling this method on the same object must coordinate. Calls on separate instances can proceed independently, assuming no other shared lock or state forces them to coordinate.

### 7.2 Static synchronized method

```java
class Example {
    public static synchronized void classMethod() {
        System.out.println("Class-level lock");
    }
}
```

A static synchronized method locks the monitor associated with the class's `Class` object. For `Example`, that is conceptually `Example.class`.

It is similar to:

```java
class Example {
    public static void classMethod() {
        synchronized (Example.class) {
            System.out.println("Class-level lock");
        }
    }
}
```

An instance synchronized method and a static synchronized method use different monitors: `this` versus the class object. One does not automatically block the other.

---

## 8. Visibility and the Java Memory Model

A multithreaded program needs more than protection against simultaneous updates. It also needs reliable rules for when changes made by one thread become visible to another.

The **Java Memory Model (JMM)** defines the rules governing visibility and ordering between threads.

Without appropriate synchronization, one thread may not observe another thread's update when expected. The compiler, JVM, and processor may perform optimizations that are valid under the memory model but surprising if the program relies on unsynchronized shared state.

Java synchronization constructs, volatile variables, and certain concurrent utilities provide memory-visibility guarantees.

### A visibility problem

```java
class Worker {
    boolean running = true;

    void work() {
        while (running) {
            // Do work.
        }
    }

    void stop() {
        running = false;
    }
}
```

If one thread runs `work()` while another calls `stop()`, the loop's visibility and termination behavior are not guaranteed by this code. The program has an unsynchronized data race on `running`.

A common fix for a simple status flag is `volatile`, shown next. If the state involves several fields or a multi-step invariant, synchronization or another coordination mechanism may be necessary.

---

## 9. The `volatile` Keyword

The `volatile` keyword provides visibility and ordering guarantees for reads and writes of a field. When one thread writes a volatile variable, a subsequent read of that same variable by another thread can observe the update according to the Java Memory Model.

Example:

```java
class Worker {
    private volatile boolean running = true;

    public void work() {
        while (running) {
            // Do work while the flag is true.
        }

        System.out.println("Worker stopped");
    }

    public void stop() {
        running = false;
    }
}
```

The volatile flag is suitable here because the shared state is a simple boolean used as a stop signal. The worker repeatedly reads the flag, and another thread changes it.

### What `volatile` does not do

`volatile` does **not** make every operation involving the variable atomic.

For example:

```java
volatile int count = 0;

void increment() {
    count++;
}
```

This is still unsafe when multiple threads call `increment()` concurrently. The `count++` operation is a read-modify-write sequence, not one indivisible operation. `volatile` makes individual reads and writes visible, but it does not make the whole increment atomic.

Use `synchronized`, a lock, or `AtomicInteger` when multiple threads need to update a counter safely.

### `volatile` vs. `synchronized`

| Feature | `volatile` | `synchronized` |
|---|---|---|
| Visibility | Provides visibility guarantees for the field | Provides visibility guarantees through monitor acquire/release |
| Mutual exclusion | No | Yes, for code protected by the same monitor |
| Atomic `count++` | No | Yes, if the increment is protected consistently |
| Best suited for | Simple flags or independent state with suitable access patterns | Critical sections and compound operations |
| Blocking | Does not block for a monitor lock | A thread may wait to acquire the monitor |

Choose based on the operation you need to make safe, not simply because one keyword looks shorter.

---

## 10. Atomic Classes

Java provides atomic classes in `java.util.concurrent.atomic`. They support thread-safe operations on individual values without requiring you to write an explicit synchronized block for every operation.

A commonly used class is `AtomicInteger`.

```java
import java.util.concurrent.atomic.AtomicInteger;

public class AtomicCounterDemo {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger count = new AtomicInteger(0);

        Runnable task = () -> {
            for (int i = 0; i < 100_000; i++) {
                count.incrementAndGet();
            }
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println(count.get());
    }
}
```

Output:

```text
200000
```

Useful `AtomicInteger` methods:

| Method | Meaning |
|---|---|
| `get()` | Reads the current value |
| `set(value)` | Sets the value |
| `incrementAndGet()` | Increments and returns the new value |
| `getAndIncrement()` | Returns the old value, then increments |
| `decrementAndGet()` | Decrements and returns the new value |
| `addAndGet(delta)` | Adds a value and returns the new value |
| `compareAndSet(expected, update)` | Updates only if the current value matches the expected value |

### `incrementAndGet()` vs. `getAndIncrement()`

```java
AtomicInteger number = new AtomicInteger(5);

int a = number.incrementAndGet(); // a = 6, number = 6
int b = number.getAndIncrement(); // b = 6, number = 7
```

The first method returns the updated value. The second returns the previous value.

Atomic classes are useful for independent atomic operations on one variable. If an operation must update several fields together while maintaining a relationship between them, a lock or another design may be needed.

---

## 11. Explicit Locks: `ReentrantLock`

Java's `java.util.concurrent.locks` package provides explicit locking tools. `ReentrantLock` is a lock that a thread can acquire more than once; it tracks how many times the owning thread has acquired it.

Unlike a synchronized block, a `ReentrantLock` must be released explicitly. Therefore, put `unlock()` in a `finally` block to ensure that the lock is released even if an exception occurs.

```java
import java.util.concurrent.locks.ReentrantLock;

class SafeCounter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();

    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }

    public int getCount() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }
}
```

### How it works

1. `lock.lock()` attempts to acquire the lock. If another thread owns it, the current thread waits.
2. The `try` block contains the protected operation.
3. The `finally` block runs whether the operation completes normally or throws an exception.
4. `lock.unlock()` releases the lock.

Forgetting to unlock can prevent other threads from progressing.

### Why use `ReentrantLock` instead of `synchronized`?

`ReentrantLock` offers additional capabilities, including:

- `tryLock()` to attempt to acquire a lock without waiting indefinitely.
- `tryLock(timeout, unit)` to wait for a limited time.
- `lockInterruptibly()` to allow waiting for a lock to be interrupted.
- Optional fairness policy when constructed with `new ReentrantLock(true)`.
- Multiple `Condition` objects for more advanced waiting and signaling.

These features can be useful, but they also introduce more responsibility. For straightforward mutual exclusion, `synchronized` is often simpler and less error-prone.

### Try a lock without waiting forever

```java
if (lock.tryLock()) {
    try {
        // Perform the protected operation.
    } finally {
        lock.unlock();
    }
} else {
    // The lock was unavailable; choose another action.
}
```

Only call `unlock()` when your thread successfully acquired the lock. In production code, define clearly what the program should do when `tryLock()` fails.

---

## 12. Deadlock

A **deadlock** occurs when two or more threads wait forever for resources held by one another.

Imagine two threads and two locks:

- Thread A holds Lock 1 and waits for Lock 2.
- Thread B holds Lock 2 and waits for Lock 1.
- Neither can continue because each waits for the other.

### Illustrative example

```java
public class DeadlockDemo {
    private static final Object LOCK1 = new Object();
    private static final Object LOCK2 = new Object();

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            synchronized (LOCK1) {
                System.out.println("Thread 1 acquired LOCK1");

                synchronized (LOCK2) {
                    System.out.println("Thread 1 acquired LOCK2");
                }
            }
        });

        Thread t2 = new Thread(() -> {
            synchronized (LOCK2) {
                System.out.println("Thread 2 acquired LOCK2");

                synchronized (LOCK1) {
                    System.out.println("Thread 2 acquired LOCK1");
                }
            }
        });

        t1.start();
        t2.start();
    }
}
```

This program illustrates a possible deadlock, but it will not deadlock on every run. If each thread acquires both locks before the other thread acquires the first lock, it may finish. If they acquire the locks in opposite order and each holds one, they can deadlock.

Do not use this example in a program you need to terminate normally; a deadlocked process may remain stuck.

### How to reduce deadlock risk

1. **Use a consistent lock order.** If all threads acquire Lock 1 before Lock 2, the circular wait in this example is avoided.
2. **Keep critical sections small.** Avoid unnecessary work while holding locks.
3. **Avoid nested locks when possible.** Simpler locking designs are easier to reason about.
4. **Use timed or non-blocking acquisition when appropriate.** `tryLock()` can support recovery strategies, but the overall design still matters.
5. **Do not call unknown or slow external code while holding a lock.** It may try to acquire other locks or wait for long periods.

Deadlock is one reason thread-safe code requires careful design rather than simply adding `synchronized` everywhere.

---

## 13. Choosing the Right Technique

| Requirement | Common choice | Why |
|---|---|---|
| Protect a small critical section | `synchronized` block | Simple mutual exclusion and visibility |
| Protect an instance method | `synchronized` method | Clear and concise monitor-based protection |
| Share a simple stop flag | `volatile boolean` | Visible reads and writes without a lock |
| Count independent concurrent increments | `AtomicInteger` | Atomic increment operations |
| Need timed or interruptible lock acquisition | `ReentrantLock` | Offers more lock-control methods |
| Coordinate many tasks and manage worker threads | Executor framework | Separates task submission from thread management |
| Store shared data in a concurrent map | `ConcurrentHashMap` | Provides thread-safe map operations |

No one tool solves every concurrency problem. Choose the simplest tool that correctly protects the full operation and its invariants.

---

## 14. Common Mistakes

1. **Making only a getter synchronized and leaving updates unprotected.** The update operation itself must be coordinated.
2. **Using different locks for the same shared data.** Synchronization works only when the relevant threads coordinate using the same lock.
3. **Assuming `volatile` makes `count++` atomic.** It does not.
4. **Locking on public objects or string literals.** Unrelated code may acquire the same monitor and cause unexpected blocking.
5. **Forgetting `unlock()` with `ReentrantLock`.** Put it in `finally`.
6. **Acquiring locks in inconsistent orders.** This can create deadlocks.
7. **Keeping a lock held during slow work.** This increases contention and can block unrelated tasks.
8. **Using `sleep()` to solve a race condition.** Delays do not guarantee correctness.
9. **Assuming one successful test proves thread safety.** Race conditions can be timing-dependent.
10. **Synchronizing unrelated operations on one global lock.** This can unnecessarily reduce concurrency.
11. **Assuming an atomic variable makes a whole multi-step business operation atomic.** Atomicity applies to the supported operation, not automatically to a sequence of separate calls.

---

## 15. Interview Questions and Answers

### Q1. What is synchronization in Java?

Synchronization coordinates access to shared resources. With `synchronized`, threads use a monitor lock to provide mutual exclusion and memory-visibility guarantees.

### Q2. What is a race condition?

A race condition occurs when the result depends on the timing or interleaving of concurrent operations, often because shared mutable data is accessed without adequate coordination.

### Q3. What is a critical section?

A critical section is code that accesses shared state and must be protected by an appropriate coordination mechanism.

### Q4. What lock does a synchronized instance method use?

It uses the monitor associated with the current object, `this`.

### Q5. What lock does a static synchronized method use?

It uses the monitor associated with that class's `Class` object, such as `Example.class`.

### Q6. Can two threads execute synchronized instance methods at the same time?

They cannot simultaneously hold the same object's monitor. However, they may execute synchronized instance methods at the same time if they are locking different object instances.

### Q7. What is the difference between a synchronized method and a synchronized block?

A synchronized method protects the method body using its associated monitor. A synchronized block lets the programmer choose a specific lock object and limit the protected region.

### Q8. What does `volatile` guarantee?

It provides visibility and ordering guarantees for accesses to a volatile field under the Java Memory Model. It does not provide mutual exclusion for compound operations.

### Q9. Why is `volatile int count` not enough for `count++`?

The increment is a read-modify-write operation. Two threads can read the same value and overwrite each other's updates. Use synchronization or an atomic increment operation.

### Q10. What is `AtomicInteger`?

It is a class in `java.util.concurrent.atomic` that supports atomic operations on an integer, such as `incrementAndGet()` and `compareAndSet()`.

### Q11. What is the difference between `incrementAndGet()` and `getAndIncrement()`?

`incrementAndGet()` increments first and returns the new value. `getAndIncrement()` returns the old value and then increments.

### Q12. What is `ReentrantLock`?

It is an explicit lock implementation that supports reentrant acquisition and features such as timed acquisition, interruptible acquisition, and optional fairness.

### Q13. Why should `unlock()` be called in a `finally` block?

The `finally` block ensures the lock is released even if an exception occurs in the protected code, provided the current thread acquired the lock.

### Q14. What is deadlock?

Deadlock occurs when threads wait indefinitely for resources held by one another, preventing them from making progress.

### Q15. How can deadlock be reduced?

Use a consistent lock order, minimize nested locks, keep critical sections small, and consider timed or non-blocking lock acquisition when suitable.

### Q16. Is `synchronized` always slower than `ReentrantLock`?

There is no universal rule. Performance depends on the workload, JVM, and contention. Choose based on required semantics and maintainability, then measure if performance matters.

### Q17. Does `synchronized` guarantee a particular order between waiting threads?

No. It guarantees monitor-based mutual exclusion and visibility rules, but does not promise a general FIFO order for waiting threads.

### Q18. Can a thread enter a synchronized method recursively on the same object?

Yes. Java monitor locks are reentrant: a thread that already owns the monitor can acquire it again. The lock is released when the corresponding synchronized entries have exited.

---

## 16. Practice Exercises

1. Create a counter shared by two threads. First run it without synchronization, then protect `increment()` with `synchronized`. Compare the results.
2. Write a bank account class with a `withdraw()` method. Protect the balance check and deduction as one critical section.
3. Create a class with a synchronized instance method and demonstrate that two threads using the same instance must coordinate.
4. Create two separate instances and observe that their instance locks are independent.
5. Create a static synchronized method and explain why it uses a different monitor from an instance synchronized method.
6. Implement a stop flag using `volatile boolean`. Start a worker loop and stop it from another thread.
7. Replace a shared integer counter with `AtomicInteger`. Compare `incrementAndGet()` and `getAndIncrement()`.
8. Use `ReentrantLock` to protect a counter. Ensure the lock is released in `finally`.
9. Use `tryLock()` and define what your program does when the lock is unavailable.
10. Study the deadlock example. Change both threads to acquire locks in the same order and explain why this removes the specific circular-wait scenario.
11. Explain why adding `Thread.sleep(100)` does not make an unsafe shared counter thread-safe.
12. Design a small example where a multi-step operation requires a lock rather than merely a volatile field.

### Suggested challenge: Thread-safe bank account

Create a `BankAccount` class with a private balance and methods to deposit, withdraw, and read the balance. Multiple threads should perform deposits and withdrawals on the same account. Ensure that the balance check and update are coordinated together, and never allow a withdrawal to succeed if the available balance is insufficient.

Test your class with multiple threads. Use `join()` before checking the final balance. Explain which data is shared and which lock protects the account's invariant.

---

## 17. Chapter Summary

Multithreaded programs need a clear strategy for shared data. A race condition can occur when operations overlap in an unsafe way, and a critical section is the portion of code that needs protection.

Java's `synchronized` keyword uses monitor locks. Synchronized instance methods use the current object's monitor, while static synchronized methods use the class object's monitor. Synchronized blocks let you protect a smaller section using a chosen lock.

`volatile` provides visibility and ordering guarantees for a field, but it does not make compound operations such as `count++` atomic. `AtomicInteger` is useful for individual atomic numeric updates. `ReentrantLock` offers additional locking capabilities but must be released carefully, usually in a `finally` block.

Deadlocks can happen when threads wait for resources held by one another. Consistent lock ordering, small critical sections, and simple locking designs help reduce the risk.

The most important rule is to protect the **whole logical operation** that must remain consistent. Do not choose a concurrency tool just because it appears to fix one test run; understand the guarantees it provides.

**Next chapter:** Chapter 47 — ExecutorService, Thread Pools, Callable, Future, and Asynchronous Task Management.
