# Chapter 27 — Wrapper Classes in Java

## 1. Learning goals

After completing this chapter, you should be able to:

- Explain primitive data types and wrapper classes.
- Identify all eight Java wrapper classes.
- Convert between primitive values and wrapper objects.
- Understand autoboxing and unboxing.
- Convert strings into numbers and numbers into strings.
- Use parsing and conversion methods correctly.
- Understand why wrapper classes are useful with collections and generics.
- Compare wrapper objects safely, including the `==` versus `equals()` difference.
- Handle `null` wrapper references and avoid common errors.
- Solve practice questions and build a small practical program.

---

## 2. What are primitive data types?

Java has eight primitive data types. They store simple values directly.

| Primitive type | Example | Typical purpose |
|---|---|---|
| `byte` | `byte age = 20;` | Small integer values |
| `short` | `short year = 2026;` | Short integer values |
| `int` | `int marks = 90;` | Common integer values |
| `long` | `long population = 8000000L;` | Large integer values |
| `float` | `float price = 12.5f;` | Single-precision decimal values |
| `double` | `double pi = 3.14159;` | Double-precision decimal values |
| `char` | `char grade = 'A';` | One UTF-16 code unit |
| `boolean` | `boolean passed = true;` | `true` or `false` |

Example:

```java
public class Main {
    public static void main(String[] args) {
        int marks = 85;
        double percentage = 85.5;
        char grade = 'A';
        boolean passed = true;

        System.out.println(marks);
        System.out.println(percentage);
        System.out.println(grade);
        System.out.println(passed);
    }
}
```

Output:

```text
85
85.5
A
true
```

Primitive variables are efficient for simple calculations. However, Java's object-oriented APIs often work with objects rather than primitive values. For example, generic collections such as `ArrayList<T>` cannot use a primitive type as their type argument.

This is where wrapper classes are useful.

---

## 3. What is a wrapper class?

A **wrapper class** is a class that represents a primitive value as an object.

For example:

- Primitive `int` has wrapper class `Integer`.
- Primitive `double` has wrapper class `Double`.
- Primitive `char` has wrapper class `Character`.

A wrapper object lets a primitive value work with APIs that require objects.

```java
int number = 10;           // Primitive value
Integer object = 10;       // Integer wrapper object (autoboxing)
```

The first variable is a primitive `int`. The second is an `Integer` reference that refers to an object representing the value `10`.

### Simple real-world analogy

Think of a primitive value as a loose item and the wrapper object as a container holding that item. Some Java features work only with objects, so the wrapper provides an object representation of the value.

This analogy is only for understanding: a wrapper is a real Java class, and Java provides automatic conversion between primitives and wrappers in many situations.

---

## 4. The eight wrapper classes

Java provides one wrapper class for each primitive type.

| Primitive type | Wrapper class | Example |
|---|---|---|
| `byte` | `Byte` | `Byte value = 10;` |
| `short` | `Short` | `Short value = 100;` |
| `int` | `Integer` | `Integer value = 1000;` |
| `long` | `Long` | `Long value = 10000L;` |
| `float` | `Float` | `Float value = 2.5f;` |
| `double` | `Double` | `Double value = 3.14;` |
| `char` | `Character` | `Character value = 'A';` |
| `boolean` | `Boolean` | `Boolean value = true;` |

Remember the capitalization:

- `int` → `Integer`, not `Int`
- `char` → `Character`, not `Char`
- `boolean` → `Boolean`

Wrapper class names are capitalized because they are class names.

### Example using all eight wrappers

```java
public class Main {
    public static void main(String[] args) {
        Byte a = 10;
        Short b = 200;
        Integer c = 3000;
        Long d = 40000L;
        Float e = 5.5f;
        Double f = 6.75;
        Character g = 'J';
        Boolean h = true;

        System.out.println(a);
        System.out.println(b);
        System.out.println(c);
        System.out.println(d);
        System.out.println(e);
        System.out.println(f);
        System.out.println(g);
        System.out.println(h);
    }
}
```

Output:

```text
10
200
3000
40000
5.5
6.75
J
true
```

Java automatically converts many of these primitive literals into wrapper objects. This is called **autoboxing**, explained shortly.

---

## 5. Why do we need wrapper classes?

### Reason 1: Collections require objects

You cannot write this:

```java
// Invalid Java:
// ArrayList<int> numbers = new ArrayList<int>();
```

Generic type arguments must be reference types, not primitive types.

Instead, use `Integer`:

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        System.out.println(numbers);
    }
}
```

Output:

```text
[10, 20, 30]
```

The wrapper type allows integer values to be stored in a collection.

### Reason 2: Convert text into numbers

Suppose a user enters a mark as text:

```java
String input = "95";
```

The text `"95"` is not the same as the number `95`. You can convert it using:

```java
int marks = Integer.parseInt(input);
```

### Reason 3: Use object-oriented APIs

Some APIs use objects, generics, or methods that primitives do not have. Wrapper classes provide useful methods and constants.

### Reason 4: Represent the absence of a value

A wrapper reference can be `null`, while a primitive variable cannot be `null`.

```java
Integer marks = null;
```

This can represent “marks not supplied yet” in some designs. It must be handled carefully, because unboxing `null` causes a `NullPointerException`.

Do not use `null` as a replacement for every meaningful value. Choose a clear design for missing or optional data.

---

## 6. Creating wrapper objects

Modern Java usually does not require you to explicitly construct wrapper objects.

### 6.1 Using assignment

```java
Integer number = 100;
Double price = 99.5;
Character grade = 'A';
Boolean active = true;
```

Java converts the primitive values to wrapper objects automatically.

### 6.2 Using `valueOf()`

Wrapper classes provide `valueOf()` methods:

```java
Integer a = Integer.valueOf(100);
Double b = Double.valueOf(10.5);
Boolean c = Boolean.valueOf(true);

System.out.println(a);
System.out.println(b);
System.out.println(c);
```

Output:

```text
100
10.5
true
```

`valueOf()` is generally preferred over explicitly constructing wrapper objects.

### 6.3 Avoid wrapper constructors

Older code may contain:

```java
// Deprecated in modern Java and should be avoided:
// Integer number = new Integer(100);
```

Constructors for primitive wrapper classes have been deprecated for removal since Java 9. Prefer autoboxing or `valueOf()`.

For example:

```java
Integer first = 100;
Integer second = Integer.valueOf(200);
```

Both are valid modern approaches.

---

## 7. Autoboxing

**Autoboxing** is Java's automatic conversion from a primitive value to its corresponding wrapper object.

Example:

```java
int number = 50;
Integer object = number;
```

Conceptually, Java performs a conversion similar to:

```java
Integer object = Integer.valueOf(number);
```

This is a conceptual explanation of the conversion, not a requirement that the compiler produce exactly that source code.

### Example

```java
public class Main {
    public static void main(String[] args) {
        int a = 10;
        Integer b = a;

        System.out.println(a);
        System.out.println(b);
    }
}
```

Output:

```text
10
10
```

The primitive value is boxed into an `Integer` object.

### Autoboxing in a collection

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();

        numbers.add(10); // int is autoboxed to Integer
        numbers.add(20);
        numbers.add(30);

        System.out.println(numbers);
    }
}
```

The `add()` method expects an `Integer`, but you can pass an `int` because Java performs autoboxing.

---

## 8. Unboxing

**Unboxing** is the automatic conversion from a wrapper object to its corresponding primitive value.

```java
Integer object = 50;
int number = object;
```

Conceptually, Java calls a method similar to:

```java
int number = object.intValue();
```

### Example

```java
public class Main {
    public static void main(String[] args) {
        Integer a = 25;
        int b = a;

        System.out.println(a);
        System.out.println(b);
        System.out.println(b + 5);
    }
}
```

Output:

```text
25
25
30
```

The wrapper value is unboxed when assigned to the primitive variable.

### Unboxing during calculations

```java
Integer x = 10;
Integer y = 20;

int sum = x + y;
System.out.println(sum);
```

Output:

```text
30
```

Java unboxes `x` and `y`, performs primitive integer addition, and assigns the result to `sum`.

### Important warning: unboxing `null`

```java
Integer value = null;
int number = value; // Throws NullPointerException
```

Java cannot extract a primitive `int` value from `null`.

A safer approach is to check first:

```java
Integer value = null;

if (value != null) {
    int number = value;
    System.out.println(number);
} else {
    System.out.println("No value available.");
}
```

Output:

```text
No value available.
```

---

## 9. Autoboxing and unboxing together

Java can perform both conversions in a single expression.

```java
public class Main {
    public static void main(String[] args) {
        Integer number = 10; // Autoboxing
        number = number + 5; // Unboxing, addition, then autoboxing

        System.out.println(number);
    }
}
```

Output:

```text
15
```

The second line works conceptually like this:

1. Unbox `number` to an `int`.
2. Add `5`.
3. Box the result into an `Integer`.
4. Assign the new wrapper reference to `number`.

This is convenient, but repeated boxing and unboxing can add overhead in performance-sensitive code. For heavy numerical calculations, primitive types are often the better choice.

---

## 10. Converting a `String` to a primitive value

A common use of wrapper classes is parsing text entered by a user or read from a file.

### 10.1 Convert a string to `int`

```java
public class Main {
    public static void main(String[] args) {
        String text = "123";
        int number = Integer.parseInt(text);

        System.out.println(number + 10);
    }
}
```

Output:

```text
133
```

`Integer.parseInt()` returns a primitive `int`.

### 10.2 Convert a string to `double`

```java
String text = "45.75";
double value = Double.parseDouble(text);

System.out.println(value + 1.25);
```

Output:

```text
47.0
```

### 10.3 Other parsing methods

| Method | Return type | Example |
|---|---|---|
| `Byte.parseByte(text)` | `byte` | `Byte.parseByte("12")` |
| `Short.parseShort(text)` | `short` | `Short.parseShort("120")` |
| `Integer.parseInt(text)` | `int` | `Integer.parseInt("500")` |
| `Long.parseLong(text)` | `long` | `Long.parseLong("5000")` |
| `Float.parseFloat(text)` | `float` | `Float.parseFloat("2.5")` |
| `Double.parseDouble(text)` | `double` | `Double.parseDouble("2.5")` |
| `Boolean.parseBoolean(text)` | `boolean` | `Boolean.parseBoolean("true")` |

For `char`, there is no `Character.parseCharacter()` method. You can retrieve a character from a string after checking that it contains one:

```java
String text = "A";

if (!text.isEmpty()) {
    char ch = text.charAt(0);
    System.out.println(ch);
}
```

Output:

```text
A
```

This reads the first UTF-16 code unit. A supplementary Unicode character may require more than one `char`.

### Invalid numeric input

```java
int number = Integer.parseInt("hello");
```

This throws `NumberFormatException`, because `"hello"` is not a valid decimal integer representation.

The same problem can happen with out-of-range input:

```java
// Integer.parseInt("999999999999999999999");
```

The number is too large for the `int` range.

---

## 11. Handling invalid input with `NumberFormatException`

If a string comes from a user, file, or network, do not assume it is a valid number.

```java
public class Main {
    public static void main(String[] args) {
        String input = "95";

        try {
            int marks = Integer.parseInt(input);
            System.out.println("Marks: " + marks);
        } catch (NumberFormatException e) {
            System.out.println("Please enter a valid whole number.");
        }
    }
}
```

Output:

```text
Marks: 95
```

If `input` were `"ninety-five"`, the `catch` block would run instead.

### Practical input validation

```java
public static Integer parseMarks(String input) {
    try {
        int marks = Integer.parseInt(input);

        if (marks < 0 || marks > 100) {
            return null;
        }

        return marks;
    } catch (NumberFormatException e) {
        return null;
    }
}
```

This method returns `null` when the text is invalid or the number is outside the accepted range. It is a simple demonstration, but returning `null` can be ambiguous. A larger application might use a result type, an exception, or a separate validation message.

Also note that `Integer.parseInt()` does not automatically remove whitespace. If the input may contain spaces, you can use `input.trim()` or `input.strip()` before parsing, after checking for `null`.

---

## 12. Converting a `String` to a wrapper object

`parseInt()` returns a primitive `int`. `valueOf()` can return an `Integer` object.

```java
public class Main {
    public static void main(String[] args) {
        String text = "250";

        int primitive = Integer.parseInt(text);
        Integer wrapper = Integer.valueOf(text);

        System.out.println(primitive);
        System.out.println(wrapper);
    }
}
```

Output:

```text
250
250
```

The printed results look the same, but the variable types are different.

- `Integer.parseInt(text)` returns `int`.
- `Integer.valueOf(text)` returns `Integer`.

`valueOf()` may reuse cached wrapper instances for some values, so do not rely on it always creating a new object.

---

## 13. Converting numbers to strings

Wrapper classes provide methods for converting numbers into text.

### 13.1 Using `toString()`

```java
int number = 100;
String text = Integer.toString(number);

System.out.println(text);
System.out.println(text + 50);
```

Output:

```text
100
10050
```

The second line performs string concatenation because `text` is a `String`.

### 13.2 Using `String.valueOf()`

```java
double price = 99.5;
String text = String.valueOf(price);

System.out.println(text);
```

Output:

```text
99.5
```

`String.valueOf()` has overloads for many primitive types and objects.

### 13.3 Using a wrapper's `toString()`

```java
Integer number = 250;
String text = number.toString();

System.out.println(text);
```

Output:

```text
250
```

Calling `toString()` on a `null` reference throws `NullPointerException`. For an object that may be `null`, check it first or use an appropriate safe conversion strategy.

### 13.4 String concatenation

```java
int age = 21;
String message = "Age: " + age;

System.out.println(message);
```

Output:

```text
Age: 21
```

The `+` operator converts the numeric value to text as part of string concatenation. You do not need to call `Integer.toString()` for every simple concatenation.

---

## 14. Useful methods of `Integer`

`Integer` has many static methods and constants.

### 14.1 `parseInt()`

Converts numeric text to primitive `int`.

```java
int value = Integer.parseInt("123");
```

### 14.2 `valueOf()`

Converts text or a primitive value into an `Integer` wrapper.

```java
Integer a = Integer.valueOf("123");
Integer b = Integer.valueOf(123);
```

### 14.3 `compare()`

Compares two primitive integer values:

```java
System.out.println(Integer.compare(10, 20));
System.out.println(Integer.compare(20, 20));
System.out.println(Integer.compare(30, 20));
```

Output:

```text
-1
0
1
```

The result is negative if the first value is smaller, zero if equal, and positive if larger. Do not depend on the result being exactly `-1` or `1` in every comparison API unless its contract explicitly promises that.

### 14.4 `max()` and `min()`

```java
System.out.println(Integer.max(10, 20));
System.out.println(Integer.min(10, 20));
```

Output:

```text
20
10
```

### 14.5 `sum()`

```java
System.out.println(Integer.sum(10, 20));
```

Output:

```text
30
```

### 14.6 `toBinaryString()`

```java
System.out.println(Integer.toBinaryString(10));
```

Output:

```text
1010
```

This represents the integer in binary notation.

### 14.7 `toHexString()`

```java
System.out.println(Integer.toHexString(255));
```

Output:

```text
ff
```

### 14.8 `toString()` with a radix

```java
System.out.println(Integer.toString(10, 2));
System.out.println(Integer.toString(10, 8));
System.out.println(Integer.toString(10, 16));
```

Output:

```text
1010
12
a
```

The radix is the base used to represent the number. Common values are `2` for binary, `8` for octal, `10` for decimal, and `16` for hexadecimal.

### 14.9 Range constants

```java
System.out.println(Integer.MIN_VALUE);
System.out.println(Integer.MAX_VALUE);
```

Output:

```text
-2147483648
2147483647
```

These are the smallest and largest values representable by a Java `int`.

---

## 15. Useful methods of `Character`

The `Character` wrapper provides methods for examining and converting `char` values.

```java
public class Main {
    public static void main(String[] args) {
        char ch = 'A';

        System.out.println(Character.isLetter(ch));
        System.out.println(Character.isDigit(ch));
        System.out.println(Character.isUpperCase(ch));
        System.out.println(Character.toLowerCase(ch));
    }
}
```

Output:

```text
true
false
true
a
```

Common methods:

| Method | Purpose |
|---|---|
| `Character.isLetter(ch)` | Checks whether the character is a letter |
| `Character.isDigit(ch)` | Checks whether it is a digit |
| `Character.isWhitespace(ch)` | Checks whether it is whitespace |
| `Character.isUpperCase(ch)` | Checks whether it is uppercase |
| `Character.isLowerCase(ch)` | Checks whether it is lowercase |
| `Character.toUpperCase(ch)` | Converts to uppercase where supported |
| `Character.toLowerCase(ch)` | Converts to lowercase where supported |

These methods operate on a `char` (one UTF-16 code unit). Some Unicode characters are represented by a pair of `char` values, so `Character` methods that accept a single `char` cannot represent every Unicode code point by themselves. Java also provides overloads that accept an `int` code point.

---

## 16. Useful methods of `Boolean`

`Boolean` represents `true` or `false` as an object.

```java
Boolean active = Boolean.valueOf("true");
Boolean enabled = Boolean.valueOf("not-true");

System.out.println(active);
System.out.println(enabled);
```

Output:

```text
true
false
```

`Boolean.parseBoolean(text)` and `Boolean.valueOf(text)` treat the string `"true"` case-insensitively as true. Other strings, including `"yes"` and `"1"`, produce false. If your application accepts values such as `"yes"` or `"1"`, define that validation explicitly instead of relying on `parseBoolean()`.

### Important warning

```java
Boolean flag = null;
```

`Boolean` can be `null`, but primitive `boolean` cannot. Unboxing this null reference causes a `NullPointerException`.

---

## 17. Wrapper classes are immutable

Wrapper objects are **immutable**, which means their represented values cannot be changed after the object is created.

Example:

```java
Integer number = 10;
number = 20;

System.out.println(number);
```

Output:

```text
20
```

This does not change the original `Integer` object from `10` to `20`. Instead, the variable `number` is assigned a reference to an `Integer` representing `20`.

A similar idea applies to `String`: changing the variable's value to refer to another object is different from modifying the original object.

### Why immutability is useful

- Wrapper values cannot be unexpectedly modified through another reference.
- They are suitable for use as keys in maps when used correctly.
- Their behavior is easier to reason about in many APIs.

---

## 18. Comparing wrapper objects: `==` versus `equals()`

This is one of the most important wrapper-class topics.

### 18.1 Using `==`

For reference types, `==` checks whether two references point to the same object, not whether their represented values are equal.

```java
Integer a = new Integer(100); // Avoid: constructor is deprecated
Integer b = new Integer(100); // Avoid: constructor is deprecated

System.out.println(a == b);
System.out.println(a.equals(b));
```

Conceptually, this demonstrates two different objects representing the same value. In modern Java, do not use the deprecated constructors in real code. A safe modern version of the example is:

```java
Integer a = Integer.valueOf(1000);
Integer b = Integer.valueOf(1000);

System.out.println(a == b);
System.out.println(a.equals(b));
```

Output for the `1000` example:

```text
false
true
```

The `==` result is false for this example because these values are outside the guaranteed small `Integer` cache range. `equals()` compares the represented integer values.

### 18.2 Wrapper caching

Java guarantees that boxing certain constant values will reuse identical wrapper instances in specified ranges. For `Integer`, the guaranteed range includes `-128` through `127`.

```java
Integer a = 100;
Integer b = 100;

System.out.println(a == b);
System.out.println(a.equals(b));
```

Output:

```text
true
true
```

For values outside the guaranteed cache range, do not rely on `==` to compare values. An implementation may cache more values, so the behavior of `==` outside the guaranteed range should not be used for value comparison.

### Rule to remember

Use `equals()` when comparing wrapper values:

```java
Integer a = 1000;
Integer b = 1000;

System.out.println(a.equals(b));
```

Output:

```text
true
```

If either reference might be `null`, check for `null` first or use `Objects.equals(a, b)`:

```java
import java.util.Objects;

Integer a = null;
Integer b = null;

System.out.println(Objects.equals(a, b));
```

Output:

```text
true
```

`Objects.equals()` returns true when both references are null, false when only one is null, and otherwise calls `equals()`.

---

## 19. Wrapper classes and collections

Collections such as `ArrayList`, `HashSet`, and `HashMap` use reference types for their generic type arguments.

### 19.1 `ArrayList<Integer>`

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> marks = new ArrayList<>();

        marks.add(80);
        marks.add(90);
        marks.add(75);

        int total = 0;

        for (Integer mark : marks) {
            total += mark; // Unboxing
        }

        System.out.println("Marks: " + marks);
        System.out.println("Total: " + total);
    }
}
```

Output:

```text
Marks: [80, 90, 75]
Total: 245
```

`marks.add(80)` autoboxes the `int` value into an `Integer`. In `total += mark`, the wrapper is unboxed for arithmetic.

### 19.2 Why can `null` be dangerous in a collection?

```java
ArrayList<Integer> numbers = new ArrayList<>();
numbers.add(10);
numbers.add(null);
```

This collection can contain `null`, but the following loop can fail:

```java
int total = 0;
for (Integer number : numbers) {
    total += number; // NullPointerException when number is null
}
```

Before unboxing values, decide how missing values should be handled. You might reject nulls, skip them, or treat them as a specific business value—but do so intentionally.

---

## 20. Wrapper classes and `HashMap`

Wrapper classes are often used as keys or values in maps.

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> students = new HashMap<>();

        students.put(101, "Aarav");
        students.put(102, "Meera");

        System.out.println(students.get(101));
        System.out.println(students.get(102));
    }
}
```

Output:

```text
Aarav
Meera
```

The integer IDs are autoboxed to `Integer`. Wrapper classes are immutable, and their equality and hash-code behavior is based on their represented values, making them suitable for common map keys.

A missing key typically produces `null` from `get()`. Be careful when a map value is itself a wrapper type, because `null` could mean either “no mapping” or a mapped null value depending on how the map is used.

---

## 21. `null` wrapper references and safe code

Unlike primitives, wrapper references can be null.

```java
Integer age = null;
```

This may be useful when a value is optional or has not yet been provided. But it can also cause errors if treated like a normal number.

### Unsafe code

```java
Integer age = null;
System.out.println(age + 1); // NullPointerException
```

The addition requires unboxing, and null cannot be unboxed.

### Safe check

```java
Integer age = null;

if (age != null) {
    System.out.println(age + 1);
} else {
    System.out.println("Age is not available.");
}
```

Output:

```text
Age is not available.
```

### Use a default only when it makes sense

```java
Integer age = null;
int safeAge = (age != null) ? age : 0;
```

This avoids unboxing null, but `0` is a correct default only if your application's meaning allows it. Do not replace missing data with zero automatically if zero and “unknown” have different meanings.

---

## 22. Wrapper classes versus primitives

| Feature | Primitive | Wrapper |
|---|---|---|
| Example | `int x = 10;` | `Integer x = 10;` |
| Stores a simple value directly | Yes | The variable holds a reference to an object |
| Can be `null` | No | Yes |
| Can be a generic type argument | No | Yes |
| Has wrapper methods | No | Yes |
| Suitable for basic arithmetic | Yes | Yes, with unboxing and boxing as needed |
| Object overhead | Generally lower | Generally higher |
| Can represent missing value directly | No | Yes, with `null` |

### Which one should you use?

Use primitives such as `int`, `double`, and `boolean` for ordinary calculations and values that must always be present.

Use wrapper types when an API requires an object, when using generics or collections, or when a meaningful design requires an absent value. Do not choose wrapper classes automatically for every variable.

---

## 23. Numeric limits and overflow

Wrapper classes expose constants that describe the ranges of their primitive types.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Byte.MIN_VALUE);
        System.out.println(Byte.MAX_VALUE);

        System.out.println(Integer.MIN_VALUE);
        System.out.println(Integer.MAX_VALUE);

        System.out.println(Long.MIN_VALUE);
        System.out.println(Long.MAX_VALUE);
    }
}
```

Output:

```text
-128
127
-2147483648
2147483647
-9223372036854775808
9223372036854775807
```

An `Integer` represents a 32-bit signed integer, whose range is from `-2^31` to `2^31 - 1`.

If integer arithmetic goes beyond the representable range, ordinary Java integer arithmetic wraps around rather than automatically throwing an overflow exception.

```java
int value = Integer.MAX_VALUE;
System.out.println(value + 1);
```

Output:

```text
-2147483648
```

This is integer overflow. If overflow must be detected, methods such as `Math.addExact()` can throw `ArithmeticException` when the result is outside the `int` or `long` range:

```java
int result = Math.addExact(Integer.MAX_VALUE, 1);
```

This throws `ArithmeticException`.

---

## 24. `Float` and `Double`: special values

Floating-point wrapper classes represent decimal-style numerical values, including some special values.

```java
System.out.println(Double.POSITIVE_INFINITY);
System.out.println(Double.NEGATIVE_INFINITY);
System.out.println(Double.NaN);
```

Typical output:

```text
Infinity
-Infinity
NaN
```

`NaN` means “Not a Number.” It can appear as the result of some undefined floating-point operations, such as `0.0 / 0.0`.

```java
double result = 0.0 / 0.0;
System.out.println(Double.isNaN(result));
```

Output:

```text
true
```

To check special values, use methods such as `Double.isNaN()` and `Double.isInfinite()`. Floating-point values also have precision limitations, so `double` should not be assumed to represent every decimal amount exactly. For financial calculations requiring decimal arithmetic, `BigDecimal` may be more appropriate.

---

## 25. Common mistakes

### Mistake 1: Using a primitive as a generic type

```java
// Invalid:
// ArrayList<int> numbers = new ArrayList<>();
```

Correct:

```java
ArrayList<Integer> numbers = new ArrayList<>();
```

### Mistake 2: Confusing parsing with conversion to a wrapper

```java
int a = Integer.parseInt("10");
Integer b = Integer.valueOf("10");
```

The first returns `int`; the second returns `Integer`.

### Mistake 3: Comparing wrappers with `==`

```java
Integer a = 1000;
Integer b = 1000;
System.out.println(a == b); // Do not use this for value comparison
```

Prefer `a.equals(b)` after handling possible nulls, or `Objects.equals(a, b)`.

### Mistake 4: Unboxing null

```java
Integer number = null;
int value = number; // NullPointerException
```

Check for null before unboxing.

### Mistake 5: Parsing invalid text without handling errors

```java
int value = Integer.parseInt("abc");
```

This throws `NumberFormatException`. Validate or catch the exception when input is not guaranteed to be numeric.

### Mistake 6: Assuming `Boolean.parseBoolean()` validates all words

```java
System.out.println(Boolean.parseBoolean("yes"));
```

Output:

```text
false
```

Only `"true"` (case-insensitive) produces true; other strings produce false.

### Mistake 7: Constructing wrapper objects with deprecated constructors

Avoid `new Integer(10)`. Use autoboxing or `Integer.valueOf(10)`.

### Mistake 8: Using wrappers for all numerical calculations without reason

Wrappers are useful, but primitives are generally simpler and more efficient for basic calculations when a nullable or object value is not needed.

---

## 26. Practical program: calculate the average of marks

This example uses `ArrayList<Integer>`, autoboxing, unboxing, and a wrapper constant.

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> marks = new ArrayList<>();

        marks.add(80);
        marks.add(90);
        marks.add(75);
        marks.add(85);

        int total = 0;

        for (Integer mark : marks) {
            total += mark;
        }

        double average = (double) total / marks.size();

        System.out.println("Marks: " + marks);
        System.out.println("Total: " + total);
        System.out.println("Average: " + average);
    }
}
```

Output:

```text
Marks: [80, 90, 75, 85]
Total: 330
Average: 82.5
```

### Explanation

- The collection stores `Integer` objects because generic collections cannot use primitive `int` as their type argument.
- `marks.add(80)` uses autoboxing.
- `total += mark` uses unboxing.
- `(double) total` ensures floating-point division rather than integer division.
- The list is not empty, so dividing by `marks.size()` is safe in this example. In a reusable method, check for an empty list first.

---

## 27. Practical program: parse marks entered as strings

```java
public class Main {
    public static void main(String[] args) {
        String[] inputs = {"90", "75", "abc", "110", "60"};

        for (String input : inputs) {
            try {
                int marks = Integer.parseInt(input);

                if (marks < 0 || marks > 100) {
                    System.out.println(input + " -> Marks must be from 0 to 100.");
                } else {
                    System.out.println(input + " -> Valid marks: " + marks);
                }
            } catch (NumberFormatException e) {
                System.out.println(input + " -> Not a valid whole number.");
            }
        }
    }
}
```

Output:

```text
90 -> Valid marks: 90
75 -> Valid marks: 75
abc -> Not a valid whole number.
110 -> Marks must be from 0 to 100.
60 -> Valid marks: 60
```

This separates two types of validation:

1. **Parsing validation:** Is the text a valid integer?
2. **Business validation:** Is the integer within the allowed range?

A number can parse successfully and still be invalid for your application's rules.

---

## 28. Practical program: count even and odd numbers

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(15);
        numbers.add(20);
        numbers.add(25);
        numbers.add(30);

        int evenCount = 0;
        int oddCount = 0;

        for (Integer number : numbers) {
            if (number % 2 == 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }

        System.out.println("Even numbers: " + evenCount);
        System.out.println("Odd numbers: " + oddCount);
    }
}
```

Output:

```text
Even numbers: 3
Odd numbers: 2
```

This program demonstrates wrappers in a collection and automatic unboxing in the modulo expression.

---

## 29. Output-based questions

Try each question first, then compare your answer.

### Question 1

```java
int a = 10;
Integer b = a;
System.out.println(b);
```

**Answer:**

```text
10
```

`a` is autoboxed into an `Integer`.

### Question 2

```java
Integer a = 20;
int b = a;
System.out.println(b + 5);
```

**Answer:**

```text
25
```

`a` is unboxed before addition.

### Question 3

```java
String text = "123";
int number = Integer.parseInt(text);
System.out.println(number + 7);
```

**Answer:**

```text
130
```

The string is parsed into an integer before addition.

### Question 4

```java
String text = "123";
System.out.println(text + 7);
```

**Answer:**

```text
1237
```

Both operands participate in string concatenation because the left operand is a string.

### Question 5

```java
Integer number = null;
System.out.println(number);
```

**Answer:**

```text
null
```

Printing a null reference with `println(Object)` displays `null`. This is different from unboxing it, which would throw `NullPointerException`.

### Question 6

```java
Integer number = null;
int value = number;
```

**Answer:** It throws `NullPointerException` during unboxing.

### Question 7

```java
System.out.println(Integer.parseInt("42"));
```

**Answer:**

```text
42
```

### Question 8

```java
System.out.println(Boolean.parseBoolean("yes"));
```

**Answer:**

```text
false
```

`parseBoolean()` returns true only for `"true"` ignoring case.

### Question 9

```java
Integer a = 1000;
Integer b = 1000;

System.out.println(a.equals(b));
```

**Answer:**

```text
true
```

`equals()` compares the represented values.

### Question 10

```java
System.out.println(Integer.toBinaryString(12));
```

**Answer:**

```text
1100
```

### Question 11

```java
System.out.println(Integer.MAX_VALUE);
```

**Answer:**

```text
2147483647
```

### Question 12

```java
int x = Integer.MAX_VALUE;
System.out.println(x + 1);
```

**Answer:**

```text
-2147483648
```

Ordinary `int` arithmetic overflows and wraps around.

---

## 30. Interview questions and answers

**1. What is a wrapper class in Java?**

A wrapper class represents a primitive value as an object. For example, `Integer` wraps an `int` value.

**2. Name all eight wrapper classes.**

`Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character`, and `Boolean`.

**3. Why are wrapper classes needed?**

They allow primitive values to be used in APIs that require objects, including generic collections, and provide conversion methods and constants.

**4. What is autoboxing?**

Autoboxing is Java's automatic conversion from a primitive value to its corresponding wrapper object, such as `int` to `Integer`.

**5. What is unboxing?**

Unboxing is automatic conversion from a wrapper object to its primitive value, such as `Integer` to `int`.

**6. What is the difference between `parseInt()` and `valueOf()`?**

`Integer.parseInt()` returns a primitive `int`. `Integer.valueOf()` returns an `Integer` wrapper object.

**7. What happens when `Integer.parseInt("abc")` is executed?**

It throws `NumberFormatException`, because the string is not a valid integer representation.

**8. Can a wrapper object be null?**

Yes. Wrapper variables are references, so they can be `null`. Unboxing a null wrapper throws `NullPointerException`.

**9. What is the difference between `==` and `equals()` for wrappers?**

For references, `==` checks object identity. `equals()` compares the represented values for standard primitive wrapper classes.

**10. Why can `Integer a = 100; Integer b = 100; a == b` be true?**

Java guarantees caching for boxed integer constants in the range `-128` through `127`, so the references can refer to the same cached object. Do not use `==` for value comparison.

**11. Are wrapper classes mutable?**

No. Standard primitive wrapper classes are immutable. A variable can be assigned a different wrapper reference, but the value represented by an existing wrapper object does not change.

**12. Can `ArrayList<int>` be used?**

No. Generic type arguments must be reference types. Use `ArrayList<Integer>`.

**13. What does `Integer.MAX_VALUE` represent?**

It represents the largest value that a Java `int` can store: `2147483647`.

**14. What is the result of `Boolean.parseBoolean("yes")`?**

It returns `false`. The method treats only `"true"` (ignoring case) as true.

**15. What is the main performance difference between primitives and wrappers?**

Primitives generally have less overhead and are efficient for calculations. Wrappers are objects and may require boxing/unboxing and additional memory.

**16. Why should wrapper constructors be avoided?**

Constructors such as `new Integer(10)` have been deprecated for removal. Prefer autoboxing or `Integer.valueOf(10)`.

**17. Can wrapper classes be used as keys in a `HashMap`?**

Yes. Wrapper classes have value-based `equals()` and `hashCode()` implementations and are immutable, making them suitable for common map keys.

**18. How do you safely compare possibly null wrapper references?**

Use `Objects.equals(a, b)` or explicitly check for `null` before calling an instance method.

---

## 31. Practice exercises

Complete these exercises without copying the earlier examples directly.

1. Declare one variable of each of the eight wrapper classes and print its value.
2. Create an `Integer` from a primitive `int` using autoboxing, then assign it to a primitive variable.
3. Convert the strings `"25"`, `"3.5"`, and `"true"` into suitable primitive values.
4. Try parsing `"hello"` as an integer and handle the resulting exception.
5. Convert an `int`, `double`, and `boolean` into strings.
6. Use `Integer.max()` and `Integer.min()` to find the larger and smaller of two values.
7. Print the binary and hexadecimal representations of an integer.
8. Use `Character` methods to count uppercase letters, lowercase letters, digits, and whitespace in a string.
9. Store marks in an `ArrayList<Integer>` and calculate their sum and average.
10. Write a method that validates a mark from 0 to 100 and reports invalid text separately from an out-of-range number.
11. Compare two `Integer` values correctly, including a case where one reference may be null.
12. Demonstrate what happens when a null `Integer` is unboxed, then fix the program.
13. Print the minimum and maximum values of `Byte`, `Short`, `Integer`, and `Long`.
14. Demonstrate integer overflow and then use `Math.addExact()` to detect it.
15. Create a `HashMap<Integer, String>` to map student IDs to student names.

---

## 32. Mini-project: Marks Analyzer

Create a console application that receives marks as strings and analyzes them.

### Requirements

1. Store the input marks in an array of strings, or read them from the keyboard.
2. Convert each valid input with `Integer.parseInt()`.
3. Accept only values from 0 to 100.
4. Display invalid numeric text separately from out-of-range values.
5. Store valid marks in an `ArrayList<Integer>`.
6. Calculate the total, average, highest mark, and lowest mark.
7. Count how many marks are passing and failing using a pass threshold you define.
8. Handle the case where no valid marks were entered.
9. Print the results in a clear format.

### Suggested design

```java
static Integer parseValidMark(String input) {
    // Parse the text.
    // Check the permitted range.
    // Return a valid mark, or use a clearer validation result design.
    return null;
}

static void displaySummary(/* choose suitable parameters */) {
    // Display total, average, highest, and lowest.
}
```

The method above is only a starting outline. Decide how you want to distinguish invalid text from a valid but out-of-range number. For a small exercise, separate validation messages may be enough; a larger program can use a dedicated result class.

### Extension challenges

- Sort the valid marks.
- Display a frequency count for each mark.
- Map student names to marks using `HashMap<String, Integer>`.
- Save the summary to a file using the file-handling techniques from Chapter 26.
- Add tests for empty input, invalid text, negative values, values above 100, and valid boundary values `0` and `100`.

---

## 33. Revision checklist

Before moving to the next chapter, make sure you can:

- [ ] Name the eight primitive types and their wrapper classes.
- [ ] Explain why generic collections use wrapper types.
- [ ] Explain autoboxing and unboxing.
- [ ] Convert strings to numeric primitives and wrapper objects.
- [ ] Convert numeric values into strings.
- [ ] Handle `NumberFormatException`.
- [ ] Explain `Integer.parseInt()` versus `Integer.valueOf()`.
- [ ] Use common `Integer`, `Character`, and `Boolean` methods.
- [ ] Explain immutability and wrapper caching.
- [ ] Compare wrapper values using `equals()` or `Objects.equals()`.
- [ ] Avoid unboxing a null wrapper reference.
- [ ] Use wrapper classes in lists and maps.
- [ ] Understand numeric limits and integer overflow.
- [ ] Complete the Marks Analyzer mini-project.

---

## 34. Final summary

Wrapper classes let Java represent primitive values as objects. The eight wrappers are `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character`, and `Boolean`.

Autoboxing converts a primitive into a wrapper automatically; unboxing converts a wrapper into a primitive. Wrapper types are important in collections and generic APIs, and their methods help with parsing, comparison, and conversion. Use `Integer.parseInt()` when you need a primitive `int`, and `Integer.valueOf()` when you need an `Integer` object.

Remember the main safety rules: handle invalid numeric text, check for null before unboxing, and use `equals()` rather than `==` to compare wrapper values. Prefer primitives for ordinary calculations unless an object or nullable value is needed.

**Next chapter: Chapter 28 — Enums.**
