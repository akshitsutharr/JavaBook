# Chapter 8 — Methods in Java

> **Java Master Course — Chapter 8 of 50**
>
> Methods are one of the most important building blocks of Java programs. A method lets us give a name to a piece of work, reuse that work, organize a large program into smaller parts, and make code easier to understand and maintain.
>
> The ideas in this chapter are especially important because methods become the foundation for classes and objects in the OOP chapters.

---

# 1. What Is a Method?

A method is a named block of code that performs a particular task.

Example:

```java
static void sayHello() {
    System.out.println("Hello!");
}
```

Here:

```text
sayHello
```

is the method name.

The method contains:

```java
System.out.println("Hello!");
```

When we call the method:

```java
sayHello();
```

the code inside it executes.

---

# 2. Why Do We Need Methods?

Imagine a program that needs to print the same message 10 times.

Without a method:

```java
System.out.println("Welcome to Java");
System.out.println("Welcome to Java");
System.out.println("Welcome to Java");
System.out.println("Welcome to Java");
```

This is repetitive.

With a method:

```java
static void welcome() {
    System.out.println("Welcome to Java");
}
```

Then:

```java
welcome();
welcome();
welcome();
welcome();
```

The method gives the repeated operation a meaningful name.

Methods provide:

```text
Reuse
Organization
Readability
Maintainability
Abstraction
Testing
Modularity
```

---

# 3. Real-Life Analogy

Think about a coffee machine.

You don't need to understand every internal step every time you want coffee.

You can think:

```text
makeCoffee()
```

Internally it may:

```text
heat water
grind beans
pump water
mix coffee
serve coffee
```

A method works similarly.

You give a name to a group of operations:

```java
makeCoffee();
```

The caller does not need to rewrite every internal instruction.

This is one of the basic ideas of abstraction.

---

# 4. Basic Method Syntax

A simple Java method:

```java
static void greet() {
    System.out.println("Hello");
}
```

General structure:

```java
accessModifier static returnType methodName(parameters) {
    // method body
}
```

For example:

```java
public static int add(int a, int b) {
    return a + b;
}
```

---

# 5. Parts of a Method

Consider:

```java
public static int add(int a, int b) {
    return a + b;
}
```

Parts:

```text
public
  ↓
access modifier

static
  ↓
method modifier

int
  ↓
return type

add
  ↓
method name

(int a, int b)
  ↓
parameters

{
    return a + b;
}
  ↓
method body
```

You will learn access modifiers and `static` more deeply later.

For now, understand the structure.

---

# 6. Method Declaration

Writing a method is called declaring or defining the method.

Example:

```java
static void greet() {
    System.out.println("Hello");
}
```

This does not automatically execute the method.

The method must be called.

---

# 7. Method Call

Calling a method means asking Java to execute it.

Example:

```java
public class Main {

    static void greet() {
        System.out.println("Hello");
    }

    public static void main(String[] args) {
        greet();
    }
}
```

Output:

```text
Hello
```

The execution flow is:

```text
main()
  ↓
greet()
  ↓
print Hello
  ↓
return to main()
```

---

# 8. A Method Does Not Run Just Because It Exists

Consider:

```java
public class Main {

    static void greet() {
        System.out.println("Hello");
    }

    public static void main(String[] args) {
        System.out.println("Program started");
    }
}
```

Output:

```text
Program started
```

There is no:

```java
greet();
```

call.

Therefore the method body does not execute.

---

# 9. Calling a Method Multiple Times

```java
public class Main {

    static void greet() {
        System.out.println("Hello");
    }

    public static void main(String[] args) {
        greet();
        greet();
        greet();
    }
}
```

Output:

```text
Hello
Hello
Hello
```

One method definition can be reused many times.

---

# 10. `void` Return Type

A method that does not return a value can use:

```java
void
```

Example:

```java
static void printMessage() {
    System.out.println("Java");
}
```

The method performs an action but does not return a result to its caller.

---

# 11. Method Returning a Value

A method can calculate something and return the result.

Example:

```java
static int add(int a, int b) {
    return a + b;
}
```

Call:

```java
int result = add(10, 20);
```

Now:

```text
result = 30
```

---

# 12. `return`

The `return` statement sends a value back to the caller.

Example:

```java
static int square(int n) {
    return n * n;
}
```

Call:

```java
int answer = square(5);
```

The method calculates:

```text
5 × 5 = 25
```

and returns:

```text
25
```

So:

```text
answer = 25
```

---

# 13. Return Type Must Match

If a method says:

```java
static int add(int a, int b) {
    return a + b;
}
```

it must return a value compatible with `int`.

This is valid:

```java
return a + b;
```

This is also valid if the expression is an `int`:

```java
return 10;
```

But this is not valid:

```java
static int getName() {
    return "Java";
}
```

because:

```text
String ≠ int
```

---

# 14. A `void` Method Can Use `return`

A `void` method can use:

```java
return;
```

to exit the method early.

Example:

```java
static void checkAge(int age) {
    if (age < 0) {
        return;
    }

    System.out.println("Age = " + age);
}
```

Here:

```java
return;
```

does not return a value.

It simply exits the method.

---

# 15. `return` Ends the Current Method

Consider:

```java
static void test() {
    System.out.println("A");
    return;
    // System.out.println("B");
}
```

Output:

```text
A
```

Code after an unconditional `return` in the same reachable block is unreachable and will cause a compile-time error if Java can determine that it cannot execute.

---

# 16. Parameters

Parameters allow a method to receive information.

Example:

```java
static void greet(String name) {
    System.out.println("Hello " + name);
}
```

Here:

```java
String name
```

is a parameter.

Call:

```java
greet("Akshit");
```

Output:

```text
Hello Akshit
```

---

# 17. Parameters vs Arguments

These terms are often confused.

In:

```java
static void greet(String name) {
}
```

`name` is a:

```text
parameter
```

In:

```java
greet("Akshit");
```

`"Akshit"` is an:

```text
argument
```

Simple rule:

```text
Parameter → variable in method declaration

Argument → actual value/expression passed during method call
```

---

# 18. Multiple Parameters

A method can accept multiple parameters.

Example:

```java
static int add(int a, int b) {
    return a + b;
}
```

Call:

```java
int result = add(10, 20);
```

Mapping:

```text
a = 10
b = 20
```

Result:

```text
30
```

---

# 19. Parameter Order Matters

Consider:

```java
static int subtract(int a, int b) {
    return a - b;
}
```

Call:

```java
subtract(10, 3);
```

Result:

```text
7
```

But:

```java
subtract(3, 10);
```

Result:

```text
-7
```

The arguments are assigned to parameters according to position.

---

# 20. Method with Different Types

Parameters can have different types.

```java
static void printStudent(String name, int age, double marks) {
    System.out.println(name);
    System.out.println(age);
    System.out.println(marks);
}
```

Call:

```java
printStudent("Rahul", 20, 87.5);
```

Output:

```text
Rahul
20
87.5
```

---

# 21. Return Type `double`

```java
static double average(double a, double b) {
    return (a + b) / 2;
}
```

Call:

```java
double result = average(10, 20);
```

Result:

```text
15.0
```

---

# 22. Return Type `boolean`

Methods can return boolean values.

Example:

```java
static boolean isEven(int n) {
    return n % 2 == 0;
}
```

Call:

```java
System.out.println(isEven(10));
```

Output:

```text
true
```

This style is very useful for validation and decision-making.

---

# 23. Boolean Methods

A boolean-returning method often reads like a question.

Examples:

```java
isEven()
isPrime()
isValid()
isEmpty()
hasPermission()
contains()
```

For example:

```java
static boolean isAdult(int age) {
    return age >= 18;
}
```

Then:

```java
if (isAdult(20)) {
    System.out.println("Adult");
}
```

This makes code easier to read.

---

# 24. Method with `char` Return

```java
static char firstCharacter(String text) {
    return text.charAt(0);
}
```

Call:

```java
char ch = firstCharacter("Java");
System.out.println(ch);
```

Output:

```text
J
```

---

# 25. Method with `String` Return

```java
static String greet(String name) {
    return "Hello " + name;
}
```

Call:

```java
String message = greet("Java");
System.out.println(message);
```

Output:

```text
Hello Java
```

---

# 26. Method with No Parameters

```java
static int getDefaultAge() {
    return 18;
}
```

Call:

```java
int age = getDefaultAge();
```

A method does not need parameters.

---

# 27. Method with No Return Value

```java
static void showMenu() {
    System.out.println("1. Start");
    System.out.println("2. Exit");
}
```

No return value is needed.

---

# 28. Four Common Method Categories

Methods can broadly be grouped by whether they accept parameters and return a value.

```text
1. No parameters + no return

2. Parameters + no return

3. No parameters + return

4. Parameters + return
```

Examples:

```java
static void hello() {
}
```

```java
static void greet(String name) {
}
```

```java
static int getNumber() {
    return 10;
}
```

```java
static int add(int a, int b) {
    return a + b;
}
```

---

# 29. Method Reusability

Suppose you need to calculate squares in many places.

Without a method:

```java
int x = 5;
int square1 = x * x;

int y = 10;
int square2 = y * y;

int z = 20;
int square3 = z * z;
```

With a method:

```java
static int square(int n) {
    return n * n;
}
```

Then:

```java
int square1 = square(5);
int square2 = square(10);
int square3 = square(20);
```

This reduces repetition.

---

# 30. Single Responsibility

A good method usually performs one clear responsibility.

Instead of:

```java
processEverything()
```

which might:

```text
read input
calculate marks
save file
send email
print report
```

you might have:

```text
readInput()
calculateMarks()
saveFile()
sendEmail()
printReport()
```

This makes the program easier to understand and test.

This idea becomes extremely important in OOP and SOLID design later.

---

# 31. Method Naming

Java convention uses:

```text
camelCase
```

Examples:

```java
calculateTotal()
findMaximum()
printReport()
isPrime()
getName()
setAge()
```

Usually method names begin with a lowercase letter.

Avoid:

```java
CalculateTotal()
PRINTREPORT()
```

unless there is a specific reason.

---

# 32. Verb-Based Method Names

Methods usually represent actions.

Good:

```text
calculateTotal()
printStudent()
saveData()
validateInput()
findUser()
```

Poor:

```text
total()
student()
data()
user()
```

A method name should communicate what the method does.

---

# 33. Method Call as an Expression

A method that returns a value can be used inside an expression.

Example:

```java
static int square(int n) {
    return n * n;
}
```

Then:

```java
int result = square(5) + square(3);
```

Equivalent calculation:

```text
25 + 9
= 34
```

Output:

```text
34
```

---

# 34. Nested Method Calls

Methods can be used as arguments to other methods.

```java
static int square(int n) {
    return n * n;
}

static int doubleValue(int n) {
    return n * 2;
}
```

Then:

```java
int result = doubleValue(square(5));
```

Execution:

```text
square(5)
→ 25

doubleValue(25)
→ 50
```

Final:

```text
50
```

---

# 35. Method Call Chain

You can have:

```java
print(calculate(format(value)));
```

But avoid making expressions unnecessarily complicated.

Readable code is usually better than extremely compressed code.

---

# 36. Methods Calling Other Methods

A method can call another method.

```java
static int square(int n) {
    return n * n;
}

static void printSquare(int n) {
    System.out.println(square(n));
}
```

Call:

```java
printSquare(5);
```

Output:

```text
25
```

This lets you build larger operations from smaller methods.

---

# 37. The `main` Method

The familiar Java entry point is:

```java
public static void main(String[] args)
```

Let's understand the important parts.

```text
public
→ accessible to the JVM launcher

static
→ can be invoked without creating a Main object

void
→ does not return a value

main
→ conventional entry-point name

String[] args
→ command-line arguments
```

The exact launch mechanism depends on how the application is run, but for beginner Java programs this is the standard entry point.

---

# 38. `main` Is Also a Method

This:

```java
public static void main(String[] args)
```

is a method declaration.

Inside it:

```java
greet();
```

calls another method.

So a program can be viewed as:

```text
main()
  ↓
method A()
  ↓
method B()
  ↓
method C()
```

This is how larger programs can be organized.

---

# 39. Static Methods

In early Java programs, you will often see:

```java
static
```

Example:

```java
static int add(int a, int b) {
    return a + b;
}
```

A static method belongs to the class rather than to a particular object.

For now, you can think of it as a method that can be called using the class context without first creating an object.

OOP chapters will explain this deeply.

---

# 40. Calling Static Methods from `main`

Because `main` is static:

```java
public static void main(String[] args)
```

it can directly call another static method in the same class:

```java
static void greet() {
    System.out.println("Hello");
}

public static void main(String[] args) {
    greet();
}
```

---

# 41. Calling an Instance Method from Static Context

Suppose:

```java
void greet() {
    System.out.println("Hello");
}
```

This is an instance method.

You cannot simply do:

```java
public static void main(String[] args) {
    greet();
}
```

because there is no object associated with that instance method call.

You would need an object:

```java
public class Main {

    void greet() {
        System.out.println("Hello");
    }

    public static void main(String[] args) {
        Main obj = new Main();
        obj.greet();
    }
}
```

Output:

```text
Hello
```

This is an early preview of OOP.

---

# 42. Method Scope

Variables declared inside a method are local to that method.

Example:

```java
static void test() {
    int x = 10;
    System.out.println(x);
}
```

This `x` cannot be directly accessed from another method:

```java
static void test2() {
    System.out.println(x); // error
}
```

because `x` belongs to the scope of `test()`.

---

# 43. Local Variables

A variable declared inside a method is generally a local variable.

Example:

```java
static void calculate() {
    int a = 10;
    int b = 20;
    int sum = a + b;

    System.out.println(sum);
}
```

Here:

```text
a
b
sum
```

are local variables.

Their scope is limited by their enclosing block.

---

# 44. Parameter Scope

Parameters are also local to the method.

```java
static void greet(String name) {
    System.out.println(name);
}
```

`name` exists within the method's scope.

It cannot be directly referenced from another unrelated method.

---

# 45. Same Variable Name in Different Methods

This is valid:

```java
static void methodA() {
    int x = 10;
    System.out.println(x);
}

static void methodB() {
    int x = 20;
    System.out.println(x);
}
```

The two `x` variables are separate local variables.

Output:

```text
10
20
```

---

# 46. Block Scope Inside Methods

Variables can also have smaller block scope.

```java
static void test() {
    if (true) {
        int x = 10;
        System.out.println(x);
    }

    // x is not accessible here
}
```

The variable `x` exists only inside the `if` block.

---

# 47. Method Parameters Are Not Global Variables

Consider:

```java
static void greet(String name) {
    System.out.println(name);
}
```

The caller provides the value:

```java
greet("Rahul");
```

The method receives its own parameter variable.

This is important when understanding Java's pass-by-value behavior.

---

# 48. Java Is Pass-by-Value

This is one of the most important Java interview topics.

Java is:

> **Always pass-by-value.**

This applies to primitive values and object references.

Many beginners say:

```text
Java is pass-by-reference.
```

That is incorrect.

Java does not pass variables by reference in the C++ reference-parameter sense.

---

# 49. Pass-by-Value with Primitive

Example:

```java
static void change(int x) {
    x = 100;
}

public static void main(String[] args) {
    int a = 10;

    change(a);

    System.out.println(a);
}
```

Output:

```text
10
```

Why?

The method receives a copy of:

```text
10
```

Conceptually:

```text
a = 10

change(a)
    ↓
x = copy of a's value
    ↓
x = 10
    ↓
x = 100
```

Changing `x` does not change `a`.

---

# 50. Primitive Pass-by-Value Diagram

```text
main()

a
┌─────┐
│ 10  │
└─────┘
  │
  │ copy value
  ↓

change()

x
┌─────┐
│ 10  │
└─────┘

x = 100

x
┌─────┐
│100  │
└─────┘

a is still:

┌─────┐
│ 10  │
└─────┘
```

The two variables are separate.

---

# 51. Pass-by-Value with Object References

This is where the concept becomes subtle.

Consider:

```java
class Person {
    String name;
}

public class Main {

    static void changeName(Person p) {
        p.name = "Bob";
    }

    public static void main(String[] args) {
        Person person = new Person();
        person.name = "Alice";

        changeName(person);

        System.out.println(person.name);
    }
}
```

Output:

```text
Bob
```

Some people incorrectly conclude:

```text
Java passed the object by reference.
```

It did not.

Java passed a copy of the reference value.

---

# 52. Understanding the Object Reference

Conceptually:

```text
main()

person
   │
   │ reference value
   ↓
┌───────────────┐
│ Person object │
│ name = Alice  │
└───────────────┘
```

When calling:

```java
changeName(person);
```

Java copies the reference value:

```text
main person
   │
   ├──────────────► Person object
   │
changeName p
   │
   └──────────────► same Person object
```

Both references point to the same object.

Therefore:

```java
p.name = "Bob";
```

changes the object that both references can observe.

---

# 53. Reassigning the Reference Does Not Affect Caller

Consider:

```java
static void replace(Person p) {
    p = new Person();
    p.name = "Bob";
}
```

Caller:

```java
Person person = new Person();
person.name = "Alice";

replace(person);

System.out.println(person.name);
```

Output:

```text
Alice
```

Why?

Inside `replace()`:

```text
p
```

is only a copy of the caller's reference value.

Reassigning:

```java
p = new Person();
```

changes the local copy.

It does not change:

```text
person
```

in the caller.

---

# 54. The Most Important Rule

Remember:

```text
Java always passes arguments by value.
```

For an object:

```text
the value being copied is the reference value
```

Therefore:

```text
Change object through copied reference
→ caller can observe object mutation

Reassign copied reference
→ caller's reference does not change
```

This distinction is extremely important.

---

# 55. Primitive vs Reference Argument

Primitive:

```java
static void change(int x) {
    x = 20;
}
```

Changing `x`:

```text
does not affect caller variable
```

Object:

```java
static void change(Person p) {
    p.name = "Bob";
}
```

Changing a field through `p`:

```text
changes the shared object
```

because both references identify the same object.

---

# 56. Method Overloading Preview

Java allows multiple methods with the same name if their parameter lists differ.

Example:

```java
static int add(int a, int b) {
    return a + b;
}

static int add(int a, int b, int c) {
    return a + b + c;
}
```

Calls:

```java
add(10, 20);
add(10, 20, 30);
```

This is called:

```text
method overloading
```

Chapter 17 covers overloading deeply.

---

# 57. Overloading by Number of Parameters

```java
static void print(int x) {
    System.out.println(x);
}

static void print(int x, int y) {
    System.out.println(x + " " + y);
}
```

Both have the name:

```text
print
```

but different parameter lists.

---

# 58. Overloading by Parameter Types

This is also possible:

```java
static void display(int value) {
    System.out.println("int: " + value);
}

static void display(double value) {
    System.out.println("double: " + value);
}

static void display(String value) {
    System.out.println("String: " + value);
}
```

Calls:

```java
display(10);
display(10.5);
display("Java");
```

Java selects the applicable overload based on the argument types.

---

# 59. Return Type Alone Cannot Overload a Method

This is invalid:

```java
static int getValue() {
    return 10;
}

static double getValue() {
    return 10.5;
}
```

The parameter lists are identical.

Changing only the return type does not create a valid overload.

This is a common interview question.

---

# 60. Method Signature

In Java, a method signature for overloading is based on:

```text
method name
+
parameter types
```

For example:

```java
add(int, int)
```

and:

```java
add(int, int, int)
```

are different signatures.

The return type is not part of the method signature for overload resolution.

---

# 61. Automatic Type Conversion During Method Calls

Java may perform permitted widening conversions.

Example:

```java
static void show(double value) {
    System.out.println(value);
}
```

This is valid:

```java
show(10);
```

because an `int` can be widened to `double`.

Output:

```text
10.0
```

---

# 62. Narrowing Conversion Usually Requires a Cast

Suppose:

```java
static void show(int value) {
    System.out.println(value);
}
```

This:

```java
double x = 10.5;
show(x);
```

does not compile because converting `double` to `int` may lose information.

You would need an explicit cast:

```java
show((int) x);
```

Result:

```text
10
```

Casting rules were introduced in Chapter 3.

---

# 63. Varargs

Java supports variable-length arguments using:

```java
...
```

Example:

```java
static int sum(int... numbers) {
    int total = 0;

    for (int number : numbers) {
        total += number;
    }

    return total;
}
```

Calls:

```java
sum();
sum(10);
sum(10, 20);
sum(10, 20, 30);
```

All are possible.

---

# 64. How Varargs Work

Inside the method:

```java
int... numbers
```

is treated as an array-like parameter.

You can use:

```java
numbers.length
```

and loop over it.

Example:

```java
static void printNumbers(int... numbers) {
    for (int number : numbers) {
        System.out.println(number);
    }
}
```

Call:

```java
printNumbers(10, 20, 30);
```

Output:

```text
10
20
30
```

---

# 65. Varargs Rules

A varargs parameter:

```text
must be the last parameter
```

Valid:

```java
static void test(String name, int... numbers) {
}
```

Invalid:

```java
static void test(int... numbers, String name) {
}
```

A method can have only one variable-arity parameter.

---

# 66. Varargs vs Array

These are closely related:

```java
static void print(int[] numbers) {
}
```

and:

```java
static void print(int... numbers) {
}
```

The varargs version allows calls such as:

```java
print(1, 2, 3);
```

An array parameter requires an array expression:

```java
print(new int[]{1, 2, 3});
```

Varargs is convenient when callers naturally have separate arguments.

---

# 67. Recursion

A method can call itself.

This is called:

```text
recursion
```

Example:

```java
static void countDown(int n) {
    if (n == 0) {
        return;
    }

    System.out.println(n);
    countDown(n - 1);
}
```

Call:

```java
countDown(5);
```

Output:

```text
5
4
3
2
1
```

---

# 68. Two Essential Parts of Recursion

A recursive method normally needs:

```text
Base case
Recursive case
```

Example:

```java
if (n == 0) {
    return;
}
```

is the base case.

Then:

```java
countDown(n - 1);
```

is the recursive case.

Without a proper base case, recursion may continue until a stack overflow occurs.

---

# 69. Recursive Factorial

Mathematically:

```text
5! = 5 × 4 × 3 × 2 × 1
```

Recursive definition:

```text
n! = n × (n - 1)!
```

with:

```text
0! = 1
```

Java:

```java
static long factorial(int n) {
    if (n == 0) {
        return 1;
    }

    return n * factorial(n - 1);
}
```

Call:

```java
System.out.println(factorial(5));
```

Output:

```text
120
```

---

# 70. Recursive Factorial Flow

For:

```java
factorial(5)
```

calls:

```text
factorial(5)
→ 5 × factorial(4)

factorial(4)
→ 4 × factorial(3)

factorial(3)
→ 3 × factorial(2)

factorial(2)
→ 2 × factorial(1)

factorial(1)
→ 1 × factorial(0)

factorial(0)
→ 1
```

Then results return upward:

```text
1
2 × 1 = 2
3 × 2 = 6
4 × 6 = 24
5 × 24 = 120
```

---

# 71. Recursion Uses the Call Stack

Each active method call needs execution state.

For recursion:

```text
factorial(5)
factorial(4)
factorial(3)
factorial(2)
factorial(1)
factorial(0)
```

these calls remain active until the base case is reached and results return.

Very deep recursion can cause:

```text
StackOverflowError
```

Recursion is powerful, but it is not automatically better than a loop.

---

# 72. Recursion vs Loop

Factorial using a loop:

```java
static long factorial(int n) {
    long result = 1;

    for (int i = 1; i <= n; i++) {
        result *= i;
    }

    return result;
}
```

Recursively:

```java
static long factorial(int n) {
    if (n == 0) {
        return 1;
    }

    return n * factorial(n - 1);
}
```

The loop usually uses less call-stack space.

Recursion can be more natural for problems that are recursively structured, such as tree traversal.

---

# 73. Methods and Input

A method can receive input values from `main`.

```java
static int square(int n) {
    return n * n;
}

public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    System.out.print("Enter number: ");
    int n = sc.nextInt();

    System.out.println("Square = " + square(n));

    sc.close();
}
```

The method does not need to know where `n` came from.

It only receives a value.

This separation is good design.

---

# 74. Separate Input from Calculation

Instead of putting everything into `main`:

```java
Scanner sc = new Scanner(System.in);

int a = sc.nextInt();
int b = sc.nextInt();

int sum = a + b;

System.out.println(sum);
```

you can write:

```java
static int add(int a, int b) {
    return a + b;
}
```

Then:

```java
int sum = add(a, b);
```

Now:

```text
input
→ main

calculation
→ add()
```

This separation makes code easier to reuse and test.

---

# 75. Practical Example — Calculator Methods

```java
static int add(int a, int b) {
    return a + b;
}

static int subtract(int a, int b) {
    return a - b;
}

static int multiply(int a, int b) {
    return a * b;
}

static double divide(double a, double b) {
    return a / b;
}
```

Usage:

```java
System.out.println(add(10, 5));
System.out.println(subtract(10, 5));
System.out.println(multiply(10, 5));
System.out.println(divide(10, 5));
```

Output:

```text
15
5
50
2.0
```

---

# 76. Practical Example — Number Utilities

```java
static boolean isEven(int n) {
    return n % 2 == 0;
}

static boolean isPositive(int n) {
    return n > 0;
}

static int square(int n) {
    return n * n;
}
```

Then:

```java
int n = 10;

System.out.println(isEven(n));
System.out.println(isPositive(n));
System.out.println(square(n));
```

Output:

```text
true
true
100
```

Small methods can be combined to build larger logic.

---

# 77. Practical Example — Maximum of Two Numbers

```java
static int max(int a, int b) {
    if (a > b) {
        return a;
    }

    return b;
}
```

Usage:

```java
System.out.println(max(10, 20));
```

Output:

```text
20
```

You could also write:

```java
static int max(int a, int b) {
    return a > b ? a : b;
}
```

but the first version may be easier for beginners to read.

---

# 78. Practical Example — Maximum of Three

```java
static int max(int a, int b, int c) {
    int max = a;

    if (b > max) {
        max = b;
    }

    if (c > max) {
        max = c;
    }

    return max;
}
```

Usage:

```java
System.out.println(max(10, 50, 20));
```

Output:

```text
50
```

---

# 79. Practical Example — Count Digits as a Method

```java
static int countDigits(int number) {
    if (number == 0) {
        return 1;
    }

    int count = 0;

    while (number != 0) {
        number /= 10;
        count++;
    }

    return count;
}
```

Usage:

```java
System.out.println(countDigits(12345));
```

Output:

```text
5
```

One benefit is that you can call:

```java
countDigits(123);
countDigits(9999);
countDigits(42);
```

without rewriting the algorithm.

---

# 80. Practical Example — Reverse Number as a Method

```java
static int reverse(int number) {
    int result = 0;

    while (number != 0) {
        int digit = number % 10;
        result = result * 10 + digit;
        number /= 10;
    }

    return result;
}
```

Usage:

```java
System.out.println(reverse(1234));
```

Output:

```text
4321
```

---

# 81. Practical Example — Palindrome Method

```java
static boolean isPalindrome(int number) {
    int original = number;
    int reversed = 0;

    while (number != 0) {
        int digit = number % 10;
        reversed = reversed * 10 + digit;
        number /= 10;
    }

    return original == reversed;
}
```

Usage:

```java
System.out.println(isPalindrome(121));
System.out.println(isPalindrome(123));
```

Output:

```text
true
false
```

---

# 82. Practical Example — Prime Method

```java
static boolean isPrime(int n) {
    if (n < 2) {
        return false;
    }

    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }

    return true;
}
```

Usage:

```java
for (int i = 1; i <= 50; i++) {
    if (isPrime(i)) {
        System.out.print(i + " ");
    }
}
```

Output:

```text
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47
```

The loop handles repetition.

The method handles the reusable prime-checking logic.

This is much cleaner than duplicating the algorithm.

---

# 83. Practical Example — Grade Method

```java
static char getGrade(int marks) {
    if (marks >= 90) {
        return 'A';
    } else if (marks >= 80) {
        return 'B';
    } else if (marks >= 70) {
        return 'C';
    } else if (marks >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}
```

Usage:

```java
System.out.println(getGrade(85));
```

Output:

```text
B
```

---

# 84. Practical Example — Validation Method

```java
static boolean isValidAge(int age) {
    return age >= 1 && age <= 120;
}
```

Usage:

```java
if (isValidAge(25)) {
    System.out.println("Valid");
}
```

Output:

```text
Valid
```

Methods like this make conditions easier to read.

---

# 85. Guard Clauses

A guard clause handles invalid cases early.

Example:

```java
static double calculateAverage(int sum, int count) {
    if (count <= 0) {
        return 0;
    }

    return (double) sum / count;
}
```

Instead of deeply nesting:

```java
if (count > 0) {
    ...
}
```

you can return early.

This style often improves readability.

---

# 86. Multiple `return` Statements

A method can have multiple possible return statements.

Example:

```java
static String classify(int n) {
    if (n > 0) {
        return "Positive";
    }

    if (n < 0) {
        return "Negative";
    }

    return "Zero";
}
```

Every possible execution path must return a compatible value because the method's return type is `String`.

---

# 87. Compiler Checks Return Paths

Consider:

```java
static int getValue(boolean condition) {
    if (condition) {
        return 10;
    }
}
```

This does not compile because when:

```text
condition == false
```

there is no return value.

Correct:

```java
static int getValue(boolean condition) {
    if (condition) {
        return 10;
    }

    return 20;
}
```

---

# 88. `void` Method and Conditional Return

Example:

```java
static void printPositive(int n) {
    if (n <= 0) {
        return;
    }

    System.out.println(n);
}
```

This is valid because the method has return type:

```text
void
```

---

# 89. Method Parameters Are Passed by Value

Consider:

```java
static void change(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}
```

Calling:

```java
int x = 10;
int y = 20;

change(x, y);

System.out.println(x);
System.out.println(y);
```

Output:

```text
10
20
```

Swapping local copies does not swap the caller's primitive variables.

---

# 90. Returning Multiple Values

Java methods have one declared return type.

You cannot directly declare:

```java
static int, int calculate() {
}
```

Instead, later you can use:

```text
arrays
objects
records
collections
```

to group multiple values.

For example, you might return an object containing:

```text
sum
average
maximum
minimum
```

This becomes especially important in OOP.

---

# 91. Method Parameters Can Be Expressions

You do not have to pass only literal values.

Given:

```java
static int square(int n) {
    return n * n;
}
```

you can write:

```java
int x = 5;

square(x);
square(x + 1);
square(2 * x);
```

Java evaluates the argument expression and passes its resulting value.

---

# 92. Method Arguments Can Be Variables

```java
int a = 10;
int b = 20;

int result = add(a, b);
```

Values:

```text
a → 10
b → 20
```

are passed to:

```text
parameter a
parameter b
```

inside the method.

---

# 93. Method Arguments Can Be Method Calls

Example:

```java
int result = add(square(3), square(4));
```

Evaluation:

```text
square(3) → 9
square(4) → 16

add(9, 16)
→ 25
```

Final:

```text
25
```

---

# 94. Avoid Excessive Cleverness

Although this works:

```java
System.out.println(add(square(2), multiply(3, 4)));
```

it can become difficult to debug if expressions become very complicated.

Sometimes this is clearer:

```java
int square = square(2);
int product = multiply(3, 4);
int result = add(square, product);

System.out.println(result);
```

Use judgment.

---

# 95. Method Documentation with Javadoc

Java supports documentation comments called:

```text
Javadoc
```

Example:

```java
/**
 * Returns the square of a number.
 *
 * @param n number to square
 * @return n multiplied by itself
 */
static int square(int n) {
    return n * n;
}
```

Javadoc can be used by documentation tools and IDEs.

---

# 96. Why Documentation Matters

A good method should be understandable from:

```text
name
parameters
return type
documentation when needed
```

For example:

```java
calculateTotal()
```

is clearer than:

```java
doThing()
```

If a method's behavior is non-obvious, documentation becomes especially useful.

---

# 97. Method Length

There is no universal rule that every method must have exactly a certain number of lines.

Instead, ask:

```text
Does this method have one clear responsibility?
Can I understand it easily?
Can I test it?
Does it have unnecessary duplicated logic?
```

A short method can still be badly designed.

A longer method can sometimes be reasonable.

Focus on clarity and responsibility.

---

# 98. Avoid Giant Methods

Bad design:

```java
static void runApplication() {
    // 500 lines
    // input
    // calculations
    // database
    // validation
    // output
    // file operations
    // everything
}
```

Better:

```java
readInput();
validateInput();
calculateResult();
saveResult();
displayResult();
```

Each method can focus on a particular responsibility.

---

# 99. Method Reuse and DRY

A common software engineering principle is:

```text
DRY
```

which means:

```text
Don't Repeat Yourself
```

If the same non-trivial logic appears in multiple places, consider extracting it into a method.

For example, instead of repeating:

```java
if (age >= 18 && age <= 120) {
    ...
}
```

in many places:

```java
static boolean isValidAge(int age) {
    return age >= 18 && age <= 120;
}
```

Then:

```java
if (isValidAge(age)) {
    ...
}
```

This reduces duplicated rules.

---

# 100. Do Not Over-Extract Everything

DRY does not mean:

```text
make a separate method for every single line
```

This can make code harder to follow.

For example:

```java
static int addOne(int x) {
    return x + 1;
}
```

may not be useful if the operation is used only once and has no meaningful abstraction.

Methods should improve the structure of the program.

---

# 101. Pure Methods

A pure method is a useful conceptual idea.

A method is pure when its result depends only on its inputs and it does not cause observable side effects.

Example:

```java
static int square(int n) {
    return n * n;
}
```

For the same input:

```text
square(5)
```

always produces:

```text
25
```

It does not print, modify global state, or perform external actions.

Pure methods are often easy to test.

---

# 102. Side Effects

A side effect is an observable change outside the method's returned result.

Example:

```java
static void printHello() {
    System.out.println("Hello");
}
```

Printing is an observable effect.

Another:

```java
static void changeName(Person p) {
    p.name = "Bob";
}
```

This modifies an object.

Side effects are not inherently bad. Real programs need them. But understanding them helps you design predictable methods.

---

# 103. Method Testing

A method can often be tested independently.

Example:

```java
static int add(int a, int b) {
    return a + b;
}
```

You can test:

```text
add(2, 3) → 5
add(0, 0) → 0
add(-2, 2) → 0
```

This is easier than testing a huge program where addition is mixed with input, output, files, and other logic.

---

# 104. Edge Cases

When designing methods, think about unusual inputs.

For:

```java
static int divide(int a, int b)
```

what happens when:

```text
b = 0
```

For:

```java
static int countDigits(int n)
```

what happens when:

```text
n = 0
```

For:

```java
static int factorial(int n)
```

what happens when:

```text
n < 0
```

Good methods define or handle important edge cases.

---

# 105. Method Contracts

A method can be thought of as having a contract:

```text
Input
  ↓
Preconditions
  ↓
Method behavior
  ↓
Output
```

Example:

```java
static double divide(double a, double b)
```

A contract might say:

```text
Inputs:
a and b are numbers

Precondition:
b must not be zero

Output:
a / b
```

Thinking this way improves method design.

---

# 106. Method Parameters and Validation

You can validate parameters inside a method.

Example:

```java
static double calculatePercentage(double obtained, double total) {
    if (total <= 0) {
        throw new IllegalArgumentException("Total must be positive");
    }

    return obtained * 100 / total;
}
```

Exception handling is covered later, but this example shows how methods can enforce their assumptions.

---

# 107. Local Variable Lifetime

A local variable exists only during the relevant execution scope.

Example:

```java
static void test() {
    int x = 10;
}
```

After `test()` finishes, the local variable `x` is no longer accessible by Java source code.

This does not mean the JVM must use one simple physical memory model; JVM implementation details are more complex.

---

# 108. Call Stack

When a method is called, the JVM needs execution state for that call.

Conceptually:

```text
main()
  ↓
add()
  ↓
square()
```

The active calls form a stack-like structure.

When:

```text
square()
```

returns, execution continues in:

```text
add()
```

Then when `add()` returns, execution continues in:

```text
main()
```

This is why recursion can consume stack space.

---

# 109. Method Call Stack Example

```java
static int square(int n) {
    return n * n;
}

static int calculate(int n) {
    return square(n) + 10;
}

public static void main(String[] args) {
    int result = calculate(5);
    System.out.println(result);
}
```

Conceptual flow:

```text
main
 ↓
calculate(5)
 ↓
square(5)
 ↓
return 25
 ↓
calculate returns 35
 ↓
main prints 35
```

Output:

```text
35
```

---

# 110. Parameters and Local Variables in Calls

Suppose:

```java
static int add(int a, int b) {
    int result = a + b;
    return result;
}
```

When calling:

```java
add(10, 20);
```

the method call has its own execution state containing values associated with:

```text
a
b
result
```

This is one reason local variables from different method calls do not simply become the same variable.

---

# 111. Method Overloading and Compile-Time Selection

Given:

```java
static void print(int x) {
    System.out.println("int");
}

static void print(double x) {
    System.out.println("double");
}
```

Call:

```java
print(10);
```

Java selects the applicable overload based on compile-time type information.

Output:

```text
int
```

Overloading is therefore often described as:

```text
compile-time polymorphism
```

More details are covered in Chapter 17.

---

# 112. Method Recursion and Base Cases

Bad:

```java
static void test() {
    test();
}
```

There is no base case.

The method keeps calling itself until the call stack cannot support more calls.

A recursive method needs a condition that eventually stops recursion.

---

# 113. Recursive Sum

```java
static int sumTo(int n) {
    if (n == 0) {
        return 0;
    }

    return n + sumTo(n - 1);
}
```

Call:

```java
System.out.println(sumTo(5));
```

Output:

```text
15
```

Flow:

```text
5 + sumTo(4)
4 + sumTo(3)
3 + sumTo(2)
2 + sumTo(1)
1 + sumTo(0)
0
```

Result:

```text
15
```

---

# 114. Recursive Fibonacci

A simple recursive Fibonacci implementation:

```java
static int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

For small values this is easy to understand.

However, this simple implementation performs a lot of repeated work and becomes inefficient for larger `n`.

This is a good example of why recursion is not automatically the best implementation.

---

# 115. Methods and Arrays

Methods can receive arrays.

```java
static int sum(int[] numbers) {
    int total = 0;

    for (int number : numbers) {
        total += number;
    }

    return total;
}
```

Usage:

```java
int[] numbers = {10, 20, 30};

System.out.println(sum(numbers));
```

Output:

```text
60
```

Arrays are covered deeply in Chapter 9.

---

# 116. Arrays Are Passed by Value Too

Remember:

```text
Java always passes by value.
```

When an array is passed:

```java
static void change(int[] numbers) {
    numbers[0] = 100;
}
```

the value passed is a copy of the array reference.

Both caller and method can therefore refer to the same array object.

Example:

```java
int[] numbers = {10, 20};

change(numbers);

System.out.println(numbers[0]);
```

Output:

```text
100
```

But reassigning the local parameter does not replace the caller's reference.

---

# 117. Method with Array Return

A method can return an array.

```java
static int[] createNumbers() {
    return new int[]{10, 20, 30};
}
```

Usage:

```java
int[] numbers = createNumbers();
```

Now:

```text
numbers = [10, 20, 30]
```

---

# 118. Methods and Strings

A method can receive and return strings.

```java
static String toUpper(String text) {
    return text.toUpperCase();
}
```

Usage:

```java
System.out.println(toUpper("java"));
```

Output:

```text
JAVA
```

Remember that `String` objects are immutable; `toUpperCase()` returns a String rather than changing the existing String object.

---

# 119. Methods and Objects Preview

Suppose:

```java
class Student {
    String name;
    int marks;
}
```

A method can receive a `Student` object:

```java
static void printStudent(Student student) {
    System.out.println(student.name);
    System.out.println(student.marks);
}
```

Usage:

```java
Student s = new Student();

s.name = "Aman";
s.marks = 90;

printStudent(s);
```

Output:

```text
Aman
90
```

Later, you will learn how such behavior naturally belongs inside classes.

---

# 120. Static vs Instance Method Preview

Static:

```java
static int add(int a, int b) {
    return a + b;
}
```

Call:

```java
Main.add(10, 20);
```

Instance:

```java
int multiply(int a, int b) {
    return a * b;
}
```

Call through an object:

```java
Main obj = new Main();
obj.multiply(10, 20);
```

This distinction becomes central in Chapter 14 and the OOP chapters.

---

# 121. Method Chaining Preview

Some APIs return an object so another method can be called immediately.

For example, many Java APIs support patterns like:

```java
text.trim().toUpperCase()
```

The first method returns a String, and the next method is called on that result.

This is called method chaining.

You will see it frequently with:

```text
String
collections
streams
builders
```

---

# 122. Method References Preview

Later in the course, when learning lambdas and streams, you will encounter syntax such as:

```java
String::length
```

This is a method reference.

Do not worry about it yet.

First become comfortable with ordinary method declarations and calls.

---

# 123. Method Design Checklist

When creating a method, ask:

```text
1. What exact job does it perform?
2. What inputs does it need?
3. What should it return?
4. What should happen for invalid input?
5. Does the name clearly describe the operation?
6. Is the method reusable?
7. Does it contain unnecessary responsibilities?
8. Can it be tested independently?
```

This mindset is more valuable than memorizing syntax.

---

# 124. Example of Poor Design

```java
static void doEverything() {
    // read student
    // calculate marks
    // calculate grade
    // print report
    // save file
}
```

The method has too many responsibilities.

---

# 125. Better Design

```java
readStudent();
calculateTotal();
calculateAverage();
getGrade();
printReport();
saveReport();
```

Each operation can be represented by a focused method.

Later, OOP will let you organize these methods around classes and objects.

---

# 126. Complete Example — Student Result Program

```java
import java.util.Scanner;

public class Main {

    static int calculateTotal(int a, int b, int c) {
        return a + b + c;
    }

    static double calculateAverage(int total, int count) {
        return (double) total / count;
    }

    static char getGrade(double average) {
        if (average >= 90) {
            return 'A';
        } else if (average >= 80) {
            return 'B';
        } else if (average >= 70) {
            return 'C';
        } else if (average >= 60) {
            return 'D';
        }

        return 'F';
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter marks 1: ");
        int a = sc.nextInt();

        System.out.print("Enter marks 2: ");
        int b = sc.nextInt();

        System.out.print("Enter marks 3: ");
        int c = sc.nextInt();

        int total = calculateTotal(a, b, c);
        double average = calculateAverage(total, 3);
        char grade = getGrade(average);

        System.out.println("Total = " + total);
        System.out.println("Average = " + average);
        System.out.println("Grade = " + grade);

        sc.close();
    }
}
```

The program is easier to understand because the work is separated into methods.

---

# 127. Complete Example — Number Utility Program

```java
import java.util.Scanner;

public class Main {

    static boolean isEven(int n) {
        return n % 2 == 0;
    }

    static boolean isPrime(int n) {
        if (n < 2) {
            return false;
        }

        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                return false;
            }
        }

        return true;
    }

    static int square(int n) {
        return n * n;
    }

    static int cube(int n) {
        return n * n * n;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number: ");
        int n = sc.nextInt();

        System.out.println("Even: " + isEven(n));
        System.out.println("Prime: " + isPrime(n));
        System.out.println("Square: " + square(n));
        System.out.println("Cube: " + cube(n));

        sc.close();
    }
}
```

Here the methods act like reusable tools.

---

# 128. Complete Example — Calculator Using Methods and Switch

```java
import java.util.Scanner;

public class Main {

    static double add(double a, double b) {
        return a + b;
    }

    static double subtract(double a, double b) {
        return a - b;
    }

    static double multiply(double a, double b) {
        return a * b;
    }

    static double divide(double a, double b) {
        return a / b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double a = sc.nextDouble();

        System.out.print("Enter second number: ");
        double b = sc.nextDouble();

        System.out.print("Enter operator (+ - * /): ");
        char operator = sc.next().charAt(0);

        double result;

        switch (operator) {
            case '+':
                result = add(a, b);
                break;

            case '-':
                result = subtract(a, b);
                break;

            case '*':
                result = multiply(a, b);
                break;

            case '/':
                if (b == 0) {
                    System.out.println("Cannot divide by zero.");
                    sc.close();
                    return;
                }

                result = divide(a, b);
                break;

            default:
                System.out.println("Invalid operator.");
                sc.close();
                return;
        }

        System.out.println("Result = " + result);

        sc.close();
    }
}
```

This combines:

```text
methods
input
conditions
switch
return
```

---

# 129. Common Mistake — Forgetting Parentheses

Calling:

```java
greet;
```

does not call a method.

Correct:

```java
greet();
```

For methods with arguments:

```java
add(10, 20);
```

---

# 130. Common Mistake — Wrong Number of Arguments

Given:

```java
static int add(int a, int b) {
    return a + b;
}
```

This is invalid:

```java
add(10);
```

because two arguments are required.

This is also invalid:

```java
add(10, 20, 30);
```

because three arguments are supplied.

---

# 131. Common Mistake — Wrong Argument Types

Given:

```java
static void printAge(int age) {
}
```

This is not valid:

```java
printAge("twenty");
```

because a `String` cannot be passed where an `int` is required.

---

# 132. Common Mistake — Forgetting `return`

Given:

```java
static int add(int a, int b) {
    int result = a + b;
}
```

This does not compile because the method promises to return an `int`, but the method does not return one on every possible path.

Correct:

```java
static int add(int a, int b) {
    int result = a + b;
    return result;
}
```

---

# 133. Common Mistake — Returning Wrong Type

Invalid:

```java
static int getName() {
    return "Java";
}
```

Correct:

```java
static String getName() {
    return "Java";
}
```

---

# 134. Common Mistake — Confusing `return` and `println`

This:

```java
static void greet() {
    System.out.println("Hello");
}
```

prints a value.

This:

```java
static String greet() {
    return "Hello";
}
```

returns a value.

They are different operations.

A returned value can be stored or used:

```java
String message = greet();
```

---

# 135. Common Mistake — Assuming `return` Prints

This:

```java
static int add(int a, int b) {
    return a + b;
}
```

does not print anything.

You need:

```java
System.out.println(add(10, 20));
```

if you want to display the result.

---

# 136. Common Mistake — Modifying Primitive Parameters

```java
static void change(int x) {
    x = 100;
}
```

Calling:

```java
int value = 10;
change(value);
```

does not change:

```text
value
```

It remains:

```text
10
```

because Java passes the primitive value by value.

---

# 137. Common Mistake — Thinking Java Is Pass-by-Reference

This statement is incorrect:

```text
Java is pass-by-reference.
```

Correct:

```text
Java is always pass-by-value.
```

For objects, the copied value is a reference to the object.

---

# 138. Common Mistake — Returning from the Wrong Place

Consider:

```java
static int findFirstEven(int[] numbers) {
    for (int number : numbers) {
        if (number % 2 == 0) {
            return number;
        }
    }

    return -1;
}
```

The `return` inside the loop ends the entire method.

It does not merely move to the next iteration.

---

# 139. `break` vs `return` Revisited

Inside a loop:

```java
break;
```

means:

```text
exit loop
```

while:

```java
return value;
```

means:

```text
exit method and give a value to caller
```

Example:

```java
static int find(int[] numbers, int target) {
    for (int number : numbers) {
        if (number == target) {
            return number;
        }
    }

    return -1;
}
```

The method ends immediately when the target is found.

---

# 140. Method Overloading Practice

Create:

```java
add(int, int)
add(int, int, int)
add(double, double)
```

Then test:

```java
add(1, 2);
add(1, 2, 3);
add(1.5, 2.5);
```

This will prepare you for Chapter 17.

---

# 141. Practice Set — Basic Methods

Write methods for:

1. Print Hello.
2. Print your name.
3. Add two integers.
4. Subtract two integers.
5. Multiply two integers.
6. Divide two numbers.
7. Calculate square.
8. Calculate cube.
9. Check even/odd.
10. Check positive/negative.
11. Find maximum of two numbers.
12. Find minimum of two numbers.
13. Find maximum of three numbers.
14. Convert Celsius to Fahrenheit.
15. Convert Fahrenheit to Celsius.

---

# 142. Practice Set — Boolean Methods

Write:

```text
isEven()
isOdd()
isPositive()
isNegative()
isZero()
isPrime()
isPalindrome()
isLeapYear()
isValidAge()
isValidPassword()
```

Each method should return:

```java
boolean
```

where appropriate.

---

# 143. Practice Set — Number Methods

Write methods for:

```text
factorial()
countDigits()
sumDigits()
reverse()
isPalindrome()
isArmstrong()
gcd()
lcm()
isPrime()
```

Then call those methods from `main()`.

---

# 144. Practice Set — String Methods

Write methods to:

```text
countCharacters()
countVowels()
countDigits()
reverseString()
isPalindrome()
countSpaces()
countWords()
```

Strings will be studied in greater detail in Chapter 10.

---

# 145. Practice Set — Array Methods

Write methods for:

```text
sum()
average()
maximum()
minimum()
search()
countEven()
countOdd()
reverse()
```

Arrays are covered in Chapter 9, but these exercises are excellent practice.

---

# 146. Mini Project — Calculator

Create methods:

```java
add()
subtract()
multiply()
divide()
```

Then create a menu:

```text
1. Add
2. Subtract
3. Multiply
4. Divide
5. Exit
```

Use:

```text
do-while
switch
methods
input
```

---

# 147. Mini Project — Student Grade Calculator

Create methods:

```text
calculateTotal()
calculateAverage()
getGrade()
isPassed()
```

Input marks and display:

```text
Total
Average
Grade
Pass/Fail
```

---

# 148. Mini Project — Number Analyzer

Create methods:

```text
isEven()
isPrime()
reverse()
isPalindrome()
countDigits()
sumDigits()
```

Ask the user for a number and display the results.

---

# 149. Mini Project — Utility Library

Create a class containing utility methods:

```text
MathUtils
```

Methods:

```java
square()
cube()
factorial()
isPrime()
gcd()
lcm()
max()
min()
```

Use the methods from `main()`.

This is a useful bridge toward object-oriented design.

---

# 150. Interview Questions

## Q1. What is a method in Java?

A method is a named block of code that performs a specific operation and can optionally accept parameters and return a value.

---

## Q2. Why are methods used?

Methods provide:

```text
code reuse
modularity
readability
maintainability
testability
abstraction
```

---

## Q3. What is the difference between a parameter and an argument?

A parameter is declared in the method definition.

An argument is the actual value or expression supplied during the method call.

---

## Q4. What is `void`?

`void` is used as the return type when a method does not return a value.

---

## Q5. Can a void method use `return`?

Yes.

It can use:

```java
return;
```

to exit early, but it does not return a value.

---

## Q6. Can a method return multiple values?

A Java method has one declared return type. Multiple related values can be grouped inside an object, array, record, collection, or another suitable structure.

---

## Q7. Can a method have multiple parameters?

Yes.

Example:

```java
static int add(int a, int b) {
    return a + b;
}
```

---

## Q8. What happens when a method is called?

Java transfers execution to the method, establishes the method's execution context, executes its body, and then returns to the caller when the method completes or executes `return`.

---

## Q9. Is Java pass-by-reference?

No.

Java is always pass-by-value.

For object arguments, the copied value is a reference to the object.

---

## Q10. Can methods call other methods?

Yes.

---

## Q11. Can a method call itself?

Yes. This is called recursion.

---

## Q12. What is recursion?

Recursion is when a method directly or indirectly calls itself.

A recursive algorithm normally needs a base case.

---

## Q13. What is method overloading?

Defining multiple methods with the same name but different parameter lists.

---

## Q14. Can methods be overloaded only by changing return type?

No.

Return type alone cannot distinguish overloaded methods.

---

## Q15. What is a method signature?

For Java overloading purposes, the method signature is based on the method name and parameter types.

---

## Q16. What is a static method?

A static method belongs to the class rather than to a particular object instance.

---

## Q17. Can a static method directly call an instance method?

Not without an object instance.

A static context does not have an implicit current instance.

---

## Q18. Can a method return an array?

Yes.

---

## Q19. Can a method accept an array?

Yes.

---

## Q20. What is varargs?

Varargs allows a method to accept a variable number of arguments using syntax such as:

```java
int... numbers
```

---

# 151. Interview Output Questions

### Question 1

```java
static int add(int a, int b) {
    return a + b;
}

public static void main(String[] args) {
    System.out.println(add(10, 20));
}
```

Output:

```text
30
```

---

### Question 2

```java
static void test() {
    System.out.println("A");
}

public static void main(String[] args) {
    test();
    test();
}
```

Output:

```text
A
A
```

---

### Question 3

```java
static int square(int n) {
    return n * n;
}

public static void main(String[] args) {
    System.out.println(square(4) + square(2));
}
```

Output:

```text
20
```

---

### Question 4

```java
static void change(int x) {
    x = 100;
}

public static void main(String[] args) {
    int x = 10;
    change(x);
    System.out.println(x);
}
```

Output:

```text
10
```

---

### Question 5

```java
static int test() {
    return 10;
}

public static void main(String[] args) {
    int x = test();
    System.out.println(x + 5);
}
```

Output:

```text
15
```

---

### Question 6

```java
static int calculate(int x) {
    return x * 2;
}

public static void main(String[] args) {
    int x = 5;
    x = calculate(x);
    System.out.println(x);
}
```

Output:

```text
10
```

---

### Question 7

```java
static int factorial(int n) {
    if (n == 0) {
        return 1;
    }

    return n * factorial(n - 1);
}

public static void main(String[] args) {
    System.out.println(factorial(4));
}
```

Output:

```text
24
```

---

# 152. Interview Concept Question — Object Argument

Consider:

```java
class Person {
    String name;
}

static void change(Person p) {
    p.name = "Bob";
}
```

If:

```java
Person person = new Person();
person.name = "Alice";

change(person);
```

then:

```java
person.name
```

becomes:

```text
Bob
```

because the copied reference still refers to the same object.

But:

```java
static void replace(Person p) {
    p = new Person();
    p.name = "Bob";
}
```

does not replace the caller's reference.

This is the classic proof that Java is pass-by-value.

---

# 153. Interview Question — Why Is `main` Static?

The Java launcher needs to invoke the standard application entry point without requiring the program to first create an instance of the class containing `main`.

Therefore the traditional entry point is declared:

```java
public static void main(String[] args)
```

---

# 154. Interview Question — Why Is `main` Void?

The standard Java application entry point does not return a Java value to its caller.

Therefore:

```java
void
```

is used.

The operating environment receives process termination information through mechanisms such as the process exit status, not through a Java `main` return value.

---

# 155. Interview Question — Can a Method Be Private?

Yes.

Example:

```java
private static int square(int n) {
    return n * n;
}
```

Access modifiers determine where the method can be accessed.

You will study them in Chapter 24 and again during OOP.

---

# 156. Interview Question — Can a Method Be Final?

Yes.

A method can be declared:

```java
final
```

A final instance method cannot be overridden in a subclass.

This becomes important when studying inheritance.

---

# 157. Interview Question — Can a Method Be Abstract?

Yes.

An abstract method has no implementation in its declaration:

```java
abstract void draw();
```

Abstract methods are used in abstract classes and interfaces and will be studied deeply in Chapters 20 and 21.

---

# 158. Interview Question — Can a Constructor Be a Method?

No.

A constructor and a method are different Java language constructs.

Constructors:

```text
initialize objects
have the class name
do not have a return type
```

Methods:

```text
perform behavior
have a method name
have a return type or void
```

Constructors are covered in Chapter 13.

---

# 159. Method vs Constructor

| Feature | Method | Constructor |
|---|---|---|
| Purpose | Perform behavior | Initialize object |
| Name | Any valid method name | Same as class |
| Return type | Required (`void` allowed) | No return type |
| Called | Explicitly | During object creation |
| Overloading | Yes | Yes |
| Inheritance | Methods can be inherited/overridden depending on rules | Constructors are not inherited |

---

# 160. Method vs Function

In Java terminology, we normally call these:

```text
methods
```

because executable behavior is defined inside classes or interfaces.

In general programming discussions, people may casually use the word:

```text
function
```

for similar concepts.

For Java, use:

```text
method
```

as the standard term.

---

# 161. Important Syntax Cheat Sheet

No parameter, no return:

```java
static void greet() {
    System.out.println("Hello");
}
```

Parameter, no return:

```java
static void greet(String name) {
    System.out.println("Hello " + name);
}
```

No parameter, return:

```java
static int getNumber() {
    return 10;
}
```

Parameter, return:

```java
static int add(int a, int b) {
    return a + b;
}
```

Boolean:

```java
static boolean isEven(int n) {
    return n % 2 == 0;
}
```

Varargs:

```java
static int sum(int... numbers) {
    int total = 0;

    for (int n : numbers) {
        total += n;
    }

    return total;
}
```

---

# 162. Method Execution Mental Model

When you see:

```java
int result = add(10, 20);
```

think:

```text
1. Evaluate arguments
       ↓
   10 and 20

2. Enter add()
       ↓
   a = 10
   b = 20

3. Execute body
       ↓
   a + b = 30

4. return 30
       ↓

5. Assign to result
       ↓
   result = 30
```

This mental model will help you understand method calls throughout Java.

---

# 163. Method Design Mental Model

Think of a method as a small machine:

```text
              METHOD
                │
       ┌────────┴────────┐
       ↓                 ↓
     INPUT             OUTPUT
  parameters           return
       │                 │
       └──────┬──────────┘
              ↓
            WORK
              ↓
           result
```

For example:

```java
add(10, 20)
```

means:

```text
Input:
10, 20

Work:
10 + 20

Output:
30
```

---

# 164. Methods as Building Blocks

A large application can be built like:

```text
Application
    │
    ├── Input methods
    │
    ├── Validation methods
    │
    ├── Calculation methods
    │
    ├── Data methods
    │
    └── Output methods
```

Then OOP adds another level:

```text
Application
    ↓
Classes
    ↓
Objects
    ↓
Fields + Methods
```

This is why learning methods properly before OOP is so important.

---

# 165. Chapter Summary

A method is a named block of code that performs a specific task.

Basic syntax:

```java
returnType methodName(parameters) {
    // body
}
```

A method can:

```text
take no parameters
take parameters
return no value
return a value
```

Examples:

```java
static void greet() {
}
```

```java
static int add(int a, int b) {
    return a + b;
}
```

Parameters are variables declared in the method definition.

Arguments are actual values supplied during a call.

```text
Parameter:
int a

Argument:
10
```

`return` sends a result back to the caller and ends the current method execution.

Java is always:

```text
pass-by-value
```

For objects and arrays, the copied value is a reference value. This can allow the called method to mutate the referenced object, but reassigning the local reference does not replace the caller's reference.

Methods can call other methods.

Methods can call themselves through recursion.

Overloading allows multiple methods with the same name when their parameter lists differ.

Varargs allows a variable number of arguments:

```java
int... values
```

Static methods belong to the class context rather than a particular object instance.

Good methods usually have:

```text
clear names
clear responsibilities
appropriate parameters
appropriate return types
well-defined edge cases
limited duplication
```

---

# 166. What You Should Be Able to Do Now

Before moving to Chapter 9, you should be able to:

```text
✓ Declare methods
✓ Call methods
✓ Use parameters
✓ Pass arguments
✓ Return values
✓ Use void
✓ Use boolean-returning methods
✓ Understand local scope
✓ Understand pass-by-value
✓ Explain object reference passing correctly
✓ Use static methods
✓ Understand basic instance methods
✓ Overload methods
✓ Use varargs
✓ Write recursive methods
✓ Break large programs into smaller methods
✓ Create reusable utility methods
✓ Test methods with different inputs
✓ Think about edge cases
```

The most important habit to develop is:

> **Don't write one giant program. Break the problem into small, meaningful methods.**

---

# 167. Course Progress

You have completed:

```text
01  Java Introduction
02  Setup & First Program
03  Variables & Data Types
04  Operators
05  Input & Output
06  Conditions
07  Loops
08  Methods  ← YOU ARE HERE
```

Next:

# Chapter 9 — Arrays

You will learn:

```text
What is an array?
Why arrays?
Array declaration
Array creation
Array initialization
Indexing
Reading elements
Updating elements
Array length
Loops with arrays
Enhanced for loop
Input into arrays
Searching
Maximum/minimum
Sum/average
Copying arrays
Multidimensional arrays
2D arrays
Jagged arrays
Arrays of objects
Common array mistakes
Practical programs
Exercises
Interview questions
```

After arrays, Chapter 10 covers Strings, and then the course enters the major OOP section beginning with Chapter 11.
