# Chapter 28 — Enums in Java

## 1. Learning goals

After completing this chapter, you should be able to:

- Explain what an enum is and why it is useful.
- Declare an enum and access its constants.
- Use enums with `switch`, `if`, and loops.
- Understand `values()`, `valueOf()`, `name()`, and `ordinal()`.
- Add fields, constructors, and methods to an enum.
- Use enums to represent states, roles, directions, and fixed choices.
- Understand enum comparison, `EnumSet`, and `EnumMap`.
- Avoid common mistakes involving strings, ordinals, and enum constructors.
- Build a small practical project using enums.

---

## 2. What is an enum?

An **enum** (short for *enumeration*) is a special Java type used to represent a fixed set of named constants.

For example, a traffic light can have only a small set of states:

- `RED`
- `YELLOW`
- `GREEN`

You could store the state in a string:

```java
String signal = "RED";
```

But a string can contain almost anything:

```java
String signal = "PURPLE";
```

That value is not a valid traffic-light state, yet Java accepts it as a string.

An enum lets you define the permitted values:

```java
enum TrafficLight {
    RED,
    YELLOW,
    GREEN
}
```

Now a variable of type `TrafficLight` can refer only to one of the constants declared in that enum (or be `null` as a reference).

### Why are enums useful?

Enums make code:

- **Safer:** A variable cannot accidentally contain an arbitrary string as an enum value.
- **Clearer:** `OrderStatus.SHIPPED` explains its meaning better than a magic number such as `2`.
- **Easier to maintain:** Valid choices are defined in one place.
- **Easier to use with `switch`:** Enum constants work naturally in switch statements and expressions.

Enums are especially useful when a value must come from a known, finite list.

---

## 3. Declaring an enum

An enum is declared using the `enum` keyword.

```java
enum Day {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}
```

The constants are conventionally written in uppercase, with underscores between words when needed. This is a naming convention rather than a strict language requirement.

### Using the enum

```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public class Main {
    public static void main(String[] args) {
        Day today = Day.MONDAY;

        System.out.println(today);
        System.out.println(today == Day.MONDAY);
    }
}
```

Output:

```text
MONDAY
true
```

`Day.MONDAY` means the `MONDAY` constant belonging to the `Day` enum. The type name before the dot makes it clear which enum the constant comes from.

An enum declaration can be a top-level type in its own file, or it can be nested inside another class. For a public top-level enum, the filename must match the enum name, such as `Day.java`.

---

## 4. Why not use integers or strings?

Imagine representing an order's status with numbers:

```java
int status = 2;
```

What does `2` mean? A developer must remember the mapping. Another developer might use a different mapping, leading to errors.

Using strings is more readable:

```java
String status = "SHIPPED";
```

However, strings can contain spelling mistakes or unsupported values:

```java
String status = "SHIPED";
```

Java does not treat `"SHIPED"` as a compile-time error just because the intended word was `"SHIPPED"`.

With an enum:

```java
enum OrderStatus {
    PLACED,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}

OrderStatus status = OrderStatus.SHIPPED;
```

The compiler checks that the constant exists in `OrderStatus`.

| Approach | Example | Main issue or benefit |
|---|---|---|
| Integer | `int status = 2;` | Meaning of the number may be unclear |
| String | `String status = "SHIPPED";` | Can contain invalid spellings or values |
| Enum | `OrderStatus.SHIPPED` | Clear and restricted to declared constants |

---

## 5. Enum constants are objects

An enum is not simply a collection of strings. Each enum constant is an instance of the enum type.

```java
enum Size {
    SMALL,
    MEDIUM,
    LARGE
}
```

`Size.SMALL` is an enum object of type `Size`. It is not the string `"SMALL"`.

```java
Size size = Size.MEDIUM;
String text = "MEDIUM";

System.out.println(size.equals(text));
System.out.println(size.toString());
System.out.println(text);
```

Output:

```text
false
MEDIUM
MEDIUM
```

The last two lines look the same when printed, but the values have different types.

This object-based design lets enums have fields, constructors, and methods, as covered later in the chapter.

---

## 6. Accessing enum constants

Use the enum type name and a dot.

```java
enum Level {
    LOW,
    MEDIUM,
    HIGH
}

public class Main {
    public static void main(String[] args) {
        Level first = Level.LOW;
        Level second = Level.HIGH;

        System.out.println(first);
        System.out.println(second);
    }
}
```

Output:

```text
LOW
HIGH
```

You can assign one enum constant to a variable of the same enum type:

```java
Level level = Level.MEDIUM;
```

But you cannot assign a constant from an unrelated enum:

```java
enum Level { LOW, MEDIUM, HIGH }
enum Priority { LOW, NORMAL, URGENT }

// Invalid:
// Level level = Priority.URGENT;
```

Even if two enums have constants with similar names, their types remain different.

---

## 7. Comparing enum values

Enum constants are unique instances, so you can safely use `==` to compare enum values.

```java
enum Status {
    PENDING,
    APPROVED,
    REJECTED
}

public class Main {
    public static void main(String[] args) {
        Status status = Status.APPROVED;

        if (status == Status.APPROVED) {
            System.out.println("Request approved.");
        } else {
            System.out.println("Request not approved.");
        }
    }
}
```

Output:

```text
Request approved.
```

`==` is appropriate for enum constants because each declared constant is a unique instance. `equals()` also works:

```java
System.out.println(status.equals(Status.APPROVED));
```

This prints `true`, but if `status` might be `null`, calling `status.equals(...)` would throw `NullPointerException`. A comparison such as `status == Status.APPROVED` is null-safe and simply returns `false` when `status` is null.

---

## 8. Using enums with `switch`

Enums work very well with `switch`.

```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public class Main {
    public static void main(String[] args) {
        Day day = Day.SATURDAY;

        switch (day) {
            case SATURDAY:
            case SUNDAY:
                System.out.println("Weekend");
                break;
            default:
                System.out.println("Weekday");
        }
    }
}
```

Output:

```text
Weekend
```

Inside a `switch` whose selector is an enum, write the constant name directly in each `case`, without repeating the enum type.

### Using a switch expression

Modern Java supports switch expressions, which return a value.

```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public class Main {
    public static void main(String[] args) {
        Day day = Day.SUNDAY;

        String type = switch (day) {
            case SATURDAY, SUNDAY -> "Weekend";
            default -> "Weekday";
        };

        System.out.println(type);
    }
}
```

Output:

```text
Weekend
```

Switch expressions with arrow labels require Java 14 or newer as a standard feature. If you are using an older Java version, use a traditional `switch` statement.

### Why switch expressions are useful

They can assign a result directly and reduce accidental fall-through. With enum switch expressions, the compiler can also detect missing enum cases in situations where no `default` is supplied.

---

## 9. Looping through enum constants with `values()`

Every enum type has a compiler-provided static `values()` method that returns an array containing its constants in declaration order.

```java
enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST
}

public class Main {
    public static void main(String[] args) {
        for (Direction direction : Direction.values()) {
            System.out.println(direction);
        }
    }
}
```

Output:

```text
NORTH
EAST
SOUTH
WEST
```

### What does `values()` return?

For the enum `Direction`, `Direction.values()` returns a `Direction[]` array.

You can store it in a variable:

```java
Direction[] directions = Direction.values();
System.out.println(directions.length);
```

Output:

```text
4
```

Use `values()` when you want to show every available option, populate a menu, or iterate through all constants for testing.

The returned array is a copy of the enum's constant list; modifying that array does not change the enum declaration itself.

---

## 10. Converting a string to an enum with `valueOf()`

The compiler-provided static `valueOf(String)` method retrieves a constant by its exact declared name.

```java
enum Color {
    RED,
    GREEN,
    BLUE
}

public class Main {
    public static void main(String[] args) {
        Color color = Color.valueOf("GREEN");
        System.out.println(color);
    }
}
```

Output:

```text
GREEN
```

The string must match the constant name exactly, including case.

```java
Color color = Color.valueOf("green");
```

This throws `IllegalArgumentException`, because the declared constant is `GREEN`, not `green`.

If the supplied text comes from a user, file, or network, validate it or catch the exception.

### A safer input example

```java
enum Color {
    RED, GREEN, BLUE
}

public class Main {
    public static void main(String[] args) {
        String input = "green";

        try {
            Color color = Color.valueOf(input.trim().toUpperCase());
            System.out.println("Selected: " + color);
        } catch (IllegalArgumentException e) {
            System.out.println("Unknown color.");
        }
    }
}
```

Output:

```text
Selected: GREEN
```

This example uses `trim()` and `toUpperCase()` for simple English constant names. For locale-sensitive text or a public-facing application, define a deliberate normalization strategy instead of relying on the user's default locale.

If the input is `null`, `valueOf(null)` throws `NullPointerException`, not `IllegalArgumentException`, so check for null when it is possible.

---

## 11. `name()`, `toString()`, and `ordinal()`

Enums provide several useful methods.

### 11.1 `name()`

`name()` returns the exact identifier used in the enum declaration.

```java
enum Status {
    IN_PROGRESS,
    COMPLETED
}

public class Main {
    public static void main(String[] args) {
        Status status = Status.IN_PROGRESS;

        System.out.println(status.name());
    }
}
```

Output:

```text
IN_PROGRESS
```

### 11.2 `toString()`

By default, `toString()` returns the constant's name. An enum can override `toString()` to provide a more user-friendly label.

```java
enum Status {
    IN_PROGRESS,
    COMPLETED
}

public class Main {
    public static void main(String[] args) {
        Status status = Status.IN_PROGRESS;

        System.out.println(status.toString());
    }
}
```

Output:

```text
IN_PROGRESS
```

### 11.3 `ordinal()`

`ordinal()` returns the zero-based position of a constant in the enum declaration.

```java
enum Priority {
    LOW,
    MEDIUM,
    HIGH
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Priority.LOW.ordinal());
        System.out.println(Priority.MEDIUM.ordinal());
        System.out.println(Priority.HIGH.ordinal());
    }
}
```

Output:

```text
0
1
2
```

**Important:** Do not use `ordinal()` as a permanent ID or store it as a stable external code. If you insert or reorder constants, ordinal values can change. If you need a stable number or text code, define an explicit field in the enum.

### Comparison

| Method | Meaning | Can be customized? |
|---|---|---|
| `name()` | Exact declared constant name | No |
| `toString()` | Text representation | Yes, can be overridden |
| `ordinal()` | Zero-based declaration position | No; position follows declaration order |

Use `name()` when you need the exact declared identifier. Use `toString()` for display only when its output is designed for that purpose. Do not treat either as a stable external protocol unless you deliberately define that contract.

---

## 12. Enums can have fields, constructors, and methods

One of the most powerful features of Java enums is that they can contain data and behavior.

Suppose you want to represent HTTP response categories or order states with a readable label.

```java
enum OrderStatus {
    PLACED("Order placed"),
    CONFIRMED("Order confirmed"),
    SHIPPED("Order shipped"),
    DELIVERED("Order delivered"),
    CANCELLED("Order cancelled");

    private final String description;

    OrderStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}

public class Main {
    public static void main(String[] args) {
        OrderStatus status = OrderStatus.SHIPPED;

        System.out.println(status);
        System.out.println(status.getDescription());
    }
}
```

Output:

```text
SHIPPED
Order shipped
```

### Explanation

- Each constant passes a string to the enum constructor.
- `description` stores that string.
- The constructor assigns the value to the field.
- `getDescription()` returns the description.
- `private final` prevents ordinary outside code from changing the field and makes the reference fixed after construction.

### Why is there a semicolon after the constants?

When an enum contains fields, constructors, or methods after its constants, put a semicolon after the final constant:

```java
enum Example {
    FIRST,
    SECOND; // Separates constants from the body members

    private final int code = 1;

    public int getCode() {
        return code;
    }
}
```

If the enum contains only constants, the semicolon is optional.

---

## 13. Enum constructors

Enum constructors work differently from ordinary class constructors.

```java
enum Planet {
    EARTH(3),
    MARS(4),
    JUPITER(5);

    private final int position;

    Planet(int position) {
        this.position = position;
    }

    public int getPosition() {
        return position;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Planet.EARTH.getPosition());
        System.out.println(Planet.MARS.getPosition());
    }
}
```

Output:

```text
3
4
```

### Important rules

1. Enum constructors are implicitly private; they cannot be public or protected.
2. You cannot create enum instances with `new` from ordinary code.
3. The constants are created by the enum declaration.
4. Each constant can pass arguments to the enum constructor.
5. Enum constructors run as the enum constants are initialized.

This is invalid:

```java
// Invalid:
// Planet p = new Planet(3);
```

Use the declared constant instead:

```java
Planet p = Planet.EARTH;
```

An enum constructor is not called manually by application code.

---

## 14. Each enum constant can have different data

An enum can store multiple values for each constant.

```java
enum HttpStatus {
    OK(200, "Success"),
    NOT_FOUND(404, "Not found"),
    SERVER_ERROR(500, "Server error");

    private final int code;
    private final String message;

    HttpStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}

public class Main {
    public static void main(String[] args) {
        HttpStatus status = HttpStatus.NOT_FOUND;

        System.out.println(status.getCode());
        System.out.println(status.getMessage());
    }
}
```

Output:

```text
404
Not found
```

This is more meaningful than using a number and separately remembering what each number means.

For real HTTP applications, there are many status codes and additional protocol details. The example is only a small illustration of enum-associated data.

---

## 15. Enum methods

Enums can define instance methods and static methods just like classes.

```java
enum TrafficLight {
    RED,
    YELLOW,
    GREEN;

    public boolean canDrive() {
        return this == GREEN;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(TrafficLight.RED.canDrive());
        System.out.println(TrafficLight.GREEN.canDrive());
    }
}
```

Output:

```text
false
true
```

### Understanding `this`

Inside `canDrive()`, `this` refers to the enum constant on which the method is called.

- `TrafficLight.RED.canDrive()` makes `this` refer to `RED`.
- `TrafficLight.GREEN.canDrive()` makes `this` refer to `GREEN`.

This is similar to calling an instance method on an object of an ordinary class.

### A static helper method

```java
enum Size {
    SMALL,
    MEDIUM,
    LARGE;

    public static Size defaultSize() {
        return MEDIUM;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Size.defaultSize());
    }
}
```

Output:

```text
MEDIUM
```

Call a static enum method through the enum type name.

---

## 16. Enum constants with constant-specific behavior

Sometimes each enum constant needs different behavior. Java allows a constant to have its own class body that overrides an enum method.

```java
enum Operation {
    ADD {
        @Override
        public int apply(int a, int b) {
            return a + b;
        }
    },
    SUBTRACT {
        @Override
        public int apply(int a, int b) {
            return a - b;
        }
    },
    MULTIPLY {
        @Override
        public int apply(int a, int b) {
            return a * b;
        }
    };

    public abstract int apply(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Operation.ADD.apply(10, 5));
        System.out.println(Operation.SUBTRACT.apply(10, 5));
        System.out.println(Operation.MULTIPLY.apply(10, 5));
    }
}
```

Output:

```text
15
5
50
```

### How does this work?

- `Operation` declares an abstract method `apply()`.
- Every constant provides an implementation.
- Calling `apply()` on a constant runs that constant's implementation.

This is a form of polymorphic behavior. It can be useful when each fixed option has a distinct operation, but do not use it merely to make a simple enum look complicated. A regular switch may be clearer for small cases.

---

## 17. Enums and polymorphism

An enum can implement an interface, and code can use the interface type to work with enum constants polymorphically.

```java
interface Describable {
    String describe();
}

enum AccountType implements Describable {
    SAVINGS,
    CURRENT;

    @Override
    public String describe() {
        return switch (this) {
            case SAVINGS -> "Savings account";
            case CURRENT -> "Current account";
        };
    }
}

public class Main {
    public static void main(String[] args) {
        Describable account = AccountType.SAVINGS;
        System.out.println(account.describe());
    }
}
```

Output:

```text
Savings account
```

The variable is declared as `Describable`, but the actual object is an `AccountType` enum constant. The overridden method is called through the interface reference.

The switch expression shown here requires Java 14 or newer. With older Java, implement the method using a traditional switch statement.

---

## 18. Using enums in classes

Enums often appear as fields inside ordinary classes.

```java
enum OrderStatus {
    PLACED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}

class Order {
    private final int orderId;
    private OrderStatus status;

    public Order(int orderId) {
        this.orderId = orderId;
        this.status = OrderStatus.PLACED;
    }

    public void ship() {
        status = OrderStatus.SHIPPED;
    }

    public void deliver() {
        status = OrderStatus.DELIVERED;
    }

    public int getOrderId() {
        return orderId;
    }

    public OrderStatus getStatus() {
        return status;
    }
}

public class Main {
    public static void main(String[] args) {
        Order order = new Order(101);

        System.out.println(order.getStatus());
        order.ship();
        System.out.println(order.getStatus());
        order.deliver();
        System.out.println(order.getStatus());
    }
}
```

Output:

```text
PLACED
SHIPPED
DELIVERED
```

The `Order` class uses an enum to represent its state. This is clearer and safer than storing status values as arbitrary strings.

This example does not enforce every possible business rule. For example, a full order system should decide whether shipping a cancelled order is allowed and validate state transitions accordingly.

---

## 19. Enum constants and `null`

A variable of an enum type is a reference, so it can be null.

```java
enum Direction {
    NORTH, SOUTH, EAST, WEST
}

public class Main {
    public static void main(String[] args) {
        Direction direction = null;

        System.out.println(direction == Direction.NORTH);
    }
}
```

Output:

```text
false
```

Using `==` here is safe. But calling a method on the null reference is not:

```java
// Throws NullPointerException:
// System.out.println(direction.name());
```

If an enum value is required, validate it before using it. Avoid adding a fake enum constant such as `UNKNOWN` unless it has a real meaning in your application. `null` and a meaningful `UNKNOWN` state are not automatically equivalent.

---

## 20. EnumSet

`EnumSet` is a specialized `Set` implementation designed specifically for enum values. It is efficient and provides useful operations for sets of enum constants.

```java
import java.util.EnumSet;
import java.util.Set;

enum Permission {
    READ,
    WRITE,
    DELETE,
    SHARE
}

public class Main {
    public static void main(String[] args) {
        Set<Permission> permissions =
            EnumSet.of(Permission.READ, Permission.WRITE);

        System.out.println(permissions);
        System.out.println(permissions.contains(Permission.READ));
        System.out.println(permissions.contains(Permission.DELETE));
    }
}
```

Example output:

```text
[READ, WRITE]
true
false
```

The exact printed order follows the enum declaration order for this set.

### Useful `EnumSet` methods

```java
EnumSet<Permission> all = EnumSet.allOf(Permission.class);
EnumSet<Permission> none = EnumSet.noneOf(Permission.class);
EnumSet<Permission> selected = EnumSet.of(Permission.READ, Permission.SHARE);
```

- `allOf()` creates a set containing every enum constant.
- `noneOf()` creates an empty enum set.
- `of()` creates a set containing the specified constants.

You can also use ordinary set methods such as `add()`, `remove()`, `contains()`, and `containsAll()`.

`EnumSet` cannot contain `null`. Use it when the possible values are all constants of one enum type.

---

## 21. EnumMap

`EnumMap` is a specialized map whose keys are constants from a single enum type.

```java
import java.util.EnumMap;
import java.util.Map;

enum Day {
    MONDAY,
    TUESDAY,
    WEDNESDAY
}

public class Main {
    public static void main(String[] args) {
        Map<Day, String> plans = new EnumMap<>(Day.class);

        plans.put(Day.MONDAY, "Study Java");
        plans.put(Day.TUESDAY, "Practice DSA");
        plans.put(Day.WEDNESDAY, "Build a project");

        System.out.println(plans.get(Day.MONDAY));
        System.out.println(plans.get(Day.WEDNESDAY));
    }
}
```

Output:

```text
Study Java
Build a project
```

### Why use `EnumMap`?

- Its keys are restricted to one enum type.
- It is designed specifically for enum keys and is generally efficient.
- Iteration follows the enum's natural order (declaration order).

An `EnumMap` needs the enum class in its constructor so it knows the key type, even when the map is initially empty.

---

## 22. Enum versus `final` constants

Before enums, developers often used named integer constants:

```java
public class OldStyle {
    public static final int LOW = 1;
    public static final int MEDIUM = 2;
    public static final int HIGH = 3;
}
```

These constants are better than unexplained numbers, but the variable that stores them can still be an ordinary `int`:

```java
int level = 999; // Compiles, even though it is not one of the intended levels
```

With an enum:

```java
enum Level {
    LOW,
    MEDIUM,
    HIGH
}

Level level = Level.HIGH;
```

The compiler restricts the variable to the `Level` type.

### Comparison

| Feature | `static final` integer constants | Enum |
|---|---|---|
| Named options | Yes | Yes |
| Distinct type | No, often all are `int` | Yes |
| Can store associated fields | Not naturally per constant | Yes |
| Can define behavior | Through separate methods | Can define methods and constant-specific behavior |
| Compiler restricts valid choices | No, not for ordinary `int` variables | Yes, to constants of that enum type |

Use enums when a set of alternatives forms a meaningful type. Use constants for fixed values that are not naturally one of a finite set of alternatives.

---

## 23. Enums in real applications

Enums appear in many kinds of applications.

### 23.1 Order management

```java
enum OrderStatus {
    PLACED,
    CONFIRMED,
    PACKED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}
```

An order has a state that changes during its lifecycle.

### 23.2 User roles

```java
enum UserRole {
    ADMIN,
    EDITOR,
    VIEWER
}
```

This can help represent a user's role. However, declaring an enum does not automatically implement security. Your application must still check permissions on every relevant operation.

### 23.3 Directions

```java
enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST
}
```

A game or navigation program can use the constants instead of arbitrary strings.

### 23.4 Payment methods

```java
enum PaymentMethod {
    CARD,
    CASH,
    BANK_TRANSFER,
    WALLET
}
```

A checkout system can use a fixed set of payment-method categories. Real systems may need additional information or extensibility beyond an enum.

### 23.5 Application state

```java
enum AppState {
    STARTING,
    RUNNING,
    PAUSED,
    STOPPED,
    FAILED
}
```

A state machine can use an enum to describe the current state, then define valid transitions between states.

---

## 24. Persisting enum values

When saving an enum to a text file or database, you must decide how to represent it.

A common simple option is to save its name:

```java
OrderStatus status = OrderStatus.SHIPPED;
String stored = status.name();

System.out.println(stored);
```

Output:

```text
SHIPPED
```

Later, you can restore it with:

```java
OrderStatus restored = OrderStatus.valueOf(stored);
```

This is simple, but renaming a constant can break data that stores the old name. For long-lived data formats, consider defining an explicit stable code or using a deliberate serialization mapping.

Do not store `ordinal()` as a durable identifier because adding or reordering constants can change ordinal values.

Example with a stable explicit code:

```java
enum OrderStatus {
    PLACED("P"),
    SHIPPED("S"),
    DELIVERED("D"),
    CANCELLED("C");

    private final String code;

    OrderStatus(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static OrderStatus fromCode(String code) {
        for (OrderStatus status : values()) {
            if (status.code.equals(code)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown status code: " + code);
    }
}

public class Main {
    public static void main(String[] args) {
        String stored = OrderStatus.SHIPPED.getCode();
        OrderStatus restored = OrderStatus.fromCode(stored);

        System.out.println(stored);
        System.out.println(restored);
    }
}
```

Output:

```text
S
SHIPPED
```

The code is explicit and separate from the constant name. In production code, also validate null input and decide how unknown codes should be handled.

---

## 25. Common mistakes and how to avoid them

**Mistake 1: Treating an enum constant as a string.**

```java
// Incorrect comparison between different types:
if (status == "SHIPPED") {
}
```

Correct:

```java
if (status == OrderStatus.SHIPPED) {
}
```

If you have a string from input, convert it deliberately with `valueOf()` or a custom parser.

**Mistake 2: Wrong capitalization in `valueOf()`.**

`OrderStatus.valueOf("shipped")` fails if the constant is declared as `SHIPPED`. Normalize input if appropriate, and handle invalid input.

**Mistake 3: Using `ordinal()` as a permanent ID.**

Ordinals depend on declaration order. Use an explicit code field when stability matters.

**Mistake 4: Trying to create an enum with `new`.**

Enum instances are declared as constants. You cannot instantiate an enum with an ordinary constructor call.

**Mistake 5: Declaring an enum constructor as public.**

Enum constructors are implicitly private. They cannot be public or protected.

**Mistake 6: Forgetting the semicolon before fields and methods.**

When an enum body has members after the constants, separate the constants from the body members with a semicolon.

**Mistake 7: Assuming enum values cannot be null.**

Enum variables are references and can be null. Check them if null is possible.

**Mistake 8: Believing an enum automatically enforces business rules.**

An enum restricts the set of values, but your application must still validate legal transitions and operations.

**Mistake 9: Using `toString()` as a stable data format.**

`toString()` can be overridden. Use an explicit, documented representation for data that must remain stable.

**Mistake 10: Assuming an enum is the best solution for an open-ended list.**

Enums are best for a finite set known at compile time. If users can create new categories dynamically, a database or other data model may be more appropriate.

---

## 26. Practical program: menu-driven calculator

This program uses an enum to represent operations.

```java
import java.util.Scanner;

enum Operation {
    ADD,
    SUBTRACT,
    MULTIPLY,
    DIVIDE
}

public class Main {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Enter first number: ");
            double a = scanner.nextDouble();

            System.out.print("Enter second number: ");
            double b = scanner.nextDouble();

            System.out.print("Choose operation (ADD, SUBTRACT, MULTIPLY, DIVIDE): ");
            String input = scanner.next().trim().toUpperCase();

            try {
                Operation operation = Operation.valueOf(input);

                switch (operation) {
                    case ADD:
                        System.out.println("Result: " + (a + b));
                        break;
                    case SUBTRACT:
                        System.out.println("Result: " + (a - b));
                        break;
                    case MULTIPLY:
                        System.out.println("Result: " + (a * b));
                        break;
                    case DIVIDE:
                        if (b == 0) {
                            System.out.println("Cannot divide by zero.");
                        } else {
                            System.out.println("Result: " + (a / b));
                        }
                        break;
                }
            } catch (IllegalArgumentException e) {
                System.out.println("Unknown operation.");
            }
        }
    }
}
```

Sample run:

```text
Enter first number: 10
Enter second number: 5
Choose operation (ADD, SUBTRACT, MULTIPLY, DIVIDE): MULTIPLY
Result: 50.0
```

### What this program teaches

- `Operation` defines the only allowed operations.
- `valueOf()` converts the input string to an enum constant.
- Invalid operation names cause `IllegalArgumentException`.
- `switch` selects the correct calculation.
- The program checks for division by zero before dividing.

This simple calculator uses `double`, so it is suitable for demonstrating enums, not for exact financial calculations.

---

## 27. Practical program: order status tracker

```java
enum OrderStatus {
    PLACED,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}

class Order {
    private final int id;
    private OrderStatus status;

    public Order(int id) {
        this.id = id;
        this.status = OrderStatus.PLACED;
    }

    public void setStatus(OrderStatus status) {
        if (status == null) {
            throw new IllegalArgumentException("Status cannot be null.");
        }
        this.status = status;
    }

    public void display() {
        System.out.println("Order ID: " + id);
        System.out.println("Status: " + status);
    }
}

public class Main {
    public static void main(String[] args) {
        Order order = new Order(501);
        order.display();

        order.setStatus(OrderStatus.CONFIRMED);
        order.display();

        order.setStatus(OrderStatus.SHIPPED);
        order.display();
    }
}
```

Output:

```text
Order ID: 501
Status: PLACED
Order ID: 501
Status: CONFIRMED
Order ID: 501
Status: SHIPPED
```

The `setStatus()` method rejects `null`. A production order system should also validate transitions—for example, it may not permit a cancelled order to become shipped.

---

## 28. Output-based questions

Try to predict each output before reading the answer.

### Question 1

```java
enum Color {
    RED, GREEN, BLUE
}

System.out.println(Color.GREEN);
```

**Answer:**

```text
GREEN
```

The default enum `toString()` returns the constant name.

### Question 2

```java
enum Level {
    LOW, MEDIUM, HIGH
}

System.out.println(Level.HIGH.ordinal());
```

**Answer:**

```text
2
```

`HIGH` is at index 2 because ordinal positions begin at zero.

### Question 3

```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY
}

System.out.println(Day.valueOf("TUESDAY"));
```

**Answer:**

```text
TUESDAY
```

The input exactly matches the constant name.

### Question 4

```java
enum Day {
    MONDAY, TUESDAY
}

System.out.println(Day.valueOf("tuesday"));
```

**Answer:** `IllegalArgumentException` is thrown because enum `valueOf()` is case-sensitive.

### Question 5

```java
enum Direction {
    NORTH, SOUTH
}

Direction d = Direction.NORTH;
System.out.println(d == Direction.NORTH);
```

**Answer:**

```text
true
```

Enum constants can be compared with `==`.

### Question 6

```java
enum Size {
    SMALL, MEDIUM, LARGE
}

for (Size size : Size.values()) {
    System.out.print(size + " ");
}
```

**Answer:**

```text
SMALL MEDIUM LARGE
```

`values()` returns the constants in declaration order.

### Question 7

```java
enum State {
    ON, OFF
}

State state = null;
System.out.println(state == State.ON);
```

**Answer:**

```text
false
```

Reference comparison with `==` is safe when one reference is null.

### Question 8

Can the following compile?

```java
enum Priority {
    LOW, HIGH
}

// Priority p = new Priority();
```

**Answer:** No. Enum instances cannot be created using `new` in ordinary application code.

### Question 9

What does `name()` return for `OrderStatus.IN_PROGRESS`?

**Answer:** `IN_PROGRESS`, the exact declared constant name.

### Question 10

Why should you avoid saving `ordinal()` as a database ID?

**Answer:** Inserting or reordering enum constants can change their ordinal values, so the stored ID may later refer to a different constant.

---

## 29. Interview questions and answers

**1. What is an enum in Java?**

An enum is a special type that represents a fixed set of named constants.

**2. Why are enums better than arbitrary strings for fixed choices?**

The compiler checks the enum type and its declared constants, helping prevent invalid values and spelling mistakes.

**3. Can an enum contain fields and methods?**

Yes. Enums can have fields, constructors, instance methods, static methods, and implement interfaces.

**4. Can an enum constructor be public?**

No. Enum constructors are implicitly private and cannot be declared public or protected.

**5. Can you create an enum object using `new`?**

No. Enum instances are defined by the constants in the enum declaration.

**6. What does `values()` do?**

It returns an array of all constants in declaration order.

**7. What does `valueOf()` do?**

It returns the enum constant whose name exactly matches the supplied string. An invalid name causes `IllegalArgumentException`; a null input causes `NullPointerException`.

**8. What is the difference between `name()` and `toString()`?**

`name()` returns the exact declared identifier and cannot be overridden. `toString()` normally returns the name but can be overridden.

**9. What is `ordinal()`?**

It returns the zero-based position of a constant in its declaration. It should not be used as a stable ID.

**10. Can enum constants be compared with `==`?**

Yes. Each enum constant is a unique instance, so `==` is a suitable comparison.

**11. Can an enum implement an interface?**

Yes. An enum can implement one or more interfaces and provide their method implementations.

**12. What is `EnumSet`?**

It is a specialized set implementation designed to store enum constants efficiently.

**13. What is `EnumMap`?**

It is a specialized map whose keys belong to one enum type.

**14. Can an enum variable be null?**

Yes. An enum variable is a reference. Calling an instance method on a null enum reference causes `NullPointerException`.

**15. Can an enum extend an ordinary class?**

No. Every enum implicitly extends `java.lang.Enum`, so it cannot extend another class. It can implement interfaces.

**16. Why should enum values not automatically be used as database codes?**

Names may be renamed and ordinals can change. Stable data formats should use explicit codes or a deliberate mapping.

**17. What is constant-specific class behavior in an enum?**

An enum constant can have its own class body that overrides an enum method, allowing different constants to provide different behavior.

**18. When should you not use an enum?**

Avoid an enum for an open-ended collection of values that users can add or change dynamically. A database or another flexible model may fit better.

---

## 30. Practice exercises

Complete these exercises yourself.

1. Create an enum `Season` with four constants and print each constant using `values()`.
2. Create an enum `Weekday` and use a switch to distinguish weekdays from weekends.
3. Convert a string into a `Color` enum using `valueOf()`, handling invalid input.
4. Print `name()`, `toString()`, and `ordinal()` for each constant in an enum.
5. Create an enum `Priority` with `LOW`, `MEDIUM`, and `HIGH`.
6. Add a description field to `Priority` and return it through a getter.
7. Create an enum `HttpStatus` with a numeric code and message for three example statuses.
8. Write a method on an enum that determines whether a traffic light allows driving.
9. Create an `Order` class whose status is an enum rather than a string.
10. Use `EnumSet` to store a user's selected permissions.
11. Use `EnumMap` to map each day to a study plan.
12. Create an enum that implements an interface.
13. Implement an enum-based calculator with addition, subtraction, multiplication, and division.
14. Add an explicit stable code to an enum and write a method to find a constant by code.
15. Demonstrate why storing `ordinal()` is fragile by inserting a new constant before an existing one and comparing positions.

---

## 31. Mini-project: Task Status Manager

Build a command-line program that manages tasks with a fixed status.

### Requirements

Define the enum:

```java
enum TaskStatus {
    TODO,
    IN_PROGRESS,
    DONE,
    CANCELLED
}
```

Your program should:

1. Create a `Task` class with an ID, title, and `TaskStatus`.
2. Set new tasks to `TODO`.
3. Allow the user to change a task's status by entering a name such as `IN_PROGRESS`.
4. Handle invalid status input without crashing.
5. Display the task's ID, title, and status.
6. Use a `switch` to print an appropriate message for each status.
7. Prevent null statuses.
8. Optionally store several tasks in an `ArrayList<Task>`.

### Suggested class design

```java
enum TaskStatus {
    TODO,
    IN_PROGRESS,
    DONE,
    CANCELLED
}

class Task {
    private final int id;
    private final String title;
    private TaskStatus status;

    public Task(int id, String title) {
        this.id = id;
        this.title = title;
        this.status = TaskStatus.TODO;
    }

    public void setStatus(TaskStatus status) {
        if (status == null) {
            throw new IllegalArgumentException("Status cannot be null.");
        }
        this.status = status;
    }

    public TaskStatus getStatus() {
        return status;
    }
}
```

This is a starting point, not the complete application. Add input handling and output methods yourself.

### Extension challenges

- Add a description to each status.
- Define which status transitions are allowed.
- Store tasks in a file using Chapter 26's file-handling techniques.
- Add a priority enum.
- Use `EnumMap<TaskStatus, Integer>` to count tasks in each status.
- Use `EnumSet` to represent the statuses that a user wants to display.

---

## 32. Revision checklist

Before moving to the next chapter, make sure you can:

- [ ] Define an enum and use its constants.
- [ ] Explain why enums are safer than arbitrary strings or numbers for fixed choices.
- [ ] Compare enum constants using `==`.
- [ ] Use enums in `if` conditions and switch statements.
- [ ] Loop through constants with `values()`.
- [ ] Convert a string to an enum with `valueOf()`.
- [ ] Explain `name()`, `toString()`, and `ordinal()`.
- [ ] Add fields, constructors, and methods to an enum.
- [ ] Explain why enum constructors are private.
- [ ] Implement interfaces with enums.
- [ ] Understand constant-specific behavior.
- [ ] Use `EnumSet` and `EnumMap`.
- [ ] Explain why ordinals are not stable IDs.
- [ ] Handle null and invalid enum input.
- [ ] Complete the Task Status Manager mini-project.

---

## 33. Final summary

Enums provide a type-safe way to represent a fixed set of named constants. They make code clearer and help the compiler prevent unsupported values. You can use enum constants in comparisons and switch statements, iterate through them with `values()`, and retrieve a constant by its exact name using `valueOf()`.

Enums are also full-featured Java types: they can have fields, constructors, methods, and implemented interfaces. `EnumSet` and `EnumMap` provide specialized collections for enum values. Avoid using `ordinal()` as a permanent ID, handle invalid text when parsing, and remember that an enum reference can still be null.

**Next chapter: Chapter 29 — Generics.**
