# Chapter 36: Advanced Map Methods and ConcurrentHashMap

## 1. What You Will Learn

In the previous chapters, you learned how to use `HashMap`, `LinkedHashMap`, and `TreeMap`. This chapter explores more advanced `Map` methods and introduces `ConcurrentHashMap`, a map designed for use by multiple threads.

By the end, you should understand:

- `putIfAbsent()`, `computeIfAbsent()`, `computeIfPresent()`, `compute()`, `merge()`, `replace()`, and `replaceAll()`.
- How `null` values affect map operations.
- How to count frequencies and group data efficiently.
- Why ordinary maps are not automatically thread-safe.
- How `ConcurrentHashMap` supports concurrent access.
- Which operations are atomic and which patterns can still be incorrect.
- When to use `HashMap`, `Collections.synchronizedMap()`, or `ConcurrentHashMap`.

---

## 2. Why Do Maps Have Advanced Methods?

A common programming task is to update a value only under certain conditions.

For example, suppose a map stores the number of times each word appears:

```java
Map<String, Integer> frequency = new HashMap<>();
```

You could write:

```java
String word = "java";

if (frequency.containsKey(word)) {
    frequency.put(word, frequency.get(word) + 1);
} else {
    frequency.put(word, 1);
}
```

This works in a single-threaded program when no other code changes the map during the operation. But it is repetitive, and in a multithreaded program the separate steps may interfere with one another.

The `Map` interface provides methods such as `merge()` and `computeIfAbsent()` to express common update patterns more clearly. Some of these methods also define useful atomic behavior when implemented by concurrent maps.

**Important distinction:** A method being available on `Map` does not automatically make every implementation thread-safe. `HashMap` is not thread-safe just because it has `compute()` or `merge()`.

---

## 3. `putIfAbsent()`

`putIfAbsent(key, value)` adds the mapping only if the key is absent or currently mapped to `null`.

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();

        scores.put("Asha", 80);
        scores.putIfAbsent("Asha", 95);
        scores.putIfAbsent("Dev", 75);

        System.out.println(scores);
    }
}
```

Output:

```text
{Asha=80, Dev=75}
```

The value for `"Asha"` remains 80 because the key already has a non-null value. `"Dev"` is added because the key was absent.

### What if the key is mapped to `null`?

```java
Map<String, Integer> map = new HashMap<>();

map.put("A", null);
map.putIfAbsent("A", 10);

System.out.println(map);
```

Output:

```text
{A=10}
```

For maps that permit null values, a mapping to null is treated as eligible for `putIfAbsent()` to install the supplied value.

Use `putIfAbsent()` when you want to establish a default value without replacing a present, non-null value.

---

## 4. `computeIfAbsent()`

`computeIfAbsent(key, function)` computes a value only if the key is absent or mapped to `null`. The function receives the key and returns the value to install.

Syntax:

```java
map.computeIfAbsent(key, k -> computedValue);
```

Example:

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> lengths = new HashMap<>();

        lengths.computeIfAbsent("Java", key -> key.length());
        lengths.computeIfAbsent("Python", key -> key.length());

        System.out.println(lengths);
    }
}
```

Output:

```text
{Java=4, Python=6}
```

The function is not called when a non-null value is already present for the key.

### Practical example: grouping values

Suppose we want to group names by their first letter.

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names =
                Arrays.asList("Aarav", "Asha", "Dev", "Diya", "Meera");

        Map<Character, List<String>> groups = new TreeMap<>();

        for (String name : names) {
            char first = name.charAt(0);

            groups.computeIfAbsent(first, key -> new ArrayList<>())
                  .add(name);
        }

        System.out.println(groups);
    }
}
```

Output:

```text
{A=[Aarav, Asha], D=[Dev, Diya], M=[Meera]}
```

How it works:

1. The program reads a name such as `"Aarav"`.
2. It gets the first character, `A`.
3. If key `A` has no list, `computeIfAbsent()` creates an empty `ArrayList`.
4. The name is added to that list.
5. The process repeats for every name.

This pattern is common when grouping students by department, products by category, or words by first letter.

**Caution:** If the mapping function returns `null`, no mapping is recorded. Keep mapping functions short and avoid modifying the same map recursively from inside the function.

---

## 5. `computeIfPresent()`

`computeIfPresent(key, function)` runs the function only when the key is present and its current value is non-null.

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();

        scores.put("Asha", 80);
        scores.put("Dev", 70);

        scores.computeIfPresent("Asha", (key, value) -> value + 5);
        scores.computeIfPresent("Riya", (key, value) -> value + 5);

        System.out.println(scores);
    }
}
```

Output:

```text
{Asha=85, Dev=70}
```

`"Asha"` exists with a non-null value, so the function runs and increases the score. `"Riya"` is absent, so nothing happens.

If the function returns `null`, the existing mapping is removed.

Example:

```java
scores.computeIfPresent("Dev", (key, value) -> null);
System.out.println(scores);
```

Output:

```text
{Asha=85}
```

---

## 6. `compute()`

`compute(key, function)` runs the function whether the key is present or absent. The function receives the key and the current value, which may be `null`.

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();

        scores.put("Asha", 80);

        scores.compute("Asha", (key, value) -> value == null ? 1 : value + 10);
        scores.compute("Dev", (key, value) -> value == null ? 1 : value + 10);

        System.out.println(scores);
    }
}
```

Output:

```text
{Asha=90, Dev=1}
```

For `"Asha"`, the old value is 80, so the new value becomes 90. For `"Dev"`, the old value is null because the key is absent, so the new value becomes 1.

If the remapping function returns `null`, the mapping is removed (or remains absent if it was not present).

### Comparing the compute methods

| Method | When does the function run? | If function returns `null` |
|---|---|---|
| `computeIfAbsent()` | Key absent or mapped to null | No mapping is installed |
| `computeIfPresent()` | Key present with non-null value | Existing mapping is removed |
| `compute()` | Always, for the specified key | Mapping is removed or remains absent |

Remember that a map may allow null values, so “key absent” and “key present with null value” are distinct states. These methods define how they handle both states.

---

## 7. `merge()`

`merge(key, value, function)` is especially useful when a new value should be combined with an existing non-null value.

The supplied `value` must be non-null. If the key is absent or currently maps to null, the supplied value is installed directly. Otherwise, the function combines the existing value with the supplied value.

Syntax:

```java
map.merge(key, newValue, (oldValue, newValue) -> combinedValue);
```

### Example 1: count how often a word appears

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> frequency = new HashMap<>();

        frequency.merge("java", 1, Integer::sum);
        frequency.merge("java", 1, Integer::sum);
        frequency.merge("python", 1, Integer::sum);

        System.out.println(frequency);
    }
}
```

Output:

```text
{java=2, python=1}
```

`Integer::sum` is a method reference equivalent to a function that adds the old and new integer values.

### Example 2: add points to a player's score

```java
Map<String, Integer> points = new HashMap<>();

points.merge("Aarav", 10, Integer::sum);
points.merge("Aarav", 5, Integer::sum);
points.merge("Meera", 7, Integer::sum);

System.out.println(points);
```

Output:

```text
{Aarav=15, Meera=7}
```

### Returning null from the merge function

If the merge function returns `null`, the existing mapping is removed.

```java
Map<String, Integer> stock = new HashMap<>();

stock.put("Pen", 10);
stock.merge("Pen", 10, (oldValue, addedValue) -> null);

System.out.println(stock);
```

Output:

```text
{}
```

This behavior can be useful in specialized update logic, but it may surprise beginners. Do not return null accidentally from a merge function.

---

## 8. `replace()` and `replaceAll()`

### 8.1 `replace(key, value)`

Replaces a value only if the key is already present.

```java
Map<String, Integer> scores = new HashMap<>();

scores.put("Asha", 80);
scores.replace("Asha", 90);
scores.replace("Dev", 70);

System.out.println(scores);
```

Output:

```text
{Asha=90}
```

The call for `"Dev"` has no effect because that key is absent.

### 8.2 Conditional `replace()`

You can replace a value only if the old value matches an expected value:

```java
boolean changed = scores.replace("Asha", 90, 95);

System.out.println(changed);
System.out.println(scores);
```

Output:

```text
true
{Asha=95}
```

The three-argument form is useful when you want to update a mapping only if it still has the value you expect.

### 8.3 `replaceAll()`

`replaceAll()` applies a function to every mapping's value.

```java
Map<String, Integer> scores = new HashMap<>();

scores.put("Asha", 80);
scores.put("Dev", 70);
scores.put("Meera", 90);

scores.replaceAll((name, score) -> score + 5);

System.out.println(scores);
```

Output:

```text
{Asha=85, Dev=75, Meera=95}
```

The iteration order of this `HashMap` is not guaranteed, but the updated values are.

Use `replaceAll()` when every current value needs a transformation, such as adding a bonus, converting values, or normalizing data.

---

## 9. Quick Reference: Which Method Should You Use?

| Goal | Useful method |
|---|---|
| Add a value only when there is no non-null value | `putIfAbsent()` |
| Create a value only when absent or null | `computeIfAbsent()` |
| Update only an existing non-null value | `computeIfPresent()` |
| Calculate a new value whether or not the key exists | `compute()` |
| Combine an old value with a new value | `merge()` |
| Replace a value for an existing key | `replace()` |
| Replace only if the old value matches | `replace(key, oldValue, newValue)` |
| Transform every value | `replaceAll()` |
| Remove mappings matching a condition | `entrySet().removeIf(...)` |

Do not memorize these methods only by name. Think about the condition that should trigger the update and what should happen if the calculation returns null.

---

## 10. A Key Concept: Null Values and `containsKey()`

For a map that permits null values, `get(key)` returns null in two different situations:

1. The key is absent.
2. The key exists but is mapped to null.

Example:

```java
Map<String, Integer> map = new HashMap<>();

map.put("A", null);

System.out.println(map.get("A"));
System.out.println(map.get("B"));
System.out.println(map.containsKey("A"));
System.out.println(map.containsKey("B"));
```

Output:

```text
null
null
true
false
```

If you need to distinguish these cases, use `containsKey()`.

`ConcurrentHashMap` does not allow null keys or null values. This design removes the ambiguity that a null return from `get()` could otherwise represent.

---

## 11. What Is Thread Safety?

A **thread** is an independent path of execution within a program. Multiple threads may run at overlapping times and may access the same object.

Imagine two threads both increment a shared counter stored in a map:

```java
map.put("count", map.get("count") + 1);
```

This expression involves multiple steps:

1. Read the current value.
2. Add one.
3. Write the result.

If two threads read the same old value before either writes, both may write the same result. One increment is effectively lost. This is a race condition.

For example, suppose the value begins at 10:

- Thread A reads 10.
- Thread B reads 10.
- Thread A calculates 11 and writes 11.
- Thread B calculates 11 and writes 11.

The final value is 11, although two increments were attempted. The desired value was 12.

This is why shared mutable data needs a suitable concurrency strategy.

---

## 12. Is `HashMap` Thread-Safe?

No. `HashMap` is not designed for concurrent modification by multiple threads without external coordination.

If multiple threads access the same `HashMap` and at least one modifies it, the program must provide suitable synchronization. Otherwise, you may get lost updates, inconsistent observations, or other incorrect behavior.

A `ConcurrentModificationException` is not a thread-safety mechanism. It is a best-effort fail-fast check that may detect certain unexpected modifications during iteration; it does not guarantee detection and does not make a map safe for concurrent use.

For ordinary local data used by one thread, `HashMap` is usually a good choice. For shared data, consider `ConcurrentHashMap` or synchronization appropriate to the task.

---

## 13. What Is `ConcurrentHashMap`?

`ConcurrentHashMap` is a map implementation designed to support concurrent access from multiple threads.

```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class Main {
    public static void main(String[] args) {
        ConcurrentMap<String, Integer> scores =
                new ConcurrentHashMap<>();

        scores.put("Asha", 80);
        scores.put("Dev", 75);

        System.out.println(scores.get("Asha"));
    }
}
```

Output:

```text
80
```

`ConcurrentHashMap` implements `ConcurrentMap`, which extends `Map`. It provides thread-safe operations for individual mappings and supports useful atomic methods such as `putIfAbsent()`, conditional `replace()`, `compute()`, and `merge()`.

### Important characteristics

- It supports concurrent retrievals and updates.
- It does not allow null keys or null values.
- Its iteration order is not guaranteed.
- Its iterators are weakly consistent: they can proceed while updates happen and do not normally throw `ConcurrentModificationException` just because another thread updates the map.
- A traversal may reflect some updates that happen during traversal, but it is not a frozen snapshot of the map at one instant.

Thread-safe individual operations do not automatically make a sequence of several operations atomic. Use the map's atomic methods when a compound update must be treated as one operation.

---

## 14. Example: Atomic Counter with `ConcurrentHashMap`

This example counts how often each word occurs. Multiple threads could update the same word, so using `merge()` on a `ConcurrentHashMap` is a suitable approach.

```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class Main {
    public static void main(String[] args) {
        ConcurrentMap<String, Integer> frequency =
                new ConcurrentHashMap<>();

        frequency.merge("java", 1, Integer::sum);
        frequency.merge("java", 1, Integer::sum);
        frequency.merge("python", 1, Integer::sum);

        System.out.println(frequency);
    }
}
```

Output:

```text
{java=2, python=1}
```

The order may vary. The important point is that each `merge()` update for a given key is atomic in `ConcurrentHashMap`.

For a very high-volume counter, `ConcurrentHashMap<String, LongAdder>` is another common pattern. `LongAdder` is designed for efficient accumulation under contention. A basic example appears later in this chapter.

---

## 15. Why `map.get()` Followed by `map.put()` Is Not Enough

Consider this code:

```java
ConcurrentMap<String, Integer> counts = new ConcurrentHashMap<>();

counts.put("java", 1);

Integer current = counts.get("java");
counts.put("java", current + 1);
```

Each individual `get()` and `put()` is thread-safe, but the pair is not one atomic increment. Two threads can still read the same value and overwrite one another's update.

Prefer:

```java
counts.merge("java", 1, Integer::sum);
```

Or, if a default is needed:

```java
counts.compute("java",
        (key, oldValue) -> oldValue == null ? 1 : oldValue + 1);
```

These methods perform the per-key calculation as an atomic map operation in `ConcurrentHashMap`.

---

## 16. Practical Example: Concurrent Word Counter with `LongAdder`

`LongAdder` is useful when many threads repeatedly add to counters. It can reduce contention compared with using a single `AtomicLong` in some high-contention workloads.

```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.LongAdder;

public class Main {
    public static void main(String[] args) {
        ConcurrentMap<String, LongAdder> counts =
                new ConcurrentHashMap<>();

        String[] words = {
            "java", "python", "java", "c++", "java", "python"
        };

        for (String word : words) {
            counts.computeIfAbsent(word, key -> new LongAdder())
                  .increment();
        }

        counts.forEach((word, count) ->
                System.out.println(word + " = " + count.sum()));
    }
}
```

Output, with order not guaranteed:

```text
java = 3
python = 2
c++ = 1
```

How it works:

1. `computeIfAbsent()` creates a `LongAdder` the first time a word appears.
2. `increment()` adds one to that word's counter.
3. `sum()` reads the accumulated count.

This pattern is useful for statistics and telemetry. It is not the same as a globally atomic snapshot of all counters while updates are still happening.

---

## 17. `Collections.synchronizedMap()` vs `ConcurrentHashMap`

Java provides more than one way to protect a map.

```java
Map<String, Integer> synchronizedMap =
        Collections.synchronizedMap(new HashMap<>());
```

This creates a synchronized wrapper around a `HashMap`. Map method calls are synchronized on the wrapper.

`ConcurrentHashMap` is designed for concurrent access and typically permits better concurrency when multiple threads operate on different keys.

| Feature | `Collections.synchronizedMap()` | `ConcurrentHashMap` |
|---|---|---|
| Basic operations | Synchronized through a shared wrapper lock | Designed for concurrent operations |
| Null keys/values | Depends on wrapped map; `HashMap` permits them | Does not permit them |
| Iteration | Must manually synchronize on the map while iterating | Weakly consistent iterators; no external lock required just for traversal |
| Atomic compound methods | A multi-call sequence still needs synchronization around the whole sequence | Use atomic methods such as `compute()` and `merge()` for per-key updates |
| Typical use | Simple synchronized access, especially when broad locking is acceptable | Shared maps with concurrent reads and updates |

### Correct iteration over a synchronized map

```java
Map<String, Integer> map =
        Collections.synchronizedMap(new HashMap<>());

map.put("A", 1);
map.put("B", 2);

synchronized (map) {
    for (Map.Entry<String, Integer> entry : map.entrySet()) {
        System.out.println(entry.getKey() + " = " + entry.getValue());
    }
}
```

The synchronized block is important. Synchronizing individual map methods does not automatically make an entire iteration safe against concurrent changes.

Do not assume `Collections.synchronizedMap()` makes an arbitrary multi-step algorithm atomic. You must synchronize around the complete sequence when that sequence needs to be indivisible.

---

## 18. Concurrent Map Iteration

A `ConcurrentHashMap` iterator is **weakly consistent**. It can traverse entries while other threads update the map. It does not guarantee a snapshot of all entries at one exact moment.

```java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

map.put("A", 1);
map.put("B", 2);

for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}
```

The loop is safe to use concurrently in the sense that its iterator is designed for concurrent updates. However, if another thread adds or removes entries during traversal, the loop is not guaranteed to show a single consistent snapshot of the entire map.

For a report requiring a stable snapshot, coordinate access or copy the data under an appropriate synchronization or application-level consistency strategy.

---

## 19. Common Mistakes

**Mistake 1: Thinking `computeIfAbsent()` always runs.**  
It runs only if the key is absent or mapped to null.

**Mistake 2: Confusing `compute()` and `computeIfPresent()`.**  
`compute()` runs for an absent key too. `computeIfPresent()` requires an existing non-null value.

**Mistake 3: Returning null accidentally from a remapping function.**  
For `compute()` and `computeIfPresent()`, a null result removes the mapping. For `merge()`, a null result from the merge function removes the existing mapping.

**Mistake 4: Assuming `HashMap` is thread-safe.**  
It is not. Use an appropriate concurrency strategy for shared maps.

**Mistake 5: Assuming thread-safe `get()` and `put()` make an increment atomic.**  
They do not. Use `merge()`, `compute()`, or a dedicated counter strategy.

**Mistake 6: Trying to put null into `ConcurrentHashMap`.**  
It throws `NullPointerException` for null keys and null values.

**Mistake 7: Assuming a concurrent iterator is a snapshot.**  
`ConcurrentHashMap` iterators are weakly consistent, not snapshot iterators.

**Mistake 8: Assuming `ConcurrentModificationException` proves a collection is thread-safe.**  
It does not. Fail-fast behavior is best-effort detection, not synchronization.

---

## 20. Interview Questions and Answers

### Q1. What is the difference between `computeIfAbsent()` and `putIfAbsent()`?

`putIfAbsent()` installs a supplied value if no non-null value is present. `computeIfAbsent()` calculates the value by calling a function only when needed.

### Q2. What is the difference between `compute()` and `merge()`?

`compute()` receives the key and the current value, which may be null, and calculates the replacement. `merge()` receives a non-null supplied value and combines it with an existing non-null value; if no non-null old value exists, the supplied value is installed directly.

### Q3. What happens when a `compute()` function returns null?

The mapping is removed if it exists. If the key was absent, it remains absent.

### Q4. Why is `merge()` useful for frequency counting?

It installs 1 for a word's first occurrence and adds 1 to the existing count on later occurrences, all through one concise update operation.

### Q5. Is `HashMap` thread-safe?

No. Concurrent modification without suitable synchronization can produce incorrect behavior.

### Q6. What is `ConcurrentHashMap`?

It is a map designed for concurrent use by multiple threads. It supports thread-safe operations and atomic per-key update methods.

### Q7. Why does `ConcurrentHashMap` reject null keys and values?

A null result from retrieval can then unambiguously indicate that no mapping was found. This also avoids ambiguity in concurrent update methods.

### Q8. Are all sequences of `ConcurrentHashMap` operations atomic?

No. Individual operations and supported compound methods such as `compute()` and `merge()` have defined atomic behavior, but a sequence such as `get()` followed by `put()` is not automatically atomic.

### Q9. What does weakly consistent iteration mean?

An iterator can proceed while concurrent updates happen. It may reflect some updates, but it is not a guaranteed snapshot of the map at one instant.

### Q10. What is the difference between `ConcurrentHashMap` and `Collections.synchronizedMap()`?

A synchronized map wrapper synchronizes operations through a shared lock, and iteration requires external synchronization. `ConcurrentHashMap` is designed to allow more concurrency and provides weakly consistent iteration.

### Q11. When would you use `LongAdder` with `ConcurrentHashMap`?

For frequently updated counters under contention, such as word counts or telemetry. It supports efficient accumulation; `sum()` provides the current accumulated value but is not a global atomic snapshot during concurrent updates.

### Q12. Does `computeIfAbsent()` make `HashMap` thread-safe?

No. The behavior of a method on a non-thread-safe implementation does not make that entire map safe for concurrent access.

---

## 21. Output-Based Practice Questions

Try each question before checking the answer.

### Question 1

```java
Map<String, Integer> map = new HashMap<>();

map.put("A", 10);
map.putIfAbsent("A", 20);
map.putIfAbsent("B", 30);

System.out.println(map);
```

**Answer:**

```text
{A=10, B=30}
```

The existing non-null value for A is not replaced.

### Question 2

```java
Map<String, Integer> map = new HashMap<>();

map.put("A", 10);
map.computeIfPresent("A", (key, value) -> value * 2);
map.computeIfPresent("B", (key, value) -> 100);

System.out.println(map);
```

**Answer:**

```text
{A=20}
```

Only A has an existing non-null value.

### Question 3

```java
Map<String, Integer> map = new HashMap<>();

map.compute("A", (key, value) -> value == null ? 1 : value + 1);
map.compute("A", (key, value) -> value == null ? 1 : value + 1);

System.out.println(map);
```

**Answer:**

```text
{A=2}
```

The first call creates A with 1; the second changes it to 2.

### Question 4

```java
Map<String, Integer> map = new HashMap<>();

map.merge("A", 2, Integer::sum);
map.merge("A", 3, Integer::sum);

System.out.println(map);
```

**Answer:**

```text
{A=5}
```

The first merge installs 2; the second adds 3 to the old value.

### Question 5

```java
Map<String, Integer> map = new HashMap<>();

map.put("A", 10);
map.compute("A", (key, value) -> null);

System.out.println(map.containsKey("A"));
```

**Answer:**

```text
false
```

Returning null from `compute()` removes the mapping.

---

## 22. Practice Exercises

### Beginner

1. Create a map of names and scores. Use `replace()` to change one score.
2. Use `replaceAll()` to add 5 marks to every score.
3. Use `putIfAbsent()` to add a default value without overwriting an existing non-null value.
4. Use `computeIfAbsent()` to create a list for each category and add items to the list.
5. Use `merge()` to count how many times each word appears in a sentence.

### Intermediate

6. Use `computeIfPresent()` to add a bonus only to students who already have scores.
7. Use `compute()` to create a counter when a key is absent and increment it when present.
8. Write a program that removes a mapping when its computed value becomes null.
9. Explain the difference between a key being absent and a key mapped to null in a `HashMap`.
10. Rewrite a `get()` plus `put()` counter update using `merge()`.

### Advanced

11. Build a `ConcurrentHashMap` counter updated by multiple threads using `merge()`.
12. Build a word counter using `ConcurrentHashMap<String, LongAdder>`.
13. Explain why multiple calls to `get()` and `put()` can lose updates even when the map is a `ConcurrentHashMap`.
14. Demonstrate correct iteration over a `Collections.synchronizedMap()`.
15. Explain when weakly consistent iteration is sufficient and when your application needs a stable snapshot.

---

## 23. Revision Checklist

Before moving on, make sure you can explain these ideas:

- `putIfAbsent()` installs a value when no non-null value is present.
- `computeIfAbsent()` calculates a missing value.
- `computeIfPresent()` updates only an existing non-null value.
- `compute()` calculates a mapping whether or not the key exists.
- `merge()` combines an old value with a supplied non-null value.
- `replaceAll()` transforms all current values.
- A null result from the relevant remapping function can remove a mapping.
- `HashMap` is not thread-safe.
- `ConcurrentHashMap` does not permit null keys or values.
- Thread-safe individual operations do not make every multi-step sequence atomic.
- Use `merge()`, `compute()`, or a suitable counter object for concurrent updates.
- `ConcurrentHashMap` iterators are weakly consistent, not snapshot iterators.
- Iteration over a synchronized map requires external synchronization.

## 24. What Comes Next?

**Chapter 37: Priority Queues and Heaps in Java** will go deeper into priority-based processing, comparators, and common problems solved with `PriorityQueue`.
