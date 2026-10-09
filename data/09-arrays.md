# Chapter 9 — Arrays in Java

> **Java Master Course — Chapter 9 of 50**
>
> An array is one of the first important data structures you learn in Java. It allows you to store multiple values under one variable name and access those values using indexes.
>
> This chapter goes from the absolute basics to 2D arrays, jagged arrays, arrays of objects, copying, searching, sorting, common mistakes, memory/reference behavior, practical programs, exercises, and interview questions.

---

# 1. What Is an Array?

Suppose you want to store marks of 5 students.

Without an array:

```java
int mark1 = 80;
int mark2 = 75;
int mark3 = 91;
int mark4 = 68;
int mark5 = 88;
```

This becomes inconvenient when the number of values increases.

With an array:

```java
int[] marks = {80, 75, 91, 68, 88};
```

Now all five values are stored in one array.

Conceptually:

```text
marks
  │
  ▼
┌────┬────┬────┬────┬────┐
│ 80 │ 75 │ 91 │ 68 │ 88 │
└────┴────┴────┴────┴────┘
   0    1    2    3    4
       indexes
```

---

# 2. Why Do We Need Arrays?

Arrays are useful when:

- you have many values of the same type
- the values belong together
- you want indexed access
- you want to process values using loops
- you know the required array size or can determine it when creating the array

For example:

```java
int[] temperatures;
double[] prices;
String[] names;
boolean[] answers;
```

---

# 3. Important Characteristics of Java Arrays

A Java array has several important properties:

```text
1. Arrays store elements of one declared type.
2. Array indexes start at 0.
3. Array length is fixed after creation.
4. Arrays are objects in Java.
5. Arrays have a length field.
6. Elements can be accessed using indexes.
7. Array elements receive default values when created.
8. Arrays can contain primitive values or references.
9. Arrays can be multidimensional.
10. Arrays can be passed to and returned from methods.
```

---

# 4. First Array Example

```java
public class Main {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};

        System.out.println(numbers[0]);
        System.out.println(numbers[1]);
        System.out.println(numbers[2]);
    }
}
```

Output:

```text
10
20
30
```

---

# 5. Array Index

Each array element has an index.

For:

```java
int[] numbers = {10, 20, 30, 40, 50};
```

the indexes are:

```text
Value       Index

10            0
20            1
30            2
40            3
50            4
```

The first element is always at:

```text
index 0
```

The last element is at:

```text
length - 1
```

---

# 6. Why Does Indexing Start at 0?

Java uses zero-based indexing.

For an array of length 5:

```text
0
1
2
3
4
```

There are five positions.

The largest valid index is:

```text
5 - 1 = 4
```

This is common in many programming languages and makes indexing work naturally with offset calculations.

---

# 7. Array Declaration

You can declare an array reference like this:

```java
int[] numbers;
```

You can also write:

```java
int numbers[];
```

The first style is generally preferred in modern Java code:

```java
int[] numbers;
```

The declaration says that `numbers` is a reference that can refer to an `int` array.

It does not create the array yet.

---

# 8. Declaration vs Creation

This is declaration:

```java
int[] numbers;
```

At this point, no array object has been created by this statement.

Creation:

```java
numbers = new int[5];
```

Now an array object capable of holding five `int` elements has been created.

Together:

```java
int[] numbers = new int[5];
```

---

# 9. Creating an Array with `new`

Syntax:

```java
dataType[] variable = new dataType[size];
```

Example:

```java
int[] numbers = new int[5];
```

This creates an array with:

```text
5 elements
```

Valid indexes:

```text
0
1
2
3
4
```

---

# 10. Array Elements Get Default Values

When you create an array using `new`, its elements receive default values.

For `int`:

```java
int[] numbers = new int[5];
```

contains:

```text
0 0 0 0 0
```

For `double`:

```text
0.0
```

For `boolean`:

```text
false
```

For `char`:

```text
'\u0000'
```

For reference types:

```text
null
```

This is different from local variables, which must be definitely assigned before use.

---

# 11. Assigning Array Elements

Example:

```java
int[] numbers = new int[5];

numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;
numbers[3] = 40;
numbers[4] = 50;
```

Now:

```text
10 20 30 40 50
```

---

# 12. Reading Array Elements

Use:

```java
array[index]
```

Example:

```java
int[] numbers = {10, 20, 30};

System.out.println(numbers[0]);
```

Output:

```text
10
```

---

# 13. Updating an Array Element

An array element behaves like a variable.

Example:

```java
int[] numbers = {10, 20, 30};

numbers[1] = 99;

System.out.println(numbers[1]);
```

Output:

```text
99
```

The array becomes:

```text
10 99 30
```

---

# 14. Array Length

Every Java array has a field:

```java
length
```

Example:

```java
int[] numbers = {10, 20, 30, 40};

System.out.println(numbers.length);
```

Output:

```text
4
```

Important:

```java
numbers.length
```

is a field, not a method.

So this is correct:

```java
numbers.length
```

and this is wrong:

```java
numbers.length()
```

---

# 15. Last Array Element

If:

```java
int[] numbers = {10, 20, 30, 40, 50};
```

then:

```java
numbers[numbers.length - 1]
```

gives the last element.

Output:

```text
50
```

Why?

```text
length = 5
last index = 5 - 1 = 4
```

---

# 16. First Element

The first element is:

```java
numbers[0]
```

This is one of the most common array operations.

---

# 17. Array Initialization

You can create and initialize an array in one statement:

```java
int[] numbers = {10, 20, 30, 40};
```

Java automatically determines the size:

```text
length = 4
```

This is called an array initializer.

---

# 18. Array Size from Initializer

Example:

```java
String[] names = {"Aman", "Riya", "Raj"};
```

Length:

```java
names.length
```

is:

```text
3
```

---

# 19. Empty Array

You can create an array of length zero:

```java
int[] numbers = new int[0];
```

This is a valid array.

Its length is:

```text
0
```

It simply has no elements.

You cannot access:

```java
numbers[0]
```

because there is no index 0.

---

# 20. Arrays Have Fixed Length

Once you create:

```java
int[] numbers = new int[5];
```

the array always has:

```text
5 elements
```

You cannot resize that same array object to 10 elements.

If you need a different size, you create another array.

For example:

```java
numbers = new int[10];
```

Now the variable refers to a new array object.

The old array may later become eligible for garbage collection if nothing else refers to it.

---

# 21. Array vs Individual Variables

Without array:

```java
int a = 10;
int b = 20;
int c = 30;
```

With array:

```java
int[] numbers = {10, 20, 30};
```

Now a loop can process all values:

```java
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}
```

Output:

```text
10
20
30
```

---

# 22. Printing an Array Directly

Do not expect:

```java
System.out.println(numbers);
```

to print all elements.

For an ordinary array, this prints a string based on the array object's type and identity, not the element list.

For example, you may see something resembling:

```text
[I@5acf9800
```

The exact value can differ between executions.

---

# 23. Correct Ways to Print an Array

Using a loop:

```java
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}
```

Or:

```java
System.out.println(java.util.Arrays.toString(numbers));
```

For:

```java
int[] numbers = {10, 20, 30};
```

output:

```text
[10, 20, 30]
```

---

# 24. Importing `Arrays`

Instead of writing:

```java
java.util.Arrays.toString(numbers)
```

you can import:

```java
import java.util.Arrays;
```

Then:

```java
System.out.println(Arrays.toString(numbers));
```

---

# 25. Traversing an Array

Traversal means visiting array elements one by one.

Using a traditional `for` loop:

```java
int[] numbers = {10, 20, 30, 40};

for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
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

# 26. Enhanced `for` Loop

Java provides an enhanced `for` loop:

```java
for (int number : numbers) {
    System.out.println(number);
}
```

For:

```java
int[] numbers = {10, 20, 30};
```

output:

```text
10
20
30
```

This is often called the:

```text
for-each loop
```

---

# 27. Traditional `for` vs Enhanced `for`

Traditional:

```java
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}
```

Enhanced:

```java
for (int number : numbers) {
    System.out.println(number);
}
```

Use traditional `for` when you need:

```text
the index
reverse traversal
specific index calculations
modifying elements by index
```

Use enhanced `for` when you simply need:

```text
each element
```

---

# 28. Modifying Elements with Enhanced `for`

Consider:

```java
int[] numbers = {1, 2, 3};

for (int number : numbers) {
    number = number * 2;
}
```

This does not modify the array elements.

Why?

`number` is a local variable receiving the element value.

For primitive arrays, changing that local variable does not write back into the array.

Correct:

```java
for (int i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
}
```

Now the array becomes:

```text
2 4 6
```

---

# 29. Enhanced `for` with Reference Elements

For an array of objects:

```java
Person[] people = ...;
```

the loop variable contains a copy of each reference value.

You can mutate the object through that reference:

```java
for (Person person : people) {
    person.name = "Updated";
}
```

But reassigning the loop variable:

```java
person = new Person();
```

does not replace the corresponding array element.

This follows the same pass-by-value/reference-value principle discussed in Chapter 8.

---

# 30. Array Input Using Scanner

Example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int[] numbers = new int[5];

        for (int i = 0; i < numbers.length; i++) {
            System.out.print("Enter number: ");
            numbers[i] = sc.nextInt();
        }

        for (int number : numbers) {
            System.out.println(number);
        }

        sc.close();
    }
}
```

---

# 31. Example Input

```text
10
20
30
40
50
```

Stored array:

```text
[10, 20, 30, 40, 50]
```

---

# 32. Sum of Array Elements

```java
int[] numbers = {10, 20, 30, 40};

int sum = 0;

for (int number : numbers) {
    sum += number;
}

System.out.println(sum);
```

Output:

```text
100
```

---

# 33. Average of Array Elements

```java
int[] numbers = {10, 20, 30, 40};

int sum = 0;

for (int number : numbers) {
    sum += number;
}

double average = (double) sum / numbers.length;

System.out.println(average);
```

Output:

```text
25.0
```

The cast is important because integer division would otherwise discard the fractional part.

---

# 34. Maximum Element

```java
int[] numbers = {10, 45, 20, 90, 30};

int max = numbers[0];

for (int i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
        max = numbers[i];
    }
}

System.out.println(max);
```

Output:

```text
90
```

---

# 35. Why Start Maximum at `numbers[0]`?

Avoid:

```java
int max = 0;
```

if the array may contain negative numbers.

For:

```text
[-50, -10, -30]
```

starting with:

```text
max = 0
```

would incorrectly produce 0.

Instead:

```java
int max = numbers[0];
```

works for any non-empty integer array.

---

# 36. Minimum Element

```java
int[] numbers = {10, 45, 20, 90, 30};

int min = numbers[0];

for (int i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) {
        min = numbers[i];
    }
}

System.out.println(min);
```

Output:

```text
10
```

---

# 37. Maximum and Minimum with `Math`

You can also write:

```java
int max = numbers[0];

for (int number : numbers) {
    max = Math.max(max, number);
}
```

and:

```java
int min = numbers[0];

for (int number : numbers) {
    min = Math.min(min, number);
}
```

---

# 38. Count Even Numbers

```java
int[] numbers = {10, 15, 20, 23, 30};

int count = 0;

for (int number : numbers) {
    if (number % 2 == 0) {
        count++;
    }
}

System.out.println(count);
```

Output:

```text
3
```

---

# 39. Count Odd Numbers

```java
int[] numbers = {10, 15, 20, 23, 30};

int count = 0;

for (int number : numbers) {
    if (number % 2 != 0) {
        count++;
    }
}

System.out.println(count);
```

Output:

```text
2
```

---

# 40. Count Positive, Negative, and Zero

```java
int[] numbers = {10, -5, 0, 20, -3, 0};

int positive = 0;
int negative = 0;
int zero = 0;

for (int number : numbers) {
    if (number > 0) {
        positive++;
    } else if (number < 0) {
        negative++;
    } else {
        zero++;
    }
}

System.out.println("Positive = " + positive);
System.out.println("Negative = " + negative);
System.out.println("Zero = " + zero);
```

Output:

```text
Positive = 2
Negative = 2
Zero = 2
```

---

# 41. Searching an Array

Suppose:

```java
int[] numbers = {10, 20, 30, 40};
```

You want to check whether:

```text
30
```

exists.

Linear search:

```java
int target = 30;
boolean found = false;

for (int number : numbers) {
    if (number == target) {
        found = true;
        break;
    }
}

System.out.println(found);
```

Output:

```text
true
```

---

# 42. Linear Search with Index

Sometimes you need the position.

```java
int target = 30;
int index = -1;

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] == target) {
        index = i;
        break;
    }
}

System.out.println(index);
```

Output:

```text
2
```

Using:

```text
-1
```

is a common convention meaning:

```text
not found
```

---

# 43. `Arrays.binarySearch()`

Java provides:

```java
Arrays.binarySearch()
```

But binary search requires the relevant array to be sorted according to the search ordering.

Example:

```java
import java.util.Arrays;

int[] numbers = {10, 20, 30, 40, 50};

int index = Arrays.binarySearch(numbers, 30);

System.out.println(index);
```

Output:

```text
2
```

Do not use binary search blindly on an unsorted array.

---

# 44. Linear Search vs Binary Search

Linear search:

```text
Works on unsorted data
Simple
Checks elements sequentially
```

Binary search:

```text
Requires sorted data
Much faster for large arrays
Repeatedly halves the search range
```

Typical complexity:

```text
Linear search: O(n)

Binary search: O(log n)
```

The details of algorithmic complexity will become more important as you move into DSA.

---

# 45. Reverse an Array

Example:

```java
int[] numbers = {10, 20, 30, 40, 50};

int left = 0;
int right = numbers.length - 1;

while (left < right) {
    int temp = numbers[left];
    numbers[left] = numbers[right];
    numbers[right] = temp;

    left++;
    right--;
}
```

Result:

```text
[50, 40, 30, 20, 10]
```

This modifies the original array.

---

# 46. Swap Two Array Elements

```java
int temp = numbers[i];

numbers[i] = numbers[j];

numbers[j] = temp;
```

The temporary variable prevents the original value from being lost.

---

# 47. Copying an Array Reference

This is very important.

Consider:

```java
int[] a = {10, 20, 30};
int[] b = a;
```

This does not create a second array.

Both variables refer to the same array.

Conceptually:

```text
a ─────┐
       │
       ▼
   [10 20 30]
       ▲
       │
b ─────┘
```

---

# 48. Modifying Through One Reference

```java
int[] a = {10, 20, 30};

int[] b = a;

b[0] = 100;

System.out.println(a[0]);
```

Output:

```text
100
```

Why?

Because `a` and `b` refer to the same array object.

---

# 49. True Array Copy

If you want a separate array, create a copy.

Using:

```java
int[] b = Arrays.copyOf(a, a.length);
```

Now:

```text
a → [10 20 30]

b → [10 20 30]
```

They contain the same values but are separate array objects.

---

# 50. `System.arraycopy()`

Java also provides:

```java
System.arraycopy()
```

Example:

```java
int[] source = {10, 20, 30, 40};
int[] destination = new int[4];

System.arraycopy(source, 0, destination, 0, source.length);
```

Now:

```text
destination = [10, 20, 30, 40]
```

The parameters specify:

```text
source array
source starting position
destination array
destination starting position
number of elements
```

---

# 51. `Arrays.copyOf()`

Example:

```java
int[] numbers = {10, 20, 30};

int[] copy = Arrays.copyOf(numbers, numbers.length);
```

You can also choose a different size:

```java
int[] bigger = Arrays.copyOf(numbers, 5);
```

Result:

```text
[10, 20, 30, 0, 0]
```

For primitive `int` elements, newly added positions receive `0`.

---

# 52. `Arrays.copyOfRange()`

Example:

```java
int[] numbers = {10, 20, 30, 40, 50};

int[] part = Arrays.copyOfRange(numbers, 1, 4);
```

Result:

```text
[20, 30, 40]
```

The ending index is exclusive.

So:

```text
1 included
4 excluded
```

---

# 53. Shallow Copy Concept

For primitive arrays:

```java
int[] copy = Arrays.copyOf(original, original.length);
```

copies the primitive values.

For arrays containing object references, the references are copied, not the referenced objects themselves.

This distinction is important.

---

# 54. Array of Objects

Example:

```java
String[] names = {
    "Aman",
    "Riya",
    "Raj"
};
```

The array stores references to String objects.

Similarly:

```java
Person[] people = new Person[3];
```

creates an array capable of holding three `Person` references.

It does not automatically create three Person objects.

---

# 55. Important: Array of Objects Does Not Create Objects

Consider:

```java
Person[] people = new Person[3];
```

Initially:

```text
people[0] = null
people[1] = null
people[2] = null
```

You must create objects:

```java
people[0] = new Person();
people[1] = new Person();
people[2] = new Person();
```

Only then do those positions refer to Person objects.

---

# 56. Example — Array of Students

```java
class Student {
    String name;
    int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
}

public class Main {
    public static void main(String[] args) {
        Student[] students = {
            new Student("Aman", 85),
            new Student("Riya", 92),
            new Student("Raj", 78)
        };

        for (Student student : students) {
            System.out.println(student.name + " " + student.marks);
        }
    }
}
```

Output:

```text
Aman 85
Riya 92
Raj 78
```

This becomes especially important in the OOP section.

---

# 57. `null` in Reference Arrays

Consider:

```java
String[] names = new String[3];
```

Initially:

```text
[null, null, null]
```

Trying:

```java
System.out.println(names[0].length());
```

causes:

```text
NullPointerException
```

because `names[0]` is `null`.

---

# 58. Array Type Safety

If you create:

```java
int[] numbers = new int[3];
```

you cannot store a String:

```java
numbers[0] = "Java";
```

This is a compile-time type error.

The declared array type controls what values can be stored.

---

# 59. Primitive Arrays

Examples:

```java
int[] a;
double[] b;
char[] c;
boolean[] d;
long[] e;
```

Each array stores values of its corresponding primitive type.

---

# 60. Reference Arrays

Examples:

```java
String[] names;
Scanner[] scanners;
Student[] students;
Person[] people;
```

These arrays store reference values.

---

# 61. Array of `char`

```java
char[] letters = {'J', 'a', 'v', 'a'};
```

Access:

```java
System.out.println(letters[0]);
```

Output:

```text
J
```

A `char[]` can be useful when working directly with individual UTF-16 code units.

---

# 62. Array of `boolean`

```java
boolean[] answers = {true, false, true, true};
```

Loop:

```java
for (boolean answer : answers) {
    System.out.println(answer);
}
```

Output:

```text
true
false
true
true
```

---

# 63. Array of `double`

```java
double[] prices = {99.5, 120.75, 50.0};
```

---

# 64. Array Bounds

If:

```java
int[] numbers = new int[5];
```

valid indexes are:

```text
0 to 4
```

Invalid:

```java
numbers[5]
```

This causes:

```text
ArrayIndexOutOfBoundsException
```

More generally, the runtime exception type is `ArrayIndexOutOfBoundsException` for an invalid integer index on an array.

---

# 65. Negative Index

This is also invalid:

```java
numbers[-1]
```

It causes an array-index exception.

Java arrays do not support negative indexes.

---

# 66. Common Off-by-One Error

Wrong:

```java
for (int i = 0; i <= numbers.length; i++) {
    System.out.println(numbers[i]);
}
```

The final iteration attempts:

```text
numbers[numbers.length]
```

which is one past the last valid index.

Correct:

```java
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}
```

---

# 67. Array Length Zero

This loop is safe:

```java
for (int i = 0; i < numbers.length; i++) {
    ...
}
```

even when:

```java
numbers.length == 0
```

The loop simply executes zero times.

But this is not safe for an empty array:

```java
int max = numbers[0];
```

because index 0 does not exist.

---

# 68. Empty Array Edge Case

If a method expects a non-empty array:

```java
static int max(int[] numbers) {
    int max = numbers[0];
    ...
}
```

it should define what happens for an empty array.

Possible designs include:

```text
throw an exception
return a special value
return OptionalInt
```

depending on the API design.

Do not silently choose a value such as 0 if 0 could be a valid result.

---

# 69. `Arrays.toString()`

Java's utility class:

```java
java.util.Arrays
```

contains many useful array operations.

Example:

```java
import java.util.Arrays;

int[] numbers = {30, 10, 20};

System.out.println(Arrays.toString(numbers));
```

Output:

```text
[30, 10, 20]
```

---

# 70. Sorting an Array

```java
import java.util.Arrays;

int[] numbers = {30, 10, 20, 5, 40};

Arrays.sort(numbers);

System.out.println(Arrays.toString(numbers));
```

Output:

```text
[5, 10, 20, 30, 40]
```

`Arrays.sort()` modifies the array.

---

# 71. Sorting a Range

You can sort only part of an array:

```java
Arrays.sort(numbers, 1, 4);
```

The range follows:

```text
fromIndex inclusive
toIndex exclusive
```

For example:

```java
int[] numbers = {50, 40, 30, 20, 10};

Arrays.sort(numbers, 1, 4);
```

The elements at indexes:

```text
1, 2, 3
```

are sorted.

Result:

```text
[50, 20, 30, 40, 10]
```

Actually, for the selected values `[40, 30, 20]`, sorted ascending gives `[20, 30, 40]`, so the final array is:

```text
[50, 20, 30, 40, 10]
```

---

# 72. Filling an Array

```java
Arrays.fill(numbers, 7);
```

Example:

```java
int[] numbers = new int[5];

Arrays.fill(numbers, 7);

System.out.println(Arrays.toString(numbers));
```

Output:

```text
[7, 7, 7, 7, 7]
```

---

# 73. Filling a Range

```java
Arrays.fill(numbers, 1, 4, 99);
```

This fills:

```text
indexes 1, 2, 3
```

with:

```text
99
```

---

# 74. Comparing Arrays

Do not normally use:

```java
a == b
```

to compare array contents.

`==` checks whether the two array references refer to the same array object.

Use:

```java
Arrays.equals(a, b)
```

to compare one-dimensional array contents.

Example:

```java
int[] a = {1, 2, 3};
int[] b = {1, 2, 3};

System.out.println(Arrays.equals(a, b));
```

Output:

```text
true
```

---

# 75. Array Reference Equality

```java
int[] a = {1, 2, 3};
int[] b = {1, 2, 3};

System.out.println(a == b);
```

Output:

```text
false
```

They contain the same values but are different array objects.

---

# 76. Same Reference

```java
int[] a = {1, 2, 3};
int[] b = a;

System.out.println(a == b);
```

Output:

```text
true
```

Both variables refer to the same array.

---

# 77. `Arrays.deepEquals()`

For nested arrays, use:

```java
Arrays.deepEquals()
```

when comparing nested reference-array structures.

For example:

```java
int[][] a = {
    {1, 2},
    {3, 4}
};

int[][] b = {
    {1, 2},
    {3, 4}
};

System.out.println(Arrays.deepEquals(a, b));
```

Output:

```text
true
```

---

# 78. `Arrays.deepToString()`

For multidimensional arrays:

```java
System.out.println(Arrays.deepToString(matrix));
```

can display nested contents.

Example:

```java
int[][] matrix = {
    {1, 2},
    {3, 4}
};

System.out.println(Arrays.deepToString(matrix));
```

Output:

```text
[[1, 2], [3, 4]]
```

---

# 79. Two-Dimensional Arrays

A two-dimensional array can be visualized as rows and columns.

Example:

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
```

Visual:

```text
       columns
        0  1  2

row 0   1  2  3
row 1   4  5  6
row 2   7  8  9
```

Access:

```java
matrix[1][2]
```

Output:

```text
6
```

---

# 80. Understanding `int[][]`

This:

```java
int[][] matrix;
```

is an array whose elements are themselves `int[]` references.

This is important because Java multidimensional arrays are arrays of arrays.

They are not required to be one single rectangular memory block in the way a mathematical matrix is conceptually presented.

---

# 81. Creating a 2D Array

```java
int[][] matrix = new int[3][4];
```

This creates:

```text
3 rows
4 columns in each row
```

All `int` elements initially contain:

```text
0
```

---

# 82. Printing a 2D Array

Use nested loops:

```java
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }

    System.out.println();
}
```

---

# 83. 2D Array Example

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }

    System.out.println();
}
```

Output:

```text
1 2 3
4 5 6
7 8 9
```

---

# 84. Accessing a Row

Because a 2D array is an array of arrays:

```java
matrix[0]
```

refers to the first row.

Example:

```java
System.out.println(Arrays.toString(matrix[0]));
```

Output:

```text
[1, 2, 3]
```

---

# 85. Row Length

Use:

```java
matrix[i].length
```

for the length of row `i`.

Do not always assume every row has the same length.

---

# 86. Jagged Arrays

Java allows rows with different lengths.

Example:

```java
int[][] numbers = {
    {1, 2},
    {3, 4, 5},
    {6}
};
```

Visual:

```text
row 0 → [1, 2]
row 1 → [3, 4, 5]
row 2 → [6]
```

This is called a:

```text
jagged array
```

or irregular array.

---

# 87. Traversing a Jagged Array

Use:

```java
for (int i = 0; i < numbers.length; i++) {
    for (int j = 0; j < numbers[i].length; j++) {
        System.out.print(numbers[i][j] + " ");
    }

    System.out.println();
}
```

Notice:

```java
numbers[i].length
```

rather than:

```java
numbers[0].length
```

because each row may have a different length.

---

# 88. Creating Jagged Arrays Manually

```java
int[][] numbers = new int[3][];

numbers[0] = new int[2];
numbers[1] = new int[4];
numbers[2] = new int[1];
```

Now:

```text
row 0 → length 2
row 1 → length 4
row 2 → length 1
```

---

# 89. Partially Initialized 2D Arrays

You can create:

```java
int[][] numbers = new int[3][];
```

At first:

```text
numbers[0] = null
numbers[1] = null
numbers[2] = null
```

The individual rows have not been created yet.

You must initialize them before indexing into them.

---

# 90. `NullPointerException` with 2D Arrays

This is dangerous:

```java
int[][] numbers = new int[3][];

numbers[0][0] = 10;
```

Why?

Because:

```text
numbers[0] == null
```

There is no row object at index 0 yet.

Create it first:

```java
numbers[0] = new int[2];
numbers[0][0] = 10;
```

---

# 91. Three-Dimensional Arrays

Java supports arrays with more dimensions.

Example:

```java
int[][][] cube = new int[2][3][4];
```

Conceptually:

```text
2 layers
3 rows per layer
4 columns per row
```

Access:

```java
cube[0][1][2]
```

Three-dimensional arrays are arrays of arrays of arrays.

---

# 92. Do Not Confuse Array Dimension with Data Structure Complexity

A `int[][]` is not a special built-in matrix class.

It is:

```text
array of int[] references
```

This is why jagged structures are possible.

---

# 93. Passing Arrays to Methods

Example:

```java
static void printArray(int[] numbers) {
    for (int number : numbers) {
        System.out.println(number);
    }
}
```

Call:

```java
int[] numbers = {10, 20, 30};

printArray(numbers);
```

---

# 94. Modifying an Array Inside a Method

```java
static void doubleValues(int[] numbers) {
    for (int i = 0; i < numbers.length; i++) {
        numbers[i] *= 2;
    }
}
```

Call:

```java
int[] numbers = {1, 2, 3};

doubleValues(numbers);

System.out.println(Arrays.toString(numbers));
```

Output:

```text
[2, 4, 6]
```

The method received a copy of the array reference, and both references identify the same array object.

---

# 95. Reassigning an Array Parameter

```java
static void replace(int[] numbers) {
    numbers = new int[]{100, 200, 300};
}
```

Caller:

```java
int[] numbers = {1, 2, 3};

replace(numbers);

System.out.println(Arrays.toString(numbers));
```

Output:

```text
[1, 2, 3]
```

The local parameter was reassigned. The caller's reference was not changed.

---

# 96. Returning an Array

```java
static int[] createNumbers() {
    return new int[]{10, 20, 30};
}
```

Call:

```java
int[] numbers = createNumbers();
```

This is completely valid.

---

# 97. Method Returning Modified Copy

```java
static int[] doubleValues(int[] numbers) {
    int[] result = Arrays.copyOf(numbers, numbers.length);

    for (int i = 0; i < result.length; i++) {
        result[i] *= 2;
    }

    return result;
}
```

This leaves the original array unchanged.

---

# 98. Find Second Largest Element

One approach:

```java
static int secondLargest(int[] numbers) {
    if (numbers.length < 2) {
        throw new IllegalArgumentException("Need at least two elements");
    }

    int largest = Integer.MIN_VALUE;
    int second = Integer.MIN_VALUE;

    for (int number : numbers) {
        if (number > largest) {
            second = largest;
            largest = number;
        } else if (number > second && number != largest) {
            second = number;
        }
    }

    if (second == Integer.MIN_VALUE) {
        throw new IllegalArgumentException("No distinct second-largest value");
    }

    return second;
}
```

This version asks for a distinct second-largest value.

The exact problem definition matters.

---

# 99. Find Frequency of a Value

```java
static int countOccurrences(int[] numbers, int target) {
    int count = 0;

    for (int number : numbers) {
        if (number == target) {
            count++;
        }
    }

    return count;
}
```

Example:

```java
int[] numbers = {10, 20, 10, 30, 10};

System.out.println(countOccurrences(numbers, 10));
```

Output:

```text
3
```

---

# 100. Find All Occurrences

```java
int[] numbers = {10, 20, 10, 30, 10};

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] == 10) {
        System.out.println("Found at index " + i);
    }
}
```

Output:

```text
Found at index 0
Found at index 2
Found at index 4
```

---

# 101. Check Whether Array Is Sorted

Ascending order:

```java
static boolean isSorted(int[] numbers) {
    for (int i = 1; i < numbers.length; i++) {
        if (numbers[i] < numbers[i - 1]) {
            return false;
        }
    }

    return true;
}
```

Example:

```text
[1, 2, 2, 5]
```

returns:

```text
true
```

The method treats equal adjacent values as allowed.

---

# 102. Copy in Reverse Order

```java
static int[] reversedCopy(int[] numbers) {
    int[] result = new int[numbers.length];

    for (int i = 0; i < numbers.length; i++) {
        result[i] = numbers[numbers.length - 1 - i];
    }

    return result;
}
```

Original:

```text
[10, 20, 30]
```

Returned copy:

```text
[30, 20, 10]
```

The original remains unchanged.

---

# 103. Rotate an Array

Left rotation by one position:

```java
static void rotateLeftByOne(int[] numbers) {
    if (numbers.length <= 1) {
        return;
    }

    int first = numbers[0];

    for (int i = 1; i < numbers.length; i++) {
        numbers[i - 1] = numbers[i];
    }

    numbers[numbers.length - 1] = first;
}
```

Example:

```text
[1, 2, 3, 4, 5]
```

becomes:

```text
[2, 3, 4, 5, 1]
```

---

# 104. Right Rotation by One

```java
static void rotateRightByOne(int[] numbers) {
    if (numbers.length <= 1) {
        return;
    }

    int last = numbers[numbers.length - 1];

    for (int i = numbers.length - 1; i > 0; i--) {
        numbers[i] = numbers[i - 1];
    }

    numbers[0] = last;
}
```

Example:

```text
[1, 2, 3, 4, 5]
```

becomes:

```text
[5, 1, 2, 3, 4]
```

---

# 105. Remove an Element from an Array

An array has fixed length, so you cannot truly remove an element from the existing array.

You can create a new array.

Example:

```java
static int[] removeAt(int[] numbers, int index) {
    if (index < 0 || index >= numbers.length) {
        throw new IndexOutOfBoundsException();
    }

    int[] result = new int[numbers.length - 1];

    for (int i = 0, j = 0; i < numbers.length; i++) {
        if (i != index) {
            result[j++] = numbers[i];
        }
    }

    return result;
}
```

This is one reason dynamic collections such as `ArrayList` are useful.

---

# 106. Insert into an Array

Again, arrays have fixed length.

To insert a new value, create a larger array.

Example:

```java
static int[] insertAt(int[] numbers, int index, int value) {
    if (index < 0 || index > numbers.length) {
        throw new IndexOutOfBoundsException();
    }

    int[] result = new int[numbers.length + 1];

    for (int i = 0; i < index; i++) {
        result[i] = numbers[i];
    }

    result[index] = value;

    for (int i = index; i < numbers.length; i++) {
        result[i + 1] = numbers[i];
    }

    return result;
}
```

---

# 107. Why ArrayList Exists

Arrays are excellent when:

```text
size is fixed
indexed access is important
simple storage is needed
```

But when you frequently need:

```text
add
remove
resize
```

a dynamic collection such as:

```java
ArrayList
```

is often more convenient.

Collections will be studied later in Chapters 31–35.

---

# 108. Array vs ArrayList Preview

| Feature | Array | ArrayList |
|---|---|---|
| Size | Fixed | Dynamic |
| Stores primitives directly | Yes | No, uses wrapper types |
| Index access | Yes | Yes |
| `length` | Yes | No |
| `size()` | No | Yes |
| Add/remove convenience | Manual | Built-in methods |
| Performance characteristics | Very direct | More flexible |

Do not replace every array with an `ArrayList`. Choose according to the problem.

---

# 109. Array Memory Model

An array variable is a reference.

Example:

```java
int[] numbers = new int[5];
```

Conceptually:

```text
numbers
   │
   ▼
┌───────────────────┐
│ array object      │
│                   │
│ [0][0][0][0][0]   │
└───────────────────┘
```

The Java language does not require you to think of every implementation as a simplistic "reference on stack, array on heap" model. JVM implementation details can vary.

For beginner reasoning, the important point is:

```text
numbers is a reference to an array object
```

---

# 110. Array Is an Object

Even primitive arrays are objects in Java.

For example:

```java
int[] numbers = new int[5];
```

The array object has:

```java
numbers.length
```

and inherits behavior from the JVM's array/object model.

Arrays also have runtime type information.

---

# 111. Arrays and `Object`

All Java array types are reference types.

An array reference can therefore be assigned to `Object`:

```java
int[] numbers = {1, 2, 3};

Object obj = numbers;
```

The object referred to is still an array.

---

# 112. Arrays and `Cloneable`

Arrays support cloning through the array type's built-in behavior.

Example:

```java
int[] original = {1, 2, 3};

int[] copy = original.clone();
```

For primitive arrays, this creates a new array containing copied primitive values.

For reference arrays, the references are copied rather than recursively cloning the referenced objects.

---

# 113. `clone()` vs `Arrays.copyOf()`

Both can create a new array.

```java
int[] copy1 = original.clone();
```

or:

```java
int[] copy2 = Arrays.copyOf(original, original.length);
```

`Arrays.copyOf()` is often clearer when you want to control the target length.

---

# 114. Array Covariance

Java arrays are covariant.

Suppose:

```java
class Animal {
}

class Dog extends Animal {
}
```

Then:

```java
Dog[] dogs = new Dog[3];

Animal[] animals = dogs;
```

This is allowed.

But:

```java
animals[0] = new Animal();
```

can fail at runtime with:

```text
ArrayStoreException
```

because the actual array is a `Dog[]`.

This is an advanced but important Java array behavior.

---

# 115. Why Array Covariance Can Be Dangerous

The variable:

```java
Animal[] animals
```

suggests that an Animal can be stored.

But the actual object is:

```text
Dog[]
```

Java's runtime array type checks prevent an incompatible object from being inserted.

This is one reason generic collections have different type-system behavior.

---

# 116. `ArrayStoreException`

Example:

```java
class Animal {
}

class Dog extends Animal {
}

public class Main {
    public static void main(String[] args) {
        Dog[] dogs = new Dog[2];

        Animal[] animals = dogs;

        animals[0] = new Animal();
    }
}
```

The assignment to `animals[0]` fails at runtime.

The actual array can only store:

```text
Dog
```

or compatible subclasses of Dog.

---

# 117. Arrays of Interfaces

Suppose:

```java
interface Payment {
}

class CardPayment implements Payment {
}

class CashPayment implements Payment {
}
```

You can create:

```java
Payment[] payments = {
    new CardPayment(),
    new CashPayment()
};
```

This is extremely useful in OOP because an array can store different implementations behind a common interface type.

---

# 118. Polymorphism with Arrays Preview

```java
Animal[] animals = {
    new Dog(),
    new Cat()
};
```

You can loop:

```java
for (Animal animal : animals) {
    animal.sound();
}
```

At runtime, overridden methods can execute according to the actual object type.

This connects arrays directly to polymorphism, which will be studied in depth in Chapter 19.

---

# 119. Array of Arrays and References

For:

```java
int[][] matrix = new int[2][3];
```

conceptually:

```text
matrix
   │
   ▼
┌────────────┐
│ row ref 0 ─────► [0, 0, 0]
│ row ref 1 ─────► [0, 0, 0]
└────────────┘
```

This model explains why:

```java
matrix[0].length
```

and:

```java
matrix[1].length
```

can differ in a jagged array.

---

# 120. Matrix Addition

For equally sized matrices:

```java
static int[][] addMatrices(int[][] a, int[][] b) {
    int[][] result = new int[a.length][];

    for (int i = 0; i < a.length; i++) {
        if (a[i].length != b[i].length) {
            throw new IllegalArgumentException("Rows must have equal lengths");
        }

        result[i] = new int[a[i].length];

        for (int j = 0; j < a[i].length; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }

    return result;
}
```

---

# 121. Matrix Transpose

For a rectangular matrix:

```text
1 2 3
4 5 6
```

transpose:

```text
1 4
2 5
3 6
```

Implementation:

```java
static int[][] transpose(int[][] matrix) {
    if (matrix.length == 0) {
        return new int[0][0];
    }

    int rows = matrix.length;
    int cols = matrix[0].length;

    int[][] result = new int[cols][rows];

    for (int i = 0; i < rows; i++) {
        if (matrix[i].length != cols) {
            throw new IllegalArgumentException("Matrix must be rectangular");
        }

        for (int j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }

    return result;
}
```

---

# 122. Main Diagonal

For:

```text
1 2 3
4 5 6
7 8 9
```

main diagonal:

```text
1
  5
    9
```

Elements satisfy:

```text
row == column
```

Code:

```java
for (int i = 0; i < matrix.length; i++) {
    System.out.println(matrix[i][i]);
}
```

This assumes a suitable square matrix.

---

# 123. Sum of Main Diagonal

```java
static int diagonalSum(int[][] matrix) {
    int sum = 0;

    for (int i = 0; i < matrix.length; i++) {
        sum += matrix[i][i];
    }

    return sum;
}
```

For:

```text
1 2 3
4 5 6
7 8 9
```

result:

```text
15
```

---

# 124. Row Sum

```java
static int rowSum(int[][] matrix, int row) {
    int sum = 0;

    for (int value : matrix[row]) {
        sum += value;
    }

    return sum;
}
```

---

# 125. Column Sum

For a rectangular matrix:

```java
static int columnSum(int[][] matrix, int column) {
    int sum = 0;

    for (int i = 0; i < matrix.length; i++) {
        sum += matrix[i][column];
    }

    return sum;
}
```

---

# 126. Frequency Counting

For a small known range of integer values, an array can be used as a frequency table.

Example:

```java
int[] numbers = {1, 2, 1, 3, 2, 1};

int[] frequency = new int[4];

for (int number : numbers) {
    frequency[number]++;
}
```

Now:

```text
frequency[1] = 3
frequency[2] = 2
frequency[3] = 1
```

This is a very important DSA technique.

---

# 127. Frequency Table Requires Valid Indexes

If:

```java
int[] frequency = new int[4];
```

valid indexes are:

```text
0, 1, 2, 3
```

So the input value must be in that range.

For arbitrary values such as:

```text
100000
-5
999999
```

a simple frequency array may not be appropriate. A `Map` can be more suitable.

Maps are covered later.

---

# 128. Prefix Sum Preview

Arrays are also used for prefix sums.

Given:

```text
[2, 4, 3, 5]
```

prefix sums:

```text
[2, 6, 9, 14]
```

Implementation:

```java
int[] numbers = {2, 4, 3, 5};
int[] prefix = new int[numbers.length];

if (numbers.length > 0) {
    prefix[0] = numbers[0];

    for (int i = 1; i < numbers.length; i++) {
        prefix[i] = prefix[i - 1] + numbers[i];
    }
}
```

This is a common DSA technique.

---

# 129. Two-Pointer Technique Preview

Many array problems can be solved with two indexes:

```text
left
right
```

Example: reversing an array.

```java
int left = 0;
int right = numbers.length - 1;

while (left < right) {
    int temp = numbers[left];
    numbers[left] = numbers[right];
    numbers[right] = temp;

    left++;
    right--;
}
```

This pattern appears frequently in algorithms.

---

# 130. Sliding Window Preview

Another important array technique is the sliding window.

For example, to find the maximum sum of a window of size `k`:

```java
static int maxWindowSum(int[] numbers, int k) {
    if (k <= 0 || k > numbers.length) {
        throw new IllegalArgumentException("Invalid window size");
    }

    int windowSum = 0;

    for (int i = 0; i < k; i++) {
        windowSum += numbers[i];
    }

    int max = windowSum;

    for (int i = k; i < numbers.length; i++) {
        windowSum += numbers[i];
        windowSum -= numbers[i - k];

        max = Math.max(max, windowSum);
    }

    return max;
}
```

This is an algorithmic pattern you will encounter in DSA.

---

# 131. Common Mistake — Using `length()`

Wrong:

```java
numbers.length()
```

Correct:

```java
numbers.length
```

For arrays:

```text
length is a field
```

For String:

```java
text.length()
```

is a method.

This difference is frequently tested.

---

# 132. Array vs String Length

Array:

```java
numbers.length
```

String:

```java
text.length()
```

ArrayList:

```java
list.size()
```

Remember:

```text
array → length
String → length()
collection → size()
```

---

# 133. Common Mistake — Starting at Index 1

Wrong if you want every element:

```java
for (int i = 1; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}
```

This skips index 0.

Correct:

```java
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}
```

---

# 134. Common Mistake — Using `<=`

Wrong:

```java
for (int i = 0; i <= numbers.length; i++) {
}
```

Correct:

```java
for (int i = 0; i < numbers.length; i++) {
}
```

---

# 135. Common Mistake — Assuming Array Resizes

This:

```java
int[] numbers = new int[5];
```

does not create a dynamic array.

You cannot do something like:

```java
numbers.add(10);
```

Arrays do not have `add()`.

Use a collection such as `ArrayList` when dynamic resizing is required.

---

# 136. Common Mistake — Confusing `length` with Capacity

For a Java array:

```java
numbers.length
```

is the actual fixed number of elements in that array object.

There is no separate "capacity" that automatically grows like an `ArrayList`.

---

# 137. Common Mistake — Accessing `null` Object Elements

```java
Student[] students = new Student[3];

students[0].name = "Aman";
```

This fails because:

```text
students[0] == null
```

Create the object first:

```java
students[0] = new Student();
students[0].name = "Aman";
```

---

# 138. Common Mistake — Comparing Arrays with `==`

Wrong for content comparison:

```java
if (a == b) {
}
```

This checks reference identity.

Use:

```java
Arrays.equals(a, b)
```

for one-dimensional contents.

---

# 139. Common Mistake — Sorting and Expecting a New Array

```java
Arrays.sort(numbers);
```

sorts the array in place.

It does not return a newly sorted array that you need to assign.

---

# 140. Common Mistake — Binary Search on Unsorted Data

This is dangerous:

```java
int index = Arrays.binarySearch(numbers, target);
```

if `numbers` is not sorted according to the required ordering.

Sort first when appropriate:

```java
Arrays.sort(numbers);
int index = Arrays.binarySearch(numbers, target);
```

---

# 141. Common Mistake — Empty Array Maximum

This:

```java
int max = numbers[0];
```

requires at least one element.

Always consider:

```text
What happens if length == 0?
```

---

# 142. Common Mistake — Modifying Enhanced Loop Variable

This does not update a primitive array:

```java
for (int number : numbers) {
    number++;
}
```

Use indexes:

```java
for (int i = 0; i < numbers.length; i++) {
    numbers[i]++;
}
```

---

# 143. Common Mistake — Confusing Reference Copy with Array Copy

This:

```java
int[] b = a;
```

does not copy the array.

This:

```java
int[] b = Arrays.copyOf(a, a.length);
```

creates a new array.

This distinction is fundamental.

---

# 144. Practical Program — Read and Print Array

```java
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter size: ");
        int n = sc.nextInt();

        int[] numbers = new int[n];

        for (int i = 0; i < n; i++) {
            System.out.print("Enter element " + i + ": ");
            numbers[i] = sc.nextInt();
        }

        System.out.println("Array = " + Arrays.toString(numbers));

        sc.close();
    }
}
```

---

# 145. Practical Program — Sum and Average

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter size: ");
        int n = sc.nextInt();

        int[] numbers = new int[n];

        int sum = 0;

        for (int i = 0; i < n; i++) {
            numbers[i] = sc.nextInt();
            sum += numbers[i];
        }

        if (n > 0) {
            double average = (double) sum / n;

            System.out.println("Sum = " + sum);
            System.out.println("Average = " + average);
        } else {
            System.out.println("Array is empty.");
        }

        sc.close();
    }
}
```

---

# 146. Practical Program — Find Maximum and Minimum

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter size: ");
        int n = sc.nextInt();

        if (n <= 0) {
            System.out.println("Size must be positive.");
            sc.close();
            return;
        }

        int[] numbers = new int[n];

        for (int i = 0; i < n; i++) {
            numbers[i] = sc.nextInt();
        }

        int max = numbers[0];
        int min = numbers[0];

        for (int i = 1; i < numbers.length; i++) {
            max = Math.max(max, numbers[i]);
            min = Math.min(min, numbers[i]);
        }

        System.out.println("Maximum = " + max);
        System.out.println("Minimum = " + min);

        sc.close();
    }
}
```

---

# 147. Practical Program — Reverse Array

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};

        int left = 0;
        int right = numbers.length - 1;

        while (left < right) {
            int temp = numbers[left];
            numbers[left] = numbers[right];
            numbers[right] = temp;

            left++;
            right--;
        }

        System.out.println(Arrays.toString(numbers));
    }
}
```

Output:

```text
[50, 40, 30, 20, 10]
```

---

# 148. Practical Program — Search Element

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int[] numbers = {10, 20, 30, 40, 50};

        System.out.print("Enter target: ");
        int target = sc.nextInt();

        int index = -1;

        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == target) {
                index = i;
                break;
            }
        }

        if (index == -1) {
            System.out.println("Not found");
        } else {
            System.out.println("Found at index " + index);
        }

        sc.close();
    }
}
```

---

# 149. Practical Program — Frequency of Elements

For values in a known small range:

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 1, 3, 2, 1, 4};

        int[] frequency = new int[5];

        for (int number : numbers) {
            frequency[number]++;
        }

        System.out.println(Arrays.toString(frequency));
    }
}
```

Output:

```text
[0, 3, 2, 1, 1]
```

Index represents the value.

---

# 150. Practical Program — Remove Duplicates from Sorted Array

For a sorted array:

```java
static int removeDuplicates(int[] numbers) {
    if (numbers.length == 0) {
        return 0;
    }

    int unique = 1;

    for (int i = 1; i < numbers.length; i++) {
        if (numbers[i] != numbers[unique - 1]) {
            numbers[unique] = numbers[i];
            unique++;
        }
    }

    return unique;
}
```

If:

```text
[1, 1, 2, 2, 3]
```

the first returned `unique` positions become:

```text
[1, 2, 3]
```

The remaining positions are not part of the logical result.

This is a common DSA pattern.

---

# 151. Practical Program — Merge Two Arrays

```java
import java.util.Arrays;

static int[] merge(int[] a, int[] b) {
    int[] result = new int[a.length + b.length];

    for (int i = 0; i < a.length; i++) {
        result[i] = a[i];
    }

    for (int i = 0; i < b.length; i++) {
        result[a.length + i] = b[i];
    }

    return result;
}
```

Example:

```text
a = [1, 2, 3]
b = [4, 5]

result = [1, 2, 3, 4, 5]
```

---

# 152. Practical Program — Compare Two Arrays

```java
import java.util.Arrays;

int[] a = {1, 2, 3};
int[] b = {1, 2, 3};

if (Arrays.equals(a, b)) {
    System.out.println("Same contents");
} else {
    System.out.println("Different");
}
```

Output:

```text
Same contents
```

---

# 153. Practical Program — Matrix Printing

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
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
7 8 9
```

This is a clean use of nested enhanced `for` loops.

---

# 154. Practical Program — Matrix Diagonal Sum

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int sum = 0;

for (int i = 0; i < matrix.length; i++) {
    sum += matrix[i][i];
}

System.out.println(sum);
```

Output:

```text
15
```

---

# 155. Practical Program — Student Marks Array

```java
class Student {
    String name;
    int[] marks;

    Student(String name, int[] marks) {
        this.name = name;
        this.marks = marks;
    }
}
```

Usage:

```java
Student student = new Student(
    "Aman",
    new int[]{80, 85, 90}
);
```

Now one object contains an array of marks.

This is an important bridge between arrays and OOP.

---

# 156. Arrays and Methods Together

A useful pattern is:

```java
static int sum(int[] numbers) {
    int sum = 0;

    for (int number : numbers) {
        sum += number;
    }

    return sum;
}
```

Then:

```java
int[] marks = {80, 90, 70};

System.out.println(sum(marks));
```

Output:

```text
240
```

This is exactly why Chapter 8 methods and Chapter 9 arrays fit together.

---

# 157. Arrays and Loops Together

Most beginner array algorithms combine:

```text
array
+
loop
+
condition
```

Examples:

```text
find maximum
find minimum
search
count
sum
average
reverse
sort
```

Once you are comfortable with this combination, many beginner programming problems become much easier.

---

# 158. Time Complexity Preview

For an array of `n` elements:

Access by index:

```text
numbers[i]
```

is typically:

```text
O(1)
```

Linear search:

```text
O(n)
```

Finding maximum:

```text
O(n)
```

Sum:

```text
O(n)
```

Reverse:

```text
O(n)
```

Comparison of two equal-length arrays:

```text
O(n)
```

Sorting depends on the algorithm and implementation, but comparison-based sorting is generally around:

```text
O(n log n)
```

for common efficient general-purpose implementations.

Do not memorize complexity without understanding what operation is being repeated.

---

# 159. Space Complexity Preview

An array of `n` primitive elements requires storage proportional to:

```text
O(n)
```

If you create another array of size `n`:

```text
O(n)
```

additional storage is required.

For an in-place reverse:

```text
O(1)
```

extra element storage is needed apart from the input array.

This distinction becomes important in DSA.

---

# 160. Array Access Complexity

Why is:

```java
numbers[500]
```

considered constant-time indexed access?

An array provides direct indexed access to its elements.

You do not normally have to scan:

```text
0
1
2
...
499
```

to reach index 500.

The JVM's actual implementation details are more complex, but the standard algorithmic model treats array indexing as:

```text
O(1)
```

---

# 161. Why Insertion Can Be Expensive

Because array length is fixed, inserting into the middle generally requires creating or using another array and shifting elements.

Example:

```text
Before:

[10, 20, 40, 50]

Insert 30:

[10, 20, 30, 40, 50]
```

Values after the insertion point need to move.

This is one reason dynamic collections are useful.

---

# 162. Array as a Foundation Data Structure

Arrays are foundational because many other data structures and algorithms are built around indexed storage.

You will later see arrays used inside or alongside:

```text
ArrayList
Stack implementations
Queue implementations
Heaps
Hash tables
Matrices
Dynamic programming
Sorting algorithms
Searching algorithms
Graphs
```

Understanding arrays well pays off far beyond this chapter.

---

# 163. Interview Questions

## Q1. What is an array?

An array is an object that stores a fixed number of elements of a specified component type and allows indexed access.

---

## Q2. What is the first index of a Java array?

```text
0
```

---

## Q3. What is the last index?

```text
array.length - 1
```

for a non-empty array.

---

## Q4. Can an array change its size after creation?

No.

Its length is fixed.

---

## Q5. What are default values of array elements?

Examples:

```text
int       → 0
double    → 0.0
boolean   → false
char      → '\u0000'
reference → null
```

---

## Q6. Is an array an object in Java?

Yes.

Arrays are objects, including arrays of primitive types.

---

## Q7. What is the difference between `array.length` and `String.length()`?

For an array:

```java
array.length
```

is a field.

For a String:

```java
string.length()
```

is a method.

---

## Q8. What happens when you access an invalid array index?

Java throws an array-index exception, commonly:

```text
ArrayIndexOutOfBoundsException
```

for an invalid integer index.

---

## Q9. Can an array store different primitive types?

No.

An array has a specific component type.

---

## Q10. Can an array store objects?

Yes.

Example:

```java
Student[] students;
```

---

## Q11. Does `new Student[5]` create five Student objects?

No.

It creates an array containing five `Student` references, initially `null`.

---

## Q12. How do you compare array contents?

For one-dimensional arrays:

```java
Arrays.equals(a, b)
```

For nested arrays:

```java
Arrays.deepEquals(a, b)
```

---

## Q13. What does `a == b` mean for arrays?

It checks whether `a` and `b` refer to the same array object.

---

## Q14. How do you copy an array?

Examples:

```java
Arrays.copyOf()
```

```java
System.arraycopy()
```

```java
array.clone()
```

---

## Q15. Are Java multidimensional arrays true rectangular matrices?

Not necessarily.

A declaration such as:

```java
int[][]
```

represents an array of arrays, so rows can have different lengths.

---

## Q16. What is a jagged array?

A multidimensional array whose nested arrays can have different lengths.

---

## Q17. Can arrays contain `null`?

Reference-type arrays can contain `null`.

Primitive arrays cannot contain `null`.

---

## Q18. What is array covariance?

Java allows an array of a subtype to be assigned to an array reference of a supertype.

Example:

```java
Dog[] dogs = new Dog[3];
Animal[] animals = dogs;
```

An incompatible store can then cause `ArrayStoreException`.

---

## Q19. What is the difference between array assignment and copying?

```java
b = a;
```

copies the reference.

```java
b = Arrays.copyOf(a, a.length);
```

creates a separate array.

---

## Q20. Why use ArrayList instead of arrays?

When you need convenient dynamic resizing and collection operations.

---

# 164. Interview Output Questions

### Question 1

```java
int[] a = {10, 20, 30};

System.out.println(a[1]);
```

Output:

```text
20
```

---

### Question 2

```java
int[] a = new int[3];

System.out.println(a[0]);
```

Output:

```text
0
```

---

### Question 3

```java
int[] a = {10, 20, 30};

System.out.println(a.length);
```

Output:

```text
3
```

---

### Question 4

```java
int[] a = {10, 20, 30};

a[1] = 100;

System.out.println(Arrays.toString(a));
```

Output:

```text
[10, 100, 30]
```

---

### Question 5

```java
int[] a = {1, 2, 3};

int[] b = a;

b[0] = 99;

System.out.println(a[0]);
```

Output:

```text
99
```

Both variables refer to the same array.

---

### Question 6

```java
int[] a = {1, 2, 3};

int[] b = Arrays.copyOf(a, a.length);

b[0] = 99;

System.out.println(a[0]);
```

Output:

```text
1
```

The arrays are separate.

---

### Question 7

```java
int[] a = {5, 10, 15};

for (int x : a) {
    System.out.print(x + " ");
}
```

Output:

```text
5 10 15
```

---

### Question 8

```java
int[] a = {1, 2, 3, 4};

int sum = 0;

for (int x : a) {
    sum += x;
}

System.out.println(sum);
```

Output:

```text
10
```

---

### Question 9

```java
int[][] matrix = {
    {1, 2},
    {3, 4}
};

System.out.println(matrix[1][0]);
```

Output:

```text
3
```

---

### Question 10

```java
int[][] matrix = new int[2][3];

System.out.println(matrix.length);
System.out.println(matrix[0].length);
```

Output:

```text
2
3
```

---

# 165. Practice Problems — Level 1

Solve these without looking at the solution first.

1. Create an integer array of 5 values.
2. Print all elements.
3. Print elements in reverse order.
4. Find the sum.
5. Find the average.
6. Find the maximum.
7. Find the minimum.
8. Count even numbers.
9. Count odd numbers.
10. Count positive numbers.
11. Count negative numbers.
12. Count zeros.
13. Search for a target.
14. Find the first occurrence.
15. Find the last occurrence.
16. Copy an array.
17. Reverse an array.
18. Check whether an array is sorted.

---

# 166. Practice Problems — Level 2

1. Find the second-largest distinct element.
2. Find the second-smallest distinct element.
3. Count occurrences of a target.
4. Remove an element at a given index.
5. Insert an element at a given index.
6. Rotate left by one.
7. Rotate right by one.
8. Rotate left by `k`.
9. Rotate right by `k`.
10. Merge two arrays.
11. Find common elements.
12. Find duplicate elements.
13. Find missing number from `1..n`.
14. Move all zeros to the end.
15. Separate even and odd values.
16. Reverse only a selected range.
17. Find the maximum subarray sum.
18. Build a frequency table.
19. Build a prefix-sum array.
20. Solve a two-sum problem.

---

# 167. Practice Problems — 2D Arrays

1. Print a matrix.
2. Find matrix sum.
3. Find each row sum.
4. Find each column sum.
5. Find the main diagonal.
6. Find the secondary diagonal.
7. Find diagonal sum.
8. Transpose a matrix.
9. Add two matrices.
10. Subtract two matrices.
11. Multiply two matrices.
12. Search for a value.
13. Find maximum element.
14. Count even values.
15. Print a matrix in spiral order.
16. Rotate a square matrix.
17. Check whether a matrix is symmetric.

---

# 168. Mini Project — Student Marks Analyzer

Create a program that stores marks for students.

For example:

```text
Student 1 → 80 85 90
Student 2 → 70 75 82
Student 3 → 90 95 88
```

Use arrays to calculate:

```text
total marks
average
highest mark
lowest mark
class average
number of passing students
```

Use methods to keep each calculation separate.

---

# 169. Mini Project — Simple Statistics Tool

Input an array and display:

```text
Number of elements
Sum
Average
Minimum
Maximum
Range
Even count
Odd count
Positive count
Negative count
```

This is excellent practice for combining:

```text
arrays
loops
conditions
methods
input
```

---

# 170. Mini Project — Matrix Calculator

Create a menu:

```text
1. Print matrix
2. Matrix sum
3. Transpose
4. Row sum
5. Column sum
6. Diagonal sum
7. Search
8. Exit
```

This will prepare you for more advanced data structures and algorithms.

---

# 171. Array Cheat Sheet

Declaration:

```java
int[] numbers;
```

Creation:

```java
numbers = new int[5];
```

Declaration + creation:

```java
int[] numbers = new int[5];
```

Initialization:

```java
int[] numbers = {10, 20, 30};
```

Access:

```java
numbers[0]
```

Update:

```java
numbers[0] = 100;
```

Length:

```java
numbers.length
```

Loop:

```java
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

Print:

```java
Arrays.toString(numbers)
```

Sort:

```java
Arrays.sort(numbers)
```

Compare:

```java
Arrays.equals(a, b)
```

Copy:

```java
Arrays.copyOf(a, a.length)
```

---

# 172. Important Rules to Remember

Remember these rules:

```text
1. Array indexing starts at 0.

2. Last index = length - 1.

3. Array length is fixed.

4. Use array.length, not array.length().

5. Arrays are objects.

6. Primitive arrays contain primitive values.

7. Reference arrays contain references.

8. new Student[5] does not create five Student objects.

9. a = b copies a reference, not array contents.

10. Arrays.copyOf() creates a separate array.

11. == compares array references.

12. Arrays.equals() compares one-dimensional contents.

13. Multidimensional arrays are arrays of arrays.

14. Rows of a jagged array can have different lengths.

15. Enhanced for is convenient for reading elements.

16. Use an indexed loop when you need to modify by position.

17. Empty arrays require special handling for operations like maximum/minimum.

18. Binary search requires sorted data according to the required ordering.
```

---

# 173. Final Mental Model

Think of an array as:

```text
ONE VARIABLE
     │
     ▼
┌───────────────────────────────┐
│       ARRAY OBJECT            │
│                               │
│ index 0 → element             │
│ index 1 → element             │
│ index 2 → element             │
│ ...                           │
│ index n-1 → element           │
└───────────────────────────────┘
```

The array gives you:

```text
one reference
+
fixed number of elements
+
same component type
+
indexed access
```

The combination of:

```text
Arrays + Loops + Methods
```

is one of the most important foundations of programming.

---

# 174. Chapter Summary

In this chapter you learned:

```text
✓ What an array is
✓ Why arrays are useful
✓ Array declaration
✓ Array creation
✓ Array initialization
✓ Array indexes
✓ Array length
✓ Default values
✓ Reading elements
✓ Updating elements
✓ Traversing arrays
✓ Enhanced for loop
✓ Array input
✓ Sum
✓ Average
✓ Maximum
✓ Minimum
✓ Searching
✓ Linear search
✓ Binary search
✓ Reversing
✓ Copying
✓ Arrays.copyOf()
✓ System.arraycopy()
✓ clone()
✓ Arrays.toString()
✓ Arrays.equals()
✓ Arrays.sort()
✓ Arrays.fill()
✓ Arrays.binarySearch()
✓ Arrays of objects
✓ null references
✓ Passing arrays to methods
✓ Returning arrays
✓ 2D arrays
✓ Jagged arrays
✓ 3D arrays
✓ Matrix operations
✓ Array covariance
✓ ArrayStoreException
✓ Time complexity
✓ Space complexity
✓ Array vs ArrayList
✓ Common mistakes
✓ Practical programs
✓ DSA techniques
✓ Interview questions
✓ Practice problems
```

---

# 175. Connection to the Next Chapters

You now have:

```text
Variables
    ↓
Operators
    ↓
Conditions
    ↓
Loops
    ↓
Methods
    ↓
Arrays
```

The next major step is:

```text
Strings
```

Strings are extremely important because real applications constantly process text:

```text
names
emails
passwords
URLs
JSON
files
commands
messages
user input
```

You will learn:

```text
String creation
String literals
String immutability
String pool
String methods
charAt()
length()
substring()
equals()
equalsIgnoreCase()
compareTo()
contains()
startsWith()
endsWith()
indexOf()
replace()
split()
trim()
strip()
StringBuilder
StringBuffer
text processing
String vs char[]
common mistakes
interview questions
```

After Chapter 10, the course enters the most important section:

```text
⭐ OOP FUNDAMENTALS
⭐ CLASSES & OBJECTS
⭐ CONSTRUCTORS
⭐ THIS & STATIC
⭐ ENCAPSULATION
⭐ INHERITANCE
⭐ OVERLOADING
⭐ OVERRIDING
⭐ POLYMORPHISM
⭐ ABSTRACTION
⭐ INTERFACES
⭐ OOP RELATIONSHIPS
⭐ OOP DESIGN
```

That is where Java starts becoming much more than basic syntax.
