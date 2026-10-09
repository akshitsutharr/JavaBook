# Chapter 24 — Packages & Access Modifiers

> **Java Master Course — Chapter 24 of 50**
>
> In earlier chapters, you learned how to create classes, objects, constructors, interfaces, and well-designed OOP systems. Now learn how Java organizes classes into packages and controls which parts of a program can access them.
>
> The two main topics in this chapter are **packages** and **access modifiers**.

## 1. What You Will Learn

```text
✓ What a package is and why packages are useful
✓ Built-in and user-defined packages
✓ The package declaration
✓ Importing classes and fully qualified names
✓ Wildcard and static imports
✓ Package naming conventions and folder structure
✓ Compiling and running packaged classes
✓ public, protected, package-private, and private
✓ Class-level and member-level access
✓ protected access across packages
✓ Encapsulation and access control
✓ Constructor visibility and private constructors
✓ Nested classes and access
✓ Imports vs access permissions
✓ Common mistakes, examples, exercises, and interview questions
```

## 2. What Is a Package?

A **package** is a named group used to organize related Java types, such as classes, interfaces, enums, and annotation types.

Imagine a college management application with hundreds of classes. Packages can group related code:

```text
college
 ├── student
 ├── teacher
 ├── course
 ├── payment
 └── service
```

Packages help organize code, reduce naming conflicts, and provide an important boundary for access control.

## 3. Why Do We Need Packages?

Packages are useful for:

- **Organization:** related classes can live together.
- **Name conflicts:** two packages can contain types with the same simple name.
- **Access control:** package-private members are accessible within their package.
- **Maintenance:** a project is easier to navigate when types are grouped logically.

For example, `com.shop.model.Product` and `com.shop.payment.Product` may both be named `Product`, but their fully qualified names differ.

## 4. Built-in Packages

Java provides many packages through the Java platform.

| Package | Common contents |
|---|---|
| `java.lang` | `String`, `System`, `Math`, `Object`, `Integer` |
| `java.util` | Collections, `Scanner`, `Random`, `Optional` |
| `java.io` | Traditional input/output classes |
| `java.nio.file` | Modern file and path APIs |
| `java.time` | Date and time API |
| `java.net` | Networking APIs |
| `java.math` | `BigInteger`, `BigDecimal` |

Example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = input.nextLine();
        System.out.println("Hello, " + name);
        input.close();
    }
}
```

`Scanner` belongs to `java.util`, so we import it.

## 5. The `java.lang` Package

Many `java.lang` types are available without an import:

```java
public class Main {
    public static void main(String[] args) {
        String name = "Aman";
        int result = Math.max(10, 20);

        System.out.println(name);
        System.out.println(result);
    }
}
```

No import is needed for `String`, `Math`, or `System`. This does **not** mean every package is imported automatically.

## 6. User-Defined Packages

A user-defined package is one you declare for your own code:

```java
package com.example.school;

public class Student {
    public void display() {
        System.out.println("Student class");
    }
}
```

The first line declares the package name:

```text
com.example.school
```

In an ordinary Java source file, the package declaration appears before imports and type declarations.

Typical source structure:

```java
package com.example.utils;

import java.util.List;

public class Calculator {
    // class body
}
```

A source file has only one package declaration, though it may contain multiple top-level types.

## 7. Package Names and Folder Structure

A common convention is to use lowercase package names. A conventional directory layout is:

```text
src/
└── com/
    └── example/
        └── school/
            └── Student.java
```

The package `com.example.school` conventionally maps to `com/example/school/`.

The compiler and runtime use package names and classpath/module-path rules. Do not confuse a package name with a literal filesystem path, even though the folder structure normally mirrors it.

## 8. Create a Package

Suppose the project contains:

```text
PackageDemo/
└── src/
    └── com/
        └── example/
            └── school/
                └── Student.java
```

`Student.java`:

```java
package com.example.school;

public class Student {
    public void display() {
        System.out.println("Hello from Student");
    }
}
```

The declaration identifies the type's package.

## 9. Importing a Class

Suppose another class wants to use `Student`:

```text
src/
└── com/
    └── example/
        ├── school/
        │   └── Student.java
        └── app/
            └── Main.java
```

`Main.java`:

```java
package com.example.app;

import com.example.school.Student;

public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        student.display();
    }
}
```

Output:

```text
Hello from Student
```

The import allows the simple name `Student` to be used in this source file.

## 10. What Does `import` Actually Do?

An import helps the compiler resolve a type or static member by its simple name. It does **not**:

- copy source code into your file;
- create an object;
- grant access to private members;
- install a missing library.

For example, `import com.example.school.Student;` helps Java resolve `Student`. Normal access rules still apply.

## 11. Fully Qualified Names

A fully qualified name identifies a type using its package and type name, for example:

```text
com.example.school.Student
```

You can use it without an import:

```java
public class Main {
    public static void main(String[] args) {
        com.example.school.Student student =
            new com.example.school.Student();

        student.display();
    }
}
```

This is valid, but it can be verbose.

## 12. When Fully Qualified Names Are Useful

They help when two packages contain types with the same simple name.

For example:

```java
java.util.Date
java.sql.Date
```

You can write:

```java
java.util.Date utilDate;
java.sql.Date sqlDate;
```

This removes ambiguity.

## 13. Importing Multiple Classes

You can import several types from one package:

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
```

Then:

```java
List<String> names = new ArrayList<>();
Map<Integer, String> students = new HashMap<>();
```

Explicit imports can make it clear which types a file uses.

## 14. Wildcard Imports

A wildcard import uses `*`:

```java
import java.util.*;
```

It allows accessible types in the `java.util` package to be referred to by simple names:

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Aman");
        names.add("Riya");

        System.out.println(names);
    }
}
```

Output:

```text
[Aman, Riya]
```

### Does `import java.util.*;` import subpackages?

No. It does not import `java.util.concurrent`, `java.util.function`, or `java.util.stream`. Each is a separate package.

### Does a wildcard import slow the program?

No. It is a compile-time name-resolution convenience. It does not mean Java loads every class in that package into memory.

## 15. Name Conflicts in Imports

If two packages contain a type named `Date`, you generally cannot use both through the same simple name unambiguously. Use one import and qualify the other:

```java
import java.util.Date;

public class Main {
    java.util.Date first;
    java.sql.Date second;
}
```

## 16. Static Imports

A static import allows accessible static members to be used without repeatedly writing the declaring type's name:

```java
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;

public class Main {
    public static void main(String[] args) {
        System.out.println(PI);
        System.out.println(sqrt(25));
    }
}
```

Output:

```text
3.141592653589793
5.0
```

Without static imports, you would write `Math.PI` and `Math.sqrt(25)`.

You can also use a static wildcard import:

```java
import static java.lang.Math.*;

double result = sqrt(pow(3, 2) + pow(4, 2));
```

Use static imports carefully. If they make it unclear where a member comes from, prefer the explicit type name.

## 17. Package Naming Conventions

Common conventions include lowercase names, meaningful names based on the domain or responsibility, and reverse-domain style for organization-owned packages.

Examples:

```text
com.company.project
org.example.library
institute.department.application
```

Reverse-domain naming helps reduce collisions. These are conventions, not a requirement that every package must use a real domain.

## 18. The Unnamed (Default) Package

If you omit a package declaration, a class belongs to the unnamed package:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Unnamed package");
    }
}
```

This is common in small learning examples. Larger applications should normally use named packages. Types in the unnamed package cannot be imported normally by types in named packages, which is one reason to avoid it in real projects.

## 19. What Are Access Modifiers?

Access modifiers control where a class or member can be accessed.

The four member access levels are:

```text
public
protected
package-private (no keyword)
private
```

Example:

```java
public class Student {
    public String name;
    protected int semester;
    String department;
    private double marks;
}
```

Each member has different visibility.

## 20. Access Levels — Quick Comparison

For ordinary class members, this table summarizes the rules:

| Access level | Same class | Same package | Subclass in another package | Unrelated class in another package |
|---|---:|---:|---:|---:|
| `public` | Yes | Yes | Yes | Yes, if the declaring type is accessible |
| `protected` | Yes | Yes | Yes, under protected-access rules | No |
| package-private | Yes | Yes | No | No |
| `private` | Yes | No, except permitted nestmate access | No, except permitted nestmate access | No |

The cross-package rules for `protected` have an important detail, explained below.

## 21. `public`

A public member can be accessed wherever the declaring type itself is accessible and other Java rules permit it.

`Student.java`:

```java
package com.example.school;

public class Student {
    public void display() {
        System.out.println("Hello");
    }
}
```

Another package can import and use it:

```java
package com.example.app;

import com.example.school.Student;

public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        student.display();
    }
}
```

Output:

```text
Hello
```

## 22. `private`

A private member is accessible within its declaring class. Java also permits certain private access between related nested types, but ordinary unrelated classes cannot directly access it.

```java
class BankAccount {
    private double balance = 1000;

    public double getBalance() {
        return balance;
    }
}
```

Outside the class, this is a compile-time error:

```java
BankAccount account = new BankAccount();
// System.out.println(account.balance);
```

Instead:

```java
System.out.println(account.getBalance());
```

Output:

```text
1000.0
```

### Why is `private` important?

It protects internal state. If `balance` were public, outside code could do this:

```java
account.balance = -5000;
```

A safer design keeps the field private and exposes controlled operations:

```java
class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive"
            );
        }
        balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

This connects to encapsulation from Chapter 15.

## 23. Package-Private Access

If no access modifier is written, the member is package-private:

```java
package com.example.school;

class StudentRecord {
    String name = "Aman";

    void display() {
        System.out.println(name);
    }
}
```

Here, `StudentRecord`, `name`, and `display()` are package-private. Suitable code in the same package can access them. Code in another package cannot access them merely by importing them; in this example, the top-level class itself is not public.

Package-private access is useful for implementation details shared inside one package.

## 24. `protected`

The `protected` modifier is available for class members. It allows access from the same package and qualifying subclass access from other packages.

`Animal.java`:

```java
package animals;

public class Animal {
    protected void makeSound() {
        System.out.println("Animal sound");
    }
}
```

`Dog.java`:

```java
package pets;

import animals.Animal;

public class Dog extends Animal {
    public void bark() {
        makeSound();
    }
}
```

The `Dog` subclass can call the inherited protected method.

### Protected access across packages — important detail

In a subclass in another package, protected access is not unrestricted permission to access the member through any arbitrary parent-class object.

This is valid:

```java
public class Dog extends Animal {
    public void bark() {
        this.makeSound();
    }
}
```

But this is not generally allowed from that subclass:

```java
public void test(Animal animal) {
    // animal.makeSound(); // Compile-time error
}
```

The expression's type is `Animal`, not `Dog` or a subtype of `Dog`. Java's cross-package protected rule limits access in this way.

Remember:

```text
same package → protected member is accessible
different package → qualifying subclass access only
unrelated external class → no protected access
```

## 25. Access Modifiers for Top-Level Classes

For ordinary top-level classes, the common choices are:

```text
public
package-private
```

For example:

```java
public class Student {
}
```

or:

```java
class StudentRecord {
}
```

A top-level class cannot be declared `private` or `protected`. Nested classes can use additional access modifiers.

## 26. One Public Top-Level Class per Source File

Under the standard file-based Java compilation convention, a public top-level class is placed in a source file with the matching name:

```text
Student.java
```

```java
public class Student {
}
```

A source file can also contain package-private top-level types, but conventional Java projects usually keep each public top-level type in its own matching file.

## 27. Access Modifiers for Fields and Methods

Fields can use all four member access levels:

```java
public class Student {
    public String name;
    protected int semester;
    String department;
    private double marks;
}
```

Methods can use the same levels:

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    protected int multiply(int a, int b) {
        return a * b;
    }

    int subtract(int a, int b) {
        return a - b;
    }

    private int divide(int a, int b) {
        return a / b;
    }
}
```

In well-encapsulated classes, fields are commonly private and the public API exposes meaningful behavior.

## 28. Access Modifiers for Constructors

Constructors can be public, protected, package-private, or private. Constructor visibility controls where the constructor can be used to create objects.

```java
public class Student {
    public Student() {
    }
}
```

Package-private constructor:

```java
public class Student {
    Student() {
    }
}
```

Private constructor:

```java
public class Utility {
    private Utility() {
    }
}
```

## 29. Why Use a Private Constructor?

A private constructor can prevent ordinary outside code from directly constructing an object.

```java
public final class MathHelper {
    private MathHelper() {
    }

    public static int square(int number) {
        return number * number;
    }
}
```

Usage:

```java
System.out.println(MathHelper.square(5));
```

Output:

```text
25
```

Private constructors are common in utility classes and some controlled-construction designs.

## 30. Access Modifiers and Encapsulation

Encapsulation combines state hiding with controlled operations:

```java
public class Student {
    private String name;

    public Student(String name) {
        setName(name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException(
                "Name cannot be empty"
            );
        }
        this.name = name;
    }
}
```

Outside code cannot access `name` directly, but it can use the public methods.

## 31. Access Is Not the Same as Inheritance

Inheritance asks whether a child type inherits behavior or members from a parent. Access control asks whether a particular piece of code may legally access a member.

A subclass does not get direct access to every parent member:

```java
class Parent {
    private int value = 10;
}

class Child extends Parent {
    void display() {
        // System.out.println(value); // Error
    }
}
```

The field belongs to the parent's implementation, but it is not directly accessible to the child.

The parent can expose controlled behavior:

```java
class Parent {
    private int value = 10;

    protected int getValue() {
        return value;
    }
}

class Child extends Parent {
    void display() {
        System.out.println(getValue());
    }
}
```

Output:

```text
10
```

## 32. Access Modifiers and Overriding

An overriding instance method cannot reduce the accessibility of the method it overrides.

Valid:

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

Invalid:

```java
class Parent {
    public void show() {
    }
}

class Child extends Parent {
    // @Override
    // protected void show() {}
}
```

A public method cannot be overridden with a protected method. An override may widen access, such as from `protected` to `public`.

## 33. Access Modifiers and Interfaces

Methods declared in an interface without a body are implicitly `public abstract`. Implementing classes must implement them as public methods.

```java
interface Printable {
    void print();
}

class Document implements Printable {
    @Override
    public void print() {
        System.out.println("Printing document");
    }
}
```

This is invalid because the implementation would not be public:

```java
class Document implements Printable {
    // void print() {}
}
```

Modern interfaces can also contain `default`, `static`, and `private` methods, with different rules.

## 34. Access Modifiers and `static`

Access modifiers control visibility. `static` indicates a class-level member rather than an instance member. These are different ideas.

```java
public class Counter {
    private static int count;

    public static int getCount() {
        return count;
    }
}
```

Here, `private` and `public` control access, while `static` describes the members' relationship to the class.

## 35. Access Modifiers and `final`

`final` is not an access modifier. It has different meanings depending on where it is used:

```text
final variable → cannot be reassigned
final method   → cannot be overridden
final class    → cannot be subclassed
```

Example:

```java
public final class Constants {
    public static final int MAX_USERS = 100;

    private Constants() {
    }
}
```

## 36. Nested Classes and Access

A nested class is declared inside another class:

```java
public class Outer {
    private int value = 10;

    private class Inner {
        void display() {
            System.out.println(value);
        }
    }
}
```

Nested classes can use access modifiers such as `private` and `protected`. Java's nested-class/nestmate rules permit certain private access between related nested types.

Use nested classes when the type is closely connected to its enclosing type, not merely to avoid creating another file.

## 37. Practical Access-Control Example

`src/com/example/accounts/BankAccount.java`:

```java
package com.example.accounts;

public class BankAccount {
    private double balance;

    public BankAccount(double openingBalance) {
        if (openingBalance < 0) {
            throw new IllegalArgumentException(
                "Opening balance cannot be negative"
            );
        }
        balance = openingBalance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive"
            );
        }
        balance += amount;
    }

    public double getBalance() {
        return balance;
    }

    void internalAudit() {
        System.out.println("Audit balance: " + balance);
    }
}
```

This design uses:

```text
public class
→ usable from other packages

private balance
→ internal state is hidden

public deposit()
→ controlled state change

public getBalance()
→ controlled read access

package-private internalAudit()
→ available only within the package
```

`src/com/example/app/Main.java`:

```java
package com.example.app;

import com.example.accounts.BankAccount;

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(500);
        account.deposit(200);

        System.out.println(account.getBalance());

        // account.balance = 9000; // Compile-time error
        // account.internalAudit(); // Compile-time error
    }
}
```

Output:

```text
700.0
```

## 38. Compiling and Running Packaged Classes

Assume this structure:

```text
project/
└── src/
    └── com/
        └── example/
            ├── accounts/
            │   └── BankAccount.java
            └── app/
                └── Main.java
```

From the `project` directory, compile with:

```bash
javac -d out src/com/example/accounts/BankAccount.java src/com/example/app/Main.java
```

The `-d out` option places generated class files in `out`, creating package directories as needed.

Run the class using its fully qualified name:

```bash
java -cp out com.example.app.Main
```

Expected output:

```text
700.0
```

The classpath points Java to the root directory containing the package hierarchy.

In IntelliJ IDEA, Eclipse, or VS Code, configure the source folder and package declarations correctly; the IDE will usually handle compilation and classpath setup.

## 39. Imports Do Not Override Visibility

Suppose:

```java
package com.example.data;

public class Data {
    private void secret() {
    }
}
```

Another class imports it:

```java
import com.example.data.Data;

public class Main {
    public static void main(String[] args) {
        Data data = new Data();
        // data.secret(); // Compile-time error
    }
}
```

An import helps Java find the type. It does not grant access to private or package-private members.

## 40. Practical Example — Same Package

`Student.java`:

```java
package com.example.school;

public class Student {
    String name = "Aman";

    void displayName() {
        System.out.println(name);
    }
}
```

`SchoolApp.java`:

```java
package com.example.school;

public class SchoolApp {
    public static void main(String[] args) {
        Student student = new Student();
        student.displayName();
    }
}
```

Output:

```text
Aman
```

The package-private field and method are accessible because both classes belong to the same package.

## 41. Practical Example — Public API, Private Helpers

```java
package com.example.payment;

public class PaymentService {
    public void pay(double amount) {
        validate(amount);
        process(amount);
    }

    private void validate(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive"
            );
        }
    }

    private void process(double amount) {
        System.out.println("Processing payment: " + amount);
    }
}
```

Callers use:

```java
PaymentService service = new PaymentService();
service.pay(500);
```

Output:

```text
Processing payment: 500.0
```

Callers do not directly invoke the private helper methods.

## 42. Practical Example — Private Constructor and Factory Method

```java
public class User {
    private final String username;

    private User(String username) {
        this.username = username;
    }

    public static User create(String username) {
        if (username == null || username.isBlank()) {
            throw new IllegalArgumentException(
                "Username is required"
            );
        }

        return new User(username);
    }

    public String getUsername() {
        return username;
    }
}
```

Usage:

```java
User user = User.create("aman");
System.out.println(user.getUsername());
```

Output:

```text
aman
```

Callers use the public factory method because the constructor is private.

## 43. Example Application Package Structure

One possible project structure is:

```text
com.example.shop
├── app
│   └── Main
├── model
│   ├── Product
│   └── Order
├── service
│   └── OrderService
├── repository
│   └── OrderRepository
└── payment
    ├── Payment
    └── CardPayment
```

This is not mandatory. Small projects may need fewer packages, and larger applications may organize by feature instead of technical layer.

## 44. Common Mistakes

Avoid these misunderstandings:

1. **Assuming everything in a package is public.** Package-private types and members are not generally accessible from other packages.
2. **Thinking an import installs a library.** Dependencies must already be available through the build system, classpath, or module path.
3. **Thinking a wildcard imports subpackages.** `import java.util.*;` does not import `java.util.concurrent.*`.
4. **Assuming `private` means private to one object.** Code in a class can access private fields of another instance of that same class.
5. **Assuming `protected` is public to all subclasses.** Cross-package protected access has special restrictions.
6. **Making every field public.** This allows outside code to bypass validation and invariants.
7. **Making everything private without a public API.** Callers need accessible operations to use a class.
8. **Using the unnamed package in a large project.** Named packages provide clearer organization.
9. **Confusing `static` with access control.** One describes class-level membership; the other controls visibility.
10. **Confusing `final` with access control.** `final` controls reassignment, overriding, or subclassing depending on context.
11. **Reducing access while overriding.** An override cannot be less accessible than the method it overrides.
12. **Forgetting interface methods are public.** Implementations of ordinary abstract interface methods must be public.

## 45. Quick Revision — Packages

```text
package
→ declares a type's package

import
→ helps resolve simple names

fully qualified name
→ package name + type name

wildcard import
→ imports accessible types from one package, not subpackages

static import
→ allows static members to be used without the declaring type name

java.lang
→ automatically available to ordinary Java source

unnamed package
→ used when there is no package declaration
```

## 46. Quick Revision — Access Modifiers

```text
public
→ accessible wherever the declaring type and other rules permit

protected
→ same package plus qualifying subclass access across packages

package-private
→ accessible within the same package

private
→ accessible within the declaring class and permitted nestmate access
```

For ordinary top-level classes, the common choices are `public` and package-private. Fields, methods, constructors, and nested classes can use more access options.

## 47. Output and Error Questions

For each snippet, decide whether it compiles. If it compiles, state the output; otherwise explain why.

### Question 1

```java
class Test {
    private int value = 10;

    void show() {
        System.out.println(value);
    }

    public static void main(String[] args) {
        new Test().show();
    }
}
```

### Question 2

```java
class A {
    int value = 5;
}

class B {
    public static void main(String[] args) {
        A a = new A();
        System.out.println(a.value);
    }
}
```

Assume both classes are in the same package.

### Question 3

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> values = new ArrayList<>();
        values.add(10);
        System.out.println(values);
    }
}
```

### Question 4

Does `import java.util.*;` make `ExecutorService` available by its simple name?

### Question 5

```java
class Parent {
    public void show() {
    }
}

class Child extends Parent {
    // protected void show() {}
}
```

Would uncommenting the method make a valid override?

### Question 6

```java
class Box {
    private int value;

    Box(int value) {
        this.value = value;
    }

    boolean matches(Box other) {
        return value == other.value;
    }
}
```

Can `matches()` access `other.value`?

### Question 7

```java
class Helper {
    private Helper() {
    }

    static void run() {
        System.out.println("Running");
    }
}

public class Main {
    public static void main(String[] args) {
        Helper.run();
    }
}
```

### Question 8

```java
class Student {
    private String name = "Riya";

    public String getName() {
        return name;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        System.out.println(s.getName());
    }
}
```

## 48. Answers to Output and Error Questions

**Answer 1:** Compiles; output is `10`. The private field is accessed inside its declaring class.

**Answer 2:** Compiles if both classes are in the same package; output is `5`. The field is package-private.

**Answer 3:** Compiles; output is `[10]`.

**Answer 4:** No. `ExecutorService` is in `java.util.concurrent`, a different package. Import it separately.

**Answer 5:** No. A protected method cannot override a public method because that reduces access.

**Answer 6:** Yes. Code inside `Box` can access private members of another `Box` instance.

**Answer 7:** Compiles; output is `Running`. The code calls a static method and does not need to construct `Helper`.

**Answer 8:** Compiles; output is `Riya`. The private field is exposed through a public getter.

## 49. Interview Questions — Packages

**Q1. What is a package in Java?**  
A package is a named group used to organize related Java types and provide a package-level boundary for access control.

**Q2. Why do we use packages?**  
To organize code, reduce naming conflicts, improve maintainability, and control access to package-private members.

**Q3. Built-in vs user-defined packages?**  
Built-in packages are provided by the Java platform or its libraries. User-defined packages organize developers' own types.

**Q4. What does an import statement do?**  
It helps the compiler resolve a type or static member by its simple name. It does not install a library or grant extra access.

**Q5. What is a fully qualified class name?**  
A type name including its package, such as `java.util.ArrayList`.

**Q6. Does a wildcard import import subpackages?**  
No. `import java.util.*;` does not import `java.util.concurrent.*`.

**Q7. What is a static import?**  
It allows accessible static members to be used without repeatedly writing the declaring type's name.

**Q8. What is the unnamed package?**  
The package used when no package declaration is written. It is best reserved for small examples.

## 50. Interview Questions — Access Modifiers

**Q9. What are the four member access levels?**  
`public`, `protected`, package-private, and `private`.

**Q10. What is package-private access?**  
When no access modifier is written, suitable code in the same package can access the type or member.

**Q11. Can a top-level class be private?**  
No. An ordinary top-level class can be public or package-private. Nested classes can be private.

**Q12. Private vs package-private?**  
Private access is limited to the declaring class and permitted nestmate access. Package-private access is available to suitable code in the same package.

**Q13. Protected vs public?**  
Public access is generally available wherever the declaring type is accessible. Protected access is limited to the same package and qualifying subclass access across packages.

**Q14. Can a subclass directly access a private parent field?**  
No. The parent can expose controlled behavior through accessible methods.

**Q15. Can an overriding method reduce access?**  
No. An overriding method cannot be less accessible than the method it overrides.

**Q16. Why are fields often private?**  
Private fields help protect invariants and prevent outside code from modifying state without control.

## 51. Interview Questions — Practical Design

**Q17. Does importing a class make its private members accessible?**  
No. Importing helps resolve a name; access modifiers still apply.

**Q18. Can a class have a private constructor?**  
Yes. It can prevent ordinary outside code from creating instances directly. It is used in utility classes and controlled-construction designs.

**Q19. Can a public class have private methods?**  
Yes. Class visibility and member visibility are separate.

**Q20. Why avoid the unnamed package in large projects?**  
It provides poor organization and cannot be used as a normal importable package from named packages.

**Q21. Why can a class access a private field of another instance of the same class?**  
Private access is based on the declaring class, not limited to the current object instance.

**Q22. Access control vs encapsulation?**  
Access modifiers provide visibility rules. Encapsulation is the broader practice of hiding internal state and exposing controlled operations.

## 52. Exercises

### Exercise 1 — Package Creation

Create `com.example.geometry` and a `Rectangle` class with private width and height, a constructor, `getArea()`, and `getPerimeter()`. Create a separate `Main` class in `com.example.app` and import `Rectangle`.

### Exercise 2 — Access Modifier Practice

Create a class with public, protected, package-private, and private fields. Try to access them from the same class, the same package, a subclass in another package, and an unrelated class in another package. Record which accesses compile.

### Exercise 3 — Bank Account

Create a `BankAccount` class with private balance, public `deposit()`, `withdraw()`, and `getBalance()`. External code must not set the balance directly.

### Exercise 4 — Package-Private Helper

Create a package-private helper used by two public classes in the same package. Verify that an unrelated class in another package cannot use it.

### Exercise 5 — Static Import

Write a program using `Math.sqrt()`, `Math.max()`, and `Math.PI`. Then use static imports and compare readability.

### Exercise 6 — Name Conflict

Use both `java.util.Date` and `java.sql.Date` in one class. Resolve the naming conflict with fully qualified names.

### Exercise 7 — Private Constructor

Create a `StringTools` utility class with a private constructor and public static `reverse(String)` and `isPalindrome(String)` methods.

### Exercise 8 — Public API

Create a class with several private helper methods and one or two public methods. Explain why callers do not need access to every implementation detail.

### Exercise 9 — Cross-Package Protected Access

Create `animals.Animal` and `pets.Dog`. Make a protected method in `Animal`, call it from `Dog`, and experiment with accessing it through an `Animal`-typed parameter.

### Exercise 10 — Package Structure

Design package names for student records, course management, payment processing, database access, and the application entry point. Explain your choices.

## 53. Chapter Summary

Packages organize Java types and help define package-level access boundaries. You learned to declare packages, import types, use fully qualified names, use wildcard and static imports, organize source files, and compile and run packaged classes.

You also learned the four access levels:

```text
public
protected
package-private
private
```

The key lesson is to expose only what callers genuinely need. Keep implementation details hidden, use meaningful packages, and choose access deliberately.

## 54. Final Revision Checklist

```text
[ ] What is a package?
[ ] Why do we use packages?
[ ] Built-in vs user-defined packages
[ ] The package declaration
[ ] Import statements
[ ] Fully qualified names
[ ] Wildcard imports and subpackages
[ ] Static imports
[ ] The unnamed package
[ ] Package naming conventions
[ ] Package directory structure
[ ] Compiling and running packaged code
[ ] public access
[ ] protected access
[ ] package-private access
[ ] private access
[ ] Access levels for top-level classes
[ ] Access modifiers for fields and methods
[ ] Constructor visibility
[ ] Private constructors
[ ] Protected access across packages
[ ] Private members and inheritance
[ ] Access modifiers and overriding
[ ] Access modifiers and interfaces
[ ] Importing vs access permissions
[ ] Encapsulation and visibility
[ ] Common package and access mistakes
```

## 55. What Comes Next?

**Chapter 25 — Exception Handling**

Next, learn how Java handles errors and exceptional situations using:

```text
try
catch
finally
throw
throws
checked exceptions
unchecked exceptions
custom exceptions
exception propagation
try-with-resources
```

These concepts help you write Java programs that handle failures more safely and clearly.
