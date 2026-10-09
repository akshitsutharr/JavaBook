# Chapter 20 — Abstraction

> **Java Master Course — Chapter 20 of 50**
>
> Abstraction is one of the four major pillars of Object-Oriented Programming.
>
> The main idea is simple:
>
> **Show what an object can do, while hiding unnecessary implementation details.**
>
> Java mainly provides two major ways to achieve abstraction:
>
> 1. Abstract classes
> 2. Interfaces
>
> Interfaces will be studied deeply in Chapter 21. This chapter focuses especially on abstract classes and the core idea of abstraction.

---

# 1. What You Will Learn

By the end of this chapter, you should understand:

```text
✓ What abstraction means
✓ Why abstraction is needed
✓ Abstraction vs implementation
✓ Real-world abstraction
✓ Abstract classes
✓ abstract keyword
✓ Abstract methods
✓ Concrete methods
✓ Concrete classes
✓ Abstract class references
✓ Why abstract classes cannot be instantiated
✓ Constructors in abstract classes
✓ Calling parent constructors
✓ Fields in abstract classes
✓ Static members in abstract classes
✓ Final methods in abstract classes
✓ Abstract method rules
✓ Overriding abstract methods
✓ Partial abstraction
✓ Runtime polymorphism with abstract classes
✓ Abstract classes vs normal classes
✓ Abstract classes vs interfaces
✓ Good abstraction design
✓ Common mistakes
✓ Practical programs
✓ Exercises
✓ Output questions
✓ Interview questions
✓ Mini projects
```

# 2. What Is Abstraction?

Abstraction means focusing on the important behavior of something while hiding unnecessary implementation details.

For example, when you use an ATM, you see operations such as:

```text
Withdraw money
Deposit money
Check balance
```

You do not need to know all the internal details of:

```text
bank servers
database queries
authentication systems
transaction processing
network communication
```

You interact with a simple interface while complex implementation stays behind it.

That is the basic idea of abstraction.

# 3. Simple Definition

> **Abstraction is the process of exposing essential operations while hiding implementation details that the user of the abstraction does not need to know.**

# 4. Real-World Example — Car

When you drive a car, you use:

```text
steering wheel
brake
accelerator
gear selector
```

You do not normally need to know exactly how:

```text
fuel injection
engine timing
transmission
braking hydraulics
electronic control units
```

work internally.

You interact with a simple set of controls.

The internal complexity is hidden.

That is abstraction in everyday life.

# 5. Real-World Example — Mobile Phone

When you tap:

```text
Camera
```

you do not manually control:

```text
sensor registers
image signal processing
autofocus algorithms
memory buffers
file encoding
```

The application gives you a simple operation:

```text
take photo
```

while the implementation is hidden behind the abstraction.

# 6. Real-World Example — Banking

A banking application may expose:

```text
transferMoney()
deposit()
withdraw()
getBalance()
```

The user does not need to know the internal implementation of every operation.

The public operations form part of the abstraction.

The internal implementation can change while the external contract remains stable.

# 7. Why Do We Need Abstraction?

Without abstraction, users of a class may need to understand too many implementation details.

Imagine a payment system.

Without a useful abstraction, a caller might need to understand:

```text
network protocol
API request format
encryption
authentication
database transactions
retry logic
logging
```

A better design can expose:

```java
payment.pay(amount);
```

The payment implementation handles the internal complexity.

Abstraction therefore helps reduce unnecessary complexity for the caller.

# 8. Abstraction Has Two Important Sides

Think about abstraction as:

```text
WHAT
```

versus:

```text
HOW
```

The abstraction usually focuses on:

```text
WHAT should be done?
```

The implementation focuses on:

```text
HOW should it be done?
```

Example:

```java
payment.pay(500);
```

The caller cares that payment happens.

The implementation decides how.

# 9. Abstraction Does Not Mean No Implementation

A common beginner mistake is:

```text
abstraction = no implementation
```

That is not correct.

An abstract class can contain both:

```text
abstract methods
+
concrete methods
```

Example:

```java
abstract class Animal {

    abstract void sound();

    void eat() {
        System.out.println(
            "Animal eats"
        );
    }
}
```

Here:

```text
sound()
→ no implementation in Animal

eat()
→ has an implementation
```

This is one reason abstract classes are useful.

# 10. Java's Main Tools for Abstraction

Java mainly provides:

```text
1. Abstract classes
2. Interfaces
```

Abstract classes can contain:

```text
abstract methods
concrete methods
fields
constructors
static members
final methods
```

Interfaces define contracts and can also contain several kinds of methods and fields under Java's modern rules.

Interfaces are covered in detail in Chapter 21.

# 11. The abstract Keyword

Java uses the keyword:

```java
abstract
```

It can be used with classes and methods.

Example abstract class:

```java
abstract class Animal {
}
```

Example abstract method:

```java
abstract void sound();
```

The meaning depends on where it is used.

# 12. Abstract Class

An abstract class is a class declared using:

```java
abstract
```

Example:

```java
abstract class Animal {

    void eat() {
        System.out.println(
            "Animal eats"
        );
    }
}
```

An abstract class can contain common state and behavior that subclasses can reuse.

# 13. Why Make a Class Abstract?

Sometimes a class represents a general concept but should not represent a complete concrete object by itself.

For example:

```text
Shape
Animal
Vehicle
Payment
Employee
Notification
```

These may be useful as general categories.

But the program may want concrete types such as:

```text
Circle
Dog
Car
CardPayment
Developer
EmailNotification
```

An abstract class lets us express:

> This is a common base concept, but subclasses must provide certain behavior.

# 14. Abstract Method

An abstract method is a method declared without a method body.

Example:

```java
abstract void sound();
```

Notice:

```text
no { }
```

An abstract method ends with:

```text
;
```

Example:

```java
abstract double area();
```

# 15. Abstract Method Example

```java
abstract class Animal {

    abstract void sound();
}
```

Here `Animal` says:

```text
Every concrete Animal subtype must provide sound().
```

But Animal itself does not specify the exact implementation.

# 16. Concrete Method

A concrete method has an implementation.

Example:

```java
void eat() {
    System.out.println(
        "Animal eats"
    );
}
```

An abstract class can contain both:

```text
abstract methods
concrete methods
```

Example:

```java
abstract class Animal {

    abstract void sound();

    void eat() {
        System.out.println(
            "Animal eats"
        );
    }
}
```

# 17. Concrete Class

A concrete class is a class that can be instantiated normally.

Example:

```java
class Dog {
}
```

If it has implemented all required abstract methods, a subclass of an abstract class can also become concrete.

Example:

```java
abstract class Animal {

    abstract void sound();
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Bark");
    }
}
```

Dog is concrete because it provides the required implementation.

# 18. Abstract Class Cannot Be Instantiated

You cannot directly create an object of an abstract class.

This is invalid:

```java
abstract class Animal {
}

Animal animal = new Animal();
```

The compiler rejects it.

Why?

Because an abstract class can represent an incomplete abstraction.

# 19. Why Can't We Create an Abstract Object?

Suppose:

```java
abstract class Shape {

    abstract double area();
}
```

If Java allowed:

```java
Shape s = new Shape();
```

what implementation should:

```java
s.area();
```

use?

The class does not define one.

Therefore, Java does not allow direct instantiation of an abstract class.

# 20. Abstract Reference Is Allowed

Although you cannot instantiate an abstract class directly, you can declare a reference of its type.

Example:

```java
Shape shape;
```

This is valid.

You can also write:

```java
Shape shape = new Circle();
```

if Circle extends Shape and is concrete.

This is extremely important:

```text
abstract class reference
→ allowed

abstract class object directly
→ not allowed
```

# 21. Abstract Class + Runtime Polymorphism

Example:

```java
abstract class Animal {

    abstract void sound();
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println(
            "Dog barks"
        );
    }
}

class Cat extends Animal {

    @Override
    void sound() {
        System.out.println(
            "Cat meows"
        );
    }
}
```

Now:

```java
Animal a1 = new Dog();
Animal a2 = new Cat();

a1.sound();
a2.sound();
```

Output:

```text
Dog barks
Cat meows
```

The abstract class provides the common abstraction while runtime polymorphism selects the concrete implementation.

# 22. Abstract Method Must Be Implemented

If a concrete class extends an abstract class, it must implement inherited abstract methods.

Example:

```java
abstract class Animal {

    abstract void sound();
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Bark");
    }
}
```

Dog implements `sound()`.

# 23. What If the Child Does Not Implement It?

Suppose:

```java
abstract class Animal {

    abstract void sound();
}

class Dog extends Animal {
}
```

Dog does not implement `sound()`.

Therefore Dog must also be declared abstract:

```java
abstract class Dog extends Animal {
}
```

A non-abstract subclass must implement all inherited abstract methods unless it inherits an implementation from somewhere appropriate.

# 24. Abstract Class Can Extend Another Abstract Class

Example:

```java
abstract class Animal {

    abstract void sound();
}

abstract class Mammal extends Animal {

    void breathe() {
        System.out.println(
            "Mammal breathes"
        );
    }
}
```

Mammal does not need to implement `sound()` because Mammal is also abstract.

A later concrete subclass can implement it.

# 25. Multilevel Abstract Hierarchy

```java
abstract class Animal {

    abstract void sound();
}

abstract class Mammal extends Animal {

    void breathe() {
        System.out.println(
            "Breathing"
        );
    }
}

class Dog extends Mammal {

    @Override
    void sound() {
        System.out.println(
            "Bark"
        );
    }
}
```

Now Dog becomes concrete.

It inherits:

```text
breathe()
```

and implements:

```text
sound()
```

# 26. Abstract Class Can Have Fields

Abstract classes can have instance fields.

Example:

```java
abstract class Employee {

    protected String name;

    Employee(String name) {
        this.name = name;
    }

    abstract double salary();
}
```

The abstract class can store common state while leaving specialized behavior to subclasses.

# 27. Why Fields Are Useful in Abstract Classes

Suppose every employee has:

```text
name
employeeId
department
```

but salary calculation differs.

An abstract class can store the common state:

```java
abstract class Employee {

    protected String name;

    Employee(String name) {
        this.name = name;
    }

    abstract double calculateSalary();
}
```

Subclasses then implement the specialized calculation.

# 28. Constructors in Abstract Classes

An abstract class can have constructors.

Example:

```java
abstract class Animal {

    protected String name;

    Animal(String name) {
        this.name = name;
    }
}
```

You still cannot write:

```java
new Animal("Dog");
```

because Animal is abstract.

But the constructor can run as part of constructing a concrete subclass.

# 29. Abstract Class Constructor Example

```java
abstract class Animal {

    protected String name;

    Animal(String name) {
        System.out.println(
            "Animal constructor"
        );

        this.name = name;
    }
}

class Dog extends Animal {

    Dog(String name) {
        super(name);

        System.out.println(
            "Dog constructor"
        );
    }
}
```

Now:

```java
Dog dog = new Dog("Bruno");
```

Output:

```text
Animal constructor
Dog constructor
```

The abstract parent constructor initializes the parent portion of the object.

# 30. Why Does an Abstract Constructor Run?

When a concrete subclass object is created, the superclass portion of that object must be initialized.

So:

```java
new Dog("Bruno");
```

causes the Dog construction process to invoke the Animal constructor.

The abstract class does not get instantiated as a separate object.

Its constructor initializes the inherited part of the actual Dog object.

# 31. Abstract Class and super()

A child constructor can call an abstract parent's constructor using:

```java
super(...)
```

Example:

```java
abstract class Employee {

    protected String name;

    Employee(String name) {
        this.name = name;
    }
}

class Developer extends Employee {

    Developer(String name) {
        super(name);
    }
}
```

This is normal constructor chaining.

# 32. Abstract Class Can Have Concrete Methods

Example:

```java
abstract class Animal {

    abstract void sound();

    void eat() {
        System.out.println(
            "Eating"
        );
    }

    void sleep() {
        System.out.println(
            "Sleeping"
        );
    }
}
```

Subclasses can reuse:

```text
eat()
sleep()
```

while implementing:

```text
sound()
```

# 33. Abstract Class Can Have static Members

An abstract class can have static fields and methods.

Example:

```java
abstract class Employee {

    static int count = 0;

    static void showCount() {
        System.out.println(count);
    }
}
```

Abstract does not mean every member must be abstract.

It only means the class itself cannot be directly instantiated.

# 34. Abstract Class Can Have final Methods

An abstract class can define final methods.

Example:

```java
abstract class Account {

    final void displayRules() {
        System.out.println(
            "Common account rules"
        );
    }

    abstract void withdraw(
        double amount
    );
}
```

The child must implement `withdraw()`, but cannot override `displayRules()`.

# 35. Abstract Class Can Have private Methods

Abstract classes can also have private methods.

A private method is an implementation detail of the abstract class.

Example:

```java
abstract class Report {

    private void logStart() {
        System.out.println(
            "Starting report"
        );
    }

    abstract void generate();
}
```

A child cannot override `logStart()` because private methods are not overridden.

# 36. Abstract Method Cannot Be private

An abstract method needs to be implemented by a subclass.

A private method cannot be inherited for overriding.

Therefore, this is invalid:

```java
abstract class Animal {

    private abstract void sound();
}
```

An abstract method must have a visibility that allows an appropriate subclass to implement the contract.

# 37. Abstract Method Cannot Be final

This is also invalid:

```java
abstract final void sound();
```

Why?

Because:

```text
abstract
→ must be implemented/overridden

final
→ cannot be overridden
```

The two requirements contradict each other.

# 38. Abstract Method Cannot Be static

An abstract method cannot be static.

Example:

```java
abstract static void show();
```

is invalid.

Why?

Abstract methods rely on implementation by subclasses through instance method overriding, while static methods belong to a class and are hidden rather than overridden.

# 39. Abstract Method Has No Body

Correct:

```java
abstract void sound();
```

Incorrect:

```java
abstract void sound() {
}
```

An abstract method declaration does not provide a body.

If you provide a body, it becomes a concrete method and should not be declared abstract.

# 40. Abstract Class Does Not Require Abstract Methods

An abstract class can contain zero abstract methods.

Example:

```java
abstract class UtilityBase {

    void show() {
        System.out.println(
            "Hello"
        );
    }
}
```

This is legal.

The class may be abstract simply because the designer wants to prevent direct instantiation or because the class represents an incomplete conceptual base.

# 41. Why Would We Make Such a Class Abstract?

One reason is to communicate design intent.

Suppose:

```java
abstract class BaseReport {
    void prepare() {
        ...
    }
}
```

The class may contain useful shared implementation but should not be created directly.

Declaring it abstract prevents:

```java
new BaseReport();
```

and tells readers:

> Use a concrete subclass.

# 42. Partial Abstraction

Abstract classes are often described in beginner material as supporting "partial abstraction."

The idea is that an abstract class can contain both:

```text
abstract behavior
+
implemented behavior
```

Example:

```java
abstract class Vehicle {

    abstract void start();

    void stop() {
        System.out.println(
            "Vehicle stopped"
        );
    }
}
```

Here:

```text
start()
→ subclass-specific

stop()
→ shared implementation
```

This is a useful mental model, although abstraction is broader than simply counting abstract methods.

# 43. Abstract Class as a Template

An abstract class can provide a common structure.

Example:

```java
abstract class Report {

    void prepare() {
        System.out.println(
            "Preparing data"
        );
    }

    abstract void export();
}
```

Every report follows:

```text
prepare
+
export
```

but different report types decide how export works.

# 44. Template-Style Example

```java
abstract class Report {

    final void generate() {

        prepareData();
        export();
    }

    void prepareData() {
        System.out.println(
            "Preparing data"
        );
    }

    abstract void export();
}
```

A subclass:

```java
class PdfReport extends Report {

    @Override
    void export() {
        System.out.println(
            "Exporting PDF"
        );
    }
}
```

Now:

```java
Report report = new PdfReport();

report.generate();
```

The common workflow stays in the parent while the variable part is supplied by the child.

# 45. Why final generate() Can Be Useful

In the previous example:

```java
final void generate()
```

prevents subclasses from replacing the overall workflow.

The child only supplies:

```java
export()
```

This design is often called the Template Method pattern.

The detailed design pattern is beyond this chapter, but the idea is valuable:

```text
parent controls common process
child supplies variable step
```

# 46. Abstract Class and Runtime Polymorphism

Consider:

```java
abstract class Payment {

    abstract void pay(double amount);
}

class CardPayment extends Payment {

    @Override
    void pay(double amount) {
        System.out.println(
            "Card: " + amount
        );
    }
}

class UpiPayment extends Payment {

    @Override
    void pay(double amount) {
        System.out.println(
            "UPI: " + amount
        );
    }
}
```

Now:

```java
Payment payment =
    new CardPayment();

payment.pay(500);
```

Output:

```text
Card: 500.0
```

The abstract type provides the common contract.

# 47. Multiple Subclasses

```java
abstract class Payment {

    abstract void pay(double amount);
}

class CardPayment extends Payment {

    @Override
    void pay(double amount) {
        System.out.println(
            "Card payment"
        );
    }
}

class UpiPayment extends Payment {

    @Override
    void pay(double amount) {
        System.out.println(
            "UPI payment"
        );
    }

class CashPayment extends Payment {

    @Override
    void pay(double amount) {
        System.out.println(
            "Cash payment"
        );
    }
}
```

Now:

```java
Payment[] payments = {
    new CardPayment(),
    new UpiPayment(),
    new CashPayment()
};
```

One abstraction represents many concrete forms.

# 48. Abstract Class vs Normal Class

A normal class can be instantiated if it is otherwise constructible:

```java
class Dog {
}

Dog dog = new Dog();
```

An abstract class cannot be directly instantiated:

```java
abstract class Animal {
}

Animal animal = new Animal();
```

The compiler rejects the second statement.

Both types can contain normal fields and methods, but an abstract class can additionally declare abstract methods.

# 49. Comparison Table — Abstract vs Concrete

| Feature | Abstract Class | Concrete Class |
|---|---|---|
| Declared with `abstract` | Yes | No |
| Direct object creation | No | Usually yes |
| Can have fields | Yes | Yes |
| Can have constructors | Yes | Yes |
| Can have concrete methods | Yes | Yes |
| Can have abstract methods | Yes | No requirement |
| Can have static members | Yes | Yes |
| Can have final methods | Yes | Yes |
| Can be parent of subclasses | Yes | Yes |

# 50. Abstract Class vs Interface — Basic Preview

Both can be used for abstraction and polymorphism.

A simplified comparison:

```text
Abstract class
→ shared base class
→ can hold instance state
→ can have constructors
→ can have concrete methods
→ can have abstract methods

Interface
→ primarily a contract/type
→ supports multiple interface implementation
→ can define abstract/default/static/private methods
→ does not use constructors
```

Java interfaces have evolved significantly, so avoid the old statement:

```text
"interfaces can only contain abstract methods"
```

That is no longer correct.

Chapter 21 covers interfaces in depth.

# 51. When Should You Prefer an Abstract Class?

An abstract class can be a good choice when subclasses:

```text
share meaningful state
share substantial implementation
belong to one natural class hierarchy
need common protected/internal behavior
need constructor-based initialization
```

Example:

```text
Employee
├── Developer
├── Manager
└── Designer
```

If these classes share:

```text
name
employeeId
common employee behavior
```

an abstract Employee base can be useful.

# 52. When Should You Prefer an Interface?

An interface is often preferable when you want to define a capability or contract that can apply across otherwise unrelated classes.

For example:

```text
Printable
Payable
Serializable
Comparable
Runnable
```

A class can implement multiple interfaces.

This makes interfaces especially useful for flexible contracts.

More details are in Chapter 21.

# 53. Abstract Class Example — Employee

```java
abstract class Employee {

    protected String name;

    Employee(String name) {
        this.name = name;
    }

    abstract double calculateSalary();

    void displayName() {
        System.out.println(
            "Employee: " + name
        );
    }
}
```

Child:

```java
class Developer extends Employee {

    Developer(String name) {
        super(name);
    }

    @Override
    double calculateSalary() {
        return 60000;
    }
}
```

Usage:

```java
Employee employee =
    new Developer("Aman");

employee.displayName();

System.out.println(
    employee.calculateSalary()
);
```

# 54. Abstract Class Example — Shape

```java
abstract class Shape {

    abstract double area();

    void describe() {
        System.out.println(
            "This is a shape"
        );
    }
}

class Circle extends Shape {

    private double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI *
               radius *
               radius;
    }
}

class Rectangle extends Shape {

    private double length;
    private double width;

    Rectangle(
        double length,
        double width
    ) {
        this.length = length;
        this.width = width;
    }

    @Override
    double area() {
        return length * width;
    }
}
```

# 55. Shape Polymorphism

```java
Shape s1 = new Circle(5);
Shape s2 = new Rectangle(10, 20);

System.out.println(
    s1.area()
);

System.out.println(
    s2.area()
);
```

The parent abstraction does not need to know the exact formula for every shape.

Each child provides its own implementation.

# 56. Abstract Class Example — Vehicle

```java
abstract class Vehicle {

    protected String brand;

    Vehicle(String brand) {
        this.brand = brand;
    }

    abstract void start();

    void showBrand() {
        System.out.println(
            "Brand: " + brand
        );
    }
}

class Car extends Vehicle {

    Car(String brand) {
        super(brand);
    }

    @Override
    void start() {
        System.out.println(
            "Car engine starts"
        );
    }
}

class Bike extends Vehicle {

    Bike(String brand) {
        super(brand);
    }

    @Override
    void start() {
        System.out.println(
            "Bike engine starts"
        );
    }
}
```

# 57. Abstract Class Example — Notification

```java
abstract class Notification {

    protected String recipient;

    Notification(String recipient) {
        this.recipient = recipient;
    }

    abstract void send(
        String message
    );

    void log() {
        System.out.println(
            "Notification for: " +
            recipient
        );
    }
}

class EmailNotification
        extends Notification {

    EmailNotification(String recipient) {
        super(recipient);
    }

    @Override
    void send(String message) {
        System.out.println(
            "Email: " + message
        );
    }
}
```

The abstract class stores common state while subclasses implement delivery behavior.

# 58. Abstract Class Example — Bank Account

```java
abstract class BankAccount {

    protected double balance;

    BankAccount(double balance) {
        this.balance = balance;
    }

    abstract void withdraw(
        double amount
    );

    void deposit(double amount) {

        if (amount > 0) {
            balance += amount;
        }
    }

    double getBalance() {
        return balance;
    }
}
```

A savings account and current account can provide different withdrawal rules.

# 59. Abstract Class Example — Storage

```java
abstract class Storage {

    abstract void save(String data);

    void logSave() {
        System.out.println(
            "Save operation started"
        );
    }
}

class FileStorage extends Storage {

    @Override
    void save(String data) {
        System.out.println(
            "Saving to file: " + data
        );
    }
}

class DatabaseStorage extends Storage {

    @Override
    void save(String data) {
        System.out.println(
            "Saving to database: " +
            data
        );
    }
}
```

The shared abstraction is:

```text
Storage
```

while implementation differs.

# 60. Abstract Class Example — Report

```java
abstract class Report {

    final void generate() {
        prepare();
        export();
    }

    void prepare() {
        System.out.println(
            "Preparing report"
        );
    }

    abstract void export();
}

class PdfReport extends Report {

    @Override
    void export() {
        System.out.println(
            "Exporting PDF"
        );
    }
}

class ExcelReport extends Report {

    @Override
    void export() {
        System.out.println(
            "Exporting Excel"
        );
    }
}
```

This is a strong example of abstract behavior plus shared concrete behavior.

# 61. Abstract Class Example — Game Character

```java
abstract class Character {

    protected String name;

    Character(String name) {
        this.name = name;
    }

    abstract void attack();

    void showName() {
        System.out.println(
            "Character: " + name
        );
    }
}

class Warrior extends Character {

    Warrior(String name) {
        super(name);
    }

    @Override
    void attack() {
        System.out.println(
            "Sword attack"
        );
    }
}

class Mage extends Character {

    Mage(String name) {
        super(name);
    }

    @Override
    void attack() {
        System.out.println(
            "Magic attack"
        );
    }
}
```

# 62. Abstract Class Example — Database Connection

A simplified abstraction could be:

```java
abstract class Database {

    abstract void connect();

    abstract void query(String sql);

    void close() {
        System.out.println(
            "Connection closed"
        );
    }
}
```

Concrete databases can implement:

```text
connect()
query()
```

while sharing:

```text
close()
```

This is a simplified educational example; real database APIs are more complex.

# 63. Abstract Method and Access Modifiers

An abstract method can have appropriate access modifiers.

Example:

```java
protected abstract void process();
```

A subclass can implement it with the same or broader visibility.

For example:

```java
@Override
public void process() {
}
```

But the subclass cannot reduce the visibility.

# 64. Abstract Methods and Return Types

The same overriding return-type rules apply.

Parent:

```java
abstract Number getValue();
```

Child:

```java
@Override
Integer getValue() {
    return 10;
}
```

This is valid because Integer is a subtype of Number.

The normal overriding rules still apply.

# 65. Abstract Methods and Exceptions

Overriding an abstract method follows the normal checked-exception rules.

For example:

```java
abstract class Reader {

    abstract void read()
        throws java.io.IOException;
}
```

A child may use a narrower checked exception, but cannot broaden the checked exception contract.

# 66. Abstract Class and final Class

A class cannot be both:

```java
abstract
```

and:

```java
final
```

because:

```text
abstract
→ intended to be subclassed

final
→ cannot be subclassed
```

These intentions conflict.

Therefore:

```java
abstract final class Example {
}
```

is invalid.

# 67. Abstract Class and private Constructor

An abstract class can have a private constructor.

Example:

```java
abstract class Base {

    private Base() {
        System.out.println(
            "Base constructor"
        );
    }
}
```

However, a subclass outside the class cannot call a private superclass constructor.

Therefore a private constructor affects which subclasses can be created and how the hierarchy is structured.

A protected or package-private constructor is often used when controlled subclass construction is intended.

# 68. Abstract Class and Protected Constructor

Example:

```java
abstract class Animal {

    protected Animal() {
    }
}

class Dog extends Animal {

    Dog() {
        super();
    }
}
```

This allows the subclass to invoke the parent constructor while preventing general public construction of the parent itself.

# 69. Abstract Class and Static Initialization

An abstract class can have static fields and static initialization.

Example:

```java
abstract class Base {

    static {
        System.out.println(
            "Base initialized"
        );
    }
}
```

When the class is initialized according to Java's class-initialization rules, its static initialization can execute.

The fact that the class is abstract does not prevent static initialization.

# 70. Abstract Class and Object Methods

An abstract class inherits methods from Object like other classes.

It can override methods such as:

```java
toString()
equals(Object)
hashCode()
```

Example:

```java
abstract class Employee {

    protected String name;

    @Override
    public String toString() {
        return "Employee{name='" +
               name + "'}";
    }
}
```

A concrete subclass can inherit that implementation or override it further.

# 71. Abstraction vs Encapsulation

These concepts are related but different.

Encapsulation focuses on:

```text
protecting internal state
controlling access
keeping implementation details inside the class
```

Abstraction focuses on:

```text
showing essential behavior
hiding unnecessary implementation complexity
defining useful contracts
```

Example:

```java
private double balance;
```

is strongly related to encapsulation.

```java
abstract void withdraw(double amount);
```

is strongly related to abstraction.

# 72. Abstraction vs Inheritance

Inheritance means:

```text
creating a parent-child relationship
```

Abstraction means:

```text
defining what is important while hiding unnecessary detail
```

Inheritance can be used to implement abstraction, but they are not the same concept.

For example:

```java
abstract class Shape
```

uses abstraction.

```java
class Circle extends Shape
```

uses inheritance.

# 73. Abstraction vs Polymorphism

Abstraction defines a common contract.

Polymorphism allows different implementations to be used through that common type.

Example:

```java
abstract class Animal {

    abstract void sound();
}
```

This defines the abstraction.

Then:

```java
Animal a = new Dog();
Animal b = new Cat();
```

and:

```java
a.sound();
b.sound();
```

demonstrate polymorphic behavior.

# 74. Four OOP Pillars Together

Consider a banking system.

Encapsulation:

```text
private balance
```

Inheritance:

```text
SavingsAccount extends BankAccount
```

Abstraction:

```text
abstract withdraw()
```

Polymorphism:

```java
BankAccount account =
    new SavingsAccount();

account.withdraw(500);
```

The four concepts often work together rather than existing as completely separate ideas.

# 75. Good Abstraction

A good abstraction should expose the behavior that users actually need.

For example:

```java
payment.pay(500);
```

is a useful abstraction for a caller.

The caller usually should not need:

```text
open network socket
build raw request
encrypt payload
parse low-level response
```

inside the calling code.

Good abstraction reduces unnecessary knowledge and complexity.

# 76. Bad Abstraction

An abstraction can be too complicated.

If a supposedly simple interface requires users to understand many unrelated details, it is not hiding enough complexity.

For example, instead of:

```java
payment.pay(500);
```

imagine forcing every caller to provide:

```text
network configuration
encryption configuration
retry settings
database transaction object
raw API headers
```

That may be a sign that the abstraction boundary is poorly designed.

Good abstraction hides details that callers should not need to manage.

# 77. Abstraction Should Match Responsibility

A class should expose behavior related to its responsibility.

For example:

```java
class BankAccount
```

might expose:

```text
deposit()
withdraw()
getBalance()
```

It should not necessarily expose unrelated internal operations.

This connects abstraction with:

```text
high cohesion
low coupling
good class design
```

which you will study further in Chapter 23.

# 78. Common Mistake — Abstract Means No Object Anywhere

Wrong:

```text
"An abstract class can never be involved in an object."
```

Correct:

```text
You cannot directly instantiate the abstract class.
```

But you can have:

```java
Animal animal = new Dog();
```

where Animal is abstract.

The actual object is Dog.

# 79. Common Mistake — Abstract Class Cannot Have Constructor

Wrong:

```text
"Abstract classes cannot have constructors."
```

Correct:

```text
Abstract classes can have constructors.
```

Those constructors execute during construction of concrete subclasses.

# 80. Common Mistake — Abstract Class Contains Only Abstract Methods

Wrong:

```text
"Every method in an abstract class must be abstract."
```

Correct:

An abstract class can contain:

```text
abstract methods
concrete methods
static methods
final methods
private methods
```

and fields.

# 81. Common Mistake — Abstract Method Has Body

Wrong:

```java
abstract void show() {
    System.out.println("Hello");
}
```

Correct abstract declaration:

```java
abstract void show();
```

If a method has a body, it is a concrete method and should not be declared abstract.

# 82. Common Mistake — private abstract Method

This is invalid:

```java
private abstract void show();
```

A private method cannot be overridden by subclasses, while an abstract method requires implementation by a subclass.

# 83. Common Mistake — final abstract Method

This is invalid:

```java
final abstract void show();
```

`final` says the method cannot be overridden.

`abstract` says the method must be implemented.

They conflict.

# 84. Common Mistake — static abstract Method

This is invalid:

```java
static abstract void show();
```

Static methods are not overridden in the normal instance-method sense.

Abstract methods require subclass implementation.

# 85. Common Mistake — Creating Abstract Object

This is invalid:

```java
abstract class Animal {
}

Animal a = new Animal();
```

You need a concrete subtype:

```java
class Dog extends Animal {
}

Animal a = new Dog();
```

# 86. Common Mistake — Forgetting Abstract Method Implementation

Given:

```java
abstract class Animal {

    abstract void sound();
}
```

This is not a complete concrete class:

```java
class Dog extends Animal {
}
```

Dog must either:

```text
implement sound()
```

or:

```text
also be abstract
```

# 87. Common Mistake — Confusing Abstraction with Hiding Everything

Abstraction does not mean every implementation detail must be inaccessible.

An abstract class can deliberately expose useful concrete behavior.

The goal is not:

```text
hide absolutely everything
```

The goal is:

```text
expose the right abstraction
hide unnecessary complexity
```

# 88. Common Mistake — Overusing Inheritance

Just because an abstract class is available does not mean every class should extend it.

Ask:

```text
Is there a genuine IS-A relationship?
```

If not, consider:

```text
composition
association
interface
another design
```

Good abstraction starts with good modeling.

# 89. Practical Program — Complete Shape System

```java
abstract class Shape {

    protected String color;

    Shape(String color) {
        this.color = color;
    }

    abstract double area();

    void showColor() {
        System.out.println(
            "Color: " + color
        );
    }
}

class Circle extends Shape {

    private double radius;

    Circle(
        String color,
        double radius
    ) {
        super(color);
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI *
               radius *
               radius;
    }
}

class Rectangle extends Shape {

    private double length;
    private double width;

    Rectangle(
        String color,
        double length,
        double width
    ) {
        super(color);
        this.length = length;
        this.width = width;
    }

    @Override
    double area() {
        return length * width;
    }
}

public class Main {

    public static void main(String[] args) {

        Shape[] shapes = {
            new Circle("Red", 5),
            new Rectangle(
                "Blue",
                10,
                20
            )
        };

        for (Shape shape : shapes) {

            shape.showColor();

            System.out.println(
                "Area: " +
                shape.area()
            );
        }
    }
}
```

This demonstrates:

```text
abstract class
constructor
field
abstract method
concrete method
inheritance
overriding
upcasting
runtime polymorphism
```

# 90. Practical Program — Employee Payroll

```java
abstract class Employee {

    protected String name;

    Employee(String name) {
        this.name = name;
    }

    abstract double salary();

    void showName() {
        System.out.println(
            "Name: " + name
        );
    }
}

class Developer extends Employee {

    Developer(String name) {
        super(name);
    }

    @Override
    double salary() {
        return 60000;
    }
}

class Manager extends Employee {

    Manager(String name) {
        super(name);
    }

    @Override
    double salary() {
        return 90000;
    }
}

public class Main {

    public static void main(String[] args) {

        Employee[] employees = {
            new Developer("Aman"),
            new Manager("Riya")
        };

        for (Employee employee : employees) {

            employee.showName();

            System.out.println(
                "Salary: " +
                employee.salary()
            );
        }
    }
}
```

The payroll code depends on the abstract Employee type rather than concrete classes.

# 91. Practical Program — Payment System

```java
abstract class Payment {

    protected String transactionId;

    Payment(String transactionId) {
        this.transactionId =
            transactionId;
    }

    abstract void pay(
        double amount
    );

    void printTransactionId() {
        System.out.println(
            "Transaction: " +
            transactionId
        );
    }
}

class CardPayment extends Payment {

    CardPayment(String id) {
        super(id);
    }

    @Override
    void pay(double amount) {
        System.out.println(
            "Card payment: " +
            amount
        );
    }
}

class UpiPayment extends Payment {

    UpiPayment(String id) {
        super(id);
    }

    @Override
    void pay(double amount) {
        System.out.println(
            "UPI payment: " +
            amount
        );
    }
}
```

# 92. Practical Program — Report Generator

```java
abstract class Report {

    final void generate() {

        loadData();
        format();
        export();
    }

    void loadData() {
        System.out.println(
            "Loading data"
        );
    }

    void format() {
        System.out.println(
            "Formatting data"
        );
    }

    abstract void export();
}

class PdfReport extends Report {

    @Override
    void export() {
        System.out.println(
            "Exporting PDF"
        );
    }
}

class ExcelReport extends Report {

    @Override
    void export() {
        System.out.println(
            "Exporting Excel"
        );
    }
}
```

Usage:

```java
Report report =
    new PdfReport();

report.generate();
```

Output:

```text
Loading data
Formatting data
Exporting PDF
```

# 93. Practical Program — Vehicle System

```java
abstract class Vehicle {

    protected String brand;

    Vehicle(String brand) {
        this.brand = brand;
    }

    abstract void start();

    void stop() {
        System.out.println(
            brand + " stopped"
        );
    }
}

class Car extends Vehicle {

    Car(String brand) {
        super(brand);
    }

    @Override
    void start() {
        System.out.println(
            brand + " car started"
        );
    }
}

class Bike extends Vehicle {

    Bike(String brand) {
        super(brand);
    }

    @Override
    void start() {
        System.out.println(
            brand + " bike started"
        );
    }
}
```

# 94. Practical Program — Game Characters

```java
abstract class Character {

    protected String name;

    Character(String name) {
        this.name = name;
    }

    abstract void attack();

    void display() {
        System.out.println(
            "Character: " + name
        );
    }
}

class Warrior extends Character {

    Warrior(String name) {
        super(name);
    }

    @Override
    void attack() {
        System.out.println(
            "Sword attack"
        );
    }
}

class Mage extends Character {

    Mage(String name) {
        super(name);
    }

    @Override
    void attack() {
        System.out.println(
            "Magic attack"
        );
    }
}
```

# 95. Practical Program — Storage System

```java
abstract class Storage {

    abstract void save(String data);

    void start() {
        System.out.println(
            "Storage operation started"
        );
    }
}

class FileStorage extends Storage {

    @Override
    void save(String data) {
        System.out.println(
            "File: " + data
        );
    }
}

class DatabaseStorage extends Storage {

    @Override
    void save(String data) {
        System.out.println(
            "Database: " + data
        );
    }
}

class CloudStorage extends Storage {

    @Override
    void save(String data) {
        System.out.println(
            "Cloud: " + data
        );
    }
}
```

# 96. Practical Program — Notification System

```java
abstract class Notification {

    protected String recipient;

    Notification(String recipient) {
        this.recipient = recipient;
    }

    abstract void send(
        String message
    );

    void log() {
        System.out.println(
            "Recipient: " + recipient
        );
    }
}

class EmailNotification
        extends Notification {

    EmailNotification(String recipient) {
        super(recipient);
    }

    @Override
    void send(String message) {
        System.out.println(
            "Email: " + message
        );
    }
}

class SmsNotification
        extends Notification {

    SmsNotification(String recipient) {
        super(recipient);
    }

    @Override
    void send(String message) {
        System.out.println(
            "SMS: " + message
        );
    }
}
```

# 97. Output Question 1

```java
abstract class Animal {

    abstract void sound();
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog");
    }
}

Animal a = new Dog();

a.sound();
```

Output:

```text
Dog
```

# 98. Output Question 2 — Constructor

```java
abstract class Animal {

    Animal() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {

    Dog() {
        System.out.println("Dog");
    }
}

new Dog();
```

Output:

```text
Animal
Dog
```

The abstract class constructor runs during construction of the Dog object.

# 99. Output Question 3 — Concrete Method

```java
abstract class Animal {

    abstract void sound();

    void eat() {
        System.out.println("Eat");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Bark");
    }
}

Animal a = new Dog();

a.eat();
a.sound();
```

Output:

```text
Eat
Bark
```

# 100. Output Question 4 — Runtime Polymorphism

```java
abstract class Shape {

    abstract void draw();
}

class Circle extends Shape {

    @Override
    void draw() {
        System.out.println("Circle");
    }
}

class Rectangle extends Shape {

    @Override
    void draw() {
        System.out.println("Rectangle");
    }
}

Shape[] shapes = {
    new Circle(),
    new Rectangle()
};

for (Shape shape : shapes) {
    shape.draw();
}
```

Output:

```text
Circle
Rectangle
```

# 101. Output Question 5 — super()

```java
abstract class Animal {

    Animal() {
        System.out.println("Animal constructor");
    }
}

class Dog extends Animal {

    Dog() {
        super();
        System.out.println("Dog constructor");
    }
}

new Dog();
```

Output:

```text
Animal constructor
Dog constructor
```

# 102. Compilation Question 6 — Abstract Object

```java
abstract class Animal {
}

Animal a = new Animal();
```

Result:

```text
Compilation error
```

An abstract class cannot be directly instantiated.

# 103. Compilation Question 7 — Missing Implementation

```java
abstract class Animal {

    abstract void sound();
}

class Dog extends Animal {
}
```

Result:

```text
Compilation error
```

Dog is concrete but has not implemented `sound()`.

# 104. Compilation Question 8 — Abstract Child

```java
abstract class Animal {

    abstract void sound();
}

abstract class Dog extends Animal {
}
```

This is valid.

Dog remains abstract and therefore does not need to implement `sound()` yet.

# 105. Compilation Question 9 — private abstract

```java
abstract class Animal {

    private abstract void sound();
}
```

Result:

```text
Compilation error
```

An abstract method cannot be private because it must be implemented by a subclass.

# 106. Compilation Question 10 — final abstract

```java
abstract class Animal {

    final abstract void sound();
}
```

Result:

```text
Compilation error
```

A method cannot simultaneously require overriding and forbid overriding.

# 107. Compilation Question 11 — static abstract

```java
abstract class Animal {

    static abstract void sound();
}
```

Result:

```text
Compilation error
```

Static methods are not abstract instance methods.

# 108. Output Question 12 — Shared State

```java
abstract class Employee {

    protected String name;

    Employee(String name) {
        this.name = name;
    }

    abstract void work();
}

class Developer extends Employee {

    Developer(String name) {
        super(name);
    }

    @Override
    void work() {
        System.out.println(
            name + " codes"
        );
    }
}

Employee e = new Developer("Aman");

e.work();
```

Output:

```text
Aman codes
```

# 109. Output Question 13 — Final Template

```java
abstract class Report {

    final void generate() {
        prepare();
        export();
    }

    void prepare() {
        System.out.println("Prepare");
    }

    abstract void export();
}

class PdfReport extends Report {

    @Override
    void export() {
        System.out.println("PDF");
    }
}

new PdfReport().generate();
```

Output:

```text
Prepare
PDF
```

# 110. Output Question 14 — Multiple Subclasses

```java
abstract class Animal {

    abstract void sound();
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Bark");
    }
}

class Cat extends Animal {

    @Override
    void sound() {
        System.out.println("Meow");
    }
}

Animal a1 = new Dog();
Animal a2 = new Cat();

a1.sound();
a2.sound();
```

Output:

```text
Bark
Meow
```

# 111. Output Question 15 — Abstract Reference

```java
abstract class Animal {

    abstract void sound();
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Bark");
    }
}

Animal animal;

animal = new Dog();

animal.sound();
```

Output:

```text
Bark
```

Declaring an abstract-class reference is allowed.

# 112. Interview Questions — Basics

## Q1. What is abstraction?

Abstraction exposes essential behavior while hiding unnecessary implementation details.

## Q2. What keyword is used to declare an abstract class?

```java
abstract
```

## Q3. Can an abstract class be instantiated?

No.

## Q4. Can an abstract class have constructors?

Yes.

## Q5. Can an abstract class have concrete methods?

Yes.

## Q6. Can an abstract class have fields?

Yes.

## Q7. Can an abstract class have static methods?

Yes.

## Q8. Can an abstract class have final methods?

Yes.

## Q9. Can an abstract class have zero abstract methods?

Yes.

## Q10. Can an abstract class be used as a reference type?

Yes.

# 113. Interview Questions — Abstract Methods

## Q11. What is an abstract method?

A method declared without an implementation body.

Example:

```java
abstract void sound();
```

## Q12. Who implements an abstract method?

A concrete subclass normally implements it.

## Q13. Can an abstract method have a body?

No.

## Q14. Can an abstract method be private?

No.

## Q15. Can an abstract method be final?

No.

## Q16. Can an abstract method be static?

No.

## Q17. What happens if a concrete subclass does not implement an abstract method?

The class must either implement it or itself be declared abstract.

# 114. Interview Questions — Constructors

## Q18. Why can an abstract class have a constructor?

Because its constructor initializes the superclass portion of a concrete subclass object.

## Q19. Can you call an abstract class constructor with new?

No.

## Q20. Does an abstract class constructor execute?

Yes, when a concrete subclass object is constructed and the superclass constructor is invoked.

## Q21. Does creating a Dog create a separate Animal object?

No. The Dog object contains the inherited state associated with the Animal superclass; constructor execution initializes the relevant superclass part.

# 115. Interview Questions — Polymorphism

## Q22. Can an abstract class support runtime polymorphism?

Yes.

Example:

```java
Animal a = new Dog();
```

## Q23. Why are abstract classes useful with polymorphism?

They define a common type and can require subclasses to provide specific behavior.

## Q24. Can an abstract class contain both abstract and concrete methods?

Yes.

## Q25. Is an abstract class the same as an interface?

No.

Both support abstraction, but they have different capabilities and design purposes.

# 116. Interview Questions — Abstract vs Interface

## Q26. When might an abstract class be better?

When subclasses share meaningful state, constructors, implementation, or a strong common base-class relationship.

## Q27. When might an interface be better?

When you primarily need a contract/capability that can be implemented by multiple otherwise unrelated classes, especially when multiple interfaces are useful.

## Q28. Can a class extend multiple abstract classes?

No.

Java classes have one direct superclass.

## Q29. Can a class implement multiple interfaces?

Yes.

This is one of the major differences between classes and interfaces.

# 117. Interview Questions — Design

## Q30. What is partial abstraction?

A common educational description of an abstract class that contains both abstract and concrete behavior.

## Q31. Is abstraction just hiding all code?

No.

It is about defining an appropriate level of detail and exposing what callers need.

## Q32. What is a good abstraction?

One that provides a clear, useful contract and hides implementation details that callers should not need to manage.

## Q33. Can abstract classes have private methods?

Yes.

## Q34. Can abstract classes have static members?

Yes.

# 118. Exercise 1 — Animal

Create:

```text
abstract Animal
Dog
Cat
Cow
```

Add:

```java
abstract void sound();
```

Implement it in all concrete subclasses.

Create:

```java
Animal[] animals
```

and call `sound()`.

# 119. Exercise 2 — Shape

Create:

```text
abstract Shape
Circle
Rectangle
Triangle
```

Add:

```java
abstract double area();
```

and:

```java
void describe()
```

Then process all shapes polymorphically.

# 120. Exercise 3 — Employee

Create:

```text
abstract Employee
Developer
Manager
Tester
Designer
```

Common fields:

```text
name
id
```

Abstract method:

```java
double calculateSalary();
```

Concrete method:

```java
void displayEmployee();
```

# 121. Exercise 4 — Payment

Create:

```text
abstract Payment
CardPayment
UpiPayment
CashPayment
WalletPayment
```

Define:

```java
abstract void pay(double amount);
```

Add a concrete method:

```java
void printReceipt();
```

Process payments through:

```java
Payment
```

# 122. Exercise 5 — Notification

Create:

```text
abstract Notification
EmailNotification
SmsNotification
PushNotification
```

Common field:

```text
recipient
```

Abstract:

```java
void send(String message);
```

Concrete:

```java
void log();
```

# 123. Exercise 6 — Vehicle

Create:

```text
abstract Vehicle
Car
Bike
Truck
```

Fields:

```text
brand
model
```

Abstract:

```java
void start();
```

Concrete:

```java
void stop();
```

# 124. Exercise 7 — Report Template

Create:

```text
abstract Report
PdfReport
ExcelReport
HtmlReport
```

Use:

```java
final void generate()
```

inside Report.

Make the workflow:

```text
prepare()
export()
```

where `export()` is abstract.

# 125. Exercise 8 — Storage

Create:

```text
abstract Storage
FileStorage
DatabaseStorage
CloudStorage
```

Add:

```java
abstract void save(String data);
```

and a shared concrete logging method.

# 126. Exercise 9 — Abstract Hierarchy

Create:

```text
abstract Animal
    ↓
abstract Mammal
    ↓
Dog
```

Animal should define:

```java
abstract void sound();
```

Mammal should define:

```java
void breathe();
```

Dog should implement:

```java
sound();
```

Test the complete inheritance chain.

# 127. Exercise 10 — Constructors

Create an abstract class with:

```text
field
constructor
abstract method
concrete method
```

Create a child class.

Observe the constructor execution order:

```text
parent constructor
child constructor
```

# 128. Exercise 11 — final Method

Create:

```java
abstract class Account
```

with:

```java
final void commonRule()
```

and:

```java
abstract void withdraw();
```

Try overriding both in the child.

Observe which one compiles.

# 129. Exercise 12 — Static Member

Create an abstract class with:

```java
static int count;
static void showCount();
```

Create several concrete subclasses.

Observe that the static member belongs to the abstract class type rather than each object having its own static copy.

# 130. Mini Project — Payment Engine

Build a payment engine using an abstract class.

Create:

```text
Payment
CardPayment
UpiPayment
WalletPayment
CashPayment
```

Payment should contain:

```text
transactionId
amount-related validation
common receipt logic
```

and an abstract:

```java
pay()
```

Create a payment processor that accepts:

```java
Payment
```

and uses runtime polymorphism.

# 131. Mini Project — Report Generator

Build:

```text
Report
PdfReport
ExcelReport
CsvReport
```

The abstract Report should define:

```java
final void generate()
```

with a common workflow:

```text
loadData
validateData
format
export
```

Make only the export step abstract initially.

Then improve the design by deciding which other steps actually need specialization.

# 132. Mini Project — Employee Payroll

Build an employee payroll system.

Abstract class:

```text
Employee
```

Concrete classes:

```text
Developer
Manager
Designer
Tester
SalesEmployee
```

Common state:

```text
name
employeeId
```

Abstract:

```java
double calculateSalary();
```

Concrete:

```java
void display();
```

Store all employees in an array or collection of Employee references.

# 133. Mini Project — Shape Engine

Build:

```text
Shape
Circle
Rectangle
Triangle
Square
```

Abstract methods:

```java
double area();
double perimeter();
```

Concrete method:

```java
void describe();
```

Process every shape through:

```java
Shape
```

and demonstrate runtime polymorphism.

# 134. Mini Project — Game Characters

Build:

```text
Character
Warrior
Mage
Archer
Healer
```

Common state:

```text
name
health
```

Abstract:

```java
void attack();
```

Concrete:

```java
void displayHealth();
```

Use:

```java
Character[]
```

to run a battle simulation.

# 135. Mini Project — Notification System

Build:

```text
Notification
EmailNotification
SmsNotification
PushNotification
```

Common state:

```text
recipient
```

Abstract:

```java
send()
```

Concrete:

```java
log()
```

Then create a notification manager that works with the abstract type.

# 136. Challenge 1 — Is This Legal?

```java
abstract class A {
}

A a;
```

Answer:

```text
Yes.
```

You can declare a reference to an abstract class.

# 137. Challenge 2 — Is This Legal?

```java
abstract class A {
}

A a = new A();
```

Answer:

```text
No.
```

An abstract class cannot be directly instantiated.

# 138. Challenge 3 — Is This Legal?

```java
abstract class A {

    abstract void show();
}

class B extends A {

    @Override
    void show() {
    }
}

A a = new B();
```

Answer:

```text
Yes.
```

This is standard abstract-class polymorphism.

# 139. Challenge 4 — Is This Legal?

```java
abstract class A {

    abstract void show();
}

class B extends A {
}
```

Answer:

```text
No, if B is intended to be concrete.
```

Either implement `show()` or declare B abstract.

# 140. Challenge 5 — Is This Legal?

```java
abstract class A {

    void show() {
        System.out.println("A");
    }
}

class B extends A {
}

A a = new B();

a.show();
```

Answer:

```text
Yes.
```

An abstract class can contain concrete methods.

# 141. Challenge 6 — Constructor

```java
abstract class A {

    A() {
        System.out.println("A");
    }
}

class B extends A {

    B() {
        System.out.println("B");
    }
}

new B();
```

Output:

```text
A
B
```

# 142. Challenge 7 — final + abstract

Can this exist?

```java
abstract final class A {
}
```

Answer:

```text
No.
```

The class cannot simultaneously require subclassing and forbid subclassing.

# 143. Challenge 8 — private + abstract

Can this exist?

```java
abstract class A {

    private abstract void show();
}
```

Answer:

```text
No.
```

A private method cannot be overridden by a subclass.

# 144. Challenge 9 — static + abstract

Can this exist?

```java
abstract class A {

    static abstract void show();
}
```

Answer:

```text
No.
```

Static methods do not use normal instance overriding.

# 145. Challenge 10 — Concrete Method

Can an abstract class have:

```java
final void show() {
}
```

Answer:

```text
Yes.
```

A final concrete method can be shared by subclasses and cannot be overridden.

# 146. Challenge 11 — Abstract Reference

Given:

```java
abstract class Animal {
    abstract void sound();
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Bark");
    }
}
```

Is this valid?

```java
Animal a = new Dog();
```

Yes.

Then:

```java
a.sound();
```

executes:

```text
Dog.sound()
```

# 147. Challenge 12 — Design

You have:

```text
Developer
Manager
Designer
```

They all share:

```text
name
employeeId
display()
```

but salary calculation differs.

A reasonable design is:

```java
abstract class Employee
```

with:

```java
abstract double calculateSalary();
```

and shared fields/methods.

This is a natural use of an abstract class.

# 148. Final Mental Model

Think of an abstract class as a partially defined parent concept.

For example:

```text
                 Shape
          abstract class
             /       \
            /         \
       Circle       Rectangle
          |              |
       area()           area()
```

Shape defines:

```text
what every Shape must provide
```

Circle and Rectangle define:

```text
how that behavior works
```

The caller can then use:

```java
Shape shape = new Circle();
```

without needing the caller to understand every implementation detail.

# 149. Abstraction Flow

```text
Real-world concept
        ↓
Identify important behavior
        ↓
Hide unnecessary implementation details
        ↓
Create an abstraction
        ↓
Abstract class / interface
        ↓
Concrete subclasses
        ↓
Specialized implementations
        ↓
Polymorphic use
```

For example:

```text
Payment
   ↓
CardPayment
UpiPayment
CashPayment
```

The application works with:

```java
Payment
```

while concrete classes decide how payment is performed.

# 150. Complete Abstraction Example

```java
abstract class Payment {

    protected String transactionId;

    Payment(String transactionId) {
        this.transactionId =
            transactionId;
    }

    final void process(double amount) {

        validate(amount);
        pay(amount);
        printReceipt(amount);
    }

    void validate(double amount) {

        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive"
            );
        }
    }

    abstract void pay(double amount);

    void printReceipt(double amount) {
        System.out.println(
            "Transaction: " +
            transactionId
        );

        System.out.println(
            "Amount: " + amount
        );
    }
}

class CardPayment extends Payment {

    CardPayment(String id) {
        super(id);
    }

    @Override
    void pay(double amount) {
        System.out.println(
            "Processing card payment"
        );
    }
}

class UpiPayment extends Payment {

    UpiPayment(String id) {
        super(id);
    }

    @Override
    void pay(double amount) {
        System.out.println(
            "Processing UPI payment"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Payment p1 =
            new CardPayment("TX1001");

        Payment p2 =
            new UpiPayment("TX1002");

        p1.process(500);
        p2.process(1000);
    }
}
```

This example contains many important ideas:

```text
abstract class
common state
constructor
concrete method
abstract method
final method
inheritance
overriding
upcasting
runtime polymorphism
validation
shared workflow
specialized implementation
```

The caller uses:

```java
Payment
```

instead of depending directly on every implementation.

# 151. Final Revision Notes

The core idea of abstraction is:

```text
WHAT
↓
expose important behavior

HOW
↓
hide unnecessary implementation details
```

In Java, abstract classes provide a powerful way to create a common base abstraction.

An abstract class:

```text
cannot be directly instantiated
can have constructors
can have fields
can have concrete methods
can have abstract methods
can have static members
can have final methods
can have private methods
can participate in polymorphism
```

An abstract method:

```text
has no body
must be implemented by a concrete subclass
cannot be private
cannot be final
cannot be static
```

A concrete subclass must implement inherited abstract methods unless the subclass is also abstract.

Remember:

```java
AbstractType value = new ConcreteType();
```

is valid and is a common pattern for runtime polymorphism.

# 152. Chapter Summary

You should now be comfortable with:

```text
✓ Meaning of abstraction
✓ WHAT vs HOW
✓ Real-world abstraction
✓ abstract keyword
✓ Abstract classes
✓ Abstract methods
✓ Concrete methods
✓ Concrete classes
✓ Abstract references
✓ Why abstract classes cannot be instantiated
✓ Constructors in abstract classes
✓ super() with abstract parents
✓ Fields in abstract classes
✓ static members
✓ final methods
✓ private methods
✓ Abstract method restrictions
✓ Concrete subclass implementation
✓ Abstract subclass
✓ Partial abstraction
✓ Template-style designs
✓ Runtime polymorphism
✓ Abstract classes vs normal classes
✓ Abstract classes vs interfaces
✓ Good abstraction design
✓ Common mistakes
```

# 153. Final Checklist

Before moving to Chapter 21, make sure you can answer:

```text
[ ] What is abstraction?
[ ] Why do we need abstraction?
[ ] What is an abstract class?
[ ] What is an abstract method?
[ ] What is a concrete method?
[ ] Can an abstract class have a constructor?
[ ] Can an abstract class have fields?
[ ] Can an abstract class have static methods?
[ ] Can an abstract class have final methods?
[ ] Can an abstract class have private methods?
[ ] Can an abstract class have zero abstract methods?
[ ] Can an abstract class be instantiated?
[ ] Can an abstract class be used as a reference type?
[ ] What happens if a concrete child does not implement an abstract method?
[ ] Can an abstract class extend another abstract class?
[ ] Why can't an abstract method be private?
[ ] Why can't an abstract method be final?
[ ] Why can't an abstract method be static?
[ ] How does abstraction work with polymorphism?
[ ] Difference between abstraction and encapsulation?
[ ] Difference between abstraction and inheritance?
[ ] Difference between abstraction and polymorphism?
[ ] When should you use an abstract class?
[ ] What is the basic difference between an abstract class and interface?
```

# 154. End of Chapter 20

The OOP progression is now:

```text
Chapter 11
OOP Fundamentals
        ↓
Chapter 12
Classes & Objects
        ↓
Chapter 13
Constructors
        ↓
Chapter 14
this & static
        ↓
Chapter 15
Encapsulation
        ↓
Chapter 16
Inheritance
        ↓
Chapter 17
Method Overloading
        ↓
Chapter 18
Method Overriding
        ↓
Chapter 19
Polymorphism
        ↓
Chapter 20
Abstraction
        ↓
Chapter 21
Interfaces
```

The next chapter focuses deeply on interfaces:

```text
interface
implements
interface methods
multiple interfaces
default methods
static methods
private interface methods
interface fields
interface inheritance
functional interfaces preview
abstract class vs interface
interface-based polymorphism
real-world interface design
```

This chapter will complete another major part of Java OOP.
