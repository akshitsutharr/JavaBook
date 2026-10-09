# Chapter 21 — Interfaces

> **Java Master Course — Chapter 21 of 50**
>
> Interfaces are one of the most important parts of Java OOP.
>
> The easiest way to think about an interface is:
>
> **An interface defines a contract or capability that implementing classes agree to provide.**
>
> Interfaces are heavily used in real Java applications, APIs, frameworks, collections, dependency injection, testing, callbacks, lambdas, and design patterns.

---

# 1. What You Will Learn

By the end of this chapter you should understand:

```text
✓ What an interface is
✓ Why interfaces are needed
✓ interface keyword
✓ implements keyword
✓ Interface references
✓ Interface polymorphism
✓ Abstract methods
✓ Interface constants
✓ default methods
✓ static methods
✓ private interface methods
✓ Multiple interfaces
✓ Interface inheritance
✓ Multiple interface inheritance
✓ Abstract classes implementing interfaces
✓ Upcasting and downcasting through interfaces
✓ instanceof with interfaces
✓ Functional interfaces
✓ @FunctionalInterface
✓ Lambdas
✓ Method references
✓ Comparable and Comparator
✓ Interface vs abstract class
✓ Default method conflicts
✓ Loose coupling
✓ Dependency injection
✓ Real-world interface design
✓ Common mistakes
✓ Practical programs
✓ Exercises
✓ Output questions
✓ Interview questions
✓ Mini projects
```

---

# 2. What Is an Interface?

An interface is a Java reference type used to define a contract.

Example:

```java
interface Printable {

    void print();
}
```

The interface says:

```text
A Printable object must provide print().
```

The interface does not need to know how printing is performed.

Different classes can implement the same contract in different ways.

```java
class Report implements Printable {

    @Override
    public void print() {
        System.out.println("Printing report");
    }
}

class Invoice implements Printable {

    @Override
    public void print() {
        System.out.println("Printing invoice");
    }
}
```

Both classes support:

```text
print()
```

but their implementations can be different.

---

# 3. Simple Definition

> **An interface is a Java reference type that defines a contract which implementing classes agree to satisfy.**

Think:

```text
Interface
   ↓
What must be provided?
   ↓
Implementation class
   ↓
How is it provided?
```

Example:

```java
interface Payment {

    void pay(double amount);
}
```

The interface defines:

```text
WHAT:
pay an amount
```

The implementation defines:

```text
HOW:
card
UPI
wallet
cash
etc.
```

---

# 4. Why Do We Need Interfaces?

Imagine a payment application.

There are many payment methods:

```text
Card
UPI
Wallet
Cash
Net Banking
```

All of them need some form of:

```text
pay()
```

If the entire application directly depends on every concrete class, the code can become tightly coupled.

Instead, define:

```java
interface Payment {

    void pay(double amount);
}
```

Now application code can depend on:

```java
Payment
```

rather than one particular implementation.

This is the basic idea behind interface-based design.

---

# 5. Interface as a Contract

Imagine a contract saying:

```text
Every Payment must provide pay().
```

Then:

```java
class CardPayment implements Payment
```

means CardPayment agrees to satisfy that contract.

Similarly:

```java
class UpiPayment implements Payment
```

also agrees.

The implementations may be completely different internally.

That is the power of a contract.

---

# 6. Basic Interface Syntax

```java
interface InterfaceName {

    // members
}
```

Example:

```java
interface Printable {

    void print();
}
```

Implementation:

```java
class Report implements Printable {

    @Override
    public void print() {
        System.out.println("Report");
    }
}
```

The important keywords are:

```text
interface
implements
```

---

# 7. The implements Keyword

A class uses `implements` to implement an interface.

Example:

```java
interface Animal {

    void sound();
}

class Dog implements Animal {

    @Override
    public void sound() {
        System.out.println("Bark");
    }
}
```

Read this as:

```text
Dog implements Animal
```

or:

```text
Dog promises to satisfy Animal's contract.
```

---

# 8. extends vs implements

For class inheritance:

```java
class Dog extends Animal {
}
```

For implementing an interface:

```java
class Dog implements Animal {
}
```

A class can extend one class and implement several interfaces:

```java
class SmartPhone
        extends Device
        implements Camera,
                   GPS,
                   MusicPlayer {
}
```

This is extremely common in Java.

---

# 9. Interface Is a Type

An interface is not merely a collection of method declarations.

It is a Java type.

For example:

```java
interface Payment {

    void pay();
}
```

You can declare:

```java
Payment payment;
```

This is an interface reference.

You can then assign:

```java
payment = new CardPayment();
```

provided CardPayment implements Payment.

---

# 10. Interface Reference

Consider:

```java
Payment payment =
    new CardPayment();
```

There are two important types:

```text
Reference type → Payment
Actual object  → CardPayment
```

The variable is declared as Payment.

The object created by `new` is CardPayment.

This is interface-based polymorphism.

---

# 11. Reference Type Controls Accessible Members

Suppose:

```java
interface Payment {

    void pay();
}

class CardPayment implements Payment {

    @Override
    public void pay() {
    }

    public void refund() {
    }
}
```

Now:

```java
Payment payment =
    new CardPayment();
```

This works:

```java
payment.pay();
```

But:

```java
payment.refund();
```

does not compile.

Why?

Because `refund()` is not part of the Payment reference type.

The object is still CardPayment, but the reference exposes the Payment contract.

---

# 12. Interface Cannot Be Directly Instantiated

This is invalid:

```java
interface Payment {
    void pay();
}

Payment payment =
    new Payment();
```

An interface is not directly instantiated.

Instead:

```java
Payment payment =
    new CardPayment();
```

where CardPayment is a concrete implementing class.

---

# 13. Interface Reference Can Be Declared

This is completely valid:

```java
Payment payment;
```

No object has been created.

This is similar to:

```java
Dog dog;
```

A declaration creates a reference variable, not an object.

An object is created with something such as:

```java
new CardPayment();
```

---

# 14. Interface Polymorphism

Example:

```java
interface Payment {

    void pay();
}

class CardPayment implements Payment {

    @Override
    public void pay() {
        System.out.println("Card");
    }
}

class UpiPayment implements Payment {

    @Override
    public void pay() {
        System.out.println("UPI");
    }
}
```

Now:

```java
Payment p1 =
    new CardPayment();

Payment p2 =
    new UpiPayment();

p1.pay();
p2.pay();
```

Output:

```text
Card
UPI
```

The same interface type represents different implementations.

---

# 15. Runtime Dispatch Through an Interface

For:

```java
Payment payment =
    new CardPayment();

payment.pay();
```

think:

```text
Compile time
    ↓
Payment declares pay()
    ↓
Call is valid

Runtime
    ↓
Actual object = CardPayment
    ↓
CardPayment implementation executes
```

This is runtime polymorphism.

---

# 16. Interface Methods

A traditional interface method without a body is abstract.

Example:

```java
interface Printable {

    void print();
}
```

This method is implicitly:

```java
public abstract void print();
```

So writing:

```java
void print();
```

is enough.

---

# 17. Interface Method Visibility

Interface methods declared without a body are public.

Therefore the implementing method must have compatible visibility.

Correct:

```java
class Report implements Printable {

    @Override
    public void print() {
    }
}
```

Incorrect:

```java
class Report implements Printable {

    @Override
    protected void print() {
    }
}
```

The second version reduces visibility.

That violates the interface contract.

---

# 18. Why Is the Implementing Method public?

Suppose:

```java
interface Printable {

    void print();
}
```

A caller can write:

```java
Printable p =
    new Report();

p.print();
```

The interface promises a public operation.

Therefore the implementation must expose it with public visibility.

---

# 19. Interface Fields

Fields declared directly inside an interface are implicitly:

```text
public
static
final
```

Example:

```java
interface Config {

    int MAX_USERS = 100;
}
```

Conceptually this is:

```java
public static final int MAX_USERS = 100;
```

Therefore interface fields are constants.

They are not ordinary per-object instance fields.

---

# 20. Interface Constant Example

```java
interface MathConstants {

    double PI = 3.141592653589793;
}
```

Use:

```java
System.out.println(
    MathConstants.PI
);
```

The field belongs to the interface type.

It is not a separate copy inside every implementing object.

---

# 21. Interface Fields Are final

This is invalid:

```java
interface Config {

    int LIMIT = 10;
}

Config.LIMIT = 20;
```

Why?

Because:

```text
LIMIT
→ public
→ static
→ final
```

A final variable cannot be reassigned after initialization.

---

# 22. Interface Does Not Have Ordinary Instance Fields

This:

```java
interface User {

    String name = "Aman";
}
```

does not create a separate `name` field for every implementing object.

The field is implicitly:

```java
public static final
```

If every object needs different state, that state normally belongs in the implementing class.

---

# 23. Default Methods

Modern Java interfaces can contain `default` methods.

Example:

```java
interface Vehicle {

    default void stop() {
        System.out.println(
            "Vehicle stopped"
        );
    }
}
```

A class implementing Vehicle can use the default implementation.

```java
class Car implements Vehicle {
}
```

Then:

```java
Car car = new Car();

car.stop();
```

Output:

```text
Vehicle stopped
```

---

# 24. Why Were Default Methods Added?

Suppose an interface is already implemented by many classes.

Originally:

```java
interface Printer {

    void print();
}
```

Later, the library designer wants to add:

```java
void scan();
```

If `scan()` is abstract, existing implementing classes may need to implement it.

A default method allows the interface to provide an implementation:

```java
default void scan() {
    System.out.println(
        "Default scan"
    );
}
```

This helps evolve interfaces while preserving compatibility in many situations.

---

# 25. Overriding a Default Method

```java
interface Vehicle {

    default void stop() {
        System.out.println(
            "Default stop"
        );
    }
}

class Car implements Vehicle {

    @Override
    public void stop() {
        System.out.println(
            "Car stopped"
        );
    }
}
```

Now:

```java
Vehicle v =
    new Car();

v.stop();
```

Output:

```text
Car stopped
```

The class's implementation takes precedence over the inherited default.

---

# 26. Default Method Is an Instance Method

A default method belongs to the instance behavior of the implementing type.

Example:

```java
interface Vehicle {

    default void stop() {
        System.out.println("Stop");
    }
}
```

Use:

```java
Vehicle v =
    new Car();

v.stop();
```

You do not call a default method like a static method:

```java
Vehicle.stop();
```

That is not how default methods work.

---

# 27. Calling a Specific Interface Default

A class can explicitly call a particular interface's default implementation in appropriate situations.

Example:

```java
interface A {

    default void show() {
        System.out.println("A");
    }
}

class B implements A {

    @Override
    public void show() {

        A.super.show();

        System.out.println("B");
    }
}
```

Output:

```text
A
B
```

The syntax is:

```java
A.super.show();
```

---

# 28. Static Methods in Interfaces

Interfaces can contain static methods.

Example:

```java
interface MathUtil {

    static int square(int x) {
        return x * x;
    }
}
```

Call it through the interface:

```java
System.out.println(
    MathUtil.square(5)
);
```

Output:

```text
25
```

---

# 29. Static Interface Methods Are Not Overridden

Suppose:

```java
interface A {

    static void show() {
        System.out.println("A");
    }
}
```

A class does not override that static interface method as an instance method.

Static methods belong to the interface.

Use:

```java
A.show();
```

This is different from a default method.

---

# 30. Private Methods in Interfaces

Modern Java interfaces can contain private methods.

Example:

```java
interface Logger {

    default void info(
        String message
    ) {
        write("INFO", message);
    }

    default void error(
        String message
    ) {
        write("ERROR", message);
    }

    private void write(
        String level,
        String message
    ) {
        System.out.println(
            level + ": " + message
        );
    }
}
```

The private method is an internal helper.

---

# 31. Why Private Interface Methods?

Without a private helper, two default methods might duplicate code.

For example:

```java
default void info(String message) {
    System.out.println(
        "INFO: " + message
    );
}

default void error(String message) {
    System.out.println(
        "ERROR: " + message
    );
}
```

A private helper can centralize formatting:

```java
private void write(
    String level,
    String message
) {
    System.out.println(
        level + ": " + message
    );
}
```

This improves reuse inside the interface.

---

# 32. Private Interface Methods Are Not Part of the Public Contract

Suppose:

```java
interface Logger {

    private void write() {
    }
}
```

An implementing class cannot call:

```java
write();
```

as though it were an inherited public interface method.

The method is private to the interface.

It exists for interface implementation details.

---

# 33. Types of Interface Methods

Modern interfaces can contain:

```text
1. Abstract instance methods
2. Default instance methods
3. Static methods
4. Private instance methods
5. Private static methods
```

A useful mental model:

```text
abstract
→ implementing class supplies behavior

default
→ interface supplies instance behavior

static
→ belongs to interface

private
→ internal interface helper
```

---

# 34. Interface Inheritance

An interface can extend another interface.

Example:

```java
interface Animal {

    void eat();
}

interface Pet extends Animal {

    void play();
}
```

Pet inherits Animal's contract.

So a class implementing Pet must satisfy both contracts.

---

# 35. Implementing a Child Interface

```java
interface Animal {

    void eat();
}

interface Pet extends Animal {

    void play();
}

class Dog implements Pet {

    @Override
    public void eat() {
        System.out.println(
            "Dog eats"
        );
    }

    @Override
    public void play() {
        System.out.println(
            "Dog plays"
        );
    }
}
```

Dog must provide:

```text
eat()
play()
```

---

# 36. Interface Can Extend Multiple Interfaces

Java allows an interface to extend multiple interfaces.

Example:

```java
interface Printable {

    void print();
}

interface Scannable {

    void scan();
}

interface OfficeMachine
        extends Printable,
                Scannable {
}
```

A class implementing OfficeMachine receives the combined contract.

---

# 37. Multiple Interface Inheritance

Conceptually:

```text
Printable ─────┐
               ↓
        OfficeMachine
               ↑
Scannable ─────┘
```

Then:

```java
class Machine
        implements OfficeMachine {
}
```

Machine must satisfy both operations.

This is interface multiple inheritance.

---

# 38. Class Can Implement Multiple Interfaces

Example:

```java
interface Flyable {

    void fly();
}

interface Swimmable {

    void swim();
}

class Duck
        implements Flyable,
                   Swimmable {

    @Override
    public void fly() {
        System.out.println(
            "Duck flies"
        );
    }

    @Override
    public void swim() {
        System.out.println(
            "Duck swims"
        );
    }
}
```

Duck combines two capabilities.

---

# 39. Why Multiple Interfaces Matter

Java does not allow:

```java
class C extends A, B {
}
```

because a class cannot have multiple direct superclasses.

But Java allows:

```java
class C implements A, B {
}
```

when A and B are interfaces.

This provides a flexible way to combine contracts.

---

# 40. Class + Multiple Interfaces

A class can extend one class and implement multiple interfaces:

```java
class SmartPhone
        extends Device
        implements Camera,
                   GPS,
                   MusicPlayer {
}
```

Conceptually:

```text
one superclass
+
many interface contracts
```

This is a very common Java design.

---

# 41. Capability Interfaces

Interfaces are often excellent for representing capabilities.

Example:

```java
interface Flyable {

    void fly();
}
```

Potential implementations:

```text
Bird
Airplane
Drone
```

The important relationship is:

```text
can fly
```

rather than:

```text
is the same kind of object
```

---

# 42. Multiple Capabilities

A class can implement multiple capability interfaces.

```java
class Duck
        implements Flyable,
                   Swimmable,
                   Walkable {
}
```

This expresses:

```text
Duck can fly.
Duck can swim.
Duck can walk.
```

Interfaces therefore work well for roles and capabilities.

---

# 43. Interface Polymorphism

Suppose:

```java
interface Storage {

    void save(String data);
}
```

Implementations:

```java
class FileStorage implements Storage {

    @Override
    public void save(String data) {
        System.out.println(
            "File: " + data
        );
    }
}

class DatabaseStorage implements Storage {

    @Override
    public void save(String data) {
        System.out.println(
            "Database: " + data
        );
    }
}
```

Then:

```java
Storage storage =
    new FileStorage();
```

or:

```java
Storage storage =
    new DatabaseStorage();
```

The common reference type is Storage.

---

# 44. Interface as Method Parameter

This is one of the most useful patterns:

```java
static void backup(
    Storage storage,
    String data
) {
    storage.save(data);
}
```

Call:

```java
backup(
    new FileStorage(),
    "Java"
);

backup(
    new DatabaseStorage(),
    "Java"
);
```

The method does not need separate versions for every storage implementation.

---

# 45. Interface as Return Type

An interface can be used as a return type.

Example:

```java
static Storage createStorage(
    boolean file
) {
    if (file) {
        return new FileStorage();
    }

    return new DatabaseStorage();
}
```

Usage:

```java
Storage storage =
    createStorage(true);

storage.save("Hello");
```

The caller depends on Storage rather than the concrete return class.

---

# 46. Interface in Collections

Java's collections frequently use interfaces as reference types.

Example:

```java
List<String> names =
    new ArrayList<>();
```

Here:

```text
List
→ interface

ArrayList
→ implementation
```

Another example:

```java
Map<String, Integer> scores =
    new HashMap<>();
```

Here:

```text
Map
→ interface

HashMap
→ implementation
```

This style is extremely common in Java.

---

# 47. Why Program to an Interface?

Compare:

```java
ArrayList<String> names =
    new ArrayList<>();
```

with:

```java
List<String> names =
    new ArrayList<>();
```

The second says:

```text
I need List behavior.
```

It does not unnecessarily promise that the rest of the program needs ArrayList specifically.

If later another List implementation is more suitable, the surrounding code may require fewer changes.

---

# 48. Interface and Loose Coupling

Consider:

```java
class OrderService {

    private Payment payment;

    OrderService(
        Payment payment
    ) {
        this.payment = payment;
    }
}
```

OrderService depends on:

```text
Payment
```

not:

```text
CardPayment
```

This can reduce coupling.

The implementation can be changed or replaced without changing the service's basic contract.

---

# 49. Interface and Dependency Injection

An interface is often used as a dependency-injection boundary.

Example:

```java
interface Logger {

    void log(String message);
}
```

Implementations:

```java
class ConsoleLogger
        implements Logger {

    @Override
    public void log(String message) {
        System.out.println(
            "Console: " + message
        );
    }
}
```

Service:

```java
class UserService {

    private final Logger logger;

    UserService(Logger logger) {
        this.logger = logger;
    }

    void createUser() {
        logger.log(
            "User created"
        );
    }
}
```

Now:

```java
UserService service =
    new UserService(
        new ConsoleLogger()
    );
```

The service receives its dependency.

---

# 50. Why This Helps Testing

Suppose production uses:

```text
DatabaseLogger
```

For a test, we could provide:

```text
FakeLogger
```

as long as it implements:

```java
Logger
```

Then UserService can be tested without changing its source code.

This is one practical advantage of interface-based dependency injection.

---

# 51. Interface and Abstraction

Interfaces provide an abstraction boundary.

Example:

```java
interface Payment {

    void pay(double amount);
}
```

The caller knows:

```text
payment.pay(amount)
```

The caller does not need to know every internal step.

The concrete implementation might perform:

```text
validation
authentication
network calls
database operations
logging
retry handling
```

The abstraction keeps these details behind the contract.

---

# 52. Interface and Polymorphism

These ideas work together:

```text
interface
   ↓
common contract
   ↓
multiple implementations
   ↓
interface reference
   ↓
runtime polymorphism
```

Example:

```java
Payment payment =
    new UpiPayment();

payment.pay(500);
```

The reference type is Payment.

The object is UpiPayment.

The overridden implementation executes at runtime.

---

# 53. Interface and Encapsulation

Interfaces and encapsulation solve different problems.

Encapsulation focuses on:

```text
protecting internal state
controlling access
hiding class implementation details
```

An interface focuses on:

```text
defining a usable contract
```

They can be used together.

Example:

```java
interface AccountService {

    void deposit(double amount);
}
```

The implementing class can keep:

```java
private double balance;
```

while exposing only required operations.

---

# 54. Interface and Inheritance

Interface inheritance uses:

```java
extends
```

Class implementation uses:

```java
implements
```

Example:

```java
interface Animal {
    void eat();
}

interface Pet extends Animal {
    void play();
}

class Dog implements Pet {
    public void eat() {
    }

    public void play() {
    }
}
```

The interface hierarchy defines contracts.

The class supplies implementation.

---

# 55. Abstract Class Implementing an Interface

An abstract class can implement an interface without implementing every abstract method.

Example:

```java
interface Payment {

    void pay();
}

abstract class BasePayment
        implements Payment {

    void log() {
        System.out.println(
            "Payment started"
        );
    }
}
```

BasePayment is abstract.

It can leave `pay()` for a concrete subclass.

---

# 56. Concrete Class Completing the Contract

```java
class CardPayment
        extends BasePayment {

    @Override
    public void pay() {
        System.out.println(
            "Card payment"
        );
    }
}
```

Relationship:

```text
Payment
   ↑
BasePayment
   ↑
CardPayment
```

CardPayment ultimately satisfies Payment.

---

# 57. Upcasting Through an Interface

Suppose:

```java
class Dog implements Animal {

    @Override
    public void eat() {
        System.out.println(
            "Dog eats"
        );
    }

    public void fetch() {
        System.out.println(
            "Fetch"
        );
    }
}
```

Then:

```java
Animal animal =
    new Dog();
```

This is upcasting to an interface type.

The actual object remains Dog.

---

# 58. Downcasting Through an Interface

If:

```java
Animal animal =
    new Dog();
```

and the actual object is known to be Dog:

```java
Dog dog =
    (Dog) animal;
```

Now:

```java
dog.fetch();
```

can be called.

The cast is safe only when the actual object is compatible with Dog.

---

# 59. instanceof with Interfaces

Example:

```java
Object value =
    new CardPayment();

if (value instanceof Payment) {
    System.out.println(
        "It is a Payment"
    );
}
```

Output:

```text
It is a Payment
```

An object can be compatible with both:

```text
its class
+
interfaces it implements
```

---

# 60. instanceof with null

Example:

```java
Payment payment = null;

System.out.println(
    payment instanceof Payment
);
```

Output:

```text
false
```

`null` does not refer to an object.

---

# 61. Safe Interface Downcasting

Example:

```java
Object value =
    new CardPayment();

if (value instanceof Payment payment) {

    payment.pay(500);
}
```

Modern Java's pattern matching can combine:

```text
type check
+
cast
+
new local variable
```

The exact syntax available depends on the Java version being used.

---

# 62. Functional Interface

A functional interface is an interface with exactly one abstract method.

Example:

```java
@FunctionalInterface
interface Calculator {

    int calculate(
        int a,
        int b
    );
}
```

This interface can be implemented with a lambda.

```java
Calculator add =
    (a, b) -> a + b;
```

---

# 63. @FunctionalInterface

Java provides:

```java
@FunctionalInterface
```

to express the intention that an interface is functional.

Example:

```java
@FunctionalInterface
interface Greeting {

    void greet(String name);
}
```

If you accidentally add another abstract method, the compiler can report an error.

This makes the design intention explicit.

---

# 64. Functional Interface Does Not Mean One Method Total

A functional interface must have exactly one abstract method.

It can still have:

```text
default methods
static methods
private methods
```

For example:

```java
@FunctionalInterface
interface Task {

    void run();

    default void log() {
        System.out.println("Running");
    }

    static void info() {
        System.out.println("Task");
    }
}
```

It is still functional because only `run()` is abstract.

---

# 65. Lambda and Functional Interface

Example:

```java
@FunctionalInterface
interface Greeting {

    void greet(String name);
}
```

Lambda:

```java
Greeting greeting =
    name -> System.out.println(
        "Hello " + name
    );
```

Call:

```java
greeting.greet("Aman");
```

Output:

```text
Hello Aman
```

The lambda provides the implementation of the single abstract method.

---

# 66. Functional Interface — Calculator

```java
@FunctionalInterface
interface Calculator {

    int calculate(
        int a,
        int b
    );
}

public class Main {

    public static void main(
        String[] args
    ) {

        Calculator add =
            (a, b) -> a + b;

        Calculator multiply =
            (a, b) -> a * b;

        System.out.println(
            add.calculate(10, 20)
        );

        System.out.println(
            multiply.calculate(10, 20)
        );
    }
}
```

Output:

```text
30
200
```

---

# 67. Method References

Functional interfaces can also work with method references.

Example:

```java
@FunctionalInterface
interface Printer {

    void print(String value);
}
```

Method reference:

```java
Printer printer =
    System.out::println;
```

Then:

```java
printer.print("Java");
```

Output:

```text
Java
```

The method reference supplies the required behavior.

---

# 68. Common Functional Interfaces

Java provides many functional interfaces in:

```java
java.util.function
```

Important examples:

```text
Predicate<T>
Function<T, R>
Consumer<T>
Supplier<T>
UnaryOperator<T>
BinaryOperator<T>
```

You will study these in more detail in the lambda and functional-programming chapters.

---

# 69. Comparable Is an Interface

Java's `Comparable<T>` is an interface.

A class can implement it to define its natural ordering.

Example:

```java
class Student
        implements Comparable<Student> {

    private int marks;

    Student(int marks) {
        this.marks = marks;
    }

    @Override
    public int compareTo(
        Student other
    ) {
        return Integer.compare(
            this.marks,
            other.marks
        );
    }
}
```

This is a real standard-library use of interfaces.

---

# 70. Comparator Is an Interface

`Comparator<T>` is also an interface.

It allows ordering logic to be defined separately from the class.

Example:

```java
Comparator<Student> byMarks =
    (a, b) ->
        Integer.compare(
            a.getMarks(),
            b.getMarks()
        );
```

Comparable and Comparator are studied more deeply in Chapter 36.

---

# 71. Default Method Conflict

Suppose:

```java
interface A {

    default void show() {
        System.out.println("A");
    }
}

interface B {

    default void show() {
        System.out.println("B");
    }
}
```

Now:

```java
class C implements A, B {
}
```

There are two competing default implementations.

Java requires the class to resolve the conflict.

---

# 72. Resolving Default Method Conflict

One solution is to override:

```java
class C implements A, B {

    @Override
    public void show() {
        System.out.println(
            "C implementation"
        );
    }
}
```

Now C provides the final implementation.

Another possibility is explicitly calling one interface's default:

```java
@Override
public void show() {

    A.super.show();
}
```

---

# 73. Why Does Java Resolve the Conflict?

Suppose Java silently chose A:

```text
A.show()
```

Then adding B could unexpectedly change behavior.

If it silently chose B:

```text
B.show()
```

the same problem occurs.

Requiring the implementing class to resolve the conflict makes the design decision explicit.

---

# 74. Interface Static Method Conflict

Static methods are different from default methods.

Suppose:

```java
interface A {

    static void show() {
        System.out.println("A");
    }
}

interface B {

    static void show() {
        System.out.println("B");
    }
}
```

Call:

```java
A.show();
B.show();
```

There is no instance-method default conflict.

Static methods belong to their respective interfaces.

---

# 75. Interface Naming

Interface names normally use PascalCase.

Examples:

```text
Runnable
Comparable
Serializable
List
Map
Payment
Storage
Notification
Printable
```

Capability-style names are common:

```text
Printable
Flyable
Payable
Searchable
Cacheable
```

The name should describe the contract clearly.

---

# 76. Good Interface Design

A good interface should represent a meaningful contract.

Good:

```java
interface Payment {

    void pay(double amount);
}
```

The operation clearly belongs to the concept.

Avoid meaningless designs such as:

```java
interface Everything {

    void doSomething();
}
```

The interface should communicate useful information to developers.

---

# 77. Small Interfaces

A very large interface can become difficult to implement.

For example:

```java
interface Machine {

    void print();
    void scan();
    void fax();
    void staple();
    void bind();
}
```

A simple printer may not support all these operations.

Smaller interfaces can be better:

```java
interface Printable {
    void print();
}

interface Scannable {
    void scan();
}
```

This connects with the Interface Segregation Principle.

---

# 78. Interface Segregation Principle — Basic Idea

One of the SOLID principles says, in simple terms:

> Clients should not be forced to depend on methods they do not need.

Instead of one huge interface:

```text
Machine
├── print
├── scan
├── fax
├── staple
└── bind
```

we can use focused contracts:

```text
Printable
Scannable
Faxable
Stapleable
Bindable
```

A class implements only the capabilities it actually supports.

SOLID design is studied more in Chapter 23.

---

# 79. Interface and Dependency Inversion — Basic Idea

Another SOLID idea is to depend on abstractions rather than concrete implementations.

Instead of:

```java
class OrderService {

    private CardPayment payment;
}
```

we can use:

```java
class OrderService {

    private Payment payment;
}
```

Now the service can work with:

```text
CardPayment
UpiPayment
WalletPayment
```

as long as they implement Payment.

---

# 80. Interface-Based API Design

Suppose a service needs storage.

Instead of:

```java
void backup(
    DatabaseStorage storage
)
```

we can write:

```java
void backup(
    Storage storage
)
```

when the service only needs Storage behavior.

Then:

```java
backup(new FileStorage());
backup(new DatabaseStorage());
backup(new CloudStorage());
```

The API becomes more general.

---

# 81. Interface and Replaceable Implementations

Suppose:

```java
interface Storage {
    void save(String data);
}
```

Implementations:

```text
FileStorage
DatabaseStorage
CloudStorage
MemoryStorage
```

The application can select an implementation based on its environment.

For example:

```text
development
→ MemoryStorage

testing
→ FakeStorage

production
→ DatabaseStorage
```

The consuming code can remain based on Storage.

---

# 82. Interface and Mock/Fake Objects

Testing often benefits from interfaces.

Example:

```java
interface PaymentGateway {

    boolean charge(double amount);
}
```

Production:

```java
class RealPaymentGateway
        implements PaymentGateway {
}
```

Testing:

```java
class FakePaymentGateway
        implements PaymentGateway {
}
```

The application can receive either implementation.

This makes testing easier without requiring a real external service.

---

# 83. Interface-Based Notification System

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
```

Service:

```java
class NotificationService {

    void send(
        Notification notification,
        String message
    ) {
        notification.send(message);
    }
}
```

This is interface-based polymorphism.

---

# 84. Complete Notification Example

```java
interface Notification {

    void send(String message);
}

class EmailNotification
        implements Notification {

    @Override
    public void send(String message) {
        System.out.println(
            "Email sent: " + message
        );
    }
}

class SmsNotification
        implements Notification {

    @Override
    public void send(String message) {
        System.out.println(
            "SMS sent: " + message
        );
    }
}

class PushNotification
        implements Notification {

    @Override
    public void send(String message) {
        System.out.println(
            "Push sent: " + message
        );
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        Notification[] notifications = {
            new EmailNotification(),
            new SmsNotification(),
            new PushNotification()
        };

        for (
            Notification notification :
            notifications
        ) {
            notification.send("Welcome");
        }
    }
}
```

Output:

```text
Email sent: Welcome
SMS sent: Welcome
Push sent: Welcome
```

---

# 85. Complete Payment Example

```java
interface Payment {

    void pay(double amount);
}

class CardPayment
        implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Paid by card: " + amount
        );
    }
}

class UpiPayment
        implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Paid by UPI: " + amount
        );
    }
}

class WalletPayment
        implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Paid by wallet: " + amount
        );
    }
}

class PaymentProcessor {

    void process(
        Payment payment,
        double amount
    ) {
        payment.pay(amount);
    }
}
```

Usage:

```java
PaymentProcessor processor =
    new PaymentProcessor();

processor.process(
    new CardPayment(),
    500
);

processor.process(
    new UpiPayment(),
    800
);

processor.process(
    new WalletPayment(),
    300
);
```

---

# 86. Complete Storage Example

```java
interface Storage {

    void save(String data);
}

class FileStorage implements Storage {

    @Override
    public void save(String data) {
        System.out.println(
            "File storage: " + data
        );
    }
}

class DatabaseStorage
        implements Storage {

    @Override
    public void save(String data) {
        System.out.println(
            "Database storage: " +
            data
        );
    }
}

class CloudStorage
        implements Storage {

    @Override
    public void save(String data) {
        System.out.println(
            "Cloud storage: " + data
        );
    }
}

class BackupService {

    void backup(
        Storage storage,
        String data
    ) {
        storage.save(data);
    }
}
```

The BackupService depends only on Storage.

---

# 87. Complete Logger Example

```java
interface Logger {

    void log(String message);
}

class ConsoleLogger
        implements Logger {

    @Override
    public void log(String message) {
        System.out.println(
            "Console: " + message
        );
    }
}

class FileLogger
        implements Logger {

    @Override
    public void log(String message) {
        System.out.println(
            "File: " + message
        );
    }
}

class Application {

    private final Logger logger;

    Application(Logger logger) {
        this.logger = logger;
    }

    void run() {
        logger.log(
            "Application started"
        );
    }
}
```

Usage:

```java
Application app =
    new Application(
        new ConsoleLogger()
    );

app.run();
```

---

# 88. Complete Smart Device Example

```java
interface Camera {

    void takePhoto();
}

interface MusicPlayer {

    void play();
}

interface GPS {

    void navigate();
}

class SmartPhone
        implements Camera,
                   MusicPlayer,
                   GPS {

    @Override
    public void takePhoto() {
        System.out.println(
            "Photo taken"
        );
    }

    @Override
    public void play() {
        System.out.println(
            "Music playing"
        );
    }

    @Override
    public void navigate() {
        System.out.println(
            "Navigation started"
        );
    }
}
```

One class provides three different capabilities.

---

# 89. Multiple Interface References

```java
SmartPhone phone =
    new SmartPhone();

Camera camera = phone;
MusicPlayer player = phone;
GPS gps = phone;

camera.takePhoto();
player.play();
gps.navigate();
```

There is still only one SmartPhone object.

There are multiple references representing different interface views of that object.

---

# 90. Interface Inheritance Example

```java
interface Animal {

    void eat();
}

interface Pet extends Animal {

    void play();
}

class Dog implements Pet {

    @Override
    public void eat() {
        System.out.println(
            "Dog eats"
        );
    }

    @Override
    public void play() {
        System.out.println(
            "Dog plays"
        );
    }
}
```

The relationship is:

```text
Animal
  ↑
 Pet
  ↑
 Dog
```

Dog satisfies the complete inherited contract.

---

# 91. Abstract Class + Interface

```java
interface Payment {

    void pay(double amount);
}

abstract class BasePayment
        implements Payment {

    protected String transactionId;

    BasePayment(String transactionId) {
        this.transactionId =
            transactionId;
    }

    void showTransaction() {
        System.out.println(
            "Transaction: " +
            transactionId
        );
    }
}

class CardPayment
        extends BasePayment {

    CardPayment(String id) {
        super(id);
    }

    @Override
    public void pay(double amount) {
        System.out.println(
            "Card payment: " +
            amount
        );
    }
}
```

This combines:

```text
interface
abstract class
inheritance
implementation
polymorphism
```

---

# 92. Interface vs Abstract Class

Both can be used to create abstractions.

A useful basic comparison:

```text
Abstract class
→ common base class
→ can hold instance state
→ can have constructors
→ can have concrete methods
→ can have abstract methods

Interface
→ contract/capability/type
→ no constructors
→ fields are public static final
→ can have abstract/default/static/private methods
→ class can implement multiple interfaces
```

Do not use the old rule:

```text
"Interface can contain only abstract methods."
```

That is not true for modern Java.

---

# 93. Detailed Comparison Table

| Feature | Abstract Class | Interface |
|---|---|---|
| Declaration | `abstract class` | `interface` |
| Direct instantiation | No | No |
| Constructors | Yes | No |
| Instance fields | Yes | No ordinary instance fields |
| Abstract methods | Yes | Yes |
| Concrete instance methods | Yes | Yes, through `default` |
| Static methods | Yes | Yes |
| Private methods | Yes | Yes |
| Final methods | Yes | Interface methods follow their own rules |
| Multiple implementation | One superclass | Multiple interfaces |
| Main purpose | Shared base/state/implementation | Contract/capability/type |

---

# 94. When Should You Use an Abstract Class?

An abstract class can be a good choice when subclasses:

```text
share important state
share substantial implementation
need common constructor logic
belong to one strong class hierarchy
share protected/common behavior
```

Example:

```text
Employee
├── Developer
├── Manager
└── Designer
```

Common state:

```text
name
employeeId
```

Common methods:

```text
display()
```

Specialized method:

```text
calculateSalary()
```

An abstract Employee class can model this well.

---

# 95. When Should You Use an Interface?

An interface can be a good choice when you need:

```text
a capability
a contract
a service boundary
a replaceable implementation
a role shared by unrelated classes
multiple independent capabilities
```

Examples:

```text
Runnable
Comparable
List
Map
Payment
Storage
Logger
Printable
```

---

# 96. Interface as a Capability

Compare:

```text
Bird IS-A Animal
```

with:

```text
Bird CAN-FLY
```

The first is naturally modeled with inheritance.

The second can naturally be represented by:

```java
interface Flyable {
    void fly();
}
```

This distinction helps avoid unnecessary inheritance.

---

# 97. Interfaces and Composition

Interfaces often work together with composition.

Example:

```java
class OrderService {

    private final Payment payment;

    OrderService(Payment payment) {
        this.payment = payment;
    }
}
```

The service HAS-A Payment dependency.

The dependency is represented by an interface.

This gives both:

```text
composition
+
polymorphism
```

---

# 98. Interface Does Not Mean Every Class Is Related

Consider:

```text
Printer
Robot
Database
```

All might implement:

```java
interface Loggable {
    void log();
}
```

They do not need to belong to the same class hierarchy.

The interface represents a shared capability or contract.

---

# 99. Interface and IS-A

If:

```java
class Dog implements Animal
```

then Dog can be treated as an Animal type.

So:

```text
Dog IS-A Animal
```

in the type-system sense.

Similarly:

```java
Payment p =
    new CardPayment();
```

CardPayment is a Payment type because it implements Payment.

---

# 100. Interface and Object

All ordinary Java classes ultimately derive from Object.

Therefore:

```java
Object value =
    new CardPayment();
```

is valid.

The object can also be viewed through interfaces it implements:

```java
Payment payment =
    new CardPayment();
```

One object can therefore have several valid reference types.

---

# 101. Interface Reference vs Concrete Reference

Compare:

```java
CardPayment card =
    new CardPayment();
```

and:

```java
Payment payment =
    new CardPayment();
```

The first exposes CardPayment's public API.

The second exposes the Payment contract.

Use the more specific type when specific behavior is genuinely required.

Use the abstraction when the surrounding code only needs the abstraction.

---

# 102. Do Not Use Interfaces Just for Decoration

An interface is useful when it expresses a meaningful design boundary.

Bad reasoning:

```text
"Every class must have an interface."
```

Better reasoning:

```text
"Does this dependency benefit from a contract
and replaceable implementation?"
```

Use interfaces where they make the design clearer or more flexible.

---

# 103. Common Mistake — Forgetting public

Wrong:

```java
interface Printable {

    void print();
}

class Report implements Printable {

    void print() {
    }
}
```

Correct:

```java
class Report implements Printable {

    public void print() {
    }
}
```

The implementation must not reduce the visibility of the interface method.

---

# 104. Common Mistake — Instantiating an Interface

Wrong:

```java
Payment p =
    new Payment();
```

Correct:

```java
Payment p =
    new CardPayment();
```

The implementing class must be concrete and satisfy the required contract.

---

# 105. Common Mistake — Treating Interface Fields as Instance Fields

Wrong mental model:

```text
Every implementing object gets its own interface field.
```

Correct:

```text
Interface fields are implicitly
public static final.
```

They are constants associated with the interface.

---

# 106. Common Mistake — Thinking Interfaces Have Constructors

Interfaces do not have constructors.

This is invalid:

```java
interface Payment {

    Payment() {
    }
}
```

Constructors belong to classes.

An implementing class can have constructors.

---

# 107. Common Mistake — Interface Has Only Abstract Methods

This old statement is incomplete:

```text
"An interface can only contain abstract methods."
```

Modern Java interfaces can contain:

```text
abstract methods
default methods
static methods
private methods
```

and fields that are implicitly constants.

---

# 108. Common Mistake — Default Means static

A default method is an instance method.

Example:

```java
default void stop() {
}
```

Use it through an object/reference:

```java
vehicle.stop();
```

A static method is called through the interface:

```java
InterfaceName.method();
```

Do not confuse them.

---

# 109. Common Mistake — Static Interface Method Can Be Overridden

Static interface methods are not overridden like instance methods.

They belong to the interface.

Use:

```java
InterfaceName.method();
```

Do not expect runtime polymorphism for static interface methods.

---

# 110. Common Mistake — Ignoring Default Conflicts

If:

```java
interface A {
    default void show() {}
}

interface B {
    default void show() {}
}
```

then:

```java
class C implements A, B {
}
```

must resolve the conflict.

The compiler does not simply choose one silently.

---

# 111. Common Mistake — Downcasting Without Checking

Suppose:

```java
Payment payment =
    new UpiPayment();
```

This is unsafe:

```java
CardPayment card =
    (CardPayment) payment;
```

because the actual object is UpiPayment.

The cast can throw:

```text
ClassCastException
```

Use a reliable type guarantee or `instanceof` when appropriate.

---

# 112. Common Mistake — Too Many instanceof Checks

This:

```java
if (payment instanceof CardPayment) {
}
else if (payment instanceof UpiPayment) {
}
else if (payment instanceof WalletPayment) {
}
```

may be a sign that polymorphic behavior should be placed in the interface implementations.

Instead, often:

```java
payment.pay(amount);
```

is cleaner.

Type checks are not forbidden; they should be used when the specific type genuinely matters.

---

# 113. Common Mistake — Huge Interfaces

Avoid interfaces that force unrelated capabilities together.

Instead of:

```java
interface SuperMachine {
    void print();
    void scan();
    void fax();
    void cook();
    void drive();
}
```

create meaningful contracts:

```text
Printable
Scannable
Faxable
Cookable
Drivable
```

Classes can implement the capabilities they actually support.

---

# 114. Common Mistake — Interface for Every Tiny Class

Do not automatically create:

```text
Student
StudentInterface
```

if there is no useful abstraction.

Interfaces have value when they communicate a contract, capability, variation point, or dependency boundary.

---

# 115. Practical Program — Payment Gateway

```java
interface Payment {

    void pay(double amount);
}

class CardPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Card payment: " + amount
        );
    }
}

class UpiPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "UPI payment: " + amount
        );
    }
}

class WalletPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Wallet payment: " + amount
        );
    }
}

class PaymentGateway {

    void process(
        Payment payment,
        double amount
    ) {
        payment.pay(amount);
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        PaymentGateway gateway =
            new PaymentGateway();

        gateway.process(
            new CardPayment(),
            500
        );

        gateway.process(
            new UpiPayment(),
            800
        );

        gateway.process(
            new WalletPayment(),
            300
        );
    }
}
```

---

# 116. Practical Program — Storage Service

```java
interface Storage {

    void save(String data);
}

class FileStorage
        implements Storage {

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

class CloudStorage
        implements Storage {

    @Override
    public void save(String data) {
        System.out.println(
            "Saving to cloud: " + data
        );
    }
}

class StorageService {

    void backup(
        Storage storage,
        String data
    ) {
        storage.save(data);
    }
}
```

---

# 117. Practical Program — Notification Manager

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

class NotificationManager {

    void send(
        Notification notification,
        String message
    ) {
        notification.send(message);
    }
}
```

---

# 118. Practical Program — Logger

```java
interface Logger {

    void log(String message);
}

class ConsoleLogger
        implements Logger {

    @Override
    public void log(String message) {
        System.out.println(
            "Console: " + message
        );
    }
}

class FileLogger
        implements Logger {

    @Override
    public void log(String message) {
        System.out.println(
            "File: " + message
        );
    }
}

class DatabaseLogger
        implements Logger {

    @Override
    public void log(String message) {
        System.out.println(
            "Database: " + message
        );
    }
}
```

---

# 119. Practical Program — Search Engine

```java
interface SearchEngine {

    void search(String query);
}

class DatabaseSearch
        implements SearchEngine {

    @Override
    public void search(String query) {
        System.out.println(
            "Database search: " + query
        );
    }
}

class WebSearch
        implements SearchEngine {

    @Override
    public void search(String query) {
        System.out.println(
            "Web search: " + query
        );
    }
}

class FileSearch
        implements SearchEngine {

    @Override
    public void search(String query) {
        System.out.println(
            "File search: " + query
        );
    }
}

class SearchService {

    void execute(
        SearchEngine engine,
        String query
    ) {
        engine.search(query);
    }
}
```

---

# 120. Practical Program — Discount Strategy

```java
interface DiscountStrategy {

    double discount(double amount);
}

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

class PremiumDiscount
        implements DiscountStrategy {

    @Override
    public double discount(
        double amount
    ) {
        return amount * 0.10;
    }
}

class ShoppingCart {

    private final DiscountStrategy strategy;

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

This demonstrates the Strategy pattern idea through interfaces.

---

# 121. Practical Program — Smart Device

```java
interface Camera {

    void takePhoto();
}

interface MusicPlayer {

    void play();
}

interface GPS {

    void navigate();
}

class SmartPhone
        implements Camera,
                   MusicPlayer,
                   GPS {

    @Override
    public void takePhoto() {
        System.out.println(
            "Photo taken"
        );
    }

    @Override
    public void play() {
        System.out.println(
            "Music playing"
        );
    }

    @Override
    public void navigate() {
        System.out.println(
            "Navigation started"
        );
    }
}
```

Usage:

```java
SmartPhone phone =
    new SmartPhone();

Camera camera = phone;
MusicPlayer player = phone;
GPS gps = phone;

camera.takePhoto();
player.play();
gps.navigate();
```

---

# 122. Practical Program — Functional Interface

```java
@FunctionalInterface
interface Calculator {

    int calculate(
        int a,
        int b
    );
}

public class Main {

    public static void main(
        String[] args
    ) {

        Calculator add =
            (a, b) -> a + b;

        Calculator subtract =
            (a, b) -> a - b;

        Calculator multiply =
            (a, b) -> a * b;

        System.out.println(
            add.calculate(10, 5)
        );

        System.out.println(
            subtract.calculate(10, 5)
        );

        System.out.println(
            multiply.calculate(10, 5)
        );
    }
}
```

Output:

```text
15
5
50
```

---

# 123. Practical Program — Default Method

```java
interface Vehicle {

    void start();

    default void stop() {
        System.out.println(
            "Vehicle stopped"
        );
    }
}

class Car implements Vehicle {

    @Override
    public void start() {
        System.out.println(
            "Car started"
        );
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        Car car = new Car();

        car.start();
        car.stop();
    }
}
```

Output:

```text
Car started
Vehicle stopped
```

---

# 124. Practical Program — Static Interface Method

```java
interface Validator {

    static boolean positive(
        int value
    ) {
        return value > 0;
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        System.out.println(
            Validator.positive(10)
        );

        System.out.println(
            Validator.positive(-5)
        );
    }
}
```

Output:

```text
true
false
```

---

# 125. Practical Program — Private Interface Helper

```java
interface Logger {

    default void info(
        String message
    ) {
        write("INFO", message);
    }

    default void error(
        String message
    ) {
        write("ERROR", message);
    }

    private void write(
        String level,
        String message
    ) {
        System.out.println(
            level + ": " + message
        );
    }
}

class AppLogger implements Logger {
}

public class Main {

    public static void main(
        String[] args
    ) {

        AppLogger logger =
            new AppLogger();

        logger.info("Started");
        logger.error("Failed");
    }
}
```

Output:

```text
INFO: Started
ERROR: Failed
```

---

# 126. Output Question 1

```java
interface Animal {

    void sound();
}

class Dog implements Animal {

    @Override
    public void sound() {
        System.out.println("Bark");
    }
}

Animal animal =
    new Dog();

animal.sound();
```

Output:

```text
Bark
```

Reason:

```text
reference type = Animal
actual object = Dog
Dog implements sound()
```

---

# 127. Output Question 2 — Default Method

```java
interface Vehicle {

    default void stop() {
        System.out.println("Stop");
    }
}

class Car implements Vehicle {
}

Car car = new Car();

car.stop();
```

Output:

```text
Stop
```

Car inherits the default method.

---

# 128. Output Question 3 — Override Default

```java
interface Vehicle {

    default void stop() {
        System.out.println("Vehicle");
    }
}

class Car implements Vehicle {

    @Override
    public void stop() {
        System.out.println("Car");
    }
}

Vehicle v =
    new Car();

v.stop();
```

Output:

```text
Car
```

---

# 129. Output Question 4 — Static

```java
interface MathUtil {

    static int square(int x) {
        return x * x;
    }
}

System.out.println(
    MathUtil.square(4)
);
```

Output:

```text
16
```

---

# 130. Output Question 5 — Constant

```java
interface Config {

    int LIMIT = 10;
}

System.out.println(
    Config.LIMIT
);
```

Output:

```text
10
```

`LIMIT` is implicitly public static final.

---

# 131. Output Question 6 — Multiple Interfaces

```java
interface A {
    void a();
}

interface B {
    void b();
}

class C implements A, B {

    public void a() {
        System.out.println("A");
    }

    public void b() {
        System.out.println("B");
    }
}

C c = new C();

c.a();
c.b();
```

Output:

```text
A
B
```

---

# 132. Output Question 7 — Interface Polymorphism

```java
interface Payment {

    void pay();
}

class Card implements Payment {

    public void pay() {
        System.out.println("Card");
    }
}

class Upi implements Payment {

    public void pay() {
        System.out.println("UPI");
    }
}

Payment p1 = new Card();
Payment p2 = new Upi();

p1.pay();
p2.pay();
```

Output:

```text
Card
UPI
```

---

# 133. Output Question 8 — instanceof

```java
interface Printable {
    void print();
}

class Report implements Printable {

    public void print() {
    }
}

Object obj =
    new Report();

System.out.println(
    obj instanceof Printable
);
```

Output:

```text
true
```

---

# 134. Output Question 9 — null

```java
Printable p = null;

System.out.println(
    p instanceof Printable
);
```

Output:

```text
false
```

---

# 135. Output Question 10 — Functional Interface

```java
@FunctionalInterface
interface Calculator {

    int add(int a, int b);
}

Calculator c =
    (a, b) -> a + b;

System.out.println(
    c.add(2, 3)
);
```

Output:

```text
5
```

---

# 136. Output Question 11 — Default Conflict

```java
interface A {

    default void show() {
        System.out.println("A");
    }
}

interface B {

    default void show() {
        System.out.println("B");
    }
}

class C implements A, B {
}
```

Result:

```text
Compilation error
```

C must resolve the conflict.

---

# 137. Output Question 12 — Interface Constant

```java
interface Config {

    int MAX = 10;
}

class App implements Config {
}

System.out.println(
    App.MAX
);
```

The constant can be inherited as a static field name through the implementing type in this context, but the clearer and preferred form is:

```java
Config.MAX
```

Remember that the field is public static final.

---

# 138. Compilation Question 13 — Missing public

```java
interface Printable {

    void print();
}

class Report implements Printable {

    void print() {
    }
}
```

Result:

```text
Compilation error
```

The method has weaker visibility than the public interface method.

---

# 139. Compilation Question 14 — Direct Instantiation

```java
interface Payment {
    void pay();
}

Payment p =
    new Payment();
```

Result:

```text
Compilation error
```

An interface cannot be directly instantiated.

---

# 140. Compilation Question 15 — Reassign Constant

```java
interface Config {

    int LIMIT = 10;
}

Config.LIMIT = 20;
```

Result:

```text
Compilation error
```

The field is final.

---

# 141. Compilation Question 16 — Multiple Classes

Invalid:

```java
class C extends A, B {
}
```

Java does not support multiple direct superclass inheritance.

Valid:

```java
class C implements A, B {
}
```

when A and B are interfaces.

---

# 142. Compilation Question 17 — Abstract Implementation

```java
interface Payment {
    void pay();
}

abstract class BasePayment
        implements Payment {
}
```

This is valid.

BasePayment remains abstract.

---

# 143. Compilation Question 18 — Concrete Child

```java
interface Payment {
    void pay();
}

abstract class BasePayment
        implements Payment {
}

class CardPayment
        extends BasePayment {
}
```

Result:

```text
Compilation error
```

CardPayment is concrete but has not implemented `pay()`.

---

# 144. Compilation Question 19 — Abstract Child

```java
interface Payment {
    void pay();
}

abstract class BasePayment
        implements Payment {
}

abstract class CardPayment
        extends BasePayment {
}
```

This is valid.

CardPayment remains abstract.

---

# 145. Interview Questions — Basics

## Q1. What is an interface?

An interface is a Java reference type that defines a contract for implementing classes.

## Q2. Which keyword declares an interface?

```java
interface
```

## Q3. Which keyword does a class use to implement an interface?

```java
implements
```

## Q4. Can an interface be directly instantiated?

No.

## Q5. Can an interface be used as a reference type?

Yes.

## Q6. Can a class implement multiple interfaces?

Yes.

## Q7. Can an interface extend another interface?

Yes.

## Q8. Can an interface extend multiple interfaces?

Yes.

---

# 146. Interview Questions — Methods

## Q9. What is a normal interface method without a body?

It is implicitly public and abstract.

## Q10. Can an interface have concrete methods?

Yes, through default methods and other supported forms.

## Q11. Can interfaces have static methods?

Yes.

## Q12. Can interfaces have private methods?

Yes, modern Java supports private interface methods.

## Q13. Can an interface have fields?

Yes, but fields declared directly in an interface are implicitly public static final.

## Q14. Can an interface have ordinary instance fields?

No.

## Q15. Can a default method be overridden?

Yes.

---

# 147. Interview Questions — Default and Static

## Q16. What is a default method?

An instance method in an interface that provides a default implementation.

## Q17. Why were default methods introduced?

They allow interfaces to provide behavior and help evolve interfaces while preserving compatibility in many cases.

## Q18. Can static interface methods be overridden?

No.

## Q19. How do you call an interface static method?

Through the interface name:

```java
InterfaceName.method();
```

## Q20. Can a private interface method be called directly by an implementing class?

No.

---

# 148. Interview Questions — Multiple Interfaces

## Q21. Why can a class implement multiple interfaces?

Java allows a class to satisfy multiple interface contracts even though it has only one direct superclass.

## Q22. Can a class extend two classes?

No.

## Q23. Can a class extend one class and implement multiple interfaces?

Yes.

Example:

```java
class C extends A
        implements B, D, E {
}
```

## Q24. Can an interface extend multiple interfaces?

Yes.

---

# 149. Interview Questions — Polymorphism

## Q25. What is interface polymorphism?

Using an interface reference to refer to objects of different implementing classes.

Example:

```java
Payment p =
    new CardPayment();
```

## Q26. What is the actual object here?

CardPayment.

## Q27. What is the reference type?

Payment.

## Q28. Which overridden instance implementation executes?

The implementation associated with the actual runtime object.

## Q29. Can an interface be used as a method parameter?

Yes.

## Q30. Can an interface be used as a return type?

Yes.

---

# 150. Interview Questions — Casting

## Q31. What is upcasting through an interface?

Assigning an implementing object to an interface reference.

Example:

```java
Payment p =
    new CardPayment();
```

## Q32. What is downcasting through an interface?

Converting an interface reference to a specific implementing class when the actual object is compatible.

## Q33. What happens with an incompatible cast?

A ClassCastException can occur at runtime.

## Q34. What does `null instanceof SomeInterface` return?

False.

---

# 151. Interview Questions — Functional Interfaces

## Q35. What is a functional interface?

An interface with exactly one abstract method.

## Q36. What is @FunctionalInterface?

An annotation that expresses the intent that an interface is functional and allows the compiler to verify the single abstract method requirement.

## Q37. Can a functional interface contain default methods?

Yes.

## Q38. Can a functional interface contain static methods?

Yes.

## Q39. Can a functional interface contain private methods?

Yes.

## Q40. Why are functional interfaces important?

They provide target types for lambdas and method references.

---

# 152. Interview Questions — Design

## Q41. Why use interfaces?

Interfaces provide contracts, support polymorphism, allow multiple capabilities, and can reduce coupling between components.

## Q42. What is programming to an interface?

Writing code against the abstraction needed by the caller rather than unnecessarily depending on a concrete implementation.

## Q43. Give a standard Java example.

```java
List<String> list =
    new ArrayList<>();
```

List is an interface and ArrayList is a concrete implementation.

## Q44. Why is dependency injection often combined with interfaces?

Because an interface provides a replaceable dependency contract.

---

# 153. Interview Questions — Interface vs Abstract Class

## Q45. Can an abstract class have constructors?

Yes.

## Q46. Can an interface have constructors?

No.

## Q47. Can an abstract class have instance fields?

Yes.

## Q48. Can an interface have ordinary instance fields?

No.

## Q49. Can a class implement multiple interfaces?

Yes.

## Q50. Can a class extend multiple abstract classes?

No.

---

# 154. Exercise 1 — Payment Interface

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
void pay(double amount);
```

Process all payment implementations through:

```java
Payment
```

Do not write a separate processor method for every payment class.

---

# 155. Exercise 2 — Printable

Create:

```java
interface Printable
```

with:

```java
void print();
```

Implement it in:

```text
Report
Invoice
Certificate
Receipt
```

Store all objects in:

```java
Printable[]
```

and print them in a loop.

---

# 156. Exercise 3 — Multiple Interfaces

Create:

```text
Flyable
Swimmable
Walkable
```

Create a Duck class that implements all three.

Test:

```java
Flyable
Swimmable
Walkable
```

references separately.

---

# 157. Exercise 4 — Interface Inheritance

Create:

```text
Animal
Pet extends Animal
Dog implements Pet
```

Animal should define:

```java
void eat();
```

Pet should define:

```java
void play();
```

Dog should implement both.

---

# 158. Exercise 5 — Default Method

Create:

```java
interface Vehicle
```

with:

```java
void start();

default void stop() {
}
```

Create:

```text
Car
Bike
```

Let Car use the default implementation and make Bike override it.

---

# 159. Exercise 6 — Static Interface Method

Create:

```java
interface Validator
```

with:

```java
static boolean positive(int value)
```

Call it through:

```java
Validator.positive(...)
```

Do not call it through an object.

---

# 160. Exercise 7 — Private Interface Method

Create an interface with two default methods that need the same formatting logic.

Create a private helper method.

Use the private helper from both default methods.

---

# 161. Exercise 8 — Functional Interface

Create:

```java
@FunctionalInterface
interface Calculator
```

with:

```java
int calculate(int a, int b);
```

Create lambdas for:

```text
addition
subtraction
multiplication
division
```

---

# 162. Exercise 9 — Logger

Create:

```text
Logger
ConsoleLogger
FileLogger
DatabaseLogger
```

Build:

```java
Application
```

that receives a Logger through its constructor.

Test Application with at least two implementations.

---

# 163. Exercise 10 — Storage

Create:

```text
Storage
FileStorage
DatabaseStorage
CloudStorage
MemoryStorage
```

Build:

```java
BackupService
```

that accepts Storage.

---

# 164. Exercise 11 — Notification

Create:

```text
Notification
EmailNotification
SmsNotification
PushNotification
```

Build:

```java
NotificationService
```

with:

```java
void send(
    Notification notification,
    String message
)
```

---

# 165. Exercise 12 — Default Conflict

Create two interfaces:

```text
A
B
```

Both should provide:

```java
default void show()
```

Create a class implementing both.

Resolve the conflict.

Then explicitly call:

```java
A.super.show();
```

from the implementation.

---

# 166. Exercise 13 — Interface Constants

Create:

```java
interface AppConfig
```

with:

```text
APP_NAME
MAX_USERS
MAX_RETRIES
```

Access the constants.

Try changing one and observe the compiler error.

---

# 167. Exercise 14 — Abstract Class + Interface

Create:

```text
Payment
BasePayment
CardPayment
UpiPayment
```

Payment is an interface.

BasePayment is abstract and implements Payment.

CardPayment and UpiPayment extend BasePayment.

Test the complete hierarchy.

---

# 168. Exercise 15 — Interface References

Create:

```text
SmartDevice
Camera
MusicPlayer
GPS
```

Make SmartDevice implement all three.

Create:

```java
Camera c = device;
MusicPlayer m = device;
GPS g = device;
```

Observe which methods are available through each reference.

---

# 169. Exercise 16 — Interface Downcasting

Create:

```text
Animal
Dog
Cat
```

Let Dog contain:

```java
void fetch();
```

Store Dog in an Animal reference.

Use `instanceof` to safely determine whether it is a Dog before calling fetch.

---

# 170. Exercise 17 — Functional Interface Validation

Create:

```java
@FunctionalInterface
interface NumberTest {

    boolean test(int value);
}
```

Create lambdas for:

```text
even
odd
positive
negative
greater than 100
```

Test several values.

---

# 171. Exercise 18 — Method Reference

Create:

```java
@FunctionalInterface
interface Printer {

    void print(String value);
}
```

Use:

```java
System.out::println
```

as the implementation.

---

# 172. Exercise 19 — Interface Collection

Create:

```text
Payment
CardPayment
UpiPayment
WalletPayment
```

Store them in:

```java
List<Payment>
```

Loop through the list and call:

```java
pay()
```

for every object.

---

# 173. Exercise 20 — Replaceable Implementation

Create:

```text
Storage
FileStorage
DatabaseStorage
CloudStorage
```

Create:

```java
StorageService
```

with a Storage dependency.

Run the same service with all three implementations.

Explain why the service itself does not need to know the concrete class.

---

# 174. Mini Project — Payment Gateway

Build a payment gateway using:

```text
Payment
CardPayment
UpiPayment
WalletPayment
CashPayment
```

Payment should define:

```java
void pay(double amount);
```

Create:

```text
PaymentProcessor
```

that accepts Payment.

Requirements:

```text
1. Process at least four payment types.
2. Use interface polymorphism.
3. Store payments in a collection.
4. Process them in a loop.
5. Do not create a giant if-else based on payment type.
```

---

# 175. Mini Project — Notification Service

Create:

```text
Notification
EmailNotification
SmsNotification
PushNotification
```

Notification:

```java
void send(String message);
```

Create:

```text
NotificationService
```

that accepts Notification.

Add:

```text
notification collection
notification history
basic logging
```

Use interface references everywhere appropriate.

---

# 176. Mini Project — Storage Service

Create:

```text
Storage
FileStorage
DatabaseStorage
CloudStorage
MemoryStorage
```

Storage:

```java
void save(String data);
void delete(String id);
```

Create:

```text
StorageService
```

that depends only on Storage.

Test the same service with different implementations.

---

# 177. Mini Project — Logger and Dependency Injection

Create:

```text
Logger
ConsoleLogger
FileLogger
DatabaseLogger
```

Create:

```text
Application
```

that receives Logger through its constructor.

Test:

```java
new Application(
    new ConsoleLogger()
);
```

and:

```java
new Application(
    new FileLogger()
);
```

Explain how this reduces coupling.

---

# 178. Mini Project — Smart Device

Create:

```text
Camera
MusicPlayer
GPS
```

Create:

```text
SmartPhone
```

implementing all three.

Create a menu that uses separate interface references.

Practice:

```text
multiple interfaces
multiple capabilities
interface references
polymorphism
```

---

# 179. Mini Project — E-Commerce Discount

Create:

```text
DiscountStrategy
NoDiscount
StudentDiscount
FestivalDiscount
PremiumDiscount
```

DiscountStrategy:

```java
double discount(double amount);
```

Create:

```text
ShoppingCart
```

that receives a DiscountStrategy.

Switch strategies without modifying the main cart calculation.

---

# 180. Mini Project — Search Service

Create:

```text
SearchEngine
DatabaseSearch
WebSearch
FileSearch
```

SearchEngine:

```java
void search(String query);
```

Create:

```text
SearchService
```

that depends on SearchEngine.

Process all implementations polymorphically.

---

# 181. Mini Project — File Exporter

Create:

```text
Exporter
PdfExporter
CsvExporter
JsonExporter
XmlExporter
```

Exporter:

```java
void export(String data);
```

Create:

```text
ExportService
```

that accepts Exporter.

The service should not contain type-specific branches for every exporter.

---

# 182. Challenge 1 — Explain

Explain:

```java
Payment payment =
    new CardPayment();
```

Your answer should include:

```text
interface
implements
reference type
actual object
upcasting
runtime polymorphism
```

---

# 183. Challenge 2 — Find the Error

```java
interface Printable {

    void print();
}

class Report implements Printable {

    void print() {
    }
}
```

Why does this fail?

Because interface methods are public and the implementation cannot reduce visibility.

Correct:

```java
public void print() {
}
```

---

# 184. Challenge 3 — Find the Error

```java
interface Payment {

    void pay();
}

Payment payment =
    new Payment();
```

Why is this invalid?

Because an interface cannot be directly instantiated.

A concrete implementation is required.

---

# 185. Challenge 4 — Predict the Output

```java
interface A {

    default void show() {
        System.out.println("A");
    }
}

class B implements A {
}

A a = new B();

a.show();
```

Output:

```text
A
```

B inherits the default method.

---

# 186. Challenge 5 — Default Conflict

Two interfaces contain:

```java
default void show()
```

and a class implements both.

Question:

```text
Who wins?
```

Answer:

```text
Neither automatically wins.
```

The implementing class must resolve the conflict.

---

# 187. Challenge 6 — Functional Interface

Is this functional?

```java
@FunctionalInterface
interface A {

    void one();

    default void two() {
    }

    static void three() {
    }
}
```

Yes.

Only:

```text
one()
```

is abstract.

---

# 188. Challenge 7 — Not Functional

Is this functional?

```java
@FunctionalInterface
interface A {

    void one();
    void two();
}
```

No.

There are two abstract methods.

The compiler rejects the functional-interface annotation.

---

# 189. Challenge 8 — Interface Constant

Given:

```java
interface Config {

    int MAX = 10;
}
```

Can this be done?

```java
Config.MAX = 20;
```

No.

MAX is implicitly final.

---

# 190. Challenge 9 — Interface Inheritance

Given:

```java
interface A {
    void a();
}

interface B extends A {
    void b();
}
```

A class implementing B must satisfy both:

```text
a()
b()
```

unless it remains abstract or suitable inherited implementations already satisfy the contracts.

---

# 191. Challenge 10 — Capability

You have:

```text
Bird
Airplane
Drone
```

all capable of flying.

Would:

```java
interface Flyable {
    void fly();
}
```

be a natural design?

Yes.

The interface represents a shared capability.

---

# 192. Challenge 11 — Design

You have:

```text
CardPayment
UpiPayment
WalletPayment
```

and:

```java
processPayment(...)
```

What should the parameter be when all three satisfy the same payment contract?

A suitable abstraction:

```java
Payment
```

This allows the method to work with all implementations.

---

# 193. Challenge 12 — Reference Views

A class:

```java
class Device
        implements Camera, GPS {
}
```

and:

```java
Device d = new Device();

Camera c = d;
GPS g = d;
```

How many objects exist?

Answer:

```text
One Device object.
```

There are two interface references to that same object.

---

# 194. Challenge 13 — Abstract Parent

Given:

```java
interface Payment {
    void pay();
}

abstract class BasePayment
        implements Payment {
}
```

Is BasePayment valid?

Yes.

Because BasePayment is abstract.

---

# 195. Challenge 14 — Concrete Child

Given:

```java
interface Payment {
    void pay();
}

abstract class BasePayment
        implements Payment {
}

class CardPayment
        extends BasePayment {
}
```

Is CardPayment valid?

No.

CardPayment is concrete but does not implement `pay()`.

---

# 196. Challenge 15 — Static Method

Given:

```java
interface A {

    static void show() {
        System.out.println("A");
    }
}
```

How should it be called?

```java
A.show();
```

It is a static interface method.

---

# 197. Challenge 16 — Default Method

Given:

```java
interface A {

    default void show() {
        System.out.println("A");
    }
}
```

Can an implementing class override it?

Yes.

The implementation must be compatible with the inherited method contract.

---

# 198. Challenge 17 — Interface Fields

Given:

```java
interface Config {

    int LIMIT = 100;
}
```

Conceptually this means:

```java
public static final int LIMIT = 100;
```

Remember this rule.

---

# 199. Challenge 18 — Interface Reference

Given:

```java
Payment payment =
    new CardPayment();
```

Which type determines which methods are directly accessible?

The reference type:

```text
Payment
```

The actual object still determines overridden instance behavior at runtime.

---

# 200. Challenge 19 — Downcast

Given:

```java
Payment payment =
    new CardPayment();
```

Can you write:

```java
CardPayment card =
    (CardPayment) payment;
```

Yes, because the actual object is CardPayment.

If the actual object were UpiPayment, the cast would fail.

---

# 201. Challenge 20 — Better Abstraction

Suppose a service only needs:

```java
save()
```

Would this be better:

```java
void backup(DatabaseStorage storage)
```

or:

```java
void backup(Storage storage)
```

Usually:

```java
void backup(Storage storage)
```

is better if Storage contains exactly the contract the service needs.

---

# 202. Final Mental Model

Think of an interface as:

```text
                 CONTRACT
                    ↓
                 Payment
              /     |      \
             /      |       \
          Card     UPI     Wallet
             \      |       /
              \     |      /
             IMPLEMENTATIONS
```

The application can use:

```java
Payment payment;
```

without needing to know every concrete implementation.

Then:

```java
payment.pay(500);
```

uses the implementation supplied by the actual object.

---

# 203. Interface Flow

```text
Define contract
      ↓
interface Payment
      ↓
Implement contract
      ↓
CardPayment / UpiPayment / WalletPayment
      ↓
Use common type
      ↓
Payment payment
      ↓
Runtime polymorphism
      ↓
Correct implementation executes
```

This pattern appears everywhere in Java development.

---

# 204. Golden Rules

Remember these rules:

```text
1. An interface is a Java reference type.

2. A class implements an interface using implements.

3. A class can implement multiple interfaces.

4. An interface can extend one or more interfaces.

5. An interface cannot be directly instantiated.

6. An interface can be used as a reference type.

7. A normal interface method declared without a body
   is implicitly public and abstract.

8. An implementing method cannot reduce visibility.

9. Fields declared directly in an interface are
   implicitly public static final.

10. Interfaces can contain default methods.

11. Interfaces can contain static methods.

12. Modern Java interfaces can contain private methods.

13. Default methods can be overridden.

14. Static interface methods are not overridden.

15. Conflicting default methods must be resolved.

16. An abstract class can implement an interface.

17. A concrete class must satisfy inherited abstract contracts.

18. Interfaces are powerful tools for polymorphism.

19. Functional interfaces have exactly one abstract method.

20. @FunctionalInterface lets the compiler check that intent.

21. Lambdas can implement functional interfaces.

22. Method references can target functional interfaces.

23. Interfaces can reduce coupling between components.

24. Interfaces are useful for dependency injection.

25. Programming to an interface can make code more flexible.

26. Interfaces and abstract classes are different tools.

27. A meaningful interface should represent a useful contract.
```

---

# 205. Final Comparison

| Concept | Meaning |
|---|---|
| `interface` | Declares an interface type |
| `implements` | A class satisfies an interface contract |
| `extends` | A class extends a class or an interface extends interface(s) |
| Abstract method | Method requiring implementation by a concrete class |
| Default method | Interface-provided instance implementation |
| Static interface method | Method belonging to the interface |
| Private interface method | Internal helper for interface implementation |
| Interface field | Implicitly `public static final` |
| Functional interface | Exactly one abstract method |
| `@FunctionalInterface` | Compiler-checked functional-interface intent |
| Interface polymorphism | One interface type representing different implementations |
| Upcasting | Viewing an implementation through an interface type |
| Downcasting | Converting a compatible interface reference to a specific class type |

---

# 206. One-Minute Interview Answer

If an interviewer asks:

**"What is an interface in Java?"**

A strong simple answer is:

> An interface is a Java reference type that defines a contract. Classes implement the interface and provide the required behavior. A class can implement multiple interfaces, which allows it to combine different capabilities without multiple class inheritance. Modern interfaces can contain abstract, default, static, and private methods, and their fields are implicitly public static final. Interfaces are widely used for abstraction, polymorphism, loose coupling, dependency injection, and flexible API design.

---

# 207. Chapter Summary

You have now learned interfaces in depth.

The central pattern is:

```text
interface
    ↓
contract
    ↓
implements
    ↓
concrete implementation
    ↓
interface reference
    ↓
runtime polymorphism
```

You learned that modern interfaces can contain:

```text
abstract methods
default methods
static methods
private methods
constants
```

A class can implement multiple interfaces:

```java
class SmartDevice
        implements Camera,
                   GPS,
                   MusicPlayer {
}
```

An interface can extend multiple interfaces:

```java
interface OfficeMachine
        extends Printable,
                Scannable {
}
```

Functional interfaces provide the foundation for:

```text
lambdas
method references
functional programming APIs
```

Interfaces are one of the most important tools for designing flexible Java applications.

---

# 208. Final Revision Checklist

Before moving to Chapter 22, make sure you can explain all of these:

```text
[ ] What is an interface?
[ ] Why do we need interfaces?
[ ] interface keyword
[ ] implements keyword
[ ] Interface reference
[ ] Interface cannot be directly instantiated
[ ] Abstract interface methods
[ ] Public visibility of interface methods
[ ] Interface constants
[ ] Default methods
[ ] Static methods
[ ] Private interface methods
[ ] Multiple interfaces
[ ] Interface inheritance
[ ] Multiple interface inheritance
[ ] Class + multiple interfaces
[ ] Abstract class implementing an interface
[ ] Interface polymorphism
[ ] Upcasting through interface
[ ] Downcasting through interface
[ ] instanceof with interfaces
[ ] Functional interface
[ ] @FunctionalInterface
[ ] Lambda + functional interface
[ ] Method reference + functional interface
[ ] Comparable
[ ] Comparator
[ ] Interface vs abstract class
[ ] Default method conflicts
[ ] Loose coupling
[ ] Dependency injection
[ ] Programming to an interface
[ ] Capability interfaces
```

---

# 209. End of Chapter 21

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
        ↓
Chapter 22
OOP Relationships
```

The next chapter focuses on how objects relate to each other:

```text
IS-A
HAS-A
Association
Aggregation
Composition
Dependency
```

These relationships are extremely important when designing real-world Java applications.
