# Chapter 10 — Strings in Java

> **Java Master Course — Chapter 10 of 50**
>
> Strings are one of the most important parts of Java. Almost every real application works with text: names, messages, passwords, emails, URLs, file paths, JSON, commands, database values, and user input.
>
> This chapter starts from the absolute basics and goes deep into String creation, indexing, comparison, searching, extraction, replacement, splitting, whitespace, immutability, the String Pool, memory/reference behavior, `char[]`, `StringBuilder`, `StringBuffer`, text processing, Unicode basics, common mistakes, practical programs, exercises, and interview questions.

---

# 1. What Is a String?

A String is a sequence of characters.

Examples:

```text
"Java"
"Hello World"
"Akshit"
"12345"
"Java is powerful"
```

In Java:

```java
String name = "Aman";
```

The variable `name` refers to a String object containing text.

---

# 2. Why Are Strings Important?

Strings are everywhere in programming.

Examples:

```text
Username
Password
Email
Phone number
Address
URL
File name
Error message
Chat message
JSON
HTML
SQL query
Log message
Command
```

For example:

```java
String username = "student123";
String email = "student@example.com";
```

---

# 3. Creating a String

The simplest way:

```java
String name = "Java";
```

You can also use:

```java
String name = new String("Java");
```

Both produce a String value, but they interact differently with the String Pool and object creation.

The literal form is preferred in normal code.

---

# 4. String Is a Class

Unlike primitive types such as:

```java
int
double
char
boolean
```

`String` is a class.

It belongs to:

```java
java.lang
```

Because `java.lang` is automatically imported, you can write:

```java
String name;
```

without:

```java
import java.lang.String;
```

---

# 5. String Is a Reference Type

Consider:

```java
String name = "Java";
```

The variable:

```text
name
```

holds a reference to a String object.

This is different from:

```java
int age = 20;
```

where `age` directly stores a primitive value.

---

# 6. String Literals

A String literal is text written inside double quotes:

```java
"Hello"
"Java"
"Hello World"
"123"
""
```

Example:

```java
String language = "Java";
```

The quotes are part of Java source-code syntax. They are not normally part of the String's content.

---

# 7. Empty String

This is a valid String:

```java
String text = "";
```

Its length is:

```java
text.length()
```

which returns:

```text
0
```

An empty String is not the same thing as `null`.

---

# 8. Empty String vs `null`

Empty String:

```java
String a = "";
```

means:

```text
a refers to a String containing zero characters.
```

Null:

```java
String b = null;
```

means:

```text
b does not currently refer to a String object.
```

Therefore:

```java
a.length()
```

works.

But:

```java
b.length()
```

throws:

```text
NullPointerException
```

---

# 9. String Length

Use:

```java
length()
```

Example:

```java
String text = "Java";

System.out.println(text.length());
```

Output:

```text
4
```

Important:

For arrays:

```java
array.length
```

For Strings:

```java
string.length()
```

---

# 10. String Indexing

String positions are zero-based.

For:

```java
String text = "Java";
```

conceptually:

```text
Character    Index

J              0
a              1
v              2
a              3
```

---

# 11. `charAt()`

Use:

```java
charAt(index)
```

to get the UTF-16 code unit at a particular index.

Example:

```java
String text = "Java";

System.out.println(text.charAt(0));
System.out.println(text.charAt(2));
```

Output:

```text
J
v
```

---

# 12. `charAt()` Uses Zero-Based Indexing

```java
String text = "Java";
```

Valid indexes:

```text
0
1
2
3
```

This is invalid:

```java
text.charAt(4);
```

It causes:

```text
StringIndexOutOfBoundsException
```

---

# 13. Last Character

Use:

```java
text.charAt(text.length() - 1)
```

Example:

```java
String text = "Java";

System.out.println(text.charAt(text.length() - 1));
```

Output:

```text
a
```

---

# 14. Traversing a String

Using a traditional loop:

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

# 15. Traversing a String with `toCharArray()`

You can convert the String into a character array:

```java
String text = "Java";

for (char ch : text.toCharArray()) {
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

The returned `char[]` is a separate mutable array.

---

# 16. String Immutability

One of the most important String concepts is:

> **String objects are immutable.**

Immutable means that once a particular String object has been created, its character content cannot be changed.

Example:

```java
String text = "Java";

text.concat(" Programming");

System.out.println(text);
```

Output:

```text
Java
```

Why?

Because `concat()` creates/returns another String value. It does not modify the existing String object.

---

# 17. Correct Way to Store the Result

```java
String text = "Java";

text = text.concat(" Programming");

System.out.println(text);
```

Output:

```text
Java Programming
```

The variable is reassigned to the returned String.

The original String object itself was not mutated.

---

# 18. Another Immutability Example

```java
String text = "Hello";

text.toUpperCase();

System.out.println(text);
```

Output:

```text
Hello
```

Correct:

```java
text = text.toUpperCase();
```

Now:

```text
HELLO
```

---

# 19. Why Is String Immutable?

String immutability provides several benefits.

It helps with:

```text
security
thread safety
String Pool sharing
predictability
hash-code caching
safe use as map keys
```

Because String contents cannot change after construction, a String can safely be shared between different parts of a program.

---

# 20. String Pool

Java has a special mechanism commonly called the:

```text
String Pool
```

String literals can be interned so equal literal values can share the same pooled String object.

Example:

```java
String a = "Java";
String b = "Java";
```

The two variables can refer to the same pooled String object.

Conceptually:

```text
a ─────┐
       │
       ▼
    "Java"
       ▲
       │
b ─────┘
```

---

# 21. String Pool and `==`

Consider:

```java
String a = "Java";
String b = "Java";

System.out.println(a == b);
```

Output:

```text
true
```

Because both literals can refer to the same pooled String object.

Do not generalize this into "Strings should always be compared using `==`." That is incorrect.

---

# 22. `new String()` and Pooling

Consider:

```java
String a = "Java";
String b = new String("Java");

System.out.println(a == b);
```

Output:

```text
false
```

`new String("Java")` explicitly creates a distinct String object.

The String literal `"Java"` may refer to the pooled object, while `b` refers to a separate object.

---

# 23. Correct String Comparison

Use:

```java
equals()
```

for content comparison.

Example:

```java
String a = "Java";
String b = new String("Java");

System.out.println(a.equals(b));
```

Output:

```text
true
```

---

# 24. `==` vs `equals()`

This is one of the most important String interview questions.

`==`:

```text
compares references
```

`equals()`:

```text
compares String content
```

Example:

```java
String a = new String("Java");
String b = new String("Java");

System.out.println(a == b);
System.out.println(a.equals(b));
```

Output:

```text
false
true
```

---

# 25. Why `==` Sometimes Appears to Work

This:

```java
String a = "Java";
String b = "Java";

System.out.println(a == b);
```

may print:

```text
true
```

because both references can point to the same pooled literal.

But:

```java
String a = new String("Java");
String b = new String("Java");
```

usually gives:

```text
a == b → false
```

The correct rule is:

```text
Use == for reference identity.
Use equals() for String content.
```

---

# 26. `equals()`

Example:

```java
String a = "Hello";
String b = "Hello";

System.out.println(a.equals(b));
```

Output:

```text
true
```

It checks whether the Strings have equal contents.

---

# 27. `equalsIgnoreCase()`

Use:

```java
equalsIgnoreCase()
```

when case differences should be ignored.

Example:

```java
String a = "Java";
String b = "java";

System.out.println(a.equalsIgnoreCase(b));
```

Output:

```text
true
```

---

# 28. `compareTo()`

`compareTo()` compares Strings lexicographically.

Example:

```java
String a = "apple";
String b = "banana";

System.out.println(a.compareTo(b));
```

Because `"apple"` comes before `"banana"` lexicographically, the result is negative.

The exact negative integer should not normally be relied upon. What matters is:

```text
negative → a comes before b
zero     → equal according to compareTo
positive → a comes after b
```

---

# 29. `compareToIgnoreCase()`

```java
String a = "Java";
String b = "java";

System.out.println(a.compareToIgnoreCase(b));
```

Result:

```text
0
```

for these values.

---

# 30. String Concatenation

You can combine Strings using:

```java
+
```

Example:

```java
String firstName = "Aman";
String lastName = "Sharma";

String fullName = firstName + " " + lastName;

System.out.println(fullName);
```

Output:

```text
Aman Sharma
```

---

# 31. String Concatenation with Numbers

```java
int age = 20;

String message = "Age = " + age;

System.out.println(message);
```

Output:

```text
Age = 20
```

The numeric value is converted to a String representation as part of concatenation.

---

# 32. Evaluation Order Matters

Consider:

```java
System.out.println(10 + 20 + " Java");
```

Output:

```text
30 Java
```

Because:

```text
10 + 20
```

is evaluated first.

Now:

```java
System.out.println("Java " + 10 + 20);
```

Output:

```text
Java 1020
```

Once String concatenation is involved, later `+` operations concatenate values as text.

---

# 33. Parentheses Can Change the Result

```java
System.out.println("Total = " + (10 + 20));
```

Output:

```text
Total = 30
```

Without parentheses:

```java
System.out.println("Total = " + 10 + 20);
```

Output:

```text
Total = 1020
```

---

# 34. `concat()`

You can concatenate Strings using:

```java
concat()
```

Example:

```java
String a = "Hello";

String b = a.concat(" World");

System.out.println(b);
```

Output:

```text
Hello World
```

Like other String operations, it returns a String rather than modifying the original.

---

# 35. `+` vs `concat()`

Using `+`:

```java
String result = "Hello " + "World";
```

Using `concat()`:

```java
String result = "Hello ".concat("World");
```

For general application code, `+` is usually the simpler choice for ordinary concatenation.

For repeated concatenation in loops, `StringBuilder` is often more appropriate.

---

# 36. `substring()`

Use:

```java
substring(beginIndex)
```

to get part of a String from the given index to the end.

Example:

```java
String text = "JavaProgramming";

System.out.println(text.substring(4));
```

Output:

```text
Programming
```

---

# 37. `substring(begin, end)`

Example:

```java
String text = "JavaProgramming";

System.out.println(text.substring(0, 4));
```

Output:

```text
Java
```

The rules are:

```text
begin index → inclusive
end index   → exclusive
```

---

# 38. Another `substring()` Example

```java
String text = "Hello World";

System.out.println(text.substring(0, 5));
```

Output:

```text
Hello
```

Index 5 is not included.

---

# 39. `indexOf()`

Find the first occurrence of a character:

```java
String text = "banana";

System.out.println(text.indexOf('a'));
```

Output:

```text
1
```

---

# 40. `indexOf(String)`

```java
String text = "Java Programming";

System.out.println(text.indexOf("Programming"));
```

Output:

```text
5
```

---

# 41. `lastIndexOf()`

Find the last occurrence.

```java
String text = "banana";

System.out.println(text.lastIndexOf('a'));
```

Output:

```text
5
```

---

# 42. `indexOf()` When Not Found

```java
String text = "Java";

System.out.println(text.indexOf('z'));
```

Output:

```text
-1
```

So:

```text
-1
```

commonly means the searched value was not found.

---

# 43. `contains()`

Example:

```java
String text = "Java Programming";

System.out.println(text.contains("Java"));
System.out.println(text.contains("Python"));
```

Output:

```text
true
false
```

---

# 44. `startsWith()`

```java
String text = "Java Programming";

System.out.println(text.startsWith("Java"));
```

Output:

```text
true
```

---

# 45. `endsWith()`

```java
String text = "Java Programming";

System.out.println(text.endsWith("Programming"));
```

Output:

```text
true
```

---

# 46. Checking a File Extension

Example:

```java
String fileName = "notes.pdf";

if (fileName.endsWith(".pdf")) {
    System.out.println("PDF file");
}
```

Output:

```text
PDF file
```

For security-sensitive file validation, do not rely only on filename extensions.

---

# 47. `toUpperCase()`

```java
String text = "java";

System.out.println(text.toUpperCase());
```

Output:

```text
JAVA
```

It returns a new String value.

---

# 48. `toLowerCase()`

```java
String text = "JAVA";

System.out.println(text.toLowerCase());
```

Output:

```text
java
```

---

# 49. Locale and Case Conversion

For normal user-facing text, case conversion can be locale-sensitive.

If you are implementing protocol or machine-oriented logic where a stable locale is required, consider an explicit locale.

Example:

```java
text.toLowerCase(Locale.ROOT);
```

This becomes important when processing data that should not depend on the user's language settings.

---

# 50. `trim()`

`trim()` removes leading and trailing characters whose code values are at most U+0020.

Example:

```java
String text = "   Java   ";

System.out.println(text.trim());
```

Output:

```text
Java
```

It does not remove every possible Unicode whitespace character.

---

# 51. `strip()`

Modern Java provides:

```java
strip()
```

which is Unicode-aware with respect to Java's definition of whitespace.

Example:

```java
String text = "   Java   ";

System.out.println(text.strip());
```

Output:

```text
Java
```

For modern Java code, `strip()` is often preferable when Unicode whitespace matters.

---

# 52. `stripLeading()`

```java
String text = "   Java   ";

System.out.println(text.stripLeading());
```

Result conceptually:

```text
Java   
```

Only leading whitespace is removed.

---

# 53. `stripTrailing()`

```java
String text = "   Java   ";

System.out.println(text.stripTrailing());
```

Only trailing whitespace is removed.

---

# 54. `isEmpty()`

Checks whether length is zero.

```java
String text = "";

System.out.println(text.isEmpty());
```

Output:

```text
true
```

---

# 55. `isBlank()`

Checks whether the String is empty or contains only Unicode whitespace according to Java's `isWhitespace` behavior.

Example:

```java
String text = "   ";

System.out.println(text.isBlank());
```

Output:

```text
true
```

Difference:

```text
isEmpty() → checks length == 0
isBlank() → checks empty or whitespace-only
```

---

# 56. `replace()`

Replace characters:

```java
String text = "banana";

String result = text.replace('a', 'o');

System.out.println(result);
```

Output:

```text
bonono
```

---

# 57. `replace(CharSequence, CharSequence)`

Example:

```java
String text = "I like Java";

String result = text.replace("Java", "Python");

System.out.println(result);
```

Output:

```text
I like Python
```

---

# 58. `replaceAll()`

`replaceAll()` uses a regular expression.

Example:

```java
String text = "Java123";

String result = text.replaceAll("\\d", "#");

System.out.println(result);
```

Output:

```text
Java###
```

Here:

```text
\\d
```

represents the regex digit class after Java string escaping is processed.

---

# 59. `replaceFirst()`

```java
String text = "one one one";

String result = text.replaceFirst("one", "two");

System.out.println(result);
```

Output:

```text
two one one
```

It replaces only the first regex match.

---

# 60. `replace()` vs `replaceAll()`

Important difference:

```text
replace()
→ literal replacement

replaceAll()
→ regular-expression replacement

replaceFirst()
→ first regular-expression match
```

For simple text replacement, `replace()` is often the better choice.

---

# 61. Splitting a String

Use:

```java
split()
```

Example:

```java
String text = "Java Python C++";

String[] languages = text.split(" ");
```

Now:

```text
languages[0] = "Java"
languages[1] = "Python"
languages[2] = "C++"
```

---

# 62. Split by Comma

```java
String text = "Java,Python,C++";

String[] languages = text.split(",");
```

Result:

```text
Java
Python
C++
```

---

# 63. `split()` Uses Regular Expressions

The argument to:

```java
split()
```

is a regular expression.

This matters for special regex characters.

For example, to split on a literal dot:

```java
String[] parts = text.split("\\.");
```

because `.` has special meaning in regex.

---

# 64. Splitting on Whitespace

A common pattern:

```java
String text = "Java   is   powerful";

String[] words = text.trim().split("\\s+");
```

The regex:

```text
\\s+
```

means one or more whitespace characters according to the regex engine.

---

# 65. Important `split()` Limitation

For parsing complex data, blindly using:

```java
split(",")
```

is not a complete CSV parser.

Real CSV data may contain:

```text
commas inside quoted fields
escaped quotes
newlines inside fields
```

For real CSV processing, use a proper CSV parser.

---

# 66. `String.join()`

You can join Strings:

```java
String result = String.join(", ", "Java", "Python", "C++");

System.out.println(result);
```

Output:

```text
Java, Python, C++
```

---

# 67. Joining an Array

```java
String[] languages = {"Java", "Python", "C++"};

String result = String.join(" | ", languages);

System.out.println(result);
```

Output:

```text
Java | Python | C++
```

---

# 68. `toString()`

Calling:

```java
text.toString()
```

on a String returns the String itself.

Example:

```java
String text = "Java";

System.out.println(text.toString());
```

Output:

```text
Java
```

This is generally not necessary because a String is already a String.

---

# 69. `String.valueOf()`

Use:

```java
String.valueOf(value)
```

to convert many values to String form.

Example:

```java
int number = 100;

String text = String.valueOf(number);

System.out.println(text);
```

Output:

```text
100
```

---

# 70. `String.valueOf(null)`

Be careful about overloads and types.

For an object reference:

```java
Object value = null;

System.out.println(String.valueOf(value));
```

prints:

```text
null
```

This differs from calling a method on the null reference:

```java
value.toString();
```

which would throw `NullPointerException`.

---

# 71. String and `char[]`

You can create a String from a character array:

```java
char[] chars = {'J', 'a', 'v', 'a'};

String text = new String(chars);

System.out.println(text);
```

Output:

```text
Java
```

---

# 72. Convert String to `char[]`

```java
String text = "Java";

char[] chars = text.toCharArray();
```

Now:

```text
chars = ['J', 'a', 'v', 'a']
```

The array can be modified independently.

---

# 73. String Is Immutable, `char[]` Is Mutable

String:

```java
String text = "Java";
```

You cannot modify a character inside the existing String object.

But:

```java
char[] chars = {'J', 'a', 'v', 'a'};
chars[0] = 'K';
```

changes the array to:

```text
Kava
```

This distinction is important.

---

# 74. `StringBuilder`

Suppose you repeatedly concatenate inside a loop:

```java
String result = "";

for (int i = 0; i < 1000; i++) {
    result += i;
}
```

This can create many intermediate String objects because Strings are immutable.

For repeated construction, use:

```java
StringBuilder
```

---

# 75. Basic `StringBuilder`

```java
StringBuilder builder = new StringBuilder();

builder.append("Java");
builder.append(" ");
builder.append("Programming");

String result = builder.toString();

System.out.println(result);
```

Output:

```text
Java Programming
```

---

# 76. Why `StringBuilder`?

`StringBuilder` is mutable.

You can repeatedly change its internal character sequence without creating a new String object for every append operation.

This makes it useful for building text efficiently.

---

# 77. `append()`

```java
StringBuilder builder = new StringBuilder();

builder.append("Hello");
builder.append(" ");
builder.append("World");
```

Result:

```text
Hello World
```

---

# 78. `insert()`

```java
StringBuilder builder = new StringBuilder("Java");

builder.insert(4, " Programming");

System.out.println(builder);
```

Output:

```text
Java Programming
```

---

# 79. `delete()`

```java
StringBuilder builder = new StringBuilder("Java Programming");

builder.delete(4, 15);

System.out.println(builder);
```

The exact range is:

```text
begin inclusive
end exclusive
```

---

# 80. `deleteCharAt()`

```java
StringBuilder builder = new StringBuilder("Java");

builder.deleteCharAt(1);

System.out.println(builder);
```

Output:

```text
Jva
```

---

# 81. `setCharAt()`

```java
StringBuilder builder = new StringBuilder("Java");

builder.setCharAt(0, 'K');

System.out.println(builder);
```

Output:

```text
Kava
```

Unlike String, StringBuilder allows character mutation.

---

# 82. `reverse()`

```java
StringBuilder builder = new StringBuilder("Java");

builder.reverse();

System.out.println(builder);
```

Output:

```text
avaJ
```

---

# 83. StringBuilder Capacity

A `StringBuilder` has:

```text
length
capacity
```

The capacity is the amount of storage available before it needs to expand its internal buffer.

Example:

```java
StringBuilder builder = new StringBuilder();

System.out.println(builder.length());
System.out.println(builder.capacity());
```

The default capacity is implementation-specified by the API behavior; for the standard Java implementation, the no-argument constructor starts with a capacity of 16 characters.

You can also provide an initial capacity:

```java
StringBuilder builder = new StringBuilder(100);
```

---

# 84. `StringBuilder` vs `String`

String:

```text
immutable
```

StringBuilder:

```text
mutable
```

Use String for normal text values.

Use StringBuilder when repeatedly constructing or modifying text, especially in loops.

---

# 85. `StringBuffer`

`StringBuffer` is another mutable character sequence.

Example:

```java
StringBuffer buffer = new StringBuffer();

buffer.append("Java");
buffer.append(" Programming");

System.out.println(buffer);
```

Output:

```text
Java Programming
```

---

# 86. StringBuilder vs StringBuffer

Both are mutable.

A traditional distinction is:

```text
StringBuilder → generally preferred for single-threaded/local construction
StringBuffer  → synchronized legacy mutable sequence
```

`StringBuilder` is usually the first choice unless you specifically need the synchronization semantics of `StringBuffer`.

Modern concurrency design should not assume that synchronization automatically makes an entire multi-step application operation thread-safe.

---

# 87. StringBuilder in a Loop

Good pattern:

```java
StringBuilder result = new StringBuilder();

for (int i = 1; i <= 5; i++) {
    result.append(i).append(" ");
}

System.out.println(result);
```

Output:

```text
1 2 3 4 5
```

---

# 88. Reversing a String

Simple solution:

```java
String text = "Java";

String reversed = new StringBuilder(text)
        .reverse()
        .toString();

System.out.println(reversed);
```

Output:

```text
avaJ
```

---

# 89. Reverse Using a Loop

```java
String text = "Java";

StringBuilder reversed = new StringBuilder();

for (int i = text.length() - 1; i >= 0; i--) {
    reversed.append(text.charAt(i));
}

System.out.println(reversed);
```

Output:

```text
avaJ
```

This works in terms of UTF-16 code units. It is not necessarily correct for reversing arbitrary Unicode text by user-perceived characters.

---

# 90. Check Palindrome

A palindrome reads the same in the chosen comparison sense.

Example:

```text
madam
level
radar
```

Simple ASCII-style solution:

```java
static boolean isPalindrome(String text) {
    int left = 0;
    int right = text.length() - 1;

    while (left < right) {
        if (text.charAt(left) != text.charAt(right)) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}
```

---

# 91. Palindrome Example

```java
System.out.println(isPalindrome("madam"));
```

Output:

```text
true
```

And:

```java
System.out.println(isPalindrome("hello"));
```

Output:

```text
false
```

For full Unicode text, be careful about what "character" means.

---

# 92. Count Characters

```java
static int countChar(String text, char target) {
    int count = 0;

    for (int i = 0; i < text.length(); i++) {
        if (text.charAt(i) == target) {
            count++;
        }
    }

    return count;
}
```

Example:

```java
System.out.println(countChar("banana", 'a'));
```

Output:

```text
3
```

---

# 93. Count Vowels

```java
static int countVowels(String text) {
    int count = 0;

    for (int i = 0; i < text.length(); i++) {
        char ch = Character.toLowerCase(text.charAt(i));

        if (ch == 'a' ||
            ch == 'e' ||
            ch == 'i' ||
            ch == 'o' ||
            ch == 'u') {
            count++;
        }
    }

    return count;
}
```

This is a simple English-vowel example, not a complete linguistic definition of vowels across all languages.

---

# 94. Count Words

A simple whitespace-based approach:

```java
static int countWords(String text) {
    String trimmed = text.trim();

    if (trimmed.isEmpty()) {
        return 0;
    }

    return trimmed.split("\\s+").length;
}
```

Example:

```java
System.out.println(countWords("Java is easy"));
```

Output:

```text
3
```

For sophisticated text processing, use a parser or tokenizer appropriate to the language/data.

---

# 95. Remove Spaces

```java
String text = "Java is powerful";

String result = text.replace(" ", "");

System.out.println(result);
```

Output:

```text
Javaispowerful
```

If you want to remove all regex-defined whitespace:

```java
String result = text.replaceAll("\\s+", "");
```

Remember that `replaceAll()` uses regex.

---

# 96. Normalize Simple User Input

Example:

```java
String input = "   Java   ";

String normalized = input.strip().toLowerCase();

System.out.println(normalized);
```

Output:

```text
java
```

For locale-independent machine identifiers:

```java
String normalized = input.strip().toLowerCase(Locale.ROOT);
```

---

# 97. Compare User Input Safely

Avoid:

```java
if (input == "yes") {
}
```

Use:

```java
if ("yes".equals(input)) {
}
```

This style also avoids a NullPointerException if `input` is null.

---

# 98. Null-Safe String Comparison

Suppose:

```java
String input = null;
```

This can fail:

```java
input.equals("yes");
```

because `input` is null.

This is safe:

```java
"yes".equals(input)
```

It returns:

```text
false
```

---

# 99. `Objects.equals()`

Another null-safe option:

```java
import java.util.Objects;

Objects.equals(a, b);
```

Example:

```java
String a = null;
String b = "Java";

System.out.println(Objects.equals(a, b));
```

Output:

```text
false
```

If both are null:

```java
Objects.equals(null, null)
```

returns:

```text
true
```

---

# 100. String Hash Code

Strings override:

```java
hashCode()
```

based on their contents.

Example:

```java
String a = "Java";
String b = new String("Java");

System.out.println(a.equals(b));
System.out.println(a.hashCode() == b.hashCode());
```

Output:

```text
true
true
```

This is important when Strings are used as keys in hash-based collections.

---

# 101. Why String Works Well as a Map Key

String is immutable.

Suppose:

```java
Map<String, Integer> marks = new HashMap<>();
```

You can use:

```java
marks.put("Aman", 90);
```

Because the String key cannot change its content after being used as a key.

Collections will be studied later.

---

# 102. String and Memory

Consider:

```java
String a = "Java";
String b = "Java";
```

Equal literals can share a pooled object.

Now:

```java
String c = new String("Java");
```

creates a distinct object.

Conceptually:

```text
String Pool:

       ┌─────────────┐
a ────►│   "Java"    │
b ────►│             │
       └─────────────┘


Separate object:

c ────►┌─────────────┐
       │   "Java"    │
       └─────────────┘
```

The exact JVM implementation and optimization details can be more sophisticated, but this is the useful conceptual model.

---

# 103. `intern()`

You can request the canonical pooled representation using:

```java
intern()
```

Example:

```java
String a = new String("Java");
String b = a.intern();

System.out.println(b == "Java");
```

Output:

```text
true
```

Use interning deliberately. It is not a general-purpose replacement for `equals()`.

---

# 104. Compile-Time Constant Strings

Example:

```java
String a = "Ja" + "va";
String b = "Java";

System.out.println(a == b);
```

This can print:

```text
true
```

because the compiler can evaluate constant string expressions at compile time and the resulting literal can be interned.

Do not use this behavior as a substitute for content comparison.

---

# 105. Runtime Concatenation

Consider:

```java
String x = "Ja";
String a = x + "va";
String b = "Java";

System.out.println(a.equals(b));
System.out.println(a == b);
```

The content comparison is:

```text
true
```

But reference identity is not something you should rely on here.

Use:

```java
equals()
```

for the actual requirement.

---

# 106. Escape Sequences in Strings

Java supports escape sequences.

Examples:

```java
"\n"   → newline
"\t"   → tab
"\""   → double quote
"\\"   → backslash
"\r"   → carriage return
```

Example:

```java
System.out.println("Hello\nWorld");
```

Output:

```text
Hello
World
```

---

# 107. Double Quote Inside a String

This is invalid:

```java
String text = "He said "Hello"";
```

Correct:

```java
String text = "He said \"Hello\"";
```

Output:

```text
He said "Hello"
```

---

# 108. Backslash Inside a String

To store a backslash:

```java
String path = "C:\\Users\\Student";
```

Output representation:

```text
C:\Users\Student
```

The source code needs two backslashes to represent one backslash character.

---

# 109. Text Blocks

Modern Java provides text blocks using:

```java
"""
...
"""
```

Example:

```java
String message = """
        Hello
        Java
        World
        """;

System.out.println(message);
```

Text blocks are useful for multiline text such as:

```text
JSON
SQL
HTML
configuration
templates
```

---

# 110. Text Block Example

```java
String json = """
        {
          "name": "Aman",
          "language": "Java"
        }
        """;

System.out.println(json);
```

This makes multiline text much easier to read than a large collection of escape sequences.

---

# 111. String and Unicode

Java Strings represent text using UTF-16 code units.

This is an important technical detail.

A Java `char` is:

```text
16-bit UTF-16 code unit
```

It is not guaranteed to represent one complete Unicode code point.

Most basic Latin characters fit in one `char`.

Some Unicode characters require a surrogate pair, meaning two UTF-16 code units.

---

# 112. Why `length()` Can Surprise You

For:

```java
String text = "A";
```

length is:

```text
1
```

But some Unicode code points outside the Basic Multilingual Plane require two UTF-16 code units.

Therefore:

```java
text.length()
```

counts UTF-16 code units, not necessarily user-perceived characters.

---

# 113. Code Points

Java provides APIs for Unicode code points.

Example:

```java
String text = "Hello";

System.out.println(text.codePointCount(0, text.length()));
```

For ordinary Latin text, the result matches the number of characters.

For supplementary Unicode code points, code-point APIs are more appropriate.

---

# 114. Iterating Code Points

You can use:

```java
text.codePoints()
```

For example:

```java
String text = "Java";

text.codePoints().forEach(cp -> {
    System.out.println(cp);
});
```

This works at the Unicode code-point level rather than simply iterating UTF-16 `char` units.

Streams are studied in detail later.

---

# 115. `Character` Utilities

Java provides the `Character` class.

Examples:

```java
Character.isLetter(ch)
Character.isDigit(ch)
Character.isWhitespace(ch)
Character.toUpperCase(ch)
Character.toLowerCase(ch)
```

Example:

```java
char ch = '7';

System.out.println(Character.isDigit(ch));
```

Output:

```text
true
```

---

# 116. Check Alphabetic Characters

```java
char ch = 'A';

System.out.println(Character.isLetter(ch));
```

Output:

```text
true
```

This can recognize many Unicode letters, not only English A–Z.

---

# 117. Check Whitespace

```java
char ch = ' ';

System.out.println(Character.isWhitespace(ch));
```

Output:

```text
true
```

---

# 118. `getBytes()`

You can convert a String into bytes:

```java
String text = "Java";

byte[] bytes = text.getBytes(StandardCharsets.UTF_8);
```

Use an explicit charset when converting text to bytes for files, networks, or external systems.

Do not rely on the platform default charset when a specific encoding is required.

---

# 119. `new String(bytes, charset)`

To decode bytes:

```java
String text = new String(bytes, StandardCharsets.UTF_8);
```

Example:

```java
byte[] bytes = "Java".getBytes(StandardCharsets.UTF_8);

String text = new String(bytes, StandardCharsets.UTF_8);
```

The encoding used for decoding should match the encoding used for encoding.

---

# 120. Why Character Encoding Matters

Text can be corrupted if one system encodes:

```text
UTF-8
```

and another decodes using an incompatible encoding.

For modern applications, explicitly using:

```java
StandardCharsets.UTF_8
```

is often the correct choice when UTF-8 is the agreed format.

---

# 121. `String.format()`

Java provides formatted Strings:

```java
String message = String.format(
    "Name: %s, Age: %d",
    "Aman",
    20
);

System.out.println(message);
```

Output:

```text
Name: Aman, Age: 20
```

---

# 122. Format Specifiers

Common examples:

```text
%s → String
%d → integer
%f → floating-point
%n → platform-specific line separator
```

Example:

```java
String result = String.format(
    "Price: %.2f",
    99.456
);

System.out.println(result);
```

Output:

```text
Price: 99.46
```

---

# 123. `formatted()`

Modern Java also allows:

```java
String message = "Name: %s, Age: %d".formatted("Aman", 20);
```

Result:

```text
Name: Aman, Age: 20
```

---

# 124. String Methods Quick Table

| Method | Purpose |
|---|---|
| `length()` | Number of UTF-16 code units |
| `charAt()` | Get code unit at index |
| `equals()` | Compare contents |
| `equalsIgnoreCase()` | Compare ignoring case |
| `compareTo()` | Lexicographic comparison |
| `contains()` | Check substring |
| `startsWith()` | Check prefix |
| `endsWith()` | Check suffix |
| `indexOf()` | Find first occurrence |
| `lastIndexOf()` | Find last occurrence |
| `substring()` | Extract part |
| `replace()` | Literal replacement |
| `replaceAll()` | Regex replacement |
| `split()` | Split using regex |
| `trim()` | Remove certain leading/trailing characters |
| `strip()` | Unicode-aware whitespace stripping |
| `isEmpty()` | Check zero length |
| `isBlank()` | Check empty/whitespace |
| `toUpperCase()` | Uppercase conversion |
| `toLowerCase()` | Lowercase conversion |
| `toCharArray()` | Convert to char array |
| `concat()` | Concatenate |
| `repeat()` | Repeat String |
| `join()` | Join multiple Strings |

---

# 125. `repeat()`

Modern Java provides:

```java
String text = "Java ";

System.out.println(text.repeat(3));
```

Output:

```text
Java Java Java 
```

It repeats the String the specified number of times.

---

# 126. `repeat()` with Zero

```java
System.out.println("Java".repeat(0));
```

Result:

```text
""
```

The result is an empty String.

---

# 127. Invalid Repeat Count

A negative repeat count is invalid:

```java
"Java".repeat(-1);
```

This results in:

```text
IllegalArgumentException
```

---

# 128. String Validation

A simple validation example:

```java
static boolean isValidUsername(String username) {
    if (username == null) {
        return false;
    }

    String value = username.strip();

    return !value.isEmpty();
}
```

This only checks basic presence. Real validation needs additional rules.

---

# 129. Email Validation

Do not try to fully validate every valid email address with a tiny regex.

A basic application check might be:

```java
static boolean looksLikeEmail(String email) {
    if (email == null || email.isBlank()) {
        return false;
    }

    return email.contains("@");
}
```

This is only a basic check, not a complete email specification validator.

---

# 130. Password Comparison

Never print or log passwords unnecessarily.

For normal text comparison:

```java
if ("secret".equals(input)) {
    System.out.println("Matched");
}
```

Real password storage should use secure password hashing rather than storing plaintext passwords.

---

# 131. Parsing an Integer from String

Use:

```java
Integer.parseInt()
```

Example:

```java
String text = "123";

int number = Integer.parseInt(text);

System.out.println(number + 1);
```

Output:

```text
124
```

Wrapper classes are covered later.

---

# 132. Parsing a Double

```java
String text = "12.5";

double value = Double.parseDouble(text);

System.out.println(value);
```

Output:

```text
12.5
```

---

# 133. Parsing Failure

This:

```java
Integer.parseInt("abc");
```

causes:

```text
NumberFormatException
```

Exception handling is covered later in detail.

---

# 134. String to Boolean

```java
Boolean.parseBoolean("true");
```

returns:

```text
true
```

But note that `parseBoolean()` is permissive: strings other than case-insensitive `"true"` produce `false`.

Do not use it as a strict input validator without considering that behavior.

---

# 135. Practical Program — Count Vowels and Consonants

```java
public class Main {
    public static void main(String[] args) {
        String text = "Java Programming";

        int vowels = 0;
        int consonants = 0;

        for (int i = 0; i < text.length(); i++) {
            char ch = Character.toLowerCase(text.charAt(i));

            if (ch >= 'a' && ch <= 'z') {
                if (ch == 'a' ||
                    ch == 'e' ||
                    ch == 'i' ||
                    ch == 'o' ||
                    ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            }
        }

        System.out.println("Vowels = " + vowels);
        System.out.println("Consonants = " + consonants);
    }
}
```

Output:

```text
Vowels = 5
Consonants = 9
```

The logic intentionally counts English alphabetic characters only.

---

# 136. Practical Program — Reverse a String

```java
public class Main {
    public static void main(String[] args) {
        String text = "Java";

        String reversed = new StringBuilder(text)
                .reverse()
                .toString();

        System.out.println("Original = " + text);
        System.out.println("Reversed = " + reversed);
    }
}
```

Output:

```text
Original = Java
Reversed = avaJ
```

---

# 137. Practical Program — Palindrome

```java
public class Main {
    static boolean isPalindrome(String text) {
        int left = 0;
        int right = text.length() - 1;

        while (left < right) {
            if (text.charAt(left) != text.charAt(right)) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        String text = "madam";

        System.out.println(isPalindrome(text));
    }
}
```

Output:

```text
true
```

---

# 138. Practical Program — Count a Character

```java
public class Main {
    static int countChar(String text, char target) {
        int count = 0;

        for (int i = 0; i < text.length(); i++) {
            if (text.charAt(i) == target) {
                count++;
            }
        }

        return count;
    }

    public static void main(String[] args) {
        System.out.println(countChar("programming", 'm'));
    }
}
```

Output:

```text
2
```

---

# 139. Practical Program — Find First Occurrence

```java
public class Main {
    public static void main(String[] args) {
        String text = "Java Programming";

        int index = text.indexOf("Programming");

        if (index == -1) {
            System.out.println("Not found");
        } else {
            System.out.println("Found at index " + index);
        }
    }
}
```

Output:

```text
Found at index 5
```

---

# 140. Practical Program — Count Words

```java
public class Main {
    public static void main(String[] args) {
        String text = "Java is easy to learn";

        String trimmed = text.strip();

        int count = trimmed.isEmpty()
                ? 0
                : trimmed.split("\\s+").length;

        System.out.println("Words = " + count);
    }
}
```

Output:

```text
Words = 5
```

---

# 141. Practical Program — Remove Extra Whitespace

A simple normalization:

```java
public class Main {
    public static void main(String[] args) {
        String text = "Java    is     powerful";

        String result = text.strip().replaceAll("\\s+", " ");

        System.out.println(result);
    }
}
```

Output:

```text
Java is powerful
```

---

# 142. Practical Program — Character Frequency

For simple English lowercase letters:

```java
public class Main {
    public static void main(String[] args) {
        String text = "banana";

        int[] frequency = new int[26];

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);

            if (ch >= 'a' && ch <= 'z') {
                frequency[ch - 'a']++;
            }
        }

        for (int i = 0; i < frequency.length; i++) {
            if (frequency[i] > 0) {
                char ch = (char) ('a' + i);

                System.out.println(
                    ch + " = " + frequency[i]
                );
            }
        }
    }
}
```

Output:

```text
a = 3
b = 1
n = 2
```

This technique is useful in DSA.

---

# 143. Practical Program — Anagram Check

Two Strings are anagrams if they contain the same characters with the same frequencies, under the chosen normalization rules.

For lowercase English letters:

```java
import java.util.Arrays;

public class Main {
    static boolean areAnagrams(String a, String b) {
        char[] first = a.toCharArray();
        char[] second = b.toCharArray();

        Arrays.sort(first);
        Arrays.sort(second);

        return Arrays.equals(first, second);
    }

    public static void main(String[] args) {
        System.out.println(
            areAnagrams("listen", "silent")
        );
    }
}
```

Output:

```text
true
```

For Unicode-aware or case/space-insensitive anagram problems, define normalization rules first.

---

# 144. Practical Program — Remove Duplicate Characters

A simple ASCII/Unicode-code-unit approach can use a `Set`, but collections are covered later.

For lowercase English letters, an array can be used:

```java
public class Main {
    public static void main(String[] args) {
        String text = "programming";

        boolean[] seen = new boolean[26];
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);

            if (ch >= 'a' && ch <= 'z') {
                int index = ch - 'a';

                if (!seen[index]) {
                    seen[index] = true;
                    result.append(ch);
                }
            }
        }

        System.out.println(result);
    }
}
```

Output:

```text
progamin
```

---

# 145. Practical Program — Capitalize First Character

```java
static String capitalize(String text) {
    if (text == null || text.isEmpty()) {
        return text;
    }

    return Character.toUpperCase(text.charAt(0))
            + text.substring(1);
}
```

Example:

```java
System.out.println(capitalize("java"));
```

Output:

```text
Java
```

This is a simple example and does not implement full Unicode title casing.

---

# 146. Practical Program — Extract Domain from Email

For a basic educational example:

```java
static String domain(String email) {
    int at = email.indexOf('@');

    if (at == -1 || at == email.length() - 1) {
        return null;
    }

    return email.substring(at + 1);
}
```

Example:

```java
System.out.println(domain("user@example.com"));
```

Output:

```text
example.com
```

This is not a full email parser.

---

# 147. Practical Program — Build Text with StringBuilder

```java
public class Main {
    public static void main(String[] args) {
        StringBuilder result = new StringBuilder();

        for (int i = 1; i <= 5; i++) {
            result.append("Number: ")
                  .append(i)
                  .append('\n');
        }

        System.out.print(result);
    }
}
```

Output:

```text
Number: 1
Number: 2
Number: 3
Number: 4
Number: 5
```

---

# 148. Practical Program — Generate a Table

```java
public class Main {
    public static void main(String[] args) {
        int number = 5;

        StringBuilder table = new StringBuilder();

        for (int i = 1; i <= 10; i++) {
            table.append(number)
                 .append(" x ")
                 .append(i)
                 .append(" = ")
                 .append(number * i)
                 .append('\n');
        }

        System.out.print(table);
    }
}
```

Output:

```text
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50
```

---

# 149. String Performance

Consider:

```java
String result = "";

for (int i = 0; i < 10000; i++) {
    result += i;
}
```

Because String is immutable, repeated concatenation can involve many intermediate objects.

Prefer:

```java
StringBuilder result = new StringBuilder();

for (int i = 0; i < 10000; i++) {
    result.append(i);
}
```

Then:

```java
String text = result.toString();
```

Modern Java compilers and JVMs can optimize some `+` concatenation expressions, especially simple expressions, so do not assume every `+` always creates a new object in exactly the same way. For explicitly repeated mutation/building, `StringBuilder` is the clear tool.

---

# 150. String Concatenation in a Single Expression

This is fine:

```java
String message = "Hello " + name + ", welcome!";
```

You do not need `StringBuilder` for every single concatenation.

Use the simplest readable approach.

---

# 151. `StringBuilder` Capacity Planning

If you know the approximate output size:

```java
StringBuilder builder = new StringBuilder(1000);
```

This can reduce the number of internal expansions.

It is an optimization, not a requirement.

---

# 152. StringBuilder Not Thread-Safe

`StringBuilder` is not synchronized.

If multiple threads need shared mutable state, do not simply assume that changing it to `StringBuffer` solves the entire concurrency problem.

Prefer designing ownership so mutable builders are local to a thread when possible.

Concurrency will be studied later.

---

# 153. StringBuffer Synchronization

`StringBuffer` methods are synchronized.

That can provide thread-safety for individual method operations, but it does not automatically make a sequence of multiple operations atomic as one business action.

This distinction becomes important in multithreaded programs.

---

# 154. Strings and Security

Strings are immutable, which is useful, but it also means sensitive text cannot be cleared by modifying the String object.

For highly sensitive temporary character data, Java APIs sometimes use:

```java
char[]
```

because the array can be explicitly overwritten.

This does not magically guarantee complete removal from memory because JVM/runtime behavior is complex, but it provides more control than an immutable String.

---

# 155. Do Not Store Passwords as Plaintext

A real application should not store:

```text
password123
```

as plaintext.

Instead, use an appropriate password-hashing algorithm and a proper authentication design.

This chapter only teaches String handling, not password security.

---

# 156. Common Mistake — Using `==`

Wrong:

```java
if (name == "Aman") {
}
```

Correct:

```java
if ("Aman".equals(name)) {
}
```

---

# 157. Common Mistake — Forgetting Immutability

Wrong assumption:

```java
String text = "java";
text.toUpperCase();

System.out.println(text);
```

Output:

```text
java
```

Correct:

```java
text = text.toUpperCase();
```

---

# 158. Common Mistake — Using `length`

Wrong:

```java
text.length
```

Correct:

```java
text.length()
```

For String, `length` is a method.

---

# 159. Common Mistake — Invalid `charAt`

Wrong:

```java
String text = "Java";

System.out.println(text.charAt(4));
```

Valid indexes are:

```text
0 to 3
```

---

# 160. Common Mistake — Calling Methods on `null`

Wrong:

```java
String text = null;

System.out.println(text.length());
```

This causes:

```text
NullPointerException
```

Check for null when null is a possible input.

---

# 161. Common Mistake — `trim()` Does Not Mean All Unicode Whitespace

`trim()` and `strip()` are not identical.

For modern Unicode-aware whitespace handling:

```java
strip()
```

is generally the better choice.

---

# 162. Common Mistake — Forgetting Regex in `split()`

This:

```java
text.split(".")
```

does not mean "split on a literal dot" because `.` is a regex metacharacter.

Use:

```java
text.split("\\.")
```

for a literal dot.

---

# 163. Common Mistake — Using `replaceAll()` for Simple Text

If you want to replace literal text:

```java
text.replace("Java", "Python")
```

is simpler than:

```java
text.replaceAll("Java", "Python")
```

Use regex only when you actually need regex behavior.

---

# 164. Common Mistake — Treating `char` as a Complete Unicode Character

A Java `char` represents one UTF-16 code unit.

Some Unicode code points require two `char` values.

For Unicode-aware processing, consider:

```java
codePointAt()
codePoints()
codePointCount()
```

when appropriate.

---

# 165. Common Mistake — Assuming `length()` Means User-Perceived Characters

For a String:

```java
text.length()
```

counts UTF-16 code units.

It does not necessarily equal:

```text
number of Unicode code points
```

and neither necessarily equals:

```text
number of user-perceived grapheme clusters
```

Advanced text processing can require Unicode-aware libraries and grapheme segmentation.

---

# 166. Common Mistake — Splitting Arbitrary Unicode Text by `charAt()`

This:

```java
for (int i = 0; i < text.length(); i++) {
    char ch = text.charAt(i);
}
```

iterates UTF-16 code units.

For supplementary code points, use:

```java
text.codePoints()
```

or appropriate code-point APIs.

---

# 167. Common Mistake — Creating Too Many Strings

Repeatedly doing:

```java
result = result + value;
```

inside a large loop can be inefficient.

Use:

```java
StringBuilder
```

for repeated construction.

---

# 168. Common Mistake — Modifying a String Through `charAt()`

This is impossible:

```java
text.charAt(0) = 'K';
```

`charAt()` returns a value; it is not a writable location.

Use a new String or a mutable representation such as `StringBuilder` or `char[]`.

---

# 169. Common Mistake — Confusing String and Character

String:

```java
"J"
```

Character literal:

```java
'J'
```

The first is a String.

The second is a `char`.

---

# 170. String vs `char`

```text
'J'  → char
"J"  → String
```

Example:

```java
char ch = 'J';
String text = "J";
```

---

# 171. String vs `char[]`

```text
String
→ immutable sequence of UTF-16 code units

char[]
→ mutable array of UTF-16 code units
```

Use String for normal text.

Use `char[]` when direct mutable code-unit storage is useful.

---

# 172. String vs StringBuilder

| Feature | String | StringBuilder |
|---|---|---|
| Mutable | No | Yes |
| Good for fixed text values | Yes | Not usually necessary |
| Repeated append | Less suitable | Excellent |
| Can change character | No | Yes |
| Thread synchronization | Immutable | No synchronization |
| Typical use | Text value | Building text |

---

# 173. String vs StringBuffer

| Feature | String | StringBuffer |
|---|---|---|
| Mutable | No | Yes |
| Synchronized methods | Not relevant | Yes |
| Repeated modification | No | Yes |
| Common modern choice for local building | No | Usually StringBuilder instead |

---

# 174. String Pool Summary

Remember:

```text
String literals can be pooled.
Equal literals may share an object.
new String(...) creates a separate String object.
== checks reference identity.
equals() checks String content.
```

Never use pool behavior as a reason to replace:

```java
equals()
```

with:

```java
==
```

---

# 175. String Method Chaining

String methods often return Strings, so you can chain operations.

Example:

```java
String result = "   Java Programming   "
        .strip()
        .toLowerCase()
        .replace(" ", "-");

System.out.println(result);
```

Output:

```text
java-programming
```

Method chaining can make transformations readable.

---

# 176. Be Careful with Long Chains

This:

```java
String result = input
        .strip()
        .toLowerCase()
        .replace(...)
        .substring(...)
        .trim();
```

can become difficult to debug.

For complicated processing, intermediate variables can make the code clearer.

---

# 177. String Utility Method Example

```java
static String normalizeName(String name) {
    if (name == null) {
        return null;
    }

    String value = name.strip();

    if (value.isEmpty()) {
        return "";
    }

    return value;
}
```

Methods like this centralize repeated validation logic.

---

# 178. Practical Mini Project — Username Cleaner

Requirements:

```text
1. Read username
2. Remove leading/trailing whitespace
3. Convert to lowercase
4. Check whether it is empty
5. Print normalized username
```

Example:

Input:

```text
   Akshit123
```

Output:

```text
akshit123
```

Possible implementation:

```java
import java.util.Locale;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter username: ");

        String username = sc.nextLine()
                .strip()
                .toLowerCase(Locale.ROOT);

        if (username.isEmpty()) {
            System.out.println("Username cannot be empty.");
        } else {
            System.out.println("Normalized username: " + username);
        }

        sc.close();
    }
}
```

---

# 179. Practical Mini Project — Text Analyzer

Build a program that accepts a line of text and reports:

```text
String length
word count
vowel count
digit count
uppercase count
lowercase count
spaces
```

Useful methods:

```java
Character.isDigit()
Character.isUpperCase()
Character.isLowerCase()
Character.isWhitespace()
```

This project combines:

```text
Strings
loops
conditions
methods
Character utilities
```

---

# 180. Practical Mini Project — Password Strength Checker

For educational purposes, define simple rules such as:

```text
minimum 8 characters
at least one uppercase letter
at least one lowercase letter
at least one digit
at least one special character
```

Use:

```java
Character.isUpperCase()
Character.isLowerCase()
Character.isDigit()
```

Do not store or print the password unnecessarily.

---

# 181. Practical Mini Project — Word Search

Input:

```text
Java is easy and Java is powerful
```

Search:

```text
Java
```

Report:

```text
first occurrence
number of occurrences
```

For exact word matching, simple substring search may not be enough because:

```text
Java
JavaScript
```

are not the same word.

Define the matching rules first.

---

# 182. Practical Mini Project — Sentence Formatter

Take:

```text
"   java    is    powerful   "
```

and produce:

```text
"Java is powerful"
```

One simple educational approach:

```java
String result = text.strip().replaceAll("\\s+", " ");

if (!result.isEmpty()) {
    result = Character.toUpperCase(result.charAt(0))
            + result.substring(1);
}
```

---

# 183. String Algorithms You Should Practice

Practice these problems:

```text
Reverse a String
Check palindrome
Count vowels
Count consonants
Count digits
Count spaces
Count words
Find character frequency
Find first unique character
Find duplicate characters
Remove duplicates
Check anagram
Reverse words
Find longest word
Find shortest word
Count substring occurrences
Replace words
Normalize whitespace
Check prefix/suffix
```

These are excellent beginner-to-intermediate problems.

---

# 184. Interview Question — What Is String Immutability?

String immutability means that once a String object is created, its character content cannot be changed.

Operations such as:

```java
toUpperCase()
substring()
replace()
concat()
```

return String values instead of modifying the existing String object.

---

# 185. Interview Question — Why Is String Immutable?

Important benefits include:

```text
String Pool sharing
security
thread safety
stable hash codes
safe use as map keys
predictable behavior
```

---

# 186. Interview Question — Difference Between `==` and `equals()`?

For references:

```java
==
```

checks whether two references identify the same object.

For String:

```java
equals()
```

checks content equality.

---

# 187. Interview Question — What Is the String Pool?

The String Pool is a JVM-managed pool of canonical String instances used for interned Strings, especially String literals.

Equal literals can share a pooled String object.

---

# 188. Interview Question — What Does `new String("Java")` Do?

It explicitly creates a new String object whose content is:

```text
Java
```

even though the literal `"Java"` can also be present in the String Pool.

---

# 189. Interview Question — Why Is `StringBuilder` Faster for Repeated Concatenation?

String is immutable.

Repeated modification creates new String values.

StringBuilder is mutable, so repeated `append()` operations can build text using a reusable internal buffer.

The exact performance depends on the code and JVM optimizations, but StringBuilder is the standard tool for explicit repeated construction.

---

# 190. Interview Question — StringBuilder vs StringBuffer?

```text
StringBuilder
→ mutable
→ not synchronized
→ usually preferred for local/single-threaded construction

StringBuffer
→ mutable
→ synchronized methods
→ older thread-safe mutable sequence
```

---

# 191. Interview Question — Can String Be Changed?

No.

You can reassign the variable:

```java
String text = "Java";

text = "Python";
```

but you did not modify the original `"Java"` object.

You changed what the variable refers to.

---

# 192. Interview Question — Why Does `charAt()` Return `char`?

Because Java's `char` represents a UTF-16 code unit.

This means it may not represent an entire Unicode code point for supplementary characters.

---

# 193. Interview Question — What Does `length()` Return?

For a Java String:

```java
length()
```

returns the number of UTF-16 code units.

It is not always the number of Unicode code points or user-perceived characters.

---

# 194. Interview Question — How Do You Compare Strings Ignoring Case?

Use:

```java
a.equalsIgnoreCase(b)
```

when that comparison rule is appropriate.

For locale-sensitive text transformations, use explicit locale-aware operations where necessary.

---

# 195. Interview Question — How Do You Convert String to Character Array?

```java
char[] chars = text.toCharArray();
```

---

# 196. Interview Question — How Do You Convert Character Array to String?

```java
String text = new String(chars);
```

---

# 197. Interview Question — How Do You Reverse a String?

Simple solution:

```java
String reversed = new StringBuilder(text)
        .reverse()
        .toString();
```

---

# 198. Interview Question — How Do You Check a Palindrome?

Compare characters from both ends:

```text
left → →
← ← right
```

Move both toward the center.

If a pair differs:

```text
not palindrome
```

If all pairs match:

```text
palindrome
```

---

# 199. Interview Question — Difference Between `isEmpty()` and `isBlank()`?

```text
isEmpty()
→ true only when length is 0

isBlank()
→ true when empty or all characters are whitespace according to Java's whitespace rules
```

---

# 200. Interview Question — Difference Between `trim()` and `strip()`?

```text
trim()
→ removes leading/trailing characters based on the older <= U+0020 rule

strip()
→ uses Unicode-aware whitespace handling
```

---

# 201. Interview Question — Difference Between `replace()` and `replaceAll()`?

```text
replace()
→ literal character/sequence replacement

replaceAll()
→ regex-based replacement
```

---

# 202. Interview Question — Why Does `split("\\.")` Have Two Backslashes?

There are two levels:

```text
Java String escaping
+
regular expression escaping
```

The regex for a literal dot is:

```text
\.
```

But Java source needs:

```java
"\\."
```

to produce that regex.

---

# 203. Interview Question — Is String a Primitive?

No.

String is a class/reference type.

---

# 204. Interview Question — Can String Be Used as a Switch Expression?

Yes.

Modern Java supports switching on String values.

Example:

```java
String language = "Java";

switch (language) {
    case "Java" -> System.out.println("JVM language");
    case "Python" -> System.out.println("Python");
    default -> System.out.println("Other");
}
```

Output:

```text
JVM language
```

---

# 205. Interview Question — Why Can Strings Be Used in Hash Maps?

String overrides `equals()` and `hashCode()` consistently and is immutable, making it suitable as a key.

---

# 206. Interview Question — What Happens If You Call a Method on `null`?

Example:

```java
String text = null;

text.length();
```

This throws:

```text
NullPointerException
```

---

# 207. Interview Question — Can a String Contain Numbers?

Yes.

```java
String text = "12345";
```

But this is text, not an `int`.

You can convert:

```java
int number = Integer.parseInt(text);
```

---

# 208. Interview Question — Difference Between `"123"` and `123`

```text
"123" → String
123   → int
```

Example:

```java
System.out.println("123" + 10);
```

Output:

```text
12310
```

But:

```java
System.out.println(123 + 10);
```

Output:

```text
133
```

---

# 209. Output Questions

### Question 1

```java
String a = "Java";
String b = "Java";

System.out.println(a == b);
```

Expected:

```text
true
```

for these pooled literals.

---

### Question 2

```java
String a = new String("Java");
String b = new String("Java");

System.out.println(a == b);
System.out.println(a.equals(b));
```

Output:

```text
false
true
```

---

### Question 3

```java
String text = "Java";

text.toUpperCase();

System.out.println(text);
```

Output:

```text
Java
```

---

### Question 4

```java
String text = "Java";

text = text.toUpperCase();

System.out.println(text);
```

Output:

```text
JAVA
```

---

### Question 5

```java
String text = "Hello";

System.out.println(text.substring(1, 4));
```

Output:

```text
ell
```

---

### Question 6

```java
String text = "banana";

System.out.println(text.indexOf('a'));
System.out.println(text.lastIndexOf('a'));
```

Output:

```text
1
5
```

---

### Question 7

```java
System.out.println("Java".length());
```

Output:

```text
4
```

---

### Question 8

```java
System.out.println("Java".charAt(2));
```

Output:

```text
v
```

---

### Question 9

```java
System.out.println("Java".contains("av"));
```

Output:

```text
true
```

---

### Question 10

```java
System.out.println("Java".replace('a', 'o'));
```

Output:

```text
Jovo
```

---

### Question 11

```java
System.out.println("Java".repeat(2));
```

Output:

```text
JavaJava
```

---

### Question 12

```java
StringBuilder b = new StringBuilder("Java");
b.reverse();

System.out.println(b);
```

Output:

```text
avaJ
```

---

### Question 13

```java
System.out.println("Hello " + 10 + 20);
```

Output:

```text
Hello 1020
```

---

### Question 14

```java
System.out.println(10 + 20 + " Hello");
```

Output:

```text
30 Hello
```

---

### Question 15

```java
String a = "";
String b = null;

System.out.println(a.isEmpty());
```

Output:

```text
true
```

Calling:

```java
b.isEmpty()
```

would throw:

```text
NullPointerException
```

---

# 210. Practice Problems — Level 1

Solve these yourself:

1. Print the length of a String.
2. Print every character.
3. Print the first character.
4. Print the last character.
5. Count vowels.
6. Count consonants.
7. Count digits.
8. Count spaces.
9. Count a specific character.
10. Convert to uppercase.
11. Convert to lowercase.
12. Check whether a String contains a word.
13. Check whether it starts with a prefix.
14. Check whether it ends with a suffix.
15. Find the first occurrence of a character.
16. Find the last occurrence.
17. Reverse a String.
18. Check palindrome.
19. Remove leading/trailing whitespace.
20. Check whether a String is blank.

---

# 211. Practice Problems — Level 2

1. Count frequency of every character.
2. Find the first non-repeating character.
3. Find the first repeating character.
4. Remove duplicate characters.
5. Check whether two Strings are anagrams.
6. Reverse each word in a sentence.
7. Reverse the order of words.
8. Find the longest word.
9. Find the shortest word.
10. Count occurrences of a substring.
11. Replace repeated spaces with one space.
12. Capitalize every word.
13. Check whether two Strings are rotations.
14. Find the most frequent character.
15. Compress repeated characters.
16. Check whether a String contains only digits.
17. Check whether a String contains only letters.
18. Convert a String to a character array and sort it.
19. Find all indexes of a character.
20. Find the longest substring without repeated characters.

---

# 212. Practice Problems — Advanced

1. Implement substring search manually.
2. Implement String reversal using two pointers.
3. Implement palindrome checking with normalization.
4. Implement anagram checking without sorting.
5. Implement run-length encoding.
6. Find the longest palindromic substring.
7. Group words by anagram.
8. Implement basic pattern matching.
9. Find repeated words in a sentence.
10. Build a frequency analyzer.
11. Build a simple tokenizer.
12. Parse a simple key-value String.
13. Build a mini log analyzer.
14. Build a simple command parser.
15. Build a text normalization utility.

These problems will prepare you for DSA and real text-processing tasks.

---

# 213. Mini Project — Text Analyzer

Create a program:

```text
========================
     TEXT ANALYZER
========================

Enter text:
Java is powerful
```

Display:

```text
Characters:
16

Words:
3

Vowels:
6

Digits:
0

Uppercase:
1

Lowercase:
13

Spaces:
2
```

The exact counts depend on your counting rules.

Use separate methods:

```java
countCharacters()
countWords()
countVowels()
countDigits()
countUppercase()
countLowercase()
countSpaces()
```

This reinforces Chapter 8 methods and Chapter 10 Strings.

---

# 214. Mini Project — Word Counter

Input:

```text
Java is easy to learn
```

Output:

```text
Words = 5
```

Handle:

```text
empty input
leading spaces
trailing spaces
multiple spaces
```

A simple implementation can use:

```java
strip()
split("\\s+")
```

---

# 215. Mini Project — Password Strength Checker

Input:

```text
Java@1234
```

Output:

```text
Strong password
```

Possible rules:

```text
8+ characters
uppercase
lowercase
digit
special character
```

Use boolean flags while traversing the String.

---

# 216. Mini Project — Username Validator

Possible rules:

```text
3–20 characters
letters, digits, underscore
cannot start with a digit
```

Example:

```text
akshit_123
```

Use:

```java
Character.isLetter()
Character.isDigit()
```

and explicit checks for `_`.

---

# 217. Mini Project — Sentence Normalizer

Input:

```text
"   java    is     powerful   "
```

Output:

```text
"Java is powerful"
```

This combines:

```text
strip()
replaceAll()
Character.toUpperCase()
substring()
```

---

# 218. Mini Project — Simple Command Parser

Input:

```text
ADD 10 20
```

Split the command:

```text
ADD
10
20
```

Then process:

```text
ADD → 30
```

Possible commands:

```text
ADD
SUBTRACT
MULTIPLY
DIVIDE
```

This is a good introduction to command parsing.

---

# 219. String Complexity

For a String of length `n`, many operations require examining characters.

Examples:

```text
charAt(i)       → O(1) conceptual indexed access
length()        → O(1)
equals()        → O(n) worst case
indexOf()       → O(n) for simple search in common cases
substring()     → depends on operation and Java version/implementation; do not assume old pre-Java-7 behavior
toUpperCase()   → can require processing the text
replace()       → can require scanning the text
```

The exact implementation details can vary.

For algorithmic reasoning, focus on how much input must be processed.

---

# 220. Why String Operations Can Be Expensive

Suppose:

```java
String text = veryLargeString;
```

An operation such as:

```java
text.toUpperCase()
```

may need to inspect and construct a transformed String.

Therefore, repeated full-string transformations can become expensive.

Avoid unnecessary repeated transformations.

---

# 221. String and Arrays Connection

You have already learned arrays.

Strings connect directly to arrays:

```text
String
  ↓
toCharArray()
  ↓
char[]
```

You can use loops and array-style algorithms to process text.

---

# 222. String and Methods Connection

Chapter 8 taught methods.

Now you can build reusable String methods:

```java
static boolean isPalindrome(String text)
static int countVowels(String text)
static int countChar(String text, char target)
static String reverse(String text)
```

This is how small algorithms become reusable components.

---

# 223. String and OOP Connection

`String` is an excellent example of object-oriented design.

It provides:

```text
state
behavior
encapsulation
immutability
methods
inheritance from Object
```

You do not directly manage the internal representation.

You use methods such as:

```java
length()
substring()
equals()
replace()
```

This prepares you for the OOP section starting in Chapter 11.

---

# 224. Important String Mental Model

Think:

```text
String variable
      │
      ▼
  String object
      │
      ▼
immutable text
```

When you write:

```java
text = text.toUpperCase();
```

you are not changing the old String.

Conceptually:

```text
old String
    ↓
"java"

toUpperCase()
    ↓
new String value
    ↓
"JAVA"

text now refers to "JAVA"
```

---

# 225. Complete String Mental Model

Remember these five ideas:

```text
1. String is a class.

2. String is a reference type.

3. String is immutable.

4. String literals can use the String Pool.

5. equals() should normally be used for content comparison.
```

If these five ideas are clear, most beginner String confusion disappears.

---

# 226. Final String Cheat Sheet

Creation:

```java
String text = "Java";
```

Length:

```java
text.length()
```

Character:

```java
text.charAt(0)
```

Compare:

```java
text.equals(other)
```

Ignore case:

```java
text.equalsIgnoreCase(other)
```

Search:

```java
text.indexOf("Java")
```

Contains:

```java
text.contains("Java")
```

Prefix:

```java
text.startsWith("Java")
```

Suffix:

```java
text.endsWith("Java")
```

Extract:

```java
text.substring(0, 4)
```

Uppercase:

```java
text.toUpperCase()
```

Lowercase:

```java
text.toLowerCase()
```

Trim:

```java
text.trim()
```

Unicode-aware strip:

```java
text.strip()
```

Blank check:

```java
text.isBlank()
```

Empty check:

```java
text.isEmpty()
```

Replace:

```java
text.replace("Java", "Python")
```

Regex replace:

```java
text.replaceAll("\\s+", " ")
```

Split:

```java
text.split(",")
```

Characters:

```java
text.toCharArray()
```

Join:

```java
String.join(", ", values)
```

Repeat:

```java
text.repeat(3)
```

Reverse:

```java
new StringBuilder(text).reverse().toString()
```

---

# 227. Final Rules to Remember

```text
1. String uses double quotes.

2. char uses single quotes.

3. String is a reference type.

4. String objects are immutable.

5. String length uses length().

6. String indexes start at 0.

7. charAt() returns a UTF-16 code unit.

8. Use equals() for String content comparison.

9. Use == only when reference identity is actually what you want.

10. String literals can be interned in the String Pool.

11. new String(...) creates a separate String object.

12. String methods return results rather than mutating the original String.

13. StringBuilder is useful for repeated text construction.

14. StringBuffer is a synchronized mutable character sequence.

15. split() uses regular expressions.

16. replace() performs literal replacement.

17. replaceAll() uses regular expressions.

18. trim() and strip() are not identical.

19. isEmpty() and isBlank() are not identical.

20. A Java char is a UTF-16 code unit, not always a complete Unicode code point.

21. Use code-point APIs when Unicode supplementary characters matter.

22. Use explicit charsets such as UTF-8 when converting text to bytes for external systems.

23. Be careful with null Strings.

24. Arrays and Strings both use zero-based indexing, but arrays use length while Strings use length().

25. Define text-processing rules clearly before implementing them.
```

---

# 228. Chapter Summary

In this chapter you learned:

```text
✓ What Strings are
✓ String class
✓ String reference type
✓ String literals
✓ Empty String
✓ null vs empty String
✓ String length
✓ String indexing
✓ charAt()
✓ String traversal
✓ toCharArray()
✓ String immutability
✓ String Pool
✓ intern()
✓ == vs equals()
✓ equalsIgnoreCase()
✓ compareTo()
✓ String concatenation
✓ concat()
✓ substring()
✓ indexOf()
✓ lastIndexOf()
✓ contains()
✓ startsWith()
✓ endsWith()
✓ toUpperCase()
✓ toLowerCase()
✓ trim()
✓ strip()
✓ stripLeading()
✓ stripTrailing()
✓ isEmpty()
✓ isBlank()
✓ replace()
✓ replaceAll()
✓ replaceFirst()
✓ split()
✓ String.join()
✓ String.valueOf()
✓ char[]
✓ StringBuilder
✓ StringBuffer
✓ append()
✓ insert()
✓ delete()
✓ reverse()
✓ setCharAt()
✓ StringBuilder capacity
✓ Unicode basics
✓ UTF-16 code units
✓ Unicode code points
✓ Character utilities
✓ UTF-8 encoding
✓ String.format()
✓ formatted()
✓ repeat()
✓ parsing Strings
✓ String hashCode()
✓ Strings as map keys
✓ text blocks
✓ common mistakes
✓ practical programs
✓ mini projects
✓ interview questions
✓ output questions
✓ practice problems
```

---

# 229. What You Should Be Able to Do Now

Before moving forward, you should be comfortable writing programs that can:

```text
Read a String
Print a String
Find its length
Access characters
Traverse characters
Compare Strings
Search text
Extract substrings
Replace text
Split text
Join text
Normalize whitespace
Count characters
Count words
Count vowels
Check palindrome
Reverse text
Check anagrams
Build text with StringBuilder
Handle null safely
Understand String immutability
Understand the String Pool
Understand == vs equals()
Understand basic Unicode behavior
```

If you can do these things, your basic Java foundation is becoming strong.

---

# 230. Transition to OOP

The first ten chapters have built the basic programming foundation:

```text
Chapter 1
Java Introduction
        ↓
Chapter 2
Setup & First Program
        ↓
Chapter 3
Variables & Data Types
        ↓
Chapter 4
Operators
        ↓
Chapter 5
Input / Output
        ↓
Chapter 6
Conditions
        ↓
Chapter 7
Loops
        ↓
Chapter 8
Methods
        ↓
Chapter 9
Arrays
        ↓
Chapter 10
Strings
```

Now the course reaches the most important Java section:

```text
                  OOP
                   │
       ┌───────────┼───────────┐
       ↓           ↓           ↓
     Class       Object      Methods
       │           │           │
       └───────────┼───────────┘
                   ↓
             Encapsulation
                   ↓
              Inheritance
                   ↓
             Polymorphism
                   ↓
              Abstraction
                   ↓
               Interfaces
                   ↓
             OOP Design
```

The next chapter is:

# Chapter 11 — OOP Fundamentals

You will learn:

```text
What is OOP?
Why OOP?
Procedural programming vs OOP
Class
Object
State
Behavior
Real-world modeling
How Java models real-world entities
How classes and objects work together
Why OOP is so important in Java
```

From Chapter 11 onward, the course will go much deeper into Java's object-oriented model.
