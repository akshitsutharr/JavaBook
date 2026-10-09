# Chapter 31 — List Interface and ArrayList

> **Goal:** Learn the `List` interface, understand how `ArrayList` works, master its common methods, compare it with other list implementations, and practise using lists in real Java programs.

## 1. What Is a List?

A `List` is a collection that stores elements in a particular sequence. Unlike a `Set`, a list can contain duplicates. It also supports index-based access, so you can get, replace, insert, or remove an element at a particular position.

For example, a list of subjects could contain:

```text
[Java, DBMS, Operating Systems, Java]
```

The repeated `Java` is allowed, and the position of each element matters.

In Java, `List` is an **interface**, not a class. `ArrayList` is one of its most commonly used implementations.

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> subjects = new ArrayList<>();

        subjects.add("Java");
        subjects.add("DBMS");
        subjects.add("Operating Systems");
        subjects.add("Java");

        System.out.println(subjects);
        System.out.println(subjects.get(1));
    }
}
```

Output:

```text
[Java, DBMS, Operating Systems, Java]
DBMS
```

The index begins at `0`, so index `1` refers to the second element.

## 2. Why Use the `List` Interface?

Prefer declaring a variable using the interface when you only need list behavior:

```java
List<Integer> numbers = new ArrayList<>();
```

This says that your code needs a `List`, while `ArrayList` supplies the implementation.

You could later change the implementation if your requirements change:

```java
List<Integer> numbers = new LinkedList<>();
```

Both are `List` implementations, though they have different performance characteristics.

This style is called **programming to an interface**. It reduces unnecessary dependence on one implementation.

Use the concrete type `ArrayList<Integer>` when you specifically need an `ArrayList`-specific API, or when the concrete type is important for the design.

## 3. What Is an `ArrayList`?

`ArrayList<E>` is a resizable-array implementation of the `List` interface.

The `E` represents the element type. For example:

- `ArrayList<Integer>` stores `Integer` objects.
- `ArrayList<String>` stores strings.
- `ArrayList<Student>` stores `Student` objects.

An `ArrayList` maintains an internal array. When that internal array becomes too small, the implementation grows its storage and copies elements as needed. You normally do not have to manage this process yourself.

```java
ArrayList<String> languages = new ArrayList<>();

languages.add("Java");
languages.add("C++");
languages.add("Python");

System.out.println(languages);
```

Output:

```text
[Java, C++, Python]
```

### Main characteristics

- Preserves element order.
- Allows duplicate elements.
- Supports fast index-based reads.
- Grows and shrinks as elements are added and removed.
- Allows `null` elements.
- Is not synchronized by default.
- Stores objects, not primitive values directly.

## 4. Creating an `ArrayList`

Remember to import the required classes:

```java
import java.util.ArrayList;
import java.util.List;
```

### 4.1 Empty list

```java
ArrayList<Integer> numbers = new ArrayList<>();
```

The list begins empty and grows as you add elements.

### 4.2 With an initial capacity

```java
ArrayList<Integer> numbers = new ArrayList<>(100);
```

This requests initial capacity for about 100 elements. It does **not** mean the list already contains 100 elements.

```java
ArrayList<Integer> numbers = new ArrayList<>(100);

System.out.println(numbers.size()); // 0
numbers.add(10);
System.out.println(numbers.size()); // 1
```

Output:

```text
0
1
```

**Capacity** is the size of the internal storage available before it needs to grow. **Size** is the number of elements actually stored. Capacity is an implementation detail; the public API exposes `size()`, not a general capacity getter.

### 4.3 From another collection

```java
List<String> original = List.of("Java", "C++", "Python");
ArrayList<String> languages = new ArrayList<>(original);

languages.add("JavaScript");
System.out.println(languages);
```

Output:

```text
[Java, C++, Python, JavaScript]
```

`List.of` requires Java 9 or later. The new `ArrayList` is mutable even though the original list returned by `List.of` is unmodifiable.

### 4.4 Using `Arrays.asList`

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

List<String> fixedSize = Arrays.asList("Java", "C++", "Python");
ArrayList<String> resizable = new ArrayList<>(fixedSize);

resizable.add("Go");
System.out.println(resizable);
```

Output:

```text
[Java, C++, Python, Go]
```

`Arrays.asList` itself returns a fixed-size list backed by an array. Wrapping it in `new ArrayList<>(...)` creates a resizable list.

### 4.5 Using `List.of`

```java
List<String> languages = List.of("Java", "C++", "Python");
```

This creates an unmodifiable list (Java 9+). It rejects `null` elements. Operations such as `add`, `remove`, and `set` throw `UnsupportedOperationException`.

To create a mutable copy:

```java
List<String> languages = new ArrayList<>(
        List.of("Java", "C++", "Python")
);
languages.add("Go");
```

## 5. Adding Elements

### 5.1 `add(element)`

Adds an element at the end of the list.

```java
List<String> names = new ArrayList<>();

names.add("Aarav");
names.add("Meera");
names.add("Kabir");

System.out.println(names);
```

Output:

```text
[Aarav, Meera, Kabir]
```

### 5.2 `add(index, element)`

Inserts an element at the specified position. Existing elements from that position onward shift to the right.

```java
List<String> names = new ArrayList<>(
        List.of("Aarav", "Kabir")
);

names.add(1, "Meera");
System.out.println(names);
```

Output:

```text
[Aarav, Meera, Kabir]
```

Valid insertion indexes range from `0` through `size()`, inclusive. Inserting at `size()` appends to the end.

### 5.3 `addAll(collection)`

Adds all elements from another collection.

```java
List<String> first = new ArrayList<>(
        List.of("Java", "C++")
);

List<String> second = List.of("Python", "JavaScript");

first.addAll(second);
System.out.println(first);
```

Output:

```text
[Java, C++, Python, JavaScript]
```

### 5.4 `addAll(index, collection)`

Inserts all elements from another collection at a particular position.

```java
List<Integer> numbers = new ArrayList<>(
        List.of(10, 40, 50)
);

numbers.addAll(1, List.of(20, 30));
System.out.println(numbers);
```

Output:

```text
[10, 20, 30, 40, 50]
```

## 6. Accessing and Replacing Elements

### 6.1 `get(index)`

Returns the element at the given index.

```java
List<String> fruits = new ArrayList<>(
        List.of("Apple", "Mango", "Banana")
);

System.out.println(fruits.get(0));
System.out.println(fruits.get(2));
```

Output:

```text
Apple
Banana
```

An invalid index causes `IndexOutOfBoundsException`.

### 6.2 `set(index, element)`

Replaces the element at an existing index. It does not insert an additional element and does not change the list's size.

```java
List<String> fruits = new ArrayList<>(
        List.of("Apple", "Mango", "Banana")
);

fruits.set(1, "Orange");

System.out.println(fruits);
System.out.println(fruits.size());
```

Output:

```text
[Apple, Orange, Banana]
3
```

### 6.3 `size()` and `isEmpty()`

```java
List<Integer> numbers = new ArrayList<>();

System.out.println(numbers.size());    // 0
System.out.println(numbers.isEmpty()); // true

numbers.add(100);

System.out.println(numbers.size());    // 1
System.out.println(numbers.isEmpty()); // false
```

`size()` counts elements, not internal capacity.

## 7. Removing Elements — A Very Important Topic

A `List` has overloaded `remove` methods. You need to understand the difference between removing by **index** and removing by **value**.

### 7.1 `remove(index)`

Removes the element at the specified position and returns the removed element.

```java
List<String> names = new ArrayList<>(
        List.of("Aarav", "Meera", "Kabir")
);

String removed = names.remove(1);

System.out.println("Removed: " + removed);
System.out.println(names);
```

Output:

```text
Removed: Meera
[Aarav, Kabir]
```

### 7.2 `remove(object)`

Removes the first element equal to the given object. It returns `true` if an element was removed and `false` otherwise.

```java
List<String> names = new ArrayList<>(
        List.of("Aarav", "Meera", "Aarav")
);

boolean removed = names.remove("Aarav");

System.out.println(removed);
System.out.println(names);
```

Output:

```text
true
[Meera, Aarav]
```

Only the first matching `"Aarav"` was removed.

### 7.3 The `List<Integer>` trap

This code:

```java
List<Integer> numbers = new ArrayList<>(
        List.of(10, 20, 30, 20)
);

numbers.remove(1);
System.out.println(numbers);
```

Output:

```text
[10, 30, 20]
```

Why? Java chooses `remove(int index)`, so it removes the element at index `1`, which is `20`.

To remove the value `20` instead:

```java
numbers.remove(Integer.valueOf(20));
```

That removes the first element equal to `20`.

Full example:

```java
List<Integer> numbers = new ArrayList<>(
        List.of(10, 20, 30, 20)
);

numbers.remove(Integer.valueOf(20));
System.out.println(numbers);
```

Output:

```text
[10, 30, 20]
```

This is a common interview and exam question.

### 7.4 `removeAll(collection)`

Removes every element in the list that is also found in the supplied collection.

```java
List<Integer> numbers = new ArrayList<>(
        List.of(1, 2, 3, 2, 4, 2, 5)
);

numbers.removeAll(List.of(2, 4));
System.out.println(numbers);
```

Output:

```text
[1, 3, 5]
```

### 7.5 `retainAll(collection)`

Keeps only elements that are also present in the supplied collection.

```java
List<Integer> numbers = new ArrayList<>(
        List.of(1, 2, 3, 4, 5)
);

numbers.retainAll(List.of(2, 4, 6));
System.out.println(numbers);
```

Output:

```text
[2, 4]
```

### 7.6 `clear()`

Removes all elements.

```java
List<String> names = new ArrayList<>(
        List.of("Aarav", "Meera")
);

names.clear();

System.out.println(names);
System.out.println(names.size());
```

Output:

```text
[]
0
```

## 8. Searching in an `ArrayList`

### 8.1 `contains(element)`

Returns `true` if the list contains an element equal to the specified object.

```java
List<String> names = new ArrayList<>(
        List.of("Aarav", "Meera", "Kabir")
);

System.out.println(names.contains("Meera"));
System.out.println(names.contains("Riya"));
```

Output:

```text
true
false
```

### 8.2 `indexOf(element)`

Returns the index of the first matching element, or `-1` if it is absent.

```java
List<String> names = new ArrayList<>(
        List.of("Java", "Python", "Java", "C++")
);

System.out.println(names.indexOf("Java"));
System.out.println(names.indexOf("C"));
```

Output:

```text
0
-1
```

### 8.3 `lastIndexOf(element)`

Returns the index of the last matching element, or `-1` if it is absent.

```java
List<String> names = new ArrayList<>(
        List.of("Java", "Python", "Java", "C++")
);

System.out.println(names.lastIndexOf("Java"));
```

Output:

```text
2
```

These searches use `equals`, so custom objects should implement equality correctly when value-based searching is required.

## 9. Iterating Through an `ArrayList`

### 9.1 Enhanced `for` loop

Use this for simple read-only traversal.

```java
List<String> languages = new ArrayList<>(
        List.of("Java", "C++", "Python")
);

for (String language : languages) {
    System.out.println(language);
}
```

Output:

```text
Java
C++
Python
```

### 9.2 Traditional `for` loop

Use an index when you need the position or need to access nearby elements.

```java
List<String> languages = new ArrayList<>(
        List.of("Java", "C++", "Python")
);

for (int i = 0; i < languages.size(); i++) {
    System.out.println(i + ": " + languages.get(i));
}
```

Output:

```text
0: Java
1: C++
2: Python
```

### 9.3 `forEach`

```java
List<String> languages = new ArrayList<>(
        List.of("Java", "C++", "Python")
);

languages.forEach(language -> System.out.println(language));
```

You can also use a method reference:

```java
languages.forEach(System.out::println);
```

### 9.4 `Iterator`

An iterator lets you traverse the list and remove elements safely through the iterator when that operation is supported.

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
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
    }
}
```

Output:

```text
[10, 20, 30]
```

### 9.5 `ListIterator`

`ListIterator` can move forwards and backwards, and it can replace or insert elements during traversal.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {
    public static void main(String[] args) {
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
    }
}
```

Output:

```text
[Aarav, Mira, Kabir]
```

## 10. Removing Elements with `removeIf`

`removeIf` removes elements that satisfy a predicate. It is often simpler than manually managing an iterator.

```java
List<Integer> numbers = new ArrayList<>(
        List.of(3, 12, 7, 20, 5, 30)
);

numbers.removeIf(number -> number < 10);

System.out.println(numbers);
```

Output:

```text
[12, 20, 30]
```

Another example:

```java
List<String> names = new ArrayList<>(
        List.of("Aarav", "Meera", "Anaya", "Kabir")
);

names.removeIf(name -> name.startsWith("A"));

System.out.println(names);
```

Output:

```text
[Meera, Kabir]
```

Do not remove elements directly from the list inside an enhanced `for` loop. That can cause `ConcurrentModificationException`. Use `removeIf`, `Iterator.remove`, or another suitable approach.

## 11. Sorting an `ArrayList`

### 11.1 `Collections.sort`

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

### 11.2 `List.sort`

```java
List<Integer> numbers = new ArrayList<>(
        List.of(40, 10, 30, 20)
);

numbers.sort(null); // natural ordering
System.out.println(numbers);
```

Output:

```text
[10, 20, 30, 40]
```

### 11.3 Descending order

```java
numbers.sort(Comparator.reverseOrder());
System.out.println(numbers);
```

For a list of integers, this sorts from largest to smallest.

### 11.4 Sorting strings by length

```java
List<String> words = new ArrayList<>(
        List.of("banana", "kiwi", "apple", "fig")
);

words.sort(Comparator.comparingInt(String::length));

System.out.println(words);
```

Output:

```text
[fig, kiwi, apple, banana]
```

The comparator sorts by string length. Equal-length strings are not guaranteed to be alphabetically ordered by this comparator. If you need a tie-breaker:

```java
words.sort(
        Comparator.comparingInt(String::length)
                  .thenComparing(Comparator.naturalOrder())
);
```

## 12. `subList(from, to)`

`subList` returns a **view** of a portion of the original list. The starting index is included and the ending index is excluded.

```java
List<String> languages = new ArrayList<>(
        List.of("Java", "C++", "Python", "JavaScript", "Go")
);

List<String> middle = languages.subList(1, 4);

System.out.println(middle);
```

Output:

```text
[C++, Python, JavaScript]
```

The indexes included are `1`, `2`, and `3`.

Important details:

- The end index is exclusive.
- The view is backed by the original list.
- Changes made through the sublist are reflected in the original list.
- Structural changes to the original list outside the view can make the sublist's behavior invalid or cause `ConcurrentModificationException`.

Example of modifying through the view:

```java
List<Integer> numbers = new ArrayList<>(
        List.of(10, 20, 30, 40, 50)
);

List<Integer> part = numbers.subList(1, 4);
part.set(0, 99);

System.out.println(part);
System.out.println(numbers);
```

Output:

```text
[99, 30, 40]
[10, 99, 30, 40, 50]
```

If you need an independent list, make a copy:

```java
List<Integer> copy = new ArrayList<>(numbers.subList(1, 4));
```

## 13. Converting Between Lists and Arrays

### 13.1 List to array

```java
List<String> names = new ArrayList<>(
        List.of("Aarav", "Meera", "Kabir")
);

String[] array = names.toArray(new String[0]);

System.out.println(Arrays.toString(array));
```

Output:

```text
[Aarav, Meera, Kabir]
```

Imports:

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
```

`toArray(new String[0])` is a common, clear pattern for obtaining a typed array.

### 13.2 Array to list

```java
String[] array = {"Java", "C++", "Python"};

List<String> list = new ArrayList<>(Arrays.asList(array));
list.add("Go");

System.out.println(list);
```

Output:

```text
[Java, C++, Python, Go]
```

This creates a resizable list. By contrast, `Arrays.asList(array)` alone is fixed-size and backed by the array.

### 13.3 Be careful with primitive arrays

This does not produce a `List<Integer>` containing each integer:

```java
int[] values = {1, 2, 3};
// Arrays.asList(values) treats the int[] as one object argument.
```

`Arrays.asList` works with object arrays such as `Integer[]`. For a primitive `int[]`, use a loop or an appropriate stream conversion.

## 14. `ArrayList` and Generics

Always specify the element type where possible.

```java
List<String> names = new ArrayList<>();
names.add("Aarav");
// names.add(100); // compile-time error
```

Generics let the compiler catch type mistakes before the program runs.

Java collections cannot use primitive types as generic arguments:

```java
List<Integer> marks = new ArrayList<>();
marks.add(90); // autoboxing converts int to Integer
int mark = marks.get(0); // unboxing converts Integer to int
```

Do not write `ArrayList<int>`. Write `ArrayList<Integer>`.

Avoid raw types such as `ArrayList list = new ArrayList();` because they weaken type safety and can lead to runtime `ClassCastException`.

## 15. `ArrayList` Time Complexity

Typical time complexities for the standard `ArrayList` implementation:

| Operation | Typical time |
|---|---:|
| `get(index)` | O(1) |
| `set(index, value)` | O(1) |
| `add(value)` at end | Amortized O(1) |
| `add(index, value)` | O(n) |
| `remove(index)` | O(n) |
| `contains(value)` | O(n) |
| `indexOf(value)` | O(n) |
| `remove(value)` | O(n) |
| `size()` | O(1) |
| Iterating over all elements | O(n) |

Why is appending **amortized O(1)**? Most appends take constant time, but occasionally the internal array must grow and elements must be copied. Across many appends, the average cost per append remains constant under the usual dynamic-array growth strategy.

Why are insertions and removals in the middle O(n)? Elements after the changed position may need to shift to keep the list contiguous.

These are typical implementation characteristics, not a promise that every individual operation always takes exactly the same amount of time.

## 16. `ArrayList` vs. `LinkedList`

| Feature | `ArrayList` | `LinkedList` |
|---|---|---|
| Internal structure | Resizable array | Doubly linked nodes |
| Indexed `get` | Typically O(1) | O(n) |
| Append at end | Amortized O(1) | O(1) |
| Insert/remove at an index | Usually O(n) due to shifting | Finding the node is O(n); changing links is O(1) once located |
| Memory overhead | Usually lower | Usually higher due to node links |
| Good general-purpose list default | Usually yes | Only for particular workloads |

Do not choose `LinkedList` just because you expect to insert frequently. If you must search for each insertion position, that search may dominate the cost. For queue or stack behavior, consider `ArrayDeque`.

## 17. `ArrayList` vs. `Vector` vs. `Stack`

`Vector` is an older resizable-array class with synchronized individual methods. `Stack` extends `Vector` and represents a legacy stack API.

For new code:

- Prefer `ArrayList` for ordinary list behavior.
- Prefer `ArrayDeque` for ordinary stack behavior (`push`, `pop`, `peek`).
- Use explicit synchronization or suitable concurrent data structures when concurrency requirements demand it.

The fact that `Vector` synchronizes individual methods does not automatically make a multi-step operation atomic or make it the best choice for every threaded program.

## 18. Common Problems and Exceptions

**`IndexOutOfBoundsException`:** You try to access, replace, or remove an element using an invalid index.

```java
List<String> names = new ArrayList<>();
names.add("Aarav");
// names.get(1); // invalid: only index 0 exists
```

**`UnsupportedOperationException`:** You attempt an unsupported modification, such as adding to the fixed-size list returned by `Arrays.asList` or modifying a list returned by `List.of`.

**`ConcurrentModificationException`:** You structurally modify an ordinary list in an unsupported way while iterating over it.

**`NullPointerException`:** Your code dereferences a null reference, or passes null to an operation that rejects it. `ArrayList` itself permits null elements, but not every API you use with it does.

**`ClassCastException`:** This can arise when raw types or unsafe casts bypass generic type safety.

## 19. Practical Program — Shopping Cart

This program combines adding, displaying, searching, removing, and counting list elements.

```java
import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
    public static void main(String[] args) {
        List<String> cart = new ArrayList<>();

        cart.add("Keyboard");
        cart.add("Mouse");
        cart.add("USB Cable");
        cart.add("Mouse");

        System.out.println("Cart: " + cart);
        System.out.println("Items: " + cart.size());
        System.out.println("Contains mouse: " + cart.contains("Mouse"));

        cart.remove("Mouse"); // removes first matching Mouse
        System.out.println("After removing one mouse: " + cart);

        cart.removeIf(item -> item.equals("USB Cable"));
        System.out.println("Final cart: " + cart);
    }
}
```

Output:

```text
Cart: [Keyboard, Mouse, USB Cable, Mouse]
Items: 4
Contains mouse: true
After removing one mouse: [Keyboard, USB Cable, Mouse]
Final cart: [Keyboard, Mouse]
```

This example demonstrates that duplicates are allowed and `remove("Mouse")` removes only the first match.

## 20. Practical Program — Find the Second-Largest Distinct Number

This example uses a list, a set, and sorting. It finds the second-largest **distinct** value.

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(10, 40, 30, 40, 20, 10);

        TreeSet<Integer> sorted = new TreeSet<>(numbers);

        if (sorted.size() < 2) {
            System.out.println("No second-largest distinct value");
            return;
        }

        System.out.println(sorted.lower(sorted.last()));
    }
}
```

Output:

```text
30
```

`TreeSet` removes duplicates and sorts values. `last()` gets the largest value, and `lower(value)` gets the greatest element strictly below that value.

## 21. Practical Program — Remove Duplicates While Preserving Order

If you want unique values but want to preserve the order in which they first appeared, a `LinkedHashSet` is useful.

```java
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of(
                "Aarav", "Meera", "Aarav", "Kabir", "Meera"
        );

        List<String> uniqueNames =
                new ArrayList<>(new LinkedHashSet<>(names));

        System.out.println(uniqueNames);
    }
}
```

Output:

```text
[Aarav, Meera, Kabir]
```

A `HashSet` would remove duplicates too, but it would not guarantee insertion order.

## 22. Output-Based Questions

Try to predict each output before reading the answer.

### Question 1

```java
List<Integer> list = new ArrayList<>();
list.add(10);
list.add(20);
list.add(10);
System.out.println(list.size());
System.out.println(list.get(2));
```

**Answer:**

```text
3
10
```

Duplicates are allowed, and the last element is at index `2`.

### Question 2

```java
List<String> list = new ArrayList<>(
        List.of("A", "B", "C")
);
list.add(1, "X");
System.out.println(list);
```

**Answer:**

```text
[A, X, B, C]
```

The element is inserted at index `1`, shifting later elements right.

### Question 3

```java
List<Integer> list = new ArrayList<>(
        List.of(5, 10, 15, 10)
);
list.remove(Integer.valueOf(10));
System.out.println(list);
```

**Answer:**

```text
[5, 15, 10]
```

The object overload removes the first matching value.

### Question 4

```java
List<String> list = new ArrayList<>(
        List.of("Java", "C++", "Java")
);
System.out.println(list.indexOf("Java"));
System.out.println(list.lastIndexOf("Java"));
```

**Answer:**

```text
0
2
```

`indexOf` finds the first occurrence; `lastIndexOf` finds the last.

### Question 5

```java
List<Integer> list = new ArrayList<>(
        List.of(1, 2, 3, 4, 5)
);
list.removeIf(n -> n % 2 == 0);
System.out.println(list);
```

**Answer:**

```text
[1, 3, 5]
```

All even values are removed.

### Question 6

```java
List<String> list = Arrays.asList("A", "B");
list.set(0, "X");
System.out.println(list);
```

**Answer:**

```text
[X, B]
```

`set` is allowed on the fixed-size list returned by `Arrays.asList`.

### Question 7

```java
List<String> list = Arrays.asList("A", "B");
list.add("C");
```

**Answer:** `UnsupportedOperationException` is thrown because the list has a fixed size.

### Question 8

```java
List<Integer> list = new ArrayList<>(
        List.of(30, 10, 20)
);
list.sort(Comparator.naturalOrder());
System.out.println(list);
```

**Answer:**

```text
[10, 20, 30]
```

The natural integer order is ascending.

## 23. Interview Questions and Answers

### Q1. What is `ArrayList`?

`ArrayList` is a resizable-array implementation of `List`. It preserves order, allows duplicates, and supports index-based access.

### Q2. Why is `ArrayList` access by index fast?

It stores elements in an array, so the implementation can access a position directly, typically in O(1) time.

### Q3. Why can appending to an `ArrayList` be described as amortized O(1)?

Most appends use an available slot. Occasionally, storage grows and elements are copied, but the average cost across a long sequence of appends is constant under the usual growth strategy.

### Q4. What is the difference between `size` and capacity?

`size` is the number of stored elements. Capacity refers to available internal storage. An initial capacity of 100 does not create 100 list elements.

### Q5. Can an `ArrayList` contain duplicates and null?

Yes. `ArrayList` permits duplicate elements and permits null elements.

### Q6. What is the difference between `add` and `set`?

`add(index, value)` inserts a new element and shifts later elements. `set(index, value)` replaces the existing element without changing the size.

### Q7. What is the difference between `remove(1)` and `remove(Integer.valueOf(1))` for a `List<Integer>`?

`remove(1)` selects the index overload and removes the element at index `1`. `remove(Integer.valueOf(1))` selects the object overload and removes the first element equal to the integer value `1`.

### Q8. Does `subList` create an independent list?

No. It returns a view backed by the original list. Create a new `ArrayList` from the sublist if you need an independent list structure.

### Q9. How can you remove elements safely while iterating?

Use `Iterator.remove()`, `removeIf`, or another API designed for the operation. Do not structurally modify the list directly from an enhanced `for` loop.

### Q10. What is the difference between `Arrays.asList` and `ArrayList`?

`Arrays.asList` returns a fixed-size list backed by an array. `ArrayList` is resizable. Wrapping `Arrays.asList` in `new ArrayList<>(...)` creates a resizable copy.

### Q11. Is `ArrayList` thread-safe?

No, not by default. For shared concurrent access, use an appropriate synchronization strategy or a suitable concurrent collection.

### Q12. Why use `List<String>` instead of a raw `ArrayList`?

Generics provide compile-time type safety and reduce unsafe casts and runtime type errors.

### Q13. What is the difference between `ArrayList` and `LinkedList`?

`ArrayList` provides fast indexed access and usually lower memory overhead. `LinkedList` supports efficient link changes at known nodes and operations at its ends, but indexed access and finding an interior position take linear time.

### Q14. What happens if you call `get(size())`?

It throws `IndexOutOfBoundsException`, because the final valid index is `size() - 1` for a non-empty list.

### Q15. How do you sort an `ArrayList` in descending order?

For comparable values, use `list.sort(Comparator.reverseOrder())`, or use an appropriate custom comparator.

## 24. Practice Exercises

Complete these programs yourself before checking other solutions.

1. Create an `ArrayList<Integer>` and add ten integers. Print the sum and average.
2. Find the largest and smallest elements without using `Collections.max` or `Collections.min`.
3. Count how many times a given number appears in a list.
4. Remove all occurrences of a given number from a list.
5. Remove all even numbers using `removeIf`.
6. Insert a value at a specified index after validating that the index is legal.
7. Reverse a list without using `Collections.reverse`.
8. Sort a list of strings by length, with alphabetical order as the tie-breaker.
9. Create a list of student objects and sort by marks descending.
10. Convert an array to a resizable list, append an element, and convert the result back to an array.
11. Remove duplicates while preserving the first occurrence of each element.
12. Given a list of integers, find the second-largest distinct value.
13. Split a list into two lists containing the first half and second half. Handle odd list sizes correctly.
14. Implement a small shopping cart with add, remove, search, and display methods.
15. Demonstrate the difference between `remove(index)` and `remove(object)` using `List<Integer>`.

## 25. Revision Checklist

- [ ] Explain what the `List` interface represents.
- [ ] Explain why `ArrayList` is a resizable-array implementation.
- [ ] Create an `ArrayList` using different constructors.
- [ ] Distinguish size from initial capacity.
- [ ] Use `add`, `addAll`, `get`, and `set`.
- [ ] Use `remove(index)` and `remove(object)` correctly.
- [ ] Explain the `List<Integer>` removal trap.
- [ ] Search using `contains`, `indexOf`, and `lastIndexOf`.
- [ ] Iterate with a for-each loop, traditional loop, `Iterator`, and `ListIterator`.
- [ ] Remove matching elements with `removeIf`.
- [ ] Sort values using natural order and a `Comparator`.
- [ ] Explain how `subList` behaves as a view.
- [ ] Convert between arrays and lists safely.
- [ ] Describe typical `ArrayList` time complexities.
- [ ] Compare `ArrayList` and `LinkedList`.
- [ ] Recognize common list-related exceptions.

## 26. Final Summary

A `List` represents an ordered sequence that allows duplicates and supports index-based access. `ArrayList` is the usual starting choice because it provides fast indexed reads, efficient iteration, and convenient dynamic growth.

The methods to master first are `add`, `addAll`, `get`, `set`, `remove`, `contains`, `indexOf`, `lastIndexOf`, `size`, `isEmpty`, `clear`, `removeIf`, and `sort`.

Pay particular attention to the overloaded `remove` methods, the difference between size and capacity, the fixed-size behavior of `Arrays.asList`, the unmodifiable behavior of `List.of`, and the fact that `subList` is a view.

**Next chapter:** Chapter 32 — Set Interface (`HashSet`, `LinkedHashSet`, and `TreeSet`).
