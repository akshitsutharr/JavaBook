# Chapter 14 — `this` & `static` in Java

> **Java Master Course — Chapter 14 of 50**
>
> This chapter covers two Java concepts that appear everywhere in object-oriented programming:
>
> ```text
> this
> static
> ```
>
> You have already seen `this.name = name` and `this(...)` in constructors. Now we will understand exactly what they mean.
>
> We will also learn why some members belong to individual objects while others belong to the class itself.

---

# 1. What You Will Learn

By the end of this chapter, you should understand:

```text
✓ this keyword
✓ Current object
✓ this.field
✓ this.method()
✓ this(...)
✓ this as a method argument
✓ this as a return value
✓ this and constructor parameters
✓ this and object identity
✓ static keyword
✓ static variables
✓ static methods
✓ static blocks
✓ static initialization
✓ static vs instance members
✓ class-level state
✓ object-level state
✓ static access
✓ instance access
✓ main() and static
✓ static imports preview
✓ static nested classes preview
✓ constructor + static
✓ common static mistakes
✓ practical programs
✓ exercises
✓ output questions
✓ interview questions
```

---

# 2. Why `this` and `static` Matter

Consider:

```java
class Student {
    String name;
    static int count;

    Student(String name) {
        this.name = name;
        count++;
    }

    void show() {
        System.out.println(this.name);
    }
}
```

Here we have two very different ideas:

```text
this.name
    ↓
current object's name

count
    ↓
class-level shared data
```

Understanding this difference is essential for OOP.

---

# 3. What Is `this`?

In an instance context, `this` refers to the current object.

Example:

```java
class Student {
    String name;

    void show() {
        System.out.println(this.name);
    }
}
```

If:

```java
Student s = new Student();
s.name = "Aman";

s.show();
```

then inside `show()`:

```text
this → s
```

---

# 4. Current Object

Suppose:

```java
Student s1 = new Student();
Student s2 = new Student();
```

When:

```java
s1.show();
```

executes:

```text
this → s1
```

When:

```java
s2.show();
```

executes:

```text
this → s2
```

The same method can work with different objects.

---

# 5. `this` Diagram

```text
s1 ─────► Student object
             ▲
             │
           this
        during s1.show()

s2 ─────► Student object
             ▲
             │
           this
        during s2.show()
```

`this` changes according to the current instance invocation.

---

# 6. `this` Is a Reference to the Current Object

Example:

```java
class Student {
    String name;

    void show() {
        System.out.println(this.name);
    }
}
```

`this` allows the code inside an instance method or constructor to refer explicitly to the current object.

---

# 7. `this` Is Not Available in a Static Context

This is invalid:

```java
class Student {

    static void show() {
        System.out.println(this);
    }
}
```

Why?

Because a static method is associated with the class-level context, not with a particular object.

There is no current instance automatically represented by `this`.

---

# 8. First Use of `this` — Field Access

Example:

```java
class Student {
    String name;

    void showName() {
        System.out.println(this.name);
    }
}
```

Here:

```java
this.name
```

means:

```text
name field of the current object
```

---

# 9. Is `this` Always Required?

No.

This:

```java
class Student {
    String name;

    void showName() {
        System.out.println(name);
    }
}
```

can often be written as:

```java
class Student {
    String name;

    void showName() {
        System.out.println(this.name);
    }
}
```

Both access the current object's field.

---

# 10. When `this` Becomes Important

The most common situation is when a parameter has the same name as a field.

Example:

```java
class Student {
    String name;

    Student(String name) {
        this.name = name;
    }
}
```

Here:

```text
this.name → field
name      → parameter
```

---

# 11. The Shadowing Problem

Consider:

```java
class Student {
    String name;

    Student(String name) {
        name = name;
    }
}
```

This does not initialize the field.

Both occurrences of:

```java
name
```

refer to the constructor parameter.

---

# 12. Correct Use of `this`

```java
class Student {
    String name;

    Student(String name) {
        this.name = name;
    }
}
```

Meaning:

```text
this.name = name
    │       │
    │       └── parameter
    └────────── field
```

---

# 13. `this` in Constructor

Example:

```java
class Employee {
    String name;
    double salary;

    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
}
```

This is one of the most common uses of `this`.

---

# 14. `this` in Methods

Example:

```java
class Counter {
    int value;

    void setValue(int value) {
        this.value = value;
    }
}
```

Again:

```text
this.value → field
value      → parameter
```

---

# 15. `this.field`

General syntax:

```java
this.fieldName
```

Examples:

```java
this.name
this.age
this.balance
this.speed
this.price
```

It refers to the field/member associated with the current object.

---

# 16. `this.method()`

You can explicitly call another instance method using `this`.

Example:

```java
class Student {
    void showName() {
        System.out.println("Aman");
    }

    void display() {
        this.showName();
    }
}
```

The call:

```java
this.showName();
```

means:

```text
call showName() on the current object
```

---

# 17. Is `this.method()` Required?

Usually no.

This:

```java
showName();
```

and:

```java
this.showName();
```

often mean the same thing inside an instance context.

The explicit version can make the current-object relationship clearer.

---

# 18. Calling Multiple Methods Using `this`

```java
class Student {
    void method1() {
        System.out.println("Method 1");
    }

    void method2() {
        this.method1();
        System.out.println("Method 2");
    }
}
```

Output when `method2()` is called:

```text
Method 1
Method 2
```

---

# 19. `this` and Method Chaining

A method can return `this`.

Example:

```java
class Counter {
    int value;

    Counter increment() {
        value++;
        return this;
    }
}
```

Now:

```java
Counter c = new Counter();

c.increment()
 .increment()
 .increment();
```

The same object is returned after each call.

---

# 20. Why Return `this`?

Because:

```java
return this;
```

returns a reference to the current object.

Conceptually:

```text
c
 ↓
Object

increment()
 ↓
returns same Object
```

---

# 21. Fluent API Example

```java
class Person {
    String name;
    int age;

    Person setName(String name) {
        this.name = name;
        return this;
    }

    Person setAge(int age) {
        this.age = age;
        return this;
    }
}
```

Usage:

```java
Person person = new Person()
    .setName("Aman")
    .setAge(20);
```

This is called a fluent style.

---

# 22. `this` as a Method Argument

You can pass the current object using `this`.

Example:

```java
class Student {

    void register() {
        School.addStudent(this);
    }
}

class School {
    static void addStudent(Student student) {
        System.out.println("Student registered");
    }
}
```

Here:

```java
this
```

passes the current Student object.

---

# 23. Why Pass `this`?

Suppose:

```java
student.register();
```

Inside:

```java
School.addStudent(this);
```

`this` represents the same Student object that called `register()`.

---

# 24. `this` as an Argument Example

```java
class Printer {
    void printStudent(Student student) {
        System.out.println(student.name);
    }
}

class Student {
    String name;

    void print() {
        Printer printer = new Printer();
        printer.printStudent(this);
    }
}
```

---

# 25. `this` Can Be Used to Return Current Object

Example:

```java
class User {
    String name;

    User getUser() {
        return this;
    }
}
```

Usage:

```java
User user = new User();

User sameUser = user.getUser();

System.out.println(user == sameUser);
```

Output:

```text
true
```

---

# 26. `this` and Object Identity

Example:

```java
class Student {

    boolean isSame(Student other) {
        return this == other;
    }
}
```

Usage:

```java
Student a = new Student();
Student b = a;
Student c = new Student();

System.out.println(a.isSame(b));
System.out.println(a.isSame(c));
```

Output:

```text
true
false
```

---

# 27. `this()` Is Different from `this`

Remember:

```java
this.name
```

and:

```java
this()
```

are completely different.

```text
this
 ↓
current object reference

this()
 ↓
call another constructor in same class
```

---

# 28. `this()` Constructor Call

Example:

```java
class Student {
    String name;

    Student() {
        this("Unknown");
    }

    Student(String name) {
        this.name = name;
    }
}
```

The no-argument constructor calls the parameterized constructor.

---

# 29. `this(...)` with Parameters

Example:

```java
class Box {
    int length;
    int width;

    Box() {
        this(1, 1);
    }

    Box(int length, int width) {
        this.length = length;
        this.width = width;
    }
}
```

`this(1, 1)` selects:

```java
Box(int, int)
```

---

# 30. `this(...)` Must Be First

Correct:

```java
Box() {
    this(1, 1);
}
```

Incorrect:

```java
Box() {
    System.out.println("Hello");
    this(1, 1);
}
```

The constructor invocation must be the first statement.

---

# 31. Constructor Chaining

Constructor chaining avoids repeated initialization.

Example:

```java
class Employee {
    String name;
    double salary;

    Employee() {
        this("Unknown", 0);
    }

    Employee(String name) {
        this(name, 0);
    }

    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
}
```

---

# 32. `this` Summary

The `this` keyword is commonly used for:

```text
1. current object reference
2. distinguishing fields from parameters
3. calling current object's methods
4. calling another constructor with this(...)
5. passing current object as an argument
6. returning current object
```

---

# 33. What Is `static`?

`static` indicates that a member belongs to the class-level context rather than to each individual object.

Common static members include:

```text
static fields
static methods
static initialization blocks
static nested classes
```

---

# 34. Instance vs Static

Think:

```text
INSTANCE
    ↓
belongs to each object

STATIC
    ↓
belongs to class-level context
```

Example:

```java
class Student {
    String name;        // instance
    static int count;   // static
}
```

---

# 35. Instance Field

```java
class Student {
    String name;
}
```

Every Student object has its own `name` state.

Example:

```java
Student a = new Student();
Student b = new Student();

a.name = "Aman";
b.name = "Riya";
```

---

# 36. Static Field

```java
class Student {
    static int count;
}
```

`count` is associated with the class rather than with each individual Student object.

Access:

```java
Student.count
```

---

# 37. Static Field Example

```java
class Student {
    static int count = 0;

    Student() {
        count++;
    }
}
```

Usage:

```java
new Student();
new Student();
new Student();

System.out.println(Student.count);
```

Output:

```text
3
```

---

# 38. Why Use Static Fields?

Use a static field when one value logically belongs to the class as a whole.

Examples:

```text
number of created objects
company-wide configuration
constants
shared counters
class-level settings
```

Not every shared value should be static; design should follow the domain.

---

# 39. Static Field Is Shared

Example:

```java
class Student {
    static int count;
}
```

Then:

```java
Student a = new Student();
Student b = new Student();

Student.count = 10;
```

The same static field is observed through the class-level context.

---

# 40. Static Access Through Class Name

Preferred:

```java
Student.count
```

rather than:

```java
a.count
```

Both may compile for accessible static fields, but class-name access clearly communicates that the member is static.

---

# 41. Why Avoid `object.staticField`?

This:

```java
a.count
```

can make beginners think the value belongs uniquely to `a`.

It does not.

Prefer:

```java
Student.count
```

to show class-level ownership.

---

# 42. Static Method

A method declared with `static` is a static method.

Example:

```java
class MathUtil {
    static int square(int x) {
        return x * x;
    }
}
```

Call:

```java
System.out.println(MathUtil.square(5));
```

Output:

```text
25
```

---

# 43. Why Static Methods?

A static method is useful when behavior does not need a particular object instance.

Examples:

```text
Math.max()
Math.sqrt()
Integer.parseInt()
Arrays.sort()
```

These APIs provide many class-level utility operations.

---

# 44. Static Method Does Not Need an Object

Example:

```java
class Calculator {
    static int add(int a, int b) {
        return a + b;
    }
}
```

Call:

```java
int result = Calculator.add(10, 20);
```

No Calculator object is required.

---

# 45. Static Method Access

Preferred:

```java
Calculator.add(10, 20);
```

rather than:

```java
new Calculator().add(10, 20);
```

if the method is genuinely static.

---

# 46. Static Method and Instance Field

Consider:

```java
class Student {
    String name;

    static void showName() {
        System.out.println(name);
    }
}
```

This does not compile.

Why?

Because:

```text
name → belongs to an instance

showName() → has no particular instance
```

There is no specific object whose `name` should be used.

---

# 47. Static Method Can Access Static Field

```java
class Student {
    static int count;

    static void showCount() {
        System.out.println(count);
    }
}
```

This is valid.

Both belong to class-level context.

---

# 48. Static Method Cannot Directly Use `this`

This is invalid:

```java
class Student {
    static void test() {
        System.out.println(this);
    }
}
```

Because `this` requires an instance context.

---

# 49. Static Method Can Create Objects

A static method can create an object.

Example:

```java
class StudentFactory {
    static Student create() {
        return new Student();
    }
}
```

The static method itself does not have a current Student object, but it can create one.

---

# 50. Static Method Can Receive an Object

Example:

```java
class Student {
    String name;
}

class Printer {
    static void print(Student student) {
        System.out.println(student.name);
    }
}
```

This works because the object is explicitly supplied as a parameter.

---

# 51. Static Method Can Call Instance Method Through an Object

Example:

```java
class Student {
    void study() {
        System.out.println("Studying");
    }

    static void start(Student student) {
        student.study();
    }
}
```

The static method can use the instance method because it has a specific object reference:

```java
student
```

---

# 52. Static Method vs Instance Method

| Static Method | Instance Method |
|---|---|
| Class-level context | Object-level context |
| Does not have `this` | Has `this` |
| Can directly access static members | Can directly access instance and static members |
| Does not require an instance to invoke | Normally invoked through an instance |
| Good for class-level behavior | Good for object-specific behavior |

---

# 53. Instance Method Can Access Static Members

Example:

```java
class Student {
    static int count;
    String name;

    void show() {
        System.out.println(name);
        System.out.println(count);
    }
}
```

This is valid.

An instance method has access to the class-level static member too.

---

# 54. Static Method Can Access Static Members

Example:

```java
class Student {
    static int count;

    static void show() {
        System.out.println(count);
    }
}
```

This is valid.

---

# 55. Access Rule to Remember

A simple rule:

```text
static context
→ directly access static members

instance context
→ access instance members and static members
```

But an instance member requires a specific object.

A static context does not automatically have one.

---

# 56. Static Context

Common static contexts include:

```text
static methods
static initialization blocks
```

These do not have an implicit current object.

---

# 57. Instance Context

Common instance contexts include:

```text
instance methods
constructors
instance initialization blocks
```

These operate in relation to an object instance.

---

# 58. `main()` Is Static

The traditional Java entry point is:

```java
public static void main(String[] args)
```

The `main` method is static so the JVM can invoke it without first creating an object of the application's class.

---

# 59. Why Is `main()` Static?

At program startup, there is no application object that the JVM must first construct just to enter the program.

Static provides class-level access.

Conceptually:

```text
JVM
 ↓
Main.main(...)
```

rather than:

```text
JVM
 ↓
new Main()
 ↓
main()
```

---

# 60. `String[] args`

The traditional main signature:

```java
public static void main(String[] args)
```

contains:

```text
public  → accessible entry point
static  → class-level invocation
void    → no return value
main    → method name
String[] args → command-line arguments
```

---

# 61. Command-Line Arguments

Example:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(args.length);
    }
}
```

If launched with:

```text
java Main hello world
```

then:

```text
args[0] = "hello"
args[1] = "world"
```

and output:

```text
2
```

---

# 62. Static Block

A class can contain a static initialization block:

```java
class Demo {
    static {
        System.out.println("Static block");
    }
}
```

The block is used for class-level initialization.

---

# 63. Static Block Example

```java
class Demo {
    static {
        System.out.println("Static block executed");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Main started");
    }
}
```

Typical output:

```text
Static block executed
Main started
```

The exact class initialization timing follows JVM class-initialization rules.

---

# 64. When Does Static Initialization Happen?

A class is initialized when the JVM needs to initialize it, such as before certain first active uses.

Static field initializers and static blocks execute as part of class initialization, in textual order.

Do not think of static blocks as simply "always run when the source file is opened."

---

# 65. Static Field Initialization

Example:

```java
class Demo {
    static int x = 10;
}
```

The static field is initialized as part of class initialization.

---

# 66. Static Block with Static Field

```java
class Demo {
    static int x;

    static {
        x = 100;
    }
}
```

Now:

```java
System.out.println(Demo.x);
```

Output:

```text
100
```

---

# 67. Static Initialization Order

Example:

```java
class Demo {
    static int x = 10;

    static {
        System.out.println(x);
    }

    static int y = 20;
}
```

Static initialization proceeds in source order for these declarations.

Output:

```text
10
```

---

# 68. Multiple Static Blocks

You can have multiple static blocks:

```java
class Demo {
    static {
        System.out.println("Block 1");
    }

    static {
        System.out.println("Block 2");
    }
}
```

They execute in textual order during class initialization.

Output:

```text
Block 1
Block 2
```

---

# 69. Static Block vs Constructor

Static block:

```text
associated with class initialization
```

Constructor:

```text
associated with each object construction
```

Example:

```java
class Demo {
    static {
        System.out.println("Static");
    }

    Demo() {
        System.out.println("Constructor");
    }
}
```

If two objects are created after class initialization:

```text
Static
Constructor
Constructor
```

The static initialization happens once per class initialization, while the constructor runs for each object creation.

---

# 70. Static Block and Object Creation

Example:

```java
class Demo {
    static {
        System.out.println("Static");
    }

    Demo() {
        System.out.println("Constructor");
    }
}

public class Main {
    public static void main(String[] args) {
        Demo a = new Demo();
        Demo b = new Demo();
    }
}
```

Typical output:

```text
Static
Constructor
Constructor
```

---

# 71. Static Field and Object Count

A common use:

```java
class Student {
    static int count = 0;

    Student() {
        count++;
    }
}
```

Now:

```java
new Student();
new Student();

System.out.println(Student.count);
```

Output:

```text
2
```

---

# 72. Static Constant

A common pattern is:

```java
static final
```

Example:

```java
class MathConstants {
    static final double PI = 3.141592653589793;
}
```

Use:

```java
System.out.println(MathConstants.PI);
```

---

# 73. `static final`

These keywords together often represent a class-level constant:

```java
static final int MAX_USERS = 100;
```

Meaning:

```text
static → one class-level field
final  → cannot be reassigned after initialization
```

Naming convention:

```text
UPPER_SNAKE_CASE
```

---

# 74. Static Constants in Real Java

Examples from Java APIs include:

```java
Integer.MAX_VALUE
Double.POSITIVE_INFINITY
Math.PI
```

These are class-level values.

---

# 75. Instance Field vs Static Field Diagram

```text
CLASS: Student

static count
     │
     └──────────── shared

OBJECT 1
name = Aman

OBJECT 2
name = Riya

OBJECT 3
name = Raj
```

The names are separate.

The static count is shared at the class level.

---

# 76. Full Example

```java
class Student {
    String name;
    static int count;

    Student(String name) {
        this.name = name;
        count++;
    }

    void show() {
        System.out.println(
            name + " / " + count
        );
    }
}
```

Usage:

```java
Student a = new Student("Aman");
Student b = new Student("Riya");

a.show();
b.show();
```

Output:

```text
Aman / 2
Riya / 2
```

Both objects see the same static `count`.

---

# 77. Static State Can Be Changed by Any Accessible Code

Example:

```java
Student.count = 100;
```

Now every use of:

```java
Student.count
```

observes the new value.

This is why global/shared mutable static state should be used carefully.

---

# 78. Why Global Static State Can Be Dangerous

A mutable static variable can create:

```text
hidden dependencies
unexpected changes
testing difficulties
thread-safety issues
hard-to-track bugs
```

Static is useful, but not a replacement for object design.

---

# 79. Static Does Not Mean Constant

This is a common misconception.

```java
static int count;
```

can change.

Only:

```java
static final int count = ...;
```

has final assignment semantics.

---

# 80. Static Does Not Mean One Per Program in Every Situation

Static fields are associated with a class as initialized by a particular class loader.

In ordinary beginner applications, you can think:

```text
one shared class-level value
```

but advanced JVM applications can have multiple class loaders and therefore multiple class-level copies.

---

# 81. Static Initialization and Class Loaders

The JVM's class-loading system is more complex than a single global namespace.

For advanced applications:

```text
same class name
+
different class loaders
```

can represent distinct runtime classes.

You do not need this detail for normal Java programming, but it explains why "static means exactly one for the entire JVM" is an oversimplification.

---

# 82. Static Method Overloading

Static methods can be overloaded.

Example:

```java
class Calculator {

    static int add(int a, int b) {
        return a + b;
    }

    static double add(double a, double b) {
        return a + b;
    }
}
```

Usage:

```java
Calculator.add(10, 20);
Calculator.add(10.5, 20.5);
```

---

# 83. Static Method and Overriding Preview

Static methods do not participate in runtime overriding in the same way instance methods do.

If a subclass declares a static method with the same signature, it is hidden rather than overridden.

Detailed method hiding comes with inheritance and polymorphism.

---

# 84. Static Method Hiding Preview

Example:

```java
class Parent {
    static void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    static void show() {
        System.out.println("Child");
    }
}
```

This is static method hiding, not runtime overriding.

---

# 85. Why This Matters

With instance methods:

```text
runtime type can determine overridden method
```

With static methods:

```text
class/reference compile-time context determines the hidden static member
```

This becomes important in Chapter 18 and Chapter 19.

---

# 86. Static and Inheritance Preview

A static field can be inherited in the sense that a subclass can access an accessible inherited static member through its type, but the field still belongs to class-level state rather than each subclass object.

Avoid thinking of static members as copied into every object.

---

# 87. Static Import Preview

Java allows static imports.

Instead of:

```java
System.out.println(Math.sqrt(25));
```

you can import a static member:

```java
import static java.lang.Math.sqrt;
```

then:

```java
System.out.println(sqrt(25));
```

Static imports should be used when they improve readability.

---

# 88. Static Nested Class Preview

Java supports static nested classes.

Example:

```java
class Outer {
    static class Nested {
        void show() {
            System.out.println("Nested");
        }
    }
}
```

Usage:

```java
Outer.Nested obj = new Outer.Nested();
obj.show();
```

Nested classes are covered later.

---

# 89. `this` vs `static`

This is a very important comparison.

```text
this
 ↓
current object

static
 ↓
class-level context
```

Therefore:

```text
this.name
```

refers to one object's field.

```text
Student.count
```

refers to class-level state.

---

# 90. `this` and Static Field

You can technically refer to a static member from an instance context, but class-name access is clearer.

Example:

```java
class Student {
    static int count;

    void show() {
        System.out.println(Student.count);
    }
}
```

Prefer:

```java
Student.count
```

for clarity.

---

# 91. `this` Cannot Be Used in Static Methods

Wrong:

```java
class Demo {
    static void test() {
        System.out.println(this);
    }
}
```

Reason:

```text
static method
→ no current object
→ no this
```

---

# 92. Static Method Can Access Instance State Through Parameter

Example:

```java
class Student {
    String name;

    static void print(Student student) {
        System.out.println(student.name);
    }
}
```

Here the object is explicitly supplied.

---

# 93. Instance Method Can Access Static State

```java
class Student {
    static int count;
    String name;

    void show() {
        System.out.println(name);
        System.out.println(count);
    }
}
```

No problem.

The instance method has an object context and can also access class-level state.

---

# 94. Static Initialization Block Cannot Directly Access Instance Fields

Wrong:

```java
class Student {
    String name;

    static {
        System.out.println(name);
    }
}
```

There is no particular Student object during static class initialization.

---

# 95. Instance Initialization Can Access Static State

Example:

```java
class Student {
    static int count;

    {
        System.out.println(count);
    }
}
```

An instance initialization context can access the class-level static member.

---

# 96. Constructor Can Access Static State

Example:

```java
class Student {
    static int count;

    Student() {
        count++;
    }
}
```

This is valid.

---

# 97. Constructor Can Use `this`

Example:

```java
class Student {
    String name;

    Student(String name) {
        this.name = name;
    }
}
```

---

# 98. Constructor Can Use `this(...)`

Example:

```java
class Student {
    String name;

    Student() {
        this("Unknown");
    }

    Student(String name) {
        this.name = name;
    }
}
```

---

# 99. Constructor Cannot Directly Use `this(...)` After Other Statements

Remember:

```java
Student() {
    this("Unknown");
}
```

must begin with the constructor invocation.

---

# 100. `this` Is Not a Normal Variable

You cannot assign to `this`.

Invalid:

```java
this = anotherStudent;
```

The current-object reference cannot be reassigned.

---

# 101. `this` Cannot Be Used as a Static Reference

Invalid:

```java
static Student current = this;
```

because a static field initialization has no current instance.

---

# 102. `this` and Object Identity Example

```java
class Student {
    boolean isCurrent(Student student) {
        return this == student;
    }
}
```

If:

```java
Student a = new Student();
System.out.println(a.isCurrent(a));
```

output:

```text
true
```

---

# 103. `this` in Setter Methods

A common pattern:

```java
class Student {
    private String name;

    void setName(String name) {
        this.name = name;
    }
}
```

The parameter and field have the same name.

---

# 104. `this` in Getter Methods

You can write:

```java
String getName() {
    return this.name;
}
```

Although:

```java
return name;
```

is also normally sufficient.

---

# 105. `this` in Chained Setters

```java
class Student {
    String name;
    int age;

    Student setName(String name) {
        this.name = name;
        return this;
    }

    Student setAge(int age) {
        this.age = age;
        return this;
    }
}
```

Usage:

```java
Student student = new Student()
    .setName("Aman")
    .setAge(20);
```

---

# 106. Static Utility Class Example

```java
class NumberUtils {

    private NumberUtils() {
    }

    static boolean isEven(int number) {
        return number % 2 == 0;
    }

    static int square(int number) {
        return number * number;
    }
}
```

Usage:

```java
System.out.println(
    NumberUtils.isEven(10)
);

System.out.println(
    NumberUtils.square(5)
);
```

Output:

```text
true
25
```

---

# 107. Static Counter Example

```java
class User {
    private static int count;

    User() {
        count++;
    }

    static int getCount() {
        return count;
    }
}
```

Usage:

```java
new User();
new User();
new User();

System.out.println(User.getCount());
```

Output:

```text
3
```

---

# 108. Static Constant Example

```java
class AppConfig {
    static final String APP_NAME =
        "Java Master Course";

    static final int MAX_USERS = 1000;
}
```

Usage:

```java
System.out.println(AppConfig.APP_NAME);
System.out.println(AppConfig.MAX_USERS);
```

Output:

```text
Java Master Course
1000
```

---

# 109. Static Block Example

```java
class DatabaseConfig {
    static String url;

    static {
        url = "jdbc:example";
        System.out.println("Configuration loaded");
    }
}
```

When the class is initialized, the static block initializes the class-level state.

---

# 110. Multiple Static Initialization Statements

```java
class Config {
    static String name = "Java";

    static {
        System.out.println("Loading " + name);
    }

    static int version = 25;
}
```

Static field initialization and blocks execute in textual order during class initialization.

---

# 111. Static Block and `main`

```java
class Main {
    static {
        System.out.println("Static initialization");
    }

    public static void main(String[] args) {
        System.out.println("Main method");
    }
}
```

Typical output:

```text
Static initialization
Main method
```

---

# 112. Instance vs Static Example

```java
class Employee {
    String name;
    static String company = "ABC Ltd";
}
```

Usage:

```java
Employee a = new Employee();
Employee b = new Employee();

a.name = "Aman";
b.name = "Riya";

System.out.println(a.name);
System.out.println(b.name);

System.out.println(Employee.company);
```

Output:

```text
Aman
Riya
ABC Ltd
```

---

# 113. Shared Company Name

Because:

```java
company
```

is static, all Employee objects see the class-level value.

If:

```java
Employee.company = "XYZ Ltd";
```

then both objects observe:

```text
XYZ Ltd
```

---

# 114. Per-Object Name

Because:

```java
name
```

is instance state:

```text
a.name → Aman
b.name → Riya
```

Changing `a.name` does not normally change `b.name`.

---

# 115. Static Does Not Automatically Mean Better

Do not convert every method into:

```java
static
```

just to avoid creating objects.

Ask:

```text
Does this behavior belong to a specific object?
```

If yes, an instance method is often more appropriate.

---

# 116. Static Design Question

Consider:

```java
class BankAccount {
    double balance;

    static void withdraw(double amount) {
    }
}
```

This is suspicious.

Which account should be modified?

A better design is usually:

```java
class BankAccount {
    double balance;

    void withdraw(double amount) {
        balance -= amount;
    }
}
```

because withdrawal operates on one account.

---

# 117. Static Utility Design Question

Consider:

```java
class MathUtil {
    static int square(int x) {
        return x * x;
    }
}
```

This makes sense because square calculation does not require a MathUtil object.

---

# 118. Instance Behavior Example

```java
class BankAccount {
    double balance;

    void deposit(double amount) {
        balance += amount;
    }
}
```

The method operates on:

```text
this.balance
```

so it is naturally instance behavior.

---

# 119. Static Factory Method Preview

A class can have a static factory method:

```java
class Student {
    String name;

    private Student(String name) {
        this.name = name;
    }

    static Student create(String name) {
        return new Student(name);
    }
}
```

Usage:

```java
Student student =
    Student.create("Aman");
```

This is a common API design technique.

---

# 120. Why Static Factory Methods?

They can provide:

```text
meaningful method names
creation control
caching opportunities
different construction paths
better readability
```

They are ordinary static methods, not constructors.

---

# 121. Static Initialization vs Static Method

Static block:

```java
static {
}
```

runs as part of class initialization.

Static method:

```java
static void show() {
}
```

runs when explicitly called.

Do not confuse them.

---

# 122. Static Field vs Static Final Field

```java
static int count;
```

means:

```text
shared mutable class-level field
```

while:

```java
static final int MAX = 100;
```

means:

```text
class-level field that cannot be reassigned after initialization
```

---

# 123. Static Final Object Reference

Important:

```java
static final List<String> names = new ArrayList<>();
```

`final` prevents the reference from being reassigned.

It does not automatically make the List immutable.

You may still be able to modify the list:

```java
names.add("Aman");
```

This is an important distinction.

---

# 124. Static Final Reference

Think:

```text
final reference
      ↓
cannot point somewhere else

object itself
      ↓
may still be mutable
```

This is true for both static and instance final references.

---

# 125. Static Import Example

```java
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;

public class Main {
    public static void main(String[] args) {
        System.out.println(PI);
        System.out.println(sqrt(25));
    }
}
```

Output:

```text
3.141592653589793
5.0
```

Use static imports carefully; too many can reduce clarity.

---

# 126. Static Nested Class Example

```java
class University {
    static class Department {
        void show() {
            System.out.println("Department");
        }
    }
}
```

Usage:

```java
University.Department d =
    new University.Department();

d.show();
```

A static nested class does not require an instance of the outer class.

Nested classes are studied separately later.

---

# 127. `this` and Nested Classes Preview

An inner class can have an enclosing object relationship.

Static nested classes are different because they do not carry an implicit enclosing outer instance.

This distinction becomes important when studying nested classes.

---

# 128. Static and Memory — Avoid Oversimplification

Do not memorize:

```text
static = heap
instance = heap
local = stack
```

as a universal Java language rule.

The Java language specifies behavior and semantics, while JVM implementations manage memory in more sophisticated ways.

Focus first on:

```text
static → class-level member

instance → object-level member
```

---

# 129. Static Field Initialization and Thread Safety Preview

A static field may be shared by multiple threads.

Example:

```java
static int count;
```

If multiple threads modify it concurrently, race conditions can occur.

Concurrency and thread safety are covered much later.

---

# 130. Static Mutable State and Testing

A mutable static field can keep state between tests.

For example:

```java
static int count;
```

may retain its value unless reset.

This is one reason uncontrolled global state can make programs harder to test.

---

# 131. Static Field Naming

Normal static fields:

```java
static int count;
```

Constants:

```java
static final int MAX_USERS = 100;
```

Use meaningful names.

---

# 132. Static Methods Naming

Static methods follow normal method naming conventions:

```text
camelCase
```

Examples:

```java
calculateTotal()
isEven()
createStudent()
parseNumber()
```

---

# 133. `this` Naming Convention

`this` itself is a keyword and is normally used like:

```java
this.name
this.balance
this.speed
```

Do not create a variable named:

```text
this
```

because Java reserves the keyword.

---

# 134. Practical Program — Student and Static Count

```java
class Student {
    private final String name;
    private static int count;

    Student(String name) {
        this.name = name;
        count++;
    }

    String getName() {
        return this.name;
    }

    static int getCount() {
        return count;
    }
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student("Aman");
        Student b = new Student("Riya");

        System.out.println(a.getName());
        System.out.println(b.getName());
        System.out.println(Student.getCount());
    }
}
```

Output:

```text
Aman
Riya
2
```

---

# 135. Practical Program — `this` Method Chaining

```java
class Person {
    String name;
    int age;

    Person setName(String name) {
        this.name = name;
        return this;
    }

    Person setAge(int age) {
        this.age = age;
        return this;
    }

    void show() {
        System.out.println(name + " " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Person person = new Person()
            .setName("Aman")
            .setAge(20);

        person.show();
    }
}
```

Output:

```text
Aman 20
```

---

# 136. Practical Program — `this` as Argument

```java
class Student {
    String name;

    void register() {
        School.register(this);
    }
}

class School {
    static void register(Student student) {
        System.out.println(
            "Registered: " + student.name
        );
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        student.name = "Aman";
        student.register();
    }
}
```

Output:

```text
Registered: Aman
```

---

# 137. Practical Program — Static Utility

```java
class NumberUtils {

    private NumberUtils() {
    }

    static boolean isEven(int number) {
        return number % 2 == 0;
    }

    static int cube(int number) {
        return number * number * number;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(
            NumberUtils.isEven(10)
        );

        System.out.println(
            NumberUtils.cube(3)
        );
    }
}
```

Output:

```text
true
27
```

---

# 138. Practical Program — Static Configuration

```java
class AppConfig {
    static final String APP_NAME =
        "Java Master Course";

    static final int VERSION = 1;

    private AppConfig() {
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(AppConfig.APP_NAME);
        System.out.println(AppConfig.VERSION);
    }
}
```

Output:

```text
Java Master Course
1
```

---

# 139. Practical Program — Static Block

```java
class Database {
    static String url;

    static {
        url = "jdbc:demo";
        System.out.println("Database configuration loaded");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Database.url);
    }
}
```

Typical output:

```text
Database configuration loaded
jdbc:demo
```

---

# 140. Practical Program — Static + Instance

```java
class Employee {
    String name;
    static String company = "ABC";

    Employee(String name) {
        this.name = name;
    }

    void show() {
        System.out.println(
            name + " works at " + company
        );
    }
}

public class Main {
    public static void main(String[] args) {
        Employee a = new Employee("Aman");
        Employee b = new Employee("Riya");

        a.show();
        b.show();

        Employee.company = "XYZ";

        a.show();
        b.show();
    }
}
```

Output:

```text
Aman works at ABC
Riya works at ABC
Aman works at XYZ
Riya works at XYZ
```

---

# 141. Practical Program — Static Counter

```java
class Account {
    private static int totalAccounts;

    Account() {
        totalAccounts++;
    }

    static int getTotalAccounts() {
        return totalAccounts;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(
            Account.getTotalAccounts()
        );

        new Account();
        new Account();
        new Account();

        System.out.println(
            Account.getTotalAccounts()
        );
    }
}
```

Output:

```text
0
3
```

---

# 142. Practical Program — Static Factory

```java
class Student {
    private final String name;

    private Student(String name) {
        this.name = name;
    }

    static Student create(String name) {
        return new Student(name);
    }

    void show() {
        System.out.println(name);
    }
}

public class Main {
    public static void main(String[] args) {
        Student student =
            Student.create("Aman");

        student.show();
    }
}
```

Output:

```text
Aman
```

---

# 143. Practical Program — Constructor and Static Count

```java
class Product {
    private final String name;
    private static int created;

    Product(String name) {
        this.name = name;
        created++;
    }

    String getName() {
        return this.name;
    }

    static int getCreatedCount() {
        return created;
    }
}

public class Main {
    public static void main(String[] args) {
        Product a = new Product("Laptop");
        Product b = new Product("Mouse");
        Product c = new Product("Keyboard");

        System.out.println(a.getName());
        System.out.println(Product.getCreatedCount());
    }
}
```

Output:

```text
Laptop
3
```

---

# 144. Practical Program — `this` Identity

```java
class Student {

    boolean isSame(Student other) {
        return this == other;
    }
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student();
        Student b = new Student();

        System.out.println(a.isSame(a));
        System.out.println(a.isSame(b));
    }
}
```

Output:

```text
true
false
```

---

# 145. Practical Program — `this()` Chaining

```java
class Box {
    int length;
    int width;
    int height;

    Box() {
        this(1, 1, 1);
    }

    Box(int side) {
        this(side, side, side);
    }

    Box(int length, int width, int height) {
        this.length = length;
        this.width = width;
        this.height = height;
    }

    int volume() {
        return length * width * height;
    }
}

public class Main {
    public static void main(String[] args) {
        Box a = new Box();
        Box b = new Box(5);
        Box c = new Box(2, 3, 4);

        System.out.println(a.volume());
        System.out.println(b.volume());
        System.out.println(c.volume());
    }
}
```

Output:

```text
1
125
24
```

---

# 146. Practical Program — Static Final Constant

```java
class Circle {
    static final double PI =
        3.141592653589793;

    private final double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    double area() {
        return PI * radius * radius;
    }
}

public class Main {
    public static void main(String[] args) {
        Circle circle = new Circle(5);

        System.out.println(circle.area());
    }
}
```

Output:

```text
78.53981633974483
```

---

# 147. Practical Program — Object-Specific vs Class-Specific Data

```java
class Employee {
    String name;
    static String company = "ABC";

    Employee(String name) {
        this.name = name;
    }

    void show() {
        System.out.println(
            "Name: " + this.name
        );

        System.out.println(
            "Company: " + Employee.company
        );
    }
}
```

The employee's name is object-specific.

The company is shared class-level data.

---

# 148. Common Mistakes

## Mistake 1 — Thinking `this` means class

Wrong:

```text
this → class
```

Correct:

```text
this → current object
```

---

## Mistake 2 — Using `this` in static method

Wrong:

```java
static void test() {
    System.out.println(this);
}
```

There is no current object in a static method.

---

## Mistake 3 — Confusing `this` and `this()`

```text
this      → current object
this(...) → constructor chaining
```

---

## Mistake 4 — Forgetting `this` with shadowed fields

Wrong:

```java
Student(String name) {
    name = name;
}
```

Correct:

```java
Student(String name) {
    this.name = name;
}
```

---

## Mistake 5 — Thinking static belongs to every object separately

Wrong:

```text
each object gets its own static field
```

Correct:

```text
static member belongs to class-level state
```

---

## Mistake 6 — Accessing static through object

Avoid:

```java
student.count
```

Prefer:

```java
Student.count
```

---

## Mistake 7 — Thinking static means constant

Wrong:

```text
static = cannot change
```

Correct:

```text
final = cannot be reassigned
```

So:

```java
static int count;
```

can change.

---

## Mistake 8 — Making everything static

Static is not a replacement for OOP.

If behavior belongs to a specific object, use an instance method.

---

## Mistake 9 — Calling instance field directly from static method

Wrong:

```java
class Student {
    String name;

    static void show() {
        System.out.println(name);
    }
}
```

A specific Student object is required.

---

## Mistake 10 — Thinking static block runs for every object

It does not.

Static initialization belongs to class initialization, not each individual object construction.

---

# 149. `this` vs `static` Comparison

| Feature | `this` | `static` |
|---|---|---|
| Represents | Current object | Class-level member/context |
| Used for | Instance-related operations | Class-level operations/state |
| Available in instance context | Yes | Static members available |
| Available directly in static context | No | Yes |
| Example | `this.name` | `Student.count` |
| Main idea | Which object? | Which class? |

---

# 150. Instance vs Static Comparison

| Instance | Static |
|---|---|
| Belongs to object | Belongs to class-level context |
| Each object has separate instance fields | Static field is shared |
| Instance method has `this` | Static method has no `this` |
| Called through object | Prefer class-name access |
| Can directly use instance state | Cannot directly use instance state |
| Can access static members | Can directly access static members |

---

# 151. Simple Mental Model

Remember:

```text
OBJECT LEVEL
     ↓
this
     ↓
this.name
this.age
this.study()

CLASS LEVEL
     ↓
static
     ↓
Student.count
Student.create()
Student.MAX
```

---

# 152. Design Question — Should It Be Static?

Ask:

> Does this value belong separately to every object?

If yes:

```java
instance field
```

Example:

```java
student.name
```

Ask:

> Does this value logically belong to the class as a whole?

If yes:

```java
static field
```

Example:

```java
Student.count
```

---

# 153. Design Question — Should This Method Be Static?

Ask:

> Does this operation need a particular object's state?

If yes:

```java
instance method
```

Example:

```java
account.withdraw(500);
```

If no:

```java
static method
```

Example:

```java
MathUtil.square(5);
```

---

# 154. Design Example

Bad:

```java
class Student {
    String name;

    static void showName() {
        System.out.println(name);
    }
}
```

Problem:

```text
Which student's name?
```

Better:

```java
class Student {
    String name;

    void showName() {
        System.out.println(name);
    }
}
```

---

# 155. Design Example — Correct Static

```java
class Student {
    static int totalStudents;

    Student() {
        totalStudents++;
    }

    static int getTotalStudents() {
        return totalStudents;
    }
}
```

The count belongs to the class concept.

---

# 156. Design Example — Correct Instance

```java
class Student {
    String name;

    void study() {
        System.out.println(
            name + " is studying"
        );
    }
}
```

Studying is performed by a particular Student object.

---

# 157. `this` in Object Collaboration

```java
class Student {
    String name;

    void sendTo(Printer printer) {
        printer.print(this);
    }
}

class Printer {
    void print(Student student) {
        System.out.println(student.name);
    }
}
```

Here:

```java
this
```

passes the current Student object to another object.

---

# 158. `this` and Fluent APIs

The pattern:

```java
return this;
```

means:

```text
return the same current object
```

This enables:

```java
object.method1()
      .method2()
      .method3();
```

when each method returns the same compatible object.

---

# 159. Static and Fluent APIs

Static factory methods can start fluent chains.

Example:

```java
Student.create("Aman")
       .setAge(20)
       .show();
```

where:

```java
create()
```

is static and returns an object.

---

# 160. `this` and Constructors — Complete Picture

```java
class Student {
    String name;
    int age;

    Student() {
        this("Unknown", 0);
    }

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

Here `this` has two forms:

```text
this(...) → constructor chaining

this.name → current object's field
```

---

# 161. Static and Constructors — Complete Picture

```java
class Student {
    static int count;

    Student() {
        count++;
    }
}
```

Here:

```text
constructor → runs for each new object
static count → shared class-level state
```

This combination is very common.

---

# 162. Exercises — `this`

## Exercise 1

Create:

```text
Student
```

with:

```text
name
age
```

Use:

```java
this.name
this.age
```

inside the constructor.

---

## Exercise 2

Write:

```java
void setName(String name)
```

using:

```java
this.name = name;
```

---

## Exercise 3

Create two methods:

```text
methodA()
methodB()
```

Make `methodB()` call:

```java
this.methodA();
```

---

# 163. Exercises — `this()`

## Exercise 4

Create:

```text
Student()
Student(String)
Student(String, int)
```

Use constructor chaining with:

```java
this(...)
```

---

## Exercise 5

Create:

```text
Box()
Box(int)
Box(int, int, int)
```

Make the smaller constructors call the more complete constructor.

---

## Exercise 6

Write a constructor chain that demonstrates the exact execution order using print statements.

---

# 164. Exercises — Return `this`

## Exercise 7

Create:

```java
Person setName(String name)
Person setAge(int age)
```

Each method should return:

```java
this
```

Then chain the calls.

---

## Exercise 8

Create:

```text
Calculator
```

with fluent methods:

```text
add()
subtract()
multiply()
```

Return the current object after each operation.

---

# 165. Exercises — Static Fields

## Exercise 9

Create:

```text
Student
```

with:

```java
static int count;
```

Increment the count in the constructor.

Create five students.

Print:

```java
Student.count
```

---

## Exercise 10

Create:

```text
Employee
```

with:

```text
name
static company
```

Create three employees.

Change:

```java
Employee.company
```

and observe all objects.

---

# 166. Exercises — Static Methods

## Exercise 11

Create:

```text
MathUtil
```

with:

```text
static square()
static cube()
static isEven()
```

Do not create MathUtil objects.

---

## Exercise 12

Create:

```text
NumberUtils
```

with:

```text
static max()
static min()
static average()
```

---

# 167. Exercises — Static Blocks

## Exercise 13

Create a class with:

```text
static field
static block
constructor
```

Print messages from each.

Create two objects.

Observe the output order.

---

## Exercise 14

Create two static blocks.

Print:

```text
Block 1
Block 2
```

Observe the execution order.

---

# 168. Exercises — Instance vs Static

## Exercise 15

Design:

```text
BankAccount
```

Determine which should be:

```text
instance
static
```

Candidates:

```text
accountNumber
balance
bankName
totalAccounts
deposit()
withdraw()
```

Explain your choices.

---

# 169. Exercises — Real-World Design

## Exercise 16

Design:

```text
University
Student
```

Possible fields:

```text
University.name
University.totalStudents

Student.name
Student.rollNumber
```

Decide which should be static and which should be instance fields.

---

# 170. Exercises — Static Factory

## Exercise 17

Create:

```text
User
```

with a private constructor.

Create:

```java
static User create(String name)
```

that returns a User object.

---

# 171. Exercises — Combined

## Exercise 18

Create:

```text
Product
```

with:

```text
name
price
static totalProducts
```

Constructor:

```text
Product(String name, double price)
```

Methods:

```text
show()
static getTotalProducts()
```

Create several objects.

---

# 172. Exercises — Advanced

## Exercise 19

Create an immutable:

```text
Point
```

with:

```text
private final int x;
private final int y;
```

Use:

```java
this.x = x;
this.y = y;
```

Add:

```text
static origin()
```

that returns:

```text
Point(0, 0)
```

---

# 173. Exercises — Static and Object Method

## Exercise 20

Create:

```text
Student
```

with:

```text
name
static count
```

Add:

```text
instance method show()
static method showCount()
```

Explain why each method has the chosen type.

---

# 174. Output Questions

## Question 1

```java
class Student {
    String name;

    Student(String name) {
        this.name = name;
    }
}

Student s = new Student("Aman");

System.out.println(s.name);
```

Output:

```text
Aman
```

---

## Question 2

```java
class Student {
    String name;

    Student(String name) {
        name = name;
    }
}

Student s = new Student("Aman");

System.out.println(s.name);
```

Output:

```text
null
```

The parameter is assigned to itself.

---

## Question 3

```java
class Student {
    String name;

    void show() {
        System.out.println(this.name);
    }
}

Student s = new Student();
s.name = "Riya";
s.show();
```

Output:

```text
Riya
```

---

## Question 4

```java
class Student {
    String name;

    Student getStudent() {
        return this;
    }
}

Student s = new Student();

System.out.println(s == s.getStudent());
```

Output:

```text
true
```

---

## Question 5

```java
class Student {
    String name;

    Student setName(String name) {
        this.name = name;
        return this;
    }
}

Student s = new Student()
    .setName("Aman");

System.out.println(s.name);
```

Output:

```text
Aman
```

---

## Question 6

```java
class Student {
    static int count;

    Student() {
        count++;
    }
}

new Student();
new Student();
new Student();

System.out.println(Student.count);
```

Output:

```text
3
```

---

## Question 7

```java
class Student {
    static int count = 10;

    void show() {
        System.out.println(count);
    }
}

Student s = new Student();

s.show();
```

Output:

```text
10
```

---

## Question 8

```java
class Student {
    String name;

    static void show() {
        System.out.println(name);
    }
}
```

Result:

```text
Compilation error
```

The static method has no specific Student object.

---

## Question 9

```java
class Demo {
    static {
        System.out.println("Static");
    }

    Demo() {
        System.out.println("Constructor");
    }
}

Demo a = new Demo();
Demo b = new Demo();
```

Typical output:

```text
Static
Constructor
Constructor
```

---

## Question 10

```java
class Employee {
    String name;
    static String company = "ABC";

    Employee(String name) {
        this.name = name;
    }
}

Employee a = new Employee("Aman");
Employee b = new Employee("Riya");

Employee.company = "XYZ";

System.out.println(a.name);
System.out.println(b.name);
System.out.println(a.company);
System.out.println(b.company);
```

Output:

```text
Aman
Riya
XYZ
XYZ
```

---

## Question 11

```java
class Test {
    static int x = 10;

    static {
        x = 20;
    }
}

System.out.println(Test.x);
```

Output:

```text
20
```

---

## Question 12

```java
class Test {
    static {
        System.out.println("A");
    }

    static {
        System.out.println("B");
    }
}

Test.x();
```

This example is intentionally invalid because `x()` does not exist.

The class may be initialized due to other active uses, but the call itself is a compile-time error.

---

# 175. Interview Questions

## Q1. What is `this`?

`this` is a reference to the current object in an instance context.

---

## Q2. Why is `this` used?

Common uses include:

```text
accessing current object's fields
calling current object's methods
distinguishing fields from parameters
calling another constructor
passing the current object
returning the current object
```

---

## Q3. Can `this` be used in a static method?

No.

A static method does not have a current instance.

---

## Q4. What is the difference between `this` and `this()`?

```text
this → current object reference

this() → calls another constructor of the same class
```

---

## Q5. Why use `this.name = name`?

Because:

```text
this.name → instance field
name → parameter
```

---

## Q6. Is `this` always necessary for instance fields?

No.

It is often optional unless needed to resolve naming ambiguity or for explicitness.

---

## Q7. Can `this` call an instance method?

Yes.

```java
this.show();
```

---

## Q8. Can `this` be passed as an argument?

Yes.

```java
printer.print(this);
```

---

## Q9. Can a method return `this`?

Yes.

```java
return this;
```

This returns the current object.

---

## Q10. What is `static`?

`static` declares a member associated with class-level state/context rather than a particular object instance.

---

## Q11. What is a static variable?

A static field is associated with the class-level context and is shared by instances rather than having a separate copy in each object.

---

## Q12. What is a static method?

A method associated with class-level context that can be invoked without an object instance.

---

## Q13. Can a static method access an instance variable directly?

No.

It needs a specific object reference.

---

## Q14. Can an instance method access static variables?

Yes.

---

## Q15. Can a static method access static variables?

Yes.

---

## Q16. Can a static method use `this`?

No.

---

## Q17. Why is `main()` static?

So the JVM can invoke the entry-point method without first requiring an instance of the application class.

---

## Q18. What is a static block?

A block used for class-level initialization that executes during class initialization.

---

## Q19. How many times does a static block execute?

For a particular class initialization by a particular class loader, static initialization occurs once.

Do not confuse this with each object construction.

---

## Q20. How many times does a constructor execute?

The applicable constructor executes as part of each corresponding object construction.

---

## Q21. Can static methods be overloaded?

Yes.

---

## Q22. Can static methods be overridden?

No.

Static methods are hidden when a subclass declares a matching static method.

---

## Q23. What is static method hiding?

When a subclass declares a static method with the same signature as an inherited static method, the subclass method hides the parent method rather than overriding it dynamically.

---

## Q24. Can a class have both static and instance methods?

Yes.

---

## Q25. Can a class have both static and instance fields?

Yes.

---

## Q26. Does static mean constant?

No.

`final` is related to preventing reassignment.

---

## Q27. What is a static constant?

A common constant pattern is:

```java
static final
```

---

## Q28. Can a static final object be mutable?

Yes.

`final` prevents reassignment of the reference, not necessarily mutation of the referenced object.

---

## Q29. What is a static import?

It allows static members to be referenced without qualifying them with the class name.

---

## Q30. What is a static nested class?

A nested class declared `static`. It does not require an enclosing outer-class instance.

---

# 176. Important Interview Comparison

Question:

> Why can an instance method access static variables, but a static method cannot directly access instance variables?

Answer:

An instance method has a current object and therefore can access that object's instance state.

A static method has no automatically supplied current object, so it cannot know which object's instance state should be accessed.

---

# 177. Example of the Difference

Instance:

```java
class Student {
    String name;

    void show() {
        System.out.println(name);
    }
}
```

The current object tells Java which `name` to use.

Static:

```java
class Student {
    String name;

    static void show() {
        System.out.println(name);
    }
}
```

There is no specific Student object.

---

# 178. `this` and Static — Final Mental Model

Ask:

```text
"Which object?"
```

Think:

```java
this
```

Ask:

```text
"Which class?"
```

Think:

```java
static
```

Example:

```java
this.name
```

means:

```text
name of THIS object
```

while:

```java
Student.count
```

means:

```text
count associated with Student class-level state
```

---

# 179. Final Summary

This chapter covered:

```text
✓ this keyword
✓ Current object
✓ this.field
✓ this.method()
✓ this()
✓ this(...) 
✓ this as method argument
✓ this as return value
✓ this and object identity
✓ this and constructors
✓ this and shadowing
✓ Fluent APIs
✓ static keyword
✓ Static fields
✓ Static methods
✓ Static blocks
✓ Static initialization
✓ Static constants
✓ static final
✓ Instance vs static
✓ Static access
✓ Instance access
✓ main() and static
✓ Command-line arguments
✓ Static imports
✓ Static nested classes preview
✓ Static method hiding preview
✓ Static factory methods
✓ Static mutable state
✓ Constructor + static
✓ Static initialization order
✓ Common mistakes
✓ Practical programs
✓ Exercises
✓ Output questions
✓ Interview questions
```

---

# 180. Most Important Rules

```text
1. this refers to the current object.

2. this.field accesses the current object's field.

3. this.method() calls a method on the current object.

4. this(...) calls another constructor of the same class.

5. this(...) must be the first constructor statement.

6. this can be passed as an argument.

7. this can be returned from an instance method.

8. this cannot be used in a static method.

9. static members belong to class-level context.

10. Instance fields represent per-object state.

11. Static fields represent shared class-level state.

12. Static methods do not have an implicit this.

13. Static methods cannot directly access instance fields.

14. Instance methods can access static members.

15. static does not mean constant.

16. final prevents reassignment; static means class-level association.

17. static blocks execute during class initialization.

18. Constructors execute for object construction.

19. Static methods can be overloaded.

20. Static methods are hidden, not overridden, in inheritance.

21. Prefer ClassName.staticMember for clarity.

22. Do not make everything static just to avoid objects.

23. Use instance methods when behavior belongs to a particular object.

24. Use static methods when behavior does not require a particular object.

25. Use this to clearly express current-object behavior.
```

---

# 181. What Comes Next?

You now understand:

```text
class
 ↓
object
 ↓
constructor
 ↓
this
 ↓
instance state
 ↓
static class-level state
```

The next major OOP concept is:

```text
ENCAPSULATION
```

Until now, many examples used fields directly:

```java
student.name = "Aman";
student.marks = 90;
```

But direct access can allow invalid data.

For example:

```java
student.marks = -500;
```

We need a way to protect an object's internal state.

---

# Chapter 15 — Encapsulation

In the next chapter you will learn:

```text
✓ What is encapsulation?
✓ Data hiding
✓ private fields
✓ public methods
✓ getters
✓ setters
✓ Controlled access
✓ Validation
✓ Read-only properties
✓ Write-only concepts
✓ Encapsulating collections
✓ Defensive copying
✓ Immutable object design
✓ Real-world examples
✓ BankAccount design
✓ Student design
✓ Employee design
✓ Common encapsulation mistakes
✓ Practical programs
✓ Exercises
✓ Interview questions
```

Encapsulation is one of the four major OOP pillars and is extremely important for writing good Java classes.
