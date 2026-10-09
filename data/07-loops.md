# Chapter 7 — Loops in Java

> **Java Master Course — Chapter 7 of 50**
>
> Loops allow a Java program to repeat a block of code. They are one of the most important concepts in programming because many problems require the same operation to be performed multiple times.

---

# 1. What Is a Loop?

Suppose you want to print:

```text
Java
Java
Java
Java
Java
```

Without a loop, you could write:

```java
System.out.println("Java");
System.out.println("Java");
System.out.println("Java");
System.out.println("Java");
System.out.println("Java");
```

This works, but it is repetitive.

With a loop:

```java
for (int i = 1; i <= 5; i++) {
    System.out.println("Java");
}
```

Much better.

The basic idea is:

```text
        Start
          ↓
      Check condition
          ↓
      ┌───┴───┐
    true    false
      │        │
      ↓        ↓
   Execute    Stop
    body
      │
      ↓
   Update
      │
      └──────► Check again
```

A loop repeatedly executes code while a condition remains true.

---

# 2. Why Do We Need Loops?

Loops are useful whenever the same operation must happen repeatedly.

Examples:

```text
Print numbers 1 to 100
Read 10 values
Search through an array
Calculate a sum
Process every student
Repeat a menu
Validate input
Generate patterns
Run a game loop
Process records
```

Without loops, many programs would contain thousands of repeated statements.

---

# 3. Real-Life Example

Imagine you need to water 100 plants.

You could think:

```text
Water plant 1
Water plant 2
Water plant 3
...
Water plant 100
```

A programmer thinks:

```text
Repeat watering until all plants are done.
```

That is the basic idea behind loops.

---

# 4. Main Loop Types in Java

Java provides several looping mechanisms.

The most important are:

```text
while
do-while
for
enhanced for
```

There are also loop-control statements:

```text
break
continue
```

You can also create nested loops.

We will learn all of them.

---

# 5. `while` Loop

The `while` loop is the simplest condition-controlled loop.

Syntax:

```java
while (condition) {
    // repeated code
}
```

Example:

```java
int i = 1;

while (i <= 5) {
    System.out.println(i);
    i++;
}
```

Output:

```text
1
2
3
4
5
```

---

# 6. How `while` Works

Consider:

```java
int i = 1;

while (i <= 5) {
    System.out.println(i);
    i++;
}
```

Execution:

```text
i = 1

Check: 1 <= 5 → true
Print 1
i becomes 2

Check: 2 <= 5 → true
Print 2
i becomes 3

Check: 3 <= 5 → true
Print 3
i becomes 4

Check: 4 <= 5 → true
Print 4
i becomes 5

Check: 5 <= 5 → true
Print 5
i becomes 6

Check: 6 <= 5 → false
Stop
```

The condition is checked before every iteration.

---

# 7. Important Parts of a Loop

Most counter-based loops have three important components:

```text
Initialization
      ↓
Condition
      ↓
Update
```

Example:

```java
int i = 1;       // initialization

while (i <= 5) { // condition
    System.out.println(i);

    i++;         // update
}
```

Think:

```text
Start
  ↓
Where do I begin?
  ↓
Should I continue?
  ↓
Do the work
  ↓
Change the counter
  ↓
Check again
```

---

# 8. Initialization

Initialization gives the loop its starting state.

Example:

```java
int i = 1;
```

Other examples:

```java
int i = 0;
int count = 10;
int sum = 0;
```

Initialization normally happens before the loop begins.

---

# 9. Condition

The condition determines whether another iteration should happen.

Example:

```java
i <= 10
```

As long as it is:

```text
true
```

the loop continues.

When it becomes:

```text
false
```

the loop stops.

---

# 10. Update

The update changes the loop state.

Example:

```java
i++;
```

Without an update, a counter loop may never terminate.

Example:

```java
int i = 1;

while (i <= 5) {
    System.out.println(i);
}
```

This can run forever because `i` never changes.

---

# 11. Infinite Loop

An infinite loop never reaches a false condition.

Example:

```java
while (true) {
    System.out.println("Hello");
}
```

This continues indefinitely unless something externally stops the program or the loop exits.

Another example:

```java
int i = 1;

while (i <= 5) {
    System.out.println(i);
}
```

The condition remains:

```text
1 <= 5
```

forever.

---

# 12. Intentional Infinite Loops

Infinite loops are not always mistakes.

They can be intentional.

Example:

```java
while (true) {
    // repeatedly process application events
}
```

Usually there will be some internal exit condition:

```java
while (true) {
    System.out.print("Enter command: ");
    String command = sc.nextLine();

    if (command.equals("exit")) {
        break;
    }
}
```

This creates a loop that continues until the user enters `exit`.

---

# 13. Counter-Controlled Loop

A common pattern is:

```java
int i = 1;

while (i <= 10) {
    System.out.println(i);
    i++;
}
```

Here:

```text
initial value = 1
final condition = <= 10
step = +1
```

This is called a counter-controlled loop.

---

# 14. Counting Backwards

You can decrement instead.

```java
int i = 5;

while (i >= 1) {
    System.out.println(i);
    i--;
}
```

Output:

```text
5
4
3
2
1
```

---

# 15. Different Step Sizes

You do not have to increase by exactly 1.

Example:

```java
int i = 0;

while (i <= 20) {
    System.out.println(i);
    i += 2;
}
```

Output:

```text
0
2
4
6
8
10
12
14
16
18
20
```

You can use:

```java
i += 5;
```

or:

```java
i -= 2;
```

depending on the problem.

---

# 16. `do-while` Loop

The `do-while` loop is similar to `while`, but with one important difference:

> The body executes at least once.

Syntax:

```java
do {
    // code
} while (condition);
```

Example:

```java
int i = 1;

do {
    System.out.println(i);
    i++;
} while (i <= 5);
```

Output:

```text
1
2
3
4
5
```

---

# 17. `while` vs `do-while`

`while`:

```java
while (condition) {
    // body
}
```

The condition is checked first.

`do-while`:

```java
do {
    // body
} while (condition);
```

The body runs first, then the condition is checked.

---

# 18. Important Difference

Consider:

```java
int i = 10;

while (i < 5) {
    System.out.println("Hello");
}
```

Output:

```text
```

The body never runs.

Now:

```java
int i = 10;

do {
    System.out.println("Hello");
} while (i < 5);
```

Output:

```text
Hello
```

Even though:

```text
10 < 5
```

is false.

Why?

Because `do-while` executes its body before checking the condition.

---

# 19. When Is `do-while` Useful?

It is useful when an operation must happen at least once.

A classic example is a menu:

```text
Show menu
   ↓
Read choice
   ↓
Process choice
   ↓
Ask whether to continue
```

The menu needs to appear at least once.

---

# 20. Menu Example with `do-while`

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int choice;

        do {
            System.out.println();
            System.out.println("===== MENU =====");
            System.out.println("1. Say Hello");
            System.out.println("2. Say Bye");
            System.out.println("3. Exit");

            System.out.print("Enter choice: ");
            choice = sc.nextInt();

            switch (choice) {
                case 1 -> System.out.println("Hello!");
                case 2 -> System.out.println("Bye!");
                case 3 -> System.out.println("Exiting...");
                default -> System.out.println("Invalid choice");
            }

        } while (choice != 3);

        sc.close();
    }
}
```

The menu appears at least once.

---

# 21. `for` Loop

The `for` loop is commonly used when you know or can clearly express the loop's initialization, condition, and update.

Syntax:

```java
for (initialization; condition; update) {
    // body
}
```

Example:

```java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
```

Output:

```text
1
2
3
4
5
```

---

# 22. Anatomy of a `for` Loop

Consider:

```java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
```

Break it down:

```text
for (
     int i = 1;   → initialization

     i <= 5;      → condition

     i++          → update
)
```

The body:

```java
System.out.println(i);
```

runs on each iteration.

---

# 23. Exact Execution Order of `for`

Example:

```java
for (int i = 1; i <= 3; i++) {
    System.out.println(i);
}
```

Execution:

```text
1. int i = 1
2. i <= 3 → true
3. print 1
4. i++
5. i <= 3 → true
6. print 2
7. i++
8. i <= 3 → true
9. print 3
10. i++
11. i <= 3 → false
12. stop
```

Important:

> Initialization happens once.

> Condition is checked before each iteration.

> Update happens after the body.

---

# 24. `for` Loop vs `while` Loop

These are equivalent:

```java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
```

and:

```java
int i = 1;

while (i <= 5) {
    System.out.println(i);
    i++;
}
```

The main difference is organization.

Use `for` when the initialization, condition, and update naturally belong together.

Use `while` when the stopping condition is more naturally expressed independently.

---

# 25. Counting from 0

Many programming tasks start at zero.

Example:

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

Output:

```text
0
1
2
3
4
```

Notice:

```text
i < 5
```

not:

```text
i <= 5
```

This produces exactly five iterations.

---

# 26. Number of Iterations

For:

```java
for (int i = 0; i < 5; i++) {
}
```

values are:

```text
0
1
2
3
4
```

Total:

```text
5 iterations
```

For:

```java
for (int i = 1; i <= 5; i++) {
}
```

values are:

```text
1
2
3
4
5
```

Total:

```text
5 iterations
```

---

# 27. `<` vs `<=`

This is one of the most common loop mistakes.

```java
for (int i = 0; i < 5; i++)
```

means:

```text
0 to 4
```

while:

```java
for (int i = 0; i <= 5; i++)
```

means:

```text
0 to 5
```

which is six iterations.

Always check whether the endpoint should be included.

---

# 28. Counting Down with `for`

```java
for (int i = 5; i >= 1; i--) {
    System.out.println(i);
}
```

Output:

```text
5
4
3
2
1
```

---

# 29. Counting by 2

```java
for (int i = 2; i <= 20; i += 2) {
    System.out.println(i);
}
```

Output:

```text
2
4
6
8
10
12
14
16
18
20
```

---

# 30. Reverse Counting by 2

```java
for (int i = 20; i >= 2; i -= 2) {
    System.out.println(i);
}
```

Output:

```text
20
18
16
14
12
10
8
6
4
2
```

---

# 31. Multiple Variables in a `for` Loop

A `for` loop can initialize multiple variables.

Example:

```java
for (int i = 1, j = 10; i <= 5; i++, j--) {
    System.out.println(i + " " + j);
}
```

Output:

```text
1 10
2 9
3 8
4 7
5 6
```

Both counters are updated each iteration.

---

# 32. Omitting Parts of `for`

Java allows parts of the `for` header to be omitted.

For example:

```java
int i = 1;

for (; i <= 5; i++) {
    System.out.println(i);
}
```

Initialization was moved outside.

You can also write:

```java
for (int i = 1; ; i++) {
    if (i > 5) {
        break;
    }

    System.out.println(i);
}
```

The condition is omitted, creating an infinite loop unless `break` exits it.

This is legal, but use it only when it improves clarity.

---

# 33. Infinite `for` Loop

This:

```java
for (;;) {
    System.out.println("Hello");
}
```

is an infinite loop.

It is equivalent in spirit to:

```java
while (true) {
    System.out.println("Hello");
}
```

Usually you will see this pattern with an explicit exit condition:

```java
for (;;) {
    // work

    if (shouldStop) {
        break;
    }
}
```

---

# 34. Scope of the `for` Variable

Consider:

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

The variable:

```java
i
```

exists within the scope of the `for` statement and its body.

This is not valid:

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

System.out.println(i);
```

because `i` is out of scope after the loop.

---

# 35. Declaring the Counter Outside

If you need the counter afterward:

```java
int i;

for (i = 0; i < 5; i++) {
    System.out.println(i);
}

System.out.println("After loop: " + i);
```

Output:

```text
0
1
2
3
4
After loop: 5
```

---

# 36. Nested Loops

A loop inside another loop is called a:

```text
nested loop
```

Example:

```java
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        System.out.println(i + " " + j);
    }
}
```

Output:

```text
1 1
1 2
1 3
2 1
2 2
2 3
3 1
3 2
3 3
```

---

# 37. How Nested Loops Work

The outer loop controls:

```text
i
```

The inner loop completes all of its iterations for every outer iteration.

Think:

```text
i = 1
    j = 1
    j = 2
    j = 3

i = 2
    j = 1
    j = 2
    j = 3

i = 3
    j = 1
    j = 2
    j = 3
```

If the outer loop runs 3 times and the inner loop runs 3 times each time:

```text
3 × 3 = 9
```

inner iterations occur.

---

# 38. Nested Loop — Multiplication Table

```java
for (int i = 1; i <= 10; i++) {
    for (int j = 1; j <= 10; j++) {
        System.out.print((i * j) + "\t");
    }

    System.out.println();
}
```

This produces a multiplication table.

---

# 39. Nested Loop — Rectangle Pattern

```java
for (int row = 1; row <= 4; row++) {
    for (int col = 1; col <= 5; col++) {
        System.out.print("* ");
    }

    System.out.println();
}
```

Output:

```text
* * * * *
* * * * *
* * * * *
* * * * *
```

The outer loop controls rows.

The inner loop controls columns.

---

# 40. Nested Loop — Triangle Pattern

```java
for (int row = 1; row <= 5; row++) {
    for (int col = 1; col <= row; col++) {
        System.out.print("* ");
    }

    System.out.println();
}
```

Output:

```text
*
* *
* * *
* * * *
* * * * *
```

Notice that the number of inner iterations depends on the outer loop variable.

---

# 41. Nested Loop — Number Triangle

```java
for (int row = 1; row <= 5; row++) {
    for (int col = 1; col <= row; col++) {
        System.out.print(col + " ");
    }

    System.out.println();
}
```

Output:

```text
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

---

# 42. Nested Loop — Same Number Pattern

```java
for (int row = 1; row <= 5; row++) {
    for (int col = 1; col <= row; col++) {
        System.out.print(row + " ");
    }

    System.out.println();
}
```

Output:

```text
1
2 2
3 3 3
4 4 4 4
5 5 5 5 5
```

---

# 43. Loop Control — `break`

`break` immediately exits the nearest loop.

Example:

```java
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;
    }

    System.out.println(i);
}
```

Output:

```text
1
2
3
4
```

When:

```java
i == 5
```

becomes true, the loop stops.

---

# 44. Flow of `break`

```text
Loop starts
   ↓
Iteration
   ↓
break condition?
   ↓
yes ───────► Exit loop
   │
   no
   ↓
Continue
```

`break` exits the nearest enclosing loop or switch statement.

---

# 45. `break` in `while`

```java
int i = 1;

while (i <= 10) {
    if (i == 5) {
        break;
    }

    System.out.println(i);
    i++;
}
```

Output:

```text
1
2
3
4
```

---

# 46. `break` in Nested Loops

Consider:

```java
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) {
            break;
        }

        System.out.println(i + " " + j);
    }
}
```

Output:

```text
1 1
2 1
3 1
```

Why?

`break` exits only the nearest loop:

```text
inner loop
```

It does not automatically stop the outer loop.

---

# 47. Labeled `break`

Java allows labeled statements.

Example:

```java
outer:
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i == 2 && j == 2) {
            break outer;
        }

        System.out.println(i + " " + j);
    }
}
```

Output:

```text
1 1
1 2
1 3
2 1
```

When:

```text
i = 2
j = 2
```

the labeled `break` exits the outer loop.

Labeled breaks are legal but should be used carefully because simpler control flow is often easier to understand.

---

# 48. `continue`

`continue` skips the remaining body of the current iteration and moves to the next iteration.

Example:

```java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;
    }

    System.out.println(i);
}
```

Output:

```text
1
2
4
5
```

The iteration where `i == 3` is skipped.

---

# 49. `break` vs `continue`

This difference is extremely important.

```text
break
  ↓
stop the loop completely

continue
  ↓
skip current iteration
then continue loop
```

Example:

```java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        break;
    }

    System.out.println(i);
}
```

Output:

```text
1
2
```

But:

```java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;
    }

    System.out.println(i);
}
```

Output:

```text
1
2
4
5
```

---

# 50. `continue` in a `while` Loop

Be careful with `continue` in a `while` loop.

Bad:

```java
int i = 1;

while (i <= 5) {
    if (i == 3) {
        continue;
    }

    System.out.println(i);
    i++;
}
```

When `i` becomes 3, `continue` jumps back to the condition without executing:

```java
i++;
```

So `i` remains 3 forever.

This creates an infinite loop.

Correct:

```java
int i = 1;

while (i <= 5) {
    if (i == 3) {
        i++;
        continue;
    }

    System.out.println(i);
    i++;
}
```

Or structure the loop differently.

---

# 51. Enhanced `for` Loop

Java provides an enhanced `for` loop, also called the:

```text
for-each loop
```

It is especially useful for arrays and collections.

Syntax:

```java
for (Type variable : collectionOrArray) {
    // use variable
}
```

Example:

```java
int[] numbers = {10, 20, 30, 40};

for (int number : numbers) {
    System.out.println(number);
}
```

Output:

```text
10
20
30
40
```

---

# 52. Why Use Enhanced `for`?

Suppose you only want to process every element of an array.

Traditional loop:

```java
int[] numbers = {10, 20, 30, 40};

for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}
```

Enhanced loop:

```java
for (int number : numbers) {
    System.out.println(number);
}
```

The second version is simpler when you don't need the index.

---

# 53. Understanding the Enhanced `for`

For:

```java
for (int number : numbers) {
    System.out.println(number);
}
```

read it as:

```text
For each int number in numbers:
    print number
```

If:

```text
numbers = [10, 20, 30, 40]
```

iterations are:

```text
number = 10
number = 20
number = 30
number = 40
```

---

# 54. Enhanced `for` with Strings

```java
String[] languages = {
    "Java",
    "Python",
    "C++"
};

for (String language : languages) {
    System.out.println(language);
}
```

Output:

```text
Java
Python
C++
```

---

# 55. Enhanced `for` with `char[]`

```java
char[] letters = {'J', 'a', 'v', 'a'};

for (char ch : letters) {
    System.out.println(ch);
}
```

Output:

```text
J
a
v
a
```

---

# 56. Enhanced `for` and Index

The enhanced `for` loop does not directly provide the current index.

If you need the index, use a traditional loop:

```java
for (int i = 0; i < numbers.length; i++) {
    System.out.println(i + ": " + numbers[i]);
}
```

If you only need the values:

```java
for (int number : numbers) {
    System.out.println(number);
}
```

---

# 57. Enhanced `for` and Modification

Suppose:

```java
int[] numbers = {1, 2, 3};

for (int number : numbers) {
    number = number * 2;
}
```

This does not modify the array elements.

Why?

`number` is a local loop variable holding the current element value.

The array remains:

```text
1 2 3
```

To modify elements, use an index:

```java
for (int i = 0; i < numbers.length; i++) {
    numbers[i] *= 2;
}
```

Now the array becomes:

```text
2 4 6
```

---

# 58. Enhanced `for` with Object References

Later, when you study OOP, you will see:

```java
Student[] students = ...;

for (Student student : students) {
    student.display();
}
```

The loop variable contains a reference to each object.

This becomes extremely useful when processing collections of objects.

---

# 59. Looping Through a String

A String is not directly an array, but you can access its characters.

Example:

```java
String text = "Java";

for (int i = 0; i < text.length(); i++) {
    System.out.println(text.charAt(i));
}
```

Output:

```text
J
a
v
a
```

---

# 60. Counting Characters

```java
String text = "banana";
int count = 0;

for (int i = 0; i < text.length(); i++) {
    if (text.charAt(i) == 'a') {
        count++;
    }
}

System.out.println("a count = " + count);
```

Output:

```text
a count = 3
```

This demonstrates:

```text
loop
+
condition
+
counter
```

---

# 61. Sum of Numbers

Calculate:

```text
1 + 2 + 3 + ... + 10
```

Code:

```java
int sum = 0;

for (int i = 1; i <= 10; i++) {
    sum += i;
}

System.out.println(sum);
```

Output:

```text
55
```

---

# 62. Understanding the Sum

Initially:

```text
sum = 0
```

Iteration:

```text
i = 1 → sum = 1
i = 2 → sum = 3
i = 3 → sum = 6
i = 4 → sum = 10
...
i = 10 → sum = 55
```

This is called an accumulator pattern.

---

# 63. Accumulator Pattern

A common loop structure is:

```java
result = initialValue;

for (...) {
    result = result + currentValue;
}
```

Examples:

```java
sum = sum + number;
```

or:

```java
product = product * number;
```

or:

```java
total += price;
```

This pattern appears everywhere in programming.

---

# 64. Product of Numbers

Calculate:

```text
1 × 2 × 3 × 4 × 5
```

Code:

```java
int product = 1;

for (int i = 1; i <= 5; i++) {
    product *= i;
}

System.out.println(product);
```

Output:

```text
120
```

This is also the basis of factorial.

---

# 65. Factorial

Mathematically:

```text
5! = 5 × 4 × 3 × 2 × 1
   = 120
```

Java:

```java
int n = 5;
long factorial = 1;

for (int i = 1; i <= n; i++) {
    factorial *= i;
}

System.out.println(factorial);
```

Output:

```text
120
```

For large values, even `long` can overflow. Later chapters will discuss numeric limits and safer approaches.

---

# 66. Factorial with User Input

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter n: ");
        int n = sc.nextInt();

        long factorial = 1;

        if (n < 0) {
            System.out.println("Factorial is not defined for negative integers.");
        } else {
            for (int i = 1; i <= n; i++) {
                factorial *= i;
            }

            System.out.println("Factorial = " + factorial);
        }

        sc.close();
    }
}
```

---

# 67. Multiplication Table

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number: ");
        int n = sc.nextInt();

        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " × " + i + " = " + (n * i));
        }

        sc.close();
    }
}
```

Input:

```text
5
```

Output:

```text
5 × 1 = 5
5 × 2 = 10
5 × 3 = 15
5 × 4 = 20
5 × 5 = 25
5 × 6 = 30
5 × 7 = 35
5 × 8 = 40
5 × 9 = 45
5 × 10 = 50
```

---

# 68. Counting Digits

Suppose:

```text
number = 12345
```

We want:

```text
5 digits
```

One common approach:

```java
int number = 12345;
int count = 0;

while (number != 0) {
    number /= 10;
    count++;
}

System.out.println(count);
```

Output:

```text
5
```

---

# 69. How Digit Counting Works

Start:

```text
12345
```

Divide by 10:

```text
1234
```

Again:

```text
123
```

Again:

```text
12
```

Again:

```text
1
```

Again:

```text
0
```

Number of divisions:

```text
5
```

Therefore:

```text
5 digits
```

---

# 70. Special Case — Zero

The previous method gives:

```text
0 digits
```

for:

```java
number = 0;
```

But zero has one digit.

Handle it separately:

```java
int number = 0;
int count;

if (number == 0) {
    count = 1;
} else {
    count = 0;

    while (number != 0) {
        number /= 10;
        count++;
    }
}

System.out.println(count);
```

---

# 71. Reverse a Number

Example:

```text
Input: 1234
Output: 4321
```

Code:

```java
int number = 1234;
int reverse = 0;

while (number != 0) {
    int digit = number % 10;
    reverse = reverse * 10 + digit;
    number /= 10;
}

System.out.println(reverse);
```

Output:

```text
4321
```

---

# 72. Reverse Number — Step by Step

Start:

```text
number = 1234
reverse = 0
```

First digit:

```text
1234 % 10 = 4
```

Then:

```text
reverse = 0 × 10 + 4
        = 4
```

Remove digit:

```text
1234 / 10 = 123
```

Next:

```text
123 % 10 = 3
reverse = 4 × 10 + 3
        = 43
```

Next:

```text
2
reverse = 432
```

Next:

```text
1
reverse = 4321
```

Finally:

```text
number = 0
```

Loop stops.

---

# 73. Palindrome Number

A palindrome reads the same forward and backward.

Examples:

```text
121
1331
1221
```

Not palindromes:

```text
123
1234
```

We can reverse the number and compare.

```java
int number = 121;
int original = number;
int reverse = 0;

while (number != 0) {
    int digit = number % 10;
    reverse = reverse * 10 + digit;
    number /= 10;
}

if (original == reverse) {
    System.out.println("Palindrome");
} else {
    System.out.println("Not palindrome");
}
```

Output:

```text
Palindrome
```

---

# 74. Sum of Digits

For:

```text
1234
```

sum:

```text
1 + 2 + 3 + 4 = 10
```

Program:

```java
int number = 1234;
int sum = 0;

while (number != 0) {
    int digit = number % 10;
    sum += digit;
    number /= 10;
}

System.out.println(sum);
```

Output:

```text
10
```

---

# 75. Count Even Numbers

```java
int[] numbers = {10, 15, 20, 25, 30};

int count = 0;

for (int number : numbers) {
    if (number % 2 == 0) {
        count++;
    }
}

System.out.println("Even numbers = " + count);
```

Output:

```text
Even numbers = 3
```

---

# 76. Find Maximum

```java
int[] numbers = {10, 50, 20, 90, 30};

int max = numbers[0];

for (int number : numbers) {
    if (number > max) {
        max = number;
    }
}

System.out.println("Maximum = " + max);
```

Output:

```text
Maximum = 90
```

This is a very important algorithmic pattern.

---

# 77. Find Minimum

```java
int[] numbers = {10, 50, 20, 90, 30};

int min = numbers[0];

for (int number : numbers) {
    if (number < min) {
        min = number;
    }
}

System.out.println("Minimum = " + min);
```

Output:

```text
Minimum = 10
```

---

# 78. Search for a Value

```java
int[] numbers = {10, 20, 30, 40, 50};

int target = 30;
boolean found = false;

for (int number : numbers) {
    if (number == target) {
        found = true;
        break;
    }
}

if (found) {
    System.out.println("Found");
} else {
    System.out.println("Not found");
}
```

Output:

```text
Found
```

Notice how `break` avoids unnecessary additional searching after the target is found.

---

# 79. Linear Search

The previous example is a basic:

```text
linear search
```

The algorithm checks elements one by one.

For:

```text
[10, 20, 30, 40, 50]
```

searching for `40`:

```text
10 → no
20 → no
30 → no
40 → yes
```

Then we can stop.

This is an important foundation for later data structures and algorithms.

---

# 80. Loop with Input

You can use loops to process repeated user input.

Example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int sum = 0;

        for (int i = 1; i <= 5; i++) {
            System.out.print("Enter number " + i + ": ");
            int number = sc.nextInt();

            sum += number;
        }

        System.out.println("Sum = " + sum);

        sc.close();
    }
}
```

Example:

```text
Enter number 1: 10
Enter number 2: 20
Enter number 3: 30
Enter number 4: 40
Enter number 5: 50
Sum = 150
```

---

# 81. Sentinel-Controlled Loop

Sometimes you do not know how many values the user will enter.

You can use a special value called a:

```text
sentinel
```

Example:

```text
Enter numbers.
Enter -1 to stop.
```

Code:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int sum = 0;

        while (true) {
            System.out.print("Enter number (-1 to stop): ");
            int number = sc.nextInt();

            if (number == -1) {
                break;
            }

            sum += number;
        }

        System.out.println("Sum = " + sum);

        sc.close();
    }
}
```

The sentinel is:

```text
-1
```

---

# 82. Validation Loop

Loops are excellent for repeatedly asking for valid input.

Example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int age;

        while (true) {
            System.out.print("Enter age between 1 and 120: ");

            age = sc.nextInt();

            if (age >= 1 && age <= 120) {
                break;
            }

            System.out.println("Invalid age. Try again.");
        }

        System.out.println("Accepted age = " + age);

        sc.close();
    }
}
```

This pattern is used constantly in real applications.

---

# 83. `while` for Unknown Number of Iterations

Use `while` when you don't know exactly how many times the loop will run.

Example:

```java
while (userHasNotExited) {
    // process command
}
```

The loop may run:

```text
1 time
10 times
100 times
0 times
```

depending on the input.

---

# 84. `for` for Known Iterations

If you know the number of repetitions:

```java
for (int i = 0; i < 10; i++) {
    ...
}
```

This clearly expresses:

```text
repeat 10 times
```

This is one reason `for` is so common.

---

# 85. `do-while` for At-Least-Once Logic

If the body must execute at least once:

```java
do {
    ...
} while (...);
```

Examples:

```text
menus
user prompts
retry operations
```

---

# 86. Choosing the Right Loop

A useful guideline:

```text
Known/countable repetitions
        ↓
       for

Condition-controlled repetition
        ↓
      while

Must execute at least once
        ↓
    do-while

Process every element of array/collection
        ↓
   enhanced for
```

These are guidelines, not strict rules.

---

# 87. Nested Loops and Complexity

Suppose:

```java
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // work
    }
}
```

The inner body executes approximately:

```text
n × n
```

times:

```text
n²
```

This leads to the concept of algorithmic complexity.

For example:

```text
n = 10
→ 100 iterations

n = 100
→ 10,000 iterations

n = 1000
→ 1,000,000 iterations
```

You will study algorithm analysis more deeply in data structures and algorithms.

---

# 88. Three Nested Loops

You can nest more than two loops.

Example:

```java
for (int i = 1; i <= 2; i++) {
    for (int j = 1; j <= 3; j++) {
        for (int k = 1; k <= 4; k++) {
            System.out.println(i + " " + j + " " + k);
        }
    }
}
```

Total inner executions:

```text
2 × 3 × 4 = 24
```

Nested loops can become expensive quickly.

---

# 89. Avoid Unnecessary Nested Loops

Sometimes a nested loop is required.

But do not use one automatically.

For example, searching for a value in an array can often use one loop:

```java
for (int number : numbers) {
    if (number == target) {
        ...
    }
}
```

A second loop may be unnecessary.

Good programming is not just about making code work; it is also about choosing an appropriate algorithm.

---

# 90. Loop Invariants — Basic Idea

A useful algorithmic concept is a:

```text
loop invariant
```

It is something that remains true at a particular point during every iteration.

For example, in:

```java
int sum = 0;

for (int i = 1; i <= n; i++) {
    sum += i;
}
```

After each iteration, `sum` represents the sum of all integers processed so far.

Understanding invariants helps you prove that loops are correct.

You do not need advanced mathematical proof yet, but learning to ask:

```text
What does my variable mean after every iteration?
```

is an excellent habit.

---

# 91. Dry Run a Loop

A dry run means manually tracing the values.

Example:

```java
int sum = 0;

for (int i = 1; i <= 4; i++) {
    sum += i;
}
```

Trace:

| Iteration | `i` | `sum` |
|---|---:|---:|
| Start | — | 0 |
| 1 | 1 | 1 |
| 2 | 2 | 3 |
| 3 | 3 | 6 |
| 4 | 4 | 10 |

Final:

```text
sum = 10
```

Dry runs are extremely useful when learning loops.

---

# 92. Common Loop Mistake — Off-by-One

Consider:

```java
for (int i = 0; i <= 10; i++) {
    System.out.println(i);
}
```

This prints:

```text
0 through 10
```

That is:

```text
11 values
```

If you wanted exactly 10 values:

```java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

prints:

```text
0 through 9
```

This is called an:

```text
off-by-one error
```

---

# 93. Common Loop Mistake — Wrong Update Direction

This is dangerous:

```java
for (int i = 10; i >= 1; i++) {
    System.out.println(i);
}
```

The condition requires `i` to decrease, but the code increases it.

Correct:

```java
for (int i = 10; i >= 1; i--) {
    System.out.println(i);
}
```

Always make sure the update moves toward the stopping condition.

---

# 94. Common Loop Mistake — Forgetting Update

Bad:

```java
int i = 1;

while (i <= 10) {
    System.out.println(i);
}
```

`i` never changes.

Correct:

```java
int i = 1;

while (i <= 10) {
    System.out.println(i);
    i++;
}
```

---

# 95. Common Loop Mistake — Updating the Wrong Variable

Consider:

```java
int i = 1;
int j = 10;

while (i <= 5) {
    System.out.println(i);
    j++;
}
```

The condition depends on:

```java
i
```

but the code updates:

```java
j
```

Therefore `i` never changes and the loop does not terminate normally.

---

# 96. Common Loop Mistake — Accumulator Initialization

For a sum:

```java
int sum = 0;
```

is normally appropriate.

For a product:

```java
int product = 1;
```

is normally appropriate.

Why not:

```java
int product = 0;
```

Because:

```text
0 × anything = 0
```

The accumulator's initial value must match the operation.

---

# 97. Common Loop Mistake — Modifying the Loop Counter Inside the Body

Example:

```java
for (int i = 0; i < 10; i++) {
    i++;
    System.out.println(i);
}
```

This is legal but makes the number of iterations less obvious.

It can be appropriate in special cases, but beginners should generally keep the counter update in one clear place.

Prefer:

```java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

when no special behavior is needed.

---

# 98. Common Loop Mistake — Floating-Point Loop Counters

Avoid using floating-point values as loop counters when possible.

For example:

```java
for (double x = 0; x <= 1; x += 0.1) {
    ...
}
```

Floating-point representation can cause surprising boundary behavior.

Prefer integer counters:

```java
for (int i = 0; i <= 10; i++) {
    double x = i / 10.0;
}
```

This gives more predictable control.

---

# 99. `break` vs Boolean Flag

Instead of:

```java
while (true) {
    ...
    if (done) {
        break;
    }
}
```

you can sometimes use:

```java
while (!done) {
    ...
}
```

Both can be valid.

Use the form that makes the termination logic easiest to understand.

---

# 100. `continue` and Readability

Although `continue` can be useful, too many early jumps can make a loop difficult to follow.

Example:

```java
for (int number : numbers) {
    if (number < 0) {
        continue;
    }

    if (number == 0) {
        continue;
    }

    ...
}
```

Sometimes this is clearer as:

```java
for (int number : numbers) {
    if (number > 0) {
        ...
    }
}
```

Do not avoid `continue` completely; just use it when it makes the logic clearer.

---

# 101. Looping Through Arrays

Arrays will be covered in detail in Chapter 9, but loops are essential for using arrays.

Example:

```java
int[] marks = {80, 90, 70, 85};

for (int i = 0; i < marks.length; i++) {
    System.out.println(marks[i]);
}
```

Output:

```text
80
90
70
85
```

Notice:

```java
marks.length
```

gives the number of elements.

---

# 102. Enhanced Loop with Array

The same task can be written:

```java
int[] marks = {80, 90, 70, 85};

for (int mark : marks) {
    System.out.println(mark);
}
```

This is often cleaner when the index is unnecessary.

---

# 103. Sum of Array Elements

```java
int[] numbers = {10, 20, 30, 40};

int sum = 0;

for (int number : numbers) {
    sum += number;
}

System.out.println("Sum = " + sum);
```

Output:

```text
Sum = 100
```

---

# 104. Average of Array Elements

```java
int[] numbers = {10, 20, 30, 40};

int sum = 0;

for (int number : numbers) {
    sum += number;
}

double average = (double) sum / numbers.length;

System.out.println("Average = " + average);
```

Output:

```text
Average = 25.0
```

The cast:

```java
(double) sum
```

ensures floating-point division.

---

# 105. Count Values Above a Limit

```java
int[] marks = {45, 80, 90, 30, 70};

int count = 0;

for (int mark : marks) {
    if (mark >= 50) {
        count++;
    }
}

System.out.println("Passing students = " + count);
```

Output:

```text
Passing students = 3
```

---

# 106. Search and Stop

```java
int[] numbers = {10, 20, 30, 40, 50};

int target = 40;

for (int number : numbers) {
    if (number == target) {
        System.out.println("Found");
        break;
    }
}
```

The `break` prevents unnecessary work after the value is found.

---

# 107. Loop Through a 2D Array

Two-dimensional arrays are covered later, but the loop pattern is important.

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};

for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        System.out.print(matrix[row][col] + " ");
    }

    System.out.println();
}
```

Output:

```text
1 2 3
4 5 6
```

---

# 108. Nested Enhanced `for`

You can also use enhanced loops:

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};

for (int[] row : matrix) {
    for (int value : row) {
        System.out.print(value + " ");
    }

    System.out.println();
}
```

Output:

```text
1 2 3
4 5 6
```

---

# 109. Looping Through a String — Reverse

```java
String text = "Java";

for (int i = text.length() - 1; i >= 0; i--) {
    System.out.print(text.charAt(i));
}
```

Output:

```text
avaJ
```

---

# 110. Count Vowels

```java
String text = "programming";
int count = 0;

for (int i = 0; i < text.length(); i++) {
    char ch = text.charAt(i);

    if (ch == 'a' || ch == 'e' ||
        ch == 'i' || ch == 'o' ||
        ch == 'u') {
        count++;
    }
}

System.out.println("Vowels = " + count);
```

Output:

```text
Vowels = 3
```

This is a good example of:

```text
String
+
loop
+
condition
+
counter
```

---

# 111. Find First Matching Character

```java
String text = "programming";

for (int i = 0; i < text.length(); i++) {
    if (text.charAt(i) == 'g') {
        System.out.println("First g at index " + i);
        break;
    }
}
```

Output:

```text
First g at index 3
```

---

# 112. Print Only Odd Numbers

```java
for (int i = 1; i <= 20; i++) {
    if (i % 2 == 0) {
        continue;
    }

    System.out.println(i);
}
```

Output:

```text
1
3
5
7
9
11
13
15
17
19
```

Here `continue` skips even numbers.

---

# 113. Print Multiples

```java
for (int i = 1; i <= 50; i++) {
    if (i % 5 == 0) {
        System.out.println(i);
    }
}
```

Output:

```text
5
10
15
20
25
30
35
40
45
50
```

---

# 114. Prime Number Check

A prime number has exactly two positive divisors:

```text
1
itself
```

Examples:

```text
2
3
5
7
11
13
```

A simple approach:

```java
int n = 29;
boolean prime = true;

if (n < 2) {
    prime = false;
} else {
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            prime = false;
            break;
        }
    }
}

if (prime) {
    System.out.println("Prime");
} else {
    System.out.println("Not prime");
}
```

Output:

```text
Prime
```

---

# 115. Better Prime Check

You don't need to test all numbers below `n`.

If a number has a divisor larger than its square root, it must also have a corresponding divisor smaller than the square root.

So you can test:

```java
for (int i = 2; i * i <= n; i++) {
    if (n % i == 0) {
        prime = false;
        break;
    }
}
```

Complete example:

```java
int n = 29;
boolean prime = n >= 2;

for (int i = 2; i * i <= n && prime; i++) {
    if (n % i == 0) {
        prime = false;
    }
}

System.out.println(prime ? "Prime" : "Not prime");
```

This is more efficient than checking every number below `n`.

---

# 116. Print Prime Numbers

```java
for (int n = 2; n <= 50; n++) {
    boolean prime = true;

    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            prime = false;
            break;
        }
    }

    if (prime) {
        System.out.print(n + " ");
    }
}
```

Output:

```text
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47
```

This demonstrates nested loops.

---

# 117. Fibonacci Sequence

A common beginner problem is Fibonacci numbers:

```text
0 1 1 2 3 5 8 13 21 ...
```

Each number is generally the sum of the previous two.

Program:

```java
int n = 10;

int a = 0;
int b = 1;

for (int i = 1; i <= n; i++) {
    System.out.print(a + " ");

    int next = a + b;
    a = b;
    b = next;
}
```

Output:

```text
0 1 1 2 3 5 8 13 21 34
```

---

# 118. GCD Using a Loop

A simple method for finding the greatest common divisor:

```java
int a = 48;
int b = 18;

int gcd = 1;

for (int i = 1; i <= Math.min(a, b); i++) {
    if (a % i == 0 && b % i == 0) {
        gcd = i;
    }
}

System.out.println("GCD = " + gcd);
```

Output:

```text
GCD = 6
```

There are more efficient algorithms, such as Euclid's algorithm, which you may encounter later.

---

# 119. Practical Program — Sum Until Zero

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int sum = 0;

        while (true) {
            System.out.print("Enter number (0 to stop): ");
            int n = sc.nextInt();

            if (n == 0) {
                break;
            }

            sum += n;
        }

        System.out.println("Sum = " + sum);

        sc.close();
    }
}
```

---

# 120. Practical Program — Count Positive and Negative Values

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int positive = 0;
        int negative = 0;
        int zero = 0;

        for (int i = 1; i <= 5; i++) {
            System.out.print("Enter number " + i + ": ");
            int n = sc.nextInt();

            if (n > 0) {
                positive++;
            } else if (n < 0) {
                negative++;
            } else {
                zero++;
            }
        }

        System.out.println("Positive: " + positive);
        System.out.println("Negative: " + negative);
        System.out.println("Zero: " + zero);

        sc.close();
    }
}
```

---

# 121. Practical Program — Find Largest Input

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("How many numbers? ");
        int n = sc.nextInt();

        if (n <= 0) {
            System.out.println("Number of values must be positive.");
            sc.close();
            return;
        }

        System.out.print("Enter number 1: ");
        int max = sc.nextInt();

        for (int i = 2; i <= n; i++) {
            System.out.print("Enter number " + i + ": ");
            int value = sc.nextInt();

            if (value > max) {
                max = value;
            }
        }

        System.out.println("Maximum = " + max);

        sc.close();
    }
}
```

---

# 122. Practical Program — Guessing Game

This is a simple loop-based game.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int secret = 42;
        int guess;

        do {
            System.out.print("Guess the number: ");
            guess = sc.nextInt();

            if (guess < secret) {
                System.out.println("Too low");
            } else if (guess > secret) {
                System.out.println("Too high");
            } else {
                System.out.println("Correct!");
            }

        } while (guess != secret);

        sc.close();
    }
}
```

This combines:

```text
do-while
if-else
input
comparison
```

---

# 123. Practical Program — Menu Repetition

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int choice;

        do {
            System.out.println();
            System.out.println("1. Add");
            System.out.println("2. Multiply");
            System.out.println("3. Exit");
            System.out.print("Choice: ");

            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.println("Addition selected");
                    break;

                case 2:
                    System.out.println("Multiplication selected");
                    break;

                case 3:
                    System.out.println("Goodbye");
                    break;

                default:
                    System.out.println("Invalid choice");
            }

        } while (choice != 3);

        sc.close();
    }
}
```

This pattern is the foundation of many command-line applications.

---

# 124. Practical Program — ATM Loop

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        double balance = 10000;
        int choice;

        do {
            System.out.println();
            System.out.println("===== ATM =====");
            System.out.println("1. Check Balance");
            System.out.println("2. Deposit");
            System.out.println("3. Withdraw");
            System.out.println("4. Exit");

            System.out.print("Enter choice: ");
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.printf("Balance = %.2f%n", balance);
                    break;

                case 2:
                    System.out.print("Enter deposit amount: ");
                    double deposit = sc.nextDouble();

                    if (deposit > 0) {
                        balance += deposit;
                        System.out.println("Deposit successful");
                    } else {
                        System.out.println("Invalid amount");
                    }
                    break;

                case 3:
                    System.out.print("Enter withdrawal amount: ");
                    double withdrawal = sc.nextDouble();

                    if (withdrawal <= 0) {
                        System.out.println("Invalid amount");
                    } else if (withdrawal > balance) {
                        System.out.println("Insufficient balance");
                    } else {
                        balance -= withdrawal;
                        System.out.println("Withdrawal successful");
                    }
                    break;

                case 4:
                    System.out.println("Thank you");
                    break;

                default:
                    System.out.println("Invalid choice");
            }

        } while (choice != 4);

        sc.close();
    }
}
```

This combines many concepts learned so far.

---

# 125. Loop Patterns

Pattern problems are useful for learning nested loops.

The general structure is:

```java
for (int row = ...; ...; ...) {

    for (int col = ...; ...; ...) {
        // print something
    }

    System.out.println();
}
```

Think:

```text
outer loop
→ rows

inner loop
→ columns
```

---

# 126. Square Pattern

```java
for (int row = 1; row <= 4; row++) {
    for (int col = 1; col <= 4; col++) {
        System.out.print("* ");
    }

    System.out.println();
}
```

Output:

```text
* * * *
* * * *
* * * *
* * * *
```

---

# 127. Increasing Triangle

```java
for (int row = 1; row <= 5; row++) {
    for (int col = 1; col <= row; col++) {
        System.out.print("* ");
    }

    System.out.println();
}
```

Output:

```text
*
* *
* * *
* * * *
* * * * *
```

---

# 128. Decreasing Triangle

```java
for (int row = 5; row >= 1; row--) {
    for (int col = 1; col <= row; col++) {
        System.out.print("* ");
    }

    System.out.println();
}
```

Output:

```text
* * * * *
* * * *
* * *
* *
*
```

---

# 129. Right-Aligned Triangle

```java
int n = 5;

for (int row = 1; row <= n; row++) {
    for (int space = 1; space <= n - row; space++) {
        System.out.print("  ");
    }

    for (int star = 1; star <= row; star++) {
        System.out.print("* ");
    }

    System.out.println();
}
```

Output:

```text
        *
      * *
    * * *
  * * * *
* * * * *
```

This teaches you to use multiple inner loops for one row.

---

# 130. Pyramid Pattern

```java
int n = 5;

for (int row = 1; row <= n; row++) {
    for (int space = 1; space <= n - row; space++) {
        System.out.print(" ");
    }

    for (int star = 1; star <= 2 * row - 1; star++) {
        System.out.print("*");
    }

    System.out.println();
}
```

Output:

```text
    *
   ***
  *****
 *******
*********
```

The formula:

```text
2 * row - 1
```

produces:

```text
1
3
5
7
9
```

stars.

---

# 131. Number Pattern

```java
for (int row = 1; row <= 5; row++) {
    for (int col = 1; col <= row; col++) {
        System.out.print(col);
    }

    System.out.println();
}
```

Output:

```text
1
12
123
1234
12345
```

---

# 132. Repeated Number Pattern

```java
for (int row = 1; row <= 5; row++) {
    for (int col = 1; col <= row; col++) {
        System.out.print(row);
    }

    System.out.println();
}
```

Output:

```text
1
22
333
4444
55555
```

---

# 133. `break` and `continue` in Nested Loops

Remember:

```java
break;
```

affects the nearest enclosing loop.

Example:

```java
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) {
            break;
        }

        System.out.println(i + "," + j);
    }
}
```

Only the inner loop stops each time.

For the outer loop too, use a labeled break if appropriate:

```java
outer:
for (...) {
    for (...) {
        if (...) {
            break outer;
        }
    }
}
```

---

# 134. `continue` in Nested Loops

A `continue` applies to the nearest loop.

Example:

```java
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) {
            continue;
        }

        System.out.println(i + "," + j);
    }
}
```

For every row, the `j == 2` iteration is skipped.

---

# 135. Labeled `continue`

Java also supports labeled `continue`.

Example:

```java
outer:
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) {
            continue outer;
        }

        System.out.println(i + "," + j);
    }
}
```

When `j == 2`, the program skips to the next iteration of the outer loop.

This is advanced control flow. Use it only when it makes the algorithm clearer.

---

# 136. Loop and Method Interaction

A loop can call a method.

Example:

```java
public class Main {

    static void printSquare(int n) {
        System.out.println(n * n);
    }

    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            printSquare(i);
        }
    }
}
```

Output:

```text
1
4
9
16
25
```

Methods are covered deeply in Chapter 8.

---

# 137. Loop and `return`

`return` exits the current method, not just the loop.

Example:

```java
public class Main {

    static void findFirst(int[] numbers, int target) {
        for (int number : numbers) {
            if (number == target) {
                System.out.println("Found");
                return;
            }
        }

        System.out.println("Not found");
    }

    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};

        findFirst(numbers, 20);
    }
}
```

Output:

```text
Found
```

Once `return` executes, the method ends.

---

# 138. `break` vs `return`

```text
break
→ exits loop

return
→ exits method
```

Example:

```java
for (...) {
    if (...) {
        break;
    }
}
```

The method continues after the loop.

But:

```java
for (...) {
    if (...) {
        return;
    }
}
```

the current method ends.

---

# 139. Loop and Exceptions

You may eventually have code like:

```java
try {
    // operation
} catch (...) {
    // handle error
}
```

inside a loop.

Or a loop may continue after handling an invalid input.

Exception handling is covered in Chapter 25, so for now focus on the loop mechanics.

---

# 140. Loop Performance Basics

For simple loops:

```java
for (int i = 0; i < n; i++) {
    ...
}
```

the body runs approximately:

```text
n times
```

Nested:

```java
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        ...
    }
}
```

approximately:

```text
n² times
```

Three levels:

```text
n³
```

Understanding this helps you write efficient programs.

---

# 141. Avoid Repeating Expensive Work

Suppose:

```java
for (int i = 0; i < array.length; i++) {
    expensiveCalculation();
}
```

If the calculation does not depend on `i`, doing it every iteration may be wasteful.

Prefer:

```java
var result = expensiveCalculation();

for (int i = 0; i < array.length; i++) {
    use(result);
}
```

The exact optimization depends on the program, but the general principle is:

> Do not repeatedly calculate something that does not need to change.

Do not optimize blindly; first make the code correct and readable.

---

# 142. Infinite Loop Checklist

If your program is stuck in a loop, ask:

```text
1. What condition controls the loop?
2. Which variable changes?
3. Does that variable move toward termination?
4. Can the condition ever become false?
5. Did I accidentally use the wrong update?
6. Did continue skip the update?
7. Did I accidentally use <= instead of <?
```

These questions solve many beginner loop bugs.

---

# 143. Loop Debugging Example

Suppose:

```java
int i = 1;

while (i <= 5) {
    System.out.println(i);
    i += 2;
}
```

Trace:

```text
i = 1
print 1
i = 3

print 3
i = 5

print 5
i = 7

7 <= 5 → false
```

Output:

```text
1
3
5
```

Dry-running like this makes loop behavior predictable.

---

# 144. Another Dry Run

```java
int x = 0;

for (int i = 1; i <= 3; i++) {
    x += i * 2;
}
```

Trace:

```text
Start x = 0

i = 1
x = 0 + 2
x = 2

i = 2
x = 2 + 4
x = 6

i = 3
x = 6 + 6
x = 12
```

Final:

```text
x = 12
```

---

# 145. Loop Design Formula

When creating a loop, ask four questions:

```text
1. What is the starting state?
2. What condition means "continue"?
3. What work happens each iteration?
4. How does the state change?
```

Example:

```java
for (int i = 1; i <= 10; i++) {
    System.out.println(i);
}
```

Answers:

```text
Starting state → i = 1
Continue       → i <= 10
Work           → print i
Update         → i++
```

If you can answer these four questions, you can design most basic loops.

---

# 146. Loop Types Summary

## `while`

```java
while (condition) {
    ...
}
```

Condition checked first.

May execute zero times.

---

## `do-while`

```java
do {
    ...
} while (condition);
```

Body executes first.

Executes at least once.

---

## `for`

```java
for (initialization; condition; update) {
    ...
}
```

Good for counter-controlled loops.

---

## Enhanced `for`

```java
for (Type value : arrayOrCollection) {
    ...
}
```

Good for processing each element.

---

# 147. Comparison Table

| Loop | Condition checked | Minimum executions | Common use |
|---|---|---:|---|
| `while` | before body | 0 | unknown repetitions |
| `do-while` | after body | 1 | menu/retry |
| `for` | before body | 0 | known/countable repetitions |
| enhanced `for` | internally per element | 0 | arrays/collections |

---

# 148. Important Loop Keywords

```text
break
continue
```

`break`:

```text
exit loop
```

`continue`:

```text
skip current iteration
```

`return`:

```text
exit current method
```

---

# 149. Practice Set — Basic Loops

Write programs to:

1. Print numbers from 1 to 10.
2. Print numbers from 10 to 1.
3. Print even numbers from 1 to 100.
4. Print odd numbers from 1 to 100.
5. Print multiples of 5 up to 100.
6. Print numbers from 1 to `n`.
7. Print numbers from `n` to 1.
8. Find the sum from 1 to `n`.
9. Find the product from 1 to `n`.
10. Calculate factorial.
11. Print a multiplication table.
12. Count digits.
13. Find sum of digits.
14. Reverse a number.
15. Check palindrome.

---

# 150. Practice Set — Conditions + Loops

Write programs to:

1. Count positive and negative numbers.
2. Count even and odd numbers.
3. Find the largest number.
4. Find the smallest number.
5. Check whether a number is prime.
6. Print all primes from 1 to 100.
7. Print all factors of a number.
8. Find GCD.
9. Find LCM.
10. Check Armstrong number.
11. Generate Fibonacci numbers.
12. Count vowels in a String.
13. Count digits in a String.
14. Find the first occurrence of a character.
15. Find the number of times a character appears.

---

# 151. Practice Set — Nested Loops

Create:

```text
*
**
***
****
*****
```

Then:

```text
*****
****
***
**
*
```

Then:

```text
1
12
123
1234
12345
```

Then:

```text
1
22
333
4444
55555
```

Then:

```text
    *
   ***
  *****
 *******
*********
```

---

# 152. Practice Set — `break`

Write programs that:

1. Print 1–100 but stop at 50.
2. Search for a number in an array and stop when found.
3. Ask for numbers until the user enters 0.
4. Print numbers until the first negative value.
5. Stop a menu when the user chooses Exit.

---

# 153. Practice Set — `continue`

Write programs that:

1. Print 1–100 but skip even numbers.
2. Print 1–100 but skip multiples of 5.
3. Process only positive numbers.
4. Skip zero values.
5. Print only numbers divisible by 3.

---

# 154. Practice Set — Enhanced `for`

Given:

```java
int[] numbers = {10, 20, 30, 40, 50};
```

Use an enhanced `for` loop to:

1. Print every element.
2. Calculate the sum.
3. Calculate the average.
4. Find the maximum.
5. Find the minimum.
6. Count even values.
7. Count values greater than 25.
8. Search for 40.

---

# 155. Mini Project — Number Analyzer

Create a program that repeatedly asks for numbers until the user enters `0`.

At the end display:

```text
Count
Sum
Average
Largest
Smallest
Positive count
Negative count
Even count
Odd count
```

This project combines nearly everything from Chapters 3–7.

---

# 156. Mini Project — Multiplication Table Generator

Ask:

```text
Enter starting number:
Enter ending number:
```

Then generate tables for every number in that range.

For example:

```text
Start = 2
End = 4
```

Output:

```text
2 × 1 = 2
...
2 × 10 = 20

3 × 1 = 3
...
3 × 10 = 30

4 × 1 = 4
...
4 × 10 = 40
```

Use nested loops.

---

# 157. Mini Project — Simple Quiz

Create a quiz with several questions.

For each question:

```text
display question
read answer
check answer
update score
```

At the end:

```text
Score = X / N
```

Use loops to avoid repeating the same overall structure manually.

---

# 158. Mini Project — ATM

Improve the ATM program so that:

```text
1 → Balance
2 → Deposit
3 → Withdraw
4 → Exit
```

continues until the user selects:

```text
4
```

Use:

```text
do-while
switch
if-else
```

---

# 159. Mini Project — Guessing Game

Create a number guessing game.

Rules:

```text
Secret number = 1–100

User guesses

If guess is too low:
    print "Too low"

If guess is too high:
    print "Too high"

If correct:
    print "Correct"
    stop
```

Bonus:

```text
count attempts
```

At the end:

```text
You guessed it in 7 attempts.
```

---

# 160. Interview Questions

## Q1. What is a loop?

A loop repeatedly executes a block of code while a condition or iteration rule allows it to continue.

---

## Q2. What types of loops does Java provide?

The main looping constructs are:

```text
while
do-while
for
enhanced for
```

---

## Q3. Difference between `while` and `do-while`?

`while` checks the condition before executing the body.

`do-while` executes the body first and checks the condition afterward.

Therefore, a `do-while` executes at least once.

---

## Q4. When should you use a `for` loop?

A `for` loop is often appropriate when initialization, termination condition, and update naturally form a counter-controlled loop.

---

## Q5. What is an enhanced `for` loop?

It is a loop designed to iterate through elements of arrays and other iterable structures without manually managing an index.

---

## Q6. What does `break` do?

It exits the nearest enclosing loop or switch statement.

---

## Q7. What does `continue` do?

It skips the remainder of the current loop iteration and proceeds with the next iteration.

---

## Q8. Difference between `break` and `continue`?

```text
break    → stop loop
continue → skip current iteration
```

---

## Q9. What is an infinite loop?

A loop that does not terminate because its continuation condition never becomes false or it otherwise lacks a reachable exit.

---

## Q10. Can an infinite loop be intentional?

Yes. Event-processing systems, servers, and interactive programs can intentionally run continuously until an external or internal termination condition occurs.

---

## Q11. What is a nested loop?

A loop inside another loop.

---

## Q12. How many times does a nested loop execute?

If the outer loop runs `n` times and the inner loop runs `m` times for every outer iteration, the inner body executes:

```text
n × m
```

times.

---

## Q13. What is an off-by-one error?

An error where a loop executes one iteration too many or one too few, often caused by incorrect use of `<` and `<=`.

---

## Q14. What happens if you forget to update a loop counter?

If the loop condition depends on that counter and it never changes toward termination, the loop may become infinite.

---

## Q15. Can a `for` loop have no condition?

Yes.

Example:

```java
for (;;) {
}
```

This creates an infinite loop unless something exits it.

---

## Q16. Can you use `break` in a `while` loop?

Yes.

---

## Q17. Can you use `continue` in a `for` loop?

Yes.

---

## Q18. Does `break` exit all nested loops?

No. An ordinary `break` exits only the nearest enclosing loop.

A labeled `break` can target a labeled outer loop.

---

## Q19. Does `continue` exit the loop?

No. It skips the current iteration and continues with the next iteration.

---

## Q20. What is a sentinel?

A special input value used to indicate that processing should stop.

Example:

```text
-1
```

can be chosen as a sentinel in a program that accepts non-negative values.

---

# 161. Interview Output Questions

### Question 1

What is printed?

```java
for (int i = 1; i <= 5; i++) {
    System.out.print(i + " ");
}
```

Answer:

```text
1 2 3 4 5
```

---

### Question 2

```java
for (int i = 0; i < 5; i++) {
    System.out.print(i + " ");
}
```

Answer:

```text
0 1 2 3 4
```

---

### Question 3

```java
int i = 5;

while (i > 0) {
    System.out.print(i + " ");
    i--;
}
```

Answer:

```text
5 4 3 2 1
```

---

### Question 4

```java
int i = 10;

do {
    System.out.println(i);
} while (i < 5);
```

Answer:

```text
10
```

The body executes once before the condition is tested.

---

### Question 5

```java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        break;
    }

    System.out.print(i + " ");
}
```

Answer:

```text
1 2
```

---

### Question 6

```java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;
    }

    System.out.print(i + " ");
}
```

Answer:

```text
1 2 4 5
```

---

### Question 7

```java
int sum = 0;

for (int i = 1; i <= 4; i++) {
    sum += i;
}

System.out.println(sum);
```

Answer:

```text
10
```

---

### Question 8

```java
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 2; j++) {
        System.out.print("*");
    }

    System.out.println();
}
```

Answer:

```text
**
**
**
```

---

# 162. Advanced Thinking: Loop Correctness

When solving a loop problem, don't just ask:

```text
"What code should I write?"
```

Ask:

```text
"What should be true after each iteration?"
```

Example:

```java
int sum = 0;

for (int i = 1; i <= n; i++) {
    sum += i;
}
```

At the end of iteration `i`, the intended meaning is:

```text
sum = 1 + 2 + ... + i
```

This way of thinking becomes extremely useful when you later study algorithms, recursion, data structures, and problem solving.

---

# 163. Loop Problem-Solving Strategy

When given a loop problem:

## Step 1 — Understand what repeats

Ask:

```text
What operation is repeated?
```

## Step 2 — Identify the changing value

Examples:

```text
counter
index
input
remaining digits
```

## Step 3 — Define the stopping condition

Ask:

```text
When should repetition stop?
```

## Step 4 — Decide how the state changes

Examples:

```java
i++
i--
number /= 10
```

## Step 5 — Dry run

Test with a small example.

This process is more valuable than memorizing loop syntax.

---

# 164. Loop Templates

## Template 1 — Count Up

```java
for (int i = start; i <= end; i++) {
    // work
}
```

---

## Template 2 — Count Down

```java
for (int i = start; i >= end; i--) {
    // work
}
```

---

## Template 3 — While

```java
while (condition) {
    // work
    // update state
}
```

---

## Template 4 — Do-While

```java
do {
    // work
} while (condition);
```

---

## Template 5 — Enhanced For

```java
for (Type value : values) {
    // process value
}
```

---

## Template 6 — Search

```java
for (Type value : values) {
    if (value == target) {
        // found
        break;
    }
}
```

---

## Template 7 — Accumulator

```java
int result = 0;

for (...) {
    result += value;
}
```

---

# 165. Final Chapter Summary

Loops allow Java programs to repeat work.

The main loop constructs are:

```java
while
do-while
for
enhanced for
```

A `while` loop:

```java
while (condition) {
    ...
}
```

checks its condition before every iteration.

A `do-while` loop:

```java
do {
    ...
} while (condition);
```

runs its body at least once.

A `for` loop:

```java
for (initialization; condition; update) {
    ...
}
```

is excellent for counter-controlled repetition.

An enhanced `for` loop:

```java
for (Type value : values) {
    ...
}
```

is convenient when processing every element of an array or iterable structure.

Loop control:

```text
break
→ exit the nearest loop

continue
→ skip the current iteration

return
→ exit the current method
```

Nested loops allow loops inside loops:

```text
outer loop
    ↓
inner loop
```

They are useful for:

```text
patterns
matrices
tables
pair comparisons
multi-dimensional data
```

The most important loop-design questions are:

```text
Where do I start?
What condition means "continue"?
What work happens?
How does the state change?
When does the loop stop?
```

If you can answer these questions, loops become much easier.

---

# 166. What You Should Be Able to Do Now

Before moving to Chapter 8, you should be comfortable writing:

```text
1. for loops
2. while loops
3. do-while loops
4. enhanced for loops
5. nested loops
6. break
7. continue
8. counters
9. accumulators
10. searches
11. validation loops
12. number problems
13. String loops
14. array loops
15. basic patterns
```

You should also understand the difference between:

```text
0 < 5
0 <= 5
```

and be able to explain why a loop stops.

---

# 167. Course Progress

You have now completed:

```text
01  Java Introduction
02  Setup & First Program
03  Variables & Data Types
04  Operators
05  Input & Output
06  Conditions
07  Loops  ← YOU ARE HERE
```

The next chapter is:

# Chapter 8 — Methods

You will learn:

```text
What is a method?
Why methods?
Method syntax
Parameters
Arguments
Return values
void
return
Method overloading
Variable scope
Local variables
Static methods
Calling methods
Pass-by-value
Recursion
Method design
Practical programs
Interview questions
```

Methods are extremely important because they teach you how to break a large program into small, reusable pieces.

Later, this idea becomes the foundation for classes and objects:

```text
Methods
   ↓
Classes
   ↓
Objects
   ↓
Encapsulation
   ↓
Inheritance
   ↓
Polymorphism
   ↓
Abstraction
   ↓
Complete OOP
```
