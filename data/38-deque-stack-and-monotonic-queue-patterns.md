# Chapter 38: Deque, Stack, and Monotonic Queue Patterns

## 1. What You Will Learn

This chapter covers Java's `Deque`, `ArrayDeque`, stack operations, and two useful data-structure patterns for problem solving: monotonic stacks and monotonic queues.

By the end, you should be able to:

- Explain the difference between a queue, stack, and deque.
- Use `ArrayDeque` as both a queue and a stack.
- Understand `offerFirst()`, `offerLast()`, `pollFirst()`, `pollLast()`, `push()`, and `pop()`.
- Choose between `Stack`, `Queue`, and `Deque` in Java.
- Solve common problems using a monotonic stack.
- Understand the sliding-window maximum problem and its monotonic deque solution.
- Analyze time and space complexity.

---

## 2. Queue, Stack, and Deque

A **queue** usually follows FIFO (First In, First Out). Items are added at the back and removed from the front.

A **stack** follows LIFO (Last In, First Out). The last item added is the first item removed.

A **deque**, pronounced “deck,” is a double-ended queue. It allows elements to be added or removed at both the front and the back.

<text>

</text>

| Structure | Add | Remove | Common example |
|---|---|---|---|
| Queue | Back | Front | Waiting line |
| Stack | Top | Top | Undo history |
| Deque | Either end | Either end | Flexible queue or stack |

Java's `Deque<E>` interface supports both queue and stack behavior. `ArrayDeque<E>` is a common implementation.

---

## 3. What Is `Deque`?

`Deque` stands for **Double Ended Queue**. It extends `Queue`, so it supports ordinary queue operations as well as operations at both ends.

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        Deque<Integer> deque = new ArrayDeque<>();

        deque.offerLast(10);
        deque.offerLast(20);
        deque.offerFirst(5);

        System.out.println(deque);

        System.out.println(deque.pollFirst());
        System.out.println(deque.pollLast());
        System.out.println(deque);
    }
}
```

Output:

```text
[5, 10, 20]
5
20
[10]
```

The first inserted item was 10. Then 20 was added at the back and 5 at the front. The deque became `[5, 10, 20]`.

---

## 4. Important `Deque` Methods

| Method | Meaning |
|---|---|
| `offerFirst(e)` | Adds at the front; returns `false` if it cannot be added |
| `offerLast(e)` | Adds at the back |
| `addFirst(e)` | Adds at the front; may throw if it cannot be added |
| `addLast(e)` | Adds at the back |
| `peekFirst()` | Reads the front without removing |
| `peekLast()` | Reads the back without removing |
| `pollFirst()` | Removes and returns the front, or returns `null` if empty |
| `pollLast()` | Removes and returns the back, or returns `null` if empty |
| `removeFirst()` | Removes and returns the front; throws if empty |
| `removeLast()` | Removes and returns the back; throws if empty |
| `size()` | Returns the number of elements |
| `isEmpty()` | Checks whether the deque is empty |

For `ArrayDeque`, insertion of `null` is not permitted. Calls such as `offerFirst(null)` throw `NullPointerException`.

### `peek()` vs `poll()`

- `peekFirst()` looks at the first element without removing it.
- `pollFirst()` removes the first element.
- `peekLast()` looks at the last element without removing it.
- `pollLast()` removes the last element.

Example:

```java
Deque<String> deque = new ArrayDeque<>();

deque.offerLast("A");
deque.offerLast("B");

System.out.println(deque.peekFirst());
System.out.println(deque);
System.out.println(deque.pollFirst());
System.out.println(deque);
```

Output:

```text
A
[A, B]
A
[B]
```

---

## 5. Use `ArrayDeque` as a Queue

A FIFO queue adds at the back and removes from the front. `ArrayDeque` can do this efficiently.

```java
import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Queue<String> queue = new ArrayDeque<>();

        queue.offer("Aarav");
        queue.offer("Meera");
        queue.offer("Kabir");

        System.out.println(queue.poll());
        System.out.println(queue.poll());
        System.out.println(queue);
    }
}
```

Output:

```text
Aarav
Meera
[Kabir]
```

The `Queue` interface hides the extra double-ended methods. Use `Queue` as the declared type when you only need FIFO behavior.

---

## 6. Use `ArrayDeque` as a Stack

A stack pushes and pops from the same end. Java's `Deque` interface provides stack-style methods:

- `push(e)`: pushes onto the front of the deque.
- `pop()`: removes and returns the front; throws if empty.
- `peek()`: reads the front without removing it.

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        Deque<String> stack = new ArrayDeque<>();

        stack.push("Book 1");
        stack.push("Book 2");
        stack.push("Book 3");

        System.out.println(stack.peek());
        System.out.println(stack.pop());
        System.out.println(stack.pop());
        System.out.println(stack);
    }
}
```

Output:

```text
Book 3
Book 3
Book 2
[Book 1]
```

The last item pushed, `"Book 3"`, is the first one removed.

### Why prefer `ArrayDeque` over `Stack`?

Java has a legacy class named `Stack`, but for ordinary single-threaded stack operations, `Deque` backed by `ArrayDeque` is generally preferred. `Stack` extends `Vector`, whose design is older and synchronized at the individual-method level. `ArrayDeque` is typically a more direct and efficient stack choice.

Example:

```java
Deque<Integer> stack = new ArrayDeque<>();

stack.push(10);
stack.push(20);

int top = stack.peek();
int removed = stack.pop();
```

Remember that `ArrayDeque` is **not thread-safe**. If several threads need a shared stack or queue, choose a suitable concurrent collection or provide synchronization.

---

## 7. Common Queue and Stack Method Pairs

Java provides two styles of methods for some queue operations.

| Operation | Exception-style method | Special-value method |
|---|---|---|
| Insert at front | `addFirst(e)` | `offerFirst(e)` |
| Insert at back | `addLast(e)` | `offerLast(e)` |
| Read front | `getFirst()` | `peekFirst()` |
| Read back | `getLast()` | `peekLast()` |
| Remove front | `removeFirst()` | `pollFirst()` |
| Remove back | `removeLast()` | `pollLast()` |

The exception-style methods throw when the operation cannot be performed. The special-value methods return `false` or `null`, depending on the operation.

For `ArrayDeque`, insertion normally succeeds unless an exceptional condition occurs, but the distinction remains important when programming to general queue interfaces.

---

## 8. Problem Pattern: Reverse a String Using a Stack

A stack reverses order naturally because the last character pushed is the first character popped.

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        String text = "JAVA";
        Deque<Character> stack = new ArrayDeque<>();

        for (char ch : text.toCharArray()) {
            stack.push(ch);
        }

        StringBuilder reversed = new StringBuilder();

        while (!stack.isEmpty()) {
            reversed.append(stack.pop());
        }

        System.out.println(reversed);
    }
}
```

Output:

```text
AVAJ
```

Time complexity is O(n), and auxiliary space is O(n), where `n` is the number of characters.

For Unicode text containing supplementary characters, a Java `char` represents a UTF-16 code unit rather than always a complete user-perceived character. This simple example is suitable for basic ASCII text.

---

## 9. Problem Pattern: Check Balanced Brackets

A stack is useful for checking whether brackets are correctly nested.

Examples:

- `({[]})` is balanced.
- `([)]` is not balanced.
- `((()))` is balanced.
- `(()` is not balanced.

Algorithm:

1. When an opening bracket appears, push it.
2. When a closing bracket appears, the stack must contain a matching opening bracket at the top.
3. If it does not, the string is invalid.
4. At the end, the stack must be empty.

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static boolean isBalanced(String text) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char ch : text.toCharArray()) {
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.push(ch);
            } else if (ch == ')' || ch == ']' || ch == '}') {
                if (stack.isEmpty()) {
                    return false;
                }

                char opening = stack.pop();

                boolean matches =
                        (opening == '(' && ch == ')') ||
                        (opening == '[' && ch == ']') ||
                        (opening == '{' && ch == '}');

                if (!matches) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isBalanced("({[]})"));
        System.out.println(isBalanced("([)]"));
        System.out.println(isBalanced("(()"));
    }
}
```

Output:

```text
true
false
false
```

Time complexity: O(n). Auxiliary space: O(n) in the worst case.

This version ignores characters other than brackets. A full parser would need to handle strings, comments, and language-specific syntax.

---

## 10. What Is a Monotonic Stack?

A **monotonic stack** is a stack whose values or indices are maintained in a consistent order. Depending on the problem, the stack can be increasing or decreasing.

For example, a monotonic increasing stack keeps values in increasing order from bottom to top. When a new value violates that order, values are popped until the order can be restored.

Monotonic stacks are useful for problems involving:

- Next greater element.
- Next smaller element.
- Previous greater or smaller element.
- Daily temperatures.
- Largest rectangle in a histogram.

The key idea is that an element is removed when it can no longer be the answer for future elements. Each element is usually pushed once and popped at most once, producing O(n) total time.

---

## 11. Next Greater Element

For each element, find the first element to its right that is strictly greater. If none exists, return `-1`.

Example:

```text
Input:  [2, 1, 2, 4, 3]
Output: [4, 2, 4, -1, -1]
```

Explanation:

- For the first 2, the next greater value is 4.
- For 1, the next greater value is 2.
- For the second 2, the next greater value is 4.
- For 4 and 3, there is no greater value to the right.

### Java solution using indices

```java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class Main {
    public static int[] nextGreater(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        Arrays.fill(answer, -1);

        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() &&
                   nums[i] > nums[stack.peek()]) {
                int previousIndex = stack.pop();
                answer[previousIndex] = nums[i];
            }

            stack.push(i);
        }

        return answer;
    }

    public static void main(String[] args) {
        int[] nums = {2, 1, 2, 4, 3};
        System.out.println(Arrays.toString(nextGreater(nums)));
    }
}
```

Output:

```text
[4, 2, 4, -1, -1]
```

### Dry run

The stack stores indices whose next greater element has not yet been found.

| Current value | What happens |
|---:|---|
| 2 | Push index 0 |
| 1 | Push index 1; 1 is not greater than 2 |
| 2 | Pop index 1 and answer 2; push index 2 |
| 4 | Pop index 2 and answer 4; pop index 0 and answer 4; push index 3 |
| 3 | Push index 4 because 3 is not greater than 4 |

The indices left in the stack never found a greater value, so their answers remain `-1`.

Time complexity: O(n). Each index is pushed once and popped at most once. Space complexity: O(n).

---

## 12. Daily Temperatures

Given daily temperatures, find how many days each day must wait until a warmer temperature. If no warmer day exists, the answer is zero.

Example:

```text
Input:  [73, 74, 75, 71, 69, 72, 76, 73]
Output: [1, 1, 4, 2, 1, 1, 0, 0]
```

```java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class Main {
    public static int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() &&
                   temperatures[i] > temperatures[stack.peek()]) {
                int previousDay = stack.pop();
                answer[previousDay] = i - previousDay;
            }

            stack.push(i);
        }

        return answer;
    }

    public static void main(String[] args) {
        int[] temperatures = {73, 74, 75, 71, 69, 72, 76, 73};
        System.out.println(Arrays.toString(dailyTemperatures(temperatures)));
    }
}
```

Output:

```text
[1, 1, 4, 2, 1, 1, 0, 0]
```

The stack stores indices of days that have not yet found a warmer day. When a warmer temperature arrives, it resolves the answer for the relevant earlier day.

Time complexity: O(n). Auxiliary space: O(n).

---

## 13. What Is a Monotonic Queue?

A monotonic queue is commonly implemented using a deque. It keeps candidate values or indices in monotonic order so that the minimum or maximum of a moving window can be found efficiently.

A classic use case is the **sliding-window maximum** problem.

Given an array and a window size `k`, find the maximum value in every contiguous group of `k` elements.

Example:

```text
Array: [1, 3, -1, -3, 5, 3, 6, 7]
k = 3
Output: [3, 3, 5, 5, 6, 7]
```

The windows are:

```text
[1, 3, -1]       -> 3
[3, -1, -3]      -> 3
[-1, -3, 5]      -> 5
[-3, 5, 3]       -> 5
[5, 3, 6]        -> 6
[3, 6, 7]        -> 7
```

A straightforward solution checks all `k` elements in every window and takes O(nk) time. A monotonic deque solves it in O(n).

---

## 14. Sliding-Window Maximum: O(n) Solution

The deque stores **indices**, not just values. Indices help us determine when an element has moved outside the current window.

For a maximum window, keep values in decreasing order from the front to the back:

1. Remove the front index if it is outside the current window.
2. Remove indices from the back while their values are less than or equal to the current value. Those older values cannot be the maximum while the newer, greater value remains in the window.
3. Add the current index at the back.
4. Once the first complete window is formed, the front index points to the maximum.

```java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class Main {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (k <= 0 || k > nums.length) {
            throw new IllegalArgumentException("Invalid window size");
        }

        int n = nums.length;
        int[] answer = new int[n - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // Remove indices that have left the current window.
            while (!deque.isEmpty() && deque.peekFirst() <= i - k) {
                deque.pollFirst();
            }

            // Remove values that cannot be maximum while nums[i] remains.
            while (!deque.isEmpty() &&
                   nums[deque.peekLast()] <= nums[i]) {
                deque.pollLast();
            }

            deque.offerLast(i);

            // Record the maximum after the first complete window forms.
            if (i >= k - 1) {
                answer[i - k + 1] = nums[deque.peekFirst()];
            }
        }

        return answer;
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};
        System.out.println(Arrays.toString(maxSlidingWindow(nums, 3)));
    }
}
```

Output:

```text
[3, 3, 5, 5, 6, 7]
```

### Why remove smaller values from the back?

Suppose the deque contains indices for values 3 and 5, and the current value is 6. The older values 3 and 5 cannot be the maximum for any future window that still includes the new 6: the newer 6 is larger and will remain in the window at least as long as those older values. Therefore, those candidates can be removed.

### Complexity

Time complexity: O(n). Each index enters the deque once and leaves at most once.

Auxiliary space: O(k), because the deque holds only indices that can still belong to the current window.

---

## 15. Min-Window Variant

To find the minimum in every sliding window, reverse the monotonic direction. Keep candidate values in increasing order from front to back.

When processing a new value, remove indices from the back while their values are greater than or equal to the new value. The front index then represents the minimum in the current window.

The general pattern is:

- Sliding maximum: maintain decreasing candidate values.
- Sliding minimum: maintain increasing candidate values.

Both approaches take O(n) time.

---

## 16. Choosing the Right Data Structure

| Need | Suitable structure |
|---|---|
| FIFO processing | `Queue` with `ArrayDeque` |
| LIFO processing | `Deque` with `ArrayDeque` |
| Insert/remove at both ends | `Deque` with `ArrayDeque` |
| Next greater or smaller element | Monotonic stack |
| Sliding-window maximum/minimum | Monotonic deque |
| Remove the globally highest-priority item | `PriorityQueue` |
| Shared thread-safe blocking queue | A suitable concurrent queue, such as `BlockingQueue` implementations |

Do not confuse a priority queue with a monotonic deque. A priority queue exposes the globally highest-priority element, while a monotonic deque is commonly used to maintain candidates within a particular moving window.

---

## 17. Time Complexity Summary

| Operation or pattern | Typical time |
|---|---:|
| `ArrayDeque` add/remove at either end | Amortized O(1) |
| Stack `push()` / `pop()` using `ArrayDeque` | Amortized O(1) |
| Balanced-bracket check | O(n) |
| Reverse a string with a stack | O(n) |
| Next greater element | O(n) |
| Daily temperatures | O(n) |
| Sliding-window maximum | O(n) |
| Store all elements in a stack/deque | O(n) space in the worst case |
| Sliding-window deque | O(k) auxiliary space |

The word **amortized** means that while an individual operation may occasionally trigger internal array resizing, the average cost over a sequence of operations remains constant per operation.

---

## 18. Common Mistakes

**Mistake 1: Using the wrong end of a deque.**  
For FIFO behavior, add at the back and remove from the front. For LIFO behavior, add and remove from the same end.

**Mistake 2: Assuming `ArrayDeque` accepts null.**  
It does not. Use a separate sentinel or explicit state if you need to represent “no value.”

**Mistake 3: Confusing `pop()` and `poll()`.**  
`pop()` removes from the front and throws if empty. `poll()` returns null if empty.

**Mistake 4: Storing values rather than indices in sliding-window problems.**  
Indices make it possible to determine when a candidate leaves the window.

**Mistake 5: Forgetting to remove expired indices.**  
A candidate that lies outside the current window must not be used as the answer.

**Mistake 6: Using a monotonic stack but popping in the wrong condition.**  
For next greater element, pop while the current value is strictly greater than the value at the stack's top index. If the problem asks for greater-or-equal, adjust the condition carefully.

**Mistake 7: Believing every element is compared only once.**  
The total complexity is O(n) because each index is pushed and popped at most once, even though a loop may perform several pops for a single new element.

**Mistake 8: Assuming `ArrayDeque` is thread-safe.**  
It is not. Use an appropriate concurrent structure or synchronization if multiple threads share it.

---

## 19. Interview Questions and Answers

### Q1. What is a deque?

A double-ended queue supports insertion and removal at both the front and back.

### Q2. How can a deque act as a stack?

Use `push()` to add at the front, `pop()` to remove from the front, and `peek()` to inspect the top.

### Q3. How can a deque act as a normal queue?

Use `offerLast()` or `offer()` to add at the back and `pollFirst()` or `poll()` to remove from the front.

### Q4. Why is `ArrayDeque` often preferred over `Stack`?

It is a modern, array-backed deque that provides efficient stack operations without the legacy `Vector` inheritance of `Stack`. It is not thread-safe.

### Q5. What is a monotonic stack?

A stack maintained in increasing or decreasing order, often used to find the next or previous greater/smaller element efficiently.

### Q6. Why is next greater element O(n)?

Each index is pushed once and popped at most once. The total number of stack operations is therefore linear.

### Q7. What is a monotonic deque?

A deque that maintains candidate elements in monotonic order, often to find the minimum or maximum in a sliding window.

### Q8. Why store indices in the sliding-window maximum algorithm?

Indices identify when elements leave the current window and let the algorithm access the corresponding values.

### Q9. Why can smaller values be removed from the back when finding sliding-window maximums?

A newer value that is at least as large will remain in the window at least as long as an older smaller value, so the older value cannot be the maximum for a future window containing the newer one.

### Q10. What is the complexity of the sliding-window maximum algorithm?

O(n) time and O(k) auxiliary space for an array of length n and a window size k.

### Q11. Is `ArrayDeque` thread-safe?

No. It is intended for use without unsynchronized concurrent modification. Use an appropriate concurrent collection for shared access.

### Q12. What is the difference between a monotonic deque and a priority queue?

A priority queue returns the globally highest-priority element. A monotonic deque maintains candidates for a specific ordered process, such as a moving window, and can discard candidates that are no longer useful.

---

## 20. Output-Based Practice Questions

Try to predict each output before reading the answer.

### Question 1

```java
Deque<Integer> deque = new ArrayDeque<>();

deque.offerFirst(2);
deque.offerLast(3);
deque.offerFirst(1);

System.out.println(deque);
System.out.println(deque.pollLast());
System.out.println(deque);
```

**Answer:**

```text
[1, 2, 3]
3
[1, 2]
```

### Question 2

```java
Deque<Integer> stack = new ArrayDeque<>();

stack.push(10);
stack.push(20);
stack.push(30);

System.out.println(stack.pop());
System.out.println(stack.peek());
```

**Answer:**

```text
30
20
```

### Question 3

What does the next-greater-element algorithm return for:

```text
Input: [4, 3, 2]
```

**Answer:**

```text
[-1, -1, -1]
```

No element has a greater value to its right.

### Question 4

What is the result of the sliding-window maximum for:

```text
Array: [2, 1, 5, 3, 4]
k = 2
```

**Answer:**

```text
[2, 5, 5, 4]
```

The windows are `[2, 1]`, `[1, 5]`, `[5, 3]`, and `[3, 4]`.

### Question 5

What is printed?

```java
Deque<Integer> deque = new ArrayDeque<>();

System.out.println(deque.pollFirst());
System.out.println(deque.peekLast());
```

**Answer:**

```text
null
null
```

Both methods return null when the deque is empty.

---

## 21. Practice Exercises

### Beginner

1. Use `ArrayDeque` as a queue to process five names in FIFO order.
2. Use `ArrayDeque` as a stack and print values in LIFO order.
3. Reverse a string using a stack.
4. Check whether a string of brackets is balanced.
5. Demonstrate the difference between `pollFirst()` and `removeFirst()` on an empty deque.

### Intermediate

6. Solve next greater element for an array of integers.
7. Solve daily temperatures using a monotonic stack.
8. Find the next smaller element to the right.
9. Find the sliding-window maximum for a given array and `k`.
10. Modify the sliding-window solution to find the minimum in each window.

### Advanced

11. Solve the largest rectangle in a histogram using a monotonic stack.
12. Solve the stock span problem.
13. Find the maximum of every window of size `k` in O(n) time.
14. Explain why each index is pushed and popped at most once in a monotonic-stack solution.
15. Compare a priority queue and a monotonic deque for sliding-window maximum.

---

## 22. Revision Checklist

Before moving to the next chapter, make sure you can explain:

- A queue follows FIFO, a stack follows LIFO, and a deque supports both ends.
- `ArrayDeque` can implement a queue or stack.
- `push()` and `pop()` operate at the front of the deque.
- `poll()` returns null when empty, while removal methods such as `pop()` can throw.
- `ArrayDeque` does not permit null and is not thread-safe.
- A monotonic stack maintains a useful order of values or indices.
- Next greater element and daily temperatures can be solved in O(n).
- A sliding-window maximum can be solved in O(n) using a monotonic deque.
- Store indices when the algorithm must identify expired elements.
- Every index is pushed and popped at most once in these linear-time patterns.

## 23. What Comes Next?

**Chapter 39: Iterators, Iterable, and ListIterator** will explain how Java traverses collections, how iterators remove elements safely, and how `ListIterator` can move both forward and backward through a list.
