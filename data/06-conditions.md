# Chapter 6 — Conditions in Java

> **Java Master Course — Chapter 6 of 50**
>
> Conditions allow a Java program to make decisions. Instead of always executing the same code, a program can check a condition and choose what to do.

---

# 1. What Are Conditions?

A program often needs to make decisions.

For example:

```text
If marks are 40 or more
    → Student passes

Otherwise
    → Student fails
```

Or:

```text
If age >= 18
    → Eligible to vote

Otherwise
    → Not eligible
```

This is called **decision making** or **conditional execution**.

The basic idea is:

```text
             Condition
                 │
          ┌──────┴──────┐
          │             │
        true          false
          │             │
          ▼             ▼
       Action 1      Action 2
```

Java provides several ways to make decisions:

```text
if
if-else
else-if
nested if
switch
switch expressions
ternary operator
```

You already learned the ternary operator in Chapter 4. Here we will understand conditional programming properly.

---

# 2. Boolean Values

Conditions are based on boolean values.

A boolean can have only two values:

```java
true
false
```

Example:

```java
boolean isJavaEasy = true;
boolean isRainy = false;
```

A condition usually produces a boolean result.

For example:

```java
10 > 5
```

produces:

```text
true
```

And:

```java
10 < 5
```

produces:

```text
false
```

---

# 3. Relational Operators

The most common operators used to create conditions are:

| Operator | Meaning |
|---|---|
| `>` | greater than |
| `<` | less than |
| `>=` | greater than or equal to |
| `<=` | less than or equal to |
| `==` | equal to |
| `!=` | not equal to |

Examples:

```java
10 > 5
10 < 5
10 >= 10
10 <= 20
10 == 10
10 != 20
```

Their results are:

```text
true
false
true
true
true
true
```

---

# 4. The `if` Statement

The simplest decision-making statement is:

```java
if
```

Syntax:

```java
if (condition) {
    // code
}
```

Example:

```java
public class Main {
    public static void main(String[] args) {
        int age = 20;

        if (age >= 18) {
            System.out.println("You are an adult.");
        }
    }
}
```

Output:

```text
You are an adult.
```

The code inside the `if` block executes only when the condition is `true`.

---

# 5. How `if` Works

Consider:

```java
int age = 20;

if (age >= 18) {
    System.out.println("Adult");
}
```

Java evaluates:

```text
age >= 18
20 >= 18
   ↓
 true
```

Because the result is `true`, Java executes:

```java
System.out.println("Adult");
```

Flow:

```text
Start
  ↓
age = 20
  ↓
age >= 18 ?
  ↓
 true
  ↓
Print "Adult"
  ↓
End
```

---

# 6. When the Condition Is False

Example:

```java
int age = 15;

if (age >= 18) {
    System.out.println("Adult");
}
```

Condition:

```text
15 >= 18
    ↓
  false
```

Therefore the body is skipped.

Output:

```text
```

There is no output.

This is an important property of `if`:

```text
true  → execute block
false → skip block
```

---

# 7. Basic `if` Example

```java
public class Main {
    public static void main(String[] args) {
        int marks = 80;

        if (marks >= 40) {
            System.out.println("Pass");
        }
    }
}
```

Output:

```text
Pass
```

If:

```java
int marks = 30;
```

there is no output because the condition is false.

---

# 8. `if` with Input

Conditions become much more useful when combined with user input.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your age: ");
        int age = sc.nextInt();

        if (age >= 18) {
            System.out.println("You are eligible.");
        }

        sc.close();
    }
}
```

Input:

```text
20
```

Output:

```text
You are eligible.
```

Input:

```text
15
```

Output:

```text
```

---

# 9. `if-else`

Usually, we want one action when a condition is true and another action when it is false.

For this we use:

```java
if-else
```

Syntax:

```java
if (condition) {
    // true case
} else {
    // false case
}
```

Example:

```java
int age = 15;

if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}
```

Output:

```text
Minor
```

---

# 10. How `if-else` Works

```text
              Condition
                  │
          ┌───────┴───────┐
          │               │
        true            false
          │               │
          ▼               ▼
      if block        else block
          │               │
          └───────┬───────┘
                  ↓
                Continue
```

Exactly one of the two blocks executes.

---

# 11. Example — Even or Odd

```java
int number = 10;

if (number % 2 == 0) {
    System.out.println("Even");
} else {
    System.out.println("Odd");
}
```

Output:

```text
Even
```

Why?

```text
10 % 2
   ↓
0
```

Therefore:

```java
number % 2 == 0
```

is true.

---

# 12. Even/Odd with User Input

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int number = sc.nextInt();

        if (number % 2 == 0) {
            System.out.println("Even number");
        } else {
            System.out.println("Odd number");
        }

        sc.close();
    }
}
```

Input:

```text
25
```

Output:

```text
Odd number
```

---

# 13. Positive, Negative, or Zero

There are three possible cases:

```text
positive
negative
zero
```

We need more than two branches.

Example:

```java
int number = -10;

if (number > 0) {
    System.out.println("Positive");
} else if (number < 0) {
    System.out.println("Negative");
} else {
    System.out.println("Zero");
}
```

Output:

```text
Negative
```

---

# 14. `else-if`

The general structure is:

```java
if (condition1) {
    // case 1
} else if (condition2) {
    // case 2
} else if (condition3) {
    // case 3
} else {
    // default case
}
```

Java checks conditions from top to bottom.

The first true condition wins.

---

# 15. Example — Marks

Suppose:

```text
90–100 → A
80–89  → B
70–79  → C
60–69  → D
below 60 → F
```

Program:

```java
int marks = 85;

if (marks >= 90) {
    System.out.println("A");
} else if (marks >= 80) {
    System.out.println("B");
} else if (marks >= 70) {
    System.out.println("C");
} else if (marks >= 60) {
    System.out.println("D");
} else {
    System.out.println("F");
}
```

Output:

```text
B
```

---

# 16. Why Order Matters

Consider this:

```java
int marks = 95;

if (marks >= 40) {
    System.out.println("Pass");
} else if (marks >= 90) {
    System.out.println("A");
}
```

Output:

```text
Pass
```

Why didn't it print `A`?

Because Java checks:

```text
marks >= 40
95 >= 40
   ↓
 true
```

The first condition is already true.

Java executes that block and skips the remaining `else-if` conditions.

Therefore, more specific conditions often need to come before broader conditions.

Correct:

```java
if (marks >= 90) {
    System.out.println("A");
} else if (marks >= 40) {
    System.out.println("Pass");
}
```

---

# 17. Important Rule: First Matching Branch

In an `if-else-if` chain:

```java
if (...)
else if (...)
else if (...)
else
```

Java evaluates from top to bottom.

```text
condition 1
    ↓
true? ── yes → execute and stop
    │
    no
    ↓
condition 2
    ↓
true? ── yes → execute and stop
    │
    no
    ↓
condition 3
```

Only one branch from the chain executes.

---

# 18. Multiple Independent `if` Statements

Compare:

```java
if (condition1) {
}
if (condition2) {
}
```

with:

```java
if (condition1) {
} else if (condition2) {
}
```

They are not the same.

Example:

```java
int number = 10;

if (number > 0) {
    System.out.println("Positive");
}

if (number % 2 == 0) {
    System.out.println("Even");
}
```

Output:

```text
Positive
Even
```

Both conditions are independently checked.

---

# 19. `if-else-if` Is Different

```java
int number = 10;

if (number > 0) {
    System.out.println("Positive");
} else if (number % 2 == 0) {
    System.out.println("Even");
}
```

Output:

```text
Positive
```

The second condition is not checked because the first one was true.

Remember:

```text
multiple if → multiple blocks can execute

if-else-if → at most one branch executes
```

---

# 20. Nested `if`

An `if` statement can exist inside another `if`.

This is called a:

```text
nested if
```

Example:

```java
int age = 20;
boolean hasId = true;

if (age >= 18) {
    if (hasId) {
        System.out.println("Entry allowed");
    }
}
```

Output:

```text
Entry allowed
```

The inner condition is checked only if the outer condition is true.

---

# 21. Nested `if` Flow

```text
        age >= 18?
          │
     ┌────┴────┐
    no        yes
    │           │
   stop      hasId?
                │
           ┌────┴────┐
          no        yes
          │           │
         stop     Entry allowed
```

Nested `if` is useful when one decision depends on another.

---

# 22. Nested `if` Example — Login

```java
String username = "admin";
String password = "1234";

if (username.equals("admin")) {
    if (password.equals("1234")) {
        System.out.println("Login successful");
    }
}
```

Output:

```text
Login successful
```

This is only a learning example. Real applications should not store passwords like this.

---

# 23. Adding `else` to Nested `if`

```java
int age = 20;
boolean hasId = false;

if (age >= 18) {
    if (hasId) {
        System.out.println("Entry allowed");
    } else {
        System.out.println("ID required");
    }
} else {
    System.out.println("Underage");
}
```

Output:

```text
ID required
```

---

# 24. Logical Operators in Conditions

You learned these in Chapter 4:

```java
&&
||
!
```

They become extremely useful with `if`.

---

# 25. `&&` — AND

Both conditions must be true.

Example:

```java
int age = 20;
boolean hasId = true;

if (age >= 18 && hasId) {
    System.out.println("Allowed");
}
```

Both:

```text
age >= 18 → true
hasId     → true
```

Therefore:

```text
true && true
     ↓
    true
```

Output:

```text
Allowed
```

---

# 26. Example — Login

```java
String username = "admin";
String password = "1234";

if (username.equals("admin") && password.equals("1234")) {
    System.out.println("Login successful");
} else {
    System.out.println("Invalid credentials");
}
```

The user must satisfy both conditions.

---

# 27. `||` — OR

At least one condition must be true.

Example:

```java
int age = 65;

if (age < 18 || age >= 60) {
    System.out.println("Special category");
}
```

Here:

```text
age < 18  → false
age >= 60 → true

false || true
     ↓
   true
```

Output:

```text
Special category
```

---

# 28. `!` — NOT

`!` reverses a boolean value.

```java
boolean loggedIn = false;

if (!loggedIn) {
    System.out.println("Please log in");
}
```

Since:

```text
loggedIn = false
!loggedIn = true
```

Output:

```text
Please log in
```

---

# 29. Combining Conditions

Example:

```java
int age = 25;
boolean citizen = true;

if (age >= 18 && citizen) {
    System.out.println("Eligible");
}
```

Another example:

```java
int marks = 85;

if (marks >= 40 && marks <= 100) {
    System.out.println("Valid passing marks");
}
```

---

# 30. Parentheses Make Conditions Clear

Consider:

```java
if (age >= 18 && citizen || specialPermission)
```

This may be difficult to read.

Prefer:

```java
if ((age >= 18 && citizen) || specialPermission)
```

Parentheses make the intended logic obvious.

---

# 31. Short-Circuit Evaluation

Java's:

```java
&&
||
```

operators use short-circuit evaluation.

For `&&`:

```text
false && anything
```

is always false.

So Java may not evaluate the right side.

For `||`:

```text
true || anything
```

is always true.

So Java may not evaluate the right side.

---

# 32. Useful Short-Circuit Example

Suppose:

```java
String name = null;
```

This is dangerous:

```java
if (name != null && name.length() > 0) {
    System.out.println("Not empty");
}
```

Why is this safe?

Java checks:

```java
name != null
```

first.

It is false.

Because the left side of `&&` is false, Java does not evaluate:

```java
name.length()
```

So there is no null dereference from that expression.

---

# 33. Dangerous Order

This can fail:

```java
if (name.length() > 0 && name != null) {
}
```

Java tries:

```java
name.length()
```

before checking whether `name` is null.

So the order matters.

Good:

```java
name != null && name.length() > 0
```

---

# 34. Conditions with Strings

Do not compare Strings using:

```java
==
```

when you mean content equality.

Use:

```java
.equals()
```

Example:

```java
String language = "Java";

if (language.equals("Java")) {
    System.out.println("Correct");
}
```

Output:

```text
Correct
```

For a potentially null String, a safer pattern can be:

```java
if ("Java".equals(language)) {
    System.out.println("Correct");
}
```

This avoids calling `.equals()` on a null variable.

---

# 35. `==` vs `.equals()` for Strings

Consider:

```java
String a = new String("Java");
String b = new String("Java");
```

Then:

```java
a == b
```

checks whether the references refer to the same object.

It is not the correct general way to ask whether their contents are equal.

Use:

```java
a.equals(b)
```

to compare String contents.

Output conceptually:

```text
a == b       → false
a.equals(b)  → true
```

You will study references and object equality more deeply in the OOP chapters.

---

# 36. `switch`

When you need to choose among discrete values, Java provides:

```java
switch
```

Example:

```java
int day = 2;

switch (day) {
    case 1:
        System.out.println("Monday");
        break;

    case 2:
        System.out.println("Tuesday");
        break;

    case 3:
        System.out.println("Wednesday");
        break;

    default:
        System.out.println("Invalid day");
}
```

Output:

```text
Tuesday
```

---

# 37. How Traditional `switch` Works

Suppose:

```java
day = 2;
```

Java evaluates:

```text
switch(day)
```

Then searches for:

```text
case 2
```

It finds:

```java
case 2:
    System.out.println("Tuesday");
```

Then `break` exits the switch.

---

# 38. Why `break` Matters

Consider:

```java
int day = 2;

switch (day) {
    case 1:
        System.out.println("Monday");

    case 2:
        System.out.println("Tuesday");

    case 3:
        System.out.println("Wednesday");
}
```

Because there are no `break` statements, execution can fall through after the matching case.

For `day = 2`, output can be:

```text
Tuesday
Wednesday
```

This behavior is called:

```text
fall-through
```

---

# 39. Traditional Switch with `break`

```java
switch (day) {
    case 1:
        System.out.println("Monday");
        break;

    case 2:
        System.out.println("Tuesday");
        break;

    case 3:
        System.out.println("Wednesday");
        break;

    default:
        System.out.println("Invalid");
}
```

Now only the matching branch executes.

---

# 40. `default`

The `default` branch executes when no case matches.

Example:

```java
int day = 10;

switch (day) {
    case 1:
        System.out.println("Monday");
        break;

    case 2:
        System.out.println("Tuesday");
        break;

    default:
        System.out.println("Invalid day");
}
```

Output:

```text
Invalid day
```

Think of `default` as:

```text
otherwise
```

---

# 41. Multiple Cases

You can make multiple cases execute the same code.

Traditional syntax:

```java
int day = 6;

switch (day) {
    case 6:
    case 7:
        System.out.println("Weekend");
        break;

    default:
        System.out.println("Weekday");
}
```

Output:

```text
Weekend
```

Both `6` and `7` lead to the same block.

---

# 42. `switch` with `String`

Modern Java allows switching on Strings.

```java
String language = "Java";

switch (language) {
    case "Java":
        System.out.println("Java selected");
        break;

    case "Python":
        System.out.println("Python selected");
        break;

    default:
        System.out.println("Unknown language");
}
```

Output:

```text
Java selected
```

String matching in a switch is based on String content semantics, not reference identity.

---

# 43. `switch` with `char`

Example:

```java
char grade = 'A';

switch (grade) {
    case 'A':
        System.out.println("Excellent");
        break;

    case 'B':
        System.out.println("Good");
        break;

    case 'C':
        System.out.println("Average");
        break;

    default:
        System.out.println("Invalid grade");
}
```

Output:

```text
Excellent
```

---

# 44. `switch` with `enum`

Enums are covered in detail later, but Java can switch on enum values.

Example:

```java
enum Day {
    MONDAY,
    TUESDAY,
    WEDNESDAY
}
```

Then:

```java
Day day = Day.MONDAY;

switch (day) {
    case MONDAY:
        System.out.println("Start of week");
        break;

    case TUESDAY:
        System.out.println("Tuesday");
        break;

    case WEDNESDAY:
        System.out.println("Wednesday");
        break;
}
```

---

# 45. Modern Switch Expressions

Modern Java provides a more concise switch form.

Example:

```java
int day = 2;

String result = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    default -> "Invalid";
};

System.out.println(result);
```

Output:

```text
Tuesday
```

This is called a:

```text
switch expression
```

because it produces a value.

---

# 46. Switch Statement vs Switch Expression

Traditional switch:

```java
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
}
```

Modern switch expression:

```java
String name = switch (day) {
    case 1 -> "Monday";
    default -> "Unknown";
};
```

The second form can directly produce a value.

---

# 47. Arrow Syntax

Modern switch supports:

```java
case value -> result;
```

Example:

```java
int number = 1;

switch (number) {
    case 1 -> System.out.println("One");
    case 2 -> System.out.println("Two");
    default -> System.out.println("Other");
}
```

The arrow form does not have the accidental fall-through behavior of traditional case statements.

---

# 48. Multiple Labels in Modern Switch

You can group multiple values.

```java
int day = 6;

String type = switch (day) {
    case 6, 7 -> "Weekend";
    default -> "Weekday";
};

System.out.println(type);
```

Output:

```text
Weekend
```

This is much cleaner than repeating code.

---

# 49. Switch Expression with `yield`

Sometimes a switch branch needs multiple statements.

Example:

```java
int marks = 85;

String grade = switch (marks / 10) {
    case 10, 9 -> "A";
    case 8 -> "B";
    case 7 -> "C";
    case 6 -> "D";
    default -> {
        if (marks >= 40) {
            yield "E";
        } else {
            yield "F";
        }
    }
};

System.out.println(grade);
```

`yield` provides the value produced by that switch-expression block.

---

# 50. `if` vs `switch`

Use `if` when conditions involve ranges or complex boolean expressions.

Example:

```java
if (marks >= 90) {
    ...
}
```

Use `switch` when you are selecting among specific discrete values.

Example:

```java
switch (day) {
    case 1 -> ...
    case 2 -> ...
}
```

Simple mental model:

```text
if
→ ranges, comparisons, complex logic

switch
→ specific choices/values
```

This is a guideline, not an absolute rule.

---

# 51. Ternary Operator

You already learned this in Chapter 4.

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

It is essentially a compact expression for choosing between two values.

---

# 52. `if-else` vs Ternary

This:

```java
if (age >= 18) {
    result = "Adult";
} else {
    result = "Minor";
}
```

can often become:

```java
result = age >= 18 ? "Adult" : "Minor";
```

Use ternary for short, simple value selection.

Do not turn complicated logic into a giant nested ternary expression.

---

# 53. Nested Ternary

Technically possible:

```java
String result =
    marks >= 90 ? "A" :
    marks >= 80 ? "B" :
    marks >= 70 ? "C" :
    "F";
```

This works, but can become hard to read.

For complicated logic, prefer:

```java
if
else-if
```

Readable code is usually better than clever code.

---

# 54. Conditions and Scope

Variables declared inside an `if` block are local to that block.

Example:

```java
if (true) {
    int x = 10;
    System.out.println(x);
}
```

This works.

But:

```java
if (true) {
    int x = 10;
}

System.out.println(x);
```

does not compile because `x` is outside its scope.

Think:

```text
{
    variable lives here
}
```

---

# 55. Declaring a Variable Before the Condition

Suppose you want to use a value after the conditional.

You may write:

```java
String result;

if (marks >= 40) {
    result = "Pass";
} else {
    result = "Fail";
}

System.out.println(result);
```

This works because both branches assign `result`.

The compiler performs definite-assignment analysis to make sure local variables are initialized before use.

---

# 56. Definite Assignment Example

This is problematic:

```java
String result;

if (marks >= 40) {
    result = "Pass";
}

System.out.println(result);
```

Why?

If:

```text
marks < 40
```

the assignment never happens.

Java therefore does not allow the compiler to assume `result` has a value.

A correct version:

```java
String result;

if (marks >= 40) {
    result = "Pass";
} else {
    result = "Fail";
}
```

---

# 57. Conditions with `final`

A `final` variable can still be used in conditions.

```java
final int PASS_MARKS = 40;

int marks = 55;

if (marks >= PASS_MARKS) {
    System.out.println("Pass");
}
```

Output:

```text
Pass
```

`final` means the variable cannot be reassigned.

---

# 58. Comparing Characters

Characters can be compared.

```java
char ch = 'A';

if (ch == 'A') {
    System.out.println("Character is A");
}
```

Output:

```text
Character is A
```

You can also compare character values:

```java
if (ch >= 'A' && ch <= 'Z') {
    System.out.println("Uppercase letter");
}
```

This works because `char` participates in numeric comparisons according to Java's character/integer conversion rules.

---

# 59. Checking a Lowercase Character

```java
char ch = 'g';

if (ch >= 'a' && ch <= 'z') {
    System.out.println("Lowercase");
}
```

Output:

```text
Lowercase
```

For production code, Java also provides character utility methods such as:

```java
Character.isUpperCase(ch)
Character.isLowerCase(ch)
Character.isDigit(ch)
Character.isLetter(ch)
```

---

# 60. `Character` Utility Example

```java
char ch = '7';

if (Character.isDigit(ch)) {
    System.out.println("Digit");
} else {
    System.out.println("Not a digit");
}
```

Output:

```text
Digit
```

This is often clearer than manually checking ranges.

---

# 61. Conditions with Floating-Point Values

Be careful when comparing floating-point values for exact equality.

Example:

```java
double x = 0.1 + 0.2;

if (x == 0.3) {
    System.out.println("Equal");
} else {
    System.out.println("Not exactly equal");
}
```

The result may be:

```text
Not exactly equal
```

because binary floating-point numbers cannot represent many decimal fractions exactly.

For numerical code, an acceptable tolerance is often used:

```java
double epsilon = 0.000001;

if (Math.abs(x - 0.3) < epsilon) {
    System.out.println("Approximately equal");
}
```

This is an important real-world consideration.

---

# 62. Range Checking

A common task is checking whether a value lies inside a range.

Example:

```java
int marks = 75;

if (marks >= 0 && marks <= 100) {
    System.out.println("Valid marks");
} else {
    System.out.println("Invalid marks");
}
```

The condition means:

```text
marks is at least 0
AND
marks is at most 100
```

---

# 63. Range Checking with `if-else-if`

```java
int marks = 83;

if (marks < 0 || marks > 100) {
    System.out.println("Invalid marks");
} else if (marks >= 90) {
    System.out.println("A");
} else if (marks >= 80) {
    System.out.println("B");
} else if (marks >= 70) {
    System.out.println("C");
} else if (marks >= 60) {
    System.out.println("D");
} else if (marks >= 40) {
    System.out.println("E");
} else {
    System.out.println("F");
}
```

Output:

```text
B
```

Notice that validation comes before grading.

---

# 64. Practical Program — Largest of Two Numbers

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        int a = sc.nextInt();

        System.out.print("Enter second number: ");
        int b = sc.nextInt();

        if (a > b) {
            System.out.println("First number is larger");
        } else if (b > a) {
            System.out.println("Second number is larger");
        } else {
            System.out.println("Both numbers are equal");
        }

        sc.close();
    }
}
```

---

# 65. Practical Program — Largest of Three Numbers

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a: ");
        int a = sc.nextInt();

        System.out.print("Enter b: ");
        int b = sc.nextInt();

        System.out.print("Enter c: ");
        int c = sc.nextInt();

        if (a >= b && a >= c) {
            System.out.println("Largest = " + a);
        } else if (b >= a && b >= c) {
            System.out.println("Largest = " + b);
        } else {
            System.out.println("Largest = " + c);
        }

        sc.close();
    }
}
```

---

# 66. Practical Program — Leap Year

A common leap-year rule is:

```text
A year is a leap year if:

divisible by 400
OR
divisible by 4 AND not divisible by 100
```

Java:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter year: ");
        int year = sc.nextInt();

        if (year % 400 == 0 ||
            (year % 4 == 0 && year % 100 != 0)) {
            System.out.println("Leap year");
        } else {
            System.out.println("Not a leap year");
        }

        sc.close();
    }
}
```

Examples:

```text
2000 → Leap year
1900 → Not a leap year
2024 → Leap year
2023 → Not a leap year
```

This is a good example of combining:

```text
%
&&
||
!=
```

inside one condition.

---

# 67. Practical Program — Vowel or Consonant

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);

        if (ch == 'a' || ch == 'e' ||
            ch == 'i' || ch == 'o' ||
            ch == 'u' ||
            ch == 'A' || ch == 'E' ||
            ch == 'I' || ch == 'O' ||
            ch == 'U') {
            System.out.println("Vowel");
        } else {
            System.out.println("Consonant");
        }

        sc.close();
    }
}
```

For a production-quality program, you would also validate that the input is actually a letter.

---

# 68. Practical Program — Character Classification

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);

        if (Character.isLetter(ch)) {
            System.out.println("Letter");
        } else if (Character.isDigit(ch)) {
            System.out.println("Digit");
        } else {
            System.out.println("Special character");
        }

        sc.close();
    }
}
```

---

# 69. Practical Program — Calculator with `switch`

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double a = sc.nextDouble();

        System.out.print("Enter operator (+, -, *, /): ");
        char operator = sc.next().charAt(0);

        System.out.print("Enter second number: ");
        double b = sc.nextDouble();

        switch (operator) {
            case '+':
                System.out.println("Result = " + (a + b));
                break;

            case '-':
                System.out.println("Result = " + (a - b));
                break;

            case '*':
                System.out.println("Result = " + (a * b));
                break;

            case '/':
                if (b != 0) {
                    System.out.println("Result = " + (a / b));
                } else {
                    System.out.println("Cannot divide by zero");
                }
                break;

            default:
                System.out.println("Invalid operator");
        }

        sc.close();
    }
}
```

Example:

```text
Enter first number: 20
Enter operator (+, -, *, /): *
Enter second number: 5
Result = 100.0
```

This demonstrates that conditions can exist inside switch branches.

---

# 70. Practical Program — Day of Week

Using a modern switch expression:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter day number (1-7): ");
        int day = sc.nextInt();

        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4 -> "Thursday";
            case 5 -> "Friday";
            case 6 -> "Saturday";
            case 7 -> "Sunday";
            default -> "Invalid day";
        };

        System.out.println(dayName);

        sc.close();
    }
}
```

Input:

```text
5
```

Output:

```text
Friday
```

---

# 71. Practical Program — Electricity Bill

For learning, suppose:

```text
0–100 units    → ₹5/unit
101–200 units  → ₹7/unit
above 200      → ₹10/unit
```

A simple slab example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter units: ");
        int units = sc.nextInt();

        double bill;

        if (units <= 100) {
            bill = units * 5;
        } else if (units <= 200) {
            bill = 100 * 5 + (units - 100) * 7;
        } else {
            bill = 100 * 5
                 + 100 * 7
                 + (units - 200) * 10;
        }

        System.out.printf("Bill = ₹%.2f%n", bill);

        sc.close();
    }
}
```

This is an excellent example of using ranges and `else-if`.

---

# 72. Practical Program — Admission Eligibility

Suppose a student needs:

```text
marks >= 60
AND
attendance >= 75
```

Program:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter marks: ");
        int marks = sc.nextInt();

        System.out.print("Enter attendance percentage: ");
        double attendance = sc.nextDouble();

        if (marks >= 60 && attendance >= 75) {
            System.out.println("Eligible for admission");
        } else {
            System.out.println("Not eligible");
        }

        sc.close();
    }
}
```

---

# 73. Practical Program — Login Decision

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Username: ");
        String username = sc.nextLine();

        System.out.print("Password: ");
        String password = sc.nextLine();

        if ("admin".equals(username) && "1234".equals(password)) {
            System.out.println("Login successful");
        } else {
            System.out.println("Invalid username or password");
        }

        sc.close();
    }
}
```

Notice the style:

```java
"admin".equals(username)
```

instead of:

```java
username.equals("admin")
```

The first form remains safe if `username` is `null`.

---

# 74. Practical Program — Age Category

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        if (age < 0) {
            System.out.println("Invalid age");
        } else if (age <= 12) {
            System.out.println("Child");
        } else if (age <= 19) {
            System.out.println("Teenager");
        } else if (age <= 59) {
            System.out.println("Adult");
        } else {
            System.out.println("Senior");
        }

        sc.close();
    }
}
```

---

# 75. Practical Program — Discount Calculator

Suppose:

```text
Purchase >= 5000 → 20%
Purchase >= 2000 → 10%
Otherwise         → 0%
```

Program:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter purchase amount: ");
        double amount = sc.nextDouble();

        double discountRate;

        if (amount >= 5000) {
            discountRate = 0.20;
        } else if (amount >= 2000) {
            discountRate = 0.10;
        } else {
            discountRate = 0.0;
        }

        double discount = amount * discountRate;
        double finalAmount = amount - discount;

        System.out.printf("Discount = %.2f%n", discount);
        System.out.printf("Final amount = %.2f%n", finalAmount);

        sc.close();
    }
}
```

---

# 76. Practical Program — Simple ATM Decision

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        double balance = 10000;

        System.out.print("Enter withdrawal amount: ");
        double amount = sc.nextDouble();

        if (amount <= 0) {
            System.out.println("Invalid amount");
        } else if (amount > balance) {
            System.out.println("Insufficient balance");
        } else {
            balance -= amount;
            System.out.printf("Withdrawal successful%n");
            System.out.printf("Remaining balance = %.2f%n", balance);
        }

        sc.close();
    }
}
```

This is still a simple educational example, not a real banking system.

---

# 77. Common Mistake — Assignment Instead of Comparison

This is wrong for a condition:

```java
if (age = 18) {
}
```

`=` means assignment.

Comparison uses:

```java
==
```

Correct:

```java
if (age == 18) {
}
```

Remember:

```text
=   → assign
==  → compare
```

---

# 78. Common Mistake — Semicolon After `if`

Do not write:

```java
if (age >= 18);
{
    System.out.println("Adult");
}
```

The semicolon terminates the `if` statement.

The block afterward is no longer controlled by the condition.

Correct:

```java
if (age >= 18) {
    System.out.println("Adult");
}
```

---

# 79. Common Mistake — Missing Braces

Java technically allows:

```java
if (age >= 18)
    System.out.println("Adult");
```

But when there are multiple statements, braces are important.

Prefer:

```java
if (age >= 18) {
    System.out.println("Adult");
    System.out.println("Eligible");
}
```

Braces make the scope obvious and reduce mistakes.

---

# 80. The Dangling `else` Problem

Consider:

```java
if (a > 0)
    if (b > 0)
        System.out.println("Both positive");
    else
        System.out.println("b is not positive");
```

Which `if` does the `else` belong to?

Java associates an `else` with the nearest unmatched `if`.

To make code clear, use braces:

```java
if (a > 0) {
    if (b > 0) {
        System.out.println("Both positive");
    } else {
        System.out.println("b is not positive");
    }
}
```

This is much easier to understand.

---

# 81. Common Mistake — Wrong `else-if` Order

Bad:

```java
if (marks >= 40) {
    System.out.println("Pass");
} else if (marks >= 90) {
    System.out.println("A");
}
```

The `>= 90` branch is unreachable in practice within this chain because every mark of 90 or more already satisfies `marks >= 40`.

Better:

```java
if (marks >= 90) {
    System.out.println("A");
} else if (marks >= 40) {
    System.out.println("Pass");
}
```

---

# 82. Common Mistake — Using `==` for String Content

Avoid:

```java
if (name == "Aman") {
}
```

Use:

```java
if ("Aman".equals(name)) {
}
```

or:

```java
if (name != null && name.equals("Aman")) {
}
```

The first version is often simpler and null-safe.

---

# 83. Common Mistake — Integer Division in Conditions

Consider:

```java
int a = 1;
int b = 2;

if (a / b == 0.5) {
    System.out.println("Equal");
}
```

This does not behave as a floating-point division because both operands are integers.

```text
1 / 2
↓
0
```

Use:

```java
if ((double) a / b == 0.5) {
    ...
}
```

when floating-point division is intended.

---

# 84. Common Mistake — Floating-Point Exact Comparison

Avoid relying on:

```java
if (0.1 + 0.2 == 0.3)
```

for exact equality.

Floating-point representation can make the result slightly different.

Use an appropriate tolerance for numerical applications.

---

# 85. `if` Conditions Must Be Boolean

Java does not allow C-style implicit integer-to-boolean conditions.

This is invalid:

```java
int x = 10;

if (x) {
}
```

Java requires:

```java
if (x > 0) {
}
```

or:

```java
boolean positive = true;

if (positive) {
}
```

This is different from languages where non-zero numbers can be treated as true.

---

# 86. No Implicit Boolean Conversion

These are not valid:

```java
if (1) {
}
```

or:

```java
if ("hello") {
}
```

Java conditions must have type:

```java
boolean
```

or evaluate to a boolean expression.

---

# 87. Complex Condition Example

Consider:

```java
int age = 25;
boolean citizen = true;
boolean specialPermission = false;

if ((age >= 18 && citizen) || specialPermission) {
    System.out.println("Eligible");
}
```

Break it down:

```text
age >= 18
   ↓
true

citizen
   ↓
true

true && true
   ↓
true

specialPermission
   ↓
false

true || false
   ↓
true
```

Therefore:

```text
Eligible
```

Learning to break complex conditions into small pieces is an important programming skill.

---

# 88. Boolean Variables Can Simplify Conditions

Instead of:

```java
if (isLoggedIn == true) {
}
```

write:

```java
if (isLoggedIn) {
}
```

Similarly:

Instead of:

```java
if (isLoggedIn == false) {
}
```

write:

```java
if (!isLoggedIn) {
}
```

Example:

```java
boolean isLoggedIn = true;

if (isLoggedIn) {
    System.out.println("Welcome");
}
```

---

# 89. Avoid Unnecessary Boolean Comparisons

Prefer:

```java
if (hasPermission) {
}
```

instead of:

```java
if (hasPermission == true) {
}
```

Prefer:

```java
if (!hasPermission) {
}
```

instead of:

```java
if (hasPermission == false) {
}
```

The shorter versions are easier to read.

---

# 90. Combining Conditions with Methods

Conditions can use method calls.

Example:

```java
String name = "Aman";

if (!name.isEmpty()) {
    System.out.println("Name provided");
}
```

Another:

```java
String email = "user@example.com";

if (email.contains("@")) {
    System.out.println("Looks like an email");
}
```

These are simple examples; real validation should be more rigorous.

---

# 91. Conditions and Null

Reference variables can contain:

```java
null
```

You can check:

```java
if (name == null) {
    System.out.println("No name");
}
```

Or:

```java
if (name != null) {
    System.out.println(name);
}
```

Remember:

```text
null means no object reference
```

You will study references and `null` much more deeply in the OOP chapters.

---

# 92. `instanceof` in Conditions

Java provides:

```java
instanceof
```

to test whether an object is compatible with a type.

Example:

```java
Object value = "Java";

if (value instanceof String) {
    System.out.println("It is a String");
}
```

Output:

```text
It is a String
```

This becomes especially important when studying inheritance and polymorphism.

---

# 93. Pattern Matching with `instanceof`

Modern Java can combine the type test and variable binding.

Example:

```java
Object value = "Java";

if (value instanceof String text) {
    System.out.println(text.length());
}
```

If the object is a String, Java makes the matched variable:

```java
text
```

available in the appropriate scope.

You will study this more deeply in the modern Java chapter.

---

# 94. Conditions in Loops

Conditions are not limited to `if`.

Loops also use conditions.

For example:

```java
int i = 1;

while (i <= 5) {
    System.out.println(i);
    i++;
}
```

The condition:

```java
i <= 5
```

determines whether the loop continues.

You will study loops in Chapter 7.

---

# 95. Conditions in Methods

Methods can return boolean values.

Example:

```java
public static boolean isEven(int number) {
    return number % 2 == 0;
}
```

Then:

```java
if (isEven(10)) {
    System.out.println("Even");
}
```

Output:

```text
Even
```

This is an important connection between conditions and methods.

---

# 96. Good Condition Design

A good condition should be:

```text
clear
correct
easy to read
easy to test
```

Instead of:

```java
if (!(age < 18) && !(!citizen || banned)) {
}
```

sometimes it is better to introduce meaningful boolean variables:

```java
boolean adult = age >= 18;
boolean allowed = citizen && !banned;

if (adult && allowed) {
    ...
}
```

Readable logic is easier to maintain.

---

# 97. Practical Example — Password Strength

A very basic educational check:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter password: ");
        String password = sc.nextLine();

        if (password.length() >= 8) {
            System.out.println("Password has at least 8 characters.");
        } else {
            System.out.println("Password is too short.");
        }

        sc.close();
    }
}
```

This is not a complete password-security check. It simply demonstrates a condition.

---

# 98. Practical Example — Shipping Eligibility

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter order amount: ");
        double amount = sc.nextDouble();

        System.out.print("Enter distance in km: ");
        double distance = sc.nextDouble();

        if (amount >= 1000 && distance <= 20) {
            System.out.println("Free shipping");
        } else {
            System.out.println("Shipping charges apply");
        }

        sc.close();
    }
}
```

---

# 99. Practical Example — Login with Account Status

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Username: ");
        String username = sc.nextLine();

        System.out.print("Password: ");
        String password = sc.nextLine();

        boolean active = true;

        if ("admin".equals(username) && "1234".equals(password)) {
            if (active) {
                System.out.println("Login successful");
            } else {
                System.out.println("Account is inactive");
            }
        } else {
            System.out.println("Invalid credentials");
        }

        sc.close();
    }
}
```

This example demonstrates nested decisions.

---

# 100. Decision-Making Cheat Sheet

```text
if
→ execute something only when a condition is true

if-else
→ choose between two paths

else-if
→ choose among multiple conditions

nested if
→ condition inside another condition

switch
→ choose among discrete values

switch expression
→ choose a value based on a case

ternary
→ compact two-way value selection
```

---

# 101. `if` Decision Tree

```text
                 Condition
                    │
              ┌─────┴─────┐
             true        false
              │             │
              ▼             ▼
          execute         skip
           block           block
```

---

# 102. `if-else` Decision Tree

```text
                 Condition
                    │
              ┌─────┴─────┐
             true        false
              │             │
              ▼             ▼
           if block      else block
              │             │
              └──────┬──────┘
                     ▼
                   End
```

---

# 103. `else-if` Decision Tree

```text
             Condition 1
              /       \
           true       false
            │           │
            ▼           ▼
         Block 1    Condition 2
                      /     \
                   true     false
                    │         │
                    ▼         ▼
                 Block 2   Condition 3
```

Continue until one condition matches or `else` is reached.

---

# 104. `switch` Decision Tree

```text
                 value
                   │
        ┌──────────┼──────────┐
        │          │          │
      case 1     case 2     case 3
        │          │          │
        ▼          ▼          ▼
      Action     Action      Action
        │          │          │
        └──────────┴──────────┘
                   │
                 default
```

---

# 105. Practice Questions — Basic

Write programs for:

1. Check whether a number is positive.
2. Check whether a number is negative.
3. Check whether a number is zero.
4. Check whether a number is even or odd.
5. Check whether a person is an adult.
6. Check whether marks are passing.
7. Find the larger of two numbers.
8. Check whether two numbers are equal.
9. Check whether a character is uppercase.
10. Check whether a character is a digit.

---

# 106. Practice Questions — `if-else-if`

Write programs to:

1. Find the grade from marks.
2. Categorize age.
3. Find the largest of three numbers.
4. Find the smallest of three numbers.
5. Determine whether a year is a leap year.
6. Calculate a discount based on purchase amount.
7. Calculate an electricity bill using slabs.
8. Classify a number as positive, negative, or zero.
9. Check whether a triangle angle value is valid.
10. Determine a student's result category.

---

# 107. Practice Questions — Logical Operators

Write programs that check:

1. Age and citizenship eligibility.
2. Username and password.
3. Whether a number lies within a range.
4. Whether a number is divisible by both 3 and 5.
5. Whether a number is divisible by either 3 or 5.
6. Whether a person is eligible based on marks and attendance.
7. Whether a product gets free shipping.
8. Whether a user is logged in and has permission.
9. Whether an account is active and verified.
10. Whether a number is outside a specified range.

---

# 108. Practice Questions — `switch`

Write programs for:

1. Day of week.
2. Month number to month name.
3. Simple calculator.
4. Menu selection.
5. Grade description.
6. Traffic signal.
7. Basic unit converter.
8. Number to word for values 1–5.
9. Season selection.
10. Character-based menu.

---

# 109. Challenge — ATM Menu

Create:

```text
===== ATM =====
1. Check Balance
2. Deposit
3. Withdraw
4. Exit
```

Take the user's choice and perform the appropriate action.

Use:

```java
switch
```

and conditions where needed.

---

# 110. Challenge — Student Result System

Take:

```text
student name
marks of 5 subjects
```

Calculate:

```text
total
percentage
grade
pass/fail
```

Validation:

```text
Each mark must be between 0 and 100.
```

Suggested logic:

```text
invalid marks
    ↓
show error

otherwise
    ↓
calculate percentage
    ↓
determine grade
    ↓
display result
```

---

# 111. Challenge — Login System

Create a simple program with:

```text
username
password
account status
```

Rules:

```text
wrong username/password
    → invalid credentials

correct credentials + inactive account
    → account inactive

correct credentials + active account
    → login successful
```

Use:

```java
if
else-if
&&
```

---

# 112. Challenge — Shopping Discount

Rules:

```text
amount >= 10000 → 30%
amount >= 5000  → 20%
amount >= 2000  → 10%
otherwise       → 0%
```

Print:

```text
Original amount
Discount percentage
Discount amount
Final amount
```

Use `printf()` for money formatting.

---

# 113. Challenge — Number Analyzer

Take an integer and determine:

```text
positive/negative/zero
even/odd
divisible by 3?
divisible by 5?
```

For example:

```text
Input: 30

Positive
Even
Divisible by 3
Divisible by 5
```

Notice that multiple independent `if` statements are useful here because multiple properties can be true at the same time.

---

# 114. Interview Questions

## Q1. What is an `if` statement?

An `if` statement conditionally executes a block of code when a boolean condition is true.

---

## Q2. What is `if-else`?

It provides two alternative execution paths:

```text
true  → if
false → else
```

---

## Q3. What is `else-if`?

It allows multiple conditions to be checked in sequence.

The first true condition's block executes.

---

## Q4. Can multiple `if` blocks execute?

Yes.

With separate `if` statements, every condition is checked independently.

---

## Q5. Can multiple `else-if` branches execute?

No.

In a single `if-else-if-else` chain, at most one branch executes.

---

## Q6. What is nested `if`?

An `if` statement placed inside another conditional block.

---

## Q7. What is `switch` used for?

`switch` is useful when selecting among discrete values or cases.

---

## Q8. What is `break` used for in traditional switch?

It exits the switch statement and prevents execution from falling through to later cases.

---

## Q9. What is fall-through?

In traditional switch syntax, if a matching case does not end with a control transfer such as `break`, execution can continue into subsequent cases.

---

## Q10. What is `default`?

It is the fallback branch of a traditional switch when no case matches.

---

## Q11. What is a switch expression?

A modern switch form that produces a value.

Example:

```java
String result = switch (day) {
    case 1 -> "Monday";
    default -> "Unknown";
};
```

---

## Q12. What is the ternary operator?

A conditional expression with three parts:

```java
condition ? trueValue : falseValue
```

---

## Q13. Can Java use an integer directly as an `if` condition?

No.

Java requires a boolean expression.

This is invalid:

```java
if (1) {
}
```

---

## Q14. Difference between `=` and `==`?

```text
=  → assignment
== → equality comparison
```

---

## Q15. How do you compare Strings?

Use `.equals()` for content equality.

Example:

```java
"Java".equals(name)
```

---

## Q16. Why is `"Java".equals(name)` useful?

It avoids calling a method on `name` when `name` is null.

---

## Q17. What is short-circuit evaluation?

With `&&` and `||`, Java may skip evaluation of the right-hand operand when the result is already determined by the left-hand operand.

---

## Q18. Why is this safe?

```java
if (name != null && name.length() > 0)
```

Because if `name != null` is false, `&&` does not evaluate `name.length()`.

---

## Q19. What is the difference between `if` and `switch`?

`if` is more flexible for comparisons, ranges, and complex boolean expressions.

`switch` is convenient for choosing among discrete values.

---

## Q20. What is a nested condition?

A condition placed inside another condition.

---

# 115. Interview Output Questions

### Question 1

What is the output?

```java
int x = 10;

if (x > 5) {
    System.out.println("A");
}

System.out.println("B");
```

Answer:

```text
A
B
```

---

### Question 2

```java
int x = 10;

if (x > 20) {
    System.out.println("A");
} else {
    System.out.println("B");
}
```

Output:

```text
B
```

---

### Question 3

```java
int x = 10;

if (x > 0) {
    System.out.println("Positive");
} else if (x % 2 == 0) {
    System.out.println("Even");
}
```

Output:

```text
Positive
```

The second condition is not reached.

---

### Question 4

```java
int x = 10;

if (x > 0) {
    System.out.println("Positive");
}

if (x % 2 == 0) {
    System.out.println("Even");
}
```

Output:

```text
Positive
Even
```

---

### Question 5

```java
int x = 5;

if (x > 0 && x < 10) {
    System.out.println("A");
}
```

Output:

```text
A
```

---

### Question 6

```java
int x = 10;

if (x < 5 || x == 10) {
    System.out.println("Yes");
}
```

Output:

```text
Yes
```

---

# 116. Important Mental Model

When reading a condition, ask:

```text
What is being checked?
        ↓
What boolean value does it produce?
        ↓
Which branch executes?
```

For example:

```java
if (marks >= 40) {
    System.out.println("Pass");
} else {
    System.out.println("Fail");
}
```

Think:

```text
marks >= 40?
      │
   ┌──┴──┐
 true   false
   │       │
 Pass     Fail
```

This mental model makes conditional code much easier to understand.

---

# 117. Conditions in Real Programs

Almost every serious application uses conditions.

Examples:

```text
Login
  ↓
Is username correct?
  ↓
Is password correct?
  ↓
Is account active?
```

Shopping:

```text
Cart
  ↓
Is coupon valid?
  ↓
Is minimum amount reached?
  ↓
Apply discount
```

Banking:

```text
Withdrawal request
  ↓
Is amount valid?
  ↓
Is balance sufficient?
  ↓
Process withdrawal
```

Games:

```text
Player action
  ↓
Is move valid?
  ↓
Is player alive?
  ↓
Update game
```

Web applications:

```text
Request
  ↓
Is user authenticated?
  ↓
Is user authorized?
  ↓
Perform operation
```

Conditions are therefore not just beginner syntax. They are a fundamental part of software logic.

---

# 118. Connection to Previous Chapters

You now have:

```text
Chapter 3
Variables & Data Types
        ↓
Chapter 4
Operators
        ↓
Chapter 5
Input & Output
        ↓
Chapter 6
Conditions
```

Together, these allow you to build programs like:

```text
User Input
    ↓
Store in Variables
    ↓
Perform Calculations
    ↓
Check Conditions
    ↓
Choose Action
    ↓
Display Output
```

This is the basic structure of many programs.

---

# 119. Connection to the Next Chapter

The next major step is repetition.

Conditions answer:

```text
Should I do this?
```

Loops answer:

```text
Should I keep doing this?
```

For example:

```java
if (age >= 18) {
    System.out.println("Adult");
}
```

checks something once.

A loop can repeatedly check a condition:

```java
while (age < 18) {
    // repeat
}
```

You will learn this in:

# Chapter 7 — Loops

Topics will include:

```text
while
do-while
for
nested loops
break
continue
enhanced for loop
loop patterns
common loop mistakes
practical problems
```

---

# 120. Final Revision

Remember these structures.

Basic `if`:

```java
if (condition) {
    // code
}
```

`if-else`:

```java
if (condition) {
    // true
} else {
    // false
}
```

`else-if`:

```java
if (condition1) {
    // ...
} else if (condition2) {
    // ...
} else {
    // ...
}
```

Nested `if`:

```java
if (condition1) {
    if (condition2) {
        // ...
    }
}
```

Traditional switch:

```java
switch (value) {
    case 1:
        // ...
        break;

    case 2:
        // ...
        break;

    default:
        // ...
}
```

Modern switch:

```java
switch (value) {
    case 1 -> "One";
    case 2 -> "Two";
    default -> "Other";
}
```

Ternary:

```java
condition ? value1 : value2
```

Logical operators:

```text
&& → AND
|| → OR
!  → NOT
```

Comparison operators:

```text
>   <   >=   <=   ==   !=
```

Most importantly:

```text
if
    ↓
decision

else
    ↓
alternative

else-if
    ↓
multiple alternatives

switch
    ↓
discrete choices
```

Once conditions become comfortable, you are ready to move from simple one-time decisions to repeated logic with loops.
