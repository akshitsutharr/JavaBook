# Chapter 42: Java Stream API — Creating Streams and Intermediate Operations

## 1. What You Will Learn

In this chapter, you will learn:

- What the Stream API is and why Java introduced it.
- The difference between a collection and a stream.
- How to create streams from collections, arrays, and individual values.
- How `filter()`, `map()`, `flatMap()`, `distinct()`, `sorted()`, `limit()`, `skip()`, and `peek()` work.
- What intermediate and terminal operations mean.
- Why stream operations are lazy.
- How to chain operations into a readable pipeline.
- How to use streams safely and avoid common mistakes.
- Practical programs, output predictions, exercises, and interview questions.

The Stream API was introduced in Java 8. It works especially well with lambda expressions and functional interfaces, which you studied in Chapter 41.

---

## 2. What Is the Stream API?

A stream is a sequence of elements that can be processed through a pipeline of operations.

For example, suppose you have these numbers:

```text
1, 2, 3, 4, 5, 6
```

You want to:
1. Keep only even numbers.
2. Square those numbers.
3. Print the results.

Using a loop:

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

for (int number : numbers) {
    if (number % 2 == 0) {
        System.out.println(number * number);
    }
}
```

Output:

```text
4
16
36
```

Using a stream:

```java
numbers.stream()
       .filter(n -> n % 2 == 0)
       .map(n -> n * n)
       .forEach(System.out::println);
```

Output:

```text
4
16
36
```

The stream version describes the processing steps directly. `filter()` selects elements, `map()` transforms them, and `forEach()` performs an action for each result.

A stream does not normally store its own data. It processes elements from a source such as a collection, array, generator, or I/O channel.

---

## 3. Collection vs Stream

A collection stores or manages data. A stream describes a sequence of computations over data.

| Collection | Stream |
|---|---|
| Stores or represents a group of elements | Processes elements from a source |
| Can often be traversed repeatedly | A stream is normally consumed once |
| Provides operations such as `add()` and `remove()` when supported | Provides operations such as `filter()`, `map()`, and `reduce()` |
| Focuses on managing data | Focuses on processing data |
| Can be modified if its implementation supports modification | Stream operations generally do not modify the source unless your own action explicitly does so |

Example:

```java
List<Integer> numbers = new ArrayList<>(List.of(1, 2, 3));

numbers.add(4); // Changes the collection

long count = numbers.stream()
                    .filter(n -> n > 2)
                    .count();

System.out.println(count);
```

Output:

```text
2
```

The collection contains four elements after the `add()`. The stream counts how many are greater than two.

### Important points

- A stream pipeline does not automatically modify its source.
- A stream is generally not reusable after a terminal operation.
- Stream operations are designed to be composed into a pipeline.
- Use a collection when you need to store, access, or mutate data; use streams when you need to process data.

---

## 4. The Three Parts of a Stream Pipeline

A typical stream pipeline has three parts.

```text
Source → Intermediate operations → Terminal operation
```

Example:

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

long count = numbers.stream()
                    .filter(n -> n % 2 == 0)
                    .map(n -> n * n)
                    .count();

System.out.println(count);
```

Output:

```text
3
```

Here:
- **Source:** `numbers.stream()`
- **Intermediate operations:** `filter()` and `map()`
- **Terminal operation:** `count()`

Intermediate operations return another stream, allowing more operations to be chained. A terminal operation produces a result or side effect and consumes the stream.

Examples of intermediate operations:
- `filter()`
- `map()`
- `flatMap()`
- `distinct()`
- `sorted()`
- `limit()`
- `skip()`
- `peek()`

Examples of terminal operations:
- `forEach()`
- `toArray()`
- `reduce()`
- `collect()`
- `count()`
- `min()`
- `max()`
- `anyMatch()`
- `allMatch()`
- `noneMatch()`
- `findFirst()`
- `findAny()`

This chapter focuses mainly on creating streams and intermediate operations. Terminal operations are introduced when needed and will be explored further in the next chapter.

---

## 5. Creating Streams

Java provides several ways to create a stream.

### 5.1 From a collection

```java
List<String> names = List.of("Aman", "Riya", "Neha");

Stream<String> stream = names.stream();

stream.forEach(System.out::println);
```

Output:

```text
Aman
Riya
Neha
```

`stream()` creates a sequential stream from the collection.

For parallel processing, a collection can provide:

```java
names.parallelStream();
```

Parallel streams are discussed later. Do not assume parallel processing is always faster.

### 5.2 From an array

Use `Arrays.stream()`:

```java
int[] numbers = {10, 20, 30, 40};

Arrays.stream(numbers)
      .forEach(System.out::println);
```

Output:

```text
10
20
30
40
```

For an object array:

```java
String[] names = {"Aman", "Riya", "Neha"};

Arrays.stream(names)
      .forEach(System.out::println);
```

### 5.3 Using `Stream.of()`

```java
Stream<String> names = Stream.of("Aman", "Riya", "Neha");

names.forEach(System.out::println);
```

Output:

```text
Aman
Riya
Neha
```

You can also create a stream from a few values:

```java
Stream<Integer> numbers = Stream.of(10, 20, 30);
```

### 5.4 An empty stream

```java
Stream<String> empty = Stream.empty();

System.out.println(empty.count());
```

Output:

```text
0
```

An empty stream can be useful when a method needs to return a stream but has no elements to provide.

### 5.5 A stream from a range of integers

For primitive integer ranges, use `IntStream`:

```java
IntStream.range(1, 5)
         .forEach(System.out::println);
```

Output:

```text
1
2
3
4
```

`range(start, end)` includes the start and excludes the end.

To include the end, use `rangeClosed()`:

```java
IntStream.rangeClosed(1, 5)
         .forEach(System.out::println);
```

Output:

```text
1
2
3
4
5
```

### 5.6 A generated stream

```java
Stream.generate(() -> "Java")
      .limit(3)
      .forEach(System.out::println);
```

Output:

```text
Java
Java
Java
```

`Stream.generate()` creates an infinite stream by default. `limit(3)` restricts processing to three elements.

### 5.7 An iterated stream

```java
Stream.iterate(1, n -> n + 1)
      .limit(5)
      .forEach(System.out::println);
```

Output:

```text
1
2
3
4
5
```

The first argument is the seed, and the second argument describes how to generate the next element.

### 5.8 Primitive streams

Java includes specialized streams for primitive values:

- `IntStream`
- `LongStream`
- `DoubleStream`

Example:

```java
int sum = IntStream.rangeClosed(1, 5).sum();
System.out.println(sum);
```

Output:

```text
15
```

These streams provide operations such as `sum()`, `average()`, `min()`, and `max()` and can avoid some boxing overhead associated with `Stream<Integer>`.

---

## 6. Intermediate Operations and Laziness

Intermediate operations return a new stream and are generally lazy. They do not process elements until a terminal operation starts the pipeline.

Consider:

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

Stream<Integer> result = numbers.stream()
        .filter(n -> {
            System.out.println("Checking " + n);
            return n > 3;
        });

System.out.println("Pipeline created");
```

Output:

```text
Pipeline created
```

Nothing is printed by the filter because no terminal operation has started processing.

Now add a terminal operation:

```java
result.forEach(System.out::println);
```

It prints:

```text
Checking 1
Checking 2
Checking 3
Checking 4
4
Checking 5
5
```

The stream processes the elements when the terminal operation is invoked.

This lazy behavior can improve efficiency because Java may avoid processing elements that are not needed, especially when operations such as `limit()`, `findFirst()`, or `anyMatch()` allow early termination.

---

## 7. `filter()` — Select Elements

`filter()` keeps elements that satisfy a condition. It accepts a `Predicate<T>`.

Syntax:

```java
stream.filter(condition)
```

### 7.1 Example: even numbers

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

numbers.stream()
       .filter(n -> n % 2 == 0)
       .forEach(System.out::println);
```

Output:

```text
2
4
6
```

### 7.2 Example: filter strings

```java
List<String> names = List.of("Aman", "Riya", "Alexander", "Neha");

names.stream()
     .filter(name -> name.length() > 4)
     .forEach(System.out::println);
```

Output:

```text
Alexander
```

`filter()` does not change an element; it decides whether that element continues through the pipeline.

### 7.3 Multiple filters

```java
numbers.stream()
       .filter(n -> n > 2)
       .filter(n -> n % 2 == 0)
       .forEach(System.out::println);
```

Output:

```text
4
6
```

This first keeps numbers greater than two, then keeps even numbers. You could combine the conditions into one predicate, but multiple filters can sometimes make a pipeline easier to read.

---

## 8. `map()` — Transform Each Element

`map()` applies a function to each element and emits the transformed result.

Syntax:

```java
stream.map(transformation)
```

### 8.1 Square each number

```java
List<Integer> numbers = List.of(1, 2, 3, 4);

numbers.stream()
       .map(n -> n * n)
       .forEach(System.out::println);
```

Output:

```text
1
4
9
16
```

### 8.2 Convert strings to uppercase

```java
List<String> names = List.of("aman", "riya", "neha");

names.stream()
     .map(String::toUpperCase)
     .forEach(System.out::println);
```

Output:

```text
AMAN
RIYA
NEHA
```

### 8.3 Extract a field from objects

```java
class Student {
    private final String name;
    private final int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    public String getName() {
        return name;
    }

    public int getMarks() {
        return marks;
    }
}
```

Use `map()` to extract the names:

```java
List<Student> students = List.of(
    new Student("Aman", 80),
    new Student("Riya", 92),
    new Student("Neha", 75)
);

students.stream()
        .map(Student::getName)
        .forEach(System.out::println);
```

Output:

```text
Aman
Riya
Neha
```

The stream begins with `Student` objects and maps each one to a `String`.

### 8.4 `map()` can change the element type

For example:

```java
List<String> words = List.of("Java", "Stream", "API");

List<Integer> lengths = words.stream()
        .map(String::length)
        .toList();

System.out.println(lengths);
```

Output:

```text
[4, 6, 3]
```

`Stream<String>` becomes `Stream<Integer>` because each string is mapped to its length. This example uses `Stream.toList()`, available from Java 16. For older Java versions, use `collect(Collectors.toList())`.

---

## 9. `flatMap()` — Flatten Nested Data

Use `flatMap()` when each input element can produce a stream of zero or more output elements, and you want one combined stream.

Imagine you have a list of lists:

```text
[[1, 2], [3, 4], [5, 6]]
```

Calling `map()` with `List::stream` would create a stream of streams. `flatMap()` combines the inner streams into one stream:

```text
[1, 2, 3, 4, 5, 6]
```

### 9.1 Example: flatten lists of numbers

```java
List<List<Integer>> groups = List.of(
    List.of(1, 2),
    List.of(3, 4),
    List.of(5, 6)
);

groups.stream()
      .flatMap(List::stream)
      .forEach(System.out::println);
```

Output:

```text
1
2
3
4
5
6
```

### 9.2 Example: split sentences into words

```java
List<String> sentences = List.of(
    "Java is powerful",
    "Streams process data"
);

sentences.stream()
         .flatMap(sentence -> Arrays.stream(sentence.split(" ")))
         .forEach(System.out::println);
```

Output:

```text
Java
is
powerful
Streams
process
data
```

Each sentence is transformed into a stream of words, and `flatMap()` combines all those words into one stream.

### 9.3 `map()` vs `flatMap()`

| `map()` | `flatMap()` |
|---|---|
| Maps each element to one result | Maps each element to a stream or other supported mapped stream source |
| Can produce nested streams | Flattens the mapped streams into one stream |
| Example: `String` to its length | Example: sentence to a stream of words |

Use `map()` for one-to-one transformations, such as `Student` to student name. Use `flatMap()` when each input can yield multiple results, such as a sentence to words or a customer to a stream of orders.

---

## 10. `distinct()` — Remove Duplicates

`distinct()` removes duplicate elements according to equality, using `equals()` and `hashCode()` behavior for objects.

```java
List<Integer> numbers = List.of(1, 2, 2, 3, 3, 3, 4);

numbers.stream()
       .distinct()
       .forEach(System.out::println);
```

Output:

```text
1
2
3
4
```

For ordered streams, `distinct()` preserves the encounter order of the first occurrence of each distinct element.

### 10.1 Distinct strings

```java
List<String> names = List.of("Aman", "Riya", "Aman", "Neha", "Riya");

List<String> uniqueNames = names.stream()
        .distinct()
        .toList();

System.out.println(uniqueNames);
```

Output:

```text
[Aman, Riya, Neha]
```

### 10.2 Distinct custom objects

For custom objects, `distinct()` relies on `equals()` and `hashCode()`. If a class does not override these methods, two separate instances with the same field values are generally not considered equal by the default `Object.equals()` implementation.

Therefore, if you want students with the same ID to count as duplicates, implement `equals()` and `hashCode()` accordingly, or first map students to their IDs and call `distinct()` on the IDs.

---

## 11. `sorted()` — Sort Stream Elements

`sorted()` orders elements using natural ordering. An overload accepts a comparator.

### 11.1 Natural order

```java
List<Integer> numbers = List.of(40, 10, 30, 20);

numbers.stream()
       .sorted()
       .forEach(System.out::println);
```

Output:

```text
10
20
30
40
```

### 11.2 Descending order

```java
numbers.stream()
       .sorted(Comparator.reverseOrder())
       .forEach(System.out::println);
```

Output:

```text
40
30
20
10
```

### 11.3 Sort objects by a field

```java
students.stream()
        .sorted(Comparator.comparingInt(Student::getMarks))
        .map(Student::getName)
        .forEach(System.out::println);
```

This sorts students by marks in ascending order, then extracts and prints their names.

For descending marks:

```java
students.stream()
        .sorted(Comparator.comparingInt(Student::getMarks).reversed())
        .forEach(student ->
                System.out.println(student.getName() + ": " + student.getMarks()));
```

`sorted()` does not mutate the original collection. It arranges the elements in the stream pipeline.

---

## 12. `limit()` — Keep the First N Elements

`limit(n)` restricts the stream to at most `n` elements.

```java
List<Integer> numbers = List.of(10, 20, 30, 40, 50);

numbers.stream()
       .limit(3)
       .forEach(System.out::println);
```

Output:

```text
10
20
30
```

For an ordered stream, these are the first three elements in encounter order. If fewer than `n` elements exist, all available elements are emitted.

`limit()` is especially useful with infinite streams:

```java
Stream.iterate(1, n -> n + 1)
      .limit(5)
      .forEach(System.out::println);
```

Without a limiting or other short-circuiting operation, this infinite stream would not finish.

---

## 13. `skip()` — Ignore the First N Elements

`skip(n)` discards the first `n` elements and emits the remaining ones.

```java
List<Integer> numbers = List.of(10, 20, 30, 40, 50);

numbers.stream()
       .skip(2)
       .forEach(System.out::println);
```

Output:

```text
30
40
50
```

If `n` is greater than or equal to the number of elements, the resulting stream is empty. The argument must not be negative.

### 13.1 Use `skip()` and `limit()` for pagination

To get three elements starting from zero-based position three:

```java
List<Integer> page = numbers.stream()
        .skip(3)
        .limit(3)
        .toList();
```

For the five-element list above, the result is:

```text
[40, 50]
```

Only two elements remain after skipping three, so the result contains two values rather than three.

For large databases, use database pagination rather than loading every row into Java and skipping through the entire stream.

---

## 14. `peek()` — Inspect Elements During Processing

`peek()` performs an action on elements as they pass through a pipeline and returns a stream containing those elements. It is mainly intended for debugging or observing a pipeline.

```java
List<Integer> numbers = List.of(1, 2, 3, 4);

numbers.stream()
       .filter(n -> n % 2 == 0)
       .peek(n -> System.out.println("After filter: " + n))
       .map(n -> n * n)
       .peek(n -> System.out.println("After map: " + n))
       .forEach(System.out::println);
```

Output:

```text
After filter: 2
After map: 4
4
After filter: 4
After map: 16
16
```

The exact way operations are interleaved is driven by stream execution. In this sequential example, each element moves through the pipeline before the next element is processed.

**Important:** Do not rely on `peek()` for essential business logic or required side effects. A stream implementation may optimize parts of a pipeline, and short-circuiting operations may prevent some elements from being processed. Use a terminal operation such as `forEach()` when performing an action is the actual goal.

---

## 15. Combining Intermediate Operations

The real benefit of streams appears when operations are chained.

Suppose you have numbers and want to:
1. Keep numbers greater than 10.
2. Remove duplicates.
3. Sort in ascending order.
4. Double each number.
5. Print the first three results.

```java
List<Integer> numbers =
        List.of(5, 20, 10, 20, 30, 15, 40, 30);

numbers.stream()
       .filter(n -> n > 10)
       .distinct()
       .sorted()
       .map(n -> n * 2)
       .limit(3)
       .forEach(System.out::println);
```

Output:

```text
30
40
60
```

Step-by-step:
- Original values: `5, 20, 10, 20, 30, 15, 40, 30`
- After `filter(n -> n > 10)`: `20, 20, 30, 15, 40, 30`
- After `distinct()`: `20, 30, 15, 40`
- After `sorted()`: `15, 20, 30, 40`
- After `map(n -> n * 2)`: `30, 40, 60, 80`
- After `limit(3)`: `30, 40, 60`

The original list is unchanged.

---

## 16. Operation Ordering and Efficiency

Different pipelines can produce the same result but do different amounts of work.

For example:

```java
numbers.stream()
       .filter(n -> n > 10)
       .map(n -> n * 2)
       .toList();
```

Often, filtering before mapping is a good choice because elements that fail the condition do not need to be transformed.

However, operations such as `sorted()` and `distinct()` have different costs and constraints. `sorted()` generally needs to examine and buffer the input before it can emit the fully sorted result for an ordered stream. `limit()` can short-circuit some work, but it cannot always prevent the work required by earlier stateful operations such as sorting.

Do not reorder operations blindly. Reordering is safe only if it preserves the intended result and behavior.

For example, these pipelines are not equivalent:

```java
numbers.stream()
       .filter(n -> n > 10)
       .limit(3);
```

and:

```java
numbers.stream()
       .limit(3)
       .filter(n -> n > 10);
```

The first takes the first three values that satisfy the filter. The second examines only the first three source values, then filters those.

---

## 17. Stream Reuse: A Common Error

A stream should be used only once. After a terminal operation, it is consumed and cannot be reused.

Incorrect:

```java
Stream<Integer> stream = List.of(1, 2, 3).stream();

System.out.println(stream.count());
System.out.println(stream.count()); // Illegal: stream has already been operated upon or closed
```

The second terminal operation throws an `IllegalStateException` in ordinary stream implementations.

Correct: create a new stream from the source for each independent operation.

```java
List<Integer> numbers = List.of(1, 2, 3);

long count = numbers.stream().count();
long sum = numbers.stream().mapToLong(Integer::longValue).sum();

System.out.println(count);
System.out.println(sum);
```

Output:

```text
3
6
```

If the source itself is not reusable—for example, some I/O sources—follow that source's own lifecycle rules as well.

---

## 18. Avoid Modifying the Source While Streaming

Avoid modifying a collection from within a stream pipeline that is reading from the same collection.

Problematic pattern:

```java
List<Integer> numbers = new ArrayList<>(List.of(1, 2, 3, 4));

numbers.stream().forEach(n -> {
    if (n % 2 == 0) {
        numbers.remove(n);
    }
});
```

This can cause unexpected behavior or a `ConcurrentModificationException`.

Use the collection's supported removal operation instead:

```java
numbers.removeIf(n -> n % 2 == 0);
System.out.println(numbers);
```

Output:

```text
[1, 3]
```

Or create a new filtered list:

```java
List<Integer> oddNumbers = numbers.stream()
        .filter(n -> n % 2 != 0)
        .toList();
```

This produces a result list without changing the source. Remember that `Stream.toList()` returns an unmodifiable list in modern Java.

---

## 19. Stream Ordering and Encounter Order

A stream may have an encounter order, which is the order in which its elements are presented by the source and pipeline.

For example, a list stream normally preserves the list's encounter order:

```java
List<Integer> numbers = List.of(4, 1, 3, 2);

numbers.stream().forEach(System.out::println);
```

Output:

```text
4
1
3
2
```

`sorted()` establishes sorted order:

```java
numbers.stream().sorted().forEach(System.out::println);
```

Output:

```text
1
2
3
4
```

Not every stream source has a meaningful encounter order. For example, some concurrent or unordered sources may not promise a stable order. Parallel streams can also change the order in which actions execute, even when the final result respects an encounter-order requirement. Avoid relying on print order from parallel operations unless the relevant API guarantees it.

---

## 20. Working with Optional Results from Intermediate Steps

Some terminal operations such as `min()` and `max()` return an `Optional<T>` because a stream may be empty. Although these are terminal operations rather than intermediate operations, they are commonly used with stream pipelines.

```java
List<Integer> numbers = List.of(12, 5, 30, 8);

Optional<Integer> maximum = numbers.stream().max(Integer::compareTo);

maximum.ifPresent(System.out::println);
```

Output:

```text
30
```

For an empty stream, `max()` returns `Optional.empty()`. `ifPresent()` runs the action only when a value exists.

Do not call `get()` on an `Optional` without knowing it contains a value. Prefer `ifPresent()`, `orElse()`, `orElseGet()`, or an explicit presence check depending on the situation.

---

## 21. Complete Practical Example: Product Processing

This example filters products in stock, removes no products based on identity, sorts by price, transforms products into display strings, and limits the results.

```java
import java.util.Comparator;
import java.util.List;

class Product {
    private final String name;
    private final double price;
    private final boolean inStock;

    Product(String name, double price, boolean inStock) {
        this.name = name;
        this.price = price;
        this.inStock = inStock;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public boolean isInStock() {
        return inStock;
    }

    @Override
    public String toString() {
        return name + " - ₹" + price;
    }
}

public class Main {
    public static void main(String[] args) {
        List<Product> products = List.of(
            new Product("Keyboard", 1200, true),
            new Product("Mouse", 600, true),
            new Product("Monitor", 9000, false),
            new Product("USB Cable", 250, true),
            new Product("Headphones", 1800, true)
        );

        List<String> result = products.stream()
                .filter(Product::isInStock)
                .sorted(Comparator.comparingDouble(Product::getPrice))
                .limit(3)
                .map(Product::toString)
                .toList();

        result.forEach(System.out::println);
    }
}
```

Output:

```text
USB Cable - ₹250.0
Mouse - ₹600.0
Keyboard - ₹1200.0
```

Explanation:
1. `filter(Product::isInStock)` keeps products that are in stock.
2. `sorted(...)` orders them by price ascending.
3. `limit(3)` keeps the three cheapest in-stock products.
4. `map(Product::toString)` converts each product into a string.
5. `toList()` collects the results into a list.
6. `forEach()` prints the list's values.

For money calculations in real financial software, use `BigDecimal` or an integer number of minor currency units rather than relying on `double` for exact decimal arithmetic. The `double` is used here to keep the sorting example straightforward.

---

## 22. Common Mistakes

1. **Confusing a stream with a collection.** A stream processes elements; it is not a general-purpose storage structure.
2. **Trying to reuse a stream.** Create a new stream for another terminal operation.
3. **Forgetting a terminal operation.** Intermediate operations are lazy, so the pipeline may do no work until a terminal operation runs.
4. **Using `map()` when you need to flatten nested data.** Use `flatMap()` when each input yields multiple outputs.
5. **Assuming `distinct()` compares custom objects by all fields automatically.** It relies on `equals()` and `hashCode()`.
6. **Expecting `sorted()` to change the original list.** It orders the stream, not the source collection.
7. **Using `peek()` for required application logic.** It is primarily a debugging/inspection operation.
8. **Modifying the source collection during stream traversal.** Use supported collection operations or create a new result.
9. **Assuming every stream is ordered.** Ordering depends on the source and operations.
10. **Assuming parallel streams always run faster.** Parallel overhead can outweigh the benefits, especially for small tasks.
11. **Forgetting that `Stream.toList()` returns an unmodifiable list.** Use a mutable collector if later modification is required.
12. **Using `limit()` before or after `filter()` without considering the difference.** Operation order can change the result.

---

## 23. Interview Questions and Answers

### Q1. What is the Stream API?

It is a Java API for processing sequences of elements through operations such as filtering, transforming, sorting, and collecting results.

### Q2. What is the difference between a collection and a stream?

A collection manages or stores elements. A stream processes elements from a source through a pipeline.

### Q3. What are intermediate operations?

Operations that return another stream, such as `filter()`, `map()`, `distinct()`, and `sorted()`.

### Q4. What are terminal operations?

Operations that produce a result or side effect and consume the stream, such as `count()`, `collect()`, `forEach()`, and `reduce()`.

### Q5. What does lazy evaluation mean in streams?

Intermediate operations generally do not process elements until a terminal operation begins execution.

### Q6. What is the difference between `map()` and `flatMap()`?

`map()` transforms each element into one result. `flatMap()` maps each element to a stream and flattens the mapped streams into one stream.

### Q7. What does `filter()` do?

It retains only elements for which the supplied predicate returns `true`.

### Q8. What does `distinct()` use to identify duplicates?

It uses `equals()` and `hashCode()` behavior for elements.

### Q9. Does `sorted()` change the source list?

No. It sorts elements in the stream pipeline and does not directly reorder the source collection.

### Q10. What is the difference between `limit()` and `skip()`?

`limit(n)` emits at most the first `n` elements. `skip(n)` discards the first `n` elements.

### Q11. Can a stream be reused?

No. A stream should be consumed once. Create another stream for another pipeline.

### Q12. What is `peek()` used for?

Primarily for inspecting elements as they pass through a pipeline, often during debugging. It should not be relied on for essential side effects.

### Q13. How do you create a stream from an array?

Use `Arrays.stream(array)` or `Stream.of()` for suitable object arrays and values.

### Q14. What are primitive streams?

`IntStream`, `LongStream`, and `DoubleStream` are specialized streams for primitive values. They provide numeric operations and can reduce boxing.

### Q15. Does `Stream.toList()` return a mutable list?

No. It returns an unmodifiable list. Use an appropriate collector such as `Collectors.toCollection(ArrayList::new)` if you need a mutable `ArrayList`.

### Q16. Why should you avoid modifying a collection while streaming it?

Doing so can violate the source's traversal rules, cause unexpected results, or throw a `ConcurrentModificationException`.

---

## 24. Practice Exercises

Try implementing these programs yourself.

1. Create a list of integers and print only odd numbers using `filter()`.
2. Convert a list of strings into a list of their lengths using `map()`.
3. Remove duplicate integers using `distinct()`.
4. Sort a list of strings by length.
5. Sort students by marks descending and then by name ascending.
6. Flatten a list of lists into one list using `flatMap()`.
7. Split a list of sentences into words and print every word.
8. Generate the first ten positive integers using `Stream.iterate()` and `limit()`.
9. Use `IntStream.rangeClosed()` to calculate the sum from 1 to 100.
10. Use `skip()` and `limit()` to select a page of results from a list.
11. Use `peek()` to inspect elements during a pipeline, but keep the actual required output in a terminal operation.
12. Filter products that are in stock, sort by price, and print the three cheapest products.
13. Try calling two terminal operations on the same stream and observe the result. Then fix the program by creating two streams.
14. Create a custom class, override `equals()` and `hashCode()`, and test how `distinct()` handles duplicate instances.
15. Compare the results of filtering before `limit()` with limiting before filtering.

### Output prediction 1

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

numbers.stream()
       .filter(n -> n > 2)
       .map(n -> n * 10)
       .limit(2)
       .forEach(System.out::println);
```

Answer:

```text
30
40
```

### Output prediction 2

```java
List<Integer> numbers = List.of(4, 1, 4, 2, 1, 3);

numbers.stream()
       .distinct()
       .sorted()
       .forEach(System.out::println);
```

Answer:

```text
1
2
3
4
```

### Output prediction 3

```java
List<List<String>> groups = List.of(
    List.of("Java", "C++"),
    List.of("Python"),
    List.of("Go", "Rust")
);

groups.stream()
      .flatMap(List::stream)
      .map(String::toUpperCase)
      .forEach(System.out::println);
```

Answer:

```text
JAVA
C++
PYTHON
GO
RUST
```

---

## 25. Quick Revision Checklist

Make sure you can explain these points:

- A stream processes elements from a source; it is not a collection.
- A pipeline consists of a source, intermediate operations, and a terminal operation.
- Intermediate operations are generally lazy.
- `filter()` selects elements.
- `map()` transforms each element.
- `flatMap()` flattens mapped streams.
- `distinct()` removes duplicates according to equality.
- `sorted()` orders stream elements.
- `limit()` keeps at most the first `n` elements.
- `skip()` discards the first `n` elements.
- `peek()` is mainly for debugging and inspection.
- A stream should not be reused after a terminal operation.
- Avoid modifying the source collection while streaming it.
- `IntStream`, `LongStream`, and `DoubleStream` support primitive values.
- `Stream.toList()` returns an unmodifiable list.

## 26. Final Summary

The Stream API lets you express data-processing tasks as pipelines. Intermediate operations such as `filter()`, `map()`, `flatMap()`, `distinct()`, `sorted()`, `limit()`, and `skip()` describe how elements should be selected, transformed, and ordered. These operations are generally lazy and begin processing when a terminal operation is invoked.

Streams are most useful when they make a transformation clearer. Keep pipelines readable, avoid unwanted side effects, do not reuse a consumed stream, and remember that stream processing does not automatically modify the original collection.

**Next chapter: Chapter 43 — Java Stream API: Terminal Operations, Collectors, and Reduction.**
