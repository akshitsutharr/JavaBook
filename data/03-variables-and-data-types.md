# Chapter 3 — Variables & Data Types

> **Goal of this chapter:** Understand how Java stores and works with data. By the end, you should be comfortable creating variables, choosing the correct data type, assigning values, reading values, performing basic conversions, and understanding the difference between primitive values and references.
>
> This chapter is the foundation for almost every Java program you will write later.

---

# 1. Why Do We Need Variables?

A program usually needs to work with data.

For example, a student-management program may need:

```text
Student name
Student age
Student marks
Student grade
Student attendance
```

A banking application may need:

```text
Account number
Balance
Customer name
Transaction amount
```

A game may need:

```text
Player health
Player score
Player level
Player name
```

We need a way to store these values while the program is running.

That is where **variables** come in.

A variable is a named storage location used by a program to hold a value.

A simple example:

```java
int age = 20;
```

We can think of it as:

```text
age
 ↓
20
```

The name `age` gives us a way to refer to the value.

---

# 2. A Variable Has a Type, Name, and Value

Consider:

```java
int age = 20;
```

There are three important pieces:

```text
int
 ↓
data type

age
 ↓
variable name

20
 ↓
value
```

So:

```java
int age = 20;
```

means approximately:

> Create a variable named `age` that can store an `int` value, and initially give it the value `20`.

---

# 3. Declaration

When we tell Java that a variable exists, we are declaring it.

Example:

```java
int age;
```

Here:

```text
int
 ↓
type

age
 ↓
variable name
```

No value has been assigned yet.

This is called a **declaration**.

---

# 4. Initialization

Giving a variable its first value is called **initialization**.

Example:

```java
int age = 20;
```

Here the variable is declared and initialized in one statement.

```text
Declaration:
int age;

Initialization:
age = 20;
```

Together:

```java
int age = 20;
```

---

# 5. Assignment

After a variable exists, we can assign another value to it.

Example:

```java
int age = 20;

age = 21;
```

Initially:

```text
age → 20
```

After:

```java
age = 21;
```

the variable contains:

```text
age → 21
```

So remember:

```text
Declaration
    ↓
Create the variable

Initialization
    ↓
Give it its first value

Assignment
    ↓
Give/change its value
```

---

# 6. A Simple Example

```java
public class Main {

    public static void main(String[] args) {

        int age = 20;

        System.out.println(age);

    }
}
```

Output:

```text
20
```

The program:

1. Creates an integer variable named `age`.
2. Stores `20`.
3. Prints the value stored in `age`.

---

# 7. Variables Can Change

The word "variable" is important because the value can normally change.

```java
int score = 100;

System.out.println(score);

score = 150;

System.out.println(score);
```

Output:

```text
100
150
```

The same variable now contains a different value.

---

# 8. The Basic Variable Syntax

The general form is:

```java
dataType variableName = value;
```

Examples:

```java
int age = 20;
double price = 99.99;
char grade = 'A';
boolean passed = true;
```

Visualized:

```text
type       name       value
 ↓          ↓          ↓
int        age        20
double     price      99.99
char       grade      'A'
boolean    passed     true
```

The data type tells Java what kind of value the variable is intended to hold.

---

# 9. Why Does Java Need Data Types?

Suppose you write:

```java
age = 20;
```

Java needs to know what `age` represents.

Is it:

```text
integer?
decimal?
character?
true/false?
object?
text?
```

Java is statically typed, so the type of a variable is known as part of the program's type system.

For example:

```java
int age = 20;
```

tells Java:

> `age` is an integer variable.

This lets the compiler perform type checking.

---

# 10. Java's Two Broad Categories of Types

Java types can broadly be divided into:

```text
Java Types
│
├── Primitive Types
│
└── Reference Types
```

This distinction is extremely important.

Primitive types include:

```text
byte
short
int
long
float
double
char
boolean
```

Reference types include things such as:

```text
Classes
Arrays
Interfaces
Enums
Strings
```

We will first focus on primitive types.

---

# 11. The Eight Primitive Data Types

Java has **8 primitive data types**:

```text
1. byte
2. short
3. int
4. long
5. float
6. double
7. char
8. boolean
```

A useful grouping is:

```text
Integer types:
byte
short
int
long

Floating-point types:
float
double

Character:
char

Boolean:
boolean
```

---

# 12. Integer Data Types

Integer types store whole-number values.

Examples:

```text
-100
-5
0
10
20
100000
```

Java provides:

```text
byte
short
int
long
```

---

# 13. `byte`

`byte` is an 8-bit signed integer type.

Range:

```text
-128 to 127
```

Example:

```java
byte age = 20;
```

Another example:

```java
byte temperature = -10;
```

The value must fit within the range.

This will not be valid:

```java
byte x = 200;
```

because `200` is outside the range of `byte`.

---

# 14. Why Does `byte` Have 256 Possible Values?

An 8-bit value has:

```text
2^8 = 256
```

possible bit patterns.

For Java's signed `byte`, those patterns represent:

```text
-128 through 127
```

which is exactly:

```text
256 values
```

The total number of possible values is:

```text
127 - (-128) + 1
= 256
```

---

# 15. `short`

`short` is a 16-bit signed integer type.

Range:

```text
-32,768 to 32,767
```

Example:

```java
short year = 2026;
```

It can store a larger range than `byte`.

---

# 16. `int`

`int` is a 32-bit signed integer type.

Range:

```text
-2,147,483,648
to
2,147,483,647
```

Example:

```java
int age = 20;
int population = 1000000;
int score = 95;
```

For most ordinary whole-number calculations, `int` is the normal choice.

This is extremely important:

> **When you need a normal integer and do not have a specific reason to use another integer type, `int` is usually the default choice.**

---

# 17. `long`

`long` is a 64-bit signed integer type.

Range:

```text
-9,223,372,036,854,775,808
to
9,223,372,036,854,775,807
```

Example:

```java
long population = 8000000000L;
```

Notice the `L`.

```text
8000000000L
          ↑
          long literal
```

The uppercase `L` is commonly preferred because lowercase `l` can look like the number `1`.

---

# 18. Why Do We Need `long`?

Suppose:

```java
int population = 8000000000;
```

This is invalid because the integer literal is too large for `int`.

Instead:

```java
long population = 8000000000L;
```

works.

A `long` is useful when integer values can exceed the `int` range.

Examples include:

```text
large counters
timestamps
file sizes
large IDs
large calculations
```

The exact appropriate type depends on the application.

---

# 19. Integer Type Comparison

| Type | Size | Approximate signed range |
|---|---:|---:|
| `byte` | 8 bits | -128 to 127 |
| `short` | 16 bits | -32,768 to 32,767 |
| `int` | 32 bits | -2.147 billion to 2.147 billion |
| `long` | 64 bits | about -9.22 quintillion to 9.22 quintillion |

Remember:

```text
byte < short < int < long
```

in terms of storage size and range.

---

# 20. Floating-Point Types

Integer types cannot represent fractional values.

For example:

```java
int price = 99.99;
```

is invalid.

For values containing a fractional part, Java provides:

```text
float
double
```

These are floating-point types.

---

# 21. `float`

`float` is a 32-bit floating-point type.

Example:

```java
float temperature = 36.5f;
```

Notice:

```text
36.5f
    ↑
    float literal
```

The `f` tells Java that the literal is a `float`.

Without the suffix, a decimal floating-point literal such as `36.5` is normally a `double`.

---

# 22. `double`

`double` is a 64-bit floating-point type.

Example:

```java
double price = 99.99;
```

For many ordinary decimal calculations, `double` is the normal floating-point choice.

Example:

```java
double average = 87.75;
```

---

# 23. `float` vs `double`

Simplified:

```text
float
 ↓
32-bit floating point

double
 ↓
64-bit floating point
```

`double` generally provides greater precision and range than `float`.

For normal Java programming, `double` is usually preferred unless you have a reason to use `float`.

---

# 24. Important Warning About Decimal Numbers

Floating-point numbers are not exact representations of every decimal fraction.

For example:

```java
double x = 0.1;
double y = 0.2;

System.out.println(x + y);
```

You might see:

```text
0.30000000000000004
```

rather than exactly:

```text
0.3
```

Why?

Because many decimal fractions cannot be represented exactly in binary floating-point format.

This is important in financial and precision-sensitive software.

For monetary calculations, blindly using `double` is often a bad design.

Java provides `BigDecimal` for decimal arithmetic where exact decimal behavior is required.

---

# 25. `char`

`char` represents a single UTF-16 code unit.

Example:

```java
char grade = 'A';
```

Notice the **single quotes**:

```java
'A'
```

not:

```java
"A"
```

---

# 26. `char` Uses Single Quotes

Correct:

```java
char letter = 'A';
```

Incorrect:

```java
char letter = "A";
```

Why?

Because:

```text
'A'
 ↓
character literal

"A"
 ↓
String literal
```

A `char` stores one UTF-16 code unit, while a `String` represents a sequence of characters/code units.

---

# 27. `char` Can Represent Unicode Characters

Java `char` is not limited to English letters.

Examples:

```java
char letter = 'A';
char symbol = '₹';
```

However, there is an important technical detail:

> A Java `char` is 16 bits and represents a UTF-16 code unit, not necessarily a complete Unicode code point.

Most commonly used characters fit into one `char`.

Some Unicode characters, especially supplementary characters such as many emoji and historic scripts, require a **surrogate pair** — two `char` values.

This distinction becomes useful when working seriously with Unicode and strings.

---

# 28. Character Values Are Numeric Internally

A `char` participates in numeric operations.

Example:

```java
char ch = 'A';

System.out.println(ch);
System.out.println((int) ch);
```

Output:

```text
A
65
```

The character `'A'` has Unicode value `65`.

Similarly:

```java
char ch = 'B';

System.out.println((int) ch);
```

Output:

```text
66
```

This introduces type conversion and casting, which we will study shortly.

---

# 29. `boolean`

`boolean` represents a logical value:

```text
true
false
```

Example:

```java
boolean isStudent = true;
boolean isLoggedIn = false;
```

A boolean variable can only have:

```java
true
```

or:

```java
false
```

---

# 30. Boolean Example

```java
public class Main {

    public static void main(String[] args) {

        boolean isJavaEasy = true;

        System.out.println(isJavaEasy);

    }
}
```

Output:

```text
true
```

Booleans are heavily used in conditions:

```java
boolean isAdult = age >= 18;
```

Then:

```java
if (isAdult) {
    // ...
}
```

Conditions will be covered in a later chapter.

---

# 31. The Eight Primitive Types — Complete View

```text
Primitive Types
│
├── Integer
│   ├── byte
│   ├── short
│   ├── int
│   └── long
│
├── Floating Point
│   ├── float
│   └── double
│
├── Character
│   └── char
│
└── Boolean
    └── boolean
```

This is worth memorizing.

---

# 32. Example Using All Primitive Types

```java
public class Main {

    public static void main(String[] args) {

        byte b = 10;
        short s = 1000;
        int i = 100000;
        long l = 10000000000L;

        float f = 10.5f;
        double d = 99.99;

        char c = 'A';
        boolean flag = true;

        System.out.println(b);
        System.out.println(s);
        System.out.println(i);
        System.out.println(l);
        System.out.println(f);
        System.out.println(d);
        System.out.println(c);
        System.out.println(flag);
    }
}
```

Possible output:

```text
10
1000
100000
10000000000
10.5
99.99
A
true
```

---

# 33. Variable Naming Rules

Java has rules for valid identifiers.

A variable name can contain:

```text
letters
digits
underscore _
dollar sign $
```

But it cannot begin with a digit.

Valid:

```java
int age;
int studentAge;
int age2;
int _value;
```

Invalid:

```java
int 2age;
```

because the identifier begins with a digit.

---

# 34. Java Is Case-Sensitive

These are different:

```java
int age = 20;
int Age = 30;
int AGE = 40;
```

Java treats:

```text
age
Age
AGE
```

as different identifiers.

Do not rely on capitalization to create confusing names.

Good code uses clear and consistent naming.

---

# 35. Keywords Cannot Be Variable Names

Java has reserved keywords.

Examples:

```text
class
public
static
int
double
if
else
for
while
return
new
final
```

You cannot use a keyword as a normal variable name.

Invalid:

```java
int class = 10;
```

because `class` is a Java keyword.

---

# 36. Naming Conventions

Rules and conventions are different.

A rule determines whether code is valid.

A convention is a recommended style.

For variables, Java convention normally uses camelCase:

```java
studentName
totalMarks
accountBalance
numberOfStudents
```

Avoid:

```java
StudentName
TOTALMARKS
student_name
```

unless a specific style requires it.

The conventional Java style is:

```text
camelCase for variables and methods
PascalCase for classes
UPPER_CASE_WITH_UNDERSCORES for constants
```

---

# 37. Multiple Variables

You can declare several variables:

```java
int age = 20;
int marks = 95;
int semester = 4;
```

You can also declare multiple variables of the same type in one statement:

```java
int age = 20, marks = 95, semester = 4;
```

This is valid, but separate declarations are often easier to read.

Prefer readability over saving lines.

---

# 38. Reassigning Variables

Example:

```java
int score = 50;

score = 70;
score = 90;
```

Final value:

```text
90
```

Each assignment replaces the previous value stored in the variable.

---

# 39. Using One Variable in Another Expression

```java
int price = 100;
int quantity = 5;

int total = price * quantity;

System.out.println(total);
```

Output:

```text
500
```

Here:

```text
price = 100
quantity = 5
total = 500
```

Variables allow programs to work with changing data instead of hardcoding every value.

---

# 40. Variable Values Can Come From Other Variables

```java
int a = 10;
int b = a;

System.out.println(b);
```

Output:

```text
10
```

At the time of assignment, the value of `a` is used to initialize `b`.

Then:

```java
a = 20;
```

does not automatically change `b`.

Example:

```java
int a = 10;
int b = a;

a = 20;

System.out.println(a);
System.out.println(b);
```

Output:

```text
20
10
```

This is because `a` and `b` are separate primitive variables.

---

# 41. What Is a Literal?

A literal is a value written directly in source code.

Examples:

```java
10
20L
3.14
3.14f
'A'
true
false
"Hello"
```

These are literal values.

For example:

```java
int age = 20;
```

Here:

```text
20
 ↓
integer literal
```

---

# 42. Integer Literals

Examples:

```java
10
100
-50
0
```

By default, an integer literal without a suffix is generally an `int` if its value fits.

For a `long` literal, use:

```java
100L
```

Example:

```java
long population = 8000000000L;
```

---

# 43. Decimal Literals

A decimal floating-point literal such as:

```java
3.14
```

is a `double` by default.

For `float`:

```java
3.14f
```

Example:

```java
double d = 3.14;
float f = 3.14f;
```

---

# 44. Numeric Separators

Large numbers can be difficult to read:

```java
long population = 8000000000L;
```

Java allows underscores in numeric literals:

```java
long population = 8_000_000_000L;
```

This improves readability.

Output is still:

```text
8000000000
```

The underscores are only part of the source-code representation.

---

# 45. Different Number Bases

Java supports integer literals in different bases.

Decimal:

```java
int decimal = 10;
```

Binary:

```java
int binary = 0b1010;
```

Octal:

```java
int octal = 012;
```

Hexadecimal:

```java
int hexadecimal = 0xA;
```

All represent the value:

```text
10
```

Examples:

```java
System.out.println(0b1010);
System.out.println(012);
System.out.println(0xA);
```

Output:

```text
10
10
10
```

Be careful with leading zeroes because they indicate octal integer literals in Java.

---

# 46. Type Mismatch

Java does not allow arbitrary values to be assigned to incompatible types.

For example:

```java
int age = 20;
```

is valid.

But:

```java
int age = 20.5;
```

is invalid because `20.5` is a `double` literal and cannot be assigned directly to `int`.

Similarly:

```java
boolean flag = 10;
```

is invalid.

A boolean is not a number in Java.

---

# 47. Widening Conversion

Java allows many conversions from a smaller numeric type to a larger compatible numeric type.

For example:

```java
int x = 100;
long y = x;
```

This is allowed.

Conceptually:

```text
int
 ↓
long
```

The destination type can represent all values of the source type.

---

# 48. Numeric Promotion Order

A simplified numeric widening path is:

```text
byte
  ↓
short
  ↓
int
  ↓
long
  ↓
float
  ↓
double
```

There are important details and exceptions, especially around `char`, precision, and expression promotion.

For example:

```text
char → int
```

is allowed numerically.

But do not memorize this as "bigger storage always means more precise". Floating-point types have different representation and precision characteristics.

---

# 49. Widening Example

```java
int age = 20;

long largeAge = age;

System.out.println(largeAge);
```

Output:

```text
20
```

No explicit cast is needed.

Java can perform this conversion automatically.

---

# 50. Narrowing Conversion

The opposite direction can lose information.

Example:

```java
long value = 100;

int x = (int) value;
```

The `(int)` is an explicit cast.

This is called **narrowing conversion**.

Conceptually:

```text
long
 ↓
int
```

The programmer is telling Java:

> I understand that this conversion may lose information; perform it anyway.

---

# 51. Why Is Casting Needed?

Consider:

```java
long value = 100;
int x = value;
```

Java rejects this because a `long` can contain values that an `int` cannot.

For example:

```text
long
8000000000
```

cannot fit inside:

```text
int
```

So Java requires:

```java
int x = (int) value;
```

This tells the compiler that the narrowing conversion is intentional.

---

# 52. Narrowing Can Lose Data

Example:

```java
long value = 3_000_000_000L;

int x = (int) value;

System.out.println(x);
```

The result will not be `3_000_000_000` because that value does not fit in an `int`.

The conversion wraps according to Java's integer representation rules.

The exact result demonstrates why narrowing can be dangerous.

Therefore:

> **Do not cast simply to remove a compiler error. Understand the range and possible data loss first.**

---

# 53. Floating-Point to Integer

Casting a floating-point value to an integer removes the fractional part.

Example:

```java
double price = 99.99;

int value = (int) price;

System.out.println(value);
```

Output:

```text
99
```

It does not round to `100`.

The fractional part is discarded.

Another example:

```java
double x = 12.999;

int y = (int) x;

System.out.println(y);
```

Output:

```text
12
```

---

# 54. Negative Floating-Point Casting

Consider:

```java
double x = -12.9;

int y = (int) x;

System.out.println(y);
```

Output:

```text
-12
```

The conversion truncates toward zero.

It is not the same as mathematical floor.

```text
(int) -12.9
   ↓
-12
```

while:

```text
floor(-12.9)
   ↓
-13
```

These are different operations.

---

# 55. `char` and `int`

A `char` can participate in numeric conversions.

Example:

```java
char ch = 'A';

int value = ch;

System.out.println(value);
```

Output:

```text
65
```

The conversion is widening from `char` to `int`.

The reverse requires casting:

```java
int value = 66;

char ch = (char) value;

System.out.println(ch);
```

Output:

```text
B
```

---

# 56. Arithmetic With Small Integer Types

A common beginner surprise:

```java
byte a = 10;
byte b = 20;

byte c = a + b;
```

This does not compile as written.

Why?

Because Java performs binary numeric promotion for many arithmetic operations, and `byte` values are promoted to `int`.

So:

```java
a + b
```

has type:

```text
int
```

A valid version is:

```java
byte c = (byte) (a + b);
```

if the programmer has verified that the result is safe.

Or more naturally:

```java
int c = a + b;
```

---

# 57. Why Does Java Promote `byte` and `short` to `int`?

Java's arithmetic rules promote smaller integer types during many expressions.

For example:

```java
byte a = 10;
byte b = 20;

int result = a + b;
```

This is valid.

The result is an `int`.

This avoids making the language perform every basic arithmetic operation at a tiny width.

---

# 58. Integer Overflow

What happens when an integer calculation goes beyond the type's range?

Consider:

```java
int x = 2_147_483_647;

x = x + 1;

System.out.println(x);
```

Output:

```text
-2147483648
```

Why?

Because Java's signed integer arithmetic wraps around for ordinary overflow.

The maximum `int` value is:

```text
2,147,483,647
```

Adding one produces the bit pattern corresponding to:

```text
-2,147,483,648
```

This is **integer overflow**.

---

# 59. Overflow Example

```java
int x = 2_147_483_647;

System.out.println(x);
System.out.println(x + 1);
```

Output:

```text
2147483647
-2147483648
```

This can cause serious bugs if not considered.

---

# 60. How to Avoid Integer Overflow

Possible approaches include:

Use a larger type:

```java
long x = 2_147_483_647L;
```

or use appropriate checked arithmetic utilities such as methods in:

```text
Math
```

For example, Java provides:

```java
Math.addExact(...)
```

which throws an exception when the exact result cannot be represented by the target integer type.

Example:

```java
int x = Integer.MAX_VALUE;

int result = Math.addExact(x, 1);
```

This throws an `ArithmeticException` rather than silently wrapping.

---

# 61. Constants With `final`

Sometimes you do not want a variable to be reassigned.

Use:

```java
final
```

Example:

```java
final int DAYS_IN_WEEK = 7;
```

After initialization:

```java
DAYS_IN_WEEK = 8;
```

is not allowed.

A `final` variable can be assigned once according to Java's definite-assignment rules.

---

# 62. Naming Constants

Constants are conventionally written using uppercase letters and underscores:

```java
final int MAX_USERS = 100;
final double PI_VALUE = 3.14159;
```

For compile-time constants, you will often see:

```java
static final
```

for class-level constants:

```java
static final int MAX_USERS = 100;
```

The meaning of `static` will be explained properly in the OOP section.

---

# 63. Variables and Memory — Beginner View

When you write:

```java
int age = 20;
```

you can mentally imagine:

```text
age
 ↓
20
```

For a primitive variable, the variable directly represents a primitive value.

Do not take this diagram as a literal description of every JVM implementation detail.

The Java language specifies behavior and types; actual memory layout is an implementation detail.

Still, this mental model is useful for beginners.

---

# 64. Primitive Variables

Example:

```java
int a = 10;
int b = a;

a = 20;
```

Now:

```text
a → 20
b → 10
```

`b` received the value that `a` had at the time of assignment.

Changing `a` does not change `b`.

---

# 65. Primitive vs Reference — First Preview

Java also has reference types.

For example:

```java
String name = "Rahul";
```

Here `String` is not a primitive type.

It is a reference type.

Later, when we study objects, you will learn that:

```java
Student student = new Student();
```

involves a reference variable referring to an object.

This is very important for OOP.

For now, remember:

```text
Primitive variable
    ↓
stores a primitive value

Reference variable
    ↓
refers to an object/value of a reference type
```

The exact JVM memory layout should not be reduced to simplistic "primitive = stack, object = heap" rules. Java's specification does not define the entire runtime memory layout that way.

---

# 66. Local Variables

A variable declared inside a method is commonly called a **local variable**.

Example:

```java
public static void main(String[] args) {

    int age = 20;

}
```

Here:

```java
age
```

is a local variable.

Its scope is limited to the relevant block.

---

# 67. Local Variable Scope

Example:

```java
public static void main(String[] args) {

    int age = 20;

    System.out.println(age);

}
```

works.

But:

```java
public static void main(String[] args) {

    if (true) {

        int x = 10;

    }

    System.out.println(x);

}
```

does not work because `x` was declared inside the `if` block.

Its scope ended when the block ended.

We will study scope more deeply when we learn conditions and methods.

---

# 68. Local Variables Must Be Initialized

Consider:

```java
public static void main(String[] args) {

    int age;

    System.out.println(age);

}
```

This does not compile.

Why?

Because a local variable must be definitely assigned before it is read.

Correct:

```java
int age;
age = 20;

System.out.println(age);
```

or:

```java
int age = 20;

System.out.println(age);
```

---

# 69. Fields Are Different

Later, inside a class, you may write:

```java
class Student {

    int age;

}
```

Here `age` is an **instance field**, not a local variable.

Fields have default initialization values.

For example, numeric fields are initialized to zero, `boolean` fields to `false`, and reference fields to `null`.

Local variables do not receive these automatic default values.

This difference is extremely important in Java.

---

# 70. Default Values of Fields

For fields:

| Type | Default value |
|---|---|
| `byte` | `0` |
| `short` | `0` |
| `int` | `0` |
| `long` | `0L` |
| `float` | `0.0f` |
| `double` | `0.0d` |
| `char` | `'\u0000'` |
| `boolean` | `false` |
| Reference types | `null` |

Example:

```java
class Student {

    int age;
    boolean active;
    String name;

}
```

Conceptually:

```text
age    → 0
active → false
name   → null
```

Again, this applies to fields, not uninitialized local variables.

---

# 71. `null` — First Introduction

Reference variables can have:

```java
null
```

Example:

```java
String name = null;
```

`null` means that the reference does not currently refer to an object.

It is not:

```text
0
```

and it is not:

```text
"null"
```

These are different.

We will study `null` much more deeply with objects and references.

---

# 72. Type Conversion vs Type Casting

These terms are often used together.

### Type conversion

A value is converted from one compatible type to another.

Example:

```java
int x = 10;
long y = x;
```

Java performs the widening conversion automatically.

### Type casting

The programmer explicitly specifies a conversion using syntax such as:

```java
(int) value
```

Example:

```java
double price = 99.99;
int x = (int) price;
```

So:

```text
Automatic compatible conversion
       ↓
type conversion

Explicit conversion syntax
       ↓
casting
```

---

# 73. Widening vs Narrowing

This is an important exam and interview topic.

## Widening

Smaller compatible numeric type → larger compatible type.

Example:

```java
int x = 10;
long y = x;
```

Usually automatic.

```text
int → long
```

---

## Narrowing

Larger type → smaller type.

Example:

```java
long x = 10;
int y = (int) x;
```

Requires explicit casting.

```text
long → int
```

Potential information loss exists.

---

# 74. A Conversion Example

```java
public class Main {

    public static void main(String[] args) {

        int x = 100;

        long y = x;

        double z = y;

        System.out.println(x);
        System.out.println(y);
        System.out.println(z);

    }
}
```

Output:

```text
100
100
100.0
```

The conversions are:

```text
int
 ↓
long
 ↓
double
```

---

# 75. A Casting Example

```java
public class Main {

    public static void main(String[] args) {

        double price = 99.99;

        int value = (int) price;

        System.out.println(price);
        System.out.println(value);

    }
}
```

Output:

```text
99.99
99
```

The fractional part is lost.

---

# 76. String Is Not a Primitive Type

This is a very important fact.

Java has:

```text
8 primitive types
```

but:

```java
String
```

is not one of them.

Example:

```java
String name = "Rahul";
```

`String` is a class in the Java standard library.

We will study strings in a dedicated chapter.

For now:

```text
Primitive:
int

Reference type:
String
```

---

# 77. Why Is `String` So Special?

Strings are used everywhere:

```java
String name = "Rahul";
String city = "Mumbai";
String message = "Hello";
```

Even though `String` is a reference type, Java gives it special language support.

For example:

```java
String name = "Rahul";

System.out.println(name);
```

and:

```java
String message = "Hello " + name;
```

String operations are common enough that they deserve their own chapter.

---

# 78. Primitive Types Are Not Objects

For example:

```java
int age = 20;
```

`int` is a primitive type.

It is not the same thing as:

```java
Integer age = 20;
```

`Integer` is a wrapper class.

Java provides wrapper classes for primitive types:

```text
byte    → Byte
short   → Short
int     → Integer
long    → Long
float   → Float
double  → Double
char    → Character
boolean → Boolean
```

We will study wrapper classes later.

---

# 79. Autoboxing — First Preview

Java can automatically convert a primitive to its wrapper type in many situations.

Example:

```java
int x = 10;

Integer y = x;
```

This is called **autoboxing**.

The reverse:

```java
Integer y = 10;

int x = y;
```

is called **unboxing**.

Do not worry about the details yet.

They become especially important when working with collections and generics.

---

# 80. `var` — A Modern Java Feature

Modern Java also supports local variable type inference using:

```java
var
```

Example:

```java
var age = 20;
```

The compiler infers:

```text
age → int
```

Another example:

```java
var name = "Rahul";
```

The compiler infers:

```text
name → String
```

Important:

> `var` does not make Java dynamically typed.

The variable still has a compile-time type.

This:

```java
var age = 20;
```

is essentially a convenience for letting the compiler infer the local variable's type.

---

# 81. `var` Is Not Allowed Everywhere

`var` is mainly for local variable declarations where the type can be inferred.

For example:

```java
var age = 20;
```

works.

But you cannot use it as a general replacement for every type declaration.

For example, Java does not allow a field declaration such as:

```java
class Student {

    var age = 20;

}
```

in the ordinary use of local-variable type inference.

For beginners, prefer explicit types until you understand the type system well:

```java
int age = 20;
```

is often clearer.

---

# 82. Type Safety

Java's type system prevents many invalid operations.

For example:

```java
int age = 20;

age = "Hello";
```

is invalid.

Why?

Because:

```text
age
 ↓
int
```

and:

```text
"Hello"
 ↓
String
```

are incompatible types.

The compiler catches this.

This is one reason static typing is useful.

---

# 83. A Useful Mental Model

When you see:

```java
int marks = 90;
```

think:

```text
Variable:
marks

Type:
int

Current value:
90
```

When you see:

```java
double percentage = 87.5;
```

think:

```text
Variable:
percentage

Type:
double

Current value:
87.5
```

When you see:

```java
boolean passed = true;
```

think:

```text
Variable:
passed

Type:
boolean

Current value:
true
```

---

# 84. Choosing the Correct Data Type

Do not choose a type randomly.

Ask:

### Is it a whole number?

Use an integer type:

```text
int
long
```

Usually:

```java
int
```

is enough.

---

### Is it a decimal?

Use:

```text
double
```

in many ordinary cases.

Use `float` when there is a specific reason.

---

### Is it one character?

Use:

```text
char
```

---

### Is it true or false?

Use:

```text
boolean
```

---

### Is it text?

Use:

```text
String
```

---

# 85. Practical Examples

## Age

```java
int age = 20;
```

## Population

```java
long population = 8_000_000_000L;
```

## Price

```java
double price = 499.99;
```

## Temperature

```java
double temperature = 36.5;
```

## Grade

```java
char grade = 'A';
```

## Login status

```java
boolean loggedIn = true;
```

## Name

```java
String name = "Rahul";
```

---

# 86. A Student Example

```java
public class Main {

    public static void main(String[] args) {

        String name = "Rahul";
        int age = 20;
        double marks = 87.5;
        char grade = 'A';
        boolean passed = true;

        System.out.println(name);
        System.out.println(age);
        System.out.println(marks);
        System.out.println(grade);
        System.out.println(passed);

    }
}
```

Output:

```text
Rahul
20
87.5
A
true
```

This small program already uses several Java types.

---

# 87. Combining Text and Variables

You can combine strings and values using `+`.

Example:

```java
String name = "Rahul";
int age = 20;

System.out.println("Name: " + name);
System.out.println("Age: " + age);
```

Output:

```text
Name: Rahul
Age: 20
```

This is called string concatenation.

We will study it properly in the Strings chapter.

---

# 88. A Common Beginner Mistake

Consider:

```java
int age = 20;

System.out.println("Age = " + age + 1);
```

Many beginners expect:

```text
Age = 21
```

But the result is:

```text
Age = 201
```

Why?

Because once a string is involved, `+` can perform string concatenation.

The expression is evaluated left to right:

```text
"Age = " + 20
        ↓
"Age = 20"

"Age = 20" + 1
        ↓
"Age = 201"
```

To perform the arithmetic first:

```java
System.out.println("Age = " + (age + 1));
```

Output:

```text
Age = 21
```

Operators will be covered in detail later.

---

# 89. Another Common Mistake

This is invalid:

```java
int number = null;
```

Why?

Because `int` is a primitive type.

`null` is used with reference types.

For example:

```java
String name = null;
```

is valid.

This distinction will become extremely important when we study objects.

---

# 90. Data Type Summary

```text
byte
 ↓
small integer

short
 ↓
small/medium integer

int
 ↓
normal integer

long
 ↓
large integer

float
 ↓
32-bit floating point

double
 ↓
64-bit floating point

char
 ↓
UTF-16 code unit

boolean
 ↓
true / false

String
 ↓
text; reference type, not primitive
```

---

# 91. Important Range Constants

Java provides useful constants through wrapper classes.

For example:

```java
System.out.println(Integer.MIN_VALUE);
System.out.println(Integer.MAX_VALUE);
```

Output:

```text
-2147483648
2147483647
```

Similarly:

```java
System.out.println(Long.MIN_VALUE);
System.out.println(Long.MAX_VALUE);
```

This is useful when you want to check type limits rather than memorizing every number.

---

# 92. Example: Checking `int` Range

```java
public class Main {

    public static void main(String[] args) {

        System.out.println(Integer.MIN_VALUE);
        System.out.println(Integer.MAX_VALUE);

    }
}
```

Output:

```text
-2147483648
2147483647
```

---

# 93. Why `int` Is Usually the Default Integer

A beginner may think:

> "If `long` can store bigger numbers, I should always use `long`."

Not necessarily.

Use the type that represents your data appropriately.

For ordinary values:

```java
int age = 20;
int marks = 95;
int quantity = 10;
```

are natural.

Using `long` everywhere may communicate the wrong meaning and can affect APIs and arithmetic behavior.

Choose based on requirements.

---

# 94. Why `double` Is Usually Preferred Over `float`

Similarly, a beginner may think:

> "float uses less memory, so I should always use float."

Not necessarily.

`double` usually provides more precision and is the common default for floating-point calculations.

Use `float` when its smaller representation or a particular API/data format makes it appropriate.

---

# 95. A Deeper Point: Type Is Part of the Meaning

Consider:

```java
int age = 20;
```

The type communicates something.

Now:

```java
boolean age = true;
```

does not make semantic sense.

Types help express what kind of data a variable represents.

This is one of the reasons type systems are valuable.

Good type choices make code easier to understand.

---

# 96. Practice Program — Personal Information

Write:

```java
public class Main {

    public static void main(String[] args) {

        String name = "Your Name";
        int age = 20;
        double height = 5.8;
        char grade = 'A';
        boolean student = true;

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height);
        System.out.println("Grade: " + grade);
        System.out.println("Student: " + student);

    }
}
```

Change all values to your own test data.

---

# 97. Practice Program — Product

Create:

```java
String productName = "Laptop";
int quantity = 2;
double price = 55000.50;
boolean available = true;
```

Print:

```text
Product: Laptop
Quantity: 2
Price: 55000.5
Available: true
```

Then calculate the total:

```java
double total = price * quantity;
```

Print it.

This prepares you for operators.

---

# 98. Practice Program — Type Conversion

Try:

```java
public class Main {

    public static void main(String[] args) {

        int number = 100;

        long largeNumber = number;

        double decimalNumber = largeNumber;

        System.out.println(number);
        System.out.println(largeNumber);
        System.out.println(decimalNumber);

    }
}
```

Expected output:

```text
100
100
100.0
```

Then try converting a `double` to an `int`.

```java
double value = 99.99;

int number = (int) value;
```

Observe the result.

---

# 99. Practice Program — Overflow

Try:

```java
public class Main {

    public static void main(String[] args) {

        int x = Integer.MAX_VALUE;

        System.out.println(x);
        System.out.println(x + 1);

    }
}
```

Observe the output.

Then ask yourself:

> Why didn't the result become 2,147,483,648?

The answer is integer overflow.

---

# 100. Practice Questions

## Basic

1. What is a variable?
2. What is a data type?
3. What is declaration?
4. What is initialization?
5. What is assignment?
6. How many primitive data types does Java have?
7. Name all eight primitive types.
8. Which primitive type is normally used for whole numbers?
9. Which primitive type is normally used for decimal values?
10. Which type stores `true` or `false`?
11. Which type stores a character?
12. Is `String` a primitive type?

## Integer Types

13. What is the range of `byte`?
14. What is the range of `short`?
15. What is the range of `int`?
16. Why is `L` used in a large `long` literal?
17. Why can `8000000000` cause a problem when assigned to `int`?
18. Why is `int` normally preferred for ordinary integer calculations?

## Floating Point

19. What is the difference between `float` and `double`?
20. Why does a `float` literal often need `f`?
21. Why can `0.1 + 0.2` produce an unexpected-looking result?
22. Why should `double` not automatically be used for exact monetary calculations?

## Character and Boolean

23. What is a `char`?
24. Why does `char` use single quotes?
25. Is a Java `char` always one complete Unicode character?
26. What values can a boolean contain?

## Conversion

27. What is widening conversion?
28. What is narrowing conversion?
29. Why does narrowing usually require an explicit cast?
30. What happens when a `double` is cast to an `int`?
31. What is integer overflow?
32. How can `Math.addExact()` help detect integer overflow?

## Variables

33. What is a local variable?
34. Why must local variables be initialized before reading them?
35. What are field default values?
36. What is `final`?
37. What does `null` mean?
38. Why can't `int` store `null`?

---

# 101. Interview Questions

### Q1. What are primitive data types in Java?

Java has eight primitive types:

```text
byte
short
int
long
float
double
char
boolean
```

They represent basic values directly in the Java type system.

---

### Q2. Why is `String` not a primitive?

Because `String` is a class/reference type provided by the Java standard library.

It is not one of Java's eight primitive types.

---

### Q3. Why is `int` preferred over `byte` for normal integer arithmetic?

Java's integer arithmetic commonly promotes smaller integer types such as `byte` and `short` to `int`.

`int` is therefore the natural general-purpose integer type for many calculations.

---

### Q4. What is type casting?

Type casting explicitly converts a value to another compatible type.

Example:

```java
double x = 10.5;

int y = (int) x;
```

---

### Q5. What is the difference between widening and narrowing?

```text
Widening:
smaller compatible type → larger compatible type

Narrowing:
larger type → smaller type
```

Widening is generally automatic.

Narrowing normally requires explicit casting and can lose information.

---

# 102. Common Mistakes

## Mistake 1

Using a decimal without the correct type:

```java
int price = 99.99;
```

Wrong.

Use:

```java
double price = 99.99;
```

---

## Mistake 2

Forgetting `L` for a large long literal:

```java
long population = 8000000000;
```

Use:

```java
long population = 8000000000L;
```

---

## Mistake 3

Using double quotes for `char`:

```java
char grade = "A";
```

Wrong.

Use:

```java
char grade = 'A';
```

---

## Mistake 4

Using single quotes for String:

```java
String name = 'Rahul';
```

Wrong.

Use:

```java
String name = "Rahul";
```

---

## Mistake 5

Assuming `int` can hold every integer:

```java
int x = 3000000000;
```

It cannot.

Use an appropriate larger type such as:

```java
long x = 3000000000L;
```

---

## Mistake 6

Casting without thinking:

```java
int x = (int) hugeLongValue;
```

A cast can lose information.

---

## Mistake 7

Assuming `double` is exact for every decimal:

```java
double
```

is binary floating-point, not arbitrary-precision decimal arithmetic.

---

# 103. Final Mental Model

At the end of this chapter, think of Java data like this:

```text
                    JAVA TYPES
                        │
             ┌──────────┴──────────┐
             │                     │
        Primitive              Reference
             │                     │
      ┌──────┼──────┐              │
      │      │      │              │
   Integer Float   char/          String
              boolean             Arrays
                                 Objects
```

Primitive types:

```text
byte
short
int
long
float
double
char
boolean
```

And the basic variable model:

```java
int age = 20;
```

means:

```text
Type
 ↓
int

Name
 ↓
age

Value
 ↓
20
```

---

# 104. Chapter Summary

A variable gives a name to data used by a program.

A variable declaration tells Java its type and name:

```java
int age;
```

Initialization gives it its first value:

```java
age = 20;
```

These can be combined:

```java
int age = 20;
```

Java has eight primitive types:

```text
byte
short
int
long
float
double
char
boolean
```

Integer types:

```text
byte → short → int → long
```

Floating-point types:

```text
float
double
```

`char` represents a UTF-16 code unit.

`boolean` represents:

```text
true
false
```

`String` is a reference type, not a primitive.

Java performs many widening numeric conversions automatically:

```text
int → long
```

Narrowing conversions normally require explicit casts:

```java
int x = (int) someLong;
```

Narrowing can lose information.

Integer overflow can occur when a calculation exceeds the representable range of an integer type.

`final` can prevent reassignment of a variable after it has been initialized.

Local variables must be definitely assigned before they are read.

Fields receive default values, while local variables do not.

Most importantly:

> **Choosing a data type is not just about making the compiler happy. The type communicates what kind of data your program is working with.**

---

# 105. Final Practice Challenge

Write a Java program representing a simple bank account.

Use variables for:

```text
Account holder name
Account number
Balance
Account active status
Account type
Number of transactions
```

Choose an appropriate Java type for each.

For example, you might have:

```java
String accountHolder;
long accountNumber;
double balance;
boolean active;
char accountType;
int transactions;
```

Print all information.

Then answer:

1. Why did you choose `long` for the account number?
2. Why did you choose `double` for the balance?
3. Could `int` store the account number?
4. Why is `accountHolder` a `String`?
5. Why is `active` a `boolean`?
6. Why is `accountType` a `char`?
7. Would `float` be a better choice than `double` for the balance? Why or why not?
8. What problems could occur if the balance became extremely large?
9. Would a real financial system necessarily use `double` for money?

That last question is deliberately important.

Good Java programming is not just:

```text
"What type can store this value?"
```

It is also:

```text
"What type best represents the meaning and requirements of this data?"
```

That mindset will become increasingly important as the course moves from basic Java into OOP and real software design.

---

# Next Chapter

**Chapter 4 — Operators**

We will build on variables and learn:

- Arithmetic operators
- Assignment operators
- Relational operators
- Equality operators
- Logical operators
- Unary operators
- Increment/decrement
- Compound assignment
- Operator precedence
- Associativity
- Integer division
- Modulus
- Expressions
- Type promotion during expressions
- Short-circuit evaluation
- `&&` vs `&`
- `||` vs `|`
- Common operator mistakes
- Practical programs and exercises
