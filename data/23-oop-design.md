# Chapter 23 — OOP Design

> **Java Master Course — Chapter 23 of 50**
>
> In Chapters 11–22, you learned how Java supports object-oriented programming:
>
> ```text
> OOP Fundamentals
> Classes & Objects
> Constructors
> this & static
> Encapsulation
> Inheritance
> Overloading
> Overriding
> Polymorphism
> Abstraction
> Interfaces
> OOP Relationships
> ```
>
> Now comes one of the most important OOP topics:
>
> **How do we design good classes and objects?**
>
> Knowing Java syntax is not enough.
>
> You can write code that compiles and still create a terrible design.
>
> Good OOP design is about deciding:
>
> ```text
> What should a class represent?
> What responsibility should it have?
> What should it hide?
> What should it expose?
> Which objects should know about each other?
> Which dependencies should be injected?
> Should we use inheritance or composition?
> How can we keep the code easy to change?
> ```
>
> This chapter introduces the principles that help answer those questions.

---

# 1. What You Will Learn

By the end of this chapter, you should understand:

```text
✓ What software design means
✓ What good OOP design means
✓ Responsibility of a class
✓ Single Responsibility Principle
✓ Cohesion
✓ Coupling
✓ Low coupling
✓ High cohesion
✓ Encapsulation as a design tool
✓ Programming to abstractions
✓ Dependency inversion basics
✓ Open/Closed Principle
✓ Liskov Substitution Principle
✓ Interface Segregation Principle
✓ Dependency Inversion Principle
✓ Complete SOLID overview
✓ Composition over inheritance
✓ Favoring small focused classes
✓ Immutable objects
✓ final fields
✓ Defensive copying
✓ Unmodifiable collections
✓ Value objects
✓ Anemic vs behavior-rich objects
✓ Tell, Don't Ask
✓ Law of Demeter basics
✓ Avoiding God classes
✓ Avoiding deep inheritance
✓ Avoiding excessive abstraction
✓ Avoiding unnecessary interfaces
✓ Avoiding unnecessary getters/setters
✓ Common OOP design mistakes
✓ Refactoring a bad design
✓ Practical Java programs
✓ Exercises
✓ Output questions
✓ Interview questions
✓ Design challenges
✓ Mini projects
```

---

# 2. What Is Software Design?

Software design is the process of deciding how your program should be structured.

It includes decisions about:

```text
classes
objects
responsibilities
relationships
dependencies
interfaces
data
behavior
```

For example, imagine an online shopping application.

You could put everything into:

```java
class ShoppingApp {
    // 3000 lines
}
```

It may compile.

But it would be difficult to:

```text
understand
test
modify
debug
reuse
extend
```

Good design divides responsibilities into meaningful components.

---

# 3. Bad Design Can Still Compile

This is very important.

The compiler checks things such as:

```text
syntax
types
method calls
access rules
```

It does not automatically tell you:

```text
"This class has too many responsibilities."

"This design is tightly coupled."

"You should use composition."

"This class is difficult to test."

"This interface is badly designed."
```

These are software-design problems.

---

# 4. The Goal of Good OOP Design

Good OOP design generally tries to make software:

```text
easy to understand
easy to change
easy to test
easy to extend
easy to reuse
harder to break accidentally
```

A useful mental model is:

```text
Good design
    ↓
clear responsibilities
    ↓
appropriate relationships
    ↓
manageable dependencies
    ↓
easier changes
```

---

# 5. Design Is About Managing Change

Suppose your application currently supports:

```text
UPI
```

Tomorrow you need:

```text
Credit Card
```

Later:

```text
Wallet
```

A good design allows new payment types without rewriting the entire application.

This is one reason abstractions and polymorphism are useful.

---

# 6. A Simple Design Example

Poor design:

```java
class OrderService {

    void process() {

        // calculate price
        // validate customer
        // save order
        // send email
        // process payment
        // generate invoice
    }
}
```

The class is doing too many unrelated things.

A better design might separate:

```text
OrderValidator
OrderCalculator
OrderRepository
PaymentService
EmailService
InvoiceGenerator
```

Now each class has a clearer responsibility.

---

# 7. Responsibility

A class should have a clear reason to exist.

For example:

```java
class Invoice {

    double calculateTotal() {
        // invoice calculation
    }
}
```

Invoice is related to invoice behavior.

Compare:

```java
class Invoice {

    double calculateTotal() {
    }

    void sendEmail() {
    }

    void saveToDatabase() {
    }

    void connectToPaymentGateway() {
    }
}
```

Now the class is taking on unrelated responsibilities.

---

# 8. Single Responsibility Principle

The first SOLID principle is:

```text
S — Single Responsibility Principle
```

A common simple explanation is:

> A class should have one reason to change.

This does **not** mean:

```text
A class must contain exactly one method.
```

It means its responsibilities should be focused.

---

# 9. Why "One Reason to Change" Matters

Suppose:

```java
class Invoice {

    void calculateTotal() {
    }

    void saveToDatabase() {
    }

    void sendEmail() {
    }
}
```

There are at least three different reasons for changing this class:

```text
pricing rules change
database logic changes
email requirements change
```

That is a warning sign.

---

# 10. Better SRP Design

Separate responsibilities:

```java
class Invoice {

    double calculateTotal() {
        return 0;
    }
}

class InvoiceRepository {

    void save(Invoice invoice) {
    }
}

class InvoiceEmailService {

    void send(Invoice invoice) {
    }
}
```

Now:

```text
Invoice
→ invoice behavior

InvoiceRepository
→ persistence

InvoiceEmailService
→ email
```

---

# 11. SRP Does Not Mean "One Class Per Line of Code"

Do not overreact.

Bad extreme:

```text
AddService
SubtractService
MultiplyService
DivisionService
```

for a tiny calculator where one cohesive class is perfectly reasonable.

The goal is not to create thousands of classes.

The goal is:

```text
meaningful responsibility boundaries
```

---

# 12. Cohesion

Cohesion describes how closely related the responsibilities inside a class are.

High cohesion:

```java
class BankAccount {

    deposit()
    withdraw()
    getBalance()
}
```

These operations are strongly related.

Low cohesion:

```java
class Utility {

    sendEmail()
    calculateTax()
    resizeImage()
    saveDatabase()
    printReport()
}
```

These responsibilities are unrelated.

---

# 13. High Cohesion

Think:

```text
Class
 ├── related responsibility
 ├── related behavior
 └── related data
```

Example:

```java
class ShoppingCart {

    addItem()
    removeItem()
    calculateTotal()
    clear()
}
```

These methods naturally belong together.

---

# 14. Low Cohesion

Think:

```text
Class
 ├── payment
 ├── email
 ├── database
 ├── logging
 ├── image processing
 └── random utilities
```

This class becomes difficult to understand.

---

# 15. Coupling

Coupling describes how strongly one component depends on another.

Example:

```java
class OrderService {

    private final StripePayment payment;

    OrderService() {
        payment =
            new StripePayment();
    }
}
```

OrderService is tightly connected to a specific payment implementation.

---

# 16. Lower Coupling

Use an abstraction:

```java
interface Payment {

    void pay(double amount);
}
```

Then:

```java
class OrderService {

    private final Payment payment;

    OrderService(Payment payment) {
        this.payment = payment;
    }
}
```

Now OrderService does not need to know the concrete implementation.

---

# 17. Coupling vs Cohesion

Remember this simple comparison:

```text
Coupling
→ relationship BETWEEN classes

Cohesion
→ relationship WITHIN a class
```

Good design often aims for:

```text
LOW unnecessary coupling
HIGH cohesion
```

---

# 18. Why Low Coupling Helps

Suppose:

```text
OrderService → Payment
```

If Payment is an interface:

```text
OrderService → Payment
                    ↑
             ┌──────┴──────┐
             │             │
        CardPayment    UpiPayment
```

You can replace implementations without changing the OrderService's core logic.

---

# 19. Programming to an Abstraction

Instead of:

```java
CardPayment payment;
```

prefer:

```java
Payment payment;
```

when the code only needs Payment behavior.

Example:

```java
interface Payment {

    void pay(double amount);
}

class Checkout {

    private final Payment payment;

    Checkout(Payment payment) {
        this.payment = payment;
    }
}
```

This is programming to an abstraction.

---

# 20. Why Abstractions Help

The class says:

```text
"I need something that can make a payment."
```

rather than:

```text
"I specifically need this exact payment class."
```

This gives the design flexibility.

---

# 21. Dependency Injection

Dependency injection means supplying a dependency from outside.

Example:

```java
class Checkout {

    private final Payment payment;

    Checkout(Payment payment) {
        this.payment = payment;
    }
}
```

The Checkout object does not create its own Payment implementation.

The caller supplies it.

---

# 22. Why Dependency Injection Helps

It can improve:

```text
testability
replaceability
flexibility
separation of concerns
```

For example:

```java
Checkout real =
    new Checkout(
        new CardPayment()
    );
```

and for testing:

```java
Checkout test =
    new Checkout(
        new FakePayment()
    );
```

---

# 23. Open/Closed Principle

The second SOLID principle:

```text
O — Open/Closed Principle
```

A common explanation:

> Software entities should be open for extension but closed for modification.

In simple language:

```text
Add new behavior
without repeatedly changing stable existing code.
```

---

# 24. Example — Payment

Suppose you have:

```java
interface Payment {

    void pay(double amount);
}
```

Implementations:

```java
class CardPayment
        implements Payment {

    public void pay(double amount) {
        System.out.println(
            "Card payment"
        );
    }
}
```

```java
class UpiPayment
        implements Payment {

    public void pay(double amount) {
        System.out.println(
            "UPI payment"
        );
    }
}
```

Checkout can depend on Payment.

---

# 25. Extending Payment

Later:

```java
class WalletPayment
        implements Payment {

    public void pay(double amount) {
        System.out.println(
            "Wallet payment"
        );
    }
}
```

If Checkout already works with Payment, it may not need modification.

You extended the system with a new implementation.

---

# 26. OCP Does Not Mean "Never Modify Code"

This principle is not absolute.

Real software must sometimes be changed.

OCP means that a well-designed extension point can allow new variations without repeatedly modifying stable code.

Do not interpret it as:

```text
"Existing code can never be edited."
```

---

# 27. Liskov Substitution Principle

The third SOLID principle:

```text
L — Liskov Substitution Principle
```

The core idea:

> A subtype should be usable wherever its parent type is expected without breaking the expected behavior.

This is deeply connected to polymorphism.

---

# 28. Simple LSP Example

```java
class Bird {

    void eat() {
        System.out.println(
            "Eating"
        );
    }
}

class Sparrow
        extends Bird {

    void fly() {
        System.out.println(
            "Flying"
        );
    }
}
```

A Sparrow can be used where Bird is expected:

```java
Bird bird =
    new Sparrow();

bird.eat();
```

No problem.

---

# 29. Classic LSP Warning — Rectangle/Square

A common teaching example is:

```text
Rectangle
    ↑
  Square
```

Mathematically, a square is a rectangle.

But if a Rectangle API allows:

```java
setWidth()
setHeight()
```

and assumes width and height can change independently, making Square a subtype can violate those behavioral expectations.

The problem is not mathematics.

The problem is whether the subtype preserves the assumptions made by users of the parent type.

---

# 30. LSP Is About Behavior

Inheritance is not correct simply because:

```text
"This thing is technically a type of that thing."
```

Ask:

```text
Can the child safely replace the parent?
```

If not, inheritance may be the wrong design.

---

# 31. LSP and Method Overriding

Suppose:

```java
class Bird {

    void move() {
        System.out.println(
            "Moving"
        );
    }
}
```

A subtype should not unexpectedly break the contract of `move()`.

If a parent method promises:

```text
"move performs a valid movement"
```

the child should preserve that expectation.

---

# 32. LSP and Exceptions

Suppose a parent method is expected to succeed under certain valid conditions.

A child should not introduce surprising failures that violate the parent's contract.

LSP is about preserving the behavioral expectations of the abstraction.

This becomes especially important in large inheritance hierarchies.

---

# 33. Interface Segregation Principle

The fourth SOLID principle:

```text
I — Interface Segregation Principle
```

A common explanation:

> Clients should not be forced to depend on methods they do not need.

In simple language:

```text
Prefer small, focused interfaces
over one huge interface.
```

---

# 34. Bad Interface

```java
interface Machine {

    void print();

    void scan();

    void fax();
}
```

Suppose a simple printer only supports printing.

Forcing it to implement:

```text
scan()
fax()
```

is a design problem.

---

# 35. Better Interfaces

Split the responsibilities:

```java
interface Printable {

    void print();
}
```

```java
interface Scannable {

    void scan();
}
```

```java
interface Faxable {

    void fax();
}
```

Now a printer can implement only what it supports.

---

# 36. Multiple Interfaces

Java allows:

```java
class MultiFunctionPrinter
        implements
        Printable,
        Scannable,
        Faxable {

    public void print() {
    }

    public void scan() {
    }

    public void fax() {
    }
}
```

A simple printer can implement only:

```java
class SimplePrinter
        implements Printable {

    public void print() {
    }
}
```

This is a good example of interface segregation.

---

# 37. Dependency Inversion Principle

The fifth SOLID principle:

```text
D — Dependency Inversion Principle
```

A common explanation:

> High-level modules should not depend directly on low-level modules. Both should depend on abstractions.

Also:

> Abstractions should not depend on details. Details should depend on abstractions.

---

# 38. Simple DIP Example

Bad:

```java
class OrderService {

    private final MySQLDatabase db =
        new MySQLDatabase();
}
```

OrderService directly depends on a concrete database implementation.

---

# 39. Better DIP Example

Define abstraction:

```java
interface OrderRepository {

    void save(Order order);
}
```

Implementation:

```java
class MySQLOrderRepository
        implements OrderRepository {

    public void save(Order order) {
        System.out.println(
            "Saving to MySQL"
        );
    }
}
```

Service:

```java
class OrderService {

    private final OrderRepository repository;

    OrderService(
        OrderRepository repository
    ) {
        this.repository = repository;
    }
}
```

Now:

```text
OrderService
      ↓
OrderRepository
      ↑
MySQLOrderRepository
```

---

# 40. SOLID Overview

Remember:

```text
S → Single Responsibility
    One focused reason to change

O → Open/Closed
    Extend behavior without unnecessary modification

L → Liskov Substitution
    Subtypes should preserve parent expectations

I → Interface Segregation
    Prefer focused interfaces

D → Dependency Inversion
    Depend on abstractions, not concrete details
```

---

# 41. SOLID Is Not a Collection of Java Keywords

There is no:

```java
solid
```

keyword.

SOLID is a set of design principles.

Java features that help implement these ideas include:

```text
classes
interfaces
abstract classes
inheritance
composition
polymorphism
access modifiers
dependency injection
```

---

# 42. Composition Over Inheritance

You learned this in Chapter 22.

Now connect it to design.

Suppose:

```text
Car
Engine
```

Do not use:

```java
class Car extends Engine {
}
```

because Car is not Engine.

Use:

```java
class Car {

    private final Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }
}
```

---

# 43. Why Composition Is Often More Flexible

Inheritance creates a fixed type hierarchy.

Composition allows objects to collaborate.

Example:

```text
Car
 ├── Engine
 ├── BrakeSystem
 ├── Navigation
 └── AudioSystem
```

Components can often be replaced independently.

---

# 44. Deep Inheritance Is a Warning Sign

Consider:

```text
Animal
  ↓
Mammal
  ↓
DomesticMammal
  ↓
Pet
  ↓
SpecialDog
```

Deep hierarchies can create:

```text
hard-to-follow behavior
fragile parent-child dependencies
unexpected inherited behavior
difficult changes
```

Inheritance is useful, but do not create deep hierarchies without a strong reason.

---

# 45. Immutable Objects

An immutable object is an object whose observable state does not change after construction.

Examples from Java include:

```text
String
```

and many value-like classes designed to be immutable.

A typical immutable class:

```java
final class Person {

    private final String name;
    private final int age;

    Person(
        String name,
        int age
    ) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

There are no setters that change the state.

---

# 46. Basic Rules for Immutability

A common design approach:

```text
1. Prevent unintended subclass mutation.
2. Keep state private.
3. Make fields final where appropriate.
4. Initialize state during construction.
5. Do not provide mutating methods.
6. Defensively copy mutable input/output.
```

The exact rules depend on the fields and class design.

---

# 47. Why Immutability Helps

Immutable objects can make code easier to reason about because their state does not unexpectedly change.

Benefits can include:

```text
safer sharing
simpler reasoning
fewer accidental state changes
easier testing
better suitability for concurrent use
```

Immutability does not automatically make every class thread-safe, but immutable state removes many common mutation problems.

---

# 48. final Field Does Not Automatically Make an Object Immutable

Important:

```java
private final List<String> names;
```

The reference cannot be reassigned.

But the List itself may still be mutable:

```java
names.add("Aman");
```

So:

```text
final reference
≠
immutable object
```

---

# 49. Defensive Copying

Suppose:

```java
class Student {

    private final List<String> subjects;

    Student(List<String> subjects) {
        this.subjects = subjects;
    }
}
```

The caller still owns the original List.

They can modify it later.

A defensive copy can help:

```java
this.subjects =
    new ArrayList<>(subjects);
```

Now Student has its own list.

---

# 50. Returning Defensive Copies

Suppose:

```java
List<String> getSubjects() {
    return subjects;
}
```

The caller may modify the internal list.

Safer options can include:

```java
return List.copyOf(subjects);
```

or:

```java
return Collections.unmodifiableList(subjects);
```

These have different semantics.

---

# 51. copyOf vs unmodifiableList

Consider:

```java
return List.copyOf(subjects);
```

This returns an unmodifiable copy.

Later changes to the original list are not reflected in that returned copy.

Compare:

```java
return Collections.unmodifiableList(subjects);
```

This returns an unmodifiable view.

Changes to the underlying list can still be visible through the view.

---

# 52. Immutable Value Objects

A value object represents a value rather than an entity whose identity is the main concern.

Examples:

```text
Money
EmailAddress
Coordinate
DateRange
Address
```

For example:

```java
final class Money {

    private final int amount;
    private final String currency;

    Money(
        int amount,
        String currency
    ) {
        this.amount = amount;
        this.currency = currency;
    }

    int getAmount() {
        return amount;
    }

    String getCurrency() {
        return currency;
    }
}
```

---

# 53. Value Equality

Value objects often use logical equality.

For example:

```text
Money(100, "INR")
```

and another:

```text
Money(100, "INR")
```

may represent the same value.

Such a class should normally implement `equals()` and `hashCode()` consistently.

This connects directly to Chapter 10's discussion of String equality and Java's Object methods.

---

# 54. Entity vs Value

An entity often has identity:

```text
Employee ID = 101
```

A value object represents a value:

```text
Money = ₹500
```

Two objects may have:

```text
different identities
same value
```

This distinction is useful in domain modeling.

---

# 55. Behavior-Rich Objects

OOP is not just:

```text
fields
+
getters
+
setters
```

Good objects often keep related behavior close to their data.

Example:

```java
class BankAccount {

    private double balance;

    void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive"
            );
        }

        balance += amount;
    }

    void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive"
            );
        }

        if (amount > balance) {
            throw new IllegalArgumentException(
                "Insufficient balance"
            );
        }

        balance -= amount;
    }

    double getBalance() {
        return balance;
    }
}
```

The object controls its own rules.

---

# 56. Anemic Object

An anemic model often has:

```text
private fields
+
getters
+
setters
```

while business rules live elsewhere.

Example:

```java
class BankAccount {

    private double balance;

    double getBalance() {
        return balance;
    }

    void setBalance(double balance) {
        this.balance = balance;
    }
}
```

Then another class performs:

```java
account.setBalance(
    account.getBalance() - amount
);
```

This can weaken encapsulation.

---

# 57. Why Setters Can Be Dangerous

Suppose:

```java
account.setBalance(-5000);
```

If negative balances are invalid, the setter exposes too much control.

Better:

```java
account.withdraw(5000);
```

The Account class can enforce its own rules.

This is encapsulation plus behavior-rich design.

---

# 58. Tell, Don't Ask

A useful design principle:

> Tell an object what to do instead of asking for its internal data and doing the work yourself.

Instead of:

```java
if (account.getBalance() >= amount) {
    account.setBalance(
        account.getBalance() - amount
    );
}
```

prefer:

```java
account.withdraw(amount);
```

The Account owns the withdrawal rules.

---

# 59. Why Tell, Don't Ask Helps

It keeps business rules near the data they protect.

Instead of:

```text
Service knows Account internals
```

we get:

```text
Service asks Account to withdraw
Account enforces Account rules
```

This usually improves encapsulation.

---

# 60. Law of Demeter — Basic Idea

The Law of Demeter is a design guideline about limiting unnecessary knowledge of object structures.

A common warning sign is long chains:

```java
order.getCustomer()
     .getAddress()
     .getCity()
     .getName();
```

Such chains can create coupling to internal object structures.

---

# 61. Why Long Chains Can Hurt

If the structure changes:

```text
Order
 → Customer
 → Address
 → City
```

many callers may need modification.

Sometimes a better API is:

```java
order.getShippingCity();
```

where Order provides the meaningful operation or value needed by the caller.

Do not blindly ban all method chaining; the principle is about unnecessary structural coupling.

---

# 62. God Class

A God class is a class that knows or does far too much.

Example:

```java
class ApplicationManager {

    // users
    // payments
    // database
    // email
    // reports
    // authentication
    // logging
    // file handling
    // UI
    // configuration
}
```

This class becomes a central point of complexity.

---

# 63. Problems with God Classes

They tend to have:

```text
low cohesion
high coupling
large size
many reasons to change
difficult testing
difficult reuse
```

Break the class into meaningful responsibilities.

---

# 64. Example — Refactoring a God Class

Before:

```java
class Shop {

    void registerUser() {}
    void loginUser() {}
    void saveUser() {}
    void processPayment() {}
    void sendEmail() {}
    void generateInvoice() {}
}
```

Possible separation:

```text
UserService
AuthenticationService
UserRepository
PaymentService
EmailService
InvoiceService
```

The exact split depends on the application's domain.

---

# 65. Avoid Premature Abstraction

A common beginner mistake is creating interfaces for everything.

Example:

```text
UserServiceInterface
UserServiceInterfaceImpl
```

when there is only one implementation and no meaningful abstraction boundary.

An interface can be useful, but do not create one merely because "SOLID says interfaces are good."

---

# 66. Abstraction Should Have a Purpose

Create an abstraction when it helps with things such as:

```text
multiple implementations
decoupling
polymorphism
clear contract
testing
architectural boundaries
```

Not simply:

```text
"Every class must have an interface."
```

---

# 67. Avoid Overengineering

Bad design can come from too little abstraction.

But it can also come from too much abstraction.

Example:

```text
PaymentManagerFactoryProviderAdapter
```

for a simple program that only needs:

```java
payment.pay();
```

Complexity should solve a real problem.

---

# 68. YAGNI

A useful software-development principle:

> You Aren't Gonna Need It.

Do not build complicated infrastructure for hypothetical future requirements unless there is a good reason.

Example:

```text
Current requirement:
One payment method.
```

Do not automatically build:

```text
12 interfaces
7 factories
4 abstract factories
3 adapters
```

unless the actual design requires them.

---

# 69. DRY

DRY means:

```text
Don't Repeat Yourself
```

The goal is to avoid unnecessary duplication of knowledge or logic.

Example:

Bad:

```java
double calculateTaxForOrder(...) {
    // tax formula
}

double calculateTaxForInvoice(...) {
    // same tax formula
}
```

If the same business rule truly needs to stay consistent, consider centralizing it.

But do not blindly combine code merely because two snippets look similar.

---

# 70. Duplication vs Accidental Similarity

Two methods may currently look similar but represent different concepts.

Do not immediately extract them into one abstraction.

Ask:

```text
Do they represent the same business rule?
Will they change for the same reason?
```

Good abstraction is based on meaning, not just matching lines of code.

---

# 71. KISS

KISS commonly means:

```text
Keep It Simple
```

Prefer the simplest design that correctly solves the problem.

Simple:

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }
}
```

Do not build a complex architecture when a small class is enough.

---

# 72. Design Smells

A design smell is a warning sign.

Common OOP design smells include:

```text
God class
deep inheritance
large methods
too many parameters
too many responsibilities
tight coupling
low cohesion
duplicate logic
excessive getters/setters
public mutable state
unnecessary interfaces
unnecessary abstraction
long method chains
```

A smell is not always a bug.

It tells you:

```text
"Look more closely."
```

---

# 73. Too Many Parameters

Example:

```java
createUser(
    String name,
    int age,
    String city,
    String state,
    String country,
    String phone,
    String email
);
```

A better model might introduce:

```text
Address
ContactInfo
User
```

For example:

```java
createUser(
    String name,
    int age,
    Address address,
    ContactInfo contact
);
```

This can improve readability and cohesion.

---

# 74. Parameter Object

A group of related parameters can be represented by an object.

Example:

```java
class Address {

    private final String city;
    private final String state;
    private final String country;

    Address(
        String city,
        String state,
        String country
    ) {
        this.city = city;
        this.state = state;
        this.country = country;
    }
}
```

Then:

```java
void register(
    String name,
    Address address
) {
}
```

This is easier to understand.

---

# 75. Mutable State

Mutable state can create bugs when many parts of the application can change it.

Bad:

```java
class User {

    public String name;
}
```

Any code can modify it.

Better:

```java
class User {

    private String name;

    public String getName() {
        return name;
    }

    public void rename(String name) {
        // validation
        this.name = name;
    }
}
```

The class controls its state.

---

# 76. Invariants

An invariant is a rule that should always remain true for an object.

Example BankAccount:

```text
balance cannot be negative
```

Example Student:

```text
age must be valid
```

Example Order:

```text
total cannot be negative
```

Good encapsulation protects invariants.

---

# 77. Constructor and Invariants

If an object must always be valid, validate during construction.

```java
class Product {

    private final String name;
    private final double price;

    Product(
        String name,
        double price
    ) {

        if (name == null ||
            name.isBlank()) {

            throw new IllegalArgumentException(
                "Invalid name"
            );
        }

        if (price < 0) {

            throw new IllegalArgumentException(
                "Invalid price"
            );
        }

        this.name = name;
        this.price = price;
    }
}
```

Now every successfully constructed Product satisfies its basic rules.

---

# 78. Make Invalid States Hard to Represent

This is a powerful design idea.

Instead of:

```java
Order order =
    new Order();

order.setStatus("xyz");
```

use:

```java
order.cancel();
order.ship();
order.deliver();
```

The class can control valid state transitions.

---

# 79. State Machine Thinking

An Order might have:

```text
CREATED
   ↓
PAID
   ↓
SHIPPED
   ↓
DELIVERED
```

Invalid transitions should be rejected.

Good object design can encode such rules.

---

# 80. Example — Order State

```java
enum OrderStatus {

    CREATED,
    PAID,
    SHIPPED,
    DELIVERED,
    CANCELLED
}
```

Then:

```java
class Order {

    private OrderStatus status =
        OrderStatus.CREATED;

    void pay() {
        if (status != OrderStatus.CREATED) {
            throw new IllegalStateException(
                "Order cannot be paid now"
            );
        }

        status = OrderStatus.PAID;
    }
}
```

The object controls the state transition.

---

# 81. Favor Explicit Behavior

Compare:

```java
order.setStatus(OrderStatus.SHIPPED);
```

with:

```java
order.ship();
```

The second communicates intent better.

It also lets the Order validate whether shipping is allowed.

---

# 82. Good Class API

A good public API should expose:

```text
what callers need
```

and hide:

```text
how the class internally works
```

Example:

```java
account.withdraw(1000);
```

Caller does not need to know:

```text
how balance is stored
how validation works
how transaction records are created
```

---

# 83. Hide Implementation Details

Suppose internally:

```java
private double balance;
```

Today.

Tomorrow you might change to:

```java
private BigDecimal balance;
```

If callers only use:

```java
deposit()
withdraw()
getBalance()
```

the internal implementation can change with fewer effects.

This is the value of encapsulation.

---

# 84. Avoid Public Fields

Prefer:

```java
private final String name;
```

instead of:

```java
public String name;
```

Public fields expose implementation details and make validation and future changes harder.

---

# 85. Getters Are Not Always Automatically Good

Beginners often think:

```text
private field
+
getter
+
setter
=
perfect encapsulation
```

Not always.

If you expose every internal detail through getters, callers can become dependent on the class's internal structure.

Expose meaningful operations where possible.

---

# 86. Example

Instead of:

```java
cart.getItems().add(product);
```

prefer:

```java
cart.addItem(product);
```

Why?

Because Cart can control:

```text
null checks
duplicates
quantity
inventory rules
pricing
events
```

The caller does not manipulate internal state directly.

---

# 87. Collections and Encapsulation

Bad:

```java
class Cart {

    private final List<Product> items =
        new ArrayList<>();

    List<Product> getItems() {
        return items;
    }
}
```

Caller can:

```java
cart.getItems().clear();
```

without Cart knowing why.

Better:

```java
void addItem(Product product) {
    items.add(product);
}

void removeItem(Product product) {
    items.remove(product);
}
```

---

# 88. Defensive Encapsulation

If callers truly need read access:

```java
List<Product> getItems() {
    return List.copyOf(items);
}
```

This allows observation without allowing the caller to modify the internal list through the returned reference.

---

# 89. Class Size

There is no universal rule like:

```text
class must be under 100 lines
```

or:

```text
class must have 5 methods
```

Instead ask:

```text
Is the class understandable?
Does it have a focused responsibility?
Are its methods related?
Is it changing for many unrelated reasons?
```

---

# 90. Method Size

Likewise, there is no magic maximum line count.

A long method may be a warning if it:

```text
does many unrelated tasks
contains deeply nested logic
is hard to test
has many local variables
has many branches
```

Extract meaningful methods based on responsibilities.

---

# 91. Naming Is Part of Design

Good:

```java
calculateTotal()
withdraw()
cancel()
sendInvoice()
```

Poor:

```java
doStuff()
process()
handle()
run()
```

unless the generic name is genuinely appropriate.

Names communicate the model.

---

# 92. Domain Language

Use names from the problem domain.

If the application is a library:

```text
Book
Member
Loan
Fine
```

If it is banking:

```text
Account
Transaction
Deposit
Withdrawal
```

Good domain names make the code easier to understand.

---

# 93. Avoid Boolean Parameter Confusion

Example:

```java
createUser(
    "Aman",
    true,
    false,
    true
);
```

What do these booleans mean?

It is difficult to understand.

Better:

```java
UserOptions options =
    new UserOptions(
        true,
        false,
        true
    );
```

or use meaningful methods/options.

---

# 94. Tell the Story Through Code

Compare:

```java
if (order.getStatus() == PAID) {
    order.setStatus(SHIPPED);
}
```

with:

```java
order.ship();
```

The second expresses the domain action.

The object owns the rule.

---

# 95. Dependency Direction

A healthy design often has dependencies flowing toward stable abstractions.

Example:

```text
Application
     ↓
Payment
     ↑
CardPayment
```

The high-level application depends on the Payment contract.

The concrete implementation depends on that contract by implementing it.

---

# 96. Dependency Inversion vs Dependency Injection

Do not confuse them.

Dependency Inversion:

```text
design principle
```

Dependency Injection:

```text
technique for supplying dependencies
```

Example:

```java
Checkout(Payment payment)
```

is dependency injection.

Using:

```java
Payment
```

instead of a concrete implementation can support dependency inversion.

---

# 97. Interface vs Abstract Class in Design

Use an interface when you mainly need:

```text
contract
capability
multiple implementations
multiple inheritance of type
```

Use an abstract class when you need:

```text
shared state
shared implementation
constructor
common protected behavior
```

The exact choice depends on the design.

---

# 98. Composition + Interface

One of the strongest combinations:

```java
class Checkout {

    private final Payment payment;

    Checkout(Payment payment) {
        this.payment = payment;
    }
}
```

This gives:

```text
composition
+
abstraction
+
polymorphism
+
dependency injection
```

This pattern appears frequently in real applications.

---

# 99. Testing and Good Design

Good design often makes testing easier.

Suppose:

```java
class OrderService {

    private final Payment payment;

    OrderService(Payment payment) {
        this.payment = payment;
    }
}
```

During testing, supply:

```java
FakePayment
```

instead of a real payment gateway.

This avoids real external operations.

---

# 100. Fake Dependency Example

```java
interface Payment {

    void pay(double amount);
}

class FakePayment
        implements Payment {

    double lastAmount;

    @Override
    public void pay(double amount) {
        lastAmount = amount;
    }
}
```

Test:

```java
FakePayment fake =
    new FakePayment();

OrderService service =
    new OrderService(fake);
```

Now the service can be tested without a real payment system.

---

# 101. Refactoring

Refactoring means changing the internal structure of code without intentionally changing its externally observable behavior.

Examples:

```text
extract class
extract method
rename method
replace inheritance with composition
introduce interface
move responsibility
encapsulate field
remove duplication
```

---

# 102. Refactoring Example

Before:

```java
class Order {

    void checkout() {

        // calculate total
        // validate payment
        // save order
        // send email
    }
}
```

After:

```text
Order
OrderCalculator
PaymentService
OrderRepository
EmailService
```

The system may now be easier to maintain.

---

# 103. Refactoring Should Be Incremental

Do not rewrite an entire project blindly.

A safer approach:

```text
1. Understand current behavior.
2. Identify one design problem.
3. Make one small change.
4. Compile/test.
5. Repeat.
```

This reduces the chance of introducing unrelated bugs.

---

# 104. OOP Design Example — Bad

```java
class ShoppingApplication {

    private List<Product> products;

    void addProduct(Product product) {
        products.add(product);
    }

    void processPayment(double amount) {
        // payment gateway
    }

    void sendEmail(String message) {
        // email
    }

    void saveDatabase() {
        // database
    }

    void generateReport() {
        // reporting
    }

    void calculateTax() {
        // tax
    }
}
```

Problems:

```text
low cohesion
high coupling
many reasons to change
too many responsibilities
hard testing
```

---

# 105. OOP Design Example — Better

Split responsibilities:

```java
class ShoppingCart {

    void addProduct(Product product) {
    }

    double calculateTotal() {
        return 0;
    }
}
```

```java
class PaymentService {

    void pay(double amount) {
    }
}
```

```java
class EmailService {

    void send(String message) {
    }
}
```

```java
class ProductRepository {

    void save(Product product) {
    }
}
```

Now each class has a clearer purpose.

---

# 106. Practical Program — High Cohesion

```java
class BankAccount {

    private final String accountNumber;
    private double balance;

    BankAccount(
        String accountNumber,
        double openingBalance
    ) {

        if (openingBalance < 0) {
            throw new IllegalArgumentException(
                "Opening balance cannot be negative"
            );
        }

        this.accountNumber =
            accountNumber;

        this.balance =
            openingBalance;
    }

    void deposit(double amount) {

        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive"
            );
        }

        balance += amount;
    }

    void withdraw(double amount) {

        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive"
            );
        }

        if (amount > balance) {
            throw new IllegalArgumentException(
                "Insufficient balance"
            );
        }

        balance -= amount;
    }

    double getBalance() {
        return balance;
    }
}
```

This class has strong cohesion.

It manages:

```text
account state
deposit
withdrawal
balance rules
```

---

# 107. Practical Program — Open/Closed

```java
interface Discount {

    double calculate(double amount);
}

class NoDiscount
        implements Discount {

    public double calculate(
        double amount
    ) {
        return 0;
    }
}

class StudentDiscount
        implements Discount {

    public double calculate(
        double amount
    ) {
        return amount * 0.10;
    }
}

class Checkout {

    private final Discount discount;

    Checkout(Discount discount) {
        this.discount = discount;
    }

    double finalPrice(double amount) {

        return amount -
               discount.calculate(amount);
    }
}
```

New discount types can be added as new implementations.

---

# 108. Practical Program — Interface Segregation

```java
interface Printable {

    void print();
}

interface Scannable {

    void scan();
}

class SimplePrinter
        implements Printable {

    @Override
    public void print() {
        System.out.println(
            "Printing"
        );
    }
}

class OfficeMachine
        implements Printable,
        Scannable {

    @Override
    public void print() {
        System.out.println(
            "Printing"
        );
    }

    @Override
    public void scan() {
        System.out.println(
            "Scanning"
        );
    }
}
```

Each implementation supports only the capabilities it needs.

---

# 109. Practical Program — Dependency Inversion

```java
interface UserRepository {

    void save(String username);
}

class DatabaseUserRepository
        implements UserRepository {

    @Override
    public void save(
        String username
    ) {
        System.out.println(
            "Saving " +
            username +
            " to database"
        );
    }
}

class UserService {

    private final UserRepository repository;

    UserService(
        UserRepository repository
    ) {
        this.repository = repository;
    }

    void register(String username) {
        repository.save(username);
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        UserRepository repository =
            new DatabaseUserRepository();

        UserService service =
            new UserService(repository);

        service.register("Aman");
    }
}
```

Output:

```text
Saving Aman to database
```

---

# 110. Practical Program — Immutable Object

```java
final class Student {

    private final String name;
    private final int age;

    Student(
        String name,
        int age
    ) {

        if (name == null ||
            name.isBlank()) {

            throw new IllegalArgumentException(
                "Invalid name"
            );
        }

        if (age < 0) {
            throw new IllegalArgumentException(
                "Invalid age"
            );
        }

        this.name = name;
        this.age = age;
    }

    String getName() {
        return name;
    }

    int getAge() {
        return age;
    }
}
```

Once constructed:

```text
name cannot be changed
age cannot be changed
```

assuming the fields themselves refer to immutable values.

---

# 111. Practical Program — Defensive Copy

```java
import java.util.ArrayList;
import java.util.List;

final class Student {

    private final List<String> subjects;

    Student(List<String> subjects) {

        this.subjects =
            new ArrayList<>(subjects);
    }

    List<String> getSubjects() {
        return List.copyOf(subjects);
    }
}
```

The internal collection is protected from direct external mutation.

---

# 112. Practical Program — Behavior-Rich Order

```java
enum OrderStatus {

    CREATED,
    PAID,
    SHIPPED,
    CANCELLED
}

class Order {

    private OrderStatus status =
        OrderStatus.CREATED;

    void pay() {

        if (status !=
            OrderStatus.CREATED) {

            throw new IllegalStateException(
                "Cannot pay this order"
            );
        }

        status = OrderStatus.PAID;
    }

    void ship() {

        if (status !=
            OrderStatus.PAID) {

            throw new IllegalStateException(
                "Only paid orders can ship"
            );
        }

        status = OrderStatus.SHIPPED;
    }

    void cancel() {

        if (status ==
            OrderStatus.SHIPPED) {

            throw new IllegalStateException(
                "Shipped order cannot be cancelled"
            );
        }

        status = OrderStatus.CANCELLED;
    }

    OrderStatus getStatus() {
        return status;
    }
}
```

The Order object controls its own valid state transitions.

---

# 113. Practical Program — Composition Instead of Inheritance

```java
interface NotificationSender {

    void send(String message);
}

class EmailSender
        implements NotificationSender {

    public void send(
        String message
    ) {
        System.out.println(
            "Email: " + message
        );
    }
}

class SmsSender
        implements NotificationSender {

    public void send(
        String message
    ) {
        System.out.println(
            "SMS: " + message
        );
    }
}

class NotificationService {

    private final NotificationSender sender;

    NotificationService(
        NotificationSender sender
    ) {
        this.sender = sender;
    }

    void notifyUser(String message) {
        sender.send(message);
    }
}
```

Usage:

```java
NotificationService email =
    new NotificationService(
        new EmailSender()
    );

NotificationService sms =
    new NotificationService(
        new SmsSender()
    );
```

The service behavior is assembled through composition.

---

# 114. Practical Program — Avoiding a God Class

Instead of:

```java
class ECommerceApplication {
    // everything
}
```

use:

```java
class ProductService {
}

class CartService {
}

class OrderService {
}

class PaymentService {
}

class NotificationService {
}
```

Then connect them through clear dependencies.

---

# 115. Output Question 1 — Immutability

```java
final class User {

    private final String name;

    User(String name) {
        this.name = name;
    }

    String getName() {
        return name;
    }
}
```

Question:

Can this code change the `name` field after construction?

Answer:

```text
No
```

The field reference is final and there is no mutating method.

---

# 116. Output Question 2 — final Reference

```java
List<String> list =
    new ArrayList<>();

final List<String> names =
    list;

names.add("Aman");

System.out.println(names);
```

Output:

```text
[Aman]
```

Why?

`final` prevents the reference from being reassigned.

It does not make the List immutable.

---

# 117. Output Question 3 — Composition

```java
interface Engine {

    void start();
}

class PetrolEngine
        implements Engine {

    public void start() {
        System.out.println(
            "Petrol"
        );
    }
}

class Car {

    private final Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }

    void start() {
        engine.start();
    }
}

new Car(
    new PetrolEngine()
).start();
```

Output:

```text
Petrol
```

---

# 118. Output Question 4 — Polymorphic Dependency

```java
interface Payment {

    void pay();
}

class CardPayment
        implements Payment {

    public void pay() {
        System.out.println("Card");
    }
}

class UpiPayment
        implements Payment {

    public void pay() {
        System.out.println("UPI");
    }
}

Payment payment =
    new UpiPayment();

payment.pay();
```

Output:

```text
UPI
```

---

# 119. Output Question 5 — Behavior

```java
class Account {

    private double balance = 1000;

    void withdraw(double amount) {

        if (amount > balance) {
            throw new IllegalArgumentException();
        }

        balance -= amount;
    }

    double getBalance() {
        return balance;
    }
}

Account account =
    new Account();

account.withdraw(300);

System.out.println(
    account.getBalance()
);
```

Output:

```text
700.0
```

The Account object owns the withdrawal rule.

---

# 120. Output Question 6 — Defensive Copy

```java
List<String> original =
    new ArrayList<>();

original.add("Java");

List<String> copy =
    List.copyOf(original);

original.add("Python");

System.out.println(copy);
```

Output:

```text
[Java]
```

The copy does not automatically reflect later changes to the original list.

---

# 121. Output Question 7 — Unmodifiable View

```java
List<String> original =
    new ArrayList<>();

original.add("Java");

List<String> view =
    Collections.unmodifiableList(
        original
    );

original.add("Python");

System.out.println(view);
```

Output:

```text
[Java, Python]
```

The view reflects changes to the underlying list, but callers cannot modify the view through its mutation methods.

---

# 122. Output Question 8 — SRP

```java
class Invoice {

    void calculateTotal() {
    }

    void sendEmail() {
    }

    void saveDatabase() {
    }
}
```

Question:

Does this automatically violate Java syntax?

Answer:

```text
No.
```

Does it potentially violate good SRP design?

```text
Yes.
```

It has multiple unrelated responsibilities.

---

# 123. Interview Questions — OOP Design Basics

## Q1. What is OOP design?

OOP design is the process of organizing classes, objects, responsibilities, relationships, and dependencies so that software is understandable, maintainable, testable, and extensible.

## Q2. What is cohesion?

Cohesion describes how closely related the responsibilities inside a class are.

## Q3. What is coupling?

Coupling describes how strongly one component depends on another.

## Q4. What is good OOP design?

A common goal is:

```text
high cohesion
low unnecessary coupling
clear responsibilities
encapsulation
appropriate abstraction
manageable dependencies
```

## Q5. What is SRP?

A class should have one focused reason to change.

---

# 124. Interview Questions — SOLID

## Q6. What does SOLID stand for?

```text
S — Single Responsibility Principle
O — Open/Closed Principle
L — Liskov Substitution Principle
I — Interface Segregation Principle
D — Dependency Inversion Principle
```

## Q7. Explain OCP.

Software should be designed so that new behavior can often be added through extension without repeatedly modifying stable existing code.

## Q8. Explain LSP.

Subtypes should be safely usable where their parent type is expected without violating behavioral expectations.

## Q9. Explain ISP.

Clients should not be forced to depend on methods they do not need.

## Q10. Explain DIP.

High-level and low-level modules should depend on abstractions rather than the high-level module directly depending on concrete details.

---

# 125. Interview Questions — Immutability

## Q11. What is an immutable object?

An object whose observable state cannot be changed after construction.

## Q12. Is final enough to make a class immutable?

No.

A final reference can still refer to a mutable object.

## Q13. How can you design an immutable class?

Common techniques:

```text
private state
final fields where appropriate
initialize state in constructor
no mutating setters
defensive copying
final class when subclass mutation must be prevented
```

## Q14. Why is immutability useful?

It simplifies reasoning about state and can make sharing safer.

## Q15. What is defensive copying?

Creating or returning a copy of mutable data so external code cannot directly modify internal state.

---

# 126. Interview Questions — Composition

## Q16. Why favor composition over inheritance?

Composition can provide more flexibility by assembling behavior from collaborating objects instead of creating rigid inheritance hierarchies.

## Q17. Is inheritance bad?

No.

Use inheritance when there is a genuine subtype relationship and the subtype satisfies the parent contract.

## Q18. What is programming to an abstraction?

Writing code against an interface or abstract contract instead of a concrete implementation.

## Q19. What is dependency injection?

Supplying a dependency from outside the dependent class.

## Q20. Is dependency injection the same as dependency inversion?

No.

Dependency inversion is a design principle.

Dependency injection is a technique for supplying dependencies.

---

# 127. Interview Questions — Encapsulation and APIs

## Q21. Why should fields usually be private?

To control access and protect invariants.

## Q22. Are getters and setters always good encapsulation?

No.

Exposing every internal field through getters/setters can still leak implementation details.

## Q23. What is Tell, Don't Ask?

Prefer asking an object to perform an operation rather than extracting its internal state and performing the operation externally.

## Q24. What is a God class?

A class that contains too many responsibilities and knows or does too much.

## Q25. What is high cohesion?

A class has high cohesion when its responsibilities are strongly related.

---

# 128. Interview Questions — Abstraction

## Q26. Should every class have an interface?

No.

Create abstractions when they provide a meaningful contract, multiple implementations, decoupling, testing value, or another real design benefit.

## Q27. What is overengineering?

Adding unnecessary complexity, abstractions, layers, or patterns that do not solve an actual problem.

## Q28. What is YAGNI?

"You Aren't Gonna Need It."

Avoid building unnecessary features or abstractions only for hypothetical future requirements.

## Q29. What is DRY?

"Don't Repeat Yourself."

Avoid unnecessary duplication of knowledge or logic.

## Q30. What is KISS?

"Keep It Simple."

Prefer simple solutions when they adequately solve the problem.

---

# 129. Design Exercise 1 — Bad Payment Design

Given:

```java
class Checkout {

    void payByCard(double amount) {
    }

    void payByUpi(double amount) {
    }

    void payByWallet(double amount) {
    }
}
```

Tasks:

```text
1. Identify the design problem.
2. Create a Payment interface.
3. Create CardPayment.
4. Create UpiPayment.
5. Create WalletPayment.
6. Make Checkout depend on Payment.
```

---

# 130. Design Exercise 2 — God Class

Given:

```text
ApplicationManager
 ├── users
 ├── payments
 ├── emails
 ├── reports
 ├── database
 ├── authentication
 └── logging
```

Split it into focused classes.

Explain why your design has better cohesion.

---

# 131. Design Exercise 3 — Interface Segregation

Create:

```java
interface SmartDevice {

    void print();
    void scan();
    void fax();
}
```

Now create:

```text
SimplePrinter
Scanner
FaxMachine
MultiFunctionMachine
```

Refactor the design using smaller interfaces.

---

# 132. Design Exercise 4 — Immutable Student

Create an immutable:

```text
Student
```

with:

```text
name
rollNumber
subjects
```

Requirements:

```text
private fields
final fields
constructor validation
defensive copy of subjects
no setters
safe getter for subjects
```

---

# 133. Design Exercise 5 — Bank Account

Create:

```text
BankAccount
```

with:

```text
deposit()
withdraw()
transfer()
getBalance()
```

Rules:

```text
balance cannot become negative
amount must be positive
account number cannot change
```

Do not expose a public balance field.

---

# 134. Design Exercise 6 — Order State

Create:

```text
Order
```

with:

```text
CREATED
PAID
SHIPPED
DELIVERED
CANCELLED
```

Methods:

```text
pay()
ship()
deliver()
cancel()
```

Reject invalid state transitions.

Do not provide:

```java
setStatus(...)
```

---

# 135. Design Exercise 7 — Composition

Create:

```text
NotificationService
NotificationSender
EmailSender
SmsSender
PushSender
```

NotificationService should use composition and constructor injection.

Do not create:

```text
EmailNotificationService extends NotificationService
SmsNotificationService extends NotificationService
PushNotificationService extends NotificationService
```

unless inheritance genuinely represents your domain.

---

# 136. Design Exercise 8 — Repository Abstraction

Create:

```text
UserRepository
MySQLUserRepository
MemoryUserRepository
UserService
```

UserService should depend on UserRepository.

Then create a test using MemoryUserRepository.

---

# 137. Design Exercise 9 — Refactoring

Start with:

```java
class Order {

    void calculateTotal() {}
    void saveToDatabase() {}
    void sendEmail() {}
    void processPayment() {}
}
```

Refactor it into appropriate classes.

Explain:

```text
SRP
coupling
cohesion
dependency injection
```

---

# 138. Design Exercise 10 — Long Parameter List

Create:

```java
registerUser(
    String name,
    String city,
    String state,
    String country,
    String phone,
    String email
)
```

Refactor using:

```text
Address
ContactInfo
```

Explain why the new design is easier to understand.

---

# 139. Design Exercise 11 — Tell, Don't Ask

Given:

```java
if (account.getBalance() >= amount) {
    account.setBalance(
        account.getBalance() - amount
    );
}
```

Refactor it to:

```java
account.withdraw(amount);
```

Move validation and state change into Account.

---

# 140. Design Exercise 12 — LSP

Create a parent abstraction:

```text
Payment
```

and implementations:

```text
CardPayment
UpiPayment
```

Make sure every implementation follows the Payment contract.

Then create a deliberately broken implementation and explain why it violates substitutability.

---

# 141. Design Exercise 13 — Open/Closed

Create:

```text
Shape
Circle
Rectangle
Triangle
AreaCalculator
```

Avoid:

```java
if shape instanceof Circle
```

for every new shape.

Use polymorphism so each Shape calculates its own area.

---

# 142. Design Exercise 14 — Cohesion

Create a class containing:

```text
calculateSalary()
sendEmail()
saveDatabase()
generateInvoice()
printReport()
```

Refactor it.

Then explain why each resulting class has higher cohesion.

---

# 143. Design Exercise 15 — Coupling

Create two versions:

```text
Version A:
Service directly creates MySQLRepository

Version B:
Service receives Repository interface
```

Compare:

```text
coupling
testing
replacement
maintenance
```

---

# 144. Mini Project 1 — Clean E-Commerce Design

Build:

```text
Customer
Address
Product
Cart
CartItem
Order
Payment
PaymentProcessor
OrderRepository
NotificationSender
```

Requirements:

```text
1. Customer has Address.
2. Cart contains CartItems.
3. CartItem refers to Product.
4. Order uses Payment.
5. Payment is an interface.
6. NotificationSender is an interface.
7. Repository is an abstraction.
8. Dependencies are injected.
9. Objects protect their own state.
10. Avoid a God class.
```

---

# 145. Mini Project 2 — Banking System

Build:

```text
Bank
Account
Customer
Transaction
AccountRepository
NotificationService
```

Requirements:

```text
1. Account controls deposit/withdrawal.
2. Balance cannot be changed directly.
3. Transaction records operations.
4. Repository is an abstraction.
5. Notification is injected.
6. Use immutable value objects where appropriate.
7. Keep classes cohesive.
```

---

# 146. Mini Project 3 — Notification System

Build:

```text
NotificationService
NotificationSender
EmailSender
SmsSender
PushSender
```

Requirements:

```text
1. Use an interface.
2. Use composition.
3. Use constructor injection.
4. Support multiple senders.
5. Avoid inheritance for sender selection.
6. Make testing possible using FakeNotificationSender.
```

---

# 147. Mini Project 4 — Library System

Build:

```text
Library
Book
Member
Loan
FineCalculator
NotificationSender
```

Requirements:

```text
1. Library manages books.
2. Member can borrow books.
3. Loan represents the borrowing relationship.
4. FineCalculator calculates fines.
5. NotificationSender is an abstraction.
6. Avoid putting every operation in Library.
7. Protect internal collections.
```

---

# 148. Mini Project 5 — Order Processing System

Build:

```text
Order
OrderItem
Payment
PaymentRepository
OrderRepository
NotificationSender
OrderService
```

Use:

```text
interfaces
composition
dependency injection
encapsulation
immutable values
SOLID principles
```

Then explain the design decisions.

---

# 149. Challenge — Design Without Inheritance

Create a game character system.

Characters can have:

```text
movement
attack
defense
weapon
```

Avoid a large hierarchy such as:

```text
Character
 ↓
Warrior
 ↓
MagicWarrior
 ↓
FireMagicWarrior
 ↓
...
```

Instead experiment with composition:

```text
Character
 ├── MovementStrategy
 ├── AttackStrategy
 ├── DefenseStrategy
 └── Weapon
```

---

# 150. Challenge — Replace If/Else

Suppose:

```java
if (type.equals("CARD")) {
    // card
} else if (type.equals("UPI")) {
    // UPI
} else if (type.equals("WALLET")) {
    // wallet
}
```

Design a polymorphic solution using:

```text
Payment interface
CardPayment
UpiPayment
WalletPayment
```

---

# 151. Challenge — Immutable Money

Create:

```text
Money
```

with:

```text
amount
currency
```

Requirements:

```text
immutable
value equality
validation
add()
subtract()
```

Example:

```java
Money a =
    new Money(100, "INR");

Money b =
    new Money(50, "INR");

Money c =
    a.add(b);
```

Expected conceptual result:

```text
150 INR
```

Do not mutate `a` or `b`.

---

# 152. Challenge — Valid State Transitions

Create:

```text
Order
```

with:

```text
CREATED
PAID
SHIPPED
DELIVERED
CANCELLED
```

Rules:

```text
CREATED → PAID
PAID → SHIPPED
SHIPPED → DELIVERED
CREATED → CANCELLED
PAID → CANCELLED
```

Reject invalid transitions.

---

# 153. Challenge — Identify Design Smells

Look at:

```java
class UserManager {

    void createUser() {}
    void deleteUser() {}
    void sendEmail() {}
    void saveToDatabase() {}
    void calculateTax() {}
    void generateInvoice() {}
    void printReport() {}
    void processPayment() {}
}
```

Identify at least five design problems.

Possible answers:

```text
God class
low cohesion
high coupling
SRP violation
many reasons to change
difficult testing
```

---

# 154. Design Checklist

When creating a class, ask:

```text
1. What does this class represent?

2. What is its main responsibility?

3. Does it have unrelated responsibilities?

4. What state should it own?

5. What state should it hide?

6. Which invariants must it protect?

7. What behavior belongs inside it?

8. Which other objects does it need?

9. Can those dependencies be abstractions?

10. Should dependencies be injected?

11. Is inheritance actually a true IS-A relationship?

12. Would composition be more flexible?

13. Is the class highly cohesive?

14. Is coupling unnecessarily high?

15. Is the public API exposing too much?

16. Can invalid states be prevented?

17. Is the object mutable unnecessarily?

18. Do collections need defensive copies?

19. Is an interface actually useful?

20. Am I overengineering?
```

---

# 155. The OOP Design Mindset

A beginner often thinks:

```text
"What classes do I need?"
```

A better question is:

```text
"What responsibilities exist?"
```

Then:

```text
Which object should own each responsibility?
```

Then:

```text
How should those objects collaborate?
```

Then:

```text
What should be public?
What should remain private?
```

Then:

```text
What dependencies can change?
```

This is the beginning of software design.

---

# 156. From Classes to Responsibilities

Do not start with:

```text
I need 20 classes.
```

Start with:

```text
What does the system need to do?
```

Example:

```text
Place order
Calculate price
Process payment
Save order
Send confirmation
```

Then assign responsibilities:

```text
Order
PricingService
Payment
OrderRepository
NotificationSender
```

This is much more meaningful than inventing classes first.

---

# 157. From Responsibilities to Relationships

Once responsibilities are known:

```text
Order → PricingService
OrderService → Payment
OrderService → OrderRepository
OrderService → NotificationSender
```

Now determine:

```text
association?
dependency?
composition?
interface?
```

This connects Chapter 22 with Chapter 23.

---

# 158. From Relationships to Abstractions

If a dependency can vary:

```text
Payment
 ├── CardPayment
 ├── UpiPayment
 └── WalletPayment
```

Use an abstraction:

```java
interface Payment
```

If the implementation is stable and variation is not needed, do not automatically create an interface.

---

# 159. From Abstractions to Polymorphism

Now:

```java
Payment payment =
    new CardPayment();
```

or:

```java
Payment payment =
    new UpiPayment();
```

The high-level code can work with:

```java
Payment
```

without caring about the exact implementation.

---

# 160. From Polymorphism to Extensibility

Later:

```java
class WalletPayment
        implements Payment {
}
```

You can add a new implementation.

This is where:

```text
interfaces
polymorphism
composition
dependency injection
OCP
DIP
```

come together.

---

# 161. Complete Design Example

Consider:

```text
Online Store
```

Requirements:

```text
customers place orders
orders contain products
payment can be Card/UPI
orders are stored
confirmation is sent
```

A reasonable design might be:

```text
Customer
   |
   ↓
Order
   |
   +── OrderItem
   |      |
   |      ↓
   |    Product
   |
   +── Payment
   |
   +── OrderRepository
   |
   +── NotificationSender
```

Not every line represents the same relationship.

That is why relationship analysis matters.

---

# 162. Complete Design Example — Interfaces

```java
interface Payment {

    void pay(double amount);
}
```

```java
interface OrderRepository {

    void save(Order order);
}
```

```java
interface NotificationSender {

    void send(String message);
}
```

Then:

```java
class OrderService {

    private final Payment payment;
    private final OrderRepository repository;
    private final NotificationSender sender;

    OrderService(
        Payment payment,
        OrderRepository repository,
        NotificationSender sender
    ) {
        this.payment = payment;
        this.repository = repository;
        this.sender = sender;
    }
}
```

This is a strong example of dependency inversion and dependency injection.

---

# 163. Why This Design Is Flexible

You can replace:

```text
Payment
OrderRepository
NotificationSender
```

without rewriting the core OrderService.

For example:

```text
CardPayment
UpiPayment

MySQLOrderRepository
MemoryOrderRepository

EmailSender
SmsSender
```

The service depends on contracts.

---

# 164. But Do Not Overuse This Pattern

For a tiny program:

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }
}
```

you probably do not need:

```text
CalculatorInterface
CalculatorFactory
CalculatorProvider
CalculatorManager
CalculatorAdapter
```

Good design is not maximum abstraction.

Good design is appropriate abstraction.

---

# 165. Architecture Emerges From Good Design

As systems become larger:

```text
classes
 ↓
components
 ↓
modules
 ↓
services
 ↓
applications
```

Good class design helps create good larger architecture.

Bad dependencies at the class level can become bad dependencies at the application level.

---

# 166. OOP Design and Maintainability

A maintainable system should make common changes reasonably local.

Example:

```text
Change email provider
```

Ideally:

```text
EmailSender implementation
```

changes.

You should not need to rewrite:

```text
Order
Customer
Product
Cart
Payment
```

This is one practical way to judge design quality.

---

# 167. OOP Design and Testing

Good boundaries allow isolated testing.

For example:

```text
Order
→ test order rules

Payment
→ test payment behavior

PricingService
→ test pricing rules

OrderRepository
→ test persistence separately
```

Clear responsibilities reduce the amount of setup needed for individual tests.

---

# 168. OOP Design and Change

Ask:

> "If this requirement changes, how many classes must I modify?"

Example:

```text
Add a new payment method.
```

Good design:

```text
create new Payment implementation
```

Poor design:

```text
modify 10 unrelated classes
```

This is a practical design test.

---

# 169. OOP Design and Debugging

When responsibilities are clear:

```text
wrong price?
→ PricingService

payment problem?
→ Payment implementation

database problem?
→ Repository

email problem?
→ NotificationSender
```

When everything is in one class:

```text
everything could be the problem
```

Good design helps debugging.

---

# 170. Common Beginner Mistakes

Avoid these:

```text
1. Using inheritance only for code reuse.

2. Making every field public.

3. Creating getters and setters for everything.

4. Creating one giant class.

5. Creating an interface for every class automatically.

6. Using deep inheritance unnecessarily.

7. Putting all business logic into Service classes.

8. Letting outside code manipulate internal collections.

9. Allowing invalid object states.

10. Creating too many abstractions.

11. Copy-pasting business rules.

12. Ignoring coupling.

13. Ignoring cohesion.

14. Making dependencies with concrete implementations unnecessarily.

15. Confusing final references with immutable objects.

16. Treating SOLID as rigid laws instead of design guidelines.

17. Designing for imaginary future requirements.

18. Using patterns just to show knowledge.

19. Overusing static mutable state.

20. Optimizing architecture before understanding the problem.
```

---

# 171. SOLID in One Real Example

Suppose:

```text
OrderService
```

needs:

```text
Payment
Repository
Notification
```

Use:

```java
interface Payment {
    void pay(double amount);
}

interface OrderRepository {
    void save(Order order);
}

interface NotificationSender {
    void send(String message);
}
```

Then:

```java
class OrderService {

    private final Payment payment;
    private final OrderRepository repository;
    private final NotificationSender sender;

    OrderService(
        Payment payment,
        OrderRepository repository,
        NotificationSender sender
    ) {
        this.payment = payment;
        this.repository = repository;
        this.sender = sender;
    }
}
```

This demonstrates several principles:

```text
SRP
→ OrderService coordinates order processing

OCP
→ new implementations can be added

LSP
→ implementations should honor contracts

ISP
→ focused interfaces

DIP
→ OrderService depends on abstractions
```

---

# 172. SOLID Is About Trade-Offs

SOLID does not mean:

```text
more classes = better
more interfaces = better
more abstraction = better
```

Instead:

```text
Use the principle when it improves the design.
```

A small application may need very little abstraction.

A large application may need carefully designed boundaries.

---

# 173. Design Is Context Dependent

There is rarely one perfect design.

For:

```text
small college assignment
```

you may use:

```text
5 classes
```

For:

```text
large production system
```

you may need:

```text
interfaces
modules
repositories
services
domain objects
dependency injection
```

Good design depends on:

```text
problem
requirements
team
scale
change frequency
testing needs
```

---

# 174. Final Mental Model

Think of OOP design like this:

```text
              REQUIREMENTS
                   ↓
             RESPONSIBILITIES
                   ↓
                 CLASSES
                   ↓
                OBJECTS
                   ↓
              RELATIONSHIPS
                   ↓
              ABSTRACTIONS
                   ↓
             DEPENDENCIES
                   ↓
          MAINTAINABLE SOFTWARE
```

And continuously ask:

```text
Is this class responsible for the right thing?

Is this relationship correct?

Is this dependency necessary?

Can this implementation change independently?

Am I exposing too much?

Am I adding unnecessary complexity?
```

---

# 175. Chapter Summary

In this chapter, you learned that good OOP is not just about using:

```text
class
object
extends
implements
```

Good OOP is about design.

The major principles are:

```text
High cohesion
Low unnecessary coupling
Encapsulation
Clear responsibilities
Programming to abstractions
Composition over inheritance
Dependency injection
Immutability where useful
```

You also learned SOLID:

```text
S → Single Responsibility
O → Open/Closed
L → Liskov Substitution
I → Interface Segregation
D → Dependency Inversion
```

And several practical design ideas:

```text
Tell, Don't Ask
Law of Demeter
DRY
KISS
YAGNI
Defensive copying
Value objects
Behavior-rich objects
Invariant protection
Avoiding God classes
Avoiding overengineering
```

---

# 176. Final Revision Checklist

Before moving forward, make sure you can explain:

```text
[ ] What is software design?
[ ] What is good OOP design?
[ ] What is responsibility?
[ ] What is cohesion?
[ ] What is coupling?
[ ] High cohesion vs low cohesion
[ ] High coupling vs low coupling
[ ] Single Responsibility Principle
[ ] Open/Closed Principle
[ ] Liskov Substitution Principle
[ ] Interface Segregation Principle
[ ] Dependency Inversion Principle
[ ] Complete SOLID
[ ] Programming to abstractions
[ ] Dependency Injection
[ ] Composition over inheritance
[ ] Immutable objects
[ ] final vs immutable
[ ] Defensive copying
[ ] Value objects
[ ] Behavior-rich objects
[ ] Anemic object model
[ ] Tell, Don't Ask
[ ] Law of Demeter
[ ] God class
[ ] Overengineering
[ ] YAGNI
[ ] DRY
[ ] KISS
[ ] Invariants
[ ] Encapsulation and API design
[ ] Protecting collections
[ ] Design smells
[ ] Refactoring
[ ] Designing for change
[ ] Designing for testing
```

---

# 177. Final OOP Foundation

You have now completed the main OOP theory section:

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
        ↓
Chapter 23
OOP Design
```

You should now be able to move from:

```text
"I know Java OOP syntax."
```

to:

```text
"I can reason about how Java classes should be designed."
```

The next chapters move into the rest of the Java language and standard library:

```text
Chapter 24 → Packages & Access Modifiers
Chapter 25 → Exception Handling
Chapter 26 → File Handling
Chapter 27 → Wrapper Classes
Chapter 28 → Generics
Chapter 29 → Enums
Chapter 30 → Date & Time
Chapter 31 → Collections
...
```

The OOP concepts from Chapters 11–23 will continue to appear throughout those chapters and especially in the two dedicated OOP projects near the end of the course.
