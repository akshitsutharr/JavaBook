# Chapter 5 — Input & Output in Java

> **Java Master Course — Chapter 5 of 50**
>
> In this chapter, we learn how a Java program communicates with the outside world: how it displays information on the screen and how it accepts information from the user.

---

## 1. What is Input and Output?

Almost every useful program needs two basic abilities:

1. **Input** — receive data from somewhere.
2. **Output** — send/display data somewhere.

For example, imagine a program that calculates the area of a rectangle.

The program may need:

```text
Input:
Length = 10
Width  = 5

Processing:
Area = length × width

Output:
Area = 50
```

The basic flow is:

```text
          INPUT
            ↓
     ┌──────────────┐
     │ Java Program │
     │              │
     │ Processing   │
     └──────────────┘
            ↓
          OUTPUT
```

Input does not always have to come from a keyboard. It can come from:

- keyboard
- file
- network
- database
- another program
- command-line arguments
- sensors or other devices

Similarly, output does not always mean the console. It can go to:

- console
- file
- database
- network
- another program
- GUI

In this chapter, our main focus is **console input and output**.

---

# 2. Console Input and Output

When you run a normal Java program from a terminal, you commonly interact with three standard streams:

```text
System.in   → standard input
System.out  → standard output
System.err  → standard error
```

You can visualize them like this:

```text
Keyboard
   │
   ▼
System.in
   │
   ▼
Java Program
   │
   ├──────────────► System.out ─────► Normal output
   │
   └──────────────► System.err ─────► Error output
```

The `System` class provides these streams.

---

# 3. `System.out`

The most common way to display output in Java is:

```java
System.out.println("Hello");
```

Let's understand each part.

```text
System
  │
  └── out
       │
       └── println()
```

`System` is a class provided by Java.

`out` is a standard output stream.

`println()` prints something and then moves the cursor to the next line.

---

# 4. `print()` vs `println()`

## `println()`

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
        System.out.println("Java");
    }
}
```

Output:

```text
Hello
Java
```

Each `println()` ends with a line break.

---

## `print()`

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("Hello");
        System.out.print("Java");
    }
}
```

Output:

```text
HelloJava
```

`print()` does not automatically move to the next line.

---

## Combining both

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("Hello ");
        System.out.println("Java");
        System.out.print("Welcome");
    }
}
```

Output:

```text
Hello Java
Welcome
```

---

# 5. Printing Variables

You can print variables directly.

```java
public class Main {
    public static void main(String[] args) {
        int age = 20;
        double price = 99.50;
        String name = "Rahul";

        System.out.println(age);
        System.out.println(price);
        System.out.println(name);
    }
}
```

Output:

```text
20
99.5
Rahul
```

---

# 6. Printing Text and Variables Together

Java allows string concatenation using `+`.

```java
public class Main {
    public static void main(String[] args) {
        String name = "Rahul";
        int age = 20;

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}
```

Output:

```text
Name: Rahul
Age: 20
```

This is one of the most commonly used forms of output.

---

# 7. Important Rule: `+` with Strings

When one side of `+` is a `String`, Java performs string concatenation.

Example:

```java
System.out.println("Age: " + 20);
```

Output:

```text
Age: 20
```

The number `20` is converted into text for concatenation.

---

## 7.1 Left-to-right evaluation

This is important.

Consider:

```java
System.out.println(10 + 20 + " Java");
```

Evaluation happens from left to right:

```text
10 + 20
   ↓
30 + " Java"
   ↓
"30 Java"
```

Output:

```text
30 Java
```

Now consider:

```java
System.out.println("Java " + 10 + 20);
```

First:

```text
"Java " + 10
      ↓
"Java 10"
```

Then:

```text
"Java 10" + 20
      ↓
"Java 1020"
```

Output:

```text
Java 1020
```

So:

```java
System.out.println(10 + 20 + " Java");
```

prints:

```text
30 Java
```

while:

```java
System.out.println("Java " + 10 + 20);
```

prints:

```text
Java 1020
```

If you want addition first, use parentheses:

```java
System.out.println("Java " + (10 + 20));
```

Output:

```text
Java 30
```

---

# 8. Printing Multiple Values

You can concatenate many values.

```java
public class Main {
    public static void main(String[] args) {
        String name = "Aman";
        int age = 21;
        double marks = 87.5;

        System.out.println(
            "Name: " + name +
            ", Age: " + age +
            ", Marks: " + marks
        );
    }
}
```

Output:

```text
Name: Aman, Age: 21, Marks: 87.5
```

---

# 9. Escape Sequences

Sometimes you need special characters inside strings.

Java provides escape sequences.

Common escape sequences:

| Escape | Meaning |
|---|---|
| `\n` | New line |
| `\t` | Tab |
| `\"` | Double quote |
| `\'` | Single quote |
| `\\` | Backslash |
| `\b` | Backspace |
| `\r` | Carriage return |
| `\f` | Form feed |

---

## 9.1 New line — `\n`

```java
System.out.println("Hello\nJava");
```

Output:

```text
Hello
Java
```

---

## 9.2 Tab — `\t`

```java
System.out.println("Name\tAge");
System.out.println("Aman\t20");
```

Typical output:

```text
Name    Age
Aman    20
```

---

## 9.3 Double quote — `\"`

You cannot normally write an unescaped double quote inside a Java string.

This is invalid:

```java
System.out.println("He said "Hello"");
```

Use:

```java
System.out.println("He said \"Hello\"");
```

Output:

```text
He said "Hello"
```

---

## 9.4 Backslash — `\\`

```java
System.out.println("C:\\Users\\Aman");
```

Output:

```text
C:\Users\Aman
```

This is especially important when working with Windows paths.

---

# 10. `printf()`

Java also provides formatted output using:

```java
System.out.printf();
```

Example:

```java
public class Main {
    public static void main(String[] args) {
        String name = "Aman";
        int age = 20;

        System.out.printf("Name: %s, Age: %d%n", name, age);
    }
}
```

Output:

```text
Name: Aman, Age: 20
```

`printf()` is useful when you want precise control over formatting.

---

# 11. Common `printf()` Format Specifiers

| Specifier | Used for |
|---|---|
| `%d` | integer |
| `%f` | floating-point number |
| `%s` | String |
| `%c` | character |
| `%b` | boolean |
| `%n` | platform-independent new line |
| `%e` | scientific notation |

Example:

```java
int age = 20;
double marks = 92.5678;
char grade = 'A';
boolean passed = true;
String name = "Aman";

System.out.printf(
    "Name=%s Age=%d Marks=%f Grade=%c Passed=%b%n",
    name, age, marks, grade, passed
);
```

Output:

```text
Name=Aman Age=20 Marks=92.567800 Grade=A Passed=true
```

---

# 12. Formatting Decimal Values

Suppose you have:

```java
double price = 99.56789;
```

You may want only two digits after the decimal.

Use:

```java
System.out.printf("%.2f%n", price);
```

Output:

```text
99.57
```

Here:

```text
.2
```

means two digits after the decimal.

---

## More examples

```java
System.out.printf("%.1f%n", 12.345);
System.out.printf("%.2f%n", 12.345);
System.out.printf("%.3f%n", 12.345);
```

Output:

```text
12.3
12.35
12.345
```

The value is rounded for display.

---

# 13. Width and Alignment

`printf()` can also control field width.

Example:

```java
System.out.printf("%10s%n", "Java");
```

The output reserves a field of width 10.

You can use this to make simple tables.

```java
System.out.printf("%-10s %5d%n", "Aman", 90);
System.out.printf("%-10s %5d%n", "Riya", 95);
System.out.printf("%-10s %5d%n", "Raj", 88);
```

Typical output:

```text
Aman          90
Riya          95
Raj           88
```

`-` means left alignment.

Without `-`, text/numbers are generally right aligned within the specified width.

---

# 14. `System.out` vs `System.err`

Java provides:

```java
System.out
```

for normal output and:

```java
System.err
```

for error messages.

Example:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Program started");

        System.err.println("Something went wrong");
    }
}
```

The exact appearance depends on the terminal/IDE, but conceptually:

```text
System.out → normal program output
System.err → error/diagnostic output
```

They are separate streams.

---

# 15. What is Input?

Output is easy:

```text
Java → screen
```

Input is the reverse:

```text
Keyboard → Java
```

Java's standard input stream is:

```java
System.in
```

But directly reading raw bytes from `System.in` is not convenient for beginner-level input.

For console programs, a very common solution is:

```java
Scanner
```

---

# 16. Scanner

`Scanner` is a class in:

```java
java.util
```

So you normally import it:

```java
import java.util.Scanner;
```

Basic example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your age: ");
        int age = sc.nextInt();

        System.out.println("Your age is: " + age);

        sc.close();
    }
}
```

Example interaction:

```text
Enter your age: 20
Your age is: 20
```

---

# 17. Understanding This Line

```java
Scanner sc = new Scanner(System.in);
```

Break it into parts:

```text
Scanner
   ↓
type/class

sc
   ↓
reference variable

new Scanner(...)
   ↓
creates a Scanner object

System.in
   ↓
source of input
```

This is also your first important example of an object being created from a class.

You will study this much more deeply in the OOP chapters.

For now, understand:

```java
Scanner sc
```

means `sc` is a reference capable of referring to a `Scanner` object.

And:

```java
new Scanner(System.in)
```

creates the object.

---

# 18. Reading an Integer

Use:

```java
nextInt()
```

Example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int n = sc.nextInt();

        System.out.println("You entered: " + n);

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
Enter a number: 25
You entered: 25
```

---

# 19. Reading a `long`

Use:

```java
nextLong()
```

```java
long population = sc.nextLong();
```

Example:

```java
System.out.print("Enter population: ");
long population = sc.nextLong();

System.out.println("Population = " + population);
```

---

# 20. Reading a `double`

Use:

```java
nextDouble()
```

```java
double salary = sc.nextDouble();
```

Example:

```java
System.out.print("Enter salary: ");
double salary = sc.nextDouble();

System.out.println("Salary = " + salary);
```

---

# 21. Reading a `float`

Use:

```java
nextFloat()
```

```java
float temperature = sc.nextFloat();
```

---

# 22. Reading a Boolean

Use:

```java
nextBoolean()
```

Example:

```java
System.out.print("Are you a student? ");
boolean student = sc.nextBoolean();

System.out.println("Student: " + student);
```

Input:

```text
true
```

Output:

```text
Student: true
```

The input must be in a form that `Scanner` recognizes as a boolean, such as:

```text
true
```

or:

```text
false
```

---

# 23. Reading a Word with `next()`

`next()` reads the next token.

Example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = sc.next();

        System.out.println("Hello " + name);

        sc.close();
    }
}
```

Input:

```text
Aman
```

Output:

```text
Hello Aman
```

---

# 24. What is a Token?

Suppose the user enters:

```text
Aman Sharma
```

There are two words/tokens:

```text
Aman
Sharma
```

If you call:

```java
sc.next()
```

you get only:

```text
Aman
```

The next `next()` would return:

```text
Sharma
```

---

# 25. Reading a Complete Line with `nextLine()`

If you want to read the entire line, use:

```java
nextLine()
```

Example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your full name: ");
        String name = sc.nextLine();

        System.out.println("Hello " + name);

        sc.close();
    }
}
```

Input:

```text
Aman Sharma
```

Output:

```text
Hello Aman Sharma
```

---

# 26. `next()` vs `nextLine()`

This difference is extremely important.

Suppose the user enters:

```text
Aman Sharma
```

Then:

```java
String x = sc.next();
```

stores:

```text
Aman
```

while:

```java
String x = sc.nextLine();
```

stores:

```text
Aman Sharma
```

So:

```text
next()
   ↓
one token/word

nextLine()
   ↓
the complete remaining line
```

---

# 27. The Famous `nextInt()` + `nextLine()` Problem

This is one of the most common beginner problems in Java.

Consider:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        System.out.print("Enter name: ");
        String name = sc.nextLine();

        System.out.println("Age: " + age);
        System.out.println("Name: " + name);

        sc.close();
    }
}
```

Suppose input is:

```text
20
Aman Sharma
```

You may expect:

```text
Age: 20
Name: Aman Sharma
```

But `name` may become an empty string.

Why?

---

# 28. Why Does This Happen?

Suppose the user types:

```text
20\n
```

The `\n` represents the Enter/newline.

`nextInt()` reads the integer:

```text
20
```

but it does not consume the line separator after it.

Conceptually:

```text
20\n
^^
nextInt() consumes 20

Remaining:
  \n
```

Then:

```java
sc.nextLine();
```

sees the remaining newline and consumes it.

So it returns an empty line.

---

# 29. Correct Solution

After `nextInt()`, consume the remaining line:

```java
int age = sc.nextInt();
sc.nextLine();

String name = sc.nextLine();
```

Complete example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter age: ");
        int age = sc.nextInt();
        sc.nextLine();

        System.out.print("Enter full name: ");
        String name = sc.nextLine();

        System.out.println("Age: " + age);
        System.out.println("Name: " + name);

        sc.close();
    }
}
```

Input:

```text
20
Aman Sharma
```

Output:

```text
Age: 20
Name: Aman Sharma
```

Remember this pattern:

```java
nextInt();
nextLine();
```

when you need to switch from numeric token input to full-line input.

---

# 30. Another Approach: Read Everything as String

For some applications, you can read input as strings and then convert it.

For example:

```java
String input = sc.nextLine();
int age = Integer.parseInt(input);
```

This approach can make line handling easier because you consistently read complete lines.

You will learn parsing in more detail below.

---

# 31. Scanner Input Methods

Important methods:

| Method | Reads |
|---|---|
| `next()` | next token |
| `nextLine()` | complete line |
| `nextInt()` | `int` |
| `nextLong()` | `long` |
| `nextShort()` | `short` |
| `nextByte()` | `byte` |
| `nextFloat()` | `float` |
| `nextDouble()` | `double` |
| `nextBoolean()` | `boolean` |

There are also methods for checking whether the next input can be read safely.

---

# 32. Checking Input Before Reading

Suppose you expect an integer.

You can use:

```java
hasNextInt()
```

Example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter an integer: ");

        if (sc.hasNextInt()) {
            int number = sc.nextInt();
            System.out.println("Number = " + number);
        } else {
            System.out.println("Invalid integer");
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
Number = 25
```

If the user enters:

```text
hello
```

the program can report:

```text
Invalid integer
```

---

# 33. Other Useful `hasNext...()` Methods

Examples:

```java
hasNextInt()
hasNextLong()
hasNextDouble()
hasNextBoolean()
hasNext()
hasNextLine()
```

These are useful for input validation.

---

# 34. Parsing Strings into Numbers

Sometimes data arrives as a `String`.

For example:

```java
String ageText = "20";
```

But you need an `int`.

Use:

```java
int age = Integer.parseInt(ageText);
```

Example:

```java
public class Main {
    public static void main(String[] args) {
        String text = "25";

        int number = Integer.parseInt(text);

        System.out.println(number + 5);
    }
}
```

Output:

```text
30
```

Without parsing, `text` is a string:

```text
"25"
```

After parsing:

```text
25
```

is an integer.

---

# 35. Common Parsing Methods

| Method | Result |
|---|---|
| `Integer.parseInt()` | `int` |
| `Long.parseLong()` | `long` |
| `Double.parseDouble()` | `double` |
| `Float.parseFloat()` | `float` |
| `Short.parseShort()` | `short` |
| `Byte.parseByte()` | `byte` |
| `Boolean.parseBoolean()` | `boolean` |

Example:

```java
int a = Integer.parseInt("100");
long b = Long.parseLong("100000");
double c = Double.parseDouble("12.5");
boolean d = Boolean.parseBoolean("true");
```

---

# 36. Invalid Parsing

This is dangerous:

```java
int number = Integer.parseInt("hello");
```

Java cannot convert `"hello"` into an integer.

This results in a:

```text
NumberFormatException
```

You will study exceptions properly in Chapter 25.

For now, remember:

```text
String → valid numeric text → parsing works
String → invalid numeric text → exception
```

Examples:

```java
Integer.parseInt("123");   // works
Integer.parseInt("-50");   // works
Integer.parseInt("12.5");  // fails
Integer.parseInt("abc");   // fails
```

---

# 37. Building a Simple Calculator

Now combine input, variables, operators, and output.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double a = sc.nextDouble();

        System.out.print("Enter second number: ");
        double b = sc.nextDouble();

        double sum = a + b;
        double difference = a - b;
        double product = a * b;

        System.out.println("Sum = " + sum);
        System.out.println("Difference = " + difference);
        System.out.println("Product = " + product);

        if (b != 0) {
            System.out.println("Division = " + (a / b));
        } else {
            System.out.println("Cannot divide by zero");
        }

        sc.close();
    }
}
```

Example:

```text
Enter first number: 20
Enter second number: 5
Sum = 25.0
Difference = 15.0
Product = 100.0
Division = 4.0
```

This is an important milestone because you are now combining:

```text
Input
  ↓
Variables
  ↓
Operators
  ↓
Conditions
  ↓
Output
```

---

# 38. Student Marks Program

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter marks of subject 1: ");
        double m1 = sc.nextDouble();

        System.out.print("Enter marks of subject 2: ");
        double m2 = sc.nextDouble();

        System.out.print("Enter marks of subject 3: ");
        double m3 = sc.nextDouble();

        double total = m1 + m2 + m3;
        double percentage = total / 3;

        System.out.println("Total = " + total);
        System.out.println("Percentage = " + percentage);

        sc.close();
    }
}
```

Example:

```text
Enter marks of subject 1: 80
Enter marks of subject 2: 90
Enter marks of subject 3: 70
Total = 240.0
Percentage = 80.0
```

---

# 39. Reading a Character

`Scanner` does not have a simple `nextChar()` method.

A common way is:

```java
char ch = sc.next().charAt(0);
```

Example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);

        System.out.println("You entered: " + ch);

        sc.close();
    }
}
```

Input:

```text
A
```

Output:

```text
You entered: A
```

---

# 40. How `next().charAt(0)` Works

Suppose input is:

```text
Java
```

Then:

```java
sc.next()
```

returns:

```text
"Java"
```

Then:

```java
.charAt(0)
```

takes the character at index `0`:

```text
J
```

Remember that String indexing starts at zero.

```text
Java
0123
```

Therefore:

```java
"Java".charAt(0)
```

gives:

```text
J
```

---

# 41. Complete User Registration Example

Let's build a slightly larger program.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your full name: ");
        String name = sc.nextLine();

        System.out.print("Enter your age: ");
        int age = sc.nextInt();

        System.out.print("Enter your percentage: ");
        double percentage = sc.nextDouble();

        System.out.print("Are you a student? ");
        boolean student = sc.nextBoolean();

        System.out.println();
        System.out.println("----- Profile -----");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Percentage: " + percentage);
        System.out.println("Student: " + student);

        sc.close();
    }
}
```

Example input:

```text
Aman Sharma
20
88.5
true
```

Output:

```text
----- Profile -----
Name: Aman Sharma
Age: 20
Percentage: 88.5
Student: true
```

---

# 42. What Does `sc.close()` Do?

You may see:

```java
sc.close();
```

This closes the `Scanner`.

Because this Scanner is reading from:

```java
System.in
```

closing the Scanner also closes the underlying input stream.

For a small program that is about to terminate, this is usually fine.

However, you should understand that after closing `System.in`, you cannot normally use that same standard input stream again in the same program.

For beginner console programs, this pattern is common:

```java
Scanner sc = new Scanner(System.in);

// use scanner

sc.close();
```

---

# 43. Should We Create Multiple Scanners for `System.in`?

Usually, no.

Avoid doing this:

```java
Scanner sc1 = new Scanner(System.in);
Scanner sc2 = new Scanner(System.in);
```

Instead, create one Scanner and reuse it:

```java
Scanner sc = new Scanner(System.in);
```

Then use:

```java
sc.nextInt();
sc.nextLine();
sc.nextDouble();
```

as required.

---

# 44. BufferedReader

Another important Java input class is:

```java
BufferedReader
```

It belongs to:

```java
java.io
```

Example:

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br =
            new BufferedReader(new InputStreamReader(System.in));

        System.out.print("Enter your name: ");
        String name = br.readLine();

        System.out.println("Hello " + name);
    }
}
```

Input:

```text
Aman Sharma
```

Output:

```text
Hello Aman Sharma
```

---

# 45. Understanding `BufferedReader`

This line looks complicated:

```java
BufferedReader br =
    new BufferedReader(new InputStreamReader(System.in));
```

Conceptually:

```text
System.in
   ↓
InputStreamReader
   ↓
BufferedReader
   ↓
readLine()
```

Each layer has a role.

`System.in`:

```text
raw byte input
```

`InputStreamReader`:

```text
converts bytes into characters
```

`BufferedReader`:

```text
provides efficient character/line-oriented reading
```

For now, you do not need to memorize the internal implementation.

---

# 46. Scanner vs BufferedReader

Both can read console input, but they work differently.

| Feature | Scanner | BufferedReader |
|---|---|---|
| Package | `java.util` | `java.io` |
| Beginner friendly | Very high | Medium |
| Reads `int` directly | Yes | No |
| Reads `double` directly | Yes | No |
| Reads complete line | Yes | Yes |
| Parsing required | Often no | Often yes |
| Convenient token parsing | Yes | No |
| Typical use | Beginner/simple input | Line-oriented input/advanced use |

Example with Scanner:

```java
int age = sc.nextInt();
```

With BufferedReader:

```java
int age = Integer.parseInt(br.readLine());
```

---

# 47. Why Does BufferedReader Need Parsing?

`readLine()` returns a String.

Suppose the user enters:

```text
25
```

This:

```java
String text = br.readLine();
```

produces:

```text
"25"
```

not:

```text
25
```

To convert it:

```java
int age = Integer.parseInt(text);
```

Therefore:

```text
Keyboard
   ↓
readLine()
   ↓
"25"
   ↓
Integer.parseInt()
   ↓
25
```

---

# 48. Scanner vs BufferedReader — Which Should You Use?

For beginners and small console programs:

```java
Scanner
```

is usually easier.

For line-based input and some performance-sensitive situations:

```java
BufferedReader
```

can be preferable.

Do not fall into the trap of thinking:

```text
Scanner = bad
BufferedReader = always better
```

The correct tool depends on the problem.

If readability and convenience matter, Scanner is often perfectly suitable.

---

# 49. Command-Line Arguments

Look at the main method:

```java
public static void main(String[] args)
```

You have already seen `args`.

`args` contains command-line arguments supplied when the program starts.

Example program:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(args[0]);
    }
}
```

Suppose you run:

```text
java Main Hello
```

Then:

```text
args[0] = "Hello"
```

Output:

```text
Hello
```

---

# 50. Multiple Command-Line Arguments

Program:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("First: " + args[0]);
        System.out.println("Second: " + args[1]);
    }
}
```

Run:

```text
java Main Java Python
```

Output:

```text
First: Java
Second: Python
```

The command-line arguments are Strings.

If you need a number:

```java
int age = Integer.parseInt(args[0]);
```

Example:

```text
java Main 20
```

Then:

```java
int age = Integer.parseInt(args[0]);
```

produces:

```text
20
```

as an integer.

---

# 51. `args` and `Scanner` Are Different

Do not confuse these two types of input.

Command-line arguments:

```text
Program starts
     ↓
arguments already supplied
```

Scanner:

```text
Program starts
     ↓
program waits for user input
```

Example command-line:

```text
java Main Aman 20
```

Example Scanner interaction:

```text
Enter name: Aman
Enter age: 20
```

Both are input, but they happen differently.

---

# 52. Checking `args.length`

Never blindly access:

```java
args[0]
```

if you are not sure an argument was supplied.

You can check:

```java
if (args.length > 0) {
    System.out.println(args[0]);
}
```

Example:

```java
public class Main {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("No arguments supplied");
            return;
        }

        System.out.println("First argument: " + args[0]);
    }
}
```

If run without arguments:

```text
No arguments supplied
```

---

# 53. A Simple Command-Line Calculator

```java
public class Main {
    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Please provide two numbers.");
            return;
        }

        double a = Double.parseDouble(args[0]);
        double b = Double.parseDouble(args[1]);

        System.out.println("Sum = " + (a + b));
    }
}
```

Run:

```text
java Main 10 20
```

Output:

```text
Sum = 30.0
```

Notice the flow:

```text
args[0] → "10"
             ↓
Double.parseDouble()
             ↓
10.0

args[1] → "20"
             ↓
Double.parseDouble()
             ↓
20.0
```

---

# 54. Input Validation

Real programs cannot assume that users always enter correct data.

Suppose your program asks:

```text
Enter age:
```

A user may enter:

```text
twenty
```

instead of:

```text
20
```

Your program should handle invalid input appropriately.

With Scanner:

```java
if (sc.hasNextInt()) {
    int age = sc.nextInt();
    System.out.println("Age = " + age);
} else {
    System.out.println("Invalid age");
}
```

This is an early introduction to validation.

Later, when you study exception handling, you will learn another approach.

---

# 55. Input Validation with a Loop

You can repeatedly ask until the user enters a valid integer.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int age;

        while (true) {
            System.out.print("Enter your age: ");

            if (sc.hasNextInt()) {
                age = sc.nextInt();
                break;
            }

            System.out.println("Invalid input. Please enter a number.");
            sc.next();
        }

        System.out.println("Your age is: " + age);

        sc.close();
    }
}
```

The important part is:

```java
sc.next();
```

inside the invalid-input case.

It removes the invalid token so the loop can try again.

---

# 56. A Practical Login Example

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter username: ");
        String username = sc.nextLine();

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        System.out.println();
        System.out.println("----- User Details -----");
        System.out.println("Username: " + username);
        System.out.println("Age: " + age);

        sc.close();
    }
}
```

Example:

```text
Enter username: akshit
Enter age: 20

----- User Details -----
Username: akshit
Age: 20
```

This looks simple, but it contains several important Java concepts:

```text
Class
↓
main()
↓
Scanner object
↓
Input
↓
Variables
↓
Output
```

---

# 57. Input → Processing → Output

A very useful programming model is:

```text
          ┌──────────┐
          │  INPUT   │
          └────┬─────┘
               ↓
        ┌──────────────┐
        │  PROCESSING  │
        └──────┬───────┘
               ↓
          ┌──────────┐
          │  OUTPUT  │
          └──────────┘
```

Example: calculate circle area.

Input:

```text
radius = 5
```

Processing:

```text
area = π × radius × radius
```

Output:

```text
Area = 78.5398...
```

Code:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter radius: ");
        double radius = sc.nextDouble();

        double area = Math.PI * radius * radius;

        System.out.printf("Area = %.2f%n", area);

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
Area = 78.54
```

---

# 58. Practical Program: Temperature Conversion

Formula:

```text
Celsius = (Fahrenheit - 32) × 5 / 9
```

Program:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter temperature in Fahrenheit: ");
        double fahrenheit = sc.nextDouble();

        double celsius = (fahrenheit - 32) * 5 / 9;

        System.out.printf("Celsius = %.2f%n", celsius);

        sc.close();
    }
}
```

Input:

```text
98.6
```

Output:

```text
Celsius = 37.00
```

---

# 59. Practical Program: Simple Interest

Formula:

```text
SI = (P × R × T) / 100
```

where:

```text
P = Principal
R = Rate
T = Time
```

Code:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter principal: ");
        double p = sc.nextDouble();

        System.out.print("Enter rate: ");
        double r = sc.nextDouble();

        System.out.print("Enter time: ");
        double t = sc.nextDouble();

        double si = (p * r * t) / 100;

        System.out.println("Simple Interest = " + si);

        sc.close();
    }
}
```

---

# 60. Practical Program: BMI Calculator

Formula:

```text
BMI = weight / (height × height)
```

where weight is in kilograms and height is in meters.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter weight in kg: ");
        double weight = sc.nextDouble();

        System.out.print("Enter height in meters: ");
        double height = sc.nextDouble();

        double bmi = weight / (height * height);

        System.out.printf("BMI = %.2f%n", bmi);

        sc.close();
    }
}
```

---

# 61. Practical Program: Average of Three Numbers

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double a = sc.nextDouble();

        System.out.print("Enter second number: ");
        double b = sc.nextDouble();

        System.out.print("Enter third number: ");
        double c = sc.nextDouble();

        double average = (a + b + c) / 3;

        System.out.printf("Average = %.2f%n", average);

        sc.close();
    }
}
```

Input:

```text
10
20
30
```

Output:

```text
Average = 20.00
```

---

# 62. Practical Program: User Profile

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter name: ");
        String name = sc.nextLine();

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        System.out.print("Enter height in cm: ");
        double height = sc.nextDouble();

        System.out.print("Are you a student? ");
        boolean student = sc.nextBoolean();

        System.out.println();
        System.out.println("====================");
        System.out.println("      PROFILE");
        System.out.println("====================");

        System.out.println("Name    : " + name);
        System.out.println("Age     : " + age);
        System.out.println("Height  : " + height + " cm");
        System.out.println("Student : " + student);

        sc.close();
    }
}
```

---

# 63. Output Formatting for Tables

Suppose you want to print student marks.

```java
System.out.printf("%-15s %10s%n", "Name", "Marks");
System.out.printf("%-15s %10.2f%n", "Aman", 88.50);
System.out.printf("%-15s %10.2f%n", "Riya", 91.25);
System.out.printf("%-15s %10.2f%n", "Raj", 76.75);
```

Output:

```text
Name                 Marks
Aman                 88.50
Riya                 91.25
Raj                  76.75
```

This becomes very useful when creating command-line applications.

---

# 64. `println()` vs `printf()`

Use `println()` when you want simple output:

```java
System.out.println("Hello " + name);
```

Use `printf()` when formatting matters:

```java
System.out.printf("Hello %s, your score is %.2f%n", name, score);
```

Think:

```text
println → simple
printf  → formatted
```

---

# 65. `print()` vs `println()` vs `printf()`

| Method | Purpose |
|---|---|
| `print()` | print without automatic new line |
| `println()` | print and move to next line |
| `printf()` | formatted output |

Example:

```java
System.out.print("A");
System.out.println("B");
System.out.printf("%d%n", 10);
```

Output:

```text
AB
10
```

---

# 66. Common Beginner Mistakes

## Mistake 1 — Forgetting the import

Wrong:

```java
Scanner sc = new Scanner(System.in);
```

if you haven't imported Scanner.

Correct:

```java
import java.util.Scanner;
```

---

## Mistake 2 — Using `next()` for a full name

```java
String name = sc.next();
```

Input:

```text
Aman Sharma
```

Result:

```text
Aman
```

For the complete name:

```java
String name = sc.nextLine();
```

---

## Mistake 3 — `nextInt()` followed immediately by `nextLine()`

Potentially problematic:

```java
int age = sc.nextInt();
String name = sc.nextLine();
```

Safer when you want the next full line:

```java
int age = sc.nextInt();
sc.nextLine();
String name = sc.nextLine();
```

---

## Mistake 4 — Parsing invalid input

This can fail:

```java
Integer.parseInt("hello");
```

because `"hello"` is not an integer.

---

## Mistake 5 — Forgetting that Scanner methods can throw input exceptions

For example:

```java
sc.nextInt();
```

expects an integer token.

If the user enters incompatible text, the operation can fail.

Input validation or exception handling is needed for robust programs.

---

## Mistake 6 — Incorrect format specifier

For example:

```java
double price = 99.5;

System.out.printf("%d", price);
```

`%d` is for integer formatting, not a `double`.

Use:

```java
System.out.printf("%f", price);
```

or:

```java
System.out.printf("%.2f", price);
```

---

# 67. Important Concept: Input Is Data

When the user types:

```text
25
```

the computer receives characters/bytes representing that input.

A Java API then interprets those characters as a particular type.

For example:

```text
"25"
  ↓
Integer.parseInt()
  ↓
25
```

This distinction is important:

```text
Text representation
       ↓
Parsing
       ↓
Actual numeric value
```

It is one reason input handling becomes important in larger programs.

---

# 68. Why `Scanner` Is an Object

You may have noticed:

```java
Scanner sc = new Scanner(System.in);
```

This is not just a random syntax.

It demonstrates Java's object-oriented design.

`Scanner` is a class.

```text
Scanner
   ↓
class
```

Then:

```java
new Scanner(System.in)
```

creates an object.

Then:

```java
sc.nextInt()
```

calls a method on that object.

This pattern will become extremely important in the OOP chapters.

You will later learn exactly what:

```java
new
```

does, what an object reference is, and how objects are represented in memory.

---

# 69. A Better Mental Model of Console Input

Think of console input as a stream:

```text
Keyboard
   ↓
Operating System
   ↓
Standard Input
   ↓
System.in
   ↓
Scanner / BufferedReader
   ↓
Your Java Program
```

Output works in the opposite direction:

```text
Your Java Program
   ↓
System.out
   ↓
Standard Output
   ↓
Terminal
   ↓
Screen
```

This is the foundation for understanding file I/O and network I/O later.

---

# 70. Standard Streams

Java programs commonly have:

```text
stdin  → System.in
stdout → System.out
stderr → System.err
```

You can remember:

```text
in  = input
out = normal output
err = error output
```

This terminology is common across many programming languages and operating systems.

---

# 71. A Small Menu Program

Let's combine input, output, conditions, and Scanner.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("===== MENU =====");
        System.out.println("1. Say Hello");
        System.out.println("2. Show Message");
        System.out.println("3. Exit");

        System.out.print("Enter choice: ");
        int choice = sc.nextInt();

        if (choice == 1) {
            System.out.println("Hello, Java!");
        } else if (choice == 2) {
            System.out.println("Welcome to the Java Master Course!");
        } else if (choice == 3) {
            System.out.println("Goodbye!");
        } else {
            System.out.println("Invalid choice.");
        }

        sc.close();
    }
}
```

Example:

```text
===== MENU =====
1. Say Hello
2. Show Message
3. Exit
Enter choice: 2
Welcome to the Java Master Course!
```

This is the beginning of real interactive programs.

---

# 72. Mini Project — Student Result Calculator

Create a program that accepts:

- student name
- roll number
- marks of 3 subjects

Then display:

- total
- average
- percentage

Example solution:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter student name: ");
        String name = sc.nextLine();

        System.out.print("Enter roll number: ");
        int rollNumber = sc.nextInt();

        System.out.print("Enter marks of subject 1: ");
        double m1 = sc.nextDouble();

        System.out.print("Enter marks of subject 2: ");
        double m2 = sc.nextDouble();

        System.out.print("Enter marks of subject 3: ");
        double m3 = sc.nextDouble();

        double total = m1 + m2 + m3;
        double average = total / 3;

        System.out.println();
        System.out.println("===== RESULT =====");
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.printf("Total: %.2f%n", total);
        System.out.printf("Average: %.2f%n", average);

        sc.close();
    }
}
```

---

# 73. Mini Project — Bill Generator

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter product name: ");
        String product = sc.nextLine();

        System.out.print("Enter price: ");
        double price = sc.nextDouble();

        System.out.print("Enter quantity: ");
        int quantity = sc.nextInt();

        double total = price * quantity;

        System.out.println();
        System.out.println("========== BILL ==========");
        System.out.println("Product  : " + product);
        System.out.printf("Price    : %.2f%n", price);
        System.out.println("Quantity : " + quantity);
        System.out.printf("Total    : %.2f%n", total);
        System.out.println("==========================");

        sc.close();
    }
}
```

Example:

```text
Enter product name: Keyboard
Enter price: 1200
Enter quantity: 2

========== BILL ==========
Product  : Keyboard
Price    : 1200.00
Quantity : 2
Total    : 2400.00
==========================
```

---

# 74. Exercises

Try these yourself before looking for solutions.

## Exercise 1 — Basic Input

Ask the user for:

```text
name
age
city
```

Then print:

```text
My name is ___.
I am ___ years old.
I live in ___.
```

---

## Exercise 2 — Rectangle

Take:

```text
length
width
```

Calculate:

```text
area
perimeter
```

---

## Exercise 3 — Circle

Take radius and calculate:

```text
area
circumference
```

Use:

```java
Math.PI
```

---

## Exercise 4 — Salary

Take:

```text
basic salary
```

Calculate:

```text
HRA = 20% of basic
DA  = 10% of basic
Total salary = basic + HRA + DA
```

Display everything using `printf()`.

---

## Exercise 5 — Temperature

Take Celsius and convert it to Fahrenheit.

Formula:

```text
F = C × 9 / 5 + 32
```

---

## Exercise 6 — Character

Take a character from the user and print:

```text
You entered: X
```

Hint:

```java
sc.next().charAt(0)
```

---

## Exercise 7 — Full Name

Ask for a full name containing spaces.

Make sure the complete name is stored.

Hint:

```java
nextLine()
```

---

## Exercise 8 — Input Validation

Ask the user for an integer.

If the input is not an integer, display:

```text
Invalid input
```

Hint:

```java
hasNextInt()
```

---

## Exercise 9 — Command-Line Arguments

Write a program that accepts:

```text
name
age
```

from command-line arguments and prints:

```text
Name: Aman
Age: 20
```

---

## Exercise 10 — Mini Calculator

Take two numbers and print:

```text
Addition
Subtraction
Multiplication
Division
Remainder
```

---

# 75. Challenge Problems

## Challenge 1 — Electricity Bill

Input:

```text
units consumed
```

Create a simple electricity bill calculation using your own slab rules.

Display:

```text
Units
Rate
Bill
```

Use formatted output.

---

## Challenge 2 — Shopping Bill

Input:

```text
Product 1 price
Product 2 price
Product 3 price
```

Calculate:

```text
Subtotal
Tax
Final total
```

Display a clean bill.

---

## Challenge 3 — Student Profile

Take:

```text
Name
Age
Roll Number
Course
Percentage
```

Print a properly formatted student profile.

---

## Challenge 4 — Currency Converter

Take an amount in one currency and convert it using a fixed conversion rate.

The rate can simply be stored as a variable for now.

Do not worry about live exchange rates.

---

# 76. Interview Questions

## Q1. What is `System.out`?

`System.out` is the standard output stream used to send normal program output to the console.

---

## Q2. What is `System.in`?

`System.in` is Java's standard input stream, commonly connected to keyboard input when running a console application.

---

## Q3. Difference between `print()` and `println()`?

`print()` prints without automatically adding a new line.

`println()` prints and then moves to the next line.

---

## Q4. What is `printf()`?

`printf()` produces formatted output using format specifiers such as `%d`, `%f`, `%s`, and `%n`.

---

## Q5. What is Scanner?

`Scanner` is a class from `java.util` used to read and parse input from sources such as `System.in`.

---

## Q6. Difference between `next()` and `nextLine()`?

`next()` reads the next token.

`nextLine()` reads the remainder of the current line.

---

## Q7. Why does `nextInt()` followed by `nextLine()` cause problems?

`nextInt()` reads the integer token but can leave the line separator in the input. The following `nextLine()` may consume that remaining line separator and return an empty string.

A common solution is:

```java
int n = sc.nextInt();
sc.nextLine();
String line = sc.nextLine();
```

---

## Q8. Does Java have `nextChar()` in Scanner?

No. A common approach is:

```java
char ch = sc.next().charAt(0);
```

---

## Q9. What does `Integer.parseInt()` do?

It converts a String containing a valid integer representation into an `int`.

Example:

```java
int n = Integer.parseInt("25");
```

---

## Q10. What happens if parsing fails?

An invalid numeric string can cause `NumberFormatException`.

Example:

```java
Integer.parseInt("hello");
```

---

## Q11. What is BufferedReader?

`BufferedReader` is a character-oriented input class from `java.io` that can efficiently read text, including complete lines.

---

## Q12. Scanner vs BufferedReader?

Scanner provides convenient token-based parsing and can directly read primitive values.

BufferedReader primarily reads characters/lines, so numeric values commonly need explicit parsing.

---

## Q13. What are command-line arguments?

They are arguments supplied when starting the Java program and are received through:

```java
String[] args
```

---

## Q14. What type are command-line arguments?

They are Strings.

For example:

```java
args[0]
```

has type:

```java
String
```

---

## Q15. What is `System.err`?

`System.err` is the standard error stream, commonly used for error and diagnostic messages.

---

# 77. Common Interview Trap

Consider:

```java
System.out.println(10 + 20 + "Java");
```

Answer:

```text
30Java
```

Now:

```java
System.out.println("Java" + 10 + 20);
```

Answer:

```text
Java1020
```

And:

```java
System.out.println("Java" + (10 + 20));
```

Answer:

```text
Java30
```

The reason is left-to-right evaluation combined with String concatenation.

---

# 78. Another Interview Trap

What does this print?

```java
System.out.println(10 / 3);
```

Answer:

```text
3
```

because both operands are integers.

But:

```java
System.out.println(10.0 / 3);
```

prints approximately:

```text
3.3333333333333335
```

This connects back to the data types and operators chapters.

---

# 79. Important Things to Remember

The most important concepts from this chapter are:

```text
System.in
System.out
System.err

Scanner
next()
nextLine()
nextInt()
nextDouble()
nextBoolean()

printf()
print()
println()

parseInt()
parseDouble()

BufferedReader

Command-line arguments
String[] args
```

And especially:

```java
nextInt();
sc.nextLine();
```

when switching from numeric token input to full-line input.

---

# 80. Chapter Summary

Input and output are fundamental because programs need to communicate with the outside world.

For output, Java provides:

```java
System.out.print()
System.out.println()
System.out.printf()
```

For standard input:

```java
System.in
```

A beginner-friendly way to read console input is:

```java
Scanner sc = new Scanner(System.in);
```

Then you can use:

```java
sc.nextInt();
sc.nextDouble();
sc.next();
sc.nextLine();
sc.nextBoolean();
```

For formatted output:

```java
System.out.printf("%.2f%n", value);
```

For converting text into numbers:

```java
Integer.parseInt()
Double.parseDouble()
```

For line-based input:

```java
BufferedReader
```

Command-line arguments are available through:

```java
String[] args
```

The most important mental model is:

```text
             INPUT
               ↓
       ┌───────────────┐
       │ Java Program  │
       │               │
       │ Processing    │
       └───────────────┘
               ↓
             OUTPUT
```

Once you understand this flow, you can start building interactive programs rather than programs that only use hard-coded values.

---

# 81. Final Chapter Practice Set

Before moving to Chapter 6, make sure you can write these programs without copying:

1. Read two integers and print their sum.
2. Read two numbers and print all arithmetic operations.
3. Read a full name and print it.
4. Read age and percentage and display them using `printf()`.
5. Read three marks and calculate total and average.
6. Read radius and calculate circle area.
7. Read temperature and convert it.
8. Read a character.
9. Create a simple menu-driven program.
10. Validate integer input using `hasNextInt()`.
11. Read a number from `args`.
12. Convert a String to an integer using `Integer.parseInt()`.
13. Understand the `nextInt()` + `nextLine()` issue.
14. Explain Scanner vs BufferedReader.
15. Explain the difference between `System.in`, `System.out`, and `System.err`.

If you can solve these comfortably, your basic Java input/output foundation is strong.

---

# 82. Connection to the Rest of the Course

This chapter uses concepts from earlier chapters:

```text
Chapter 1
Java Introduction
      ↓
Chapter 2
Setup & First Program
      ↓
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

From this point onward, your programs become increasingly interactive.

For example:

```text
Input
  ↓
Condition
  ↓
Decision
  ↓
Output
```

Then later:

```text
Input
  ↓
Loops
  ↓
Methods
  ↓
Arrays
  ↓
Objects
  ↓
OOP
```

This is how the course gradually moves from basic Java syntax toward real software development.

---

# 83. What Comes Next?

The next chapter is:

## Chapter 6 — Conditions

You will learn how Java makes decisions using:

```java
if
if-else
else-if
nested if
switch
switch expressions
ternary operator
```

and how to build decision-making programs using the input techniques learned in this chapter.
