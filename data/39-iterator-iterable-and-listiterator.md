# Chapter 39: Iterator, Iterable, and ListIterator in Java

## 1. What You Will Learn

Java collections need a consistent way to visit their elements. The `Iterable`, `Iterator`, and `ListIterator` interfaces provide that capability.

In this chapter, you will learn:

- What `Iterable` and `Iterator` mean.
- How enhanced `for` loops work conceptually.
- How to use `hasNext()` and `next()`.
- How to remove elements safely while iterating.
- Why modifying a collection directly during iteration can cause `ConcurrentModificationException`.
- How `ListIterator` moves forward and backward through a list.
- How to add, replace, and remove elements through a `ListIterator`.
- How iterators behave in different collections, including concurrent collections.

---

## 2. Why Do We Need Iterators?

Suppose a list contains these names:

```java
List<String> names = new ArrayList<>();

names.add("Aarav");
names.add("Meera");
names.add("Kabir");
```

You may want to print every element. One way is to use indexes:

```java
for (int i = 0; i < names.size(); i++) {
    System.out.println(names.get(i));
}
```

This works for a `List`, because a list supports indexed access. But not every collection has indexes. A `HashSet`, for example, does not provide `get(0)`, `get(1)`, and so on.

Java therefore provides a common traversal mechanism that can work across many collection types: the iterator.

```java
Iterator<String> iterator = names.iterator();

while (iterator.hasNext()) {
    String name = iterator.next();
    System.out.println(name);
}
```

Output:

```text
Aarav
Meera
Kabir
```

The iterator provides a way to visit elements without requiring the caller to know the collection's internal structure.

---

## 3. What Is `Iterable`?

`Iterable<T>` is an interface that represents an object whose elements can be traversed. It declares the `iterator()` method, which returns an `Iterator<T>`.

Many collection types implement `Iterable`, including lists, sets, and queues.

```java
Iterable<String> words = List.of("Java", "Python", "C++");

for (String word : words) {
    System.out.println(word);
}
```

Output:

```text
Java
Python
C++
```

The enhanced `for` loop, also called the *for-each loop*, can traverse an `Iterable`.

### `Iterable` vs `Iterator`

- `Iterable` represents something that can provide an iterator.
- `Iterator` represents the object that moves through the elements.

A simple way to remember it:

```text
Collection / Iterable
        |
        | iterator()
        v
     Iterator
        |
        | hasNext(), next()
        v
     Elements
```

A collection can usually create a fresh iterator each time you call `iterator()`. Each iterator maintains its own traversal position.

---

## 4. What Is `Iterator`?

`Iterator<E>` is an interface used to traverse elements one at a time.

The most important methods are:

| Method | Purpose |
|---|---|
| `hasNext()` | Returns `true` if another element is available |
| `next()` | Returns the next element and advances the iterator |
| `remove()` | Removes the last element returned by `next()`, when supported |
| `forEachRemaining(action)` | Performs an action for each remaining element |

Example:

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("C++");

        Iterator<String> iterator = languages.iterator();

        while (iterator.hasNext()) {
            String language = iterator.next();
            System.out.println(language);
        }
    }
}
```

Output:

```text
Java
Python
C++
```

### Why call `hasNext()` before `next()`?

`hasNext()` checks whether another element is available. Calling `next()` when no elements remain normally throws `NoSuchElementException`.

```java
Iterator<String> iterator = List.of("Java").iterator();

System.out.println(iterator.next());
// System.out.println(iterator.next()); // NoSuchElementException
```

Use the standard pattern:

```java
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}
```

---

## 5. How Does a For-Each Loop Relate to an Iterator?

For many `Iterable` objects, the enhanced `for` loop is a convenient way to traverse elements. Conceptually, Java obtains an iterator and repeatedly calls `hasNext()` and `next()`.

```java
for (String language : languages) {
    System.out.println(language);
}
```

Conceptually similar traversal:

```java
Iterator<String> iterator = languages.iterator();

while (iterator.hasNext()) {
    String language = iterator.next();
    System.out.println(language);
}
```

The compiler handles the loop mechanics for you.

However, an enhanced `for` loop does not expose the iterator variable directly. If you need to remove the current element through the iterator, use an explicit iterator or another appropriate collection operation.

Note that enhanced `for` also works with arrays, but array traversal does not use `Iterable` in the same way.

---

## 6. Using an Iterator with Different Collections

### 6.1 List

```java
List<Integer> numbers = new ArrayList<>(List.of(10, 20, 30));

Iterator<Integer> iterator = numbers.iterator();

while (iterator.hasNext()) {
    System.out.println(iterator.next());
}
```

Output:

```text
10
20
30
```

A list generally preserves its element order.

### 6.2 Set

```java
Set<String> languages = new LinkedHashSet<>();

languages.add("Java");
languages.add("Python");
languages.add("C++");

Iterator<String> iterator = languages.iterator();

while (iterator.hasNext()) {
    System.out.println(iterator.next());
}
```

A `LinkedHashSet` preserves insertion order. If you used a `HashSet`, you should not depend on the iteration order.

### 6.3 Map

A `Map` is not itself a subtype of `Iterable`. To traverse a map, obtain a collection view such as `entrySet()`, `keySet()`, or `values()`.

```java
Map<String, Integer> marks = new LinkedHashMap<>();

marks.put("Aarav", 85);
marks.put("Meera", 92);

Iterator<Map.Entry<String, Integer>> iterator =
        marks.entrySet().iterator();

while (iterator.hasNext()) {
    Map.Entry<String, Integer> entry = iterator.next();
    System.out.println(entry.getKey() + " = " + entry.getValue());
}
```

Output:

```text
Aarav = 85
Meera = 92
```

Using `entrySet()` is useful when both key and value are needed.

---

## 7. Removing Elements Safely with `Iterator.remove()`

A frequent task is removing elements that meet a condition.

For example, remove all numbers less than 10:

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers =
                new ArrayList<>(List.of(5, 12, 3, 20, 8, 15));

        Iterator<Integer> iterator = numbers.iterator();

        while (iterator.hasNext()) {
            int number = iterator.next();

            if (number < 10) {
                iterator.remove();
            }
        }

        System.out.println(numbers);
    }
}
```

Output:

```text
[12, 20, 15]
```

### Why use `iterator.remove()`?

The iterator knows how the collection is being traversed. When removal is supported, `iterator.remove()` removes the element most recently returned by `next()` and updates the iterator's internal state.

You must call `next()` before calling `remove()`. You can normally remove a given returned element only once before calling `next()` again. Calling `remove()` without a valid preceding `next()` or calling it twice for the same element throws `IllegalStateException`.

Some iterators are read-only and do not support removal; they throw `UnsupportedOperationException` if `remove()` is called.

---

## 8. Why Not Remove Directly Inside a For-Each Loop?

Consider this code:

```java
List<Integer> numbers =
        new ArrayList<>(List.of(1, 2, 3, 4, 5));

for (Integer number : numbers) {
    if (number % 2 == 0) {
        numbers.remove(number);
    }
}
```

This is unsafe. It may throw `ConcurrentModificationException`, or the loop may behave unexpectedly depending on the collection and the exact operation. Do not modify an ordinary fail-fast collection structurally in this way while traversing it.

Use an explicit iterator:

```java
Iterator<Integer> iterator = numbers.iterator();

while (iterator.hasNext()) {
    if (iterator.next() % 2 == 0) {
        iterator.remove();
    }
}
```

Or use `removeIf()` when the task is simply to remove elements matching a predicate:

```java
numbers.removeIf(number -> number % 2 == 0);
```

### What is a structural modification?

A structural modification changes the collection's size or otherwise changes its structure in a way that affects iteration. For a list, adding or removing elements is usually structural. Replacing an existing element with `set()` is generally not structural.

The exact behavior depends on the collection implementation. Fail-fast behavior is best-effort error detection, not a thread-safety guarantee.

---

## 9. `forEachRemaining()`

`Iterator` has a convenient method named `forEachRemaining()`. It performs an action for every element that has not yet been traversed.

```java
List<String> names = List.of("Aarav", "Meera", "Kabir");

Iterator<String> iterator = names.iterator();

if (iterator.hasNext()) {
    System.out.println(iterator.next());
}

iterator.forEachRemaining(System.out::println);
```

Output:

```text
Aarav
Meera
Kabir
```

The first call to `next()` prints Aarav. `forEachRemaining()` then processes the remaining elements.

---

## 10. What Is `ListIterator`?

`ListIterator<E>` extends `Iterator<E>` and is designed specifically for lists. It can move both forward and backward, and it supports additional operations for modifying a list during traversal.

Important methods:

| Method | Purpose |
|---|---|
| `hasNext()` | Checks whether a next element exists |
| `next()` | Returns the next element |
| `hasPrevious()` | Checks whether a previous element exists |
| `previous()` | Returns the previous element |
| `nextIndex()` | Returns the index of the next element |
| `previousIndex()` | Returns the index of the previous element |
| `add(e)` | Inserts an element at the iterator's current position |
| `set(e)` | Replaces the last element returned by `next()` or `previous()` |
| `remove()` | Removes the last element returned by `next()` or `previous()` |

You can obtain a list iterator with:

```java
ListIterator<String> iterator = list.listIterator();
```

You can also start at a specified index:

```java
ListIterator<String> iterator = list.listIterator(2);
```

The index must be between 0 and the list's size, inclusive.

---

## 11. Forward Traversal with `ListIterator`

```java
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {
    public static void main(String[] args) {
        List<String> names =
                new ArrayList<>(List.of("Aarav", "Meera", "Kabir"));

        ListIterator<String> iterator = names.listIterator();

        while (iterator.hasNext()) {
            System.out.println(
                    iterator.nextIndex() + ": " + iterator.next()
            );
        }
    }
}
```

Output:

```text
0: Aarav
1: Meera
2: Kabir
```

Before calling `next()`, `nextIndex()` returns the index of the element that will be returned by the next call.

A list iterator's cursor is positioned between elements. It is not simply a pointer permanently attached to one element.

---

## 12. Backward Traversal with `ListIterator`

```java
List<String> names =
        new ArrayList<>(List.of("Aarav", "Meera", "Kabir"));

ListIterator<String> iterator = names.listIterator(names.size());

while (iterator.hasPrevious()) {
    System.out.println(iterator.previous());
}
```

Output:

```text
Kabir
Meera
Aarav
```

Starting the iterator at `names.size()` places the cursor after the last element. Calling `previous()` then moves backward through the list.

You can also move forward and then backward using the same iterator:

```java
ListIterator<String> iterator = names.listIterator();

System.out.println(iterator.next());
System.out.println(iterator.next());
System.out.println(iterator.previous());
```

Output:

```text
Aarav
Meera
Meera
```

The second call to `next()` returns Meera and moves the cursor past it. `previous()` moves the cursor back and returns Meera again.

---

## 13. Using `ListIterator.set()`

`set(element)` replaces the last element returned by `next()` or `previous()`.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {
    public static void main(String[] args) {
        List<String> names =
                new ArrayList<>(List.of("Aarav", "Meera", "Kabir"));

        ListIterator<String> iterator = names.listIterator();

        while (iterator.hasNext()) {
            String name = iterator.next();

            if (name.equals("Meera")) {
                iterator.set("Mira");
            }
        }

        System.out.println(names);
    }
}
```

Output:

```text
[Aarav, Mira, Kabir]
```

`set()` replaces the last element returned by the iterator. It does not insert a new element, and it does not change the list size.

Calling `set()` before `next()` or `previous()`, or after certain iterator operations such as `add()` or `remove()`, is not allowed and throws `IllegalStateException`.

---

## 14. Using `ListIterator.add()`

`add(element)` inserts an element at the iterator's current cursor position. The new element is inserted before the element that would be returned by `next()` and after the element that would be returned by `previous()`.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {
    public static void main(String[] args) {
        List<String> names =
                new ArrayList<>(List.of("Aarav", "Kabir"));

        ListIterator<String> iterator = names.listIterator();

        iterator.next(); // Move past Aarav.
        iterator.add("Meera");

        System.out.println(names);
    }
}
```

Output:

```text
[Aarav, Meera, Kabir]
```

After the first `next()`, the cursor is between Aarav and Kabir. The `add()` call inserts Meera at that position.

After `add()`, the new element is not considered the last element returned by `next()` or `previous()`, so calling `set()` or `remove()` immediately without another traversal step is not valid.

---

## 15. Using `ListIterator.remove()`

`ListIterator.remove()` removes the last element returned by `next()` or `previous()`.

```java
List<Integer> numbers =
        new ArrayList<>(List.of(10, 20, 30, 40));

ListIterator<Integer> iterator = numbers.listIterator();

while (iterator.hasNext()) {
    int number = iterator.next();

    if (number == 30) {
        iterator.remove();
    }
}

System.out.println(numbers);
```

Output:

```text
[10, 20, 40]
```

The removal is performed through the iterator, so the iterator can continue traversing correctly.

---

## 16. `Iterator` vs `ListIterator`

| Feature | `Iterator` | `ListIterator` |
|---|---|---|
| Works with | Many collection types | Lists only |
| Forward traversal | Yes | Yes |
| Backward traversal | No | Yes |
| Remove current element | If supported | If supported |
| Replace current element with `set()` | No | Yes |
| Add element during traversal | No | Yes |
| Index information | No | Yes |
| Obtain from | `collection.iterator()` | `list.listIterator()` |

Use `Iterator` when you only need general traversal or safe removal. Use `ListIterator` when you need bidirectional movement, index information, or list modifications during traversal.

---

## 17. What Is `ConcurrentModificationException`?

`ConcurrentModificationException` can occur when a collection detects that it has been structurally modified in an unexpected way while an iterator is active.

The name can be misleading: it can occur even in a single-threaded program. “Concurrent” here means that the collection is being modified while the iteration is in progress, not necessarily that multiple threads are involved.

Example of unsafe code:

```java
List<String> names =
        new ArrayList<>(List.of("Aarav", "Meera", "Kabir"));

Iterator<String> iterator = names.iterator();

while (iterator.hasNext()) {
    String name = iterator.next();

    if (name.equals("Meera")) {
        names.remove(name); // Direct structural modification
    }
}
```

This can throw `ConcurrentModificationException`.

Correct version:

```java
Iterator<String> iterator = names.iterator();

while (iterator.hasNext()) {
    if (iterator.next().equals("Meera")) {
        iterator.remove();
    }
}
```

Or:

```java
names.removeIf(name -> name.equals("Meera"));
```

Fail-fast detection is best-effort. Do not write code that relies on the exception always occurring or never occurring.

---

## 18. Iterators and Concurrent Collections

Not all iterators behave the same way.

Many ordinary collection iterators, such as those from `ArrayList`, are fail-fast on a best-effort basis. Some concurrent collections, such as `ConcurrentHashMap` and `CopyOnWriteArrayList`, have different iterator behavior.

- `ConcurrentHashMap` iterators are weakly consistent and can proceed while concurrent updates occur.
- `CopyOnWriteArrayList` iterators traverse a snapshot of the array as it existed when the iterator was created. They do not reflect later changes to the list and do not support iterator removal.

This does not mean all iterators are automatically thread-safe. Always check the documented behavior of the specific collection.

---

## 19. Practical Example: Remove All Short Words

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>(
                List.of("Java", "is", "powerful", "and", "popular")
        );

        Iterator<String> iterator = words.iterator();

        while (iterator.hasNext()) {
            if (iterator.next().length() < 4) {
                iterator.remove();
            }
        }

        System.out.println(words);
    }
}
```

Output:

```text
[Java, powerful, popular]
```

The words `"is"`, `"and"` are removed because their lengths are less than four. The other words remain.

---

## 20. Practical Example: Update Every Second List Element

```java
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers =
                new ArrayList<>(List.of(10, 20, 30, 40, 50));

        ListIterator<Integer> iterator = numbers.listIterator();

        while (iterator.hasNext()) {
            int index = iterator.nextIndex();
            int value = iterator.next();

            if (index % 2 == 1) {
                iterator.set(value * 10);
            }
        }

        System.out.println(numbers);
    }
}
```

Output:

```text
[10, 200, 30, 400, 50]
```

The indexes 1 and 3 are updated. `nextIndex()` is checked before `next()` advances the cursor.

---

## 21. Common Mistakes

**Mistake 1: Calling `next()` without checking `hasNext()`.**  
When no element remains, `next()` normally throws `NoSuchElementException`.

**Mistake 2: Calling `iterator.remove()` before `next()`.**  
Removal requires a valid preceding call to `next()` that has not already been followed by an invalidating operation.

**Mistake 3: Removing directly from a list while iterating over it.**  
Use `iterator.remove()` or `removeIf()`.

**Mistake 4: Assuming every iterator supports removal.**  
Some iterators are unmodifiable and throw `UnsupportedOperationException`.

**Mistake 5: Expecting `Iterator` to move backward.**  
Only `ListIterator` supports `previous()` and `hasPrevious()`.

**Mistake 6: Using `ListIterator` with a set.**  
`ListIterator` is for lists. A set provides an ordinary iterator.

**Mistake 7: Confusing `ListIterator.add()` with `set()`.**  
`add()` inserts a new element and changes the list size. `set()` replaces the last element returned by traversal.

**Mistake 8: Assuming `ConcurrentModificationException` only happens with multiple threads.**  
It can happen in single-threaded code when the collection is modified unexpectedly during iteration.

**Mistake 9: Assuming fail-fast behavior is guaranteed.**  
Fail-fast checks are best-effort and must not be used for synchronization or correctness.

---

## 22. Interview Questions and Answers

### Q1. What is `Iterable`?

`Iterable<T>` represents an object that can provide an iterator through its `iterator()` method.

### Q2. What is an iterator?

An `Iterator<T>` traverses elements one at a time using methods such as `hasNext()` and `next()`.

### Q3. What happens if `next()` is called when no elements remain?

It normally throws `NoSuchElementException`.

### Q4. Why use `iterator.remove()` instead of directly modifying a list during iteration?

The iterator can coordinate the removal with its traversal state. Direct structural modification may trigger fail-fast behavior or otherwise make traversal invalid.

### Q5. What is `ListIterator`?

It is an iterator for lists that supports forward and backward traversal, index information, and supported add, set, and remove operations.

### Q6. What is the difference between `Iterator` and `ListIterator`?

`Iterator` provides general forward traversal. `ListIterator` is list-specific and adds backward traversal, index methods, `add()`, and `set()`.

### Q7. What does `ConcurrentModificationException` mean?

A collection detected an unexpected structural modification during iteration. It can occur in a single thread and is not guaranteed to detect every unsafe modification.

### Q8. Can a map be used directly in an enhanced for loop?

No. A `Map` is not `Iterable`. Traverse `entrySet()`, `keySet()`, or `values()` instead.

### Q9. What is the purpose of `forEachRemaining()`?

It applies an action to all remaining elements in the iterator.

### Q10. What is the difference between `ListIterator.add()` and `ListIterator.set()`?

`add()` inserts a new element at the cursor position. `set()` replaces the last element returned by `next()` or `previous()`.

### Q11. Can you remove elements from an immutable list with an iterator?

No. The iterator's removal operation is unsupported, so calling it throws `UnsupportedOperationException`.

### Q12. What is a weakly consistent iterator?

It can traverse a concurrent collection while updates happen and may reflect some of those updates, but it is not necessarily a snapshot of the collection at one instant.

---

## 23. Output-Based Practice Questions

Try to predict the output before checking the answer.

### Question 1

```java
List<String> list = new ArrayList<>(List.of("A", "B", "C"));

Iterator<String> iterator = list.iterator();

System.out.println(iterator.next());
System.out.println(iterator.next());
```

**Answer:**

```text
A
B
```

Each call to `next()` returns the next element and advances the iterator.

### Question 2

```java
List<Integer> list =
        new ArrayList<>(List.of(1, 2, 3, 4, 5));

Iterator<Integer> iterator = list.iterator();

while (iterator.hasNext()) {
    if (iterator.next() % 2 == 1) {
        iterator.remove();
    }
}

System.out.println(list);
```

**Answer:**

```text
[2, 4]
```

All odd values are removed through the iterator.

### Question 3

```java
List<String> list =
        new ArrayList<>(List.of("A", "B", "C"));

ListIterator<String> iterator = list.listIterator(list.size());

System.out.println(iterator.previous());
System.out.println(iterator.previous());
```

**Answer:**

```text
C
B
```

The iterator starts after the final element and moves backward.

### Question 4

```java
List<String> list =
        new ArrayList<>(List.of("A", "C"));

ListIterator<String> iterator = list.listIterator();

iterator.next();
iterator.add("B");

System.out.println(list);
```

**Answer:**

```text
[A, B, C]
```

After `next()` returns A, the cursor is between A and C. `add("B")` inserts B there.

### Question 5

```java
List<String> list =
        new ArrayList<>(List.of("A", "B", "C"));

ListIterator<String> iterator = list.listIterator();

iterator.next();
iterator.next();
iterator.set("X");

System.out.println(list);
```

**Answer:**

```text
[A, X, C]
```

The last returned element was B, so `set("X")` replaces B.

---

## 24. Practice Exercises

### Beginner

1. Traverse an `ArrayList` using an explicit iterator.
2. Traverse a `LinkedHashSet` using an iterator and observe its iteration order.
3. Use an iterator to remove all negative numbers from a list.
4. Use `forEachRemaining()` to print all elements after the first one.
5. Traverse a map's `entrySet()` with an iterator.

### Intermediate

6. Use a `ListIterator` to print a list forward and then backward.
7. Replace every even number with its square using `ListIterator.set()`.
8. Insert a marker element before every item that satisfies a condition.
9. Remove all strings shorter than five characters using `Iterator.remove()`.
10. Demonstrate why direct structural modification during iteration is unsafe, then correct it.

### Advanced

11. Explain the legal call sequence for `ListIterator` methods `next()`, `previous()`, `remove()`, `set()`, and `add()`.
12. Compare fail-fast, weakly consistent, and snapshot iterators.
13. Explain why a `ConcurrentModificationException` can happen in a single-threaded program.
14. Write a program that updates a list using `ListIterator` without using list indexes directly.
15. Explain why `Map` cannot be used directly in an enhanced for loop and show three correct alternatives.

---

## 25. Revision Checklist

Before moving on, make sure you can explain:

- `Iterable` provides an `iterator()`.
- `Iterator` traverses elements using `hasNext()` and `next()`.
- `next()` normally throws if no element remains.
- `Iterator.remove()` removes the last element returned by `next()` when supported.
- Use an iterator or `removeIf()` rather than directly structurally modifying a collection during ordinary iteration.
- `ListIterator` supports backward traversal and list modifications.
- `ListIterator.add()` inserts; `set()` replaces the last returned element.
- A `Map` must be traversed through its views.
- `ConcurrentModificationException` is best-effort fail-fast detection, not a thread-safety feature.
- Iterator behavior varies by collection implementation.

## 26. What Comes Next?

**Chapter 40: Comparable, Comparator, and Sorting Collections** will explain natural ordering, custom ordering, sorting lists of objects, and how to choose the right comparison strategy.
