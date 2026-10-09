# Chapter 41: Lambda Expressions and Functional Interfaces

## 1. What You Will Learn

In this chapter, you will learn:

- Why lambda expressions were introduced in Java.
- How to write lambda expressions with zero, one, or multiple parameters.
- What a functional interface is and why it matters.
- How `@FunctionalInterface` works.
- How to use built-in interfaces such as `Predicate`, `Function`, `Consumer`, `Supplier`, and `UnaryOperator`.
- How lambdas work with collections, sorting, and streams.
- What method references are and how they relate to lambdas.
- How variable capture works and why captured local variables must be effectively final.
- How to write custom functional interfaces.
- Common mistakes, practical examples, interview questions, and exercises.

Lambda expressions were introduced in Java 8. They make it easier to pass behavior—such as a calculation, condition, or action—to a method.

---

## 2. Why Do We Need Lambda Expressions?

Imagine you have a list of numbers and want to print every number.

Without a lambda, you might write:

```java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 20, 30);

        for (Integer number : numbers) {
            System.out.println(number);
        }
    }
}
```

Output:

```text
10
20
30
```

A traditional anonymous class can also represent behavior, but it can become verbose. Java 8 introduced lambda expressions to provide a shorter way to implement a functional interface.

For example:

```java
numbers.forEach(number -> System.out.println(number));
```

Output:

```text
10
20
30
```

The lambda tells Java what action to perform for each number. The `forEach()` method handles the iteration.

A lambda does not replace every loop or every method. It is useful when a method expects behavior through a functional interface.

---

## 3. What Is a Lambda Expression?

A lambda expression is a compact expression that provides an implementation of the single abstract method of a functional interface.

General form:

```java
(parameters) -> expression
```

Or, for multiple statements:

```java
(parameters) -> {
    // statements
};
```

The arrow `->` separates the parameters from the body.

Example:

```java
(a, b) -> a + b
```

This lambda receives two parameters and returns their sum when used with a compatible functional interface.

Another example:

```java
name -> System.out.println(name)
```

This receives one parameter and prints it.

### 3.1 Parts of a lambda

Consider:

```java
(int a, int b) -> {
    int sum = a + b;
    return sum;
}
```

- `(int a, int b)` are the parameters.
- `->` separates parameters and body.
- The braces contain the body.
- `return sum;` returns the result.

Java can often infer parameter types from the target functional interface, so the shorter form is usually preferred:

```java
(a, b) -> a + b
```

---

## 4. Lambda Syntax Rules

### 4.1 Zero parameters

Use empty parentheses:

```java
() -> System.out.println("Hello Java");
```

Example:

```java
Runnable task = () -> System.out.println("Task is running");
task.run();
```

Output:

```text
Task is running
```

### 4.2 One parameter

Parentheses are optional when there is exactly one parameter and its type is inferred:

```java
name -> System.out.println(name)
```

This is also valid:

```java
(name) -> System.out.println(name)
```

If you explicitly write the parameter type, parentheses are required:

```java
(String name) -> System.out.println(name)
```

### 4.3 Multiple parameters

Use parentheses:

```java
(a, b) -> a + b
```

### 4.4 A single expression

When the body is one expression, braces and `return` are not needed:

```java
(a, b) -> a + b
```

The expression's value is returned when the target method expects a return value.

### 4.5 A block body

For multiple statements, use braces. If the target method returns a value, use `return`:

```java
(a, b) -> {
    int sum = a + b;
    return sum;
}
```

For a `void` method, a block can perform actions without returning a value:

```java
name -> {
    System.out.println("Student:");
    System.out.println(name);
}
```

### 4.6 Type inference

These forms can be equivalent when Java knows the target type:

```java
(String name) -> name.length()
name -> name.length()
```

The second form is shorter because the compiler infers that `name` is a `String`.

Do not mix explicitly typed and implicitly typed parameters in the same lambda. For example, avoid `(String name, age) -> ...`; either provide both parameter types or let Java infer both.

---

## 5. What Is a Functional Interface?

A functional interface is an interface with exactly one abstract method, ignoring methods that are public methods of `Object` and considering the language's rules for inherited methods.

It may still contain:
- Default methods.
- Static methods.
- Private helper methods (available in modern Java interfaces).
- Constants.

Examples from Java include:

- `Runnable` — `run()`
- `Comparator<T>` — `compare()`
- `Predicate<T>` — `test()`
- `Function<T, R>` — `apply()`
- `Consumer<T>` — `accept()`
- `Supplier<T>` — `get()`

A lambda expression can implement a functional interface because there is one abstract method for the lambda to provide.

### 5.1 A simple functional interface

```java
@FunctionalInterface
interface Greeting {
    void sayHello();
}

public class Main {
    public static void main(String[] args) {
        Greeting greeting = () -> System.out.println("Hello!");
        greeting.sayHello();
    }
}
```

Output:

```text
Hello!
```

Here:
- `Greeting` declares one abstract method, `sayHello()`.
- The lambda provides the method's behavior.
- Calling `greeting.sayHello()` executes the lambda body.

### 5.2 The `@FunctionalInterface` annotation

`@FunctionalInterface` tells the compiler that the interface is intended to be functional.

```java
@FunctionalInterface
interface Calculator {
    int add(int a, int b);
}
```

If you add another unrelated abstract method, the compiler reports an error:

```java
@FunctionalInterface
interface Calculator {
    int add(int a, int b);
    int subtract(int a, int b); // Compilation error
}
```

The annotation is optional, but it is useful because it catches accidental changes.

### 5.3 Can a functional interface have default and static methods?

Yes:

```java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);

    default void info() {
        System.out.println("Calculator interface");
    }

    static void help() {
        System.out.println("Use calculate() to perform an operation");
    }
}
```

There is still only one abstract method: `calculate()`.

---

## 6. Lambda Expressions with Custom Interfaces

A custom functional interface lets you define the kind of behavior your application needs.

```java
@FunctionalInterface
interface NumberTest {
    boolean check(int number);
}

public class Main {
    public static void main(String[] args) {
        NumberTest isEven = number -> number % 2 == 0;
        NumberTest isPositive = number -> number > 0;

        System.out.println(isEven.check(8));
        System.out.println(isEven.check(7));
        System.out.println(isPositive.check(-4));
    }
}
```

Output:

```text
true
false
false
```

The same interface supports different implementations. `isEven` and `isPositive` are two objects that provide different behavior for the `check()` method.

### 6.1 Passing a lambda to a method

```java
@FunctionalInterface
interface Operation {
    int apply(int a, int b);
}

public class Main {
    static int calculate(int a, int b, Operation operation) {
        return operation.apply(a, b);
    }

    public static void main(String[] args) {
        System.out.println(calculate(10, 5, (a, b) -> a + b));
        System.out.println(calculate(10, 5, (a, b) -> a - b));
        System.out.println(calculate(10, 5, (a, b) -> a * b));
    }
}
```

Output:

```text
15
5
50
```

The `calculate()` method does not need to know which operation it will perform. It accepts behavior through the `Operation` interface.

This is an important design idea: separate the code that decides *when* to perform an operation from the code that defines *what* the operation does.

---

## 7. The Five Most Useful Built-in Functional Interfaces

Java provides many functional interfaces in `java.util.function`. Start with these five:

| Interface | Main method | Purpose |
|---|---|---|
| `Predicate<T>` | `boolean test(T value)` | Tests a condition |
| `Function<T, R>` | `R apply(T value)` | Converts a value into another value |
| `Consumer<T>` | `void accept(T value)` | Performs an action on a value |
| `Supplier<T>` | `T get()` | Supplies a value without an input argument |
| `UnaryOperator<T>` | `T apply(T value)` | Takes and returns the same type |

These interfaces use generics. For example, `Predicate<String>` tests a `String`, while `Function<String, Integer>` takes a `String` and returns an `Integer`.

---

## 8. `Predicate<T>` — Test a Condition

A `Predicate<T>` represents a function that receives a value and returns `true` or `false`.

Its abstract method is:

```java
boolean test(T value);
```

### 8.1 Example

```java
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Predicate<Integer> isEven = number -> number % 2 == 0;

        System.out.println(isEven.test(10));
        System.out.println(isEven.test(7));
    }
}
```

Output:

```text
true
false
```

### 8.2 Common predicate methods

`Predicate<T>` provides useful default methods:

- `and()` — both conditions must be true.
- `or()` — at least one condition must be true.
- `negate()` — reverses the result.
- `isEqual()` — creates a predicate that tests equality with a target value.

Example:

```java
Predicate<Integer> isPositive = n -> n > 0;
Predicate<Integer> isEven = n -> n % 2 == 0;

Predicate<Integer> isPositiveAndEven = isPositive.and(isEven);
Predicate<Integer> isNegativeOrZero = isPositive.negate();

System.out.println(isPositiveAndEven.test(8));
System.out.println(isPositiveAndEven.test(-8));
System.out.println(isNegativeOrZero.test(0));
```

Output:

```text
true
false
true
```

`and()` and `or()` use short-circuit evaluation: the second predicate is not evaluated when the first result already determines the outcome.

### 8.3 Use a predicate to filter a collection

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

Predicate<Integer> isEven = n -> n % 2 == 0;

numbers.stream()
       .filter(isEven)
       .forEach(System.out::println);
```

Output:

```text
2
4
6
```

The predicate defines the filtering condition.

---

## 9. `Function<T, R>` — Transform a Value

A `Function<T, R>` accepts a value of type `T` and returns a value of type `R`.

Its abstract method is:

```java
R apply(T value);
```

### 9.1 Example

```java
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<String, Integer> getLength = text -> text.length();

        System.out.println(getLength.apply("Java"));
        System.out.println(getLength.apply("Collections"));
    }
}
```

Output:

```text
4
11
```

`String` is the input type and `Integer` is the output type.

### 9.2 Transform a value

```java
Function<Integer, Integer> square = n -> n * n;

System.out.println(square.apply(5));
```

Output:

```text
25
```

### 9.3 `andThen()` and `compose()`

These methods combine functions.

```java
Function<Integer, Integer> doubleIt = n -> n * 2;
Function<Integer, Integer> addThree = n -> n + 3;

System.out.println(doubleIt.andThen(addThree).apply(4));
System.out.println(doubleIt.compose(addThree).apply(4));
```

Output:

```text
11
14
```

Explanation:
- `doubleIt.andThen(addThree)` first doubles `4` to `8`, then adds `3`, producing `11`.
- `doubleIt.compose(addThree)` first adds `3` to `4`, producing `7`, then doubles it, producing `14`.

Remember: `andThen()` applies the current function first. `compose()` applies the supplied function first.

---

## 10. `Consumer<T>` — Perform an Action

A `Consumer<T>` accepts a value but does not return a result.

Its abstract method is:

```java
void accept(T value);
```

### 10.1 Example

```java
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        Consumer<String> printUppercase =
                text -> System.out.println(text.toUpperCase());

        printUppercase.accept("java");
    }
}
```

Output:

```text
JAVA
```

### 10.2 `andThen()`

Two consumers can be chained:

```java
Consumer<String> print = text -> System.out.println(text);
Consumer<String> printLength = text -> System.out.println(text.length());

print.andThen(printLength).accept("Java");
```

Output:

```text
Java
4
```

The first consumer runs before the second.

### 10.3 Use `Consumer` with `forEach()`

```java
List<String> names = List.of("Aman", "Riya", "Neha");

Consumer<String> display = name -> System.out.println("Name: " + name);

names.forEach(display);
```

Output:

```text
Name: Aman
Name: Riya
Name: Neha
```

---

## 11. `Supplier<T>` — Supply a Value

A `Supplier<T>` takes no arguments and returns a value.

Its abstract method is:

```java
T get();
```

### 11.1 Example

```java
import java.util.function.Supplier;

public class Main {
    public static void main(String[] args) {
        Supplier<Double> randomValue = () -> Math.random();

        System.out.println(randomValue.get());
    }
}
```

Output: a decimal number in the range from `0.0` (inclusive) to `1.0` (exclusive). The exact number changes between calls.

### 11.2 A supplier can create objects

```java
Supplier<List<String>> createList = ArrayList::new;

List<String> names = createList.get();
names.add("Aman");
System.out.println(names);
```

Output:

```text
[Aman]
```

A supplier is useful for deferred creation or providing a value only when requested. It is not automatically a cache: calling `get()` may create a new value each time, depending on its implementation.

---

## 12. `UnaryOperator<T>` and `BinaryOperator<T>`

These are special forms of `Function`.

- `UnaryOperator<T>` takes one `T` and returns a `T`.
- `BinaryOperator<T>` takes two values of the same type `T` and returns a `T`.

### 12.1 `UnaryOperator`

```java
import java.util.function.UnaryOperator;

public class Main {
    public static void main(String[] args) {
        UnaryOperator<Integer> square = n -> n * n;
        System.out.println(square.apply(6));
    }
}
```

Output:

```text
36
```

### 12.2 `BinaryOperator`

```java
import java.util.function.BinaryOperator;

public class Main {
    public static void main(String[] args) {
        BinaryOperator<Integer> add = (a, b) -> a + b;
        System.out.println(add.apply(10, 20));
    }
}
```

Output:

```text
30
```

Use these interfaces when input and output types are the same.

---

## 13. Primitive Specializations

The generic interfaces use reference types. For primitive values, Java provides specialized interfaces that can avoid some boxing and unboxing.

Examples include:

- `IntPredicate`
- `IntFunction<R>`
- `IntConsumer`
- `IntSupplier`
- `IntUnaryOperator`
- `ToIntFunction<T>`
- `LongSupplier`
- `DoublePredicate`

Example:

```java
import java.util.function.IntPredicate;

public class Main {
    public static void main(String[] args) {
        IntPredicate isPositive = n -> n > 0;

        System.out.println(isPositive.test(5));
        System.out.println(isPositive.test(-2));
    }
}
```

Output:

```text
true
false
```

Do not memorize every specialized interface at once. Recognize the naming pattern and look up the appropriate type when performance or API signatures make it useful.

---

## 14. Method References

A method reference is a compact way to refer to an existing method when its signature matches the target functional interface.

The `::` operator is used for method references.

### 14.1 Static method reference

Lambda:

```java
Function<String, Integer> parse = text -> Integer.parseInt(text);
```

Equivalent method reference:

```java
Function<String, Integer> parse = Integer::parseInt;
```

### 14.2 Instance method on a particular object

```java
Consumer<String> printer = System.out::println;
printer.accept("Hello");
```

`System.out` is the particular object, and `println` is its instance method.

### 14.3 Instance method on an arbitrary object of a type

```java
Function<String, String> uppercase = String::toUpperCase;
System.out.println(uppercase.apply("java"));
```

Output:

```text
JAVA
```

This form means the input string is the object on which `toUpperCase()` is called.

### 14.4 Constructor reference

```java
Supplier<ArrayList<String>> listFactory = ArrayList::new;

ArrayList<String> names = listFactory.get();
names.add("Neha");
System.out.println(names);
```

Output:

```text
[Neha]
```

`ArrayList::new` refers to a constructor and can implement a compatible supplier.

### 14.5 Four common method-reference forms

| Form | Example | Meaning |
|---|---|---|
| Static method | `Integer::parseInt` | Call a static method |
| Particular object's instance method | `System.out::println` | Call a method on a known object |
| Arbitrary object's instance method | `String::toUpperCase` | Call a method on the input object |
| Constructor | `ArrayList::new` | Create an object |

Method references are not a separate kind of functional interface. They are another way to provide an implementation for a compatible functional interface.

---

## 15. Lambdas with Collections and Sorting

Lambda expressions are commonly used with the Collections Framework.

### 15.1 `forEach()`

```java
List<String> names = List.of("Aman", "Riya", "Neha");

names.forEach(name -> System.out.println(name));
```

Method-reference version:

```java
names.forEach(System.out::println);
```

### 15.2 `removeIf()`

`removeIf()` removes elements that satisfy a predicate.

```java
List<Integer> numbers =
        new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));

numbers.removeIf(number -> number % 2 == 0);

System.out.println(numbers);
```

Output:

```text
[1, 3, 5]
```

The list must support removal. Some unmodifiable lists, such as lists returned by `List.of()`, do not allow this operation.

### 15.3 `replaceAll()`

`replaceAll()` replaces each element using a unary operation:

```java
List<Integer> numbers =
        new ArrayList<>(List.of(1, 2, 3, 4));

numbers.replaceAll(number -> number * 10);

System.out.println(numbers);
```

Output:

```text
[10, 20, 30, 40]
```

### 15.4 `sort()`

```java
List<String> names =
        new ArrayList<>(List.of("Riya", "Aman", "Neha"));

names.sort((first, second) -> first.compareTo(second));
System.out.println(names);
```

Output:

```text
[Aman, Neha, Riya]
```

A shorter equivalent is:

```java
names.sort(Comparator.naturalOrder());
```

Or, for a custom key:

```java
names.sort(Comparator.comparingInt(String::length));
```

---

## 16. Lambdas and Streams: A Preview

Streams use functional interfaces extensively. A stream pipeline commonly includes:

- `filter()` with a `Predicate`.
- `map()` with a `Function`.
- `forEach()` with a `Consumer`.
- `sorted()` with a `Comparator`.

Example:

```java
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

        numbers.stream()
               .filter(n -> n % 2 == 0)
               .map(n -> n * n)
               .forEach(System.out::println);
    }
}
```

Output:

```text
4
16
36
```

Step by step:
1. `stream()` creates a stream from the list.
2. `filter()` keeps even numbers: `2`, `4`, and `6`.
3. `map()` squares each remaining number: `4`, `16`, and `36`.
4. `forEach()` prints each result.

The original list is not changed by this pipeline. Stream operations are a larger topic and are covered separately in a dedicated chapter.

---

## 17. Variable Capture and Effectively Final Variables

A lambda can use local variables from its surrounding method, but local variables captured by a lambda must be final or effectively final.

A variable is effectively final if it is assigned once and is not reassigned afterward.

### 17.1 Valid example

```java
public class Main {
    public static void main(String[] args) {
        int limit = 10;

        Runnable task = () -> System.out.println(limit);
        task.run();
    }
}
```

Output:

```text
10
```

`limit` is effectively final because it is not reassigned.

### 17.2 Invalid example

```java
int limit = 10;

Runnable task = () -> System.out.println(limit);

limit = 20; // Compilation error: captured variable is not effectively final
```

Because `limit` is reassigned, the lambda cannot capture it as a local variable.

### 17.3 Why does Java have this rule?

Local variables usually live in a method's stack frame, while a lambda may be used later. Requiring captured local variables to be final or effectively final helps Java avoid confusing behavior caused by changing local variables.

This rule applies to captured local variables. It does not mean that every object referenced by a lambda must be immutable. For example, a final reference can still refer to a mutable object, although changing shared mutable state can make programs harder to reason about.

---

## 18. Lambda Expressions and `this`

In an ordinary anonymous inner class, `this` refers to the anonymous class instance. In a lambda expression, `this` refers to the enclosing object.

This difference matters when a lambda uses instance fields or methods.

```java
class Demo {
    private String message = "Hello";

    void run() {
        Runnable task = () -> System.out.println(this.message);
        task.run();
    }

    public static void main(String[] args) {
        new Demo().run();
    }
}
```

Output:

```text
Hello
```

The lambda does not create a separate `this` object in the same way an anonymous inner class does.

---

## 19. Checked Exceptions in Lambdas

A lambda's body must be compatible with the method declared by its target functional interface, including its checked-exception rules.

For example, `Runnable.run()` does not declare a checked exception. A lambda assigned to `Runnable` cannot simply throw an unchecked-handled checked exception without catching it or adapting the design.

```java
Runnable task = () -> {
    // Checked exceptions may need to be handled here.
    System.out.println("Running");
};
```

When an API's functional interface declares a checked exception, the lambda can throw compatible exceptions. Otherwise, catch the exception inside the lambda or use an appropriate custom functional interface.

Do not assume that a lambda removes Java's checked-exception rules.

---

## 20. Overload Resolution and Ambiguous Lambdas

Sometimes Java cannot determine which overloaded method you intend to call because more than one functional-interface type could fit a lambda.

For example, APIs that overload methods with unrelated functional-interface types can make a lambda ambiguous. In such cases, you may need to:
- Use a typed variable.
- Add an explicit parameter type.
- Cast the lambda to the intended functional-interface type.
- Choose a less ambiguous method signature in your own API design.

You do not need to memorize every overload-resolution rule initially. The key point is that a lambda gets its type from the context in which it is used; it is not an independently typed value in every situation.

---

## 21. Complete Practical Example: Student Results Processor

This program uses a predicate to filter students who passed, a comparator to sort by marks, and a consumer to print results.

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Predicate;

class Student {
    private final String name;
    private final int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    public String getName() {
        return name;
    }

    public int getMarks() {
        return marks;
    }

    @Override
    public String toString() {
        return name + " - " + marks;
    }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(List.of(
            new Student("Riya", 85),
            new Student("Aman", 42),
            new Student("Neha", 91),
            new Student("Kabir", 35)
        ));

        Predicate<Student> passed = student -> student.getMarks() >= 40;
        Consumer<Student> printStudent = System.out::println;

        students.stream()
                .filter(passed)
                .sorted(Comparator.comparingInt(Student::getMarks).reversed())
                .forEach(printStudent);
    }
}
```

Output:

```text
Neha - 91
Riya - 85
Aman - 42
```

Explanation:
1. `Predicate<Student>` checks whether marks are at least 40.
2. `filter(passed)` removes students who did not pass from this stream pipeline.
3. `sorted(...)` orders the remaining students by marks descending.
4. `Consumer<Student>` prints each student.
5. The original list is not modified by the stream pipeline.

---

## 22. Common Mistakes

1. **Using a lambda without a target type.** Java usually needs a functional-interface context to determine the lambda's type.
2. **Giving a functional interface multiple abstract methods.** A lambda can implement a functional interface with one abstract method, not an arbitrary multi-method interface.
3. **Forgetting `return` in a block body.** If the target method returns a value, a block body must return a compatible result on every required path.
4. **Adding a semicolon inside an expression lambda unnecessarily.** `n -> n * 2` is an expression body; `{ return n * 2; }` is a block body.
5. **Reassigning a captured local variable.** Captured local variables must be final or effectively final.
6. **Confusing `Function` and `Consumer`.** A `Function` returns a result; a `Consumer` performs an action and returns nothing.
7. **Confusing `Predicate` and `Function`.** A predicate returns a boolean; a function can return another type.
8. **Assuming `Supplier` caches a value.** A supplier returns a value when called; its implementation determines whether each call returns a new value.
9. **Thinking method references work everywhere.** The referenced method's signature must match the target functional interface.
10. **Using mutation carelessly in stream lambdas.** Unnecessary shared state can make code difficult to understand and unsafe in parallel operations.
11. **Forgetting list mutability.** `removeIf()`, `replaceAll()`, and sorting require the list to support the relevant mutation.
12. **Thinking `this` refers to the lambda itself.** In a lambda, `this` refers to the enclosing instance.

---

## 23. Interview Questions and Answers

### Q1. What is a lambda expression?

A lambda expression is a concise way to provide an implementation for the abstract method of a compatible functional interface.

### Q2. What is a functional interface?

An interface with one abstract method, according to Java's functional-interface rules. It can also have default and static methods.

### Q3. What is the purpose of `@FunctionalInterface`?

It asks the compiler to verify that the interface satisfies the functional-interface requirements.

### Q4. Can a functional interface contain default methods?

Yes. Default and static methods do not count as additional abstract methods.

### Q5. What is the difference between `Predicate` and `Function`?

`Predicate<T>` accepts a value and returns a boolean. `Function<T, R>` accepts a `T` and returns an `R`.

### Q6. What is the difference between `Consumer` and `Supplier`?

A `Consumer<T>` accepts an input and returns no result. A `Supplier<T>` accepts no input and supplies a result.

### Q7. What is a method reference?

A shorter way to refer to an existing compatible method or constructor using `::`.

### Q8. What is the difference between `andThen()` and `compose()` in `Function`?

`andThen()` applies the current function first and then the supplied function. `compose()` applies the supplied function first and then the current function.

### Q9. What does effectively final mean?

A local variable is effectively final if it is assigned once and never reassigned. Such a variable can be captured by a lambda.

### Q10. Does a lambda create a new `this` reference?

No. Within a lambda, `this` refers to the enclosing instance.

### Q11. Can a lambda throw a checked exception?

Only when the target functional method's `throws` declaration permits it, or when the exception is handled within the lambda.

### Q12. Why were lambdas introduced?

They reduce boilerplate when passing behavior, make collection operations more expressive, and support Java's functional-style APIs such as streams.

### Q13. Can a lambda be assigned to `Object` directly?

Not as a standalone lambda expression. A lambda needs a target functional-interface type. It can first be assigned to a functional-interface variable and that object can then be referenced as an `Object`.

### Q14. What are primitive functional interfaces?

Specialized interfaces such as `IntPredicate` and `IntUnaryOperator` that work directly with primitive types and can reduce boxing and unboxing.

### Q15. Are lambdas always faster than anonymous classes?

Not necessarily. Their main advantage is concise expression of behavior. Performance depends on the code, runtime, and use case; choose them for clarity unless measurement shows a performance issue.

---

## 24. Practice Exercises

Try these programs yourself.

1. Create a functional interface named `Square` with a method that accepts an integer and returns its square. Implement it with a lambda.
2. Create a `Predicate<Integer>` that checks whether a number is divisible by both 3 and 5.
3. Use `Function<String, Integer>` to convert a string into its length.
4. Use `Consumer<String>` to print a name in uppercase.
5. Use `Supplier<Integer>` to supply a fixed value, then change the implementation to generate a random integer.
6. Use `UnaryOperator<Integer>` to add 10 to a number.
7. Use `BinaryOperator<Integer>` to return the larger of two numbers.
8. Convert a lambda that prints each list element into a method reference.
9. Use `removeIf()` to remove all strings shorter than five characters from a mutable list.
10. Use `replaceAll()` to convert every string in a mutable list to uppercase.
11. Use a stream to filter odd numbers, double them, and print the results.
12. Write a lambda that uses an effectively final local variable. Then try reassigning that variable and observe the compiler error.
13. Create a `Predicate<Student>` that checks whether a student's marks are at least 40.
14. Chain two functions with `andThen()` and `compose()`, and explain the different output.
15. Create a custom functional interface with a method that accepts a name and returns a greeting.

### Output prediction

What is the output?

```java
Function<Integer, Integer> f = n -> n + 2;
Function<Integer, Integer> g = n -> n * 3;

System.out.println(f.andThen(g).apply(4));
System.out.println(f.compose(g).apply(4));
```

Answer:

```text
18
14
```

Explanation:
- `f.andThen(g)`: `4 + 2 = 6`, then `6 * 3 = 18`.
- `f.compose(g)`: `4 * 3 = 12`, then `12 + 2 = 14`.

What is the output?

```java
Predicate<String> startsWithJ = text -> text.startsWith("J");
Predicate<String> longEnough = text -> text.length() >= 4;

System.out.println(startsWithJ.and(longEnough).test("Java"));
System.out.println(startsWithJ.and(longEnough).test("Joy"));
```

Answer:

```text
true
false
```

---

## 25. Quick Revision Checklist

Make sure you can explain each point without looking at the chapter:

- A lambda uses `->` to separate parameters from its body.
- A lambda implements the abstract method of a compatible functional interface.
- A functional interface has one abstract method under Java's rules.
- `@FunctionalInterface` enables compiler validation.
- `Predicate<T>` tests a condition.
- `Function<T, R>` transforms a value.
- `Consumer<T>` performs an action.
- `Supplier<T>` supplies a value.
- `UnaryOperator<T>` and `BinaryOperator<T>` operate on values of the same type.
- `andThen()` and `compose()` apply functions in different orders.
- Method references use `::`.
- Captured local variables must be final or effectively final.
- In a lambda, `this` refers to the enclosing instance.
- Lambdas and method references are widely used with collections and streams.

## 26. Final Summary

Lambda expressions make Java code shorter when an operation needs to receive behavior. Functional interfaces provide the target type that makes this possible. The built-in interfaces—`Predicate`, `Function`, `Consumer`, and `Supplier`—cover many common tasks, while `UnaryOperator` and `BinaryOperator` handle transformations and operations whose inputs and outputs share the same type.

Method references offer a concise alternative when an existing method already matches the required signature. These features are used throughout modern Java, especially with collection operations, comparators, and streams.

**Next chapter: Chapter 42 — Java Stream API: Creating Streams and Intermediate Operations.**
