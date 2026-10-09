# Chapter 18 — Method Overriding

> **Java Master Course — Chapter 18 of 50**
>
> Method overriding is one of the most important concepts in Java OOP.
>
> It allows a child class to provide its own implementation of a method that it inherits from a parent class.
>
> It is the foundation of **runtime polymorphism** and **dynamic method dispatch**.

---

# 1. What You Will Learn

By the end of this chapter, you should understand:

```text
✓ What method overriding is
✓ Why overriding is needed
✓ Parent and child classes
✓ Rules of overriding
✓ @Override annotation
✓ Same method signature
✓ Return type rules
✓ Covariant return types
✓ Access modifier rules
✓ private methods
✓ final methods
✓ static methods and method hiding
✓ super.method()
✓ Runtime method dispatch
✓ Dynamic method dispatch
✓ Parent reference → child object
✓ Upcasting
✓ Downcasting connection
✓ Constructors and overriding
✓ Exception rules
✓ Abstract methods
✓ Interfaces and overriding
✓ Object methods
✓ toString()
✓ equals()
✓ Practical examples
✓ Common mistakes
✓ Exercises
✓ Output questions
✓ Interview questions
```

# 2. What Is Method Overriding?

Method overriding happens when a subclass provides its own implementation of an inherited instance method from its superclass.

Example:

```java
class Animal {

    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}
```

The parent class has:

```java
sound()
```

The child class provides its own version:

```java
sound()
```

The child method overrides the inherited parent method.

# 3. Simple Definition

> **Method overriding is the process in which a subclass provides a new implementation for an inherited instance method while keeping a compatible method signature.**

The overriding method replaces the inherited implementation for calls dispatched to the child object.

# 4. Why Do We Need Method Overriding?

Inheritance lets a child reuse behavior from a parent.

But sometimes the inherited behavior is too general.

For example:

```java
class Animal {

    void sound() {
        System.out.println("Some animal sound");
    }
}
```

A dog should behave differently:

```java
class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}
```

A cat can provide another implementation:

```java
class Cat extends Animal {

    @Override
    void sound() {
        System.out.println("Cat meows");
    }
}
```

The common operation is:

```text
sound()
```

but each child provides behavior appropriate to itself.

# 5. Basic Structure

The general structure is:

```java
class Parent {

    void method() {
        // parent implementation
    }
}

class Child extends Parent {

    @Override
    void method() {
        // child implementation
    }
}
```

The important relationship is:

```text
Parent
  ↑
  |
Child
```

The child inherits the method and then supplies a specialized implementation.

# 6. The Parent-Child Relationship

Overriding requires an inheritance relationship or another form of inherited contract such as an interface implementation.

Example:

```java
class Vehicle {

    void start() {
        System.out.println("Vehicle starts");
    }
}

class Car extends Vehicle {

    @Override
    void start() {
        System.out.println("Car starts with a key");
    }
}
```

`Car` is a `Vehicle`, so it can override the inherited `start()` method.

# 7. Same Method Name Is Not Enough

Two methods having the same name does not automatically mean overriding.

Example:

```java
class Parent {

    void show(int x) {
    }
}

class Child extends Parent {

    void show(double x) {
    }
}
```

This is **not overriding**.

It is overloading because:

```text
Parent → show(int)
Child  → show(double)
```

The parameter lists differ.

# 8. Overriding Requires Compatible Parameters

Suppose the parent has:

```java
void show(int x)
```

The child must use:

```java
void show(int x)
```

to override it.

This:

```java
void show(double x)
```

does not override it.

Remember:

```text
same method name
+
same compatible parameter types
+
inheritance
=
overriding
```

# 9. The @Override Annotation

Java provides the `@Override` annotation.

Example:

```java
class Animal {

    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog sound");
    }
}
```

`@Override` tells the compiler:

> "I intend this method to override an inherited method."

If it does not actually override a method, the compiler reports an error.

# 10. Why @Override Is Important

Consider:

```java
class Animal {

    void sound() {
    }
}

class Dog extends Animal {

    void soud() {
    }
}
```

The programmer intended to override `sound()`, but accidentally wrote:

```text
soud()
```

Without `@Override`, this can become an accidental new method.

With:

```java
@Override
void soud() {
}
```

the compiler detects the mistake.

Therefore:

> **Use `@Override` whenever you intentionally override a method.**

# 11. Method Signature in Overriding

For ordinary instance methods, compare:

```text
method name
parameter types
```

Example:

```java
void calculate(int x, double y)
```

must be overridden with the same parameter types:

```java
void calculate(int x, double y)
```

Changing the parameter types creates an overload rather than an override.

# 12. Return Type Must Be Compatible

An overriding method must have the same return type or a compatible covariant return type.

Example:

```java
class Parent {

    Number getValue() {
        return 10;
    }
}

class Child extends Parent {

    @Override
    Integer getValue() {
        return 20;
    }
}
```

This is valid because:

```text
Integer extends Number
```

So `Integer` is a covariant return type.

# 13. Covariant Return Type

A covariant return type allows an overriding method to return a subtype of the parent's return type.

Example:

```java
class Animal {
}

class Dog extends Animal {
}

class Parent {

    Animal createAnimal() {
        return new Animal();
    }
}

class Child extends Parent {

    @Override
    Dog createAnimal() {
        return new Dog();
    }
}
```

The child returns a more specific type.

This is called a **covariant return type**.

# 14. Primitive Return Types

Primitive return types cannot use covariance.

For example, if the parent returns:

```java
int
```

the child cannot override it with:

```java
long
```

Example:

```java
class Parent {

    int getValue() {
        return 10;
    }
}
```

This is not a valid override:

```java
class Child extends Parent {

    @Override
    long getValue() {
        return 10L;
    }
}
```

The return type must remain compatible, and primitive types do not form subtype relationships.

# 15. Access Modifiers and Overriding

An overriding method cannot reduce the accessibility of the inherited method.

Think of it as:

```text
Parent promises access
Child must not make that promise weaker
```

Example:

```java
class Parent {

    public void show() {
    }
}

class Child extends Parent {

    @Override
    public void show() {
    }
}
```

Valid.

But:

```java
class Child extends Parent {

    @Override
    protected void show() {
    }
}
```

is invalid because `protected` is less accessible than `public`.

# 16. Access Can Become Wider

An overriding method may use the same or a wider access level.

For example:

```text
protected → public
```

is allowed.

Example:

```java
class Parent {

    protected void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    @Override
    public void show() {
        System.out.println("Child");
    }
}
```

This is valid.

# 17. Access Modifier Order

From generally narrower to wider accessibility:

```text
private
package-private
protected
public
```

For overriding, the child cannot reduce inherited accessibility.

Examples:

```text
public → protected     ✗
public → package       ✗
protected → private    ✗
protected → public     ✓
package → protected    ✓
package → public       ✓
```

There are important details around package boundaries, but this is the correct beginner mental model.

# 18. Private Methods Are Not Overridden

A `private` method is not inherited by a subclass in the normal sense and cannot be overridden.

Example:

```java
class Parent {

    private void secret() {
        System.out.println("Parent secret");
    }
}

class Child extends Parent {

    private void secret() {
        System.out.println("Child secret");
    }
}
```

The Child method is not an override of the Parent method.

They are separate methods.

# 19. Why Private Methods Cannot Be Overridden

A private method is accessible only inside its declaring class.

The child does not have access to the parent's private method as an inherited method.

Therefore:

```text
private method
→ not overridden
```

This is an important interview question.

# 20. Static Methods Are Not Overridden

Static methods belong to the class rather than participating in instance-method runtime dispatch.

If a subclass declares a static method with the same signature as a static method in its parent, the method is **hidden**, not overridden.

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

This is method hiding.

# 21. Static Method Hiding Example

```java
Parent.show();
Child.show();
```

Output:

```text
Parent
Child
```

The selected static method depends on the class through which it is accessed, not on a runtime object in the same way as an overridden instance method.

# 22. Instance Method vs Static Method

Instance method:

```java
void show()
```

can participate in runtime overriding.

Static method:

```java
static void show()
```

is hidden rather than overridden.

Remember:

```text
instance method → overriding
static method   → hiding
```

# 23. final Methods Cannot Be Overridden

A method declared `final` cannot be overridden.

Example:

```java
class Parent {

    final void show() {
        System.out.println("Parent");
    }
}
```

This is invalid:

```java
class Child extends Parent {

    @Override
    void show() {
        System.out.println("Child");
    }
}
```

The compiler rejects it.

# 24. Why Use final Methods?

A `final` method is useful when the parent class wants to guarantee that subclasses cannot replace a particular behavior.

Example:

```java
class SecuritySystem {

    final void verifyCoreRules() {
        System.out.println(
            "Core security rules"
        );
    }
}
```

Subclasses may add behavior around the class, but they cannot replace this method through overriding.

# 25. final, static, and private — Remember This

Three important cases:

```text
final instance method
→ cannot be overridden

static method
→ hidden, not overridden

private method
→ not overridden
```

These are frequently asked in Java interviews.

# 26. super.method()

A child can call the parent's implementation using:

```java
super.method();
```

Example:

```java
class Animal {

    void sound() {
        System.out.println(
            "Animal sound"
        );
    }
}

class Dog extends Animal {

    @Override
    void sound() {

        super.sound();

        System.out.println(
            "Dog bark"
        );
    }
}
```

Output:

```text
Animal sound
Dog bark
```

# 27. Why Use super.method()?

It is useful when the child wants to:

```text
reuse parent behavior
+
add or modify behavior
```

Example:

```java
class Employee {

    void work() {
        System.out.println(
            "Employee works"
        );
    }
}

class Developer extends Employee {

    @Override
    void work() {

        super.work();

        System.out.println(
            "Developer writes code"
        );
    }
}
```

The child does not need to duplicate the parent's logic.

# 28. Overriding and super.method()

Suppose:

```java
class Parent {

    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    @Override
    void show() {
        System.out.println("Child");
    }

    void showParent() {
        super.show();
    }
}
```

Calling:

```java
Child c = new Child();

c.show();
c.showParent();
```

Output:

```text
Child
Parent
```

`super.show()` explicitly invokes the parent implementation.

# 29. Runtime Polymorphism

Method overriding enables runtime polymorphism.

Example:

```java
class Animal {

    void sound() {
        System.out.println(
            "Animal sound"
        );
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println(
            "Dog bark"
        );
    }
}
```

Now:

```java
Animal animal = new Dog();

animal.sound();
```

Output:

```text
Dog bark
```

Even though the reference type is `Animal`, the actual object is `Dog`.

# 30. Dynamic Method Dispatch

The runtime chooses the overridden instance method based on the actual object.

```text
Reference type:
Animal

Actual object:
Dog

Called method:
Dog.sound()
```

This runtime selection is commonly called:

> **Dynamic method dispatch**

# 31. The Most Important Diagram

```text
Animal animal
     |
     | reference
     v
+-----------+
|    Dog    |
|-----------|
| sound()   |
+-----------+

animal.sound()
       |
       v
Dog.sound()
```

The reference says what operations are available through the reference type.

The actual object determines which overridden instance implementation runs.

# 32. Parent Reference → Child Object

This is one of the most important OOP patterns:

```java
Animal animal = new Dog();
```

It is valid because:

```text
Dog IS-A Animal
```

This is called **upcasting**.

Now:

```java
animal.sound();
```

can execute the Dog implementation if `sound()` is overridden.

# 33. Upcasting

Upcasting means treating a child object as a parent type.

Example:

```java
Dog dog = new Dog();

Animal animal = dog;
```

or directly:

```java
Animal animal = new Dog();
```

The object remains a Dog.

Only the reference type changes.

# 34. Upcasting Does Not Change the Object

When:

```java
Animal animal = new Dog();
```

the object does not become an Animal.

It is still:

```text
Dog object
```

The reference is of type:

```text
Animal
```

This distinction is essential.

# 35. What Methods Can Be Called Through a Parent Reference?

Suppose:

```java
class Animal {

    void sound() {
    }
}

class Dog extends Animal {

    @Override
    void sound() {
    }

    void fetch() {
    }
}
```

Then:

```java
Animal animal = new Dog();
```

You can write:

```java
animal.sound();
```

But not:

```java
animal.fetch();
```

because `fetch()` is not declared in Animal.

# 36. But Which Implementation Runs?

For:

```java
animal.sound();
```

the compiler checks that `sound()` exists in Animal.

At runtime, because the actual object is Dog and Dog overrides `sound()`, Java dispatches to:

```java
Dog.sound()
```

This gives us:

```text
compile time:
Is sound() allowed through Animal?

runtime:
Which overridden implementation should execute?
```

# 37. Compile Time vs Runtime

This distinction is central to Java polymorphism.

```text
Compile time
→ checks reference type and method availability

Runtime
→ chooses overridden instance implementation
```

For:

```java
Animal animal = new Dog();
animal.sound();
```

compile time sees:

```text
Animal.sound()
```

runtime dispatches to:

```text
Dog.sound()
```

# 38. Downcasting

Downcasting means converting a parent reference back to a child reference.

Example:

```java
Animal animal = new Dog();

Dog dog = (Dog) animal;
```

Now:

```java
dog.fetch();
```

can be called if `fetch()` exists in Dog.

# 39. Safe Downcasting

Downcasting should be performed only when the actual object really is the target type.

Example:

```java
Animal animal = new Dog();

if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.fetch();
}
```

The `instanceof` check helps avoid an invalid cast.

# 40. Invalid Downcasting

Consider:

```java
Animal animal = new Cat();

Dog dog = (Dog) animal;
```

This compiles because Dog and Cat are related through Animal, but at runtime the actual object is a Cat.

The cast fails with:

```text
ClassCastException
```

Therefore, downcasting must reflect the actual object type.

# 41. Overriding and Constructors

Constructors are not overridden.

Why?

Constructors are used to initialize objects and have special construction rules.

A constructor is not an inherited instance method.

Therefore:

```text
constructors → cannot be overridden
```

They can be **overloaded**.

# 42. Constructor Calls During Inheritance

When creating a child object:

```java
new Child();
```

the parent constructor is involved in constructing the parent portion of the object.

Example:

```java
class Parent {

    Parent() {
        System.out.println("Parent constructor");
    }
}

class Child extends Parent {

    Child() {
        System.out.println("Child constructor");
    }
}
```

Creating:

```java
new Child();
```

prints:

```text
Parent constructor
Child constructor
```

# 43. Constructor vs Overridden Method

Do not confuse:

```text
constructor execution
```

with:

```text
method overriding
```

Constructors:

```text
initialize objects
are not inherited
cannot be overridden
can be overloaded
```

Methods:

```text
provide behavior
can be inherited
can be overridden when allowed
can be overloaded
```

# 44. Method Overriding and Exceptions

Exception rules are important when overriding methods.

For checked exceptions, an overriding method cannot introduce broader checked exceptions than the parent method permits.

Example:

```java
class Parent {

    void read() throws java.io.IOException {
    }
}

class Child extends Parent {

    @Override
    void read() throws java.io.FileNotFoundException {
    }
}
```

This is allowed because `FileNotFoundException` is a subclass of `IOException`.

# 45. Cannot Add a Broader Checked Exception

This is not allowed:

```java
class Parent {

    void read() throws java.io.IOException {
    }
}

class Child extends Parent {

    @Override
    void read() throws Exception {
    }
}
```

`Exception` is broader than `IOException`.

The child would be breaking the parent's checked-exception contract.

# 46. Runtime Exceptions

Unchecked exceptions do not follow the same restriction.

A child may throw runtime exceptions without the same checked-exception limitation.

For example:

```java
class Parent {

    void work() {
    }
}

class Child extends Parent {

    @Override
    void work() throws RuntimeException {
    }
}
```

This is allowed because `RuntimeException` is unchecked.

# 47. Abstract Methods and Overriding

An abstract method has no implementation in the abstract class.

Example:

```java
abstract class Animal {

    abstract void sound();
}
```

A concrete subclass must provide the implementation:

```java
class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog bark");
    }
}
```

This is a form of overriding an inherited abstract method contract.

# 48. Interfaces and Overriding

Interfaces also define method contracts.

Example:

```java
interface Payment {

    void pay();
}

class CardPayment implements Payment {

    @Override
    public void pay() {
        System.out.println(
            "Paid using card"
        );
    }
}
```

The implementing class supplies the required method implementation.

# 49. Why Interface Methods Often Use public

An interface method that is implicitly public must be implemented with public accessibility.

Correct:

```java
@Override
public void pay() {
}
```

Incorrect:

```java
@Override
void pay() {
}
```

The latter attempts to reduce accessibility.

# 50. Overriding Object Methods

Every Java class ultimately has `Object` as an ancestor unless the hierarchy has a different direct superclass.

Important methods include:

```text
toString()
equals(Object)
hashCode()
```

These can be overridden to provide class-specific behavior.

Example:

```java
class Student {

    private String name;

    Student(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{name='" +
               name + "'}";
    }
}
```

# 51. Overriding toString()

Without a useful override, printing an object may produce a class name plus a hash-like identifier.

Example:

```java
Student s = new Student("Aman");

System.out.println(s);
```

If `toString()` is overridden:

```text
Student{name='Aman'}
```

This makes objects much easier to inspect and debug.

# 52. Overriding equals()

A class can override:

```java
equals(Object)
```

to define logical equality.

Example concept:

```java
@Override
public boolean equals(Object obj) {
    // compare meaningful state
}
```

The parameter must be:

```java
Object
```

for an override of Object's method.

This is an important example of why exact parameter types matter.

# 53. Common Mistake with equals()

This does **not** override `Object.equals(Object)`:

```java
public boolean equals(Student other) {
    return true;
}
```

It creates an overload.

The correct overriding signature is:

```java
@Override
public boolean equals(Object other) {
    return true;
}
```

Using `@Override` immediately exposes the mistake.

# 54. Overriding hashCode()

If a class overrides `equals()`, it should also provide a consistent `hashCode()` implementation.

The general contract says:

> If two objects are equal according to `equals()`, they must have the same hash code.

This topic becomes especially important with collections such as HashMap and HashSet.

# 55. Practical Example — Animal Hierarchy

```java
class Animal {

    void sound() {
        System.out.println(
            "Some animal sound"
        );
    }

    void eat() {
        System.out.println(
            "Animal eats"
        );
    }
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

# 56. Animal Polymorphism

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

The same reference type:

```java
Animal
```

can point to different child objects.

The overridden method changes according to the actual object.

# 57. Practical Example — Vehicle

```java
class Vehicle {

    void start() {
        System.out.println(
            "Vehicle starts"
        );
    }
}

class Car extends Vehicle {

    @Override
    void start() {
        System.out.println(
            "Car engine starts"
        );
    }
}

class Bike extends Vehicle {

    @Override
    void start() {
        System.out.println(
            "Bike engine starts"
        );
    }
}
```

# 58. Vehicle Polymorphism

```java
Vehicle v1 = new Car();
Vehicle v2 = new Bike();

v1.start();
v2.start();
```

Output:

```text
Car engine starts
Bike engine starts
```

This is dynamic method dispatch.

# 59. Practical Example — Employee

```java
class Employee {

    void calculateSalary() {
        System.out.println(
            "Generic salary calculation"
        );
    }
}

class Developer extends Employee {

    @Override
    void calculateSalary() {
        System.out.println(
            "Developer salary calculation"
        );
    }
}

class Manager extends Employee {

    @Override
    void calculateSalary() {
        System.out.println(
            "Manager salary calculation"
        );
    }
}
```

Now:

```java
Employee e1 = new Developer();
Employee e2 = new Manager();

e1.calculateSalary();
e2.calculateSalary();
```

Output:

```text
Developer salary calculation
Manager salary calculation
```

# 60. Practical Example — Payment System

A common real-world design is:

```java
class Payment {

    void pay() {
        System.out.println(
            "Generic payment"
        );
    }
}

class UpiPayment extends Payment {

    @Override
    void pay() {
        System.out.println(
            "Paid using UPI"
        );
    }
}

class CardPayment extends Payment {

    @Override
    void pay() {
        System.out.println(
            "Paid using card"
        );
    }
}
```

Then:

```java
Payment payment =
    new UpiPayment();

payment.pay();
```

Output:

```text
Paid using UPI
```

# 61. Why This Design Is Powerful

The code using `Payment` does not need to know every concrete payment type.

It can work with:

```java
Payment
```

while Java dynamically selects:

```text
UpiPayment.pay()
CardPayment.pay()
```

This is one of the practical benefits of polymorphism.

# 62. Practical Example — Shape

```java
class Shape {

    void draw() {
        System.out.println(
            "Drawing shape"
        );
    }
}

class Circle extends Shape {

    @Override
    void draw() {
        System.out.println(
            "Drawing circle"
        );
    }
}

class Rectangle extends Shape {

    @Override
    void draw() {
        System.out.println(
            "Drawing rectangle"
        );
    }
}
```

Usage:

```java
Shape s1 = new Circle();
Shape s2 = new Rectangle();

s1.draw();
s2.draw();
```

# 63. Practical Example — Calling Parent Behavior

```java
class Employee {

    void work() {
        System.out.println(
            "Employee performs work"
        );
    }
}

class Developer extends Employee {

    @Override
    void work() {

        super.work();

        System.out.println(
            "Developer writes code"
        );
    }
}
```

Output:

```text
Employee performs work
Developer writes code
```

This combines overriding with `super.method()`.

# 64. Practical Example — Bank Account

```java
class BankAccount {

    void withdraw(double amount) {
        System.out.println(
            "Generic withdrawal: " +
            amount
        );
    }
}

class SavingsAccount extends BankAccount {

    @Override
    void withdraw(double amount) {
        System.out.println(
            "Savings withdrawal: " +
            amount
        );
    }
}

class CurrentAccount extends BankAccount {

    @Override
    void withdraw(double amount) {
        System.out.println(
            "Current withdrawal: " +
            amount
        );
    }
}
```

Now:

```java
BankAccount account =
    new SavingsAccount();

account.withdraw(500);
```

Output:

```text
Savings withdrawal: 500.0
```

# 65. Practical Example — Notification

```java
class Notification {

    void send(String message) {
        System.out.println(
            "Generic notification: " +
            message
        );
    }
}

class EmailNotification extends Notification {

    @Override
    void send(String message) {
        System.out.println(
            "Email: " + message
        );
    }
}

class SmsNotification extends Notification {

    @Override
    void send(String message) {
        System.out.println(
            "SMS: " + message
        );
    }
}
```

A caller can work with:

```java
Notification
```

without depending on the concrete implementation.

# 66. Practical Example — Template Style

```java
class Report {

    void generate() {
        System.out.println(
            "Generate report"
        );
    }

    void export() {
        System.out.println(
            "Export report"
        );
    }
}

class PdfReport extends Report {

    @Override
    void export() {
        System.out.println(
            "Export PDF"
        );
    }
}
```

The child reuses `generate()` and specializes `export()`.

# 67. Practical Example — Calling Multiple Overrides

```java
class Animal {

    void sound() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog");
    }
}

class Cat extends Animal {

    @Override
    void sound() {
        System.out.println("Cat");
    }
}

public class Main {

    public static void main(String[] args) {

        Animal[] animals = {
            new Dog(),
            new Cat(),
            new Dog()
        };

        for (Animal animal : animals) {
            animal.sound();
        }
    }
}
```

Output:

```text
Dog
Cat
Dog
```

This is a very practical demonstration of runtime polymorphism.

# 68. Overriding Rules — Complete List

For normal instance-method overriding:

```text
1. A parent-child relationship is required.

2. The child method must have the same method name.

3. Parameter types must match.

4. Return type must be the same or covariant.

5. Access cannot be reduced.

6. private methods are not overridden.

7. final methods cannot be overridden.

8. static methods are hidden, not overridden.

9. Constructors cannot be overridden.

10. @Override is strongly recommended.

11. Checked exceptions cannot be broadened.

12. Unchecked exceptions have fewer restrictions.

13. An overriding method participates in runtime dispatch.

14. The actual object determines the implementation used
    for an overridden instance method.

15. The reference type determines which members are
    available through the reference.
```

# 69. Overriding vs Overloading

This distinction must be completely clear.

```text
OVERLOADING
```

```java
add(int, int)
add(double, double)
add(int, int, int)
```

Different parameter lists.

Usually compile-time polymorphism.

---

```text
OVERRIDING
```

```java
class Parent {
    void show() {}
}

class Child extends Parent {
    @Override
    void show() {}
}
```

Same compatible parameter list.

Runtime dispatch for instance methods.

# 70. Comparison Table

| Feature | Overloading | Overriding |
|---|---|---|
| Main purpose | Same operation with different inputs | Child-specific behavior |
| Inheritance required | No | Yes |
| Method name | Same | Same |
| Parameters | Different | Same compatible types |
| Return type | Cannot distinguish overloads | Same or covariant |
| Resolution | Compile time | Runtime dispatch |
| Polymorphism | Compile-time | Runtime |
| Static methods | Can be overloaded | Hidden |
| Private methods | Can be overloaded | Not overridden |
| Final methods | Can be overloaded | Cannot be overridden |
| Constructors | Can be overloaded | Cannot be overridden |
| `@Override` | Not used | Recommended |

# 71. Very Important Example — Overload + Override

Consider:

```java
class Parent {

    void show(int x) {
        System.out.println(
            "Parent int"
        );
    }
}

class Child extends Parent {

    @Override
    void show(int x) {
        System.out.println(
            "Child int"
        );
    }

    void show(String x) {
        System.out.println(
            "Child String"
        );
    }
}
```

Here:

```text
show(int)
→ overriding

show(String)
→ overloading
```

One class can participate in both concepts at the same time.

# 72. Parent Reference with Overloading and Overriding

Consider:

```java
class Parent {

    void show(int x) {
        System.out.println(
            "Parent int"
        );

    }
}

class Child extends Parent {

    @Override
    void show(int x) {
        System.out.println(
            "Child int"
        );
    }

    void show(String x) {
        System.out.println(
            "Child String"
        );
    }
}
```

Now:

```java
Parent p = new Child();

p.show(10);
```

Output:

```text
Child int
```

But:

```java
p.show("Java");
```

does not compile because `show(String)` is not declared in Parent.

# 73. Why the Previous Example Matters

It demonstrates two separate rules:

```text
Which method signatures are available?
→ compile-time/reference type

Which overridden implementation runs?
→ runtime/actual object
```

So:

```java
Parent p = new Child();
```

does not make every Child-only method available.

But an overridden method declared in Parent can dispatch to Child.

# 74. Method Overriding and Encapsulation

Overriding works well with encapsulation.

A parent can expose a controlled method:

```java
void withdraw(double amount)
```

while keeping internal implementation details private.

A child can specialize the behavior without exposing internal fields.

This supports good object-oriented design.

# 75. Method Overriding and Abstraction

Abstraction and overriding often work together.

Example:

```java
abstract class Shape {

    abstract double area();
}
```

Each subclass overrides the abstract method:

```java
class Circle extends Shape {

    @Override
    double area() {
        return Math.PI * 5 * 5;
    }
}
```

The parent defines the contract.

The child defines the implementation.

# 76. Method Overriding and Interfaces

Interfaces are another major use case.

```java
interface Animal {

    void sound();
}

class Dog implements Animal {

    @Override
    public void sound() {
        System.out.println("Dog");
    }
}
```

The implementing class provides the required behavior.

This becomes especially powerful when many unrelated classes implement the same interface.

# 77. Method Overriding and Polymorphic Collections

You can store different child objects in a collection of the parent type.

Example:

```java
List<Animal> animals = new ArrayList<>();

animals.add(new Dog());
animals.add(new Cat());
```

Then:

```java
for (Animal animal : animals) {
    animal.sound();
}
```

Each object executes its own overridden implementation.

Collections and generics will be covered in later chapters.

# 78. Method Overriding and Dependency Injection Preview

A larger application can depend on a parent class or interface rather than one concrete implementation.

For example:

```java
Payment payment = new CardPayment();
```

Later:

```java
Payment payment = new UpiPayment();
```

The calling code can remain largely unchanged.

This is one of the foundations behind flexible object-oriented architecture.

# 79. Common Mistake — Different Parameters

Wrong assumption:

```java
class Parent {

    void show(int x) {
    }
}

class Child extends Parent {

    void show(double x) {
    }
}
```

This is overriding.

No.

It is overloading.

The parameter types are different.

# 80. Common Mistake — Return Type Only

This is not valid overriding:

```java
class Parent {

    int value() {
        return 1;
    }
}

class Child extends Parent {

    long value() {
        return 1L;
    }
}
```

Changing the return type from `int` to `long` does not create a valid override.

# 81. Common Mistake — Reducing Access

Parent:

```java
public void show() {
}
```

Child:

```java
protected void show() {
}
```

Invalid.

The child cannot reduce the visibility of the inherited method.

# 82. Common Mistake — Forgetting @Override

Technically, Java does not require `@Override`.

But omitting it can hide mistakes.

Prefer:

```java
@Override
public void show() {
}
```

instead of silently relying on the compiler to infer your intention.

# 83. Common Mistake — Overriding static Methods

This is not runtime overriding:

```java
class Parent {
    static void show() {}
}

class Child extends Parent {
    static void show() {}
}
```

It is:

```text
method hiding
```

Static methods do not use normal instance-method dynamic dispatch.

# 84. Common Mistake — Overriding private Methods

This:

```java
private void show()
```

cannot be overridden.

A same-signature private method in the child is a separate method.

# 85. Common Mistake — Overriding final Methods

If the parent says:

```java
final void show() {
}
```

the child cannot replace it with:

```java
@Override
void show() {
}
```

Compilation fails.

# 86. Common Mistake — Constructors

Constructors are not overridden.

These are separate constructors:

```java
Parent()
Child()
```

A child constructor can call the parent constructor using:

```java
super();
```

but this is constructor chaining, not method overriding.

# 87. Common Mistake — Confusing Reference Type and Object Type

Given:

```java
Animal animal = new Dog();
```

Remember:

```text
reference type = Animal
actual object = Dog
```

The reference type controls what methods can be called through the variable.

The actual object controls which overridden instance implementation executes.

# 88. Common Mistake — Assuming Child-Only Methods Are Available

Given:

```java
Animal animal = new Dog();
```

and Dog has:

```java
void fetch()
```

this is invalid:

```java
animal.fetch();
```

unless `fetch()` is declared in Animal.

You need a Dog reference, usually through a safe downcast, to call it.

# 89. Common Mistake — Unsafe Downcasting

Do not blindly write:

```java
Dog dog = (Dog) animal;
```

unless you know the actual object is a Dog.

Safer:

```java
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.fetch();
}
```

Modern Java also provides pattern matching forms for `instanceof`, discussed later.

# 90. Common Mistake — equals() Signature

Wrong:

```java
boolean equals(Student student)
```

This overloads rather than overrides `Object.equals(Object)`.

Correct:

```java
@Override
public boolean equals(Object obj)
```

Use `@Override` to catch this class of error.

# 91. Common Mistake — Broader Checked Exception

Parent:

```java
void read() throws IOException
```

Child cannot write:

```java
@Override
void read() throws Exception
```

because `Exception` is broader.

The child must respect the parent's checked-exception contract.

# 92. Common Mistake — Assuming Runtime Dispatch Applies Everywhere

Dynamic dispatch applies to overridden instance methods.

It does not mean every Java member is dynamically selected.

For example:

```text
instance overridden method → dynamic dispatch

static method → class-based hiding

field access → not overridden/dynamically dispatched
```

Fields are resolved differently from methods.

# 93. Important: Fields Are Not Overridden

Suppose:

```java
class Parent {

    int value = 10;
}

class Child extends Parent {

    int value = 20;
}
```

These fields are not overridden.

They are hidden fields.

This differs from method overriding.

Methods use dynamic dispatch when overridden; fields do not work that way.

# 94. Field Hiding vs Method Overriding

Example:

```java
class Parent {

    int value = 10;

    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    int value = 20;

    @Override
    void show() {
        System.out.println("Child");
    }
}
```

Now:

```java
Parent p = new Child();

System.out.println(p.value);
p.show();
```

Output:

```text
10
Child
```

This is extremely important.

```text
field access → based on reference type

overridden instance method → runtime dispatch
```

# 95. Deep Understanding — Two Questions

Whenever you see:

```java
Parent p = new Child();
```

ask two questions.

Question 1:

```text
What members can I access through p?
```

Answer:

```text
based on Parent's visible members
```

Question 2:

```text
For an overridden instance method, which implementation runs?
```

Answer:

```text
based on the actual Child object
```

This mental model solves many polymorphism questions.

# 96. Practical Program — Notification Manager

```java
class Notification {

    void send(String message) {
        System.out.println(
            "Sending notification: " +
            message
        );
    }
}

class EmailNotification
        extends Notification {

    @Override
    void send(String message) {
        System.out.println(
            "Sending email: " + message
        );
    }
}

class SmsNotification
        extends Notification {

    @Override
    void send(String message) {
        System.out.println(
            "Sending SMS: " + message
        );
    }
}

public class Main {

    static void notifyUser(
        Notification notification,
        String message
    ) {
        notification.send(message);
    }

    public static void main(String[] args) {

        notifyUser(
            new EmailNotification(),
            "Welcome"
        );

        notifyUser(
            new SmsNotification(),
            "Your OTP is 1234"
        );
    }
}
```

The method:

```java
notifyUser(Notification, String)
```

works with different concrete notification types.

The overridden `send()` method is selected at runtime.

# 97. Practical Program — Payment Processor

```java
abstract class Payment {

    abstract void pay(double amount);
}

class CardPayment extends Payment {

    @Override
    void pay(double amount) {
        System.out.println(
            "Card payment: " + amount
        );
    }
}

class UpiPayment extends Payment {

    @Override
    void pay(double amount) {
        System.out.println(
            "UPI payment: " + amount
        );
    }
}

class CashPayment extends Payment {

    @Override
    void pay(double amount) {
        System.out.println(
            "Cash payment: " + amount
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Payment[] payments = {
            new CardPayment(),
            new UpiPayment(),
            new CashPayment()
        };

        for (Payment payment : payments) {
            payment.pay(500);
        }
    }
}
```

Output:

```text
Card payment: 500.0
UPI payment: 500.0
Cash payment: 500.0
```

This combines:

```text
abstraction
inheritance
overriding
runtime polymorphism
```

# 98. Practical Program — Shape Processor

```java
abstract class Shape {

    abstract double area();

    void printArea() {
        System.out.println(
            "Area = " + area()
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

The parent supplies:

```java
printArea()
```

while subclasses supply:

```java
area()
```

This is a classic polymorphic design.

# 99. Practical Program — Using super() and super.method()

```java
class Person {

    protected String name;

    Person(String name) {
        this.name = name;
    }

    void introduce() {
        System.out.println(
            "Name: " + name
        );
    }
}

class Student extends Person {

    private int rollNo;

    Student(
        String name,
        int rollNo
    ) {
        super(name);
        this.rollNo = rollNo;
    }

    @Override
    void introduce() {

        super.introduce();

        System.out.println(
            "Roll No: " + rollNo
        );
    }
}
```

This demonstrates:

```text
super(...)
→ parent constructor

super.introduce()
→ parent method
```

# 100. Practical Program — Real-World Reporting

```java
class Report {

    void generate() {
        System.out.println(
            "Preparing report data"
        );
    }

    void export() {
        System.out.println(
            "Exporting generic report"
        );
    }
}

class PdfReport extends Report {

    @Override
    void export() {
        System.out.println(
            "Exporting PDF report"
        );
    }
}

class ExcelReport extends Report {

    @Override
    void export() {
        System.out.println(
            "Exporting Excel report"
        );
    }
}

public class Main {

    static void createReport(
        Report report
    ) {
        report.generate();
        report.export();
    }

    public static void main(String[] args) {

        createReport(new PdfReport());

        createReport(new ExcelReport());
    }
}
```

The same method accepts:

```text
PdfReport
ExcelReport
```

through the parent type.

# 101. Output Questions — Basic

## Question 1

```java
class Parent {

    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    @Override
    void show() {
        System.out.println("Child");
    }
}

Child c = new Child();

c.show();
```

Output:

```text
Child
```

# 102. Output Question 2

```java
Parent p = new Child();

p.show();
```

Output:

```text
Child
```

The actual object is Child and `show()` is overridden.

# 103. Output Question 3

```java
class Parent {

    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    @Override
    void show() {

        super.show();

        System.out.println("Child");
    }
}

new Child().show();
```

Output:

```text
Parent
Child
```

# 104. Output Question 4

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

Parent p = new Child();

p.show();
```

Output:

```text
Parent
```

This is static method hiding, not runtime overriding.

# 105. Output Question 5

```java
class Parent {

    int value = 10;
}

class Child extends Parent {

    int value = 20;
}

Parent p = new Child();

System.out.println(p.value);
```

Output:

```text
10
```

Fields are hidden rather than overridden.

# 106. Output Question 6

```java
class Parent {

    void show(int x) {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    void show(double x) {
        System.out.println("Child");
    }
}

Child c = new Child();

c.show(10);
```

Output:

```text
Parent
```

The inherited `show(int)` is used because `10` is an int and the Child method is `show(double)`.

# 107. Output Question 7

```java
class Parent {

    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    @Override
    void show() {
        System.out.println("Child");
    }
}

Parent p = new Child();

p.show();
```

Output:

```text
Child
```

# 108. Output Question 8

```java
class Animal {

    void sound() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog");
    }
}

class Cat extends Animal {

    @Override
    void sound() {
        System.out.println("Cat");
    }
}

Animal[] animals = {
    new Dog(),
    new Cat(),
    new Dog()
};

for (Animal animal : animals) {
    animal.sound();
}
```

Output:

```text
Dog
Cat
Dog
```

# 109. Output Question 9

```java
class Parent {

    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    @Override
    void show() {
        System.out.println("Child");
    }

    void test() {
        super.show();
        show();
    }
}

new Child().test();
```

Output:

```text
Parent
Child
```

# 110. Output Question 10

```java
class Parent {

    Number get() {
        return 10;
    }
}

class Child extends Parent {

    @Override
    Integer get() {
        return 20;
    }
}

Parent p = new Child();

System.out.println(p.get());
```

Output:

```text
20
```

The child override is selected at runtime.

# 111. Compilation Question 11

```java
class Parent {

    public void show() {
    }
}

class Child extends Parent {

    @Override
    protected void show() {
    }
}
```

Result:

```text
Compilation error
```

The child reduces access from `public` to `protected`.

# 112. Compilation Question 12

```java
class Parent {

    final void show() {
    }
}

class Child extends Parent {

    @Override
    void show() {
    }
}
```

Result:

```text
Compilation error
```

A final method cannot be overridden.

# 113. Compilation Question 13

```java
class Parent {

    private void show() {
    }
}

class Child extends Parent {

    @Override
    private void show() {
    }
}
```

Result:

```text
Compilation error
```

The parent private method is not an overridable inherited method.

# 114. Compilation Question 14

```java
class Parent {

    void show() throws java.io.IOException {
    }
}

class Child extends Parent {

    @Override
    void show() throws Exception {
    }
}
```

Result:

```text
Compilation error
```

The child introduces a broader checked exception.

# 115. Compilation Question 15

```java
class Parent {

    void show(int x) {
    }
}

class Child extends Parent {

    @Override
    void show(double x) {
    }
}
```

Result:

```text
Compilation error
```

The `@Override` annotation is correct only when an actual override exists.

Here the method is an overload, not an override.

# 116. Interview Questions — Basic

## Q1. What is method overriding?

It is when a subclass provides its own implementation of an inherited instance method with the same compatible parameter types.

## Q2. Why is method overriding used?

It allows subclasses to provide specialized behavior while keeping a common parent abstraction.

## Q3. What annotation is recommended for overriding?

```java
@Override
```

## Q4. Is @Override mandatory?

No, but it is strongly recommended because it lets the compiler verify your intention.

## Q5. Is inheritance required for overriding?

Yes, for ordinary superclass method overriding.

## Q6. Can constructors be overridden?

No.

## Q7. Can constructors be overloaded?

Yes.

## Q8. Can static methods be overridden?

No. Static methods are hidden.

## Q9. Can private methods be overridden?

No.

## Q10. Can final methods be overridden?

No.

# 117. Interview Questions — Return Types

## Q11. Can the return type be different when overriding?

It must be the same or covariant for reference types.

## Q12. What is a covariant return type?

It is a return type in the child method that is a subtype of the parent's return type.

## Q13. Can int be changed to long while overriding?

No.

## Q14. Can Number be changed to Integer?

Yes, because Integer is a subtype of Number.

## Q15. Can an overriding method return a broader type?

No. The child cannot widen a reference return type.

# 118. Interview Questions — Access

## Q16. Can an overriding method reduce visibility?

No.

## Q17. Can protected become public?

Yes.

## Q18. Can package-private become protected?

Yes, where the declarations and package rules permit the broader access.

## Q19. Can public become protected?

No.

## Q20. Can a private parent method be overridden?

No.

# 119. Interview Questions — Exceptions

## Q21. Can a child throw a broader checked exception?

No.

## Q22. Can the child throw a narrower checked exception?

Yes.

## Q23. Can the child throw unchecked exceptions?

Yes, unchecked exceptions are not subject to the same checked-exception restriction.

# 120. Interview Questions — Polymorphism

## Q24. What is runtime polymorphism?

It is the ability to use a parent type while the runtime selects the overridden implementation belonging to the actual child object.

## Q25. What is dynamic method dispatch?

It is the runtime mechanism that selects an overridden instance method based on the actual object.

## Q26. What does this mean?

```java
Animal a = new Dog();
```

The reference type is Animal, but the actual object is Dog.

## Q27. Which method runs?

If `sound()` is overridden, `Dog.sound()` runs.

## Q28. Which members are available through `a`?

Members accessible through the Animal reference type.

# 121. Interview Questions — Overload vs Override

## Q29. What is the biggest difference between overloading and overriding?

Overloading changes the parameter list and is resolved at compile time.

Overriding provides a child implementation of an inherited instance method and participates in runtime dispatch.

## Q30. Can a child method with different parameters override a parent method?

No. It overloads it.

## Q31. Can overloading and overriding exist together?

Yes.

## Q32. Can a static method be overloaded?

Yes.

## Q33. Can a static method be overridden?

No. It is hidden.

# 122. Interview Questions — super

## Q34. What does super.method() do?

It explicitly calls the parent implementation of an inherited instance method.

## Q35. Why use super.method()?

To reuse parent behavior and then add or modify behavior in the child.

## Q36. What is super()?

It invokes a parent constructor during child construction.

It is not related to method overriding itself, although it belongs to inheritance and constructor chaining.

# 123. Interview Questions — Fields

## Q37. Are fields overridden?

No. Fields are hidden rather than overridden.

## Q38. Are overridden methods and fields dynamically dispatched in the same way?

No.

Instance methods can participate in dynamic dispatch.

Fields are resolved based on the reference type.

# 124. Interview Questions — Object

## Q39. Which important Object methods are commonly overridden?

Common examples include:

```text
toString()
equals(Object)
hashCode()
```

## Q40. Why use @Override on equals()?

To ensure the method really overrides `Object.equals(Object)` instead of accidentally creating an overload.

# 125. Exercise 1 — Animal Hierarchy

Create:

```text
Animal
Dog
Cat
Cow
```

Parent:

```java
void sound()
```

Override `sound()` in every child.

Create:

```java
Animal[] animals
```

and call `sound()` for every object.

# 126. Exercise 2 — Vehicle

Create:

```text
Vehicle
Car
Bike
Truck
```

Parent method:

```java
void start()
```

Override it in each child.

Use:

```java
Vehicle[] vehicles
```

to demonstrate runtime polymorphism.

# 127. Exercise 3 — Payment

Create:

```text
Payment
CardPayment
UpiPayment
CashPayment
```

Parent:

```java
void pay(double amount)
```

Override it in each child.

Write a method:

```java
processPayment(Payment payment)
```

and call it with different child objects.

# 128. Exercise 4 — Notification

Create:

```text
Notification
EmailNotification
SmsNotification
PushNotification
```

Override:

```java
void send(String message)
```

Then store them in:

```java
Notification[]
```

and send a common message.

# 129. Exercise 5 — Shape

Create:

```text
Shape
Circle
Rectangle
Triangle
```

Parent:

```java
double area()
```

Override it in every child.

Use:

```java
Shape[]
```

and calculate all areas polymorphically.

# 130. Exercise 6 — Employee

Create:

```text
Employee
Developer
Manager
Designer
Tester
```

Override:

```java
void work()
```

and:

```java
double calculateSalary()
```

Use an Employee reference for every object.

# 131. Exercise 7 — super.method()

Create:

```text
Person
Student
```

Parent:

```java
void introduce()
```

Child should override it and call:

```java
super.introduce();
```

Then print student-specific information.

# 132. Exercise 8 — Covariant Return Type

Create:

```text
Animal
Dog
```

Parent:

```java
Animal create()
```

Child:

```java
Dog create()
```

Use the covariant return type correctly.

# 133. Exercise 9 — Access Modifiers

Create a parent class with methods using:

```text
protected
public
```

Override them in a child.

Try reducing their visibility.

Observe the compiler errors.

Then make the child methods more accessible.

# 134. Exercise 10 — final

Create a parent class with:

```java
final void importantRule()
```

Try overriding it in the child.

Explain why the compiler rejects the code.

# 135. Exercise 11 — Static Hiding

Create:

```java
Parent.show()
Child.show()
```

where both are static.

Test:

```java
Parent.show();
Child.show();
```

Then use references and observe why this is hiding rather than overriding.

# 136. Exercise 12 — equals()

Create a Student class with:

```text
id
name
```

Override:

```java
equals(Object)
hashCode()
toString()
```

Use `@Override` on all three.

Later, test the class with HashSet.

# 137. Mini Project — Payment Gateway

Build a small payment system.

Create:

```text
Payment
CardPayment
UpiPayment
WalletPayment
CashPayment
```

Each class overrides:

```java
pay(double amount)
```

Create:

```java
PaymentProcessor
```

with:

```java
void process(Payment payment)
```

The processor should not need to know the exact child type.

Demonstrate runtime polymorphism.

# 138. Mini Project — Notification System

Create a notification system with:

```text
Notification
EmailNotification
SmsNotification
PushNotification
```

Each class overrides:

```java
send(String message)
```

Create a list of notifications and send a message through every object.

The goal is to practice:

```text
inheritance
overriding
upcasting
runtime polymorphism
```

# 139. Mini Project — Shape Drawing System

Create:

```text
Shape
Circle
Rectangle
Triangle
```

Every shape overrides:

```java
draw()
area()
```

Store them in:

```java
Shape[]
```

and process them in a loop.

Add a method:

```java
void processShape(Shape shape)
```

to demonstrate programming against the parent abstraction.

# 140. Mini Project — Employee Payroll

Create:

```text
Employee
Developer
Manager
SalesEmployee
Intern
```

Override:

```java
double calculateSalary()
```

and optionally:

```java
void work()
```

Store all employees as:

```java
Employee[]
```

and calculate their salaries polymorphically.

# 141. Mini Project — E-Commerce Order

Create:

```text
Order
OnlineOrder
StoreOrder
SubscriptionOrder
```

Parent:

```java
void process()
```

Each child overrides `process()` differently.

Write:

```java
void processOrder(Order order)
```

and pass different child objects.

This simulates a real application design using runtime polymorphism.

# 142. Challenge — Predict the Result

```java
class Parent {

    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    @Override
    void show() {
        System.out.println("Child");
    }
}

Parent p = new Child();

p.show();
```

Answer:

```text
Child
```

Reason:

```text
actual object = Child
show() is overridden
runtime dispatch → Child.show()
```

# 143. Challenge — Overload or Override?

```java
class Parent {

    void show(int x) {
    }
}

class Child extends Parent {

    void show(double x) {
    }
}
```

Answer:

```text
Overloading
```

The parameter types differ.

# 144. Challenge — Static or Dynamic?

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

Parent p = new Child();

p.show();
```

Answer:

```text
Parent
```

Because static methods are hidden rather than dynamically overridden.

# 145. Challenge — Field or Method?

```java
class Parent {

    int x = 10;

    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    int x = 20;

    @Override
    void show() {
        System.out.println("Child");
    }
}

Parent p = new Child();

System.out.println(p.x);
p.show();
```

Answer:

```text
10
Child
```

Field access and overridden method dispatch behave differently.

# 146. Challenge — super

```java
class Parent {

    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    @Override
    void show() {
        System.out.println("Child");
    }

    void test() {
        show();
        super.show();
    }
}
```

What does:

```java
new Child().test();
```

print?

Answer:

```text
Child
Parent
```

# 147. Challenge — Covariant Return

```java
class Animal {
}

class Dog extends Animal {
}

class Parent {

    Animal create() {
        return new Animal();
    }
}

class Child extends Parent {

    @Override
    Dog create() {
        return new Dog();
    }
}
```

Is this valid?

Answer:

```text
Yes.
```

`Dog` is a subtype of `Animal`.

# 148. Challenge — Access

Parent:

```java
protected void show()
```

Child:

```java
public void show()
```

Valid?

Answer:

```text
Yes.
```

The child increases accessibility.

# 149. Challenge — Access

Parent:

```java
public void show()
```

Child:

```java
protected void show()
```

Valid?

Answer:

```text
No.
```

The child reduces accessibility.

# 150. Challenge — Exception

Parent:

```java
void read() throws IOException
```

Child:

```java
void read() throws FileNotFoundException
```

Valid?

Answer:

```text
Yes.
```

`FileNotFoundException` is narrower than `IOException`.

# 151. Challenge — Exception

Parent:

```java
void read() throws IOException
```

Child:

```java
void read() throws Exception
```

Valid?

Answer:

```text
No.
```

The child introduces a broader checked exception.

# 152. Complete Mental Model

Whenever you see inheritance and an overridden method, think:

```text
                 Parent
                   |
                   | inheritance
                   v
                 Child
                   |
              overrides
                   |
                method()
```

Then if you see:

```java
Parent ref = new Child();
```

remember:

```text
ref type
→ controls accessible members

actual object
→ controls overridden instance-method implementation
```

So:

```java
ref.method();
```

can execute:

```java
Child.method();
```

if `method()` is overridden.

# 153. Overriding Flow

```text
1. Compiler sees the reference type.

2. Compiler checks whether the method can be called.

3. Program runs.

4. Runtime identifies the actual object.

5. If the method is an overridable instance method,
   runtime dispatch selects the child's override.

6. Child implementation executes.
```

# 154. Complete Example

```java
class Animal {

    void sound() {
        System.out.println(
            "Animal sound"
        );
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println(
            "Dog bark"
        );
    }

    void fetch() {
        System.out.println(
            "Dog fetches ball"
        );
    }
}

public class Main {

    static void makeSound(
        Animal animal
    ) {
        animal.sound();
    }

    public static void main(String[] args) {

        Animal animal = new Dog();

        makeSound(animal);

        Dog dog = (Dog) animal;

        dog.fetch();
    }
}
```

Output:

```text
Dog bark
Dog fetches ball
```

This example combines:

```text
inheritance
overriding
upcasting
runtime polymorphism
downcasting
```

# 155. Final Revision Notes

Method overriding is the mechanism that allows a child class to specialize inherited instance behavior.

The essential formula is:

```text
Parent method
      +
Child implementation
      +
compatible parameters
      +
inheritance
      =
Method overriding
```

The most important runtime rule is:

```java
Parent p = new Child();

p.someOverriddenMethod();
```

If `someOverriddenMethod()` is an overridable instance method, the Child implementation runs.

The most important exceptions to remember are:

```text
static → hidden
private → not overridden
final → cannot be overridden
constructors → cannot be overridden
```

The access rule is:

```text
child cannot reduce accessibility
```

The return rule is:

```text
same return type
or
covariant reference return type
```

The checked-exception rule is:

```text
child cannot throw broader checked exceptions
```

And always prefer:

```java
@Override
```

because it lets the compiler verify that you really are overriding something.

# 156. Chapter 18 Summary

You should now be comfortable with:

```text
✓ Method overriding
✓ Parent-child relationship
✓ Same method signature
✓ @Override
✓ Runtime polymorphism
✓ Dynamic method dispatch
✓ Parent reference → child object
✓ Upcasting
✓ Downcasting
✓ super.method()
✓ Covariant return types
✓ Access modifier rules
✓ Checked exception rules
✓ Abstract method implementation
✓ Interface method implementation
✓ Object method overriding
✓ toString()
✓ equals(Object)
✓ hashCode()
✓ static method hiding
✓ private methods
✓ final methods
✓ fields vs methods
✓ Overloading vs overriding
```

The core idea to remember is:

```text
OVERLOADING
→ same name + different parameters
→ compile-time

OVERRIDING
→ inherited instance method + child implementation
→ runtime dispatch
```

---

# Chapter 19 — Polymorphism

The next chapter brings the previous concepts together.

You will study:

```text
✓ What polymorphism means
✓ Compile-time polymorphism
✓ Runtime polymorphism
✓ Parent reference → child object
✓ Dynamic method dispatch
✓ Upcasting
✓ Downcasting
✓ instanceof
✓ Polymorphic arrays
✓ Polymorphic collections
✓ Method overriding
✓ Method overloading
✓ Abstract classes
✓ Interfaces
✓ Real-world polymorphism
✓ Benefits of polymorphism
✓ Common mistakes
✓ Practical projects
✓ Exercises
✓ Interview questions
```


# 157. Quick Rule Sheet

| Rule | Overriding |
|---|---|
| Parent-child relationship | Required |
| Same method name | Yes |
| Same parameter types | Yes |
| Return type | Same or covariant |
| Access | Same or wider |
| `@Override` | Strongly recommended |
| `private` method | Not overridden |
| `final` method | Cannot be overridden |
| `static` method | Hidden |
| Constructor | Cannot be overridden |
| Checked exception | Cannot be broader |
| Runtime dispatch | Yes, for overridable instance methods |

---

# 158. One-Minute Explanation

If an interviewer asks:

**"What is method overriding?"**

A strong simple answer is:

> Method overriding occurs when a subclass provides its own implementation of an inherited instance method using the same compatible parameter list. It allows runtime polymorphism, where the implementation is selected according to the actual object at runtime. The overriding method cannot reduce access, must have the same or a covariant reference return type, and cannot override private, final, or static methods in the normal sense.

---

# 159. Final Example to Memorize

```java
class Animal {

    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog bark");
    }
}

public class Main {

    public static void main(String[] args) {

        Animal animal = new Dog();

        animal.sound();
    }
}
```

Output:

```text
Dog bark
```

Why?

```text
Animal
   ↑
   |
  Dog
```

The variable is:

```java
Animal animal
```

but the actual object is:

```java
new Dog()
```

`Dog` overrides:

```java
sound()
```

so runtime dispatch selects:

```java
Dog.sound()
```

That is the heart of method overriding and runtime polymorphism.

---

# 160. End of Chapter 18

You have now completed another major OOP concept.

The progression so far is:

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
```

The next chapter will combine overloading, overriding, inheritance, upcasting, downcasting, and dynamic dispatch into one complete understanding of Java polymorphism.
