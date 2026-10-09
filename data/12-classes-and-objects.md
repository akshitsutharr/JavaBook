# Chapter 12 — Classes & Objects in Java

> **Java Master Course — Chapter 12 of 50**
>
> This chapter goes deeper into the two most important building blocks of Java OOP:
>
> **Classes and Objects**
>
> Chapter 11 introduced the basic OOP idea. Here we will understand exactly how classes are written, how objects are created, how fields and methods work, how references work, how multiple objects maintain separate state, and how objects interact with methods.
>
> Constructors, `this`, `static`, inheritance, polymorphism, and encapsulation are covered in later chapters.

---

# 1. What You Will Learn

By the end of this chapter, you should understand:

```text
✓ Class syntax
✓ Object creation
✓ new keyword
✓ Fields
✓ Instance fields
✓ Methods inside classes
✓ Object references
✓ Object identity
✓ Multiple objects
✓ Separate object state
✓ Shared references
✓ null references
✓ Field initialization
✓ Default field values
✓ Instance methods
✓ Method calls through objects
✓ Object parameters
✓ Returning objects
✓ Arrays of objects
✓ Objects containing objects
✓ Basic memory/reference model
✓ Object lifecycle basics
✓ Object equality basics
✓ Common object mistakes
✓ Practical OOP programs
✓ Exercises
✓ Interview questions
```

---

# 2. Quick Recap of Chapter 11

OOP organizes software around objects.

An object can have:

```text
state
+
behavior
```

State is usually represented using fields.

Behavior is usually represented using methods.

A class defines a type that can be used to create objects.

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

Object creation:

```java
Student student = new Student();
```

---

# 3. Class vs Object

Remember this distinction:

```text
CLASS
↓
definition/type

OBJECT
↓
instance
```

Example:

```java
class Car {
    String brand;
}
```

`Car` is the class/type.

Then:

```java
Car car = new Car();
```

creates an object.

---

# 4. What Is a Class?

A class is a Java type definition.

A class can contain members such as:

```text
fields
methods
constructors
nested classes/interfaces/enums
```

Example:

```java
class Student {
    String name;
    int age;

    void study() {
        System.out.println("Studying");
    }
}
```

---

# 5. Class as a Blueprint

A common analogy is:

```text
class = blueprint
object = actual thing made using the blueprint
```

For example:

```text
Car class
     ↓
 ┌───┼────┐
 ↓   ↓    ↓
Car1 Car2 Car3
```

The class describes the common structure.

Each object has its own instance state.

---

# 6. Class Is More Than a Blueprint

The blueprint analogy is useful, but incomplete.

A class is also:

```text
a type
```

When you write:

```java
class Student {
}
```

you create a new reference type:

```text
Student
```

Now Java can declare:

```java
Student s;
```

---

# 7. Basic Class Syntax

```java
class ClassName {

    // fields

    // methods

}
```

Example:

```java
class Student {
    String name;
    int age;

    void study() {
        System.out.println("Studying");
    }
}
```

---

# 8. Class Naming Convention

Java convention uses:

```text
PascalCase
```

for class names.

Good:

```java
Student
BankAccount
Car
Employee
ShoppingCart
```

Avoid:

```java
student
bankaccount
my_class
```

unless there is a specific reason.

---

# 9. Fields

A field is a variable declared as a member of a class.

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

# 10. Instance Fields

If a field is not declared `static`, it is normally an instance field.

Example:

```java
class Student {
    String name;
    int age;
}
```

Every Student object has its own instance state for:

```text
name
age
```

---

# 11. Creating an Object

Use:

```java
new
```

Example:

```java
Student student = new Student();
```

This statement has multiple parts.

```text
Student
   ↓
reference type

student
   ↓
reference variable

new Student()
   ↓
creates Student object
```

---

# 12. Breaking Down Object Creation

Consider:

```java
Student student = new Student();
```

Left side:

```java
Student student
```

declares a variable named `student` that can hold a reference to a Student object.

Right side:

```java
new Student()
```

creates a new Student object.

The resulting reference is assigned to:

```java
student
```

---

# 13. Does Declaration Create an Object?

No.

This:

```java
Student student;
```

only declares a reference variable.

It does not create a Student object.

---

# 14. Object Creation

This creates an object:

```java
Student student = new Student();
```

Or in two steps:

```java
Student student;

student = new Student();
```

---

# 15. Object Creation with `new`

General form:

```java
Type reference = new Type();
```

Examples:

```java
Car car = new Car();

Book book = new Book();

Employee employee = new Employee();

BankAccount account = new BankAccount();
```

---

# 16. The `new` Keyword

`new` is used to create new instances of classes, arrays, and other applicable reference types.

Example:

```java
Student s = new Student();
```

The expression:

```java
new Student()
```

creates an object and produces a reference to it.

---

# 17. Object Reference

The variable:

```java
student
```

does not contain the entire Student object in the normal conceptual model.

It contains a reference value that identifies the object.

Think:

```text
student ───────► Student object
```

This distinction is extremely important.

---

# 18. Reference Diagram

Code:

```java
Student student = new Student();
```

Conceptually:

```text
student
   │
   ▼
┌──────────────┐
│ Student      │
│ name = null  │
│ age = 0      │
└──────────────┘
```

The exact JVM memory implementation is more complex, but this reference model is useful for learning.

---

# 19. Object Memory — Important Note

You may hear:

```text
objects are always on heap
variables are always on stack
```

This is an oversimplification.

The Java language specification does not define the JVM memory model using such a simplistic universal rule.

For learning, it is useful to think:

```text
reference variable
      ↓
reference
      ↓
object
```

and later study actual JVM memory behavior separately.

---

# 20. Instance State

Example:

```java
class Student {
    String name;
    int age;
}
```

Object:

```java
Student s = new Student();
```

Initially, the fields have their default values:

```text
name → null
age  → 0
```

Then:

```java
s.name = "Aman";
s.age = 20;
```

The object's state becomes:

```text
name = Aman
age = 20
```

---

# 21. Reading Fields

Use the dot operator:

```java
.
```

Example:

```java
System.out.println(s.name);
System.out.println(s.age);
```

---

# 22. Updating Fields

Example:

```java
s.name = "Riya";
s.age = 21;
```

This changes the state of the object referenced by `s`.

---

# 23. Field Access Syntax

General form:

```java
reference.field
```

Examples:

```java
student.name

student.age

car.speed

account.balance
```

Access is subject to Java's access-control rules.

---

# 24. Methods Inside a Class

Example:

```java
class Student {
    String name;

    void study() {
        System.out.println(name + " is studying.");
    }
}
```

The method:

```java
study()
```

is defined inside the Student class.

---

# 25. Calling an Instance Method

Create an object:

```java
Student student = new Student();
```

Set state:

```java
student.name = "Aman";
```

Call method:

```java
student.study();
```

Output:

```text
Aman is studying.
```

---

# 26. Instance Method Concept

An instance method can operate on the particular object through which it is invoked.

Example:

```java
class Car {
    int speed;

    void accelerate() {
        speed += 10;
    }
}
```

Usage:

```java
Car car = new Car();

car.accelerate();
```

The method changes that Car object's state.

---

# 27. Multiple Objects

One class can create many objects.

Example:

```java
Student s1 = new Student();
Student s2 = new Student();
Student s3 = new Student();
```

Conceptually:

```text
s1 ───► Student object 1

s2 ───► Student object 2

s3 ───► Student object 3
```

---

# 28. Separate State

Suppose:

```java
class Student {
    String name;
}
```

Then:

```java
Student s1 = new Student();
Student s2 = new Student();

s1.name = "Aman";
s2.name = "Riya";
```

Output:

```java
System.out.println(s1.name);
System.out.println(s2.name);
```

```text
Aman
Riya
```

Each object has its own `name` field.

---

# 29. Object State Is Independent

If:

```java
s1.name = "Changed";
```

it does not normally change:

```java
s2.name
```

because `s1` and `s2` refer to separate objects.

---

# 30. Multiple Object Diagram

```text
s1 ───► ┌────────────────┐
        │ Student        │
        │ name = Aman    │
        └────────────────┘

s2 ───► ┌────────────────┐
        │ Student        │
        │ name = Riya    │
        └────────────────┘
```

One class.

Two objects.

Separate instance state.

---

# 31. Object Identity

Object identity means that one object instance is distinguishable from another.

Example:

```java
Student s1 = new Student();
Student s2 = new Student();
```

Even if:

```java
s1.name = "Aman";
s2.name = "Aman";
```

they are still two separate object instances.

---

# 32. Same State Does Not Mean Same Object

Example:

```text
Object A:
name = Aman
age = 20

Object B:
name = Aman
age = 20
```

They may have identical state.

But they are still different objects.

---

# 33. Reference Equality with `==`

For reference values:

```java
s1 == s2
```

checks whether both references identify the same object.

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

# 34. Same Reference

Example:

```java
Student s1 = new Student();
Student s2 = s1;
```

Now:

```java
s1 == s2
```

is:

```text
true
```

because both references identify the same object.

---

# 35. Shared Reference Diagram

```text
s1 ─────┐
        │
        ▼
   ┌──────────────┐
   │ Student      │
   │ name = null  │
   └──────────────┘
        ▲
        │
s2 ─────┘
```

One object.

Two references.

---

# 36. Changing Through One Reference

```java
class Student {
    String name;
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = s1;

        s1.name = "Aman";

        System.out.println(s2.name);
    }
}
```

Output:

```text
Aman
```

Why?

Because `s1` and `s2` refer to the same object.

---

# 37. Reassigning One Reference

Consider:

```java
Student s1 = new Student();
Student s2 = s1;

s1 = new Student();
```

Now:

```text
s1 ───► Object B

s2 ───► Object A
```

Changing what `s1` refers to does not change `s2`.

---

# 38. `null` Reference

A reference can contain:

```java
null
```

Example:

```java
Student student = null;
```

This means:

```text
student currently refers to no object
```

---

# 39. Null Diagram

```text
student
   │
   ▼
 null
```

There is no Student object at the end of the reference.

---

# 40. NullPointerException

Example:

```java
Student student = null;

System.out.println(student.name);
```

This causes:

```text
NullPointerException
```

because Java cannot access an instance field through a null reference.

---

# 41. Fixing Null Reference

Create an object:

```java
Student student = new Student();

System.out.println(student.name);
```

Now the reference identifies a Student object.

---

# 42. Null Check

You can check:

```java
if (student != null) {
    System.out.println(student.name);
}
```

This avoids dereferencing the reference when it is null.

---

# 43. Fields Have Default Values

Example:

```java
class Student {
    String name;
    int age;
    double marks;
    boolean active;
    char grade;
}
```

For a newly initialized object, fields get default values according to their types.

Conceptually:

```text
name   → null
age    → 0
marks  → 0.0
active → false
grade  → '\u0000'
```

---

# 44. Reference Field Default

Example:

```java
class Student {
    String name;
}
```

After:

```java
Student s = new Student();
```

the `name` field is initially:

```text
null
```

unless another initialization supplies a different value.

---

# 45. Primitive Field Defaults

Common defaults:

```text
byte    → 0
short   → 0
int     → 0
long    → 0L
float   → 0.0f
double  → 0.0d
char    → '\u0000'
boolean → false
```

---

# 46. Field Initializers

You can give fields initial values.

Example:

```java
class Student {
    String name = "Unknown";
    int age = 18;
}
```

Then:

```java
Student s = new Student();
```

starts with:

```text
name = Unknown
age = 18
```

---

# 47. Multiple Object Initialization

Each object gets its own instance field values.

```java
class Counter {
    int value = 10;
}
```

Then:

```java
Counter a = new Counter();
Counter b = new Counter();

a.value = 50;
```

Now:

```text
a.value = 50
b.value = 10
```

---

# 48. Instance Field vs Local Variable

Example:

```java
class Student {
    int age;

    void show() {
        int marks;
    }
}
```

Here:

```text
age
```

is an instance field.

```text
marks
```

is a local variable.

Fields get default values.

Local variables do not automatically get usable default values.

---

# 49. Local Variable Example

This is invalid:

```java
void test() {
    int x;

    System.out.println(x);
}
```

Java reports that `x` might not have been initialized.

Correct:

```java
void test() {
    int x = 10;

    System.out.println(x);
}
```

---

# 50. Field Access from an Instance Method

Example:

```java
class Student {
    String name;
    int marks;

    void show() {
        System.out.println(name);
        System.out.println(marks);
    }
}
```

Inside an instance method, you can directly access instance fields of the current object.

---

# 51. Using `this` Explicitly

The same code can be written:

```java
class Student {
    String name;
    int marks;

    void show() {
        System.out.println(this.name);
        System.out.println(this.marks);
    }
}
```

`this` refers to the current object.

Detailed `this` usage is covered in Chapter 14.

---

# 52. Method Call and Current Object

Suppose:

```java
Student s1 = new Student();
Student s2 = new Student();

s1.show();
s2.show();
```

The method is the same method defined in the class.

But each invocation operates in the context of the object used for the call.

Conceptually:

```text
s1.show()
→ this refers to s1

s2.show()
→ this refers to s2
```

---

# 53. Object Methods Can Return Values

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

Usage:

```java
Rectangle r = new Rectangle();

r.length = 10;
r.width = 5;

double result = r.area();

System.out.println(result);
```

Output:

```text
50.0
```

---

# 54. Object Methods Can Accept Parameters

Example:

```java
class Calculator {
    int add(int a, int b) {
        return a + b;
    }
}
```

Usage:

```java
Calculator calculator = new Calculator();

System.out.println(calculator.add(10, 20));
```

Output:

```text
30
```

---

# 55. Methods Can Modify Object State

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

---

# 56. State-Changing Method

A method that changes object state is often called a mutating method.

Example:

```java
void increment() {
    value++;
}
```

The object's state changes.

---

# 57. Non-Mutating Method

A method can simply calculate or read information.

Example:

```java
double area() {
    return length * width;
}
```

This method does not need to modify the rectangle's fields.

---

# 58. Method Parameters That Are Objects

A method can accept an object reference.

Example:

```java
class Student {
    String name;
}

class Printer {
    void print(Student student) {
        System.out.println(student.name);
    }
}
```

Usage:

```java
Student student = new Student();
student.name = "Aman";

Printer printer = new Printer();

printer.print(student);
```

Output:

```text
Aman
```

---

# 59. Object Arguments Are Passed by Value

Java is always pass-by-value.

For an object parameter, the copied value is the reference.

Example:

```java
static void changeName(Student student) {
    student.name = "Riya";
}
```

Calling:

```java
Student s = new Student();
s.name = "Aman";

changeName(s);
```

allows the method to modify the same object.

---

# 60. Why Does Object Modification Work?

Conceptually:

```text
caller reference
      │
      ▼
   Object A

method parameter
      │
      ▼
   same Object A
```

The reference value is copied.

Both references identify the same object.

---

# 61. Parameter Reassignment Is Different

Example:

```java
static void replace(Student student) {
    student = new Student();
}
```

This changes the local parameter reference.

It does not make the caller's reference point to the new object.

---

# 62. Example of Parameter Reassignment

```java
class Student {
    String name;
}

public class Main {
    static void replace(Student student) {
        student = new Student();
        student.name = "Riya";
    }

    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Aman";

        replace(s);

        System.out.println(s.name);
    }
}
```

Output:

```text
Aman
```

---

# 63. Returning an Object

A method can return a reference to an object.

Example:

```java
class Student {
    String name;
}

class StudentFactory {
    static Student createStudent() {
        Student student = new Student();
        student.name = "Aman";
        return student;
    }
}
```

Usage:

```java
Student s = StudentFactory.createStudent();

System.out.println(s.name);
```

Output:

```text
Aman
```

---

# 64. Object Factory Idea

A factory method is a method that creates and returns an object.

Example:

```java
static Student createStudent(String name) {
    Student student = new Student();
    student.name = name;
    return student;
}
```

Usage:

```java
Student a = createStudent("Aman");
Student b = createStudent("Riya");
```

Constructors will provide a better initialization mechanism later.

---

# 65. Returning `null`

A method returning a reference type can return `null`.

Example:

```java
static Student findStudent() {
    return null;
}
```

Caller:

```java
Student student = findStudent();
```

The caller must handle the possibility of null when appropriate.

---

# 66. Objects Inside Objects

A class can have another object as a field.

Example:

```java
class Address {
    String city;
}

class Student {
    String name;
    Address address;
}
```

Now:

```text
Student HAS-A Address
```

---

# 67. Creating Nested Object State

```java
Student student = new Student();

student.name = "Aman";

student.address = new Address();

student.address.city = "Mumbai";
```

Conceptually:

```text
student
   │
   ▼
Student object
   │
   ├── name = Aman
   │
   └── address ───► Address object
                       │
                       └── city = Mumbai
```

---

# 68. Why Object Composition Matters

Large applications are built by combining smaller objects.

Examples:

```text
Car → Engine
Student → Address
Order → Customer
Order → Product
Computer → Processor
```

This is called composition or object collaboration depending on the exact relationship.

Detailed OOP relationships are covered in Chapter 22.

---

# 69. Null Object Field

Consider:

```java
class Student {
    Address address;
}
```

A newly created Student has:

```text
address = null
```

until an Address object is assigned.

So:

```java
student.address.city
```

can fail if `student.address` is null.

---

# 70. Safe Initialization

You can initialize the field:

```java
class Student {
    Address address = new Address();
}
```

or initialize it through a constructor later.

The correct design depends on whether every Student should always have an Address object.

---

# 71. Arrays of Objects

Arrays can store references to objects.

Example:

```java
Student[] students = new Student[3];
```

Important:

```text
This creates the array.
It does not create three Student objects.
```

---

# 72. Object Array Initialization

You must create each object:

```java
Student[] students = new Student[3];

students[0] = new Student();
students[1] = new Student();
students[2] = new Student();
```

Now all three elements refer to Student objects.

---

# 73. Object Array Diagram

```text
students
   │
   ▼
┌──────┬──────┬──────┐
│  0   │  1   │  2   │
└──┬───┴──┬───┴──┬───┘
   │      │      │
   ▼      ▼      ▼
Student Student Student
```

---

# 74. Object Array Contains References

This:

```java
Student[] students = new Student[3];
```

creates an array whose elements initially contain:

```text
null
null
null
```

It does not create:

```text
Student
Student
Student
```

objects automatically.

---

# 75. Accessing Object Array

```java
students[0].name = "Aman";
students[1].name = "Riya";
students[2].name = "Raj";
```

Then:

```java
System.out.println(students[1].name);
```

Output:

```text
Riya
```

---

# 76. Common Object Array Error

This is dangerous:

```java
Student[] students = new Student[3];

students[0].name = "Aman";
```

The array element:

```java
students[0]
```

is still null.

Therefore accessing:

```java
students[0].name
```

causes:

```text
NullPointerException
```

---

# 77. Correct Object Array Code

```java
Student[] students = new Student[3];

for (int i = 0; i < students.length; i++) {
    students[i] = new Student();
}
```

Then:

```java
students[0].name = "Aman";
```

is valid.

---

# 78. Passing Object Arrays to Methods

Example:

```java
static void printStudents(Student[] students) {
    for (Student student : students) {
        System.out.println(student.name);
    }
}
```

Usage:

```java
printStudents(students);
```

The array reference is passed by value.

The method can access the same array object.

---

# 79. Returning an Object Array

Example:

```java
static Student[] createStudents() {
    Student[] students = new Student[2];

    students[0] = new Student();
    students[1] = new Student();

    students[0].name = "Aman";
    students[1].name = "Riya";

    return students;
}
```

Usage:

```java
Student[] students = createStudents();
```

---

# 80. Objects and Arrays Together

A real application may contain:

```text
Array
  ↓
references
  ↓
objects
  ↓
fields
  ↓
other objects
```

For example:

```text
Student[]
   ↓
Student
   ↓
Address
```

This is how complex object graphs are formed.

---

# 81. Object Graph

An object graph is a network of objects connected through references.

Example:

```text
Customer
   │
   ├── Address
   │
   └── Order
          │
          ├── Product
          └── Product
```

This is a useful way to visualize real applications.

---

# 82. Reference Chains

Consider:

```java
order.customer.address.city
```

There are multiple references:

```text
order
  ↓
customer
  ↓
address
  ↓
city
```

Any intermediate reference can potentially be null.

---

# 83. Avoiding Long Null Chains

Instead of exposing a deeply nested structure everywhere, good class design can provide appropriate methods.

For example:

```java
order.getCustomerCity()
```

or another well-designed API.

This is not a strict rule; the design depends on the domain.

---

# 84. Object State and Mutable Fields

Suppose:

```java
class Account {
    double balance;
}
```

Then:

```java
account.balance = 1000;
account.balance = 500;
```

changes the object's state.

This object is mutable because its state can change.

---

# 85. Mutable Object Example

```java
class Counter {
    int value;

    void increment() {
        value++;
    }
}
```

Every call:

```java
counter.increment();
```

changes the object.

---

# 86. Immutable Object Preview

An immutable object does not expose operations that change its state after creation.

Java's:

```java
String
```

is an important example.

Immutable object design will be discussed later.

---

# 87. Instance Method vs Static Method

Instance method:

```java
class Student {
    String name;

    void showName() {
        System.out.println(name);
    }
}
```

Call:

```java
Student s = new Student();

s.showName();
```

Static method:

```java
class MathUtil {
    static int add(int a, int b) {
        return a + b;
    }
}
```

Call:

```java
MathUtil.add(10, 20);
```

Static behavior is covered deeply in Chapter 14.

---

# 88. Why Instance Methods Need an Object

Consider:

```java
class Student {
    String name;

    void showName() {
        System.out.println(name);
    }
}
```

Which `name` should the method print?

It depends on the object:

```java
s1.showName();
s2.showName();
```

Each call has a different current object.

---

# 89. Object as Context

Think of:

```java
s1.showName();
```

as:

```text
run showName()
for object s1
```

and:

```java
s2.showName();
```

as:

```text
run showName()
for object s2
```

This is the key idea behind instance methods.

---

# 90. Class with Multiple Fields and Methods

Example:

```java
class Employee {
    String name;
    double salary;

    void work() {
        System.out.println(name + " is working.");
    }

    double annualSalary() {
        return salary * 12;
    }

    void showDetails() {
        System.out.println("Name: " + name);
        System.out.println("Salary: " + salary);
    }
}
```

---

# 91. Using Employee Objects

```java
Employee e1 = new Employee();

e1.name = "Aman";
e1.salary = 50000;

e1.work();

System.out.println(e1.annualSalary());

e1.showDetails();
```

Output:

```text
Aman is working.
600000.0
Name: Aman
Salary: 50000.0
```

---

# 92. Multiple Employee Objects

```java
Employee e1 = new Employee();
Employee e2 = new Employee();

e1.name = "Aman";
e1.salary = 50000;

e2.name = "Riya";
e2.salary = 60000;
```

Now:

```text
e1 → Aman, 50000
e2 → Riya, 60000
```

---

# 93. Object Method Can Call Another Method

Example:

```java
class Student {
    String name;
    int marks;

    boolean isPassed() {
        return marks >= 40;
    }

    void showResult() {
        System.out.println(
            name + " passed: " + isPassed()
        );
    }
}
```

The method:

```java
showResult()
```

calls:

```java
isPassed()
```

on the same current object.

---

# 94. Object Methods Can Call Other Objects

Example:

```java
class Printer {
    void print(String text) {
        System.out.println(text);
    }
}

class Report {
    void generate(Printer printer) {
        printer.print("Generating report...");
    }
}
```

The Report object collaborates with Printer.

---

# 95. Object Ownership

When modeling a class, ask:

```text
Which object should own this data?
```

For example:

```text
BankAccount → balance
Student → marks
Product → price
Order → order status
```

The answer should make sense in the domain.

---

# 96. Object Responsibility

Ask:

```text
Which object should perform this operation?
```

Examples:

```text
BankAccount → withdraw()
ShoppingCart → calculateTotal()
Student → calculateGrade()
Order → cancel()
```

This keeps behavior close to the data and rules it uses.

---

# 97. Data and Behavior Together

Weak design:

```text
Student data
+
many unrelated external functions
```

Object-oriented design can instead group:

```text
Student data
+
Student behavior
```

Example:

```java
class Student {
    String name;
    int marks;

    char grade() {
        if (marks >= 90) return 'A';
        if (marks >= 75) return 'B';
        if (marks >= 60) return 'C';
        return 'D';
    }
}
```

---

# 98. Why This Helps

Now:

```java
student.grade();
```

clearly communicates:

```text
calculate the grade of this student
```

instead of:

```java
calculateGrade(student);
```

Both can be valid designs, but object-oriented modeling often makes responsibilities explicit.

---

# 99. Class as an API

A class exposes operations that other code can use.

Example:

```java
class Counter {
    void increment() {
        ...
    }

    int getValue() {
        ...
    }
}
```

Other code can use:

```java
counter.increment();
counter.getValue();
```

The class can hide implementation details later through access control.

---

# 100. Public and Private Preview

Example:

```java
class BankAccount {
    private double balance;

    public void deposit(double amount) {
        balance += amount;
    }
}
```

The field is private.

The method is public.

This is an early example of encapsulation.

---

# 101. Why Fields Should Not Always Be Public

If everything is public:

```java
account.balance = -100000;
```

external code can create invalid state.

Controlled methods can protect rules.

Chapter 15 will cover this deeply.

---

# 102. Object Construction Without Explicit Constructor

Consider:

```java
class Student {
    String name;
}
```

Then:

```java
Student s = new Student();
```

Java can provide an implicit default constructor when no constructor is explicitly declared.

Constructors themselves are covered in Chapter 13.

---

# 103. Why Constructors Are Separate

A constructor is special syntax used during object creation.

Example:

```java
Student s = new Student("Aman");
```

The constructor can initialize the object's fields.

You should understand classes and objects first, which is why constructors come next.

---

# 104. Object Lifecycle — Basic View

A simplified lifecycle:

```text
class available
      ↓
object created
      ↓
object initialized
      ↓
object used
      ↓
references change/disappear
      ↓
object may become unreachable
      ↓
eligible for garbage collection
```

Garbage collection is studied later in Chapter 44.

---

# 105. Reachability

An object can remain reachable through references.

Example:

```java
Student a = new Student();
Student b = a;
```

Even if:

```java
a = null;
```

the object can still be reached through:

```java
b
```

---

# 106. Object Becomes Unreachable

Example:

```java
Student a = new Student();

a = null;
```

If no other reference points to that object, it may become unreachable.

It can then become eligible for garbage collection.

---

# 107. Garbage Collection Is Not Manual Destruction

Java does not provide a C++-style `delete` operation for ordinary object destruction.

You generally make objects unreachable and the garbage collector manages reclamation.

The exact timing of garbage collection is not guaranteed.

---

# 108. Object Equality Basics

There are two common ideas:

```text
identity
logical equality
```

Identity:

```java
a == b
```

for references.

Logical equality:

```java
a.equals(b)
```

if the class defines equality appropriately.

---

# 109. Example — Identity

```java
Student a = new Student();
Student b = new Student();

System.out.println(a == b);
```

Output:

```text
false
```

They are different instances.

---

# 110. Example — Same Object

```java
Student a = new Student();
Student b = a;

System.out.println(a == b);
```

Output:

```text
true
```

Same object.

---

# 111. `equals()` Preview

If a class does not override `equals()`, the inherited behavior is not automatically a field-by-field comparison.

Later, you will learn how classes can define logical equality using:

```java
equals()
hashCode()
```

This is especially important in collections.

---

# 112. Object Class Preview

Every Java class ultimately has `Object` as part of its class hierarchy, directly or indirectly, except that interfaces have a different relationship.

Important methods associated with `Object` include:

```text
toString()
equals()
hashCode()
getClass()
```

These will be studied later.

---

# 113. Why `toString()` Matters

If you write:

```java
System.out.println(student);
```

Java needs a string representation of the object.

Classes can override:

```java
toString()
```

to provide a useful representation.

This will be covered later.

---

# 114. Class Members and Object Members

A class can have:

```text
instance members
static members
```

Example:

```java
class Student {
    String name;          // instance
    static int count;     // static

    void study() {        // instance
    }

    static void showCount() { // static
    }
}
```

Chapter 14 will explain the distinction deeply.

---

# 115. Instance Field Sharing

Instance fields are not normally shared between objects.

Example:

```java
class Student {
    String name;
}
```

Then:

```java
Student a = new Student();
Student b = new Student();
```

There are two `name` fields, one in each object.

---

# 116. Static Field Sharing Preview

Static fields are associated with the class.

Example:

```java
class Student {
    static int count;
}
```

There is one class-level `count` rather than one independent `count` per object.

Detailed static behavior is Chapter 14.

---

# 117. Object Creation with Variables

You can create:

```java
Student a = new Student();
Student b = new Student();
Student c = new Student();
```

Each declaration creates a separate reference variable.

Each `new Student()` creates a separate object.

---

# 118. Anonymous Object

You can create an object without storing its reference:

```java
new Student();
```

This creates a Student object but gives you no reference through which to use it afterward.

This can be useful in limited cases, but normally you store the reference if you need the object.

---

# 119. Example of Anonymous Object

```java
class Printer {
    void print() {
        System.out.println("Hello");
    }
}

public class Main {
    public static void main(String[] args) {
        new Printer().print();
    }
}
```

Output:

```text
Hello
```

A Printer object is created and immediately used.

---

# 120. Chained Method Calls

If a method returns an object/reference, calls can sometimes be chained.

Example:

```java
builder.append("Hello")
       .append(" World");
```

This style is common with builders and fluent APIs.

You will see this more often with `StringBuilder` and other APIs.

---

# 121. Object Reference Assignment

Consider:

```java
Student a = new Student();
Student b = a;
```

This does not copy the object.

It copies the reference value.

Therefore:

```text
one object
two references
```

---

# 122. Object Copy Is Not Automatic

This:

```java
Student b = a;
```

does not create a new Student object.

If you want a separate object, you need to create one and copy the desired state.

For example:

```java
Student b = new Student();
b.name = a.name;
```

This is only a shallow/manual field copy and has limitations when fields themselves refer to mutable objects.

---

# 123. Shallow vs Deep Copy Preview

Suppose:

```java
class Student {
    Address address;
}
```

If you copy:

```java
b.address = a.address;
```

both Student objects refer to the same Address object.

That is shared nested state.

A deep copy would create a separate Address object too.

Copying strategies will be explored as OOP and object design become more advanced.

---

# 124. Object as a Method Result

Example:

```java
class Calculator {
    int square(int x) {
        return x * x;
    }
}
```

The method returns a primitive.

But methods can also return objects:

```java
Student createStudent() {
    return new Student();
}
```

The return type determines what kind of value is returned.

---

# 125. Method Returning Current Object

An instance method can return:

```java
this
```

Example:

```java
class Builder {
    Builder step() {
        return this;
    }
}
```

This pattern supports fluent APIs.

`this` will be studied in Chapter 14.

---

# 126. Class Can Have Other Class Fields

Example:

```java
class Engine {
    int power;
}

class Car {
    String brand;
    Engine engine;
}
```

This is a composition relationship.

A Car contains a reference to an Engine.

---

# 127. Passing Multiple Objects

Methods can accept several object references:

```java
static void compare(Student a, Student b) {
    System.out.println(a.name);
    System.out.println(b.name);
}
```

Usage:

```java
compare(student1, student2);
```

---

# 128. Returning One of Multiple Objects

Example:

```java
static Student older(Student a, Student b) {
    if (a.age >= b.age) {
        return a;
    }

    return b;
}
```

The method returns a reference to one of the existing objects.

It does not automatically create a new object.

---

# 129. Object References and Conditional Logic

Example:

```java
if (student != null) {
    student.study();
}
```

This checks whether the reference identifies an object before using it.

---

# 130. Object References and Loops

Example:

```java
for (Student student : students) {
    if (student != null) {
        System.out.println(student.name);
    }
}
```

This is useful when an object array may contain null elements.

---

# 131. Object Arrays with `for` Loop

```java
Student[] students = new Student[3];

students[0] = new Student();
students[1] = new Student();
students[2] = new Student();

students[0].name = "Aman";
students[1].name = "Riya";
students[2].name = "Raj";

for (int i = 0; i < students.length; i++) {
    System.out.println(students[i].name);
}
```

Output:

```text
Aman
Riya
Raj
```

---

# 132. Enhanced `for` Loop with Objects

```java
for (Student student : students) {
    System.out.println(student.name);
}
```

This is often cleaner when you do not need the index.

---

# 133. Object Array and `null`

Example:

```java
Student[] students = new Student[3];

students[0] = new Student();
students[2] = new Student();
```

Now:

```text
students[0] → Student
students[1] → null
students[2] → Student
```

So this is unsafe:

```java
for (Student student : students) {
    System.out.println(student.name);
}
```

because the middle element is null.

---

# 134. Safe Object Array Loop

```java
for (Student student : students) {
    if (student != null) {
        System.out.println(student.name);
    }
}
```

---

# 135. Class Fields Can Be Arrays

A class can contain an array.

Example:

```java
class Student {
    String name;
    int[] marks;
}
```

Usage:

```java
Student student = new Student();

student.name = "Aman";
student.marks = new int[] {90, 85, 95};
```

---

# 136. Class Fields Can Be Collections

Later you may see:

```java
class Student {
    List<String> subjects;
}
```

This is another example of an object containing references to other objects.

Collections will be covered in Chapters 31–35.

---

# 137. Object Model Example — Student

```java
class Student {
    String name;
    int age;
    int[] marks;

    double averageMarks() {
        int total = 0;

        for (int mark : marks) {
            total += mark;
        }

        return (double) total / marks.length;
    }
}
```

Usage:

```java
Student student = new Student();

student.name = "Aman";
student.age = 20;
student.marks = new int[] {80, 90, 100};

System.out.println(student.averageMarks());
```

Output:

```text
90.0
```

---

# 138. Why Object State Matters

The result of an instance method can depend on the object's current state.

Example:

```java
student.averageMarks();
```

depends on:

```java
student.marks
```

Changing the marks changes the result.

---

# 139. Object Behavior Should Use Its Own State

Example:

```java
class BankAccount {
    double balance;

    boolean canWithdraw(double amount) {
        return amount <= balance;
    }
}
```

Calling:

```java
account.canWithdraw(500);
```

uses the state of that account.

---

# 140. Objects Can Have Invariants

An invariant is a rule that should remain true for valid objects.

Examples:

```text
age >= 0
marks between 0 and 100
balance not negative
price >= 0
```

Good class design protects these rules.

Encapsulation and constructors will help with this.

---

# 141. Why Direct Field Access Can Be Dangerous

Example:

```java
class BankAccount {
    double balance;
}
```

Anyone with access can write:

```java
account.balance = -50000;
```

This may violate the intended rules.

Later:

```java
private double balance;
```

plus controlled methods can improve the design.

---

# 142. Object Creation vs Initialization

These concepts are related but not identical.

Object creation:

```java
new Student()
```

Initialization includes setting the object's fields to appropriate initial values.

Constructors participate in initialization.

---

# 143. Object Initialization Order Preview

When creating an object, Java performs initialization steps involving:

```text
memory/object creation
field initialization
instance initialization blocks
constructor execution
```

The exact rules become important with constructors and inheritance.

Do not try to memorize all initialization rules yet.

---

# 144. Class Definition Does Not Create Instances

Writing:

```java
class Student {
    String name;
}
```

does not create a Student object.

It defines the type.

Instances are created when code executes something such as:

```java
new Student()
```

---

# 145. One Class, Many Objects

This is one of the strongest benefits of classes.

Example:

```java
Student s1 = new Student();
Student s2 = new Student();
Student s3 = new Student();
Student s4 = new Student();
```

All use the same class definition.

Each can maintain separate instance state.

---

# 146. Objects Can Be Created Dynamically

Objects are normally created during program execution.

Example:

```java
int count = 3;

Student[] students = new Student[count];

for (int i = 0; i < count; i++) {
    students[i] = new Student();
}
```

The number of objects can depend on runtime data.

---

# 147. Class Reference Compatibility

A reference variable's declared type controls what members are available at compile time.

Example:

```java
Student student = new Student();
```

The declared type is:

```text
Student
```

This topic becomes more important with inheritance and polymorphism.

---

# 148. Declared Type vs Actual Object

For now:

```java
Student student = new Student();
```

both are Student.

Later you will see:

```java
Animal animal = new Dog();
```

where:

```text
declared type → Animal
actual object → Dog
```

This is a foundation for runtime polymorphism.

---

# 149. Class Members and Access

Suppose:

```java
class Student {
    private String name;

    public void showName() {
        System.out.println(name);
    }
}
```

External code cannot directly access:

```java
student.name
```

but can call:

```java
student.showName();
```

This is controlled access.

---

# 150. Public Class Basics

A class can be declared:

```java
public class Student {
}
```

A public top-level class has additional source-file naming rules.

For example, normally:

```text
Student.java
```

contains:

```java
public class Student
```

Java also permits multiple top-level classes in one source file subject to visibility and file naming rules.

The rule about one public top-level class per source file will be discussed again when packages and compilation are covered.

---

# 151. Nested Classes Preview

A class can also be declared inside another class.

Example:

```java
class Outer {
    class Inner {
    }
}
```

Java supports several forms of nested classes.

Nested classes are covered later in the course.

---

# 152. Records Preview

Modern Java also provides records for concise data-oriented classes.

Example:

```java
record Point(int x, int y) {
}
```

This is not a replacement for every normal class.

Records will be discussed in the modern Java features chapter.

---

# 153. Practical Program — Student

```java
class Student {
    String name;
    int age;
    int marks;

    void showDetails() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Marks: " + marks);
    }

    boolean isPassed() {
        return marks >= 40;
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        student.name = "Aman";
        student.age = 20;
        student.marks = 85;

        student.showDetails();

        System.out.println(
            "Passed: " + student.isPassed()
        );
    }
}
```

Output:

```text
Name: Aman
Age: 20
Marks: 85
Passed: true
```

---

# 154. Practical Program — Multiple Students

```java
class Student {
    String name;
    int marks;

    void showResult() {
        System.out.println(
            name + " scored " + marks
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
Aman scored 90
Riya scored 95
Raj scored 82
```

---

# 155. Practical Program — Rectangle

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

    boolean isSquare() {
        return length == width;
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

        System.out.println(
            "Square = " + rectangle.isSquare()
        );
    }
}
```

Output:

```text
Area = 50.0
Perimeter = 30.0
Square = false
```

---

# 156. Practical Program — Bank Account

```java
class BankAccount {
    String owner;
    double balance;

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    boolean withdraw(double amount) {
        if (amount <= 0 || amount > balance) {
            return false;
        }

        balance -= amount;
        return true;
    }

    void showBalance() {
        System.out.println(
            owner + ": " + balance
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
Aman: 1200.0
```

This is still a simple version. Encapsulation will make the design stronger.

---

# 157. Practical Program — Car

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

    void showSpeed() {
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

        car.showSpeed();
    }
}
```

Output:

```text
Toyota speed = 10
```

---

# 158. Practical Program — Employee

```java
class Employee {
    String name;
    double monthlySalary;

    double annualSalary() {
        return monthlySalary * 12;
    }

    void showDetails() {
        System.out.println("Name: " + name);
        System.out.println(
            "Monthly salary: " + monthlySalary
        );
        System.out.println(
            "Annual salary: " + annualSalary()
        );
    }
}

public class Main {
    public static void main(String[] args) {
        Employee employee = new Employee();

        employee.name = "Riya";
        employee.monthlySalary = 60000;

        employee.showDetails();
    }
}
```

Output:

```text
Name: Riya
Monthly salary: 60000.0
Annual salary: 720000.0
```

---

# 159. Practical Program — Object as Argument

```java
class Student {
    String name;
}

class Printer {
    void printStudent(Student student) {
        System.out.println(
            "Student: " + student.name
        );
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        student.name = "Aman";

        Printer printer = new Printer();

        printer.printStudent(student);
    }
}
```

Output:

```text
Student: Aman
```

---

# 160. Practical Program — Return an Object

```java
class Student {
    String name;
    int marks;
}

class StudentFactory {
    static Student create(String name, int marks) {
        Student student = new Student();

        student.name = name;
        student.marks = marks;

        return student;
    }
}

public class Main {
    public static void main(String[] args) {
        Student student =
            StudentFactory.create("Aman", 90);

        System.out.println(student.name);
        System.out.println(student.marks);
    }
}
```

Output:

```text
Aman
90
```

---

# 161. Practical Program — Object Array

```java
class Student {
    String name;
    int marks;
}

public class Main {
    public static void main(String[] args) {
        Student[] students = new Student[3];

        students[0] = new Student();
        students[1] = new Student();
        students[2] = new Student();

        students[0].name = "Aman";
        students[0].marks = 90;

        students[1].name = "Riya";
        students[1].marks = 95;

        students[2].name = "Raj";
        students[2].marks = 82;

        for (Student student : students) {
            System.out.println(
                student.name + " = " + student.marks
            );
        }
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

# 162. Practical Program — Student with Address

```java
class Address {
    String city;
    String country;
}

class Student {
    String name;
    Address address;

    void showAddress() {
        System.out.println(
            name + " lives in " +
            address.city + ", " +
            address.country
        );
    }
}

public class Main {
    public static void main(String[] args) {
        Address address = new Address();

        address.city = "Mumbai";
        address.country = "India";

        Student student = new Student();

        student.name = "Aman";
        student.address = address;

        student.showAddress();
    }
}
```

Output:

```text
Aman lives in Mumbai, India
```

---

# 163. Practical Program — Shared Nested Object

```java
class Address {
    String city;
}

class Student {
    String name;
    Address address;
}

public class Main {
    public static void main(String[] args) {
        Address address = new Address();
        address.city = "Mumbai";

        Student a = new Student();
        Student b = new Student();

        a.name = "Aman";
        b.name = "Riya";

        a.address = address;
        b.address = address;

        address.city = "Pune";

        System.out.println(a.address.city);
        System.out.println(b.address.city);
    }
}
```

Output:

```text
Pune
Pune
```

Both Student objects refer to the same Address object.

---

# 164. Practical Program — Separate Nested Objects

```java
class Address {
    String city;
}

class Student {
    String name;
    Address address;
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student();
        Student b = new Student();

        a.name = "Aman";
        b.name = "Riya";

        a.address = new Address();
        b.address = new Address();

        a.address.city = "Mumbai";
        b.address.city = "Pune";

        System.out.println(a.address.city);
        System.out.println(b.address.city);
    }
}
```

Output:

```text
Mumbai
Pune
```

Each Student has a separate Address object.

---

# 165. Practical Program — Counter Objects

```java
class Counter {
    int value;

    void increment() {
        value++;
    }

    void show() {
        System.out.println(value);
    }
}

public class Main {
    public static void main(String[] args) {
        Counter a = new Counter();
        Counter b = new Counter();

        a.increment();
        a.increment();

        b.increment();

        a.show();
        b.show();
    }
}
```

Output:

```text
2
1
```

---

# 166. Practical Program — Object Identity

```java
class Student {
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student();
        Student b = new Student();
        Student c = a;

        System.out.println(a == b);
        System.out.println(a == c);
    }
}
```

Output:

```text
false
true
```

---

# 167. Practical Program — Object Replacement

```java
class Student {
    String name;
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student();
        Student b = a;

        a.name = "Aman";

        a = new Student();
        a.name = "Riya";

        System.out.println(a.name);
        System.out.println(b.name);
    }
}
```

Output:

```text
Riya
Aman
```

---

# 168. Practical Program — Null Check

```java
class Student {
    String name;
}

public class Main {
    public static void main(String[] args) {
        Student student = null;

        if (student != null) {
            System.out.println(student.name);
        } else {
            System.out.println("No student object");
        }
    }
}
```

Output:

```text
No student object
```

---

# 169. Practical Program — Average Marks

```java
class Student {
    String name;
    int[] marks;

    double average() {
        int total = 0;

        for (int mark : marks) {
            total += mark;
        }

        return (double) total / marks.length;
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        student.name = "Aman";
        student.marks = new int[] {
            80, 90, 100
        };

        System.out.println(
            student.name + " average = " +
            student.average()
        );
    }
}
```

Output:

```text
Aman average = 90.0
```

---

# 170. Practical Program — Find Older Student

```java
class Student {
    String name;
    int age;
}

public class Main {
    static Student older(Student a, Student b) {
        if (a.age >= b.age) {
            return a;
        }

        return b;
    }

    public static void main(String[] args) {
        Student a = new Student();
        Student b = new Student();

        a.name = "Aman";
        a.age = 20;

        b.name = "Riya";
        b.age = 22;

        Student result = older(a, b);

        System.out.println(result.name);
    }
}
```

Output:

```text
Riya
```

---

# 171. Practical Program — Object Collaboration

```java
class Engine {
    void start() {
        System.out.println("Engine started");
    }
}

class Car {
    Engine engine;

    void start() {
        engine.start();
        System.out.println("Car started");
    }
}

public class Main {
    public static void main(String[] args) {
        Engine engine = new Engine();

        Car car = new Car();
        car.engine = engine;

        car.start();
    }
}
```

Output:

```text
Engine started
Car started
```

---

# 172. Practice Exercise — Book

Create:

```java
class Book
```

Fields:

```text
title
author
price
```

Methods:

```text
showDetails()
isExpensive()
```

Create three objects.

---

# 173. Practice Exercise — Mobile

Create:

```java
class MobilePhone
```

Fields:

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

# 174. Practice Exercise — Employee

Create:

```java
class Employee
```

Fields:

```text
name
id
salary
department
```

Methods:

```text
work()
annualSalary()
showDetails()
```

Create at least three objects.

---

# 175. Practice Exercise — Product

Create:

```java
class Product
```

Fields:

```text
name
price
quantity
```

Method:

```text
totalPrice()
```

Example:

```text
price = 100
quantity = 5
total = 500
```

---

# 176. Practice Exercise — Circle

Create:

```java
class Circle
```

Field:

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

# 177. Practice Exercise — Bank Account

Create:

```text
BankAccount
```

with:

```text
owner
balance
```

Methods:

```text
deposit()
withdraw()
showBalance()
```

Try to prevent invalid withdrawals.

Later, convert this into a properly encapsulated class.

---

# 178. Practice Exercise — Rectangle

Create:

```text
Rectangle
```

Fields:

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

Create multiple Rectangle objects.

---

# 179. Practice Exercise — Student Array

Create:

```java
Student[] students = new Student[5];
```

Create five Student objects.

Store:

```text
name
marks
```

Print all students.

Then find:

```text
highest marks
lowest marks
average marks
```

---

# 180. Practice Exercise — Address

Create:

```text
Address
```

with:

```text
city
state
country
```

Then create:

```text
Student
```

with:

```text
name
address
```

Print complete student information.

---

# 181. Practice Exercise — Object References

Write a program:

```java
Student a = new Student();
Student b = a;
```

Change state using `a`.

Read state using `b`.

Then create:

```java
a = new Student();
```

and observe what happens.

Draw the reference diagram.

---

# 182. Practice Exercise — Object Return

Write:

```java
static Student createStudent(...)
```

that creates and returns a Student object.

Create three students using this method.

---

# 183. Practice Exercise — Object Comparison

Create two Student objects with:

```text
same name
same age
same marks
```

Check:

```java
a == b
```

Explain why the result is what it is.

Then later study how `equals()` can represent logical equality.

---

# 184. Practice Exercise — Shared Address

Create:

```text
Address address
```

Create:

```text
Student a
Student b
```

Assign the same Address object to both.

Change:

```text
address.city
```

Observe both Students.

Then create separate Address objects and compare the behavior.

---

# 185. Interview Questions

## Q1. What is a class?

A class is a Java type definition that describes members and behavior and can be used to create instances.

---

## Q2. What is an object?

An object is an instance of a class or another reference type.

---

## Q3. What is the difference between a class and an object?

```text
Class → type/definition
Object → instance
```

---

## Q4. Does declaring a reference create an object?

No.

```java
Student s;
```

only declares a reference variable.

---

## Q5. What creates the object?

An expression such as:

```java
new Student()
```

creates a new Student instance.

---

## Q6. What does `new` return?

The `new` expression produces a reference to the newly created object.

---

## Q7. What is a reference variable?

A variable whose value can refer to an object.

---

## Q8. Can multiple references point to the same object?

Yes.

```java
Student a = new Student();
Student b = a;
```

---

## Q9. Does `b = a` copy the object?

No.

It copies the reference value.

---

## Q10. What is object state?

The current values of the object's relevant instance fields.

---

## Q11. What is object behavior?

Operations that an object can perform, generally represented by methods.

---

## Q12. What is an instance field?

A non-static field associated with each object instance.

---

## Q13. Do different objects have separate instance fields?

Yes.

Each object has its own instance state.

---

## Q14. What are default values of instance fields?

They receive type-specific default values during object initialization if not otherwise initialized.

Examples:

```text
int → 0
double → 0.0
boolean → false
reference → null
```

---

## Q15. Do local variables receive the same automatic defaults?

No.

Local variables must be definitely assigned before they are read.

---

## Q16. What is `null`?

A special reference value that means the reference does not currently identify an object.

---

## Q17. What happens when you access a field using a null reference?

A `NullPointerException` occurs.

---

## Q18. What does `==` mean for object references?

It checks whether the two references identify the same object.

---

## Q19. What is the difference between `==` and `equals()`?

For ordinary object references:

```java
== 
```

checks identity.

```java
equals()
```

can represent logical equality when appropriately implemented.

---

## Q20. Can two different objects have the same data?

Yes.

---

## Q21. Can two references point to one object?

Yes.

---

## Q22. Can one reference point to different objects at different times?

Yes.

---

## Q23. What is an object array?

An array whose elements are references to objects.

Example:

```java
Student[] students;
```

---

## Q24. Does `new Student[5]` create five Student objects?

No.

It creates an array containing five reference slots, initially null.

---

## Q25. How do you create the actual Student objects?

For example:

```java
for (int i = 0; i < students.length; i++) {
    students[i] = new Student();
}
```

---

## Q26. Can a class contain another class's object?

Yes.

For example:

```java
class Car {
    Engine engine;
}
```

---

## Q27. What is object composition?

It is building objects using references to other objects, often representing HAS-A relationships.

---

## Q28. Are objects always stored on the heap?

The Java language does not specify such a simplistic universal memory rule. JVM implementations may use different strategies.

For basic learning, focus on references and object identity rather than assuming a fixed physical location.

---

## Q29. What is object lifecycle?

At a high level:

```text
creation
→ initialization
→ use
→ loss of reachability
→ possible garbage collection
```

---

## Q30. What happens when an object becomes unreachable?

It can become eligible for garbage collection, but Java does not guarantee exactly when collection occurs.

---

# 186. Output Questions

## Question 1

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

## Question 2

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

## Question 3

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

## Question 4

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

## Question 5

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

## Question 6

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

## Question 7

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

---

## Question 8

```java
class Student {
    String name;
}

static void change(Student s) {
    s.name = "Changed";
}
```

Then:

```java
Student s = new Student();
s.name = "Original";

change(s);

System.out.println(s.name);
```

Output:

```text
Changed
```

---

## Question 9

```java
class Student {
    String name;
}

static void replace(Student s) {
    s = new Student();
    s.name = "New";
}
```

Then:

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

---

## Question 10

```java
class Address {
    String city;
}

class Student {
    Address address;
}

Address address = new Address();
address.city = "Mumbai";

Student a = new Student();
Student b = new Student();

a.address = address;
b.address = address;

address.city = "Pune";

System.out.println(a.address.city);
System.out.println(b.address.city);
```

Output:

```text
Pune
Pune
```

---

## Question 11

```java
Student[] students = new Student[2];

System.out.println(students[0]);
```

Output:

```text
null
```

The array contains reference slots, initially null.

---

## Question 12

```java
Student[] students = new Student[2];

students[0] = new Student();

System.out.println(students[0]);
System.out.println(students[1]);
```

The first prints a Student object's default string representation unless `toString()` is overridden.

The second prints:

```text
null
```

---

# 187. Common Mistakes

## Mistake 1 — Thinking declaration creates an object

Wrong:

```java
Student s;
```

means an object exists.

Correct:

```text
It only declares a reference variable.
```

---

## Mistake 2 — Thinking assignment copies the object

Wrong:

```java
Student b = a;
```

creates a new Student.

Correct:

```text
It copies the reference value.
```

---

## Mistake 3 — Forgetting `new`

Wrong:

```java
Student s;
s.name = "Aman";
```

This is invalid because `s` has not been assigned an object reference.

---

## Mistake 4 — Calling a method on null

```java
Student s = null;

s.study();
```

Result:

```text
NullPointerException
```

---

## Mistake 5 — Assuming object arrays create objects

```java
Student[] students = new Student[5];
```

does not create five Student instances.

---

## Mistake 6 — Using `==` for logical object equality

```java
student1 == student2
```

checks identity.

It does not automatically compare all fields.

---

## Mistake 7 — Making all fields public

This can allow invalid state.

Later you will learn encapsulation and controlled APIs.

---

## Mistake 8 — Putting unrelated responsibilities into one class

A class should ideally have a focused responsibility.

---

## Mistake 9 — Confusing instance and static state

Instance fields belong to each object.

Static fields are class-level.

Chapter 14 covers this deeply.

---

# 188. Class Design Checklist

When creating a class, ask:

```text
1. What concept does this class represent?

2. What data belongs to it?

3. What behavior belongs to it?

4. Which state should be protected?

5. Which operations should be public?

6. What other objects does it need?

7. Should fields be instance or static?

8. What should the object's initial state be?

9. What rules must always remain true?

10. Is the class doing unrelated jobs?
```

---

# 189. Object Modeling Example

Problem:

> Create a simple food delivery system.

Possible classes:

```text
Customer
Restaurant
FoodItem
Order
DeliveryPartner
Address
```

Customer:

```text
name
phone
address
```

Restaurant:

```text
name
location
```

FoodItem:

```text
name
price
```

Order:

```text
items
customer
status
total
```

DeliveryPartner:

```text
name
vehicle
```

This is object-oriented modeling.

---

# 190. Modeling Relationships

Possible relationships:

```text
Customer HAS-A Address

Order HAS-A Customer

Order HAS-A FoodItems

DeliveryPartner HAS-A Vehicle
```

These relationships will be studied formally in Chapter 22.

---

# 191. Mini Project — Student Management

Build:

```text
Student
```

with:

```text
name
rollNumber
marks
```

Methods:

```text
showDetails()
averageMarks()
isPassed()
```

Create several Student objects.

Then store them in:

```java
Student[]
```

Add:

```text
highest marks
lowest marks
class average
```

Later improve the project with constructors and encapsulation.

---

# 192. Mini Project — Library

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

Methods:

```text
addBook()
registerMember()
borrowBook()
returnBook()
```

---

# 193. Mini Project — Bank

Create:

```text
BankAccount
```

Support:

```text
deposit
withdraw
showBalance
```

Create multiple account objects.

Then add:

```text
accountNumber
owner
transaction tracking
transfer
```

Later use encapsulation to protect balance.

---

# 194. Mini Project — Shopping Cart

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

Start with arrays if needed.

Later replace them with collections.

---

# 195. Mini Project — Employee Management

Create:

```text
Employee
```

Fields:

```text
name
id
department
salary
```

Methods:

```text
showDetails()
annualSalary()
```

Create an array of employees.

Find:

```text
highest salary
lowest salary
average salary
```

---

# 196. Mini Project — Simple Game

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

Enemy:

```text
name
health
damage
```

Methods:

```text
attack()
takeDamage()
```

Later use inheritance and polymorphism to make this more powerful.

---

# 197. Important Mental Model

Always visualize:

```text
REFERENCE
    │
    ▼
 OBJECT
    │
 ┌──┴───────────────┐
 ↓                  ↓
FIELDS            METHODS
 ↓                  ↓
STATE             BEHAVIOR
```

For example:

```text
student
   │
   ▼
Student object
   │
   ├── name
   ├── age
   ├── marks
   │
   ├── study()
   └── showResult()
```

---

# 198. The Most Important Difference

Remember:

```java
Student a = new Student();
Student b = a;
```

means:

```text
one object
two references
```

NOT:

```text
two objects
```

To create two objects:

```java
Student a = new Student();
Student b = new Student();
```

---

# 199. Object Reference Mental Model

Think of:

```java
Student a = new Student();
```

as:

```text
a ───────► Student object
```

Then:

```java
Student b = a;
```

becomes:

```text
a ───────┐
         ├────► Student object
b ───────┘
```

Then:

```java
a = new Student();
```

becomes:

```text
a ───────► Student object B

b ───────► Student object A
```

This diagram solves many beginner object questions.

---

# 200. Final Summary

In this chapter you learned:

```text
✓ What a class is
✓ Class as a type
✓ Class as a blueprint
✓ Object
✓ Instance
✓ new keyword
✓ Reference variables
✓ Object references
✓ Fields
✓ Instance fields
✓ Methods
✓ Instance methods
✓ Object state
✓ Object behavior
✓ Multiple objects
✓ Separate object state
✓ Object identity
✓ == with references
✓ null references
✓ NullPointerException
✓ Default field values
✓ Field initializers
✓ Local vs instance variables
✓ this preview
✓ Object parameters
✓ Pass-by-value for object references
✓ Returning objects
✓ Object composition
✓ Objects inside objects
✓ Arrays of objects
✓ null elements in object arrays
✓ Object graphs
✓ Mutable objects
✓ Immutable object preview
✓ Instance vs static preview
✓ Object lifecycle
✓ Reachability
✓ Garbage collection preview
✓ Object equality preview
✓ Object class preview
✓ Public/private preview
✓ Object design
✓ Object responsibilities
✓ Practical programs
✓ Exercises
✓ Mini projects
✓ Interview questions
✓ Output questions
```

---

# 201. Key Takeaways

If you remember only the most important ideas, remember these:

```text
1. A class defines a type.

2. An object is an instance.

3. new creates an object.

4. A reference variable can refer to an object.

5. Declaring a reference does not create an object.

6. Instance fields represent per-object state.

7. Instance methods can operate on the current object.

8. One class can create many objects.

9. Separate objects have separate instance state.

10. Multiple references can point to one object.

11. Assigning one object reference to another does not copy the object.

12. == checks reference identity for object references.

13. null means a reference identifies no object.

14. Dereferencing null causes NullPointerException.

15. Object arrays initially contain null references.

16. Objects can contain references to other objects.

17. Java passes object references by value.

18. A method can receive and return object references.

19. Good classes group related state and behavior.

20. Good object design assigns responsibilities sensibly.
```

---

# 202. What Comes Next?

You now understand:

```text
Class
   ↓
Object
   ↓
Reference
   ↓
State
   ↓
Behavior
```

The next major question is:

> **How do we create objects with the correct initial state?**

For example, instead of:

```java
Student student = new Student();

student.name = "Aman";
student.age = 20;
student.marks = 90;
```

we want:

```java
Student student =
    new Student("Aman", 20, 90);
```

This is where constructors become extremely important.

---

# Chapter 13 — Constructors

In the next chapter you will learn:

```text
✓ What is a constructor?
✓ Why constructors are needed
✓ Default constructor
✓ No-argument constructor
✓ Parameterized constructor
✓ Constructor syntax
✓ Constructor invocation
✓ Constructor overloading
✓ Constructor chaining
✓ this()
✓ Constructor vs method
✓ Constructor access modifiers
✓ Constructor initialization
✓ Object initialization flow
✓ Constructor with validation
✓ Constructor with object fields
✓ Copy-style constructors
✓ Constructor best practices
✓ Common constructor mistakes
✓ Practical OOP programs
✓ Exercises
✓ Interview questions
```

Constructors are one of the most important concepts before moving into deeper OOP.
