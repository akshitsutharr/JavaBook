# Chapter 49: Java Virtual Machine (JVM), Memory Areas, Garbage Collection, and Performance Basics

## 1. Learning Objectives

By the end of this chapter, you will understand the roles of the JDK, JRE, and JVM; how Java source code becomes bytecode; how a Java program executes; the main JVM memory areas; stack versus heap; garbage collection and reachability; common memory problems; basic JVM options; and practical performance principles.

This chapter explains what happens behind the Java code you write. You do not need to know every JVM implementation detail to become a good Java developer, but these fundamentals help you debug memory problems and understand performance.

## 2. JDK, JRE, and JVM

**JVM (Java Virtual Machine):** The runtime engine that loads and executes Java bytecode. It also manages runtime memory and supports garbage collection.

**JRE (Java Runtime Environment):** Conceptually, the JVM plus the libraries and other components needed to run Java applications. Modern Java distributions do not always provide a separately installed JRE package.

**JDK (Java Development Kit):** The development package containing tools such as the Java compiler, along with runtime components needed to develop and run Java programs.

| Component | Main purpose | Example |
|---|---|---|
| JVM | Executes Java bytecode | Runtime engine |
| JRE | Provides an environment to run Java applications | JVM and runtime libraries |
| JDK | Develops, compiles, and runs Java applications | `javac`, `java`, development tools |

A simple way to remember it: if you only need to run an application, you need a suitable Java runtime; if you want to write and compile Java code, you need a JDK.

Check your installation:

```bash
java -version
javac -version
```

`java` reports the runtime version. `javac` reports the compiler version; if `javac` is not found, a JDK may not be installed or configured on your PATH.

## 3. How Java Code Executes

Java generally follows this process:

1. Write source code in a `.java` file.
2. Compile it using `javac`.
3. The compiler produces bytecode in a `.class` file.
4. The JVM loads the required classes.
5. The bytecode is verified and linked as needed.
6. The JVM executes the program, using interpretation and/or just-in-time compilation depending on implementation and runtime behavior.

Example, `Hello.java`:

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

Compile and run:

```bash
javac Hello.java
java Hello
```

Output:

```text
Hello, Java!
```

The `.class` file contains Java bytecode, not the original source code and not necessarily native machine instructions for one specific processor.

Java is called platform-independent because the same bytecode can usually run on different operating systems and processor architectures when a compatible JVM is available. However, applications can still depend on native libraries, operating-system behavior, file paths, encodings, or other platform-specific features.

## 4. What Happens Inside the JVM?

A simplified JVM architecture includes:

- **Class loader subsystem:** Finds and loads class definitions.
- **Bytecode verification and linking:** Checks class-file correctness and prepares classes for execution.
- **Runtime data areas:** Provide memory used by threads and objects.
- **Execution engine:** Executes bytecode and may compile frequently executed code into native machine code.
- **Garbage collector:** Reclaims heap memory occupied by unreachable objects.
- **Native interface and libraries:** Allow Java code and the JVM to interact with native code when needed.

The exact implementation varies between JVMs. HotSpot, for example, uses interpretation and just-in-time (JIT) compilation strategies to optimize frequently executed code.

An interpreter executes bytecode instructions. A JIT compiler can compile frequently executed code into native machine code. Compilation has a cost but may improve performance for code that runs repeatedly. Modern JVMs combine techniques rather than relying exclusively on one approach.

## 5. JVM Runtime Memory Areas

The JVM uses several runtime memory areas. Some are shared by threads, while others are private to each thread.

### 5.1 Heap

The **heap** is the main runtime area from which objects and arrays are allocated. It is shared among Java threads.

```java
Student student = new Student();
```

The object created by `new Student()` is normally allocated on the heap, although a JIT compiler may optimize allocations in ways that make physical implementation more complicated than the source code suggests.

The variable `student` is a reference variable. If it is local, the variable belongs to the executing method's stack frame, while the object it refers to is normally on the heap.

### 5.2 Java stack

Each Java thread has its own JVM stack. The stack contains frames for method invocations. A frame stores information such as local variables, intermediate computation state, and data needed to return from a method.

```java
public class StackDemo {
    static void greet() {
        int number = 10;
        System.out.println(number);
    }

    public static void main(String[] args) {
        greet();
    }
}
```

When `main()` calls `greet()`, a frame for `greet()` is created for that invocation. When the method returns, its frame is removed.

A stack overflow can occur if the stack is exhausted, commonly because of excessively deep or infinite recursion:

```java
static void repeat() {
    repeat();
}
```

### 5.3 Method area and class metadata

The JVM specification describes a method area for per-class structures, runtime constant pools, method data, and other class-related information. The physical implementation is JVM-dependent.

In HotSpot, much class metadata is stored in **Metaspace**, which is native memory rather than the ordinary Java heap. Static fields and class-related structures have implementation details that should not be oversimplified into “everything static lives in the method area.”

### 5.4 Program counter (PC) register

Each JVM thread has its own program counter register, which tracks the location of the current JVM instruction. Its exact meaning for native methods differs from ordinary bytecode execution.

### 5.5 Native method stack

JVM implementations may use native stacks to support native methods and runtime operations. The specification allows implementation flexibility in this area.

### Heap vs. stack

| Feature | Heap | Java stack |
|---|---|---|
| Main purpose | Objects and arrays | Method-call frames and local execution data |
| Shared or per-thread | Shared across threads | Each thread has its own stack |
| Managed by | JVM allocation and garbage collection | Frames are created and removed as methods are called and return |
| Typical issue | Memory pressure, memory leaks, `OutOfMemoryError` | Deep recursion or excessive stack use, `StackOverflowError` |

Do not interpret this table as saying every local value is always physically stored in a stack slot. JIT optimizations may keep values in registers or eliminate allocations when allowed.

## 6. A Simple Memory Example

```java
class Student {
    String name;
}

public class MemoryExample {
    public static void main(String[] args) {
        int age = 21;
        Student student = new Student();
        student.name = "Riya";

        System.out.println(age);
        System.out.println(student.name);
    }
}
```

Output:

```text
21
Riya
```

Conceptually, `age` is a local primitive variable associated with the `main()` stack frame; `student` is a local reference variable; the `Student` object is normally allocated on the heap; and the `name` field stores a reference to a `String` object. String literals are interned by Java.

This is a conceptual model. The JVM may optimize physical storage while preserving observable program behavior.

## 7. What Is Garbage Collection?

**Garbage collection (GC)** is the JVM's process for reclaiming heap memory occupied by objects that are no longer reachable by the running program.

```java
Student student = new Student();
student = null;
```

After `student` is assigned `null`, that variable no longer refers to the object. If no other live reference can reach the object, it may become eligible for garbage collection.

**Eligible for garbage collection does not mean collected immediately.** The JVM decides when and how to perform collection.

An object is generally considered live if it can be reached from roots such as references held by active thread stacks, static fields and other live runtime structures, and certain JVM or native references. An unreachable group of objects can be reclaimed even if the objects refer to one another.

Example:

```java
public class Demo {
    public static void main(String[] args) {
        Object first = new Object();
        Object second = new Object();

        first = second;
        second = null;

        System.out.println("Program continues");
    }
}
```

The object originally referenced only by `first` becomes unreachable after `first = second`, so it may be collected later. The object originally referenced by `second` remains reachable through `first`.

## 8. `System.gc()` Does Not Guarantee Collection

Java provides:

```java
System.gc();
```

This requests that the JVM consider performing garbage collection. It does **not** guarantee that collection happens immediately—or at all in response to that request.

Do not call `System.gc()` after every object creation. It is not a general performance optimization and can make performance worse. Normally, let the JVM manage memory and use profiling tools when investigating memory problems.

## 9. Finalization and Resource Cleanup

Older Java code sometimes used `finalize()` to perform cleanup before an object was reclaimed. Finalization is deprecated for removal and should not be used for new code. It is unpredictable and is not guaranteed to run promptly—or at all before the process exits.

For files, sockets, and database connections, use deterministic cleanup.

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ResourceExample {
    public static void main(String[] args) {
        try (BufferedReader reader =
                     new BufferedReader(new FileReader("notes.txt"))) {
            System.out.println(reader.readLine());
        } catch (IOException e) {
            System.out.println("Could not read the file: " + e.getMessage());
        }
    }
}
```

The reader is closed automatically when the try-with-resources block exits, including when an exception occurs. Garbage collection manages memory; it is not a replacement for closing resources promptly.

## 10. Common Garbage Collection Concepts

The following concepts help explain common collectors. Actual behavior depends on the JVM and collector configuration.

### Generational hypothesis

Many collectors take advantage of the observation that many objects become unreachable quickly, while some objects live for a long time. Collectors may treat objects differently depending on age or collection region.

### Young and old regions

In a generational collector, newly allocated objects are commonly placed in a young generation or young region. Objects that survive enough collections may be moved or promoted to an older generation or region. Not every collector uses exactly the same layout.

### Minor, major, and full GC

These labels are often used informally, but their exact meanings vary between JVMs and collectors. A young collection commonly focuses on young objects, while a full collection generally involves a broader heap collection. Do not assume every JVM uses identical terminology or that every full collection compacts all memory.

### Stop-the-world pauses

Some GC work requires application threads to pause temporarily. These are commonly called stop-the-world pauses. Modern collectors use different strategies to balance throughput, memory use, and pause times.

### Common collectors

HotSpot has included several garbage collectors, with availability and defaults depending on Java version and runtime configuration:

- **Serial GC:** A simple collector that uses a single GC thread for its collection work.
- **Parallel GC:** Emphasizes throughput and uses multiple threads for collection work.
- **G1 GC:** Divides the heap into regions and aims to balance throughput with pause goals.
- **ZGC:** A low-latency collector designed to keep pauses very short for supported configurations.
- **Shenandoah:** A low-pause collector available in supported OpenJDK distributions.

Do not select a collector based only on its name. Benchmark the real application under representative load and consult documentation for the exact Java version and distribution.

## 11. Memory Leaks in Java

Java has garbage collection, but Java applications can still have **memory leaks**. A memory leak occurs when the application retains references to objects it no longer needs. Since those objects remain reachable, the garbage collector cannot reclaim them.

```java
import java.util.ArrayList;
import java.util.List;

public class MemoryLeakPattern {
    private static final List<byte[]> CACHE = new ArrayList<>();

    public static void main(String[] args) {
        while (true) {
            CACHE.add(new byte[1024 * 100]);
        }
    }
}
```

This example continually adds arrays to a static collection and never removes them. The objects remain reachable through `CACHE`, so memory use can grow until the application fails with an `OutOfMemoryError`. Do not run this example on an important system; it is deliberately designed to consume memory.

Common causes include unbounded caches or collections, listeners that are never unregistered, unnecessary static references, long-lived objects retaining large object graphs, and incorrectly managed `ThreadLocal` values in long-lived threads.

Prevent leaks by removing unneeded items, giving caches capacity or expiration policies, unregistering listeners, avoiding unnecessary static references, cleaning up resources deterministically, and using heap dumps or profilers to find retaining references.

The important question is not merely “Can the object be collected?” but “Does the program still have a reference to it, and should it?”

## 12. Common JVM Memory Errors

### `OutOfMemoryError`

This means the JVM or a related runtime area cannot satisfy a memory allocation request. Causes can include Java heap exhaustion, Metaspace exhaustion, inability to create native threads, or exhaustion of other native memory areas.

Example:

```text
java.lang.OutOfMemoryError: Java heap space
```

Investigate the cause. Increasing the heap may help when the application legitimately needs more memory, but it will not fix an unbounded leak.

### `StackOverflowError`

This commonly occurs when a thread's call stack is exhausted, often because of excessively deep or infinite recursion.

```java
public class StackOverflowExample {
    static void recurse() {
        recurse();
    }

    public static void main(String[] args) {
        recurse();
    }
}
```

This program eventually throws `StackOverflowError` in typical JVM implementations.

| Error | Typical meaning |
|---|---|
| `OutOfMemoryError` | A requested memory allocation could not be satisfied |
| `StackOverflowError` | A thread's call stack has been exhausted |

Both are serious errors. Catching an `Error` is rarely the correct general solution; fix the underlying design or resource problem.

## 13. Basic JVM Options

JVM command-line options can control memory settings and display diagnostics. Available options vary by Java version and implementation.

### Set initial and maximum heap sizes

```bash
java -Xms256m -Xmx1g MyApplication
```

`-Xms256m` sets the initial heap size to approximately 256 MB. `-Xmx1g` sets the maximum Java heap size to approximately 1 GB.

These settings do not represent all memory used by the process. Metaspace, thread stacks, direct buffers, native libraries, and other areas may use memory outside the Java heap. Do not set the maximum heap equal to all physical RAM; the operating system and other processes also need memory.

### Print garbage collection logs

On modern HotSpot JVMs:

```bash
java -Xlog:gc MyApplication
```

For more detailed GC logging, consult the options supported by your Java version.

### Print JVM version and settings

```bash
java -version
java -XshowSettings:vm -version
```

These commands help confirm which Java runtime is in use and show some VM settings.

## 14. Performance Basics

Good Java performance starts with sound design and measurement, not random JVM flags.

- **Choose appropriate data structures.** Repeated membership checks may suit a hash-based collection better than a list, depending on ordering and memory trade-offs.
- **Avoid unnecessary object creation.** Do not create large amounts of temporary data without reason, but remember modern JVMs can optimize many allocations.
- **Avoid premature optimization.** Identify a real bottleneck with profiling before optimizing.
- **Use efficient algorithms.** Moving from quadratic time to \(O(n \log n)\) can matter far more than a tiny syntax-level optimization.
- **Be careful with synchronization.** Locks are necessary for correctness, but contention can reduce throughput.
- **Measure representative workloads.** Consider realistic input sizes, warm-up behavior, concurrency, and runtime conditions.
- **Use profiling tools.** Java Flight Recorder (JFR), Java Mission Control (JMC), `jcmd`, heap dumps, and profilers can help identify CPU hot spots, allocations, retained objects, and lock contention.

Use diagnostic tools carefully in production, considering overhead, permissions, and sensitive data in diagnostic files.

## 15. Practical Example: Measuring Execution Time

```java
public class TimingDemo {
    public static void main(String[] args) {
        long start = System.nanoTime();

        long total = 0;
        for (int i = 0; i < 1_000_000; i++) {
            total += i;
        }

        long end = System.nanoTime();
        double milliseconds = (end - start) / 1_000_000.0;

        System.out.println("Total: " + total);
        System.out.println("Elapsed ms: " + milliseconds);
    }
}
```

The total is:

```text
Total: 499999500000
```

Elapsed time varies across machines and runs. Use `System.nanoTime()` to measure elapsed time rather than `System.currentTimeMillis()`, because the monotonic clock is intended for durations. This simple example demonstrates the API, but it is not a reliable microbenchmark: JIT warm-up, dead-code elimination, machine load, and other factors can distort results. For rigorous JVM benchmarking, use a tool such as JMH.

## 16. Common Misconceptions

1. “Java cannot have memory leaks because it has garbage collection.” Incorrect; reachable objects can be retained indefinitely.
2. “Calling `System.gc()` forces immediate collection.” Incorrect; it is only a request.
3. “All objects are always physically stored on the heap exactly as source code suggests.” This is a useful beginner model, but JIT optimizations may eliminate or transform allocations.
4. “Every local variable is always stored in stack memory.” Not necessarily; runtime optimizations can use registers or eliminate values.
5. “Static means the object is stored in the method area.” This oversimplifies implementation details.
6. “Garbage collection closes files and database connections at the right time.” It does not replace deterministic resource cleanup.
7. “Increasing `-Xmx` always fixes memory errors.” It can delay or mask a leak and may make the process exceed system memory limits.
8. “One fast run proves the code is optimized.” Performance measurement requires repeatable, representative workloads.
9. “One garbage collector is best for every application.” Choice depends on workload, memory limits, and latency or throughput goals.
10. “The JVM only interprets bytecode.” Modern JVMs commonly combine interpretation with JIT compilation.

## 17. Interview Questions and Answers

**Q1. What is the JVM?**  
The Java Virtual Machine loads and executes bytecode and manages runtime facilities such as memory allocation and garbage collection.

**Q2. What is the difference between JDK, JRE, and JVM?**  
The JVM executes bytecode. The JRE is the conceptual runtime environment containing the JVM and runtime libraries. The JDK includes development tools, including the compiler, as well as runtime components.

**Q3. Why is Java platform-independent?**  
Java compiles to bytecode that can run on compatible JVM implementations across platforms, though native and operating-system dependencies can still affect portability.

**Q4. What is bytecode?**  
Bytecode is the instruction format stored in Java class files and designed to be executed by a JVM.

**Q5. What is JIT compilation?**  
It compiles selected bytecode into native machine code at runtime, often optimizing frequently executed code.

**Q6. What is the heap?**  
The heap is the main runtime memory area used for objects and arrays and is shared among Java threads.

**Q7. What is the Java stack?**  
Each Java thread has its own JVM stack, which contains method-call frames and associated execution data.

**Q8. What is garbage collection?**  
It reclaims memory occupied by objects that are no longer reachable from the program's live references and other roots.

**Q9. Can you force garbage collection?**  
No. `System.gc()` is a request and does not guarantee immediate collection.

**Q10. Can a Java program have a memory leak?**  
Yes. If unnecessary objects remain reachable, the garbage collector cannot reclaim them.

**Q11. What is `OutOfMemoryError`?**  
It indicates that a memory allocation could not be satisfied. The cause may be heap exhaustion or another runtime or native memory limitation.

**Q12. What is `StackOverflowError`?**  
It commonly occurs when a thread's call stack is exhausted, such as through deep or infinite recursion.

**Q13. What is Metaspace?**  
In HotSpot, Metaspace is native memory used for class metadata. It is distinct from the ordinary Java heap.

**Q14. What is the difference between `-Xms` and `-Xmx`?**  
`-Xms` sets the initial heap size, while `-Xmx` sets the maximum heap size.

**Q15. Does garbage collection remove every unused resource?**  
No. It reclaims eligible memory. Files, sockets, and other resources should be closed explicitly, for example using try-with-resources.

**Q16. What is a stop-the-world pause?**  
A period when application threads are paused so the JVM can perform certain runtime operations, including some GC work.

**Q17. How do you investigate high memory usage?**  
Inspect memory metrics, collect a heap dump when appropriate, analyze retained objects and their references, and use profiling or JVM diagnostic tools.

**Q18. How should Java performance be optimized?**  
Measure a representative workload, find the actual bottleneck, choose suitable algorithms and data structures, and verify improvements with repeatable measurements.

## 18. Practice Exercises

1. Compile a `.java` file and inspect the generated `.class` file.
2. Explain the roles of `javac` and `java`.
3. Draw a diagram showing the JVM heap, per-thread stacks, and class metadata.
4. Write a program that creates an object and then removes its last reference. Explain why this only makes it eligible for collection.
5. Explain why `System.gc()` does not guarantee immediate collection.
6. Write a recursive method that causes a stack overflow, but run it only in a controlled environment.
7. Identify a memory leak pattern caused by an ever-growing collection and explain how to fix it.
8. Use try-with-resources to read a file and ensure it closes correctly.
9. Run a small Java program with `-Xms` and `-Xmx` settings and inspect the JVM's reported settings.
10. Enable GC logging on a test program and explain what information it provides.
11. Explain why increasing the heap is not always the correct solution for `OutOfMemoryError`.
12. Measure elapsed time using `System.nanoTime()` and explain why one run is not a reliable benchmark.
13. Research how JFR or a heap dump can identify allocation hot spots or retained objects.
14. Compare two algorithms with different time complexities using representative input.

**Suggested challenge:** Review a program that continually adds objects to a static list. Explain why the objects remain reachable, propose a bounded or expiring cache strategy, and describe what diagnostic evidence would confirm that the fix works.

## 19. Chapter Summary

The JVM executes Java bytecode and provides runtime services. The JDK supplies development tools, while the JRE is the conceptual runtime environment. The JVM uses runtime memory areas including the heap, per-thread stacks, and class-related metadata areas.

Garbage collection reclaims memory for objects that are no longer reachable, but it does not run at a guaranteed time and does not replace explicit resource cleanup. Java applications can still leak memory by retaining references to objects they no longer need. `OutOfMemoryError` and `StackOverflowError` have different causes and require investigation rather than blind changes to JVM settings.

For performance, understand the workload, choose good algorithms and data structures, and measure before optimizing. JVM flags and garbage collector choices can matter, but they should be selected using evidence and documentation for the runtime you actually use.

**Next chapter:** Chapter 50 — Modern Java Features, Best Practices, Project Integration, and Final Course Revision.
