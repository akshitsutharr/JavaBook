# Chapter 16 — Inheritance

> **Java Master Course — Chapter 16 of 50**
>
> Inheritance is one of the major concepts of Object-Oriented Programming.
>
> The basic idea is:
>
> **A new class can reuse and extend the features of an existing class.**
>
> Java uses the `extends` keyword for class inheritance.
>
> This chapter explains inheritance deeply: parent and child classes, IS-A relationships, inheritance types, constructors, `super`, inherited members, access modifiers, overriding previews, polymorphism connections, composition vs inheritance, and practical design.

---

# 1. What Is Inheritance?

Inheritance is an OOP mechanism in which one class derives from another class.

```java
class Animal {
    void eat() {
        System.out.println("Animal eats");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog barks");
    }
}
```

Here:

```text
Animal
   ↑
   |
  Dog
```

`Animal` is the parent/superclass.

`Dog` is the child/subclass.

Because `Dog extends Animal`, a Dog can use accessible inherited members of Animal.

---

# 2. Simple Definition

Exam-friendly definition:

> **Inheritance is a mechanism in Java in which a subclass derives from a superclass and can reuse accessible members while adding or specializing its own behavior.**

The keyword used for class inheritance is:

```java
extends
```

---

# 3. Basic Syntax

```java
class Parent {
    // fields
    // methods
}

class Child extends Parent {
    // additional fields
    // additional methods
}
```

Example:

```java
class Vehicle {

    void start() {
        System.out.println("Vehicle starts");
    }
}

class Car extends Vehicle {

    void drive() {
        System.out.println("Car drives");
    }
}
```

---

# 4. Using the Child

```java
Car car = new Car();

car.start();
car.drive();
```

Output:

```text
Vehicle starts
Car drives
```

`start()` comes from the superclass.

`drive()` belongs to Car.

---

# 5. Why Is Inheritance Used?

Inheritance can provide:

```text
code reuse
common behavior
common type
specialization
polymorphism
hierarchical organization
```

But inheritance should not be used merely to avoid writing duplicate code.

It should represent a meaningful relationship.

---

# 6. Inheritance Is More Than Code Reuse

Suppose:

```text
Dog extends Animal
```

This means more than:

```text
Dog can use Animal's code
```

It also means:

```text
Dog is an Animal
```

This is called an:

```text
IS-A relationship
```

---

# 7. IS-A Relationship

Examples:

```text
Dog IS-A Animal
Cat IS-A Animal
Car IS-A Vehicle
Manager IS-A Employee
Student IS-A Person
Circle IS-A Shape
```

The child should genuinely represent a specialized form of the parent.

---

# 8. Parent Class Terminology

The superclass may also be called:

```text
parent class
base class
superclass
```

Example:

```java
class Animal {
}
```

In:

```java
class Dog extends Animal {
}
```

Animal is the superclass.

---

# 9. Child Class Terminology

The subclass may also be called:

```text
child class
derived class
subclass
```

Example:

```java
class Dog extends Animal {
}
```

Dog is the subclass.

---

# 10. First Complete Example

```java
class Animal {

    void eat() {
        System.out.println("Animal eats");
    }

    void sleep() {
        System.out.println("Animal sleeps");
    }
}

class Dog extends Animal {

    void bark() {
        System.out.println("Dog barks");
    }
}

public class Main {

    public static void main(String[] args) {

        Dog dog = new Dog();

        dog.eat();
        dog.sleep();
        dog.bark();
    }
}
```

Output:

```text
Animal eats
Animal sleeps
Dog barks
```

---

# 11. What Happened Here?

Animal defines:

```java
eat()
sleep()
```

Dog defines:

```java
bark()
```

Dog extends Animal.

Therefore a Dog object can use the accessible inherited methods:

```text
eat()
sleep()
```

and its own method:

```text
bark()
```

---

# 12. Inheritance Is Not Copy-Paste

Do not imagine:

```text
Animal source code
        ↓
copy
        ↓
Dog source code
```

Inheritance establishes a class hierarchy.

Java uses:

```text
class relationships
+
inheritance rules
+
access rules
+
method dispatch
```

It is not simply textual duplication of source code.

---

# 13. Single Inheritance

Java supports single inheritance for classes.

A class has only one direct superclass.

Valid:

```java
class Dog extends Animal {
}
```

Invalid:

```java
class Dog extends Animal, Pet {
}
```

A class cannot directly extend two classes.

---

# 14. Single Inheritance Diagram

```text
Animal
  ↑
 Dog
```

Dog has one direct superclass:

```text
Animal
```

---

# 15. Multilevel Inheritance

Multilevel inheritance occurs when inheritance continues through multiple levels.

Example:

```java
class Animal {
}

class Mammal extends Animal {
}

class Dog extends Mammal {
}
```

Diagram:

```text
Animal
   ↑
Mammal
   ↑
 Dog
```

Dog indirectly derives from Animal.

---

# 16. Multilevel Example

```java
class Animal {

    void eat() {
        System.out.println("Eating");
    }
}

class Mammal extends Animal {

    void walk() {
        System.out.println("Walking");
    }
}

class Dog extends Mammal {

    void bark() {
        System.out.println("Barking");
    }
}
```

Usage:

```java
Dog dog = new Dog();

dog.eat();
dog.walk();
dog.bark();
```

Output:

```text
Eating
Walking
Barking
```

---

# 17. Why Does Dog Get `eat()`?

The hierarchy is:

```text
Dog
 ↓
Mammal
 ↓
Animal
```

Java can find inherited accessible members through the superclass chain.

Therefore Dog can use the inherited `eat()` method.

---

# 18. Hierarchical Inheritance

Hierarchical inheritance means multiple subclasses share one superclass.

Example:

```text
          Animal
        /    |    \
       /     |     \
     Dog    Cat    Cow
```

Java supports this pattern.

---

# 19. Hierarchical Example

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

class Cat extends Animal {

    void meow() {
        System.out.println("Meowing");
    }
}

class Cow extends Animal {

    void moo() {
        System.out.println("Mooing");
    }
}
```

---

# 20. Using Hierarchical Classes

```java
Dog dog = new Dog();
Cat cat = new Cat();
Cow cow = new Cow();

dog.eat();
dog.bark();

cat.eat();
cat.meow();

cow.eat();
cow.moo();
```

Common behavior:

```text
eat()
```

comes from Animal.

---

# 21. Multiple Inheritance of Classes

Java does not support:

```java
class C extends A, B {
}
```

This is a compile-time error.

A Java class has one direct superclass.

---

# 22. Why Does Java Avoid Multiple Class Inheritance?

One major reason is ambiguity.

Imagine:

```text
       A
      / \
     B   C
      \ /
       D
```

Suppose A defines:

```java
void show()
```

and both B and C provide different implementations.

If D inherited from both B and C, which `show()` should D use?

This is related to the classic diamond problem.

Java avoids this kind of class-level ambiguity by allowing one direct superclass.

Interfaces provide another way to obtain multiple types and are covered later.

---

# 23. Multiple Interfaces

Although a class cannot extend multiple classes, it can implement multiple interfaces.

Example:

```java
class Dog
    extends Animal
    implements Runnable, Comparable<Dog> {
}
```

This distinction is important:

```text
extends
→ one class

implements
→ multiple interfaces possible
```

Interfaces are covered in Chapter 21.

---

# 24. IS-A vs HAS-A

This is one of the most important inheritance design tests.

```text
IS-A
→ usually inheritance

HAS-A
→ usually composition/association
```

Example:

```text
Dog IS-A Animal
Car HAS-A Engine
```

---

# 25. Car and Engine

Incorrect:

```java
class Car extends Engine {
}
```

A car is not an engine.

Better:

```java
class Car {

    private Engine engine;
}
```

Now:

```text
Car HAS-A Engine
```

---

# 26. Why This Distinction Matters

Inheritance says:

```text
this object is a specialized form of that type
```

Composition says:

```text
this object contains/uses another object
```

They represent different relationships.

---

# 27. Parent and Child Responsibilities

A parent should normally contain:

```text
common state
common behavior
common contract
```

A child should contain:

```text
specialized state
specialized behavior
specialized implementation
```

Example:

```text
Employee
├── id
├── name
└── work()

Developer
└── writeCode()

Manager
└── manageTeam()
```

---

# 28. Example — Employee Hierarchy

```java
class Employee {

    private final int id;
    private final String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void work() {
        System.out.println(
            name + " is working"
        );
    }
}

class Developer extends Employee {

    Developer(int id, String name) {
        super(id, name);
    }

    public void writeCode() {
        System.out.println(
            getName() + " writes code"
        );
    }
}

class Manager extends Employee {

    Manager(int id, String name) {
        super(id, name);
    }

    public void manageTeam() {
        System.out.println(
            getName() + " manages team"
        );
    }
}
```

---

# 29. Using Employee Subclasses

```java
Developer developer =
    new Developer(101, "Aman");

Manager manager =
    new Manager(102, "Riya");

developer.work();
developer.writeCode();

manager.work();
manager.manageTeam();
```

Output:

```text
Aman is working
Aman writes code
Riya is working
Riya manages team
```

---

# 30. Constructors Are Not Inherited

This is one of the most important rules.

If:

```java
class Animal {
    Animal() {
    }
}
```

and:

```java
class Dog extends Animal {
}
```

Dog does not inherit the Animal constructor.

Constructors belong to their own class.

---

# 31. But Parent Constructors Run

When a child object is created:

```java
Dog dog = new Dog();
```

a superclass constructor executes as part of the construction process.

That does not mean the constructor was inherited.

---

# 32. Constructor Example

```java
class Animal {

    Animal() {
        System.out.println(
            "Animal constructor"
        );
    }
}

class Dog extends Animal {

    Dog() {
        System.out.println(
            "Dog constructor"
        );
    }
}
```

Usage:

```java
new Dog();
```

Output:

```text
Animal constructor
Dog constructor
```

---

# 33. Why Does the Parent Constructor Run First?

A subclass object has a superclass part that must be initialized.

Conceptually:

```text
create Dog
    ↓
initialize superclass part
    ↓
Animal constructor
    ↓
initialize subclass part
    ↓
Dog constructor
```

This is a useful mental model.

---

# 34. `super()`

The subclass constructor can explicitly call the superclass no-argument constructor:

```java
super();
```

Example:

```java
class Animal {

    Animal() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {

    Dog() {
        super();
        System.out.println("Dog");
    }
}
```

---

# 35. Implicit `super()`

If a constructor does not explicitly begin with a constructor invocation, Java may implicitly insert:

```java
super();
```

provided the superclass has an accessible no-argument constructor.

Example:

```java
class Dog extends Animal {

    Dog() {
        System.out.println("Dog");
    }
}
```

Conceptually, the constructor begins with:

```java
super();
```

if that call is valid.

---

# 36. Parent Without No-Argument Constructor

Consider:

```java
class Animal {

    Animal(String name) {
        System.out.println(name);
    }
}

class Dog extends Animal {

    Dog() {
        System.out.println("Dog");
    }
}
```

This does not compile.

Why?

Because Java would need a no-argument superclass constructor for the implicit `super()` call, but Animal does not provide one.

---

# 37. Correct Solution

Use:

```java
super("Dog");
```

Example:

```java
class Animal {

    Animal(String name) {
        System.out.println(
            "Animal: " + name
        );
    }
}

class Dog extends Animal {

    Dog() {
        super("Dog");

        System.out.println(
            "Dog constructor"
        );
    }
}
```

Output:

```text
Animal: Dog
Dog constructor
```

---

# 38. `super(arguments)`

`super(arguments)` invokes a matching accessible constructor in the superclass.

Example:

```java
class Person {

    Person(String name) {
        System.out.println(
            "Person: " + name
        );
    }
}

class Student extends Person {

    Student(String name) {
        super(name);
    }
}
```

---

# 39. `super(...)` Must Be First

A superclass constructor invocation must appear as the first statement in the constructor.

Valid:

```java
Student(String name) {
    super(name);
    System.out.println("Student");
}
```

Invalid:

```java
Student(String name) {
    System.out.println("Before");
    super(name);
}
```

---

# 40. `this()` vs `super()`

Remember:

```text
this(...)
→ another constructor in the same class

super(...)
→ constructor in the superclass
```

A constructor invocation must be first.

You cannot write:

```java
this(...);
super(...);
```

in the same constructor.

---

# 41. Constructor Chaining

You can chain child constructors and then invoke a parent constructor.

Example:

```java
class Person {

    Person(String name) {
        System.out.println(
            "Person: " + name
        );
    }
}

class Student extends Person {

    Student() {
        this("Unknown");
    }

    Student(String name) {
        super(name);

        System.out.println(
            "Student: " + name
        );
    }
}
```

Usage:

```java
new Student();
```

Output:

```text
Person: Unknown
Student: Unknown
```

---

# 42. Constructor Execution in Three Levels

```java
class A {

    A() {
        System.out.println("A");
    }
}

class B extends A {

    B() {
        System.out.println("B");
    }
}

class C extends B {

    C() {
        System.out.println("C");
    }
}
```

Then:

```java
new C();
```

Output:

```text
A
B
C
```

---

# 43. Constructor Order Rule

For a child object:

```text
superclass constructor
        ↓
parent constructor
        ↓
child constructor
```

For multiple inheritance levels:

```text
highest superclass
        ↓
next superclass
        ↓
child
```

---

# 44. `super` Keyword

`super` is used to refer to superclass context from a subclass.

Common uses:

```text
super()
super(arguments)
super.field
super.method()
```

---

# 45. `super.field`

Example:

```java
class Parent {

    int value = 10;
}

class Child extends Parent {

    int value = 20;

    void show() {
        System.out.println(value);
        System.out.println(super.value);
    }
}
```

Output:

```text
20
10
```

---

# 46. Why Does This Happen?

Inside Child:

```java
value
```

refers to the Child field.

While:

```java
super.value
```

explicitly refers to the Parent field.

---

# 47. Fields Are Not Overridden

This is a critical distinction.

Methods can be overridden.

Fields are not overridden.

Example:

```java
class Parent {
    int x = 10;
}

class Child extends Parent {
    int x = 20;
}
```

There are two fields:

```text
Parent.x
Child.x
```

This is field hiding.

---

# 48. Field Hiding Example

```java
class Parent {

    int x = 10;
}

class Child extends Parent {

    int x = 20;

    void show() {
        System.out.println(x);
        System.out.println(super.x);
    }
}
```

Output:

```text
20
10
```

---

# 49. Avoid Unnecessary Field Hiding

This can confuse readers.

Instead of:

```java
int value;
```

in both classes, use clear names or keep state private and expose appropriate methods.

---

# 50. `super.method()`

A subclass can explicitly invoke a superclass instance method:

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
        System.out.println(
            "Dog sound"
        );

        super.sound();
    }
}
```

Output:

```text
Dog sound
Animal sound
```

---

# 51. Why Use `super.method()`?

It is useful when the child wants to extend the parent's behavior.

Example:

```java
class Employee {

    void work() {
        System.out.println(
            "Employee works"
        );
    }
}

class Manager extends Employee {

    @Override
    void work() {
        super.work();

        System.out.println(
            "Manager manages"
        );
    }
}
```

---

# 52. Method Inheritance

If a child does not provide its own implementation of an accessible inherited method, it can use the superclass implementation.

Example:

```java
class Animal {

    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {
}
```

Then:

```java
Dog dog = new Dog();

dog.eat();
```

Output:

```text
Eating
```

---

# 53. Method Overriding Preview

A subclass can provide a specialized implementation of an inherited instance method.

Example:

```java
class Animal {

    void sound() {
        System.out.println(
            "Generic sound"
        );
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println(
            "Bark"
        );
    }
}
```

This is method overriding.

A complete discussion appears in Chapter 18.

---

# 54. `@Override`

When overriding a method, use:

```java
@Override
```

Example:

```java
@Override
void sound() {
    System.out.println("Bark");
}
```

The compiler checks that the method actually overrides an inherited method.

This helps catch mistakes.

---

# 55. Example of a Useful `@Override`

Suppose the parent method is:

```java
void sound()
```

but you accidentally write:

```java
void sounds()
```

Without `@Override`, the compiler may treat it as a new method.

With:

```java
@Override
void sounds()
```

the compiler reports an error because `sounds()` does not override the parent method.

---

# 56. Parent Method Can Still Be Called

If a child overrides:

```java
sound()
```

the parent implementation can be explicitly called with:

```java
super.sound();
```

This allows:

```text
parent behavior
+
child behavior
```

---

# 57. Inheritance and Access Modifiers

Inheritance does not bypass access control.

Java has:

```text
private
package-private
protected
public
```

These determine accessibility.

---

# 58. Private Parent Field

Example:

```java
class Parent {

    private int value = 10;
}

class Child extends Parent {

    void show() {
        // System.out.println(value);
    }
}
```

The direct access is invalid because `value` is private.

---

# 59. Private Does Not Mean Parent State Disappears

The superclass state can still be part of the object.

But the subclass cannot directly access the parent's private member.

The parent class controls its private implementation.

---

# 60. Access Through Parent Method

```java
class Parent {

    private int value = 10;

    public int getValue() {
        return value;
    }
}

class Child extends Parent {

    void show() {
        System.out.println(
            getValue()
        );
    }
}
```

Child uses the parent's public method.

---

# 61. Protected

`protected` is often used in inheritance examples.

```java
class Parent {

    protected int value = 10;
}

class Child extends Parent {

    void show() {
        System.out.println(value);
    }
}
```

Detailed package and cross-package behavior is covered in Chapter 24.

---

# 62. Public

Public members are accessible wherever Java's access rules allow public access.

Example:

```java
class Parent {

    public void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
}
```

Usage:

```java
Child c = new Child();

c.show();
```

---

# 63. Package-Private

If no modifier is specified:

```java
class Parent {

    void show() {
    }
}
```

the member has package-private access.

This means access is available within the same package.

Inheritance across package boundaries introduces additional rules.

---

# 64. Why Prefer Private Fields?

Instead of:

```java
class Employee {
    protected double salary;
}
```

often prefer:

```java
class Employee {

    private double salary;

    protected double getSalary() {
        return salary;
    }
}
```

This gives the superclass greater control over its internal representation.

---

# 65. Encapsulation and Inheritance

Inheritance does not mean:

```text
all parent fields become freely accessible
```

Encapsulation still matters.

A well-designed parent can keep:

```java
private
```

fields and provide controlled methods.

---

# 66. Example — Encapsulated Parent

```java
class Employee {

    private double salary;

    Employee(double salary) {
        if (salary < 0) {
            throw new IllegalArgumentException();
        }

        this.salary = salary;
    }

    protected final double getSalary() {
        return salary;
    }

    protected final void increaseSalary(
        double amount
    ) {
        if (amount < 0) {
            throw new IllegalArgumentException();
        }

        salary += amount;
    }
}
```

A subclass can use controlled operations without directly changing the field.

---

# 67. Inheritance and Static Members

Static members belong to classes rather than representing dynamically dispatched object behavior.

A subclass can often access inherited static members according to normal access rules.

Example:

```java
class Parent {

    static int count = 10;
}

class Child extends Parent {
}
```

Then:

```java
System.out.println(Child.count);
```

can access the inherited static member.

But the member is still class-oriented.

---

# 68. Static Fields Are Not Per-Object Copies

If:

```java
class Parent {
    static int count = 10;
}
```

and:

```java
class Child extends Parent {
}
```

creating many Child objects does not create a separate `count` for every object.

The static field belongs to the declaring class.

---

# 69. Static Method Hiding

Suppose:

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

The Child method hides the Parent static method.

This is not method overriding.

---

# 70. Why Static Methods Are Not Overridden

Runtime overriding applies to instance methods.

Static methods are associated with class members.

Therefore:

```text
instance method
→ can be overridden

static method
→ can be hidden
```

---

# 71. Final Class

A class can be declared:

```java
final
```

Example:

```java
final class Animal {
}
```

It cannot be extended.

This is useful when a class should not have subclasses.

---

# 72. Attempting to Extend Final Class

```java
final class Animal {
}

class Dog extends Animal {
}
```

This causes a compilation error.

---

# 73. Final Method

A method can also be final:

```java
class Parent {

    final void show() {
        System.out.println("Parent");
    }
}
```

A child cannot override it.

---

# 74. Why Use a Final Method?

A final method can guarantee that subclasses cannot replace a particular implementation.

Example:

```java
class Account {

    final void audit() {
        System.out.println(
            "Audit logic"
        );
    }
}
```

A subclass cannot override `audit()`.

---

# 75. Access Level and Overriding

Suppose:

```java
class Parent {

    public void show() {
    }
}
```

A child cannot override it with:

```java
protected void show() {
}
```

because this reduces accessibility.

---

# 76. Increasing Access Is Allowed

Suppose parent:

```java
protected void show()
```

The child may override:

```java
public void show()
```

because access becomes broader.

---

# 77. Private Methods and Overriding

A private method is not inherited in the way required for overriding.

Example:

```java
class Parent {

    private void show() {
    }
}
```

A child declaring:

```java
class Child extends Parent {

    private void show() {
    }
}
```

has its own method.

It is not an override of Parent's private method.

---

# 78. Constructors and Private Constructors

A private constructor can prevent normal construction from outside the class.

Inheritance is also affected because a subclass constructor must be able to invoke an accessible superclass constructor.

Example:

```java
class Parent {

    private Parent() {
    }
}

class Child extends Parent {
}
```

This cannot compile because Child cannot invoke the private Parent constructor.

---

# 79. Object Class

Every Java class ultimately derives from:

```java
java.lang.Object
```

The hierarchy may look like:

```text
Object
   ↑
Animal
   ↑
Dog
```

Object is the root superclass of ordinary Java class hierarchies.

---

# 80. Common Object Methods

Object provides methods such as:

```text
toString()
equals()
hashCode()
getClass()
```

among others.

These are important in Java programming and are covered more deeply later.

---

# 81. Example with `getClass()`

```java
class Animal {
}

class Dog extends Animal {
}

Dog dog = new Dog();

System.out.println(
    dog.getClass().getSimpleName()
);
```

Output:

```text
Dog
```

---

# 82. Example with `toString()`

```java
class Student {

    private final String name;

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

The child class can override inherited Object behavior.

---

# 83. Upcasting

Because a subclass is a subtype of its superclass:

```java
Dog dog = new Dog();

Animal animal = dog;
```

This is called upcasting.

It can also be written:

```java
Animal animal = new Dog();
```

---

# 84. Why Is Upcasting Safe?

Because:

```text
Dog IS-A Animal
```

Every Dog is an Animal in this model.

So a Dog reference can be treated as an Animal reference.

---

# 85. Reference Type vs Object Type

For:

```java
Animal animal = new Dog();
```

remember:

```text
declared/reference type → Animal
actual object type       → Dog
```

This distinction is critical.

---

# 86. What Can an Animal Reference Access?

Suppose:

```java
class Animal {

    void eat() {
    }
}

class Dog extends Animal {

    void bark() {
    }
}
```

Then:

```java
Animal a = new Dog();

a.eat();
```

is valid.

But:

```java
a.bark();
```

does not compile because `bark()` is not part of the Animal reference type.

---

# 87. Why Is `bark()` Not Available?

The compiler sees:

```java
Animal a
```

So it checks the members available through Animal.

Even though the actual object is a Dog, the variable's compile-time type controls which members can be directly selected.

---

# 88. Runtime Dispatch Preview

Now consider:

```java
Animal a = new Dog();

a.sound();
```

If Dog overrides `sound()`, Java can select the Dog implementation at runtime.

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
```

Then:

```java
Animal a = new Dog();

a.sound();
```

Output:

```text
Dog
```

This is runtime polymorphism.

---

# 89. Downcasting

Suppose:

```java
Animal animal = new Dog();
```

If you know the actual object is a Dog, you can cast:

```java
Dog dog = (Dog) animal;
```

This is downcasting.

---

# 90. Unsafe Downcasting

Consider:

```java
Animal animal = new Cat();

Dog dog = (Dog) animal;
```

The actual object is Cat, not Dog.

The cast fails at runtime with:

```text
ClassCastException
```

---

# 91. `instanceof`

You can check the object's compatibility before downcasting.

Example:

```java
Animal animal = new Dog();

if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.bark();
}
```

Modern Java also provides pattern matching for `instanceof`; that is covered later.

---

# 92. Inheritance and Arrays

A parent-type array can hold subclass objects.

Example:

```java
Animal[] animals = {
    new Dog(),
    new Cat()
};
```

Each element is an Animal reference.

The actual objects are:

```text
Dog
Cat
```

---

# 93. Inheritance and Collections

Similarly:

```java
List<Animal> animals =
    new ArrayList<>();

animals.add(new Dog());
animals.add(new Cat());
```

A collection typed as `Animal` can hold compatible subtype objects.

Generics and collections are covered later.

---

# 94. Generic Method with Parent Type

Example:

```java
static void feed(Animal animal) {
    animal.eat();
}
```

Now:

```java
feed(new Dog());
feed(new Cat());
```

Both are valid because both are Animals.

---

# 95. Why This Is Powerful

Instead of writing:

```java
feedDog()
feedCat()
feedCow()
```

you can write:

```java
feed(Animal animal)
```

and let the type hierarchy handle compatible objects.

This becomes even more powerful when methods are overridden.

---

# 96. Inheritance and Polymorphism

Inheritance creates the subtype relationship.

Polymorphism allows code to work with a general type while the actual object can provide specialized behavior.

Example:

```java
Animal animal = new Dog();

animal.sound();
```

The Animal reference can refer to a Dog object.

---

# 97. Inheritance and Abstraction

Inheritance is also commonly used with abstraction.

Example:

```text
Shape
├── Circle
├── Rectangle
└── Triangle
```

The parent can describe common shape behavior.

Subclasses can provide specialized implementations.

Abstract classes are covered in Chapter 20.

---

# 98. Inheritance and Encapsulation

A parent class can protect its internal data:

```java
class Account {

    private double balance;
}
```

and expose controlled operations:

```java
deposit()
withdraw()
```

A subclass does not automatically gain direct access to the private field.

---

# 99. Inheritance Should Preserve Meaning

If:

```text
Dog IS-A Animal
```

then code that expects an Animal should generally be able to work with Dog according to the Animal contract.

This idea is connected to the Liskov Substitution Principle.

It is discussed more deeply in Chapter 23.

---

# 100. Example of a Problematic Hierarchy

Consider:

```text
Rectangle
   ↑
 Square
```

At first glance:

```text
Square IS-A Rectangle
```

is mathematically true.

But suppose Rectangle allows:

```java
setWidth()
setHeight()
```

independently.

A Square must maintain:

```text
width == height
```

This can create behavioral conflicts.

The lesson:

> Inheritance should be evaluated by behavior and contract, not just by vocabulary.

---

# 101. Inheritance vs Composition

Inheritance:

```text
Dog IS-A Animal
```

Composition:

```text
Car HAS-A Engine
```

Example:

```java
class Car {

    private Engine engine;
}
```

---

# 102. Why Composition Is Often Flexible

Inheritance creates a strong connection between subclass and superclass.

Composition allows objects to collaborate without making one object a subtype of another.

Example:

```java
class Car {

    private Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }

    void start() {
        engine.start();
    }
}
```

---

# 103. Composition Example

```java
class Engine {

    void start() {
        System.out.println(
            "Engine starts"
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

        System.out.println(
            "Car starts"
        );
    }
}
```

This is a HAS-A relationship.

---

# 104. Do Not Use Inheritance for Reuse Alone

Suppose:

```text
Class B needs one utility method from Class A
```

That does not automatically mean:

```java
class B extends A
```

Ask:

```text
Is B genuinely an A?
```

If not, use composition, a utility, delegation, or another suitable design.

---

# 105. Common Mistake — Everything Extends Something Custom

Beginners sometimes create:

```text
BaseClass
  ↑
Every class
```

without meaningful shared behavior.

This can make the design more complicated rather than simpler.

---

# 106. Common Mistake — Deep Inheritance

Example:

```text
A
↑
B
↑
C
↑
D
↑
E
↑
F
```

Deep hierarchies can make behavior difficult to understand.

Prefer shallow, meaningful hierarchies when possible.

---

# 107. Common Mistake — Protected Fields Everywhere

Avoid automatically writing:

```java
protected int x;
protected String name;
protected double salary;
```

for every parent field.

Subclasses then become tightly coupled to parent representation.

Private fields plus controlled methods often provide better encapsulation.

---

# 108. Common Mistake — Forgetting `super(...)`

If the parent has:

```java
Parent(String name)
```

then the child must invoke an accessible matching constructor:

```java
Child(String name) {
    super(name);
}
```

when no suitable no-argument constructor exists.

---

# 109. Common Mistake — Thinking Constructors Are Inherited

Constructors are not inherited.

The child defines its own constructors.

Those constructors can invoke superclass constructors with:

```java
super(...)
```

---

# 110. Common Mistake — Confusing Overloading and Overriding

Overloading:

```java
void show()
void show(int x)
```

Same name, different parameter lists.

Overriding:

```java
class Parent {
    void show() {}
}

class Child extends Parent {
    @Override
    void show() {}
}
```

Same inherited instance method signature, specialized child implementation.

---

# 111. Common Mistake — Thinking Fields Override

Fields do not participate in dynamic overriding.

Example:

```java
class Parent {
    int x = 10;
}

class Child extends Parent {
    int x = 20;
}
```

This is field hiding.

---

# 112. Common Mistake — Parent Reference Means Parent Object

This:

```java
Animal a = new Dog();
```

creates a Dog object.

It does not create an Animal object and convert it into Dog.

The reference variable has type Animal.

The actual object is Dog.

---

# 113. Common Mistake — Assuming Parent Reference Can Call Child Methods

Given:

```java
Animal a = new Dog();
```

this does not automatically allow:

```java
a.bark();
```

if `bark()` is only declared in Dog.

The declared type controls direct member access.

---

# 114. Common Mistake — Unsafe Downcasting

Avoid blindly writing:

```java
Dog d = (Dog) animal;
```

unless the object is known to be a Dog.

Use `instanceof` when necessary.

---

# 115. Common Mistake — Using `super` in Static Context

`super` is associated with an instance context.

You cannot use:

```java
super
```

from a static method.

Static methods do not have a current object represented by `this`.

---

# 116. Common Mistake — Calling `super()` Anywhere

`super()` is a constructor invocation.

It can only be used as a constructor invocation in a constructor.

You cannot write:

```java
void method() {
    super();
}
```

---

# 117. Common Mistake — Calling Parent Constructor Like a Method

This is invalid:

```java
void test() {
    Parent();
}
```

Constructors are not normal methods.

Use:

```java
super(...);
```

inside a subclass constructor.

---

# 118. Practical Program — Person and Student

```java
class Person {

    private final String name;
    private final int age;

    Person(String name, int age) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException();
        }

        if (age < 0) {
            throw new IllegalArgumentException();
        }

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

class Student extends Person {

    private final int rollNumber;

    Student(
        String name,
        int age,
        int rollNumber
    ) {
        super(name, age);
        this.rollNumber = rollNumber;
    }

    public int getRollNumber() {
        return rollNumber;
    }
}
```

---

# 119. Student Usage

```java
Student student =
    new Student("Aman", 20, 101);

System.out.println(
    student.getName()
);

System.out.println(
    student.getAge()
);

System.out.println(
    student.getRollNumber()
);
```

Output:

```text
Aman
20
101
```

---

# 120. What Does Student Reuse?

Student uses inherited:

```java
getName()
getAge()
```

from Person.

Student adds:

```java
rollNumber
getRollNumber()
```

---

# 121. Practical Program — Vehicle

```java
class Vehicle {

    private final String brand;

    Vehicle(String brand) {
        if (brand == null || brand.isBlank()) {
            throw new IllegalArgumentException();
        }

        this.brand = brand;
    }

    public String getBrand() {
        return brand;
    }

    public void start() {
        System.out.println(
            brand + " starts"
        );
    }

    public void stop() {
        System.out.println(
            brand + " stops"
        );
    }
}

class Car extends Vehicle {

    Car(String brand) {
        super(brand);
    }

    public void drive() {
        System.out.println(
            getBrand() + " drives"
        );
    }
}

class Bike extends Vehicle {

    Bike(String brand) {
        super(brand);
    }

    public void ride() {
        System.out.println(
            getBrand() + " rides"
        );
    }
}
```

---

# 122. Vehicle Usage

```java
Car car = new Car("Toyota");
Bike bike = new Bike("Honda");

car.start();
car.drive();
car.stop();

bike.start();
bike.ride();
bike.stop();
```

Output:

```text
Toyota starts
Toyota drives
Toyota stops
Honda starts
Honda rides
Honda stops
```

---

# 123. Practical Program — Animal

```java
class Animal {

    private final String name;

    Animal(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void eat() {
        System.out.println(
            name + " eats"
        );
    }
}

class Dog extends Animal {

    Dog(String name) {
        super(name);
    }

    public void bark() {
        System.out.println(
            getName() + " barks"
        );
    }
}

class Cat extends Animal {

    Cat(String name) {
        super(name);
    }

    public void meow() {
        System.out.println(
            getName() + " meows"
        );
    }
}
```

---

# 124. Practical Program — Banking Hierarchy

```java
class BankAccount {

    private final String accountNumber;
    private double balance;

    BankAccount(
        String accountNumber,
        double initialBalance
    ) {
        if (accountNumber == null ||
            accountNumber.isBlank()) {
            throw new IllegalArgumentException();
        }

        if (initialBalance < 0) {
            throw new IllegalArgumentException();
        }

        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException();
        }

        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0 ||
            amount > balance) {
            throw new IllegalArgumentException();
        }

        balance -= amount;
    }
}

class SavingsAccount extends BankAccount {

    SavingsAccount(
        String accountNumber,
        double balance
    ) {
        super(accountNumber, balance);
    }

    public void addInterest(double rate) {
        if (rate < 0) {
            throw new IllegalArgumentException();
        }

        double interest =
            getBalance() * rate / 100;

        deposit(interest);
    }
}
```

---

# 125. Why This Banking Design Is Better

The parent owns:

```text
account number
balance
deposit
withdraw
```

The child adds:

```text
interest
```

The balance remains private.

The subclass uses public methods instead of directly changing parent state.

---

# 126. Practical Program — Employee Hierarchy

```java
class Employee {

    private final int id;
    private final String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void work() {
        System.out.println(
            name + " works"
        );
    }
}

class Developer extends Employee {

    Developer(int id, String name) {
        super(id, name);
    }

    public void writeCode() {
        System.out.println(
            getName() + " writes Java code"
        );
    }
}

class Manager extends Employee {

    Manager(int id, String name) {
        super(id, name);
    }

    public void manageTeam() {
        System.out.println(
            getName() + " manages the team"
        );
    }
}
```

---

# 127. Practical Program — Shape

```java
class Shape {

    public void draw() {
        System.out.println(
            "Drawing shape"
        );
    }
}

class Circle extends Shape {

    @Override
    public void draw() {
        System.out.println(
            "Drawing circle"
        );
    }
}

class Rectangle extends Shape {

    @Override
    public void draw() {
        System.out.println(
            "Drawing rectangle"
        );
    }
}
```

---

# 128. Shape Usage

```java
Shape circle = new Circle();
Shape rectangle = new Rectangle();

circle.draw();
rectangle.draw();
```

Output:

```text
Drawing circle
Drawing rectangle
```

This demonstrates inheritance plus runtime polymorphism.

---

# 129. Practical Program — Multilevel

```java
class LivingThing {

    void breathe() {
        System.out.println("Breathing");
    }
}

class Animal extends LivingThing {

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

Usage:

```java
Dog dog = new Dog();

dog.breathe();
dog.eat();
dog.bark();
```

Output:

```text
Breathing
Eating
Barking
```

---

# 130. Practical Program — `super.method()`

```java
class Employee {

    public void work() {
        System.out.println(
            "Employee work"
        );
    }
}

class Manager extends Employee {

    @Override
    public void work() {
        super.work();

        System.out.println(
            "Manager planning"
        );
    }
}
```

Output:

```text
Employee work
Manager planning
```

---

# 131. Practical Program — Parent and Child Fields

```java
class Parent {

    int value = 10;
}

class Child extends Parent {

    int value = 20;

    void show() {
        System.out.println(
            "Child: " + this.value
        );

        System.out.println(
            "Parent: " + super.value
        );
    }
}
```

Output:

```text
Child: 20
Parent: 10
```

Remember:

```text
this.value
→ Child field

super.value
→ Parent field
```

---

# 132. Practical Program — Upcasting

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

public class Main {

    public static void main(String[] args) {

        Animal animal = new Dog();

        animal.eat();
    }
}
```

Output:

```text
Eating
```

---

# 133. Upcasting with Overriding

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

The actual object is Dog.

---

# 134. Practical Program — `instanceof`

```java
Animal animal = new Dog();

if (animal instanceof Dog) {
    Dog dog = (Dog) animal;

    dog.bark();
}
```

Output:

```text
Barking
```

---

# 135. Practical Program — Parent Parameter

```java
static void feed(Animal animal) {
    animal.eat();
}
```

Usage:

```java
feed(new Dog());
feed(new Cat());
```

Both objects can be passed because both are Animals.

---

# 136. Why Parent Parameters Are Useful

A method such as:

```java
void feed(Animal animal)
```

is more general than:

```java
void feed(Dog dog)
```

when the method only requires behavior available from Animal.

This supports flexible polymorphic code.

---

# 137. Practical Program — Animal Array

```java
Animal[] animals = {
    new Dog("Bruno"),
    new Cat("Milo")
};
```

Then:

```java
for (Animal animal : animals) {
    animal.eat();
}
```

Each array element is an Animal reference.

The actual objects are Dog and Cat.

---

# 138. Inheritance and Memory — Safe Mental Model

When explaining inheritance and memory, avoid saying:

```text
parent object + child object are always two separate heap objects
```

That is not correct.

Creating:

```java
new Dog()
```

creates one object whose class is Dog.

That object is also an instance of its superclass types.

A useful conceptual model is:

```text
Dog object
├── superclass state/behavior relationship
└── Dog-specific state/behavior
```

The exact physical memory layout is JVM implementation-specific.

---

# 139. One Object, Multiple Types

For:

```java
Dog dog = new Dog();
```

the same object can be treated as:

```text
Dog
Animal
Object
```

because Dog is an Animal and every ordinary class ultimately derives from Object.

---

# 140. Type Hierarchy

Example:

```text
Object
   ↑
Animal
   ↑
Dog
```

A Dog object is compatible with all these reference types:

```java
Dog d = new Dog();

Animal a = d;

Object o = d;
```

---

# 141. Important Difference

These are different:

```java
Dog d = new Dog();
```

```java
Animal a = new Dog();
```

```java
Object o = new Dog();
```

The actual object is Dog in all three cases.

Only the reference type changes.

---

# 142. Method Availability vs Runtime Behavior

For:

```java
Animal a = new Dog();
```

two questions must be separated:

```text
What methods can the compiler let me call?
→ based on Animal reference type

Which overridden instance implementation executes?
→ based on runtime object
```

This distinction is fundamental to polymorphism.

---

# 143. Inheritance and `super` Example

```java
class Animal {

    void sound() {
        System.out.println(
            "Generic animal sound"
        );
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println(
            "Dog sound"
        );

        super.sound();
    }
}
```

Here:

```text
sound()
→ Dog implementation

super.sound()
→ Animal implementation
```

---

# 144. Inheritance and Method Reuse

A child can reuse parent behavior without overriding it.

```java
class Vehicle {

    void start() {
        System.out.println("Start");
    }
}

class Car extends Vehicle {
}
```

Then:

```java
new Car().start();
```

uses the inherited implementation.

---

# 145. Inheritance and Specialization

A child can add functionality.

```java
class Vehicle {

    void start() {
    }
}

class Car extends Vehicle {

    void openTrunk() {
    }
}
```

This is specialization.

---

# 146. Inheritance and Overriding

A child can replace an inherited instance method's implementation.

```java
class Vehicle {

    void start() {
        System.out.println("Vehicle");
    }
}

class ElectricCar extends Vehicle {

    @Override
    void start() {
        System.out.println(
            "Electric system starts"
        );
    }
}
```

This is specialization through overriding.

---

# 147. Inheritance and Extension

A subclass can combine:

```text
inherited behavior
+
new behavior
+
overridden behavior
```

Example:

```text
Employee
   ↓
Manager

inherited:
work()

new:
manageTeam()

overridden:
work()
```

---

# 148. Good Parent Class

A good parent often has:

```text
highly relevant common behavior
stable concepts
clear contract
appropriate abstraction level
```

---

# 149. Bad Parent Class

A poor parent may have:

```text
unrelated methods
too many responsibilities
implementation details children should not know
unstable APIs
```

This can make every subclass unnecessarily complicated.

---

# 150. Inheritance and Coupling

Inheritance creates strong coupling between parent and child.

The child depends on aspects of the parent such as:

```text
methods
contracts
accessibility
constructor requirements
overriding rules
```

Therefore inheritance should be used deliberately.

---

# 151. Inheritance and Cohesion

A parent should have cohesive responsibilities.

For example:

```text
Employee
```

should contain employee-wide concepts.

It should not become:

```text
Employee
├── database code
├── UI code
├── email code
├── payment gateway code
└── unrelated utility methods
```

---

# 152. Inheritance and SOLID Preview

Inheritance is strongly related to the SOLID principles.

Especially:

```text
Liskov Substitution Principle
```

The basic idea is that subtypes should be substitutable for their parent type without violating expected behavior.

Detailed SOLID discussion appears in Chapter 23.

---

# 153. Practical Design Test

Before writing:

```java
class Child extends Parent
```

ask:

```text
1. Is Child genuinely a Parent?
2. Does Child satisfy the Parent contract?
3. Does Child need the Parent behavior?
4. Is the relationship stable?
5. Would composition be better?
6. Does the hierarchy make the code simpler?
```

---

# 154. Inheritance Decision Example

Question:

```text
Should Manager extend Employee?
```

Usually:

```text
Yes, if Manager is modeled as a specialized Employee.
```

Question:

```text
Should Car extend Engine?
```

Usually:

```text
No.
```

Because:

```text
Car HAS-A Engine.
```

---

# 155. Inheritance Decision Example — Student

```text
Student IS-A Person
```

This is a common model.

But a real system may choose different modeling depending on domain requirements.

Inheritance should always reflect the intended domain model.

---

# 156. Inheritance Decision Example — Address

Usually:

```text
Student HAS-A Address
```

not:

```text
Student IS-A Address
```

So use composition:

```java
class Student {

    private Address address;
}
```

---

# 157. Inheritance Decision Example — Engine

Usually:

```text
Car HAS-A Engine
```

Use:

```java
class Car {

    private Engine engine;
}
```

---

# 158. Inheritance Decision Example — Payment

Suppose:

```text
Payment
├── CardPayment
├── CashPayment
└── UpiPayment
```

If these genuinely share a common Payment contract and behavior, inheritance or an interface hierarchy may be appropriate.

The exact design depends on the system.

---

# 159. Inheritance and Interfaces

Sometimes the better abstraction is:

```text
interface Payable
```

rather than:

```text
class Payment
```

A class can then implement multiple interfaces.

This is why interfaces are an important complement to class inheritance.

Chapter 21 covers interfaces deeply.

---

# 160. Java Class Inheritance Summary

For classes:

```text
one direct superclass
```

Possible structures:

```text
A → B
```

```text
A → B → C
```

```text
    A
   / \
  B   C
```

Not:

```text
A   B
 \ /
  C
```

through multiple class inheritance.

---

# 161. Constructor Summary

Remember:

```text
constructors are not inherited
```

But:

```text
super(...)
```

allows a subclass constructor to invoke a superclass constructor.

Execution:

```text
parent initialization
      ↓
parent constructor
      ↓
child initialization
      ↓
child constructor
```

---

# 162. `super` Summary

```text
super()
→ parent no-argument constructor

super(args)
→ parent constructor with matching args

super.field
→ parent field

super.method()
→ parent instance method implementation
```

---

# 163. Inheritance Summary

```text
extends
→ class inheritance

parent
→ superclass

child
→ subclass

IS-A
→ subtype relationship

HAS-A
→ usually composition
```

---

# 164. Access Summary

```text
private
→ directly accessible only inside declaring class

package-private
→ accessible within package

protected
→ package access plus specific subclass access rules

public
→ broadly accessible
```

Detailed access behavior is covered in Chapter 24.

---

# 165. Method Summary

```text
inherited method
→ child can use accessible parent implementation

overridden method
→ child provides specialized instance implementation

super.method()
→ explicitly use parent implementation

static method
→ hidden, not dynamically overridden
```

---

# 166. Field Summary

```text
fields are not overridden
```

If child declares the same field name:

```text
field hiding
```

Use:

```java
super.field
```

to explicitly access the parent field when it is accessible.

---

# 167. Object Type Summary

For:

```java
Animal a = new Dog();
```

remember:

```text
reference type = Animal
object type    = Dog
```

Direct member access is checked using the reference type.

Overridden instance methods can dispatch according to the runtime object.

---

# 168. Interview Questions — Basic

## Q1. What is inheritance?

Inheritance is an OOP mechanism in which a subclass derives from a superclass and can reuse accessible members and specialize behavior.

---

## Q2. Which keyword is used for inheritance in Java?

```java
extends
```

---

## Q3. What is a superclass?

The class from which another class directly inherits.

---

## Q4. What is a subclass?

A class that directly extends another class.

---

## Q5. What is an IS-A relationship?

It describes a subtype relationship.

Example:

```text
Dog IS-A Animal
```

---

## Q6. What is single inheritance?

A class has one direct superclass.

---

## Q7. What is multilevel inheritance?

Inheritance through multiple levels.

Example:

```text
A
↑
B
↑
C
```

---

## Q8. What is hierarchical inheritance?

Multiple subclasses share a common superclass.

Example:

```text
    A
   / \
  B   C
```

---

## Q9. Does Java support multiple inheritance of classes?

No.

A class can directly extend only one class.

---

## Q10. Why does Java not support multiple class inheritance?

One reason is to avoid ambiguity associated with multiple superclass implementations, such as the classic diamond problem.

---

# 169. Interview Questions — Constructors

## Q11. Are constructors inherited?

No.

---

## Q12. How does a subclass invoke a superclass constructor?

Using:

```java
super(...)
```

---

## Q13. What happens if a child constructor does not explicitly call `super()`?

Java attempts to insert an implicit no-argument superclass constructor invocation, provided that constructor is accessible and exists.

---

## Q14. What if the parent has only a parameterized constructor?

The child must explicitly invoke an accessible matching constructor.

Example:

```java
Child() {
    super("value");
}
```

---

## Q15. Can `super()` and `this()` both appear as the first constructor invocation?

No.

A constructor can begin with one constructor invocation, either:

```java
this(...)
```

or:

```java
super(...)
```

---

## Q16. Why does the superclass constructor execute before the child constructor body?

Superclass state must be initialized as part of constructing the subclass object.

---

# 170. Interview Questions — `super`

## Q17. What is the use of `super`?

It provides access to superclass context.

Common forms:

```text
super()
super(args)
super.field
super.method()
```

---

## Q18. What is `super.method()`?

It explicitly invokes the superclass implementation of an instance method.

---

## Q19. What is `super.field`?

It accesses an accessible superclass field when a field with the same name is hidden in the child.

---

## Q20. Can `super()` be called from a normal method?

No.

It is a constructor invocation and is used in constructors.

---

# 171. Interview Questions — Access

## Q21. Can a child directly access a private parent field?

No.

---

## Q22. Can a child access a protected parent member?

Often yes, subject to Java's protected-access rules.

---

## Q23. Why might private fields be preferred over protected fields?

Private fields preserve stronger encapsulation and reduce subclass dependence on parent representation.

---

## Q24. Can a child use a public parent method?

Yes, subject to normal access rules.

---

# 172. Interview Questions — Methods

## Q25. Are methods inherited?

Accessible methods can be inherited and used by subclasses according to Java's inheritance rules.

---

## Q26. What is method overriding?

A subclass provides a specialized implementation of an inherited instance method with a compatible signature.

---

## Q27. What is `@Override`?

An annotation that tells the compiler the programmer intends to override an inherited method.

---

## Q28. Are fields overridden?

No.

Fields can be hidden when a child declares a field with the same name.

---

## Q29. Are static methods overridden?

No.

A static method can be hidden by a subclass declaration.

---

## Q30. Can a final method be overridden?

No.

---

# 173. Interview Questions — Polymorphism

## Q31. What is upcasting?

Treating a subclass object as a superclass type.

Example:

```java
Animal a = new Dog();
```

---

## Q32. Is upcasting safe?

For a valid subtype relationship, yes.

---

## Q33. What is downcasting?

Casting a superclass reference back to a more specific subclass type.

Example:

```java
Dog d = (Dog) animal;
```

---

## Q34. What happens if downcasting is invalid?

A runtime `ClassCastException` can occur.

---

## Q35. Why is `Animal a = new Dog()` useful?

It allows code to work with a general Animal type while the actual object can be a specialized subtype.

---

# 174. Interview Questions — Design

## Q36. What is the difference between inheritance and composition?

Inheritance represents an IS-A relationship.

Composition represents a HAS-A/contains/uses relationship.

---

## Q37. Why should inheritance not be used only for code reuse?

Because inheritance creates a strong type and behavioral relationship. Incorrect inheritance can make the design harder to maintain.

---

## Q38. Why is `Car extends Engine` usually wrong?

Because a Car is not an Engine.

A Car has an Engine.

---

## Q39. Why can deep inheritance be problematic?

It increases coupling and makes behavior harder to trace and understand.

---

## Q40. What is the Liskov Substitution Principle?

It broadly says that objects of a subtype should be usable where the parent type is expected without violating the expected behavior of the parent contract.

---

# 175. Output Questions

## Output 1

```java
class Animal {

    void eat() {
        System.out.println("Eat");
    }
}

class Dog extends Animal {

    void bark() {
        System.out.println("Bark");
    }
}

Dog d = new Dog();

d.eat();
d.bark();
```

Output:

```text
Eat
Bark
```

---

# 176. Output Question 2

```java
class A {

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

---

# 177. Output Question 3

```java
class A {

    int x = 10;
}

class B extends A {

    int x = 20;

    void show() {
        System.out.println(x);
        System.out.println(super.x);
    }
}

new B().show();
```

Output:

```text
20
10
```

---

# 178. Output Question 4

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
        super.show();
    }
}

new Child().show();
```

Output:

```text
Child
Parent
```

---

# 179. Output Question 5

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

---

# 180. Output Question 6

```java
class A {

    A() {
        System.out.println("A");
    }
}

class B extends A {

    B() {
        super();
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

---

# 181. Output Question 7

```java
class A {

    A(String value) {
        System.out.println(value);
    }
}

class B extends A {

    B() {
        super("Hello");
        System.out.println("B");
    }
}

new B();
```

Output:

```text
Hello
B
```

---

# 182. Output Question 8

```java
class A {
    void show() {
        System.out.println("A");
    }
}

class B extends A {
    void showB() {
        System.out.println("B");
    }
}

A a = new B();

a.show();
```

Output:

```text
A
```

The actual object is B, but B did not override `show()`.

---

# 183. Output Question 9

```java
class A {

    void show() {
        System.out.println("A");
    }
}

class B extends A {

    @Override
    void show() {
        System.out.println("B");
    }
}

A a = new B();

a.show();
```

Output:

```text
B
```

Because B overrides the instance method.

---

# 184. Output Question 10

```java
class A {

    int x = 10;
}

class B extends A {

    int x = 20;
}

A a = new B();

System.out.println(a.x);
```

Output:

```text
10
```

Fields do not use dynamic method dispatch.

The field access is based on the reference type.

---

# 185. Output Question 11

```java
class A {

    static void show() {
        System.out.println("A");
    }
}

class B extends A {

    static void show() {
        System.out.println("B");
    }
}

A a = new B();

a.show();
```

Output:

```text
A
```

Static methods are hidden rather than dynamically overridden.

---

# 186. Output Question 12

```java
class Animal {

    void eat() {
        System.out.println("Eat");
    }
}

class Dog extends Animal {

    void bark() {
        System.out.println("Bark");
    }
}

Animal animal = new Dog();

animal.eat();
```

Output:

```text
Eat
```

---

# 187. Output Question 13

```java
class A {

    A() {
        System.out.println("A");
    }
}

class B extends A {

    B() {
        this(10);
    }

    B(int x) {
        System.out.println("B " + x);
    }
}

new B();
```

Output:

```text
A
B 10
```

The no-argument B constructor calls another B constructor, which then implicitly calls `super()`.

---

# 188. Output Question 14

```java
class A {

    A() {
        System.out.println("A");
    }
}

class B extends A {

    B() {
        super();
        System.out.println("B");
    }
}

class C extends B {

    C() {
        super();
        System.out.println("C");
    }
}

new C();
```

Output:

```text
A
B
C
```

---

# 189. Output Question 15

```java
class Animal {

    void sound() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        super.sound();
        System.out.println("Dog");
    }
}

new Dog().sound();
```

Output:

```text
Animal
Dog
```

---

# 190. Practice Exercise 1

Create:

```text
Animal
Dog
Cat
```

Animal should have:

```text
eat()
sleep()
```

Dog:

```text
bark()
```

Cat:

```text
meow()
```

Create objects and call all methods.

---

# 191. Practice Exercise 2

Create:

```text
Vehicle
Car
Bike
```

Vehicle:

```text
start()
stop()
```

Car:

```text
drive()
```

Bike:

```text
ride()
```

Use constructors to initialize the brand.

---

# 192. Practice Exercise 3

Create:

```text
Person
Student
```

Person:

```text
name
age
```

Student:

```text
rollNumber
course
```

Use:

```java
super(...)
```

to initialize parent state.

---

# 193. Practice Exercise 4

Create:

```text
Employee
Developer
Manager
```

Employee:

```text
id
name
work()
```

Developer:

```text
writeCode()
```

Manager:

```text
manageTeam()
```

Use private fields.

---

# 194. Practice Exercise 5

Create:

```text
BankAccount
SavingsAccount
```

BankAccount:

```text
accountNumber
balance
deposit()
withdraw()
```

SavingsAccount:

```text
addInterest()
```

Do not make balance publicly writable.

---

# 195. Practice Exercise 6

Create:

```text
Shape
Circle
Rectangle
```

Give Shape:

```java
draw()
```

Override it in Circle and Rectangle.

Then write:

```java
Shape s1 = new Circle();
Shape s2 = new Rectangle();
```

and call:

```java
s1.draw();
s2.draw();
```

---

# 196. Practice Exercise 7

Create a three-level hierarchy:

```text
LivingThing
   ↓
Animal
   ↓
Dog
```

Methods:

```text
LivingThing → breathe()
Animal      → eat()
Dog         → bark()
```

Create a Dog and call all three.

---

# 197. Practice Exercise 8

Create:

```text
Parent
Child
```

Both have:

```java
int value
```

Use:

```java
this.value
super.value
```

to print both values.

---

# 198. Practice Exercise 9

Create a parent method:

```java
void show()
```

Override it in the child.

Inside the child:

```java
super.show();
```

Then add another line.

Observe the output order.

---

# 199. Practice Exercise 10

Create:

```text
Animal
Dog
Cat
```

Write:

```java
static void makeSound(Animal animal)
```

Override `sound()` in Dog and Cat.

Pass both objects to the method.

Observe runtime polymorphism.

---

# 200. Mini Project — Employee Management

Build:

```text
Employee
├── Developer
├── Manager
└── Designer
```

Employee:

```text
id
name
salary
work()
```

Developer:

```text
writeCode()
```

Manager:

```text
manageTeam()
```

Designer:

```text
designUI()
```

Use:

```text
constructors
private fields
super()
inheritance
method overriding
```

---

# 201. Mini Project — Vehicle Management

Build:

```text
Vehicle
├── Car
├── Bike
└── Truck
```

Vehicle:

```text
brand
speed
start()
stop()
```

Car:

```text
drive()
```

Bike:

```text
ride()
```

Truck:

```text
loadCargo()
```

Think carefully about what belongs in Vehicle.

---

# 202. Mini Project — Banking System

Build:

```text
BankAccount
├── SavingsAccount
└── CurrentAccount
```

Common:

```text
account number
balance
deposit
```

Savings:

```text
interest
```

Current:

```text
overdraft
```

Ensure that every subclass respects the parent's rules.

---

# 203. Mini Project — School System

Build:

```text
Person
├── Student
└── Teacher
```

Person:

```text
name
age
```

Student:

```text
rollNumber
study()
```

Teacher:

```text
subject
teach()
```

Use constructor chaining.

---

# 204. Mini Project — Animal System

Build:

```text
Animal
├── Dog
├── Cat
└── Bird
```

Common:

```text
name
eat()
sleep()
```

Dog:

```text
bark()
```

Cat:

```text
meow()
```

Bird:

```text
fly()
```

Then think about whether `fly()` should belong to Animal or only Bird.

This is a design exercise.

---

# 205. Design Challenge

Suppose you have:

```text
Car
Engine
```

Question:

Should you write:

```java
class Car extends Engine
```

or:

```java
class Car {
    private Engine engine;
}
```

Answer:

Usually composition:

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

# 206. Design Challenge

Suppose:

```text
Developer
Employee
```

Should Developer extend Employee?

Usually yes if the domain model says:

```text
Developer IS-A Employee
```

and Developer can satisfy the Employee contract.

---

# 207. Design Challenge

Suppose:

```text
Student
Address
```

Should Student extend Address?

Usually no.

Use:

```java
class Student {
    private Address address;
}
```

because:

```text
Student HAS-A Address
```

---

# 208. Design Challenge

Suppose:

```text
Circle
Shape
```

Should Circle extend Shape?

Usually yes if Shape is a suitable common abstraction:

```text
Circle IS-A Shape
```

This can enable polymorphism.

---

# 209. Complete Mental Model

Think of inheritance like this:

```text
             Superclass
                 |
          common behavior
                 |
          +------+------+
          |             |
       Subclass       Subclass
          |             |
     specialization specialization
```

The parent captures common meaning.

The child adds or specializes meaning.

---

# 210. Inheritance in One Example

```java
class Animal {

    private final String name;

    Animal(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void eat() {
        System.out.println(
            name + " eats"
        );
    }

    public void sound() {
        System.out.println(
            "Generic animal sound"
        );
    }
}

class Dog extends Animal {

    Dog(String name) {
        super(name);
    }

    @Override
    public void sound() {
        System.out.println(
            getName() + " barks"
        );
    }

    public void fetch() {
        System.out.println(
            getName() + " fetches"
        );
    }
}
```

---

# 211. Using the Complete Example

```java
Animal animal = new Dog("Bruno");

animal.eat();
animal.sound();
```

Output:

```text
Bruno eats
Bruno barks
```

The parent reference provides the general type.

The actual Dog object provides the overridden sound behavior.

---

# 212. Important Concepts Connected to This Chapter

Inheritance connects directly to:

```text
Chapter 15
→ Encapsulation

Chapter 17
→ Method Overloading

Chapter 18
→ Method Overriding

Chapter 19
→ Polymorphism

Chapter 20
→ Abstraction

Chapter 21
→ Interfaces

Chapter 22
→ OOP Relationships

Chapter 23
→ OOP Design
```

This is why inheritance is a central OOP topic.

---

# 213. Final Revision

Remember:

```text
extends
→ class inheritance

Parent
→ superclass

Child
→ subclass

IS-A
→ inheritance relationship

HAS-A
→ composition relationship

super()
→ superclass constructor

super.field
→ superclass field

super.method()
→ superclass method implementation

constructors
→ not inherited

private
→ not directly accessible in subclass

fields
→ not overridden

instance methods
→ can be overridden

static methods
→ hidden, not overridden

final class
→ cannot be extended

final method
→ cannot be overridden

upcasting
→ child object treated as parent type

downcasting
→ parent reference cast to child type

Object
→ root superclass of ordinary Java class hierarchy
```

---

# 214. Most Important Rules

```text
1. Use extends for class inheritance.

2. A class has only one direct superclass.

3. Java supports single, multilevel, and hierarchical class inheritance.

4. Java does not support multiple inheritance of classes.

5. Constructors are not inherited.

6. Parent constructors execute before child constructor bodies.

7. Use super(...) to invoke a superclass constructor.

8. super(...) must be the constructor's first statement.

9. Use super.method() to explicitly call a superclass instance method.

10. Use super.field for an accessible superclass field.

11. Fields are hidden, not overridden.

12. Instance methods can be overridden.

13. Static methods are hidden rather than dynamically overridden.

14. private parent fields cannot be directly accessed by subclasses.

15. Inheritance should represent a meaningful IS-A relationship.

16. HAS-A relationships usually suggest composition.

17. Upcasting is treating a child object as a parent type.

18. Downcasting should be performed carefully.

19. @Override helps the compiler verify overriding.

20. A final class cannot be extended.

21. A final method cannot be overridden.

22. Inheritance enables many polymorphic designs.

23. Good inheritance is about behavior and contracts, not only code reuse.

24. Prefer encapsulated parent state rather than exposing representation unnecessarily.

25. Keep inheritance hierarchies simple and meaningful.
```

---

# 215. Chapter 16 Complete

You should now be comfortable with the basic inheritance model:

```text
                 Object
                   ↑
                Animal
               /     \
              /       \
            Dog       Cat
```

You should understand:

```text
class hierarchy
      ↓
extends
      ↓
inheritance
      ↓
IS-A relationship
      ↓
constructor chaining
      ↓
super
      ↓
method inheritance
      ↓
overriding preview
      ↓
polymorphism
```

The next chapter focuses on a different form of polymorphic behavior:

# Chapter 17 — Method Overloading

You will learn:

```text
✓ What method overloading is
✓ Why overloading is useful
✓ Overloading rules
✓ Same method name
✓ Different parameter lists
✓ Number of parameters
✓ Parameter types
✓ Parameter order
✓ Return type rule
✓ Why return type alone cannot overload
✓ Primitive widening and overload selection
✓ Boxing and unboxing with overloads
✓ Varargs and overloads
✓ Constructor overloading
✓ Compile-time polymorphism
✓ Ambiguous overloads
✓ null and overloaded methods
✓ static method overloading
✓ main method overloading
✓ Practical programs
✓ Exercises
✓ Output questions
✓ Interview questions
✓ Common mistakes
```
