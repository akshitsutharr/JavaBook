# Chapter 11 — OOP Fundamentals in Java

> **Java Master Course — Chapter 11 of 50**
>
> This chapter begins the most important section of the Java course: **Object-Oriented Programming (OOP)**.
>
> Java is heavily object-oriented. To become strong in Java, you must understand not only how to write classes and objects, but also why they exist, how they model real-world systems, and how objects communicate with one another.
>
> This chapter focuses on the foundations. Constructors, `this`, `static`, encapsulation, inheritance, polymorphism, abstraction, and interfaces will be studied in later chapters in much greater depth.

---

# 1. What Is OOP?

OOP stands for:

```text
Object-Oriented Programming
```

It is a programming approach where a program is designed around:

```text
objects
```

An object represents some entity and combines:

```text
data
+
behavior
```

For example, a bank account can have:

```text
Data:
account number
owner name
balance

Behavior:
deposit
withdraw
check balance
```

In Java, we model such entities using classes and objects.

---

# 2. Why Do We Need OOP?

Imagine you are building a college management system.

You may have:

```text
Students
Teachers
Courses
Departments
Exams
Fees
Attendance
```

If everything is written as unrelated variables and methods, a large program becomes difficult to manage.

OOP gives us a way to group related data and behavior.

For example:

```text
Student
 ├── name
 ├── age
 ├── rollNumber
 ├── marks
 └── study()

Teacher
 ├── name
 ├── subject
 ├── employeeId
 └── teach()

Course
 ├── name
 ├── code
 └── enrollStudent()
```

This makes the program easier to understand and organize.

---

# 3. OOP in Simple Language

The easiest way to think about OOP is:

> **Create software objects that represent things or concepts in the problem you are solving.**

For example, in a shopping application:

```text
Customer
Product
Cart
Order
Payment
Address
```

Each object can have:

```text
state
+
behavior
```

---

# 4. What Is an Object?

An object is an instance of a class.

For example:

```java
Student s1 = new Student();
```

Here:

```text
Student
```

is the class.

And:

```text
s1
```

refers to a Student object.

---

# 5. Real-World Object Example

Think about a real student.

A student has:

```text
Name
Age
Roll number
Course
Marks
```

These are properties or data.

The student can:

```text
study
attend class
write exam
submit assignment
```

These are behaviors.

In OOP:

```text
properties → fields
behaviors  → methods
```

---

# 6. What Is a Class?

A class is a blueprint or type definition used to describe objects.

Example:

```java
class Student {
    String name;
    int age;

    void study() {
        System.out.println(name + " is studying.");
    }
}
```

The class describes what a Student object can contain and do.

It does not mean that one particular student already exists.

---

# 7. Class as a Blueprint

Think of a house blueprint.

A blueprint defines:

```text
rooms
doors
windows
dimensions
```

But the blueprint itself is not a physical house.

Similarly:

```java
class Student {
    String name;
    int age;
}
```

defines the structure and behavior of Student objects.

---

# 8. Class vs Object

This distinction is extremely important.

Class:

```text
blueprint/type
```

Object:

```text
actual instance
```

Example:

```java
class Student {
    String name;
    int age;
}
```

Objects:

```java
Student s1 = new Student();
Student s2 = new Student();
```

Now there are two Student objects.

---

# 9. Multiple Objects from One Class

One class can create many objects.

Example:

```java
class Student {
    String name;
    int age;
}

Student s1 = new Student();
Student s2 = new Student();
Student s3 = new Student();
```

Conceptually:

```text
             Student class
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
      s1         s2         s3
   Student    Student    Student
```

Each object has its own instance state.

---

# 10. Creating a Class

Basic syntax:

```java
class ClassName {

    // fields

    // methods
}
```

Example:

```java
class Car {
    String brand;
    int speed;

    void drive() {
        System.out.println("Car is driving.");
    }
}
```

---

# 11. Creating an Object

Use:

```java
new
```

Example:

```java
Car car = new Car();
```

There are two important parts:

```java
Car
```

is the reference type.

```java
new Car()
```

creates a new Car object.

---

# 12. Understanding `new`

The expression:

```java
new Car()
```

creates a new instance of `Car`.

Example:

```java
Car car = new Car();
```

Conceptually:

```text
car
 │
 ▼
Car object
┌──────────────┐
│ brand        │
│ speed        │
└──────────────┘
```

The variable `car` stores a reference to that object.

---

# 13. Accessing Object Fields

Example:

```java
class Student {
    String name;
    int age;
}
```

Create object:

```java
Student s1 = new Student();
```

Set fields:

```java
s1.name = "Aman";
s1.age = 20;
```

Read fields:

```java
System.out.println(s1.name);
System.out.println(s1.age);
```

Output:

```text
Aman
20
```

---

# 14. Dot Operator

The dot:

```java
.
```

is commonly used to access members through an object reference.

Example:

```java
s1.name
s1.age
s1.study()
```

It means, conceptually:

```text
access a member associated with the referenced object/type
```

---

# 15. Adding Methods to a Class

Example:

```java
class Student {
    String name;
    int age;

    void study() {
        System.out.println(name + " is studying.");
    }
}
```

Call:

```java
Student s1 = new Student();

s1.name = "Aman";

s1.study();
```

Output:

```text
Aman is studying.
```

---

# 16. Object State

The current values stored in an object's instance fields represent its state.

Example:

```java
Student s1 = new Student();

s1.name = "Aman";
s1.age = 20;
```

State:

```text
name = Aman
age  = 20
```

Another object can have different state:

```java
Student s2 = new Student();

s2.name = "Riya";
s2.age = 21;
```

---

# 17. Object Behavior

Behavior is what an object can do.

In Java, behavior is usually represented by methods.

Example:

```java
class BankAccount {
    double balance;

    void deposit(double amount) {
        balance += amount;
    }
}
```

The behavior is:

```text
deposit()
```

---

# 18. State + Behavior

A useful OOP mental model:

```text
                 OBJECT
                   │
          ┌────────┴────────┐
          ↓                 ↓
        STATE            BEHAVIOR
          │                 │
       fields            methods
```

Example:

```text
Car

State:
brand
speed
fuel

Behavior:
accelerate()
brake()
refuel()
```

---

# 19. Real-World Modeling

Suppose the problem is:

> Build a library management system.

Possible entities:

```text
Book
Member
Librarian
Library
Loan
```

Book:

```text
title
author
ISBN
availability

borrow()
returnBook()
```

Member:

```text
name
memberId

borrowBook()
returnBook()
```

This is object-oriented modeling.

---

# 20. Not Everything Must Be a Physical Object

OOP does not mean every class must represent a physical object.

Classes can represent concepts such as:

```text
Order
Payment
Transaction
Connection
Configuration
Report
DateRange
Coordinate
```

They are software models.

---

# 21. OOP Is About Modeling Responsibilities

A good object should have a clear responsibility.

For example:

```java
class BankAccount {
    double balance;

    void deposit(double amount) {
        balance += amount;
    }
}
```

The account is responsible for managing its balance-related behavior.

You do not need to put unrelated logic into the same class.

---

# 22. Procedural Programming

Before understanding OOP, understand procedural programming.

Procedural programming organizes programs mainly around:

```text
functions
+
data
```

Example:

```java
double balance = 1000;

void deposit(double amount) {
    balance += amount;
}
```

The data and operations can be separate.

---

# 23. Procedural Example

Imagine:

```java
String studentName = "Aman";
int studentMarks = 90;

void printStudent() {
    System.out.println(studentName);
    System.out.println(studentMarks);
}
```

As the program grows, you may have many global-like data items and functions that operate on them.

Managing relationships between data and operations becomes harder.

---

# 24. OOP Version

Instead:

```java
class Student {
    String name;
    int marks;

    void printStudent() {
        System.out.println(name);
        System.out.println(marks);
    }
}
```

Then:

```java
Student student = new Student();

student.name = "Aman";
student.marks = 90;

student.printStudent();
```

The related data and behavior are grouped inside the class.

---

# 25. Procedural vs OOP

| Procedural | OOP |
|---|---|
| Focus on functions/procedures | Focus on objects |
| Data and operations may be separate | Data and behavior can be grouped |
| Often top-down organization | Often model-driven organization |
| Can become harder to maintain at large scale | Can provide strong structure for large systems |
| Reuse through functions/modules | Reuse through classes, composition, inheritance, etc. |

This does not mean procedural programming is bad.

Both approaches are useful.

---

# 26. Java and OOP

Java strongly supports object-oriented programming.

You work with:

```text
classes
objects
interfaces
inheritance
encapsulation
polymorphism
abstraction
```

Java also has primitive types:

```java
int
double
char
boolean
```

so it is not accurate to say that literally everything in Java is an object.

---

# 27. Is Everything in Java an Object?

No.

Java has primitive types.

For example:

```java
int x = 10;
```

`x` is an `int`, a primitive value.

Java also has reference types:

```java
String name = "Java";
Student student = new Student();
```

So a better statement is:

> Java is an object-oriented language with both primitive types and reference types.

---

# 28. Reference Types

Examples:

```java
String
Student
Car
int[]
Student[]
```

Variables of reference types hold references to objects.

Example:

```java
Student s1 = new Student();
```

`s1` is a reference variable.

---

# 29. Primitive Types

Examples:

```java
int age = 20;
double price = 99.5;
boolean active = true;
char grade = 'A';
```

These are primitive values.

Wrapper classes such as:

```java
Integer
Double
Boolean
Character
```

are reference types and will be studied later.

---

# 30. Instance Fields

Consider:

```java
class Student {
    String name;
    int age;
}
```

These fields:

```java
name
age
```

are instance fields.

Every Student object has its own values for these fields.

---

# 31. Different Objects, Different State

```java
Student s1 = new Student();
Student s2 = new Student();

s1.name = "Aman";
s2.name = "Riya";

System.out.println(s1.name);
System.out.println(s2.name);
```

Output:

```text
Aman
Riya
```

Changing `s1.name` does not automatically change `s2.name`.

---

# 32. Object Identity

Two objects can contain identical data but still be different objects.

Example:

```java
Student s1 = new Student();
Student s2 = new Student();

s1.name = "Aman";
s2.name = "Aman";
```

They have equal field values, but:

```text
s1
```

and:

```text
s2
```

refer to different object instances.

---

# 33. Reference Equality

For objects:

```java
s1 == s2
```

checks whether both references point to the same object.

Example:

```java
Student s1 = new Student();
Student s2 = new Student();

System.out.println(s1 == s2);
```

Output:

```text
false
```

---

# 34. Same Object Through Two References

```java
Student s1 = new Student();
Student s2 = s1;

System.out.println(s1 == s2);
```

Output:

```text
true
```

Both references identify the same object.

---

# 35. Object Diagram

Consider:

```java
Student s1 = new Student();
Student s2 = s1;
```

Conceptually:

```text
s1 ─────┐
        │
        ▼
   ┌──────────────┐
   │ Student      │
   │ name = null  │
   │ age = 0      │
   └──────────────┘
        ▲
        │
s2 ─────┘
```

There is one object and two references.

---

# 36. Multiple Objects

```java
Student s1 = new Student();
Student s2 = new Student();
```

Conceptually:

```text
s1 ───► Student object A

s2 ───► Student object B
```

There are two separate objects.

---

# 37. Object Lifecycle — Basic View

At a high level:

```text
class definition
      ↓
object creation
      ↓
object used
      ↓
references may disappear
      ↓
object becomes unreachable
      ↓
eligible for garbage collection
```

Garbage collection will be studied in depth later.

---

# 38. Default Field Values

When an object is created, its instance fields receive default values if they are not explicitly initialized.

Example:

```java
class Student {
    String name;
    int age;
    boolean active;
}
```

New object:

```java
Student s = new Student();
```

Conceptually:

```text
name   → null
age    → 0
active → false
```

---

# 39. Field Initializers

You can provide initial values:

```java
class Student {
    String name = "Unknown";
    int age = 18;
}
```

New object:

```java
Student s = new Student();
```

starts with:

```text
name = Unknown
age  = 18
```

---

# 40. Methods Belong to the Class

Example:

```java
class Student {
    String name;

    void study() {
        System.out.println(name + " is studying.");
    }
}
```

The method is defined once in the class.

Each object can invoke it using its own state:

```java
s1.study();
s2.study();
```

---

# 41. Same Method, Different Result

```java
class Student {
    String name;

    void introduce() {
        System.out.println("I am " + name);
    }
}
```

Usage:

```java
Student s1 = new Student();
Student s2 = new Student();

s1.name = "Aman";
s2.name = "Riya";

s1.introduce();
s2.introduce();
```

Output:

```text
I am Aman
I am Riya
```

The same method operates using the state of the particular object through which it was called.

---

# 42. The Hidden `this` Idea

Inside an instance method, Java provides the special reference:

```java
this
```

which refers to the current object.

Example:

```java
class Student {
    String name;

    void printName() {
        System.out.println(this.name);
    }
}
```

If:

```java
s1.printName();
```

then inside that method:

```text
this → s1
```

`this` will be studied deeply in Chapter 14.

---

# 43. Instance Method

A method that normally operates on object state is an instance method.

Example:

```java
class Car {
    int speed;

    void accelerate() {
        speed += 10;
    }
}
```

Call:

```java
Car car = new Car();

car.accelerate();
```

The method operates on that particular Car object.

---

# 44. Static Method Preview

A static method belongs to the class rather than a particular object.

Example:

```java
class MathUtil {
    static int add(int a, int b) {
        return a + b;
    }
}
```

Call:

```java
int result = MathUtil.add(10, 20);
```

You do not need a MathUtil object for this method.

`static` will be studied in detail in Chapter 14.

---

# 45. Object Communication

One of the important ideas in OOP is that objects can communicate by calling methods on one another.

Example:

```java
class Printer {
    void print(String message) {
        System.out.println(message);
    }
}

class Report {
    void generate(Printer printer) {
        printer.print("Report generated.");
    }
}
```

Usage:

```java
Printer printer = new Printer();
Report report = new Report();

report.generate(printer);
```

The Report object uses the Printer object.

---

# 46. Objects Working Together

Real applications usually contain many objects.

For example:

```text
Order
  ↓
Customer
  ↓
Address

Order
  ↓
Payment

Order
  ↓
Product
```

Objects collaborate rather than existing in isolation.

This idea becomes central to good OOP design.

---

# 47. Modeling a Bank Account

Let's model:

```text
BankAccount
```

State:

```text
accountNumber
owner
balance
```

Behavior:

```text
deposit()
withdraw()
showBalance()
```

Example:

```java
class BankAccount {
    String accountNumber;
    String owner;
    double balance;

    void deposit(double amount) {
        balance += amount;
    }

    void withdraw(double amount) {
        balance -= amount;
    }

    void showBalance() {
        System.out.println("Balance = " + balance);
    }
}
```

---

# 48. Using the BankAccount Object

```java
BankAccount account = new BankAccount();

account.accountNumber = "A101";
account.owner = "Aman";
account.balance = 1000;

account.deposit(500);
account.withdraw(200);

account.showBalance();
```

Output:

```text
Balance = 1300.0
```

This is only a basic model.

Later, encapsulation will make the design safer.

---

# 49. Why This BankAccount Is Not Yet a Good Design

Currently:

```java
account.balance = -1000000;
```

is possible.

Anyone can directly change the balance.

That is dangerous.

Later, encapsulation will allow us to protect the internal state:

```java
private double balance;
```

and control changes through methods.

This is one of the major reasons OOP is useful.

---

# 50. Modeling a Car

```java
class Car {
    String brand;
    String color;
    int speed;

    void accelerate() {
        speed += 10;
    }

    void brake() {
        if (speed >= 10) {
            speed -= 10;
        }
    }

    void showSpeed() {
        System.out.println("Speed = " + speed);
    }
}
```

Usage:

```java
Car car = new Car();

car.brand = "Toyota";
car.color = "White";

car.accelerate();
car.accelerate();

car.showSpeed();
```

Output:

```text
Speed = 20
```

---

# 51. Modeling a Rectangle

State:

```text
length
width
```

Behavior:

```text
area()
perimeter()
```

Example:

```java
class Rectangle {
    double length;
    double width;

    double area() {
        return length * width;
    }

    double perimeter() {
        return 2 * (length + width);
    }
}
```

Usage:

```java
Rectangle rectangle = new Rectangle();

rectangle.length = 10;
rectangle.width = 5;

System.out.println(rectangle.area());
System.out.println(rectangle.perimeter());
```

Output:

```text
50.0
30.0
```

---

# 52. Modeling a Student

```java
class Student {
    String name;
    int rollNumber;
    int marks;

    void study() {
        System.out.println(name + " is studying.");
    }

    void showResult() {
        System.out.println(
            name + " scored " + marks
        );
    }
}
```

Usage:

```java
Student student = new Student();

student.name = "Aman";
student.rollNumber = 101;
student.marks = 88;

student.study();
student.showResult();
```

---

# 53. Real-World Modeling Is About Choosing the Right Boundaries

Suppose an online store has:

```text
Customer
Order
Product
Payment
```

You should ask:

```text
What data belongs to each concept?
What behavior belongs to each concept?
Which object should be responsible for each operation?
Which objects need to communicate?
```

These questions are more important than simply creating many classes.

---

# 54. Bad OOP Design — One Giant Class

A beginner may create:

```java
class Everything {
    // student logic
    // payment logic
    // database logic
    // email logic
    // order logic
    // product logic
}
```

This becomes difficult to maintain.

A better design separates responsibilities.

For example:

```text
StudentService
PaymentService
Order
Product
EmailService
```

The exact design depends on the application.

---

# 55. Class Responsibility

A class should have a clear purpose.

For example:

```java
class Invoice {
    // invoice-related data and behavior
}
```

instead of:

```java
class Invoice {
    // invoice
    // database
    // email
    // authentication
    // UI
}
```

This connects to cohesion and SOLID principles, which will be studied later.

---

# 56. Abstraction Preview

OOP lets us hide unnecessary implementation details.

For example:

```java
account.withdraw(500);
```

The caller does not need to know every internal step.

The method may internally:

```text
check balance
validate amount
update balance
record transaction
```

The caller only needs the appropriate public operation.

This idea is called:

```text
abstraction
```

and will be studied deeply in Chapter 20.

---

# 57. Encapsulation Preview

Encapsulation means controlling access to an object's internal state and behavior.

Instead of:

```java
account.balance = -1000;
```

we can design:

```java
private double balance;

public void withdraw(double amount) {
    // validation
}
```

This helps protect the object's rules.

Chapter 15 covers encapsulation in detail.

---

# 58. Inheritance Preview

Inheritance lets one class derive from another.

Example:

```java
class Animal {
    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking");
    }
}
```

Now Dog inherits accessible members from Animal according to Java's inheritance/access rules.

Inheritance will be studied in Chapter 16.

---

# 59. Polymorphism Preview

Polymorphism means that one common interface or parent type can work with different object types.

Example:

```java
Animal animal = new Dog();
```

If `Dog` overrides an instance method:

```java
animal.sound();
```

can invoke the Dog implementation at runtime.

This will be studied deeply in Chapters 18 and 19.

---

# 60. Abstraction, Encapsulation, Inheritance, Polymorphism

These are commonly called the four major OOP pillars:

```text
Encapsulation
Inheritance
Polymorphism
Abstraction
```

But remember:

> OOP is larger than just memorizing four words.

Good OOP also involves:

```text
composition
interfaces
responsibilities
coupling
cohesion
object collaboration
design principles
```

---

# 61. The Four Pillars — Simple Meaning

Encapsulation:

```text
Protect and control object state.
```

Inheritance:

```text
Create a subtype relationship using an existing class.
```

Polymorphism:

```text
One common type can work with different implementations.
```

Abstraction:

```text
Expose essential behavior while hiding unnecessary implementation details.
```

These will be covered one by one.

---

# 62. OOP Is Not Just Classes

Beginners sometimes think:

```text
OOP = create classes
```

That is incomplete.

You can create hundreds of classes and still have terrible OOP design.

Good OOP asks:

```text
Who owns this data?
Who should perform this operation?
What should be public?
What should be hidden?
Which objects collaborate?
Should we use inheritance or composition?
```

---

# 63. Class as a New Type

When you define:

```java
class Student {
    String name;
    int marks;
}
```

you are defining a new reference type:

```text
Student
```

Now Java understands variables such as:

```java
Student s;
```

just as it understands:

```java
String text;
```

---

# 64. User-Defined Types

Classes allow you to create types that match your problem domain.

For example:

```java
class Product {
    String name;
    double price;
}
```

Now:

```java
Product product;
```

is a meaningful type in the application.

---

# 65. Object State Can Change

Objects are often mutable.

Example:

```java
class Counter {
    int value;

    void increment() {
        value++;
    }
}
```

Usage:

```java
Counter counter = new Counter();

counter.increment();
counter.increment();

System.out.println(counter.value);
```

Output:

```text
2
```

The object's state changed over time.

---

# 66. Immutable Objects Preview

Not all objects should be mutable.

An immutable object is designed so its state cannot be changed after creation.

`String` is an important example.

You can design immutable classes later using techniques such as:

```text
private final fields
constructor initialization
no setters
defensive copies when needed
```

Immutability and good OOP design will be studied further in Chapter 23.

---

# 67. Object Identity vs State

Two objects can have:

```text
same state
```

but different identities.

Example:

```text
Student A:
name = Aman
marks = 90

Student B:
name = Aman
marks = 90
```

They may represent two separate students despite identical field values.

This distinction is important when working with objects.

---

# 68. Object Equality

Do not automatically assume:

```java
a == b
```

means objects are logically equal.

For ordinary objects:

```java
==
```

checks reference identity.

Logical equality can be defined using:

```java
equals()
```

when the class implements it appropriately.

`equals()` and `hashCode()` will be discussed later.

---

# 69. Object References Can Be `null`

Example:

```java
Student student = null;
```

The variable currently refers to no object.

Calling:

```java
student.study();
```

causes:

```text
NullPointerException
```

because there is no Student object to receive the method call.

---

# 70. Null Reference Diagram

```text
student
   │
   ▼
  null
```

There is no object at the end of the reference.

---

# 71. Creating an Object After `null`

```java
Student student = null;

student = new Student();

student.name = "Aman";
```

Now:

```text
student ───► Student object
```

---

# 72. Losing a Reference

Example:

```java
Student student = new Student();

student = new Student();
```

The first Student object may become unreachable if no other reference points to it.

It can eventually become eligible for garbage collection.

---

# 73. Multiple References

```java
Student a = new Student();
Student b = a;
Student c = b;
```

All three references point to the same object.

```text
a ─────┐
b ─────┼──► Student object
c ─────┘
```

Changing the object through one reference is visible through the others.

---

# 74. Example of Shared Reference

```java
Student a = new Student();
Student b = a;

a.name = "Aman";

System.out.println(b.name);
```

Output:

```text
Aman
```

Because `a` and `b` refer to the same object.

---

# 75. Assigning a New Object

```java
Student a = new Student();
Student b = a;

a = new Student();
```

Now:

```text
a ───► Student object B
b ───► Student object A
```

Changing `a` to refer to another object does not change `b`.

---

# 76. Objects Are Passed by Value

Java always passes arguments by value.

For an object parameter, the value being copied is the reference.

Example:

```java
static void changeName(Student student) {
    student.name = "Changed";
}
```

Call:

```java
Student s = new Student();
s.name = "Original";

changeName(s);

System.out.println(s.name);
```

Output:

```text
Changed
```

The method received a copy of the reference that points to the same object.

---

# 77. Reassigning the Parameter

```java
static void replace(Student student) {
    student = new Student();
    student.name = "New";
}
```

Caller:

```java
Student s = new Student();
s.name = "Original";

replace(s);

System.out.println(s.name);
```

Output:

```text
Original
```

Why?

The parameter was reassigned locally.

The caller's reference was not changed.

---

# 78. Class Fields vs Local Variables

Example:

```java
class Student {
    String name;
    int age;

    void show() {
        int marks = 90;
    }
}
```

Here:

```text
name
age
```

are fields.

```text
marks
```

is a local variable.

Fields receive default values.

Local variables must be definitely assigned before use.

---

# 79. Method Parameters

Example:

```java
void setName(String name) {
    ...
}
```

The parameter:

```text
name
```

is local to the method invocation.

It is not automatically an object field.

---

# 80. Naming Conflict

Consider:

```java
class Student {
    String name;

    void setName(String name) {
        name = name;
    }
}
```

This does not update the field.

Both `name` references in the assignment refer to the parameter.

Correct:

```java
class Student {
    String name;

    void setName(String name) {
        this.name = name;
    }
}
```

`this.name` refers to the field of the current object.

This is why `this` is so important.

---

# 81. `this` Preview

Inside:

```java
class Student {
    String name;

    void print() {
        System.out.println(this.name);
    }
}
```

`this` refers to the current Student object.

If:

```java
Student s1 = new Student();
s1.print();
```

then inside `print()`:

```text
this → s1
```

---

# 82. Class Members

A class can contain many kinds of members:

```text
fields
methods
constructors
nested types
```

Example:

```java
class Student {
    String name;

    Student() {
        // constructor
    }

    void study() {
        // method
    }
}
```

Constructors will be covered in Chapter 13.

---

# 83. Access Modifiers Preview

Java provides access control such as:

```text
public
private
protected
package-private
```

Example:

```java
class Student {
    private int marks;
}
```

`private` means the field is directly accessible only within the appropriate class.

Access modifiers and packages will be covered later.

---

# 84. Why `private` Matters

Without access control:

```java
account.balance = -999999;
```

could violate business rules.

With:

```java
private double balance;
```

you can force callers to use controlled methods.

This leads to encapsulation.

---

# 85. Object-Oriented Thinking

When given a programming problem, ask:

```text
What entities exist?
What information does each entity have?
What behavior does each entity need?
Which object should own each behavior?
How do objects communicate?
Which state should be protected?
```

This is the beginning of OOP design.

---

# 86. Example — Online Shopping

Problem:

> Build an online shopping system.

Possible classes:

```text
Customer
Product
Cart
Order
Payment
Address
```

Customer:

```text
name
email
address
```

Product:

```text
name
price
stock
```

Cart:

```text
items
addProduct()
removeProduct()
calculateTotal()
```

Order:

```text
orderId
items
status
placeOrder()
cancelOrder()
```

Payment:

```text
amount
status
pay()
```

The exact architecture depends on requirements.

---

# 87. Example — College System

Possible classes:

```text
Student
Teacher
Course
Department
Exam
Result
```

Student:

```text
name
rollNumber
courses
```

Teacher:

```text
name
employeeId
courses
```

Course:

```text
code
name
credits
```

Result:

```text
student
course
marks
grade
```

This is domain modeling.

---

# 88. Example — Banking System

Possible classes:

```text
Customer
BankAccount
Transaction
Bank
Loan
```

BankAccount:

```text
accountNumber
balance
owner

deposit()
withdraw()
```

Transaction:

```text
amount
type
timestamp
```

Customer:

```text
name
customerId
accounts
```

---

# 89. Example — Game

Possible classes:

```text
Player
Enemy
Weapon
Game
Level
Inventory
```

Player:

```text
health
score
position
```

Behavior:

```text
move()
attack()
takeDamage()
```

Enemy:

```text
health
position
```

Behavior:

```text
attack()
move()
```

This naturally leads toward inheritance and polymorphism.

---

# 90. Example — Ride Booking App

Possible classes:

```text
Rider
Driver
Vehicle
Ride
Payment
Location
```

Ride:

```text
pickup
destination
fare
status
```

Behavior:

```text
request()
cancel()
complete()
calculateFare()
```

Objects communicate:

```text
Rider → Ride
Ride → Driver
Ride → Payment
Ride → Location
```

---

# 91. OOP and Modularity

A good class can act as a module with a focused responsibility.

For example:

```java
class Invoice {
    ...
}
```

can encapsulate invoice-related behavior.

Other code can interact through a clear API.

This reduces the amount of knowledge each part of the program needs about other parts.

---

# 92. API of a Class

The public methods and accessible members of a class form part of its API.

Example:

```java
class BankAccount {
    public void deposit(double amount) {
        ...
    }

    public void withdraw(double amount) {
        ...
    }
}
```

A caller uses:

```java
account.deposit(500);
account.withdraw(200);
```

without needing to know every internal implementation detail.

---

# 93. Implementation vs Interface

Suppose:

```java
account.withdraw(500);
```

The caller cares about:

```text
withdraw money
```

The internal implementation might contain:

```text
validation
balance calculation
transaction creation
logging
notifications
```

This separation between what an object offers and how it implements it is fundamental to abstraction and encapsulation.

---

# 94. Good Object Design

A good object often has:

```text
clear responsibility
valid state
controlled access
cohesive behavior
simple public API
minimal unnecessary dependencies
```

You will study these ideas in much more detail later.

---

# 95. Cohesion Preview

Cohesion describes how closely related the responsibilities inside a module/class are.

High cohesion:

```text
Student class
→ student-related state and behavior
```

Low cohesion:

```text
Student class
→ student + database + email + payment + logging + UI
```

High cohesion is generally desirable.

---

# 96. Coupling Preview

Coupling describes how strongly one class depends on other classes.

High coupling:

```text
A depends heavily on B
B depends heavily on C
C depends heavily on A
```

This can make changes difficult.

Lower, well-managed coupling is generally desirable.

Chapter 23 will cover coupling and cohesion in detail.

---

# 97. Composition Preview

Instead of using inheritance for everything, objects can contain other objects.

Example:

```java
class Car {
    Engine engine;
}
```

This represents:

```text
Car HAS-A Engine
```

Composition and other OOP relationships will be covered in Chapter 22.

---

# 98. IS-A vs HAS-A Preview

Inheritance often represents:

```text
IS-A
```

Example:

```text
Dog IS-A Animal
```

Composition represents:

```text
HAS-A
```

Example:

```text
Car HAS-A Engine
```

Choosing the right relationship is important.

---

# 99. Why Composition Is Important

Beginners often try:

```text
inheritance everywhere
```

But many relationships are better modeled with composition.

For example:

```java
class Car {
    Engine engine;
}
```

is often more natural than trying to make:

```text
Car extends Engine
```

because a car is not an engine.

---

# 100. Object Collaboration Example

```java
class Engine {
    void start() {
        System.out.println("Engine started");
    }
}

class Car {
    Engine engine = new Engine();

    void start() {
        engine.start();
        System.out.println("Car started");
    }
}
```

Usage:

```java
Car car = new Car();

car.start();
```

Output:

```text
Engine started
Car started
```

This is a simple example of composition.

---

# 101. OOP Does Not Automatically Mean Better Code

OOP is a tool.

Bad OOP can create:

```text
too many classes
unnecessary inheritance
deep hierarchies
complex dependencies
boilerplate
```

Good OOP uses objects where they improve structure and maintainability.

---

# 102. Common Beginner Mistake — Class = Object

Wrong:

```text
class and object are the same
```

Correct:

```text
class → defines a type
object → instance of that type
```

---

# 103. Common Beginner Mistake — One Object per Class

A class can create:

```text
zero objects
one object
many objects
```

There is no rule that one class means one object.

---

# 104. Common Beginner Mistake — `new` Creates the Variable

Consider:

```java
Student s = new Student();
```

The variable:

```text
s
```

is declared as a reference variable.

The:

```java
new Student()
```

expression creates the object.

---

# 105. Common Beginner Mistake — Reference Is Object

This:

```java
Student s;
```

does not create a Student object.

It declares a reference variable.

Object creation:

```java
s = new Student();
```

---

# 106. Common Beginner Mistake — Fields Are Local Variables

Example:

```java
class Student {
    int age;
}
```

`age` is a field.

It receives a default value when the object is initialized.

But:

```java
void test() {
    int age;
}
```

is a local variable.

You cannot read it before definite assignment.

---

# 107. Common Beginner Mistake — Comparing Objects with `==`

Wrong when you want logical content equality:

```java
if (student1 == student2) {
}
```

This checks whether they are the same object.

For logical equality, a class may define:

```java
equals()
```

appropriately.

---

# 108. Common Beginner Mistake — Making Everything `static`

Beginners sometimes write:

```java
static String name;
static int age;
```

for every field.

This changes the meaning: those fields become class-level shared state rather than per-object state.

If each student needs a different name:

```java
String name;
```

should normally be an instance field.

---

# 109. Instance State vs Shared State

Instance field:

```java
class Student {
    String name;
}
```

Each object has its own `name`.

Static field:

```java
class Student {
    static int count;
}
```

The field belongs to the class and is shared across Student instances.

Static will be covered deeply in Chapter 14.

---

# 110. Example of Shared State

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

This is a simple example of class-level state.

---

# 111. OOP and Reusability

A class can be reused in many places.

Example:

```java
class Rectangle {
    double length;
    double width;

    double area() {
        return length * width;
    }
}
```

Now many parts of a program can create:

```java
Rectangle
```

objects.

---

# 112. OOP and Maintainability

Suppose the rule for calculating an order total changes.

If the calculation is centralized in an appropriate class:

```java
order.calculateTotal();
```

you have one clear place to update.

If the same calculation is duplicated in ten different functions, changes become harder and errors become more likely.

Good OOP can reduce such duplication.

---

# 113. OOP and Encapsulation

A class can keep implementation details private.

Example:

```java
class Counter {
    private int value;

    public void increment() {
        value++;
    }

    public int getValue() {
        return value;
    }
}
```

Caller:

```java
Counter counter = new Counter();

counter.increment();

System.out.println(counter.getValue());
```

The caller does not directly manipulate `value`.

---

# 114. Why Encapsulation Improves Safety

Suppose:

```java
private double balance;
```

Then you can enforce:

```text
amount > 0
balance sufficient
transaction rules
```

inside methods.

This prevents arbitrary external code from directly changing the field.

---

# 115. OOP and Abstraction

A class can expose a small API.

Example:

```java
printer.print(document);
```

The caller does not need to understand:

```text
buffer management
device communication
encoding
driver details
```

This is abstraction.

---

# 116. OOP and Polymorphism

Suppose:

```java
interface Payment {
    void pay();
}
```

Different classes:

```text
CardPayment
UPIPayment
CashPayment
```

can implement the same operation.

Then application code can work with:

```java
Payment
```

rather than hard-coding every implementation.

Interfaces will be covered in Chapter 21.

---

# 117. OOP and Inheritance

Inheritance can express a subtype relationship.

Example:

```java
class Animal {
    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking");
    }
}
```

A Dog is an Animal.

But inheritance should represent a genuine subtype relationship, not merely code reuse.

---

# 118. Code Reuse Is Not the Only Purpose of Inheritance

A common beginner explanation is:

```text
inheritance = code reuse
```

That is incomplete.

Inheritance primarily establishes a type relationship.

It can provide inherited behavior and support polymorphism.

If you only want to reuse implementation, composition may often be better.

---

# 119. OOP Pillars in One Example

Consider:

```java
class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}
```

Encapsulation:

```text
balance is private
```

Abstraction:

```text
caller uses deposit()
```

Inheritance and polymorphism could later allow specialized account types.

This shows how the ideas work together.

---

# 120. Class Design Exercise

Suppose you need a:

```text
Library Book
```

Ask:

```text
What state does it have?
What behavior does it have?
What should be public?
What should be private?
What other objects does it interact with?
```

Possible state:

```text
title
author
ISBN
available
```

Possible behavior:

```text
borrow()
returnBook()
```

---

# 121. Class Design Exercise — Bank Account

State:

```text
accountNumber
owner
balance
```

Behavior:

```text
deposit()
withdraw()
transfer()
```

Questions:

```text
Should balance be public?
Should a caller directly set balance?
Who validates withdrawal?
Who records a transaction?
```

These questions are the beginning of real OOP design.

---

# 122. Class Design Exercise — Shopping Cart

State:

```text
items
```

Behavior:

```text
addItem()
removeItem()
calculateTotal()
clear()
```

Questions:

```text
Should the cart expose its internal collection directly?
Should product prices be copied?
Who calculates discounts?
```

These become advanced design questions later.

---

# 123. Object Responsibility Example

Suppose:

```java
Order order;
```

and:

```java
PaymentService paymentService;
```

A possible design:

```java
paymentService.pay(order);
```

or:

```java
order.pay(paymentService);
```

Which is better depends on the domain and architecture.

OOP is not about one universal syntax pattern.

It is about assigning responsibilities sensibly.

---

# 124. Encapsulation Does Not Mean "Just Getters and Setters"

A common beginner definition is:

```text
encapsulation = private variables + getters/setters
```

That is too narrow.

Good encapsulation means controlling how state is represented and changed.

Sometimes exposing a setter for every field actually weakens the design.

For example:

```java
account.setBalance(-5000);
```

may be a bad API.

Instead:

```java
account.withdraw(500);
```

can enforce business rules.

---

# 125. OOP and Invariants

An invariant is a rule that should remain true for an object's valid state.

Example:

```text
Bank account balance cannot be negative
```

A good class design protects such invariants.

For example:

```java
private double balance;
```

and controlled methods can prevent invalid changes.

---

# 126. Object Construction Preview

When an object is created:

```java
Student student = new Student();
```

Java initializes the object and runs an appropriate constructor.

Constructors will be covered in Chapter 13.

---

# 127. Why Constructors Matter

A constructor lets you create objects in a valid initial state.

Instead of:

```java
Student s = new Student();

s.name = "Aman";
s.age = 20;
```

you can later design:

```java
Student s = new Student("Aman", 20);
```

This reduces the chance of forgetting required initialization.

---

# 128. OOP and Validation

Suppose:

```text
age must be >= 0
marks must be 0..100
price must not be negative
```

Good object design can place validation close to the data it protects.

This avoids spreading the same validation rules across many callers.

---

# 129. Example — Marks Validation Preview

```java
class Student {
    private int marks;

    void setMarks(int marks) {
        if (marks < 0 || marks > 100) {
            throw new IllegalArgumentException(
                "Marks must be between 0 and 100"
            );
        }

        this.marks = marks;
    }
}
```

This is a preview of encapsulation.

---

# 130. OOP and State Transitions

Objects often move between valid states.

Example:

```text
Order

CREATED
   ↓
PAID
   ↓
SHIPPED
   ↓
DELIVERED
```

The methods of the Order class can control allowed transitions.

This is more meaningful than simply exposing:

```java
order.status = "anything";
```

---

# 131. OOP and Domain Rules

A strong domain class can represent business rules.

Example:

```java
class Order {
    void cancel() {
        // check whether cancellation is allowed
        // change state
    }
}
```

The caller says:

```java
order.cancel();
```

rather than manipulating internal fields directly.

---

# 132. OOP and Testing

Well-designed classes are often easier to test because responsibilities are separated.

For example:

```java
Rectangle rectangle = new Rectangle(10, 5);

assert rectangle.area() == 50;
```

A focused class is easier to reason about than a huge class doing unrelated work.

---

# 133. OOP and Reusability Example

A reusable:

```java
Money
```

or:

```java
DateRange
```

class can be used across many parts of an application.

Good domain models can make code more expressive.

Instead of:

```java
double start;
double end;
```

you can have:

```java
DateRange range;
```

This can make intent clearer.

---

# 134. Object-Oriented Code Reads Like the Domain

Compare:

```java
calculateTotal(items, discounts, tax, shipping);
```

with a suitable domain API:

```java
order.calculateTotal();
```

The second can express intent more clearly if the Order object is truly responsible for the calculation.

Good OOP often improves the language of the code.

---

# 135. OOP Does Not Eliminate Functions

Methods are functions associated with classes.

Java programs still rely heavily on:

```text
methods
loops
conditions
arrays
Strings
```

OOP builds a structure around these programming fundamentals.

---

# 136. OOP and Static Utility Code

Not every operation requires an object.

For example:

```java
Math.max(10, 20);
```

is a class-level utility operation.

Good Java design uses both:

```text
instance methods
static methods
```

when appropriate.

---

# 137. Class-Level vs Object-Level Thinking

Ask:

```text
Does this behavior depend on one object's state?
```

If yes, it may be an instance method.

Ask:

```text
Does this behavior belong to the type as a whole and need no instance state?
```

A static method may be appropriate.

This is only a guideline; API design matters.

---

# 138. Object-Oriented Vocabulary

You should know these words:

```text
Class
Object
Instance
Field
Method
State
Behavior
Reference
Instance member
Static member
Constructor
Encapsulation
Inheritance
Polymorphism
Abstraction
Interface
Composition
Association
```

Later chapters will define each in depth.

---

# 139. Class

Definition:

> A class is a Java type that defines members such as fields, methods, constructors, and nested types and is used to create objects.

Example:

```java
class Car {
    String brand;
}
```

---

# 140. Object

Definition:

> An object is an instance of a class or another reference type that has identity and state/behavior appropriate to its type.

Example:

```java
Car car = new Car();
```

---

# 141. Instance

An instance is a particular object of a type.

Example:

```java
Car car = new Car();
```

`car` refers to one instance of `Car`.

---

# 142. Field

A field is a variable declared as a member of a class or interface.

Example:

```java
class Student {
    String name;
    int age;
}
```

Here:

```text
name
age
```

are fields.

---

# 143. Method

A method is a named block of executable behavior declared in a class, interface, enum, or record.

Example:

```java
void study() {
    System.out.println("Studying");
}
```

---

# 144. State

State is the information describing the current condition of an object.

Example:

```text
Student:
name = Aman
age = 20
marks = 90
```

---

# 145. Behavior

Behavior is what an object can do.

Example:

```text
study()
takeExam()
showResult()
```

---

# 146. Identity

Object identity means that two separate object instances can be distinguished even if their state happens to be equal.

Example:

```java
Student a = new Student();
Student b = new Student();
```

`a` and `b` identify different objects.

---

# 147. Reference

A reference is a value that can refer to an object.

Example:

```java
Student student = new Student();
```

The variable:

```text
student
```

contains a reference value.

---

# 148. Instance Member

A member associated with an object instance.

Example:

```java
class Student {
    String name;

    void study() {
    }
}
```

`name` and `study()` are instance members unless declared otherwise.

---

# 149. Static Member

A member declared with:

```java
static
```

belongs to the class rather than a particular object instance.

Example:

```java
class Student {
    static int count;
}
```

Detailed treatment comes in Chapter 14.

---

# 150. Real-World Modeling Checklist

When designing a class, ask:

```text
1. What is the entity/concept?
2. What data does it own?
3. What behavior does it own?
4. What rules must always be true?
5. Which fields should be hidden?
6. Which operations should be public?
7. Which objects does it collaborate with?
8. Is inheritance really needed?
9. Would composition be better?
10. Can the class have one clear responsibility?
```

This checklist is much more valuable than memorizing definitions.

---

# 151. Practical Program — Student Class

```java
class Student {
    String name;
    int age;
    int marks;

    void introduce() {
        System.out.println(
            "Name: " + name +
            ", Age: " + age
        );
    }

    void showMarks() {
        System.out.println(
            name + " scored " + marks
        );
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        student.name = "Aman";
        student.age = 20;
        student.marks = 90;

        student.introduce();
        student.showMarks();
    }
}
```

Output:

```text
Name: Aman, Age: 20
Aman scored 90
```

---

# 152. Practical Program — Multiple Students

```java
class Student {
    String name;
    int marks;

    void showResult() {
        System.out.println(
            name + " = " + marks
        );
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student();
        Student s3 = new Student();

        s1.name = "Aman";
        s1.marks = 90;

        s2.name = "Riya";
        s2.marks = 95;

        s3.name = "Raj";
        s3.marks = 82;

        s1.showResult();
        s2.showResult();
        s3.showResult();
    }
}
```

Output:

```text
Aman = 90
Riya = 95
Raj = 82
```

---

# 153. Practical Program — Bank Account

```java
class BankAccount {
    String owner;
    double balance;

    void deposit(double amount) {
        balance += amount;
    }

    void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Insufficient balance");
        }
    }

    void showBalance() {
        System.out.println(
            owner + "'s balance = " + balance
        );
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();

        account.owner = "Aman";
        account.balance = 1000;

        account.deposit(500);
        account.withdraw(300);

        account.showBalance();
    }
}
```

Output:

```text
Aman's balance = 1200.0
```

This is intentionally a basic version. Encapsulation will improve it later.

---

# 154. Practical Program — Rectangle

```java
class Rectangle {
    double length;
    double width;

    double area() {
        return length * width;
    }

    double perimeter() {
        return 2 * (length + width);
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rectangle = new Rectangle();

        rectangle.length = 10;
        rectangle.width = 5;

        System.out.println(
            "Area = " + rectangle.area()
        );

        System.out.println(
            "Perimeter = " + rectangle.perimeter()
        );
    }
}
```

Output:

```text
Area = 50.0
Perimeter = 30.0
```

---

# 155. Practical Program — Car

```java
class Car {
    String brand;
    int speed;

    void accelerate() {
        speed += 10;
    }

    void brake() {
        if (speed >= 10) {
            speed -= 10;
        }
    }

    void show() {
        System.out.println(
            brand + " speed = " + speed
        );
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();

        car.brand = "Toyota";

        car.accelerate();
        car.accelerate();
        car.brake();

        car.show();
    }
}
```

Output:

```text
Toyota speed = 10
```

---

# 156. Practical Program — Counter

```java
class Counter {
    int value;

    void increment() {
        value++;
    }

    void decrement() {
        value--;
    }

    void show() {
        System.out.println("Value = " + value);
    }
}

public class Main {
    public static void main(String[] args) {
        Counter counter = new Counter();

        counter.increment();
        counter.increment();
        counter.decrement();

        counter.show();
    }
}
```

Output:

```text
Value = 1
```

---

# 157. Practical Program — Object Communication

```java
class Printer {
    void print(String message) {
        System.out.println(message);
    }
}

class Report {
    void generate(Printer printer) {
        printer.print("Report generated.");
    }
}

public class Main {
    public static void main(String[] args) {
        Printer printer = new Printer();
        Report report = new Report();

        report.generate(printer);
    }
}
```

Output:

```text
Report generated.
```

The `Report` object collaborates with the `Printer` object.

---

# 158. Practical Program — Composition

```java
class Engine {
    void start() {
        System.out.println("Engine started");
    }
}

class Car {
    private final Engine engine = new Engine();

    void start() {
        engine.start();
        System.out.println("Car started");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();

        car.start();
    }
}
```

Output:

```text
Engine started
Car started
```

This demonstrates a simple HAS-A relationship.

---

# 159. Practical Program — Object Reference

```java
class Student {
    String name;
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student();
        Student b = a;

        a.name = "Aman";

        System.out.println(b.name);
    }
}
```

Output:

```text
Aman
```

Both references point to the same object.

---

# 160. Practical Program — Separate Objects

```java
class Student {
    String name;
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student();
        Student b = new Student();

        a.name = "Aman";
        b.name = "Riya";

        System.out.println(a.name);
        System.out.println(b.name);
    }
}
```

Output:

```text
Aman
Riya
```

They are separate objects.

---

# 161. Practical Program — Object as Method Argument

```java
class Student {
    String name;
}

public class Main {
    static void changeName(Student student) {
        student.name = "Changed";
    }

    public static void main(String[] args) {
        Student student = new Student();

        student.name = "Original";

        changeName(student);

        System.out.println(student.name);
    }
}
```

Output:

```text
Changed
```

The method received a copied reference value pointing to the same object.

---

# 162. Practice — Basic Class Creation

Create a:

```text
Book
```

class with:

```text
title
author
price
```

and methods:

```text
display()
applyDiscount()
```

Create at least two Book objects.

---

# 163. Practice — Mobile Phone

Create:

```text
MobilePhone
```

with:

```text
brand
model
price
battery
```

Methods:

```text
call()
charge()
showDetails()
```

Create two different objects.

---

# 164. Practice — Bank Account

Create:

```text
BankAccount
```

with:

```text
owner
accountNumber
balance
```

Methods:

```text
deposit()
withdraw()
showBalance()
```

Try to maintain valid balance rules.

You will improve this class using encapsulation in Chapter 15.

---

# 165. Practice — Employee

Create:

```text
Employee
```

with:

```text
name
employeeId
salary
department
```

Methods:

```text
work()
showDetails()
calculateAnnualSalary()
```

Create three employees.

---

# 166. Practice — Rectangle

Create:

```text
Rectangle
```

with:

```text
length
width
```

Methods:

```text
area()
perimeter()
isSquare()
```

---

# 167. Practice — Circle

Create:

```text
Circle
```

with:

```text
radius
```

Methods:

```text
area()
circumference()
diameter()
```

Use:

```java
Math.PI
```

---

# 168. Practice — Product

Create:

```text
Product
```

with:

```text
name
price
quantity
```

Methods:

```text
totalPrice()
display()
```

Create several Product objects.

---

# 169. Practice — Library Book

Create:

```text
Book
```

with:

```text
title
author
available
```

Methods:

```text
borrow()
returnBook()
showStatus()
```

Try to prevent borrowing an unavailable book.

---

# 170. Practice — Movie

Create:

```text
Movie
```

with:

```text
title
rating
duration
```

Methods:

```text
showDetails()
isHit()
```

Define your own rule for `isHit()`.

---

# 171. Practice — Temperature

Create:

```text
Temperature
```

with:

```text
celsius
```

Methods:

```text
toFahrenheit()
toKelvin()
```

---

# 172. Practice — Simple Counter

Create:

```text
Counter
```

with:

```text
value
```

Methods:

```text
increment()
decrement()
reset()
show()
```

Then create multiple Counter objects and observe that each has separate state.

---

# 173. Interview Questions

## Q1. What is OOP?

OOP is a programming paradigm that organizes software around objects and types, combining data and behavior and supporting concepts such as encapsulation, inheritance, polymorphism, and abstraction.

---

## Q2. What is a class?

A class is a Java type definition that describes the members and behavior of its instances.

---

## Q3. What is an object?

An object is an instance of a class or another reference type.

---

## Q4. Difference between class and object?

```text
Class → type/definition
Object → actual instance
```

---

## Q5. Can one class have multiple objects?

Yes.

A class can be instantiated many times.

---

## Q6. Is everything in Java an object?

No.

Java has both primitive types and reference types.

---

## Q7. What is state?

The current data/condition of an object.

---

## Q8. What is behavior?

Operations an object can perform, usually represented by methods.

---

## Q9. What is object identity?

The identity that distinguishes one object instance from another.

---

## Q10. What does `new` do?

It creates a new object/array instance and returns a reference to it.

---

## Q11. What is a reference variable?

A variable whose value can refer to an object.

---

## Q12. What happens with:

```java
Student s;
```

No Student object is created by that declaration.

It only declares a reference variable.

---

## Q13. What happens with:

```java
Student s = new Student();
```

A Student object is created and the reference returned by `new Student()` is assigned to `s`.

---

## Q14. What does `==` do for object references?

It checks whether two references identify the same object.

---

## Q15. How do two objects have the same state but different identity?

They can be separate instances with equal field values.

---

## Q16. What is encapsulation?

Encapsulation is the design practice of controlling access to an object's internal state and exposing appropriate operations.

---

## Q17. What is inheritance?

Inheritance allows a class to derive from another class and establishes a subtype relationship.

---

## Q18. What is polymorphism?

Polymorphism allows code to work through a common type while the actual object can provide different implementations, especially through overriding and interfaces.

---

## Q19. What is abstraction?

Abstraction focuses on exposing essential operations while hiding unnecessary implementation details.

---

## Q20. What are the four commonly taught OOP pillars?

```text
Encapsulation
Inheritance
Polymorphism
Abstraction
```

---

# 174. Interview Question — Is OOP the Same as Classes?

No.

Classes are a mechanism for defining types.

OOP also involves:

```text
object collaboration
encapsulation
abstraction
polymorphism
inheritance
composition
responsibility
design
```

---

# 175. Interview Question — Is Java Purely Object-Oriented?

No, not in the strict sense.

Java includes primitive types such as:

```java
int
double
boolean
char
```

alongside reference types and object-oriented features.

---

# 176. Interview Question — What Is an Instance?

A particular object created from a class/type.

Example:

```java
Student s = new Student();
```

`s` refers to an instance of `Student`.

---

# 177. Interview Question — What Is the Difference Between Object and Reference?

An object is the actual runtime entity.

A reference is a value that can identify/refer to that object.

Example:

```java
Student s = new Student();
```

Conceptually:

```text
s       → reference
new ... → object
```

---

# 178. Interview Question — Can Two References Point to One Object?

Yes.

```java
Student a = new Student();
Student b = a;
```

Both point to the same object.

---

# 179. Interview Question — Can One Reference Point to Different Objects Over Time?

Yes.

```java
Student s = new Student();

s = new Student();
```

The variable now refers to the second object.

---

# 180. Interview Question — What Is `null`?

`null` is a special reference value that means a reference currently does not identify an object.

It is not an object.

---

# 181. Interview Question — What Happens If You Call a Method on Null?

Example:

```java
Student s = null;

s.study();
```

This results in:

```text
NullPointerException
```

---

# 182. Interview Question — What Is Encapsulation Beyond Getters and Setters?

Encapsulation is about controlling representation and access and protecting object invariants.

It is not simply a requirement to generate a getter and setter for every field.

---

# 183. Interview Question — Why Is Composition Important?

Composition lets objects contain or collaborate with other objects.

It often models:

```text
HAS-A
```

relationships and can avoid unnecessary inheritance hierarchies.

---

# 184. Interview Question — Why Should Inheritance Not Be Used Everywhere?

Inheritance establishes a subtype relationship and introduces coupling between parent and child types.

If there is no genuine subtype relationship, composition is often more appropriate.

---

# 185. Interview Question — What Is High Cohesion?

A class has high cohesion when its responsibilities are strongly related and focused.

---

# 186. Interview Question — What Is Coupling?

Coupling describes the degree of dependency between components.

Generally, lower and well-managed coupling makes systems easier to change.

---

# 187. Output Questions

### Question 1

```java
class Student {
    String name;
}

Student s = new Student();

System.out.println(s.name);
```

Output:

```text
null
```

---

### Question 2

```java
class Student {
    int age;
}

Student s = new Student();

System.out.println(s.age);
```

Output:

```text
0
```

---

### Question 3

```java
class Student {
    String name;
}

Student a = new Student();
Student b = new Student();

a.name = "Aman";
b.name = "Riya";

System.out.println(a.name);
System.out.println(b.name);
```

Output:

```text
Aman
Riya
```

---

### Question 4

```java
class Student {
    String name;
}

Student a = new Student();
Student b = a;

a.name = "Aman";

System.out.println(b.name);
```

Output:

```text
Aman
```

---

### Question 5

```java
class Counter {
    int value;

    void increment() {
        value++;
    }
}

Counter a = new Counter();
Counter b = new Counter();

a.increment();
a.increment();
b.increment();

System.out.println(a.value);
System.out.println(b.value);
```

Output:

```text
2
1
```

Each object has separate instance state.

---

### Question 6

```java
class Student {
}

Student a = new Student();
Student b = new Student();

System.out.println(a == b);
```

Output:

```text
false
```

---

### Question 7

```java
class Student {
}

Student a = new Student();
Student b = a;

System.out.println(a == b);
```

Output:

```text
true
```

---

### Question 8

```java
class Student {
    String name;
}

static void change(Student s) {
    s.name = "Changed";
}
```

If:

```java
Student student = new Student();
student.name = "Original";

change(student);

System.out.println(student.name);
```

Output:

```text
Changed
```

---

### Question 9

```java
class Student {
    String name;
}

static void replace(Student s) {
    s = new Student();
    s.name = "New";
}
```

If:

```java
Student student = new Student();
student.name = "Original";

replace(student);

System.out.println(student.name);
```

Output:

```text
Original
```

---

### Question 10

```java
class Student {
    String name = "Unknown";
}
```

Then:

```java
Student s = new Student();

System.out.println(s.name);
```

Output:

```text
Unknown
```

The field initializer provides the initial value.

---

# 188. Conceptual Questions to Test Yourself

Answer these without looking back:

```text
1. What is the difference between class and object?

2. What is the difference between object and reference?

3. What is object state?

4. What is object behavior?

5. Why do we use classes?

6. Why can one class create many objects?

7. What does new do?

8. What happens when a reference is assigned to another reference?

9. Why does == not normally compare object content?

10. Why is encapsulation useful?

11. What is composition?

12. What does IS-A mean?

13. What does HAS-A mean?

14. Why is inheritance not simply code reuse?

15. Why is good OOP about responsibilities?
```

---

# 189. Design Exercise — Identify Objects

For an:

```text
Online Food Delivery App
```

identify at least:

```text
5 classes
```

Possible answers:

```text
Customer
Restaurant
FoodItem
Order
DeliveryPartner
Payment
Address
```

Then identify:

```text
state
behavior
relationships
```

for each.

---

# 190. Design Exercise — Identify State and Behavior

For:

```text
Car
```

identify:

```text
State:
?

Behavior:
?
```

Possible answer:

```text
State:
brand
speed
fuel

Behavior:
accelerate
brake
refuel
```

---

# 191. Design Exercise — Find Bad Responsibility

Consider:

```java
class Student {
    String name;

    void calculateTax() {
    }

    void sendEmail() {
    }

    void saveToDatabase() {
    }

    void study() {
    }
}
```

Question:

> Is this good class design?

Probably not.

Why?

Because the class has unrelated responsibilities.

A better design may separate:

```text
Student
TaxService
EmailService
StudentRepository
```

The exact architecture depends on the application.

---

# 192. Design Exercise — Composition or Inheritance?

Decide whether each relationship is more naturally:

```text
IS-A
```

or:

```text
HAS-A
```

Examples:

```text
Dog / Animal
Car / Engine
Student / Address
Manager / Employee
House / Room
Laptop / Battery
```

Possible answers:

```text
Dog IS-A Animal
Manager IS-A Employee
Car HAS-A Engine
Student HAS-A Address
House HAS-A Room
Laptop HAS-A Battery
```

The exact modeling can depend on the domain.

---

# 193. Design Exercise — Build a Simple Library

Create:

```text
Book
Member
Library
```

Book:

```text
title
author
available
```

Member:

```text
name
memberId
```

Library:

```text
books
members
```

Operations:

```text
addBook()
registerMember()
borrowBook()
returnBook()
```

Do not worry about advanced collections yet.

You can initially use arrays if necessary.

---

# 194. Mini Project — Student Management

Build a small program with:

```text
Student
```

Fields:

```text
name
rollNumber
marks
```

Methods:

```text
showDetails()
calculateGrade()
isPassed()
```

Create at least five Student objects.

Later, improve this project using:

```text
constructors
encapsulation
arrays/collections
inheritance
interfaces
```

---

# 195. Mini Project — Bank Account System

Create:

```text
BankAccount
```

Support:

```text
deposit
withdraw
balance display
```

Create multiple accounts.

Then add:

```text
account number
transaction history
transfer
```

In later chapters, improve it with encapsulation and OOP relationships.

---

# 196. Mini Project — Library System

Create:

```text
Book
Member
Library
```

Support:

```text
add book
show books
borrow book
return book
```

Use objects to represent each entity.

---

# 197. Mini Project — Shopping Cart

Create:

```text
Product
Cart
```

Product:

```text
name
price
```

Cart:

```text
products
addProduct()
removeProduct()
calculateTotal()
```

Later you can add:

```text
discount
tax
payment
order
```

---

# 198. Mini Project — Simple Game

Create:

```text
Player
Enemy
```

Player:

```text
name
health
score
```

Methods:

```text
attack()
takeDamage()
```

Enemy:

```text
name
health
damage
```

Methods:

```text
attack()
```

This project will become much more interesting after inheritance and polymorphism.

---

# 199. OOP Learning Path

You are now at:

```text
Chapter 11
OOP Fundamentals
```

Next:

```text
Chapter 12
Classes & Objects
```

Then:

```text
Chapter 13
Constructors
```

Then:

```text
Chapter 14
this & static
```

Then:

```text
Chapter 15
Encapsulation
```

Then:

```text
Chapter 16
Inheritance
```

Then:

```text
Chapter 17
Method Overloading
```

Then:

```text
Chapter 18
Method Overriding
```

Then:

```text
Chapter 19
Polymorphism
```

Then:

```text
Chapter 20
Abstraction
```

Then:

```text
Chapter 21
Interfaces
```

Then:

```text
Chapter 22
OOP Relationships
```

Then:

```text
Chapter 23
OOP Design
```

This sequence is intentionally designed to build the concepts step by step.

---

# 200. Final OOP Mental Model

Keep this model in your mind:

```text
                    CLASS
                      │
             defines a type
                      │
                      ▼
                   OBJECT
                      │
             ┌────────┴────────┐
             ↓                 ↓
           STATE            BEHAVIOR
             │                 │
           fields           methods
             │                 │
             └────────┬────────┘
                      ↓
                OBJECT COLLABORATION
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
   Encapsulation  Abstraction  Polymorphism
                      │
                 Inheritance
                      │
                 Interfaces
                      │
                OOP Design
```

---

# 201. Final Summary

In this chapter you learned:

```text
✓ What OOP means
✓ Why OOP is useful
✓ Procedural programming
✓ Procedural vs OOP
✓ Class
✓ Object
✓ Instance
✓ State
✓ Behavior
✓ Object identity
✓ Object references
✓ new keyword
✓ Fields
✓ Methods
✓ Instance members
✓ Static members preview
✓ Reference types
✓ Primitive types
✓ Multiple objects
✓ Shared references
✓ Separate objects
✓ null references
✓ Default field values
✓ Field initializers
✓ Object lifecycle basics
✓ Object communication
✓ Responsibilities
✓ Encapsulation preview
✓ Abstraction preview
✓ Inheritance preview
✓ Polymorphism preview
✓ Composition preview
✓ IS-A
✓ HAS-A
✓ Cohesion preview
✓ Coupling preview
✓ Object-oriented modeling
✓ Real-world modeling examples
✓ Class design
✓ OOP mistakes
✓ Practical programs
✓ Design exercises
✓ Mini projects
✓ Interview questions
✓ Output questions
```

---

# 202. The Most Important Ideas to Remember

If you remember only the most important points from this chapter, remember these:

```text
1. A class defines a type.

2. An object is an instance.

3. One class can create many objects.

4. Objects have state and behavior.

5. Fields represent state.

6. Methods represent behavior.

7. A reference points to an object.

8. new creates an object.

9. Two references can point to the same object.

10. Two separate objects can have identical state.

11. == checks reference identity for objects.

12. Java has both primitive and reference types.

13. Good OOP assigns responsibilities to appropriate objects.

14. Encapsulation protects and controls state.

15. Abstraction hides unnecessary implementation details.

16. Inheritance creates a subtype relationship.

17. Polymorphism lets common types work with different implementations.

18. Composition models HAS-A relationships.

19. Inheritance should not be used just because it can reuse code.

20. Good OOP is about designing understandable, maintainable object collaborations.
```

---

# 203. Next Chapter

You now understand the basic idea behind OOP.

The next step is to go deeper into the two most fundamental building blocks:

```text
CLASSES
   +
OBJECTS
```

# Chapter 12 — Classes & Objects

You will study:

```text
Creating classes
Creating objects
Fields
Methods
Object references
Multiple objects
Instance state
Object identity
Memory/reference understanding
Object arrays
Objects inside objects
Object method calls
Passing objects to methods
Returning objects
Object equality
Object lifecycle
Common object mistakes
Practical OOP programs
```

After that, Chapter 13 will make object creation much more powerful using constructors.
