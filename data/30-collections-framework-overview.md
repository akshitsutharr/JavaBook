# Chapter 30 — Java Collections Framework Overview

> **Goal:** Understand why Java has collections, how the Collections Framework is organized, when to use each major collection type, and how to work with collections safely and effectively.

## 1. What is the Collections Framework?

A **collection** is an object that groups multiple objects together. For example, a list of student names, a set of unique roll numbers, a queue of tasks, or a mapping from roll numbers to student records.

Java arrays can store multiple values, but their size is fixed after creation. Collections provide ready-made data structures that can grow or shrink and offer useful operations such as adding, removing, searching, sorting, and iterating over elements.

The **Java Collections Framework (JCF)** is a set of interfaces, implementations, and utility algorithms for storing and manipulating groups of objects.

It mainly includes:

- **Interfaces** that describe what a data structure can do, such as `List`, `Set`, and `Queue`.
- **Implementations** that provide the actual behavior, such as `ArrayList`, `HashSet`, and `PriorityQueue`.
- **Utility methods** in the `Collections` class, such as sorting, reversing, and finding the maximum element.

Example:

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();

        names.add("Aarav");
        names.add("Meera");
        names.add("Aarav");

        System.out.println(names);
        System.out.println("Count: " + names.size());
    }
}
```

Output:

```text
[Aarav, Meera, Aarav]
Count: 3
```

The list can grow when more names are added, and it allows duplicate names.

## 2. Arrays vs. Collections

| Feature | Array | Collection |
|---|---|---|
| Size | Fixed after creation | Usually grows or shrinks dynamically |
| Stores primitives | Yes, such as `int[]` | Collections store objects; use wrappers such as `Integer` |
| Built-in operations | Relatively limited | Many methods for adding, removing, searching, and more |
| Can store duplicates | Yes | Depends on the collection type |
| Index-based access | Available for arrays | Available in `List`, not in every collection |
| Examples | `int[]`, `String[]` | `ArrayList`, `HashSet`, `ArrayDeque` |

Array example:

```java
int[] numbers = new int[3];
numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;
```

The array has exactly three slots. A collection can usually be resized:

```java
List<Integer> numbers = new ArrayList<>();
numbers.add(10);
numbers.add(20);
numbers.add(30);
numbers.add(40);
```

**Important:** Collections are not always better than arrays. Arrays are useful when the size is known, low-level performance matters, or primitive storage is needed. Collections are convenient when data needs flexible size and rich operations.

## 3. The Framework Architecture

A simplified view of the main interfaces is:

```text
Iterable
   |
Collection
   |-------------------|-------------------|
  List                Set                Queue
                                             |
                                            Deque

Map  (separate hierarchy; does not extend Collection)
```

This is a simplified diagram, not a complete inheritance tree. `SortedSet` and `NavigableSet` extend the set hierarchy; `SortedMap` and `NavigableMap` extend the map hierarchy. Some interfaces and classes have additional relationships.

### 3.1 `Iterable`

`Iterable` represents something that can provide an iterator. It enables the enhanced `for` loop for types that implement it.

```java
List<String> names = List.of("Aarav", "Meera");

for (String name : names) {
    System.out.println(name);
}
```

`List`, `Set`, and `Queue` collections can be used in a for-each loop because they are part of the `Iterable` hierarchy.

### 3.2 `Collection`

`Collection<E>` is the main interface for a group of elements. It defines common operations such as:

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
- `toArray()`

`List`, `Set`, and `Queue` are important subinterfaces of `Collection`.

**Map is different:** `Map<K, V>` stores key-value pairs and does not extend `Collection`.

### 3.3 Why use an interface as the variable type?

Prefer this:

```java
List<String> names = new ArrayList<>();
```

rather than this when you do not need implementation-specific features:

```java
ArrayList<String> names = new ArrayList<>();
```

The first version separates the code's requirements (`List`) from its implementation (`ArrayList`). Later, you can switch to another `List` implementation with fewer code changes.

This is called **programming to an interface**.

## 4. The Main Collection Categories

<details>
The following sections explain each category. The key differences are ordering, duplicates, access style, and performance.
</details>

### 4.1 `List` — ordered sequence

A `List`:

- Maintains a defined sequence.
- Allows duplicate elements.
- Supports index-based access, such as `get(0)`.
- Usually permits `null`, depending on the implementation and operation.

Common implementations:

- `ArrayList`
- `LinkedList`
- `Vector` (legacy synchronized list)
- `Stack` (legacy class; `Deque` is generally preferred for stack behavior)

Use a list for ordered data such as a playlist, a sequence of exam scores, or the items in a shopping cart.

```java
List<String> subjects = new ArrayList<>();
subjects.add("Java");
subjects.add("DBMS");
subjects.add("Java");

System.out.println(subjects.get(0));
System.out.println(subjects);
```

Output:

```text
Java
[Java, DBMS, Java]
```

The list preserves the insertion sequence and stores `"Java"` twice.

### 4.2 `Set` — unique elements

A `Set` does not allow duplicate elements according to its equality rules.

Common implementations:

- `HashSet`: no guaranteed iteration order.
- `LinkedHashSet`: preserves insertion order.
- `TreeSet`: keeps elements sorted according to natural ordering or a comparator.

Use a set for unique email addresses, unique tags, or unique IDs.

```java
Set<Integer> ids = new HashSet<>();
ids.add(101);
ids.add(102);
ids.add(101);

System.out.println(ids.size());
```

Output:

```text
2
```

The printed order of a `HashSet` is not guaranteed. Do not depend on it.

### 4.3 `Queue` — processing elements

A queue represents elements waiting to be processed. Many queues follow **FIFO** (First In, First Out), meaning the first element added is the first one removed.

Common operations:

| Operation | Meaning |
|---|---|
| `offer(e)` | Add an element when possible |
| `poll()` | Remove and return the head, or return `null` if empty |
| `peek()` | View the head, or return `null` if empty |
| `add(e)` | Add; may throw an exception if it cannot |
| `remove()` | Remove the head; throws if empty |
| `element()` | View the head; throws if empty |

Prefer `offer`, `poll`, and `peek` when you want failure to be represented without an exception.

```java
Queue<String> tasks = new ArrayDeque<>();
tasks.offer("Compile");
tasks.offer("Test");
tasks.offer("Deploy");

System.out.println(tasks.poll());
System.out.println(tasks.peek());
```

Output:

```text
Compile
Test
```

`ArrayDeque` does not allow `null` elements.

### 4.4 `Deque` — double-ended queue

`Deque` is pronounced like “deck.” It allows insertion and removal at both ends. It can act as a queue or a stack.

Useful methods include:

- `addFirst(e)` / `offerFirst(e)`
- `addLast(e)` / `offerLast(e)`
- `removeFirst()` / `pollFirst()`
- `removeLast()` / `pollLast()`
- `peekFirst()` / `peekLast()`

For a stack, `push(e)` adds at the front and `pop()` removes from the front.

```java
Deque<String> history = new ArrayDeque<>();
history.push("Home");
history.push("Search");
history.push("Profile");

System.out.println(history.pop());
System.out.println(history);
```

Output:

```text
Profile
[Search, Home]
```

For most new code, prefer `ArrayDeque` over the older `Stack` class for ordinary stack behavior.

### 4.5 `Map` — key-value pairs

A `Map<K, V>` stores associations between keys and values.

Examples:

- Roll number → student
- Username → profile
- Product ID → product details
- Word → frequency

Rules:

- A key is unique within the map.
- Different keys can map to equal values.
- Putting a value for an existing key replaces that key's previous value.
- A map is not a `Collection`, although its views such as `keySet()`, `values()`, and `entrySet()` can be iterated.

Common implementations:

- `HashMap`: no guaranteed iteration order.
- `LinkedHashMap`: normally preserves insertion order.
- `TreeMap`: orders keys by natural ordering or a comparator.
- `Hashtable`: legacy synchronized map; usually prefer modern alternatives.

```java
Map<Integer, String> students = new HashMap<>();
students.put(101, "Aarav");
students.put(102, "Meera");
students.put(101, "Kabir");

System.out.println(students.get(101));
System.out.println(students.size());
```

Output:

```text
Kabir
2
```

The second `put` for key `101` replaces `"Aarav"` with `"Kabir"`; it does not create a second entry with key `101`.

## 5. Choosing an Implementation

| Requirement | Common choice | Reason |
|---|---|---|
| General-purpose resizable list | `ArrayList` | Fast indexed access and efficient iteration |
| List with frequent insertions/removals at ends | `LinkedList` or a `Deque` | Linked structure; `ArrayDeque` is often a better queue/stack choice |
| Unique values, order unimportant | `HashSet` | Efficient average-case membership operations |
| Unique values in insertion order | `LinkedHashSet` | Maintains insertion order |
| Unique values kept sorted | `TreeSet` | Sorted set |
| FIFO task processing | `ArrayDeque` | Efficient queue operations at the ends |
| Stack operations | `ArrayDeque` | Modern stack alternative |
| Priority-based processing | `PriorityQueue` | Head is the least element by default, according to its ordering |
| Key-value lookup | `HashMap` | Efficient average-case lookup |
| Key-value lookup in insertion order | `LinkedHashMap` | Maintains encounter order |
| Key-value lookup by sorted key | `TreeMap` | Keys remain sorted |

These are practical defaults, not universal rules. Measure performance for the actual workload when performance is important.

### 5.1 `ArrayList` vs. `LinkedList`

`ArrayList` uses a resizable array internally. It usually provides:

- Fast indexed reads, typically O(1).
- Amortized O(1) appending at the end.
- O(n) insertion/removal near the beginning or middle because elements may need to shift.

`LinkedList` is a doubly linked list. It provides:

- O(1) insertion/removal at its ends.
- O(n) indexed access, because it must traverse nodes.
- More per-element memory overhead than an array-backed list.

A common misconception is that `LinkedList` is always faster for insertions. If you first need to locate an interior position, traversal itself can take O(n). In many everyday programs, `ArrayList` is the sensible default.

### 5.2 Hash-based vs. sorted collections

Hash-based structures such as `HashSet` and `HashMap` are designed for efficient average-case membership or lookup. They do **not** guarantee sorted order.

Sorted structures such as `TreeSet` and `TreeMap` use ordering and typically offer O(log n) basic operations.

`LinkedHashSet` and `LinkedHashMap` preserve insertion order in their iteration behavior, but they are not sorted by element or key.

## 6. Common Methods You Should Know

### 6.1 Methods shared by many collections

```java
List<String> names = new ArrayList<>();

names.add("Aarav");
names.add("Meera");
names.add("Kabir");

System.out.println(names.size());          // 3
System.out.println(names.isEmpty());       // false
System.out.println(names.contains("Meera")); // true

names.remove("Aarav");
System.out.println(names);                 // [Meera, Kabir]

names.clear();
System.out.println(names.isEmpty());       // true
```

`contains` and `remove(Object)` generally rely on equality (`equals`), not merely object identity.

### 6.2 `List`-specific methods

- `get(index)`: retrieve an element.
- `set(index, element)`: replace an element.
- `add(index, element)`: insert at a position.
- `remove(index)`: remove the element at a position.
- `indexOf(element)`: first matching index, or `-1`.
- `lastIndexOf(element)`: last matching index, or `-1`.
- `subList(from, to)`: view of the range from `from` (inclusive) to `to` (exclusive).

Remember that list indexes start at `0`.

```java
List<String> languages = new ArrayList<>(
        List.of("Java", "C++", "Python")
);

languages.add(1, "JavaScript");
languages.set(0, "Java SE");

System.out.println(languages);
System.out.println(languages.indexOf("Python"));
```

Output:

```text
[Java SE, JavaScript, C++, Python]
3
```

`List.of` requires Java 9 or later. The `ArrayList` created here is mutable even though the source list returned by `List.of` is not.

### 6.3 `Map`-specific methods

- `put(key, value)`: add or replace a mapping.
- `get(key)`: return the mapped value, or `null` if no mapping exists (which can be ambiguous if null values are allowed).
- `getOrDefault(key, defaultValue)`: return a default if no mapping is present.
- `containsKey(key)`: test whether a key exists.
- `containsValue(value)`: test whether a value exists.
- `remove(key)`: remove a mapping.
- `putIfAbsent(key, value)`: add only if the key is absent or mapped to `null`, according to the method's contract.
- `putAll(map)`: copy mappings from another map.
- `keySet()`: view of keys.
- `values()`: view of values.
- `entrySet()`: view of key-value entries.
- `merge(key, value, remappingFunction)`: combine a value with an existing mapping.
- `computeIfAbsent(key, function)`: compute and store a value when no non-null mapping is present.

Example:

```java
Map<String, Integer> stock = new HashMap<>();
stock.put("Pen", 10);
stock.put("Book", 5);

System.out.println(stock.getOrDefault("Pencil", 0));
stock.merge("Pen", 3, Integer::sum);

System.out.println(stock.get("Pen"));
```

Output:

```text
0
13
```

`merge` is useful for counters and aggregations.

## 7. Iterating Over Collections

### 7.1 Enhanced `for` loop

Use this when you only need to read each element.

```java
List<String> names = List.of("Aarav", "Meera", "Kabir");

for (String name : names) {
    System.out.println(name);
}
```

Avoid structurally modifying a collection from inside a for-each loop unless you are using an appropriate supported mechanism.

### 7.2 Using an `Iterator`

An `Iterator` moves through elements using `hasNext()` and `next()`. Its `remove()` method can safely remove the last element returned by that iterator, when supported.

```java
List<Integer> numbers = new ArrayList<>(
        List.of(10, 15, 20, 25, 30)
);

Iterator<Integer> iterator = numbers.iterator();

while (iterator.hasNext()) {
    int number = iterator.next();

    if (number % 2 != 0) {
        iterator.remove();
    }
}

System.out.println(numbers);
```

Output:

```text
[10, 20, 30]
```

Required imports:

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
```

### 7.3 Using `ListIterator`

`ListIterator` works with lists and can move both forward and backward. It can also replace the current element and insert elements during iteration.

```java
List<String> names = new ArrayList<>(
        List.of("Aarav", "Meera", "Kabir")
);

ListIterator<String> iterator = names.listIterator();

while (iterator.hasNext()) {
    String name = iterator.next();

    if (name.equals("Meera")) {
        iterator.set("Mira");
    }
}

System.out.println(names);
```

Output:

```text
[Aarav, Mira, Kabir]
```

### 7.4 Removing elements safely

This is unsafe for many ordinary collections because a structural change can invalidate the iterator:

```java
// Avoid this pattern for ordinary mutable collections:
for (Integer number : numbers) {
    if (number < 10) {
        numbers.remove(number);
    }
}
```

Safer options include:

- Use `Iterator.remove()` while iterating.
- Use `removeIf` where appropriate:

```java
List<Integer> numbers = new ArrayList<>(
        List.of(3, 12, 7, 20, 5)
);

numbers.removeIf(number -> number < 10);
System.out.println(numbers);
```

Output:

```text
[12, 20]
```

### 7.5 What is `ConcurrentModificationException`?

Some collection iterators are **fail-fast**: they may throw `ConcurrentModificationException` when the collection is structurally modified outside the iterator while iteration is in progress.

Important qualifications:

- It is a bug-detection mechanism, not a thread-safety guarantee.
- It can happen in a single thread if the collection is modified incorrectly during iteration.
- It is not guaranteed to happen in every possible invalid modification.
- For concurrent access, choose an appropriate concurrent collection or use proper synchronization.

## 8. Sorting Collections

Java offers several approaches to sorting.

### 8.1 Natural ordering with `Comparable`

A class implements `Comparable<T>` to define its natural order through `compareTo`.

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(
                List.of(40, 10, 30, 20)
        );

        Collections.sort(numbers);
        System.out.println(numbers);
    }
}
```

Output:

```text
[10, 20, 30, 40]
```

For a list, `numbers.sort(null)` also uses the elements' natural ordering when available.

### 8.2 Custom ordering with `Comparator`

A `Comparator<T>` describes an ordering independently of the class.

```java
List<String> names = new ArrayList<>(
        List.of("Meera", "Aarav", "Kabir")
);

names.sort(Comparator.naturalOrder());
System.out.println(names);

names.sort(Comparator.reverseOrder());
System.out.println(names);
```

Output:

```text
[Aarav, Kabir, Meera]
[Meera, Kabir, Aarav]
```

### 8.3 Sorting objects by a field

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Student {
    private final String name;
    private final int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    String getName() {
        return name;
    }

    int getMarks() {
        return marks;
    }

    @Override
    public String toString() {
        return name + " (" + marks + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(List.of(
                new Student("Meera", 85),
                new Student("Aarav", 92),
                new Student("Kabir", 78)
        ));

        students.sort(
                Comparator.comparingInt(Student::getMarks).reversed()
        );

        System.out.println(students);
    }
}
```

Output:

```text
[Aarav (92), Meera (85), Kabir (78)]
```

`Comparator.comparingInt` creates a comparator based on an integer field. `reversed()` reverses the ordering.

### 8.4 `Comparable` vs. `Comparator`

| `Comparable` | `Comparator` |
|---|---|
| Implemented by the class being ordered | Can be defined separately |
| Uses `compareTo` | Uses `compare` |
| Usually defines natural ordering | Defines a custom or alternative ordering |
| A class generally has one natural ordering | Many different comparators can exist |

For `compareTo` and `compare`, the result is negative, zero, or positive to indicate relative ordering. Do not assume the result must be exactly `-1`, `0`, or `1`.

## 9. The `Collections` Utility Class

`Collection` is an interface. `Collections` is a utility class containing static methods that operate on collections.

Common methods include:

- `Collections.sort(list)`
- `Collections.reverse(list)`
- `Collections.shuffle(list)`
- `Collections.max(collection)`
- `Collections.min(collection)`
- `Collections.frequency(collection, value)`
- `Collections.unmodifiableList(list)`
- `Collections.synchronizedList(list)`

Example:

```java
List<Integer> numbers = new ArrayList<>(
        List.of(10, 30, 20, 30)
);

System.out.println(Collections.max(numbers));
System.out.println(Collections.min(numbers));
System.out.println(Collections.frequency(numbers, 30));

Collections.reverse(numbers);
System.out.println(numbers);
```

Output:

```text
30
10
2
[30, 20, 30, 10]
```

`Collections` is not the same thing as `Collection`.

## 10. Factory Methods and Mutability

Java provides convenient ways to create collections, but their mutability behavior differs.

### 10.1 `List.of`, `Set.of`, and `Map.of`

These factory methods were introduced in Java 9. They create **unmodifiable** collections.

```java
List<String> names = List.of("Aarav", "Meera");
// names.add("Kabir"); // throws UnsupportedOperationException
```

`Set.of` rejects duplicate elements, and these factory methods reject null elements/keys/values. For `Map.of`, keys must be unique.

To create a mutable copy:

```java
List<String> names = new ArrayList<>(
        List.of("Aarav", "Meera")
);
names.add("Kabir");

System.out.println(names);
```

Output:

```text
[Aarav, Meera, Kabir]
```

### 10.2 `Arrays.asList`

`Arrays.asList` returns a fixed-size list backed by the supplied array. You can replace existing elements, but you cannot change its size with operations such as `add` or `remove`.

```java
String[] array = {"Java", "C++", "Python"};
List<String> languages = Arrays.asList(array);

languages.set(0, "Java SE");
System.out.println(array[0]);

// languages.add("Go"); // throws UnsupportedOperationException
```

Output:

```text
Java SE
```

Because the list is backed by the array, replacing a list element updates the corresponding array slot.

If you need a fully resizable list:

```java
List<String> languages = new ArrayList<>(
        Arrays.asList("Java", "C++", "Python")
);
languages.add("Go");
```

### 10.3 Unmodifiable is not the same as deeply immutable

An unmodifiable collection does not allow its structure to be changed through that reference. If it contains mutable objects, those objects may still change.

For example, an unmodifiable list of `Student` objects does not automatically make each `Student` immutable.

## 11. Null Support and Ordering Differences

Different implementations have different rules. The following are common behaviors, not a substitute for checking a particular method's contract.

| Implementation | Ordering behavior | Null behavior (common/default implementations) |
|---|---|---|
| `ArrayList` | Insertion sequence | Allows null elements |
| `LinkedList` | List sequence | Allows null elements |
| `HashSet` | No guaranteed order | Allows one null element |
| `LinkedHashSet` | Insertion order | Allows one null element |
| `TreeSet` | Sorted order | Normally rejects null with natural ordering |
| `ArrayDeque` | Queue/deque order | Rejects null elements |
| `PriorityQueue` | Priority order at the head | Rejects null elements |
| `HashMap` | No guaranteed order | Allows one null key and null values |
| `LinkedHashMap` | Insertion order by default | Allows a null key and null values |
| `TreeMap` | Sorted by key | Natural-order keys normally reject null; comparator behavior may differ |
| `Hashtable` | No guaranteed order | Rejects null keys and values |

Do not rely on the current output order of a `HashMap` or `HashSet`. An order that appears stable in one run is not a documented ordering guarantee.

## 12. `equals()` and `hashCode()` in Hash-Based Collections

`HashSet` and `HashMap` use hashing to organize and find objects. For custom objects, correct `equals()` and `hashCode()` implementations matter.

The general contract states:

1. If two objects are equal according to `equals`, they must return the same `hashCode`.
2. Two unequal objects may have the same hash code; this is called a collision.
3. If an object's fields used by `equals` or `hashCode` change while it is stored as a hash-based key or set element, lookup and removal can become unreliable.

Example of a value-based class:

```java
import java.util.Objects;

class StudentId {
    private final int id;

    StudentId(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof StudentId other)) {
            return false;
        }
        return id == other.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
```

Then:

```java
Set<StudentId> ids = new HashSet<>();
ids.add(new StudentId(101));
ids.add(new StudentId(101));

System.out.println(ids.size());
```

Output:

```text
1
```

This example uses pattern matching for `instanceof`, supported in modern Java (Java 16+). On older Java versions, use a traditional cast.

A simpler option for immutable data is a Java `record` in Java 16+:

```java
record StudentId(int id) {}
```

Records automatically provide value-based `equals`, `hashCode`, and `toString` implementations.

## 13. Generics and Collections

Collections use generics to express the type of elements they hold.

```java
List<String> names = new ArrayList<>();
names.add("Aarav");
// names.add(100); // compile-time error
```

Without generics, the compiler cannot provide the same level of type safety and code may require unsafe casts.

Java collections store objects, not primitive values. Use wrapper types:

```java
List<Integer> marks = new ArrayList<>();
marks.add(95); // int is autoboxed to Integer

int firstMark = marks.get(0); // Integer is unboxed to int
```

Use `Integer`, `Double`, `Character`, and similar wrapper classes instead of `int`, `double`, and `char` as generic type arguments.

## 14. Practical Program 1 — Store and Display Student Names

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> students = new ArrayList<>();

        students.add("Aarav");
        students.add("Meera");
        students.add("Kabir");

        System.out.println("Students: " + students);
        System.out.println("Total: " + students.size());

        if (students.contains("Meera")) {
            System.out.println("Meera is registered.");
        }

        students.remove("Kabir");
        System.out.println("After removal: " + students);
    }
}
```

Output:

```text
Students: [Aarav, Meera, Kabir]
Total: 3
Meera is registered.
After removal: [Aarav, Meera]
```

Explanation:

- `add` inserts names.
- `size` returns the number of elements.
- `contains` searches using equality.
- `remove("Kabir")` removes the matching element.

## 15. Practical Program 2 — Find Unique IDs

```java
import java.util.LinkedHashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<Integer> ids = new LinkedHashSet<>();

        ids.add(501);
        ids.add(502);
        ids.add(501);
        ids.add(503);
        ids.add(502);

        System.out.println(ids);
        System.out.println("Unique count: " + ids.size());
    }
}
```

Output:

```text
[501, 502, 503]
Unique count: 3
```

`LinkedHashSet` removes duplicates and preserves insertion order. A `HashSet` would not guarantee that order.

## 16. Practical Program 3 — Count Word Frequencies

A map is useful when you want to count how often each word occurs.

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String sentence = "java is fun and java is useful";
        String[] words = sentence.split("\\s+");

        Map<String, Integer> frequency = new HashMap<>();

        for (String word : words) {
            frequency.merge(word, 1, Integer::sum);
        }

        System.out.println(frequency);
    }
}
```

One possible output:

```text
{java=2, useful=1, and=1, is=2, fun=1}
```

The exact order may differ because `HashMap` does not guarantee iteration order.

How `merge` works:

- If the word is absent, the initial value `1` is stored.
- If the word already exists, `Integer::sum` adds `1` to its current count.

To print entries in a predictable sorted order, use a `TreeMap`:

```java
Map<String, Integer> frequency = new TreeMap<>();
```

The counting loop can remain the same.

## 17. Practical Program 4 — Iterate Over a Map

```java
import java.util.LinkedHashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> students = new LinkedHashMap<>();

        students.put(101, "Aarav");
        students.put(102, "Meera");
        students.put(103, "Kabir");

        for (Map.Entry<Integer, String> entry : students.entrySet()) {
            System.out.println(
                    entry.getKey() + " -> " + entry.getValue()
            );
        }
    }
}
```

Output:

```text
101 -> Aarav
102 -> Meera
103 -> Kabir
```

`entrySet()` provides key-value entries. This is generally the convenient approach when both the key and value are needed.

Other ways to iterate:

```java
for (Integer id : students.keySet()) {
    System.out.println(id);
}

for (String name : students.values()) {
    System.out.println(name);
}

students.forEach((id, name) ->
        System.out.println(id + " -> " + name)
);
```

## 18. Practical Program 5 — Priority Queue

A `PriorityQueue` exposes the least element at its head by default, according to natural ordering. It is not a fully sorted list: iterating through it does not promise to produce sorted order.

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

For a max-priority queue:

```java
Queue<Integer> numbers =
        new PriorityQueue<>(Comparator.reverseOrder());
```

Then `poll()` returns the largest remaining element first.

## 19. Practical Program 6 — Sort Students by Marks

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Student {
    private final String name;
    private final int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    String getName() {
        return name;
    }

    int getMarks() {
        return marks;
    }

    @Override
    public String toString() {
        return name + " - " + marks;
    }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(List.of(
                new Student("Meera", 84),
                new Student("Aarav", 95),
                new Student("Kabir", 84)
        ));

        students.sort(
                Comparator.comparingInt(Student::getMarks)
                        .reversed()
                        .thenComparing(Student::getName)
        );

        students.forEach(System.out::println);
    }
}
```

Output:

```text
Aarav - 95
Kabir - 84
Meera - 84
```

The comparator sorts by marks descending. If marks are equal, it sorts by name ascending. The chained comparator makes the tie-breaking rule explicit.

## 20. Performance Cheat Sheet

These are typical time complexities for standard implementations under their usual assumptions. Exact performance depends on implementation details, data distribution, and workload.

| Operation | Typical implementation | Typical complexity |
|---|---|---|
| `get(index)` | `ArrayList` | O(1) |
| Append at end | `ArrayList` | Amortized O(1) |
| Insert/remove at arbitrary index | `ArrayList` | O(n) due to shifting |
| Search by value | `ArrayList` | O(n) |
| Add/remove at ends | `ArrayDeque` | Amortized O(1) |
| Add/check/remove | `HashSet` | Average O(1), worst case can be worse |
| `containsKey` / `get` / `put` | `HashMap` | Average O(1), worst case can be worse |
| Add/find/remove | `TreeSet` | O(log n) |
| `get` / `put` / remove | `TreeMap` | O(log n) |
| Insert into `PriorityQueue` | `PriorityQueue` | O(log n) |
| Read priority head | `PriorityQueue.peek()` | O(1) |
| Remove priority head | `PriorityQueue.poll()` | O(log n) |

Do not memorize complexity without understanding the operation. For example, removing an element from an `ArrayList` by index can require shifting many elements, while removing from a `HashSet` requires finding the element through its hashing/equality behavior.

## 21. Common Mistakes and Exceptions

### Mistake 1: Expecting `HashMap` to preserve insertion order

`HashMap` does not guarantee ordering. Use `LinkedHashMap` when insertion order matters, or `TreeMap` when sorted keys matter.

### Mistake 2: Expecting a set to preserve duplicates

A set stores unique elements. Use a `List` if duplicates are meaningful.

### Mistake 3: Assuming `Arrays.asList` is fully resizable

It is fixed-size. Wrap it in `new ArrayList<>(...)` if you need to add or remove elements.

### Mistake 4: Modifying a `List.of` result

`List.of`, `Set.of`, and `Map.of` produce unmodifiable collections. Mutating operations throw `UnsupportedOperationException`.

### Mistake 5: Removing from a collection directly during a for-each loop

This may throw `ConcurrentModificationException`. Use `Iterator.remove()` or `removeIf()` where appropriate.

### Mistake 6: Using a mutable object as a hash key

If fields used in `equals` or `hashCode` change after insertion, the map may no longer find the key where expected. Prefer immutable keys.

### Mistake 7: Confusing `remove` overloads in a list

For `List<Integer>`, `remove(1)` removes the element at index `1`, not the integer value `1`.

```java
List<Integer> numbers = new ArrayList<>(
        List.of(1, 2, 3, 2)
);

numbers.remove(1); // removes the element at index 1 (the value 2)
System.out.println(numbers);

numbers.remove(Integer.valueOf(2)); // removes the first value equal to 2
System.out.println(numbers);
```

Output:

```text
[1, 3, 2]
[1, 3]
```

### Mistake 8: Assuming `get(key) == null` always means the key is absent

Some maps allow null values. Use `containsKey(key)` when you must distinguish “no mapping” from “mapping to null.”

### Common exceptions

- `UnsupportedOperationException`: the requested modification is not supported, such as adding to a fixed-size or unmodifiable list.
- `ConcurrentModificationException`: an iterator detects an unsupported structural modification pattern.
- `IndexOutOfBoundsException`: a list index is outside the valid range.
- `NullPointerException`: null is passed to an operation or implementation that does not permit it.
- `ClassCastException`: an element cannot be compared or cast as required by an operation, for example with incompatible raw-type data.

## 22. Thread Safety: A Short Introduction

Most everyday collection implementations such as `ArrayList`, `HashMap`, and `HashSet` are not synchronized for concurrent modification by multiple threads.

Possible options include:

- `Collections.synchronizedList(...)` or `Collections.synchronizedMap(...)` for synchronized wrappers, with care required when iterating.
- Concurrent collections such as `ConcurrentHashMap` for suitable concurrent workloads.
- Immutable or unmodifiable data when shared read-only access is appropriate.
- External synchronization when multiple operations must behave as one atomic unit.

Do not assume that making one individual operation thread-safe makes a whole sequence of operations atomic. Also, `Collections.synchronizedList` requires external synchronization on the returned list during iteration, following its documented usage.

For now, focus on learning the normal collection types first. Concurrency-specific collections can be studied when learning multithreading.

## 23. Mini-Project — Student Records Manager

### Requirements

Build a small console-based student records manager with these features:

1. Store students using roll number as a unique key.
2. Add a student or update an existing roll number's record.
3. Find a student by roll number.
4. Remove a student by roll number.
5. Display all students.
6. Keep a set of unique course names.

This project combines `Map`, `Set`, classes, generics, and iteration.

### Starter implementation

```java
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

class Student {
    private final int rollNumber;
    private final String name;
    private final int marks;

    Student(int rollNumber, String name, int marks) {
        this.rollNumber = rollNumber;
        this.name = name;
        this.marks = marks;
    }

    int getRollNumber() {
        return rollNumber;
    }

    String getName() {
        return name;
    }

    int getMarks() {
        return marks;
    }

    @Override
    public String toString() {
        return rollNumber + " | " + name + " | " + marks;
    }
}

public class StudentRecordsManager {
    private final Map<Integer, Student> students = new LinkedHashMap<>();
    private final Set<String> courses = new LinkedHashSet<>();

    public void addStudent(Student student) {
        students.put(student.getRollNumber(), student);
    }

    public Student findStudent(int rollNumber) {
        return students.get(rollNumber);
    }

    public boolean removeStudent(int rollNumber) {
        return students.remove(rollNumber) != null;
    }

    public void addCourse(String course) {
        courses.add(course);
    }

    public void displayStudents() {
        for (Student student : students.values()) {
            System.out.println(student);
        }
    }

    public void displayCourses() {
        System.out.println(courses);
    }

    public static void main(String[] args) {
        StudentRecordsManager manager = new StudentRecordsManager();

        manager.addStudent(new Student(101, "Aarav", 91));
        manager.addStudent(new Student(102, "Meera", 88));
        manager.addStudent(new Student(101, "Aarav", 95)); // update roll 101

        manager.addCourse("Java");
        manager.addCourse("DSA");
        manager.addCourse("Java"); // duplicate ignored

        System.out.println("All students:");
        manager.displayStudents();

        System.out.println("Find 102: " + manager.findStudent(102));
        System.out.println("Removed 102: " + manager.removeStudent(102));

        System.out.println("After removal:");
        manager.displayStudents();

        System.out.print("Courses: ");
        manager.displayCourses();
    }
}
```

Output:

```text
All students:
101 | Aarav | 95
102 | Meera | 88
Find 102: 102 | Meera | 88
Removed 102: true
After removal:
101 | Aarav | 95
Courses: [Java, DSA]
```

Why this design works:

- `Map<Integer, Student>` gives each roll number one current student record.
- Inserting an existing key replaces the associated student.
- `LinkedHashMap` preserves insertion order for iteration.
- `Set<String>` prevents duplicate course names.
- `LinkedHashSet` preserves course insertion order.

Possible extensions: add a menu with `Scanner`, validate marks, sort students by marks, search by name, calculate the class average, and save records to a file.

## 24. Output-Based Practice Questions

Try each question before looking at the answer.

### Question 1

```java
List<String> items = new ArrayList<>();
items.add("A");
items.add("B");
items.add("A");
items.remove("A");
System.out.println(items);
```

**Answer:**

```text
[B, A]
```

`remove("A")` removes the first matching value, not every occurrence.

### Question 2

```java
Set<Integer> values = new LinkedHashSet<>();
values.add(5);
values.add(3);
values.add(5);
values.add(7);
System.out.println(values);
```

**Answer:**

```text
[5, 3, 7]
```

The set removes duplicates and the linked implementation preserves insertion order.

### Question 3

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Aarav", 80);
scores.put("Aarav", 95);
System.out.println(scores.get("Aarav"));
System.out.println(scores.size());
```

**Answer:**

```text
95
1
```

A key appears at most once in a map. A later `put` replaces its value.

### Question 4

```java
List<Integer> values = new ArrayList<>(List.of(10, 20, 30));
values.remove(1);
System.out.println(values);
```

**Answer:**

```text
[10, 30]
```

For a `List<Integer>`, `remove(1)` chooses the index overload.

### Question 5

```java
Queue<Integer> q = new ArrayDeque<>();
q.offer(10);
q.offer(20);
q.offer(30);
System.out.println(q.poll());
System.out.println(q.peek());
```

**Answer:**

```text
10
20
```

`poll` removes the head; `peek` reads the next head without removing it.

### Question 6

```java
List<String> names = List.of("Aarav", "Meera");
names.add("Kabir");
```

**Answer:** The last line throws `UnsupportedOperationException` because the list returned by `List.of` is unmodifiable.

### Question 7

```java
PriorityQueue<Integer> q = new PriorityQueue<>();
q.add(30);
q.add(10);
q.add(20);
System.out.println(q.poll());
```

**Answer:**

```text
10
```

The default priority queue places the least element at its head. Its general iteration order is not guaranteed to be sorted.

## 25. Interview Questions and Answers

### Q1. What is the Java Collections Framework?

It is a group of interfaces, implementations, and utility methods for storing and processing groups of objects.

### Q2. What is the difference between `Collection` and `Collections`?

`Collection` is an interface in the collection hierarchy. `Collections` is a utility class containing static methods such as `sort`, `reverse`, and `max`.

### Q3. Is `Map` a child of `Collection`?

No. `Map` is a separate interface for key-value mappings. Its `keySet`, `values`, and `entrySet` views are iterable collections or sets.

### Q4. What is the difference between `List` and `Set`?

A `List` preserves a sequence and allows duplicates. A `Set` prevents duplicate elements according to its equality rules.

### Q5. What is the difference between `HashSet` and `LinkedHashSet`?

Both store unique elements. `HashSet` gives no ordering guarantee, while `LinkedHashSet` preserves insertion order.

### Q6. What is the difference between `HashMap` and `TreeMap`?

`HashMap` does not guarantee key order and typically offers average constant-time basic lookup. `TreeMap` keeps keys sorted and typically offers logarithmic-time basic operations.

### Q7. Why is `ArrayList` commonly preferred over `LinkedList`?

`ArrayList` provides fast indexed access, good iteration performance, and low per-element overhead. `LinkedList` can be useful for operations at the ends, but indexed access requires traversal.

### Q8. What is the difference between `Queue` and `Deque`?

A queue typically processes elements at one end and removes from the head. A deque supports insertion and removal at both ends and can act as a queue or stack.

### Q9. Does a `PriorityQueue` iterate in sorted order?

No. Its head is the highest-priority element according to its ordering (the least element by default), but iterating over it does not guarantee a sorted sequence. Repeatedly calling `poll()` retrieves elements in priority order.

### Q10. Why are generics used in collections?

They provide compile-time type safety, reduce casts, and make the intended element type clear.

### Q11. Why must `equals` and `hashCode` agree?

Hash-based collections use hash codes to locate candidate storage positions and equality to identify matching keys/elements. Equal objects must have equal hash codes for these collections to behave correctly.

### Q12. What is a fail-fast iterator?

An iterator that may throw `ConcurrentModificationException` when it detects a structural modification that violates its expected iteration rules. It is a bug-detection mechanism, not a guarantee of thread safety.

### Q13. What is the difference between `Arrays.asList` and `List.of`?

`Arrays.asList` returns a fixed-size list backed by an array; replacing elements is allowed. `List.of` returns an unmodifiable list and rejects null elements. Both are unsuitable when you need to add and remove elements directly.

### Q14. What is `ConcurrentHashMap` used for?

It is a map implementation designed for concurrent access. It can be useful when multiple threads need to access or update mappings without synchronizing every operation externally. Its detailed concurrency behavior belongs to the multithreading topic.

### Q15. Can a collection store primitive types directly?

No. Java generic type arguments must be reference types. Use wrapper classes such as `Integer` and rely on autoboxing/unboxing where appropriate.

## 26. Practice Exercises

Complete these without copying the solutions first.

1. Create an `ArrayList<Integer>` and store ten numbers. Print the largest and smallest values.
2. Given a list of names, remove all names that start with `"A"` using `removeIf`.
3. Convert a list containing duplicate integers into a `LinkedHashSet`, preserving first-seen order.
4. Store roll numbers and student names in a `HashMap`. Implement add, search, update, and delete operations.
5. Count the frequency of each character in a string using a `Map<Character, Integer>`.
6. Use a `TreeMap` to display product IDs in sorted order.
7. Sort a list of strings by length, then alphabetically for equal lengths.
8. Use a `PriorityQueue` to repeatedly retrieve numbers from smallest to largest.
9. Demonstrate the difference between `Arrays.asList`, `List.of`, and `ArrayList` by attempting replacement, addition, and removal.
10. Create a custom immutable key class and implement correct `equals` and `hashCode`. Use it in a `HashMap`.
11. Implement a browser-history stack using `ArrayDeque`.
12. Extend the Student Records Manager to calculate the average marks and print students from highest to lowest marks.

## 27. Revision Checklist

Before moving on, make sure you can explain each point in your own words.

- [ ] What the Java Collections Framework is and why it is useful.
- [ ] The difference between arrays and collections.
- [ ] The roles of `Iterable`, `Collection`, `List`, `Set`, `Queue`, `Deque`, and `Map`.
- [ ] Why `Map` does not extend `Collection`.
- [ ] The main differences between `ArrayList` and `LinkedList`.
- [ ] The ordering behavior of `HashSet`, `LinkedHashSet`, and `TreeSet`.
- [ ] The ordering behavior of `HashMap`, `LinkedHashMap`, and `TreeMap`.
- [ ] How to use `Queue`, `Deque`, and `PriorityQueue`.
- [ ] How to iterate over a collection and safely remove elements.
- [ ] The difference between `Comparable` and `Comparator`.
- [ ] The difference between `Collection` and `Collections`.
- [ ] How `List.of`, `Set.of`, `Map.of`, and `Arrays.asList` differ.
- [ ] Why `equals` and `hashCode` matter in hash-based collections.
- [ ] Why Java collections use wrapper classes instead of primitive type arguments.
- [ ] The typical performance characteristics of common implementations.
- [ ] The meaning of common exceptions such as `UnsupportedOperationException` and `ConcurrentModificationException`.

## 28. Final Summary

The most important first step is to choose the right abstraction:

- Use a **`List`** when sequence, duplicates, or index-based access matters.
- Use a **`Set`** when elements must be unique.
- Use a **`Queue`** or **`Deque`** when elements are processed from one or both ends.
- Use a **`Map`** when data is stored as key-value pairs.

Then choose an implementation based on ordering and performance requirements: `ArrayList`, `HashSet`, `LinkedHashSet`, `TreeSet`, `ArrayDeque`, `PriorityQueue`, `HashMap`, `LinkedHashMap`, or `TreeMap`.

Do not depend on an ordering guarantee an implementation does not provide. Understand whether a collection is mutable, use generics for type safety, and follow the iterator rules when removing elements.

**Next chapter:** Chapter 31 — List Interface and `ArrayList`.
