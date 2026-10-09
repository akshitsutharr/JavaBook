# Chapter 15 — Encapsulation

> **Java Master Course — Chapter 15 of 50**
>
> Encapsulation is one of the most important ideas in Object-Oriented Programming.
>
> The simple idea is:
>
> **Keep an object's internal data protected and provide controlled ways to access or change it.**
>
> In Java, encapsulation is commonly implemented using:
>
> ```text
> private fields
> public/protected methods
> getters
> setters
> validation
> controlled operations
> defensive copying
> immutable design
> ```

---

# 1. What You Will Learn

By the end of this chapter, you should understand:

```text
✓ Encapsulation
✓ Data hiding
✓ Why encapsulation is needed
✓ private
✓ public
✓ protected preview
✓ Getters
✓ Setters
✓ Validation
✓ Controlled modification
✓ Read-only access
✓ Write-only concepts
✓ Business rules inside classes
✓ Encapsulating collections
✓ Defensive copying
✓ Returning unmodifiable views
✓ Mutable vs immutable objects
✓ final fields
✓ Constructor validation
✓ Setter validation
✓ Real-world class design
✓ BankAccount
✓ Student
✓ Employee
✓ Product
✓ Temperature
✓ Common mistakes
✓ Practical programs
✓ Exercises
✓ Output questions
✓ Interview questions
```

---

# 2. What Is Encapsulation?

Encapsulation means putting:

```text
data
+
methods that operate on that data
```

inside a class while controlling how outside code interacts with the object's internal state.

Example:

```java
class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}
```

Here:

```text
balance
   ↓
private

deposit()
getBalance()
   ↓
controlled access
```

---

# 3. Simple Definition

A simple exam-friendly definition:

> **Encapsulation is the process of bundling data and the methods that operate on that data inside a class and restricting direct access to the internal state.**

---

# 4. Encapsulation in Simple Language

Imagine an ATM.

You do not directly access the bank's database and change:

```text
balance = 1000000
```

Instead, you use operations such as:

```text
deposit()
withdraw()
checkBalance()
```

The system controls what is allowed.

That is the basic idea behind encapsulation.

---

# 5. Real-World Example

Consider a bank account.

Without encapsulation:

```java
account.balance = -500000;
```

This could be invalid.

With encapsulation:

```java
account.withdraw(500);
```

The class can check:

```text
Is amount positive?
Is enough balance available?
Should the transaction be allowed?
```

The object controls its own state.

---

# 6. Why Do We Need Encapsulation?

Without encapsulation, any accessible code may change an object's state directly.

Example:

```java
student.marks = -100;
```

Possible problems:

```text
invalid data
broken business rules
hard-to-find bugs
unexpected state changes
tight coupling
difficult maintenance
poor security boundaries
```

Encapsulation reduces these problems.

---

# 7. Encapsulation Protects Object State

Think:

```text
Outside code
     |
     | controlled methods
     v
+----------------------+
|       Object         |
|                      |
| private data         |
| private logic        |
| business rules       |
+----------------------+
```

Outside code does not need to know every internal detail.

---

# 8. Encapsulation Is Not Just Getters and Setters

This is important.

Many beginners think:

```text
encapsulation = private + getter + setter
```

That is incomplete.

Encapsulation is about:

```text
controlled access
+
protecting invariants
+
hiding implementation details
+
keeping responsibilities inside the class
```

Sometimes a class should have a getter but no setter.

Sometimes it should have neither.

Sometimes the best API is a domain operation such as:

```java
withdraw()
```

instead of:

```java
setBalance()
```

---

# 9. What Is Data Hiding?

Data hiding means preventing direct access to internal implementation details.

Example:

```java
class BankAccount {
    private double balance;
}
```

Outside code cannot directly do:

```java
account.balance = 5000;
```

if `balance` is private.

---

# 10. `private` Access Modifier

`private` is one of Java's access modifiers.

A private member is directly accessible only from within its declaring top-level class.

Example:

```java
class Student {
    private int marks;
}
```

This is invalid from outside:

```java
Student s = new Student();
s.marks = 90;
```

because `marks` is private.

---

# 11. Why Use `private`?

`private` helps a class control its internal state.

Instead of:

```java
public double balance;
```

use:

```java
private double balance;
```

Then expose only the operations that make sense.

---

# 12. Public Methods

A public method can provide controlled access.

Example:

```java
class Student {
    private int marks;

    public int getMarks() {
        return marks;
    }
}
```

Outside code can read the value:

```java
Student s = new Student();

System.out.println(s.getMarks());
```

but cannot directly modify the private field.

---

# 13. Getter

A getter is a method used to retrieve a value.

Example:

```java
public String getName() {
    return name;
}
```

Naming convention:

```text
getFieldName()
```

---

# 14. Getter Example

```java
class Student {
    private String name;

    public String getName() {
        return name;
    }
}
```

Usage:

```java
Student student = new Student();

System.out.println(student.getName());
```

---

# 15. Boolean Getter

For boolean properties, Java convention commonly uses:

```java
isActive()
```

rather than:

```java
getActive()
```

Example:

```java
class User {
    private boolean active;

    public boolean isActive() {
        return active;
    }
}
```

---

# 16. Setter

A setter is a method used to change a field's value under the class's rules.

Example:

```java
public void setName(String name) {
    this.name = name;
}
```

Naming convention:

```text
setFieldName(...)
```

---

# 17. Simple Getter + Setter

```java
class Student {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

Usage:

```java
Student s = new Student();

s.setName("Aman");

System.out.println(s.getName());
```

Output:

```text
Aman
```

---

# 18. Getter and Setter Do Not Automatically Make a Class Well Encapsulated

Consider:

```java
class BankAccount {
    private double balance;

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
```

This technically hides direct field access, but:

```java
account.setBalance(-100000);
```

may still violate the object's rules.

A better design may be:

```java
deposit()
withdraw()
```

instead of unrestricted `setBalance()`.

---

# 19. Encapsulation and Invariants

An invariant is a condition that should remain true for a valid object.

For example:

```text
Bank account balance should not become invalid.
Student marks should remain between 0 and 100.
Product price should not be negative.
Age should not be negative.
```

Encapsulation gives the class a place to enforce these rules.

---

# 20. Validation

Validation checks whether data is acceptable.

Example:

```java
public void setMarks(int marks) {
    if (marks < 0 || marks > 100) {
        throw new IllegalArgumentException(
            "Marks must be between 0 and 100"
        );
    }

    this.marks = marks;
}
```

Now invalid data is rejected.

---

# 21. Why Validate Inside the Class?

Suppose ten different parts of a program create Student objects.

Without encapsulation:

```text
Class A → checks marks
Class B → forgets check
Class C → uses wrong range
Class D → allows -10
```

With encapsulation:

```text
all changes
   ↓
Student class
   ↓
one validation rule
```

This centralizes the business rule.

---

# 22. Encapsulation Example — Marks

```java
class Student {
    private int marks;

    public void setMarks(int marks) {
        if (marks < 0 || marks > 100) {
            throw new IllegalArgumentException(
                "Marks must be 0 to 100"
            );
        }

        this.marks = marks;
    }

    public int getMarks() {
        return marks;
    }
}
```

Usage:

```java
Student s = new Student();

s.setMarks(85);

System.out.println(s.getMarks());
```

Output:

```text
85
```

---

# 23. Invalid Value

```java
s.setMarks(150);
```

The method rejects it.

A possible exception is:

```text
IllegalArgumentException
```

The exact message depends on the program.

---

# 24. Constructor Validation

Validation should also happen when an object is created.

Example:

```java
class Product {
    private final double price;

    Product(double price) {
        if (price < 0) {
            throw new IllegalArgumentException(
                "Price cannot be negative"
            );
        }

        this.price = price;
    }

    public double getPrice() {
        return price;
    }
}
```

---

# 25. Why Validate in Constructor?

If an object must always satisfy a rule, it should not be allowed to start in an invalid state.

Bad:

```text
create invalid object
    ↓
hope someone fixes it later
```

Better:

```text
validate during construction
    ↓
valid object
```

---

# 26. Constructor + Setter Validation

Example:

```java
class Student {
    private int marks;

    Student(int marks) {
        setMarks(marks);
    }

    public void setMarks(int marks) {
        if (marks < 0 || marks > 100) {
            throw new IllegalArgumentException(
                "Invalid marks"
            );
        }

        this.marks = marks;
    }

    public int getMarks() {
        return marks;
    }
}
```

The same validation rule is reused.

---

# 27. Encapsulation and `final`

`final` can strengthen encapsulation.

Example:

```java
class User {
    private final int id;

    User(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
```

There is no setter.

The ID cannot be reassigned through this field after construction.

---

# 28. Read-Only Property

A field can be exposed through a getter without a setter.

Example:

```java
class Employee {
    private final int id;

    Employee(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
```

Outside code can read:

```java
employee.getId();
```

but cannot call:

```java
employee.setId(...);
```

because no setter exists.

---

# 29. Read-Only Does Not Always Mean Immutable

Suppose:

```java
class User {
    private final List<String> roles;

    public List<String> getRoles() {
        return roles;
    }
}
```

There is no setter, but callers may still mutate the list:

```java
user.getRoles().add("ADMIN");
```

So simply removing a setter is not enough for mutable objects.

---

# 30. Defensive Copying

A defensive copy prevents outside code from directly modifying internal mutable state.

Example:

```java
class User {
    private final List<String> roles;

    User(List<String> roles) {
        this.roles = new ArrayList<>(roles);
    }

    public List<String> getRoles() {
        return new ArrayList<>(roles);
    }
}
```

The class owns its internal list.

---

# 31. Why Copy in the Constructor?

Without copying:

```java
List<String> external = new ArrayList<>();
User user = new User(external);

external.add("ADMIN");
```

If the class stores `external` directly, its internal state changes from outside.

With:

```java
new ArrayList<>(roles)
```

the class gets its own list.

---

# 32. Defensive Copy on Getter

Suppose:

```java
return new ArrayList<>(roles);
```

The caller receives another list.

Then:

```java
user.getRoles().add("ADMIN");
```

changes the returned copy, not the internal list.

---

# 33. Unmodifiable View

Another approach is an unmodifiable view:

```java
return Collections.unmodifiableList(roles);
```

This prevents callers from modifying through the returned view.

The underlying list is still mutable by the class itself.

---

# 34. Modern Java Example

```java
return List.copyOf(roles);
```

can return an unmodifiable copy.

Example:

```java
public List<String> getRoles() {
    return List.copyOf(roles);
}
```

This is often a clean choice when an immutable snapshot is desired.

---

# 35. Defensive Copying — Important Difference

```text
new ArrayList<>(list)
```

→ mutable copy

```text
List.copyOf(list)
```

→ unmodifiable copy

```text
Collections.unmodifiableList(list)
```

→ unmodifiable view backed by the original list

These have different semantics.

---

# 36. Encapsulation of Arrays

Arrays are mutable too.

Bad:

```java
class Student {
    private int[] marks;

    int[] getMarks() {
        return marks;
    }
}
```

Caller can do:

```java
student.getMarks()[0] = -100;
```

The private field was modified indirectly.

---

# 37. Defensive Copy of Array

Better:

```java
class Student {
    private int[] marks;

    Student(int[] marks) {
        this.marks = marks.clone();
    }

    int[] getMarks() {
        return marks.clone();
    }
}
```

Now external code cannot directly modify the internal array through the original reference or getter result.

---

# 38. Reference Types and Encapsulation

This is very important.

For primitive:

```java
private int age;
```

returning:

```java
return age;
```

returns a value.

For a mutable object:

```java
private List<String> names;
```

returning:

```java
return names;
```

returns a reference to the same list.

That reference can expose internal state.

---

# 39. Encapsulation and References

Remember from previous chapters:

```text
object variable
     ↓
reference
     ↓
object
```

If you give outside code the same reference to a mutable internal object, outside code may be able to change your object's internal state.

---

# 40. Example of Broken Encapsulation

```java
class Team {
    private List<String> players =
        new ArrayList<>();

    public List<String> getPlayers() {
        return players;
    }
}
```

Then:

```java
Team team = new Team();

team.getPlayers().add("Aman");
```

The private list changed.

This is not necessarily always wrong, but it is not strong encapsulation if outside code was not supposed to mutate the list.

---

# 41. Better Encapsulation

```java
class Team {
    private final List<String> players =
        new ArrayList<>();

    public List<String> getPlayers() {
        return List.copyOf(players);
    }

    public void addPlayer(String player) {
        if (player == null || player.isBlank()) {
            throw new IllegalArgumentException(
                "Player name is required"
            );
        }

        players.add(player);
    }
}
```

Now the class controls modifications.

---

# 42. Domain Methods Are Often Better Than Setters

Instead of:

```java
account.setBalance(
    account.getBalance() - amount
);
```

use:

```java
account.withdraw(amount);
```

Why?

Because `withdraw()` can enforce:

```text
amount > 0
balance sufficient
account active
transaction allowed
```

The class owns the rule.

---

# 43. Encapsulation Is About Behavior Too

Good class:

```java
class BankAccount {
    private double balance;

    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException();
        }

        if (amount > balance) {
            throw new IllegalArgumentException(
                "Insufficient balance"
            );
        }

        balance -= amount;
    }
}
```

The caller says:

```text
withdraw 500
```

instead of manipulating the internal representation.

---

# 44. Tell the Object What to Do

A useful OOP idea:

```text
Bad style:
get data
modify data outside
set data back

Better:
ask object to perform operation
```

Example:

```java
account.withdraw(500);
```

instead of:

```java
account.setBalance(
    account.getBalance() - 500
);
```

---

# 45. Encapsulation and Abstraction

These concepts are related but not identical.

```text
Encapsulation
→ controls access to internal state

Abstraction
→ exposes important behavior while hiding unnecessary implementation details
```

Encapsulation is often used to achieve abstraction.

---

# 46. Example

```java
class Car {
    private Engine engine;

    public void start() {
        engine.start();
    }
}
```

The caller does not need direct access to every engine detail.

The Car exposes:

```java
start()
```

This demonstrates both encapsulation and abstraction ideas.

---

# 47. Encapsulation and Information Hiding

Information hiding means implementation details should not unnecessarily become part of the public API.

Example:

```java
private double balance;
```

The outside world does not need to know exactly how the account stores its balance.

The class can later change internal representation while preserving its public contract.

---

# 48. Why This Helps Maintenance

Suppose you expose:

```java
public double balance;
```

Many classes may directly depend on it.

Changing the representation becomes difficult.

With:

```java
private double balance;
```

and:

```java
getBalance()
withdraw()
deposit()
```

the internal implementation can change with less impact on callers.

---

# 49. Public API

The methods accessible to outside code form part of the class's public API.

Example:

```java
public void deposit(double amount)
public void withdraw(double amount)
public double getBalance()
```

These define how other code interacts with the object.

---

# 50. Private Implementation

Implementation details can remain private:

```java
private double balance;
private boolean active;
private void validateAmount(double amount)
```

Outside code does not directly depend on them.

---

# 51. Private Helper Method

Encapsulation also applies to methods.

Example:

```java
class BankAccount {
    private double balance;

    public void deposit(double amount) {
        validateAmount(amount);
        balance += amount;
    }

    private void validateAmount(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException();
        }
    }
}
```

The validation helper is an internal implementation detail.

---

# 52. Benefits of Private Helper Methods

They provide:

```text
code reuse
clear public API
centralized logic
less duplication
better readability
```

---

# 53. Encapsulation Does Not Mean Everything Must Be Private

Not every member must be private.

The goal is appropriate access control.

Example:

```java
public class Student {
    private String name;

    public String getName() {
        return name;
    }

    public void study() {
    }
}
```

Public behavior is expected.

Internal state is protected.

---

# 54. Access Modifiers Preview

Java commonly provides:

```text
private
default/package-private
protected
public
```

Their detailed package/inheritance behavior is covered in Chapter 24.

For encapsulation, `private` is especially important.

---

# 55. Package-Private Members

If no access modifier is written:

```java
class Student {
    String name;
}
```

then `name` has package-private access.

It is accessible to classes in the same package, subject to normal package rules.

This is different from `private`.

---

# 56. `protected` Preview

`protected` provides access within the same package and also to subclasses under Java's protected-access rules.

Detailed behavior will be covered with packages and access modifiers.

---

# 57. Encapsulation Example — Employee

```java
class Employee {
    private String name;
    private double salary;

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

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        if (salary < 0) {
            throw new IllegalArgumentException(
                "Salary cannot be negative"
            );
        }

        this.salary = salary;
    }
}
```

---

# 58. Better Employee Design

Sometimes a setter for salary is not the best business API.

Instead:

```java
public void increaseSalary(double percentage) {
    if (percentage < 0) {
        throw new IllegalArgumentException();
    }

    salary += salary * percentage / 100;
}
```

This expresses a business operation.

---

# 59. Why Domain Operations Are Powerful

Compare:

```java
employee.setSalary(65000);
```

with:

```java
employee.increaseSalary(10);
```

The second tells the object what operation should happen.

The class controls how the operation is implemented.

---

# 60. Encapsulation Example — Bank Account

```java
class BankAccount {
    private final String accountNumber;
    private double balance;

    BankAccount(String accountNumber,
                double initialBalance) {

        if (accountNumber == null ||
            accountNumber.isBlank()) {
            throw new IllegalArgumentException(
                "Account number is required"
            );
        }

        if (initialBalance < 0) {
            throw new IllegalArgumentException(
                "Initial balance cannot be negative"
            );
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
            throw new IllegalArgumentException(
                "Deposit must be positive"
            );
        }

        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Withdrawal must be positive"
            );
        }

        if (amount > balance) {
            throw new IllegalArgumentException(
                "Insufficient balance"
            );
        }

        balance -= amount;
    }
}
```

---

# 61. Why This BankAccount Is Encapsulated

The caller cannot directly do:

```java
account.balance = -100000;
```

Instead:

```java
account.deposit(1000);
account.withdraw(500);
```

The object controls valid state changes.

---

# 62. Practical BankAccount Program

```java
public class Main {
    public static void main(String[] args) {
        BankAccount account =
            new BankAccount("ACC101", 1000);

        account.deposit(500);
        account.withdraw(300);

        System.out.println(
            account.getBalance()
        );
    }
}
```

Output:

```text
1200.0
```

---

# 63. Encapsulation Example — Temperature

```java
class Temperature {
    private double celsius;

    public Temperature(double celsius) {
        setCelsius(celsius);
    }

    public double getCelsius() {
        return celsius;
    }

    public void setCelsius(double celsius) {
        if (celsius < -273.15) {
            throw new IllegalArgumentException(
                "Below absolute zero"
            );
        }

        this.celsius = celsius;
    }
}
```

---

# 64. Why Validation Belongs Here

The rule:

```text
Celsius >= -273.15
```

belongs naturally to Temperature.

Every caller should not have to remember this rule.

---

# 65. Encapsulation Example — Product

```java
class Product {
    private final String id;
    private String name;
    private double price;

    Product(String id, String name, double price) {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException();
        }

        this.id = id;
        setName(name);
        setPrice(price);
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException();
        }

        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException();
        }

        this.price = price;
    }
}
```

---

# 66. Encapsulation Example — Student

```java
class Student {
    private final int rollNumber;
    private String name;
    private int marks;

    Student(int rollNumber,
            String name,
            int marks) {

        this.rollNumber = rollNumber;
        setName(name);
        setMarks(marks);
    }

    public int getRollNumber() {
        return rollNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException();
        }

        this.name = name;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        if (marks < 0 || marks > 100) {
            throw new IllegalArgumentException();
        }

        this.marks = marks;
    }
}
```

---

# 67. Read-Only Student Roll Number

Notice:

```java
private final int rollNumber;
```

and:

```java
public int getRollNumber()
```

There is no:

```java
setRollNumber()
```

because the roll number is intended to be fixed after construction.

---

# 68. Encapsulation of Calculated Values

A getter does not have to return a stored field.

Example:

```java
class Rectangle {
    private final double width;
    private final double height;

    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double getArea() {
        return width * height;
    }
}
```

There is no need for:

```java
private double area;
```

because area can be calculated.

---

# 69. Encapsulation Hides Representation

Suppose initially:

```java
private double area;
```

Later you change to:

```java
public double getArea() {
    return width * height;
}
```

Callers can still use:

```java
rectangle.getArea();
```

The internal representation changed.

This is one major benefit of encapsulation.

---

# 70. Encapsulation and Internal Algorithms

Suppose:

```java
public double getTotal() {
    return price * quantity;
}
```

The caller only cares about:

```text
getTotal()
```

It does not need to know how the calculation is performed.

---

# 71. Encapsulation and Method Contracts

A public method should have a clear contract.

Example:

```java
deposit(500)
```

may guarantee:

```text
amount must be positive
balance increases by amount
```

The internal implementation may change without changing the public contract.

---

# 72. Encapsulation and Coupling

Without encapsulation:

```text
Class A
 ↓
directly manipulates
 ↓
Class B's internal fields
```

This creates stronger coupling.

With encapsulation:

```text
Class A
 ↓
public API
 ↓
Class B
```

Class B controls its internal representation.

---

# 73. Encapsulation and Cohesion

A well-encapsulated class often has good cohesion.

Its data and behavior are related.

Example:

```java
class BankAccount {
    private double balance;

    void deposit() {
    }

    void withdraw() {
    }
}
```

The balance and account operations belong together.

---

# 74. Common Mistake — Public Fields

Avoid:

```java
class Student {
    public String name;
    public int marks;
}
```

when the object needs validation or controlled state.

Better:

```java
class Student {
    private String name;
    private int marks;

    public void setMarks(int marks) {
        // validation
    }
}
```

---

# 75. Common Mistake — Unrestricted Setters

This:

```java
public void setBalance(double balance) {
    this.balance = balance;
}
```

may be dangerous if arbitrary balance changes are not valid operations.

Prefer domain-specific methods when appropriate.

---

# 76. Common Mistake — Returning Mutable Internal State

Avoid:

```java
public List<String> getItems() {
    return items;
}
```

if callers should not be able to modify the internal list.

Use a defensive copy or unmodifiable result as appropriate.

---

# 77. Common Mistake — Trusting Constructor Inputs

Bad:

```java
Student(int marks) {
    this.marks = marks;
}
```

if marks must be between 0 and 100.

Better:

```java
Student(int marks) {
    setMarks(marks);
}
```

or validate directly.

---

# 78. Common Mistake — Validation Only at Input Layer

Suppose the UI checks:

```text
marks 0–100
```

but another API creates Student objects directly.

The class should still protect its own invariant when necessary.

Do not rely only on one external caller.

---

# 79. Common Mistake — Getter for Everything

You do not need a getter for every field.

Ask:

```text
Does outside code really need this information?
```

If not, keep it private.

---

# 80. Common Mistake — Setter for Everything

You do not need a setter for every field.

Ask:

```text
Should this value be freely changed?
```

If not, omit the setter or expose a domain operation.

---

# 81. Common Mistake — Making Fields `final` Without Understanding References

Example:

```java
private final List<String> items =
    new ArrayList<>();
```

`final` prevents:

```java
items = anotherList;
```

but does not automatically prevent:

```java
items.add("Java");
```

The list remains mutable.

---

# 82. Immutable Object

An immutable object is an object whose observable state cannot be changed after construction.

A common design uses:

```text
private final fields
no mutating setters
constructor initialization
defensive copies for mutable components
```

---

# 83. Simple Immutable Class

```java
final class Point {
    private final int x;
    private final int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
}
```

After construction:

```text
x cannot change
y cannot change
```

---

# 84. Why Make a Class `final`?

A `final` class cannot be subclassed.

For some immutable designs, making the class final helps prevent subclasses from introducing mutable state or behavior that breaks the intended immutability model.

It is one useful tool, though immutability requires more than simply writing `final class`.

---

# 85. Immutable Class with String

```java
final class User {
    private final String name;

    User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```

`String` is immutable, so returning the String does not expose mutable internal state.

---

# 86. Immutable Class with Mutable Field

Consider:

```java
final class Team {
    private final List<String> players;

    Team(List<String> players) {
        this.players = List.copyOf(players);
    }

    public List<String> getPlayers() {
        return players;
    }
}
```

`List.copyOf()` provides an unmodifiable copy.

This is much safer.

---

# 87. Encapsulation vs Immutability

They are not the same.

```text
Encapsulation
→ controls access

Immutability
→ state cannot change after construction
```

An object can be encapsulated but mutable.

Example:

```java
account.deposit(500);
```

The balance changes, but the field remains private.

---

# 88. Encapsulation vs Data Hiding

Data hiding is one part of encapsulation.

Think:

```text
Encapsulation
├── data + behavior together
├── controlled access
├── validation
├── implementation hiding
└── protected invariants
```

---

# 89. Encapsulation vs Abstraction

Simple distinction:

```text
Encapsulation:
How do we protect/control the internal state?

Abstraction:
What important interface/behavior do we expose while hiding unnecessary details?
```

---

# 90. Example

```java
class Car {
    private Engine engine;

    public void start() {
        engine.start();
    }
}
```

Encapsulation:

```text
engine is private
```

Abstraction:

```text
caller uses start()
without needing engine internals
```

---

# 91. Encapsulation and Composition

Encapsulation works well with composition.

Example:

```java
class Car {
    private Engine engine;

    public void start() {
        engine.start();
    }
}
```

The Car controls access to its internal Engine reference.

---

# 92. Encapsulation of Business Rules

Example:

```java
class ShoppingCart {
    private final List<Item> items =
        new ArrayList<>();

    public void addItem(Item item) {
        if (item == null) {
            throw new IllegalArgumentException();
        }

        items.add(item);
    }

    public double getTotal() {
        return items.stream()
            .mapToDouble(Item::getPrice)
            .sum();
    }
}
```

The cart owns the rules for adding items and calculating its total.

---

# 93. Do Not Expose Internal Collections Unnecessarily

Instead of:

```java
cart.getItems().clear();
```

you may expose:

```java
cart.clear();
```

if clearing is a valid domain operation.

This lets the class decide what clearing means.

---

# 94. Better Collection API

```java
class ShoppingCart {
    private final List<Item> items =
        new ArrayList<>();

    public void addItem(Item item) {
        items.add(item);
    }

    public void removeItem(Item item) {
        items.remove(item);
    }

    public List<Item> getItems() {
        return List.copyOf(items);
    }
}
```

Outside code can inspect the items without directly modifying the internal list.

---

# 95. Encapsulation and Null

A setter can define whether null is allowed.

Example:

```java
public void setName(String name) {
    if (name == null) {
        throw new IllegalArgumentException(
            "Name cannot be null"
        );
    }

    this.name = name;
}
```

The class establishes its own rule.

---

# 96. Encapsulation and Validation Strategy

Validation may include:

```text
null checks
range checks
format checks
state checks
cross-field checks
business rules
```

Example:

```text
startDate <= endDate
```

This is a class-level invariant.

---

# 97. Cross-Field Validation

Example:

```java
class DateRange {
    private final int start;
    private final int end;

    DateRange(int start, int end) {
        if (start > end) {
            throw new IllegalArgumentException(
                "Start cannot be after end"
            );
        }

        this.start = start;
        this.end = end;
    }
}
```

Encapsulation keeps the invariant inside the object.

---

# 98. Controlled State Transitions

Some objects should allow only certain transitions.

Example:

```text
Order:
NEW
 ↓
PAID
 ↓
SHIPPED
 ↓
DELIVERED
```

A bad design might expose:

```java
setStatus(...)
```

A better design might expose:

```java
pay()
ship()
deliver()
```

Each method can enforce valid transitions.

---

# 99. State Machine Example

```java
class Order {
    private String status = "NEW";

    public void pay() {
        if (!status.equals("NEW")) {
            throw new IllegalStateException(
                "Order cannot be paid"
            );
        }

        status = "PAID";
    }

    public String getStatus() {
        return status;
    }
}
```

Outside code cannot arbitrarily assign:

```text
DELIVERED
```

without following the object's rules.

---

# 100. Encapsulation Protects Invariants, Not Secrets

`private` is about access control and program design.

It is not a security mechanism for storing secrets against determined runtime inspection.

Do not think:

```text
private = encrypted
```

They are completely different concepts.

---

# 101. Practical Program — Secure-Looking Account

```java
class BankAccount {
    private final String accountNumber;
    private double balance;

    BankAccount(String accountNumber,
                double balance) {

        if (accountNumber == null ||
            accountNumber.isBlank()) {
            throw new IllegalArgumentException();
        }

        if (balance < 0) {
            throw new IllegalArgumentException();
        }

        this.accountNumber = accountNumber;
        this.balance = balance;
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

    public boolean withdraw(double amount) {
        if (amount <= 0 || amount > balance) {
            return false;
        }

        balance -= amount;
        return true;
    }
}
```

---

# 102. Practical Program — Student Result

```java
class Student {
    private final String name;
    private int marks;

    Student(String name, int marks) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException();
        }

        this.name = name;
        setMarks(marks);
    }

    public String getName() {
        return name;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        if (marks < 0 || marks > 100) {
            throw new IllegalArgumentException();
        }

        this.marks = marks;
    }

    public boolean hasPassed() {
        return marks >= 40;
    }
}
```

---

# 103. Practical Program — Product Price

```java
class Product {
    private final String id;
    private double price;

    Product(String id, double price) {
        this.id = id;
        setPrice(price);
    }

    public String getId() {
        return id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException(
                "Price cannot be negative"
            );
        }

        this.price = price;
    }

    public void applyDiscount(double percent) {
        if (percent < 0 || percent > 100) {
            throw new IllegalArgumentException(
                "Invalid discount"
            );
        }

        price -= price * percent / 100;
    }
}
```

---

# 104. Practical Program — Employee Salary

```java
class Employee {
    private final int id;
    private String name;
    private double salary;

    Employee(int id, String name, double salary) {
        this.id = id;
        setName(name);
        setSalary(salary);
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException();
        }

        this.name = name;
    }

    public double getSalary() {
        return salary;
    }

    public void increaseSalary(double percent) {
        if (percent < 0) {
            throw new IllegalArgumentException();
        }

        salary += salary * percent / 100;
    }

    private void setSalary(double salary) {
        if (salary < 0) {
            throw new IllegalArgumentException();
        }

        this.salary = salary;
    }
}
```

Notice that there is no public salary setter.

---

# 105. Why Private `setSalary()`?

Suppose salary should only change through:

```java
increaseSalary()
```

Then a public setter would allow:

```java
employee.setSalary(-100);
```

or arbitrary changes.

A private helper can still be used internally.

---

# 106. Practical Program — Encapsulated Counter

```java
class Counter {
    private int value;

    public int getValue() {
        return value;
    }

    public void increment() {
        value++;
    }

    public void decrement() {
        if (value > 0) {
            value--;
        }
    }
}
```

The caller cannot directly set:

```java
counter.value = -100;
```

---

# 107. Practical Program — Immutable Point

```java
final class Point {
    private final int x;
    private final int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public Point move(int dx, int dy) {
        return new Point(
            x + dx,
            y + dy
        );
    }
}
```

Instead of changing the existing Point, `move()` returns a new Point.

---

# 108. Immutable Point Usage

```java
Point p1 = new Point(10, 20);

Point p2 = p1.move(5, 5);

System.out.println(p1.getX());
System.out.println(p1.getY());

System.out.println(p2.getX());
System.out.println(p2.getY());
```

Output:

```text
10
20
15
25
```

---

# 109. Practical Program — Encapsulated List

```java
import java.util.ArrayList;
import java.util.List;

class Playlist {
    private final List<String> songs =
        new ArrayList<>();

    public void addSong(String song) {
        if (song == null || song.isBlank()) {
            throw new IllegalArgumentException();
        }

        songs.add(song);
    }

    public void removeSong(String song) {
        songs.remove(song);
    }

    public List<String> getSongs() {
        return List.copyOf(songs);
    }
}
```

---

# 110. Playlist Usage

```java
Playlist playlist = new Playlist();

playlist.addSong("Java");
playlist.addSong("Python");

System.out.println(playlist.getSongs());
```

Possible output:

```text
[Java, Python]
```

The returned list cannot be modified through normal List mutation methods.

---

# 111. Practical Program — Read-Only ID

```java
class User {
    private final int id;
    private String name;

    User(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

The ID is read-only through the public API.

---

# 112. Practical Program — Encapsulated Temperature

```java
class Temperature {
    private double celsius;

    Temperature(double celsius) {
        setCelsius(celsius);
    }

    public double getCelsius() {
        return celsius;
    }

    public void setCelsius(double celsius) {
        if (celsius < -273.15) {
            throw new IllegalArgumentException(
                "Invalid temperature"
            );
        }

        this.celsius = celsius;
    }

    public double getFahrenheit() {
        return celsius * 9 / 5 + 32;
    }
}
```

---

# 113. Practical Program — Encapsulated Rectangle

```java
class Rectangle {
    private final double width;
    private final double height;

    Rectangle(double width, double height) {
        if (width <= 0 || height <= 0) {
            throw new IllegalArgumentException(
                "Dimensions must be positive"
            );
        }

        this.width = width;
        this.height = height;
    }

    public double getWidth() {
        return width;
    }

    public double getHeight() {
        return height;
    }

    public double getArea() {
        return width * height;
    }

    public double getPerimeter() {
        return 2 * (width + height);
    }
}
```

---

# 114. Practical Program — Encapsulated Order

```java
class Order {
    private String status = "NEW";

    public String getStatus() {
        return status;
    }

    public void pay() {
        if (!status.equals("NEW")) {
            throw new IllegalStateException(
                "Invalid state"
            );
        }

        status = "PAID";
    }

    public void ship() {
        if (!status.equals("PAID")) {
            throw new IllegalStateException(
                "Order must be paid first"
            );
        }

        status = "SHIPPED";
    }
}
```

---

# 115. Order Usage

```java
Order order = new Order();

System.out.println(order.getStatus());

order.pay();

System.out.println(order.getStatus());

order.ship();

System.out.println(order.getStatus());
```

Output:

```text
NEW
PAID
SHIPPED
```

---

# 116. Encapsulation with Private Helper

```java
class PasswordPolicy {
    public boolean isValid(String password) {
        return hasMinimumLength(password)
            && hasDigit(password);
    }

    private boolean hasMinimumLength(String password) {
        return password != null &&
               password.length() >= 8;
    }

    private boolean hasDigit(String password) {
        if (password == null) {
            return false;
        }

        return password.chars()
            .anyMatch(Character::isDigit);
    }
}
```

The caller only needs:

```java
isValid()
```

The helper methods remain implementation details.

---

# 117. Encapsulation and API Evolution

Suppose you start with:

```java
public double getPrice() {
    return price;
}
```

Later you add:

```text
discounts
taxes
currency conversion
rounding
```

You can change the internal implementation while preserving:

```java
getPrice()
```

This is easier than exposing a public field.

---

# 118. Why Public Fields Increase Coupling

Suppose:

```java
public int marks;
```

Many classes may write:

```java
student.marks = 80;
```

Now those classes depend on:

```text
field name
field type
field representation
allowed values
```

Changing the design becomes harder.

---

# 119. Encapsulation Reduces Representation Dependency

With:

```java
private int marks;

public int getMarks()
```

callers depend mainly on the method contract.

Internally you might later change how marks are stored.

---

# 120. Encapsulation and Testing

A well-designed class is easier to test because its rules are centralized.

Example:

```java
student.setMarks(101);
```

should always be rejected.

You can test the Student class directly rather than relying on every caller to perform the same validation.

---

# 121. Encapsulation and Debugging

When all state changes happen through controlled methods:

```text
setMarks()
deposit()
withdraw()
increaseSalary()
```

it becomes easier to find where a state change occurred.

With public fields:

```text
field can be changed from many places
```

which makes debugging harder.

---

# 122. Encapsulation and Security

Encapsulation improves software design and prevents accidental misuse.

But remember:

```text
private ≠ encryption
private ≠ complete security
```

Java access modifiers control source-level access according to Java's access rules.

They are not a substitute for authentication, authorization, encryption, or secure storage.

---

# 123. Encapsulation Checklist

When designing a class, ask:

```text
1. Which data should be private?
2. Which values have valid ranges?
3. Which values must never change?
4. Which operations are actually allowed?
5. Do I need getters?
6. Do I need setters?
7. Should a setter validate?
8. Should a domain operation replace a setter?
9. Am I exposing a mutable object?
10. Do I need a defensive copy?
11. What invariants must always hold?
12. Can internal representation change later?
```

---

# 124. Good Encapsulation Pattern

A common pattern is:

```java
class ClassName {

    private fields;

    constructor validates;

    public getters when needed;

    public domain methods;

    private helper methods;

    no unnecessary setters;
}
```

---

# 125. Weak Encapsulation Pattern

Avoid blindly writing:

```java
class Student {
    public String name;
    public int age;
    public int marks;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }
}
```

This exposes the state publicly while adding unnecessary boilerplate.

---

# 126. Better Student Design

```java
class Student {
    private final int rollNumber;
    private String name;
    private int marks;

    Student(int rollNumber,
            String name,
            int marks) {

        this.rollNumber = rollNumber;
        setName(name);
        setMarks(marks);
    }

    public int getRollNumber() {
        return rollNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException();
        }

        this.name = name;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        if (marks < 0 || marks > 100) {
            throw new IllegalArgumentException();
        }

        this.marks = marks;
    }

    public boolean hasPassed() {
        return marks >= 40;
    }
}
```

---

# 127. Encapsulation Is About Responsibility

A powerful OOP principle:

> The class that owns the state should usually own the rules for changing that state.

Example:

```text
BankAccount
    ↓
balance
    ↓
deposit / withdraw
```

rather than:

```text
SomeOtherClass
    ↓
directly changes balance
```

---

# 128. Encapsulation and Object Responsibility

A good object knows:

```text
its state
+
how to keep its state valid
+
what operations make sense for that state
```

This makes the object more self-contained.

---

# 129. Encapsulation and Coupling Example

Poor design:

```java
account.setBalance(
    account.getBalance() - amount
);
```

The caller knows too much.

Better:

```java
account.withdraw(amount);
```

The caller knows the operation, not the internal state transition.

---

# 130. Encapsulation and Abstraction Example

Caller:

```java
account.withdraw(500);
```

does not need to know whether the account internally uses:

```text
double
BigDecimal
database-backed balance
ledger entries
transaction objects
```

The public API hides implementation details.

---

# 131. Important Note About Money

For educational examples, `double` is convenient.

For real financial applications, `double` is generally not appropriate for exact monetary calculations because binary floating-point cannot represent many decimal fractions exactly.

A production financial model may use:

```java
BigDecimal
```

or another appropriate monetary representation.

This chapter focuses on encapsulation, so the simple examples use `double`.

---

# 132. Encapsulation and BigDecimal Preview

A more realistic money field might be:

```java
private BigDecimal balance;
```

with:

```java
public void deposit(BigDecimal amount)
```

The encapsulation principle stays the same.

The representation changes.

---

# 133. Practical Mini Project — Bank Account

Build:

```text
BankAccount
```

Requirements:

```text
private accountNumber
private ownerName
private balance

constructor validation

getAccountNumber()
getOwnerName()
getBalance()

deposit()
withdraw()

private validation methods
```

Rules:

```text
account number cannot be empty
owner name cannot be empty
balance cannot start negative
deposit must be positive
withdrawal must be positive
withdrawal cannot exceed balance
```

---

# 134. Mini Project — Student Management

Create:

```text
Student
```

Fields:

```text
rollNumber
name
marks
```

Requirements:

```text
rollNumber → read-only
name → getter/setter
marks → getter/setter with validation
hasPassed()
getGrade()
```

Suggested grading:

```text
90–100 → A
80–89  → B
70–79  → C
60–69  → D
40–59  → E
0–39   → F
```

---

# 135. Mini Project — Product

Create:

```text
Product
```

Fields:

```text
id
name
price
```

Rules:

```text
id cannot change
name cannot be empty
price cannot be negative
```

Methods:

```text
getId()
getName()
setName()
getPrice()
setPrice()
applyDiscount()
```

---

# 136. Mini Project — Order

Create:

```text
Order
```

State:

```text
NEW
PAID
SHIPPED
DELIVERED
CANCELLED
```

Do not provide:

```java
setStatus()
```

Instead provide:

```text
pay()
ship()
deliver()
cancel()
```

Validate valid state transitions.

This is an excellent encapsulation exercise.

---

# 137. Mini Project — Playlist

Create:

```text
Playlist
```

Internal:

```java
private final List<String> songs;
```

Methods:

```text
addSong()
removeSong()
getSongs()
getSongCount()
clear()
```

Do not expose the mutable internal list directly.

---

# 138. Practice Questions

## Question 1

What is encapsulation?

---

## Question 2

Why are fields commonly declared private?

---

## Question 3

What is the purpose of a getter?

---

## Question 4

What is the purpose of a setter?

---

## Question 5

Why might a class have a getter but no setter?

---

## Question 6

Why can a setter be dangerous if it has no validation?

---

## Question 7

What is data hiding?

---

## Question 8

Is encapsulation the same as abstraction?

---

## Question 9

Why should a BankAccount not normally expose a public balance field?

---

## Question 10

Why can returning a private List still break encapsulation?

---

# 139. More Practice Questions

## Question 11

What is a defensive copy?

---

## Question 12

What is the difference between:

```java
return list;
```

and:

```java
return List.copyOf(list);
```

---

## Question 13

Why can `final List<String>` still be mutable?

---

## Question 14

Why should constructor inputs sometimes be validated?

---

## Question 15

What is an invariant?

---

## Question 16

Why are domain methods sometimes better than setters?

---

## Question 17

Why is `withdraw()` often better than `setBalance()`?

---

## Question 18

What is a read-only property?

---

## Question 19

What is an immutable object?

---

## Question 20

Can an immutable class contain a mutable object?

Explain what extra work is required.

---

# 140. Output Questions

## Output 1

```java
class Student {
    private int marks = 80;

    public int getMarks() {
        return marks;
    }
}

Student s = new Student();

System.out.println(s.getMarks());
```

Output:

```text
80
```

---

## Output 2

```java
class Student {
    private int marks;

    public void setMarks(int marks) {
        if (marks >= 0 && marks <= 100) {
            this.marks = marks;
        }
    }

    public int getMarks() {
        return marks;
    }
}
```

If:

```java
Student s = new Student();

s.setMarks(150);

System.out.println(s.getMarks());
```

Output:

```text
0
```

because the invalid value is rejected and the field retains its default value.

---

## Output 3

```java
class Student {
    private int marks;

    public void setMarks(int marks) {
        if (marks < 0 || marks > 100) {
            throw new IllegalArgumentException();
        }

        this.marks = marks;
    }
}
```

If:

```java
Student s = new Student();
s.setMarks(150);
```

Result:

```text
IllegalArgumentException
```

---

## Output 4

```java
class User {
    private final int id;

    User(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
```

There is no public setter.

Therefore:

```java
user.setId(20);
```

does not compile because the method does not exist.

---

## Output 5

```java
class Test {
    private int x = 10;

    public int getX() {
        return x;
    }
}
```

This is valid:

```java
Test t = new Test();
System.out.println(t.getX());
```

Output:

```text
10
```

---

# 141. Interview Questions — Basic

## Q1. What is encapsulation in Java?

Encapsulation is the bundling of state and behavior inside a class while controlling access to the internal state.

---

## Q2. How is encapsulation commonly achieved in Java?

Commonly through:

```text
private fields
public/protected methods
controlled operations
validation
appropriate access modifiers
```

---

## Q3. What is data hiding?

Data hiding means restricting direct access to internal implementation details, often using `private`.

---

## Q4. Why should fields usually be private?

Private fields allow the class to control how state is read and modified and reduce direct coupling to its representation.

---

## Q5. What is a getter?

A getter is a method that provides read access to a value.

Example:

```java
public int getAge() {
    return age;
}
```

---

## Q6. What is a setter?

A setter is a method that changes a value under whatever rules the class defines.

Example:

```java
public void setAge(int age) {
    this.age = age;
}
```

---

## Q7. Does every private field need a getter and setter?

No.

Only expose operations that make sense for the class's public API.

---

## Q8. Why might a field have a getter but no setter?

The value may be intended to be read-only after construction.

Example:

```java
private final int id;
```

---

## Q9. Why can a setter be better than direct field access?

A setter can:

```text
validate input
normalize input
enforce business rules
trigger related behavior
```

---

## Q10. What is an invariant?

An invariant is a condition that should remain true for a valid object's state.

---

# 142. Interview Questions — Intermediate

## Q11. Is encapsulation just private variables plus getters and setters?

No.

That is only one common implementation technique.

Good encapsulation also involves:

```text
controlled behavior
invariants
implementation hiding
appropriate public APIs
```

---

## Q12. What is defensive copying?

Creating a separate copy of mutable data so external code cannot directly modify an object's internal mutable state.

---

## Q13. Why is returning a mutable collection dangerous?

Because the caller may receive a reference to the internal collection and mutate the object's internal state.

---

## Q14. How can you safely expose a collection?

Depending on requirements:

```java
return new ArrayList<>(items);
```

or:

```java
return List.copyOf(items);
```

or:

```java
return Collections.unmodifiableList(items);
```

Each has different semantics.

---

## Q15. What is the difference between defensive copy and unmodifiable view?

A defensive copy creates a separate collection.

An unmodifiable view prevents modification through that view but can reflect changes made to the original collection by the owning class.

---

## Q16. Does `private` make an object immutable?

No.

`private` controls direct access.

An object can still change through public methods.

---

## Q17. Does `final` make an object immutable?

No.

`final` prevents reassignment of a variable/reference, but the referenced object may still be mutable.

---

## Q18. Can a class be encapsulated but mutable?

Yes.

Example:

```java
class BankAccount {
    private double balance;

    public void deposit(double amount) {
        balance += amount;
    }
}
```

The state changes, but direct access is controlled.

---

## Q19. Can an immutable class contain a mutable object?

Yes, but it must prevent external mutation of that mutable object, often through defensive copying or immutable representations.

---

## Q20. Why are domain methods often better than generic setters?

Domain methods express valid operations and allow the class to enforce business rules.

Example:

```java
withdraw(500)
```

is often more meaningful than:

```java
setBalance(4500)
```

---

# 143. Interview Questions — Advanced

## Q21. How does encapsulation reduce coupling?

It prevents outside classes from depending directly on internal representation.

---

## Q22. How does encapsulation support maintainability?

Internal implementation can change while the public API remains stable.

---

## Q23. What is representation independence?

The ability to change how an object stores its data without requiring callers to change, as long as the public behavior remains compatible.

---

## Q24. Why is a public mutable field often poor design?

Any caller can modify it without validation or controlled behavior, creating stronger coupling and potentially invalid state.

---

## Q25. What is a class invariant?

A condition that the class guarantees for valid instances.

---

## Q26. Should validation happen in constructors?

If the object must satisfy a rule from the moment it exists, validating constructor inputs is appropriate.

---

## Q27. Should validation happen only in setters?

Not necessarily.

Constructors and other state-changing methods should also maintain the object's invariants.

---

## Q28. Can encapsulation improve security?

It can reduce accidental misuse and establish controlled boundaries, but Java access modifiers are not a substitute for real security mechanisms.

---

## Q29. What is information hiding?

Keeping implementation details private so clients depend on behavior rather than internal representation.

---

## Q30. What is the relationship between encapsulation and abstraction?

Encapsulation controls and protects implementation/state; abstraction focuses on exposing the essential interface while hiding unnecessary complexity. They often work together.

---

# 144. Common Interview Trap

Question:

> If a field is private and has a public setter, is the data completely protected?

Answer:

No.

Example:

```java
private int balance;

public void setBalance(int balance) {
    this.balance = balance;
}
```

The field cannot be accessed directly, but the public setter may allow arbitrary changes.

Good encapsulation requires a meaningful API and appropriate validation.

---

# 145. Common Interview Trap

Question:

> Is `private` enough to make a class immutable?

Answer:

No.

Example:

```java
class Counter {
    private int value;

    public void increment() {
        value++;
    }
}
```

The field is private but the object is mutable.

---

# 146. Common Interview Trap

Question:

> Is `final` enough to make a List immutable?

Answer:

No.

```java
private final List<String> list =
    new ArrayList<>();
```

The reference cannot be reassigned, but the list can still be changed.

---

# 147. Common Interview Trap

Question:

> Is returning a private object field safe?

Answer:

It depends.

For an immutable object such as `String`, returning the reference is generally safe from mutation.

For a mutable object such as `ArrayList`, returning the internal reference may expose mutable state.

---

# 148. Encapsulation Design Rules

Remember these rules:

```text
1. Keep internal state private when possible.

2. Expose behavior rather than raw representation.

3. Validate state-changing inputs.

4. Do not create setters automatically for every field.

5. Use final when a field should not be reassigned.

6. Protect mutable internal objects from external mutation.

7. Prefer domain-specific operations.

8. Keep implementation helpers private.

9. Maintain class invariants.

10. Design the public API around what callers actually need.
```

---

# 149. One Complete Example

```java
import java.util.ArrayList;
import java.util.List;

final class BankAccount {

    private final String accountNumber;
    private final String ownerName;
    private double balance;
    private final List<String> transactions =
        new ArrayList<>();

    BankAccount(
        String accountNumber,
        String ownerName,
        double initialBalance
    ) {
        if (accountNumber == null ||
            accountNumber.isBlank()) {
            throw new IllegalArgumentException(
                "Account number is required"
            );
        }

        if (ownerName == null ||
            ownerName.isBlank()) {
            throw new IllegalArgumentException(
                "Owner name is required"
            );
        }

        if (initialBalance < 0) {
            throw new IllegalArgumentException(
                "Initial balance cannot be negative"
            );
        }

        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = initialBalance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        validateAmount(amount);

        balance += amount;

        transactions.add(
            "Deposited: " + amount
        );
    }

    public boolean withdraw(double amount) {
        validateAmount(amount);

        if (amount > balance) {
            return false;
        }

        balance -= amount;

        transactions.add(
            "Withdrawn: " + amount
        );

        return true;
    }

    public List<String> getTransactions() {
        return List.copyOf(transactions);
    }

    private void validateAmount(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive"
            );
        }
    }
}
```

---

# 150. Why This Is a Strong Example

The class demonstrates:

```text
private fields
final fields
constructor validation
getter methods
domain methods
private helper
collection encapsulation
defensive/unmodifiable copying
business rules
controlled state changes
```

This is much closer to real OOP design than simply creating getters and setters for everything.

---

# 151. Final Mental Model

Think of a class as a small machine.

```text
                PUBLIC API
                    |
        +-----------+-----------+
        |                       |
      read                   operate
        |                       |
     getters              domain methods
        |                       |
        +-----------+-----------+
                    |
             PRIVATE STATE
                    |
          validation + rules
```

Outside code interacts with the machine through its API.

The internal mechanism remains under the class's control.

---

# 152. Final Summary

Encapsulation means:

```text
keep data and related behavior together
+
control access to internal state
+
protect valid object state
+
hide unnecessary implementation details
```

In Java, the most important tools are:

```text
private
public
protected
getters
setters
final
validation
defensive copying
domain methods
```

The most important lesson is:

> **Do not just hide fields. Design the class so that the object controls its own valid state.**

---

# 153. Most Important Rules to Remember

```text
1. Encapsulation protects and controls object state.

2. private is the most common tool for hiding fields.

3. A getter provides read access.

4. A setter provides controlled write access.

5. Not every field needs a getter.

6. Not every field needs a setter.

7. final can prevent reassignment.

8. final does not automatically make referenced objects immutable.

9. Validate constructor inputs when required.

10. Validate every state-changing operation that can violate an invariant.

11. Prefer domain methods over unrestricted setters when appropriate.

12. Do not return internal mutable collections directly unless that exposure is intentional.

13. Use defensive copies or unmodifiable results when needed.

14. Encapsulation is broader than getters and setters.

15. Encapsulation reduces coupling.

16. Encapsulation improves maintainability.

17. Encapsulation supports information hiding.

18. Encapsulation and abstraction are related but different.

19. private is not encryption or complete security.

20. A good class owns the rules for maintaining its valid state.
```

---

# 154. Chapter 15 Complete

You now have the foundation needed to design safer Java objects:

```text
Class
  ↓
Object
  ↓
State
  ↓
private state
  ↓
controlled methods
  ↓
validation
  ↓
valid object
```

The next chapter moves to another major OOP pillar:

# Chapter 16 — Inheritance

You will learn:

```text
✓ Why inheritance?
✓ extends
✓ Parent class
✓ Child class
✓ IS-A relationship
✓ Single inheritance
✓ Multilevel inheritance
✓ Hierarchical inheritance
✓ super
✓ Parent constructors
✓ Constructor execution order
✓ Method inheritance
✓ Field inheritance
✓ Method overriding preview
✓ Access modifiers
✓ protected
✓ Object class connection
✓ Common inheritance mistakes
✓ Composition vs inheritance
✓ Practical programs
✓ Exercises
✓ Interview questions
```

