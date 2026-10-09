# Chapter 43: Java Stream API — Terminal Operations, Collectors, and Reduction

## 1. What You Will Learn

This chapter continues the Stream API from Chapter 42. You will learn how to finish a stream pipeline and turn its elements into useful results.

Topics include:

- Terminal operations and why they consume a stream.
- `forEach()`, `forEachOrdered()`, `count()`, `min()`, `max()`, and `findFirst()`.
- `findAny()`, `anyMatch()`, `allMatch()`, and `noneMatch()`.
- `reduce()` for combining values into one result.
- `collect()` and the `Collectors` utility class.
- Creating lists, sets, and maps from streams.
- `joining()`, `counting()`, `summarizingInt()`, `groupingBy()`, and `partitioningBy()`.
- Downstream collectors and multi-level grouping.
- Primitive stream numeric operations.
- Common mistakes, practical programs, exercises, and interview questions.

A terminal operation completes a stream pipeline. It either produces a result, such as a number or `Optional`, or performs an action, such as printing elements.

---

## 2. What Is a Terminal Operation?

A stream pipeline normally has a source, zero or more intermediate operations, and one terminal operation.

```text
Source → Intermediate operations → Terminal operation
```

Example:

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

long count = numbers.stream()
        .filter(n -> n % 2 == 0)
        .count();

System.out.println(count);
```

Output:

```text
3
```

Here, `stream()` creates the stream, `filter()` is an intermediate operation, and `count()` is the terminal operation.

After a terminal operation completes, the stream is considered consumed and should not be reused. Create a new stream for a separate operation.

---

## 3. `forEach()` — Perform an Action for Each Element

`forEach()` applies a `Consumer` to every element that reaches the terminal operation.

```java
List<String> names = List.of("Aman", "Riya", "Neha");

names.stream()
     .forEach(name -> System.out.println(name));
```

Output:

```text
Aman
Riya
Neha
```

A method reference makes the same code shorter:

```java
names.stream().forEach(System.out::println);
```

`forEach()` returns `void`; it does not create a new list or return a value.

### 3.1 `forEach()` with a calculation

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

The mapping happens before the terminal action.

### 3.2 `forEach()` and ordering

For a sequential stream with an encounter order, `forEach()` normally processes elements in that order. For a parallel stream, actions may execute in an order different from the encounter order.

If you need the action to respect encounter order, `forEachOrdered()` may be appropriate:

```java
List<Integer> numbers = List.of(1, 2, 3, 4);

numbers.parallelStream()
       .forEachOrdered(System.out::println);
```

Output order:

```text
1
2
3
4
```

`forEachOrdered()` preserves encounter order when the stream has one. It may reduce the benefits of parallel processing, so use it only when order matters.

Avoid using `forEach()` to modify the same collection being traversed by the stream. Use collection methods such as `removeIf()` or produce a new result instead.

---

## 4. `count()` — Count Elements

`count()` returns a `long` representing the number of elements in the stream.

```java
List<String> names = List.of("Aman", "Riya", "Neha", "Kabir");

long count = names.stream().count();

System.out.println(count);
```

Output:

```text
4
```

### 4.1 Count matching elements

```java
List<Integer> numbers = List.of(10, 15, 20, 25, 30);

long evenCount = numbers.stream()
        .filter(n -> n % 2 == 0)
        .count();

System.out.println(evenCount);
```

Output:

```text
3
```

The even numbers are `10`, `20`, and `30`.

The result type is `long`, not `int`, because a stream may represent a number of elements that exceeds the range of an `int`.

---

## 5. `min()` and `max()` — Find the Smallest or Largest Element

`min()` and `max()` use natural ordering or a comparator and return an `Optional<T>` because the stream may be empty.

### 5.1 Find the minimum

```java
List<Integer> numbers = List.of(40, 10, 30, 20);

Optional<Integer> minimum = numbers.stream().min(Integer::compareTo);

minimum.ifPresent(System.out::println);
```

Output:

```text
10
```

### 5.2 Find the maximum

```java
Optional<Integer> maximum = numbers.stream().max(Integer::compareTo);

maximum.ifPresent(System.out::println);
```

Output:

```text
40
```

### 5.3 Use a comparator for objects

```java
Optional<Student> topStudent = students.stream()
        .max(Comparator.comparingInt(Student::getMarks));
```

This finds a student with the maximum marks. If several students tie for maximum marks, do not assume which matching object will be returned unless the comparator and pipeline establish a suitable tie-breaking rule.

### 5.4 What if the stream is empty?

```java
Optional<Integer> result = Stream.<Integer>empty().max(Integer::compareTo);

System.out.println(result.isPresent());
```

Output:

```text
false
```

Use `ifPresent()`, `orElse()`, `orElseGet()`, or an explicit presence check rather than calling `get()` blindly.

---

## 6. `findFirst()` and `findAny()`

These operations return an `Optional<T>` containing an element, if one is available.

### 6.1 `findFirst()`

`findFirst()` returns the first element in encounter order when the stream has an encounter order.

```java
List<Integer> numbers = List.of(10, 20, 30, 40);

Optional<Integer> first = numbers.stream().findFirst();

System.out.println(first.orElse(-1));
```

Output:

```text
10
```

With filtering:

```java
Optional<Integer> firstEven = numbers.stream()
        .filter(n -> n % 4 == 0)
        .findFirst();

System.out.println(firstEven.orElse(-1));
```

Output:

```text
40
```

### 6.2 `findAny()`

`findAny()` returns some element from the stream, if one exists. It is especially useful when any matching element is acceptable and the pipeline may run in parallel.

```java
Optional<Integer> result = numbers.stream()
        .filter(n -> n > 20)
        .findAny();

System.out.println(result.orElse(-1));
```

For this sequential ordered example, the result is commonly `30`, but the API does not promise that `findAny()` must return the first matching element. Do not rely on a specific result when multiple elements match.

### 6.3 Difference

| `findFirst()` | `findAny()` |
|---|---|
| Requests the first element in encounter order, if one exists | May return any element |
| Useful when the first match matters | Useful when any match is enough |
| Encounter-order constraints can matter in parallel pipelines | Can offer more freedom to parallel execution |

Both return an empty `Optional` when the stream has no elements to return.

---

## 7. `anyMatch()`, `allMatch()`, and `noneMatch()`

These methods test whether elements satisfy a predicate. They return a `boolean` and can short-circuit: the stream may stop as soon as the answer is known.

### 7.1 `anyMatch()`

Returns `true` if at least one element matches.

```java
List<Integer> numbers = List.of(1, 3, 5, 8, 9);

boolean hasEven = numbers.stream().anyMatch(n -> n % 2 == 0);

System.out.println(hasEven);
```

Output:

```text
true
```

### 7.2 `allMatch()`

Returns `true` if every element matches.

```java
boolean allPositive = numbers.stream().allMatch(n -> n > 0);

System.out.println(allPositive);
```

Output:

```text
true
```

### 7.3 `noneMatch()`

Returns `true` if no element matches.

```java
boolean noNegative = numbers.stream().noneMatch(n -> n < 0);

System.out.println(noNegative);
```

Output:

```text
true
```

### 7.4 Empty-stream behavior

For an empty stream:
- `anyMatch(predicate)` returns `false`.
- `allMatch(predicate)` returns `true`.
- `noneMatch(predicate)` returns `true`.

This follows the logical definitions: no element is a counterexample to “all elements match,” and no element matches the predicate for `noneMatch()`.

---

## 8. `reduce()` — Combine Elements into One Result

Reduction combines stream elements repeatedly to produce one result. It is useful for operations such as summing numbers, multiplying values, or combining values according to a rule.

### 8.1 Sum with `reduce()`

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

int sum = numbers.stream()
        .reduce(0, (a, b) -> a + b);

System.out.println(sum);
```

Output:

```text
15
```

The `0` is the identity value. The accumulator combines the current result with the next element.

Conceptually:

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
10 + 5 = 15
```

For ordinary numeric work, `IntStream.sum()` is often clearer. `reduce()` is valuable when you need a custom combining operation.

### 8.2 Product of numbers

```java
int product = numbers.stream()
        .reduce(1, (a, b) -> a * b);

System.out.println(product);
```

Output:

```text
120
```

The identity is `1`, because multiplying by `1` does not change a value.

### 8.3 Reduce without an identity

```java
Optional<Integer> sum = numbers.stream()
        .reduce((a, b) -> a + b);

System.out.println(sum.orElse(0));
```

Output:

```text
15
```

Without an identity, the result may not exist if the stream is empty, so the overload returns `Optional<T>`.

### 8.4 Choose a valid identity

The identity should not change the result when combined with any element. For addition, the identity is `0`. For multiplication, it is `1`.

Using an incorrect identity can produce incorrect results:

```java
int wrongSum = numbers.stream().reduce(10, Integer::sum);
```

This returns `25`, not `15`, because the initial `10` is included in the reduction.

### 8.5 Reduction rules and parallel streams

For reliable reductions, the combining operation should be associative, and the identity must be appropriate. Associativity means grouping does not change the result:

```text
(a + b) + c = a + (b + c)
```

This matters because parallel reduction may combine partial results in different groupings. Avoid accumulators that rely on order-dependent side effects or changing external state.

Floating-point addition can produce small rounding differences when grouping changes, so do not assume all floating-point reductions are bit-for-bit identical across execution strategies.

---

## 9. `collect()` — Gather Stream Results

`collect()` is a terminal operation used to accumulate stream elements into a result, such as a list, set, map, or summary structure.

Modern Java provides convenient collectors through the `Collectors` utility class.

```java
import java.util.stream.Collectors;
```

### 9.1 Collect into a list

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

List<Integer> evenNumbers = numbers.stream()
        .filter(n -> n % 2 == 0)
        .collect(Collectors.toList());

System.out.println(evenNumbers);
```

Output:

```text
[2, 4, 6]
```

`Collectors.toList()` does not promise a specific concrete list type or mutability contract. If you specifically need a mutable `ArrayList`, use:

```java
ArrayList<Integer> result = numbers.stream()
        .filter(n -> n % 2 == 0)
        .collect(Collectors.toCollection(ArrayList::new));
```

### 9.2 Collect into a set

```java
List<Integer> values = List.of(1, 2, 2, 3, 3, 4);

Set<Integer> unique = values.stream()
        .collect(Collectors.toSet());

System.out.println(unique);
```

This set contains `1`, `2`, `3`, and `4`. The `Collectors.toSet()` collector does not guarantee the concrete set type or iteration order.

If you specifically need insertion order:

```java
Set<Integer> orderedUnique = values.stream()
        .collect(Collectors.toCollection(LinkedHashSet::new));
```

### 9.3 `Stream.toList()` versus `Collectors.toList()`

```java
List<Integer> immutableResult = values.stream().distinct().toList();
List<Integer> collectedResult = values.stream().distinct()
        .collect(Collectors.toList());
```

- `Stream.toList()` is available from Java 16 and returns an unmodifiable list.
- `Collectors.toList()` is available from Java 8 and does not guarantee mutability or a concrete implementation.
- `Collectors.toCollection(ArrayList::new)` explicitly asks for an `ArrayList`.

Choose based on the Java version and the result's required behavior.

---

## 10. `Collectors.joining()` — Join Strings

`joining()` combines character sequences into one string.

### 10.1 Basic joining

```java
List<String> names = List.of("Aman", "Riya", "Neha");

String result = names.stream()
        .collect(Collectors.joining());

System.out.println(result);
```

Output:

```text
AmanRiyaNeha
```

### 10.2 Joining with a delimiter

```java
String result = names.stream()
        .collect(Collectors.joining(", "));

System.out.println(result);
```

Output:

```text
Aman, Riya, Neha
```

### 10.3 Delimiter, prefix, and suffix

```java
String result = names.stream()
        .collect(Collectors.joining(", ", "[", "]"));

System.out.println(result);
```

Output:

```text
[Aman, Riya, Neha]
```

This is useful for readable summaries, CSV-like output, and display strings. For actual CSV files, proper escaping and quoting may be needed; `joining()` alone does not implement the CSV format.

---

## 11. `Collectors.counting()`, `summingInt()`, and `averagingInt()`

Collectors can compute statistics while collecting a stream.

### 11.1 Count

```java
long count = names.stream().collect(Collectors.counting());
System.out.println(count);
```

Output:

```text
3
```

For a simple stream count, `stream.count()` is more direct. `counting()` becomes especially useful as a downstream collector in grouping operations.

### 11.2 Sum integer fields

Suppose `Student` has a `getMarks()` method:

```java
int totalMarks = students.stream()
        .collect(Collectors.summingInt(Student::getMarks));
```

### 11.3 Average

```java
double average = students.stream()
        .collect(Collectors.averagingInt(Student::getMarks));
```

`averagingInt()` returns a `double`. For an empty stream, it returns `0.0`.

### 11.4 Summarize integer values

```java
IntSummaryStatistics stats = students.stream()
        .collect(Collectors.summarizingInt(Student::getMarks));

System.out.println(stats.getCount());
System.out.println(stats.getSum());
System.out.println(stats.getMin());
System.out.println(stats.getMax());
System.out.println(stats.getAverage());
```

The statistics object provides count, sum, minimum, maximum, and average in one result. For an empty input, count and sum are zero; min and max use their defined empty-statistics values, and average is `0.0`.

---

## 12. `groupingBy()` — Group Elements by a Key

`groupingBy()` is one of the most useful collectors. It groups elements based on a classifier function and returns a map.

### 12.1 Group strings by length

```java
List<String> words = List.of("cat", "dog", "apple", "kiwi", "pear");

Map<Integer, List<String>> grouped = words.stream()
        .collect(Collectors.groupingBy(String::length));

System.out.println(grouped);
```

Conceptual result:

```text
{3=[cat, dog], 4=[kiwi, pear], 5=[apple]}
```

The map's concrete type and key iteration order are not guaranteed by this collector. The lists for each group preserve the encounter order for an ordered stream under the usual grouping collector behavior.

### 12.2 Group students by pass/fail status

```java
Map<String, List<Student>> grouped = students.stream()
        .collect(Collectors.groupingBy(
            student -> student.getMarks() >= 40 ? "Pass" : "Fail"
        ));
```

Each student is placed in either the `"Pass"` group or the `"Fail"` group.

### 12.3 Group by a property

If `Employee` has a `getDepartment()` method:

```java
Map<String, List<Employee>> byDepartment = employees.stream()
        .collect(Collectors.groupingBy(Employee::getDepartment));
```

The result maps each department name to the employees in that department.

---

## 13. Downstream Collectors

A downstream collector lets you decide what to collect for each group rather than always collecting a list.

### 13.1 Count elements per group

```java
Map<Integer, Long> counts = words.stream()
        .collect(Collectors.groupingBy(
            String::length,
            Collectors.counting()
        ));
```

This maps each word length to the number of words with that length.

Example result:

```text
{3=2, 4=2, 5=1}
```

### 13.2 Sum marks by department

```java
Map<String, Integer> totalMarksByDepartment = students.stream()
        .collect(Collectors.groupingBy(
            Student::getDepartment,
            Collectors.summingInt(Student::getMarks)
        ));
```

The map contains the total marks for each department.

### 13.3 Collect only names per group

```java
Map<Integer, List<String>> namesByLength = words.stream()
        .collect(Collectors.groupingBy(
            String::length,
            Collectors.mapping(
                String::toUpperCase,
                Collectors.toList()
            )
        ));
```

The downstream `mapping()` transforms each element before the nested collector collects it.

---

## 14. `partitioningBy()` — Divide Into Two Groups

`partitioningBy()` groups elements according to a predicate and always produces two boolean-keyed groups: `true` and `false`.

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

Map<Boolean, List<Integer>> partitioned = numbers.stream()
        .collect(Collectors.partitioningBy(n -> n % 2 == 0));

System.out.println(partitioned);
```

Output conceptually:

```text
{false=[1, 3, 5], true=[2, 4, 6]}
```

The `true` group contains even numbers, and the `false` group contains odd numbers.

Unlike `groupingBy()`, which can create many groups based on a key, `partitioningBy()` creates two groups based on a boolean condition.

### 14.1 Count each partition

```java
Map<Boolean, Long> counts = numbers.stream()
        .collect(Collectors.partitioningBy(
            n -> n % 2 == 0,
            Collectors.counting()
        ));
```

This counts even and odd values separately.

---

## 15. `toMap()` — Build a Map From a Stream

Use `Collectors.toMap()` when each stream element should produce a key and a value.

```java
List<String> names = List.of("Aman", "Riya", "Neha");

Map<String, Integer> lengths = names.stream()
        .collect(Collectors.toMap(
            name -> name,
            String::length
        ));

System.out.println(lengths);
```

The map associates each name with its length. The iteration order is not guaranteed by this overload.

### 15.1 Duplicate keys

If two elements produce the same key, the two-argument `toMap()` collector throws `IllegalStateException`. Provide a merge function when duplicates are expected.

Example: count how many times each word appears.

```java
List<String> words = List.of("java", "sql", "java", "api", "sql", "java");

Map<String, Integer> counts = words.stream()
        .collect(Collectors.toMap(
            word -> word,
            word -> 1,
            Integer::sum
        ));

System.out.println(counts);
```

Conceptual result:

```text
{java=3, sql=2, api=1}
```

The merge function `Integer::sum` adds the values for duplicate keys.

### 15.2 Choose a specific map implementation

If you need insertion order:

```java
Map<String, Integer> orderedLengths = names.stream()
        .collect(Collectors.toMap(
            name -> name,
            String::length,
            (oldValue, newValue) -> oldValue,
            LinkedHashMap::new
        ));
```

The fourth argument supplies the map factory. Choose the map type that matches your requirements.

---

## 16. `mapping()`, `filtering()`, and `collectingAndThen()`

These collector helpers are useful for more complex collection tasks.

### 16.1 `mapping()`

Transforms elements before passing them to a downstream collector.

```java
Map<Integer, Set<String>> wordsByLength = words.stream()
        .collect(Collectors.groupingBy(
            String::length,
            Collectors.mapping(String::toUpperCase, Collectors.toSet())
        ));
```

### 16.2 `filtering()`

Filters elements within a downstream group. This collector is available from Java 9.

```java
Map<String, List<Student>> passedByDepartment = students.stream()
        .collect(Collectors.groupingBy(
            Student::getDepartment,
            Collectors.filtering(
                student -> student.getMarks() >= 40,
                Collectors.toList()
            )
        ));
```

This creates a group for each department and includes only students who passed in that department's list. A department can still have an empty list if its students all fail.

### 16.3 `collectingAndThen()`

Applies a final transformation to a collected result.

```java
List<String> immutableNames = names.stream()
        .collect(Collectors.collectingAndThen(
            Collectors.toList(),
            List::copyOf
        ));
```

`List.copyOf()` returns an unmodifiable copy and rejects null elements. Use this pattern when you explicitly want a post-processing step after collection.

---

## 17. Numeric Stream Operations

For numeric tasks, primitive streams often provide clearer methods than generic reduction.

### 17.1 Sum

```java
int sum = IntStream.rangeClosed(1, 5).sum();
System.out.println(sum);
```

Output:

```text
15
```

### 17.2 Average

```java
OptionalDouble average = IntStream.of(10, 20, 30).average();

System.out.println(average.orElse(0.0));
```

Output:

```text
20.0
```

An empty `IntStream` has no average, so `average()` returns an `OptionalDouble`.

### 17.3 Min and max

```java
IntStream values = IntStream.of(7, 2, 9, 4);

System.out.println(values.min().orElse(-1));
```

Output:

```text
2
```

The stream is consumed by `min()`, so do not try to call `max()` on the same stream afterward. Create a new stream if you need both.

### 17.4 Convert object streams to primitive streams

For a list of students:

```java
int totalMarks = students.stream()
        .mapToInt(Student::getMarks)
        .sum();
```

`mapToInt()` converts the object stream into an `IntStream`, allowing numeric operations without keeping the values as boxed `Integer` objects.

---

## 18. `reduce()` vs `collect()`

Both operations combine stream elements, but they serve different purposes.

| `reduce()` | `collect()` |
|---|---|
| Combines values into a single result | Accumulates elements into a result container or structure |
| Commonly used for sum, product, or another associative combination | Commonly used for lists, sets, maps, groups, and summaries |
| Uses an identity and accumulator, or returns an `Optional` without identity | Uses a collector to manage accumulation and combination |
| Avoid mutable containers as reduction identities | Designed for mutable reduction through collectors |

Use `reduce()` for a mathematical combination:

```java
int sum = List.of(1, 2, 3, 4).stream()
        .reduce(0, Integer::sum);
```

Use `collect()` to build a list:

```java
List<Integer> doubled = List.of(1, 2, 3, 4).stream()
        .map(n -> n * 2)
        .collect(Collectors.toList());
```

Do not use `reduce()` to build a mutable list by repeatedly mutating and returning the same list. Use `collect()` with an appropriate collector instead; collectors are designed to handle mutable accumulation and combination correctly.

---

## 19. Complete Practical Example: Analyze Student Results

This example calculates student count, average marks, highest marks, pass/fail groups, and names of students who passed.

```java
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Override
    public String toString() {
        return name + " (" + marks + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Aman", 72),
            new Student("Riya", 91),
            new Student("Neha", 38),
            new Student("Kabir", 64)
        );

        long count = students.stream().count();

        double average = students.stream()
                .collect(Collectors.averagingInt(Student::getMarks));

        Optional<Student> topper = students.stream()
                .max(Comparator.comparingInt(Student::getMarks));

        Map<Boolean, List<Student>> passFail = students.stream()
                .collect(Collectors.partitioningBy(s -> s.getMarks() >= 40));

        List<String> passedNames = students.stream()
                .filter(s -> s.getMarks() >= 40)
                .map(Student::getName)
                .collect(Collectors.toList());

        System.out.println("Count: " + count);
        System.out.println("Average: " + average);
        System.out.println("Topper: " + topper.map(Student::toString).orElse("None"));
        System.out.println("Passed: " + passedNames);
        System.out.println("Pass/fail groups: " + passFail);
    }
}
```

Output:

```text
Count: 4
Average: 66.25
Topper: Riya (91)
Passed: [Aman, Riya, Kabir]
Pass/fail groups: {false=[Neha (38)], true=[Aman (72), Riya (91), Kabir (64)]}
```

The pass/fail map contains a `false` group for students below 40 and a `true` group for students with marks of 40 or more. The printed map order is not a general guarantee of all map implementations; the partitioning collector creates both boolean groups.

---

## 20. Common Mistakes

1. **Reusing a stream after a terminal operation.** Create a new stream for each independent pipeline.
2. **Calling `Optional.get()` blindly.** Use safe handling when the stream might be empty.
3. **Using `reduce()` to build a mutable collection.** Prefer `collect()` for lists, sets, and maps.
4. **Using the two-argument `toMap()` with duplicate keys.** Supply a merge function if keys can repeat.
5. **Assuming `Collectors.toList()` always returns an `ArrayList`.** The concrete type is not guaranteed.
6. **Assuming `Collectors.toSet()` preserves insertion order.** Choose `LinkedHashSet` explicitly if order matters.
7. **Assuming grouping maps always have a specific iteration order.** Supply an appropriate map factory if you need one.
8. **Confusing `findFirst()` and `findAny()`.** `findAny()` does not promise the first matching value.
9. **Using a non-associative reduction in parallel processing.** Parallel reductions need a valid associative combination and identity.
10. **Using `forEach()` when the goal is to produce a collection.** Use `collect()` or `toList()`.
11. **Forgetting that `count()` returns `long`.** Store it in a `long` variable.
12. **Using the same primitive stream for multiple numeric terminal operations.** A terminal operation consumes it; create a new stream each time.

---

## 21. Interview Questions and Answers

### Q1. What is a terminal operation?

An operation that consumes a stream and produces a result or side effect, such as `count()`, `collect()`, `reduce()`, or `forEach()`.

### Q2. What is the difference between `forEach()` and `forEachOrdered()`?

`forEach()` does not guarantee encounter-order action execution for parallel streams. `forEachOrdered()` respects encounter order when one exists.

### Q3. Why does `min()` return an `Optional`?

The stream might be empty, in which case there is no minimum value to return.

### Q4. What is the difference between `findFirst()` and `findAny()`?

`findFirst()` requests the first element in encounter order. `findAny()` may return any element and can provide more flexibility for parallel execution.

### Q5. What is short-circuiting?

An operation can stop processing early once the result is known. Examples include `anyMatch()`, `findFirst()`, and `limit()` in suitable pipelines.

### Q6. What is `reduce()` used for?

It combines stream elements into one result, such as a sum or product.

### Q7. Why must a reduction operation be associative for parallel use?

Parallel execution may combine partial results in different groupings. Associativity helps ensure that regrouping does not change the logical result.

### Q8. What is `collect()` used for?

It accumulates stream elements into results such as lists, sets, maps, or grouped summaries.

### Q9. What does `Collectors.groupingBy()` do?

It groups stream elements according to a classifier function and returns a map from keys to collected group results.

### Q10. What is the difference between `groupingBy()` and `partitioningBy()`?

`groupingBy()` can create many groups based on a key. `partitioningBy()` divides elements into two boolean groups based on a predicate.

### Q11. How does `toMap()` handle duplicate keys?

The two-argument form throws an `IllegalStateException` if duplicate keys occur. Use the overload with a merge function to resolve duplicates.

### Q12. What does `Collectors.joining()` do?

It concatenates character sequences, optionally using a delimiter, prefix, and suffix.

### Q13. What is the difference between `Stream.toList()` and `Collectors.toList()`?

`Stream.toList()` is available from Java 16 and returns an unmodifiable list. `Collectors.toList()` is available from Java 8 and does not guarantee a specific list type or mutability.

### Q14. What is a downstream collector?

A collector used inside another collector, for example counting the elements within each group using `groupingBy(..., counting())`.

### Q15. When should you use primitive streams?

Use `IntStream`, `LongStream`, or `DoubleStream` when processing primitive numeric values and when their numeric operations make the code clearer or reduce boxing.

---

## 22. Practice Exercises

1. Count how many strings in a list have more than five characters.
2. Find the minimum and maximum values in a list, safely handling an empty list.
3. Use `anyMatch()` to check whether a list contains a negative number.
4. Use `allMatch()` to verify that all marks are between 0 and 100.
5. Use `noneMatch()` to check that no product is out of stock.
6. Use `reduce()` to calculate a product of integers.
7. Collect the squares of even numbers into a list.
8. Collect unique names into a `LinkedHashSet` to preserve encounter order.
9. Use `joining()` to create a comma-separated string of names.
10. Use `groupingBy()` to group words by their first character.
11. Use `groupingBy()` and `counting()` to count words by length.
12. Use `partitioningBy()` to separate students who passed and failed.
13. Use `toMap()` to map product IDs to product names.
14. Handle duplicate keys in `toMap()` by combining the duplicate values.
15. Calculate count, sum, minimum, maximum, and average using `IntSummaryStatistics`.
16. Compare a `reduce()` sum with `IntStream.sum()`.
17. Write a program that finds the highest-scoring student and prints the student's name.
18. Use `collectingAndThen()` to create an unmodifiable result list.

### Output prediction 1

```java
List<Integer> values = List.of(2, 4, 6);

int result = values.stream().reduce(1, (a, b) -> a + b);

System.out.println(result);
```

Answer:

```text
13
```

Explanation: the identity `1` is included: `1 + 2 + 4 + 6 = 13`.

### Output prediction 2

```java
List<Integer> values = List.of(1, 2, 3, 4, 5, 6);

System.out.println(values.stream().anyMatch(n -> n > 5));
System.out.println(values.stream().allMatch(n -> n > 0));
System.out.println(values.stream().noneMatch(n -> n < 0));
```

Answer:

```text
true
true
true
```

### Output prediction 3

```java
List<String> names = List.of("Aman", "Riya", "Neha");

String result = names.stream()
        .map(String::toUpperCase)
        .collect(Collectors.joining(" | ", "<", ">"));

System.out.println(result);
```

Answer:

```text
<AMAN | RIYA | NEHA>
```

---

## 23. Quick Revision Checklist

Before moving on, make sure you can explain:

- Terminal operations consume the stream.
- `forEach()` performs an action; `forEachOrdered()` respects encounter order when one exists.
- `count()` returns `long`.
- `min()`, `max()`, `findFirst()`, and `findAny()` return `Optional` results.
- `anyMatch()`, `allMatch()`, and `noneMatch()` test predicates and can short-circuit.
- `reduce()` combines elements into one result.
- `collect()` accumulates elements into lists, sets, maps, and summaries.
- `Collectors.joining()` builds strings.
- `groupingBy()` creates groups by key.
- `partitioningBy()` creates two boolean groups.
- `toMap()` needs a merge function if duplicate keys are possible.
- Primitive streams provide numeric operations.
- Use `collect()` rather than `reduce()` for mutable containers.

## 24. Final Summary

Terminal operations finish stream pipelines and produce useful results. Use `count()`, `min()`, `max()`, and matching operations to analyze elements; use `reduce()` to combine values; and use `collect()` with `Collectors` to create lists, sets, maps, strings, groups, and statistics.

The key is to select the operation that matches the task. Use reduction for combining values, collection for building result structures, and short-circuiting operations when you only need to know whether a condition is met or find a suitable element.

**Next chapter: Chapter 44 — Optional, Date and Time API, and Modern Java Utility Features.**
