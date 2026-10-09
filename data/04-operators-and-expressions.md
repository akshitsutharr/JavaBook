# Chapter 4 — Operators & Expressions

> **Goal of this chapter:** Learn how Java performs calculations, comparisons, assignments, logical operations, and other transformations on values. Operators are the tools that let a program actually *do something* with the variables you learned in Chapter 3.
>
> We will go from very simple arithmetic to important Java behavior such as integer division, type promotion, precedence, short-circuit evaluation, bitwise operators, and the ternary operator.

---

# 1. What Is an Operator?

An **operator** is a symbol or keyword that tells Java to perform an operation.

For example:

```java
int result = 10 + 20;
```

Here:

```text
10
 ↓
operand

+
 ↓
operator

20
 ↓
operand
```

The `+` operator tells Java to add the two values.

Result:

```text
30
```

So:

```text
Operand + Operator + Operand
```

forms an expression.

---

# 2. What Is an Operand?

An **operand** is a value that an operator works on.

Example:

```java
10 + 20
```

Here:

```text
10 → operand
+  → operator
20 → operand
```

Another example:

```java
age > 18
```

Here:

```text
age → operand
>   → operator
18  → operand
```

---

# 3. What Is an Expression?

An expression is a piece of Java code that produces a value.

Examples:

```java
10 + 20
```

produces:

```text
30
```

Another:

```java
age > 18
```

produces:

```text
true
```

Another:

```java
price * quantity
```

produces a numeric result.

Expressions are everywhere in Java.

---

# 4. Example

```java
public class Main {

    public static void main(String[] args) {

        int a = 10;
        int b = 20;

        int result = a + b;

        System.out.println(result);

    }
}
```

Output:

```text
30
```

The expression:

```java
a + b
```

produces:

```text
30
```

which is then assigned to:

```java
result
```

---

# 5. Types of Operators in Java

Java provides many kinds of operators.

A useful classification is:

```text
Java Operators
│
├── Arithmetic
│
├── Unary
│
├── Assignment
│
├── Relational
│
├── Equality
│
├── Logical
│
├── Bitwise
│
├── Shift
│
├── Conditional / Ternary
│
└── instanceof
```

Some operators can be used in more than one context.

We will learn them one by one.

---

# 6. Arithmetic Operators

Arithmetic operators are used for mathematical calculations.

Java's basic arithmetic operators are:

```text
+   Addition
-   Subtraction
*   Multiplication
/   Division
%   Remainder
```

Example:

```java
int a = 20;
int b = 6;

System.out.println(a + b);
System.out.println(a - b);
System.out.println(a * b);
System.out.println(a / b);
System.out.println(a % b);
```

Output:

```text
26
14
120
3
2
```

Notice something important:

```text
20 / 6 = 3
20 % 6 = 2
```

because both operands are integers.

We will study this carefully.

---

# 7. Addition `+`

The `+` operator adds values.

```java
int a = 10;
int b = 20;

int result = a + b;

System.out.println(result);
```

Output:

```text
30
```

It can also work with floating-point values:

```java
double x = 10.5;
double y = 2.5;

System.out.println(x + y);
```

Output:

```text
13.0
```

---

# 8. Addition With Characters

A `char` can participate in numeric expressions.

Example:

```java
char ch = 'A';

System.out.println(ch + 1);
```

Output:

```text
66
```

Why?

Because `'A'` has numeric value `65`, and:

```text
65 + 1 = 66
```

If you want the resulting numeric value converted back to a character:

```java
char ch = 'A';

char next = (char) (ch + 1);

System.out.println(next);
```

Output:

```text
B
```

---

# 9. Subtraction `-`

Example:

```java
int a = 20;
int b = 8;

System.out.println(a - b);
```

Output:

```text
12
```

Subtraction can also produce negative values:

```java
int result = 5 - 10;

System.out.println(result);
```

Output:

```text
-5
```

---

# 10. Multiplication `*`

Example:

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

Multiplication is especially useful when working with quantities, dimensions, rates, and mathematical calculations.

---

# 11. Division `/`

Example:

```java
int a = 20;
int b = 5;

System.out.println(a / b);
```

Output:

```text
4
```

But integer division has an important rule.

---

# 12. Integer Division

Consider:

```java
int a = 20;
int b = 6;

System.out.println(a / b);
```

Output:

```text
3
```

You may expect:

```text
3.333333...
```

but both operands are integers.

Therefore Java performs integer division.

The fractional part is discarded.

```text
20 / 6

mathematical result:
3.333...

integer result:
3
```

This is one of the most common beginner mistakes.

---

# 13. How to Get a Decimal Result

At least one operand must be a floating-point value.

Example:

```java
int a = 20;
double b = 6;

System.out.println(a / b);
```

Output:

```text
3.3333333333333335
```

Or:

```java
double result = (double) a / b;
```

Now the calculation is performed in floating-point arithmetic.

---

# 14. A Very Common Mistake

Consider:

```java
int a = 5;
int b = 2;

double result = a / b;

System.out.println(result);
```

Many beginners expect:

```text
2.5
```

But the output is:

```text
2.0
```

Why?

Because:

```java
a / b
```

is evaluated first.

Both are integers:

```text
5 / 2
 ↓
2
```

Then the integer result is converted to `double`:

```text
2
 ↓
2.0
```

Correct:

```java
double result = (double) a / b;
```

Output:

```text
2.5
```

---

# 15. Remainder Operator `%`

The `%` operator gives the remainder after division.

Example:

```java
int result = 20 % 6;

System.out.println(result);
```

Output:

```text
2
```

Because:

```text
20 = 6 × 3 + 2
```

So:

```text
20 % 6 = 2
```

---

# 16. Why Is `%` Useful?

The remainder operator is extremely useful.

For example, to check whether a number is even:

```java
int number = 10;

System.out.println(number % 2 == 0);
```

Output:

```text
true
```

Why?

```text
10 % 2 = 0
```

For an odd number:

```java
int number = 11;

System.out.println(number % 2 == 0);
```

Output:

```text
false
```

---

# 17. `%` Can Be Used for Cycles

Suppose you want values to repeat from `0` to `4`.

You can use:

```java
int value = number % 5;
```

For example:

```text
0 % 5 = 0
1 % 5 = 1
2 % 5 = 2
3 % 5 = 3
4 % 5 = 4
5 % 5 = 0
6 % 5 = 1
7 % 5 = 2
```

This is useful in:

```text
round-robin systems
circular indexing
repeating patterns
turn-based games
cyclic counters
```

---

# 18. `%` With Negative Numbers

Java's integer remainder follows the sign of the dividend.

Example:

```java
System.out.println(-10 % 3);
System.out.println(10 % -3);
```

Output:

```text
-1
1
```

This is different from mathematical modulo definitions used in some contexts.

For a mathematical non-negative modulo, methods such as:

```java
Math.floorMod(...)
```

can be more appropriate.

---

# 19. Division by Zero

Integer division by zero is invalid.

Example:

```java
int x = 10;
int y = 0;

System.out.println(x / y);
```

This throws:

```text
ArithmeticException
```

at runtime.

The same applies to integer remainder:

```java
10 % 0
```

---

# 20. Floating-Point Division by Zero

Floating-point behavior is different.

For example:

```java
double x = 10.0;
double y = 0.0;

System.out.println(x / y);
```

This produces:

```text
Infinity
```

rather than an `ArithmeticException`.

You may also encounter:

```text
NaN
```

for operations such as:

```java
0.0 / 0.0
```

This is one reason floating-point arithmetic must be understood separately from integer arithmetic.

---

# 21. Unary Operators

A unary operator works on one operand.

Examples include:

```text
+
-
++
--
!
~
```

We will focus on the most important ones.

---

# 22. Unary Plus `+`

Example:

```java
int x = 10;

int y = +x;

System.out.println(y);
```

Output:

```text
10
```

Unary `+` generally does not change a numeric value.

It is rarely needed explicitly.

---

# 23. Unary Minus `-`

Unary `-` changes the sign of a numeric expression.

Example:

```java
int x = 10;

int y = -x;

System.out.println(y);
```

Output:

```text
-10
```

Another:

```java
int x = -10;

System.out.println(-x);
```

Output:

```text
10
```

---

# 24. Increment Operator `++`

The increment operator increases a variable by one.

Example:

```java
int x = 10;

x++;

System.out.println(x);
```

Output:

```text
11
```

Conceptually:

```java
x++;
```

is similar to:

```java
x = x + 1;
```

when used as a standalone statement.

---

# 25. Decrement Operator `--`

The decrement operator decreases a variable by one.

```java
int x = 10;

x--;

System.out.println(x);
```

Output:

```text
9
```

Conceptually:

```java
x--;
```

is similar to:

```java
x = x - 1;
```

when used as a standalone statement.

---

# 26. Prefix Increment

Consider:

```java
int x = 10;

int y = ++x;

System.out.println(x);
System.out.println(y);
```

Output:

```text
11
11
```

The important idea is:

```text
++x
 ↓
increment first
 ↓
then use the value
```

So:

```text
x = 10

++x
 ↓
x becomes 11
 ↓
11 is used
```

---

# 27. Postfix Increment

Now:

```java
int x = 10;

int y = x++;

System.out.println(x);
System.out.println(y);
```

Output:

```text
11
10
```

The idea is:

```text
x++
 ↓
use old value first
 ↓
then increment x
```

So:

```text
x = 10

y = x++
 ↓
y gets 10
 ↓
x becomes 11
```

---

# 28. Prefix vs Postfix

Remember:

```text
++x
 ↓
increment first

x++
 ↓
use first, increment after
```

Similarly:

```text
--x
 ↓
decrement first

x--
 ↓
use first, decrement after
```

---

# 29. Example With Prefix and Postfix

```java
int x = 5;

System.out.println(++x);
System.out.println(x++);
System.out.println(x);
```

Step by step:

Initially:

```text
x = 5
```

First:

```java
++x
```

becomes:

```text
x = 6
output = 6
```

Second:

```java
x++
```

outputs the old value:

```text
output = 6
```

then:

```text
x = 7
```

Final:

```text
7
```

Output:

```text
6
6
7
```

---

# 30. Avoid Overcomplicated Increment Expressions

You may see code such as:

```java
int x = 5;

int result = x++ + ++x;
```

Although Java defines evaluation rules, such expressions are unnecessarily difficult to read.

Prefer:

```java
x++;
x++;

int result = ...;
```

Clear code is better than clever code.

This becomes especially important in production code.

---

# 31. Assignment Operator `=`

The assignment operator:

```java
=
```

assigns a value to a variable.

Example:

```java
int age = 20;
```

Here:

```text
20
 ↓
assigned to
 ↓
age
```

Another:

```java
age = 21;
```

The current value of `age` becomes:

```text
21
```

---

# 32. Assignment Is Not Equality

This is extremely important.

In Java:

```java
=
```

means:

```text
assignment
```

while:

```java
==
```

means:

```text
equality comparison
```

Example:

```java
int x = 10;
```

assigns `10`.

But:

```java
x == 10
```

asks:

> Is `x` equal to `10`?

The result is a boolean.

---

# 33. Compound Assignment Operators

Java provides:

```text
+=
-=
*=
/=
%=
```

Example:

```java
int x = 10;

x += 5;
```

Now:

```text
x = 15
```

Conceptually:

```java
x += 5;
```

is similar to:

```java
x = x + 5;
```

---

# 34. More Compound Assignment Examples

```java
int x = 20;

x -= 5;
System.out.println(x);

x *= 2;
System.out.println(x);

x /= 3;
System.out.println(x);

x %= 4;
System.out.println(x);
```

The operations happen sequentially.

Compound assignments are convenient and also have special implicit-conversion behavior that ordinary assignment does not.

We will see that shortly.

---

# 35. Compound Assignment and Casting

Consider:

```java
byte x = 10;

x += 5;
```

This is valid.

But:

```java
byte x = 10;

x = x + 5;
```

does not compile without a cast.

Why?

Because:

```java
x + 5
```

is promoted to `int`.

But compound assignment:

```java
x += 5;
```

includes an implicit conversion back to the type of the left-hand variable, subject to the language rules.

This is convenient but can hide narrowing behavior.

For example:

```java
byte x = 127;

x += 1;

System.out.println(x);
```

Output:

```text
-128
```

So compound assignment does not magically prevent overflow.

---

# 36. Relational Operators

Relational operators compare values.

Common relational operators are:

```text
>
<
>=
<=
```

The result is a `boolean`.

Example:

```java
int age = 20;

System.out.println(age > 18);
```

Output:

```text
true
```

---

# 37. Greater Than `>`

```java
int a = 20;
int b = 10;

System.out.println(a > b);
```

Output:

```text
true
```

Because:

```text
20 > 10
```

is true.

---

# 38. Less Than `<`

```java
int a = 10;
int b = 20;

System.out.println(a < b);
```

Output:

```text
true
```

---

# 39. Greater Than or Equal `>=`

```java
int age = 18;

System.out.println(age >= 18);
```

Output:

```text
true
```

Because:

```text
18 >= 18
```

is true.

---

# 40. Less Than or Equal `<=`

```java
int age = 17;

System.out.println(age <= 18);
```

Output:

```text
true
```

---

# 41. Equality Operators

Java uses:

```text
==
!=
```

`==` checks equality.

`!=` checks inequality.

Example:

```java
int a = 10;
int b = 10;

System.out.println(a == b);
System.out.println(a != b);
```

Output:

```text
true
false
```

---

# 42. Logical Operators

Logical operators combine boolean expressions.

The most important ones are:

```text
&&
||
!
```

They are used heavily in conditions.

---

# 43. Logical AND `&&`

`&&` means logical AND.

The result is true only when both sides are true.

Truth table:

```text
A       B       A && B
----------------------
true    true    true
true    false   false
false   true    false
false   false   false
```

Example:

```java
int age = 20;
boolean citizen = true;

System.out.println(age >= 18 && citizen);
```

Output:

```text
true
```

Both conditions are true.

---

# 44. Logical OR `||`

`||` means logical OR.

It is true when at least one side is true.

Truth table:

```text
A       B       A || B
----------------------
true    true    true
true    false   true
false   true    true
false   false   false
```

Example:

```java
boolean weekend = false;
boolean holiday = true;

System.out.println(weekend || holiday);
```

Output:

```text
true
```

At least one condition is true.

---

# 45. Logical NOT `!`

`!` reverses a boolean value.

```java
boolean loggedIn = true;

System.out.println(!loggedIn);
```

Output:

```text
false
```

Another:

```java
boolean active = false;

System.out.println(!active);
```

Output:

```text
true
```

Think:

```text
!true  → false
!false → true
```

---

# 46. Combining Logical Operators

Example:

```java
int age = 20;
boolean citizen = true;
boolean hasId = true;

boolean allowed = age >= 18 && citizen && hasId;

System.out.println(allowed);
```

Output:

```text
true
```

The expression asks:

```text
Is age >= 18?
AND
Is citizen true?
AND
Is hasId true?
```

All must be true.

---

# 47. Short-Circuit Evaluation

This is an extremely important Java concept.

For:

```text
&&
```

Java stops evaluating as soon as the left side is false.

For:

```text
||
```

Java stops evaluating as soon as the left side is true.

This is called **short-circuit evaluation**.

---

# 48. Short-Circuit `&&` Example

```java
int x = 10;

if (x < 5 && x / 0 > 1) {

    System.out.println("Hello");

}
```

The left side:

```java
x < 5
```

is:

```text
false
```

Because `&&` needs both sides to be true, Java does not need to evaluate the right side.

Therefore:

```java
x / 0
```

is not evaluated.

This prevents an `ArithmeticException`.

---

# 49. Short-Circuit `||` Example

```java
int x = 10;

if (x > 5 || x / 0 > 1) {

    System.out.println("Hello");

}
```

The left side:

```java
x > 5
```

is true.

Because `||` is already guaranteed to be true, Java does not evaluate the right side.

Output:

```text
Hello
```

No division-by-zero occurs.

---

# 50. Why Short-Circuiting Is Useful

It is useful for both performance and safety.

A common pattern:

```java
if (user != null && user.isActive()) {

}
```

Java checks:

```java
user != null
```

first.

If it is false, the second part is not evaluated.

This prevents trying to call:

```java
user.isActive()
```

when `user` is `null`.

This is one of the most common practical uses of `&&`.

---

# 51. `&&` vs `&`

Do not confuse:

```text
&&
```

with:

```text
&
```

`&&` is logical AND with short-circuit behavior.

`&` is primarily a bitwise AND for integral values and also has a boolean form that evaluates both operands.

Example:

```java
boolean a = false;
boolean b = true;

System.out.println(a && b);
System.out.println(a & b);
```

Both produce:

```text
false
```

but their evaluation behavior differs.

---

# 52. Demonstrating the Difference

Consider:

```java
boolean result = false && someMethod();
```

`someMethod()` is not called because the left side is already false.

But:

```java
boolean result = false & someMethod();
```

evaluates both operands.

So:

```text
&&
 ↓
short-circuit logical AND

&
 ↓
evaluates both sides
```

Use `&&` when you mean logical short-circuit AND.

---

# 53. `||` vs `|`

Similarly:

```text
||
```

is short-circuit logical OR.

```text
|
```

is bitwise OR for integer operands and also has a boolean form that evaluates both operands.

Example:

```java
boolean a = true;
boolean b = false;

System.out.println(a || b);
System.out.println(a | b);
```

Both produce:

```text
true
```

But evaluation behavior differs.

---

# 54. Relational Operators Return Boolean Values

Consider:

```java
int age = 20;

boolean adult = age >= 18;
```

The expression:

```java
age >= 18
```

produces:

```text
true
```

and that value is stored in:

```text
adult
```

This is an important programming pattern:

```text
Expression
   ↓
boolean result
   ↓
stored in variable
```

---

# 55. Boolean Variables Make Code Clearer

Instead of writing:

```java
if (age >= 18 && hasId && citizen) {
}
```

you can sometimes write:

```java
boolean eligible = age >= 18 && hasId && citizen;

if (eligible) {
}
```

This can make complex logic easier to understand.

---

# 56. Ternary Operator `?:`

The ternary operator is a compact conditional expression.

Syntax:

```java
condition ? valueIfTrue : valueIfFalse
```

Example:

```java
int age = 20;

String result = age >= 18 ? "Adult" : "Minor";

System.out.println(result);
```

Output:

```text
Adult
```

The expression means:

```text
If age >= 18
    ↓
"Adult"

otherwise
    ↓
"Minor"
```

---

# 57. Ternary Operator as an Expression

Unlike an `if` statement, the ternary operator produces a value.

Example:

```java
int a = 10;
int b = 20;

int max = a > b ? a : b;

System.out.println(max);
```

Output:

```text
20
```

This is useful when choosing between two values.

---

# 58. Do Not Overuse the Ternary Operator

This is readable:

```java
String result = age >= 18 ? "Adult" : "Minor";
```

This is not:

```java
String result = age >= 18
        ? hasId
            ? citizen
                ? "Allowed"
                : "Not Citizen"
            : "No ID"
        : "Minor";
```

Complex nested ternaries are difficult to read.

Use `if/else` when the logic becomes complicated.

---

# 59. Operator Precedence

What happens when an expression has multiple operators?

Example:

```java
int result = 10 + 20 * 3;
```

Does Java calculate:

```text
(10 + 20) * 3 = 90
```

or:

```text
10 + (20 * 3) = 70
```

The answer is:

```text
70
```

because multiplication has higher precedence than addition.

---

# 60. Basic Arithmetic Precedence

A useful simplified order is:

```text
()
 ↓
unary operators
 ↓
* / %
 ↓
+ -
 ↓
comparisons
 ↓
==
 ↓
&&
 ↓
||
 ↓
?:
 ↓
assignment
```

This is a simplified learning model, not a complete grammar table.

When in doubt, use parentheses.

---

# 61. Parentheses Make Intent Clear

Instead of:

```java
int result = a + b * c;
```

you can write:

```java
int result = a + (b * c);
```

Or if you mean addition first:

```java
int result = (a + b) * c;
```

Parentheses make the intended order obvious.

Good programmers use parentheses when they improve clarity.

---

# 62. Example of Precedence

```java
int result = 10 + 5 * 2;
```

Multiplication first:

```text
5 * 2 = 10
```

Then:

```text
10 + 10 = 20
```

Output:

```text
20
```

---

# 63. Changing Precedence With Parentheses

```java
int result = (10 + 5) * 2;
```

First:

```text
10 + 5 = 15
```

Then:

```text
15 * 2 = 30
```

Output:

```text
30
```

So:

```text
10 + 5 * 2 = 20

(10 + 5) * 2 = 30
```

---

# 64. Associativity

When operators have the same precedence, Java also follows associativity rules.

For many arithmetic operators, evaluation groups from left to right.

Example:

```java
int result = 20 / 5 * 2;
```

Both `/` and `*` have the same precedence.

Evaluate left to right:

```text
20 / 5 = 4
4 * 2 = 8
```

Result:

```text
8
```

Not:

```text
20 / (5 * 2)
```

which would be `2`.

---

# 65. Assignment Associativity

Assignment operators associate from right to left.

Example:

```java
int a;
int b;
int c;

a = b = c = 10;
```

Conceptually:

```text
c = 10
 ↓
b = 10
 ↓
a = 10
```

All three become:

```text
10
```

Although valid, avoid overly clever chained assignments if they reduce readability.

---

# 66. Type Promotion in Expressions

Java applies numeric promotion during arithmetic expressions.

For example:

```java
byte a = 10;
byte b = 20;

int result = a + b;
```

The result of:

```java
a + b
```

is an `int`.

This is why:

```java
byte result = a + b;
```

does not compile without casting.

---

# 67. `char` Promotion

Consider:

```java
char a = 'A';
char b = 'B';

int result = a + b;

System.out.println(result);
```

Output:

```text
131
```

because:

```text
'A' = 65
'B' = 66

65 + 66 = 131
```

Arithmetic promotes the characters to an integer type.

---

# 68. `long` in an Expression

If an expression contains a `long` operand, the other integral operands are generally promoted to `long`.

Example:

```java
int a = 10;
long b = 20;

long result = a + b;
```

The result is:

```text
long
```

---

# 69. Floating-Point Promotion

If a floating-point operand is involved, numeric promotion can produce:

```text
float
```

or:

```text
double
```

depending on the operands.

Example:

```java
int a = 10;
double b = 2.5;

double result = a + b;
```

The result is a `double`.

---

# 70. The Important Rule

When you perform arithmetic, do not only ask:

> "What are the values?"

Also ask:

> **"What are the types of the operands?"**

For example:

```java
5 / 2
```

produces:

```text
2
```

while:

```java
5.0 / 2
```

produces:

```text
2.5
```

The values look similar, but the types change the behavior.

---

# 71. Assignment Operators and Expressions

Assignment itself is an expression in Java.

For example:

```java
int x;

x = 10;
```

The assignment expression has the assigned value.

This is why chained assignments work:

```java
a = b = 10;
```

However, do not use assignment inside complicated expressions unless it genuinely improves clarity.

---

# 72. Equality: Primitive Values

For primitive values, `==` compares their values after the relevant numeric promotions.

Example:

```java
int a = 10;
int b = 10;

System.out.println(a == b);
```

Output:

```text
true
```

---

# 73. Equality: Reference Types Preview

When we later work with objects, `==` behaves differently.

For reference types, `==` checks whether two references refer to the same object.

Example:

```java
String a = new String("Java");
String b = new String("Java");

System.out.println(a == b);
```

This can be:

```text
false
```

because they are different objects.

To compare String contents, you normally use:

```java
a.equals(b)
```

which gives:

```text
true
```

Strings will be studied properly later.

This distinction is extremely important in Java.

---

# 74. Bitwise Operators

Java provides bitwise operations for integral types.

The main operators are:

```text
&
|
^
~
```

They work on individual bits.

These operators are useful in areas such as:

```text
flags
binary protocols
low-level data manipulation
bit masks
performance-sensitive algorithms
```

Most beginners do not need them every day, but they are important to understand.

---

# 75. Binary Representation

Suppose:

```text
5 = 0101
3 = 0011
```

A bitwise AND:

```text
0101
0011
----
0001
```

gives:

```text
1
```

So:

```java
System.out.println(5 & 3);
```

outputs:

```text
1
```

---

# 76. Bitwise OR `|`

Using:

```text
5 = 0101
3 = 0011
```

OR:

```text
0101
0011
----
0111
```

which is:

```text
7
```

So:

```java
System.out.println(5 | 3);
```

outputs:

```text
7
```

---

# 77. Bitwise XOR `^`

XOR gives `1` when the two corresponding bits are different.

```text
0101
0011
----
0110
```

`0110` is:

```text
6
```

So:

```java
System.out.println(5 ^ 3);
```

outputs:

```text
6
```

---

# 78. Bitwise NOT `~`

`~` flips every bit.

For a signed Java integer, the result can look surprising because integers use two's-complement representation.

Example:

```java
System.out.println(~5);
```

Output:

```text
-6
```

A useful identity is:

```text
~x = -x - 1
```

for Java's signed two's-complement integer representation.

So:

```text
~5
= -5 - 1
= -6
```

---

# 79. Shift Operators

Java provides:

```text
<<
>>
>>>
```

These shift bits.

### Left shift

```text
<<
```

### Signed right shift

```text
>>
```

### Unsigned right shift

```text
>>>
```

---

# 80. Left Shift `<<`

Example:

```java
int x = 5;

System.out.println(x << 1);
```

Output:

```text
10
```

Binary:

```text
5
0101

5 << 1
1010
```

which is:

```text
10
```

For many values, shifting left by one is equivalent to multiplying by two, but overflow and type width matter.

---

# 81. Right Shift `>>`

Example:

```java
int x = 20;

System.out.println(x >> 2);
```

Output:

```text
5
```

Conceptually:

```text
20 / 4 = 5
```

For positive values, signed right shift behaves similarly to integer division by powers of two, subject to Java's bit-level rules.

---

# 82. `>>` vs `>>>`

This is important.

```text
>>
 ↓
signed right shift

>>>
 ↓
unsigned right shift
```

For positive values, they often produce the same result.

For negative values, they can differ dramatically.

Example:

```java
int x = -8;

System.out.println(x >> 2);
System.out.println(x >>> 2);
```

The first preserves the sign bit.

The second shifts in zeros.

---

# 83. `instanceof` Operator

The `instanceof` operator checks whether an object is compatible with a given type.

Example:

```java
String name = "Java";

System.out.println(name instanceof String);
```

Output:

```text
true
```

This becomes particularly useful with inheritance and polymorphism.

For example:

```java
Animal animal = new Dog();

if (animal instanceof Dog) {

    System.out.println("It is a Dog");

}
```

We will study `instanceof` much more deeply in the OOP section.

---

# 84. `instanceof` and `null`

An important rule:

```java
String name = null;

System.out.println(name instanceof String);
```

Output:

```text
false
```

A null reference does not refer to an object, so the `instanceof` test is false.

---

# 85. Operator Categories — Full Overview

```text
Arithmetic
+ - * / %

Unary
+ - ++ -- ! ~

Assignment
= += -= *= /= %=

Relational
> < >= <=

Equality
== !=

Logical
&& || !

Bitwise
& | ^ ~

Shift
<< >> >>>

Ternary
?:

Type test
instanceof
```

Remember that `&`, `|`, and `^` can also operate on boolean operands under Java's rules.

---

# 86. A Complete Example

Let's combine several operators.

```java
public class Main {

    public static void main(String[] args) {

        int age = 20;
        int marks = 85;

        boolean adult = age >= 18;
        boolean passed = marks >= 40;

        boolean eligible = adult && passed;

        System.out.println("Age: " + age);
        System.out.println("Marks: " + marks);
        System.out.println("Adult: " + adult);
        System.out.println("Passed: " + passed);
        System.out.println("Eligible: " + eligible);

    }
}
```

Output:

```text
Age: 20
Marks: 85
Adult: true
Passed: true
Eligible: true
```

This demonstrates how arithmetic/data values can become boolean decisions.

---

# 87. Real-World Example — Shopping Cart

Suppose:

```java
double price = 500;
int quantity = 3;

double total = price * quantity;

boolean expensive = total > 1000;

System.out.println("Total: " + total);
System.out.println("Expensive: " + expensive);
```

Output:

```text
Total: 1500.0
Expensive: true
```

The flow is:

```text
price × quantity
       ↓
      total
       ↓
 total > 1000
       ↓
     boolean
```

This pattern appears everywhere in software.

---

# 88. Real-World Example — Login

```java
boolean usernameCorrect = true;
boolean passwordCorrect = true;

boolean loginSuccessful =
        usernameCorrect && passwordCorrect;

System.out.println(loginSuccessful);
```

Output:

```text
true
```

The logic is:

```text
username correct
       AND
password correct
       ↓
login successful
```

---

# 89. Real-World Example — Discount

```java
double price = 2000;

boolean eligible = price >= 1000;

double discount = eligible ? 200 : 0;

System.out.println(discount);
```

Output:

```text
200.0
```

The ternary operator chooses between:

```text
200
```

and:

```text
0
```

depending on the condition.

---

# 90. Operator Precedence — Practical Advice

You do not need to memorize the entire precedence table immediately.

Instead:

1. Learn the major groups.
2. Understand parentheses.
3. Use parentheses when the expression could be confusing.

For example, prefer:

```java
boolean result = (age >= 18) && hasId;
```

over relying on the reader to remember precedence.

---

# 91. A Simplified Precedence Table

From higher to lower:

| Level | Operators |
|---|---|
| 1 | `()` |
| 2 | postfix `++`, `--` |
| 3 | unary `+`, `-`, `++`, `--`, `!`, `~` |
| 4 | `*`, `/`, `%` |
| 5 | `+`, `-` |
| 6 | `<<`, `>>`, `>>>` |
| 7 | `<`, `<=`, `>`, `>=`, `instanceof` |
| 8 | `==`, `!=` |
| 9 | `&` |
| 10 | `^` |
| 11 | `|` |
| 12 | `&&` |
| 13 | `||` |
| 14 | `?:` |
| 15 | assignment operators |

This table is simplified for learning but captures the major ordering.

---

# 92. A Critical Difference: `=` vs `==`

Remember this forever:

```text
=
 ↓
assignment

==
 ↓
comparison
```

Example:

```java
int x = 10;
```

means:

```text
put 10 into x
```

But:

```java
x == 10
```

means:

```text
is x equal to 10?
```

The result is:

```text
true / false
```

---

# 93. A Critical Difference: `&&` vs `&`

Remember:

```text
&&
 ↓
logical AND
 ↓
short-circuits

&
 ↓
bitwise AND
 ↓
does not short-circuit
```

For ordinary boolean conditions, use:

```java
&&
```

---

# 94. A Critical Difference: `||` vs `|`

Similarly:

```text
||
 ↓
logical OR
 ↓
short-circuits

|
 ↓
bitwise OR
 ↓
does not short-circuit
```

---

# 95. A Critical Difference: `x++` vs `++x`

Remember:

```text
x++
 ↓
use old value
then increment

++x
 ↓
increment
then use new value
```

If used alone:

```java
x++;
```

and:

```java
++x;
```

both increase `x` by one.

The difference matters when the expression's value is used.

---

# 96. A Critical Difference: Integer vs Floating Division

```java
5 / 2
```

gives:

```text
2
```

while:

```java
5.0 / 2
```

gives:

```text
2.5
```

Always check operand types.

---

# 97. Common Mistakes

## Mistake 1 — Expecting Decimal Integer Division

```java
double result = 5 / 2;
```

Result:

```text
2.0
```

Correct:

```java
double result = 5.0 / 2;
```

or:

```java
double result = (double) 5 / 2;
```

---

## Mistake 2 — Confusing `=` and `==`

Wrong concept:

```java
if (age = 18)
```

`=` is assignment, not equality.

Use:

```java
if (age == 18)
```

---

## Mistake 3 — Forgetting Short-Circuit Behavior

Understand that:

```java
false && something
```

does not evaluate `something`.

And:

```java
true || something
```

does not evaluate `something`.

---

## Mistake 4 — Confusing `++x` and `x++`

```java
int x = 5;

int a = ++x;
```

gives:

```text
a = 6
x = 6
```

while:

```java
int x = 5;

int a = x++;
```

gives:

```text
a = 5
x = 6
```

---

## Mistake 5 — Ignoring Operator Precedence

```java
10 + 5 * 2
```

is:

```text
20
```

not:

```text
30
```

Use:

```java
(10 + 5) * 2
```

if you want `30`.

---

## Mistake 6 — Assuming `%` Means Percentage

In Java:

```java
%
```

means remainder.

It does not directly mean percentage.

---

## Mistake 7 — Using `double` for Exact Money

Floating-point arithmetic can have representation errors.

For exact decimal monetary calculations, consider:

```text
BigDecimal
```

rather than blindly using `double`.

---

# 98. Practice Program — Calculator

Create:

```java
public class Main {

    public static void main(String[] args) {

        int a = 20;
        int b = 6;

        System.out.println("Addition: " + (a + b));
        System.out.println("Subtraction: " + (a - b));
        System.out.println("Multiplication: " + (a * b));
        System.out.println("Division: " + (a / b));
        System.out.println("Remainder: " + (a % b));

    }
}
```

Expected output:

```text
Addition: 26
Subtraction: 14
Multiplication: 120
Division: 3
Remainder: 2
```

Then change the values and predict the output before running it.

---

# 99. Practice Program — Even or Odd

Write:

```java
int number = 25;

boolean even = number % 2 == 0;

System.out.println(even);
```

Expected output:

```text
false
```

Change:

```java
number = 26;
```

Output:

```text
true
```

---

# 100. Practice Program — Eligibility

Create:

```java
int age = 21;
boolean hasId = true;

boolean eligible = age >= 18 && hasId;

System.out.println(eligible);
```

Expected:

```text
true
```

Test:

```text
age = 17
hasId = true

age = 21
hasId = false

age = 17
hasId = false
```

Predict the output for each.

---

# 101. Practice Program — Maximum of Two Numbers

Use the ternary operator:

```java
int a = 50;
int b = 30;

int max = a > b ? a : b;

System.out.println(max);
```

Output:

```text
50
```

Then test equal values.

---

# 102. Practice Program — Increment

Predict the output:

```java
int x = 5;

int a = ++x;
int b = x++;

System.out.println(a);
System.out.println(b);
System.out.println(x);
```

Answer:

```text
6
6
7
```

Trace it manually before executing.

---

# 103. Practice Program — Precedence

Predict:

```java
int result = 10 + 20 * 2;

System.out.println(result);
```

Then change it to:

```java
int result = (10 + 20) * 2;

System.out.println(result);
```

Compare:

```text
70
60
```

This is why parentheses matter.

---

# 104. Practice Program — Short Circuit

Try:

```java
public class Main {

    static boolean test() {

        System.out.println("test() executed");

        return true;
    }

    public static void main(String[] args) {

        boolean result = false && test();

        System.out.println(result);

    }
}
```

Output:

```text
false
```

Notice:

```text
test() executed
```

does not appear.

Why?

Because:

```text
false && anything
```

is already false.

Now change:

```java
boolean result = true || test();
```

Again, `test()` will not execute.

This demonstrates short-circuit evaluation directly.

---

# 105. Practice Questions

## Basic

1. What is an operator?
2. What is an operand?
3. What is an expression?
4. Name the arithmetic operators.
5. What does `%` do?
6. What is integer division?
7. What is the difference between `++x` and `x++`?
8. What is the difference between `--x` and `x--`?
9. What does `=` mean?
10. What does `==` mean?

## Logical Operators

11. What does `&&` mean?
12. What does `||` mean?
13. What does `!` do?
14. What is short-circuit evaluation?
15. Why is short-circuiting useful?
16. Difference between `&&` and `&`?
17. Difference between `||` and `|`?

## Arithmetic

18. What is the result of `20 / 6` when both values are integers?
19. How can you get a decimal result from integer values?
20. What is the result of `20 % 6`?
21. What happens when integer division is performed by zero?
22. What happens when floating-point division is performed by zero?

## Precedence

23. What is operator precedence?
24. What is associativity?
25. What is the result of:

```java
10 + 5 * 2
```

26. What is the result of:

```java
(10 + 5) * 2
```

27. Why are parentheses useful?

## Advanced

28. What is numeric promotion?
29. Why does `byte + byte` produce an `int` result?
30. Why can `x += value` work when `x = x + value` does not?
31. What are bitwise operators?
32. What is the difference between `>>` and `>>>`?
33. What does `instanceof` do?
34. Why does `instanceof` return false for a null reference?
35. How does `==` differ for primitive values and object references?

---

# 106. Interview Questions

### Q1. What is the difference between `=` and `==`?

```text
= 
 ↓
assignment

==
 ↓
equality comparison
```

Example:

```java
int x = 10;

System.out.println(x == 10);
```

Output:

```text
true
```

---

### Q2. What is the difference between `++x` and `x++`?

```text
++x
 ↓
increment first, then use

x++
 ↓
use first, then increment
```

Example:

```java
int x = 5;

System.out.println(++x);
```

prints:

```text
6
```

while:

```java
int x = 5;

System.out.println(x++);
```

prints:

```text
5
```

After the second statement, `x` becomes `6`.

---

### Q3. Why does `5 / 2` produce `2`?

Both operands are integers.

Therefore Java performs integer division:

```text
5 / 2 = 2
```

The fractional part is discarded.

To obtain `2.5`:

```java
5.0 / 2
```

or:

```java
(double) 5 / 2
```

---

### Q4. What is short-circuit evaluation?

Java's:

```text
&&
||
```

operators can stop evaluating once the final result is already known.

For:

```text
false && X
```

`X` is not evaluated.

For:

```text
true || X
```

`X` is not evaluated.

---

### Q5. What is operator precedence?

Operator precedence determines which operators are evaluated before others.

For example:

```java
10 + 5 * 2
```

performs multiplication first:

```text
10 + 10
= 20
```

Parentheses can explicitly change the order.

---

### Q6. What is the difference between `&&` and `&`?

`&&` is short-circuit logical AND.

`&` performs bitwise AND for integral operands and evaluates both operands for boolean expressions.

---

### Q7. What is the ternary operator?

The ternary operator:

```text
condition ? value1 : value2
```

chooses one of two values.

Example:

```java
int max = a > b ? a : b;
```

---

# 107. A Useful Operator Cheat Sheet

```text
ARITHMETIC

+   add
-   subtract
*   multiply
/   divide
%   remainder


UNARY

+x  unary plus
-x  unary minus
++  increment
--  decrement
!   logical NOT
~   bitwise NOT


ASSIGNMENT

=   assign
+=  add and assign
-=  subtract and assign
*=  multiply and assign
/=  divide and assign
%=  remainder and assign


COMPARISON

>   greater than
<   less than
>=  greater than or equal
<=  less than or equal
==  equal
!=  not equal


LOGICAL

&&  AND
||  OR
!   NOT


BITWISE

&   AND
|   OR
^   XOR
~   NOT


SHIFT

<<  left shift
>>  signed right shift
>>> unsigned right shift


CONDITIONAL

?:  ternary


TYPE TEST

instanceof
```

---

# 108. Final Mental Model

Operators connect values and logic.

Think:

```text
Variables
    ↓
contain data
    ↓
Operators
    ↓
work with that data
    ↓
Expressions
    ↓
produce results
    ↓
Variables / Conditions / Output
```

For example:

```java
int age = 20;
```

then:

```java
age >= 18
```

produces:

```text
true
```

then:

```java
age >= 18 && hasId
```

combines multiple boolean values.

And:

```java
price * quantity
```

performs arithmetic.

So a Java program is constantly doing:

```text
DATA
 ↓
OPERATIONS
 ↓
RESULTS
 ↓
MORE OPERATIONS
 ↓
PROGRAM BEHAVIOR
```

---

# 109. Final Challenge

Build a small "student result calculator".

Create variables:

```text
student name
marks of 3 subjects
```

Calculate:

```text
total marks
average marks
```

Then create booleans:

```text
passed
excellent
```

Rules:

```text
passed:
average >= 40

excellent:
average >= 80
```

Then print:

```text
Student: Rahul
Total: 240
Average: 80.0
Passed: true
Excellent: true
```

Use:

```text
+
/
>=
&& or ||
```

and other appropriate operators.

Do not copy the final result blindly.

Build the expressions yourself.

---

# 110. Chapter Summary

Operators allow Java programs to perform work on values.

Arithmetic operators:

```text
+ - * / %
```

perform mathematical operations.

`/` behaves differently for integer and floating-point operands.

```text
5 / 2
 ↓
2

5.0 / 2
 ↓
2.5
```

`%` gives the remainder.

Unary operators include:

```text
+ - ++ -- ! ~
```

`++x` increments before the value is used.

`x++` uses the old value before incrementing.

Assignment:

```text
=
```

is different from equality:

```text
==
```

Compound assignments include:

```text
+=
-=
*=
/=
%=
```

Relational operators compare values:

```text
>
<
>=
<=
```

Equality operators:

```text
==
!=
```

Logical operators:

```text
&&
||
!
```

`&&` and `||` use short-circuit evaluation.

The ternary operator:

```text
condition ? a : b
```

provides a compact way to choose between two values.

Operator precedence determines evaluation order.

Parentheses can make the intended order explicit.

Bitwise operators work at the bit level:

```text
&
|
^
~
```

Shift operators include:

```text
<<
>>
>>>
```

`instanceof` tests whether an object is compatible with a given type.

Finally, remember the most important practical lesson:

> **Always pay attention to the types of your operands.**

The expression:

```java
5 / 2
```

and:

```java
5.0 / 2
```

look almost identical, but Java produces different results because the operand types are different.

Understanding operators means understanding not just the symbols, but how Java's type system and evaluation rules affect those symbols.

---

# Next Chapter

**Chapter 5 — Input & Output**

We will learn how Java communicates with the outside world:

- `System.out`
- `print()`
- `println()`
- `printf()`
- Formatting output
- Escape sequences
- Reading input
- `Scanner`
- Reading integers
- Reading decimals
- Reading strings
- `next()` vs `nextLine()`
- Input-buffer problems
- Command-line arguments
- Basic input validation
- Common `Scanner` mistakes
- Building interactive programs
- Practical exercises
