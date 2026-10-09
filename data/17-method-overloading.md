# Chapter 17 — Method Overloading

> **Java Master Course — Chapter 17 of 50**
>
> Method overloading is one of the most useful features of Java methods.
>
> The basic idea is simple:
>
> **We can have multiple methods with the same name in the same class, as long as their parameter lists are different.**
>
> Method overloading is also called:
>
> **Compile-time polymorphism** or **static polymorphism**.

---

# 1. What You Will Learn

By the end of this chapter, you should understand:

```text
✓ What method overloading is
✓ Why method overloading is useful
✓ Basic overloading syntax
✓ Same method name
✓ Different parameter list
✓ Different number of parameters
✓ Different parameter types
✓ Different parameter order
✓ Return type and overloading
✓ Why return type alone cannot overload
✓ Constructor overloading
✓ Static method overloading
✓ main() overloading
✓ Varargs and overloading
✓ Primitive widening and overload resolution
✓ Boxing and unboxing with overloads
✓ Reference type overloads
✓ null and overloaded methods
✓ Ambiguous overloads
✓ Compile-time polymorphism
✓ Overloading vs overriding
✓ Common mistakes
✓ Practical programs
✓ Exercises
✓ Output questions
✓ Interview questions
```

---

# 2. What Is Method Overloading?

Method overloading means defining multiple methods with:

```text
same method name
+
different parameter lists
```

Example:

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}
```

Both methods are named:

```java
add
```

but their parameter lists are different.

---

# 3. Simple Definition

Exam-friendly definition:

> **Method overloading is a feature of Java in which multiple methods in the same class have the same name but different parameter lists.**

The compiler determines which overloaded method should be called.

---

# 4. Why Do We Need Method Overloading?

Suppose we want to add two integers:

```java
add(10, 20)
```

Three integers:

```java
add(10, 20, 30)
```

Two doubles:

```java
add(10.5, 20.5)
```

Without overloading, we might write:

```java
addTwoIntegers()
addThreeIntegers()
addTwoDoubles()
```

With overloading:

```java
add(...)
```

can represent the same conceptual operation.

---

# 5. Example

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }

    double add(double a, double b) {
        return a + b;
    }
}
```

Usage:

```java
Calculator c = new Calculator();

System.out.println(c.add(10, 20));
System.out.println(c.add(10, 20, 30));
System.out.println(c.add(10.5, 20.5));
```

Output:

```text
30
60
31.0
```

---

# 6. The Key Rule

For overloading, Java must be able to distinguish the methods using their parameter lists.

The parameter list is determined by:

```text
number of parameters
types of parameters
order of parameter types
```

Return type is not part of the method signature for overloading.

---

# 7. Same Name, Different Number of Parameters

This is valid:

```java
class Demo {

    void show() {
        System.out.println("No argument");
    }

    void show(int x) {
        System.out.println("One argument");
    }

    void show(int x, int y) {
        System.out.println("Two arguments");
    }
}
```

These are three overloaded methods.

---

# 8. Example

```java
Demo d = new Demo();

d.show();
d.show(10);
d.show(10, 20);
```

Output:

```text
No argument
One argument
Two arguments
```

---

# 9. Different Parameter Types

Methods can also be overloaded using different parameter types.

```java
class Printer {

    void print(int value) {
        System.out.println(
            "Integer: " + value
        );
    }

    void print(double value) {
        System.out.println(
            "Double: " + value
        );
    }

    void print(String value) {
        System.out.println(
            "String: " + value
        );
    }
}
```

---

# 10. Calling the Overloaded Methods

```java
Printer p = new Printer();

p.print(10);
p.print(10.5);
p.print("Java");
```

Output:

```text
Integer: 10
Double: 10.5
String: Java
```

---

# 11. Different Parameter Order

Parameter order can also create an overload.

```java
class Demo {

    void show(int x, String s) {
        System.out.println(
            "int, String"
        );
    }

    void show(String s, int x) {
        System.out.println(
            "String, int"
        );
    }
}
```

These methods have different parameter lists:

```text
(int, String)
(String, int)
```

---

# 12. Calling Them

```java
Demo d = new Demo();

d.show(10, "Java");
d.show("Java", 10);
```

Output:

```text
int, String
String, int
```

---

# 13. Parameter Order Matters

Compare:

```java
show(int, double)
```

and:

```java
show(double, int)
```

They are different overloads.

---

# 14. Example

```java
class Calculator {

    void calculate(int a, double b) {
        System.out.println(
            "int, double"
        );
    }

    void calculate(double a, int b) {
        System.out.println(
            "double, int"
        );
    }
}
```

Usage:

```java
Calculator c = new Calculator();

c.calculate(10, 20.5);
c.calculate(10.5, 20);
```

---

# 15. What Counts as the Parameter List?

For a method:

```java
void test(int a, String b)
```

the parameter types are:

```text
int
String
```

The parameter names:

```text
a
b
```

do not matter for overloading.

---

# 16. Parameter Names Do Not Create Overloading

This is invalid:

```java
void show(int x) {
}

void show(int y) {
}
```

Both methods have the same parameter list:

```text
(int)
```

The different parameter names do not make them different methods.

---

# 17. Why Is This Invalid?

The compiler sees:

```text
show(int)
show(int)
```

There is no unique method signature.

Therefore this is a duplicate method declaration.

---

# 18. Return Type Alone Cannot Overload

This is invalid:

```java
class Demo {

    int getValue() {
        return 10;
    }

    double getValue() {
        return 10.5;
    }
}
```

Why?

Both have:

```text
getValue()
```

The return types:

```text
int
double
```

are different, but that is not enough.

---

# 19. Important Rule

This does NOT create overloading:

```text
same name
same parameters
different return type
```

For example:

```java
int add(int a, int b)
double add(int a, int b)
```

is invalid.

---

# 20. Why Doesn't Java Use Return Type?

Consider:

```java
int x = obj.getValue();
```

and:

```java
double x = obj.getValue();
```

If only the return type determined the method, calls could become ambiguous or context-dependent in ways Java's overload resolution does not allow.

Java therefore does not distinguish method overloads by return type alone.

---

# 21. Valid Overloading

This is valid:

```java
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}
```

The parameter types differ.

---

# 22. Method Signature

For ordinary Java method overloading discussions, the method signature consists of:

```text
method name
+
type parameters, if any
+
formal parameter types
```

The return type is not part of the method signature used to distinguish overloaded methods.

For basic Java learning, remember:

```text
name + parameter types
```

---

# 23. Overloading with `int`

```java
class Demo {

    void show(int x) {
        System.out.println(
            "int"
        );
    }

    void show(long x) {
        System.out.println(
            "long"
        );
    }
}
```

Now:

```java
Demo d = new Demo();

d.show(10);
```

prints:

```text
int
```

because an integer literal such as `10` has type `int`.

---

# 24. Overloading with `long`

```java
d.show(10L);
```

Output:

```text
long
```

The suffix:

```text
L
```

makes the integer literal a `long`.

---

# 25. Overloading with `float` and `double`

```java
class Demo {

    void show(float x) {
        System.out.println("float");
    }

    void show(double x) {
        System.out.println("double");
    }
}
```

Call:

```java
show(10.5);
```

Output:

```text
double
```

A decimal literal such as `10.5` is a `double` by default.

---

# 26. Float Literal

Use:

```java
10.5f
```

to create a float literal.

Then:

```java
show(10.5f);
```

selects:

```text
float
```

---

# 27. Primitive Widening

Java can perform primitive widening during overload resolution.

Common examples:

```text
byte → short → int → long → float → double
char → int → long → float → double
```

This matters when an exact overload does not exist.

---

# 28. Example of Widening

```java
class Demo {

    void show(long x) {
        System.out.println("long");
    }

    void show(double x) {
        System.out.println("double");
    }
}
```

Call:

```java
byte b = 10;

new Demo().show(b);
```

Output:

```text
long
```

`byte` can widen to `long`.

---

# 29. Exact Match Is Preferred

Suppose:

```java
void show(int x)
void show(long x)
```

and:

```java
show(10);
```

The compiler chooses:

```java
show(int)
```

because `10` is already an int.

---

# 30. Widening Example

```java
class Demo {

    void show(int x) {
        System.out.println("int");
    }

    void show(long x) {
        System.out.println("long");
    }
}
```

Call:

```java
short s = 10;

new Demo().show(s);
```

Output:

```text
int
```

because:

```text
short → int
```

is a valid widening conversion.

---

# 31. Multiple Possible Widenings

Consider:

```java
void show(long x)
void show(double x)
```

For:

```java
byte b = 10;
show(b);
```

both are potentially reachable by widening:

```text
byte → long
byte → double
```

Java chooses the more specific applicable conversion, resulting in:

```text
long
```

---

# 32. Why Widening Matters

When multiple overloaded methods exist, the compiler does not randomly choose.

It applies Java's overload resolution rules.

A simplified beginner-friendly preference is:

```text
exact match
↓
widening primitive conversion
↓
boxing/unboxing
↓
varargs
```

This is a useful mental model, though the complete Java overload-resolution rules are more detailed.

---

# 33. Important: Narrowing Is Not Automatically Used

Suppose:

```java
void show(byte x) {
}
```

and:

```java
int value = 10;

show(value);
```

This does not automatically narrow:

```text
int → byte
```

because narrowing can lose information.

---

# 34. Explicit Narrowing

You can explicitly cast:

```java
show((byte) value);
```

Now the byte overload can be selected.

---

# 35. Overloading with `char`

Example:

```java
class Demo {

    void show(char c) {
        System.out.println("char");
    }

    void show(int x) {
        System.out.println("int");
    }
}
```

Call:

```java
show('A');
```

Output:

```text
char
```

because `'A'` is a char literal.

---

# 36. What If Only `int` Exists?

```java
class Demo {

    void show(int x) {
        System.out.println("int");
    }
}
```

Then:

```java
show('A');
```

works because:

```text
char → int
```

is a widening conversion.

Output:

```text
int
```

---

# 37. Boolean Does Not Widen to Numeric Types

This is invalid:

```java
void show(int x) {
}

show(true);
```

Java does not convert:

```text
boolean → int
```

or:

```text
int → boolean
```

---

# 38. Reference Type Overloading

Overloading also works with reference types.

Example:

```java
class Animal {
}

class Dog extends Animal {
}

class Printer {

    void print(Animal animal) {
        System.out.println("Animal");
    }

    void print(Dog dog) {
        System.out.println("Dog");
    }
}
```

---

# 39. Calling with Dog

```java
Printer p = new Printer();

Dog dog = new Dog();

p.print(dog);
```

Output:

```text
Dog
```

The more specific matching parameter type is selected.

---

# 40. Calling with Animal Reference

```java
Animal animal = new Dog();

p.print(animal);
```

Output:

```text
Animal
```

This is a very important distinction.

Overload selection is primarily determined at compile time using the compile-time types of the arguments.

---

# 41. Overloading vs Overriding

This distinction is extremely important.

Overloading:

```text
same class or inherited context
same method name
different parameter list
compile-time selection
```

Overriding:

```text
parent-child relationship
same compatible method signature
subclass specializes inherited instance method
runtime dispatch
```

---

# 42. Simple Comparison

```text
OVERLOADING

add(int, int)
add(double, double)
add(int, int, int)
```

vs.

```text
OVERRIDING

Parent:
sound()

Child:
sound()
```

---

# 43. Overloading Is Compile-Time Polymorphism

When the compiler decides which overloaded method to call, this is commonly called:

```text
compile-time polymorphism
```

or:

```text
static polymorphism
```

---

# 44. Example

```java
class Calculator {

    void add(int a, int b) {
        System.out.println("int");
    }

    void add(double a, double b) {
        System.out.println("double");
    }
}
```

The compiler can determine which method is applicable from the call's compile-time argument types.

---

# 45. Constructor Overloading

Constructors can also be overloaded.

Example:

```java
class Student {

    Student() {
        System.out.println(
            "No-argument constructor"
        );
    }

    Student(String name) {
        System.out.println(
            "Name constructor"
        );
    }

    Student(String name, int age) {
        System.out.println(
            "Name and age constructor"
        );
    }
}
```

---

# 46. Constructor Calls

```java
new Student();
new Student("Aman");
new Student("Aman", 20);
```

Different constructors are selected based on the arguments.

---

# 47. Constructor Overloading Is Not Method Overloading

Constructors can be overloaded, but constructors are not methods.

They share the same concept of:

```text
different parameter lists
```

but constructors have special syntax and construction semantics.

---

# 48. Constructor Overloading with `this()`

You can combine overloading with constructor chaining.

Example:

```java
class Student {

    private String name;
    private int age;

    Student() {
        this("Unknown", 0);
    }

    Student(String name) {
        this(name, 0);
    }

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

This avoids duplicated initialization logic.

---

# 49. Static Method Overloading

Static methods can also be overloaded.

Example:

```java
class Utility {

    static void print(int x) {
        System.out.println(
            "int: " + x
        );
    }

    static void print(String x) {
        System.out.println(
            "String: " + x
        );
    }
}
```

Usage:

```java
Utility.print(10);
Utility.print("Java");
```

---

# 50. Static Does Not Prevent Overloading

Remember:

```text
static method
→ can be overloaded

static method
→ cannot be overridden dynamically
```

Static method hiding was discussed in Chapter 16.

---

# 51. Instance Method Overloading

Normal instance methods can be overloaded.

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }
}
```

---

# 52. `main()` Can Be Overloaded

Java allows methods named `main` with different parameter lists.

Example:

```java
public class Main {

    public static void main(String[] args) {
        System.out.println("Real entry point");
        main(10);
    }

    public static void main(int value) {
        System.out.println(
            "Overloaded main: " + value
        );
    }
}
```

Output:

```text
Real entry point
Overloaded main: 10
```

---

# 53. Which `main()` Does Java Start?

The Java launcher looks for the standard entry-point form.

Traditionally:

```java
public static void main(String[] args)
```

The overloaded:

```java
main(int value)
```

is just another method.

It is not automatically called by the Java launcher.

---

# 54. Varargs

Varargs allow a method to accept a variable number of arguments.

Syntax:

```java
void sum(int... numbers)
```

Example:

```java
class Calculator {

    int sum(int... numbers) {

        int total = 0;

        for (int number : numbers) {
            total += number;
        }

        return total;
    }
}
```

---

# 55. Varargs Is Internally an Array Parameter

Conceptually:

```java
int... numbers
```

is handled as an array parameter:

```java
int[] numbers
```

with special calling syntax.

---

# 56. Overloading with Varargs

You can have:

```java
void show(int x)
```

and:

```java
void show(int... values)
```

These can coexist because their parameter declarations differ.

---

# 57. Which One Is Chosen?

Example:

```java
class Demo {

    void show(int x) {
        System.out.println("single int");
    }

    void show(int... values) {
        System.out.println("varargs");
    }
}
```

Call:

```java
new Demo().show(10);
```

Output:

```text
single int
```

The fixed-arity method is preferred over using varargs.

---

# 58. Varargs with Multiple Arguments

```java
new Demo().show(10, 20);
```

The only applicable method is:

```java
show(int...)
```

Output:

```text
varargs
```

---

# 59. Varargs Must Be Last

Valid:

```java
void show(String name, int... values) {
}
```

Invalid:

```java
void show(int... values, String name) {
}
```

A varargs parameter must be the final parameter.

---

# 60. Varargs and Zero Arguments

```java
void show(int... values)
```

can be called with:

```java
show();
```

The varargs array can contain zero elements.

---

# 61. Varargs and One Array Argument

Given:

```java
void show(int... values)
```

this is valid:

```java
int[] data = {1, 2, 3};

show(data);
```

because varargs is represented as an array parameter.

---

# 62. Overloading and Boxing

Java supports wrapper types such as:

```text
Integer
Double
Long
Boolean
```

Primitive values can be boxed into wrappers.

Example:

```java
int x = 10;

Integer y = x;
```

This is autoboxing.

---

# 63. Primitive vs Wrapper Overloads

Example:

```java
class Demo {

    void show(int x) {
        System.out.println("int");
    }

    void show(Integer x) {
        System.out.println("Integer");
    }
}
```

Call:

```java
show(10);
```

Output:

```text
int
```

The exact primitive match is preferred over boxing.

---

# 64. Wrapper Argument

```java
Integer x = 10;

show(x);
```

The compiler can select:

```java
show(Integer)
```

as an exact reference-type match.

---

# 65. Unboxing

Suppose:

```java
void show(int x) {
    System.out.println("int");
}

Integer value = 10;

show(value);
```

Java can unbox:

```text
Integer → int
```

and call the int overload.

---

# 66. Widening vs Boxing

Consider:

```java
class Demo {

    void show(long x) {
        System.out.println("long");
    }

    void show(Integer x) {
        System.out.println("Integer");
    }
}
```

Call:

```java
int x = 10;

new Demo().show(x);
```

Which one?

The `int` can widen to `long`.

It could also box to Integer.

Java's overload resolution prefers the applicable phase using widening primitive conversion before boxing, so:

```text
long
```

is selected.

---

# 67. Boxing vs Varargs

Consider:

```java
class Demo {

    void show(Integer x) {
        System.out.println("Integer");
    }

    void show(int... x) {
        System.out.println("varargs");
    }
}
```

Call:

```java
show(10);
```

Output:

```text
Integer
```

Boxing is considered before the variable-arity phase.

---

# 68. Important Overload Resolution Mental Model

A simplified mental model:

```text
1. Look for applicable fixed-arity methods
   using normal strict conversions.

2. Consider methods requiring permitted looser
   conversions such as boxing/unboxing.

3. If necessary, consider variable-arity methods.

4. If one applicable method is more specific,
   choose it.

5. If no unique best method exists,
   compilation fails as ambiguous.
```

The Java Language Specification has more precise rules than this simplified model.

---

# 69. `null` and Overloading

`null` can be assigned to reference types.

Example:

```java
String s = null;
```

But:

```java
int x = null;
```

is invalid because primitive types cannot hold null.

---

# 70. Null with String and Object

Consider:

```java
class Demo {

    void show(Object x) {
        System.out.println("Object");
    }

    void show(String x) {
        System.out.println("String");
    }
}
```

Call:

```java
new Demo().show(null);
```

Output:

```text
String
```

Why?

Both are applicable:

```text
null → Object
null → String
```

String is more specific than Object.

---

# 71. Null with Sibling Types

Consider:

```java
class Demo {

    void show(String x) {
        System.out.println("String");
    }

    void show(Integer x) {
        System.out.println("Integer");
    }
}
```

Call:

```java
show(null);
```

This is ambiguous.

Why?

`null` can match both:

```text
String
Integer
```

Neither is a subtype of the other.

---

# 72. Ambiguous Overload

Example:

```java
class Demo {

    void show(String x) {
    }

    void show(Integer x) {
    }
}

new Demo().show(null);
```

Compilation fails because there is no unique best method.

---

# 73. Fixing Null Ambiguity

You can explicitly cast:

```java
new Demo().show((String) null);
```

Now:

```text
String
```

is selected.

Or:

```java
new Demo().show((Integer) null);
```

selects Integer.

---

# 74. Primitive and Null

Consider:

```java
void show(int x) {
}

show(null);
```

This is invalid because:

```text
int
```

cannot receive null.

If there is an overload:

```java
void show(Integer x)
```

then:

```java
show(null);
```

can select the Integer overload.

---

# 75. `null` with Object Hierarchy

Suppose:

```java
void show(Object x)
void show(Number x)
void show(Integer x)
```

Then:

```java
show(null);
```

selects:

```text
Integer
```

because:

```text
Integer
  ↓
Number
  ↓
Object
```

Integer is the most specific applicable type.

---

# 76. Ambiguity with Interfaces

Suppose:

```java
interface A {
}

interface B {
}

class Demo {

    void show(A x) {
    }

    void show(B x) {
    }
}
```

Then:

```java
show(null);
```

is ambiguous if neither A nor B is more specific than the other.

---

# 77. Overloading with Arrays

Arrays are reference types.

Example:

```java
class Demo {

    void show(int[] values) {
        System.out.println("int array");
    }

    void show(String[] values) {
        System.out.println("String array");
    }
}
```

Usage:

```java
new Demo().show(
    new int[] {1, 2, 3}
);

new Demo().show(
    new String[] {"A", "B"}
);
```

---

# 78. Array Type Is Part of Parameter Type

These are different:

```java
show(int[])
show(double[])
```

because the parameter types differ.

---

# 79. Overloading with Object and Array

Example:

```java
class Demo {

    void show(Object value) {
        System.out.println("Object");
    }

    void show(String[] value) {
        System.out.println("String array");
    }
}
```

Call:

```java
String[] data = {"A", "B"};

new Demo().show(data);
```

Output:

```text
String array
```

The array-specific overload is more specific than Object.

---

# 80. Overloading with Interfaces

Example:

```java
interface Printable {
}

interface Scannable {
}

class Device {
}
```

You could define:

```java
void use(Printable p)
void use(Scannable s)
```

If an object implements both interfaces, a call may become ambiguous if neither parameter type is more specific.

This is an important design consideration.

---

# 81. Overloading with Inheritance

Suppose:

```java
class Animal {
}

class Dog extends Animal {
}

class Demo {

    void show(Animal animal) {
        System.out.println("Animal");
    }

    void show(Dog dog) {
        System.out.println("Dog");
    }
}
```

Now:

```java
Dog dog = new Dog();

new Demo().show(dog);
```

prints:

```text
Dog
```

---

# 82. Overloading Is Based on Compile-Time Types

This is extremely important.

```java
Animal animal = new Dog();

new Demo().show(animal);
```

selects:

```java
show(Animal)
```

even though the actual object is Dog.

Why?

Because overloaded method selection is performed at compile time based on the compile-time type of the argument.

---

# 83. Overloading vs Overriding Together

Java can have both.

Example:

```java
class Animal {

    void sound() {
        System.out.println(
            "Animal sound"
        );
    }

    void eat() {
        System.out.println("Animal eats");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog sound");
    }

    void eat(String food) {
        System.out.println(
            "Dog eats " + food
        );
    }
}
```

Here:

```text
sound()
→ overriding

eat(String)
→ overloading relative to inherited eat()
```

---

# 84. Very Important Distinction

Consider:

```java
class Parent {
    void show(int x) {
        System.out.println("Parent int");
    }
}

class Child extends Parent {
    void show(double x) {
        System.out.println("Child double");
    }
}
```

The child method:

```java
show(double)
```

does not override:

```java
show(int)
```

It creates an overload.

---

# 85. Calling the Example

```java
Child c = new Child();

c.show(10);
```

The inherited:

```java
show(int)
```

is applicable and selected.

Calling:

```java
c.show(10.5);
```

selects:

```java
show(double)
```

---

# 86. Overloading Across Inheritance

Overloaded methods can exist across a superclass/subclass hierarchy.

Example:

```java
class Parent {

    void show(int x) {
        System.out.println("Parent int");
    }
}

class Child extends Parent {

    void show(String x) {
        System.out.println("Child String");
    }
}
```

Now Child has access to both methods:

```text
show(int)
show(String)
```

---

# 87. Name Clashes and Hiding

Inheritance can make overload sets more complex.

A subclass declaration with the same method signature as an inherited instance method is generally overriding.

A different parameter list creates another overload.

Understanding the exact signatures prevents confusion.

---

# 88. Overloading with `final` Methods

A final method cannot be overridden.

But another method with the same name and different parameters can still exist as an overload.

Example:

```java
class Parent {

    final void show(int x) {
        System.out.println("int");
    }
}

class Child extends Parent {

    void show(String x) {
        System.out.println("String");
    }
}
```

This is valid.

---

# 89. Overloading Does Not Require Inheritance

You can overload methods inside one class:

```java
class Calculator {

    void add(int a, int b) {
    }

    void add(double a, double b) {
    }
}
```

Inheritance is not required.

---

# 90. Overloading Can Exist with Inheritance

It can also happen across parent-child classes:

```text
Parent
→ show(int)

Child
→ show(String)
```

The child then has an overload set involving both methods.

---

# 91. Overloading and Static Methods

Static methods can be overloaded:

```java
class Utility {

    static void log(int value) {
    }

    static void log(String value) {
    }
}
```

The compiler chooses the appropriate overload based on the call.

---

# 92. Overloading and Access Modifiers

Overloaded methods can have different access modifiers, but each declaration must satisfy Java's normal access rules.

Example:

```java
class Demo {

    public void show(int x) {
    }

    private void show(String x) {
    }
}
```

This is legal as far as overloading itself is concerned.

But the private overload cannot be called from outside the class.

---

# 93. Overloading and Exceptions

Checked exceptions do not create overloading.

This is invalid:

```java
void show() throws IOException {
}

void show() throws SQLException {
}
```

They have the same parameter list.

Changing only the `throws` clause does not create an overload.

---

# 94. Overloading and Generic Methods

Java can also overload methods involving generic signatures, but type erasure can cause signature clashes.

Example concepts:

```java
void process(List<String> list)
```

and:

```java
void process(List<Integer> list)
```

cannot coexist simply by changing only the generic type argument because after type erasure they have the same erased parameter type:

```text
List
```

This becomes especially important when studying generics in Chapter 28.

---

# 95. Overloading and Varargs Ambiguity

Be careful with multiple varargs overloads.

For example:

```java
void show(int... values)
void show(String... values)
```

Calling:

```java
show();
```

is ambiguous.

There is no argument type to choose between:

```text
int[]
String[]
```

---

# 96. Example

```java
class Demo {

    void show(int... values) {
        System.out.println("int");
    }

    void show(String... values) {
        System.out.println("String");
    }
}
```

Then:

```java
new Demo().show();
```

does not compile because the call is ambiguous.

---

# 97. Varargs and Fixed Arity

Consider:

```java
void show(int x)
void show(int... x)
```

Call:

```java
show(10);
```

The fixed-arity method is preferred.

This is usually what you want when providing both APIs.

---

# 98. Overloading and `null` with Varargs

Consider:

```java
void show(String x)
void show(String... x)
```

A call:

```java
show(null);
```

can be problematic because null can represent either a String reference or a String array reference, and overload resolution can choose based on specificity rules.

Because varargs is an array type internally, this kind of overload should be designed carefully.

---

# 99. Better API Design

Avoid unnecessary overloads that create ambiguity.

Instead of:

```java
process(String)
process(Integer)
process(Object)
process(String...)
```

ask whether all these overloads are genuinely useful.

Too many overloads can make APIs harder to understand.

---

# 100. Why Overloading Improves Readability

Compare:

```java
calculateRectangleArea(...)
calculateCircleArea(...)
calculateSquareArea(...)
```

with a context where the operation can reasonably share a name:

```java
calculate(...)
```

The same conceptual operation can be represented by one method name with different parameter combinations.

---

# 101. Example — Printing

Instead of:

```java
printInteger()
printString()
printDouble()
```

you can provide:

```java
print(int)
print(String)
print(double)
```

This is a common use of overloading.

---

# 102. Example — Constructors

A class may support:

```java
new User()
new User("Aman")
new User("Aman", 20)
```

through constructor overloading.

This gives callers convenient initialization choices.

---

# 103. Example — Searching

A class might provide:

```java
find(int id)
find(String username)
find(String username, String domain)
```

if these represent meaningful variations of the same conceptual operation.

---

# 104. Example — Logging

A logging utility may conceptually support:

```java
log(String message)
log(String message, int level)
log(Exception exception)
```

All represent logging, but with different input forms.

---

# 105. Example — Geometry

```java
class AreaCalculator {

    double area(double radius) {
        return Math.PI * radius * radius;
    }

    double area(double length, double width) {
        return length * width;
    }
}
```

This uses the same conceptual operation:

```text
area
```

with different parameter forms.

---

# 106. Practical Program — Calculator

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }

    double add(double a, double b) {
        return a + b;
    }

    double add(
        double a,
        double b,
        double c
    ) {
        return a + b + c;
    }
}
```

---

# 107. Calculator Usage

```java
Calculator calculator =
    new Calculator();

System.out.println(
    calculator.add(10, 20)
);

System.out.println(
    calculator.add(10, 20, 30)
);

System.out.println(
    calculator.add(10.5, 20.5)
);

System.out.println(
    calculator.add(
        10.5,
        20.5,
        30.5
    )
);
```

Output:

```text
30
60
31.0
61.5
```

---

# 108. Practical Program — Printer

```java
class Printer {

    void print(int value) {
        System.out.println(
            "Integer: " + value
        );
    }

    void print(double value) {
        System.out.println(
            "Double: " + value
        );
    }

    void print(String value) {
        System.out.println(
            "String: " + value
        );
    }

    void print(boolean value) {
        System.out.println(
            "Boolean: " + value
        );
    }
}
```

---

# 109. Printer Usage

```java
Printer printer = new Printer();

printer.print(100);
printer.print(10.5);
printer.print("Java");
printer.print(true);
```

Output:

```text
Integer: 100
Double: 10.5
String: Java
Boolean: true
```

---

# 110. Practical Program — Student Constructors

```java
class Student {

    private String name;
    private int age;
    private String course;

    Student() {
        this("Unknown", 0, "Unknown");
    }

    Student(String name) {
        this(name, 0, "Unknown");
    }

    Student(
        String name,
        int age
    ) {
        this(name, age, "Unknown");
    }

    Student(
        String name,
        int age,
        String course
    ) {
        this.name = name;
        this.age = age;
        this.course = course;
    }

    void display() {
        System.out.println(
            name + " " +
            age + " " +
            course
        );
    }
}
```

---

# 111. Student Usage

```java
new Student().display();

new Student("Aman").display();

new Student("Aman", 20).display();

new Student(
    "Aman",
    20,
    "Java"
).display();
```

Output:

```text
Unknown 0 Unknown
Aman 0 Unknown
Aman 20 Unknown
Aman 20 Java
```

---

# 112. Practical Program — Area Calculator

```java
class AreaCalculator {

    double area(double radius) {
        return Math.PI *
               radius *
               radius;
    }

    double area(
        double length,
        double width
    ) {
        return length * width;
    }

    int area(
        int length,
        int width
    ) {
        return length * width;
    }
}
```

---

# 113. Area Usage

```java
AreaCalculator a =
    new AreaCalculator();

System.out.println(
    a.area(5)
);

System.out.println(
    a.area(10.0, 5.0)
);

System.out.println(
    a.area(10, 5)
);
```

The compiler chooses overloads based on the argument types and overload-resolution rules.

---

# 114. Practical Program — Search Service

```java
class SearchService {

    void find(int id) {
        System.out.println(
            "Searching by id: " + id
        );
    }

    void find(String username) {
        System.out.println(
            "Searching by username: " +
            username
        );
    }

    void find(
        String username,
        String domain
    ) {
        System.out.println(
            "Searching by account: " +
            username + "@" + domain
        );
    }
}
```

---

# 115. Practical Program — Static Overloading

```java
class Logger {

    static void log(String message) {
        System.out.println(
            "MESSAGE: " + message
        );
    }

    static void log(
        String message,
        int level
    ) {
        System.out.println(
            "LEVEL " + level +
            ": " + message
        );
    }
}
```

Usage:

```java
Logger.log("Started");

Logger.log(
    "Warning",
    2
);
```

---

# 116. Practical Program — Main Overloading

```java
public class Main {

    public static void main(String[] args) {

        System.out.println(
            "Program started"
        );

        main(10);
    }

    public static void main(int value) {

        System.out.println(
            "Value = " + value
        );
    }
}
```

Output:

```text
Program started
Value = 10
```

---

# 117. Practical Program — Varargs

```java
class Calculator {

    int sum(int... values) {

        int total = 0;

        for (int value : values) {
            total += value;
        }

        return total;
    }
}
```

Usage:

```java
Calculator c =
    new Calculator();

System.out.println(
    c.sum()
);

System.out.println(
    c.sum(10)
);

System.out.println(
    c.sum(10, 20)
);

System.out.println(
    c.sum(10, 20, 30)
);
```

Output:

```text
0
10
30
60
```

---

# 118. Practical Program — Overloading with Inheritance

```java
class Parent {

    void show(int value) {
        System.out.println(
            "Parent int"
        );
    }
}

class Child extends Parent {

    void show(String value) {
        System.out.println(
            "Child String"
        );
    }
}
```

Usage:

```java
Child child = new Child();

child.show(10);
child.show("Java");
```

Output:

```text
Parent int
Child String
```

---

# 119. Practical Program — Overloading and Overriding

```java
class Animal {

    void sound() {
        System.out.println(
            "Animal sound"
        );

        eat(1);
    }

    void eat(int amount) {
        System.out.println(
            "Animal eats " +
            amount
        );
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println(
            "Dog sound"
        );
    }

    void eat(String food) {
        System.out.println(
            "Dog eats " + food
        );
    }
}
```

Here:

```text
sound()
→ overriding

eat(String)
→ overload

eat(int)
→ inherited
```

---

# 120. Overload Resolution — Basic Algorithm

When you write:

```java
obj.method(arguments);
```

the compiler roughly needs to determine:

```text
1. What methods named method are visible?
2. Which parameter lists can accept the arguments?
3. Which conversion is needed?
4. Which applicable method is most specific?
5. Is there exactly one best method?
```

If there is no valid method:

```text
compile-time error
```

If there is more than one equally suitable method:

```text
ambiguous method call
```

---

# 121. Example of No Matching Overload

```java
class Demo {

    void show(int x) {
    }

    void show(String x) {
    }
}
```

Then:

```java
new Demo().show(true);
```

does not compile because neither overload accepts boolean.

---

# 122. Example of Ambiguity

```java
class Demo {

    void show(String x) {
    }

    void show(Integer x) {
    }
}
```

Then:

```java
new Demo().show(null);
```

is ambiguous.

---

# 123. Example of Exact Match

```java
class Demo {

    void show(int x) {
        System.out.println("int");
    }

    void show(long x) {
        System.out.println("long");
    }
}
```

Call:

```java
show(10);
```

Output:

```text
int
```

---

# 124. Example of Widening

```java
class Demo {

    void show(long x) {
        System.out.println("long");
    }
}

short x = 10;

new Demo().show(x);
```

Output:

```text
long
```

because:

```text
short → long
```

is widening.

---

# 125. Example of Boxing

```java
class Demo {

    void show(Integer x) {
        System.out.println("Integer");
    }
}

int x = 10;

new Demo().show(x);
```

Output:

```text
Integer
```

because the int can be boxed into Integer.

---

# 126. Example of Unboxing

```java
class Demo {

    void show(int x) {
        System.out.println("int");
    }
}

Integer x = 10;

new Demo().show(x);
```

Output:

```text
int
```

because Integer can be unboxed.

---

# 127. Important Conversion Ordering

For beginner understanding, remember:

```text
exact match
→ usually preferred

primitive widening
→ considered before boxing

boxing/unboxing
→ considered in later overload-resolution phases

varargs
→ considered later
```

Do not memorize this as a complete replacement for the Java Language Specification. It is a learning model.

---

# 128. Why Overloading Can Become Dangerous

Too many overloads can make an API difficult to predict.

Example:

```java
process(int)
process(long)
process(Integer)
process(Long)
process(Object)
process(int...)
```

A simple call can become difficult to reason about.

Good APIs should use overloads when they make the operation clearer.

---

# 129. Avoid Ambiguous APIs

For example:

```java
show(String)
show(Integer)
```

makes:

```java
show(null)
```

ambiguous.

If callers commonly pass null, this may be a poor API design.

---

# 130. Overloading and Readability

Good:

```java
connect(String host)
connect(String host, int port)
```

Both clearly represent connecting.

Potentially confusing:

```java
connect(String)
connect(Object)
connect(CharSequence)
connect(String...)
```

if their behavior is not obvious.

---

# 131. Overloading and Default Values

Java does not have default parameter values like some languages.

Instead, constructor/method overloading can provide common alternatives.

Example:

```java
User()
User(String name)
User(String name, int age)
```

This is one reason overloading is useful.

---

# 132. Overloading vs Optional Parameters

Instead of:

```text
method(value, default value)
```

Java often uses:

```java
method(value)
method(value, option)
```

through overloading.

However, too many overloads can also make APIs larger.

---

# 133. Overloading and Named Arguments

Java does not have general named method arguments.

Overloading can provide different parameter combinations, but it is not the same as named parameters.

---

# 134. Overloading and Type Inference

Modern Java features such as:

```text
var
generics
lambdas
method references
```

can affect the types available during compilation.

Overload resolution can therefore become more advanced in modern code.

The basic principle remains:

```text
compiler selects a valid and most specific applicable overload
```

---

# 135. Lambda Overloading Preview

Functional interfaces can create tricky overloads.

For example:

```java
void process(Consumer<String> c)
void process(Function<String, String> f)
```

A lambda may potentially match different functional interfaces depending on its shape and target type.

This is one reason lambda overloads need careful design.

Functional interfaces and lambdas are covered in Chapters 37 and 38.

---

# 136. Method References and Overloading Preview

Method references can also participate in overload resolution.

Example concepts:

```java
process(String::length)
```

The compiler may need target-type information to determine which overloaded functional interface is intended.

This is an advanced topic and will be covered later.

---

# 137. Generic Overloading Preview

Generics can interact with overloading and type erasure.

For example, these cannot be distinguished after erasure:

```java
void process(List<String> list)
void process(List<Integer> list)
```

Both effectively have:

```text
process(List)
```

at the erased level.

This is why Java does not allow them as overloads.

---

# 138. Overloading and Type Erasure

This is an advanced interview point.

Generic type arguments often disappear through type erasure at runtime.

Therefore:

```java
List<String>
```

and:

```java
List<Integer>
```

cannot by themselves distinguish overloaded methods.

---

# 139. Method Overloading with Generic Methods

Some generic overloads are possible if the erased signatures remain different.

But you should always check whether the final erased method signatures collide.

Generics are covered in Chapter 28.

---

# 140. Overloading and Access

Suppose:

```java
class Demo {

    public void show(int x) {
        System.out.println("public");
    }

    private void show(String x) {
        System.out.println("private");
    }
}
```

Inside the class both methods are available.

Outside the class:

```java
show(10);
```

may access the public method.

But:

```java
show("Java");
```

cannot access the private overload.

---

# 141. Overloading and `final`

A final method can participate in an overload set.

Example:

```java
class Demo {

    final void show(int x) {
    }

    void show(String x) {
    }
}
```

`show(String)` does not override anything; it is an overload.

---

# 142. Overloading and Abstract Methods

Abstract classes can have overloaded methods.

Example:

```java
abstract class Shape {

    abstract void draw();

    void draw(String color) {
        System.out.println(color);
    }
}
```

A subclass must implement the abstract `draw()` method, while the overloaded `draw(String)` may be inherited.

Abstract classes are covered in Chapter 20.

---

# 143. Overloading and Interfaces

Interfaces can declare overloaded methods too.

Example:

```java
interface Printer {

    void print(String value);

    void print(int value);
}
```

A class implementing Printer must provide both methods unless other interface rules apply.

---

# 144. Overloading and Inheritance — Detailed Example

```java
class Animal {

    void eat() {
        System.out.println("Animal eats");
    }

    void eat(String food) {
        System.out.println(
            "Animal eats " + food
        );
    }
}

class Dog extends Animal {

    @Override
    void eat() {
        System.out.println(
            "Dog eats"
        );
    }

    void eat(int amount) {
        System.out.println(
            "Dog eats " + amount
        );
    }
}
```

Dog has an overload set involving:

```text
eat()
eat(String)
eat(int)
```

with different origins.

---

# 145. Calling the Detailed Example

```java
Dog dog = new Dog();

dog.eat();
dog.eat("meat");
dog.eat(2);
```

Output:

```text
Dog eats
Animal eats meat
Dog eats 2
```

Here:

```text
eat()
→ overridden in Dog

eat(String)
→ inherited from Animal

eat(int)
→ declared in Dog
```

---

# 146. Important Lesson

Overloading and overriding can coexist.

Do not assume:

```text
same method name
```

automatically means overriding.

Always compare:

```text
parameter types
inheritance relationship
```

---

# 147. Method Overloading Rules

Memorize these rules:

```text
1. Method name must be the same.

2. Parameter list must be different.

3. Number of parameters can differ.

4. Parameter types can differ.

5. Parameter order can differ.

6. Parameter names alone do not matter.

7. Return type alone cannot create overloading.

8. throws clause alone cannot create overloading.

9. Access modifier does not determine whether methods overload.

10. Static methods can be overloaded.

11. Constructors can be overloaded.

12. Overload selection occurs at compile time.
```

---

# 148. Overloading Examples — Valid

```java
void show()
void show(int x)
```

Valid.

```java
void show(int x)
void show(double x)
```

Valid.

```java
void show(int x, String y)
void show(String x, int y)
```

Valid.

---

# 149. Overloading Examples — Invalid

```java
void show(int x)
void show(int y)
```

Invalid.

Parameter names differ only.

---

# 150. Invalid — Return Type Only

```java
int show()
double show()
```

Invalid.

---

# 151. Invalid — `throws` Only

```java
void show() throws IOException
void show() throws SQLException
```

Invalid.

The parameter list is still:

```text
()
```

---

# 152. Invalid — Generic Type Argument Only

These cannot be overloaded simply by generic element type:

```java
void process(List<String> list)
void process(List<Integer> list)
```

because of type erasure.

---

# 153. Practical Design Rule

Use overloading when:

```text
same conceptual operation
+
different reasonable inputs
```

Example:

```java
print(int)
print(String)
print(double)
```

---

# 154. Do Not Use Overloading When Meaning Changes

Suppose:

```java
save(User user)
save(Database database)
```

If these operations mean fundamentally different things, a different method name may be clearer.

Overloading should improve readability, not hide different behaviors.

---

# 155. Common Mistake — Return Type

Wrong:

```java
int add(int a, int b)
double add(int a, int b)
```

Correct:

```java
int add(int a, int b)
double add(double a, double b)
```

---

# 156. Common Mistake — Parameter Names

Wrong:

```java
void show(int x)
void show(int y)
```

Changing variable names does not create an overload.

---

# 157. Common Mistake — Confusing Overloading with Overriding

Overloading:

```text
different parameters
```

Overriding:

```text
same compatible parameters
+
parent-child relationship
```

---

# 158. Common Mistake — Assuming Runtime Object Chooses Overload

Consider:

```java
Animal a = new Dog();

process(a);
```

If overloads exist:

```java
process(Animal)
process(Dog)
```

the compile-time type of `a` is Animal, so the Animal overload is selected.

Runtime dispatch is associated with overriding of instance methods, not ordinary overload selection.

---

# 159. Common Mistake — Ignoring Widening

Given:

```java
show(long)
```

this works:

```java
short x = 10;
show(x);
```

because widening is allowed.

---

# 160. Common Mistake — Expecting Narrowing

Given:

```java
show(byte)
```

this does not automatically accept:

```java
int x = 10;
show(x);
```

because int-to-byte is narrowing.

---

# 161. Common Mistake — Forgetting Literal Types

Remember:

```java
10
```

is:

```text
int
```

```java
10L
```

is:

```text
long
```

```java
10.5
```

is:

```text
double
```

```java
10.5f
```

is:

```text
float
```

---

# 162. Common Mistake — Null Ambiguity

Given:

```java
show(String)
show(Integer)
```

this:

```java
show(null);
```

is ambiguous.

---

# 163. Common Mistake — Too Many Overloads

A huge overload set can create:

```text
ambiguity
confusing API
harder maintenance
unexpected conversions
```

Use only meaningful overloads.

---

# 164. Common Mistake — Ignoring Boxing

Given:

```java
show(int)
show(Integer)
```

an int argument usually selects:

```java
show(int)
```

because the exact primitive match is preferred over boxing.

---

# 165. Common Mistake — Ignoring Varargs

Given:

```java
show(int)
show(int...)
```

a single int normally selects:

```java
show(int)
```

The varargs version is a fallback for variable arity.

---

# 166. Common Mistake — Thinking Static Cannot Be Overloaded

Static methods can absolutely be overloaded.

Example:

```java
static void print(int x)
static void print(String x)
```

---

# 167. Common Mistake — Thinking `main()` Cannot Be Overloaded

It can.

Only the standard launcher entry point is special.

You can define:

```java
main(int)
main(String)
```

as additional overloaded methods.

---

# 168. Common Mistake — Changing Only `throws`

Changing:

```java
throws IOException
```

to:

```java
throws SQLException
```

does not create an overload.

---

# 169. Common Mistake — Changing Only Generic Type

These are not valid overloads:

```java
process(List<String>)
process(List<Integer>)
```

because of erasure.

---

# 170. Interview Questions — Basic

## Q1. What is method overloading?

Method overloading means defining multiple methods with the same name but different parameter lists.

---

## Q2. What is compile-time polymorphism?

It is commonly used to describe method overloading because the compiler selects the applicable overloaded method.

---

## Q3. What are the ways to overload a method?

You can change:

```text
number of parameters
parameter types
parameter order
```

---

## Q4. Can changing parameter names overload a method?

No.

---

## Q5. Can return type alone overload a method?

No.

---

## Q6. Can methods with different access modifiers be overloaded?

Yes, provided their parameter lists differ.

---

## Q7. Can static methods be overloaded?

Yes.

---

## Q8. Can constructors be overloaded?

Yes.

---

# 171. Interview Questions — Intermediate

## Q9. What is the difference between overloading and overriding?

Overloading uses different parameter lists and is resolved at compile time.

Overriding occurs in a parent-child relationship when a subclass provides a compatible implementation of an inherited instance method and participates in runtime dispatch.

---

## Q10. Is inheritance required for method overloading?

No.

---

## Q11. Is inheritance required for method overriding?

A superclass/subclass relationship is required for ordinary method overriding.

---

## Q12. Does the return type participate in overload resolution?

Return type alone does not distinguish overloaded methods.

---

## Q13. Can two methods differ only by `throws` clause?

No.

---

## Q14. Can two methods differ only by generic type arguments?

Not when type erasure makes their erased signatures identical.

---

# 172. Interview Questions — Overload Resolution

## Q15. Which method is preferred: exact match or widening?

Generally, an applicable exact match is preferred over one requiring widening.

---

## Q16. Is widening preferred over boxing?

In the relevant overload-resolution phases, primitive widening is considered before boxing.

---

## Q17. Is boxing preferred over varargs?

Yes, boxing/unboxing phases are considered before variable-arity invocation.

---

## Q18. What happens if two overloads are equally applicable?

If there is no unique most-specific method, the call is ambiguous and compilation fails.

---

## Q19. Can `null` cause an overloaded call to be ambiguous?

Yes.

For example:

```java
show(String)
show(Integer)

show(null);
```

is ambiguous.

---

# 173. Interview Questions — Inheritance

## Q20. What happens when a parent has `show(int)` and child has `show(double)`?

The child method overloads the inherited method; it does not override it.

---

## Q21. Is an overloaded method dynamically dispatched?

Overload selection itself is compile-time behavior.

---

## Q22. What happens with:

```java
Animal a = new Dog();
show(a);
```

if both `show(Animal)` and `show(Dog)` exist?

The Animal overload is selected based on the compile-time type of `a`.

---

## Q23. Can an overridden method also have overloaded versions?

Yes.

A class can contain an overridden method and additional overloads with different parameter lists.

---

# 174. Interview Questions — Constructors

## Q24. What is constructor overloading?

Defining multiple constructors in the same class with different parameter lists.

---

## Q25. Why is constructor overloading useful?

It provides multiple convenient ways to initialize an object.

---

## Q26. Can constructor overloading use different return types?

Constructors have no return type, so return type is not involved.

---

# 175. Output Questions

## Output 1

```java
class Demo {

    void show(int x) {
        System.out.println("int");
    }

    void show(double x) {
        System.out.println("double");
    }
}

new Demo().show(10);
```

Output:

```text
int
```

---

# 176. Output Question 2

```java
class Demo {

    void show(int x) {
        System.out.println("int");
    }

    void show(long x) {
        System.out.println("long");
    }
}

new Demo().show(10L);
```

Output:

```text
long
```

---

# 177. Output Question 3

```java
class Demo {

    void show(float x) {
        System.out.println("float");
    }

    void show(double x) {
        System.out.println("double");
    }
}

new Demo().show(10.5);
```

Output:

```text
double
```

---

# 178. Output Question 4

```java
class Demo {

    void show(float x) {
        System.out.println("float");
    }

    void show(double x) {
        System.out.println("double");
    }
}

new Demo().show(10.5f);
```

Output:

```text
float
```

---

# 179. Output Question 5

```java
class Demo {

    void show(int x) {
        System.out.println("int");
    }

    void show(long x) {
        System.out.println("long");
    }
}

short x = 10;

new Demo().show(x);
```

Output:

```text
int
```

---

# 180. Output Question 6

```java
class Demo {

    void show(int x) {
        System.out.println("int");
    }

    void show(Integer x) {
        System.out.println("Integer");
    }
}

new Demo().show(10);
```

Output:

```text
int
```

---

# 181. Output Question 7

```java
class Demo {

    void show(Integer x) {
        System.out.println("Integer");
    }
}

int x = 10;

new Demo().show(x);
```

Output:

```text
Integer
```

---

# 182. Output Question 8

```java
class Demo {

    void show(Object x) {
        System.out.println("Object");
    }

    void show(String x) {
        System.out.println("String");
    }
}

new Demo().show(null);
```

Output:

```text
String
```

---

# 183. Output Question 9

```java
class Demo {

    void show(String x) {
        System.out.println("String");
    }

    void show(Integer x) {
        System.out.println("Integer");
    }
}

new Demo().show(null);
```

Result:

```text
Compilation error
```

The call is ambiguous.

---

# 184. Output Question 10

```java
class Parent {

    void show(int x) {
        System.out.println("Parent int");
    }
}

class Child extends Parent {

    void show(String x) {
        System.out.println("Child String");
    }
}

Child c = new Child();

c.show(10);
c.show("Java");
```

Output:

```text
Parent int
Child String
```

---

# 185. Output Question 11

```java
class Parent {

    void show(int x) {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    @Override
    void show(int x) {
        System.out.println("Child");
    }

    void show(String x) {
        System.out.println("String");
    }
}

Child c = new Child();

c.show(10);
c.show("Java");
```

Output:

```text
Child
String
```

---

# 186. Output Question 12

```java
class Demo {

    void show(int x) {
        System.out.println("single");
    }

    void show(int... x) {
        System.out.println("varargs");
    }
}

new Demo().show(10);
```

Output:

```text
single
```

---

# 187. Output Question 13

```java
class Demo {

    void show(int... x) {
        System.out.println(
            x.length
        );
    }
}

new Demo().show();
new Demo().show(10, 20, 30);
```

Output:

```text
0
3
```

---

# 188. Output Question 14

```java
class Demo {

    void show(long x) {
        System.out.println("long");
    }

    void show(Integer x) {
        System.out.println("Integer");
    }
}

int x = 10;

new Demo().show(x);
```

Output:

```text
long
```

The primitive widening path is preferred before boxing in overload resolution.

---

# 189. Output Question 15

```java
class Demo {

    static void show(int x) {
        System.out.println("int");
    }

    static void show(String x) {
        System.out.println("String");
    }
}

Demo.show(10);
Demo.show("Java");
```

Output:

```text
int
String
```

---

# 190. Output Question 16

```java
public class Main {

    public static void main(String[] args) {
        System.out.println("A");
        main(10);
    }

    public static void main(int x) {
        System.out.println("B");
    }
}
```

Output:

```text
A
B
```

---

# 191. Output Question 17

```java
class Demo {

    void show(char x) {
        System.out.println("char");
    }

    void show(int x) {
        System.out.println("int");
    }
}

new Demo().show('A');
```

Output:

```text
char
```

---

# 192. Output Question 18

```java
class Demo {

    void show(int x) {
        System.out.println("int");
    }
}

char c = 'A';

new Demo().show(c);
```

Output:

```text
int
```

because char can widen to int.

---

# 193. Output Question 19

```java
class Demo {

    void show(Object x) {
        System.out.println("Object");
    }

    void show(Number x) {
        System.out.println("Number");
    }

    void show(Integer x) {
        System.out.println("Integer");
    }
}

new Demo().show(null);
```

Output:

```text
Integer
```

Integer is the most specific applicable type.

---

# 194. Output Question 20

```java
class Demo {

    void show(int x) {
        System.out.println("int");
    }

    void show(String x) {
        System.out.println("String");
    }
}

new Demo().show(true);
```

Result:

```text
Compilation error
```

There is no applicable overload.

---

# 195. Exercise 1 — Basic Overloading

Create a class:

```java
Calculator
```

with:

```text
add(int, int)
add(double, double)
add(int, int, int)
```

Test all three.

---

# 196. Exercise 2 — Different Parameter Types

Create:

```java
Printer
```

with overloaded:

```text
print(int)
print(double)
print(String)
print(boolean)
```

---

# 197. Exercise 3 — Parameter Order

Create:

```java
display(int, String)
display(String, int)
```

Call both versions.

---

# 198. Exercise 4 — Constructor Overloading

Create a:

```java
Student
```

with constructors:

```text
Student()
Student(String name)
Student(String name, int age)
Student(String name, int age, String course)
```

Use `this()` to avoid duplicated initialization.

---

# 199. Exercise 5 — Area

Create:

```java
AreaCalculator
```

with overloaded:

```text
area(double radius)
area(double length, double width)
area(int length, int width)
```

Test all methods.

---

# 200. Exercise 6 — Static Overloading

Create:

```java
MathUtil
```

with:

```text
static max(int, int)
static max(double, double)
static max(int, int, int)
```

Return the largest value.

---

# 201. Exercise 7 — Varargs

Create:

```java
sum(int...)
```

and return the total.

Test:

```java
sum()
sum(10)
sum(10, 20)
sum(10, 20, 30)
```

---

# 202. Exercise 8 — Fixed Arity vs Varargs

Create:

```java
show(int)
show(int...)
```

Test:

```java
show(10)
show(10, 20)
```

Predict the output before running.

---

# 203. Exercise 9 — Inheritance and Overloading

Create:

```text
Animal
Dog
```

Animal:

```text
eat()
eat(String)
```

Dog:

```text
eat(int)
```

Test all three.

---

# 204. Exercise 10 — Overloading and Overriding

Create:

```text
Animal
Dog
```

Animal:

```text
sound()
eat(String)
```

Dog:

```text
override sound()
add eat(int)
```

Determine which method is inherited, overridden, and overloaded.

---

# 205. Exercise 11 — Primitive Overloads

Create:

```java
show(int)
show(long)
show(double)
```

Test with:

```java
int
short
byte
char
long
float
double
```

Predict which overload will be selected.

---

# 206. Exercise 12 — Boxing

Create:

```java
show(int)
show(Integer)
```

Test:

```java
show(10);
```

and:

```java
Integer x = 10;
show(x);
```

Explain the outputs.

---

# 207. Exercise 13 — Null

Create:

```java
show(Object)
show(String)
```

Call:

```java
show(null);
```

Then add:

```java
show(Integer)
```

and observe what happens.

---

# 208. Exercise 14 — Ambiguity

Create:

```java
show(String)
show(Integer)
```

Try:

```java
show(null);
```

Explain why compilation fails.

---

# 209. Exercise 15 — Main Overloading

Create:

```java
main(String[])
main(int)
main(String)
```

Call the overloaded methods manually from the standard `main`.

---

# 210. Mini Project — Flexible Calculator

Create a calculator supporting:

```text
add
subtract
multiply
divide
```

with overloaded versions for:

```text
int
double
three operands
```

Example:

```java
add(10, 20)
add(10.5, 20.5)
add(10, 20, 30)
```

---

# 211. Mini Project — Student Builder Through Constructors

Create a Student class supporting:

```text
Student()
Student(String name)
Student(String name, int age)
Student(String name, int age, String course)
```

Use constructor overloading and constructor chaining.

---

# 212. Mini Project — Logger

Create:

```text
Logger
```

with overloaded methods:

```text
log(String)
log(String, int)
log(String, Exception)
```

Design the overloads so that the method name remains meaningful.

---

# 213. Mini Project — Search Service

Create:

```text
SearchService
```

with:

```text
find(int id)
find(String username)
find(String username, String domain)
```

Print what type of search is being performed.

---

# 214. Mini Project — Geometry Calculator

Create overloaded:

```text
area(...)
perimeter(...)
```

for multiple shapes.

Think about whether overloading remains readable as the number of shapes increases.

---

# 215. Challenge — Predict the Output

Given:

```java
class Demo {

    void test(long x) {
        System.out.println("long");
    }

    void test(Integer x) {
        System.out.println("Integer");
    }

    void test(Object x) {
        System.out.println("Object");
    }
}
```

Predict:

```java
new Demo().test(10);
```

Answer:

```text
long
```

because `int → long` widening is considered before boxing to Integer.

---

# 216. Challenge — Predict the Output

```java
class Demo {

    void test(Object x) {
        System.out.println("Object");
    }

    void test(String x) {
        System.out.println("String");
    }
}
```

Call:

```java
new Demo().test(null);
```

Answer:

```text
String
```

---

# 217. Challenge — Find the Error

```java
class Demo {

    int show(int x) {
        return x;
    }

    double show(int x) {
        return x;
    }
}
```

Answer:

```text
Compilation error
```

Return type alone cannot overload a method.

---

# 218. Challenge — Find the Error

```java
class Demo {

    void show(int x) {
    }

    void show(int y) {
    }
}
```

Answer:

```text
Compilation error
```

Parameter names do not distinguish overloads.

---

# 219. Challenge — Find the Error

```java
class Demo {

    void show(String x) {
    }

    void show(Integer x) {
    }
}

new Demo().show(null);
```

Answer:

```text
Compilation error
```

The call is ambiguous.

---

# 220. Challenge — Explain

Why does:

```java
Animal animal = new Dog();
demo.show(animal);
```

select:

```java
show(Animal)
```

instead of:

```java
show(Dog)
```

Answer:

Because overload resolution uses the compile-time type of the argument expression, which is Animal.

Runtime polymorphism for overridden instance methods is a different mechanism.

---

# 221. Challenge — Overloading or Overriding?

Given:

```java
class Parent {

    void show(int x) {
    }
}

class Child extends Parent {

    void show(double x) {
    }
}
```

Is this:

```text
overloading
```

or:

```text
overriding
```

Answer:

```text
Overloading
```

because the parameter types are different.

---

# 222. Challenge — Overloading or Overriding?

```java
class Parent {

    void show(int x) {
    }
}

class Child extends Parent {

    @Override
    void show(int x) {
    }
}
```

Answer:

```text
Overriding
```

because Child provides a compatible implementation of the inherited instance method.

---

# 223. Final Comparison Table

| Feature | Method Overloading | Method Overriding |
|---|---|---|
| Main idea | Same name, different parameters | Child specializes inherited method |
| Parent-child required? | No | Yes |
| Parameter list | Must differ | Same compatible signature |
| Return type alone | Cannot overload | Can use covariant reference return |
| Main resolution | Compile time | Runtime dispatch for instance methods |
| Polymorphism type | Compile-time | Runtime |
| `static` methods | Can be overloaded | Hidden, not overridden |
| `final` method | Can have overloads | Cannot be overridden |
| Constructors | Can be overloaded | Cannot be overridden |
| `@Override` | Not required | Recommended/important |
| Main purpose | Convenience and API clarity | Specialization |

---

# 224. Final Revision

Remember this simple formula:

```text
METHOD OVERLOADING

same method name
        +
different parameter list
        =
overloading
```

The parameter list can differ by:

```text
number
type
order
```

But not merely by:

```text
parameter names
return type
throws clause
```

---

# 225. Most Important Rules

```text
1. Same method name is required.

2. Parameter lists must differ.

3. Different number of parameters works.

4. Different parameter types works.

5. Different parameter order works.

6. Parameter names do not matter.

7. Return type alone cannot overload.

8. throws clause alone cannot overload.

9. Constructors can be overloaded.

10. Static methods can be overloaded.

11. main() can be overloaded.

12. Overload selection occurs at compile time.

13. Exact matches are generally preferred.

14. Primitive widening can participate in overload resolution.

15. Narrowing is not automatically used.

16. Boxing/unboxing can participate in overload resolution.

17. Varargs is considered later than fixed-arity alternatives.

18. null can create ambiguous overload calls.

19. Reference overloads use compile-time argument types.

20. Overloading and overriding can coexist.

21. Fields are unrelated to method overloading.

22. Generic type erasure can prevent some apparent overloads.

23. Too many overloads can make an API confusing.

24. Use overloading when methods represent the same conceptual operation.

25. Always think about ambiguity when designing overloads.
```

---

# 226. Chapter 17 Complete

You should now understand:

```text
                METHOD
                   |
          +--------+--------+
          |                 |
      OVERLOADING       OVERRIDING
          |                 |
   different params    same compatible params
          |                 |
    compile time        runtime dispatch
          |                 |
   static polymorphism dynamic polymorphism
```

The most important distinction is:

```java
add(int, int)
add(double, double)
```

→ **overloading**

while:

```java
class Parent {
    void show() {}
}

class Child extends Parent {
    @Override
    void show() {}
}
```

→ **overriding**

The next chapter goes deeply into overriding and its rules.

# Chapter 18 — Method Overriding

You will learn:

```text
✓ What overriding is
✓ Why overriding is needed
✓ Rules of overriding
✓ @Override
✓ Parent-child relationship
✓ Same method signature
✓ Access modifiers
✓ final methods
✓ static methods
✓ private methods
✓ covariant return types
✓ super.method()
✓ Runtime method dispatch
✓ Dynamic dispatch
✓ Parent reference → child object
✓ Upcasting
✓ Method resolution
✓ Constructors and overriding
✓ Exception rules
✓ Practical programs
✓ Exercises
✓ Output questions
✓ Interview questions
```
