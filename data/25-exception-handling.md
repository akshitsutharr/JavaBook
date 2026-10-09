# Chapter 25 — Exception Handling

> **Java Master Course — Chapter 25 of 50**
>
> Programs do not always run exactly as expected. A file may not exist, a user may enter invalid input, a network request may fail, or code may try to divide by zero.
>
> Java provides **exception handling** so programs can respond to many runtime problems in a controlled way.
>
> In this chapter, you will learn how exceptions work, how to catch and throw them, how checked and unchecked exceptions differ, and how to create your own exception types.

---

## 1. What You Will Learn

```text
✓ What an error and an exception are
✓ Why exception handling is needed
✓ The exception hierarchy
✓ Throwable, Error, and Exception
✓ try and catch
✓ Multiple catch blocks
✓ Multi-catch
✓ finally
✓ throw and throws
✓ Checked and unchecked exceptions
✓ Exception propagation
✓ Method overriding and exceptions
✓ Creating custom exceptions
✓ try-with-resources
✓ Suppressed exceptions
✓ Common exception types
✓ Input validation
✓ Exception-handling best practices
✓ Practical Java programs
✓ Output and error questions
✓ Exercises and mini-projects
✓ Interview questions
```

## 2. What Is an Exception?

An **exception** is an event that disrupts the normal flow of a program and is represented in Java by an object.

For example:

```java
public class Main {
    public static void main(String[] args) {
        int result = 10 / 0;
        System.out.println(result);
    }
}
```

For integer division, dividing by zero causes an `ArithmeticException`.

The program does not print the result. If the exception is not handled, the current thread terminates after Java reports the exception and its stack trace.

## 3. Why Do We Need Exception Handling?

Consider these situations:

```text
A user enters text when a number is expected.
A file is missing.
A network connection is interrupted.
A program tries to access a missing array element.
A method receives an invalid argument.
A database operation fails.
```

Without suitable handling, an exception may interrupt the operation the program was trying to perform.

Exception handling lets code respond to failures, report useful information, clean up resources, or pass the problem to a caller that can make a better decision.

Important: exception handling does not magically make every failure recoverable. The program must decide which failures it can handle meaningfully.

## 4. Exception vs Syntax Error vs Logical Error

These are different types of problems.

**Syntax or compile-time error:** the code violates Java's language rules and does not compile.

```java
int number = ;
```

**Logical error:** the program runs but produces the wrong answer.

```java
int area = length + width; // Wrong formula for rectangle area
```

**Exception:** an exceptional situation occurs during execution.

```java
int value = 10 / 0;
```

This is a runtime exception for integer arithmetic.

Not every runtime problem is an exception, and not every exception is caused by a programming mistake. Some represent expected external failures, such as a missing file.

## 5. The Exception Hierarchy

Most exception-related types come from this hierarchy:

```text
Object
  └── Throwable
       ├── Error
       └── Exception
            ├── RuntimeException
            └── Other checked exception classes
```

`Throwable` is the superclass of objects that can be thrown and caught.

The two main branches are:

- `Error`: serious problems generally not intended for ordinary application recovery.
- `Exception`: conditions applications may want to catch or declare.

`RuntimeException` is a subclass of `Exception`. Its subclasses are unchecked exceptions.

## 6. `Throwable`, `Error`, and `Exception`

### `Throwable`

The root type for Java's throwable objects.

### `Error`

Represents serious problems, often related to the JVM or environment.

Examples include:

```text
OutOfMemoryError
StackOverflowError
```

Applications generally should not try to catch every `Error` and continue as if nothing happened.

### `Exception`

Represents conditions an application may need to handle.

Examples include:

```text
IOException
SQLException
RuntimeException
```

Some exceptions are checked; others are unchecked.

## 7. Checked vs Unchecked Exceptions

This is one of the most important topics in Java.

**Checked exceptions** are checked by the compiler. A method must catch them or declare them with `throws`, unless the exception is handled by a surrounding construct.

Examples:

```text
IOException
SQLException
ClassNotFoundException
```

**Unchecked exceptions** include subclasses of `RuntimeException` and subclasses of `Error`. The compiler does not require them to be caught or declared.

Examples:

```text
NullPointerException
ArithmeticException
IllegalArgumentException
IndexOutOfBoundsException
```

The key distinction is a Java language rule, not simply whether the problem happens at runtime. Both checked and unchecked exceptions can occur while a program runs.

## 8. A Simple Checked Exception Example

Reading a file can produce an `IOException`.

```java
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            FileReader reader =
                new FileReader("notes.txt");

            reader.close();
        } catch (IOException e) {
            System.out.println(
                "Could not read the file."
            );
        }
    }
}
```

The compiler requires the checked `IOException` to be handled or declared.

This example demonstrates the rule, but later in this chapter you will learn why try-with-resources is generally better for closing files.

## 9. A Simple Unchecked Exception Example

```java
public class Main {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};

        System.out.println(numbers[5]);
    }
}
```

This throws `ArrayIndexOutOfBoundsException`.

The compiler does not require a `try-catch` block for this exception.

Unchecked does not mean harmless. It means Java does not require it to be caught or declared.

## 10. The `try` Block

Put code that may throw an exception inside a `try` block.

```java
try {
    int result = 10 / 0;
    System.out.println(result);
}
```

A `try` block must be followed by at least one `catch` block or a `finally` block.

As written above, the code is incomplete because the `try` block has no `catch` or `finally`.

## 11. The `catch` Block

A `catch` block handles a matching exception thrown from the associated `try` block.

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero.");
        }

        System.out.println("Program continues.");
    }
}
```

Output:

```text
Cannot divide by zero.
Program continues.
```

When the exception occurs, the remaining statements in that `try` block are skipped. Control moves to a matching `catch` block.

## 12. What Is the Exception Object?

In this code:

```java
catch (ArithmeticException e) {
    System.out.println(e.getMessage());
}
```

`e` refers to the exception object.

Useful methods include:

```java
e.getMessage()
e.toString()
e.printStackTrace()
```

- `getMessage()` returns the detail message, which may be `null`.
- `toString()` usually includes the exception class and its message.
- `printStackTrace()` prints stack-trace information, commonly to standard error.

Do not show raw stack traces to end users by default. They are often more useful for logs and debugging.

## 13. What Happens After an Exception?

Consider:

```java
try {
    System.out.println("A");
    int result = 5 / 0;
    System.out.println("B");
} catch (ArithmeticException e) {
    System.out.println("C");
}

System.out.println("D");
```

Output:

```text
A
C
D
```

`B` is not printed because the exception interrupts the rest of the `try` block.

After the matching `catch` finishes, execution continues after the entire `try-catch` statement.

## 14. Multiple `catch` Blocks

A single `try` block may be followed by multiple `catch` blocks.

```java
public class Main {
    public static void main(String[] args) {
        try {
            int[] values = {10, 20};
            System.out.println(values[5]);
        } catch (ArithmeticException e) {
            System.out.println("Arithmetic problem");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid array index");
        } catch (Exception e) {
            System.out.println("Some other exception");
        }
    }
}
```

Output:

```text
Invalid array index
```

Java selects the first compatible catch block.

## 15. Order of `catch` Blocks

Catch more specific exception types before more general types.

Correct:

```java
try {
    // risky operation
} catch (ArithmeticException e) {
    // specific
} catch (Exception e) {
    // general
}
```

Incorrect:

```java
try {
    // risky operation
} catch (Exception e) {
    // general
} 
// catch (ArithmeticException e) { } // Unreachable
```

The second catch is unreachable because `Exception` already catches `ArithmeticException`.

The compiler rejects catch blocks that are made unreachable by an earlier broader catch.

## 16. Multi-Catch

If different exception types need exactly the same handling, Java supports multi-catch using `|`.

```java
try {
    // operation that may fail in different ways
} catch (NumberFormatException | NullPointerException e) {
    System.out.println("Invalid input.");
}
```

The two alternatives must not be related by subclassing in a way that makes the multi-catch invalid.

The catch parameter in a multi-catch is effectively final, so you cannot assign a new value to it.

Use multi-catch when the response really is the same. If the exceptions need different recovery actions, separate catch blocks may be clearer.

## 17. The `finally` Block

A `finally` block runs when control leaves its associated `try`/`catch` construct, including many exceptional paths.

```java
public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("Inside try");
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Caught exception");
        } finally {
            System.out.println("Finally runs");
        }
    }
}
```

Output:

```text
Inside try
Caught exception
Finally runs
```

`finally` is often used for cleanup, but for resources implementing `AutoCloseable`, try-with-resources is usually preferable.

## 18. Does `finally` Always Run?

Avoid saying that `finally` **always** runs under every possible circumstance.

It normally runs when control leaves the `try`/`catch` construct, but it may not run if the JVM or process terminates abruptly, such as when the process is forcibly killed or the machine loses power.

Also avoid writing code that depends on `finally` overriding a return value or hiding an exception. That can make program behavior confusing.

## 19. `finally` with `return`

Consider:

```java
public class Main {
    static int test() {
        try {
            return 10;
        } finally {
            System.out.println("Finally");
        }
    }

    public static void main(String[] args) {
        System.out.println(test());
    }
}
```

Output:

```text
Finally
10
```

The `finally` block runs before the method completes its return.

Avoid returning from `finally`. A return in `finally` can override a return from `try` and can suppress an exception, making bugs difficult to detect.

## 20. The `throw` Keyword

Use `throw` to explicitly throw a particular throwable object.

Example:

```java
public class Main {
    static void validateAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException(
                "Age must be at least 18"
            );
        }

        System.out.println("Valid age");
    }

    public static void main(String[] args) {
        validateAge(15);
    }
}
```

This throws an `IllegalArgumentException`.

If it is not caught, the method call fails and the exception propagates to the caller.

Syntax:

```java
throw new IllegalArgumentException("Message");
```

The expression after `throw` must be a throwable object.

## 21. Why Use `throw`?

Use it when the method cannot sensibly continue because an input or state violates its contract.

Examples:

```java
if (amount <= 0) {
    throw new IllegalArgumentException(
        "Amount must be positive"
    );
}
```

```java
if (accountClosed) {
    throw new IllegalStateException(
        "Account is closed"
    );
}
```

Choose the exception type based on the problem.

## 22. `throw` vs `throws`

These two keywords have different purposes.

`throw` actually throws an exception object:

```java
throw new IllegalArgumentException("Invalid value");
```

`throws` declares that a method may pass specified exception types to its caller:

```java
static void readFile() throws IOException {
    // file-reading code
}
```

Remember:

```text
throw  → throw an exception object
throws → declare possible exceptions in a method signature
```

## 23. The `throws` Keyword

A method declares checked exceptions that it may let propagate.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    static String readNotes() throws IOException {
        return Files.readString(
            Path.of("notes.txt")
        );
    }
}
```

The method does not catch the `IOException`. It declares it, leaving the caller responsible for handling or further declaring it.

A `throws` declaration does not itself throw an exception; it communicates the method's exception contract.

## 24. Handling a Declared Exception

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    static String readNotes() throws IOException {
        return Files.readString(Path.of("notes.txt"));
    }

    public static void main(String[] args) {
        try {
            System.out.println(readNotes());
        } catch (IOException e) {
            System.out.println(
                "Could not read notes.txt"
            );
        }
    }
}
```

If the file cannot be read, the `IOException` can be caught in `main()`.

The exact result depends on whether the file exists and can be read.

## 25. Exception Propagation

If a method does not handle an exception, it can propagate to its caller.

```java
static void methodC() {
    int result = 10 / 0;
}

static void methodB() {
    methodC();
}

static void methodA() {
    methodB();
}
```

If `ArithmeticException` is not caught in `methodC()`, it propagates through `methodB()` and `methodA()` until a matching handler is found or the thread's uncaught-exception handling takes over.

Conceptually:

```text
methodA()
  → methodB()
      → methodC()
          → exception
      ← propagates
  ← propagates
```

This is called exception propagation or stack unwinding.

## 26. Catching an Exception at a Higher Level

```java
public class Main {
    static void third() {
        int result = 10 / 0;
    }

    static void second() {
        third();
    }

    static void first() {
        second();
    }

    public static void main(String[] args) {
        try {
            first();
        } catch (ArithmeticException e) {
            System.out.println("Handled in main");
        }
    }
}
```

Output:

```text
Handled in main
```

A handler does not have to be in the same method where the exception occurs.

## 27. Checked Exceptions and Method Calls

If a method calls code that may throw a checked exception, it must handle or declare that exception.

Example:

```java
import java.io.IOException;

class FileService {
    void read() throws IOException {
        throw new IOException("Read failed");
    }
}
```

Caller option A — handle it:

```java
try {
    new FileService().read();
} catch (IOException e) {
    System.out.println("Handled");
}
```

Caller option B — declare it too:

```java
void run() throws IOException {
    new FileService().read();
}
```

The compiler enforces checked-exception handling.

## 28. Checked Exceptions — Why Do They Exist?

Checked exceptions encourage the caller to acknowledge certain failures that may be expected from an operation, such as file or network access.

They can be useful when a caller has a meaningful recovery action.

However, a checked exception is not automatically a better design than an unchecked exception. Choose the type based on the API contract and whether callers can reasonably handle the condition.

## 29. Unchecked Exceptions

Unchecked exceptions are subclasses of `RuntimeException` (or `Error`). The compiler does not require a catch or `throws` declaration for them.

Common examples:

| Exception | Typical cause |
|---|---|
| `NullPointerException` | Using a null reference where an object is required |
| `ArithmeticException` | Invalid arithmetic operation, such as integer division by zero |
| `IllegalArgumentException` | A method receives an invalid argument |
| `IllegalStateException` | A method is called when the object is in an unsuitable state |
| `IndexOutOfBoundsException` | An index is outside the valid range |
| `NumberFormatException` | Parsing text as a number fails |

Unchecked exceptions are often used to signal programming errors, invalid arguments, or invalid object state. They can also arise from external data.

## 30. `NumberFormatException`

```java
public class Main {
    public static void main(String[] args) {
        String text = "abc";

        try {
            int number = Integer.parseInt(text);
            System.out.println(number);
        } catch (NumberFormatException e) {
            System.out.println("Not a valid integer.");
        }
    }
}
```

Output:

```text
Not a valid integer.
```

`Integer.parseInt()` cannot parse `"abc"` as an integer, so it throws `NumberFormatException`.

## 31. `NullPointerException`

```java
public class Main {
    public static void main(String[] args) {
        String name = null;

        try {
            System.out.println(name.length());
        } catch (NullPointerException e) {
            System.out.println("Name is missing.");
        }
    }
}
```

Output:

```text
Name is missing.
```

Catching `NullPointerException` can be useful in carefully chosen boundaries, but it is usually better to understand why the reference can be null and design the code to handle that situation intentionally.

## 32. `IllegalArgumentException` vs `IllegalStateException`

Use `IllegalArgumentException` when an argument supplied to a method is invalid.

```java
void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException(
            "Age cannot be negative"
        );
    }
}
```

Use `IllegalStateException` when the operation is not valid for the object's current state.

```java
void start() {
    if (started) {
        throw new IllegalStateException(
            "Already started"
        );
    }
    started = true;
}
```

The distinction helps callers understand what went wrong.

## 33. Creating a Custom Checked Exception

Create a checked exception by extending `Exception` (but not `RuntimeException`).

```java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}
```

Use it in a method:

```java
class BankAccount {
    private double balance;

    BankAccount(double balance) {
        this.balance = balance;
    }

    void withdraw(double amount)
            throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(
                "Insufficient balance"
            );
        }
        balance -= amount;
    }
}
```

The method declares the checked exception with `throws`.

## 34. Handling the Custom Checked Exception

```java
public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(500);

        try {
            account.withdraw(800);
            System.out.println("Withdrawal complete");
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

Output:

```text
Insufficient balance
```

Because the exception extends `Exception` directly, callers must catch or declare it.

## 35. Creating a Custom Unchecked Exception

Extend `RuntimeException` for an unchecked custom exception.

```java
class InvalidOrderException extends RuntimeException {
    public InvalidOrderException(String message) {
        super(message);
    }
}
```

Example:

```java
class Order {
    void cancelAfterShipping(boolean shipped) {
        if (shipped) {
            throw new InvalidOrderException(
                "A shipped order cannot be cancelled this way"
            );
        }
    }
}
```

The compiler does not require callers to catch or declare `InvalidOrderException`.

Use custom exceptions when a meaningful domain-specific type improves the API. Do not create a new exception class for every tiny variation without a reason.

## 36. Custom Exception Naming

Exception class names conventionally end with `Exception`.

Examples:

```text
InvalidAgeException
InsufficientFundsException
OrderNotFoundException
InvalidBookingException
```

A custom exception should communicate a meaningful condition. Its message should help a developer or caller understand the failure without exposing secrets.

## 37. Exception Constructors

A common custom exception provides a message constructor and may provide a cause constructor:

```java
class DataAccessException extends RuntimeException {
    public DataAccessException(String message) {
        super(message);
    }

    public DataAccessException(
            String message,
            Throwable cause) {
        super(message, cause);
    }
}
```

A cause preserves the underlying failure for debugging.

## 38. Exception Chaining

Suppose a low-level operation fails with `IOException`, but a service exposes a domain-level exception.

```java
try {
    // read data
} catch (IOException e) {
    throw new DataAccessException(
        "Could not load customer data",
        e
    );
}
```

Passing `e` as the cause preserves the original exception.

This is often better than throwing a new exception with only a generic message, because the root cause remains available for diagnosis.

## 39. `getCause()`

```java
Throwable cause = exception.getCause();
```

The cause is the underlying throwable, if one was supplied or established.

A stack trace for a chained exception typically shows both the outer exception and its cause.

## 40. Try-With-Resources

Resources such as files, streams, sockets, and database connections often need to be closed.

Traditional code can be error-prone:

```java
FileReader reader = null;

try {
    reader = new FileReader("notes.txt");
    // read data
} catch (IOException e) {
    // handle error
} finally {
    if (reader != null) {
        try {
            reader.close();
        } catch (IOException e) {
            // handle close error
        }
    }
}
```

Java provides **try-with-resources** to close resources automatically.

## 41. Basic Try-With-Resources

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader =
                 new BufferedReader(
                     new FileReader("notes.txt"))) {

            String line = reader.readLine();
            System.out.println(line);

        } catch (IOException e) {
            System.out.println(
                "Could not read the file."
            );
        }
    }
}
```

When the `try` block exits, `reader` is closed automatically, including when an exception occurs.

The resource type must implement `AutoCloseable` (which includes `Closeable`).

## 42. Why Try-With-Resources Is Better

It reduces boilerplate and reliably closes resources along normal and exceptional control-flow paths.

Use it for resources such as:

```text
BufferedReader
FileInputStream
Files.lines() streams
database connections
sockets
```

Closing a resource can itself fail, which Java handles according to try-with-resources rules.

## 43. Multiple Resources

You can declare multiple resources in one try-with-resources statement:

```java
try (
    var input = new java.io.FileInputStream("input.txt");
    var output = new java.io.FileOutputStream("output.txt")
) {
    input.transferTo(output);
} catch (java.io.IOException e) {
    System.out.println("File operation failed.");
}
```

Resources are closed in reverse order of declaration: `output` closes before `input`.

The local-variable syntax `var` here is type inference for local variables; it does not make Java dynamically typed.

## 44. Existing Effectively Final Resources

In modern Java, an existing resource variable can be used in a try-with-resources header if it is final or effectively final.

Example:

```java
var reader = new java.io.BufferedReader(
    new java.io.FileReader("notes.txt")
);

try (reader) {
    System.out.println(reader.readLine());
} catch (java.io.IOException e) {
    System.out.println("Read failed.");
}
```

This feature is available in modern Java releases. If you are using an older Java version, declare the resource directly inside the try-with-resources parentheses instead.

## 45. Suppressed Exceptions

A resource's `close()` method can throw an exception. If the main `try` block also throws an exception, Java preserves the primary exception and records close-time exceptions as suppressed exceptions.

This is one reason try-with-resources is safer than manually closing resources in a `finally` block.

You can inspect suppressed exceptions with:

```java
Throwable[] suppressed =
    exception.getSuppressed();
```

Most beginner programs do not need to process suppressed exceptions directly, but you should know they exist.

## 46. `finally` vs Try-With-Resources

Use `finally` for cleanup logic that is not naturally handled by resource management.

Use try-with-resources when the object implements `AutoCloseable` and should be closed.

A resource that needs closing should usually not rely on a manually written `finally` block when try-with-resources can express the same intent more safely.

## 47. Exception Handling and Input

Suppose a user enters a number.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("Enter an integer: ");
            int number = Integer.parseInt(
                scanner.nextLine()
            );
            System.out.println("Number: " + number);
        } catch (NumberFormatException e) {
            System.out.println("Please enter a valid integer.");
        } finally {
            scanner.close();
        }
    }
}
```

The program catches invalid numeric input. For a `Scanner` wrapping `System.in`, closing the scanner also closes the underlying input stream; whether to do that depends on whether other parts of the application still need standard input.

## 48. Validate Expected Conditions Without Exceptions When Appropriate

If invalid input is a normal, frequent possibility, sometimes a non-exceptional check is clearer.

For example:

```java
if (text.matches("-?\\d+")) {
    int number = Integer.parseInt(text);
    System.out.println(number);
} else {
    System.out.println("Enter an integer.");
}
```

This is only a simplified example; numeric range limits still matter, and `parseInt()` can reject strings outside the `int` range.

Do not use exceptions as ordinary control flow when a simple check communicates the situation better. On the other hand, avoid duplicating complicated validation logic just to prevent every possible exception.

## 49. Exceptions and Return Values

Use exceptions for failure conditions that prevent an operation from fulfilling its contract, especially when the caller can meaningfully handle or report the failure.

Return values are often better when a result is expected to be absent or optional.

For example, a search operation might return `Optional<User>` when "no matching user" is an ordinary outcome. A malformed file might be represented by an exception because reading failed.

The best choice depends on the API's meaning and usage.

## 50. Do Not Swallow Exceptions

Bad:

```java
try {
    performOperation();
} catch (Exception e) {
    // do nothing
}
```

This is often called swallowing an exception. The failure disappears, and callers may believe the operation succeeded.

Better choices include:

```text
handle the problem meaningfully
log useful diagnostic information
return a documented failure result
throw a suitable exception
rethrow with additional context and preserve the cause
```

A catch block should have a clear purpose.

## 51. Avoid Catching `Exception` Everywhere

Catching a broad type can hide unrelated problems.

Prefer catching the exceptions you can actually handle:

```java
try {
    // parse or read
} catch (NumberFormatException e) {
    System.out.println("Invalid number");
}
```

A broad `catch (Exception e)` can be appropriate at an application boundary where the program must report an unexpected failure, but it should not be used indiscriminately inside every method.

Avoid catching `Throwable` or `Error` as a routine recovery strategy.

## 52. Preserve the Original Cause

Bad:

```java
catch (IOException e) {
    throw new RuntimeException("Failed");
}
```

The original cause is lost.

Better:

```java
catch (IOException e) {
    throw new RuntimeException("Failed", e);
}
```

Preserving the cause makes debugging easier.

## 53. Do Not Use Exceptions to Hide Bugs

Avoid code that catches an exception and silently continues with invalid state.

For example, if a required configuration file cannot be read, continuing with guessed settings may be worse than stopping with a clear error.

Decide whether the application can safely recover. If not, propagate the failure or stop the affected operation.

## 54. Exception Handling and Method Contracts

A method contract explains what a method expects and what it promises.

Example:

```java
/**
 * Withdraws money from the account.
 *
 * @param amount amount to withdraw; must be positive
 * @throws IllegalArgumentException if amount is not positive
 * @throws IllegalStateException if the account has insufficient funds
 */
void withdraw(double amount) {
    // implementation
}
```

Document meaningful exceptions so callers know what can fail and how they should respond.

For financial calculations, `double` is often not the best representation of money; this example focuses on exception contracts rather than monetary precision.

## 55. Exceptions and Method Overriding

A method that overrides another method cannot add broader checked exceptions than the parent method permits.

Example:

```java
class Parent {
    void read() throws java.io.IOException {
    }
}

class Child extends Parent {
    @Override
    void read() throws java.io.FileNotFoundException {
    }
}
```

This is valid because `FileNotFoundException` is a subclass of `IOException`.

But a child cannot override this method by declaring an unrelated or broader checked exception such as `SQLException`.

Overriding methods can omit checked exceptions or declare narrower compatible checked exceptions. Unchecked exceptions are not restricted by the same checked-exception rule.

## 56. `throw` Inside a `catch` Block

You can rethrow an exception:

```java
try {
    performOperation();
} catch (java.io.IOException e) {
    System.out.println("Logging failure");
    throw e;
}
```

If the method does not handle the checked exception further, it must declare it or the code must be enclosed by a suitable handler.

Rethrowing is useful when a method can add diagnostic context but cannot actually recover.

## 57. Rethrowing With Context

```java
try {
    loadUser();
} catch (java.io.IOException e) {
    throw new IllegalStateException(
        "Could not initialize user data",
        e
    );
}
```

The new exception communicates the higher-level failure while retaining the original cause.

Choose the new exception type carefully; do not wrap every exception in a generic type without a reason.

## 58. Common Exception Types to Recognize

| Exception | Typical meaning |
|---|---|
| `ArithmeticException` | Invalid arithmetic operation, such as integer division by zero |
| `NullPointerException` | Required object reference was null |
| `NumberFormatException` | Text could not be parsed as a number |
| `ArrayIndexOutOfBoundsException` | Invalid array index |
| `StringIndexOutOfBoundsException` | Invalid string index |
| `IllegalArgumentException` | Invalid method argument |
| `IllegalStateException` | Operation invalid for current state |
| `ClassCastException` | Invalid runtime reference cast |
| `IOException` | Input/output operation failed |
| `FileNotFoundException` | File could not be opened as requested |
| `InterruptedException` | A blocking operation was interrupted |
| `SQLException` | Database operation failed |

This table gives common causes, not every possible cause or behavior.

## 59. Practical Program — Safe Division

```java
public class Main {
    static double divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException(
                "Divisor cannot be zero"
            );
        }

        return (double) a / b;
    }

    public static void main(String[] args) {
        try {
            System.out.println(divide(10, 2));
            System.out.println(divide(10, 0));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

Output:

```text
5.0
Divisor cannot be zero
```

The second call throws, so later statements in the `try` block would be skipped.

## 60. Practical Program — Validate a Product

```java
class Product {
    private final String name;
    private final double price;

    Product(String name, double price) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException(
                "Product name is required"
            );
        }

        if (price < 0) {
            throw new IllegalArgumentException(
                "Price cannot be negative"
            );
        }

        this.name = name;
        this.price = price;
    }

    String getName() {
        return name;
    }

    double getPrice() {
        return price;
    }
}
```

The constructor prevents invalid values from being stored in a successfully constructed `Product`.

## 61. Practical Program — Custom Exception and Bank Account

```java
class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) {
        super(message);
    }
}

class BankAccount {
    private double balance;

    BankAccount(double balance) {
        if (balance < 0) {
            throw new IllegalArgumentException(
                "Balance cannot be negative"
            );
        }
        this.balance = balance;
    }

    void withdraw(double amount)
            throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive"
            );
        }

        if (amount > balance) {
            throw new InsufficientFundsException(
                "Insufficient funds"
            );
        }

        balance -= amount;
    }

    double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000);

        try {
            account.withdraw(1500);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        }

        System.out.println(account.getBalance());
    }
}
```

Output:

```text
Insufficient funds
1000.0
```

The failed withdrawal does not change the balance.

## 62. Practical Program — Multiple Catch Blocks

```java
public class Main {
    public static void main(String[] args) {
        try {
            String text = "abc";
            int number = Integer.parseInt(text);

            int[] values = {1, 2};
            System.out.println(values[number]);
        } catch (NumberFormatException e) {
            System.out.println("Invalid number text");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid index");
        } catch (Exception e) {
            System.out.println("Unexpected problem");
        }
    }
}
```

Output:

```text
Invalid number text
```

`Integer.parseInt("abc")` fails before the array access is reached.

## 63. Practical Program — `finally`

```java
public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("Start");
            throw new IllegalStateException("Problem");
        } catch (IllegalStateException e) {
            System.out.println("Caught");
        } finally {
            System.out.println("Cleanup");
        }

        System.out.println("Finished");
    }
}
```

Output:

```text
Start
Caught
Cleanup
Finished
```

## 64. Practical Program — Exception Chaining

```java
class ConfigException extends RuntimeException {
    ConfigException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class Main {
    static void loadConfig() {
        try {
            throw new java.io.IOException(
                "Configuration file missing"
            );
        } catch (java.io.IOException e) {
            throw new ConfigException(
                "Unable to load configuration",
                e
            );
        }
    }

    public static void main(String[] args) {
        try {
            loadConfig();
        } catch (ConfigException e) {
            System.out.println(e.getMessage());
            System.out.println(
                e.getCause().getMessage()
            );
        }
    }
}
```

Output:

```text
Unable to load configuration
Configuration file missing
```

The cause preserves the lower-level explanation.

## 65. Practical Program — Try-With-Resources

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("notes.txt");

        try (BufferedReader reader =
                 Files.newBufferedReader(path)) {
            String line;

            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println(
                "Could not read notes.txt"
            );
        }
    }
}
```

This program prints each line if the file is readable. If reading fails, it prints the error message shown in the catch block. The reader is closed automatically.

## 66. Output Questions

Try these before checking the answers.

### Question 1

```java
public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("A");
            int x = 10 / 0;
            System.out.println("B");
        } catch (ArithmeticException e) {
            System.out.println("C");
        }
        System.out.println("D");
    }
}
```

### Question 2

```java
public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("Try");
        } finally {
            System.out.println("Finally");
        }
    }
}
```

### Question 3

```java
public class Main {
    static int getValue() {
        try {
            return 5;
        } finally {
            System.out.println("Cleanup");
        }
    }

    public static void main(String[] args) {
        System.out.println(getValue());
    }
}
```

### Question 4

```java
public class Main {
    public static void main(String[] args) {
        try {
            Integer.parseInt("hello");
        } catch (NumberFormatException e) {
            System.out.println("Number");
        } catch (Exception e) {
            System.out.println("Other");
        }
    }
}
```

### Question 5

```java
public class Main {
    public static void main(String[] args) {
        try {
            throw new IllegalArgumentException();
        } catch (RuntimeException e) {
            System.out.println("Runtime");
        } catch (Exception e) {
            System.out.println("Exception");
        }
    }
}
```

### Question 6

```java
public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("A");
        } catch (ArithmeticException e) {
            System.out.println("B");
        }
    }
}
```

Does this compile as written? Think about whether the `try` block can throw an unchecked exception of the caught type.

### Question 7

```java
public class Main {
    public static void main(String[] args) {
        try {
            int[] a = {1, 2};
            System.out.println(a[4]);
        } catch (IndexOutOfBoundsException e) {
            System.out.println("Index problem");
        }
    }
}
```

### Question 8

```java
class MyException extends Exception {
}

public class Main {
    static void test() throws MyException {
        throw new MyException();
    }

    public static void main(String[] args) {
        try {
            test();
        } catch (MyException e) {
            System.out.println("Caught custom exception");
        }
    }
}
```

## 67. Answers to Output Questions

**Answer 1:**

```text
A
C
D
```

The division throws before `B` is printed.

**Answer 2:**

```text
Try
Finally
```

The `finally` block runs when the try statement completes.

**Answer 3:**

```text
Cleanup
5
```

The `finally` block runs before the method completes its return.

**Answer 4:**

```text
Number
```

`NumberFormatException` matches the first catch.

**Answer 5:**

```text
Runtime
```

`IllegalArgumentException` is a subclass of `RuntimeException`.

**Answer 6:** Yes, it compiles. `ArithmeticException` is unchecked, so Java permits a catch block for it even if the try body has no statement that is known to throw it.

**Answer 7:**

```text
Index problem
```

`ArrayIndexOutOfBoundsException` is a subclass of `IndexOutOfBoundsException`.

**Answer 8:**

```text
Caught custom exception
```

The custom exception is checked, declared by `test()`, and caught by the caller.

## 68. Interview Questions — Fundamentals

**Q1. What is an exception?**  
An object representing an event that disrupts the normal flow of program execution.

**Q2. What is exception handling?**  
A mechanism for responding to exceptional conditions using constructs such as `try`, `catch`, `finally`, `throw`, and `throws`.

**Q3. What is the root class for exceptions and errors?**  
`Throwable`.

**Q4. What is the difference between `Error` and `Exception`?**  
`Error` generally represents serious JVM or environment problems. `Exception` represents conditions applications may handle or declare.

**Q5. Checked vs unchecked exceptions?**  
Checked exceptions must be caught or declared. Unchecked exceptions—subclasses of `RuntimeException` and `Error`—are not subject to that compiler requirement.

**Q6. Is `NullPointerException` checked or unchecked?**  
Unchecked; it extends `RuntimeException`.

**Q7. Is `IOException` checked or unchecked?**  
Checked; it extends `Exception` but not `RuntimeException`.

## 69. Interview Questions — Keywords

**Q8. What is the purpose of `try`?**  
It surrounds code whose exceptional outcomes may be handled.

**Q9. What is the purpose of `catch`?**  
It handles a matching exception from the associated try statement.

**Q10. What is `finally` used for?**  
It runs during normal completion and many exceptional control-flow paths, often for cleanup. It is not guaranteed under abrupt process or JVM termination.

**Q11. `throw` vs `throws`?**  
`throw` throws an object; `throws` declares possible exceptions in a method signature.

**Q12. Can a method declare multiple exceptions?**  
Yes, separated by commas in the `throws` clause.

**Q13. Can a try block have multiple catch blocks?**  
Yes, provided the catch blocks are reachable and ordered correctly.

**Q14. What is multi-catch?**  
A catch clause that handles multiple unrelated alternatives using `|`.

## 70. Interview Questions — Design

**Q15. What is exception propagation?**  
An exception travels up the call stack until a matching handler is found or it reaches uncaught-exception handling.

**Q16. How do you create a checked exception?**  
Extend `Exception` without extending `RuntimeException`.

**Q17. How do you create an unchecked exception?**  
Extend `RuntimeException`.

**Q18. What is exception chaining?**  
Wrapping a lower-level exception as the cause of a higher-level exception.

**Q19. What is try-with-resources?**  
A construct that automatically closes resources implementing `AutoCloseable`.

**Q20. What are suppressed exceptions?**  
Exceptions recorded when a resource-closing failure occurs while another exception is already primary in try-with-resources.

**Q21. Should you catch every exception?**  
No. Catch exceptions you can handle meaningfully. Broad catches belong only at suitable boundaries with deliberate reporting or recovery.

**Q22. Why should you avoid an empty catch block?**  
It hides the failure and can make the program appear successful when it is not.

**Q23. Can `finally` change a return value?**  
A `return` in `finally` can override an earlier return and can suppress an exception. Avoid returning from `finally`.

**Q24. Can an overriding method throw a broader checked exception?**  
No. It may omit checked exceptions or declare narrower compatible checked exceptions, but it cannot broaden the checked-exception contract.

## 71. Exercises

### Exercise 1 — Safe Calculator

Create a calculator with `add`, `subtract`, `multiply`, and `divide`. Decide how to handle a zero divisor and document the method contract.

### Exercise 2 — Number Input

Read a line from the user and parse it as an integer. Handle invalid text without crashing the program.

### Exercise 3 — File Reader

Read a text file using try-with-resources. Handle an `IOException` and print a useful message.

### Exercise 4 — Bank Account

Create a `BankAccount` with `deposit()` and `withdraw()`. Use `IllegalArgumentException` for invalid amounts and a custom checked `InsufficientFundsException` for an attempted withdrawal above the balance.

### Exercise 5 — Custom Exception

Create `InvalidAgeException`. Decide whether it should be checked or unchecked, then explain why your choice fits the intended API.

### Exercise 6 — Exception Chaining

Create a method that catches an `IOException` and wraps it in a domain-specific exception while preserving the original cause.

### Exercise 7 — Multiple Catch Blocks

Write a program that can encounter `NumberFormatException` and `ArrayIndexOutOfBoundsException`. Handle them separately.

### Exercise 8 — `finally`

Write a method that returns a value from `try` and prints a message in `finally`. Predict the order of output.

### Exercise 9 — Try-With-Resources

Copy one file to another using streams and try-with-resources. Handle file errors.

### Exercise 10 — Exception Contract

Write Javadoc for a method that rejects invalid arguments and can fail because a file cannot be read. Document its meaningful exceptions.

## 72. Mini-Project 1 — Student Marks Processor

Create a program that:

```text
reads marks
validates the input
rejects marks outside the allowed range
calculates the average
handles invalid numeric input
reports meaningful errors
```

Use exceptions for invalid conditions that violate method contracts. Do not use broad empty catch blocks.

## 73. Mini-Project 2 — Banking Console

Create a console banking program with:

```text
deposit
withdraw
check balance
custom insufficient-funds exception
invalid-amount validation
clear error messages
```

Ensure failed withdrawals do not change the balance.

## 74. Mini-Project 3 — File Notes Viewer

Create a program that:

```text
accepts a file path
reads the file
uses try-with-resources
handles missing or unreadable files
prints file content when successful
```

Keep resource cleanup separate from the error message logic.

## 75. Mini-Project 4 — Order Validation

Create an order system with custom exceptions such as:

```text
InvalidOrderException
ProductUnavailableException
PaymentFailedException
```

Only create custom exception classes where they provide meaningful domain information. Decide which exceptions should be checked and which should be unchecked.

## 76. Best Practices Checklist

```text
1. Catch exceptions you can handle meaningfully.
2. Prefer specific catch types when possible.
3. Order specific catches before general catches.
4. Do not silently swallow exceptions.
5. Preserve causes when wrapping exceptions.
6. Use try-with-resources for AutoCloseable resources.
7. Avoid using exceptions for routine control flow.
8. Validate method arguments and object state.
9. Choose checked or unchecked exceptions deliberately.
10. Do not catch Error or Throwable as a routine recovery strategy.
11. Avoid returning from finally.
12. Write clear, useful exception messages.
13. Do not expose secrets in exception messages or logs.
14. Document meaningful exceptions in the API contract.
15. Keep failure handling close to the layer that can make a sensible decision.
```

## 77. Final Mental Model

```text
Something exceptional happens
          ↓
Java creates or receives a throwable object
          ↓
The current operation is interrupted
          ↓
A matching handler is searched for
          ↓
catch handles it, or it propagates
          ↓
finally / resource cleanup runs as applicable
          ↓
the program continues, reports failure, or terminates
```

Remember that a catch block is not a magical repair tool. It should either recover safely, communicate the failure, or pass the problem to a layer that can handle it.

## 78. Chapter Summary

You learned how Java represents exceptional conditions with `Throwable` and its subclasses, how to use `try`, `catch`, and `finally`, and how `throw` differs from `throws`.

You also learned the difference between checked and unchecked exceptions, how exceptions propagate, how to create custom exception classes, how to preserve causes, and how try-with-resources safely closes resources.

The most important rule is: **handle an exception only when you can do something meaningful with it.** Otherwise, preserve the information and let a suitable caller handle the failure.

## 79. Final Revision Checklist

```text
[ ] What is an exception?
[ ] Syntax error vs logical error vs exception
[ ] Throwable hierarchy
[ ] Error vs Exception
[ ] Checked vs unchecked exceptions
[ ] try and catch
[ ] Multiple catch blocks
[ ] Catch ordering
[ ] Multi-catch
[ ] finally
[ ] throw vs throws
[ ] Exception propagation
[ ] Common exception types
[ ] Custom checked exception
[ ] Custom unchecked exception
[ ] Exception chaining and getCause()
[ ] Try-with-resources
[ ] AutoCloseable
[ ] Suppressed exceptions
[ ] Exceptions in overriding methods
[ ] Exception handling best practices
[ ] Input validation
[ ] Output questions
[ ] Practical exercises and mini-projects
```

## 80. What Comes Next?

**Chapter 26 — File Handling**

Next, you will learn how Java reads, writes, creates, copies, moves, and deletes files using streams, readers, writers, `Path`, and `Files`. Exception handling will be especially useful because file operations can fail for many reasons.
