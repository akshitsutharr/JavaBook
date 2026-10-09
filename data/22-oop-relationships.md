# Chapter 22 — OOP Relationships

> **Java Master Course — Chapter 22 of 50**
>
> In the previous chapters, you learned the major OOP mechanisms:
>
> ```text
> Class
> Object
> Encapsulation
> Inheritance
> Overloading
> Overriding
> Polymorphism
> Abstraction
> Interface
> ```
>
> Now we move to another very important OOP topic:
>
> **How objects are related to each other.**
>
> Real applications are not made from isolated classes. Objects communicate, contain other objects, use other objects, own other objects, and depend on other objects.
>
> The most important relationships in this chapter are:
>
> ```text
> IS-A
> HAS-A
> Association
> Aggregation
> Composition
> Dependency
> ```
>
> Understanding these relationships is essential for good OOP design.

---

# 1. What You Will Learn

By the end of this chapter, you should understand:

```text
✓ Why object relationships matter
✓ IS-A relationship
✓ HAS-A relationship
✓ Association
✓ Aggregation
✓ Composition
✓ Dependency
✓ Inheritance vs composition
✓ Strong vs weak relationships
✓ Ownership
✓ Lifetime and object lifecycle
✓ Whole-part relationships
✓ One-to-one relationships
✓ One-to-many relationships
✓ Many-to-many relationships
✓ Unidirectional relationships
✓ Bidirectional relationships
✓ Navigation between objects
✓ Association through fields
✓ Association through methods
✓ Association through method parameters
✓ Dependency through local variables
✓ Dependency through method parameters
✓ Composition using constructors
✓ Aggregation using shared objects
✓ UML-style relationship diagrams
✓ Real-world modeling
✓ Coupling
✓ Cohesion
✓ Choosing the right relationship
✓ Common OOP design mistakes
✓ Practical Java programs
✓ Exercises
✓ Output questions
✓ Interview questions
✓ Mini projects
```

---

# 2. Why OOP Relationships Matter

Imagine building an e-commerce application.

You may have:

```text
Customer
Order
Product
Payment
Address
ShoppingCart
```

These objects are not independent.

For example:

```text
Customer places Order
Order contains Products
Customer has Address
Order uses Payment
ShoppingCart contains Products
```

If we model these relationships correctly, the program becomes easier to understand and maintain.

---

# 3. The Big Picture

Think about the following:

```text
Dog IS-A Animal

Car HAS-A Engine

Student USES-A Teacher

Department HAS-A Employee

House HAS-A Room
```

Different statements represent different kinds of relationships.

The first question when designing classes should often be:

> **What relationship exists between these objects or classes?**

---

# 4. Two Very Important Questions

When designing OOP classes, ask:

### Question 1

```text
Is one thing a type of another thing?
```

If yes, think:

```text
IS-A
```

Example:

```text
Dog IS-A Animal
```

This is usually represented with inheritance or interface implementation.

### Question 2

```text
Does one object contain, own, use, or work with another object?
```

If yes, think:

```text
HAS-A
Association
Aggregation
Composition
Dependency
```

---

# 5. IS-A Relationship

An IS-A relationship represents a type relationship.

Example:

```text
Dog IS-A Animal
Car IS-A Vehicle
Manager IS-A Employee
Circle IS-A Shape
```

In Java, class inheritance can represent IS-A.

```java
class Animal {
}

class Dog extends Animal {
}
```

Conceptually:

```text
Dog IS-A Animal
```

---

# 6. IS-A Through Interface

An interface can also create an IS-A type relationship.

Example:

```java
interface Flyable {

    void fly();
}

class Bird
        implements Flyable {

    @Override
    public void fly() {
        System.out.println(
            "Bird flies"
        );
    }
}
```

A Bird is a Flyable type.

```text
Bird IS-A Flyable
```

This is an important reason interfaces are useful.

---

# 7. IS-A Diagram

```text
        Animal
          ▲
          |
         Dog
```

Or:

```text
        Vehicle
           ▲
           |
          Car
```

The arrow represents inheritance/generalization in a UML-style diagram.

---

# 8. IS-A Example

```java
class Employee {
}

class Developer
        extends Employee {
}
```

We can write:

```java
Employee employee =
    new Developer();
```

This works because:

```text
Developer IS-A Employee
```

---

# 9. IS-A Should Be a True Type Relationship

Do not use inheritance just because one class "uses" another.

Bad example:

```java
class Car extends Engine {
}
```

A car is not an engine.

Instead:

```java
class Car {

    private Engine engine;
}
```

Now:

```text
Car HAS-A Engine
```

This is a better model.

---

# 10. HAS-A Relationship

HAS-A generally describes a relationship where one object contains or has a reference to another object.

Example:

```text
Car HAS-A Engine
Student HAS-A Address
Order HAS-A Customer
Computer HAS-A Processor
House HAS-A Room
```

Java often represents HAS-A with a field:

```java
class Car {

    private Engine engine;
}
```

---

# 11. Basic HAS-A Example

```java
class Engine {

    void start() {
        System.out.println(
            "Engine started"
        );
    }
}

class Car {

    private Engine engine;

    Car() {
        engine = new Engine();
    }
}
```

Car contains a reference to Engine.

Conceptually:

```text
Car
 |
 | has
 ↓
Engine
```

---

# 12. HAS-A Is Not One Single Relationship

The phrase HAS-A is a broad description.

It can include different relationships:

```text
Association
Aggregation
Composition
```

The difference is mainly about:

```text
ownership
lifetime
independence
strength of relationship
```

---

# 13. Association

Association is a general relationship between two classes.

It means:

```text
Objects know about or interact with each other.
```

It does not necessarily mean ownership.

Example:

```text
Teacher teaches Student
Doctor treats Patient
Customer contacts SupportAgent
Driver drives Car
```

The objects can exist independently.

---

# 14. Simple Association Example

```java
class Teacher {

    void teach() {
        System.out.println(
            "Teaching"
        );
    }
}

class Student {

    void learn() {
        System.out.println(
            "Learning"
        );
    }
}
```

Suppose:

```java
class School {

    void conductClass(
        Teacher teacher,
        Student student
    ) {
        teacher.teach();
        student.learn();
    }
}
```

Teacher and Student are associated through interaction.

---

# 15. Association Does Not Mean Ownership

Consider:

```text
Doctor ↔ Patient
```

A doctor does not own a patient.

A patient can exist without a particular doctor.

A doctor can exist without a particular patient.

Therefore:

```text
Association
```

is a natural model.

---

# 16. Association Through a Field

Association can also be represented with a field.

```java
class Driver {

    private Car car;

    Driver(Car car) {
        this.car = car;
    }

    void drive() {
        System.out.println(
            "Driver is driving"
        );
    }
}
```

Driver knows about Car.

But whether this is aggregation, simple association, or another domain-specific relationship depends on the ownership/lifecycle meaning.

---

# 17. Association Through a Method Parameter

A class does not need to permanently store a reference to be associated with another object.

Example:

```java
class Teacher {

    void teach(Student student) {
        System.out.println(
            "Teaching student"
        );
    }
}
```

Here Teacher interacts with Student.

The Student is supplied temporarily.

This is an association at the interaction level and also a form of dependency during the method call.

---

# 18. Association Can Be Temporary

Example:

```java
class Printer {

    void print(Document document) {

        System.out.println(
            "Printing document"
        );
    }
}
```

Printer works with Document.

The Printer does not necessarily own the Document.

The Document can exist before and after printing.

---

# 19. Association Diagram

A UML-style simple association can be shown as:

```text
Teacher ───────── Student
```

The line simply means:

```text
Teacher and Student are associated.
```

---

# 20. One-to-One Association

One object can be associated with one object.

Example:

```text
Person ─── Passport
```

Java:

```java
class Passport {

    private String number;

    Passport(String number) {
        this.number = number;
    }
}

class Person {

    private Passport passport;

    Person(Passport passport) {
        this.passport = passport;
    }
}
```

This can represent a one-to-one relationship.

---

# 21. One-to-Many Association

One object can be associated with many objects.

Example:

```text
Teacher
  |
  +---- Student
  +---- Student
  +---- Student
```

Java:

```java
class Teacher {

    private List<Student> students;
}
```

A teacher can have an association with many students.

---

# 22. Many-to-Many Association

Many objects can be associated with many other objects.

Example:

```text
Students ↔ Courses
```

One student can take multiple courses.

One course can contain multiple students.

Conceptually:

```text
Student 1 ─┬─ Course A
           └─ Course B

Student 2 ─┬─ Course A
           └─ Course C
```

Java can represent this using collections of references.

---

# 23. Aggregation

Aggregation is a whole-part relationship where the parts can exist independently of the whole.

Example:

```text
Department HAS-A Employees
```

Employees can exist independently of the Department object.

If a Department object is removed, the Employee objects do not necessarily have to be destroyed.

---

# 24. Aggregation Example

```java
class Employee {

    private String name;

    Employee(String name) {
        this.name = name;
    }

    void work() {
        System.out.println(
            name + " is working"
        );
    }
}

class Department {

    private List<Employee> employees;

    Department(List<Employee> employees) {
        this.employees = employees;
    }
}
```

Employees are supplied from outside.

The Department does not create them.

This is a good example of aggregation.

---

# 25. Aggregation Diagram

UML-style aggregation is often represented using an empty diamond:

```text
Department ◇──────── Employee
```

The empty diamond is on the "whole" side.

Meaning:

```text
Department contains/aggregates Employees
```

but Employees can exist independently.

---

# 26. Aggregation and Shared Objects

Suppose:

```java
Employee e1 =
    new Employee("A");

Employee e2 =
    new Employee("B");

List<Employee> employees =
    new ArrayList<>();

employees.add(e1);
employees.add(e2);

Department department =
    new Department(employees);
```

The Employee objects existed independently.

The Department receives references to them.

That is the key idea.

---

# 27. Aggregation Example — University

```text
University
   |
   +── Department
   |
   +── Department
```

Depending on the actual domain model, Departments may be treated as parts of a University.

But whether this is truly aggregation or composition depends on the business rules.

Do not decide relationships from the real-world noun alone.

Always examine:

```text
ownership
lifetime
independent existence
```

---

# 28. Composition

Composition is a stronger whole-part relationship.

The contained part is strongly owned by the whole.

Its lifecycle is generally tied to the owner in the model.

Example:

```text
House
  |
  +── Room
  +── Room
```

If the design says Rooms exist only as parts of a particular House, composition is a natural model.

---

# 29. Composition Diagram

UML-style composition is represented using a filled diamond:

```text
House ◆──────── Room
```

The filled diamond is on the owner/whole side.

Remember:

```text
◇ = aggregation
◆ = composition
```

---

# 30. Composition Example

```java
class Engine {

    void start() {
        System.out.println(
            "Engine started"
        );
    }
}

class Car {

    private final Engine engine;

    Car() {
        engine = new Engine();
    }

    void start() {
        engine.start();
    }
}
```

Car creates its Engine.

The Engine is strongly owned by this Car in this design.

---

# 31. Why Constructor Creation Can Suggest Composition

Compare:

```java
class Car {

    private final Engine engine;

    Car() {
        engine = new Engine();
    }
}
```

with:

```java
class Car {

    private final Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }
}
```

The first design suggests stronger ownership because Car creates the Engine.

The second design suggests that the Engine is supplied from outside.

However, **constructor creation alone does not mathematically prove composition**. The real domain lifecycle and ownership rules matter.

---

# 32. Aggregation vs Composition

The easiest comparison:

```text
Aggregation:
whole has parts
parts can exist independently

Composition:
whole strongly owns parts
part lifecycle is tied to whole in the model
```

Example:

```text
Aggregation:
Department ─ Employee

Composition:
House ─ Room
```

These are modeling concepts, not special Java keywords.

---

# 33. Important Point — Java Has No aggregation Keyword

There is no:

```java
aggregation
```

keyword in Java.

There is no:

```java
composition
```

keyword either.

They are OOP/design concepts represented using ordinary Java features:

```text
classes
objects
fields
constructors
methods
references
collections
```

---

# 34. Dependency

Dependency means one class temporarily relies on another class to perform some operation.

Example:

```java
class Printer {

    void print(Document document) {
        System.out.println(
            "Printing"
        );
    }
}
```

Printer depends on Document because its method needs a Document.

---

# 35. Dependency Through Method Parameter

This is a common dependency form:

```java
class OrderService {

    void process(
        Payment payment
    ) {
        payment.pay();
    }
}
```

OrderService depends on Payment.

But it may not permanently own Payment.

---

# 36. Dependency Through Local Variable

Example:

```java
class ReportService {

    void generate() {

        Formatter formatter =
            new Formatter();

        formatter.format();
    }
}
```

ReportService temporarily uses Formatter.

The dependency exists during the operation.

---

# 37. Dependency Diagram

A UML-style dependency is often shown with a dashed arrow:

```text
Printer - - - - > Document
```

Meaning:

```text
Printer depends on Document.
```

The exact UML notation is less important for beginner Java than understanding the relationship.

---

# 38. Association vs Dependency

A useful beginner distinction:

```text
Association
→ objects have a more lasting relationship/knowledge

Dependency
→ one class temporarily uses another
```

Example association:

```java
class Student {

    private Address address;
}
```

Student stores an Address reference.

Example dependency:

```java
class Printer {

    void print(Document document) {
    }
}
```

Printer uses Document for an operation without necessarily storing it.

---

# 39. Association vs Aggregation vs Composition vs Dependency

| Relationship | Main idea | Independent lifetime? | Typical Java representation |
|---|---|---:|---|
| Association | Objects know/interact with each other | Usually yes | Reference/parameter |
| Aggregation | Whole has parts, parts remain independent | Yes | External objects stored in fields |
| Composition | Strong whole-part ownership | Generally no, in the model | Owner creates/controls parts |
| Dependency | Temporary use | Yes | Parameter/local variable |

---

# 40. HAS-A vs IS-A

This is one of the most important OOP questions.

```text
IS-A
→ inheritance/interface relationship

HAS-A
→ object relationship/composition/aggregation/association
```

Example:

```text
Dog IS-A Animal

Car HAS-A Engine
```

---

# 41. Inheritance vs Composition

Suppose:

```text
Car
Engine
```

Wrong:

```java
class Car extends Engine {
}
```

because:

```text
Car is not an Engine.
```

Better:

```java
class Car {

    private Engine engine;
}
```

because:

```text
Car has an Engine.
```

This is the basic idea behind:

> **Favor composition over inheritance when inheritance does not represent a true type relationship.**

---

# 42. Why Composition Is Powerful

Composition allows behavior to be built from objects.

Example:

```java
class Car {

    private Engine engine;
    private BrakeSystem brakes;
    private Transmission transmission;
}
```

Car is composed of collaborating objects.

Instead of creating one huge inheritance hierarchy, we can combine smaller components.

---

# 43. Composition and Flexibility

Suppose:

```java
interface Engine {

    void start();
}
```

Implementations:

```text
PetrolEngine
ElectricEngine
HybridEngine
```

Then:

```java
class Car {

    private final Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }
}
```

Now the Car can work with different engine implementations.

This combines:

```text
composition
+
interface
+
polymorphism
```

---

# 44. Composition Example with Interface

```java
interface Engine {

    void start();
}

class PetrolEngine
        implements Engine {

    @Override
    public void start() {
        System.out.println(
            "Petrol engine started"
        );
    }
}

class ElectricEngine
        implements Engine {

    @Override
    public void start() {
        System.out.println(
            "Electric motor started"
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
```

Usage:

```java
Car petrolCar =
    new Car(
        new PetrolEngine()
    );

Car electricCar =
    new Car(
        new ElectricEngine()
    );

petrolCar.start();
electricCar.start();
```

---

# 45. Composition vs Inheritance — Mental Model

Inheritance:

```text
Dog
 ↓
Animal
```

Think:

```text
Dog IS-A Animal
```

Composition:

```text
Car
 |
 +── Engine
```

Think:

```text
Car HAS-A Engine
```

A simple rule:

> **Use inheritance for a genuine type relationship. Use composition when an object is built using other objects.**

---

# 46. Relationship Direction

Relationships can have direction.

Example:

```java
class Student {

    private Teacher teacher;
}
```

Student knows Teacher.

But Teacher might not store Student.

This is a unidirectional relationship:

```text
Student ─────> Teacher
```

---

# 47. Bidirectional Relationship

Both objects can know about each other.

```java
class Student {

    private Teacher teacher;
}

class Teacher {

    private List<Student> students;
}
```

Now:

```text
Student ─────> Teacher
   ▲             |
   |             ▼
   └──────── Student
```

Conceptually, both sides can navigate to the other.

---

# 48. Why Bidirectional Relationships Need Care

Bidirectional relationships can create:

```text
more coupling
more code
synchronization problems
recursive toString()
serialization issues
complex updates
```

Example:

```java
student.setTeacher(teacher);
teacher.addStudent(student);
```

If only one side is updated, the model can become inconsistent.

---

# 49. Keeping Both Sides Consistent

Suppose:

```java
class Student {

    private Teacher teacher;
}

class Teacher {

    private List<Student> students;
}
```

If Student changes teacher, Teacher's list should also be updated if the application treats both sides as authoritative.

A helper method can coordinate this.

Designing relationships is therefore more than adding fields.

---

# 50. One-to-One, One-to-Many, Many-to-Many

Common cardinalities:

```text
1 : 1
1 : N
N : 1
N : N
```

Examples:

```text
Person ↔ Passport
Teacher ↔ Students
Department ↔ Manager
Students ↔ Courses
```

Collections commonly represent the "many" side.

---

# 51. One-to-One Java Example

```java
class Engine {

    private String serialNumber;

    Engine(String serialNumber) {
        this.serialNumber =
            serialNumber;
    }
}

class Car {

    private final Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }
}
```

One Car has one Engine in this model.

---

# 52. One-to-Many Java Example

```java
class Student {

    private final String name;

    Student(String name) {
        this.name = name;
    }
}

class Classroom {

    private final List<Student> students;

    Classroom(List<Student> students) {
        this.students = students;
    }
}
```

One Classroom can contain many Student references.

---

# 53. Many-to-Many Java Example

```java
class Student {

    private final List<Course> courses =
        new ArrayList<>();
}

class Course {

    private final List<Student> students =
        new ArrayList<>();
}
```

Both sides can contain multiple references.

In larger systems, many-to-many relationships are often modeled using an intermediate object such as:

```text
Enrollment
```

because the relationship itself may have data:

```text
date
grade
status
semester
```

---

# 54. Relationship Object

Suppose:

```text
Student
Course
```

A simple many-to-many link may be insufficient.

Instead:

```text
Student
   |
   ↓
Enrollment
   |
   ↓
Course
```

Enrollment can contain:

```text
student
course
semester
grade
enrollmentDate
```

This is an important real-world modeling technique.

---

# 55. Dependency Injection and Relationships

Suppose:

```java
interface Payment {

    void pay(double amount);
}
```

and:

```java
class OrderService {

    private final Payment payment;

    OrderService(Payment payment) {
        this.payment = payment;
    }
}
```

The OrderService has a Payment dependency.

This can be described as:

```text
OrderService
      |
      | depends on
      ↓
    Payment
```

Because Payment is an interface, the dependency is flexible.

---

# 56. Constructor Injection

Providing a dependency through a constructor is called constructor injection.

Example:

```java
class OrderService {

    private final Payment payment;

    OrderService(Payment payment) {
        this.payment = payment;
    }
}
```

This has useful properties:

```text
dependency is explicit
dependency can be final
object can be created in a valid state
testing is easier
implementation can be replaced
```

---

# 57. Method Injection

A dependency can also be supplied through a method parameter.

```java
class ReportService {

    void export(
        Exporter exporter,
        String data
    ) {
        exporter.export(data);
    }
}
```

The dependency exists for that operation.

---

# 58. Field Injection — Conceptual Idea

A dependency may also be stored in a field and assigned after construction.

For example:

```java
class Service {

    private Logger logger;

    void setLogger(Logger logger) {
        this.logger = logger;
    }
}
```

This can work, but constructor injection is often easier to reason about when the dependency is required for a valid object.

Frameworks can provide other injection mechanisms.

---

# 59. Coupling

Coupling means how strongly components depend on each other.

High coupling:

```java
class OrderService {

    private final StripePayment payment =
        new StripePayment();
}
```

The class directly creates and depends on a specific implementation.

Lower coupling:

```java
class OrderService {

    private final Payment payment;

    OrderService(Payment payment) {
        this.payment = payment;
    }
}
```

The service depends on the Payment abstraction.

---

# 60. Why High Coupling Can Be a Problem

High coupling can make:

```text
testing harder
changes harder
replacement harder
maintenance harder
reuse harder
```

For example, if OrderService directly creates a specific payment implementation, replacing it may require modifying OrderService.

---

# 61. Low Coupling Does Not Mean Zero Coupling

Objects must communicate.

A useful design does not try to eliminate every relationship.

Instead, we want:

```text
necessary relationships
+
clear contracts
+
manageable dependencies
```

The goal is not:

```text
no coupling
```

The goal is:

```text
appropriate coupling
```

---

# 62. Cohesion

Cohesion describes how closely related the responsibilities inside one class are.

High cohesion:

```text
PaymentProcessor
→ payment processing responsibilities
```

Low cohesion:

```text
Utility
→ payment
→ email
→ database
→ file
→ user interface
→ random calculations
```

High cohesion usually makes classes easier to understand.

---

# 63. Coupling vs Cohesion

Remember:

```text
Coupling
→ relationship between components

Cohesion
→ relatedness of responsibilities inside a component
```

Good design often aims for:

```text
LOWER unnecessary coupling
HIGHER cohesion
```

---

# 64. Relationship and Encapsulation

Suppose:

```java
class Car {

    private Engine engine;
}
```

The field is private.

Other classes cannot directly manipulate the internal representation unless the Car exposes it.

This allows Car to control how its Engine is used.

Relationships should be encapsulated rather than exposing everything publicly.

---

# 65. Do Not Expose Mutable Collections Carelessly

Suppose:

```java
class Department {

    private final List<Employee> employees;

    List<Employee> getEmployees() {
        return employees;
    }
}
```

Now external code can modify the internal collection.

A safer design might return:

```java
Collections.unmodifiableList(employees)
```

or an immutable copy, depending on requirements.

This connects encapsulation with object relationships.

---

# 66. Ownership and References

Java variables hold references to objects.

Example:

```java
Engine engine =
    new Engine();

Car car =
    new Car(engine);
```

Now both:

```text
engine
car.engine
```

can refer to the same Engine object.

This matters when discussing aggregation.

---

# 67. Shared Object Example

```java
Engine engine =
    new Engine();

Car car1 =
    new Car(engine);

Car car2 =
    new Car(engine);
```

Both cars may reference the same Engine object.

Whether this makes sense depends on the domain.

The code permits sharing; the design must decide whether sharing is valid.

---

# 68. Aggregation Through Sharing

A common aggregation pattern is:

```java
Employee employee =
    new Employee("A");

Department d1 =
    new Department(
        List.of(employee)
    );

Department d2 =
    new Department(
        List.of(employee)
    );
```

Now the same Employee object is referenced by multiple containers.

Again, the real domain rules determine whether such sharing is valid.

---

# 69. Composition and Controlled Creation

Composition often gives the owner stronger control.

Example:

```java
class House {

    private final Room kitchen;

    House() {
        kitchen =
            new Room("Kitchen");
    }
}
```

The House creates its Room.

The model can treat that Room as a part of the House.

---

# 70. Composition and Nested Objects

A composed object can contain many internal objects.

```java
class Computer {

    private final CPU cpu;
    private final RAM ram;
    private final Storage storage;

    Computer() {
        cpu = new CPU();
        ram = new RAM();
        storage = new Storage();
    }
}
```

Conceptually:

```text
Computer
 ├── CPU
 ├── RAM
 └── Storage
```

This is a common composition-style design.

---

# 71. Composition Does Not Require new

Do not memorize:

```text
Composition = always use new inside constructor
```

That is too simplistic.

Composition is about:

```text
strong ownership
part-whole meaning
lifecycle relationship
```

A part could be created elsewhere and still be treated as owned by the whole depending on the domain design.

The creation strategy is only one clue.

---

# 72. Aggregation Does Not Require a List

Aggregation does not necessarily mean:

```java
List<Employee>
```

It can be:

```java
Employee manager;
```

or:

```java
Address address;
```

The important idea is independent existence of the related object.

---

# 73. Association Does Not Require a Field

Association can occur through:

```java
method parameter
local interaction
stored reference
return value
```

The important idea is that objects are related or communicate.

---

# 74. Dependency Does Not Mean Weak Code

A dependency is not automatically bad.

For example:

```java
class CalculatorService {

    void calculate(
        MathEngine engine
    ) {
        engine.calculate();
    }
}
```

The service naturally needs MathEngine.

The important design question is:

```text
Is the dependency appropriate?
Is it too specific?
Is it easy to replace?
```

---

# 75. Real-World Example — E-Commerce

Consider:

```text
Customer
Order
Product
Payment
Address
ShoppingCart
```

Possible relationships:

```text
Customer
   |
   +── HAS-A Address

Customer
   |
   +── places
         ↓
       Order

Order
   |
   +── contains
         ↓
       Product

Order
   |
   +── uses
         ↓
      Payment
```

Different relationships can exist in the same application.

---

# 76. E-Commerce Java Model

```java
class Address {

    private final String city;

    Address(String city) {
        this.city = city;
    }
}

class Customer {

    private final Address address;

    Customer(Address address) {
        this.address = address;
    }
}

interface Payment {

    void pay(double amount);
}

class Order {

    private final Payment payment;

    Order(Payment payment) {
        this.payment = payment;
    }

    void checkout(double amount) {
        payment.pay(amount);
    }
}
```

This uses:

```text
association/composition-style references
+
interface dependency
+
polymorphism
```

---

# 77. Real-World Example — School

Classes:

```text
School
Teacher
Student
Course
Classroom
```

Possible relationships:

```text
Teacher ↔ Student
Teacher → Course
Classroom → Students
Student ↔ Course
```

Do not immediately label every relationship as composition.

Ask:

```text
Who owns whom?
Can the objects exist independently?
Who controls lifecycle?
```

---

# 78. Real-World Example — Company

Possible model:

```text
Company
 ├── Department
 │     ├── Employee
 │     └── Employee
 └── Department
```

But whether Company "owns" Department and Department "owns" Employee depends on the application's business rules.

For example:

```text
Employee can move between departments.
```

That may suggest that Employee should not be modeled as a permanently owned component of one Department.

---

# 79. Real-World Example — Library

Possible classes:

```text
Library
Book
Member
Librarian
Loan
```

Potential relationships:

```text
Library HAS-A books
Member HAS-A loans
Loan refers to Book
Librarian manages Library
```

Notice:

```text
Loan
```

can be a relationship object.

It can store:

```text
book
member
issueDate
returnDate
fine
```

This is often better than forcing everything directly into Book or Member.

---

# 80. Real-World Example — Ride Sharing

Classes:

```text
Driver
Passenger
Vehicle
Trip
Payment
```

Possible relationships:

```text
Driver HAS-A Vehicle
Trip associates Driver and Passenger
Trip uses Payment
```

A Trip can be a useful relationship object because it stores:

```text
driver
passenger
startLocation
destination
fare
time
status
```

---

# 81. Real-World Example — Food Delivery

Classes:

```text
Customer
Restaurant
Order
FoodItem
DeliveryPartner
Payment
Address
```

Possible model:

```text
Customer → Order
Order → FoodItem
Order → Payment
Order → Address
Order → DeliveryPartner
Restaurant → FoodItem
```

Again, different relationships can coexist.

---

# 82. Relationship Selection Process

When you design two classes, follow this process:

```text
Step 1
Ask: Is A a type of B?
        ↓
YES → IS-A

Step 2
If not, ask: Does A contain/have B?
        ↓
YES → HAS-A / whole-part relationship

Step 3
Ask: Can B exist independently?
        ↓
YES → aggregation/association may fit

Step 4
Ask: Is B strongly owned by A?
        ↓
YES → composition may fit

Step 5
Ask: Does A only temporarily use B?
        ↓
YES → dependency may fit
```

This is a useful design workflow.

---

# 83. Do Not Force a Relationship

Not every pair of classes needs a permanent relationship.

Example:

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }
}
```

There may be no reason for Calculator to permanently store another object.

Avoid creating unnecessary fields simply to say:

```text
"These classes are related."
```

Relationships should represent real requirements.

---

# 84. Inheritance vs Association

Suppose:

```text
Teacher
Student
```

Do not write:

```java
class Teacher extends Student {
}
```

because:

```text
Teacher IS NOT Student
```

Instead:

```java
class Teacher {

    void teach(Student student) {
    }
}
```

This models interaction.

---

# 85. Inheritance vs Composition

Suppose:

```text
Car
Engine
```

Do not write:

```java
class Car extends Engine {
}
```

because:

```text
Car IS NOT Engine
```

Use:

```java
class Car {

    private Engine engine;
}
```

because:

```text
Car HAS-A Engine
```

---

# 86. Association vs Composition

Consider:

```text
Teacher ↔ Student
```

A Teacher does not normally own a Student's existence.

Association is natural.

Now:

```text
House → Room
```

If the model says Rooms belong exclusively to their House and their lifecycle is tied to it, composition is stronger.

---

# 87. Aggregation vs Composition — Real Meaning

The distinction is not simply:

```text
aggregation = weak
composition = strong
```

A better understanding is:

```text
Aggregation
→ whole-part relationship
→ part has independent identity/lifetime

Composition
→ whole-part relationship
→ whole controls the part more strongly
→ part lifecycle is tied to whole in the model
```

---

# 88. Composition and Identity

Suppose:

```text
House → Room
```

A Room may have identity within the House.

But if the domain says:

```text
Room cannot exist independently from House
```

then composition is appropriate.

The relationship is about the domain model, not just Java syntax.

---

# 89. Aggregation and Identity

Suppose:

```text
Department → Employee
```

Employee has an independent identity:

```text
employeeId
```

The Employee may move between departments.

Therefore the Employee is not necessarily a permanent component of one Department.

Aggregation or ordinary association may be more appropriate depending on the model.

---

# 90. Dependency and Method Scope

Example:

```java
class ReportService {

    void generate() {

        Formatter formatter =
            new Formatter();

        formatter.format();
    }
}
```

The Formatter reference exists only inside the method.

This is a temporary dependency.

It is not necessarily a long-term object relationship.

---

# 91. Relationship Through Return Value

A method can also establish interaction through a returned object.

```java
class Factory {

    Payment createPayment() {
        return new CardPayment();
    }
}
```

Factory depends on the Payment abstraction and produces an implementation.

The returned object then becomes part of another object's interactions.

---

# 92. Relationship Through Static Methods

A class may use another class through a static utility:

```java
class OrderService {

    double calculateTax(
        double amount
    ) {
        return TaxCalculator.calculate(
            amount
        );
    }
}
```

This is a dependency on TaxCalculator.

It is not necessarily a HAS-A relationship.

---

# 93. Relationship Through Inheritance

Inheritance itself establishes a relationship:

```text
Child IS-A Parent
```

Example:

```java
class Animal {
}

class Dog extends Animal {
}
```

This is different from object composition.

---

# 94. Relationship Through Interface

Interface implementation also establishes a type relationship:

```java
class CardPayment
        implements Payment {
}
```

Conceptually:

```text
CardPayment IS-A Payment
```

in the Java type-system sense.

---

# 95. Relationship Through Composition + Interface

This is a powerful combination:

```java
class OrderService {

    private final Payment payment;

    OrderService(Payment payment) {
        this.payment = payment;
    }
}
```

Now:

```text
OrderService HAS-A Payment reference
```

and:

```text
Payment
   ↑
CardPayment
```

So the design uses:

```text
composition/association
+
interface
+
polymorphism
```

---

# 96. Strategy Pattern Connection

The following:

```java
class ShoppingCart {

    private final DiscountStrategy strategy;

    ShoppingCart(
        DiscountStrategy strategy
    ) {
        this.strategy = strategy;
    }
}
```

is a classic Strategy-pattern structure.

The Cart is composed with a strategy abstraction.

Different implementations can be supplied:

```text
StudentDiscount
FestivalDiscount
PremiumDiscount
NoDiscount
```

This is an excellent example of composition being more flexible than a large inheritance tree.

---

# 97. Composition Over Inheritance

This principle means:

> When behavior can naturally be assembled from collaborating objects, composition is often more flexible than creating deep inheritance hierarchies.

Example inheritance-heavy design:

```text
Payment
 ├── CardPayment
 ├── UpiPayment
 ├── DiscountedCardPayment
 ├── PremiumCardPayment
 ├── FestivalCardPayment
 └── ...
```

This can grow rapidly.

Composition can separate behaviors:

```text
Payment
+
DiscountStrategy
+
Logger
+
FraudChecker
```

Each responsibility can evolve separately.

---

# 98. Deep Inheritance Problem

Suppose:

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

A deep hierarchy can become difficult to understand.

Changes in parent classes can affect many children.

Composition can sometimes avoid this complexity.

---

# 99. Composition Example — Car Features

Instead of:

```text
Car
SportsCar
ElectricSportsCar
LuxuryElectricSportsCar
```

you could use components:

```text
Car
 ├── Engine
 ├── Suspension
 ├── AudioSystem
 └── NavigationSystem
```

The exact design depends on requirements, but composition gives many independent variation points.

---

# 100. Relationship and SOLID

Relationships connect strongly with SOLID principles.

For example:

```text
Single Responsibility
→ keep responsibilities focused

Open/Closed
→ extend behavior without excessive modification

Liskov Substitution
→ valid IS-A relationships

Interface Segregation
→ focused contracts

Dependency Inversion
→ depend on abstractions
```

Chapter 23 will explore OOP design and SOLID more deeply.

---

# 101. Practical Program — Association

```java
class Teacher {

    private final String name;

    Teacher(String name) {
        this.name = name;
    }

    void teach() {
        System.out.println(
            name + " is teaching"
        );
    }
}

class Student {

    private final String name;

    Student(String name) {
        this.name = name;
    }

    void learn() {
        System.out.println(
            name + " is learning"
        );
    }
}

class Classroom {

    void conductClass(
        Teacher teacher,
        Student student
    ) {
        teacher.teach();
        student.learn();
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        Teacher teacher =
            new Teacher("Ravi");

        Student student =
            new Student("Aman");

        Classroom classroom =
            new Classroom();

        classroom.conductClass(
            teacher,
            student
        );
    }
}
```

Output:

```text
Ravi is teaching
Aman is learning
```

Teacher and Student are associated through the interaction.

---

# 102. Practical Program — Aggregation

```java
import java.util.List;

class Employee {

    private final String name;

    Employee(String name) {
        this.name = name;
    }

    void work() {
        System.out.println(
            name + " is working"
        );
    }
}

class Department {

    private final List<Employee> employees;

    Department(
        List<Employee> employees
    ) {
        this.employees = employees;
    }

    void workAll() {

        for (Employee employee :
             employees) {

            employee.work();
        }
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        Employee e1 =
            new Employee("Aman");

        Employee e2 =
            new Employee("Riya");

        Department department =
            new Department(
                List.of(e1, e2)
            );

        department.workAll();
    }
}
```

The Employee objects were created outside the Department.

---

# 103. Practical Program — Composition

```java
class Engine {

    void start() {
        System.out.println(
            "Engine started"
        );
    }
}

class Car {

    private final Engine engine;

    Car() {
        engine = new Engine();
    }

    void start() {
        engine.start();

        System.out.println(
            "Car started"
        );
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        Car car =
            new Car();

        car.start();
    }
}
```

Output:

```text
Engine started
Car started
```

Car creates and strongly controls its Engine in this design.

---

# 104. Practical Program — Dependency

```java
class Document {

    private final String name;

    Document(String name) {
        this.name = name;
    }
}

class Printer {

    void print(
        Document document
    ) {
        System.out.println(
            "Printing document"
        );
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        Document document =
            new Document("Java");

        Printer printer =
            new Printer();

        printer.print(document);
    }
}
```

Printer temporarily uses Document.

---

# 105. Practical Program — Composition with Interface

```java
interface Engine {

    void start();
}

class PetrolEngine
        implements Engine {

    @Override
    public void start() {
        System.out.println(
            "Petrol engine"
        );
    }
}

class ElectricEngine
        implements Engine {

    @Override
    public void start() {
        System.out.println(
            "Electric engine"
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

public class Main {

    public static void main(
        String[] args
    ) {

        Car car1 =
            new Car(
                new PetrolEngine()
            );

        Car car2 =
            new Car(
                new ElectricEngine()
            );

        car1.start();
        car2.start();
    }
}
```

Output:

```text
Petrol engine
Electric engine
```

This is a strong example of:

```text
composition
+
interface
+
polymorphism
```

---

# 106. Practical Program — Strategy Composition

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

class ShoppingCart {

    private final DiscountStrategy strategy;

    ShoppingCart(
        DiscountStrategy strategy
    ) {
        this.strategy = strategy;
    }

    double finalPrice(
        double amount
    ) {
        return amount -
               strategy.discount(amount);
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        ShoppingCart cart =
            new ShoppingCart(
                new FestivalDiscount()
            );

        System.out.println(
            cart.finalPrice(1000)
        );
    }
}
```

Output:

```text
800.0
```

---

# 107. Practical Program — One-to-Many

```java
import java.util.ArrayList;
import java.util.List;

class Student {

    private final String name;

    Student(String name) {
        this.name = name;
    }

    void show() {
        System.out.println(
            name
        );
    }
}

class Classroom {

    private final List<Student> students =
        new ArrayList<>();

    void addStudent(
        Student student
    ) {
        students.add(student);
    }

    void showStudents() {

        for (Student student :
             students) {

            student.show();
        }
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        Classroom classroom =
            new Classroom();

        classroom.addStudent(
            new Student("Aman")
        );

        classroom.addStudent(
            new Student("Riya")
        );

        classroom.showStudents();
    }
}
```

Output:

```text
Aman
Riya
```

---

# 108. Practical Program — Relationship Object

```java
class Student {

    private final String name;

    Student(String name) {
        this.name = name;
    }
}

class Course {

    private final String name;

    Course(String name) {
        this.name = name;
    }
}

class Enrollment {

    private final Student student;
    private final Course course;
    private final String semester;

    Enrollment(
        Student student,
        Course course,
        String semester
    ) {
        this.student = student;
        this.course = course;
        this.semester = semester;
    }
}
```

Enrollment represents the relationship:

```text
Student ↔ Course
```

and also stores relationship-specific information.

---

# 109. Practical Program — Dependency Injection

```java
interface Logger {

    void log(String message);
}

class ConsoleLogger
        implements Logger {

    @Override
    public void log(String message) {
        System.out.println(
            message
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

public class Main {

    public static void main(
        String[] args
    ) {

        Application app =
            new Application(
                new ConsoleLogger()
            );

        app.run();
    }
}
```

The Application depends on the Logger abstraction.

---

# 110. Practical Program — Association Through Parameter

```java
class Doctor {

    void treat(Patient patient) {
        System.out.println(
            "Treating patient"
        );
    }
}

class Patient {

    void recover() {
        System.out.println(
            "Patient recovering"
        );
    }
}

public class Main {

    public static void main(
        String[] args
    ) {

        Doctor doctor =
            new Doctor();

        Patient patient =
            new Patient();

        doctor.treat(patient);
    }
}
```

Doctor and Patient interact, but neither needs to own the other's lifecycle.

---

# 111. Output Question 1 — IS-A

```java
class Animal {
}

class Dog extends Animal {
}

Animal animal =
    new Dog();

System.out.println(
    animal instanceof Animal
);
```

Output:

```text
true
```

Dog IS-A Animal.

---

# 112. Output Question 2 — HAS-A

```java
class Engine {

    void start() {
        System.out.println("Engine");
    }
}

class Car {

    private final Engine engine =
        new Engine();

    void start() {
        engine.start();
    }
}

Car car = new Car();

car.start();
```

Output:

```text
Engine
```

Car HAS-A Engine.

---

# 113. Output Question 3 — Composition

```java
class Engine {

    void start() {
        System.out.println("Start");
    }
}

class Car {

    private final Engine engine =
        new Engine();

    void start() {
        engine.start();
        System.out.println("Car");
    }
}

new Car().start();
```

Output:

```text
Start
Car
```

---

# 114. Output Question 4 — Association

```java
class Teacher {

    void teach() {
        System.out.println("Teach");
    }
}

class Student {
}

class School {

    void run(
        Teacher teacher,
        Student student
    ) {
        teacher.teach();
        System.out.println(
            "Student attends"
        );
    }
}

School school =
    new School();

school.run(
    new Teacher(),
    new Student()
);
```

Output:

```text
Teach
Student attends
```

The objects interact through a method call.

---

# 115. Output Question 5 — Shared Object

```java
class Engine {
}

Engine engine =
    new Engine();

Car car1 =
    new Car(engine);

Car car2 =
    new Car(engine);
```

If Car stores the supplied Engine reference, both cars refer to the same Engine object.

The code creates:

```text
1 Engine object
2 Car objects
```

---

# 116. Output Question 6 — Interface Composition

```java
interface Engine {

    void start();
}

class ElectricEngine
        implements Engine {

    public void start() {
        System.out.println(
            "Electric"
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

Car car =
    new Car(
        new ElectricEngine()
    );

car.start();
```

Output:

```text
Electric
```

---

# 117. Output Question 7 — Strategy

```java
interface Discount {

    double apply(double amount);
}

class TenPercent
        implements Discount {

    public double apply(
        double amount
    ) {
        return amount * 0.10;
    }
}

class Cart {

    private final Discount discount;

    Cart(Discount discount) {
        this.discount = discount;
    }

    double price(double amount) {
        return amount -
               discount.apply(amount);
    }
}

System.out.println(
    new Cart(
        new TenPercent()
    ).price(1000)
);
```

Output:

```text
900.0
```

---

# 118. Output Question 8 — One-to-Many

```java
List<Student> students =
    new ArrayList<>();

students.add(
    new Student()
);

students.add(
    new Student()
);
```

The list contains two Student references.

Conceptually:

```text
Classroom
   |
   +── Student
   +── Student
```

---

# 119. Interview Questions — Basics

## Q1. What is an IS-A relationship?

It represents a type relationship where one type is a subtype of another.

Example:

```text
Dog IS-A Animal
```

Usually represented through class inheritance or interface implementation.

## Q2. What is a HAS-A relationship?

It generally means an object contains, owns, or works with another object.

Example:

```text
Car HAS-A Engine
```

## Q3. What is association?

Association is a general relationship where objects know about or interact with each other.

## Q4. What is aggregation?

Aggregation is a whole-part relationship where the parts can independently exist.

## Q5. What is composition?

Composition is a stronger whole-part relationship where the whole strongly owns the parts and their lifecycle is tied in the model.


---

# 120. Interview Questions — Association, Aggregation, Composition

## Q6. What is the difference between aggregation and composition?

Aggregation:

```text
part can exist independently
```

Composition:

```text
part is strongly owned by whole
part lifecycle is tied to whole in the model
```

## Q7. Does Java have an aggregation keyword?

No.

## Q8. Does Java have a composition keyword?

No.

They are OOP design concepts implemented with ordinary Java constructs.

## Q9. How can aggregation be represented in Java?

Usually through references to externally created objects.

Example:

```java
Department(List<Employee> employees)
```

## Q10. How can composition be represented?

Often by having an object strongly own/create its internal components.

Example:

```java
class Car {

    private final Engine engine =
        new Engine();
}
```

But creation with `new` alone does not prove composition; domain ownership and lifecycle matter.


---

# 121. Interview Questions — Dependency

## Q11. What is dependency?

Dependency means one class temporarily relies on another class to perform some operation.

Example:

```java
void print(Document document)
```

## Q12. How can dependency be represented?

Common forms include:

```text
method parameters
local variables
method return types
static calls
temporary object usage
```

## Q13. Is dependency always bad?

No.

Classes naturally depend on other components. The goal is appropriate and manageable dependencies.

## Q14. What is dependency injection?

Providing a dependency from outside rather than having the dependent class create it internally.

Example:

```java
OrderService(Payment payment)
```

## Q15. Why is dependency injection useful?

It can improve:

```text
testability
flexibility
replaceability
loose coupling
```


---

# 122. Interview Questions — Inheritance vs Composition

## Q16. What is the difference between IS-A and HAS-A?

```text
IS-A
→ type relationship

HAS-A
→ object/containment relationship
```

## Q17. Should Car extend Engine?

No.

A Car is not an Engine.

Better:

```java
class Car {

    private Engine engine;
}
```

## Q18. What does "favor composition over inheritance" mean?

When behavior can naturally be assembled from collaborating objects, composition is often more flexible than creating inheritance solely for code reuse.

## Q19. Is inheritance always bad?

No.

Inheritance is appropriate when a genuine subtype relationship exists and substitutability makes sense.

## Q20. Is composition always better?

No.

Choose based on the domain and design requirements.



---

# 123. Interview Questions — Coupling and Cohesion

## Q21. What is coupling?

Coupling describes how strongly components depend on each other.

## Q22. What is cohesion?

Cohesion describes how closely related the responsibilities inside a component are.

## Q23. What is generally desirable?

Usually:

```text
high cohesion
+
low unnecessary coupling
```

## Q24. Does low coupling mean no relationships?

No.

Useful software requires relationships. The goal is to avoid unnecessary or overly rigid dependencies.



---

# 124. Interview Questions — Relationships and Design

## Q25. Can two objects be associated without one owning the other?

Yes.

Example:

```text
Doctor ↔ Patient
Teacher ↔ Student
```

## Q26. Can an association be temporary?

Yes.

Objects can interact through a method parameter or operation.

## Q27. What is a unidirectional relationship?

Only one side knows about or navigates to the other.

Example:

```java
class Student {

    private Teacher teacher;
}
```

## Q28. What is a bidirectional relationship?

Both sides maintain references to each other.

Example:

```text
Student → Teacher
Teacher → Students
```

## Q29. What is a relationship object?

An object representing the relationship itself.

Example:

```text
Student
   ↓
Enrollment
   ↓
Course
```

Enrollment can contain relationship-specific data.


---

# 125. Interview Questions — Cardinality

## Q30. What is one-to-one?

One object relates to one other object.

Example:

```text
Person ↔ Passport
```

## Q31. What is one-to-many?

One object relates to many objects.

Example:

```text
Teacher → Students
```

## Q32. What is many-to-many?

Many objects relate to many objects.

Example:

```text
Students ↔ Courses
```

## Q33. How is "many" usually represented in Java?

Often with a collection:

```java
List<Student>
Set<Student>
Map<...>
```

The correct collection depends on the domain requirements.


---

# 126. Exercise 1 — Identify IS-A

For each relationship, decide whether IS-A is appropriate:

```text
Dog — Animal
Car — Engine
Developer — Employee
Circle — Shape
Teacher — Student
```

Expected:

```text
Dog — Animal       → IS-A
Car — Engine       → No
Developer — Employee → IS-A
Circle — Shape     → IS-A
Teacher — Student  → No
```

Then decide what relationship fits the "No" cases.


---

# 127. Exercise 2 — Identify HAS-A

Identify the likely HAS-A relationships:

```text
Car — Engine
Computer — CPU
Student — Address
House — Room
Dog — Animal
```

Expected:

```text
Car HAS-A Engine
Computer HAS-A CPU
Student HAS-A Address
House HAS-A Room
Dog IS-A Animal
```


---

# 128. Exercise 3 — Association

Create:

```text
Doctor
Patient
Hospital
```

Make Doctor interact with Patient.

Do not make Doctor extend Patient.

Model the relationship using a method parameter.


---

# 129. Exercise 4 — Aggregation

Create:

```text
Department
Employee
```

Create Employees outside the Department.

Pass them into Department.

Then demonstrate that Employee objects can still be used independently.


---

# 130. Exercise 5 — Composition

Create:

```text
House
Room
```

Make House create and manage its Rooms.

Add methods:

```text
addRoom()
showRooms()
```

Think carefully about who controls the Rooms' lifecycle.


---

# 131. Exercise 6 — Dependency

Create:

```text
Printer
Document
```

Printer should contain:

```java
void print(Document document)
```

Do not permanently store Document unless the requirements need that relationship.


---

# 132. Exercise 7 — One-to-Many

Create:

```text
Teacher
Student
Classroom
```

A Classroom should contain multiple Student references.

Add:

```java
addStudent()
removeStudent()
showStudents()
```


---

# 133. Exercise 8 — Many-to-Many

Create:

```text
Student
Course
```

Allow a student to enroll in multiple courses.

Allow a course to contain multiple students.

Then think about whether an `Enrollment` class would make the design better.


---

# 134. Exercise 9 — Relationship Object

Create:

```text
Student
Course
Enrollment
```

Enrollment should contain:

```text
student
course
semester
grade
```

Explain why putting semester and grade directly into Student or Course would be less appropriate.


---

# 135. Exercise 10 — Composition with Interface

Create:

```text
Engine
PetrolEngine
ElectricEngine
Car
```

Engine should be an interface.

Car should receive Engine through its constructor.

Run Car with both implementations.


---

# 136. Exercise 11 — Strategy

Create:

```text
PaymentStrategy
CardPayment
UpiPayment
WalletPayment
Checkout
```

Checkout should depend on PaymentStrategy.

Use composition and polymorphism.


---

# 137. Exercise 12 — Dependency Injection

Create:

```text
Logger
ConsoleLogger
FileLogger
Application
```

Inject Logger into Application.

Run the application with different logger implementations.


---

# 138. Exercise 13 — Coupling

Create two versions of:

```text
OrderService
```

Version A should directly create a concrete payment class.

Version B should receive a Payment interface.

Compare the coupling.

Explain which version is easier to test and replace.


---

# 139. Exercise 14 — Cohesion

Create a bad class:

```text
CompanyManager
```

that performs:

```text
employee management
payment processing
email sending
report generation
database access
```

Split it into cohesive classes.

Think about:

```text
EmployeeService
PaymentService
EmailService
ReportService
```


---

# 140. Exercise 15 — Unidirectional Relationship

Create:

```text
Student → Teacher
```

Student should know its Teacher.

Teacher should not store a list of Students.

Explain why this is unidirectional.


---

# 141. Exercise 16 — Bidirectional Relationship

Create:

```text
Student ↔ Teacher
```

Both should know about the relationship.

Create methods that keep both sides synchronized.

Think about what could happen if only one side is updated.


---

# 142. Exercise 17 — Inheritance or Composition?

For each pair decide:

```text
Dog / Animal
Car / Engine
Employee / Department
Circle / Shape
Computer / CPU
Teacher / Student
```

For each answer, explain why.

Do not answer only with:

```text
IS-A
HAS-A
```

Explain the reasoning.


---

# 143. Exercise 18 — Real-World Modeling

Design an online food delivery system.

Classes:

```text
Customer
Restaurant
FoodItem
Order
Payment
Address
DeliveryPartner
```

Draw all important relationships.

Classify each as:

```text
IS-A
Association
Aggregation
Composition
Dependency
```

Be prepared to justify your choices.


---

# 144. Exercise 19 — Library Model

Design:

```text
Library
Book
Member
Librarian
Loan
```

Ask:

```text
Which object owns which?
Which objects can exist independently?
Which relationships are temporary?
Does Loan represent a relationship?
```

Build the model in Java.


---

# 145. Exercise 20 — Ride-Sharing Model

Design:

```text
Driver
Passenger
Vehicle
Trip
Payment
```

Use:

```text
Driver HAS-A Vehicle
Trip associates Driver and Passenger
Trip uses Payment
```

Then implement the model using Java classes and interfaces.


---

# 146. Mini Project — School Management System

Build:

```text
School
Teacher
Student
Course
Classroom
```

Requirements:

```text
1. Teacher can teach courses.
2. Students can enroll in courses.
3. Classroom can contain students.
4. Student can have an address.
5. Model relationships correctly.
6. Avoid unnecessary inheritance.
7. Use collections for one-to-many relationships.
8. Use an Enrollment object for relationship-specific information.
```

---

# 147. Mini Project — E-Commerce System

Build:

```text
Customer
Address
Product
Order
OrderItem
Payment
ShoppingCart
```

Requirements:

```text
1. Customer has Address.
2. Customer can place Orders.
3. Order contains OrderItems.
4. OrderItem refers to Product.
5. Order uses Payment.
6. Payment must be an interface.
7. Support CardPayment and UpiPayment.
8. Use composition where appropriate.
9. Use dependency injection for Payment.
10. Avoid a large inheritance hierarchy.
```

---

# 148. Mini Project — Vehicle System

Build:

```text
Vehicle
Car
Engine
PetrolEngine
ElectricEngine
BrakeSystem
```

Requirements:

```text
1. Vehicle can be an abstract class or interface where appropriate.
2. Car should have an Engine.
3. Engine should have multiple implementations.
4. Car should receive Engine through constructor injection.
5. Demonstrate runtime polymorphism.
6. Explain why Car should not extend Engine.
```

---

# 149. Mini Project — Payment and Discount System

Build:

```text
Payment
CardPayment
UpiPayment
WalletPayment

DiscountStrategy
NoDiscount
FestivalDiscount
PremiumDiscount

Checkout
```

Checkout should compose:

```text
Payment
DiscountStrategy
```

and use both abstractions.

This project combines:

```text
interface
composition
dependency injection
polymorphism
strategy design
loose coupling
```

---

# 150. Mini Project — Library Management

Build:

```text
Library
Book
Member
Librarian
Loan
```

Loan should contain:

```text
Book
Member
issueDate
returnDate
fine
```

This teaches relationship objects and one-to-many associations.

---

# 151. Mini Project — Ride Sharing

Build:

```text
Driver
Passenger
Vehicle
Trip
Payment
```

Trip should contain:

```text
driver
passenger
vehicle
payment
fare
status
```

Use an interface for Payment.

Demonstrate:

```text
association
HAS-A
dependency
composition
polymorphism
```

---

# 152. Challenge 1 — Find the Wrong Inheritance

```java
class Engine {
}

class Car extends Engine {
}
```

Question:

Why is this probably a bad model?

Answer:

Because a Car is not an Engine.

A better relationship is:

```java
class Car {

    private Engine engine;
}
```

---

# 153. Challenge 2 — Identify the Relationship

```java
class Student {

    private Address address;
}
```

Likely relationship:

```text
Student HAS-A Address
```

Whether it is specifically aggregation, composition, or ordinary association depends on the ownership and lifecycle rules.


---

# 154. Challenge 3 — Identify Dependency

```java
class Printer {

    void print(Document document) {
    }
}
```

What relationship is clearly present?

Answer:

```text
Printer depends on Document
```

because Document is required by the operation.

It does not automatically mean Printer owns Document.

---

# 155. Challenge 4 — Identify Composition

```java
class House {

    private final Room room;

    House() {
        room = new Room();
    }
}
```

What does this design suggest?

It suggests strong ownership of Room by House.

However, remember that composition is ultimately about the domain's ownership and lifecycle model, not merely the presence of `new`.

---

# 156. Challenge 5 — Identify Aggregation

```java
Employee employee =
    new Employee();

Department department =
    new Department(
        List.of(employee)
    );
```

What does this suggest?

The Employee exists independently and is supplied to Department.

This is consistent with aggregation-style modeling.

---

# 157. Challenge 6 — Coupling

Which is more flexible?

```java
class Service {

    private CardPayment payment =
        new CardPayment();
}
```

or:

```java
class Service {

    private final Payment payment;

    Service(Payment payment) {
        this.payment = payment;
    }
}
```

Usually the second design is more loosely coupled because it depends on the Payment abstraction.


---

# 158. Challenge 7 — Composition Over Inheritance

You need a Car that can use:

```text
PetrolEngine
ElectricEngine
HybridEngine
```

Would this be better?

```text
Car
├── PetrolCar
├── ElectricCar
└── HybridCar
```

or:

```text
Car
   |
   +── Engine
          ├── PetrolEngine
          ├── ElectricEngine
          └── HybridEngine
```

Usually the second design is more flexible if engine choice is a replaceable component.

---

# 159. Challenge 8 — Relationship Object

Students enroll in Courses.

Enrollment contains:

```text
student
course
semester
grade
```

Why is Enrollment useful?

Because the relationship itself has data.

This avoids forcing relationship-specific information into Student or Course.


---

# 160. Challenge 9 — Bidirectional Relationship

Suppose:

```java
class Student {
    Teacher teacher;
}

class Teacher {
    List<Student> students;
}
```

What problem can occur?

One side can be updated while the other is not.

Example:

```text
Student says Teacher A
Teacher's list does not contain Student
```

A well-designed model needs clear rules for maintaining consistency.


---

# 161. Challenge 10 — Cardinality

Identify the cardinality:

```text
Person — Passport
Teacher — Students
Students — Courses
```

Possible answers:

```text
Person — Passport
→ one-to-one

Teacher — Students
→ one-to-many

Students — Courses
→ many-to-many
```

Actual business rules can change the precise model.


---

# 162. Final Mental Model

Keep this picture in your mind:

```text
                    OOP RELATIONSHIPS

                         ┌──────────┐
                         │  IS-A    │
                         └────┬─────┘
                              │
                    inheritance / interface
                              │
                              ▼
                         "is a type"

                              OR

                         ┌──────────┐
                         │ HAS-A    │
                         └────┬─────┘
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
           Association    Aggregation   Composition
                │             │             │
             interacts    independent    strong ownership
                │             │             │
                └─────────────┴─────────────┘

                         ┌──────────┐
                         │Dependency│
                         └────┬─────┘
                              │
                         temporary use
```

---

# 163. The Four Important Distinctions

Remember:

```text
IS-A
→ type relationship

Association
→ objects know/interact

Aggregation
→ whole-part relationship
→ parts can exist independently

Composition
→ strong whole-part relationship
→ part lifecycle tied to whole in the model

Dependency
→ temporary use
```

---

# 164. Relationship Decision Tree

Use this when designing classes:

```text
                    Start
                      │
                      ▼
              Is A a type of B?
                 /          \
               YES           NO
                │             │
                ▼             ▼
              IS-A       Does A have/use B?
                              │
                         ┌────┴────┐
                         │         │
                        HAS-A     temporary?
                         │         │
                         ▼         ▼
                    whole-part   Dependency
                         │
                 Can B exist alone?
                    /          \
                  YES           NO
                   │             │
                   ▼             ▼
             Aggregation     Composition
```

This is a practical mental model, not a strict compiler rule.

---

# 165. Design Rules to Remember

```text
1. Use IS-A for genuine subtype relationships.

2. Do not use inheritance merely to reuse code.

3. Use HAS-A/object relationships when one object contains
   or collaborates with another.

4. Association is the broadest general relationship.

5. Aggregation represents a whole-part relationship where
   parts can independently exist.

6. Composition represents stronger ownership of parts.

7. Dependency represents temporary use.

8. Java has no special aggregation/composition keywords.

9. Fields, constructors, methods, parameters, and references
   are used to implement these relationships.

10. Constructor injection is useful for required dependencies.

11. Interfaces can make composed dependencies replaceable.

12. Prefer high cohesion.

13. Avoid unnecessary coupling.

14. Bidirectional relationships need consistency management.

15. Many-to-many relationships may benefit from relationship
   objects.

16. Do not expose internal mutable collections carelessly.

17. Do not assume that using new automatically means composition.

18. Always consider domain ownership and lifecycle.

19. Favor composition over inheritance when composition better
   represents the design.

20. Good OOP models relationships, not just classes.
```

---

# 166. Quick Comparison Table

| Relationship | Question | Example | Typical Java representation |
|---|---|---|---|
| IS-A | "Is A a type of B?" | Dog IS-A Animal | `extends`, `implements` |
| Association | "Do A and B know/interact?" | Doctor ↔ Patient | references, methods |
| Aggregation | "Does whole have independently existing parts?" | Department → Employee | externally supplied references/collections |
| Composition | "Does whole strongly own its parts?" | House → Room | owned component references |
| Dependency | "Does A temporarily need B?" | Printer → Document | parameter/local/use |
| HAS-A | "Does A have/use B?" | Car HAS-A Engine | field/reference |

---

# 167. One-Minute Interview Answer

If an interviewer asks:

**"Explain relationships in OOP."**

A strong simple answer is:

> OOP relationships describe how classes and objects interact. An IS-A relationship represents inheritance or a type relationship, such as Dog IS-A Animal. A HAS-A relationship represents an object having or using another object. Association is a general interaction relationship, aggregation is a whole-part relationship where the parts can exist independently, and composition is a stronger whole-part relationship where the part's lifecycle is tied to the whole in the model. Dependency represents temporary use of another class. Good OOP design uses appropriate relationships, favors high cohesion, avoids unnecessary coupling, and often favors composition over inheritance when composition better represents the design.

---

# 168. Chapter Summary

In this chapter, you learned that real OOP applications are built from relationships between objects.

The major relationships are:

```text
IS-A
HAS-A
Association
Aggregation
Composition
Dependency
```

The most important mental distinction is:

```text
Dog IS-A Animal

Car HAS-A Engine

Doctor interacts with Patient

Department aggregates Employees

House composes Rooms

Printer depends on Document
```

You also learned that:

```text
inheritance
composition
interfaces
polymorphism
dependency injection
```

can work together.

For example:

```java
class Car {

    private final Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }
}
```

with:

```java
interface Engine {
    void start();
}
```

gives:

```text
Car
 |
 | has
 ↓
Engine
 |
 +── PetrolEngine
 +── ElectricEngine
```

This is a very powerful real-world design pattern.

---

# 169. Final Revision Checklist

Before moving to Chapter 23, make sure you can explain:

```text
[ ] What is an OOP relationship?
[ ] What is IS-A?
[ ] What is HAS-A?
[ ] What is association?
[ ] What is aggregation?
[ ] What is composition?
[ ] What is dependency?
[ ] IS-A vs HAS-A
[ ] Association vs aggregation
[ ] Aggregation vs composition
[ ] Association vs dependency
[ ] Inheritance vs composition
[ ] Composition over inheritance
[ ] Ownership
[ ] Object lifecycle
[ ] One-to-one
[ ] One-to-many
[ ] Many-to-many
[ ] Unidirectional relationships
[ ] Bidirectional relationships
[ ] Relationship objects
[ ] Coupling
[ ] Cohesion
[ ] Dependency injection
[ ] Constructor injection
[ ] Composition with interfaces
[ ] Interface + polymorphism
[ ] How to choose a relationship
[ ] Common relationship mistakes
```

---

# 170. End of Chapter 22

Your OOP foundation is now:

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

In Chapter 23, we move from:

```text
"What relationships exist?"
```

to:

```text
"How do we design good classes and relationships?"
```

You will learn:

```text
Coupling
Cohesion
SOLID basics
Good class design
Immutable objects
Common OOP mistakes
```

This chapter is where the OOP knowledge starts turning into actual software-design skill.
