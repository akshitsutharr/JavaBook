# Chapter 32 — Set Interface: HashSet, LinkedHashSet, and TreeSet

> **Goal:** Understand what a `Set` is, how Java prevents duplicates, how `HashSet`, `LinkedHashSet`, and `TreeSet` differ, and how to use sets in practical programs.

## 1. What Is a `Set`?

A `Set` is a collection that stores **unique elements**. If you try to add a duplicate, the set does not create another copy.

For example, a list can contain:

```text
[Java, C++, Java, Python, C++]
```

A set contains each distinct value only once:

```text
[Java, C++, Python]
```

The order shown above is only illustrative. The order you see depends on the set implementation.

A `Set` is useful when you need unique email addresses, unique roll numbers, unique tags, visited URLs, or the distinct values in a dataset.

```java
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> languages = new HashSet<>();

        languages.add("Java");
        languages.add("C++");
        languages.add("Java");
        languages.add("Python");

        System.out.println(languages);
        System.out.println("Count: " + languages.size());
    }
}
```

Possible output:

```text
[Java, C++, Python]
Count: 3
```

The printed order of a `HashSet` is not guaranteed. Another run or Java implementation may show a different order.

## 2. The `Set` Interface

`Set<E>` is an interface in the Java Collections Framework. It extends `Collection<E>`.

A set provides many of the familiar collection methods:

- `add(element)`
- `addAll(collection)`
- `remove(element)`
- `removeAll(collection)`
- `retainAll(collection)`
- `contains(element)`
- `containsAll(collection)`
- `size()`
- `isEmpty()`
- `clear()`
- `iterator()`

The main difference from a `List` is that a set does not permit duplicate elements according to its equality and ordering rules.

```java
Set<Integer> numbers = new HashSet<>();

System.out.println(numbers.add(10)); // true
System.out.println(numbers.add(20)); // true
System.out.println(numbers.add(10)); // false
System.out.println(numbers.size());  // 2
```

Output:

```text
true
true
false
2
```

`add` returns `true` when the set changes because the element was added. It returns `false` when the element was already present.

## 3. The Three Main Set Implementations

Java commonly uses these three implementations:

| Feature | `HashSet` | `LinkedHashSet` | `TreeSet` |
|---|---|---|---|
| Duplicate elements | Not allowed | Not allowed | Not allowed |
| Iteration order | No guaranteed order | Insertion order | Sorted order |
| Typical basic add/search/remove | Average O(1) | Average O(1) | O(log n) |
| Internal approach | Hash table | Hash table plus linked ordering | Balanced search tree |
| Null support | Allows one null element | Allows one null element | Normally rejects null with natural ordering |
| Use when | Order does not matter | Insertion order matters | Sorted order matters |

These are typical characteristics of the standard implementations. Actual performance can depend on the workload and implementation details.

## 4. `HashSet`

`HashSet` stores unique elements using a hash-table-based implementation. It is a common choice when you care about uniqueness and efficient average-case membership checks but do not need a particular iteration order.

### 4.1 Creating and adding elements

```java
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<Integer> ids = new HashSet<>();

        ids.add(101);
        ids.add(102);
        ids.add(103);
        ids.add(101);

        System.out.println(ids.size());
        System.out.println(ids.contains(102));
        System.out.println(ids.contains(999));
    }
}
```

Output:

```text
3
true
false
```

The duplicate `101` is not added a second time.

### 4.2 Do not depend on its printed order

```java
Set<String> names = new HashSet<>();
names.add("Meera");
names.add("Aarav");
names.add("Kabir");

System.out.println(names);
```

The output order is unspecified. Do not write code that expects the set to print in insertion order or alphabetical order.

If you need insertion order, use `LinkedHashSet`. If you need sorted order, use `TreeSet`.

### 4.3 Why is it called a hash set?

A hash-based collection uses an element's `hashCode()` to help locate where the element belongs, then uses equality checks to determine whether a matching element is already present.

For custom classes, this means `equals()` and `hashCode()` must follow their contract. If two objects are equal according to `equals`, they must have the same hash code.

## 5. `LinkedHashSet`

`LinkedHashSet` stores unique elements and preserves insertion order during iteration.

Use it when you want to remove duplicates but retain the order in which each value first appeared.

```java
import java.util.LinkedHashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> names = new LinkedHashSet<>();

        names.add("Meera");
        names.add("Aarav");
        names.add("Kabir");
        names.add("Aarav");

        System.out.println(names);
    }
}
```

Output:

```text
[Meera, Aarav, Kabir]
```

The second `"Aarav"` is ignored. The first insertion position remains the one used during iteration.

### Practical example: Remove duplicates but preserve order

```java
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> values = List.of(4, 2, 4, 7, 2, 9, 7);

        List<Integer> unique =
                new ArrayList<>(new LinkedHashSet<>(values));

        System.out.println(unique);
    }
}
```

Output:

```text
[4, 2, 7, 9]
```

The `LinkedHashSet` removes duplicates while retaining the first occurrence order. The outer `ArrayList` turns the result back into a list.

## 6. `TreeSet`

`TreeSet` stores unique elements in sorted order. By default, it uses each element's natural ordering, so elements must be mutually comparable.

For integers, natural order is ascending. For strings, it is lexicographic order, which is not necessarily the same as human-language dictionary order.

```java
import java.util.Set;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        Set<Integer> numbers = new TreeSet<>();

        numbers.add(50);
        numbers.add(10);
        numbers.add(30);
        numbers.add(10);
        numbers.add(20);

        System.out.println(numbers);
    }
}
```

Output:

```text
[10, 20, 30, 50]
```

The duplicate `10` is ignored, and the remaining values are sorted.

### 6.1 Reverse ordering

You can supply a comparator when creating a `TreeSet`.

```java
import java.util.Comparator;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        TreeSet<Integer> numbers =
                new TreeSet<>(Comparator.reverseOrder());

        numbers.add(10);
        numbers.add(40);
        numbers.add(20);
        numbers.add(30);

        System.out.println(numbers);
    }
}
```

Output:

```text
[40, 30, 20, 10]
```

### 6.2 `TreeSet` with strings

```java
TreeSet<String> names = new TreeSet<>();

names.add("Meera");
names.add("Aarav");
names.add("Kabir");

System.out.println(names);
```

Output:

```text
[Aarav, Kabir, Meera]
```

### 6.3 Null values

A `TreeSet` using natural ordering normally rejects `null`, because it cannot compare null with ordinary elements. Adding null typically throws `NullPointerException`.

A custom comparator may define a null ordering, but do this only when null is a meaningful and deliberately supported value in your design.

## 7. How Does a Set Decide Whether Something Is a Duplicate?

The details depend on the implementation.

For `HashSet` and `LinkedHashSet`, hashing and equality are important. The set uses `hashCode()` to locate candidates and `equals()` to check equality.

For `TreeSet`, the ordering comparison determines whether elements occupy the same set position. If the comparator or natural ordering returns `0`, the set treats the elements as equivalent for set membership—even if their `equals()` method says they are different.

That last detail is important: the ordering used by a `TreeSet` should ideally be consistent with `equals`. Otherwise, the set's behavior may be surprising compared with other set implementations.

### Example with strings

```java
Set<String> words = new HashSet<>();
words.add(new String("Java"));
words.add(new String("Java"));

System.out.println(words.size());
```

Output:

```text
1
```

The two string objects are different objects in memory, but `String.equals()` says their contents are equal.

### Custom class: the wrong way

```java
class Student {
    int rollNumber;

    Student(int rollNumber) {
        this.rollNumber = rollNumber;
    }
}
```

If this class does not override `equals()` and `hashCode()`, two separately created `Student` objects with the same roll number are usually treated as different elements because the inherited `Object` equality is based on object identity.

```java
Set<Student> students = new HashSet<>();
students.add(new Student(101));
students.add(new Student(101));

System.out.println(students.size()); // 2
```

### Custom class: value-based equality

One modern option is to use a record (Java 16+):

```java
record Student(int rollNumber) {}

Set<Student> students = new HashSet<>();
students.add(new Student(101));
students.add(new Student(101));

System.out.println(students.size());
```

Output:

```text
1
```

Records automatically implement value-based `equals()` and `hashCode()` using their components.

If you use an ordinary class instead, implement both methods consistently. Never implement `equals()` to compare fields but leave an incompatible `hashCode()`.

## 8. Important Set Methods

### 8.1 `add(element)`

Adds an element if it is not already present.

```java
Set<String> set = new HashSet<>();

System.out.println(set.add("Java"));
System.out.println(set.add("Java"));
```

Output:

```text
true
false
```

### 8.2 `contains(element)`

Checks whether an element is present.

```java
Set<Integer> ids = new HashSet<>(Set.of(10, 20, 30));

System.out.println(ids.contains(20));
System.out.println(ids.contains(99));
```

Output:

```text
true
false
```

### 8.3 `remove(element)`

Removes the matching element if present and returns whether the set changed.

```java
Set<Integer> ids = new HashSet<>(Set.of(10, 20, 30));

System.out.println(ids.remove(20));
System.out.println(ids.remove(99));
System.out.println(ids);
```

Output includes:

```text
true
false
```

The order of the final `HashSet` output is unspecified.

### 8.4 `size()`, `isEmpty()`, and `clear()`

```java
Set<String> names = new HashSet<>();
names.add("Aarav");
names.add("Meera");

System.out.println(names.size());    // 2
System.out.println(names.isEmpty()); // false

names.clear();

System.out.println(names.size());    // 0
System.out.println(names.isEmpty()); // true
```

### 8.5 `addAll`

Adds all elements from another collection. Any duplicates are naturally ignored.

```java
Set<Integer> first = new LinkedHashSet<>(List.of(1, 2, 3));
Set<Integer> second = Set.of(3, 4, 5);

first.addAll(second);
System.out.println(first);
```

Output:

```text
[1, 2, 3, 4, 5]
```

Here `first` is a `LinkedHashSet`, so the original order is retained and newly encountered elements are appended in the order supplied by `second`'s iteration. Because `Set.of` does not promise a particular iteration order, the relative order of newly added elements should not be relied on in general. For a guaranteed result order, use a known ordered source or sort the result.

Required imports for the example:

```java
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
```

### 8.6 `removeAll`

Removes elements that are also present in another collection.

```java
Set<Integer> values = new LinkedHashSet<>(List.of(1, 2, 3, 4, 5));
values.removeAll(List.of(2, 4));

System.out.println(values);
```

Output:

```text
[1, 3, 5]
```

### 8.7 `retainAll`

Keeps only elements that are also present in another collection.

```java
Set<Integer> values = new LinkedHashSet<>(List.of(1, 2, 3, 4, 5));
values.retainAll(List.of(2, 4, 6));

System.out.println(values);
```

Output:

```text
[2, 4]
```

### 8.8 `containsAll`

Checks whether all elements in another collection are contained in this set.

```java
Set<Integer> values = Set.of(10, 20, 30);

System.out.println(values.containsAll(List.of(10, 30)));
System.out.println(values.containsAll(List.of(10, 99)));
```

Output:

```text
true
false
```

## 9. Set Operations: Union, Intersection, and Difference

Sets are useful for mathematical set operations.

Suppose:

```text
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
```

- **Union:** elements in A or B → `{1, 2, 3, 4, 5, 6}`
- **Intersection:** elements in both → `{3, 4}`
- **Difference A − B:** elements in A but not B → `{1, 2}`

### 9.1 Union using `addAll`

```java
Set<Integer> a = new LinkedHashSet<>(List.of(1, 2, 3, 4));
Set<Integer> b = Set.of(3, 4, 5, 6);

a.addAll(b);
System.out.println(a);
```

Possible output:

```text
[1, 2, 3, 4, 5, 6]
```

Because the second set is an unmodifiable factory set whose iteration order is not guaranteed, use an ordered source if exact output ordering is required.

### 9.2 Intersection using `retainAll`

```java
Set<Integer> a = new LinkedHashSet<>(List.of(1, 2, 3, 4));
Set<Integer> b = Set.of(3, 4, 5, 6);

a.retainAll(b);
System.out.println(a);
```

Output:

```text
[3, 4]
```

### 9.3 Difference using `removeAll`

```java
Set<Integer> a = new LinkedHashSet<>(List.of(1, 2, 3, 4));
Set<Integer> b = Set.of(3, 4, 5, 6);

a.removeAll(b);
System.out.println(a);
```

Output:

```text
[1, 2]
```

These methods modify the set on which they are called. If you need to preserve the original, make a copy first.

## 10. Navigating a `TreeSet`

`TreeSet` provides methods beyond the basic `Set` interface because it implements navigable sorted-set behavior.

For a set containing:

```text
[10, 20, 30, 40, 50]
```

the following methods are useful:

- `first()` — smallest element.
- `last()` — largest element.
- `lower(x)` — greatest element strictly less than `x`.
- `floor(x)` — greatest element less than or equal to `x`.
- `higher(x)` — least element strictly greater than `x`.
- `ceiling(x)` — least element greater than or equal to `x`.
- `pollFirst()` — remove and return the smallest element.
- `pollLast()` — remove and return the largest element.

Example:

```java
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        TreeSet<Integer> values =
                new TreeSet<>(java.util.List.of(10, 20, 30, 40, 50));

        System.out.println(values.first());
        System.out.println(values.last());
        System.out.println(values.lower(30));
        System.out.println(values.floor(30));
        System.out.println(values.higher(30));
        System.out.println(values.ceiling(31));
    }
}
```

Output:

```text
10
50
20
30
40
40
```

The difference between `lower` and `floor` is that `lower(30)` excludes `30`, while `floor(30)` permits equality.

Similarly, `higher(30)` excludes `30`, while `ceiling(30)` permits equality.

## 11. Ranges in a `TreeSet`

A `TreeSet` can create range views:

- `subSet(from, to)` — range from the lower endpoint (inclusive) to the upper endpoint (exclusive) by default.
- `headSet(to)` — elements below the endpoint by default.
- `tailSet(from)` — elements at or above the starting endpoint by default.

You can choose endpoint inclusion explicitly with overloads.

```java
TreeSet<Integer> values =
        new TreeSet<>(List.of(10, 20, 30, 40, 50));

System.out.println(values.subSet(20, 40));
System.out.println(values.headSet(30));
System.out.println(values.tailSet(30));
System.out.println(values.subSet(20, true, 40, true));
```

Output:

```text
[20, 30]
[10, 20]
[30, 40, 50]
[20, 30, 40]
```

Range results are views backed by the original set, not independent copies. Changes through a view can affect the original set. Adding an element outside the permitted range through a range view causes an exception.

## 12. Sorting a Set

A `HashSet` and `LinkedHashSet` do not automatically sort their elements.

If you want sorted unique elements, use a `TreeSet`:

```java
Set<Integer> numbers = new TreeSet<>(List.of(50, 10, 30, 10, 20));
System.out.println(numbers);
```

Output:

```text
[10, 20, 30, 50]
```

If you already have another set and just want a sorted list:

```java
Set<Integer> numbers = new HashSet<>(List.of(50, 10, 30, 20));
List<Integer> sorted = new ArrayList<>(numbers);
Collections.sort(sorted);

System.out.println(sorted);
```

Output:

```text
[10, 20, 30, 50]
```

This requires imports for `HashSet`, `List`, `ArrayList`, and `Collections`. The final list is sorted, regardless of the original `HashSet` iteration order.

## 13. Custom Objects and Mutable Set Elements

A set works best when the fields that define equality remain stable while an element is stored in it.

For hash-based sets, changing a field used by `hashCode()` or `equals()` after insertion can make the element hard to find or remove. For a `TreeSet`, changing a field used by its comparator or natural ordering can break the ordering assumptions.

Prefer immutable values for set elements when possible. If an element's identity must change, remove it first, change it, and then reinsert it.

For example, if `Student` equality is based on `rollNumber`, do not change that roll number while the student is inside a `HashSet`.

## 14. `Set.of` and Unmodifiable Sets

Java 9 introduced convenient factory methods:

```java
Set<String> languages = Set.of("Java", "C++", "Python");
```

This creates an unmodifiable set.

```java
// languages.add("Go"); // UnsupportedOperationException
```

`Set.of` also rejects duplicate values and null values:

```java
// Set.of("Java", "Java"); // IllegalArgumentException
// Set.of("Java", null);   // NullPointerException
```

If you need a mutable set, make a copy:

```java
Set<String> languages = new HashSet<>(
        Set.of("Java", "C++", "Python")
);

languages.add("Go");
System.out.println(languages.contains("Go"));
```

Output:

```text
true
```

The output order of the `HashSet` is not guaranteed.

## 15. Common Mistakes

**Mistake 1: Assuming `HashSet` preserves insertion order.** It does not guarantee order. Choose `LinkedHashSet` if insertion order matters.

**Mistake 2: Assuming a `Set` sorts its values.** Only implementations such as `TreeSet` maintain sorted order.

**Mistake 3: Assuming two custom objects with the same field values are automatically duplicates.** For `HashSet`, implement value-based `equals()` and `hashCode()` or use a suitable record.

**Mistake 4: Changing equality-related fields while an element is in a set.** This can make lookups or removals unreliable.

**Mistake 5: Expecting `TreeSet` to use `equals()` as its only duplicate test.** It uses ordering; a comparison result of zero means the elements are equivalent for set membership.

**Mistake 6: Trying to add to `Set.of(...)`.** It is unmodifiable and throws `UnsupportedOperationException`.

**Mistake 7: Expecting a `TreeSet` with natural ordering to accept null.** It normally throws `NullPointerException`.

**Mistake 8: Confusing set size with the number of `add` calls.** Duplicate additions that do not change the set do not increase its size.

## 16. Practical Program — Unique Student Roll Numbers

```java
import java.util.LinkedHashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<Integer> rollNumbers = new LinkedHashSet<>();

        rollNumbers.add(101);
        rollNumbers.add(102);
        rollNumbers.add(103);
        rollNumbers.add(101);
        rollNumbers.add(104);
        rollNumbers.add(102);

        System.out.println("Roll numbers: " + rollNumbers);
        System.out.println("Unique students: " + rollNumbers.size());
        System.out.println("Is 103 registered? " + rollNumbers.contains(103));
    }
}
```

Output:

```text
Roll numbers: [101, 102, 103, 104]
Unique students: 4
Is 103 registered? true
```

`LinkedHashSet` is a good choice because the program wants uniqueness and predictable insertion order.

## 17. Practical Program — Find Common Interests

```java
import java.util.LinkedHashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> personA = new LinkedHashSet<>(
                java.util.List.of("Coding", "Music", "Gaming", "Reading")
        );

        Set<String> personB = Set.of("Music", "Travel", "Coding");

        Set<String> common = new LinkedHashSet<>(personA);
        common.retainAll(personB);

        System.out.println("Common interests: " + common);
    }
}
```

Output:

```text
Common interests: [Coding, Music]
```

The program copies the first set, then retains only elements that also appear in the second set. It does not modify `personA`.

## 18. Practical Program — Find Unique Words in a Sentence

```java
import java.util.LinkedHashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        String sentence = "java is easy and java is useful";

        Set<String> words = new LinkedHashSet<>();

        for (String word : sentence.split("\\s+")) {
            words.add(word);
        }

        System.out.println(words);
        System.out.println("Unique words: " + words.size());
    }
}
```

Output:

```text
[java, is, easy, and, useful]
Unique words: 5
```

This simple example treats uppercase and lowercase as different values and does not remove punctuation. A more complete word-processing program would normalize case and clean punctuation before adding words to the set.

## 19. Practical Program — Sort Unique Marks

```java
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        TreeSet<Integer> marks = new TreeSet<>();

        marks.add(85);
        marks.add(92);
        marks.add(76);
        marks.add(85);
        marks.add(92);
        marks.add(88);

        System.out.println("Unique marks: " + marks);
        System.out.println("Lowest: " + marks.first());
        System.out.println("Highest: " + marks.last());
    }
}
```

Output:

```text
Unique marks: [76, 85, 88, 92]
Lowest: 76
Highest: 92
```

This is useful when you want distinct values in sorted order.

## 20. Time Complexity Summary

Typical time complexity for common operations in the standard implementations:

| Operation | `HashSet` | `LinkedHashSet` | `TreeSet` |
|---|---:|---:|---:|
| `add` | Average O(1) | Average O(1) | O(log n) |
| `contains` | Average O(1) | Average O(1) | O(log n) |
| `remove` | Average O(1) | Average O(1) | O(log n) |
| Iteration over all elements | O(n) | O(n) | O(n) |

For hash-based sets, collisions and other conditions can make operations slower than average-case expectations. `TreeSet` maintains sorted ordering with a balanced-tree structure, which is why basic operations are typically logarithmic.

Choose based on the requirements, not just one complexity number:
- `HashSet`: uniqueness and average-case lookup.
- `LinkedHashSet`: uniqueness plus insertion order.
- `TreeSet`: uniqueness plus sorted order and range/navigation methods.

## 21. Output-Based Questions

Try to predict the result before reading the answer.

### Question 1

```java
Set<Integer> values = new LinkedHashSet<>();
values.add(10);
values.add(20);
values.add(10);
values.add(30);
System.out.println(values.size());
System.out.println(values);
```

**Answer:**

```text
3
[10, 20, 30]
```

The set ignores the second `10` and preserves insertion order.

### Question 2

```java
Set<String> values = new TreeSet<>();
values.add("Mango");
values.add("Apple");
values.add("Banana");
System.out.println(values);
```

**Answer:**

```text
[Apple, Banana, Mango]
```

The `TreeSet` uses natural string ordering.

### Question 3

```java
Set<String> values = new HashSet<>();
values.add(new String("Java"));
values.add(new String("Java"));
System.out.println(values.size());
```

**Answer:**

```text
1
```

The strings are equal by content, so the set stores only one.

### Question 4

```java
TreeSet<Integer> values = new TreeSet<>(
        java.util.List.of(10, 20, 30, 40)
);
System.out.println(values.lower(30));
System.out.println(values.floor(30));
```

**Answer:**

```text
20
30
```

`lower` is strictly less than the target; `floor` can equal it.

### Question 5

```java
Set<Integer> values = new HashSet<>();
values.add(5);
values.add(5);
values.remove(5);
System.out.println(values.isEmpty());
```

**Answer:**

```text
true
```

Only one `5` was stored, and it was removed.

### Question 6

```java
Set<Integer> values = Set.of(1, 2, 3);
values.add(4);
```

**Answer:** The call throws `UnsupportedOperationException` because the set is unmodifiable.

### Question 7

```java
Set<Integer> values = new TreeSet<>();
values.add(20);
values.add(10);
values.add(30);
System.out.println(values.first());
System.out.println(values.last());
```

**Answer:**

```text
10
30
```

`first()` and `last()` return the smallest and largest elements.

## 22. Interview Questions and Answers

### Q1. What is a `Set` in Java?

A `Set` is a collection that prevents duplicate elements according to its equality or ordering rules.

### Q2. What is the difference between `List` and `Set`?

A `List` preserves a sequence, supports indexes, and allows duplicates. A `Set` has no index-based access and stores unique elements.

### Q3. What is the difference between `HashSet`, `LinkedHashSet`, and `TreeSet`?

`HashSet` gives no ordering guarantee. `LinkedHashSet` preserves insertion order. `TreeSet` maintains sorted order.

### Q4. How does `HashSet` detect duplicates?

It uses `hashCode()` to help locate candidate elements and `equals()` to check equality. Correct implementations of both methods are important for custom objects.

### Q5. Why is `equals()` not enough without `hashCode()`?

Hash-based collections use hash codes to locate candidate storage positions. Equal objects must have equal hash codes, or the collection may fail to detect duplicates reliably.

### Q6. How does `TreeSet` decide that two values are duplicates?

It treats elements as equivalent for set membership when their natural comparison or comparator returns zero. This ordering should ideally be consistent with `equals`.

### Q7. Can `HashSet` contain null?

Yes, the standard `HashSet` implementation permits one null element.

### Q8. Can `TreeSet` contain null?

A `TreeSet` using natural ordering normally cannot contain null because null cannot be compared with ordinary values. A custom comparator can define null ordering, but this should be deliberate.

### Q9. Does `HashSet` preserve insertion order?

No. Use `LinkedHashSet` when insertion order is required.

### Q10. Why might a `HashSet` contain two student objects with the same roll number?

If the class uses the default identity-based equality, the two objects are not considered equal. Implement value-based `equals()` and `hashCode()`, or use a record with the appropriate components.

### Q11. What is the time complexity of `TreeSet` operations?

Basic operations such as `add`, `contains`, and `remove` are typically O(log n).

### Q12. What is the purpose of `lower`, `floor`, `higher`, and `ceiling`?

They find nearby values in a sorted set. `lower` and `higher` are strict; `floor` and `ceiling` allow equality.

### Q13. Does `Set.of` return a mutable set?

No. It returns an unmodifiable set and rejects duplicate and null elements.

### Q14. How can you remove duplicates from a list while preserving order?

Create a `LinkedHashSet` from the list, then create a new list from that set.

### Q15. Can a set store objects whose fields change?

Technically yes, but changing fields used for hashing/equality or ordering while the object is stored can break expected lookup or ordering behavior. Prefer stable, immutable elements.

## 23. Practice Exercises

Complete these without looking up a solution first.

1. Create a `HashSet<Integer>`, add ten numbers with duplicates, and print the number of unique values.
2. Convert a list of names to a `LinkedHashSet` and back to a list, preserving first occurrence order.
3. Store unique email addresses and implement add, remove, and search operations.
4. Use a `TreeSet` to display unique integers in ascending order.
5. Create a reverse-order `TreeSet` of integers.
6. Given two sets, compute their union, intersection, and difference.
7. Use `lower`, `floor`, `higher`, and `ceiling` on a `TreeSet` and explain the results.
8. Create a custom `Student` class whose equality is based on roll number. Store students in a `HashSet` and verify duplicates are rejected.
9. Create a `TreeSet` of strings sorted by length, then alphabetically. Be careful that a comparator returning zero treats elements as equivalent for set membership.
10. Find all unique words in a sentence while preserving first occurrence order.
11. Find the second-largest distinct number using `TreeSet`.
12. Build a simple unique-tag manager using `LinkedHashSet`.
13. Demonstrate why changing a hash key's equality-related field after insertion is unsafe.
14. Explain when you would choose `HashSet`, `LinkedHashSet`, and `TreeSet` for real applications.

## 24. Revision Checklist

- [ ] Explain the purpose of the `Set` interface.
- [ ] Explain why duplicate elements are ignored.
- [ ] Compare `HashSet`, `LinkedHashSet`, and `TreeSet`.
- [ ] Know which implementations preserve insertion order or sorted order.
- [ ] Use `add`, `contains`, `remove`, `addAll`, `removeAll`, and `retainAll`.
- [ ] Compute union, intersection, and difference.
- [ ] Explain the role of `equals()` and `hashCode()`.
- [ ] Explain how a `TreeSet` uses ordering to determine uniqueness.
- [ ] Use `first`, `last`, `lower`, `floor`, `higher`, and `ceiling`.
- [ ] Understand that `subSet`, `headSet`, and `tailSet` return backed views.
- [ ] Understand the null behavior of the common set implementations.
- [ ] Know why `Set.of` is unmodifiable.
- [ ] Avoid changing equality-related or ordering-related fields while an element is in a set.
- [ ] Know the typical time complexities of the main implementations.

## 25. Final Summary

Use `Set` when each distinct element should appear only once. Choose `HashSet` when order does not matter, `LinkedHashSet` when you want to preserve insertion order, and `TreeSet` when you want sorted elements and navigation methods.

For hash-based sets, understand `equals()` and `hashCode()`. For sorted sets, understand how `compareTo()` or a `Comparator` determines order and uniqueness. Keep equality and ordering fields stable while elements are stored.

**Next chapter:** Chapter 33 — Queue, Deque, and PriorityQueue.
