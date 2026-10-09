# Chapter 44: Optional, Date and Time API, and Modern Java Utility Features

## 1. What You Will Learn

This chapter covers several practical Java APIs used in everyday application development:

- What `Optional<T>` is and when to use it.
- Methods such as `of()`, `ofNullable()`, `empty()`, `isPresent()`, `ifPresent()`, `orElse()`, `orElseGet()`, `orElseThrow()`, `map()`, `flatMap()`, and `filter()`.
- Why `Optional` can help communicate that a result might be missing.
- Why `null` still exists and why `Optional` should not be used everywhere.
- The modern Date and Time API introduced in Java 8.
- `LocalDate`, `LocalTime`, `LocalDateTime`, `ZonedDateTime`, `Instant`, and `Duration`.
- Parsing and formatting dates with `DateTimeFormatter`.
- Date arithmetic, comparisons, periods, and time zones.
- A short introduction to useful utility APIs such as `Objects`, `UUID`, and `Math`.
- Practical programs, common mistakes, interview questions, and exercises.

This chapter combines closely related utility topics. `Optional` and `java.time` are particularly useful in backend applications, APIs, databases, scheduling, and everyday business logic.

---

## 2. Understanding `null`

In Java, `null` means a reference does not currently refer to an object.

```java
String name = null;
System.out.println(name);
```

Output:

```text
null
```

A problem occurs if you try to call an instance method on that reference:

```java
String name = null;
System.out.println(name.length());
```

This throws a `NullPointerException` because there is no `String` object on which to call `length()`.

In real applications, a value might be missing because:
- A database query did not find a record.
- A user did not provide an optional field.
- An API response omitted a value.
- A search did not find a matching item.

You need a clear way to represent and handle missing values. `Optional<T>` is one tool for this purpose.

---

## 3. What Is `Optional<T>`?

`Optional<T>` is a container object that may hold a non-null value of type `T`, or may be empty.

It is in the `java.util` package:

```java
import java.util.Optional;
```

An `Optional<String>` represents either:
- A present `String`, or
- No value.

It encourages code to consider the missing-value case explicitly.

### 3.1 Create an `Optional`

```java
Optional<String> name = Optional.of("Aman");

System.out.println(name);
```

Output:

```text
Optional[Aman]
```

### 3.2 Empty `Optional`

```java
Optional<String> name = Optional.empty();

System.out.println(name.isPresent());
```

Output:

```text
false
```

### 3.3 `Optional.of()`

Use `of()` when you know the value is non-null:

```java
Optional<String> name = Optional.of("Riya");
```

If you pass `null`, `Optional.of(null)` throws a `NullPointerException`.

### 3.4 `Optional.ofNullable()`

Use `ofNullable()` when the value might be null:

```java
String input = null;

Optional<String> name = Optional.ofNullable(input);

System.out.println(name.isPresent());
```

Output:

```text
false
```

If the argument is non-null, `ofNullable()` wraps it. If it is null, it returns an empty `Optional`.

### 3.5 Quick comparison

| Method | Purpose | Behavior with `null` |
|---|---|---|
| `Optional.of(value)` | Wrap a known non-null value | Throws `NullPointerException` |
| `Optional.ofNullable(value)` | Wrap a possibly-null value | Returns empty |
| `Optional.empty()` | Represent no value | Always returns an empty `Optional` |

---

## 4. Checking Whether a Value Exists

### 4.1 `isPresent()`

Returns `true` if a value is present:

```java
Optional<String> name = Optional.of("Neha");

if (name.isPresent()) {
    System.out.println("A value exists");
}
```

Output:

```text
A value exists
```

### 4.2 `isEmpty()`

Returns `true` if no value is present. This method was added in Java 11.

```java
Optional<String> name = Optional.empty();

System.out.println(name.isEmpty());
```

Output:

```text
true
```

### 4.3 `ifPresent()`

Run an action only when a value exists:

```java
Optional<String> name = Optional.of("Kabir");

name.ifPresent(value -> System.out.println("Hello " + value));
```

Output:

```text
Hello Kabir
```

If the optional is empty, the action is not executed.

Method-reference form:

```java
name.ifPresent(System.out::println);
```

### 4.4 `ifPresentOrElse()`

Available since Java 9, this method provides an action for both cases:

```java
Optional<String> name = Optional.empty();

name.ifPresentOrElse(
    value -> System.out.println("Name: " + value),
    () -> System.out.println("No name provided")
);
```

Output:

```text
No name provided
```

Use these methods when an action is the goal. If you need to produce a value, methods such as `map()`, `orElse()`, and `orElseThrow()` may be more suitable.

---

## 5. Getting a Value Safely

### 5.1 `orElse()`

Returns the contained value if present; otherwise, returns a fallback value.

```java
Optional<String> name = Optional.empty();

String result = name.orElse("Guest");

System.out.println(result);
```

Output:

```text
Guest
```

### 5.2 `orElseGet()`

Uses a supplier to produce the fallback only when the optional is empty.

```java
Optional<String> name = Optional.empty();

String result = name.orElseGet(() -> "Guest");

System.out.println(result);
```

Output:

```text
Guest
```

### 5.3 The important difference between `orElse()` and `orElseGet()`

Consider:

```java
static String createDefault() {
    System.out.println("Creating default");
    return "Guest";
}

public static void main(String[] args) {
    Optional<String> name = Optional.of("Aman");

    String first = name.orElse(createDefault());
    String second = name.orElseGet(() -> createDefault());

    System.out.println(first);
    System.out.println(second);
}
```

Output:

```text
Creating default
Aman
Aman
```

`orElse()` evaluates its argument before the method call, so `createDefault()` runs even though the optional contains `"Aman"`. `orElseGet()` calls its supplier only if the optional is empty.

Use `orElse()` for a simple, inexpensive fallback value. Use `orElseGet()` when creating the fallback is expensive or has a side effect.

### 5.4 `orElseThrow()`

Throw an exception if the optional is empty:

```java
Optional<String> name = Optional.empty();

String result = name.orElseThrow(
    () -> new IllegalStateException("Name is missing")
);
```

This throws `IllegalStateException` with the given message.

The no-argument `orElseThrow()` is available from Java 10 and throws `NoSuchElementException` if empty:

```java
String result = name.orElseThrow();
```

Do not call `orElseThrow()` unless the missing-value case is meant to be an error.

### 5.5 Why not use `get()` everywhere?

`get()` returns the value but throws `NoSuchElementException` when empty:

```java
Optional<String> name = Optional.empty();
System.out.println(name.get()); // Throws NoSuchElementException
```

Prefer `orElse()`, `orElseGet()`, `orElseThrow()`, or a presence-handling method that expresses what should happen when the value is missing.

---

## 6. Transforming and Filtering an `Optional`

`Optional` supports methods similar in spirit to stream operations.

### 6.1 `map()`

Transforms the value if present and returns a new optional containing the result.

```java
Optional<String> name = Optional.of("Java");

Optional<Integer> length = name.map(String::length);

System.out.println(length.orElse(0));
```

Output:

```text
4
```

If the original optional is empty, the mapping function is not called and the result remains empty.

If the mapping function returns `null`, `Optional.map()` produces an empty optional.

### 6.2 `filter()`

Keeps the value only if it satisfies the predicate:

```java
Optional<String> name = Optional.of("Alexander");

Optional<String> result = name.filter(value -> value.length() > 5);

System.out.println(result.orElse("No matching name"));
```

Output:

```text
Alexander
```

If the condition fails, the result is empty.

### 6.3 `flatMap()`

Use `flatMap()` when the mapping function already returns an `Optional`, so you do not end up with a nested `Optional<Optional<T>>`.

```java
Optional<String> name = Optional.of("Aman");

Optional<String> result = name.flatMap(
    value -> value.isBlank()
        ? Optional.empty()
        : Optional.of(value.toUpperCase())
);

System.out.println(result.orElse("Missing"));
```

Output:

```text
AMAN
```

`map()` wraps a non-null mapped result in an optional. `flatMap()` expects the mapping function to return an optional and avoids nesting.

---

## 7. Practical Example: Find a User

Imagine a service looks up a user by ID. A user may not exist.

```java
import java.util.Map;
import java.util.Optional;

class User {
    private final int id;
    private final String name;

    User(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

public class Main {
    static Optional<User> findUserById(int id) {
        Map<Integer, User> users = Map.of(
            1, new User(1, "Aman"),
            2, new User(2, "Riya")
        );

        return Optional.ofNullable(users.get(id));
    }

    public static void main(String[] args) {
        String name = findUserById(3)
                .map(User::getName)
                .orElse("User not found");

        System.out.println(name);
    }
}
```

Output:

```text
User not found
```

The method's return type, `Optional<User>`, communicates that a user might not exist. `map(User::getName)` transforms a present user into a name, and `orElse()` provides a fallback.

In a real application, a service or repository would perform the lookup rather than creating the map on each call.

---

## 8. When Should You Use `Optional`?

`Optional` is useful when a method may legitimately return no result:

```java
Optional<User> findUserById(int id)
```

It makes the possibility of absence visible in the method signature.

Good use cases include:
- Search methods that may find nothing.
- Looking up a configuration value that might be absent.
- Transforming a possibly missing result with `map()` or `flatMap()`.
- Providing a clear fallback when a value is optional.

### When not to use it

- Do not use `Optional` as a replacement for every nullable variable.
- Avoid using it as a field type in ordinary data-transfer objects unless the design specifically calls for it.
- Avoid using it as a method parameter by default; a nullable parameter or overload may be simpler.
- Do not return `null` from a method declared to return `Optional`; return `Optional.empty()` instead.
- Do not call `get()` without a reasoned guarantee that a value exists.

`Optional` is primarily intended as a return type to represent possible absence. It does not eliminate all nulls from Java, and it does not automatically make code safe unless you handle the empty case properly.

---

# Part 2: Java Date and Time API

## 9. Why Does Java Have a Modern Date and Time API?

Older Java code often used `java.util.Date` and `java.util.Calendar`. These classes have design limitations, and date/time calculations can become confusing when time zones and daylight-saving rules are involved.

Java 8 introduced the modern API in the `java.time` package. Its main advantages include:
- Clear types for dates, times, timestamps, and time zones.
- Immutable objects: operations return new values rather than modifying the existing object.
- More straightforward date arithmetic.
- Better time-zone support.
- Parsing and formatting through `DateTimeFormatter`.

Important classes include:

| Class | Represents |
|---|---|
| `LocalDate` | Date only: year, month, day |
| `LocalTime` | Time only: hour, minute, second, fraction |
| `LocalDateTime` | Date and time without a time zone |
| `ZonedDateTime` | Date and time with a time zone |
| `Instant` | A moment on the UTC timeline |
| `Duration` | Time-based amount, such as hours or seconds |
| `Period` | Date-based amount, such as years, months, or days |
| `DateTimeFormatter` | Parses and formats date/time text |

Choose the type that matches the meaning of your data rather than using one type for every situation.

---

## 10. `LocalDate` — Work with Dates

`LocalDate` represents a calendar date without a time or time zone.

### 10.1 Get the current date

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        System.out.println(today);
    }
}
```

Output varies with the date on which the program runs, for example:

```text
2026-10-09
```

`LocalDate.now()` uses the system's default time zone. For deterministic tests or applications that require a specific zone, provide a `Clock` or an explicit zone through an appropriate API.

### 10.2 Create a specific date

```java
LocalDate date = LocalDate.of(2026, 10, 9);

System.out.println(date);
```

Output:

```text
2026-10-09
```

The month is represented by a number from 1 through 12 when using `of(year, month, day)`.

### 10.3 Get date parts

```java
LocalDate date = LocalDate.of(2026, 10, 9);

System.out.println(date.getYear());
System.out.println(date.getMonth());
System.out.println(date.getMonthValue());
System.out.println(date.getDayOfMonth());
System.out.println(date.getDayOfWeek());
```

Output:

```text
2026
OCTOBER
10
9
FRIDAY
```

### 10.4 Add or subtract time

```java
LocalDate date = LocalDate.of(2026, 10, 9);

System.out.println(date.plusDays(7));
System.out.println(date.minusDays(2));
System.out.println(date.plusMonths(1));
System.out.println(date.plusYears(1));
```

Output:

```text
2026-10-16
2026-10-07
2026-11-09
2027-10-09
```

`LocalDate` is immutable. These operations return new `LocalDate` values and do not change the original `date`.

### 10.5 Leap years and validation

```java
LocalDate leapDay = LocalDate.of(2024, 2, 29);

System.out.println(leapDay.isLeapYear());
```

Output:

```text
true
```

Invalid dates such as `LocalDate.of(2025, 2, 29)` throw `DateTimeException`. Java validates calendar dates rather than silently accepting impossible values.

---

## 11. `LocalTime` — Work with Time of Day

`LocalTime` represents a time without a date or time zone.

```java
import java.time.LocalTime;

LocalTime time = LocalTime.of(14, 30, 15);

System.out.println(time);
```

Output:

```text
14:30:15
```

### 11.1 Get the current time

```java
System.out.println(LocalTime.now());
```

The output depends on when the program runs and the system's default time zone.

### 11.2 Read time components

```java
LocalTime time = LocalTime.of(14, 30, 15);

System.out.println(time.getHour());
System.out.println(time.getMinute());
System.out.println(time.getSecond());
```

Output:

```text
14
30
15
```

### 11.3 Add or subtract time

```java
LocalTime time = LocalTime.of(23, 30);

System.out.println(time.plusHours(2));
System.out.println(time.minusMinutes(45));
```

Output:

```text
01:30
22:45
```

`LocalTime` wraps around the 24-hour day. It does not store the date change that would result from adding two hours to 23:30.

---

## 12. `LocalDateTime` — Date and Time Without a Zone

`LocalDateTime` combines a date and time, but it does not contain a time zone or UTC offset.

```java
import java.time.LocalDateTime;

LocalDateTime meeting = LocalDateTime.of(2026, 10, 9, 14, 30);

System.out.println(meeting);
```

Output:

```text
2026-10-09T14:30
```

It can be useful for a local appointment, such as “the shop opens at 09:00,” when the zone is known from context. It is not sufficient by itself to identify a globally unique instant.

### 12.1 Add date/time amounts

```java
LocalDateTime meeting = LocalDateTime.of(2026, 10, 9, 14, 30);

System.out.println(meeting.plusDays(1));
System.out.println(meeting.plusHours(2));
```

Output:

```text
2026-10-10T14:30
2026-10-09T16:30
```

### 12.2 Convert between date and time parts

```java
LocalDate date = LocalDate.of(2026, 10, 9);
LocalTime time = LocalTime.of(14, 30);

LocalDateTime dateTime = LocalDateTime.of(date, time);

System.out.println(dateTime);
System.out.println(dateTime.toLocalDate());
System.out.println(dateTime.toLocalTime());
```

Output:

```text
2026-10-09T14:30
2026-10-09
14:30
```

No time-zone conversion occurs in these operations.

---

## 13. `ZonedDateTime` and `ZoneId`

A `ZonedDateTime` represents a date and time with a time zone. A zone contains the rules needed to determine offsets at different dates, including daylight-saving changes where applicable.

```java
import java.time.ZoneId;
import java.time.ZonedDateTime;

ZonedDateTime nowInMumbai =
        ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

System.out.println(nowInMumbai);
```

The output changes with the current time.

### 13.1 Use a specific time zone

```java
ZonedDateTime londonTime =
        ZonedDateTime.now(ZoneId.of("Europe/London"));

System.out.println(londonTime);
```

Zone IDs are generally region-based names such as `"Asia/Kolkata"` and `"Europe/London"`. Avoid hard-coding a fixed offset when you need historical or future local-time rules.

### 13.2 Convert an instant to another zone

```java
Instant instant = Instant.now();

ZonedDateTime mumbai = instant.atZone(ZoneId.of("Asia/Kolkata"));
ZonedDateTime london = instant.atZone(ZoneId.of("Europe/London"));

System.out.println(mumbai);
System.out.println(london);
```

Both values represent the same instant, shown in different local times.

### 13.3 Important difference: convert zone vs keep local time

If you start with a `ZonedDateTime` and call `withZoneSameInstant(newZone)`, Java keeps the same instant and displays it in the new zone.

If you use `withZoneSameLocal(newZone)`, Java attempts to keep the same local clock time while changing the zone. The represented instant may change, and daylight-saving gaps or overlaps can affect the result.

For most cross-zone display conversions, `withZoneSameInstant()` is the expected choice.

---

## 14. `Instant` — A Moment on the UTC Timeline

`Instant` represents a point on the timeline, commonly used for timestamps, logging, and event records.

```java
import java.time.Instant;

Instant now = Instant.now();

System.out.println(now);
```

Output varies, for example:

```text
2026-10-09T04:30:00Z
```

The `Z` indicates UTC. The example is illustrative; the actual output depends on the time when the program runs.

### 14.1 Create an instant from epoch seconds

```java
Instant instant = Instant.ofEpochSecond(0);

System.out.println(instant);
```

Output:

```text
1970-01-01T00:00:00Z
```

This is the Unix epoch: 1970-01-01 at 00:00:00 UTC.

### 14.2 Add time to an instant

```java
Instant start = Instant.parse("2026-10-09T10:00:00Z");

System.out.println(start.plusSeconds(3600));
```

Output:

```text
2026-10-09T11:00:00Z
```

Use `Instant` when the data represents an actual point in time independent of a viewer's time zone. Use `LocalDate` or `LocalDateTime` for local calendar concepts where appropriate.

---

## 15. `Duration` and `Period`

Both represent amounts of time, but they focus on different kinds of units.

- `Duration` is time-based, typically measured in seconds and nanoseconds.
- `Period` is date-based, measured in years, months, and days.

### 15.1 `Duration`

```java
import java.time.Duration;
import java.time.LocalTime;

LocalTime start = LocalTime.of(10, 0);
LocalTime end = LocalTime.of(12, 30);

Duration duration = Duration.between(start, end);

System.out.println(duration.toMinutes());
System.out.println(duration.toHours());
```

Output:

```text
150
2
```

The duration is 150 minutes, which is 2 whole hours when reported by `toHours()`.

For elapsed time measured on a real timeline, `Duration.between(Instant, Instant)` is often more suitable than using local clock times.

### 15.2 `Period`

```java
import java.time.LocalDate;
import java.time.Period;

LocalDate start = LocalDate.of(2020, 1, 15);
LocalDate end = LocalDate.of(2023, 4, 20);

Period period = Period.between(start, end);

System.out.println(period.getYears());
System.out.println(period.getMonths());
System.out.println(period.getDays());
```

Output:

```text
3
3
5
```

The period represents 3 years, 3 months, and 5 days between the dates.

### 15.3 Do not confuse calendar time with elapsed time

A month does not have a fixed number of days, and a local day can be affected by daylight-saving transitions in some regions. Use `Period` for calendar-based amounts and `Duration` for time-based elapsed amounts.

---

## 16. Comparing Dates and Times

The date/time classes provide comparison methods such as `isBefore()`, `isAfter()`, and `isEqual()` where appropriate. Many also implement `Comparable`, so their values can be sorted.

```java
LocalDate today = LocalDate.of(2026, 10, 9);
LocalDate deadline = LocalDate.of(2026, 10, 15);

System.out.println(today.isBefore(deadline));
System.out.println(today.isAfter(deadline));
System.out.println(today.isEqual(deadline));
```

Output:

```text
true
false
false
```

For `Instant` values, comparisons are based on timeline position. For `LocalDateTime`, comparisons are based on local date-time fields and do not account for time zones.

### 16.1 Check whether a date is between two dates

```java
LocalDate date = LocalDate.of(2026, 10, 9);
LocalDate start = LocalDate.of(2026, 10, 1);
LocalDate end = LocalDate.of(2026, 10, 31);

boolean inRange = !date.isBefore(start) && !date.isAfter(end);

System.out.println(inRange);
```

Output:

```text
true
```

This includes both the start and end dates.

---

## 17. Parsing and Formatting with `DateTimeFormatter`

Parsing converts text into a date/time object. Formatting converts a date/time object into text.

`DateTimeFormatter` is in `java.time.format`.

### 17.1 Parse ISO dates

```java
LocalDate date = LocalDate.parse("2026-10-09");

System.out.println(date);
```

Output:

```text
2026-10-09
```

The ISO format is supported by default for common `java.time` types.

### 17.2 Parse a custom format

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

DateTimeFormatter formatter =
        DateTimeFormatter.ofPattern("dd-MM-yyyy");

LocalDate date = LocalDate.parse("09-10-2026", formatter);

System.out.println(date);
```

Output:

```text
2026-10-09
```

The input is day-month-year, but `LocalDate.toString()` prints the ISO representation.

### 17.3 Format a date

```java
LocalDate date = LocalDate.of(2026, 10, 9);

DateTimeFormatter formatter =
        DateTimeFormatter.ofPattern("dd MMMM yyyy");

System.out.println(date.format(formatter));
```

Output:

```text
09 October 2026
```

### 17.4 Useful pattern letters

| Pattern | Meaning | Example |
|---|---|---|
| `dd` | Day of month, two digits | `09` |
| `MM` | Month number, two digits | `10` |
| `MMM` | Short month name | `Oct` |
| `MMMM` | Full month name | `October` |
| `yyyy` | Year | `2026` |
| `HH` | Hour in 24-hour format | `14` |
| `hh` | Hour in 12-hour format | `02` |
| `mm` | Minute | `30` |
| `ss` | Second | `15` |
| `a` | AM/PM marker | `PM` |

Uppercase `MM` means month; lowercase `mm` means minute. This is a very common formatting mistake.

For strict parsing, use an appropriate resolver style and formatter configuration when input must be validated precisely. Invalid text or an incompatible format can throw a parsing exception.

---

## 18. Working with Locale

Month names and other text-based date fields can depend on locale.

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

LocalDate date = LocalDate.of(2026, 10, 9);

DateTimeFormatter formatter =
        DateTimeFormatter.ofPattern("dd MMMM yyyy", Locale.ENGLISH);

System.out.println(date.format(formatter));
```

Output:

```text
09 October 2026
```

Supplying a locale makes the intended language explicit instead of relying on the machine's default locale. This is useful for stable output in tests, logs, reports, and user interfaces.

---

## 19. Working with Time Zones Safely

Date and time bugs often occur when a program confuses local wall-clock time with a globally meaningful instant.

Use these general guidelines:

- Use `LocalDate` for concepts such as a birthday or a due date without a time.
- Use `LocalTime` for a recurring local time of day, such as a shop's opening time.
- Use `LocalDateTime` for a local date and time when the zone is known separately or does not matter yet.
- Use `ZonedDateTime` when the time-zone rules are part of the requirement.
- Use `Instant` for event timestamps and moments that must be comparable across time zones.
- Use `Duration` for elapsed time and `Period` for calendar amounts.

For example, storing “2026-10-09 14:30” as a `LocalDateTime` does not say whether the time means Mumbai, London, or another zone. If the value represents a scheduled event in a particular city, preserve the relevant zone or offset when converting it to a globally meaningful timestamp.

Do not assume a fixed UTC offset is equivalent to a time zone. Regions can change their offsets due to political decisions or daylight-saving rules.

---

## 20. `Objects` Utility Class

`java.util.Objects` provides static utility methods for common object operations.

### 20.1 `Objects.equals()`

It safely compares two references, including nulls:

```java
System.out.println(Objects.equals(null, null));
System.out.println(Objects.equals("Java", null));
System.out.println(Objects.equals("Java", "Java"));
```

Output:

```text
true
false
true
```

Calling `"Java".equals(null)` is safe when the left side is non-null, but `Objects.equals(a, b)` handles either side being null.

### 20.2 `Objects.requireNonNull()`

Use it to validate that a required reference is not null:

```java
static String greet(String name) {
    Objects.requireNonNull(name, "name must not be null");
    return "Hello " + name;
}
```

If `name` is null, it throws a `NullPointerException` with the supplied message.

This can make failures occur close to the invalid input rather than later in the method.

### 20.3 `Objects.hash()`

Useful when implementing `hashCode()` for a class:

```java
@Override
public int hashCode() {
    return Objects.hash(id, name);
}
```

When overriding `equals()` and `hashCode()`, follow their contract: equal objects must have equal hash codes.

---

## 21. `UUID` — Generate Unique Identifiers

A UUID is a 128-bit identifier commonly represented as hexadecimal groups separated by hyphens.

```java
import java.util.UUID;

UUID id = UUID.randomUUID();

System.out.println(id);
```

Example output:

```text
550e8400-e29b-41d4-a716-446655440000
```

The output is randomly generated, so your actual value will be different.

UUIDs are useful for identifiers in distributed systems, file names, request IDs, and records that need identifiers without relying on a single central counter. A random UUID is not a replacement for a cryptographic secret-generation API, and a UUID should not be treated as proof of authorization.

---

## 22. Useful `Math` Methods

`java.lang.Math` provides common mathematical operations.

```java
System.out.println(Math.max(10, 20));
System.out.println(Math.min(10, 20));
System.out.println(Math.abs(-15));
System.out.println(Math.sqrt(81));
System.out.println(Math.pow(2, 3));
```

Output:

```text
20
10
15
9.0
8.0
```

Other useful methods include:
- `Math.floor()` — rounds down to an integral-valued `double`.
- `Math.ceil()` — rounds up to an integral-valued `double`.
- `Math.round()` — rounds according to its overload's rules.
- `Math.random()` — returns a pseudorandom `double` from 0.0 inclusive to 1.0 exclusive.

For random values that must be secure, such as tokens or password-reset codes, use a cryptographically secure API such as `SecureRandom`, not `Math.random()`.

---

## 23. Complete Practical Example: Event Reminder

This example combines `LocalDate`, `Period`, `DateTimeFormatter`, and `Optional`.

```java
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

public class Main {
    static Optional<LocalDate> parseDate(String text) {
        if (text == null || text.isBlank()) {
            return Optional.empty();
        }

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("dd-MM-yyyy");

        return Optional.of(LocalDate.parse(text, formatter));
    }

    public static void main(String[] args) {
        Optional<LocalDate> eventDate = parseDate("20-10-2026");

        eventDate.ifPresent(date -> {
            LocalDate today = LocalDate.of(2026, 10, 9);
            Period remaining = Period.between(today, date);

            System.out.println("Event date: " +
                    date.format(DateTimeFormatter.ofPattern("dd MMM yyyy")));
            System.out.println("Days remaining: " +
                    java.time.temporal.ChronoUnit.DAYS.between(today, date));
            System.out.println("Calendar difference: " +
                    remaining.getDays() + " days");
        });
    }
}
```

Output:

```text
Event date: 20 Oct 2026
Days remaining: 11
Calendar difference: 11 days
```

`Period.getDays()` reports the day component of a calendar period, not necessarily the total number of days across a long range. For a total day count, `ChronoUnit.DAYS.between()` is more appropriate.

In production code, parsing can throw `DateTimeParseException` for invalid nonblank input. Decide whether the method should catch and translate that exception, return a validation result, or let the caller handle it.

---

## 24. Common Mistakes

1. **Using `Optional.of()` with a nullable value.** Use `ofNullable()` if the input may be null.
2. **Calling `Optional.get()` without checking.** Use `orElse()`, `orElseGet()`, or `orElseThrow()` as appropriate.
3. **Confusing `orElse()` and `orElseGet()`.** `orElse()` evaluates its fallback argument eagerly; `orElseGet()` calls the supplier only when empty.
4. **Returning `null` from a method that promises `Optional`.** Return `Optional.empty()`.
5. **Using `Optional` everywhere.** It is most commonly useful for method return values that may be absent.
6. **Assuming `LocalDateTime` includes a time zone.** It does not.
7. **Using `LocalTime` to measure elapsed time across midnight.** It wraps around and does not store a date; use `Instant` or another appropriate timeline representation.
8. **Confusing `Period` and `Duration`.** `Period` represents calendar years/months/days; `Duration` represents time-based amounts.
9. **Using `MM` for minutes.** `MM` means month; `mm` means minute.
10. **Assuming `LocalDate.now()` is independent of the system time zone.** It uses the default zone unless a specific clock or zone is supplied.
11. **Using a fixed offset where zone rules matter.** Prefer a region `ZoneId` for location-based appointments.
12. **Assuming a UUID is a secret or credential.** It is an identifier, not an authorization mechanism.
13. **Using `Math.random()` for security-sensitive values.** Use `SecureRandom` for security-related random data.

---

## 25. Interview Questions and Answers

### Q1. What is `Optional`?

A container that may hold a non-null value or be empty. It is often used as a method return type when a result may be absent.

### Q2. What is the difference between `of()` and `ofNullable()`?

`of()` requires a non-null value and throws if passed null. `ofNullable()` returns empty when passed null.

### Q3. What is the difference between `orElse()` and `orElseGet()`?

`orElse()` evaluates its fallback argument before the call. `orElseGet()` invokes a supplier only if the optional is empty.

### Q4. What does `Optional.map()` do?

It transforms a present value and wraps the result in an optional. If the optional is empty, the mapping function is not called.

### Q5. What is the difference between `map()` and `flatMap()` on `Optional`?

`map()` wraps the mapped result. `flatMap()` expects the mapping function to return an optional and avoids nested optionals.

### Q6. Why was the modern Date and Time API introduced?

It provides clearer, immutable types and better date arithmetic and time-zone support than many older date/time APIs.

### Q7. What is the difference between `LocalDate` and `LocalDateTime`?

`LocalDate` represents a date only. `LocalDateTime` represents a date and time but no zone or UTC offset.

### Q8. Does `LocalDateTime` identify a unique global moment?

No. Without a zone or offset, the same local date-time can correspond to different instants in different locations.

### Q9. What is the difference between `Instant` and `ZonedDateTime`?

`Instant` identifies a point on the UTC timeline. `ZonedDateTime` represents a local date-time together with a time zone's rules.

### Q10. What is the difference between `Period` and `Duration`?

`Period` represents date-based years, months, and days. `Duration` represents time-based amounts such as seconds and nanoseconds.

### Q11. What is `DateTimeFormatter` used for?

It parses date/time text into temporal objects and formats temporal objects into text.

### Q12. What does `Objects.requireNonNull()` do?

It throws `NullPointerException` if the supplied reference is null, optionally with a message.

### Q13. What is a UUID used for?

It is a broadly unique identifier useful for records, requests, and distributed systems.

### Q14. Is `Math.random()` suitable for generating authentication tokens?

No. Use a cryptographically secure random generator such as `SecureRandom` for security-sensitive values.

### Q15. Why are `java.time` objects called immutable?

Operations such as `plusDays()` return a new object rather than changing the original object.

---

## 26. Practice Exercises

1. Create an `Optional<String>` from a nullable string using `ofNullable()`.
2. Use `orElse()` to provide `"Guest"` when a name is missing.
3. Compare `orElse()` and `orElseGet()` using a method that prints when it runs.
4. Use `map()` to convert an optional name into its length.
5. Use `filter()` to keep an optional integer only if it is positive.
6. Write a method that returns `Optional<User>` when a user ID is found.
7. Create a `LocalDate` for your birthday and print its year, month, and day.
8. Add 30 days to a date and calculate the difference in days between the original and new date.
9. Create a `LocalTime`, add two hours, and observe what happens near midnight.
10. Create a `LocalDateTime` for a meeting and explain why it does not identify a unique instant.
11. Convert an `Instant` to `Asia/Kolkata` and another region's time zone.
12. Calculate a `Duration` between two `Instant` values.
13. Calculate a `Period` between two dates.
14. Parse a date in `dd-MM-yyyy` format and format it as `dd MMMM yyyy`.
15. Use `Objects.equals()` to compare two nullable strings.
16. Use `Objects.requireNonNull()` to validate a required method argument.
17. Generate a UUID and use it as a request identifier.
18. Use `Math` methods to find the maximum, absolute value, and square root of numbers.
19. Explain which date/time type you would choose for a birthday, an appointment in a known city, and a timestamp from a server log.
20. Write a method that accepts a date string, handles blank input, and clearly defines what happens when the format is invalid.

### Output prediction

```java
Optional<String> value = Optional.of("Java");

System.out.println(value.map(String::length).orElse(0));
System.out.println(Optional.<String>empty().orElse("None"));
```

Answer:

```text
4
None
```

Another example:

```java
LocalDate date = LocalDate.of(2024, 2, 28);

System.out.println(date.plusDays(1));
System.out.println(date.plusDays(2));
```

Answer:

```text
2024-02-29
2024-03-01
```

2024 is a leap year, so February has 29 days.

---

## 27. Quick Revision Checklist

Before moving on, make sure you can explain:

- `Optional` represents a present or missing value.
- `of()`, `ofNullable()`, and `empty()` create optionals.
- `orElse()` evaluates its fallback eagerly; `orElseGet()` evaluates lazily.
- `map()`, `flatMap()`, and `filter()` transform or test optional values.
- `LocalDate` is date-only; `LocalTime` is time-only.
- `LocalDateTime` has no zone.
- `ZonedDateTime` includes a time zone.
- `Instant` identifies a point on the UTC timeline.
- `Period` is date-based; `Duration` is time-based.
- `DateTimeFormatter` parses and formats date/time values.
- `Objects` offers null-safe comparison and validation helpers.
- `UUID` provides a widely unique identifier.
- `Math` offers common mathematical operations.

## 28. Final Summary

`Optional` makes a potentially missing method result explicit and provides tools to handle it without immediately reaching for `null`. The modern `java.time` API provides separate types for dates, times, local date-times, zoned date-times, and timeline instants. Choosing the correct type prevents many bugs, especially when handling appointments and time zones.

Utility classes such as `Objects`, `UUID`, and `Math` round out the everyday Java toolkit. Use these APIs according to the meaning of the problem: represent absence clearly, distinguish calendar dates from timeline moments, and handle invalid or missing input deliberately.

**Next chapter: Chapter 45 — Multithreading Fundamentals: Threads, Runnable, and Thread Lifecycle.**
