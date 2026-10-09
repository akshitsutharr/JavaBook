# Chapter 34 — Map Interface and HashMap

> **Goal:** Understand how Java maps store key-value pairs, master `HashMap` and its methods, learn how hashing and equality work, and practise building useful programs with maps.

## 1. What Is a `Map`?

A `Map` stores information as **key-value pairs**. Each key identifies a value.

Examples:
- Roll number → student record
- Username → user profile
- Product ID → product details
- Country → capital city
- Word → frequency
- Employee ID → employee information

Think of a phone book: you search using a name and retrieve the corresponding phone number.

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> students = new HashMap<>();

        students.put(101, "Aarav");
        students.put(102, "Meera");
        students.put(103, "Kabir");

        System.out.println(students.get(102));
    }
}
```

Output:

```text
Meera
```

The key `102` identifies the value `"Meera"`.

## 2. The `Map` Interface

`Map<K, V>` is an interface in the Java Collections Framework. `K` represents the key type and `V` represents the value type.

For example:

```java
Map<Integer, String> students = new HashMap<>();
Map<String, Integer> scores = new HashMap<>();
Map<String, List<String>> courseStudents = new HashMap<>();
```

The map itself is **not** a subtype of `Collection`. It has a separate interface hierarchy because it stores mappings rather than individual elements. However, a map exposes views of its keys, values, and entries that can be iterated.

A map has these core rules:

- Each key is unique according to the map's key-equality rules.
- Different keys can have the same value.
- Inserting a mapping with an existing key replaces that key's previous value.
- The ordering of entries depends on the implementation.
- Generic type parameters help enforce the intended key and value types.

## 3. Creating a `HashMap`

Import `HashMap` and `Map`:

```java
import java.util.HashMap;
import java.util.Map;
```

### 3.1 Empty map

```java
Map<String, Integer> ages = new HashMap<>();
```

This creates an empty map that associates strings with integers.

### 3.2 Initial capacity

```java
Map<String, Integer> ages = new HashMap<>(100);
```

This supplies an initial capacity hint. It does not create 100 mappings. Capacity and the number of mappings (`size()`) are different concepts.

### 3.3 Copying another map

```java
Map<String, Integer> original = Map.of(
        "Aarav", 20,
        "Meera", 21
);

Map<String, Integer> copy = new HashMap<>(original);
copy.put("Kabir", 22);

System.out.println(copy.size());
```

Output:

```text
3
```

`Map.of` requires Java 9 or later and creates an unmodifiable map. The new `HashMap` is mutable.

## 4. Adding and Updating Mappings with `put`

`put(key, value)` inserts a new mapping or replaces the value associated with an existing key. It returns the previous value, or `null` if the key previously had no mapping or was mapped to `null`.

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

The second `put(101, "Kabir")` replaces the value for key `101`. A map cannot contain two separate entries with the same key.

### Example: Capture the old value

```java
Map<String, Integer> scores = new HashMap<>();

System.out.println(scores.put("Java", 80));
System.out.println(scores.put("Java", 95));
System.out.println(scores.get("Java"));
```

Output:

```text
null
80
95
```

The first `put` has no previous mapping, so it returns `null`. The second returns the previous score, `80`.

## 5. Retrieving Values

### 5.1 `get(key)`

Returns the value mapped to the key, or `null` if there is no mapping. Because `HashMap` permits null values, `get` alone cannot always distinguish a missing key from a key explicitly mapped to `null`.

```java
Map<String, String> capitals = new HashMap<>();
capitals.put("India", "New Delhi");
capitals.put("France", "Paris");

System.out.println(capitals.get("India"));
System.out.println(capitals.get("Japan"));
```

Output:

```text
New Delhi
null
```

### 5.2 `getOrDefault(key, defaultValue)`

Returns the mapped value when a non-null mapping is present; otherwise returns the supplied default value.

```java
Map<String, Integer> stock = new HashMap<>();
stock.put("Pen", 10);

System.out.println(stock.getOrDefault("Pen", 0));
System.out.println(stock.getOrDefault("Pencil", 0));
```

Output:

```text
10
0
```

If a key is explicitly mapped to `null`, `getOrDefault` returns that null value rather than the default. This matters when null values are allowed.

### 5.3 `containsKey(key)`

Checks whether a mapping for a key exists, even if the mapped value is null.

```java
Map<String, String> values = new HashMap<>();
values.put("A", null);

System.out.println(values.containsKey("A"));
System.out.println(values.containsKey("B"));
System.out.println(values.get("A"));
```

Output:

```text
true
false
null
```

This shows why `get(key) == null` is not enough to determine whether a key is absent.

### 5.4 `containsValue(value)`

Checks whether at least one mapping has the given value. It typically requires scanning the map, so it is generally slower than a hash-based key lookup.

```java
Map<Integer, String> students = new HashMap<>();
students.put(101, "Aarav");
students.put(102, "Meera");

System.out.println(students.containsValue("Meera"));
System.out.println(students.containsValue("Kabir"));
```

Output:

```text
true
false
```

## 6. Removing Mappings

### 6.1 `remove(key)`

Removes the mapping for the specified key and returns its previous value, or `null` if there was no mapping (or the previous value was null).

```java
Map<Integer, String> students = new HashMap<>();
students.put(101, "Aarav");
students.put(102, "Meera");

System.out.println(students.remove(101));
System.out.println(students.size());
```

Output:

```text
Aarav
1
```

### 6.2 `remove(key, value)`

Removes the mapping only if the key is currently associated with the specified value according to equality.

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Java", 90);

System.out.println(scores.remove("Java", 80));
System.out.println(scores.remove("Java", 90));
System.out.println(scores);
```

Output:

```text
false
true
{}
```

This conditional removal can help avoid deleting a mapping whose value has changed.

### 6.3 `clear()` and `size()`

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Java", 90);
scores.put("DSA", 95);

System.out.println(scores.size()); // 2
scores.clear();
System.out.println(scores.isEmpty()); // true
```

## 7. Iterating Over a Map

There are three common views: keys, values, and key-value entries.

### 7.1 Using `entrySet()` — usually best when you need both key and value

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> students = new HashMap<>();

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

The output order is unspecified because `HashMap` does not guarantee iteration order. One possible output is:

```text
101 -> Aarav
102 -> Meera
103 -> Kabir
```

### 7.2 Using `keySet()`

Use this when you mainly need keys.

```java
for (Integer id : students.keySet()) {
    System.out.println(id);
}
```

### 7.3 Using `values()`

Use this when you only need values.

```java
for (String name : students.values()) {
    System.out.println(name);
}
```

### 7.4 Using `forEach`

```java
students.forEach((id, name) ->
        System.out.println(id + " -> " + name)
);
```

This uses a lambda expression. It is concise and useful when the processing logic is short.

## 8. What Is a `HashMap`?

`HashMap` is a hash-table-based implementation of `Map`. It is designed to provide efficient average-case key lookup, insertion, and removal.

Important characteristics of the standard `HashMap`:

- Keys are unique.
- Values can repeat.
- It allows one null key and multiple null values.
- It does not guarantee iteration order.
- It is not synchronized by default.
- It relies on hashing and equality for key lookup.

Example:

```java
Map<String, Integer> counts = new HashMap<>();
counts.put("Java", 3);
counts.put("Python", 2);
counts.put("Java", 5);

System.out.println(counts.get("Java"));
System.out.println(counts.size());
```

Output:

```text
5
2
```

The key `"Java"` has one current mapping, with value `5`.

## 9. How Hashing Works — Conceptually

A hash map needs to locate a key efficiently. At a high level, it works like this:

1. You call `put(key, value)` or `get(key)`.
2. The map obtains the key's hash code.
3. The hash is used to help identify an internal bucket.
4. If necessary, the map checks candidate keys using equality.
5. If an equal key already exists, its value is replaced; otherwise a new mapping is stored.

This is a conceptual model. Exact implementation details, bucket calculations, and collision handling are internal and can vary across Java versions.

### What is a hash collision?

A collision occurs when two unequal keys produce the same hash code or are assigned to the same bucket. Collisions are allowed. The map uses equality checks to distinguish keys that are not equal.

A hash code does **not** need to be unique. The required contract is that equal objects must have equal hash codes.

## 10. `equals()` and `hashCode()` for Keys

This is one of the most important concepts when using `HashMap` with custom objects.

For a class used as a key:

- If two objects are equal according to `equals()`, they must return the same `hashCode()`.
- Different objects can have the same hash code.
- Fields used for equality and hashing should not change while the object is a key in a map.

### 10.1 Problem with a normal class

```java
class StudentKey {
    int rollNumber;

    StudentKey(int rollNumber) {
        this.rollNumber = rollNumber;
    }
}
```

Without overriding `equals()` and `hashCode()`, two separate instances with the same roll number are generally not considered equal.

```java
Map<StudentKey, String> students = new HashMap<>();

students.put(new StudentKey(101), "Aarav");
students.put(new StudentKey(101), "Meera");

System.out.println(students.size());
```

Output:

```text
2
```

The keys are two different object instances and default equality does not compare their roll numbers.

### 10.2 Value-based key using a record

For immutable data, a record is a concise option (Java 16+):

```java
record StudentKey(int rollNumber) {}

Map<StudentKey, String> students = new HashMap<>();

students.put(new StudentKey(101), "Aarav");
students.put(new StudentKey(101), "Meera");

System.out.println(students.size());
System.out.println(students.get(new StudentKey(101)));
```

Output:

```text
1
Meera
```

Records automatically provide value-based `equals()` and `hashCode()` for their components. The second insertion replaces the value associated with the equal key.

For older Java versions or ordinary classes, implement both methods correctly, often using `Objects.equals` and `Objects.hash`.

### 10.3 Why mutable keys are dangerous

Suppose a key's `hashCode()` depends on a field and that field changes after insertion. The map may look in a different bucket when you later call `get` or `remove`, so it may fail to find the mapping.

The safe rule is: **use immutable keys, or at least never change fields involved in equality and hashing while a key is stored in the map.**

## 11. Useful Map Methods

### 11.1 `putIfAbsent`

Adds a value only when the key is absent or currently mapped to null.

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Java", 80);

scores.putIfAbsent("Java", 95);
scores.putIfAbsent("DSA", 90);

System.out.println(scores);
```

The map contains Java score `80` and DSA score `90`. The existing non-null Java value is not replaced.

### 11.2 `replace`

Replaces a value only if the key is present.

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Java", 80);

System.out.println(scores.replace("Java", 95));
System.out.println(scores.replace("Python", 70));
System.out.println(scores);
```

Output:

```text
80
null
{Java=95}
```

The first call returns the old value. The second does not add a new key.

There is also a conditional form:

```java
scores.replace("Java", 95, 100);
```

This changes the value only if the current value matches `95`.

### 11.3 `computeIfAbsent`

Computes and stores a value when there is no current non-null mapping for the key.

```java
Map<String, Integer> wordLengths = new HashMap<>();

int length = wordLengths.computeIfAbsent(
        "Java",
        word -> word.length()
);

System.out.println(length);
System.out.println(wordLengths);
```

Output:

```text
4
{Java=4}
```

This method is especially useful when the value should be created only when needed, such as creating a list for a new category.

### 11.4 `computeIfPresent`

Recomputes a value only when the key is currently mapped to a non-null value.

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Java", 80);

scores.computeIfPresent("Java", (key, value) -> value + 5);

System.out.println(scores.get("Java"));
```

Output:

```text
85
```

If the remapping function returns `null`, the mapping is removed.

### 11.5 `compute`

Computes a new value based on the key and current value. If the remapping function returns null, the mapping is removed or remains absent.

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Java", 80);

scores.compute("Java", (key, value) -> value == null ? 1 : value + 10);

System.out.println(scores.get("Java"));
```

Output:

```text
90
```

### 11.6 `merge`

`merge` is a convenient method for counters and aggregations.

```java
Map<String, Integer> frequency = new HashMap<>();

frequency.merge("java", 1, Integer::sum);
frequency.merge("java", 1, Integer::sum);
frequency.merge("python", 1, Integer::sum);

System.out.println(frequency);
```

The map contains `java=2` and `python=1`; the displayed order is unspecified.

How it works:
- If the key has no non-null mapping, `1` is stored.
- If it already has a value, `Integer::sum` combines the old value with `1`.

## 12. Practical Program — Word Frequency Counter

This is a common use case for a map.

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

        for (Map.Entry<String, Integer> entry : frequency.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
```

The output order can vary, but the counts are:

```text
java: 2
is: 2
fun: 1
and: 1
useful: 1
```

If you need alphabetical key order, replace `HashMap` with `TreeMap`:

```java
Map<String, Integer> frequency = new TreeMap<>();
```

For real text processing, consider normalizing case and removing punctuation first. As written, `"Java"` and `"java"` are different keys.

## 13. Practical Program — Character Frequency

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String text = "banana";
        Map<Character, Integer> frequency = new HashMap<>();

        for (char ch : text.toCharArray()) {
            frequency.merge(ch, 1, Integer::sum);
        }

        System.out.println(frequency);
    }
}
```

The map contains:

```text
b=1
a=3
n=2
```

The printed order is unspecified. This program counts Java `char` values (UTF-16 code units), which is sufficient for simple ASCII examples but is not a full solution for every Unicode character.

## 14. Practical Program — Group Items by Category

A map can store a collection as each value.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, List<String>> items = new HashMap<>();

        items.computeIfAbsent("Fruit", key -> new ArrayList<>())
             .add("Apple");

        items.computeIfAbsent("Fruit", key -> new ArrayList<>())
             .add("Mango");

        items.computeIfAbsent("Vegetable", key -> new ArrayList<>())
             .add("Carrot");

        System.out.println(items);
    }
}
```

The map represents categories and their items. The exact map key order is unspecified, but the grouped data is equivalent to:

```text
Fruit -> [Apple, Mango]
Vegetable -> [Carrot]
```

`computeIfAbsent` creates the list for a category only when needed.

## 15. Practical Program — Student Records

```java
import java.util.HashMap;
import java.util.Map;

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
        return rollNumber + " - " + name + " - " + marks;
    }
}

public class Main {
    public static void main(String[] args) {
        Map<Integer, Student> students = new HashMap<>();

        students.put(101, new Student(101, "Aarav", 91));
        students.put(102, new Student(102, "Meera", 88));
        students.put(103, new Student(103, "Kabir", 95));

        Student student = students.get(102);

        if (student != null) {
            System.out.println(student);
        }

        students.remove(102);
        System.out.println("Total records: " + students.size());
    }
}
```

Output:

```text
102 - Meera - 88
Total records: 2
```

The roll number is the map key, so it can be used to retrieve the student record efficiently on average.

## 16. `HashMap` vs. `LinkedHashMap` vs. `TreeMap`

| Feature | `HashMap` | `LinkedHashMap` | `TreeMap` |
|---|---|---|---|
| Key order | No guarantee | Insertion order by default | Sorted by key |
| Typical basic lookup | Average O(1) | Average O(1) | O(log n) |
| Null key | Allows one | Allows one | Natural ordering normally rejects null; comparator behavior can differ |
| Null values | Allows them | Allows them | Allows them |
| Best for | General key lookup | Predictable insertion-order iteration | Sorted keys and range operations |

Choose the implementation based on your actual requirement. If you only need key-based lookup and do not need an ordering guarantee, `HashMap` is a common default.

## 17. Null Keys and Null Values in `HashMap`

The standard `HashMap` permits one null key and multiple null values.

```java
Map<String, String> map = new HashMap<>();

map.put(null, "Unknown key");
map.put("A", null);
map.put("B", null);

System.out.println(map.containsKey(null));
System.out.println(map.containsKey("A"));
System.out.println(map.get("A"));
System.out.println(map.size());
```

Output:

```text
true
true
null
3
```

There are three mappings: one with a null key, one for `"A"`, and one for `"B"`.

Even though null is permitted, it can make code harder to reason about. Use `containsKey` when you need to distinguish an absent key from a key mapped to null. Other map implementations may have stricter null rules.

## 18. Ordering and Predictable Output

A `HashMap` does not guarantee insertion order, sorted order, or any particular iteration order.

If the order matters:

- Use `LinkedHashMap` for insertion-order iteration.
- Use `TreeMap` for keys in sorted order.
- Or copy the entries into a list and sort them using a comparator.

Example using `TreeMap`:

```java
Map<Integer, String> students = new TreeMap<>();

students.put(103, "Kabir");
students.put(101, "Aarav");
students.put(102, "Meera");

System.out.println(students);
```

Output:

```text
{101=Aarav, 102=Meera, 103=Kabir}
```

The keys are sorted in natural order.

## 19. Typical Time Complexity

For the standard `HashMap` implementation, common operations such as `get`, `put`, and `remove` are typically O(1) on average under ordinary hashing conditions. Their worst-case behavior can be slower, and exact behavior depends on implementation details and collisions.

| Operation | Typical complexity |
|---|---:|
| `put(key, value)` | Average O(1) |
| `get(key)` | Average O(1) |
| `remove(key)` | Average O(1) |
| `containsKey(key)` | Average O(1) |
| `containsValue(value)` | O(n) |
| Iterate through entries | O(n) |
| `size()` | O(1) |

Do not confuse average complexity with a guarantee that every operation always takes constant time.

## 20. Thread Safety

`HashMap` is not synchronized by default. It is not intended for unsynchronized concurrent updates from multiple threads.

If multiple threads need to access or update a map, choose a concurrency strategy appropriate to the use case. Options include `ConcurrentHashMap`, synchronized wrappers, or external synchronization.

`ConcurrentHashMap` has different constraints from `HashMap`, including rejecting null keys and values. Also, thread-safe individual operations do not automatically make a multi-step sequence atomic.

Concurrency is a separate topic; for now, remember that `HashMap` is the normal non-thread-safe map.

## 21. Common Mistakes and Exceptions

**Mistake 1: Expecting duplicate keys.** A map has at most one mapping for each key. A later `put` replaces the value.

**Mistake 2: Expecting `HashMap` to preserve insertion order.** Its iteration order is unspecified. Use `LinkedHashMap` if insertion order matters.

**Mistake 3: Using `get(key) == null` to decide whether a key exists.** Null values are allowed. Use `containsKey(key)` when the distinction matters.

**Mistake 4: Forgetting `equals()` and `hashCode()` for custom keys.** Equal keys must have equal hash codes.

**Mistake 5: Mutating a key after insertion.** Changes to equality- or hash-related fields can make the mapping hard to find.

**Mistake 6: Using a raw map.** Prefer `Map<String, Integer>` over a raw `Map`, so the compiler can check types.

**Mistake 7: Assuming values must be unique.** Values can repeat; only keys are unique.

Common exceptions:
- `NullPointerException`: possible when null is passed to an operation that rejects it, or when your own code dereferences null.
- `ClassCastException`: can occur when keys cannot be compared by a map implementation that requires ordering, or when unsafe raw types/casts are used.
- `UnsupportedOperationException`: can occur if you attempt to modify an unmodifiable map such as one returned by `Map.of`.

## 22. Output-Based Questions

Try to predict the output before reading the answer.

### Question 1

```java
Map<Integer, String> map = new HashMap<>();
map.put(1, "A");
map.put(2, "B");
map.put(1, "C");

System.out.println(map.get(1));
System.out.println(map.size());
```

**Answer:**

```text
C
2
```

The second insertion for key `1` replaces the previous value.

### Question 2

```java
Map<String, Integer> map = new HashMap<>();
map.put("Java", 10);
map.put("DSA", 20);

System.out.println(map.containsKey("Java"));
System.out.println(map.containsValue(20));
```

**Answer:**

```text
true
true
```

### Question 3

```java
Map<String, Integer> map = new HashMap<>();
map.put("Java", null);

System.out.println(map.get("Java"));
System.out.println(map.containsKey("Java"));
System.out.println(map.containsKey("DSA"));
```

**Answer:**

```text
null
true
false
```

The first `null` is a stored value, not proof that the key is absent.

### Question 4

```java
Map<String, Integer> map = new HashMap<>();
map.merge("Java", 1, Integer::sum);
map.merge("Java", 1, Integer::sum);
map.merge("DSA", 1, Integer::sum);

System.out.println(map.get("Java"));
System.out.println(map.get("DSA"));
```

**Answer:**

```text
2
1
```

### Question 5

```java
Map<Integer, String> map = new TreeMap<>();
map.put(3, "C");
map.put(1, "A");
map.put(2, "B");

System.out.println(map);
```

**Answer:**

```text
{1=A, 2=B, 3=C}
```

A `TreeMap` sorts keys in natural order.

### Question 6

```java
Map<String, Integer> map = Map.of("Java", 10);
map.put("DSA", 20);
```

**Answer:** `UnsupportedOperationException` is thrown because `Map.of` returns an unmodifiable map.

### Question 7

```java
Map<Integer, String> map = new LinkedHashMap<>();
map.put(2, "B");
map.put(1, "A");
map.put(3, "C");

System.out.println(map);
```

**Answer:**

```text
{2=B, 1=A, 3=C}
```

`LinkedHashMap` preserves insertion order by default.

## 23. Interview Questions and Answers

### Q1. What is a `Map` in Java?

A `Map` stores key-value pairs and ensures that each key has at most one current mapping.

### Q2. Is `Map` a subtype of `Collection`?

No. `Map` is a separate interface. Its key, value, and entry views provide ways to iterate over the mappings.

### Q3. What happens when you put the same key twice?

The new value replaces the old value for that key.

### Q4. Can two keys have the same value?

Yes. Values do not have to be unique.

### Q5. Can a `HashMap` contain null?

Yes. It permits one null key and multiple null values.

### Q6. Does `HashMap` preserve insertion order?

No. Use `LinkedHashMap` when insertion order matters.

### Q7. How does a `HashMap` find a key?

It uses the key's hash code to help locate a bucket and uses equality checks to identify a matching key.

### Q8. What is a hash collision?

A collision occurs when different keys share a hash code or map to the same bucket. A hash map handles collisions and uses equality to distinguish unequal keys.

### Q9. Why must `equals()` and `hashCode()` be consistent?

Equal objects must have equal hash codes. Otherwise, a hash-based map may not reliably find an equal key.

### Q10. What is the average time complexity of `HashMap.get()`?

Typically O(1) on average under ordinary hashing conditions, though performance can be worse in some circumstances.

### Q11. What is the difference between `HashMap`, `LinkedHashMap`, and `TreeMap`?

`HashMap` provides no ordering guarantee, `LinkedHashMap` preserves insertion order by default, and `TreeMap` sorts keys.

### Q12. What is the difference between `containsKey` and `containsValue`?

`containsKey` checks for a key, usually efficiently in a hash map. `containsValue` scans for a matching value and is typically O(n).

### Q13. What does `getOrDefault` do?

It returns the mapped value when there is a non-null mapping; otherwise, it returns the provided default. A key explicitly mapped to null still yields null.

### Q14. What is `computeIfAbsent` used for?

It computes and stores a value when a key has no current non-null mapping. It is useful for lazily creating values such as lists.

### Q15. What is `merge` used for?

It combines a supplied value with an existing mapping, making it convenient for counters, frequency maps, and aggregations.

### Q16. Why are mutable map keys dangerous?

If a field used by `equals()` or `hashCode()` changes after insertion, the map may no longer locate the key correctly.

### Q17. Is `HashMap` thread-safe?

No, not by default. For concurrent use, consider `ConcurrentHashMap` or an appropriate synchronization strategy.

## 24. Practice Exercises

1. Create a map of five country-capital pairs and retrieve the capital for a selected country.
2. Store roll numbers and student names in a map. Implement add, update, search, and delete operations.
3. Count word frequencies in a sentence.
4. Count the frequency of each character in a string.
5. Find the first character that occurs exactly once using a frequency map and a second pass over the input.
6. Use `getOrDefault` to count product quantities.
7. Use `merge` to calculate total scores for repeated student names.
8. Group names by their first letter using `Map<Character, List<String>>`.
9. Use `TreeMap` to print student records in ascending roll-number order.
10. Use `LinkedHashMap` to preserve the order in which settings are added.
11. Create a custom immutable class as a map key and implement correct equality and hashing.
12. Demonstrate why changing a key's hash-related field after insertion is unsafe.
13. Compare `HashMap`, `LinkedHashMap`, and `TreeMap` for the same sample data.
14. Build an inventory tracker with product name as key and stock count as value.
15. Build a marks manager that stores subject names and marks, calculates total and average, and identifies the highest-scoring subject.

## 25. Revision Checklist

- [ ] Explain the purpose of `Map<K, V>`.
- [ ] Explain why a map is separate from the `Collection` hierarchy.
- [ ] Use `put`, `get`, `getOrDefault`, and `containsKey`.
- [ ] Use `containsValue`, `remove`, `clear`, and `size`.
- [ ] Understand what happens when a key is inserted twice.
- [ ] Iterate using `entrySet`, `keySet`, `values`, and `forEach`.
- [ ] Explain `HashMap` hashing and collisions at a conceptual level.
- [ ] Explain the `equals()` and `hashCode()` contract.
- [ ] Understand null key/value support in `HashMap`.
- [ ] Use `putIfAbsent`, `replace`, `computeIfAbsent`, `compute`, and `merge`.
- [ ] Implement word and character frequency counters.
- [ ] Compare `HashMap`, `LinkedHashMap`, and `TreeMap`.
- [ ] Understand typical time complexities.
- [ ] Explain why mutable keys and unsynchronized concurrent updates can cause problems.

## 26. Final Summary

A `Map` is the right choice when you need to associate a unique key with a value. `HashMap` is a common default because it typically offers efficient average-case key lookup, insertion, and removal.

Remember that keys are unique but values can repeat. A second `put` for the same key replaces its previous value. `HashMap` does not guarantee iteration order and allows one null key and multiple null values. For custom keys, correct `equals()` and `hashCode()` implementations are essential, and key fields used by those methods should remain stable while stored.

**Next chapter:** Chapter 35 — LinkedHashMap, TreeMap, and Map Views.
