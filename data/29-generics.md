# Chapter 29 — Generics in Java

## 1. Learning goals

After completing this chapter, you should be able to:

- Explain what generics are and why Java uses them.
- Understand generic classes, interfaces, and methods.
- Use type parameters such as `T`, `E`, `K`, and `V`.
- Create generic classes with one or more type parameters.
- Write generic methods.
- Understand bounded type parameters such as `<T extends Number>`.
- Use wildcards: `?`, `? extends T`, and `? super T`.
- Understand the PECS rule for choosing wildcard bounds.
- Use generics with collections and inheritance.
- Recognize type erasure, raw types, and common restrictions.
- Avoid unchecked warnings and unsafe casts.
- Build a reusable generic utility and practice interview questions.

Examples generally work with Java 8 or newer. A few newer-language conveniences are avoided so the concepts remain broadly compatible.

---

## 2. What are generics?

**Generics** let you write classes, interfaces, and methods that work with different reference types while preserving compile-time type checking.

Imagine a box that can store a value. Without generics, you might use `Object`:

```java
class Box {
    private Object value;

    public void setValue(Object value) {
        this.value = value;
    }

    public Object getValue() {
        return value;
    }
}
```

Because `Object` is the superclass of most Java reference types, this box can store a `String`, an `Integer`, or another object. However, the compiler does not know what type you intend to retrieve.

```java
Box box = new Box();
box.setValue("Hello");

String text = (String) box.getValue();
System.out.println(text);
```

You must cast the result to `String`. If the box actually contains an `Integer`, the cast can fail at runtime.

Generics allow the type to be declared when the object is created:

```java
class GenericBox<T> {
    private T value;

    public void setValue(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}
```

Use it like this:

```java
GenericBox<String> box = new GenericBox<>();
box.setValue("Hello");

String text = box.getValue();
System.out.println(text);
```

Output:

```text
Hello
```

No cast is needed. The compiler knows that this particular box stores and returns `String` values.

### Main benefits of generics

1. **Type safety:** Incompatible values are rejected at compile time.
2. **Fewer casts:** Retrieved values already have the declared type.
3. **Reusable code:** One class or method can work with many types.
4. **Clearer APIs:** The types accepted and returned are explicit.

---

## 3. A problem without generics

Consider an ordinary list that stores `Object` values:

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList list = new ArrayList();

        list.add("Java");
        list.add(100);

        String language = (String) list.get(0);
        System.out.println(language);

        // This compiles, but fails at runtime:
        // String number = (String) list.get(1);
    }
}
```

The list accepts unrelated types. The compiler cannot protect you from an incorrect cast.

A raw `ArrayList` also produces compiler warnings because it omits the generic type argument.

### The same idea with generics

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");

        String first = languages.get(0);
        System.out.println(first);

        // Compile-time error:
        // languages.add(100);
    }
}
```

Output:

```text
Java
```

`ArrayList<String>` accepts `String` values and returns `String` values. Trying to add an integer is rejected by the compiler.

---

## 4. What does `T` mean?

In a generic declaration, `T` is a **type parameter**. It is a placeholder for a type that will be supplied later.

```java
class Box<T> {
    private T value;
}
```

When you write:

```java
Box<String> textBox;
Box<Integer> numberBox;
```

`T` represents `String` in the first use and `Integer` in the second.

The letter `T` has no special language meaning. It is a naming convention. You could use another valid identifier, but conventional letters make generic code easier to read.

Common type-parameter names:

| Letter | Common meaning |
|---|---|
| `T` | Type |
| `E` | Element, often used in collections |
| `K` | Key, often used in maps |
| `V` | Value, often used in maps |
| `N` | Number |
| `R` | Result or return type |

These are conventions, not rules. A descriptive name such as `TResult` can also be used.

---

## 5. Generic class with one type parameter

Let's build a reusable container.

```java
class Box<T> {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}

public class Main {
    public static void main(String[] args) {
        Box<String> nameBox = new Box<>("Aarav");
        Box<Integer> marksBox = new Box<>(95);

        System.out.println(nameBox.getValue());
        System.out.println(marksBox.getValue());
    }
}
```

Output:

```text
Aarav
95
```

### Step-by-step explanation

- `class Box<T>` declares a generic class.
- `private T value` means the field uses the chosen type.
- `Box(T value)` accepts a value of that type.
- `T getValue()` returns that type.
- `Box<String>` creates a box intended for strings.
- `Box<Integer>` creates a box intended for integers.
- The diamond operator `<>` lets Java infer the constructor's type argument from the variable declaration.

After creating `Box<String>`, passing an integer to `setValue()` is a compile-time error.

```java
Box<String> box = new Box<>("Java");

// Compile-time error:
// box.setValue(123);
```

---

## 6. Generic class with two type parameters

A generic class can use more than one type parameter.

```java
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() {
        return key;
    }

    public V getValue() {
        return value;
    }
}

public class Main {
    public static void main(String[] args) {
        Pair<Integer, String> student = new Pair<>(101, "Meera");
        Pair<String, Double> product = new Pair<>("Keyboard", 799.50);

        System.out.println(student.getKey() + " -> " + student.getValue());
        System.out.println(product.getKey() + " -> " + product.getValue());
    }
}
```

Output:

```text
101 -> Meera
Keyboard -> 799.5
```

In `Pair<K, V>`:

- `K` represents the key type.
- `V` represents the value type.

The type parameters can be different. `Pair<Integer, String>` stores an integer key and a string value, while `Pair<String, Double>` stores a string key and a double value.

---

## 7. Generic class with three type parameters

The same idea extends to more types.

```java
class Triple<A, B, C> {
    private final A first;
    private final B second;
    private final C third;

    public Triple(A first, B second, C third) {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    public A getFirst() {
        return first;
    }

    public B getSecond() {
        return second;
    }

    public C getThird() {
        return third;
    }
}

public class Main {
    public static void main(String[] args) {
        Triple<Integer, String, Boolean> record =
            new Triple<>(1, "Completed", true);

        System.out.println(record.getFirst());
        System.out.println(record.getSecond());
        System.out.println(record.getThird());
    }
}
```

Output:

```text
1
Completed
true
```

Use multiple type parameters when each position has a distinct role. Too many type parameters can make an API hard to understand, so choose a design that remains clear.

---

## 8. Generic methods

A **generic method** declares its own type parameter, independent of whether the enclosing class is generic.

The type parameter appears before the return type.

```java
public class Main {
    public static <T> void printValue(T value) {
        System.out.println(value);
    }

    public static void main(String[] args) {
        printValue("Java");
        printValue(100);
        printValue(3.14);
    }
}
```

Output:

```text
Java
100
3.14
```

### Understanding the syntax

```java
public static <T> void printValue(T value)
```

- `public static`: method modifiers.
- `<T>`: declares a method-level type parameter.
- `void`: return type.
- `printValue(T value)`: accepts a value of type `T`.

Java often infers `T` from the argument, so you do not need to specify it explicitly.

You can also call it with an explicit type witness:

```java
Main.<String>printValue("Hello");
```

Explicit type arguments are sometimes useful, but inference is more common.

---

## 9. Generic method that returns a value

A generic method can return a value of its type parameter.

```java
public class Main {
    public static <T> T getFirst(T first, T second) {
        return first;
    }

    public static void main(String[] args) {
        String result1 = getFirst("Java", "Python");
        Integer result2 = getFirst(10, 20);

        System.out.println(result1);
        System.out.println(result2);
    }
}
```

Output:

```text
Java
10
```

The method returns the first argument. The generic type ensures the result is compatible with the inferred type.

The example uses two arguments of the same type. If you pass unrelated types, Java may infer a common supertype, which can affect the return type. In general, generic method design should express the relationship between its input and output types clearly.

---

## 10. Generic method to print an array

```java
public class Main {
    public static <T> void printArray(T[] array) {
        for (T item : array) {
            System.out.print(item + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        String[] names = {"Aarav", "Meera", "Riya"};
        Integer[] marks = {80, 90, 95};

        printArray(names);
        printArray(marks);
    }
}
```

Output:

```text
Aarav Meera Riya
80 90 95
```

The same method works with arrays of different reference types.

### Important limitation

This generic method accepts arrays of reference types such as `String[]` and `Integer[]`. It cannot accept a primitive array such as `int[]` as `T[]`, because primitive types are not generic type arguments and `int[]` is not an `Integer[]`.

If you need to work with `int[]`, write a suitable overload or use a primitive-specific approach.

---

## 11. Generic interfaces

Interfaces can also have type parameters.

```java
interface Container<T> {
    void add(T item);
    T get();
}
```

A class can implement this interface for a particular type:

```java
class StringContainer implements Container<String> {
    private String value;

    @Override
    public void add(String item) {
        value = item;
    }

    @Override
    public String get() {
        return value;
    }
}

public class Main {
    public static void main(String[] args) {
        Container<String> container = new StringContainer();

        container.add("Generics");
        System.out.println(container.get());
    }
}
```

Output:

```text
Generics
```

`StringContainer` chooses `String` as the interface's type argument. Its methods therefore use `String`.

### A generic implementation

A class can also preserve the type parameter:

```java
class SimpleContainer<T> implements Container<T> {
    private T value;

    @Override
    public void add(T item) {
        value = item;
    }

    @Override
    public T get() {
        return value;
    }
}
```

Now you can create `SimpleContainer<String>`, `SimpleContainer<Integer>`, and so on.

---

## 12. Generic inheritance

A generic class can extend another generic class.

```java
class Box<T> {
    protected T value;

    public Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}

class NumberBox<T extends Number> extends Box<T> {
    public NumberBox(T value) {
        super(value);
    }

    public double asDouble() {
        return value.doubleValue();
    }
}

public class Main {
    public static void main(String[] args) {
        NumberBox<Integer> box = new NumberBox<>(50);
        System.out.println(box.getValue());
        System.out.println(box.asDouble());
    }
}
```

Output:

```text
50
50.0
```

`NumberBox<T>` restricts `T` to types that extend `Number`. The `value` field comes from `Box<T>`, and `doubleValue()` is available because `T` is bounded by `Number`.

You can also use a fixed type when extending a generic class:

```java
class StringBox extends Box<String> {
    public StringBox(String value) {
        super(value);
    }
}
```

`StringBox` always stores a `String`, so it no longer needs its own type parameter.

---

## 13. Bounded type parameters

Sometimes a generic method or class should accept only certain types.

For example, a method that calculates a sum needs numeric values. An unrestricted `<T>` could represent a `String`, so the compiler would not allow numeric methods on it.

Use an **upper bound** with `extends`.

```java
public class Main {
    public static <T extends Number> double toDouble(T value) {
        return value.doubleValue();
    }

    public static void main(String[] args) {
        System.out.println(toDouble(10));
        System.out.println(toDouble(3.5));
    }
}
```

Output:

```text
10.0
3.5
```

`T extends Number` means that `T` must be `Number` or a subtype of `Number`, such as `Integer`, `Double`, `Long`, or `Float`.

### Why use `extends` for an interface bound too?

In generic bounds, the keyword `extends` is used for both classes and interfaces.

```java
interface Printable {
    void print();
}

class Document implements Printable {
    @Override
    public void print() {
        System.out.println("Document");
    }
}

class Printer<T extends Printable> {
    public void printItem(T item) {
        item.print();
    }
}
```

Although `Document` implements `Printable`, it is valid as a type argument for `Printer<T>` because it satisfies the bound.

---

## 14. Multiple bounds

A type parameter can have more than one bound.

```java
class Example<T extends Number & Comparable<T>> {
    private final T value;

    public Example(T value) {
        this.value = value;
    }

    public int compareTo(T other) {
        return value.compareTo(other);
    }
}
```

This requires `T` to be a subtype of `Number` and to implement `Comparable<T>`.

### Important syntax rule

If a class bound is present, it must appear first. Any additional interface bounds follow, separated by `&`.

```java
<T extends Number & Comparable<T>>
```

This is valid.

```java
// Invalid ordering:
// <T extends Comparable<T> & Number>
```

`Number` is a class, so it must appear first.

Multiple bounds are useful when a method needs more than one capability from the type.

---

## 15. Generic types and inheritance: an important rule

A common beginner assumption is that if `Integer` is a subtype of `Number`, then `List<Integer>` must be a subtype of `List<Number>`. It is not.

```java
List<Integer> integers = new ArrayList<>();

// Compile-time error:
// List<Number> numbers = integers;
```

Why? If this assignment were allowed, someone could add a `Double` to the supposed `List<Number>`, even though the original list is intended to hold only `Integer` values.

```java
// If it were allowed, this would break type safety:
// numbers.add(3.14);
```

Java therefore treats different parameterized types as invariant by default.

### Correct alternatives

If you only need to read `Number` values, use an upper-bounded wildcard:

```java
List<? extends Number> numbers = integers;
```

If you need to add `Integer` values, use a list whose declared type supports that operation, or use a suitable lower-bounded wildcard when the API is designed for it.

This leads to wildcards, one of the most important generics topics.

---

## 16. Unbounded wildcard: `?`

A wildcard represents an unknown type.

```java
List<?> values;
```

This means a list of some specific type that is not known at the point of use. It could be a `List<String>`, a `List<Integer>`, or another parameterized list.

Example:

```java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void printList(List<?> list) {
        for (Object item : list) {
            System.out.println(item);
        }
    }

    public static void main(String[] args) {
        printList(Arrays.asList("Java", "Python"));
        printList(Arrays.asList(10, 20, 30));
    }
}
```

Output:

```text
Java
Python
10
20
30
```

### What can you do with `List<?>`?

You can safely read each item as an `Object`, because every reference type is a subtype of `Object`.

You generally cannot add a non-null value to a `List<?>`, because the actual element type is unknown. The compiler cannot know whether a `String`, `Integer`, or another type would be valid.

```java
List<?> values = Arrays.asList("Java", "Python");

// Compile-time error:
// values.add("C++");
```

You can add `null` to many wildcard-typed collection references, but doing so is rarely useful and may violate the collection's intended data rules.

Use `List<?>` when you want to accept a list of any element type but do not need to add elements of a specific type.

---

## 17. Upper-bounded wildcard: `? extends T`

An upper-bounded wildcard means “some type that is `T` or a subtype of `T`.”

```java
List<? extends Number>
```

This can refer to a `List<Integer>`, `List<Double>`, or `List<Number>`.

### Example: read numbers

```java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static double sum(List<? extends Number> numbers) {
        double total = 0;

        for (Number number : numbers) {
            total += number.doubleValue();
        }

        return total;
    }

    public static void main(String[] args) {
        List<Integer> integers = Arrays.asList(10, 20, 30);
        List<Double> decimals = Arrays.asList(1.5, 2.5);

        System.out.println(sum(integers));
        System.out.println(sum(decimals));
    }
}
```

Output:

```text
60.0
4.0
```

The method can read each element as a `Number`, because every possible element type is `Number` or a subtype of it.

### Why can't you add an `Integer`?

```java
List<? extends Number> numbers = Arrays.asList(1, 2, 3);

// Compile-time error:
// numbers.add(4);
```

The actual list might be a `List<Double>`. Adding an `Integer` to it would be unsafe. The compiler does not know the exact subtype, so it prevents adding a non-null value.

A useful way to remember it: `? extends T` is primarily useful when you need to **read** values as `T`.

---

## 18. Lower-bounded wildcard: `? super T`

A lower-bounded wildcard means “some type that is `T` or a supertype of `T`.”

```java
List<? super Integer>
```

This can refer to a `List<Integer>`, `List<Number>`, or `List<Object>`.

### Example: add integers

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void addNumbers(List<? super Integer> list) {
        list.add(10);
        list.add(20);
        list.add(30);
    }

    public static void main(String[] args) {
        List<Integer> integers = new ArrayList<>();
        List<Number> numbers = new ArrayList<>();
        List<Object> objects = new ArrayList<>();

        addNumbers(integers);
        addNumbers(numbers);
        addNumbers(objects);

        System.out.println(integers);
        System.out.println(numbers);
        System.out.println(objects);
    }
}
```

Output:

```text
[10, 20, 30]
[10, 20, 30]
[10, 20, 30]
```

Each target list can safely accept an `Integer`, because `Integer` is compatible with all the allowed element types.

### What can you read from a lower-bounded wildcard?

```java
List<? super Integer> values = new ArrayList<Number>();
values.add(10);

Object first = values.get(0);
```

The safe type for reading is `Object`, because the actual list might be a `List<Object>`. You cannot assume the retrieved value is an `Integer` just because adding integers is allowed.

A useful way to remember it: `? super T` is primarily useful when you need to **write** values of type `T`.

---

## 19. The PECS rule

A widely used rule for wildcards is **PECS**:

**Producer Extends, Consumer Super.**

- If a structure **produces** values for you to read as `T`, consider `? extends T`.
- If a structure **consumes** values you want to add as `T`, consider `? super T`.

### Example: producer

```java
static double sum(List<? extends Number> values) {
    double total = 0;

    for (Number value : values) {
        total += value.doubleValue();
    }

    return total;
}
```

The list produces numbers for the method to read.

### Example: consumer

```java
static void addDefaults(List<? super Integer> values) {
    values.add(0);
    values.add(1);
}
```

The list consumes integers added by the method.

PECS is a design guideline, not an absolute rule for every method. If a method both reads and writes values, the best signature depends on the exact relationship required between its inputs and outputs.

---

## 20. Generic methods with wildcards

You can combine generic methods and wildcard parameters.

```java
import java.util.List;

public class Main {
    public static <T> void copy(
            List<? extends T> source,
            List<? super T> destination) {

        for (T item : source) {
            destination.add(item);
        }
    }

    public static void main(String[] args) {
        List<Integer> source = List.of(10, 20, 30);
        List<Number> destination = new java.util.ArrayList<>();

        copy(source, destination);
        System.out.println(destination);
    }
}
```

Output:

```text
[10, 20, 30]
```

This method is similar in principle to the standard library's collection-copying patterns.

- The source produces `T` values, so it uses `? extends T`.
- The destination consumes `T` values, so it uses `? super T`.
- The compiler infers `T` from the source and destination types.

`List.of()` requires Java 9 or newer. On older Java versions, use `Arrays.asList()` for a fixed-size list or `new ArrayList<>(...)` for a modifiable list.

---

## 21. Generic type parameters versus wildcards

These forms look similar but serve different purposes.

### Type parameter

```java
public static <T> T identity(T value) {
    return value;
}
```

A type parameter gives a name (`T`) to a type so that the same type can be referred to in multiple places.

### Wildcard

```java
public static void printList(List<?> list) {
    // Read elements as Object.
}
```

A wildcard says that the type exists but is not named or known here.

### When should you use each?

Use a named type parameter when you need to express a relationship between two or more types, such as input and return type:

```java
<T> T identity(T value)
```

Use a wildcard when the method only needs to accept a parameterized type without needing to name its exact element type:

```java
void printList(List<?> list)
```

Use bounded wildcards when you need a compatible family of types:

```java
List<? extends Number>
List<? super Integer>
```

---

## 22. Raw types

A **raw type** is a generic type used without a type argument.

```java
List list = new ArrayList();
```

This is a raw `List`. It exists mainly for compatibility with older Java code written before generics were introduced.

Raw types weaken type checking:

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List list = new ArrayList();

        list.add("Java");
        list.add(100);

        String text = (String) list.get(0);
        System.out.println(text);

        // Compiles with warnings, then fails at runtime:
        // String number = (String) list.get(1);
    }
}
```

### Prefer parameterized types

```java
List<String> list = new ArrayList<>();
list.add("Java");

// Compile-time error:
// list.add(100);
```

Raw types can lead to unchecked warnings and runtime `ClassCastException`. Use parameterized types for new code. If you must work with a legacy API, isolate and document the unchecked operations.

---

## 23. Type erasure

Java implements generics using a technique called **type erasure**. At compile time, generic type information is used for type checking, but most generic type parameters are erased from the runtime representation.

For example:

```java
List<String> names = new ArrayList<>();
List<Integer> numbers = new ArrayList<>();
```

At runtime, both are generally represented as `List` objects; the JVM does not treat them as two distinct runtime classes named `List<String>` and `List<Integer>`.

### Why does type erasure matter?

It explains several restrictions:

1. You cannot usually check `value instanceof List<String>`.
2. You cannot create a generic array such as `new T[10]` directly.
3. You cannot use a type parameter as a normal `new T()` expression.
4. Overloads that differ only by erased generic types can conflict.
5. Some type information is not available directly at runtime.

The compiler inserts casts where necessary and uses bridge methods in certain overriding situations to preserve correct behavior.

You do not need to understand compiler bytecode to use generics, but knowing type erasure helps explain why certain declarations are illegal.

---

## 24. Restrictions on generics

### 24.1 Primitive type arguments are not allowed

Invalid:

```java
// List<int> values = new ArrayList<>();
```

Correct:

```java
List<Integer> values = new ArrayList<>();
```

Java uses wrapper classes for primitive values in generic types.

### 24.2 Cannot instantiate a type parameter directly

Invalid:

```java
// class Factory<T> {
//     T create() {
//         return new T();
//     }
// }
```

At runtime, type erasure means the program does not know which concrete constructor to call. Common alternatives include passing a factory, a constructor reference, or a `Class<T>` token.

A simple factory example:

```java
import java.util.function.Supplier;

class Factory<T> {
    private final Supplier<T> supplier;

    public Factory(Supplier<T> supplier) {
        this.supplier = supplier;
    }

    public T create() {
        return supplier.get();
    }
}
```

Usage:

```java
Factory<StringBuilder> factory = new Factory<>(StringBuilder::new);
StringBuilder builder = factory.create();
```

### 24.3 Cannot create a generic array directly

Invalid:

```java
// T[] values = new T[10];
```

Generic arrays are restricted because arrays know and enforce their component type at runtime, while generic type arguments are mostly erased.

In ordinary application code, prefer a collection such as `List<T>`. Advanced library implementations sometimes use arrays with carefully managed casts and warnings.

### 24.4 Cannot use primitive type parameters

You cannot declare a specialization like `Box<int>`. Use `Box<Integer>`.

### 24.5 Cannot overload methods based only on erased generic arguments

These methods conflict after type erasure:

```java
// void process(List<String> values) { }
// void process(List<Integer> values) { }
```

Both erase to a method that takes a `List`, so Java cannot distinguish them by their generic type arguments alone. Give the methods different names or different parameter signatures.

### 24.6 Static members cannot use a class's type parameter

```java
class Box<T> {
    // Invalid:
    // static T value;
}
```

A static member belongs to the class itself, not to one particular `Box<T>` instance, so it cannot use the instance class's type parameter as though it were a single fixed type.

A static method can declare its own type parameter:

```java
class Utility {
    public static <T> T identity(T value) {
        return value;
    }
}
```

Here, `T` belongs to the method, not to an enclosing generic class.

---

## 25. Bounded generic utility: find the maximum

Suppose you want a method that finds the larger of two values. Java needs a way to compare the values. `Comparable<T>` provides that capability.

```java
public class Main {
    public static <T extends Comparable<T>> T maximum(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    public static void main(String[] args) {
        System.out.println(maximum(10, 20));
        System.out.println(maximum("Apple", "Banana"));
    }
}
```

Output:

```text
20
Banana
```

### Explanation

- `T extends Comparable<T>` restricts `T` to types that implement the comparable contract.
- `compareTo()` returns a negative value when `a` is less than `b`, zero when equal, and a positive value when greater.
- The ternary expression returns the larger argument according to that type's comparison rules.

For strings, comparison is lexicographic and case-sensitive. “Maximum” means maximum according to `compareTo()`, not necessarily the most meaningful value for every application.

### A note about bounds

Some types implement `Comparable` with a supertype or a different type argument. More advanced library code may use a more flexible bound such as `<T extends Comparable<? super T>>`. The simpler form above is enough to demonstrate the concept.

---

## 26. Generic class with a bounded type

Let's create a class that stores a number and returns its double value.

```java
class NumberContainer<T extends Number> {
    private final T value;

    public NumberContainer(T value) {
        this.value = value;
    }

    public double asDouble() {
        return value.doubleValue();
    }

    public T getValue() {
        return value;
    }
}

public class Main {
    public static void main(String[] args) {
        NumberContainer<Integer> a = new NumberContainer<>(25);
        NumberContainer<Double> b = new NumberContainer<>(4.75);

        System.out.println(a.asDouble());
        System.out.println(b.asDouble());
    }
}
```

Output:

```text
25.0
4.75
```

This is allowed:

```java
NumberContainer<Integer> a = new NumberContainer<>(25);
```

This is not allowed:

```java
// Compile-time error:
// NumberContainer<String> text = new NumberContainer<>("Hello");
```

`String` does not extend `Number`, so it does not satisfy the bound.

---

## 27. Generics in the Java Collections Framework

Generics are used throughout Java collections.

```java
List<String> names = new ArrayList<>();
Set<Integer> ids = new HashSet<>();
Map<String, Integer> marks = new HashMap<>();
```

The type arguments tell Java which values are intended for each collection.

### List

```java
List<String> languages = new ArrayList<>();
languages.add("Java");
languages.add("Python");
```

`List<String>` stores strings.

### Set

```java
Set<Integer> ids = new HashSet<>();
ids.add(101);
ids.add(102);
```

`Set<Integer>` stores integer wrapper values and does not allow duplicate values according to `equals()`.

### Map

```java
Map<String, Integer> marks = new HashMap<>();
marks.put("Aarav", 90);
marks.put("Meera", 95);
```

`Map<String, Integer>` maps string keys to integer wrapper values.

Generics make these collections safer because incompatible types are rejected at compile time.

---

## 28. Generic utility to print any collection

```java
import java.util.Collection;
import java.util.List;
import java.util.Set;

public class Main {
    public static void printItems(Collection<?> items) {
        for (Object item : items) {
            System.out.println(item);
        }
    }

    public static void main(String[] args) {
        List<String> names = List.of("Aarav", "Meera");
        Set<Integer> numbers = Set.of(10, 20, 30);

        printItems(names);
        printItems(numbers);
    }
}
```

Example output:

```text
Aarav
Meera
10
20
30
```

The method accepts any collection of reference elements because it only reads each item as an `Object`.

The output order of a `Set` depends on the set implementation; do not assume that every set preserves insertion order.

---

## 29. A generic stack

A stack follows **LIFO**: Last In, First Out. The most recently pushed item is the first one popped.

This example demonstrates how a generic class can store elements of any chosen reference type.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

class Stack<T> {
    private final List<T> items = new ArrayList<>();

    public void push(T item) {
        items.add(item);
    }

    public T pop() {
        if (items.isEmpty()) {
            throw new NoSuchElementException("Stack is empty.");
        }
        return items.remove(items.size() - 1);
    }

    public T peek() {
        if (items.isEmpty()) {
            throw new NoSuchElementException("Stack is empty.");
        }
        return items.get(items.size() - 1);
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    public int size() {
        return items.size();
    }
}

public class Main {
    public static void main(String[] args) {
        Stack<String> stack = new Stack<>();

        stack.push("First");
        stack.push("Second");
        stack.push("Third");

        System.out.println(stack.peek());
        System.out.println(stack.pop());
        System.out.println(stack.pop());
        System.out.println(stack.size());
    }
}
```

Output:

```text
Third
Third
Second
1
```

### How it works

- `Stack<T>` is generic.
- `push()` adds an item.
- `pop()` removes and returns the last item.
- `peek()` returns the last item without removing it.
- `isEmpty()` checks whether the stack contains any items.
- `size()` returns the number of stored items.

This is a learning example. Java already provides `Deque` implementations such as `ArrayDeque` that are often preferable for stack behavior in real code.

---

## 30. Common mistakes and how to avoid them

**Mistake 1: Using raw types.**

```java
List list = new ArrayList();
```

Prefer `List<String>`, `List<Integer>`, or another appropriate parameterized type.

**Mistake 2: Assuming `List<Integer>` is a subtype of `List<Number>`.**

It is not. Use a suitable wildcard such as `List<? extends Number>` when the method only needs to read numbers.

**Mistake 3: Trying to add to `List<?>`.**

The actual element type is unknown, so adding a specific non-null element is not type-safe.

**Mistake 4: Using `? extends T` and then trying to add a `T`.**

The actual list could contain a more specific subtype. Use `? super T` when the method needs to consume values of type `T`.

**Mistake 5: Forgetting the PECS rule.**

Producer Extends, Consumer Super. Consider how the collection is used before choosing a wildcard bound.

**Mistake 6: Trying to use primitive type arguments.**

Use `Integer` instead of `int`, `Double` instead of `double`, and so on.

**Mistake 7: Creating `new T()`.**

A type parameter does not provide a constructor that Java can call directly. Pass a factory or another construction mechanism.

**Mistake 8: Creating `new T[10]`.**

Generic array creation is restricted. Prefer `List<T>` in normal application code.

**Mistake 9: Overloading methods that differ only by generic type arguments.**

Type erasure can make their signatures identical. Use distinct method names or genuinely different parameter types.

**Mistake 10: Ignoring unchecked warnings.**

Warnings often indicate that type safety cannot be verified. Do not silence them without understanding the risk.

---

## 31. Output-based questions

Try to predict the result before reading the answer.

### Question 1

```java
class Box<T> {
    T value;

    Box(T value) {
        this.value = value;
    }
}

Box<String> box = new Box<>("Java");
System.out.println(box.value);
```

**Answer:**

```text
Java
```

The type parameter `T` is `String` for this object.

### Question 2

```java
List<String> names = new ArrayList<>();
names.add("Java");
// names.add(100);
```

**Answer:** The `add(100)` line is a compile-time error because the list is declared to store strings.

### Question 3

```java
public static <T> T identity(T value) {
    return value;
}

System.out.println(identity(50));
```

**Answer:**

```text
50
```

Java infers `T` as `Integer` for the argument after boxing the integer literal as needed for the generic method.

### Question 4

```java
List<? extends Number> values = List.of(1, 2, 3);
System.out.println(values.get(0));
```

**Answer:**

```text
1
```

The first element can be read as a `Number` or printed as an object.

### Question 5

Why does this not compile?

```java
List<? extends Number> values = new ArrayList<Integer>();
// values.add(10);
```

**Answer:** The actual list could be a list of a more specific type such as `Double`. The compiler cannot guarantee that adding an `Integer` is safe.

### Question 6

```java
List<? super Integer> values = new ArrayList<Number>();
values.add(10);
System.out.println(values.get(0));
```

**Answer:**

```text
10
```

The list can safely accept an `Integer`; the retrieved item has the compile-time type `Object`.

### Question 7

What is a raw type?

**Answer:** A generic type used without specifying its type argument, such as `List list`. Raw types weaken compile-time type safety.

### Question 8

Can this compile?

```java
// List<int> values = new ArrayList<>();
```

**Answer:** No. Generic type arguments must be reference types. Use `List<Integer>`.

### Question 9

Can a generic method have its own type parameter even inside a non-generic class?

**Answer:** Yes. For example, `static <T> T identity(T value)` declares a method-level type parameter.

### Question 10

Why is `new T()` not allowed in ordinary generic code?

**Answer:** Because the concrete type parameter is not available in the required form at runtime due to type erasure. Use a factory or pass construction information.

---

## 32. Interview questions and answers

**1. What are generics in Java?**

Generics allow classes, interfaces, and methods to use type parameters, enabling reusable code with compile-time type safety.

**2. What are the advantages of generics?**

They improve type safety, reduce casts, make APIs clearer, and allow reusable classes and methods.

**3. What is a type parameter?**

It is a placeholder for a type, such as `T` in `class Box<T>`.

**4. What is a generic class?**

A class declared with one or more type parameters, such as `class Pair<K, V>`.

**5. What is a generic method?**

A method that declares its own type parameter, such as `public static <T> T identity(T value)`.

**6. What is a bounded type parameter?**

A type parameter restricted by a bound, such as `<T extends Number>`.

**7. Why is `extends` used for interface bounds?**

Java uses `extends` in generic bounds for both classes and interfaces, even though a class declares that it implements an interface with `implements`.

**8. What is a wildcard?**

A wildcard `?` represents an unknown type argument. It can be unbounded or have an upper or lower bound.

**9. Explain `? extends T`.**

It represents an unknown type that is `T` or a subtype of `T`. It is useful when reading values as `T`.

**10. Explain `? super T`.**

It represents an unknown type that is `T` or a supertype of `T`. It is useful when adding values of type `T`.

**11. What is PECS?**

Producer Extends, Consumer Super. Use `extends` when a source produces values for reading and `super` when a destination consumes values.

**12. Why is `List<Integer>` not a subtype of `List<Number>`?**

Parameterized generic types are invariant. Allowing that assignment would permit values such as `Double` to be inserted into a list intended to contain only integers.

**13. What is a raw type?**

A generic type used without a type argument, such as `List`. It is mainly retained for legacy compatibility and weakens type safety.

**14. What is type erasure?**

It is the compiler technique by which most generic type parameters are removed from the runtime representation while compile-time checks preserve type safety.

**15. Why can't generic type arguments be primitive types?**

Java's generics work with reference types. Use wrappers such as `Integer` for primitive values.

**16. Why can't you write `new T()`?**

The concrete type parameter is not directly available for ordinary object creation. A factory or constructor reference can provide the required construction behavior.

**17. Why can't you create a generic array directly?**

Arrays enforce their component type at runtime, while generic type arguments are mostly erased. Prefer collections such as `List<T>` for most use cases.

**18. Can static methods in a generic class use the class's `T`?**

Not directly, because static members belong to the class rather than to one parameterized instance. A static method can declare its own type parameter.

**19. What is the difference between a type parameter and a wildcard?**

A named type parameter expresses a relationship between types. A wildcard represents an unknown type argument when its exact identity does not need to be named.

**20. Where are generics used in Java?**

They are used heavily in collections such as `List<E>`, `Set<E>`, and `Map<K, V>`, and in reusable libraries, APIs, containers, and algorithms.

---

## 33. Practice exercises

Try to solve these without copying the examples.

1. Create a generic `Box<T>` class with a constructor, getter, and setter.
2. Create a generic `Pair<K, V>` class.
3. Write a generic method that prints any reference value.
4. Write a generic method that returns the first element of a non-empty `List<T>`.
5. Write a generic method that swaps two elements in a list by their indexes.
6. Write a method that accepts `List<? extends Number>` and returns the sum as a `double`.
7. Write a method that accepts `List<? super Integer>` and adds five integers.
8. Implement a generic interface for a container.
9. Create a bounded generic class that accepts only `Number` subtypes.
10. Write a generic method that returns the larger of two comparable values.
11. Build a generic stack with `push`, `pop`, `peek`, and `size`.
12. Write a method that copies items from `List<? extends T>` to `List<? super T>`.
13. Replace a raw collection with a parameterized collection and remove unchecked warnings.
14. Demonstrate why `List<Integer>` cannot be assigned to `List<Number>`.
15. Build a reusable utility that prints any `Collection<?>`.

---

## 34. Mini-project: Generic Data Store

Create a small reusable data store that maps an identifier to a value.

### Requirements

1. Create a generic class `DataStore<K, V>`.
2. Use a `HashMap<K, V>` internally.
3. Provide methods to add or update a value, retrieve a value, remove a value, and check whether a key exists.
4. Support different key and value types without rewriting the class.
5. Do not use raw types.
6. Demonstrate the store with student IDs and names.
7. Demonstrate it again with product codes and prices.
8. Decide how the class should behave when a key is missing.
9. Write tests for updating a key, removing a key, and checking a missing key.

### Suggested starting point

```java
import java.util.HashMap;
import java.util.Map;

class DataStore<K, V> {
    private final Map<K, V> data = new HashMap<>();

    public void put(K key, V value) {
        data.put(key, value);
    }

    public V get(K key) {
        return data.get(key);
    }

    public V remove(K key) {
        return data.remove(key);
    }

    public boolean containsKey(K key) {
        return data.containsKey(key);
    }
}
```

This starter implementation uses `null` as the result of `get()` for a missing key, but a stored null value can make that result ambiguous. For your project, either prohibit null values, check `containsKey()`, or define another missing-value strategy.

### Extension challenges

- Add a `size()` method.
- Add a method that returns all keys.
- Add a method that clears the store.
- Make the class reject null keys or values if that matches your requirements.
- Create a generic `Pair<K, V>` and use it in another utility.
- Write a generic list-copy method using PECS.

---

## 35. Revision checklist

Before moving to the next chapter, make sure you can:

- [ ] Explain why generics are useful.
- [ ] Declare a generic class with one or more type parameters.
- [ ] Write a generic method.
- [ ] Create a generic interface and implement it.
- [ ] Use bounded type parameters.
- [ ] Explain why parameterized types are invariant.
- [ ] Use unbounded wildcards.
- [ ] Use `? extends T` and `? super T`.
- [ ] Apply the PECS rule.
- [ ] Distinguish named type parameters from wildcards.
- [ ] Explain raw types and unchecked warnings.
- [ ] Explain type erasure at a high level.
- [ ] Recognize restrictions on generic arrays and `new T()`.
- [ ] Use generics safely with Java collections.
- [ ] Complete the Generic Data Store mini-project.

---

## 36. Final summary

Generics let Java classes, interfaces, and methods work with types chosen by the caller while preserving compile-time type checking. A generic class such as `Box<T>` can store different types safely, and a generic method can reuse the same logic for many reference types.

Bounded type parameters restrict the types that can be used. Wildcards make APIs more flexible: `?` represents an unknown type, `? extends T` is useful for producers, and `? super T` is useful for consumers. Remember the PECS rule, avoid raw types, and understand that type erasure explains many generic restrictions.

Generics are foundational to the Java Collections Framework and to writing reusable, type-safe APIs.

**Next chapter: Chapter 30 — Collections Framework Overview.**
