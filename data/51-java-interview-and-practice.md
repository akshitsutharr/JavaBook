# Java Master Course — Mega Interview Questions, Detailed Answers, and Coding Practice

**Final capstone chapter for the Java Master Course**

This chapter is designed as a large revision and interview-preparation handbook. It combines Java theory, object-oriented programming, collections, exceptions, strings, modern Java, multithreading, JVM concepts, coding interview patterns, LeetCode-style problems with complete solutions, practical interview problems, mock interview sets, and a final preparation plan.

> **How to use this file**
>
> 1. First answer each question aloud without reading the answer.
> 2. Read the explanation and identify what you missed.
> 3. Type and run every program yourself.
> 4. For coding problems, understand the brute-force approach before the optimized approach.
> 5. State the time and space complexity and explain why the solution works.
> 6. Revisit questions you cannot explain clearly after one day, one week, and one month.

**Java version:** Examples use modern Java syntax where useful, but most code is compatible with Java 8+ unless explicitly stated. Some examples use `record` (Java 16+) or newer APIs and are marked accordingly.

---

# Part 1 — Core Java Interview Questions

## 1. What is Java?

Java is a high-level, class-based, general-purpose programming language. It is designed to let developers write code that can run on different operating systems when a compatible Java Virtual Machine (JVM) is available.

Important characteristics:

- **Object-oriented:** Supports classes, objects, encapsulation, inheritance, polymorphism, and abstraction.
- **Platform-independent bytecode:** Java source code is compiled into bytecode, which can run on a compatible JVM.
- **Strongly and statically typed:** Variable types are checked by the compiler, and most type errors are detected before execution.
- **Automatic memory management:** The garbage collector can reclaim memory occupied by unreachable objects.
- **Multithreading support:** Java provides APIs for concurrent programming.
- **Rich standard library:** Includes collections, networking, file handling, date/time APIs, concurrency tools, and more.

Java is not automatically the fastest language for every workload, nor does “platform-independent” mean every Java program runs identically everywhere. Programs can still depend on native libraries, operating-system behavior, filesystem paths, or environment configuration.

## 2. Explain JDK, JRE, and JVM.

- **JVM (Java Virtual Machine):** Loads and executes Java bytecode. It handles runtime memory areas, class loading, verification, and execution.
- **JRE (Java Runtime Environment):** Traditionally describes the JVM plus runtime libraries needed to run Java applications. Modern Java distributions do not always package a separate JRE product.
- **JDK (Java Development Kit):** Includes development tools such as the Java compiler (`javac`), launcher (`java`), debugging and packaging tools, and runtime components.

A typical flow:

```text
Hello.java --javac--> Hello.class (bytecode) --JVM--> program execution
```

Compile and run:

```bash
javac Hello.java
java Hello
```

`javac` compiles source code. The `java` launcher starts the runtime and launches the class containing `main`.

## 3. Why is Java called platform-independent?

The Java compiler normally produces bytecode rather than machine code for only one processor. A compatible JVM on Windows, Linux, or macOS can execute that bytecode. The JVM implementation is platform-specific; the bytecode format is portable.

**Interview distinction:** Java is often described as “write once, run anywhere,” but external dependencies, native code, environment variables, file paths, and different runtime versions can still affect portability.

## 4. Is Java purely object-oriented?

No. Java supports object-oriented programming, but it is not purely object-oriented because it includes primitive types such as `int`, `char`, `boolean`, and `double`, which are not objects. Java also supports static members and procedural-style code within methods.

Wrapper classes such as `Integer` and `Double` provide object representations of primitive values.

## 5. What is bytecode?

Bytecode is the intermediate instruction format stored in `.class` files after Java compilation. The JVM verifies and executes it. Depending on the JVM and runtime behavior, bytecode may be interpreted, compiled to native machine code by a Just-In-Time (JIT) compiler, or handled through a combination of execution techniques.

## 6. What is the `main` method?

```java
public static void main(String[] args) {
    System.out.println("Hello, Java!");
}
```

- `public`: The launcher must be able to access the entry point.
- `static`: The method can be invoked without first creating an object of the class.
- `void`: It does not return a value to the caller.
- `main`: Conventional entry-point method name.
- `String[] args`: Command-line arguments.

Example:

```bash
java Main Alice 20
```

Inside `main`, `args[0]` is `"Alice"` and `args[1]` is `"20"`. Command-line arguments arrive as strings, so numeric input must be parsed.

## 7. What are primitive and reference types?

Primitive variables directly hold primitive values. Reference variables hold references to objects or `null`.

```java
int age = 21;
String name = "Asha";
```

`age` stores an integer value. `name` refers to a `String` object. Java is pass-by-value in both cases; when an object reference is passed to a method, the reference value is copied.

## 8. Is Java pass-by-value or pass-by-reference?

Java is **always pass-by-value**. For an object argument, the copied value is the reference. A method can use that reference to mutate the object, but assigning a new object to the local parameter does not reassign the caller's variable.

```java
class Box {
    int value;
    Box(int value) { this.value = value; }
}

public class Main {
    static void change(Box b) {
        b.value = 50;       // Mutates the shared object
        b = new Box(99);    // Changes only the local parameter
    }

    public static void main(String[] args) {
        Box box = new Box(10);
        change(box);
        System.out.println(box.value); // 50
    }
}
```

## 9. What is the difference between `==` and `equals()`?

- For primitives, `==` compares values.
- For references, `==` checks whether both references identify the same object.
- `equals()` checks logical equality according to the class's implementation. `Object.equals()` uses identity unless a class overrides it.

```java
String a = new String("java");
String b = new String("java");

System.out.println(a == b);      // false
System.out.println(a.equals(b)); // true
```

When writing a class used in a `HashSet` or as a `HashMap` key, implement `equals()` and `hashCode()` consistently.

## 10. What are wrapper classes and autoboxing?

Wrapper classes represent primitive values as objects: `Integer`, `Long`, `Double`, `Boolean`, `Character`, and others.

```java
int x = 10;
Integer boxed = x;       // Autoboxing
int y = boxed;           // Unboxing
```

Unboxing a `null` wrapper causes `NullPointerException`. Wrapper objects are immutable. Use primitives for simple numeric computation unless an object representation is needed, for example in generic collections.

## 11. What is the difference between `final`, `finally`, and `finalize()`?

- `final` is a keyword used with variables, methods, and classes.
  - A final variable can be assigned only once.
  - A final method cannot be overridden.
  - A final class cannot be subclassed.
- `finally` is an exception-handling block that normally executes after `try`/`catch`, whether or not an exception was thrown. Abrupt JVM termination and other unusual cases can prevent it from running.
- `finalize()` was a legacy garbage-collection-related method. It is deprecated for removal and should not be used for resource cleanup. Prefer try-with-resources and explicit lifecycle management.

## 12. What is the difference between `static` and instance members?

A static member belongs to the class; an instance member belongs to an object.

```java
class Counter {
    static int total;
    int value;

    Counter() {
        total++;
        value++;
    }
}
```

Every instance shares `total`, while each instance has its own `value`. Static methods cannot directly access instance members without an object reference. Avoid using mutable static state as a universal global variable because it can make testing and concurrency more difficult.

## 13. What is a constructor?

A constructor initializes a new object. Its name matches the class name, and it has no return type—not even `void`.

```java
class Student {
    String name;
    Student(String name) {
        this.name = name;
    }
}
```

If no constructor is declared, the compiler provides a default no-argument constructor. Once any constructor is declared, that automatic default constructor is not supplied. Constructors can be overloaded, but they are not inherited and cannot be overridden.

## 14. What is constructor chaining?

A constructor can call another constructor in the same class using `this(...)`, or a superclass constructor using `super(...)`. In traditional Java syntax, such a constructor invocation must be the first statement. Java 25 and later support flexible constructor bodies under defined rules, but most interview examples still use the traditional form.

```java
class User {
    String name;
    int age;

    User() {
        this("Unknown", 0);
    }

    User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

## 15. Explain the four pillars of OOP.

**Encapsulation:** Bundles state and behavior while controlling access. Use private fields and public methods to preserve valid object state.

**Inheritance:** Creates a subtype from an existing class using `extends`. It can reuse behavior and model an “is-a” relationship, but inheritance should not be used solely to avoid writing duplicate code.

**Polymorphism:** The same operation can behave differently depending on the object or selected overload. Overriding enables runtime polymorphism; overloading is resolved at compile time.

**Abstraction:** Exposes essential operations while hiding implementation details. Abstract classes and interfaces are common tools.

## 16. Abstract class vs interface

| Abstract class | Interface |
|---|---|
| A class can extend only one class | A class can implement multiple interfaces |
| Can contain instance fields and constructors | Cannot have ordinary per-instance fields; fields are implicitly `public static final` |
| Can contain abstract and concrete methods | Can contain abstract, default, static, and private methods (depending on Java version) |
| Useful for shared state and base implementation | Useful for defining a capability or contract |

Choose an interface when unrelated classes should support the same capability. Choose an abstract class when related classes need shared state or common implementation.

## 17. Overloading vs overriding

**Overloading:** Same method name, different parameter list. It is resolved at compile time. Changing only the return type does not create a valid overload.

**Overriding:** A subclass supplies a compatible implementation of an inherited instance method. The chosen implementation is generally determined at runtime by the object's actual class.

Static methods are hidden rather than overridden. Private methods are not overridden in the polymorphic sense. A subclass cannot reduce the visibility of an overridden method.

## 18. What is polymorphism? Explain dynamic dispatch.

```java
class Animal {
    void sound() { System.out.println("Generic sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }
}
public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.sound(); // Bark
    }
}
```

The reference type is `Animal`, but the actual object is `Dog`. For an overridden instance method, Java dispatches to the implementation associated with the runtime object. The reference type still determines which members are available at compile time.

## 19. What is encapsulation and why is it useful?

Encapsulation protects object invariants by controlling how state changes. For example, a bank account should not allow arbitrary external assignment to its balance. A method such as `deposit(amount)` can reject invalid amounts and preserve rules.

Private fields alone do not guarantee good encapsulation if getters and setters allow every possible state change. Design methods around valid operations, not simply around every field.

## 20. What is composition? How does it compare with inheritance?

Composition means an object contains or uses another object to perform work. Inheritance models an “is-a” relationship; composition often models a “has-a” relationship.

```java
class Engine {
    void start() { System.out.println("Engine started"); }
}
class Car {
    private final Engine engine = new Engine();

    void start() { engine.start(); }
}
```

Composition often makes designs easier to change because behavior can be delegated or replaced without forcing a rigid class hierarchy. Prefer composition when the relationship is not a true subtype relationship.

## 21. What are access modifiers?

- `public`: accessible from anywhere, subject to module and package accessibility.
- `protected`: accessible within the same package and, under subclass access rules, from subclasses in other packages.
- package-private (no modifier): accessible within the same package.
- `private`: accessible within the declaring top-level class's permitted nestmate context.

Top-level classes can be `public` or package-private, not `private` or `protected`.

## 22. What is an immutable class?

An immutable object cannot change its observable state after construction. Common design practices:

1. Make the class `final` when subclassing could undermine immutability.
2. Make fields `private final`.
3. Initialize fields in the constructor.
4. Do not provide mutating methods.
5. Defensively copy mutable inputs and outputs.

```java
import java.util.Date;

public final class EmployeeRecord {
    private final String name;
    private final Date joined;

    public EmployeeRecord(String name, Date joined) {
        this.name = name;
        this.joined = new Date(joined.getTime());
    }

    public String getName() {
        return name;
    }

    public Date getJoined() {
        return new Date(joined.getTime());
    }
}
```

A production implementation should also validate nulls and any business constraints.

## 23. Why is `String` immutable?

Once created, a `String`'s content cannot change. This supports safe sharing, predictable hashing, string-pool reuse, and use as a map key. Operations such as `toUpperCase()` return a new string rather than changing the original.

For repeated concatenation inside a loop, `StringBuilder` is usually more appropriate because it mutates a character sequence without creating a new immutable `String` for every append.

## 24. `String`, `StringBuilder`, and `StringBuffer`

- `String`: immutable.
- `StringBuilder`: mutable and generally preferred for local string construction in a single thread.
- `StringBuffer`: mutable with synchronized methods; synchronization may be useful for shared use, but it does not automatically make a larger multi-step operation logically atomic.

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 3; i++) {
    sb.append(i).append(' ');
}
System.out.println(sb); // 0 1 2
```

## 25. What is the String pool?

The JVM can reuse interned string instances. String literals are interned, so identical literals can refer to the same pooled object. `new String("java")` explicitly creates a distinct string object (though implementations may optimize surrounding behavior without changing observable semantics).

Do not rely on `==` for textual equality. Use `equals()`.

## 26. Why must `equals()` and `hashCode()` agree?

The contract says that equal objects must have equal hash codes. A hash-based collection uses the hash code to choose a bucket and then uses equality checks to distinguish keys. If two equal objects produce different hash codes, lookup behavior can violate expectations.

The reverse is not required: two unequal objects may have the same hash code. That is a collision.

## 27. What is an enum?

An enum defines a fixed set of named constants. Enums are type-safe and can also have fields, constructors, and methods.

```java
enum Status {
    NEW, IN_PROGRESS, DONE
}
```

Enums are often clearer and safer than magic strings or numeric codes for fixed states.

## 28. What are generics?

Generics allow classes, interfaces, and methods to work with types while providing compile-time type safety.

```java
List<String> names = new ArrayList<>();
names.add("Mira");
// names.add(10); // Compile-time error
```

Java generics use type erasure in most cases, so generic type parameters are not generally available as concrete runtime types. Primitive types cannot be used directly as type arguments; use wrappers such as `Integer`.

## 29. Explain `? extends T` and `? super T`.

- `? extends T`: a source of values that are `T` or subtypes of `T`; generally safe to read as `T`, but you cannot safely add arbitrary `T` values.
- `? super T`: a destination that can accept `T` values; reading gives only `Object` without a cast.

Remember **PECS**: Producer Extends, Consumer Super.

```java
static double sum(List<? extends Number> numbers) {
    double total = 0;
    for (Number n : numbers) total += n.doubleValue();
    return total;
}

static void addIntegers(List<? super Integer> destination) {
    destination.add(1);
    destination.add(2);
}
```

## 30. What is a lambda expression?

A lambda is a concise implementation of a functional interface's single abstract method.

```java
List<String> names = new ArrayList<>(List.of("Zara", "Amit", "Mira"));
names.sort((a, b) -> a.compareToIgnoreCase(b));
```

A functional interface has one abstract method; it may still contain default and static methods. Common examples are `Predicate<T>`, `Function<T,R>`, `Consumer<T>`, and `Supplier<T>`.

## 31. What is the Stream API?

Streams describe a pipeline of operations over data. Intermediate operations such as `filter`, `map`, and `sorted` are lazy; terminal operations such as `collect`, `count`, and `forEach` trigger processing.

```java
List<String> result = names.stream()
    .filter(n -> n.length() >= 4)
    .map(String::toUpperCase)
    .sorted()
    .toList(); // toList() is available in Java 16+
```

Streams do not usually store data themselves. Avoid side effects in stream pipelines and do not reuse a stream after a terminal operation.

## 32. `map()` vs `flatMap()`

`map` transforms each element into one result. `flatMap` transforms each element into a stream or similar container and flattens the nested results.

```java
List<List<Integer>> nested = List.of(List.of(1, 2), List.of(3, 4));
List<Integer> flat = nested.stream()
    .flatMap(List::stream)
    .toList();
// [1, 2, 3, 4]
```

## 33. What is `Optional`?

`Optional<T>` represents a value that may or may not be present. It can make the possibility of absence explicit in an API. It is not intended to replace every nullable field or every null check.

```java
String display = Optional.ofNullable(input)
    .map(String::trim)
    .filter(s -> !s.isEmpty())
    .orElse("Guest");
```

Prefer `orElseGet(supplier)` when the fallback is expensive and should only be computed if needed. `orElse(value)` evaluates its argument before the call.

## 34. What is the Java Date and Time API?

The `java.time` API provides immutable, clearer types such as `LocalDate`, `LocalTime`, `LocalDateTime`, `Instant`, `Duration`, `Period`, and `ZonedDateTime`. Use `Instant` for a point on the global timeline, and `ZonedDateTime` when time-zone rules matter. `LocalDateTime` alone has no time zone or UTC offset.

## 35. What is exception handling?

Exception handling separates normal flow from error handling. Java exceptions are objects. `try` encloses code that may fail; `catch` handles matching exception types; `finally` is commonly used for cleanup, although try-with-resources is preferable for `AutoCloseable` resources.

## 36. Checked vs unchecked exceptions

- **Checked exceptions:** Must be caught or declared, except where the compiler's rules allow otherwise. Examples include `IOException`.
- **Unchecked exceptions:** Subclasses of `RuntimeException` (and `Error`) are not required to be declared or caught. Examples include `NullPointerException`, `IllegalArgumentException`, and `ArithmeticException`.

Use exceptions to communicate exceptional conditions, not as the normal mechanism for routine branching.

## 37. `throw` vs `throws`

`throw` actually throws an exception object. `throws` declares possible exceptions in a method signature.

```java
static void validateAge(int age) {
    if (age < 18) {
        throw new IllegalArgumentException("Age must be at least 18");
    }
}
```

## 38. What is try-with-resources?

It automatically closes resources implementing `AutoCloseable`, including resources declared in the statement. It closes them even when the block throws an exception.

```java
try (BufferedReader reader = Files.newBufferedReader(Path.of("data.txt"))) {
    System.out.println(reader.readLine());
} catch (IOException e) {
    System.err.println("Could not read file: " + e.getMessage());
}
```

Imports and checked-exception handling are omitted from this short example for readability; a complete file needs `java.io.*` and `java.nio.file.*`.

## 39. What is serialization?

Serialization converts an object's state into a representation that can be stored or transmitted. Java's native serialization mechanism uses `Serializable`, but it has security and compatibility risks and is often avoided in new external data formats. JSON, Protocol Buffers, and other explicit formats are common alternatives.

Never deserialize untrusted native Java serialization data without a carefully designed security strategy.

## 40. What is reflection?

Reflection allows code to inspect classes, methods, fields, and constructors at runtime, and in some cases invoke or access them. Frameworks use it for dependency injection, testing, object mapping, and serialization. Reflection can reduce compile-time safety, complicate debugging, and interact with module-access restrictions, so use it when dynamic inspection is genuinely needed.

---

# Part 2 — Collections Framework Interview Questions

## 41. What is the Java Collections Framework?

It is a group of interfaces and implementations for representing and manipulating collections of objects. Core interfaces include `List`, `Set`, `Queue`, `Deque`, and `Map`. `Map` is part of the framework but does not extend `Collection`.

Choose an implementation based on required ordering, uniqueness, lookup speed, concurrency needs, and memory behavior—not simply because a class is popular.

## 42. `List`, `Set`, and `Map`

- `List`: ordered sequence; duplicates are allowed. Examples: `ArrayList`, `LinkedList`.
- `Set`: unique elements according to equality/order rules. Examples: `HashSet`, `LinkedHashSet`, `TreeSet`.
- `Map`: key-value associations with unique keys. Examples: `HashMap`, `LinkedHashMap`, `TreeMap`.

## 43. `ArrayList` vs `LinkedList`

`ArrayList` uses a resizable array. Indexed reads are \(O(1)\) on average. Inserting/removing in the middle requires shifting elements, typically \(O(n)\). Appending is amortized \(O(1)\).

`LinkedList` uses linked nodes. Access by index is \(O(n)\); insertion/removal at a known node is \(O(1)\), but locating that node still costs time. It uses additional memory for links. For most everyday list workloads, `ArrayList` is the sensible default.

## 44. `HashSet` vs `LinkedHashSet` vs `TreeSet`

- `HashSet`: no guaranteed iteration order; typical add/contains/remove are expected \(O(1)\).
- `LinkedHashSet`: preserves insertion order; typical operations are expected \(O(1)\) with extra link storage.
- `TreeSet`: maintains sorted order; operations are \(O(\log n)\) using a tree.

Hash-based collections depend on consistent `equals()` and `hashCode()`. Tree-based sets depend on a consistent natural ordering or comparator.

## 45. How does `HashMap` work?

At a high level, `HashMap` computes a hash from a key's `hashCode()`, uses it to select a bucket, and compares keys within that bucket. Collisions are normal. Modern implementations can use linked structures and tree bins under specified conditions. Average lookup is expected \(O(1)\), but pathological collisions or poor hash functions can degrade performance.

Important points:

- One `null` key is permitted by `HashMap`; null values are also permitted.
- Keys should not be mutated in ways that affect equality/hash code while stored in the map.
- It is not thread-safe for concurrent mutation.
- Iteration order is not guaranteed.

## 46. `HashMap` vs `ConcurrentHashMap`

`HashMap` is not designed for concurrent writes. `ConcurrentHashMap` supports concurrent access and updates with internal concurrency controls. It does not permit null keys or null values, which avoids ambiguity in concurrent retrieval. Compound operations should use atomic methods such as `compute`, `merge`, or `putIfAbsent` where appropriate.

A concurrent map does not make every multi-step business operation automatically atomic.

## 47. `Comparable` vs `Comparator`

`Comparable<T>` defines a type's natural ordering through `compareTo`. `Comparator<T>` defines an external ordering through `compare`.

```java
students.sort(Comparator.comparing(Student::getName)
                        .thenComparingInt(Student::getAge));
```

A comparator must obey a consistent ordering contract. When sorted collections use a comparator that returns zero for two values, those values are treated as equivalent for set uniqueness, even if `equals()` says otherwise.

## 48. Fail-fast iterators

Many standard collection iterators are fail-fast: if a collection is structurally modified outside the iterator during iteration, they may throw `ConcurrentModificationException`. This is a bug-detection aid, not a synchronization guarantee and not a mechanism for thread safety.

Use `Iterator.remove()` where supported, concurrent collections when appropriate, or synchronize correctly.

## 49. Queue vs Deque vs PriorityQueue

- `Queue`: usually represents work handled in a particular order.
- `Deque`: supports insertion/removal at both ends; can be used as a queue or stack.
- `PriorityQueue`: retrieves the least element according to natural order or a comparator; it is not a FIFO queue.

`ArrayDeque` is a strong default for stack/queue use when null elements are not needed. `PriorityQueue` offers \(O(\log n)\) insertion and removal of the head, and \(O(1)\) peek.

## 50. What is the difference between `Collections.unmodifiableList()` and `List.of()`?

`Collections.unmodifiableList(list)` creates an unmodifiable view of the supplied list; changes made through another reference to the backing list may still be visible. `List.of(...)` creates an unmodifiable list and rejects null elements. Neither should be confused with a deeply immutable object graph when elements themselves are mutable.

---

# Part 3 — Multithreading and JVM Interview Questions

## 51. Process vs thread

A process is a running program with its own resources and address space. Threads are execution paths within a process and generally share the process's heap. Threads have their own stacks and execution state. Threads can improve responsiveness and throughput, but concurrency introduces coordination and visibility problems.

## 52. Concurrency vs parallelism

Concurrency means multiple tasks make progress over overlapping time intervals. Parallelism means multiple tasks execute at the same instant, typically on different CPU cores. A concurrent program may run on a single core by interleaving tasks.

## 53. `Thread` vs `Runnable`

Extending `Thread` combines task definition with the thread object and prevents extending another class. Implementing `Runnable` separates the task from its execution mechanism and works well with executors.

```java
Runnable task = () -> System.out.println(Thread.currentThread().getName());
Thread thread = new Thread(task, "worker-1");
thread.start();
```

For production applications, executor services are often preferable to manually creating a thread for every task.

## 54. `start()` vs `run()`

`start()` asks the JVM to schedule a new thread of execution; that thread then invokes `run()`. Calling `run()` directly is an ordinary method call and does not start a new thread.

## 55. What are the six Java thread states?

The `Thread.State` enum contains:

- `NEW`: created but not started.
- `RUNNABLE`: executing or eligible to run; Java does not expose a separate `RUNNING` state.
- `BLOCKED`: waiting to acquire an intrinsic monitor lock.
- `WAITING`: waiting indefinitely for another thread's action.
- `TIMED_WAITING`: waiting for a bounded time.
- `TERMINATED`: execution has ended.

These are JVM-level states, not a perfect map to operating-system scheduler states.

## 56. `sleep()` vs `wait()`

`Thread.sleep()` pauses the current thread for a time and does not release any monitor it holds. `Object.wait()` must be called while owning that object's monitor; it releases that monitor while waiting and reacquires it before returning. `wait()` is normally used in a condition loop because wakeups may be spurious and conditions may change.

Higher-level concurrency utilities are often easier and safer than manually using `wait()`/`notify()`.

## 57. What does `join()` do?

`thread.join()` makes the current thread wait for the target thread to terminate (or until a timeout for timed variants). It is useful when a result depends on a worker completing. In production code, `Future.get()` or structured task coordination may be more suitable.

## 58. What is a race condition?

A race condition occurs when program correctness depends on the unpredictable timing or interleaving of operations. A classic example is two threads incrementing the same integer: each increment is a read-modify-write sequence, so increments can be lost.

## 59. What does `synchronized` do?

A synchronized instance method acquires that object's monitor; a synchronized static method acquires the monitor associated with the `Class` object. A synchronized block can lock a chosen monitor. It provides mutual exclusion for code using the same lock and establishes visibility guarantees through monitor release/acquisition.

It does not make unrelated code synchronized automatically. Keep critical sections small and avoid locking on publicly accessible objects.

## 60. What is `volatile`?

A volatile variable provides visibility and ordering guarantees for reads and writes to that variable. It does **not** make compound operations such as `count++` atomic. Use `AtomicInteger`, locks, or other coordination when an atomic update is required.

## 61. What is deadlock?

Deadlock is a situation in which threads wait forever for resources held by each other. A common prevention strategy is to acquire locks in a consistent global order. Other strategies include reducing nested locks, using timed lock acquisition, and using higher-level concurrent utilities.

## 62. What is a daemon thread?

A daemon thread is a background service thread. The JVM may exit when only daemon threads remain. Do not use daemon threads for work that must reliably finish or save data before process termination.

## 63. What is `ExecutorService`?

It separates task submission from thread management. An executor can reuse worker threads, queue tasks, and coordinate shutdown.

```java
ExecutorService pool = Executors.newFixedThreadPool(2);
try {
    Future<Integer> future = pool.submit(() -> 20 + 22);
    System.out.println(future.get()); // 42
} finally {
    pool.shutdown();
}
```

Real applications should choose queue size, rejection policy, pool size, and shutdown behavior intentionally. Unbounded queues and unbounded task submission can exhaust memory.

## 64. What is the JVM memory model at a high level?

The JVM defines runtime areas including heap, per-thread Java stacks, method-area-related class metadata, program counters, and native method stacks. Exact implementation details differ across JVMs. Objects are typically allocated on the heap, while local variables and method frames are associated with thread stacks; JIT optimizations can alter physical allocation while preserving program behavior.

## 65. Stack vs heap

The stack holds method frames, local variables, and call information for each thread. The heap stores objects and arrays. A `StackOverflowError` can occur from excessive stack use, commonly deep recursion. `OutOfMemoryError` can occur when the JVM cannot allocate required memory or another memory resource is exhausted.

## 66. What is garbage collection?

Garbage collection reclaims memory used by objects that are no longer reachable from GC roots. Developers generally do not manually free ordinary Java objects. Garbage collection does not guarantee when an object will be collected, and it does not replace closing files, sockets, database connections, or other external resources.

## 67. Can we force garbage collection?

`System.gc()` requests that the JVM perform garbage collection, but the request may be ignored. It is not a reliable cleanup strategy. Use resource management patterns such as try-with-resources.

## 68. What is a class loader?

Class loaders load class definitions into the JVM. Common conceptual categories include bootstrap, platform, and application class loaders, though implementations can vary. Class identity depends on both the binary class name and the defining class loader.

## 69. What is JIT compilation?

The Just-In-Time compiler can compile frequently executed bytecode into native machine code, using runtime profiling to optimize hot paths. This is one reason Java performance may improve after warm-up. Benchmarking should account for warm-up, dead-code elimination, and realistic workloads; use JMH for serious JVM microbenchmarks.

## 70. What is a memory leak in Java?

A Java memory leak can occur when the program unintentionally retains references to objects that it no longer needs. The garbage collector cannot reclaim reachable objects. Common causes include unbounded caches, static collections, listeners never removed, and retaining large object graphs. Use heap dumps, profilers, and allocation analysis to investigate.

---

# Part 4 — Coding Interview Strategy

## A repeatable method for solving problems

1. **Restate the problem.** Identify inputs, outputs, constraints, and edge cases.
2. **Work through an example.** Include an empty input, smallest valid input, duplicates, and negative values when applicable.
3. **Describe brute force.** It establishes correctness and gives a baseline.
4. **Find the bottleneck.** Repeated searching, repeated scanning, or unnecessary recomputation often reveals the optimization.
5. **Choose a pattern.** Hash map, two pointers, sliding window, binary search, stack, queue, tree traversal, heap, backtracking, dynamic programming, or graph traversal.
6. **Prove correctness.** Explain the invariant or why every candidate is considered.
7. **Analyze complexity.** State time and auxiliary space.
8. **Test manually.** Do not rely only on the sample input.
9. **Discuss trade-offs.** Mention readability, memory, input assumptions, and alternatives.

## Essential complexity reference

| Complexity | Common example | Growth |
|---|---|---|
| \(O(1)\) | Array index access | Constant |
| \(O(\log n)\) | Binary search | Logarithmic |
| \(O(n)\) | One scan | Linear |
| \(O(n \log n)\) | Efficient comparison sorting | Linearithmic |
| \(O(n^2)\) | Nested scans over all pairs | Quadratic |
| \(O(2^n)\) | Enumerating all subsets | Exponential |
| \(O(n!)\) | Enumerating all permutations | Factorial |

When \(n\) doubles, \(O(n^2)\) work grows roughly fourfold, while \(O(n \log n)\) grows by a little more than twofold.

---

# Part 5 — Must-Know Java Coding Problems with Solutions

The following problems are deliberately chosen to cover reusable patterns. The solutions use standard Java and include complexity notes. In LeetCode, put each solution in the requested `class Solution` format and adapt the method signature to the problem statement.

## Problem 1: Reverse a String

**Task:** Return a reversed copy of a string.

**Approach:** Convert to a character array and swap symmetric positions.

```java
class Solution {
    public String reverseStringValue(String s) {
        char[] chars = s.toCharArray();
        int left = 0, right = chars.length - 1;

        while (left < right) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }
        return new String(chars);
    }
}
```

**Time:** \(O(n)\). **Auxiliary space:** \(O(n)\) for the character array.

**Follow-up:** What if the input contains Unicode code points represented by surrogate pairs? A `char` is a UTF-16 code unit, not always a full Unicode character. For user-visible text, code-point-aware processing may be necessary.

## Problem 2: Valid Palindrome

**Task:** Check whether a string reads the same forward and backward after ignoring non-alphanumeric characters and case.

**Pattern:** Two pointers.

```java
class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;

        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;

            if (Character.toLowerCase(s.charAt(left))
                    != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```

**Time:** \(O(n)\). **Auxiliary space:** \(O(1)\).

## Problem 3: Two Sum

**Task:** Given an integer array and target, return the indices of two values that sum to the target. Assume exactly one answer exists and the same element cannot be used twice.

**Brute force:** Try every pair, \(O(n^2)\).

**Optimized approach:** Store previously seen values and their indices in a hash map.

```java
import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> indexByValue = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int needed = target - nums[i];

            if (indexByValue.containsKey(needed)) {
                return new int[] { indexByValue.get(needed), i };
            }

            indexByValue.put(nums[i], i);
        }
        return new int[0];
    }
}
```

**Time:** Expected \(O(n)\). **Space:** \(O(n)\).

**Interview detail:** Check for the complement before inserting the current value so that one array element cannot be used twice. If integer overflow is possible under the given constraints, calculate the complement using `long`.

## Problem 4: Contains Duplicate

**Task:** Return true if any value appears at least twice.

```java
import java.util.*;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return true;
        }
        return false;
    }
}
```

**Time:** Expected \(O(n)\). **Space:** \(O(n)\).

`Set.add` returns false when an equal element already exists.

## Problem 5: Valid Anagram

**Task:** Determine whether two strings contain the same characters with the same frequencies. This solution assumes lowercase English letters.

```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] frequency = new int[26];
        for (int i = 0; i < s.length(); i++) {
            frequency[s.charAt(i) - 'a']++;
            frequency[t.charAt(i) - 'a']--;
        }

        for (int count : frequency) {
            if (count != 0) return false;
        }
        return true;
    }
}
```

**Time:** \(O(n)\). **Space:** \(O(1)\), since the array size is fixed.

For arbitrary Unicode or mixed-case input, use a different frequency representation and define whether normalization and case folding are required.

## Problem 6: Best Time to Buy and Sell Stock

**Task:** Given prices by day, choose one buy day followed by one sell day to maximize profit. Return zero if no positive profit is possible.

```java
class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int best = 0;

        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            best = Math.max(best, price - minPrice);
        }
        return best;
    }
}
```

**Time:** \(O(n)\). **Space:** \(O(1)\).

At each day, `minPrice` is the lowest price seen so far. Selling today gives the best possible profit for that sell day when buying earlier.

## Problem 7: Maximum Subarray (Kadane's Algorithm)

**Task:** Find the maximum sum of a non-empty contiguous subarray.

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int current = nums[0];
        int best = nums[0];

        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }
        return best;
    }
}
```

**Time:** \(O(n)\). **Space:** \(O(1)\).

`current` is the best subarray sum ending exactly at the current position. Starting fresh is better than extending the previous subarray when the previous sum is harmful.

**Important:** This implementation assumes the array is non-empty, as specified by the common interview problem.

## Problem 8: Move Zeroes

**Task:** Move all zeroes to the end while preserving the relative order of non-zero values. Modify the array in place.

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int write = 0;

        for (int value : nums) {
            if (value != 0) nums[write++] = value;
        }

        while (write < nums.length) {
            nums[write++] = 0;
        }
    }
}
```

**Time:** \(O(n)\). **Auxiliary space:** \(O(1)\).

This is a stable compaction pattern: write the useful elements first, then fill the remainder.

## Problem 9: Binary Search

**Task:** Find a target in a sorted array; return its index or `-1`.

```java
class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}
```

**Time:** \(O(\log n)\). **Space:** \(O(1)\).

Using `left + (right - left) / 2` avoids overflow that can occur in `(left + right) / 2`.

## Problem 10: Merge Two Sorted Arrays into a New Array

**Task:** Return a sorted array containing all values from two sorted arrays.

```java
class MergeSorted {
    static int[] merge(int[] a, int[] b) {
        int[] result = new int[a.length + b.length];
        int i = 0, j = 0, k = 0;

        while (i < a.length && j < b.length) {
            if (a[i] <= b[j]) result[k++] = a[i++];
            else result[k++] = b[j++];
        }

        while (i < a.length) result[k++] = a[i++];
        while (j < b.length) result[k++] = b[j++];

        return result;
    }
}
```

**Time:** \(O(n+m)\). **Space:** \(O(n+m)\) for the result.

## Problem 11: Valid Parentheses

**Task:** Determine whether brackets `()[]{}` are correctly matched and nested.

```java
import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char open = stack.pop();

                if ((c == ')' && open != '(')
                        || (c == ']' && open != '[')
                        || (c == '}' && open != '{')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}
```

**Time:** \(O(n)\). **Space:** \(O(n)\).

This code assumes every non-opening character in the input is one of the three closing brackets, as in the standard problem constraints.

## Problem 12: First Non-Repeating Character

**Task:** Return the index of the first character that appears exactly once, or `-1`. This version counts Java `char` values.

```java
import java.util.*;

class Solution {
    public int firstUniqChar(String s) {
        Map<Character, Integer> counts = new HashMap<>();

        for (char c : s.toCharArray()) {
            counts.put(c, counts.getOrDefault(c, 0) + 1);
        }

        for (int i = 0; i < s.length(); i++) {
            if (counts.get(s.charAt(i)) == 1) return i;
        }
        return -1;
    }
}
```

**Time:** Expected \(O(n)\). **Space:** \(O(k)\), where \(k\) is the number of distinct characters.

## Problem 13: Group Anagrams

**Task:** Group words that are anagrams of one another. Assumes lowercase English letters.

```java
import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();

        for (String word : strs) {
            int[] count = new int[26];
            for (char c : word.toCharArray()) count[c - 'a']++;

            StringBuilder key = new StringBuilder();
            for (int value : count) key.append('#').append(value);

            groups.computeIfAbsent(key.toString(), k -> new ArrayList<>())
                  .add(word);
        }

        return new ArrayList<>(groups.values());
    }
}
```

Let \(n\) be the number of words and \(m\) their maximum length. With a fixed 26-letter alphabet, frequency-key construction takes \(O(m+26)\) per word, so total time is \(O(nm)\) under the usual simplification. Space depends on the stored words and keys.

A sorting-based key is simpler but typically takes \(O(m \log m)\) per word.

## Problem 14: Longest Substring Without Repeating Characters

**Task:** Return the length of the longest substring with no repeated characters.

```java
import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0, best = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            if (lastSeen.containsKey(c)) {
                left = Math.max(left, lastSeen.get(c) + 1);
            }

            lastSeen.put(c, right);
            best = Math.max(best, right - left + 1);
        }

        return best;
    }
}
```

**Time:** Expected \(O(n)\). **Space:** \(O(k)\) for distinct characters.

**Pattern:** Sliding window. `left` never moves backward. Updating it with `Math.max` is important when a repeated character was last seen before the current window.

## Problem 15: Product of Array Except Self

**Task:** For each index, return the product of all other elements without using division. Assume products fit in the result type.

```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];

        int prefix = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = prefix;
            prefix *= nums[i];
        }

        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= suffix;
            suffix *= nums[i];
        }

        return answer;
    }
}
```

**Time:** \(O(n)\). **Auxiliary space:** \(O(1)\) excluding the required output array.

The first pass stores products to the left; the second multiplies products to the right.

## Problem 16: Top K Frequent Elements

**Task:** Return the `k` most frequent values. The exact order among equal-frequency values may vary unless the problem specifies a tie-break rule.

```java
import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> frequency = new HashMap<>();
        for (int n : nums) frequency.merge(n, 1, Integer::sum);

        PriorityQueue<Integer> minHeap =
            new PriorityQueue<>(Comparator.comparingInt(frequency::get));

        for (int value : frequency.keySet()) {
            minHeap.offer(value);
            if (minHeap.size() > k) minHeap.poll();
        }

        int[] result = new int[k];
        for (int i = k - 1; i >= 0; i--) result[i] = minHeap.poll();
        return result;
    }
}
```

Let \(n\) be the array length and \(u\) the number of distinct values. Expected time is \(O(n + u\log k)\); extra space is \(O(u+k)\). Validate `k` if the input constraints do not guarantee \(1 \le k \le u\).

## Problem 17: Merge Intervals

**Task:** Merge overlapping intervals. Each interval is represented as `[start, end]`.

```java
import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length == 0) return new int[0][0];

        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
        List<int[]> merged = new ArrayList<>();

        for (int[] interval : intervals) {
            if (merged.isEmpty()
                    || merged.get(merged.size() - 1)[1] < interval[0]) {
                merged.add(new int[] { interval[0], interval[1] });
            } else {
                int[] last = merged.get(merged.size() - 1);
                last[1] = Math.max(last[1], interval[1]);
            }
        }

        return merged.toArray(new int[merged.size()][]);
    }
}
```

**Time:** \(O(n\log n)\) due to sorting. **Space:** \(O(n)\) for the output in the worst case.

This implementation may reorder the input array because it sorts it. If the caller's input must remain unchanged, copy the intervals before sorting.

## Problem 18: Reverse a Linked List

**Task:** Reverse a singly linked list and return the new head. The following is a self-contained interview version.

```java
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode previous = null;
        ListNode current = head;

        while (current != null) {
            ListNode nextNode = current.next;
            current.next = previous;
            previous = current;
            current = nextNode;
        }

        return previous;
    }
}
```

**Time:** \(O(n)\). **Auxiliary space:** \(O(1)\).

The key is to save `current.next` before reversing the link, or the remaining list would become unreachable.

## Problem 19: Detect a Cycle in a Linked List

**Task:** Return true if a linked list contains a cycle.

```java
class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}
```

**Time:** \(O(n)\). **Space:** \(O(1)\).

Floyd's slow/fast pointer algorithm detects whether the pointers eventually meet. Reference equality is correct here because we are checking whether both pointers identify the same node.

## Problem 20: Binary Tree Level Order Traversal

**Task:** Return node values level by level.

```java
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);

                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(level);
        }

        return result;
    }
}
```

**Time:** \(O(n)\). **Space:** \(O(n)\) in the worst case.

Capture `levelSize` before the inner loop so nodes added for the next level are not processed as part of the current level.

## Problem 21: Climbing Stairs

**Task:** Each time you may climb one or two steps. Count ways to reach step `n`, assuming `n >= 1`.

```java
class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;

        int oneStepBefore = 2;
        int twoStepsBefore = 1;

        for (int step = 3; step <= n; step++) {
            int current = oneStepBefore + twoStepsBefore;
            twoStepsBefore = oneStepBefore;
            oneStepBefore = current;
        }
        return oneStepBefore;
    }
}
```

**Time:** \(O(n)\). **Space:** \(O(1)\).

The recurrence is \(ways(n)=ways(n-1)+ways(n-2)\). If the constraints allow very large `n`, use a larger numeric type or a big-integer approach as appropriate.

## Problem 22: Coin Change

**Task:** Given positive coin denominations and an amount, return the minimum number of coins needed, or `-1` if impossible. Unlimited copies of each denomination are available.

```java
import java.util.*;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int impossible = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, impossible);
        dp[0] = 0;

        for (int value = 1; value <= amount; value++) {
            for (int coin : coins) {
                if (coin <= value && dp[value - coin] != impossible) {
                    dp[value] = Math.min(dp[value], dp[value - coin] + 1);
                }
            }
        }

        return dp[amount] == impossible ? -1 : dp[amount];
    }
}
```

**Time:** \(O(A \cdot C)\), where \(A\) is the amount and \(C\) is the number of coin denominations. **Space:** \(O(A)\).

`dp[x]` stores the minimum number of coins needed to form amount `x`. The sentinel works under ordinary constraints where `amount + 1` is safe from integer overflow.

## Problem 23: Number of Islands

**Task:** Count connected groups of `'1'` cells in a grid. Connectivity is horizontal and vertical, not diagonal.

```java
class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;

        int rows = grid.length;
        int cols = grid[0].length;
        int islands = 0;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    floodFill(grid, r, c);
                }
            }
        }
        return islands;
    }

    private void floodFill(char[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.length
                || c >= grid[0].length || grid[r][c] != '1') {
            return;
        }

        grid[r][c] = '0'; // Mark visited
        floodFill(grid, r + 1, c);
        floodFill(grid, r - 1, c);
        floodFill(grid, r, c + 1);
        floodFill(grid, r, c - 1);
    }
}
```

**Time:** \(O(RC)\). **Auxiliary space:** Up to \(O(RC)\) recursion stack in the worst case.

This solution mutates the input grid. For a very large grid, iterative DFS/BFS avoids stack overflow from deep recursion.

## Problem 24: First and Last Position in Sorted Array

**Task:** Find the first and last indices of a target in a sorted array, in \(O(\log n)\) time.

```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        return new int[] {
            boundary(nums, target, true),
            boundary(nums, target, false)
        };
    }

    private int boundary(int[] nums, int target, boolean first) {
        int left = 0, right = nums.length - 1, answer = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                answer = mid;
                if (first) right = mid - 1;
                else left = mid + 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return answer;
    }
}
```

**Time:** \(O(\log n)\). **Space:** \(O(1)\).

This is a useful variation of binary search: after finding the target, continue toward the relevant boundary.

## Problem 25: Longest Common Prefix

**Task:** Return the longest prefix shared by all strings.

```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";

        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}
```

**Time:** \(O(S)\) in terms of total characters examined for typical constraints; more formal bounds depend on repeated prefix checks and string implementation. **Space:** Small auxiliary space apart from returned string handling.

Alternative: compare characters vertically across all strings.

## Problem 26: Majority Element

**Task:** Find the element occurring more than `n / 2` times. Assume such an element exists.

```java
class Solution {
    public int majorityElement(int[] nums) {
        int candidate = 0;
        int count = 0;

        for (int value : nums) {
            if (count == 0) candidate = value;
            count += (value == candidate) ? 1 : -1;
        }
        return candidate;
    }
}
```

**Time:** \(O(n)\). **Space:** \(O(1)\).

Boyer–Moore voting works because the majority element cannot be fully canceled by all other elements. If a majority is not guaranteed, make a second pass to verify the candidate.

## Problem 27: Implement a Queue Using Two Stacks

**Task:** Implement FIFO behavior using two LIFO stacks.

```java
import java.util.*;

class MyQueue {
    private final Deque<Integer> input = new ArrayDeque<>();
    private final Deque<Integer> output = new ArrayDeque<>();

    public void push(int x) {
        input.push(x);
    }

    public int pop() {
        moveIfNeeded();
        return output.pop();
    }

    public int peek() {
        moveIfNeeded();
        return output.element();
    }

    public boolean empty() {
        return input.isEmpty() && output.isEmpty();
    }

    private void moveIfNeeded() {
        if (output.isEmpty()) {
            while (!input.isEmpty()) output.push(input.pop());
        }
    }
}
```

Each element is moved from `input` to `output` at most once, so push is \(O(1)\) and pop/peek are amortized \(O(1)\). This version assumes `pop` and `peek` are called only when the queue is non-empty.

## Problem 28: LRU Cache — Design Discussion and Implementation

**Task:** Support `get(key)` and `put(key, value)` with least-recently-used eviction in expected \(O(1)\) time.

Java's `LinkedHashMap` can maintain access order:

```java
import java.util.*;

class LRUCache extends LinkedHashMap<Integer, Integer> {
    private final int capacity;

    LRUCache(int capacity) {
        super(Math.max(1, capacity), 0.75f, true);
        if (capacity < 0) throw new IllegalArgumentException("Negative capacity");
        this.capacity = capacity;
    }

    public int getValue(int key) {
        return super.getOrDefault(key, -1);
    }

    public void putValue(int key, int value) {
        if (capacity == 0) return;
        super.put(key, value);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}
```

**Complexity:** Expected \(O(1)\) per lookup/update. This demonstration uses inheritance from `LinkedHashMap`; a common interview implementation uses composition with a map and a doubly linked list. A production cache also needs an explicit concurrency policy, capacity policy, and semantics for absent values.

---

# Part 6 — More Interview Problems to Practice

These are problem prompts with the primary pattern to identify. Solve them before checking an editorial or asking for a hint.

## Arrays and hashing

1. **Two Sum** — hash map from value to index.
2. **Contains Duplicate** — set.
3. **Valid Anagram** — frequency counts.
4. **Group Anagrams** — canonical key.
5. **Top K Frequent Elements** — heap or bucket sort.
6. **Product of Array Except Self** — prefix and suffix products.
7. **Longest Consecutive Sequence** — hash set; begin counting only at sequence starts.
8. **Subarray Sum Equals K** — prefix sum plus frequency map.
9. **Find the Duplicate Number** — cycle detection or binary-search counting, depending on constraints.
10. **Rotate Array** — reverse-based in-place technique.

## Two pointers and sliding window

11. **Valid Palindrome** — two pointers.
12. **Two Sum II — Input Array Is Sorted** — two pointers.
13. **3Sum** — sort, then two pointers with duplicate handling.
14. **Container With Most Water** — move the shorter boundary.
15. **Longest Substring Without Repeating Characters** — sliding window and last-seen index.
16. **Minimum Window Substring** — frequency tracking and shrinking window.
17. **Permutation in String** — fixed-size window and counts.

## Stack and monotonic stack

18. **Valid Parentheses** — stack.
19. **Min Stack** — stack of values plus minimum information.
20. **Daily Temperatures** — monotonic decreasing stack of indices.
21. **Largest Rectangle in Histogram** — monotonic stack.
22. **Evaluate Reverse Polish Notation** — stack.

## Linked lists

23. **Reverse Linked List** — pointer reversal.
24. **Merge Two Sorted Lists** — dummy head and two pointers.
25. **Linked List Cycle** — slow/fast pointers.
26. **Remove Nth Node From End** — two pointers with a gap.
27. **Reorder List** — midpoint, reverse second half, merge.
28. **Add Two Numbers** — digit-by-digit carry.

## Trees and binary search trees

29. **Maximum Depth of Binary Tree** — DFS recursion or BFS.
30. **Invert Binary Tree** — recursive or iterative traversal.
31. **Same Tree** — pairwise comparison.
32. **Binary Tree Level Order Traversal** — BFS.
33. **Validate Binary Search Tree** — value bounds or inorder traversal.
34. **Lowest Common Ancestor** — recursive tree reasoning.
35. **Kth Smallest Element in a BST** — inorder traversal.
36. **Binary Tree Maximum Path Sum** — postorder DP.

## Binary search

37. **Binary Search** — half-open or closed interval invariant.
38. **Search a 2D Matrix** — binary search on flattened indexing or two-stage search.
39. **Find Minimum in Rotated Sorted Array** — compare midpoint to right boundary.
40. **Search in Rotated Sorted Array** — identify sorted half.
41. **Koko Eating Bananas** — binary search over answer.

## Heap and intervals

42. **Kth Largest Element** — size-k heap or quickselect.
43. **Task Scheduler** — frequency reasoning and heap/queue.
44. **Merge Intervals** — sort by start.
45. **Insert Interval** — consume before, overlap, then after.
46. **Meeting Rooms II** — min-heap of end times or sorted endpoints.

## Backtracking

47. **Subsets** — choose/exclude.
48. **Combination Sum** — recursive choice with reuse.
49. **Permutations** — visited markers or swapping.
50. **Word Search** — DFS with backtracking.
51. **N-Queens** — constraint checks and backtracking.

## Dynamic programming

52. **Climbing Stairs** — one-dimensional recurrence.
53. **House Robber** — take or skip.
54. **Coin Change** — minimum count DP.
55. **Longest Increasing Subsequence** — \(O(n^2)\) DP or \(O(n\log n)\) tails method.
56. **Longest Common Subsequence** — two-dimensional DP.
57. **Word Break** — DP over prefix boundaries.
58. **Unique Paths** — grid DP.
59. **Decode Ways** — one- or two-character transitions.
60. **Partition Equal Subset Sum** — 0/1 knapsack.

## Graphs

61. **Number of Islands** — DFS/BFS flood fill.
62. **Clone Graph** — map original nodes to clones.
63. **Course Schedule** — topological sorting or cycle detection.
64. **Rotting Oranges** — multi-source BFS.
65. **Pacific Atlantic Water Flow** — reverse traversal from boundaries.
66. **Network Delay Time** — Dijkstra's algorithm with a min-heap.
67. **Redundant Connection** — disjoint-set union.
68. **Word Ladder** — BFS over transformations.

---

# Part 7 — Java-Specific Practical Interview Tasks

## Task 1: Count word frequencies in a paragraph

Requirements:
- Ignore case.
- Remove basic punctuation.
- Count word frequencies.
- Print words in descending frequency, with alphabetical tie-breaking.

```java
import java.util.*;

public class WordFrequency {
    public static void main(String[] args) {
        String text = "Java is powerful. Java is popular, and Java is practical!";

        String normalized = text.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9\\s]", " ")
                .trim();

        Map<String, Integer> frequency = new HashMap<>();
        if (!normalized.isEmpty()) {
            for (String word : normalized.split("\\s+")) {
                frequency.merge(word, 1, Integer::sum);
            }
        }

        List<Map.Entry<String, Integer>> entries =
                new ArrayList<>(frequency.entrySet());

        entries.sort(
            Comparator.<Map.Entry<String, Integer>>comparingInt(Map.Entry::getValue)
                .reversed()
                .thenComparing(Map.Entry::getKey)
        );

        for (Map.Entry<String, Integer> entry : entries) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}
```

**Discuss:** Why use `Locale.ROOT`? Why is `HashMap` sufficient before sorting? What changes for Unicode words, apostrophes, hyphens, or languages without whitespace-delimited words?

## Task 2: Remove duplicates while preserving insertion order

```java
import java.util.*;

public class RemoveDuplicates {
    public static void main(String[] args) {
        List<Integer> values = Arrays.asList(4, 2, 4, 1, 2, 8, 1);
        Set<Integer> unique = new LinkedHashSet<>(values);
        System.out.println(unique); // [4, 2, 1, 8]
    }
}
```

**Complexity:** Expected \(O(n)\) time and \(O(n)\) space. This works because `LinkedHashSet` combines uniqueness with insertion-order iteration.

## Task 3: Sort employees by salary, then name

```java
import java.util.*;

class Employee {
    private final String name;
    private final int salary;

    Employee(String name, int salary) {
        this.name = name;
        this.salary = salary;
    }

    String getName() { return name; }
    int getSalary() { return salary; }

    @Override
    public String toString() {
        return name + " (" + salary + ")";
    }
}

public class EmployeeSort {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>(List.of(
            new Employee("Ravi", 50000),
            new Employee("Asha", 60000),
            new Employee("Mira", 50000)
        ));

        employees.sort(
            Comparator.comparingInt(Employee::getSalary)
                      .thenComparing(Employee::getName)
        );

        employees.forEach(System.out::println);
    }
}
```

**Follow-up:** How would you sort salary descending? Use `Comparator.comparingInt(Employee::getSalary).reversed()`, then add a secondary comparator intentionally. Be careful about the order in which `reversed()` is applied to a composed comparator.

## Task 4: Find the second-largest distinct number

```java
import java.util.*;

public class SecondLargest {
    static OptionalInt secondLargestDistinct(int[] nums) {
        Integer largest = null;
        Integer second = null;

        for (int value : nums) {
            if (largest == null || value > largest) {
                if (largest != null) second = largest;
                largest = value;
            } else if (value != largest && (second == null || value > second)) {
                second = value;
            }
        }

        return second == null ? OptionalInt.empty() : OptionalInt.of(second);
    }

    public static void main(String[] args) {
        System.out.println(secondLargestDistinct(new int[] {10, 5, 10, 8}));
        // OptionalInt[8]
    }
}
```

**Complexity:** \(O(n)\) time and \(O(1)\) extra space. Returning `OptionalInt` makes the missing-answer case explicit.

## Task 5: Design a thread-safe counter

A synchronized version:

```java
class Counter {
    private int value;

    public synchronized void increment() {
        value++;
    }

    public synchronized int getValue() {
        return value;
    }
}
```

An atomic version:

```java
import java.util.concurrent.atomic.AtomicInteger;

class AtomicCounter {
    private final AtomicInteger value = new AtomicInteger();

    public void increment() {
        value.incrementAndGet();
    }

    public int getValue() {
        return value.get();
    }
}
```

Both versions protect increments, but their design trade-offs differ. `AtomicInteger` is useful for simple atomic updates; synchronized sections can protect larger invariants involving multiple fields.

## Task 6: Read a text file safely

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class ReadFile {
    public static void main(String[] args) {
        Path path = Path.of("notes.txt");

        try (var lines = Files.lines(path)) {
            lines.forEach(System.out::println);
        } catch (IOException e) {
            System.err.println("Unable to read file: " + e.getMessage());
        }
    }
}
```

`Files.lines` returns a stream backed by an open resource, so it should be closed. Try-with-resources does that. `var` is available from Java 10; replace it with `Stream<String>` on Java 8.

---

# Part 8 — OOP Design and System-Design Lite Questions

## 1. Design a parking lot

Clarify requirements first:
- Vehicle types: motorcycle, car, bus?
- Space types and compatibility?
- Entry/exit gates?
- Ticket and payment?
- Multiple floors?
- Availability tracking?
- Pricing policy and lost-ticket handling?

Possible domain classes:
- `ParkingLot`
- `ParkingFloor`
- `ParkingSpot`
- `Vehicle` (abstract) with `Car`, `Motorcycle`, `Bus`
- `Ticket`
- `Payment`
- `PricingStrategy`
- `ParkingService`

Use enums for fixed states and interfaces for interchangeable strategies. Keep allocation logic out of data-only classes when it becomes complex. Use locks or transactional persistence if multiple gates can allocate spots concurrently.

## 2. Design a library management system

Potential classes: `Book`, `BookCopy`, `Member`, `Loan`, `Reservation`, `Catalog`, `LibraryService`, and `FinePolicy`.

Important distinctions:
- A `Book` represents a title or bibliographic work.
- A `BookCopy` represents an individual physical or lendable copy.
- A `Loan` represents a checkout transaction.
- Availability depends on copies and their states, not only on the title.

Interviewers often care more about clear responsibilities and business rules than about producing many classes.

## 3. Design a notification service

Requirements to clarify:
- Channels: email, SMS, push, in-app?
- Retry behavior?
- Delivery status?
- User preferences and consent?
- Rate limits?
- Idempotency?
- Message templates and localization?

Possible abstractions:
- `NotificationChannel` interface.
- `EmailChannel`, `SmsChannel`, `PushChannel`.
- `NotificationRequest`.
- `NotificationDispatcher`.
- `RetryPolicy`.
- `TemplateRenderer`.

Use dependency injection to provide channel implementations. Do not hardcode credentials or assume that sending a request means delivery succeeded.

## 4. Design a cache

Discuss:
- Eviction policy: LRU, LFU, FIFO, TTL.
- Maximum size and memory budget.
- Thread safety.
- Expiration and stale reads.
- Cache misses and backend failure.
- Metrics: hit rate, miss rate, evictions.
- Whether cached values are immutable or safely shared.

## 5. Explain SOLID principles

- **S — Single Responsibility:** A module should have one coherent reason to change.
- **O — Open/Closed:** Make behavior extensible without repeatedly modifying stable core logic.
- **L — Liskov Substitution:** Subtypes should be usable where their base type is expected without breaking the base contract.
- **I — Interface Segregation:** Prefer focused interfaces over large interfaces that force clients to depend on unused methods.
- **D — Dependency Inversion:** High-level policy should depend on abstractions rather than directly on low-level implementation details.

SOLID is a set of design heuristics, not a rule that every small class must be split into many tiny interfaces.

---

# Part 9 — Common Tricky Interview Questions

## 1. Can a constructor be `static`, `final`, or `abstract`?

No. Constructors are not inherited or overridden. They initialize instances, so they cannot be static. `final` and `abstract` are method/class concepts that do not apply to constructors.

## 2. Can a class have multiple constructors?

Yes, through constructor overloading. Each constructor must have a distinct parameter signature.

## 3. Can we override a private method?

No, not in the normal overriding sense, because a private method is not inherited as an overridable member. A subclass can declare a method with the same signature, but it is a separate method.

## 4. Can we override a static method?

No. A static method is associated with the class and can be hidden by a static method in a subclass, subject to signature and access rules. Static method selection is not dynamic dispatch on the runtime object.

## 5. Can an abstract class have a constructor?

Yes. The constructor initializes the superclass portion of a concrete subclass object.

## 6. Can an interface have method implementations?

Yes. Modern Java interfaces can contain `default`, `static`, and `private` methods in addition to abstract methods.

## 7. Can `main` be overloaded?

Yes, Java allows other methods named `main` with different parameters. The launcher uses the recognized entry-point signature; an overload is not automatically the program entry point.

## 8. Why is `String` a good `HashMap` key?

`String` is immutable and implements consistent `equals()` and `hashCode()`. Its contents cannot change after insertion and thereby invalidate the key's hash bucket.

## 9. What happens when two keys have the same hash code?

They collide. The map uses equality checks to determine which key is being queried. A hash collision does not mean the keys are equal.

## 10. Why can `HashMap` have one null key but `ConcurrentHashMap` cannot?

`HashMap` defines support for a null key. `ConcurrentHashMap` prohibits null keys and values partly to avoid ambiguity between an absent mapping and a mapping whose value is null during concurrent operations.

## 11. Is `ArrayList` thread-safe?

No. Synchronize externally or use an appropriate concurrent design if multiple threads modify or access it concurrently with mutation. `CopyOnWriteArrayList` can suit read-heavy workloads with relatively rare writes, but writes copy the backing array.

## 12. Is `volatile int count` enough for `count++`?

No. `count++` is a read-modify-write operation and is not made atomic by `volatile`. Use `AtomicInteger`, synchronization, or another correct coordination mechanism.

## 13. Does `sleep()` release a lock?

No. `Thread.sleep()` does not release monitors held by the current thread.

## 14. Does `wait()` release a lock?

Calling `wait()` on a monitor releases that monitor while the thread waits, then reacquires it before returning. The thread must own the object's monitor to call `wait()`.

## 15. Does garbage collection close files?

No. Garbage collection manages memory, not deterministic cleanup of external resources. Use try-with-resources.

## 16. What is the difference between an error and an exception?

Both are subclasses of `Throwable`. Exceptions generally represent conditions an application may handle. `Error` represents serious JVM or environment problems that ordinary application code usually should not attempt to recover from indiscriminately.

## 17. What is the diamond problem?

In multiple inheritance of implementation, two parents could provide conflicting implementations. Java classes cannot extend multiple classes, but interfaces can provide default methods; if defaults conflict, a class may need to explicitly resolve the conflict.

## 18. What is covariant return type?

An overriding method may return a subtype of the return type declared by the overridden method, subject to Java's method rules. Primitive return types cannot be changed this way.

## 19. Why are arrays covariant but generics invariant?

A `String[]` can be assigned to an `Object[]`, but an attempt to store a non-String then fails at runtime with `ArrayStoreException`. `List<String>` is not a subtype of `List<Object>`, because allowing that assignment would permit unsafe insertions. Generic wildcards provide controlled flexibility.

## 20. What is type erasure?

Java generally removes generic type-parameter details during compilation, using erased types and compiler-generated casts or bridge methods where necessary. This preserves compatibility with older bytecode, but limits operations such as creating `new T()` or checking `instanceof List<String>` directly.

## 21. What is a functional interface?

An interface with exactly one abstract method, excluding methods that correspond to public methods of `Object` for the purpose of the functional-interface rule. It can be implemented by a lambda or method reference. `@FunctionalInterface` asks the compiler to verify the intent.

## 22. What is the difference between `orElse` and `orElseGet`?

`orElse(value)` evaluates `value` before the method call. `orElseGet(supplier)` invokes the supplier only when the optional is empty. Use the latter when fallback computation is expensive or has side effects.

## 23. Why should you avoid `parallelStream()` by default?

Parallel streams add scheduling and coordination overhead, commonly use the shared ForkJoin common pool, and may perform poorly for small tasks, blocking operations, or pipelines with unsafe side effects. Measure with representative workloads before choosing parallelism.

## 24. What is a record?

A record is a concise syntax for a class primarily intended to model data. The compiler generates components, accessors, and implementations such as `equals`, `hashCode`, and `toString`. Records are shallowly immutable: a final reference component can still refer to a mutable object.

```java
record Point(int x, int y) {}
```

Records were finalized in Java 16.

## 25. What is a sealed class?

A sealed class or interface restricts which classes may directly extend or implement it, using `permits` or an inferred permitted list. Permitted subclasses must follow the applicable `final`, `sealed`, or `non-sealed` rules. This can make domain models and exhaustive pattern handling easier to reason about.

---

# Part 10 — Mock Interview Sets

## Mock Set A: Beginner (15 questions)

Try to answer each in 30–60 seconds.

1. What is Java and why is it platform-independent?
2. Explain JDK, JRE, and JVM.
3. What is the difference between a primitive and a reference type?
4. Explain `==` versus `equals()`.
5. What is a constructor?
6. Explain the four pillars of OOP.
7. What is method overloading?
8. What is method overriding?
9. What is the difference between an abstract class and an interface?
10. Why is `String` immutable?
11. What is exception handling?
12. What is a collection?
13. Compare `List`, `Set`, and `Map`.
14. What is the difference between `ArrayList` and an array?
15. What does `static` mean?

**Self-evaluation:** Give yourself 0 for no answer, 1 for a vague answer, 2 for a correct short answer, and 3 for a correct answer with an example and trade-off. Revisit all questions scoring 0–1.

## Mock Set B: Intermediate (15 questions)

1. Explain `equals()`/`hashCode()` contracts.
2. How does `HashMap` handle collisions?
3. Compare `HashSet`, `LinkedHashSet`, and `TreeSet`.
4. Explain generics and type erasure.
5. What are `? extends T` and `? super T`?
6. Explain `map()` versus `flatMap()`.
7. Explain checked versus unchecked exceptions.
8. Why is try-with-resources preferred for resource cleanup?
9. Explain `start()` versus `run()`.
10. Explain `synchronized` versus `volatile`.
11. Explain stack versus heap.
12. What does the garbage collector reclaim?
13. Explain `Comparable` versus `Comparator`.
14. What is the purpose of `Optional`?
15. What is the difference between fail-fast behavior and thread safety?

## Mock Set C: Coding (10 problems)

1. Two Sum.
2. Valid Parentheses.
3. Best Time to Buy and Sell Stock.
4. Binary Search.
5. Longest Substring Without Repeating Characters.
6. Reverse a Linked List.
7. Detect a Linked List Cycle.
8. Binary Tree Level Order Traversal.
9. Number of Islands.
10. Coin Change.

For every solution, explain a brute-force approach, optimized approach, correctness argument, time complexity, space complexity, and at least two edge cases.

## Mock Set D: Advanced Java and design (10 questions)

1. Design a thread-safe rate limiter.
2. Explain the Java Memory Model at a high level.
3. What is a happens-before relationship?
4. How would you diagnose a memory leak?
5. Design a bounded producer-consumer queue.
6. Design an LRU cache.
7. Explain dependency injection and why it helps testing.
8. Design a notification system with retries.
9. Explain SOLID with one practical example.
10. How would you make a file-processing pipeline robust against malformed input and partial failure?

---

# Part 11 — Coding Exercises Without Immediate Solutions

Attempt these before searching for answers. Write tests as well as the solution.

## Easy

1. Find the maximum and minimum values in an array in one pass.
2. Count even and odd numbers.
3. Check whether a number is prime.
4. Generate the first `n` Fibonacci numbers.
5. Calculate factorial iteratively and recursively.
6. Check whether an integer is a palindrome.
7. Count vowels and consonants in a string.
8. Remove spaces from a string.
9. Find the missing number from values in `[0, n]`.
10. Merge two sorted arrays.
11. Remove duplicates from a sorted array in place.
12. Find the intersection of two arrays.
13. Find the first repeated character.
14. Check whether two strings are rotations of one another.
15. Find the frequency of every integer in an array.

## Medium

16. Find all pairs whose sum equals a target.
17. Find the longest consecutive sequence.
18. Find the length of the longest increasing subsequence.
19. Find the maximum product subarray.
20. Find the minimum window containing all required characters.
21. Rotate a matrix 90 degrees.
22. Search in a rotated sorted array.
23. Find the kth largest element.
24. Merge overlapping intervals.
25. Find the next greater element for every array value.
26. Implement a min stack.
27. Reorder a linked list.
28. Find the intersection node of two linked lists.
29. Validate a binary search tree.
30. Find the lowest common ancestor of two tree nodes.
31. Find all subsets of an array.
32. Generate all permutations of a string.
33. Solve the combination-sum problem.
34. Count connected components in a graph.
35. Determine whether a directed graph contains a cycle.

## Hard

36. Median of two sorted arrays.
37. Trapping Rain Water.
38. Largest Rectangle in Histogram.
39. Word Ladder.
40. Serialize and deserialize a binary tree.
41. Binary Tree Maximum Path Sum.
42. Minimum Window Substring.
43. Regular Expression Matching.
44. Edit Distance.
45. Word Break II.
46. N-Queens.
47. Course Schedule II.
48. Network Delay Time.
49. Find strongly connected components.
50. Design a concurrent LRU cache.

For each exercise, write down:
- The input constraints.
- A small example and expected output.
- A brute-force solution.
- The improved algorithm.
- The invariant or proof idea.
- Time and space complexity.
- Tests for empty input, one element, duplicates, negative values, and boundary values where applicable.

---

# Part 12 — Testing Your Java Code

## Why tests matter

An algorithm that works on one sample may fail on empty input, duplicates, integer boundaries, or special cases. Testing is part of solving the problem, not an optional final step.

## Example: simple assertions

```java
public class SimpleTest {
    static void check(boolean condition, String message) {
        if (!condition) throw new AssertionError(message);
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        check(solution.containsDuplicate(new int[] {1, 2, 1}),
              "duplicate should be detected");
        check(!solution.containsDuplicate(new int[] {1, 2, 3}),
              "unique values should return false");

        System.out.println("All checks passed");
    }
}
```

This example assumes a `Solution` class with the `containsDuplicate` method from above. For a larger project, use JUnit and test each method independently.

## Test categories

- **Normal cases:** Typical inputs.
- **Boundary cases:** Empty, one item, minimum or maximum allowed values.
- **Duplicate cases:** Repeated values and repeated keys.
- **Negative cases:** Invalid input, missing value, impossible solution.
- **Overflow cases:** Arithmetic near numeric limits.
- **Mutation cases:** Confirm whether a method changes the input.
- **Concurrency cases:** Repeat operations under multiple threads and verify invariants.

## JUnit direction

Learn to write:
- `@Test` methods.
- Assertions such as `assertEquals`, `assertTrue`, and `assertThrows`.
- Setup/teardown where necessary.
- Parameterized tests for multiple input cases.
- Unit tests separate from integration tests.

Do not write tests that merely duplicate the implementation's assumptions. Choose expected values independently.

---

# Part 13 — Behavioral Interview Preparation for Freshers

Technical skill is only one part of an interview. Prepare short, truthful examples for these questions.

## 1. Tell me about yourself.

Use a 45–90 second structure:
1. Current education and technical focus.
2. Two relevant skills or projects.
3. One concrete achievement or technical challenge.
4. What kind of role you are looking for.

Avoid reciting every technology you have ever tried. Focus on evidence and relevance.

## 2. Explain one of your projects.

Prepare to explain:
- The problem and intended users.
- Architecture and data flow.
- Why you chose the stack.
- Your personal contribution.
- One difficult bug and how you diagnosed it.
- Security, performance, and error-handling decisions.
- What you would improve next.

Never claim work you did not do. Be able to explain every major file and dependency you list.

## 3. Tell me about a difficult bug.

Use STAR:
- **Situation:** What was happening?
- **Task:** What needed to be fixed?
- **Action:** How did you reproduce, inspect, and isolate the problem?
- **Result:** What changed, and how did you verify it?

A good answer describes reasoning, not just “I searched online and copied a fix.”

## 4. What do you do when you do not know an answer?

A strong approach:
- State what you know.
- Clarify assumptions.
- Explain how you would investigate.
- Consider correctness, tests, and documentation.
- Avoid bluffing or inventing details.

## 5. Why should we hire you as a fresher?

Connect your evidence to the role: fundamentals, learning speed, debugging process, projects you can explain, teamwork, and willingness to receive feedback. Avoid unsupported claims such as “I am the best candidate.”

## 6. Describe a project trade-off.

Choose a real trade-off, such as using a relational database for structured data, choosing an `ArrayList` over a linked list, or adding caching only after measuring a bottleneck. Explain what you optimized for and what you sacrificed.

---

# Part 14 — Final Revision Checklists

## Core Java checklist

- [ ] Primitive types, variables, casting, operators, control flow.
- [ ] Methods, parameters, return values, recursion, varargs.
- [ ] Arrays and strings.
- [ ] Classes, objects, constructors, `this`, `super`, and `static`.
- [ ] Encapsulation, inheritance, polymorphism, abstraction.
- [ ] Interfaces, abstract classes, composition, access modifiers.
- [ ] `equals()`, `hashCode()`, `toString()`, immutability.
- [ ] Exceptions, custom exceptions, try-with-resources.
- [ ] Packages, imports, annotations, enums, records.
- [ ] Generics, wildcards, lambdas, method references, streams.
- [ ] Collections and complexity trade-offs.
- [ ] File I/O, NIO, date/time, `Optional`.

## JVM and concurrency checklist

- [ ] JDK/JRE/JVM and bytecode.
- [ ] Class loading and JIT basics.
- [ ] Stack, heap, reachability, and garbage collection.
- [ ] Thread creation and lifecycle.
- [ ] `start`, `run`, `sleep`, `join`, `wait`, `notify`.
- [ ] Synchronization, visibility, atomicity, `volatile`.
- [ ] Race conditions, deadlocks, executor services.
- [ ] Concurrent collections and futures.
- [ ] Resource cleanup and memory-leak investigation.

## DSA checklist

- [ ] Big-O analysis.
- [ ] Arrays and strings.
- [ ] Hash maps and sets.
- [ ] Two pointers and sliding windows.
- [ ] Stack, queue, deque, monotonic stack.
- [ ] Linked lists.
- [ ] Binary search.
- [ ] Sorting, intervals, and heaps.
- [ ] Trees and BSTs.
- [ ] Graphs: BFS, DFS, topological sorting, shortest paths.
- [ ] Backtracking.
- [ ] Dynamic programming.
- [ ] Greedy reasoning and disjoint-set union.

## Interview readiness checklist

- [ ] Can explain every listed project without reading notes.
- [ ] Can solve an easy problem in 15–20 minutes.
- [ ] Can work through a medium problem while explaining the reasoning.
- [ ] Can analyze time and space complexity.
- [ ] Can write readable Java without relying on autocomplete for every line.
- [ ] Can test edge cases and debug compiler/runtime errors.
- [ ] Can explain trade-offs rather than memorizing definitions.
- [ ] Can ask clarifying questions before coding.
- [ ] Can discuss failures honestly and describe what was learned.

---

# Part 15 — A Practical 30-Day Interview Plan

This plan assumes roughly 1.5–3 hours per day. Adjust it to your semester, work, and energy level; consistency matters more than following a rigid schedule.

| Days | Focus | Daily output |
|---|---|---|
| 1–3 | Java basics, strings, arrays, OOP | Revise concepts and solve 2–3 easy problems daily |
| 4–6 | Collections, generics, exceptions | Explain `HashMap`, `Set`, sorting, and exception design aloud |
| 7–9 | Two pointers, sliding window, hashing | Solve 6–9 focused problems |
| 10–12 | Stack, queue, linked list | Solve 6–9 problems and dry-run pointer changes |
| 13–15 | Binary search, intervals, heaps | Solve 6–9 problems; state invariants clearly |
| 16–18 | Trees and recursion | Implement DFS, BFS, BST validation, and LCA |
| 19–21 | Graphs | Practice grid DFS/BFS, cycle detection, topological sorting |
| 22–24 | Dynamic programming | Start with one-dimensional DP, then grid/string DP |
| 25–26 | JVM and multithreading | Explain race conditions, synchronization, GC, and executors |
| 27 | OOP design | Design a parking lot or notification service on paper |
| 28 | Mock interview | One timed coding session and one theory session |
| 29 | Project and behavioral interview | Rehearse project architecture and STAR stories |
| 30 | Final revision | Redo failed problems and review the personal mistake log |

**Daily routine suggestion:**
- 20 minutes: revise yesterday's mistakes.
- 30–45 minutes: study one concept.
- 45–90 minutes: solve one or two problems.
- 10 minutes: write down the approach, complexity, and lesson learned.

Do not measure progress only by the number of problems solved. Being able to explain and re-solve a smaller set is more valuable than copying many solutions.

---

# Part 16 — How to Explain a Coding Solution in an Interview

Use this sample script for **Two Sum**:

**Clarify:** “The array is unsorted, and I need indices, not values. I cannot use the same element twice. Is there exactly one answer?”

**Brute force:** “I can inspect every pair. That takes \(O(n^2)\) time and \(O(1)\) extra space.”

**Optimize:** “For each value `x`, the other value must be `target - x`. I can use a hash map to find whether that complement has already appeared.”

**Correctness:** “Before storing the current value, I check whether its complement has appeared earlier. Therefore, the two indices are distinct. Every valid pair is found when its later element is processed.”

**Complexity:** “Expected time is \(O(n)\), and extra space is \(O(n)\).”

**Testing:** “I would test a pair at the beginning, duplicates such as `[3,3]` with target `6`, negative numbers, and a case with no answer if the problem allows one.”

This structure demonstrates problem-solving rather than memorized code.

---

# Part 17 — Java Interview Quick Reference

| Topic | Key point |
|---|---|
| `==` vs `equals()` | Identity for references vs logical equality |
| `equals()`/`hashCode()` | Equal objects must share hash codes |
| `String` | Immutable |
| `StringBuilder` | Mutable, generally best for local building |
| `ArrayList` | Resizable array; fast indexed access |
| `LinkedList` | Node-based; indexed access is linear |
| `HashSet` | Uniqueness, no guaranteed order |
| `LinkedHashSet` | Uniqueness with insertion order |
| `TreeSet` | Sorted set, logarithmic operations |
| `HashMap` | Expected constant-time lookup; not thread-safe |
| `ConcurrentHashMap` | Concurrent map; no null keys or values |
| `Comparable` | Natural ordering in the type |
| `Comparator` | External/custom ordering |
| Overloading | Same name, different parameter list |
| Overriding | Subclass implementation of inherited instance method |
| `final` | Restricts reassignment, overriding, or inheritance depending on use |
| `finally` | Cleanup/control-flow block |
| `volatile` | Visibility/order guarantees, not compound-operation atomicity |
| `synchronized` | Mutual exclusion and monitor-based visibility |
| `sleep()` | Pauses thread; does not release monitor |
| `wait()` | Waits on a monitor and releases that monitor while waiting |
| `start()` | Starts a new thread of execution |
| `run()` | Ordinary method call when invoked directly |
| `map()` | One result per input element |
| `flatMap()` | Maps and flattens nested results |
| `Optional.orElse()` | Fallback argument evaluated eagerly |
| `Optional.orElseGet()` | Fallback supplier evaluated only when needed |
| BFS | Queue; useful for level traversal and unweighted shortest paths |
| DFS | Recursion/stack; useful for reachability and backtracking |
| Binary search | Requires a monotonic/sorted search condition |
| Sliding window | Maintains a moving contiguous range |
| Prefix sum | Efficient range-sum and subarray-count reasoning |
| Dynamic programming | Reuses solutions to overlapping subproblems |

---

# Final Note

This file is a broad interview handbook, not a substitute for writing and running code. Treat every code sample as a starting point: compile it, test edge cases, and adapt it to the exact method signature and constraints of the interview problem. For LeetCode, always read the official prompt carefully—small differences in input assumptions, allowed mutation, return type, or constraints can require changes to a solution.

The strongest preparation combines three abilities: **explain the concept clearly, implement it correctly, and justify its complexity and trade-offs.**
