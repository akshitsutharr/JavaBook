# Chapter 13: Constructors in Java — A Complete, Detailed Guide

## 1. Learning Objectives

After studying this chapter, you should be able to explain constructors, initialize objects, write no-argument and parameterized constructors, understand compiler-provided default constructors, overload constructors, use `this(...)` and `super(...)`, understand constructor execution order, validate object state, and avoid common constructor mistakes.

## 2. What Is a Constructor?

A **constructor** is a special member of a class used to initialize a newly created object. Imagine creating a `Student`: you may want its name and age to be set before the object is used.

```java
class Student {
    String name;
    int age;

    Student() {
        name = "Unknown";
        age = 18;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        System.out.println(s.name);
        System.out.println(s.age);
    }
}
```

Output:
```text
Unknown
18
```

The expression `new Student()` creates an object and invokes its constructor as part of the creation process. The constructor does not create an object independently; it initializes the new object's state.

Think of a constructor as the initial setup for an object, similar to writing your name on a new notebook before using it.

## 3. Constructor Syntax and Rules

```java
class ClassName {
    ClassName() {
        // Initialization code
    }
}
```

Important rules:

1. The constructor name must exactly match the class name.
2. A constructor has no return type—not even `void`.
3. It may accept parameters.
4. A class may declare multiple constructors with different parameter lists.
5. Constructors are invoked as part of object creation, not as ordinary methods on an existing object.
6. Constructors are not inherited and cannot be overridden.
7. A constructor cannot be `static`, `final`, or `abstract`.
8. It can be `public`, `protected`, package-private (no modifier), or `private`.
9. It can throw exceptions.
10. If no constructor is declared, the compiler can supply a default no-argument constructor.

A method with a similar name is not a constructor if it has a return type:

```java
class Demo {
    Demo() {
        System.out.println("Constructor");
    }

    void Demo() {
        System.out.println("This is a method, not a constructor");
    }
}
```

`Demo()` without a return type is the constructor. `void Demo()` is an ordinary method.

## 4. What Happens When You Use `new`?

Consider:

```java
Student s = new Student();
```

A useful conceptual model is:

1. The JVM ensures the class is loaded and initialized when necessary.
2. Memory for the new object is allocated.
3. Instance fields receive default values such as `0`, `false`, or `null`.
4. Instance field initializers and instance initialization blocks run in the language-defined order.
5. The constructor chain runs, including the required parent-constructor call.
6. The resulting reference is assigned to `s`.

The JVM may optimize physical implementation details, but this model is useful for learning.

Example:

```java
class Example {
    int number;
    boolean active;
    String text;

    Example() {
        System.out.println(number);
        System.out.println(active);
        System.out.println(text);
    }
}

public class Main {
    public static void main(String[] args) {
        new Example();
    }
}
```

Output:
```text
0
false
null
```

Instance fields get default values before constructor code executes. Local variables inside methods are different: Java requires them to be definitely assigned before they are read.

## 5. Types of Constructors

- **No-argument constructor:** Any constructor with an empty parameter list.
- **Parameterized constructor:** A constructor that accepts parameters.
- **Default constructor:** The no-argument constructor implicitly provided by the compiler when the class declares no constructor.
- **Overloaded constructors:** Multiple constructors in one class with different parameter lists.

The first two describe parameter lists. “Default constructor” describes who provides the constructor. “Overloading” describes a class having multiple constructors.

## 6. No-Argument Constructor

A no-argument constructor has no parameters.

```java
class Employee {
    String name;
    double salary;

    Employee() {
        name = "Not assigned";
        salary = 0.0;
    }
}

public class Main {
    public static void main(String[] args) {
        Employee e = new Employee();
        System.out.println(e.name);
        System.out.println(e.salary);
    }
}
```

Output:
```text
Not assigned
0.0
```

Use a no-argument constructor when a sensible default state exists or when a framework requires this creation style. Do not add one automatically if the object cannot be valid without required information.

## 7. The Compiler-Provided Default Constructor

Java provides a **default constructor only when the class declares no constructor**.

```java
class Book {
    String title;
    int pages;
}
```

This works:

```java
Book b = new Book();
```

The compiler supplies a no-argument constructor, conceptually similar to:

```java
Book() {
    super();
}
```

This source-like representation is conceptual; the compiler generates the relevant class-file behavior.

### Default constructor vs. no-argument constructor

A **no-argument constructor** is any constructor with no parameters, whether written by you or supplied by the compiler.

A **default constructor** specifically means the no-argument constructor implicitly supplied by the compiler because the class declared no constructor.

For example:

```java
class Book {
    Book() {
        System.out.println("Book created");
    }
}
```

This is a programmer-written no-argument constructor, not the compiler-provided default constructor.

### What if you declare a parameterized constructor?

```java
class Book {
    String title;

    Book(String title) {
        this.title = title;
    }
}
```

This compiles:

```java
Book b = new Book("Java Basics");
```

But `new Book()` does not compile unless a no-argument constructor is explicitly added. Once you declare any constructor, the compiler does not automatically add the default constructor.

If both forms are needed:

```java
class Book {
    String title;

    Book() {
        title = "Untitled";
    }

    Book(String title) {
        this.title = title;
    }
}
```

## 8. Parameterized Constructor

A parameterized constructor accepts values from the caller.

```java
class Student {
    String name;
    int age;

    Student(String studentName, int studentAge) {
        name = studentName;
        age = studentAge;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Riya", 20);
        Student s2 = new Student("Arjun", 22);

        System.out.println(s1.name + " - " + s1.age);
        System.out.println(s2.name + " - " + s2.age);
    }
}
```

Output:
```text
Riya - 20
Arjun - 22
```

Each call creates a separate object initialized with the supplied values. Parameterized constructors can prevent objects from remaining incomplete after creation. When combined with validation, they can reject invalid starting state.

## 9. Parameters and Arguments

In this constructor:

```java
Student(String nameValue, int ageValue) {
    // ...
}
```

`nameValue` and `ageValue` are **parameters**. In `new Student("Riya", 20)`, `"Riya"` and `20` are **arguments**.

Java passes arguments by value. When an argument is an object reference, the copied value is the reference itself.

Be careful with mutable arrays and objects:

```java
class Team {
    String[] members;

    Team(String[] inputMembers) {
        members = inputMembers;
    }
}
```

Here, `members` and `inputMembers` refer to the same array. If the caller changes the array, the team's data changes too. To protect internal state, copy the array:

```java
class Team {
    private final String[] members;

    Team(String[] inputMembers) {
        members = inputMembers.clone();
    }
}
```

Defensive copying is useful when a class must protect its internal state.

## 10. Constructor Overloading

**Constructor overloading** means declaring multiple constructors in one class with different parameter lists.

```java
class Box {
    int length;
    int width;
    int height;

    Box() {
        length = 1;
        width = 1;
        height = 1;
    }

    Box(int side) {
        length = side;
        width = side;
        height = side;
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
        Box b1 = new Box();
        Box b2 = new Box(4);
        Box b3 = new Box(2, 3, 5);

        System.out.println(b1.volume());
        System.out.println(b2.volume());
        System.out.println(b3.volume());
    }
}
```

Output:
```text
1
64
30
```

The compiler chooses a constructor based on the number, types, and applicability of the arguments.

These signatures are different: `Student()`, `Student(String name)`, `Student(String name, int age)`, and `Student(int age, String name)`.

These are not different signatures:

```java
Student(String name, int age)
Student(String otherName, int otherAge)
```

Parameter names do not distinguish overloads. The parameter types and their order do. Constructors cannot be overloaded only by changing a return type; constructors have no return type.

## 11. Constructor Chaining with `this(...)`

One constructor can call another constructor in the same class using `this(...)`. This helps avoid duplicated initialization logic.

```java
class Employee {
    String name;
    double salary;

    Employee() {
        this("Not assigned", 0.0);
    }

    Employee(String name) {
        this(name, 0.0);
    }

    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
}

public class Main {
    public static void main(String[] args) {
        Employee e1 = new Employee();
        Employee e2 = new Employee("Riya");
        Employee e3 = new Employee("Arjun", 55000);

        System.out.println(e1.name + " " + e1.salary);
        System.out.println(e2.name + " " + e2.salary);
        System.out.println(e3.name + " " + e3.salary);
    }
}
```

Output:
```text
Not assigned 0.0
Riya 0.0
Arjun 55000.0
```

`this(...)` invokes another constructor in the same class. In classic Java syntax, an explicit constructor invocation must be the first statement. Java 25 and later introduce flexible constructor bodies with specific rules; for portable beginner code, keep `this(...)` first.

A constructor must not create a circular chain. For example, a constructor cannot call itself directly:

```java
class Demo {
    Demo() {
        // this(); // Compile-time error: recursive constructor invocation
    }
}
```

A common design is to have simple constructors delegate to one complete constructor that performs validation and field assignments.

## 12. Calling a Parent Constructor with `super(...)`

A subclass constructor uses `super(...)` to invoke a constructor in its direct superclass.

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
        System.out.println("Person constructor");
    }
}

class Student extends Person {
    int rollNumber;

    Student(String name, int rollNumber) {
        super(name);
        this.rollNumber = rollNumber;
        System.out.println("Student constructor");
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Riya", 101);
        System.out.println(s.name);
        System.out.println(s.rollNumber);
    }
}
```

Output:
```text
Person constructor
Student constructor
Riya
101
```

The `Person` class owns the `name` field, so its constructor initializes that part of the object. The `Student` constructor passes the name to the parent and then initializes the roll number.

If no explicit constructor invocation is provided, Java normally inserts an implicit no-argument superclass constructor invocation where the language rules allow it. The parent must have an accessible no-argument constructor. If it does not, the subclass must explicitly call an accessible parent constructor.

```java
class Person {
    Person(String name) {}
}

class Student extends Person {
    Student() {
        super("Unknown");
    }
}
```

Without `super("Unknown")`, Java would try to call `Person()` implicitly, but no such constructor exists.

### `this(...)` vs. `super(...)`

| Feature | `this(...)` | `super(...)` |
|---|---|---|
| Calls | Another constructor in the same class | A constructor in the direct superclass |
| Purpose | Reuse initialization logic | Initialize the superclass portion |
| Can both be separate calls in one constructor in classic syntax? | No | No |

A constructor can delegate using `this(...)`; the delegated constructor can ultimately invoke `super(...)`.

## 13. Constructor Execution Order in Inheritance

When an object of a subclass is created, the superclass portion must be initialized too.

```java
class A {
    A() {
        System.out.println("A constructor");
    }
}

class B extends A {
    B() {
        System.out.println("B constructor");
    }
}

class C extends B {
    C() {
        System.out.println("C constructor");
    }
}

public class Main {
    public static void main(String[] args) {
        new C();
    }
}
```

Output:
```text
A constructor
B constructor
C constructor
```

The constructor chain starts at the top of the inheritance hierarchy and then returns down toward the most-derived class.

### Field initializers and constructor bodies

For a simple class hierarchy, the useful order is:

1. Memory is allocated and instance fields receive default values.
2. The superclass constructor chain is entered.
3. Each class's instance field initializers and instance initialization blocks run in their defined order as part of that class's initialization.
4. That class's constructor body continues after its superclass constructor completes.
5. Initialization proceeds down the chain until the most-derived constructor finishes.

Example:

```java
class Parent {
    int parentValue = print("Parent field initializer");

    Parent() {
        System.out.println("Parent constructor body");
    }

    static int print(String message) {
        System.out.println(message);
        return 1;
    }
}

class Child extends Parent {
    int childValue = print("Child field initializer");

    Child() {
        System.out.println("Child constructor body");
    }
}

public class Main {
    public static void main(String[] args) {
        new Child();
    }
}
```

Output:
```text
Parent field initializer
Parent constructor body
Child field initializer
Child constructor body
```

### Avoid calling overridable methods from constructors

A parent's constructor can accidentally call an overridden method in the child before the child's fields are initialized.

```java
class Parent {
    Parent() {
        display();
    }

    void display() {
        System.out.println("Parent display");
    }
}

class Child extends Parent {
    String message = "Ready";

    @Override
    void display() {
        System.out.println(message);
    }
}
```

When `new Child()` is created, the parent's constructor calls the child's override before the child's field initializer assigns `"Ready"`. The output can therefore be `null`.

Avoid calling overridable methods during construction unless the design carefully accounts for this. Prefer private or final helper methods, or wait until the object is fully initialized.

## 14. Constructor Access Modifiers

Constructors may have different access levels.

- **Public:** Accessible from code that can access the class.
- **Package-private:** No modifier is written; accessible within the same package, subject to other rules.
- **Protected:** Accessible within the same package and through applicable subclass-access rules outside the package.
- **Private:** Accessible from within the declaring class and useful for controlling instance creation.

```java
class Utility {
    private Utility() {}

    static int square(int number) {
        return number * number;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Utility.square(5));
    }
}
```

Output:
```text
25
```

Outside code cannot create an ordinary instance with `new Utility()` because the constructor is private. Private constructors are useful for utility classes and controlled-creation designs, but they are not necessary for every class.

## 15. Static Factory Methods and Controlled Creation

A static factory method is an ordinary static method that returns an object. It is not a constructor, but it can call one internally.

```java
class Temperature {
    private final double celsius;

    private Temperature(double celsius) {
        if (celsius < -273.15) {
            throw new IllegalArgumentException("Below absolute zero");
        }
        this.celsius = celsius;
    }

    public static Temperature fromCelsius(double celsius) {
        return new Temperature(celsius);
    }

    public double getCelsius() {
        return celsius;
    }
}

public class Main {
    public static void main(String[] args) {
        Temperature temperature = Temperature.fromCelsius(25);
        System.out.println(temperature.getCelsius());
    }
}
```

Output:
```text
25.0
```

The descriptive method `fromCelsius()` controls object creation and validates the value. Static factory methods are useful when creation needs a meaningful name or the class needs more control over returned instances.

## 16. Can Constructors Be Inherited, Overridden, or Called Like Methods?

**Constructors are not inherited.** A subclass declares its own constructors and calls a parent constructor through `super(...)` when needed.

**Constructors cannot be overridden.** Overriding applies to inherited instance methods, and constructors are not inherited.

**Constructors are not ordinary methods.** This is invalid:

```java
Student s = new Student();
// s.Student(); // Invalid: constructors cannot be called this way
```

If an existing object needs reconfiguration, use an ordinary method designed for that purpose, or create a new object if that better preserves the object's invariants.

## 17. Can a Constructor Be `static`, `final`, or `abstract`?

No.

- `static` members belong to the class rather than an individual instance; constructors initialize instances.
- `final` prevents certain kinds of overriding or reassignment, but constructors are not overridden.
- `abstract` means an implementation is deferred to a subclass; constructors are used as part of creating instances of concrete classes.

Constructors can be `public`, `protected`, package-private, or `private`, and they can declare exceptions.

## 18. Constructors and Exceptions

A constructor can validate input and throw an exception if the requested object would be invalid.

```java
class BankAccount {
    private final String accountHolder;
    private double balance;

    BankAccount(String accountHolder, double initialBalance) {
        if (accountHolder == null || accountHolder.isBlank()) {
            throw new IllegalArgumentException("Account holder is required");
        }
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }

        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("Riya", 1000);
        System.out.println(account.getAccountHolder());
        System.out.println(account.getBalance());
    }
}
```

Output:
```text
Riya
1000.0
```

If the caller provides a negative initial balance, the constructor throws `IllegalArgumentException` instead of successfully creating an invalid account.

A constructor can also declare a checked exception:

```java
import java.io.IOException;

class Config {
    Config(String path) throws IOException {
        // A real constructor might read configuration from a file.
    }
}
```

The caller must handle or declare the checked exception. Avoid unnecessary I/O or complicated external work in constructors; consider a factory method or separate initialization operation for substantial external work.

## 19. Constructor and Field Initialization: Best Practices

- Initialize fields to meaningful values.
- Use `final` for fields that should not be reassigned after construction.
- Validate required strings, numeric ranges, and null values before storing them.
- Use `this(...)` when constructor chaining reduces duplication and improves clarity.
- Avoid publishing `this` to another thread or callback before construction completes.
- Avoid calling overridable methods from constructors.
- Keep constructors focused on establishing valid initial state.
- Consider factory methods or services for substantial I/O, network calls, or complex workflows.
- Remember that `final` prevents reference reassignment but does not make a referenced array or collection immutable.

## 20. Practical Program: Student with Multiple Constructors

```java
class Student {
    private final String name;
    private final int age;
    private final String course;

    Student() {
        this("Unknown", 18, "Not assigned");
    }

    Student(String name, int age) {
        this(name, age, "Not assigned");
    }

    Student(String name, int age, String course) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (age <= 0) {
            throw new IllegalArgumentException("Age must be positive");
        }
        if (course == null || course.isBlank()) {
            throw new IllegalArgumentException("Course is required");
        }

        this.name = name;
        this.age = age;
        this.course = course;
    }

    void display() {
        System.out.println(name + " | " + age + " | " + course);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student("Riya", 20);
        Student s3 = new Student("Arjun", 21, "Computer Engineering");

        s1.display();
        s2.display();
        s3.display();
    }
}
```

Output:
```text
Unknown | 18 | Not assigned
Riya | 20 | Not assigned
Arjun | 21 | Computer Engineering
```

This demonstrates three overloaded constructors, delegation through `this(...)`, validation in one place, and `private final` fields.

## 21. Practical Program: Constructor Chaining in Inheritance

```java
class Person {
    private final String name;

    Person(String name) {
        this.name = name;
        System.out.println("Person initialized");
    }

    String getName() {
        return name;
    }
}

class Employee extends Person {
    private final int employeeId;

    Employee(String name, int employeeId) {
        super(name);
        this.employeeId = employeeId;
        System.out.println("Employee initialized");
    }

    void display() {
        System.out.println(getName() + " | " + employeeId);
    }
}

public class Main {
    public static void main(String[] args) {
        Employee employee = new Employee("Riya", 501);
        employee.display();
    }
}
```

Output:
```text
Person initialized
Employee initialized
Riya | 501
```

The parent constructor initializes the name before the child constructor initializes the employee ID.

## 22. Practical Program: Constructor Validation

```java
class Rectangle {
    private final double width;
    private final double height;

    Rectangle(double width, double height) {
        if (width <= 0 || height <= 0) {
            throw new IllegalArgumentException(
                    "Width and height must be positive");
        }

        this.width = width;
        this.height = height;
    }

    double area() {
        return width * height;
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rectangle = new Rectangle(5, 3);
        System.out.println("Area: " + rectangle.area());
    }
}
```

Output:
```text
Area: 15.0
```

If either dimension is zero or negative, the constructor rejects the values. This maintains the invariant that a successfully constructed rectangle has positive dimensions.

## 23. Common Constructor Mistakes

1. Adding `void` before a constructor name. `void Student()` is a method.
2. Assuming Java always supplies a no-argument constructor. It does so only if no constructor is declared.
3. Forgetting the parent constructor. If the parent has no accessible no-argument constructor, the subclass must call an appropriate parent constructor.
4. Writing `this(...)` after another statement. For portable beginner code, keep it first.
5. Trying to call `this(...)` and `super(...)` as two separate constructor invocations in one constructor.
6. Creating a recursive or circular constructor chain.
7. Repeating initialization logic instead of delegating to a main constructor.
8. Confusing parameters with fields. Use `this.field = parameter` when names match.
9. Not validating required input.
10. Assuming `final` makes an array or collection immutable.
11. Calling overridable methods from a constructor before subclass initialization is complete.
12. Doing too much work in a constructor.
13. Trying to override a constructor.
14. Trying to call a constructor on an already-created object.

## 24. Interview Questions and Answers

**Q1. What is a constructor?**  
A special class member used to initialize an object during creation. Its name matches the class name and it has no return type.

**Q2. How is a constructor different from a method?**  
A constructor initializes a new object and has no return type. A method defines behavior and can return a value.

**Q3. What is a default constructor?**  
The no-argument constructor supplied by the compiler when the class declares no constructor.

**Q4. What is a no-argument constructor?**  
Any constructor with no parameters, whether written by the programmer or supplied by the compiler.

**Q5. What happens if only a parameterized constructor is declared?**  
The compiler does not add a default no-argument constructor. `new ClassName()` fails unless an accessible no-argument constructor is declared.

**Q6. What is constructor overloading?**  
Declaring multiple constructors with different parameter lists in one class.

**Q7. Can constructors be overloaded by changing only parameter names?**  
No. Parameter names do not distinguish signatures; parameter types and order do.

**Q8. What is `this()`?**  
It invokes another constructor in the same class to reuse initialization logic.

**Q9. What is `super()`?**  
It invokes a constructor in the direct superclass.

**Q10. Can `this()` and `super()` both be called directly in one constructor?**  
Not as separate constructor-invocation statements in classic Java syntax. A constructor may call `this(...)`, and the delegated constructor can ultimately call `super(...)`.

**Q11. Are constructors inherited?**  
No. A subclass declares its own constructors and invokes a parent constructor as needed.

**Q12. Can constructors be overridden?**  
No. Constructors are not inherited, and overriding applies to inherited instance methods.

**Q13. Can a constructor be private?**  
Yes. It can control object creation and is common in utility classes or designs that expose static factory methods.

**Q14. Can a constructor be `static`, `final`, or `abstract`?**  
No. Those modifiers do not apply to constructors.

**Q15. Can a constructor throw an exception?**  
Yes. It can throw unchecked exceptions and declare checked exceptions.

**Q16. What is constructor chaining?**  
One constructor invokes another constructor in the same class or a parent class, establishing object state in a defined order.

**Q17. What is the constructor order in inheritance?**  
Superclass construction occurs before subclass construction. In a simple chain, parent constructor bodies execute before child constructor bodies.

**Q18. Why avoid calling overridable methods from constructors?**  
A child override may run before the child's field initializers and constructor body have completed.

**Q19. What happens if a class declares no constructor?**  
The compiler provides a default no-argument constructor, provided the class declaration otherwise permits it.

**Q20. Why validate inside a constructor?**  
To prevent successful creation of objects with invalid initial state and maintain class invariants.

## 25. Practice Exercises

1. Create a `Book` class with a no-argument constructor that sets a default title.
2. Create an `Employee` class with a parameterized constructor for name, ID, and salary.
3. Overload a `Rectangle` constructor to accept no dimensions, one square side, or separate width and height.
4. Explain the difference between a no-argument constructor and a compiler-provided default constructor.
5. Write a class with only a parameterized constructor and predict whether `new ClassName()` compiles.
6. Add an explicit no-argument constructor to the previous class and test again.
7. Use `this(...)` to make two simple constructors delegate to one complete constructor.
8. Create a `Person` parent class and a `Student` subclass. Initialize the parent state using `super(...)`.
9. Create a three-level inheritance chain and print a message from each constructor to verify the order.
10. Validate that a bank account's initial balance is not negative.
11. Create a private constructor and a public static factory method.
12. Demonstrate how assigning an input array directly can expose internal state, then fix it with a defensive copy.
13. Explain why constructors cannot be overridden.
14. Demonstrate why a constructor should not call an overridable method.
15. Write a constructor that declares a checked exception and show how the caller handles it.

**Challenge — Design a valid `BankAccount`:** Create a class with an account number, account-holder name, and initial balance. Reject a blank name and negative balance. Add deposit and withdrawal methods that validate their arguments and ensure the balance never becomes negative. Explain which rules belong in the constructor and which belong in ordinary methods.

## 26. Chapter Summary

A constructor initializes an object's starting state. It has the same name as the class and no return type. A class can have a no-argument constructor, parameterized constructors, or multiple overloaded constructors.

The compiler provides a default no-argument constructor only when the class declares no constructor. Once you write any constructor, add a no-argument constructor explicitly if you still need one. Use constructor overloading to provide sensible creation options and `this(...)` to reuse initialization logic. In inheritance, `super(...)` initializes the parent-class portion of the object, and superclass construction occurs before subclass construction.

Good constructors validate required values, establish a valid state, and avoid unnecessary work. Constructors are not inherited or overridden, cannot be `static`, `final`, or `abstract`, and cannot be called like ordinary methods on an existing object.

**Next chapter:** Chapter 14 — The `this` Keyword and `static` Members.
