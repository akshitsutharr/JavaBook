# Chapter 40: Comparable, Comparator, and Sorting Collections

## 1. What You Will Learn

By the end of this chapter, you will understand:

- What sorting and ordering mean in Java.
- The difference between `Comparable` and `Comparator`.
- How `compareTo()` and `compare()` work.
- How to sort numbers, strings, and custom objects.
- How to sort in ascending and descending order.
- How to sort by multiple fields using `thenComparing()`.
- How sorting works with `List`, arrays, `TreeSet`, `TreeMap`, and `PriorityQueue`.
- How to use `Collections.sort()`, `List.sort()`, `Arrays.sort()`, and `Stream.sorted()`.
- How to search sorted data with `Collections.binarySearch()` and `Arrays.binarySearch()`.
- Common mistakes, practical examples, and interview questions.

Examples use standard Java syntax. Lambda expressions and `List.of()` require Java 8 and Java 9 respectively.

---

## 2. What Is Sorting?

Sorting means arranging data in a particular order.

For example, these numbers are not sorted:

```text
40, 10, 30, 20
```

Ascending order:

```text
10, 20, 30, 40
```

Descending order:

```text
40, 30, 20, 10
```

Strings can also be sorted:

```text
"Zebra", "Apple", "Mango"
```

Natural string order produces:

```text
Apple, Mango, Zebra
```

We can also sort objects. Imagine a `Student` class with a name and marks. We might want to sort students by marks, by name, or by both.

Java provides two main ways to define how objects should be compared:

- `Comparable`: defines a class's natural ordering.
- `Comparator`: defines a separate or custom ordering.

These interfaces are essential when working with sorted lists, trees, priority queues, and search operations.

## 3. Understanding Comparison Results

Java comparison methods do not normally return `true` or `false`. They return an integer that represents the relationship between two values.

The rule is:

| Result | Meaning |
|---|---|
| Negative number | The first value should come before the second |
| Zero | The two values are equal for this ordering |
| Positive number | The first value should come after the second |

The exact negative or positive number is not important. Only its sign matters.

For example, when comparing `10` and `20` in ascending numeric order:

```java
Integer.compare(10, 20); // negative
Integer.compare(20, 20); // zero
Integer.compare(30, 20); // positive
```

The methods might return `-1`, `0`, or `1` in these cases, but code should rely on negative, zero, or positive—not on a specific nonzero value.

---

## 4. The `Comparable<T>` Interface

`Comparable` defines the natural ordering of objects of a class.

Its key method is:

```java
int compareTo(T other);
```

A class implements `Comparable<T>` when it has a sensible default order.

For example:

- Integers naturally sort from smallest to largest.
- Strings naturally sort lexicographically.
- A `Student` class might define its natural order by roll number.
- A `Product` class might define its natural order by product ID.

### 4.1 Basic syntax

```java
class ClassName implements Comparable<ClassName> {
    @Override
    public int compareTo(ClassName other) {
        // Return negative, zero, or positive.
    }
}
```

### 4.2 Example: sort custom objects by ID

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Student implements Comparable<Student> {
    private final int id;
    private final String name;

    Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.id, other.id);
    }

    @Override
    public String toString() {
        return id + " - " + name;
    }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();

        students.add(new Student(103, "Riya"));
        students.add(new Student(101, "Aman"));
        students.add(new Student(102, "Neha"));

        Collections.sort(students);

        System.out.println(students);
    }
}
```

Output:

```text
[101 - Aman, 102 - Neha, 103 - Riya]
```

### 4.3 How `compareTo()` works

This line defines the natural order:

```java
return Integer.compare(this.id, other.id);
```

Suppose the current object has ID `101` and `other` has ID `103`.

```java
Integer.compare(101, 103)
```

The result is negative, so the current object comes before the other object. The list is therefore sorted from smaller ID to larger ID.

### 4.4 Descending order with `Comparable`

If the class's natural order should be descending, reverse the comparison:

```java
@Override
public int compareTo(Student other) {
    return Integer.compare(other.id, this.id);
}
```

Notice the arguments are reversed. This places larger IDs first.

However, natural ordering should usually represent the class's most meaningful default order. If different parts of an application need different orders, a `Comparator` is often more flexible.

### 4.5 Why use `Integer.compare()` instead of subtraction?

Avoid writing this:

```java
return this.id - other.id;
```

Subtraction can overflow for large integer values and produce an incorrect comparison. Prefer:

```java
return Integer.compare(this.id, other.id);
```

For `long`, use `Long.compare()`. For `double`, use `Double.compare()`.

---

## 5. The `Comparator<T>` Interface

A `Comparator` defines an ordering separately from the class being sorted.

Its main method is:

```java
int compare(T first, T second);
```

A `Comparator` is useful when:

- You cannot modify the class.
- You need multiple sorting rules.
- You want to sort the same objects by name, marks, age, or another field.
- You need to choose an ordering at runtime.

### 5.1 Basic syntax

```java
Comparator<Type> comparator = new Comparator<Type>() {
    @Override
    public int compare(Type first, Type second) {
        // Return negative, zero, or positive.
    }
};
```

### 5.2 Example: sort students by marks

Suppose a `Student` has a name and marks. We want to sort by marks without making marks the class's natural order.

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Student {
    String name;
    int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    @Override
    public String toString() {
        return name + " (" + marks + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();

        students.add(new Student("Riya", 85));
        students.add(new Student("Aman", 92));
        students.add(new Student("Neha", 78));

        Comparator<Student> byMarks = new Comparator<Student>() {
            @Override
            public int compare(Student first, Student second) {
                return Integer.compare(first.marks, second.marks);
            }
        };

        students.sort(byMarks);
        System.out.println(students);
    }
}
```

Output:

```text
[Neha (78), Riya (85), Aman (92)]
```

The comparator sorts marks in ascending order. It does not permanently change the meaning of a `Student`; it supplies an ordering for this sort.

---

## 6. `Comparable` vs `Comparator`

| Feature | `Comparable` | `Comparator` |
|---|---|---|
| Package | `java.lang` | `java.util` |
| Main method | `compareTo(other)` | `compare(first, second)` |
| Where ordering is defined | Inside the class | Usually outside the class |
| Purpose | Natural/default ordering | Custom or alternative ordering |
| Number of orderings | Usually one natural order | Many comparators can be created |
| Must modify the class? | Usually yes | No |
| Common example | Student by ID by default | Student by marks, name, or age |

Remember this simple distinction:

**Comparable = compare this object with another object.**

**Comparator = compare two objects using a chosen rule.**

A class can implement `Comparable` and still be sorted using a `Comparator`. The explicit comparator takes precedence for that particular sorting operation.

---

## 7. Sorting Numbers and Strings

Java already defines natural ordering for wrapper classes and strings.

### 7.1 Sort an integer list

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers =
                new ArrayList<>(List.of(40, 10, 30, 20));

        Collections.sort(numbers);
        System.out.println(numbers);
    }
}
```

Output:

```text
[10, 20, 30, 40]
```

`Integer` implements `Comparable<Integer>`, so Java knows how to order the values.

### 7.2 Sort strings

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names =
                new ArrayList<>(List.of("Riya", "Aman", "Neha"));

        Collections.sort(names);
        System.out.println(names);
    }
}
```

Output:

```text
[Aman, Neha, Riya]
```

String natural ordering is lexicographical and based on character values. It is not necessarily the same as dictionary ordering in every language. For example, uppercase and lowercase characters can appear in different positions.

---

## 8. Sorting in Descending Order

### 8.1 `Collections.reverseOrder()`

```java
List<Integer> numbers =
        new ArrayList<>(List.of(40, 10, 30, 20));

numbers.sort(Collections.reverseOrder());

System.out.println(numbers);
```

Output:

```text
[40, 30, 20, 10]
```

`Collections.reverseOrder()` returns a comparator that reverses the natural ordering.

### 8.2 `Comparator.reverseOrder()`

You can also write:

```java
numbers.sort(Comparator.reverseOrder());
```

Both are useful for reversing natural ordering. `Comparator.reverseOrder()` is part of the `Comparator` API and is often convenient when you are already using comparator methods.

### 8.3 Reverse a custom comparator

```java
students.sort(Comparator.comparingInt(s -> s.marks).reversed());
```

This sorts students by marks in descending order.

Important: `reversed()` reverses the complete comparator built before it. When sorting by multiple fields, where you place `reversed()` affects which parts of the ordering are reversed.

---

## 9. Sorting with Lambda Expressions

A lambda can provide a comparator without writing an anonymous class.

The general form is:

```java
(first, second) -> comparisonResult
```

Example:

```java
students.sort((first, second) ->
        Integer.compare(first.marks, second.marks));
```

This is equivalent to creating a `Comparator<Student>` with a `compare()` method.

A lambda is shorter, but the comparison logic must still follow the comparison contract. Do not return arbitrary values unrelated to the relative order.

### 9.1 Sort by name

```java
students.sort((first, second) ->
        first.name.compareTo(second.name));
```

This sorts names in natural string order.

### 9.2 Sort by marks descending

```java
students.sort((first, second) ->
        Integer.compare(second.marks, first.marks));
```

Reversing the arguments places higher marks first.

---

## 10. `Comparator.comparing()` and `comparingInt()`

Java provides factory methods that make common comparators easier to write.

### 10.1 `Comparator.comparing()`

```java
students.sort(Comparator.comparing(s -> s.name));
```

This creates a comparator based on the name key.

If type inference cannot determine the type clearly, specify it:

```java
students.sort(Comparator.comparing((Student s) -> s.name));
```

### 10.2 `Comparator.comparingInt()`

For an `int` key, use:

```java
students.sort(Comparator.comparingInt(s -> s.marks));
```

This is clear and avoids boxing the `int` key into an `Integer` for the key comparison.

Other useful methods include:

```java
Comparator.comparingLong(item -> item.id);
Comparator.comparingDouble(item -> item.price);
```

Use the method matching the key's primitive type where appropriate.

### 10.3 Descending order

```java
students.sort(Comparator.comparingInt((Student s) -> s.marks).reversed());
```

The explicit type `(Student s)` can help Java infer the comparator type before calling `reversed()`.

---

## 11. Sorting by Multiple Fields with `thenComparing()`

Sometimes one field is not enough.

Suppose students should be sorted by:
1. Marks in descending order.
2. If marks are equal, name in ascending alphabetical order.

Use `thenComparing()`:

```java
students.sort(
    Comparator.comparingInt((Student s) -> s.marks)
              .reversed()
              .thenComparing(s -> s.name)
);
```

The first comparator is used initially. The next comparator is used only when the first comparison returns zero.

### Example

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Student {
    String name;
    int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    @Override
    public String toString() {
        return name + " (" + marks + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();

        students.add(new Student("Riya", 90));
        students.add(new Student("Aman", 90));
        students.add(new Student("Neha", 82));
        students.add(new Student("Kabir", 90));

        students.sort(
            Comparator.comparingInt((Student s) -> s.marks)
                      .reversed()
                      .thenComparing(s -> s.name)
        );

        System.out.println(students);
    }
}
```

Output:

```text
[Aman (90), Kabir (90), Riya (90), Neha (82)]
```

Marks are descending. Among students with 90 marks, names are ascending.

### 11.1 More than two fields

You can chain more comparisons:

```java
Comparator<Student> order =
        Comparator.comparingInt((Student s) -> s.marks)
                  .reversed()
                  .thenComparing(s -> s.name)
                  .thenComparingInt(s -> s.id);
```

This means:
1. Marks descending.
2. Name ascending if marks tie.
3. ID ascending if both marks and name tie.

The ordering is evaluated from left to right.

### 11.2 A common mistake with `reversed()`

Consider:

```java
Comparator<Student> order =
        Comparator.comparingInt((Student s) -> s.marks)
                  .thenComparing(s -> s.name)
                  .reversed();
```

This reverses the entire combined order: marks become descending and names also become descending within equal marks.

If you want marks descending but names ascending, reverse only the marks comparator before adding the name comparator:

```java
Comparator<Student> order =
        Comparator.comparingInt((Student s) -> s.marks)
                  .reversed()
                  .thenComparing(s -> s.name);
```

The position of `reversed()` matters.

---

## 12. Handling `null` Values in Comparators

By default, many comparisons involving `null` references throw a `NullPointerException`. If a field may be null, choose an explicit null policy.

### 12.1 `nullsFirst()`

```java
Comparator<String> order =
        Comparator.nullsFirst(Comparator.naturalOrder());
```

Example list:

```java
List<String> names =
        new ArrayList<>(Arrays.asList("Riya", null, "Aman"));

names.sort(Comparator.nullsFirst(Comparator.naturalOrder()));
System.out.println(names);
```

Output:

```text
[null, Aman, Riya]
```

### 12.2 `nullsLast()`

```java
names.sort(Comparator.nullsLast(Comparator.naturalOrder()));
```

This places `null` at the end.

### 12.3 A nullable field inside an object

```java
Comparator<Student> byName =
        Comparator.comparing(
            s -> s.name,
            Comparator.nullsLast(Comparator.naturalOrder())
        );
```

This handles a null `name` field. It does not handle a null `Student` object itself; that is a separate issue. If the list may contain null student references, wrap the entire student comparator with an appropriate `Comparator.nullsFirst(...)` or `Comparator.nullsLast(...)`.

---

## 13. Main Sorting APIs in Java

Java offers different sorting methods depending on the data structure.

### 13.1 `List.sort()`

```java
list.sort(comparator);
```

Sorts a list in place. Pass a comparator for custom ordering, or `null` to use natural ordering when the elements support it.

Example:

```java
List<Integer> numbers =
        new ArrayList<>(List.of(4, 1, 3, 2));

numbers.sort(null);
System.out.println(numbers);
```

Output:

```text
[1, 2, 3, 4]
```

For normal code, `numbers.sort(Comparator.naturalOrder())` can be more explicit.

### 13.2 `Collections.sort()`

```java
Collections.sort(list);
Collections.sort(list, comparator);
```

Examples:

```java
Collections.sort(numbers);
Collections.sort(students, byMarks);
```

`Collections.sort()` is a familiar utility method for sorting lists. Modern code can often use `list.sort(...)` directly.

### 13.3 `Arrays.sort()`

For arrays:

```java
int[] values = {40, 10, 30, 20};
Arrays.sort(values);
System.out.println(Arrays.toString(values));
```

Output:

```text
[10, 20, 30, 40]
```

For an array of objects, a comparator can be supplied:

```java
Student[] students = {
    new Student("Riya", 85),
    new Student("Aman", 92),
    new Student("Neha", 78)
};

Arrays.sort(students, Comparator.comparingInt(s -> s.marks));
```

Important distinction:
- Primitive arrays such as `int[]` can be sorted naturally using `Arrays.sort()`, but you cannot pass a `Comparator<Integer>` to sort an `int[]`.
- Object arrays such as `Integer[]` or `Student[]` support comparator-based sorting through the appropriate `Arrays.sort()` overload.

### 13.4 `Stream.sorted()`

Streams can produce a sorted stream:

```java
List<Integer> sorted =
        numbers.stream()
               .sorted()
               .toList();
```

For custom order:

```java
List<Student> sortedStudents =
        students.stream()
                .sorted(Comparator.comparingInt(s -> s.marks))
                .toList();
```

`Stream.sorted()` does not sort the original list in place. It produces a stream with sorted elements, and the terminal operation collects or processes them. `Stream.toList()` requires Java 16 or later and returns an unmodifiable list; use `collect(Collectors.toList())` if you need compatibility with older Java versions or a mutable result.

---

## 14. Stable Sorting

A sort is stable if elements that compare as equal keep their original relative order.

Suppose the original list is:

```text
Aman (90), Riya (80), Neha (90)
```

If we sort only by marks, Aman and Neha compare equally because both have 90 marks. A stable sort keeps Aman before Neha, matching their original relative order.

Java's object-array sorting and list sorting APIs are stable. This is useful when you sort by one field after a previous sort by another field.

However, stability does not mean all elements with equal comparison results are permanently grouped in their original positions if the comparator changes. It only preserves the relative order of elements that compare as equal during that particular sort.

Do not assume primitive-array sorting has the same stability guarantee. Primitive values do not carry object identities or separate records, and primitive-array sort APIs do not accept comparators.

---

## 15. Comparison Contract: Rules Your Comparator Must Follow

A comparator must provide a consistent ordering. Incorrect comparison logic can produce confusing results or cause sorting and sorted data structures to behave unexpectedly.

Important rules include:

1. **Sign consistency:** If `compare(a, b)` is negative, reversing the arguments should produce a positive result, and vice versa.
2. **Transitivity:** If `a` comes before `b`, and `b` comes before `c`, then `a` must come before `c`.
3. **Consistent equality result:** If `compare(a, b) == 0`, then `a` and `b` should compare the same way against another object, according to the comparator contract.
4. **Repeatability:** If the compared data has not changed, repeated comparisons should return consistent results.
5. **Avoid subtraction for integer comparisons:** Use `Integer.compare()` or the corresponding type-specific method.

A comparator should not depend on changing state, random values, or inconsistent rules.

### 15.1 Consistency with `equals()`

A comparison is consistent with `equals()` when `compare(a, b) == 0` exactly when `a.equals(b)` is true.

This is desirable for many classes, but it is not required by the `Comparable` or `Comparator` contract in every case. For example, comparing people only by last name can return zero for two different people with the same last name.

Be careful with `TreeSet` and `TreeMap`: these structures use comparison results to determine ordering and whether a key or element is equivalent to an existing one. If the comparator returns zero, a `TreeSet` generally will not add the second element, and a `TreeMap` will treat the key as already present—even if `equals()` says the objects are different.

---

## 16. How `TreeSet` and `TreeMap` Use Ordering

`TreeSet` and `TreeMap` keep their contents ordered. They rely on either:
- Natural ordering through `Comparable`, or
- A supplied `Comparator`.

### 16.1 `TreeSet` example

```java
Set<Integer> numbers = new TreeSet<>();
numbers.add(30);
numbers.add(10);
numbers.add(20);

System.out.println(numbers);
```

Output:

```text
[10, 20, 30]
```

For custom objects, provide a comparator or implement `Comparable`.

```java
Set<Student> students =
        new TreeSet<>(Comparator.comparingInt(s -> s.marks));
```

This example orders students by marks, but if two students have equal marks, the comparator returns zero. A `TreeSet` may then keep only one of them. Add a tie-breaker if distinct students should remain distinct in the set:

```java
Set<Student> students = new TreeSet<>(
    Comparator.comparingInt((Student s) -> s.marks)
              .thenComparing(s -> s.name)
);
```

This still considers two students equivalent if both their marks and names compare equally. Include a unique ID as another tie-breaker if needed.

### 16.2 `TreeMap` example

```java
Map<Integer, String> students = new TreeMap<>();
students.put(103, "Riya");
students.put(101, "Aman");
students.put(102, "Neha");

System.out.println(students);
```

Output:

```text
{101=Aman, 102=Neha, 103=Riya}
```

A `TreeMap` sorts entries by key, not by value. To sort a list of map entries by values, copy the entries into a list and sort that list using a comparator.

---

## 17. Ordering in `PriorityQueue`

A `PriorityQueue` retrieves elements according to priority. By default, it uses natural ordering, so the smallest element is normally at the head for numbers.

```java
PriorityQueue<Integer> queue =
        new PriorityQueue<>(Comparator.reverseOrder());

queue.add(10);
queue.add(30);
queue.add(20);

while (!queue.isEmpty()) {
    System.out.print(queue.poll() + " ");
}
```

Output:

```text
30 20 10
```

A comparator can define custom priority for objects too.

Important: **iterating over a `PriorityQueue` does not guarantee sorted order.** The queue guarantees which element is at the head and what `poll()` returns next, not that every element appears sorted in its iterator. If you need ordered output, repeatedly call `poll()` on a copy or remove elements from the queue.

---

## 18. Binary Search and Sorting

Binary search repeatedly halves a sorted search range. It is efficient, but it requires the data to be sorted according to the same ordering used for the search.

### 18.1 `Collections.binarySearch()`

```java
List<Integer> numbers =
        new ArrayList<>(List.of(10, 20, 30, 40, 50));

int index = Collections.binarySearch(numbers, 30);
System.out.println(index);
```

Output:

```text
2
```

Indexes start at zero, so `30` is at index `2`.

If the value is absent, the result is negative. The insertion point is the position where the value could be inserted while preserving the sort order. The returned value is:

```text
-(insertion point) - 1
```

For example, searching for `35` in `[10, 20, 30, 40, 50]` gives insertion point `3`, so the result is `-4`.

### 18.2 Use the same comparator

If a list is sorted in descending order, search using the same comparator:

```java
List<Integer> numbers =
        new ArrayList<>(List.of(10, 20, 30, 40, 50));

numbers.sort(Comparator.reverseOrder());

int index = Collections.binarySearch(
        numbers, 30, Comparator.reverseOrder()
);
```

If the list is not sorted using the same ordering as the search comparator, the result is not reliable.

### 18.3 Duplicate values

When duplicates exist, binary search is not guaranteed to return the first or last matching occurrence. It returns a matching index, but the specific index among duplicates should not be assumed unless your own algorithm guarantees it.

---

## 19. Sorting Complexity

For typical Java list and object-array sorting operations, expect time complexity around **O(n log n)** for general sorting workloads. Exact implementation details can vary by API and data type.

| Operation | Typical time complexity |
|---|---:|
| Sort a list | O(n log n) |
| Sort an object array | O(n log n) |
| Sort a primitive array | O(n log n) typical |
| Binary search on sorted data | O(log n) |
| Linear search | O(n) |

Sorting an `ArrayList` changes the order of its elements in place. Sorting a stream creates a sorted stream pipeline rather than mutating the source list.

---

## 20. Complete Practical Example: Sort Employees

This example sorts employees by salary descending, then by name ascending. It also demonstrates a comparator that is separate from the model class.

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Employee {
    private final int id;
    private final String name;
    private final double salary;

    Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getSalary() {
        return salary;
    }

    @Override
    public String toString() {
        return id + " | " + name + " | " + salary;
    }
}

public class Main {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();

        employees.add(new Employee(1, "Riya", 65000));
        employees.add(new Employee(2, "Aman", 75000));
        employees.add(new Employee(3, "Neha", 75000));
        employees.add(new Employee(4, "Kabir", 50000));

        Comparator<Employee> bySalaryThenName =
                Comparator.comparingDouble(Employee::getSalary)
                          .reversed()
                          .thenComparing(Employee::getName);

        employees.sort(bySalaryThenName);

        employees.forEach(System.out::println);
    }
}
```

Output:

```text
2 | Aman | 75000.0
3 | Neha | 75000.0
1 | Riya | 65000.0
4 | Kabir | 50000.0
```

The method references `Employee::getSalary` and `Employee::getName` refer to getter methods. `comparingDouble()` compares salaries, `reversed()` makes salary order descending, and `thenComparing()` sorts equal salaries by name ascending.

---

## 21. Common Mistakes

1. **Using subtraction in a comparator.** Prefer `Integer.compare(a, b)` to avoid overflow.
2. **Assuming a comparator returns exactly `-1`, `0`, or `1`.** Only the sign is meaningful.
3. **Sorting custom objects without defining an ordering.** Implement `Comparable` or pass a `Comparator`.
4. **Using the wrong comparator for binary search.** The search ordering must match the list's sort ordering.
5. **Assuming `PriorityQueue` iteration is sorted.** Use repeated `poll()` calls when ordered retrieval is required.
6. **Forgetting that `TreeSet` and `TreeMap` use comparison results.** A comparison result of zero means equivalent for their ordering behavior.
7. **Reversing the entire comparator accidentally.** Place `reversed()` carefully when chaining comparisons.
8. **Comparing nullable fields without a null policy.** Use `nullsFirst()` or `nullsLast()` when needed.
9. **Expecting `Arrays.sort(int[])` to accept a comparator.** Comparator-based sorting is available for object arrays, not primitive arrays.
10. **Thinking `Stream.sorted()` mutates the original list.** It produces a sorted stream; collect the result if you need a list.

---

## 22. Interview Questions and Answers

### Q1. What is the difference between `Comparable` and `Comparator`?

`Comparable` defines natural ordering inside a class using `compareTo()`. `Comparator` defines a separate ordering using `compare()`, allowing multiple sorting rules without changing the class.

### Q2. What does `compareTo()` return?

A negative number if the current object comes before the other, zero if they compare as equal, and a positive number if the current object comes after the other.

### Q3. Can a class implement `Comparable` and still be sorted with a `Comparator`?

Yes. A comparator supplied to the sorting operation defines the order for that operation and can differ from the class's natural order.

### Q4. How do you sort a list in descending order?

For natural ordering:

```java
list.sort(Comparator.reverseOrder());
```

This works when the elements support natural ordering.

### Q5. How do you sort custom objects by a field?

Use a comparator, for example:

```java
students.sort(Comparator.comparingInt(s -> s.marks));
```

### Q6. How do you sort by marks descending and then name ascending?

```java
students.sort(
    Comparator.comparingInt((Student s) -> s.marks)
              .reversed()
              .thenComparing(s -> s.name)
);
```

### Q7. What is a stable sort?

A stable sort preserves the relative order of elements that compare as equal in that sort.

### Q8. Why can a bad comparator cause problems?

If its results are inconsistent or violate the comparison contract, sorting and sorted data structures may behave incorrectly or fail with an exception.

### Q9. How does `TreeSet` decide whether two objects are equivalent?

It uses natural ordering or its comparator. If comparison returns zero, the set treats the values as equivalent for set membership, even if their `equals()` methods disagree.

### Q10. Is a `PriorityQueue` iterator sorted?

No. The head follows the priority ordering, but iterator traversal is not guaranteed to be sorted.

### Q11. What must be true before binary search?

The data must already be sorted according to the same ordering used for the binary search.

### Q12. What does a negative result from `Collections.binarySearch()` mean?

The searched value was not found. The insertion point can be recovered using `-result - 1`.

### Q13. Why use `comparingInt()` instead of `comparing()` for an integer field?

`comparingInt()` is designed for primitive `int` keys and avoids boxing the key value into an `Integer` for the comparison.

### Q14. Can `Arrays.sort()` use a comparator for an `int[]`?

No. Comparator-based overloads work with object arrays. Primitive arrays use their type's natural numeric ordering.

### Q15. Does `List.sort()` return a new list?

No. It sorts the list in place and returns `void`.

---

## 23. Practice Exercises

Try solving these without immediately looking up the solution.

1. Create a list of integers and sort it in ascending and descending order.
2. Create a `Product` class with `id`, `name`, and `price`. Sort products by price ascending.
3. Sort products by price descending, then by name ascending.
4. Create a `Student` class and implement `Comparable<Student>` so students are naturally ordered by roll number.
5. Create two different comparators for students: one by name and one by marks.
6. Sort a list of strings with null values, placing nulls last.
7. Sort an object array using `Arrays.sort()` and a comparator.
8. Use `Collections.binarySearch()` to find a number in a sorted list. Then search for a missing value and calculate its insertion point.
9. Create a `TreeSet` of custom objects. Observe what happens when the comparator returns zero for two objects with different IDs. Add a tie-breaker to preserve both.
10. Create a `PriorityQueue` with reverse ordering and print values by repeatedly calling `poll()`.

### Output prediction

What is the output?

```java
List<Integer> values =
        new ArrayList<>(List.of(5, 2, 8, 2));

values.sort(Comparator.reverseOrder());
System.out.println(values);
```

Answer:

```text
[8, 5, 2, 2]
```

What is the output?

```java
List<String> names =
        new ArrayList<>(List.of("Zara", "Aman", "Neha"));

names.sort(Comparator.comparingInt(String::length));
System.out.println(names);
```

Answer:

```text
[Zara, Aman, Neha]
```

All names have length four, so the comparator returns zero for every pair. Java's stable list sort preserves their original relative order.

---

## 24. Quick Revision Checklist

Before moving on, make sure you can explain these points in your own words:

- `Comparable<T>` uses `compareTo()`.
- `Comparator<T>` uses `compare()`.
- Negative means before, zero means equal for the ordering, positive means after.
- Use `Integer.compare()` rather than subtraction for integer comparisons.
- Use `Comparator.comparing()`, `comparingInt()`, and `thenComparing()` for custom sorting.
- Use `reversed()` carefully, especially with multiple fields.
- Use `nullsFirst()` and `nullsLast()` for nullable values.
- `List.sort()` and `Collections.sort()` sort lists; `Arrays.sort()` sorts arrays.
- Object/list sorting in Java is stable.
- `TreeSet` and `TreeMap` rely on comparison results for ordering and equivalence.
- `PriorityQueue` iteration is not guaranteed to be sorted.
- Binary search requires data sorted with the same ordering.

## 25. Final Summary

`Comparable` and `Comparator` let Java determine how objects should be ordered. Use `Comparable` for a class's natural order, and use `Comparator` when you need a custom or alternative order. Java's comparator helper methods make sorting concise: `comparingInt()` for integer keys, `comparing()` for general keys, `thenComparing()` for tie-breakers, and `reversed()` for descending order.

Sorting is more than arranging a list. The same ordering rules influence binary search, `TreeSet`, `TreeMap`, and `PriorityQueue`. A correct, consistent comparator is therefore important throughout the Java Collections Framework.

**Next chapter: Chapter 41 — Lambda Expressions and Functional Interfaces.**
