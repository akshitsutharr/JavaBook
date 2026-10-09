# Chapter 19 — Polymorphism

> **Java Master Course — Chapter 19 of 50**
>
> Polymorphism is one of the four major pillars of Object-Oriented Programming.
>
> The word **polymorphism** means **"many forms."**
>
> In Java, polymorphism allows the same operation, method call, or parent-level reference to work with different forms of objects.

---

# 1. What You Will Learn

By the end of this chapter, you should understand:

```text
✓ Meaning of polymorphism
✓ Why polymorphism is important
✓ Compile-time polymorphism
✓ Runtime polymorphism
✓ Method overloading
✓ Method overriding
✓ Parent reference → child object
✓ Upcasting
✓ Downcasting
✓ Dynamic method dispatch
✓ instanceof
✓ Polymorphic arrays
✓ Polymorphic collections
✓ Abstract classes and polymorphism
✓ Interfaces and polymorphism
✓ IS-A relationships
✓ Reference type vs object type
✓ Compile-time vs runtime decisions
✓ Fields vs methods
✓ Static methods vs instance methods
✓ Real-world examples
✓ Common mistakes
✓ Practical programs
✓ Exercises
✓ Output questions
✓ Interview questions
✓ Mini projects
```

# 2. What Is Polymorphism?

Polymorphism means:

> **One interface or common operation can represent and work with multiple forms of objects.**

The word comes from:

```text
poly = many
morph = forms
```

So:

```text
polymorphism = many forms
```

A simple Java example is:

```java
Animal animal = new Dog();
animal.sound();
```

If `Dog` overrides `sound()`, the call can execute the Dog implementation.

The same parent type can therefore represent different child objects.

# 3. Simple Real-World Example

Imagine a common action:

```text
makeSound()
```

Different animals perform it differently:

```text
Dog  → bark
Cat  → meow
Cow  → moo
```

The operation is conceptually the same:

```text
sound
```

but its implementation has many forms.

That is the basic idea behind polymorphism.

# 4. Why Is Polymorphism Important?

Without polymorphism, code often becomes tightly connected to concrete classes.

For example, imagine a payment system with:

```text
CardPayment
UpiPayment
CashPayment
WalletPayment
```

Instead of writing separate logic everywhere, we can define a common type:

```java
Payment
```

and process:

```java
Payment payment
```

The actual object can be:

```text
CardPayment
UpiPayment
CashPayment
WalletPayment
```

This makes programs easier to extend and maintain.

# 5. Polymorphism Is a Major OOP Pillar

The four commonly taught pillars of OOP are:

```text
1. Encapsulation
2. Inheritance
3. Abstraction
4. Polymorphism
```

They are connected.

For example:

```text
Encapsulation
→ protects object state

Inheritance
→ creates parent-child relationships

Abstraction
→ defines important behavior/contracts

Polymorphism
→ lets one common type work with many implementations
```

Real Java designs frequently use several of these together.

# 6. Two Major Types of Polymorphism in Java

In the context of Java OOP, we commonly discuss:

```text
1. Compile-time polymorphism
2. Runtime polymorphism
```

The most common mapping is:

```text
Compile-time polymorphism
→ method overloading

Runtime polymorphism
→ method overriding
```

These should not be confused.

# 7. Compile-Time Polymorphism

Compile-time polymorphism occurs when Java determines which overloaded method to call during compilation.

Example:

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }
}
```

Now:

```java
Calculator c = new Calculator();

System.out.println(c.add(10, 20));
System.out.println(c.add(10.5, 20.5));
```

Output:

```text
30
31.0
```

The compiler selects the appropriate overloaded method from the argument types.

# 8. Runtime Polymorphism

Runtime polymorphism occurs when an overridden instance method is selected according to the actual object at runtime.

Example:

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

Animal animal = new Dog();

animal.sound();
```

Output:

```text
Dog
```

The variable has type:

```text
Animal
```

but the object is:

```text
Dog
```

The overridden Dog implementation runs.

# 9. Compile-Time vs Runtime Polymorphism

```text
Compile-time polymorphism
        ↓
Method overloading
        ↓
Different parameter lists
        ↓
Method selection during compilation
```

```text
Runtime polymorphism
        ↓
Method overriding
        ↓
Parent-child relationship
        ↓
Actual object determines overridden instance implementation
```

A simple memory trick:

```text
OVERLOADING → compile time

OVERRIDING → runtime
```

# 10. The Most Important Statement in This Chapter

Memorize:

```java
Parent reference = new Child();
```

Example:

```java
Animal animal = new Dog();
```

This is valid because:

```text
Dog IS-A Animal
```

The reference is an Animal reference.

The actual object is a Dog object.

This combination is the foundation of runtime polymorphism.

# 11. Reference Type vs Object Type

Consider:

```java
Animal animal = new Dog();
```

There are two types to understand.

Reference type:

```text
Animal
```

Actual object type:

```text
Dog
```

So:

```text
reference type = Animal
object type    = Dog
```

This distinction is one of the most important concepts in Java OOP.

# 12. What Does the Reference Type Control?

The reference type controls which members can be accessed through the reference.

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

Now:

```java
Animal animal = new Dog();
```

This is valid:

```java
animal.sound();
```

But this is not:

```java
animal.fetch();
```

because `fetch()` is not declared in `Animal`.

# 13. What Does the Actual Object Control?

For an overridden instance method, the actual object determines which implementation executes.

Example:

```java
Animal animal = new Dog();

animal.sound();
```

If Dog overrides `sound()`:

```text
actual object = Dog
        ↓
Dog.sound()
```

So:

```text
reference type
→ determines available members

actual object
→ determines overridden instance-method implementation
```

# 14. Dynamic Method Dispatch

The runtime selection of an overridden instance method is commonly called:

> **Dynamic method dispatch**

Example:

```java
Animal animal = new Dog();

animal.sound();
```

Conceptually:

```text
compile time:
Animal has sound()
        ↓
allowed

runtime:
actual object is Dog
        ↓
Dog overrides sound()
        ↓
Dog.sound() executes
```

# 15. Why Is It Called Dynamic?

The implementation is selected dynamically based on the actual object involved at runtime.

For example:

```java
Animal a1 = new Dog();
Animal a2 = new Cat();
```

Both have the same reference type:

```text
Animal
```

but:

```java
a1.sound();
```

can execute:

```text
Dog.sound()
```

while:

```java
a2.sound();
```

can execute:

```text
Cat.sound()
```

The same call:

```java
sound()
```

has different runtime behavior.

# 16. Upcasting

Upcasting means treating a child object as a parent type.

Example:

```java
Dog dog = new Dog();

Animal animal = dog;
```

or:

```java
Animal animal = new Dog();
```

This is called upcasting because we move toward a more general type.

# 17. Why Is Upcasting Safe?

If:

```text
Dog IS-A Animal
```

then every Dog is also an Animal.

Therefore:

```java
Animal animal = new Dog();
```

is safe.

The Animal reference promises only Animal-level behavior.

The actual object remains a Dog.

# 18. Upcasting Does Not Change the Object

This is important:

```java
Dog dog = new Dog();

Animal animal = dog;
```

The object does not transform from Dog into Animal.

There is still one Dog object.

There are simply two references that can point to it:

```text
dog    ─────┐
            ↓
          Dog object
            ↑
animal ─────┘
```

The reference types are different.

# 19. Multiple Parent-Type References

A child object can be referenced using a parent type.

Example:

```java
class Animal {
}

class Dog extends Animal {
}

Dog dog = new Dog();

Animal animal = dog;
Object object = dog;
```

Conceptually:

```text
Dog object
   ↑
Animal reference
   ↑
Object reference
```

This works because:

```text
Dog IS-A Animal
Dog IS-A Object
```

# 20. Downcasting

Downcasting means converting a parent reference into a child reference.

Example:

```java
Animal animal = new Dog();

Dog dog = (Dog) animal;
```

Now the Dog-specific methods can be accessed through `dog`.

For example:

```java
dog.fetch();
```

# 21. Why Is Downcasting Risky?

A parent reference can point to many different child types.

For example:

```java
Animal animal = new Cat();
```

This cannot safely become a Dog:

```java
Dog dog = (Dog) animal;
```

The actual object is Cat.

The runtime throws:

```text
ClassCastException
```

Therefore, downcasting should be performed only when the actual object is compatible with the target type.

# 22. instanceof

The `instanceof` operator checks whether an object is compatible with a given reference type.

Example:

```java
Animal animal = new Dog();

if (animal instanceof Dog) {
    System.out.println("It is a Dog");
}
```

Output:

```text
It is a Dog
```

It is commonly used before downcasting when the type is not otherwise guaranteed.

# 23. instanceof with Null

If the reference is `null`:

```java
Animal animal = null;

System.out.println(
    animal instanceof Dog
);
```

Output:

```text
false
```

`null` does not refer to an object, so the `instanceof` test is false.

# 24. Safe Downcasting with instanceof

```java
Animal animal = new Dog();

if (animal instanceof Dog) {

    Dog dog = (Dog) animal;

    dog.fetch();
}
```

This pattern verifies the runtime type before casting.

# 25. Modern instanceof Pattern Matching Preview

Modern Java versions provide pattern matching for `instanceof`.

Example:

```java
if (animal instanceof Dog dog) {
    dog.fetch();
}
```

The variable `dog` is available in the appropriate scope after the successful match.

This avoids writing:

```java
Dog dog = (Dog) animal;
```

separately.

The exact set of modern language features depends on the Java version being used; modern Java is covered again in Chapter 46.

# 26. Polymorphic Arrays

An array whose component type is a parent class can hold child objects.

Example:

```java
Animal[] animals = {
    new Dog(),
    new Cat(),
    new Cow()
};
```

Every element is an Animal reference.

The actual objects are different:

```text
animals[0] → Dog
animals[1] → Cat
animals[2] → Cow
```

# 27. Polymorphic Array Example

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

class Cow extends Animal {

    @Override
    void sound() {
        System.out.println("Cow");
    }
}

public class Main {

    public static void main(String[] args) {

        Animal[] animals = {
            new Dog(),
            new Cat(),
            new Cow()
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
Cow
```

This is one of the easiest ways to understand runtime polymorphism.

# 28. Polymorphic Collections

The same concept works with collections.

For example:

```java
List<Animal> animals = new ArrayList<>();

animals.add(new Dog());
animals.add(new Cat());
animals.add(new Cow());
```

The collection stores references through the common type:

```text
Animal
```

while the actual objects remain:

```text
Dog
Cat
Cow
```

When you call an overridden method, the correct implementation is selected at runtime.

# 29. Polymorphism with for-each

```java
for (Animal animal : animals) {
    animal.sound();
}
```

The loop variable has type:

```text
Animal
```

but each iteration can refer to a different object.

Therefore:

```text
iteration 1 → Dog
iteration 2 → Cat
iteration 3 → Cow
```

and the same:

```java
animal.sound();
```

can produce different behavior.

# 30. Polymorphism with Abstract Classes

Abstract classes are commonly used with runtime polymorphism.

Example:

```java
abstract class Shape {

    abstract double area();
}
```

Concrete subclasses provide implementations:

```java
class Circle extends Shape {

    @Override
    double area() {
        return Math.PI * 5 * 5;
    }
}

class Rectangle extends Shape {

    @Override
    double area() {
        return 10 * 20;
    }
}
```

Then:

```java
Shape s1 = new Circle();
Shape s2 = new Rectangle();
```

The common parent type is `Shape`.

# 31. Abstract Class Polymorphism Example

```java
abstract class Shape {

    abstract void draw();
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

public class Main {

    public static void main(String[] args) {

        Shape[] shapes = {
            new Circle(),
            new Rectangle()
        };

        for (Shape shape : shapes) {
            shape.draw();
        }
    }
}
```

Output:

```text
Drawing circle
Drawing rectangle
```

# 32. Polymorphism with Interfaces

Interfaces are one of the most important tools for polymorphism.

Example:

```java
interface Payment {

    void pay(double amount);
}
```

Different classes can implement it:

```java
class CardPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Card: " + amount
        );
    }
}

class UpiPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "UPI: " + amount
        );
    }
}
```

Now:

```java
Payment p1 = new CardPayment();
Payment p2 = new UpiPayment();
```

Both references use the same interface type.

# 33. Interface Polymorphism Example

```java
static void processPayment(
    Payment payment,
    double amount
) {
    payment.pay(amount);
}
```

Now:

```java
processPayment(
    new CardPayment(),
    500
);

processPayment(
    new UpiPayment(),
    500
);
```

The method does not need separate versions for Card and UPI.

The common abstraction is:

```text
Payment
```

and the actual object decides the implementation.

# 34. Multiple Interfaces and Polymorphism

A class can implement multiple interfaces.

Example:

```java
interface Printable {
    void print();
}

interface Scannable {
    void scan();
}

class PrinterScanner
        implements Printable, Scannable {

    @Override
    public void print() {
        System.out.println("Printing");
    }

    @Override
    public void scan() {
        System.out.println("Scanning");
    }
}
```

The same object can be referenced through either interface:

```java
Printable p = new PrinterScanner();

Scannable s = new PrinterScanner();
```

More commonly, the same object would be assigned once and then viewed through different compatible references.

# 35. One Object, Different Views

Example:

```java
class SmartDevice
        implements Printable, Scannable {

    @Override
    public void print() {
        System.out.println("Print");
    }

    @Override
    public void scan() {
        System.out.println("Scan");
    }
}
```

Then:

```java
SmartDevice device =
    new SmartDevice();

Printable printable = device;
Scannable scannable = device;
```

There is one object.

There are multiple possible reference types.

Each reference exposes the contract of its type.

# 36. IS-A Relationship and Polymorphism

Polymorphism through inheritance depends on an IS-A relationship.

Examples:

```text
Dog IS-A Animal
Car IS-A Vehicle
Circle IS-A Shape
Developer IS-A Employee
```

Therefore:

```java
Animal a = new Dog();
Vehicle v = new Car();
Shape s = new Circle();
Employee e = new Developer();
```

These are natural polymorphic assignments.

# 37. HAS-A Is Different

A HAS-A relationship means composition or association rather than inheritance.

Example:

```java
class Engine {
}

class Car {

    private Engine engine;
}
```

A Car:

```text
HAS-A Engine
```

This is different from:

```text
Car IS-A Vehicle
```

Both relationships are important in OOP design.

# 38. Polymorphism and Composition

Polymorphism is not limited to inheritance.

An object can also depend on an interface and receive different implementations.

Example:

```java
interface Logger {

    void log(String message);
}
```

Implementations:

```text
ConsoleLogger
FileLogger
DatabaseLogger
```

A service can depend on:

```java
Logger
```

rather than a concrete logger.

This is a major real-world use of polymorphism.

# 39. Example — Logger Polymorphism

```java
interface Logger {

    void log(String message);
}

class ConsoleLogger implements Logger {

    @Override
    public void log(String message) {
        System.out.println(
            "Console: " + message
        );
    }
}

class FileLogger implements Logger {

    @Override
    public void log(String message) {
        System.out.println(
            "File: " + message
        );
    }
}

class Application {

    private Logger logger;

    Application(Logger logger) {
        this.logger = logger;
    }

    void run() {
        logger.log("Application started");
    }
}
```

Now:

```java
Application app =
    new Application(
        new ConsoleLogger()
    );

app.run();
```

Later, the application can be constructed with another Logger implementation.

# 40. Compile-Time Polymorphism — Overloading

Method overloading is the standard Java example of compile-time polymorphism.

Example:

```java
class Printer {

    void print(int value) {
        System.out.println(value);
    }

    void print(String value) {
        System.out.println(value);
    }

    void print(double value) {
        System.out.println(value);
    }
}
```

Calls:

```java
print(10);
print("Java");
print(10.5);
```

are resolved using the argument types.

# 41. Overloading Is Not Runtime Polymorphism

Suppose:

```java
class Printer {

    void print(int x) {
        System.out.println("int");
    }

    void print(String x) {
        System.out.println("String");
    }
}
```

The compiler determines which method signature matches the call.

This is different from:

```java
Animal a = new Dog();
a.sound();
```

where an overridden instance implementation is selected at runtime.

# 42. Runtime Polymorphism — Overriding

Example:

```java
class Printer {

    void print() {
        System.out.println("Printer");
    }
}

class ColorPrinter extends Printer {

    @Override
    void print() {
        System.out.println(
            "Color printer"
        );
    }
}

Printer printer =
    new ColorPrinter();

printer.print();
```

Output:

```text
Color printer
```

This is runtime polymorphism.

# 43. Both Overloading and Overriding Together

Java programs can use both.

Example:

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

The two mechanisms can coexist.

# 44. Important Example — Parent Reference

```java
Parent p = new Child();

p.show(10);
```

The compiler sees:

```text
Parent.show(int)
```

and knows the method exists.

At runtime, Child's override executes:

```text
Child int
```

But:

```java
p.show("Java");
```

does not compile if `show(String)` exists only in Child.

This demonstrates the two-stage mental model.

# 45. Two-Stage Mental Model

For:

```java
Parent p = new Child();

p.show();
```

think:

```text
STAGE 1 — compile time
Does Parent expose an accessible show()?
        ↓
Yes
        ↓
STAGE 2 — runtime
What is the actual object?
        ↓
Child
        ↓
Does Child override show()?
        ↓
Yes
        ↓
Child.show()
```

This model is extremely useful for exams and interviews.

# 46. Polymorphism and Method Parameters

A method can accept a parent type and therefore accept many child types.

Example:

```java
static void makeSound(
    Animal animal
) {
    animal.sound();
}
```

Now:

```java
makeSound(new Dog());
makeSound(new Cat());
makeSound(new Cow());
```

The method does not need to be rewritten for each animal.

# 47. Polymorphism and Return Types

A method can also return a parent type while returning different child objects.

Example:

```java
static Animal createAnimal(
    boolean dog
) {
    if (dog) {
        return new Dog();
    }

    return new Cat();
}
```

The return type is:

```java
Animal
```

but the actual object can be:

```text
Dog
```

or:

```text
Cat
```

This is another common polymorphic pattern.

# 48. Factory-Style Example

```java
static Payment createPayment(
    String type
) {
    if (type.equals("card")) {
        return new CardPayment();
    }

    if (type.equals("upi")) {
        return new UpiPayment();
    }

    throw new IllegalArgumentException(
        "Unknown payment type"
    );
}
```

Usage:

```java
Payment payment =
    createPayment("card");

payment.pay(1000);
```

The caller depends on `Payment`, not the concrete implementation.

# 49. Polymorphism Reduces if-else Chains

Without polymorphism, code may become:

```java
if (type.equals("dog")) {
    dogSound();
}
else if (type.equals("cat")) {
    catSound();
}
else if (type.equals("cow")) {
    cowSound();
}
```

With polymorphism:

```java
animal.sound();
```

Each object knows its own implementation.

This can make a system easier to extend, although polymorphism should not be forced into every problem.

# 50. Open for Extension — Simple Idea

Suppose we have:

```java
interface Notification {

    void send(String message);
}
```

Existing implementations:

```text
EmailNotification
SmsNotification
```

Later we add:

```text
PushNotification
```

A method that accepts:

```java
Notification
```

can often work with the new implementation without changing its basic logic.

This is one reason interfaces and polymorphism are important in scalable software.

# 51. Polymorphism and Loose Coupling

When code depends on:

```text
interface / abstraction
```

instead of:

```text
concrete implementation
```

the dependency can become more flexible.

Example:

```java
class OrderService {

    private Payment payment;

    OrderService(Payment payment) {
        this.payment = payment;
    }
}
```

The service can work with many Payment implementations.

This idea connects polymorphism with coupling and good OOP design, which was introduced in Chapter 23.

# 52. Polymorphism and Encapsulation

Encapsulation hides internal state.

Polymorphism hides the concrete implementation behind a common type.

For example:

```java
Payment payment = new UpiPayment();
```

The caller knows:

```text
this is a Payment
```

but does not need to know every internal detail of `UpiPayment`.

# 53. Polymorphism and Abstraction

Abstraction defines what an object should do.

Polymorphism allows different implementations of that behavior.

Example:

```java
abstract class Shape {

    abstract double area();
}
```

The abstraction says:

```text
Every Shape has an area operation.
```

Concrete classes decide how:

```text
Circle → πr²
Rectangle → length × width
Triangle → base × height / 2
```

Polymorphism allows:

```java
Shape shape
```

to represent all of them.

# 54. Polymorphism and Inheritance

Inheritance creates the parent-child relationship required for many forms of runtime polymorphism.

Example:

```text
Animal
├── Dog
├── Cat
└── Cow
```

The parent provides a common type.

Children provide specialized implementations.

Polymorphism lets the program work with the common type.

# 55. Static Methods and Polymorphism

Static methods do not participate in normal runtime overriding.

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

Therefore, do not apply the normal dynamic-dispatch rule to static methods.

# 56. Fields and Polymorphism

Fields are also different from overridden instance methods.

Example:

```java
class Parent {

    int value = 10;
}

class Child extends Parent {

    int value = 20;
}
```

Now:

```java
Parent p = new Child();

System.out.println(p.value);
```

prints:

```text
10
```

The field access is based on the reference type.

Methods behave differently.

# 57. Fields vs Methods

Remember:

```text
METHOD:
Parent reference + Child object
→ overridden instance method can dispatch to Child

FIELD:
Parent reference + Child object
→ field access is based on reference type
```

This is a common output-question trap.

# 58. Private Methods and Polymorphism

Private methods are not overridden.

Therefore, they do not participate in runtime overriding in the same way as accessible instance methods.

If a child declares a same-signature private method, it is a separate method.

# 59. final Methods and Polymorphism

A final instance method cannot be overridden.

Therefore:

```text
final method
→ fixed implementation in the inheritance hierarchy
```

It cannot provide child-specific runtime overriding.

# 60. Constructors and Polymorphism

Constructors are not overridden.

However, constructor execution happens during creation of a child object.

For example:

```java
class Parent {

    Parent() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    Child() {
        System.out.println("Child");
    }
}
```

Creating:

```java
new Child();
```

prints:

```text
Parent
Child
```

This is constructor chaining, not polymorphic method overriding.

# 61. Polymorphism and Object

`Object` is the root class of ordinary Java class hierarchies.

This means:

```java
Object value = new Dog();
```

is valid.

A variable of type `Object` can refer to many different object types.

For example:

```java
Object a = new Dog();
Object b = new String("Java");
Object c = new ArrayList<>();
```

However, the more general the reference type becomes, the fewer type-specific members are directly available.

# 62. The Trade-Off of General Reference Types

Compare:

```java
Dog dog = new Dog();
```

with:

```java
Animal animal = new Dog();
```

and:

```java
Object object = new Dog();
```

The more general the reference type:

```text
Dog
 ↓
Animal
 ↓
Object
```

the more general the accessible API becomes.

This is useful for abstraction, but sometimes you need a more specific type for child-specific operations.

# 63. Polymorphism Does Not Mean 'Anything Can Be Anything'

Java is statically typed.

This is invalid:

```java
String s = new Dog();
```

unless there is a valid type relationship.

Polymorphism works where the types are compatible.

Examples:

```java
Animal a = new Dog();
Object o = new Dog();
```

are valid because Dog is compatible with those types.

# 64. Common Mistake — Thinking Parent Reference Changes the Object

Wrong idea:

```java
Animal animal = new Dog();
```

means:

```text
Dog converted into Animal object
```

Correct idea:

```text
A Dog object is created.
An Animal reference points to it.
```

The object remains a Dog.

# 65. Common Mistake — Child Methods Through Parent Reference

Given:

```java
Animal animal = new Dog();
```

If Dog has:

```java
void fetch()
```

this does not work:

```java
animal.fetch();
```

The reference type is Animal.

If you know it is a Dog:

```java
if (animal instanceof Dog dog) {
    dog.fetch();
}
```

can be used in modern Java.

# 66. Common Mistake — Thinking Overloading Uses Runtime Type

Suppose:

```java
class Parent {

    void show(Parent p) {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    void show(Child c) {
        System.out.println("Child");
    }
}
```

Overload selection is based on compile-time types.

It is not the same mechanism as overridden instance-method dispatch.

This distinction becomes important in advanced output questions.

# 67. Common Mistake — Confusing Upcasting and Downcasting

Upcasting:

```java
Animal a = new Dog();
```

Generally safe because Dog IS-A Animal.

Downcasting:

```java
Dog d = (Dog) a;
```

requires the actual object to be compatible with Dog.

Remember:

```text
child → parent = upcasting

parent reference → child reference = downcasting
```

# 68. Common Mistake — Using instanceof Everywhere

`instanceof` is useful, but excessive type checking can sometimes indicate that the design is not taking advantage of polymorphism.

Instead of:

```java
if (animal instanceof Dog) {
    ...
}
else if (animal instanceof Cat) {
    ...
}
```

ask whether the behavior should simply be defined in:

```java
animal.sound();
```

A good OOP design often lets objects provide their own behavior.

# 69. When Downcasting Is Reasonable

Downcasting is not automatically bad.

It can be appropriate when:

```text
the specific subtype is genuinely required
and
the program knows the object is that subtype
```

But it should not be used merely to bypass a poor abstraction.

If a behavior belongs to all supported objects, consider putting that behavior in the parent type or interface.

# 70. Practical Example — Animal Shelter

```java
abstract class Animal {

    abstract void sound();

    void eat() {
        System.out.println(
            "Animal eats"
        );
    }
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

class Cow extends Animal {

    @Override
    void sound() {
        System.out.println("Moo");
    }
}
```

Processing:

```java
static void inspect(
    Animal animal
) {
    animal.eat();
    animal.sound();
}
```

Usage:

```java
inspect(new Dog());
inspect(new Cat());
inspect(new Cow());
```

One method handles all animal types.

# 71. Practical Example — Payment System

```java
interface Payment {

    void pay(double amount);
}

class CardPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Paid by card: " + amount
        );
    }
}

class UpiPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Paid by UPI: " + amount
        );
    }

class CashPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Paid by cash: " + amount
        );
    }
}
```

A common processor:

```java
class PaymentProcessor {

    void process(
        Payment payment,
        double amount
    ) {
        payment.pay(amount);
    }
}
```

The processor depends on the abstraction.

# 72. Practical Example — Notification System

```java
interface Notification {

    void send(String message);
}

class EmailNotification
        implements Notification {

    @Override
    public void send(String message) {
        System.out.println(
            "Email: " + message
        );
    }
}

class SmsNotification
        implements Notification {

    @Override
    public void send(String message) {
        System.out.println(
            "SMS: " + message
        );
    }
}

class PushNotification
        implements Notification {

    @Override
    public void send(String message) {
        System.out.println(
            "Push: " + message
        );
    }
}
```

Then:

```java
Notification[] notifications = {
    new EmailNotification(),
    new SmsNotification(),
    new PushNotification()
};

for (Notification n : notifications) {
    n.send("Welcome");
}
```

# 73. Practical Example — Employee Payroll

```java
abstract class Employee {

    protected String name;

    Employee(String name) {
        this.name = name;
    }

    abstract double calculateSalary();
}

class Developer extends Employee {

    Developer(String name) {
        super(name);
    }

    @Override
    double calculateSalary() {
        return 60000;
    }
}

class Manager extends Employee {

    Manager(String name) {
        super(name);
    }

    @Override
    double calculateSalary() {
        return 90000;
    }
}
```

Usage:

```java
Employee[] employees = {
    new Developer("Aman"),
    new Manager("Riya")
};

for (Employee employee : employees) {
    System.out.println(
        employee.name + ": " +
        employee.calculateSalary()
    );
}
```

The loop uses one common type while processing different employee forms.

# 74. Practical Example — Shape Calculator

```java
abstract class Shape {

    abstract double area();
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

Processing:

```java
static double totalArea(
    Shape[] shapes
) {
    double total = 0;

    for (Shape shape : shapes) {
        total += shape.area();
    }

    return total;
}
```

The method does not need to know whether a shape is a Circle or Rectangle.

# 75. Practical Example — Report Export

```java
abstract class Report {

    abstract void export();

    void prepare() {
        System.out.println(
            "Preparing report"
        );
    }
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

Then:

```java
static void processReport(
    Report report
) {
    report.prepare();
    report.export();
}
```

Usage:

```java
processReport(
    new PdfReport()
);

processReport(
    new ExcelReport()
);
```

# 76. Practical Example — Storage System

```java
interface Storage {

    void save(String data);
}

class FileStorage implements Storage {

    @Override
    public void save(String data) {
        System.out.println(
            "Saving to file: " + data
        );
    }
}

class DatabaseStorage
        implements Storage {

    @Override
    public void save(String data) {
        System.out.println(
            "Saving to database: " +
            data
        );
    }
}

class CloudStorage implements Storage {

    @Override
    public void save(String data) {
        System.out.println(
            "Saving to cloud: " + data
        );
    }
}
```

Usage:

```java
Storage storage =
    new DatabaseStorage();

storage.save("Java");
```

The application can switch storage implementations while depending on the same abstraction.

# 77. Practical Example — Transport

```java
abstract class Transport {

    abstract void move();
}

class Car extends Transport {

    @Override
    void move() {
        System.out.println(
            "Car moves on road"
        );
    }
}

class Train extends Transport {

    @Override
    void move() {
        System.out.println(
            "Train moves on railway"
        );
    }

class Airplane extends Transport {

    @Override
    void move() {
        System.out.println(
            "Airplane moves through air"
        );
    }
}
```

Now:

```java
Transport[] transports = {
    new Car(),
    new Train(),
    new Airplane()
};

for (Transport t : transports) {
    t.move();
}
```

# 78. Practical Example — Game Characters

```java
abstract class Character {

    abstract void attack();
}

class Warrior extends Character {

    @Override
    void attack() {
        System.out.println(
            "Warrior uses sword"
        );
    }
}

class Archer extends Character {

    @Override
    void attack() {
        System.out.println(
            "Archer shoots arrow"
        );
    }

class Mage extends Character {

    @Override
    void attack() {
        System.out.println(
            "Mage casts spell"
        );
    }
}
```

The game engine can use:

```java
Character character
```

without hard-coding every character type.

# 79. Practical Example — Strategy Interface

A very useful real-world pattern is to represent a strategy using an interface.

```java
interface DiscountStrategy {

    double discount(double amount);
}
```

Implementations:

```java
class NoDiscount
        implements DiscountStrategy {

    @Override
    public double discount(
        double amount
    ) {
        return 0;
    }
}

class FestivalDiscount
        implements DiscountStrategy {

    @Override
    public double discount(
        double amount
    ) {
        return amount * 0.20;
    }
}
```

A shopping cart can depend on:

```java
DiscountStrategy
```

instead of a specific discount class.

# 80. Strategy Example

```java
class ShoppingCart {

    private DiscountStrategy strategy;

    ShoppingCart(
        DiscountStrategy strategy
    ) {
        this.strategy = strategy;
    }

    double finalPrice(double amount) {

        return amount -
               strategy.discount(amount);
    }
}
```

Usage:

```java
ShoppingCart cart =
    new ShoppingCart(
        new FestivalDiscount()
    );

System.out.println(
    cart.finalPrice(1000)
);
```

The same cart class can work with another strategy implementation.

# 81. Polymorphism Through Method Parameters

One of the strongest patterns is:

```java
void process(ParentType value)
```

instead of:

```java
void process(Dog dog)
```

when the operation should work for every valid subtype.

Example:

```java
static void process(
    Animal animal
) {
    animal.sound();
}
```

Now:

```java
process(new Dog());
process(new Cat());
process(new Cow());
```

This is flexible and simple.

# 82. Polymorphism Through Collections

Another common pattern:

```java
List<Animal> animals =
    new ArrayList<>();
```

Then:

```java
animals.add(new Dog());
animals.add(new Cat());
animals.add(new Cow());
```

And:

```java
for (Animal animal : animals) {
    animal.sound();
}
```

This allows a collection to contain multiple concrete implementations under one common type.

# 83. Polymorphism Through Return Values

Example:

```java
static Animal getAnimal(
    int choice
) {
    if (choice == 1) {
        return new Dog();
    }

    return new Cat();
}
```

The method promises:

```text
Animal
```

but can return different child objects.

The caller can use:

```java
Animal animal = getAnimal(1);

animal.sound();
```

# 84. Polymorphism and API Design

Good APIs often accept abstractions where appropriate.

Instead of:

```java
void sendEmail(EmailNotification email)
```

a general notification operation may use:

```java
void send(Notification notification)
```

This makes the API usable with:

```text
EmailNotification
SmsNotification
PushNotification
```

The key is to choose the abstraction that actually represents the required behavior.

# 85. Polymorphism Does Not Mean Parent Must Always Be a Class

Polymorphism can be based on:

```text
class inheritance
abstract classes
interfaces
```

Interface-based polymorphism is particularly common in application development.

Example:

```java
List<String> names =
    new ArrayList<>();
```

The variable uses:

```text
List
```

while the object is:

```text
ArrayList
```

This is a familiar real-world Java example of programming to an abstraction.

# 86. List Example

```java
List<String> names =
    new ArrayList<>();

names.add("A");
names.add("B");
```

The reference type:

```text
List
```

describes the operations the caller needs.

The concrete implementation is:

```text
ArrayList
```

This design lets code depend on the interface rather than unnecessarily depending on one implementation.

# 87. Another Collection Example

You might write:

```java
Map<String, Integer> scores =
    new HashMap<>();
```

Here:

```text
reference type = Map
actual object  = HashMap
```

This style is widely used in Java.

Collections will be studied in much greater depth in Chapters 31–35.

# 88. Polymorphism and Substitutability

A useful design idea is:

> A subtype should be usable wherever its parent type is expected without breaking the expected behavior.

For example:

```java
Animal animal = new Dog();
```

The program should be able to use the Dog through the Animal contract.

This idea is closely related to the **Liskov Substitution Principle**, one of the SOLID principles discussed in Chapter 23.

# 89. Bad Inheritance Can Damage Polymorphism

Inheritance should represent a meaningful IS-A relationship.

Bad modeling can create strange code.

For example, forcing a class into an inheritance hierarchy only to reuse a few lines of code can make polymorphism confusing.

Prefer inheritance when the subtype genuinely satisfies the parent abstraction.

Otherwise, composition may be better.

# 90. Polymorphism vs Composition

Suppose a Car needs an Engine.

You could write:

```java
class Car {

    private Engine engine;
}
```

This is composition.

If Car is also a Vehicle:

```java
class Car extends Vehicle {
}
```

that is inheritance.

A good OOP system may use both:

```text
Car IS-A Vehicle
Car HAS-A Engine
```

Polymorphism often operates through the inheritance/interface side, while composition helps build objects from reusable components.

# 91. Output Question 1

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

Animal a = new Dog();

a.sound();
```

Output:

```text
Dog
```

Reason:

```text
actual object = Dog
sound() is overridden
```

# 92. Output Question 2

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

# 93. Output Question 3 — Fields

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

Parent p = new Child();

System.out.println(p.value);
p.show();
```

Output:

```text
10
Child
```

Fields and methods behave differently.

# 94. Output Question 4 — Static

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

Static methods are hidden, not overridden.

# 95. Output Question 5 — Array

```java
Animal[] animals = {
    new Dog(),
    new Cat()
};

for (Animal animal : animals) {
    animal.sound();
}
```

Assuming Dog and Cat override `sound()`, each object's implementation runs.

For example:

```text
Dog
Cat
```

# 96. Output Question 6 — super

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

new Child().test();
```

Output:

```text
Child
Parent
```

# 97. Output Question 7 — Upcasting

```java
Dog dog = new Dog();

Animal animal = dog;

animal.sound();
```

If Dog overrides `sound()`:

```text
Dog
```

Upcasting does not remove the Dog behavior from the object.

# 98. Output Question 8 — instanceof

```java
Animal animal = new Dog();

System.out.println(
    animal instanceof Dog
);
```

Output:

```text
true
```

# 99. Output Question 9 — null

```java
Animal animal = null;

System.out.println(
    animal instanceof Dog
);
```

Output:

```text
false
```

# 100. Output Question 10 — Multiple Forms

```java
Animal a1 = new Dog();
Animal a2 = new Cat();

a1.sound();
a2.sound();
```

If Dog and Cat override `sound()`, output:

```text
Dog
Cat
```

The reference types are identical, but the actual objects differ.

# 101. Output Question 11 — Overloading

```java
class Printer {

    void print(int x) {
        System.out.println("int");
    }

    void print(String x) {
        System.out.println("String");
    }
}

Printer p = new Printer();

p.print(10);
```

Output:

```text
int
```

This is compile-time method overloading.

# 102. Output Question 12 — Child-Only Method

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
        System.out.println("Fetch");
    }
}

Animal animal = new Dog();

animal.fetch();
```

Result:

```text
Compilation error
```

The Animal reference does not expose `fetch()`.

# 103. Output Question 13 — Downcast

```java
Animal animal = new Dog();

Dog dog = (Dog) animal;

dog.fetch();
```

This is valid if the actual object is really a Dog.

# 104. Output Question 14 — Bad Downcast

```java
Animal animal = new Cat();

Dog dog = (Dog) animal;
```

The cast fails at runtime because the actual object is Cat.

Typical result:

```text
ClassCastException
```

# 105. Output Question 15 — Parent and Child Arrays

```java
Animal[] animals = new Animal[2];

animals[0] = new Dog();
animals[1] = new Cat();

for (Animal a : animals) {
    a.sound();
}
```

Each overridden implementation runs according to the actual object.

# 106. Output Question 16 — Return Object

```java
static Animal create() {
    return new Dog();
}

Animal animal = create();

animal.sound();
```

If Dog overrides `sound()`, Dog's implementation runs.

The method returns an Animal reference pointing to a Dog object.

# 107. Output Question 17 — Interface

```java
interface Payment {

    void pay();
}

class CardPayment
        implements Payment {

    @Override
    public void pay() {
        System.out.println("Card");
    }
}

Payment p = new CardPayment();

p.pay();
```

Output:

```text
Card
```

# 108. Output Question 18 — Different References

```java
class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Bark");
    }
}

Dog dog = new Dog();

Animal a = dog;
Object o = dog;

a.sound();
```

Output:

```text
Bark
```

Both `a` and `o` refer to the same Dog object, but their reference types expose different APIs.

# 109. Interview Questions — Basics

## Q1. What is polymorphism?

Polymorphism means one common abstraction or operation can represent and work with multiple forms.

## Q2. What does polymorphism literally mean?

Many forms.

## Q3. What are the two common types of polymorphism discussed in Java?

Compile-time and runtime polymorphism.

## Q4. What is compile-time polymorphism commonly represented by?

Method overloading.

## Q5. What is runtime polymorphism commonly represented by?

Method overriding.

## Q6. What is dynamic method dispatch?

Runtime selection of an overridden instance method based on the actual object.

## Q7. What is upcasting?

Treating a child object as a parent type.

## Q8. What is downcasting?

Converting a parent reference to a child reference when the actual object is compatible.

# 110. Interview Questions — Reference and Object

## Q9. What is the difference between reference type and object type?

The reference type is the declared type of the variable. The object type is the actual class of the object created at runtime.

## Q10. What does this mean?

```java
Animal a = new Dog();
```

`a` is an Animal reference pointing to a Dog object.

## Q11. What determines which members can be accessed through `a`?

The reference type and its accessible members.

## Q12. What determines which overridden instance method implementation runs?

The actual object at runtime.

## Q13. Does upcasting change the object?

No.

## Q14. Can an Animal reference point to a Dog?

Yes, because Dog IS-A Animal.

# 111. Interview Questions — instanceof and Casting

## Q15. What is instanceof used for?

It checks whether an object is compatible with a specified reference type.

## Q16. What does `null instanceof SomeType` return?

False.

## Q17. What happens when an incompatible downcast is performed?

A `ClassCastException` can occur at runtime.

## Q18. Is upcasting generally safe?

Yes, when the child is actually a subtype of the parent.

## Q19. Is downcasting always safe?

No.

## Q20. How can downcasting be checked?

Using `instanceof` or another reliable type guarantee.

# 112. Interview Questions — Overloading and Overriding

## Q21. Difference between overloading and overriding?

Overloading changes the parameter list and is resolved at compile time. Overriding supplies a child implementation of an inherited instance method and participates in runtime dispatch.

## Q22. Does overloading require inheritance?

No.

## Q23. Does overriding require a parent-child or interface implementation relationship?

Yes, for the normal Java overriding cases.

## Q24. Can a class both overload and override methods?

Yes.

## Q25. Are constructors overridden?

No.

## Q26. Are static methods overridden?

No. Static methods are hidden.

# 113. Interview Questions — Fields and Static

## Q27. Are fields polymorphically overridden?

No. Fields are hidden rather than overridden.

## Q28. Do static methods participate in normal dynamic dispatch?

No.

## Q29. Why is this important?

Because:

```java
Parent p = new Child();
```

does not mean every member will behave according to Child at runtime.

Overridden instance methods can dispatch dynamically; fields and static methods follow different rules.

# 114. Interview Questions — Design

## Q30. Why is polymorphism useful?

It reduces dependence on concrete classes and allows common code to work with multiple implementations.

## Q31. Why use an interface for polymorphism?

An interface defines a common contract that many classes can implement.

## Q32. Why accept an interface instead of a concrete class?

It can make code more flexible and easier to replace, extend, test, and maintain.

## Q33. What is programming to an abstraction?

Writing code against a general contract such as an interface or abstract class instead of unnecessarily depending on one concrete implementation.

## Q34. Can polymorphism reduce if-else or switch logic?

Often yes, when the branches represent different implementations of a common behavior.

# 115. Interview Questions — Advanced

## Q35. Can polymorphism work through arrays?

Yes.

Example:

```java
Animal[] animals = {
    new Dog(),
    new Cat()
};
```

## Q36. Can polymorphism work through collections?

Yes.

Example:

```java
List<Animal> animals;
```

## Q37. Can a method return a parent type while returning child objects?

Yes.

## Q38. Can an object have multiple interface views?

Yes.

## Q39. What is substitutability?

A subtype should be usable where its parent abstraction is expected without violating the expected contract.

## Q40. Is polymorphism only about inheritance?

No. Interface-based polymorphism is extremely important in Java.

# 116. Exercise 1 — Animal Polymorphism

Create:

```text
Animal
Dog
Cat
Cow
Lion
```

Define:

```java
void sound()
```

in Animal and override it in every child.

Create:

```java
Animal[] animals
```

and print all sounds using one loop.

# 117. Exercise 2 — Payment Polymorphism

Create:

```text
Payment
CardPayment
UpiPayment
CashPayment
WalletPayment
```

Define:

```java
void pay(double amount)
```

Then create:

```java
void process(Payment payment)
```

and process every payment type through the same method.

# 118. Exercise 3 — Shape Polymorphism

Create:

```text
Shape
Circle
Rectangle
Triangle
```

Define:

```java
double area()
```

Create a:

```java
Shape[]
```

and calculate all areas polymorphically.

# 119. Exercise 4 — Notification

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

Store all objects in:

```java
List<Notification>
```

and send a common message.

# 120. Exercise 5 — Employee Payroll

Create:

```text
Employee
Developer
Manager
Tester
Designer
```

Define:

```java
double calculateSalary()
```

and override it in every child.

Use:

```java
Employee[]
```

to calculate salaries.

# 121. Exercise 6 — Storage

Create:

```text
Storage
FileStorage
DatabaseStorage
CloudStorage
```

Define:

```java
void save(String data)
```

Create:

```java
void backup(Storage storage)
```

and pass different implementations.

# 122. Exercise 7 — Downcasting

Create:

```text
Animal
Dog
Cat
```

Give Dog a method:

```java
void fetch()
```

Create:

```java
Animal animal = new Dog();
```

Use `instanceof` and safely downcast to Dog.

Then test the same logic with:

```java
Animal animal = new Cat();
```

# 123. Exercise 8 — Interface Views

Create a class:

```text
SmartMachine
```

that implements:

```text
Printable
Scannable
```

Create one SmartMachine object and assign it to:

```java
Printable
Scannable
```

references.

Observe which methods are accessible through each reference.

# 124. Exercise 9 — Factory

Create:

```java
static Animal createAnimal(
    String type
)
```

Return:

```text
Dog
Cat
Cow
```

through the Animal return type.

Then call:

```java
animal.sound();
```

and observe runtime polymorphism.

# 125. Exercise 10 — Overload + Override

Create a hierarchy where:

```text
Parent.show(int)
```

is overridden by Child.

Also add:

```text
Child.show(String)
```

Test calls through:

```java
Child
```

and:

```java
Parent
```

references.

Explain which methods are available and why.

# 126. Mini Project — Payment Gateway

Build a small payment gateway.

Classes:

```text
Payment
CardPayment
UpiPayment
NetBankingPayment
WalletPayment
CashPayment
```

Use either an abstract class or interface.

Create:

```java
PaymentProcessor
```

with:

```java
void process(
    Payment payment,
    double amount
)
```

The processor should not contain a separate branch for every payment type.

Each implementation should provide its own `pay()` behavior.

# 127. Mini Project — Notification Manager

Create:

```text
Notification
EmailNotification
SmsNotification
PushNotification
```

Build:

```java
NotificationManager
```

with:

```java
void send(
    Notification notification,
    String message
)
```

Then create multiple notifications and process them polymorphically.

Add a collection-based version too.

# 128. Mini Project — Shape Engine

Build a shape engine.

Create:

```text
Shape
Circle
Rectangle
Triangle
Square
```

Each shape should implement:

```java
double area()
void draw()
```

Create:

```java
List<Shape>
```

and process every shape.

Add:

```java
double totalArea(List<Shape> shapes)
```

to practice polymorphic parameters and collections.

# 129. Mini Project — Employee Payroll

Build:

```text
Employee
Developer
Manager
Tester
Designer
SalesEmployee
```

Each employee calculates salary differently.

Create:

```java
PayrollSystem
```

that accepts:

```java
List<Employee>
```

and prints payroll information.

Do not use a large `if-else` chain based on employee type.

# 130. Mini Project — Game Character System

Create:

```text
Character
Warrior
Archer
Mage
Healer
```

Every character overrides:

```java
void attack()
```

Create a game engine:

```java
void performAttack(Character character)
```

and process a list of characters.

Add another polymorphic operation such as:

```java
void useAbility()
```

# 131. Mini Project — E-Commerce Discount

Create:

```text
DiscountStrategy
NoDiscount
FestivalDiscount
StudentDiscount
PremiumDiscount
```

Each strategy implements:

```java
double discount(double amount)
```

Create:

```java
ShoppingCart
```

that accepts a `DiscountStrategy`.

Change the strategy without rewriting the cart's pricing algorithm.

# 132. Mini Project — Storage Abstraction

Create:

```text
Storage
FileStorage
DatabaseStorage
CloudStorage
```

Implement:

```java
void save(String data)
void delete(String id)
```

Create:

```java
StorageService
```

that works with the Storage abstraction.

Test the service with multiple implementations.

# 133. Challenge 1 — Explain This

What happens here?

```java
Animal a = new Dog();
```

Your answer should mention:

```text
reference type
actual object type
upcasting
IS-A relationship
```

# 134. Challenge 2 — Predict the Output

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

static void test(Animal animal) {
    animal.sound();
}

test(new Dog());
test(new Cat());
```

Expected output:

```text
Dog
Cat
```

# 135. Challenge 3 — Find the Error

```java
class Animal {
}

class Dog extends Animal {

    void fetch() {
        System.out.println("Fetch");
    }
}

Animal animal = new Dog();

animal.fetch();
```

Why does it fail?

Because the reference type is Animal and Animal does not declare `fetch()`.

# 136. Challenge 4 — Safe Cast

Write code that:

```text
1. Stores a Dog in an Animal reference.
2. Checks whether it is a Dog.
3. Downcasts it.
4. Calls fetch().
```

Expected pattern:

```java
Animal animal = new Dog();

if (animal instanceof Dog dog) {
    dog.fetch();
}
```

# 137. Challenge 5 — Multiple Forms

Create:

```java
Animal a1 = new Dog();
Animal a2 = new Cat();
Animal a3 = new Cow();
```

Call:

```java
a1.sound();
a2.sound();
a3.sound();
```

Explain why the same method call produces different output.

# 138. Challenge 6 — Interface

Create:

```java
Payment p = new CardPayment();
```

Then call:

```java
p.pay(500);
```

Explain:

```text
reference type
actual object
interface contract
runtime implementation
```

# 139. Challenge 7 — Field Trap

Given:

```java
class Parent {
    int x = 10;
}

class Child extends Parent {
    int x = 20;
}

Parent p = new Child();

System.out.println(p.x);
```

Predict the output and explain why it is not 20.

# 140. Challenge 8 — Static Trap

Given:

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

Predict the output and explain why static method hiding is different from overriding.

# 141. Challenge 9 — Overloading Trap

Given:

```java
class Parent {
    void show(Parent p) {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    void show(Child c) {
        System.out.println("Child");
    }
}
```

Determine whether:

```java
Parent p = new Child();

p.show(new Child());
```

uses overloading or overriding.

Explain the compile-time method-selection process.

# 142. Challenge 10 — Design

You are designing a payment application.

There are:

```text
UPI
Card
Cash
Wallet
```

Would you prefer:

```text
one giant Payment class with if-else
```

or:

```text
Payment interface
+
separate implementations
```

For this type of problem, explain why interface-based polymorphism can be cleaner.

# 143. Complete Polymorphism Mental Model

Use this model whenever you solve a Java polymorphism question:

```text
                  Common Type
                /      |      \
               /       |       \
            Dog       Cat      Cow
              \        |       /
               \       |      /
                \      |     /
                 Different Objects
```

Then:

```java
Animal animal = new Dog();
```

means:

```text
Animal
  ↓
reference type

Dog
  ↓
actual object
```

For:

```java
animal.sound();
```

think:

```text
1. Is sound() available through Animal?
       ↓
      yes

2. What is the actual object?
       ↓
      Dog

3. Does Dog override sound()?
       ↓
      yes

4. Execute:
      Dog.sound()
```

# 144. The Golden Rules

Remember these rules:

```text
1. Polymorphism means many forms.

2. Method overloading is commonly treated as
   compile-time polymorphism.

3. Method overriding enables runtime polymorphism.

4. Parent reference can point to child object
   when the child IS-A parent.

5. Upcasting is generally safe.

6. Downcasting requires actual type compatibility.

7. instanceof can be used to check runtime compatibility.

8. Reference type controls accessible members.

9. Actual object controls overridden instance-method dispatch.

10. Static methods are hidden, not overridden.

11. Fields are hidden, not overridden.

12. Constructors are not overridden.

13. Interfaces are powerful tools for polymorphism.

14. Abstract classes can provide polymorphic behavior.

15. Polymorphism can reduce dependence on concrete classes.

16. Good polymorphism is based on meaningful abstractions,
    not arbitrary inheritance.
```

# 145. Final Comparison

| Concept | Main Idea | Typical Time |
|---|---|---|
| Method overloading | Same name, different parameters | Compile time |
| Method overriding | Child replaces inherited instance behavior | Runtime dispatch |
| Upcasting | Child object viewed as parent | Compile-time type relationship |
| Downcasting | Parent reference converted to child reference | Runtime check may be required |
| `instanceof` | Checks type compatibility | Runtime |
| Interface polymorphism | Common contract, many implementations | Runtime dispatch for instance methods |
| Abstract-class polymorphism | Common abstract parent, specialized children | Runtime dispatch |
| Field hiding | Child declares same field name | Reference-type based |
| Static method hiding | Child declares same static method signature | Class/reference context, not dynamic override |

# 146. One-Minute Interview Answer

If an interviewer asks:

**"Explain polymorphism in Java."**

A simple strong answer is:

> Polymorphism means many forms. In Java, it allows a common type or operation to work with different implementations. Method overloading is commonly called compile-time polymorphism because the overloaded method is selected during compilation. Method overriding provides runtime polymorphism, where an overridden instance method is selected according to the actual object. For example, `Animal a = new Dog(); a.sound();` uses the Animal reference but executes Dog's overridden `sound()` method.

# 147. Chapter Summary

Polymorphism connects many of the OOP concepts you have already learned.

You started with:

```text
Class
 ↓
Object
 ↓
Encapsulation
 ↓
Inheritance
 ↓
Overloading
 ↓
Overriding
 ↓
Polymorphism
```

The most important statement is:

```java
Parent reference = new Child();
```

This lets a parent type represent a child object.

For overridden instance methods:

```java
parentReference.method();
```

can execute the child implementation.

This is runtime polymorphism and dynamic method dispatch.

Polymorphism can appear through:

```text
inheritance
abstract classes
interfaces
arrays
collections
method parameters
method return values
```

It is especially powerful when code depends on an abstraction rather than a concrete class.

# 148. Final Revision Checklist

Before moving to Chapter 20, make sure you can explain all of these without notes:

```text
[ ] What polymorphism means
[ ] Compile-time polymorphism
[ ] Runtime polymorphism
[ ] Overloading
[ ] Overriding
[ ] Dynamic method dispatch
[ ] Parent reference → child object
[ ] Reference type
[ ] Actual object type
[ ] Upcasting
[ ] Downcasting
[ ] instanceof
[ ] Polymorphic arrays
[ ] Polymorphic collections
[ ] Abstract class polymorphism
[ ] Interface polymorphism
[ ] IS-A relationship
[ ] Fields vs methods
[ ] Static methods vs instance methods
[ ] Why constructors are not polymorphically overridden
[ ] Programming to an abstraction
[ ] Loose coupling
[ ] Substitutability
```

# 149. End of Chapter 19

You have now completed the main polymorphism concept.

The OOP sequence is now:

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
```

In the next chapter, you will study abstraction in depth:

```text
abstract classes
abstract methods
concrete methods
constructors in abstract classes
partial implementation
common contracts
real-world abstraction
```

Abstraction and polymorphism are closely connected, so the next chapter will build directly on what you learned here.
