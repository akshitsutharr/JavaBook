# Chapter 37: Priority Queues and Heaps in Java

## 1. What You Will Learn

In this chapter, you will learn how Java's `PriorityQueue` works and how it relates to the heap data structure.

By the end, you should be able to:

- Explain what a priority queue is and how it differs from a normal queue.
- Create a min-heap and a max-heap using Java's `PriorityQueue`.
- Use important methods such as `offer()`, `poll()`, `peek()`, `remove()`, and `contains()`.
- Define custom priority using `Comparator`.
- Store custom objects in a priority queue.
- Understand why printing or iterating a priority queue does not necessarily show sorted order.
- Analyze common operation costs.
- Solve practical problems such as finding the kth largest element and merging sorted data.

---

## 2. What Is a Normal Queue?

A normal queue generally follows FIFO: **First In, First Out**. The first item inserted is the first item removed.

Imagine a line at a ticket counter. If people arrive in this order:

```text
Aarav -> Meera -> Kabir
```

A FIFO queue serves Aarav first, then Meera, then Kabir.

In Java, a normal queue can be implemented with `ArrayDeque`:

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
    }
}
```

Output:

```text
Aarav
Meera
```

The removal order follows the insertion order.

---

## 3. What Is a Priority Queue?

A **priority queue** removes elements according to priority, rather than simply following insertion order.

For example, a hospital emergency department may treat the most urgent case first, even if that person arrived later. This is a simplified illustration of priority-based processing.

In Java, `PriorityQueue` is a class in `java.util`.

```java
import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        pq.offer(40);
        pq.offer(10);
        pq.offer(30);
        pq.offer(20);

        System.out.println(pq.poll());
        System.out.println(pq.poll());
        System.out.println(pq.poll());
        System.out.println(pq.poll());
    }
}
```

Output:

```text
10
20
30
40
```

By default, the smallest element has the highest priority. This behavior is called a **min-priority queue** or **min-heap behavior**.

Notice that the output is sorted because we repeatedly remove the highest-priority element with `poll()`.

---

## 4. What Is a Heap?

A heap is a specialized tree-based data structure commonly used to implement a priority queue.

A binary heap is a complete binary tree: every level is filled except possibly the last, and the last level is filled from left to right.

There are two common types.

**Min-heap:** Every parent is less than or equal to its children. The minimum element is at the root.

```text
        10
       /  \
      20   30
     /
    40
```

**Max-heap:** Every parent is greater than or equal to its children. The maximum element is at the root.

```text
        40
       /  \
      30   20
     /
    10
```

These diagrams show the heap property, not the only possible shape for those values.

### 4.1 The heap property

For a min-heap, the parent is no greater than either child. For a max-heap, the parent is no less than either child.

A heap is **not** a fully sorted tree. In a min-heap, you know that the root is the smallest element, but you cannot assume every element in the left subtree is smaller than every element in the right subtree.

This distinction explains why priority queues can efficiently expose the highest-priority element without sorting all elements after every operation.

### 4.2 How a heap is stored

A binary heap can be stored efficiently in an array or array-backed list. It does not need separate node objects or explicit left and right pointers.

For a zero-based array index `i`:

- Parent index: `(i - 1) / 2` for a non-root node.
- Left child index: `2 * i + 1`.
- Right child index: `2 * i + 2`.

For example, the array:

```text
[10, 20, 30, 40]
```

can represent this min-heap:

```text
        10
       /  \
      20   30
     /
    40
```

The array order is a heap representation, not sorted order.

---

## 5. Creating a `PriorityQueue`

### 5.1 Default priority queue

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();
```

The queue uses natural ordering. For integers, the smallest value is removed first.

### 5.2 Initial capacity

```java
PriorityQueue<Integer> pq = new PriorityQueue<>(20);
```

The number `20` is the initial capacity of the internal array, not a fixed maximum size. The queue can grow as required.

### 5.3 Custom comparator

```java
PriorityQueue<Integer> pq =
        new PriorityQueue<>(Comparator.reverseOrder());
```

This reverses the normal ordering, making the largest integer the highest-priority element.

### 5.4 Constructing from another collection

A `PriorityQueue` can also be constructed from a collection. The queue establishes its own heap ordering based on the applicable ordering rules.

```java
List<Integer> numbers = Arrays.asList(50, 10, 30, 20);
PriorityQueue<Integer> pq = new PriorityQueue<>(numbers);
```

After construction, `poll()` returns the smallest number first.

---

## 6. Important `PriorityQueue` Methods

| Method | Purpose |
|---|---|
| `offer(element)` | Adds an element; returns `true` when added |
| `add(element)` | Adds an element; may throw if it cannot be added |
| `peek()` | Reads the highest-priority element without removing it |
| `poll()` | Removes and returns the highest-priority element; returns `null` if empty |
| `remove()` | Removes and returns the highest-priority element; throws if empty |
| `remove(element)` | Removes one matching element, if present |
| `contains(element)` | Checks whether an element is present |
| `size()` | Returns the number of elements |
| `isEmpty()` | Checks whether the queue is empty |
| `clear()` | Removes all elements |

### 6.1 `offer()` and `add()`

Both add an element. `offer()` is commonly preferred when programming to the `Queue` interface.

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(30);
pq.add(10);
pq.offer(20);

System.out.println(pq.size());
```

Output:

```text
3
```

### 6.2 `peek()` vs `poll()`

`peek()` does not remove the element. `poll()` removes it.

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(20);
pq.offer(5);
pq.offer(15);

System.out.println(pq.peek());
System.out.println(pq.size());

System.out.println(pq.poll());
System.out.println(pq.size());
```

Output:

```text
5
3
5
2
```

The first call to `peek()` returns 5 but leaves it in the queue. The call to `poll()` returns 5 and removes it.

### 6.3 `poll()` vs `remove()`

When the queue is empty:

- `poll()` returns `null`.
- `remove()` with no argument throws `NoSuchElementException`.

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

System.out.println(pq.poll()); // null
// pq.remove(); // Throws NoSuchElementException
```

The separate method `remove(element)` removes a matching element and returns a boolean.

### 6.4 `contains()` and arbitrary removal

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(10);
pq.offer(20);
pq.offer(30);

System.out.println(pq.contains(20));
System.out.println(pq.remove(Integer.valueOf(20)));
System.out.println(pq.contains(20));
```

Output:

```text
true
true
false
```

Finding and removing an arbitrary element is generally O(n), because the queue may need to scan its internal array.

---

## 7. How a Min-Heap Works Internally

The Java API promises priority-queue behavior, not a particular internal array arrangement. The following is a conceptual example of how a binary min-heap can behave.

### 7.1 Inserting an element

Suppose the heap contains:

```text
        10
       /  \
      20   30
```

Now insert 5. A heap first places the new value at the next open position:

```text
        10
       /  \
      20   30
     /
    5
```

The heap property is violated because 5 is smaller than its parent 20. The value moves upward, or **sifts up**:

```text
        10
       /  \
       5   30
      /
     20
```

It still violates the heap property at the root, so it moves up again:

```text
         5
       /   \
      10    30
     /
    20
```

The heap property is now restored.

### 7.2 Removing the root

Suppose we remove the minimum element, 5.

A typical binary-heap implementation moves the last element to the root, then moves it downward until the heap property is restored.

Starting heap:

```text
         5
       /   \
      10    30
     /
    20
```

After replacing the root with the last element, 20:

```text
        20
       /  \
      10   30
```

The root is too large, so it swaps with the smaller child, 10:

```text
        10
       /  \
      20   30
```

The new root is the minimum.

The exact internal sequence is an implementation detail, but this explains why insertion and root removal take logarithmic time in a binary heap.

---

## 8. Creating a Max-Heap

Java's default `PriorityQueue<Integer>` is a min-heap. To make a max-heap, supply a reverse comparator.

```java
import java.util.Comparator;
import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> maxHeap =
                new PriorityQueue<>(Comparator.reverseOrder());

        maxHeap.offer(10);
        maxHeap.offer(50);
        maxHeap.offer(20);
        maxHeap.offer(40);

        while (!maxHeap.isEmpty()) {
            System.out.println(maxHeap.poll());
        }
    }
}
```

Output:

```text
50
40
20
10
```

### Avoid integer subtraction in comparators

A common but unsafe comparator is:

```java
(a, b) -> b - a
```

This can overflow for extreme integer values. Prefer:

```java
Comparator.reverseOrder()
```

or:

```java
(a, b) -> Integer.compare(b, a)
```

Use `Long.compare()`, `Double.compare()`, or the corresponding comparison methods for other numeric types.

---

## 9. Priority Queue of Custom Objects

A priority queue can store objects, not just numbers. However, Java must know how to compare those objects.

Suppose each task has a name and a priority number. Here, a smaller number means a more urgent task.

```java
import java.util.Comparator;
import java.util.PriorityQueue;

class Task {
    String name;
    int priority;

    Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }

    @Override
    public String toString() {
        return name + " (priority " + priority + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Task> tasks =
                new PriorityQueue<>(Comparator.comparingInt(task -> task.priority));

        tasks.offer(new Task("Write report", 3));
        tasks.offer(new Task("Fix production issue", 1));
        tasks.offer(new Task("Reply to email", 2));

        while (!tasks.isEmpty()) {
            System.out.println(tasks.poll());
        }
    }
}
```

Output:

```text
Fix production issue (priority 1)
Reply to email (priority 2)
Write report (priority 3)
```

The comparator tells the queue to prioritize the task with the smallest `priority` field.

### 9.1 Add a tie-breaker

If two tasks have the same priority, you may want to compare their names alphabetically.

```java
Comparator<Task> taskOrder =
        Comparator.comparingInt((Task task) -> task.priority)
                  .thenComparing(task -> task.name);

PriorityQueue<Task> tasks = new PriorityQueue<>(taskOrder);
```

The first comparison uses priority. If the priorities match, the second comparison uses the name.

### 9.2 Using `Comparable`

Instead of supplying a comparator to every queue, a class can implement `Comparable<T>` to define its natural ordering.

```java
class Student implements Comparable<Student> {
    String name;
    int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.marks, other.marks);
    }

    @Override
    public String toString() {
        return name + ": " + marks;
    }
}
```

Now a `PriorityQueue<Student>` uses the natural ordering defined by `compareTo()`. This example removes students with the lowest marks first. Use a comparator instead if you need a different ordering for a particular queue.

---

## 10. Very Important: Iterating a `PriorityQueue` Does Not Sort It

This is one of the most common beginner mistakes.

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(40);
pq.offer(10);
pq.offer(30);
pq.offer(20);

System.out.println(pq);
```

The printed internal order is not guaranteed to be fully sorted. It may look partly ordered because the heap property places the minimum at the root, but do not rely on that representation.

Likewise:

```java
for (int value : pq) {
    System.out.println(value);
}
```

does not promise sorted output.

To process values in priority order, repeatedly use `poll()`:

```java
while (!pq.isEmpty()) {
    System.out.println(pq.poll());
}
```

This prints values from smallest to largest for a natural-order integer priority queue.

If you need to preserve the original queue, make a copy first:

```java
PriorityQueue<Integer> copy = new PriorityQueue<>(pq);

while (!copy.isEmpty()) {
    System.out.println(copy.poll());
}
```

The original queue remains unchanged.

---

## 11. Time Complexity

Let `n` be the number of elements in the priority queue.

| Operation | Typical time complexity |
|---|---:|
| `peek()` | O(1) |
| `offer()` / `add()` | O(log n) |
| `poll()` | O(log n) |
| `contains()` | O(n) |
| `remove(element)` | O(n) |
| `size()` / `isEmpty()` | O(1) |
| Iteration over all elements | O(n), but not sorted |
| Repeatedly poll all elements | O(n log n) total |

The internal array may occasionally grow, which can make a particular insertion take longer. The usual insertion complexity is amortized O(log n).

### Why is `peek()` O(1)?

The highest-priority element is stored at the root, which is at the beginning of the internal heap representation. The queue does not need to search all elements.

### Why are `offer()` and `poll()` O(log n)?

A binary heap has height O(log n). An inserted element may move upward through the tree, and a removed root may require an element to move downward. Each operation follows at most a path through the heap height.

### Why is `contains()` O(n)?

The heap only guarantees the parent-child priority relationship. It is not a fully sorted structure, so an arbitrary element may require scanning many positions.

---

## 12. Practical Program: Find the Kth Largest Element

The kth largest element is the value that would appear at position `k` when the data is sorted in descending order. For example, in `[3, 2, 1, 5, 6, 4]`, the 2nd largest value is 5.

One efficient approach keeps a min-heap of at most `k` elements.

```java
import java.util.PriorityQueue;

public class Main {
    public static int kthLargest(int[] nums, int k) {
        if (k < 1 || k > nums.length) {
            throw new IllegalArgumentException("Invalid k");
        }

        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : nums) {
            minHeap.offer(num);

            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        return minHeap.peek();
    }

    public static void main(String[] args) {
        int[] nums = {3, 2, 1, 5, 6, 4};

        System.out.println(kthLargest(nums, 2));
    }
}
```

Output:

```text
5
```

### Dry run

The heap is limited to two values.

| Value processed | Heap after processing (conceptually) |
|---:|---|
| 3 | 3 |
| 2 | 2, 3 |
| 1 | 2, 3 after removing 1 |
| 5 | 3, 5 after removing 2 |
| 6 | 5, 6 after removing 3 |
| 4 | 5, 6 after removing 4 |

The smallest of the retained top two values is 5, so it is the second-largest value.

Complexity: O(n log k) time and O(k) additional space. This example counts duplicate values as separate positions. If the problem asks for the kth **distinct** largest value, the logic must be adjusted to ignore duplicates.

---

## 13. Practical Program: Find the Kth Smallest Element

To find the kth smallest element, use a max-heap limited to `k` elements. Whenever the heap grows beyond `k`, remove its largest value. The heap then retains the `k` smallest values seen so far, and its root is the kth smallest.

```java
import java.util.Comparator;
import java.util.PriorityQueue;

public class Main {
    public static int kthSmallest(int[] nums, int k) {
        if (k < 1 || k > nums.length) {
            throw new IllegalArgumentException("Invalid k");
        }

        PriorityQueue<Integer> maxHeap =
                new PriorityQueue<>(Comparator.reverseOrder());

        for (int num : nums) {
            maxHeap.offer(num);

            if (maxHeap.size() > k) {
                maxHeap.poll();
            }
        }

        return maxHeap.peek();
    }

    public static void main(String[] args) {
        int[] nums = {7, 10, 4, 3, 20, 15};

        System.out.println(kthSmallest(nums, 3));
    }
}
```

Output:

```text
7
```

Sorted ascending, the array is `[3, 4, 7, 10, 15, 20]`, so the third-smallest value is 7.

---

## 14. Practical Program: Merge Two Sorted Arrays

A priority queue can help combine sorted data. For two arrays, a two-pointer solution is often simpler and more efficient, but a priority queue becomes especially useful when merging many sorted lists.

The next example demonstrates merging three sorted arrays with a min-heap.

```java
import java.util.*;

class Node {
    int value;
    int arrayIndex;
    int elementIndex;

    Node(int value, int arrayIndex, int elementIndex) {
        this.value = value;
        this.arrayIndex = arrayIndex;
        this.elementIndex = elementIndex;
    }
}

public class Main {
    public static List<Integer> mergeSortedArrays(int[][] arrays) {
        PriorityQueue<Node> pq =
                new PriorityQueue<>(Comparator.comparingInt(node -> node.value));

        for (int i = 0; i < arrays.length; i++) {
            if (arrays[i].length > 0) {
                pq.offer(new Node(arrays[i][0], i, 0));
            }
        }

        List<Integer> result = new ArrayList<>();

        while (!pq.isEmpty()) {
            Node node = pq.poll();
            result.add(node.value);

            int nextIndex = node.elementIndex + 1;
            int arrayIndex = node.arrayIndex;

            if (nextIndex < arrays[arrayIndex].length) {
                pq.offer(new Node(
                        arrays[arrayIndex][nextIndex],
                        arrayIndex,
                        nextIndex
                ));
            }
        }

        return result;
    }

    public static void main(String[] args) {
        int[][] arrays = {
            {1, 4, 7},
            {2, 5, 8},
            {3, 6, 9}
        };

        System.out.println(mergeSortedArrays(arrays));
    }
}
```

Output:

```text
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### How it works

1. Insert the first element of each non-empty array into the min-heap.
2. Remove the smallest element and add it to the result.
3. Insert the next element from the same array, if one exists.
4. Repeat until the heap is empty.

If there are `N` total elements across `k` arrays, this approach takes O(N log k) time and O(k) heap space, excluding the result list.

---

## 15. Practical Program: Process Tasks by Priority

```java
import java.util.Comparator;
import java.util.PriorityQueue;

class Job {
    String title;
    int priority;

    Job(String title, int priority) {
        this.title = title;
        this.priority = priority;
    }

    @Override
    public String toString() {
        return title + " [priority=" + priority + "]";
    }
}

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Job> jobs = new PriorityQueue<>(
                Comparator.comparingInt((Job job) -> job.priority)
                          .thenComparing(job -> job.title)
        );

        jobs.offer(new Job("Send email", 3));
        jobs.offer(new Job("Fix login bug", 1));
        jobs.offer(new Job("Update documentation", 2));
        jobs.offer(new Job("Fix payment bug", 1));

        while (!jobs.isEmpty()) {
            System.out.println(jobs.poll());
        }
    }
}
```

Output:

```text
Fix login bug [priority=1]
Fix payment bug [priority=1]
Update documentation [priority=2]
Send email [priority=3]
```

The comparator sorts by priority first. If two jobs have the same priority, it sorts their titles alphabetically.

**Design note:** A priority queue is not automatically a stable queue. If equal-priority items must remain in arrival order, add a sequence number to each item and use it as a tie-breaker.

---

## 16. Common Mistakes

**Mistake 1: Expecting the queue to print in sorted order.**  
Only the highest-priority element is guaranteed to be at the head. Use repeated `poll()` calls to process items in priority order.

**Mistake 2: Assuming Java's default priority queue is a max-heap.**  
It is a min-heap under natural ordering. Use `Comparator.reverseOrder()` for a max-heap of comparable values.

**Mistake 3: Using a custom object without a comparison rule.**  
If objects are not naturally comparable, provide a `Comparator`. Otherwise, insertion may fail with `ClassCastException`.

**Mistake 4: Assuming `contains()` is O(log n).**  
It is generally O(n), because the heap is not fully sorted.

**Mistake 5: Using `poll()` without checking for an empty queue.**  
`poll()` returns null when empty. Unboxing that null into a primitive type can cause `NullPointerException`.

**Mistake 6: Using subtraction in a comparator.**  
Expressions like `b - a` can overflow. Use `Integer.compare(b, a)` or `Comparator.reverseOrder()`.

**Mistake 7: Modifying a priority field after inserting an object.**  
If the comparator depends on a field and that field changes while the object is in the queue, the heap may no longer reflect the intended priority. Remove and reinsert the object after changing its priority, or use another design.

**Mistake 8: Assuming equal-priority elements preserve insertion order.**  
A `PriorityQueue` does not promise stable ordering. Add an explicit tie-breaker if stable order matters.

---

## 17. Interview Questions and Answers

### Q1. What is a priority queue?

A priority queue removes elements according to their priority, rather than necessarily following insertion order.

### Q2. What is the default behavior of Java's `PriorityQueue`?

It uses natural ordering, so the least element is at the head and is removed first.

### Q3. How do you create a max-heap in Java?

For comparable values, use:

```java
PriorityQueue<Integer> maxHeap =
        new PriorityQueue<>(Comparator.reverseOrder());
```

### Q4. What is a heap?

A heap is a complete binary tree that follows a heap property. In a min-heap, each parent is no greater than its children; in a max-heap, each parent is no less than its children.

### Q5. Why is `peek()` O(1)?

The highest-priority element is stored at the root, so it can be returned without searching.

### Q6. Why are insertion and removal O(log n)?

The element may move up or down a binary heap whose height is O(log n).

### Q7. Is a heap a sorted data structure?

No. It guarantees the parent-child heap property, not complete sorted order.

### Q8. Why does iterating a `PriorityQueue` not produce sorted order?

Its iterator follows the internal representation, which is not required to be sorted. Repeatedly poll a copy if you need priority order without consuming the original queue.

### Q9. How do you prioritize custom objects?

Supply a `Comparator` or make the class implement `Comparable`.

### Q10. What is the time complexity of `contains()`?

Generally O(n), because the heap property does not permit a binary-search-style lookup for an arbitrary element.

### Q11. How can you find the kth largest element efficiently?

Maintain a min-heap of at most `k` elements. The heap's root is the kth largest after all elements have been processed. This takes O(n log k) time.

### Q12. Is `PriorityQueue` thread-safe?

No. `PriorityQueue` is not designed for concurrent access with unsynchronized modifications. Java provides `PriorityBlockingQueue` for a thread-safe, blocking priority queue use case.

### Q13. What is the difference between `PriorityQueue` and `PriorityBlockingQueue`?

`PriorityQueue` is not thread-safe and does not provide blocking operations. `PriorityBlockingQueue` is thread-safe and supports blocking retrieval, but it is logically unbounded, so insertions do not wait for capacity to become available.

### Q14. Does `PriorityQueue` allow null elements?

No. Inserting null throws `NullPointerException`.

---

## 18. Output-Based Practice Questions

Try to predict each output before reading the answer.

### Question 1

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(30);
pq.offer(10);
pq.offer(20);

System.out.println(pq.peek());
System.out.println(pq.poll());
System.out.println(pq.peek());
```

**Answer:**

```text
10
10
20
```

`peek()` reads the smallest value; `poll()` removes it.

### Question 2

```java
PriorityQueue<Integer> pq =
        new PriorityQueue<>(Comparator.reverseOrder());

pq.offer(4);
pq.offer(9);
pq.offer(2);

System.out.println(pq.poll());
System.out.println(pq.poll());
```

**Answer:**

```text
9
4
```

The reverse comparator makes the largest number the highest-priority element.

### Question 3

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(8);
pq.offer(3);
pq.offer(6);

System.out.println(pq.size());
System.out.println(pq.contains(6));
```

**Answer:**

```text
3
true
```

### Question 4

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(7);
pq.offer(1);
pq.offer(5);

PriorityQueue<Integer> copy = new PriorityQueue<>(pq);

while (!copy.isEmpty()) {
    System.out.print(copy.poll() + " ");
}

System.out.println();
System.out.println(pq.size());
```

**Answer:**

```text
1 5 7
3
```

Polling the copy does not remove elements from the original queue.

### Question 5

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(12);
pq.offer(4);
pq.offer(9);

pq.poll();

System.out.println(pq.peek());
```

**Answer:**

```text
9
```

The smallest element, 4, was removed, leaving 9 as the new minimum.

---

## 19. Practice Exercises

### Beginner

1. Create a min-heap of ten integers and print them in ascending order using `poll()`.
2. Create a max-heap and print its values in descending order.
3. Demonstrate the difference between `peek()` and `poll()`.
4. Test `poll()` and `remove()` on an empty priority queue.
5. Store five strings in a priority queue and observe natural string ordering.

### Intermediate

6. Create a `PriorityQueue<Student>` that removes students with the lowest marks first.
7. Create a task queue ordered by urgency and then by task name.
8. Find the kth largest value in an integer array using a heap of size `k`.
9. Find the kth smallest value using a max-heap of size `k`.
10. Merge two or more sorted lists using a priority queue.

### Advanced

11. Implement a streaming kth-largest tracker: add values one at a time and report the kth largest after enough values have arrived.
12. Merge `k` sorted arrays and analyze its time and space complexity.
13. Design a comparator that prioritizes higher scores first, then names alphabetically.
14. Explain why changing an object's priority field after insertion can break expected queue behavior.
15. Compare `PriorityQueue` with `PriorityBlockingQueue` and explain which one suits a multi-threaded task processor.

---

## 20. Revision Checklist

Make sure you can explain these points without looking at the chapter:

- A normal queue commonly follows FIFO; a priority queue removes by priority.
- Java's default `PriorityQueue` is a min-priority queue.
- A max-heap can be created with `Comparator.reverseOrder()`.
- A binary heap is a complete binary tree with a heap property.
- `peek()` reads the head; `poll()` removes it.
- A heap is not fully sorted, so iteration does not guarantee sorted order.
- `offer()` and `poll()` are typically O(log n); `peek()` is O(1).
- `contains()` and removal of an arbitrary element are generally O(n).
- Custom objects need a comparison rule.
- Explicit tie-breakers are needed if equal-priority items must have a predictable order.
- A min-heap of size `k` can find the kth largest element in O(n log k) time.
- `PriorityQueue` is not thread-safe; `PriorityBlockingQueue` is designed for concurrent use.

## 21. What Comes Next?

**Chapter 38: Deque, Stack, and Monotonic Queue Patterns** will explain double-ended queues, Java's `ArrayDeque`, stack operations, and practical patterns for DSA problems.
