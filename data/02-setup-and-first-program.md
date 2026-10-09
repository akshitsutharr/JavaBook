# Chapter 2 — Setup & Your First Java Program

> **Goal of this chapter:** Set up a proper Java development environment, understand the JDK, learn the `java` and `javac` commands, create your first Java program, compile it, run it, understand the basic structure of the program, and learn how Java source code moves from a `.java` file to execution.
>
> **Important:** Do not treat setup as something to rush through. A student who understands what the JDK, compiler, bytecode, classpath, `PATH`, and JVM are doing will have a much easier time with the rest of Java.

---

# 1. What We Need Before Writing Java

To write and run Java programs, we need a Java development environment.

At the minimum, a Java developer needs:

```text
JDK
 │
 ├── Java compiler
 ├── Java runtime
 ├── Java launcher
 └── Other development tools
```

The most important thing to remember is:

> **If you want to develop Java programs, install a JDK.**

You do not need to separately install a "Java compiler" and a "JVM" one by one.

A JDK provides the tools needed to develop and run Java programs.

---

# 2. JDK, JVM and JRE — One More Time

Before installing anything, make sure these three words are not mixed together.

## JVM

JVM means:

**Java Virtual Machine**

It executes Java bytecode.

```text
.class
  ↓
JVM
  ↓
Program execution
```

---

## JRE

JRE means:

**Java Runtime Environment**

Historically, this term described the environment needed to run Java applications.

Conceptually:

```text
JRE
├── JVM
└── Runtime libraries
```

Modern Java distributions are generally installed as a JDK rather than as a separate JRE package.

---

## JDK

JDK means:

**Java Development Kit**

It is the package developers use to create Java applications.

Conceptually:

```text
JDK
├── javac
├── java
├── other development tools
├── JVM/runtime components
└── Java libraries
```

For this entire course, the practical answer is simple:

```text
Want to LEARN Java?
        ↓
Want to WRITE Java?
        ↓
Want to COMPILE Java?
        ↓
Install a JDK
```

---

# 3. Which Java Version Should You Install?

Java has many versions.

You may see:

```text
Java 8
Java 11
Java 17
Java 21
Java 25
...
```

Java continues to receive new releases.

Some Java versions are designated as **LTS — Long-Term Support** releases.

For a learning environment, using a current supported LTS JDK is generally a sensible choice.

The exact JDK vendor is less important for learning basic Java.

Common distributions include:

```text
OpenJDK
Eclipse Temurin
Oracle JDK
Amazon Corretto
Microsoft Build of OpenJDK
Azul Zulu
```

They provide Java implementations suitable for normal Java development.

For this course, the important thing is:

> **Use a modern, supported JDK rather than an obsolete Java installation.**

---

# 4. Check Whether Java Is Already Installed

Before installing Java, open a terminal.

On Windows you can use:

```text
Command Prompt
```

or:

```text
PowerShell
```

Run:

```bash
java -version
```

You can also check the compiler:

```bash
javac -version
```

If Java is installed correctly, you should see version information.

For example:

```text
java version "..."
```

or a modern OpenJDK-style version message.

The exact output depends on the JDK distribution and version.

---

# 5. Why Check Both `java` and `javac`?

Because they perform different jobs.

```text
java
 ↓
runs Java programs

javac
 ↓
compiles Java source code
```

For example:

```bash
javac Main.java
```

means:

> Compile `Main.java`.

While:

```bash
java Main
```

means:

> Run the `Main` class.

A developer normally needs both.

---

# 6. Installing a JDK on Windows

The exact installer screens can differ depending on the JDK distribution and version.

The general process is:

```text
1. Choose a modern JDK
        ↓
2. Download Windows installer
        ↓
3. Install JDK
        ↓
4. Make sure command-line tools are available
        ↓
5. Open a NEW terminal
        ↓
6. Check java -version
        ↓
7. Check javac -version
```

When installing, pay attention to whether the installer offers options related to:

```text
PATH
JAVA_HOME
```

Some installers configure these automatically.

If they do not, they can be configured manually.

---

# 7. What Is PATH?

`PATH` is an environment variable used by the operating system to find executable programs when you type their names in a terminal.

Suppose the Java compiler is installed somewhere like:

```text
C:\Program Files\Java\...\bin
```

Inside that directory are commands such as:

```text
java.exe
javac.exe
```

If that directory is included in `PATH`, you can type:

```bash
java
```

instead of typing the complete path to the executable.

Without an appropriate `PATH`, Windows may say something similar to:

```text
'java' is not recognized as an internal or external command
```

---

# 8. PATH in Simple Language

Imagine Windows has a list of places where it should look for commands.

```text
PATH
 │
 ├── Folder A
 ├── Folder B
 ├── Folder C
 └── Java bin folder
```

When you type:

```bash
javac
```

Windows searches the directories listed in `PATH`.

If it finds:

```text
javac.exe
```

it can execute it.

So:

```text
PATH
 ↓
tells the operating system where executable commands can be found
```

---

# 9. What Is JAVA_HOME?

`JAVA_HOME` is an environment variable commonly used by development tools to identify the JDK installation directory.

For example, conceptually:

```text
JAVA_HOME
   ↓
C:\Program Files\Java\jdk-...
```

Notice the difference:

```text
JAVA_HOME
   ↓
JDK installation directory

PATH
   ↓
directories searched for executable commands
```

A common setup is:

```text
JAVA_HOME = JDK folder

PATH includes:
%JAVA_HOME%\bin
```

Not every Java application requires `JAVA_HOME`, but many build tools and development tools use it.

---

# 10. PATH vs JAVA_HOME

This distinction is worth memorizing.

| Variable | Purpose |
|---|---|
| `JAVA_HOME` | Points to the JDK installation |
| `PATH` | Helps the OS find executable commands |

Example:

```text
JAVA_HOME
   ↓
C:\Program Files\Java\jdk-25

PATH
   ↓
...\jdk-25\bin
```

Do not confuse the two.

---

# 11. Verify the Installation

After installing the JDK, open a **new** terminal.

Run:

```bash
java -version
```

Then:

```bash
javac -version
```

If both work, your basic command-line Java environment is ready.

You can also check:

```bash
where java
```

and:

```bash
where javac
```

on Windows.

These commands can show which executable Windows is finding.

If multiple Java installations exist, `where` can reveal that.

---

# 12. Why Should You Care About Multiple Java Installations?

Imagine your computer has:

```text
Java 8
Java 17
Java 21
Java 25
```

installed simultaneously.

You type:

```bash
java -version
```

but receive a version you did not expect.

The problem may be that the `PATH` points to another installation first.

Conceptually:

```text
PATH
 │
 ├── Old Java/bin       ← found first
 ├── Another Java/bin
 └── New Java/bin
```

The operating system may use the first matching executable it finds.

This is why:

```bash
where java
```

is useful on Windows.

---

# 13. Your First Java Program

Now let's actually write Java.

Create a file called:

```text
Main.java
```

Put this code inside it:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Hello Java");

    }
}
```

Save the file.

You have now written your first Java program.

---

# 14. What Does This Program Do?

The program prints:

```text
Hello Java
```

to the terminal.

The important statement is:

```java
System.out.println("Hello Java");
```

It tells Java to print the text:

```text
Hello Java
```

and then move to the next line.

---

# 15. Compile the Program

Open the terminal in the directory containing `Main.java`.

Run:

```bash
javac Main.java
```

If everything is correct, the command normally completes without printing an error.

A new file should appear:

```text
Main.class
```

Now your folder looks approximately like:

```text
project/
│
├── Main.java
└── Main.class
```

The two files have different purposes.

```text
Main.java
    ↓
Source code written by you

Main.class
    ↓
Compiled Java bytecode
```

---

# 16. Run the Program

Now run:

```bash
java Main
```

Do not normally write:

```bash
java Main.class
```

Use:

```bash
java Main
```

Expected output:

```text
Hello Java
```

The complete process is:

```text
Main.java
   │
   │ javac Main.java
   ↓
Main.class
   │
   │ java Main
   ↓
Hello Java
```

This is one of the most important workflows in Java.

---

# 17. Why Don't We Type `.class` With `java`?

The Java launcher expects a class name.

You provide:

```bash
java Main
```

not:

```bash
java Main.class
```

The runtime uses the class name to locate and load the class.

So remember:

```text
Compile:
javac Main.java

Run:
java Main
```

---

# 18. Let's Understand the Program

Here is the program again:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Hello Java");

    }
}
```

We will break it into pieces.

---

# 19. `public class Main`

This declares a class named:

```text
Main
```

A class is one of the fundamental building blocks of Java.

At this stage, think of a class as a **definition or blueprint** that contains Java code.

For example:

```java
class Student {

}
```

creates a class named `Student`.

In:

```java
public class Main
```

we have:

```text
public
   ↓
access modifier

class
   ↓
declares a class

Main
   ↓
class name
```

Classes become extremely important when we enter the OOP section.

---

# 20. Why Is the Class Called `Main`?

There is nothing magical about the name `Main`.

You could write:

```java
public class Hello
```

or:

```java
public class Student
```

However, if the class is declared `public`, the source filename normally must match the public top-level class name.

For:

```java
public class Main {
}
```

the source file should be:

```text
Main.java
```

For:

```java
public class Student {
}
```

the source file should be:

```text
Student.java
```

This is an important Java rule.

---

# 21. Why Does Java Care About the File Name?

Suppose you write:

```java
public class Student {

}
```

and save it as:

```text
Main.java
```

The compiler will complain because the public class name does not match the filename.

The correct combination is:

```text
Student.java
    ↓
public class Student
```

and:

```text
Main.java
    ↓
public class Main
```

---

# 22. What Is `main()`?

This part:

```java
public static void main(String[] args)
```

declares the `main` method.

For a traditional Java application launched by the standard Java launcher, this is the conventional application entry point.

Think of it as:

```text
Program starts
      ↓
main()
      ↓
statements execute
```

We will study methods in detail later.

For now, understand the basic role:

```java
public static void main(String[] args) {

}
```

is where a simple Java application begins execution.

---

# 23. Understanding `public`

The keyword:

```java
public
```

is an access modifier.

It means the member or class is accessible from outside its own class/package according to Java's access rules.

For the `main` method, the standard application entry-point declaration uses `public`.

You will learn access modifiers properly later:

```text
public
private
protected
default/package-private
```

Do not memorize every rule yet.

---

# 24. Understanding `static`

The keyword:

```java
static
```

means the method belongs to the class rather than requiring an instance of the class in the normal object-oriented sense.

Why does the simple `main` method use `static`?

Because the Java launcher needs to start the application without first creating an ordinary object of the `Main` class.

Conceptually:

```text
Main class
    ↓
main() is static
    ↓
launcher can invoke it through the class
```

Later, when we study classes and objects, `static` will become much clearer.

---

# 25. Understanding `void`

The word:

```java
void
```

is the return type of the `main` method.

It means:

> This method does not return a value.

Compare:

```java
void printHello() {

}
```

with:

```java
int getAge() {

    return 20;

}
```

The first returns nothing.

The second returns an integer.

---

# 26. Understanding `String[] args`

This part:

```java
String[] args
```

represents an array of strings.

It allows command-line arguments to be passed to the application.

For example, suppose:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println(args[0]);

    }
}
```

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main Rahul
```

Output:

```text
Rahul
```

The argument:

```text
Rahul
```

is available through:

```java
args[0]
```

We will study arrays and command-line arguments in detail later.

---

# 27. Understanding `System.out.println()`

This line:

```java
System.out.println("Hello Java");
```

is used to print text.

Break it down conceptually:

```text
System
  ↓
Java class providing system-related functionality

out
  ↓
standard output stream

println(...)
  ↓
prints a value and moves to a new line
```

For example:

```java
System.out.println("Hello");
System.out.println("World");
```

Output:

```text
Hello
World
```

---

# 28. `print()` vs `println()`

Java also provides:

```java
System.out.print()
```

Difference:

```java
System.out.print("Hello ");
System.out.print("Java");
```

Output:

```text
Hello Java
```

While:

```java
System.out.println("Hello");
System.out.println("Java");
```

Output:

```text
Hello
Java
```

So:

```text
print()
   ↓
does not automatically move to a new line

println()
   ↓
prints and moves to a new line
```

---

# 29. Printing Numbers

You do not need quotes around numeric values.

```java
System.out.println(10);
```

Output:

```text
10
```

You can also print calculations:

```java
System.out.println(10 + 20);
```

Output:

```text
30
```

But:

```java
System.out.println("10 + 20");
```

prints:

```text
10 + 20
```

because it is text.

This difference becomes very important when learning data types and operators.

---

# 30. Strings Use Double Quotes

Text such as:

```text
Hello Java
```

is written as a string literal:

```java
"Hello Java"
```

Example:

```java
System.out.println("I am learning Java");
```

The quotation marks tell Java that this is a string literal.

Compare:

```java
System.out.println("100");
```

with:

```java
System.out.println(100);
```

The first is a string.

The second is an integer literal.

They may look similar on the screen, but Java treats them differently.

---

# 31. Semicolon `;`

Most Java statements end with:

```java
;
```

For example:

```java
System.out.println("Hello");
```

and:

```java
int age = 20;
```

The semicolon marks the end of the statement.

Forgetting it often causes a compiler error.

Example:

```java
System.out.println("Hello")
```

may produce a syntax error because the statement is missing its semicolon.

---

# 32. Curly Braces `{ }`

Curly braces define blocks of Java code.

Example:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Hello");

    }

}
```

The outer braces belong to the class:

```java
class Main {

}
```

The inner braces belong to the method:

```java
main() {

}
```

So you can visualize the structure as:

```text
Main class
│
└── main method
    │
    └── statements
```

Nested braces represent nested blocks.

---

# 33. Parentheses `( )`

Parentheses are used in several places in Java.

For example:

```java
main(String[] args)
```

The parentheses contain method parameters.

Another example:

```java
System.out.println("Hello");
```

The parentheses contain the value passed to `println`.

Parentheses are also used in conditions and expressions:

```java
if (age >= 18) {

}
```

You will use them constantly in Java.

---

# 34. Comments

Comments are text written for humans rather than for normal program execution.

## Single-line comment

```java
// This is a comment
```

Example:

```java
// Print a greeting
System.out.println("Hello");
```

---

## Multi-line comment

```java
/*
   This is a
   multi-line comment
*/
```

Comments are useful for explaining code, but avoid writing comments for things that are already obvious.

Bad:

```java
// Print Hello
System.out.println("Hello");
```

A useful comment explains something that is not obvious from the code.

---

# 35. Your First Modified Program

Change the program to:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("My name is Akshit");
        System.out.println("I am learning Java");
        System.out.println("Java is powerful");

    }
}
```

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

Output:

```text
My name is Akshit
I am learning Java
Java is powerful
```

Try replacing the text with your own information.

---

# 36. Create Multiple Classes

Java programs are not limited to one class.

For example:

```java
class Student {

}

public class Main {

    public static void main(String[] args) {

        System.out.println("Java");

    }
}
```

A Java source file can contain multiple top-level classes, subject to Java's rules about public classes.

The important rule for beginners is:

> A source file can have at most one public top-level class, and its name must match the filename.

For example:

```java
public class Main {

}
```

belongs in:

```text
Main.java
```

---

# 37. What Happens During Compilation?

When you execute:

```bash
javac Main.java
```

the compiler reads your source code.

Conceptually:

```text
Main.java
   ↓
Java compiler
   ↓
Parse source
   ↓
Check syntax
   ↓
Check types and other rules
   ↓
Generate bytecode
   ↓
Main.class
```

If the compiler finds an error, it does not produce a usable compiled program for that erroneous code.

---

# 38. Compile-Time Errors

Consider:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Hello"

    }
}
```

There is a missing closing parenthesis.

When you run:

```bash
javac Main.java
```

the compiler reports an error.

This is a **compile-time error**.

The program cannot be successfully compiled until the error is fixed.

---

# 39. Runtime Errors

A different kind of error happens after the program has successfully compiled.

For example:

```java
public class Main {

    public static void main(String[] args) {

        int a = 10;
        int b = 0;

        System.out.println(a / b);

    }
}
```

The syntax can compile, but executing the program causes an arithmetic error because integer division by zero is invalid.

This is a **runtime problem**.

The important difference is:

```text
Compile-time error
    ↓
detected while compiling

Runtime error
    ↓
happens while executing
```

Later, exception handling will teach you how Java represents and handles many runtime problems.

---

# 40. Logical Errors

There is another category:

> The program runs, but the answer is wrong.

Example:

```java
int price = 100;
int quantity = 5;

int total = price + quantity;
```

The program may compile and run.

But the intended calculation should probably be:

```java
int total = price * quantity;
```

This is a **logical error**.

So:

```text
Compile-time
     ↓
Program cannot compile

Runtime
     ↓
Program fails or throws an error while running

Logical
     ↓
Program runs but produces incorrect results
```

This distinction is extremely useful when debugging.

---

# 41. Source Code → Bytecode → JVM

Let's connect everything together.

Suppose we write:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Hello Java");

    }
}
```

Step 1:

```text
Main.java
```

Step 2:

```bash
javac Main.java
```

Step 3:

```text
Main.class
```

Step 4:

```bash
java Main
```

Step 5:

```text
JVM loads Main
```

Step 6:

```text
JVM starts the application entry point
```

Step 7:

```text
System.out.println(...)
```

executes.

Step 8:

```text
Hello Java
```

appears on the console.

Complete picture:

```text
             Main.java
                 │
                 │ javac
                 ↓
             Main.class
                 │
                 │ bytecode
                 ↓
                JVM
                 │
                 ↓
             main(...)
                 │
                 ↓
       System.out.println(...)
                 │
                 ↓
            Hello Java
```

---

# 42. What Is an IDE?

IDE means:

> **Integrated Development Environment**

Instead of using only a terminal and a text editor, an IDE combines many development features.

Examples include:

```text
IntelliJ IDEA
Eclipse
Apache NetBeans
Visual Studio Code
```

An IDE can provide:

- Code editor
- Syntax highlighting
- Autocomplete
- Error detection
- Debugger
- Project management
- Build integration
- Refactoring
- Terminal
- Git integration

---

# 43. Should Beginners Use an IDE?

Yes, but there is an important learning strategy.

You should understand the command-line process at least once:

```bash
javac Main.java
java Main
```

Then use an IDE for productivity.

Why?

Because if you only press:

```text
Run
```

you may never understand:

```text
What is being compiled?
Where is the `.class` file?
Which JDK is being used?
Which Java version is running?
What is the classpath?
Why does the IDE work while the terminal does not?
```

Knowing the underlying process makes IDE problems much easier to solve.

---

# 44. IntelliJ IDEA

IntelliJ IDEA is a popular Java IDE.

A typical Java project contains something like:

```text
Project
│
├── src
│   └── Main.java
│
└── other project files
```

You can write:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Hello Java");

    }
}
```

and use the IDE's Run button.

The IDE handles many details automatically.

But remember:

```text
IDE
 ↓
helps you work with Java

IDE ≠ Java itself
```

---

# 45. VS Code

Visual Studio Code can also be used for Java development with the appropriate Java extensions.

It is lighter and highly configurable.

A typical setup involves:

```text
VS Code
+
Java extensions
+
JDK
```

The JDK is still the important underlying Java development environment.

An editor does not replace the JDK.

---

# 46. IDE vs Terminal

Think of them like this:

```text
Terminal
   ↓
Understand the mechanics

IDE
   ↓
Increase productivity
```

A professional Java developer may use an IDE most of the time, but understanding the command line remains useful.

---

# 47. Common Setup Problem: `java` Not Found

Suppose you run:

```bash
java -version
```

and Windows says:

```text
java is not recognized...
```

Possible reasons include:

1. JDK is not installed.
2. JDK is installed but `PATH` is incorrect.
3. Terminal was opened before installation/configuration changes.
4. Another Java installation is taking precedence.
5. The Java installation was incomplete.

A good debugging process is:

```text
Check JDK installation
        ↓
Open a NEW terminal
        ↓
java -version
        ↓
javac -version
        ↓
where java
        ↓
where javac
```

Do not immediately reinstall everything.

First identify the problem.

---

# 48. Common Setup Problem: `javac` Not Found

You may see:

```text
java -version
```

working while:

```text
javac -version
```

does not.

This can happen when:

```text
Runtime command available
but compiler not available
```

or when your environment points to an installation that does not contain the development tools.

For development, make sure you have a proper JDK and that its `bin` directory is correctly available.

---

# 49. Common Setup Problem: Wrong Java Version

Suppose you installed a new JDK but:

```bash
java -version
```

still reports an older version.

Run:

```bash
where java
```

and:

```bash
where javac
```

If multiple paths appear, you may have multiple Java installations.

The order in `PATH` matters.

Conceptually:

```text
PATH

Old Java/bin
New Java/bin
```

The system may find the old Java first.

---

# 50. Common Setup Problem: IDE Uses a Different JDK

This is another common beginner issue.

Your terminal may say:

```text
java version A
```

while your IDE uses:

```text
Java version B
```

That is possible because the IDE can be configured with a different JDK.

So if something behaves differently between:

```text
Terminal
```

and:

```text
IDE
```

check which JDK each one is using.

---

# 51. A Clean Beginner Workflow

For every small Java program, use this mental process:

```text
1. Write source code
       ↓
2. Save .java file
       ↓
3. Compile
       ↓
4. Fix compile errors
       ↓
5. Run program
       ↓
6. Observe output
       ↓
7. Test different inputs
       ↓
8. Debug problems
```

For command-line Java:

```bash
javac Main.java
java Main
```

---

# 52. Build a Tiny Java Project

Create a directory:

```text
java-learning
```

Inside it:

```text
java-learning/
│
└── Main.java
```

Put:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Welcome to Java");
        System.out.println("This is my first project");

    }
}
```

Compile:

```bash
javac Main.java
```

Now:

```text
java-learning/
│
├── Main.java
└── Main.class
```

Run:

```bash
java Main
```

Output:

```text
Welcome to Java
This is my first project
```

Congratulations: you have completed the basic Java development cycle.

---

# 53. Understanding the `.class` File

Do not try to read a `.class` file as if it were normal source code.

It contains compiled bytecode.

You can inspect class information using tools such as:

```bash
javap
```

For example:

```bash
javap Main
```

You may see information describing the class and its methods.

You can also ask for more detailed bytecode information:

```bash
javap -c Main
```

This is not necessary for beginners to use every day, but it is a useful demonstration that:

```text
.java
 ↓
compiler
 ↓
.class
 ↓
bytecode
```

The `.class` file is not simply a renamed `.java` file.

---

# 54. What Is `javap`?

`javap` is a Java class-file disassembler.

It can show information about compiled class files.

For example:

```bash
javap Main
```

and:

```bash
javap -c Main
```

The `-c` option can display bytecode instructions.

This becomes interesting when you later want to understand:

```text
JVM
bytecode
method invocation
stack
class files
```

For now, simply know that Java provides tools for inspecting compiled classes.

---

# 55. Why Does Java Compile Into `.class` Files?

The `.class` format provides a standardized representation for Java classes.

The JVM understands this format.

Conceptually:

```text
Java source
     ↓
Compiler
     ↓
Class file
     ↓
JVM
```

This separation allows Java source code to be compiled once and the resulting bytecode to be used on compatible JVM implementations.

---

# 56. What Is the Classpath?

As Java projects become larger, the JVM needs to know where to find compiled classes and libraries.

This is related to the:

> **Classpath**

The classpath tells Java tools where to search for classes and resources.

At a simple level:

```text
Classpath
    ↓
places where Java should look for classes
```

For a tiny program in the current directory, you often do not need to manually specify anything.

As projects become larger, the classpath becomes much more important.

---

# 57. A Simple Classpath Example

Suppose:

```text
project/
│
├── Main.class
└── Student.class
```

When you run:

```bash
java Main
```

the runtime needs to find:

```text
Main.class
```

and potentially other classes such as:

```text
Student.class
```

The classpath tells Java where to search.

Later, build tools such as Maven and Gradle manage dependencies and classpaths for us.

---

# 58. Why Build Tools Matter Later

Large Java projects can contain:

```text
Hundreds of classes
External libraries
Tests
Resources
Configuration
Multiple modules
```

Managing all of this manually would be painful.

Tools such as:

```text
Maven
Gradle
```

help automate:

- Compilation
- Dependency management
- Testing
- Packaging
- Builds
- Plugins
- Project structure

We will not dive deeply into them yet.

First learn Java itself.

---

# 59. Java Program Structure — First Look

A simple Java program has a structure like:

```text
Class
 │
 └── Method
      │
      └── Statements
```

Example:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Hello");

    }
}
```

Visualized:

```text
Main
│
└── main()
    │
    └── System.out.println(...)
```

Later, when we study OOP, this becomes:

```text
Class
 │
 ├── Fields
 │
 ├── Constructors
 │
 └── Methods
```

This is the beginning of your object-oriented Java mental model.

---

# 60. Why We Are Not Explaining Everything Yet

You may wonder:

> Why are we using `public`, `static`, `void`, `String[]`, and classes without fully explaining them?

Because Java concepts depend on one another.

For example:

```text
Class
  ↓
Object
  ↓
Methods
  ↓
Constructors
  ↓
this
  ↓
static
  ↓
Inheritance
  ↓
Polymorphism
```

If we tried to fully explain everything inside the first program, the first chapter would become overwhelming.

The course will revisit each concept properly.

You should understand the **role** of each part now, then learn the deeper meaning later.

---

# 61. First Program — Line-by-Line Mental Model

Code:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Hello Java");

    }
}
```

Think:

```text
public
 ↓
accessibility

class
 ↓
define a class

Main
 ↓
class name

main()
 ↓
application entry point

String[] args
 ↓
command-line arguments

System.out
 ↓
standard output

println()
 ↓
print a line
```

You do not need to memorize the internal implementation of `System.out`.

Just know what it is used for.

---

# 62. Practice: Modify the Output

Try this:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Name: Rahul");
        System.out.println("Age: 20");
        System.out.println("Learning: Java");

    }
}
```

Change the values.

Then compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

---

# 63. Practice: Print a Calculation

Try:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println(10 + 20);
        System.out.println(50 - 10);
        System.out.println(5 * 4);

    }
}
```

Output:

```text
30
40
20
```

This gives you the first preview of Java expressions.

Operators will be covered in a dedicated chapter.

---

# 64. Practice: Use Multiple `println()` Calls

Try:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Java");
        System.out.println("Python");
        System.out.println("C++");

    }
}
```

Output:

```text
Java
Python
C++
```

Now replace `println` with `print`:

```java
System.out.print("Java");
System.out.print("Python");
System.out.print("C++");
```

Output:

```text
JavaPythonC++
```

This demonstrates the difference between `print()` and `println()`.

---

# 65. Practice: Command-Line Arguments

Create:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println(args[0]);

    }
}
```

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main Java
```

Output:

```text
Java
```

Run:

```bash
java Main Coder
```

Output:

```text
Coder
```

The command-line value becomes:

```java
args[0]
```

We will revisit arrays later.

---

# 66. What If We Don't Provide an Argument?

If the program contains:

```java
System.out.println(args[0]);
```

and you run:

```bash
java Main
```

there is no element at index `0`.

The program will fail at runtime.

This is a useful early example of why runtime behavior matters.

Later you will learn how to validate input and handle exceptions properly.

---

# 67. Mini Debugging Exercise

Consider:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Hello Java"

    }
}
```

Question:

> What is wrong?

There is a missing:

```text
)
```

Correct:

```java
System.out.println("Hello Java");
```

The compiler catches this before normal program execution.

---

# 68. Another Debugging Exercise

Consider:

```java
public class Main {

    public static void main(String[] args) {

        int a = 10;
        int b = 0;

        System.out.println(a / b);

    }
}
```

Question:

> Will it compile?

Yes, the syntax and types are valid.

Question:

> Will it run successfully?

No. Integer division by zero causes an arithmetic exception at runtime.

This is the difference between compile-time and runtime problems.

---

# 69. Beginner Rules Worth Remembering

Keep these rules in mind:

### Rule 1

Install a **JDK** for Java development.

### Rule 2

Check:

```bash
java -version
javac -version
```

### Rule 3

Compile with:

```bash
javac FileName.java
```

### Rule 4

Run with:

```bash
java ClassName
```

### Rule 5

A public top-level class normally matches the source filename.

```text
Main.java
↓
public class Main
```

### Rule 6

Java is case-sensitive.

```text
Main
main
MAIN
```

are different.

### Rule 7

Most Java statements end with:

```text
;
```

### Rule 8

Blocks use:

```text
{ }
```

---

# 70. Chapter Summary

In this chapter, you learned how to set up Java and write your first Java program.

The most important concepts are:

```text
JDK
 ↓
Java development kit

javac
 ↓
Java compiler

java
 ↓
Java launcher/runtime command

.java
 ↓
Java source code

.class
 ↓
compiled Java bytecode

JVM
 ↓
executes bytecode
```

The basic workflow is:

```bash
javac Main.java
java Main
```

A simple Java program looks like:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Hello Java");

    }
}
```

You also learned the basic purpose of:

```text
class
public
static
void
main
String[]
System.out
println
```

You learned about:

```text
PATH
JAVA_HOME
Classpath
IDE
Terminal
Compile-time errors
Runtime errors
Logical errors
```

Most importantly, you now understand the complete beginner execution cycle:

```text
Write
  ↓
Save .java
  ↓
Compile with javac
  ↓
.class bytecode
  ↓
Run with java
  ↓
JVM
  ↓
Output
```

---

# 71. Practice Questions

## Basic

1. What is a JDK?
2. What is the difference between JDK and JVM?
3. What is the purpose of `javac`?
4. What is the purpose of the `java` command?
5. What is a `.java` file?
6. What is a `.class` file?
7. What is bytecode?
8. Why do Java developers need a JDK?
9. What is `PATH`?
10. What is `JAVA_HOME`?

## Program Structure

11. What is a class?
12. What is the purpose of `main()`?
13. Why is `main()` static?
14. What does `void` mean?
15. What does `String[] args` represent?
16. What does `System.out.println()` do?
17. Difference between `print()` and `println()`?
18. Why do Java statements usually end with `;`?
19. What are curly braces used for?
20. Why should `public class Main` normally be saved as `Main.java`?

## Execution

21. What happens when you execute:

```bash
javac Main.java
```

22. What happens when you execute:

```bash
java Main
```

23. Why do we normally use `java Main` rather than `java Main.class`?
24. What is the difference between compile-time and runtime errors?
25. What is a logical error?
26. What is the classpath?
27. Why might `java -version` work while `javac -version` does not?
28. How can you find which Java executable Windows is using?
29. Why might an IDE use a different Java version than your terminal?
30. Why is it useful to learn command-line Java even when you plan to use an IDE?

---

# 72. Practical Assignment

Create a program named:

```text
StudentInfo.java
```

It should print:

```text
========================
      STUDENT INFO
========================
Name: Your Name
Age: Your Age
Course: Java
Goal: Become a Java Developer
========================
```

Requirements:

- Use a public class named `StudentInfo`.
- Use the normal `main()` method.
- Use multiple `System.out.println()` statements.
- Compile it using `javac`.
- Run it using `java`.

Then modify it so the program also prints three things you want to learn in Java.

---

# 73. Challenge

Create:

```java
public class Main {

    public static void main(String[] args) {

        System.out.println("Name: " + args[0]);
        System.out.println("Language: " + args[1]);

    }
}
```

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main Rahul Java
```

Expected output:

```text
Name: Rahul
Language: Java
```

Try:

```bash
java Main Akshit Java
```

and:

```bash
java Main Student Python
```

Observe how the command-line arguments change the output without changing the source code.

This is your first small example of a program receiving external input.

---

# 74. Final Mental Model

At the end of Chapter 2, you should be able to explain this without memorizing a definition:

```text
                 YOU
                  │
                  ↓
          Write Java code
                  │
                  ↓
             Main.java
                  │
                  │ javac
                  ↓
             Main.class
                  │
                  ↓
              Bytecode
                  │
                  │ java Main
                  ↓
                 JVM
                  │
                  ↓
              Execution
                  │
                  ↓
                Output
```

And you should understand:

```text
JDK
 ├── Compiler
 ├── Runtime
 └── Development tools

JAVA_HOME
 └── identifies the JDK installation

PATH
 └── helps the OS find commands

Classpath
 └── tells Java where classes/resources can be found
```

That is enough foundation to move forward.

The next chapter starts writing real Java data into programs.

---

# Next Chapter

**Chapter 3 — Variables & Data Types**

We will learn:

- What a variable actually is
- Declaration
- Initialization
- Assignment
- Primitive data types
- `byte`
- `short`
- `int`
- `long`
- `float`
- `double`
- `char`
- `boolean`
- Literals
- Type ranges
- Memory basics
- Naming variables
- Type conversion
- Type casting
- Widening conversion
- Narrowing conversion
- Overflow
- `final` variables
- Local variables
- Common mistakes
- Practice problems
