# Chapter 35: LinkedHashMap, TreeMap, and Map Views

## 1. What You Will Learn

In the previous chapter, you learned how `Map` stores key-value pairs and how `HashMap` works. In this chapter, you will learn two other important implementations—`LinkedHashMap` and `TreeMap`—along with the views returned by a map.

By the end, you should be able to:

- Choose between `HashMap`, `LinkedHashMap`, and `TreeMap`.
- Preserve insertion order or maintain sorted keys.
- Use access-order `LinkedHashMap` and understand the idea behind an LRU cache.
- Search for nearby keys in a `TreeMap`.
- Work with `keySet()`, `values()`, and `entrySet()`.
- Create range views and understand why changes to a view can change the original map.
- Sort map entries by key or value.

Examples use standard Java syntax. Some APIs are marked with their minimum Java version.

---

## 2. Quick Recap: What Is a Map?

A `Map<K, V>` stores key-value pairs. A key identifies a value, and each key can appear only once.

```java
Map<Integer, String> students = new HashMap<>();

students.put(101, "Aarav");
students.put(102, "Meera");
students.put(103, "Kabir");

System.out.println(students.get(102));
```

Output:

```text
Meera
```

Here, `102` is a key and `"Meera"` is its value. Adding another value with the same key replaces the previous value:

```java
students.put(102, "Riya");
System.out.println(students.get(102));
```

Output:

```text
Riya
```

A map is not a subtype of `Collection`; it is a separate part of the Java Collections Framework. The most common implementations are `HashMap`, `LinkedHashMap`, and `TreeMap`.

---

## 3. `HashMap` vs `LinkedHashMap` vs `TreeMap`

| Feature | `HashMap` | `LinkedHashMap` | `TreeMap` |
|---|---|---|---|
| Key order | No guaranteed iteration order | Insertion order by default; can use access order | Sorted key order |
| Typical basic-operation cost | Average O(1) | Average O(1) | O(log n) |
| Null key | Allows one | Allows one | Normally does not allow null with natural ordering |
| Null values | Allows them | Allows them | Allows them |
| Main use | Fast lookup when order does not matter | Predictable iteration order | Sorted keys and range/navigation queries |

**Choose `HashMap`** when you want efficient lookup and do not care about iteration order.

**Choose `LinkedHashMap`** when iteration order matters, such as preserving the order in which settings were entered.

**Choose `TreeMap`** when keys must remain sorted or you need queries such as “find the greatest key less than this value.”

The complexity figures are typical for the common operations; performance also depends on the data and implementation details.

---

## 4. `LinkedHashMap`

### 4.1 What is `LinkedHashMap`?

`LinkedHashMap` is a map implementation that maintains a linked ordering of its entries in addition to the hashing used for lookup.

By default, it preserves **insertion order**: entries are visited in the order in which their keys were first inserted.

```java
import java.util.LinkedHashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> students = new LinkedHashMap<>();

        students.put(103, "Kabir");
        students.put(101, "Aarav");
        students.put(102, "Meera");

        System.out.println(students);
    }
}
```

Output:

```text
{103=Kabir, 101=Aarav, 102=Meera}
```

Notice that the entries are not sorted by key. Their iteration order follows insertion order.

### 4.2 Updating a value does not create a new insertion

```java
Map<String, Integer> scores = new LinkedHashMap<>();

scores.put("Asha", 70);
scores.put("Dev", 85);
scores.put("Asha", 95);

System.out.println(scores);
```

Output:

```text
{Asha=95, Dev=85}
```

Updating `"Asha"` changes its value, but it does not move the existing entry to the end in the default insertion-order mode.

### 4.3 Common constructors

```java
Map<String, Integer> first = new LinkedHashMap<>();

Map<String, Integer> second = new LinkedHashMap<>(32);

Map<String, Integer> third = new LinkedHashMap<>(32, 0.75f);

Map<String, Integer> fourth =
        new LinkedHashMap<>(32, 0.75f, true);
```

The constructors mean:

- `new LinkedHashMap<>()`: default initial capacity and load factor.
- `new LinkedHashMap<>(32)`: initial capacity of 32.
- `new LinkedHashMap<>(32, 0.75f)`: initial capacity and load factor.
- `new LinkedHashMap<>(32, 0.75f, true)`: access-order mode.

The last constructor is especially useful for understanding LRU caches.

### 4.4 Insertion order vs access order

In insertion-order mode, entries stay in the order they were inserted. In **access-order mode**, an entry that is accessed is moved toward the most-recently-accessed end.

```java
import java.util.LinkedHashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> map =
                new LinkedHashMap<>(16, 0.75f, true);

        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        System.out.println(map);

        map.get("A"); // Access A, so it becomes most recently used.

        System.out.println(map);
    }
}
```

Output:

```text
{A=1, B=2, C=3}
{B=2, C=3, A=1}
```

The third constructor argument controls access order:

- `false`: insertion order.
- `true`: access order.

In access-order mode, operations that access an existing entry—such as `get()`—can change its iteration order. Avoid assuming that reading from such a map is always an order-neutral operation.

### 4.5 What is an LRU cache?

LRU stands for **Least Recently Used**. When a cache reaches its capacity, it removes the item that has not been used for the longest time.

For example, imagine a cache can store only three pages:

1. Open page A.
2. Open page B.
3. Open page C.
4. Open page A again; A is now the most recently used.
5. Add page D; B is the least recently used and is removed.

An access-order `LinkedHashMap` can implement a simple LRU cache.

```java
import java.util.LinkedHashMap;
import java.util.Map;

class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    public LRUCache(int capacity) {
        // true enables access-order mode.
        super(16, 0.75f, true);

        if (capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be positive");
        }

        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;
    }
}

public class Main {
    public static void main(String[] args) {
        LRUCache<String, Integer> cache = new LRUCache<>(3);

        cache.put("A", 1);
        cache.put("B", 2);
        cache.put("C", 3);

        cache.get("A"); // A becomes most recently used.
        cache.put("D", 4); // B is removed.

        System.out.println(cache);
    }
}
```

Output:

```text
{C=3, A=1, D=4}
```

Why is B missing? Before inserting D, the access order after `get("A")` is B, C, A. Inserting D makes the size four, so `removeEldestEntry()` returns `true` and removes B.

**Important:** `removeEldestEntry()` is a hook for automatically removing the eldest entry after insertion. It does not itself perform a full cache policy; access-order mode determines which entry is eldest in this example.

This is a teaching example, not a complete production cache. Real caches may need thread safety, expiration, size limits based on memory, and other policies.

### 4.6 When should you use `LinkedHashMap`?

Useful examples include:

- Keeping configuration values in a predictable display order.
- Preserving the order of fields entered by a user.
- Creating simple LRU caches.
- Producing stable output for reports and tests.

---

## 5. `TreeMap`

### 5.1 What is `TreeMap`?

`TreeMap` stores key-value pairs in **sorted key order**. It implements `NavigableMap`, which extends `SortedMap`.

By default, keys are sorted using their natural ordering. For example, integers are sorted numerically and strings are sorted lexicographically.

```java
import java.util.Map;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> students = new TreeMap<>();

        students.put(103, "Kabir");
        students.put(101, "Aarav");
        students.put(102, "Meera");

        System.out.println(students);
    }
}
```

Output:

```text
{101=Aarav, 102=Meera, 103=Kabir}
```

Even though the keys were inserted in the order 103, 101, 102, iteration is sorted by key.

### 5.2 Natural ordering

For numbers:

```java
TreeMap<Integer, String> map = new TreeMap<>();

map.put(40, "Forty");
map.put(10, "Ten");
map.put(30, "Thirty");

System.out.println(map.keySet());
```

Output:

```text
[10, 30, 40]
```

For strings, natural ordering is based on the `String` comparison rules, which compare character sequences lexicographically. It is not necessarily the same as human-language dictionary sorting for every locale.

```java
TreeMap<String, Integer> marks = new TreeMap<>();

marks.put("Rohan", 80);
marks.put("Amit", 90);
marks.put("Zoya", 75);

System.out.println(marks);
```

Output:

```text
{Amit=90, Rohan=80, Zoya=75}
```

### 5.3 Custom sorting with `Comparator`

You can supply a `Comparator` to define a different key order.

Example: sort integer keys in descending order.

```java
import java.util.Comparator;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        TreeMap<Integer, String> map =
                new TreeMap<>(Comparator.reverseOrder());

        map.put(10, "Ten");
        map.put(30, "Thirty");
        map.put(20, "Twenty");

        System.out.println(map);
    }
}
```

Output:

```text
{30=Thirty, 20=Twenty, 10=Ten}
```

Example: sort strings by length, then alphabetically when lengths match.

```java
import java.util.Comparator;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        Comparator<String> byLengthThenAlphabetically =
                Comparator.comparingInt(String::length)
                          .thenComparing(Comparator.naturalOrder());

        TreeMap<String, Integer> map = new TreeMap<>(byLengthThenAlphabetically);

        map.put("Mango", 1);
        map.put("Fig", 2);
        map.put("Apple", 3);
        map.put("Kiwi", 4);

        System.out.println(map);
    }
}
```

Output:

```text
{Fig=2, Kiwi=4, Apple=3, Mango=1}
```

The comparator decides the ordering of keys. Be careful: a `TreeMap` treats keys as equivalent for map purposes when the comparator returns `0`, even if their `equals()` methods say they are different. A comparator used for map keys should normally be consistent with `equals()`.

### 5.4 Keys must be comparable

A `TreeMap` needs a way to compare its keys. With natural ordering, the keys must implement `Comparable` and be mutually comparable.

For example, mixing unrelated key types such as `Integer` and `String` in a naturally ordered `TreeMap` will normally cause a `ClassCastException` when the map tries to compare them.

If you use custom objects as keys, provide a suitable `Comparator` or implement `Comparable` on the key class.

### 5.5 Null keys and null values

With natural ordering, `TreeMap` does not allow a `null` key because it cannot compare null to ordinary keys. It does allow null values.

```java
TreeMap<Integer, String> map = new TreeMap<>();

map.put(1, null); // Valid
// map.put(null, "Unknown"); // Throws NullPointerException
```

A custom comparator can be designed to handle null keys, for example by using `Comparator.nullsFirst(...)`, but do this only when null is genuinely meaningful in your data model.

---

## 6. Useful `TreeMap` Navigation Methods

Because `TreeMap` implements `NavigableMap`, it supports searches for keys around a given key.

Consider this map:

```java
TreeMap<Integer, String> scores = new TreeMap<>();

scores.put(10, "Low");
scores.put(20, "Medium");
scores.put(30, "High");
scores.put(40, "Very High");
```

The following methods are especially important:

| Method | Meaning |
|---|---|
| `firstKey()` | Smallest key |
| `lastKey()` | Largest key |
| `firstEntry()` | Entry with the smallest key |
| `lastEntry()` | Entry with the largest key |
| `lowerKey(k)` | Greatest key strictly less than `k` |
| `floorKey(k)` | Greatest key less than or equal to `k` |
| `ceilingKey(k)` | Smallest key greater than or equal to `k` |
| `higherKey(k)` | Smallest key strictly greater than `k` |
| `pollFirstEntry()` | Removes and returns the smallest-key entry |
| `pollLastEntry()` | Removes and returns the largest-key entry |

Example:

```java
System.out.println(scores.firstKey());
System.out.println(scores.lastKey());

System.out.println(scores.lowerKey(30));
System.out.println(scores.floorKey(30));
System.out.println(scores.ceilingKey(25));
System.out.println(scores.higherKey(30));
```

Output:

```text
10
40
20
30
30
40
```

Understand the difference between the pairs:

- `lowerKey(30)` excludes 30, so it returns 20.
- `floorKey(30)` includes 30, so it returns 30.
- `higherKey(30)` excludes 30, so it returns 40.
- `ceilingKey(25)` finds the smallest key at least 25, so it returns 30.

If there is no matching key, these navigation methods return `null`.

### 6.1 First and last entries

```java
System.out.println(scores.firstEntry());
System.out.println(scores.lastEntry());
```

Output:

```text
10=Low
40=Very High
```

`firstEntry()` and `lastEntry()` return entries without removing them. In contrast, `pollFirstEntry()` and `pollLastEntry()` remove the returned entries.

```java
System.out.println(scores.pollFirstEntry());
System.out.println(scores);
```

Output:

```text
10=Low
{20=Medium, 30=High, 40=Very High}
```

### 6.2 Example: finding the nearest available price tier

Suppose a shop stores discount tiers by minimum purchase amount:

```java
TreeMap<Integer, String> tiers = new TreeMap<>();

tiers.put(500, "5% discount");
tiers.put(1000, "10% discount");
tiers.put(2000, "15% discount");

int purchase = 1300;

System.out.println(tiers.floorEntry(purchase));
System.out.println(tiers.ceilingEntry(purchase));
```

Output:

```text
1000=10% discount
2000=15% discount
```

`floorEntry(1300)` finds the highest threshold the purchase has reached. `ceilingEntry(1300)` finds the next threshold. This pattern is useful for price brackets, score bands, and scheduling boundaries.

---

## 7. Range Views: `subMap()`, `headMap()`, and `tailMap()`

A range view lets you work with only part of a sorted map.

- `subMap(fromKey, toKey)`: keys from the starting key up to, but not including, the ending key.
- `headMap(toKey)`: keys less than the ending key.
- `tailMap(fromKey)`: keys greater than or equal to the starting key.

Example:

```java
TreeMap<Integer, String> map = new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");
map.put(40, "D");
map.put(50, "E");

System.out.println(map.subMap(20, 40));
System.out.println(map.headMap(30));
System.out.println(map.tailMap(30));
```

Output:

```text
{20=B, 30=C}
{10=A, 20=B}
{30=C, 40=D, 50=E}
```

The two-argument `subMap(fromKey, toKey)` includes the lower boundary and excludes the upper boundary. The two-argument `headMap(toKey)` excludes `toKey`, while the two-argument `tailMap(fromKey)` includes `fromKey`.

### 7.1 Control boundary inclusion

The four-argument overload lets you choose whether each boundary is included:

```java
System.out.println(map.subMap(20, true, 40, true));
System.out.println(map.subMap(20, false, 40, false));
```

Output:

```text
{20=B, 30=C, 40=D}
{30=C}
```

The arguments are:

```java
subMap(fromKey, fromInclusive, toKey, toInclusive)
```

Similar overloads exist for `headMap()` and `tailMap()`.

### 7.2 Important: range views are backed by the original map

A range returned by `subMap()`, `headMap()`, or `tailMap()` is not an independent copy. It is a **view** of the original map.

```java
TreeMap<Integer, String> map = new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");
map.put(40, "D");

Map<Integer, String> middle = map.subMap(20, 40);

System.out.println(middle);

middle.remove(20);
middle.put(25, "New");

System.out.println(map);
```

Output:

```text
{20=B, 30=C}
{10=A, 25=New, 30=C, 40=D}
```

Removing key 20 through the view removes it from the original map. Adding key 25 through the view adds it to the original map.

A range view restricts which keys can be accessed or inserted through that view. Trying to insert a key outside its permitted range generally throws `IllegalArgumentException`.

If you need an independent copy, create one explicitly:

```java
TreeMap<Integer, String> copy = new TreeMap<>(map.subMap(20, 40));
```

---

## 8. Map Views: `keySet()`, `values()`, and `entrySet()`

A map provides three useful collection views.

### 8.1 `keySet()`

Returns a set view of the map's keys.

```java
Map<Integer, String> students = new LinkedHashMap<>();

students.put(101, "Aarav");
students.put(102, "Meera");
students.put(103, "Kabir");

System.out.println(students.keySet());
```

Output:

```text
[101, 102, 103]
```

Use `keySet()` when you need to visit or work with keys.

### 8.2 `values()`

Returns a collection view of the map's values. Values can repeat because different keys can map to the same value.

```java
Map<Integer, String> students = new LinkedHashMap<>();

students.put(101, "Aarav");
students.put(102, "Meera");
students.put(103, "Aarav");

System.out.println(students.values());
```

Output:

```text
[Aarav, Meera, Aarav]
```

Unlike `keySet()`, `values()` is not a `Set`, because duplicate values are allowed.

### 8.3 `entrySet()`

Returns a set view of key-value entries. It is often the best choice when you need both the key and the value.

```java
for (Map.Entry<Integer, String> entry : students.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}
```

Possible output, following the insertion order of this `LinkedHashMap`:

```text
101 -> Aarav
102 -> Meera
103 -> Aarav
```

`Map.Entry<K, V>` represents one key-value pair. Its most commonly used methods include:

- `getKey()`: returns the key.
- `getValue()`: returns the value.
- `setValue(value)`: replaces the value for that entry when supported by the map's entry view.

### 8.4 These views are backed by the map

`keySet()`, `values()`, and `entrySet()` are views, not independent copies. Removing through a view removes the corresponding mapping from the map.

```java
Map<String, Integer> stock = new LinkedHashMap<>();

stock.put("Pen", 10);
stock.put("Book", 5);
stock.put("Pencil", 20);

stock.keySet().remove("Book");

System.out.println(stock);
```

Output:

```text
{Pen=10, Pencil=20}
```

The `"Book"` mapping has been removed from the original map.

The views also reflect changes made directly to the map. For example, if you add a new entry to the map, its key and value appear in the corresponding views.

### 8.5 Removing while iterating

Do not normally structurally modify a map directly inside an enhanced `for` loop over its views. That can trigger `ConcurrentModificationException`.

Use an iterator's `remove()` method when you want to remove entries during iteration:

```java
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();

        scores.put("Asha", 80);
        scores.put("Dev", 45);
        scores.put("Riya", 92);

        Iterator<Map.Entry<String, Integer>> iterator =
                scores.entrySet().iterator();

        while (iterator.hasNext()) {
            Map.Entry<String, Integer> entry = iterator.next();

            if (entry.getValue() < 50) {
                iterator.remove();
            }
        }

        System.out.println(scores);
    }
}
```

Output:

```text
{Asha=80, Riya=92}
```

The iteration order of a `HashMap` is not guaranteed, but the resulting mappings are the same.

For a simpler case, `removeIf()` can be useful:

```java
scores.entrySet().removeIf(entry -> entry.getValue() < 50);
```

This removes entries whose values are below 50. `removeIf()` is available through the collection views.

---

## 9. Iterating Over a Map

### 9.1 Iterate over keys

```java
for (Integer key : students.keySet()) {
    System.out.println(key);
}
```

### 9.2 Iterate over values

```java
for (String value : students.values()) {
    System.out.println(value);
}
```

### 9.3 Iterate over entries

```java
for (Map.Entry<Integer, String> entry : students.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

If you need both key and value, `entrySet()` is generally clearer and avoids looking up each value again by key.

### 9.4 Use `forEach()`

```java
students.forEach((key, value) ->
        System.out.println(key + ": " + value));
```

The lambda receives the key first and the value second.

Remember that the iteration order depends on the map implementation. `LinkedHashMap` preserves its configured order, `TreeMap` uses sorted key order, and `HashMap` makes no order guarantee.

---

## 10. Sorting Map Entries by Key or Value

A `TreeMap` sorts by key, not by value. If you want to sort entries by value, one common approach is to copy the entries into a list and sort that list.

### 10.1 Sort entries by key

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> marks = new HashMap<>();

        marks.put("Zoya", 85);
        marks.put("Amit", 92);
        marks.put("Rohan", 78);

        List<Map.Entry<String, Integer>> entries =
                new ArrayList<>(marks.entrySet());

        entries.sort(Map.Entry.comparingByKey());

        entries.forEach(System.out::println);
    }
}
```

Output:

```text
Amit=92
Rohan=78
Zoya=85
```

`Map.Entry.comparingByKey()` compares entries using their keys.

### 10.2 Sort entries by value

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> marks = new HashMap<>();

        marks.put("Zoya", 85);
        marks.put("Amit", 92);
        marks.put("Rohan", 78);

        List<Map.Entry<String, Integer>> entries =
                new ArrayList<>(marks.entrySet());

        entries.sort(Map.Entry.comparingByValue());

        entries.forEach(System.out::println);
    }
}
```

Output:

```text
Rohan=78
Zoya=85
Amit=92
```

To sort values in descending order:

```java
entries.sort(Map.Entry.<String, Integer>comparingByValue().reversed());
```

When two entries have the same value, their relative order is not necessarily alphabetical unless you add a secondary comparison:

```java
entries.sort(
    Map.Entry.<String, Integer>comparingByValue()
        .thenComparing(Map.Entry.comparingByKey())
);
```

### 10.3 Java 8+ `Map.forEach()` and entry helpers

The `Map.forEach()` method and `Map.Entry.comparingByKey()` / `comparingByValue()` are available in Java 8 and later.

Java 9 introduced convenient factory methods such as `Map.entry()` and `Map.ofEntries()`:

```java
Map<Integer, String> fixed = Map.ofEntries(
    Map.entry(101, "Aarav"),
    Map.entry(102, "Meera")
);

System.out.println(fixed);
```

The map created by `Map.ofEntries()` is unmodifiable, does not permit null keys or values, and does not promise a particular iteration order. It is useful for creating small, fixed maps—not for a map that you plan to update.

---

## 11. Useful Map Update Methods: A Quick Review

These methods are inherited from the `Map` interface and work with common implementations, though the precise performance and ordering effects depend on the implementation.

### `putIfAbsent()`

Adds a mapping only when the key is absent or currently mapped to null.

```java
Map<String, Integer> counts = new HashMap<>();

counts.put("apple", 2);
counts.putIfAbsent("apple", 10);
counts.putIfAbsent("banana", 3);

System.out.println(counts);
```

Output:

```text
{apple=2, banana=3}
```

### `computeIfAbsent()`

Computes a value only when the key is absent or mapped to null.

```java
Map<String, List<String>> groups = new HashMap<>();

groups.computeIfAbsent("fruit", key -> new ArrayList<>()).add("Apple");
groups.computeIfAbsent("fruit", key -> new ArrayList<>()).add("Mango");

System.out.println(groups);
```

Output:

```text
{fruit=[Apple, Mango]}
```

This is commonly used to group items into lists.

### `merge()`

Combines an existing non-null value with a new value using a function. If the key is absent or mapped to null, the new value is installed directly.

```java
Map<String, Integer> frequency = new HashMap<>();

frequency.merge("java", 1, Integer::sum);
frequency.merge("java", 1, Integer::sum);
frequency.merge("python", 1, Integer::sum);

System.out.println(frequency);
```

Output:

```text
{java=2, python=1}
```

`merge()` is especially useful for frequency counting.

---

## 12. Practical Program: Count Word Frequencies

This example combines `HashMap`, `merge()`, and entry iteration.

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String sentence = "java is easy and java is powerful";

        Map<String, Integer> frequency = new HashMap<>();

        for (String word : sentence.split(" ")) {
            frequency.merge(word, 1, Integer::sum);
        }

        frequency.forEach((word, count) ->
                System.out.println(word + " = " + count));
    }
}
```

The counts are:

```text
java = 2
is = 2
easy = 1
and = 1
powerful = 1
```

The displayed order may differ because `HashMap` does not guarantee iteration order. If you need alphabetical output, use a `TreeMap`:

```java
Map<String, Integer> frequency = new TreeMap<>();
```

The rest of the counting logic can stay the same.

---

## 13. Practical Program: Store Students in Sorted Roll-Number Order

```java
import java.util.Map;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        TreeMap<Integer, String> students = new TreeMap<>();

        students.put(24, "Riya");
        students.put(7, "Aarav");
        students.put(15, "Kabir");
        students.put(3, "Meera");

        for (Map.Entry<Integer, String> entry : students.entrySet()) {
            System.out.println("Roll No: " + entry.getKey()
                    + ", Name: " + entry.getValue());
        }
    }
}
```

Output:

```text
Roll No: 3, Name: Meera
Roll No: 7, Name: Aarav
Roll No: 15, Name: Kabir
Roll No: 24, Name: Riya
```

This is a natural use for `TreeMap`: the data remains sorted by roll number automatically.

---

## 14. Common Mistakes

**Mistake 1: Assuming `HashMap` is sorted.**  
It is not. Do not depend on the order in which a `HashMap` prints or iterates.

**Mistake 2: Thinking `LinkedHashMap` always sorts keys.**  
It does not. Its default order is insertion order. Access-order mode instead tracks recent accesses.

**Mistake 3: Thinking `TreeMap` sorts values.**  
It sorts keys. To sort by values, sort the entries in a list or use a separate data structure designed for that purpose.

**Mistake 4: Assuming `subMap()` returns a copy.**  
It returns a backed view. Changes through the view affect the original map.

**Mistake 5: Removing from a map directly inside a for-each loop.**  
Use an iterator's `remove()` or a suitable view operation such as `removeIf()`.

**Mistake 6: Using incomparable key types in a `TreeMap`.**  
A `TreeMap` must be able to compare keys. Provide a consistent `Comparator` if natural ordering is unsuitable.

**Mistake 7: Expecting duplicate keys.**  
No map implementation allows two separate mappings for the same key. A later `put()` replaces the earlier value.

**Mistake 8: Confusing `lowerKey()` with `floorKey()`.**  
`lowerKey(k)` is strictly less than `k`; `floorKey(k)` is less than or equal to `k`. Similarly, `higherKey()` is strict while `ceilingKey()` includes equality.

---

## 15. Interview Questions and Answers

### Q1. What is the main difference between `HashMap` and `LinkedHashMap`?

`HashMap` does not guarantee iteration order. `LinkedHashMap` preserves insertion order by default and can be configured to maintain access order.

### Q2. What is the main difference between `LinkedHashMap` and `TreeMap`?

`LinkedHashMap` maintains a linked iteration order, usually insertion order. `TreeMap` maintains keys in sorted order using natural ordering or a comparator.

### Q3. What is the time complexity of `TreeMap` operations?

Common lookup, insertion, and removal operations take O(log n) time because `TreeMap` is backed by a balanced tree.

### Q4. Why would you use access-order `LinkedHashMap`?

It moves recently accessed entries toward the most-recently-used end. This behavior is useful when implementing an LRU-style cache.

### Q5. What does `removeEldestEntry()` do?

It allows a `LinkedHashMap` subclass to request removal of the eldest entry after a new mapping is inserted. Returning `true` removes that entry.

### Q6. What is the difference between `lowerKey()` and `floorKey()`?

`lowerKey(k)` returns the greatest key strictly below `k`. `floorKey(k)` returns the greatest key below or equal to `k`.

### Q7. What is the difference between `higherKey()` and `ceilingKey()`?

`higherKey(k)` returns the smallest key strictly greater than `k`. `ceilingKey(k)` returns the smallest key greater than or equal to `k`.

### Q8. What does `subMap(10, 30)` include?

It includes keys greater than or equal to 10 and strictly less than 30. This is the default two-argument range behavior.

### Q9. Are `keySet()`, `values()`, and `entrySet()` copies?

No. They are backed views of the map. Changes made through supported removal operations on a view affect the original map.

### Q10. Why is `entrySet()` useful?

It provides both the key and value for each mapping, so you can process a mapping without looking up the value again.

### Q11. Can `TreeMap` contain a null key?

Not with its usual natural ordering. A custom comparator can support null keys if it explicitly defines how null compares with other keys.

### Q12. Does `TreeMap` allow null values?

Yes. It can store null values, although applications should be careful because a `get()` result of null can mean either that a key is absent or that it maps to null. Use `containsKey()` when the distinction matters.

### Q13. How do you sort a map by value?

Copy its entries into a list and sort the list using `Map.Entry.comparingByValue()`. A `TreeMap` itself sorts by key, not by value.

### Q14. What happens if a comparator returns zero for two different keys?

The `TreeMap` treats them as the same ordering position and does not keep both as separate keys. A new mapping can replace the mapping associated with the existing comparator-equivalent key.

### Q15. What is the difference between `firstEntry()` and `pollFirstEntry()`?

`firstEntry()` returns the first entry without removing it. `pollFirstEntry()` returns and removes the first entry.

---

## 16. Output-Based Practice Questions

Try to answer each question before checking the solution.

### Question 1

```java
Map<Integer, String> map = new LinkedHashMap<>();

map.put(2, "B");
map.put(1, "A");
map.put(2, "Updated");

System.out.println(map);
```

**Answer:**

```text
{2=Updated, 1=A}
```

Reason: updating key 2 replaces its value but does not change its original insertion position.

### Question 2

```java
TreeMap<Integer, String> map = new TreeMap<>();

map.put(10, "A");
map.put(30, "C");
map.put(20, "B");

System.out.println(map.lowerKey(20));
System.out.println(map.floorKey(20));
```

**Answer:**

```text
10
20
```

Reason: `lowerKey()` excludes equality; `floorKey()` includes it.

### Question 3

```java
TreeMap<Integer, String> map = new TreeMap<>();

map.put(1, "A");
map.put(2, "B");
map.put(3, "C");

System.out.println(map.subMap(1, 3));
```

**Answer:**

```text
{1=A, 2=B}
```

Reason: the lower bound is inclusive and the upper bound is exclusive.

### Question 4

```java
Map<String, Integer> map = new LinkedHashMap<>();

map.put("A", 1);
map.put("B", 2);

map.keySet().remove("A");

System.out.println(map);
```

**Answer:**

```text
{B=2}
```

Reason: `keySet()` is a backed view, so removing a key through it removes the corresponding map entry.

### Question 5

```java
TreeMap<Integer, String> map = new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");

System.out.println(map.ceilingKey(21));
System.out.println(map.higherKey(20));
```

**Answer:**

```text
30
30
```

Reason: both queries find the smallest key strictly above 20 or at least 21, respectively.

---

## 17. Practice Exercises

### Beginner

1. Create a `LinkedHashMap` of five product IDs and names. Print the entries in insertion order.
2. Update one value and verify that the key stays in its original insertion position.
3. Create a `TreeMap` of student roll numbers and names. Insert entries in random order and print them sorted.
4. Use `firstKey()` and `lastKey()` to print the smallest and largest roll numbers.
5. Print only the keys using `keySet()` and only the values using `values()`.

### Intermediate

6. Use `lowerKey()`, `floorKey()`, `ceilingKey()`, and `higherKey()` to examine values around a given score.
7. Create a range view with `subMap()` and remove an entry through the view. Confirm that the original map changes.
8. Sort a map's entries by value in ascending order.
9. Sort entries by value descending, breaking ties alphabetically by key.
10. Remove every entry with a value below 50 using `entrySet().removeIf()`.

### Advanced

11. Implement an LRU cache with a capacity of three using access-order `LinkedHashMap`.
12. Create a `TreeMap` with a custom comparator that sorts strings by length and then alphabetically.
13. Build a word-frequency map using `merge()`, and print words alphabetically.
14. Create a `TreeMap` of purchase thresholds and use `floorEntry()` to find the discount earned for a given purchase.
15. Explain why a comparator that returns zero for unequal objects can cause a `TreeMap` to treat them as one key.

---

## 18. Revision Checklist

Before moving to the next chapter, make sure you can explain these points without looking at the notes:

- `LinkedHashMap` preserves insertion order by default.
- Access-order mode moves recently accessed entries to the most-recently-used end.
- `removeEldestEntry()` can support a simple bounded cache.
- `TreeMap` sorts keys and commonly performs basic operations in O(log n).
- `lower`, `floor`, `ceiling`, and `higher` have different equality rules.
- `subMap()`, `headMap()`, and `tailMap()` produce backed range views.
- `keySet()`, `values()`, and `entrySet()` are backed views.
- Use an iterator's `remove()` or `removeIf()` for safe removal while traversing.
- Sort entries by value with a list and `Map.Entry.comparingByValue()`.
- Choose a map implementation based on the ordering and operations your program needs.

## 19. What Comes Next?

**Chapter 36: Advanced Map Methods and ConcurrentHashMap** will explore more map operations, how to update values safely, and how `ConcurrentHashMap` differs from ordinary maps when multiple threads access shared data.
