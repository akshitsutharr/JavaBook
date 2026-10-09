# Chapter 26 — File Handling in Java

## 1. Learning goals

By the end of this chapter, you should be able to:

- Explain what file handling is and why programs use files.
- Understand file paths, relative paths, and absolute paths.
- Create, read, write, append, copy, move, and delete files.
- Create directories and list directory contents.
- Use Java's modern `Path` and `Files` APIs.
- Understand byte streams, character streams, and buffered streams.
- Handle file-related exceptions safely.
- Use try-with-resources to close files automatically.
- Build practical programs such as a notes manager, log writer, and file-search utility.

Examples in this chapter use Java 11 or newer unless stated otherwise. `Path.of()`, `Files.readString()`, and `Files.writeString()` require Java 11+.

---

## 2. What is file handling?

File handling means working with data stored in files and folders on a storage device. A Java program can create a file, save information in it, read information later, update it, copy it, or delete it.

For example, imagine you are building a student management application. If student details exist only in variables, those details normally disappear when the program ends. If you save them to a file, the application can load them the next time it runs.

### Why do we need file handling?

- **Persistence:** Data can remain available after the program closes.
- **Data exchange:** Programs can read and write formats such as text, CSV, JSON, and logs.
- **Configuration:** Applications can save settings in files.
- **Logging:** Programs can record errors and events.
- **Backup and transfer:** Files can be copied or moved between locations.

### Memory versus a file

```java
String name = "Aarav";
```

This variable holds data while the program is running. It does not automatically save the value to a permanent file.

To keep the value for a later run, your program must write it to a file, for example `student.txt`.

---

## 3. Files and directories

A **file** stores data, such as text, an image, a PDF, or a program.

A **directory** (also called a folder) contains files and possibly other directories.

Example directory structure:

```text
JavaCourse/
├── notes/
│   ├── chapter-01.md
│   └── chapter-02.md
├── data/
│   └── students.txt
└── Main.java
```

Here, `JavaCourse` is a directory. `students.txt` is a file inside the `data` directory.

A file extension such as `.txt`, `.jpg`, or `.pdf` is part of the filename. It does not, by itself, guarantee what the file contains. For example, renaming an image to `photo.txt` does not convert it into text.

---

## 4. Understanding file paths

A **path** tells the operating system where a file or directory is located.

### 4.1 Absolute path

An absolute path describes a location from the root of a filesystem.

Examples:

```text
Windows: C:\Users\Student\Documents\notes.txt
Linux:   /home/student/Documents/notes.txt
```

Absolute paths are clear, but hard-coding one can make your program work only on a particular computer or operating system.

### 4.2 Relative path

A relative path is interpreted from the program's current working directory.

```text
data/notes.txt
```

This means “the `notes.txt` file inside the `data` directory under the working directory.”

The working directory is not necessarily the directory where the `.java` file is saved. It depends on how you launch the program, your IDE configuration, or your terminal location.

Check it with:

```java
System.out.println(System.getProperty("user.dir"));
```

Example output (your path will differ):

```text
/home/student/JavaCourse
```

### 4.3 Use paths instead of hard-coding separators

Modern Java APIs handle platform-specific path separators for you.

```java
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("data", "students.txt");
        System.out.println(path);
    }
}
```

On Linux, the printed path will commonly look like `data/students.txt`; on Windows, it may use backslashes.

### Important note

If Java says that a file does not exist, check:

1. The path you supplied.
2. The current working directory.
3. Whether the file's name and capitalization are correct.
4. Whether the program has permission to access the location.

Linux filesystems are generally case-sensitive, so `Notes.txt` and `notes.txt` may be different files.

---

## 5. The older `File` class

Java provides `java.io.File`, an older API that represents a file or directory path. It can test whether a path exists and perform basic operations.

**Important:** A `File` object does not contain the file's contents. It represents a pathname.

### 5.1 Create a `File` object

```java
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File file = new File("student.txt");

        System.out.println(file.getName());
        System.out.println(file.getPath());
        System.out.println(file.exists());
    }
}
```

If the file does not exist, the last line prints `false`. Creating a `File` object does not create the actual file.

### 5.2 Common `File` methods

| Method | Purpose |
|---|---|
| `getName()` | Returns the final name in the path |
| `getPath()` | Returns the path as supplied |
| `getAbsolutePath()` | Returns an absolute path |
| `exists()` | Checks whether the path exists |
| `isFile()` | Checks whether it is a regular file |
| `isDirectory()` | Checks whether it is a directory |
| `canRead()` | Checks whether it appears readable |
| `canWrite()` | Checks whether it appears writable |
| `length()` | Returns file size in bytes (or `0` for many other cases) |
| `mkdir()` | Creates one directory |
| `mkdirs()` | Creates directories, including missing parents |
| `list()` | Returns names in a directory, or `null` on failure |
| `delete()` | Attempts to delete a file or empty directory |
| `renameTo()` | Attempts to rename or move a path |

The old API can be useful when reading legacy code, but modern code generally benefits from `Path` and `Files`, which provide clearer exceptions and more options.

### 5.3 Create a directory with `File`

```java
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File directory = new File("data");

        if (directory.mkdir()) {
            System.out.println("Directory created.");
        } else {
            System.out.println("Directory was not created.");
        }
    }
}
```

`mkdir()` creates only the final directory. If parent directories are missing, it can fail. `mkdirs()` attempts to create the missing parent directories too.

A failure does not always mean the path already exists; it could also mean a permission problem or an invalid path.

---

## 6. Modern file handling: `Path` and `Files`

For most new Java programs, prefer the APIs in `java.nio.file`.

- `Path` represents a path to a file or directory.
- `Paths` provides older factory methods for obtaining paths.
- `Files` contains static methods to perform file operations.

```java
import java.nio.file.Path;
import java.nio.file.Paths;

public class Main {
    public static void main(String[] args) {
        Path first = Path.of("data", "students.txt"); // Java 11+
        Path second = Paths.get("data", "students.txt");

        System.out.println(first);
        System.out.println(second);
    }
}
```

Both approaches represent the same path. `Path.of()` is a convenient modern option.

### 6.1 Check whether a path exists

```java
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("student.txt");

        if (Files.exists(path)) {
            System.out.println("Path exists.");
        } else {
            System.out.println("Path does not exist.");
        }
    }
}
```

### 6.2 Check the type of a path

```java
Path path = Path.of("student.txt");

System.out.println(Files.isRegularFile(path));
System.out.println(Files.isDirectory(path));
```

These methods return booleans. A symbolic link, missing path, or inaccessible path can affect what is reported. A check can also become outdated if another process changes the path immediately afterward, so do not treat a check as a guarantee that the next operation must succeed.

### 6.3 Read metadata

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.FileTime;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("student.txt");

        try {
            if (Files.exists(path)) {
                System.out.println("Size: " + Files.size(path) + " bytes");

                FileTime modified = Files.getLastModifiedTime(path);
                System.out.println("Last modified: " + modified);

                System.out.println("Readable: " + Files.isReadable(path));
                System.out.println("Writable: " + Files.isWritable(path));
            } else {
                System.out.println("File does not exist.");
            }
        } catch (IOException e) {
            System.out.println("Could not read file metadata: " + e.getMessage());
        }
    }
}
```

`Files.size()` reports a size in bytes. It is not the number of characters in a text file. A Unicode character may take more than one byte in UTF-8.

---

## 7. Creating files and directories with `Files`

### 7.1 Create a new file

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("student.txt");

        try {
            Files.createFile(path);
            System.out.println("File created.");
        } catch (IOException e) {
            System.out.println("Could not create file: " + e.getMessage());
        }
    }
}
```

`Files.createFile()` creates a new empty file. It fails if the file already exists or if the parent directory is missing. It may throw `FileAlreadyExistsException`, which is a subclass of `IOException`.

### 7.2 Create one directory

```java
Files.createDirectory(Path.of("data"));
```

This creates `data` only if its parent already exists and the target does not.

### 7.3 Create nested directories

```java
Files.createDirectories(Path.of("app", "data", "notes"));
```

This creates any missing directories in the path. If the directories already exist, it normally does not fail merely because they exist.

### Complete example

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path folder = Path.of("app", "data", "notes");
        Path file = folder.resolve("chapter.txt");

        try {
            Files.createDirectories(folder);
            if (Files.notExists(file)) {
                Files.createFile(file);
            }
            System.out.println("Folder and file are ready.");
        } catch (IOException e) {
            System.out.println("Operation failed: " + e.getMessage());
        }
    }
}
```

`resolve()` joins a directory path and a child name. It is usually clearer than manually joining strings with `/` or `\\`.

---

## 8. Reading and writing text files with `Files`

For small text files, the `Files` convenience methods are often the simplest approach.

### 8.1 Write text with `Files.writeString()`

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("student.txt");
        String text = "Name: Aarav\nCourse: Java\nYear: Final";

        try {
            Files.writeString(path, text, StandardCharsets.UTF_8);
            System.out.println("Text saved.");
        } catch (IOException e) {
            System.out.println("Write failed: " + e.getMessage());
        }
    }
}
```

If the file does not exist, `writeString()` normally creates it. If it already exists, the default behavior truncates the old contents before writing the new text.

Expected output:

```text
Text saved.
```

The file will contain:

```text
Name: Aarav
Course: Java
Year: Final
```

`StandardCharsets.UTF_8` makes the text encoding explicit. This is a good habit, especially when files may contain accents, symbols, or text in multiple languages.

### 8.2 Read text with `Files.readString()`

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("student.txt");

        try {
            String content = Files.readString(path, StandardCharsets.UTF_8);
            System.out.println(content);
        } catch (IOException e) {
            System.out.println("Read failed: " + e.getMessage());
        }
    }
}
```

This reads the complete file into one `String`. It is convenient for small files, but loading a huge file entirely into memory may be inefficient.

### 8.3 Read all lines

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("student.txt");
        List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);

        for (String line : lines) {
            System.out.println(line);
        }
    }
}
```

`readAllLines()` returns a `List<String>`, with each element representing a line. Like `readString()`, it loads the content into memory, so it is best for reasonably sized files.

Here the `main` method declares `throws IOException` to keep the example short. In a larger application, handle the exception where you can respond appropriately.

---

## 9. Appending text instead of replacing it

Writing text normally replaces the existing contents. To add text to the end, use `StandardOpenOption.APPEND`.

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("log.txt");

        try {
            Files.writeString(
                path,
                "Application started\n",
                StandardCharsets.UTF_8,
                StandardOpenOption.CREATE,
                StandardOpenOption.APPEND
            );

            System.out.println("Log entry added.");
        } catch (IOException e) {
            System.out.println("Could not write log: " + e.getMessage());
        }
    }
}
```

Options used:

- `CREATE`: Create the file if it does not exist.
- `APPEND`: Add the new text at the end instead of replacing the existing text.

A useful variation is to save the current time with each log entry. For example, `java.time.LocalDateTime.now()` can provide a timestamp. For production logging, Java's built-in logging framework or a logging library is usually preferable to building a full logging system manually.

### Important open options

| Option | Meaning |
|---|---|
| `CREATE` | Create the file if it does not exist |
| `CREATE_NEW` | Create only if it does not already exist |
| `TRUNCATE_EXISTING` | Remove existing contents when opening for writing |
| `APPEND` | Write at the end of the file |
| `WRITE` | Open for writing |
| `READ` | Open for reading |

Not every combination of options is valid for every operation. Choose the options that match the behavior you need.

---

## 10. Reading text with `BufferedReader`

`BufferedReader` reads text efficiently and provides `readLine()`, which is useful when processing a file one line at a time.

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("student.txt");

        try (BufferedReader reader =
                 Files.newBufferedReader(path, StandardCharsets.UTF_8)) {

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

        } catch (IOException e) {
            System.out.println("Could not read file: " + e.getMessage());
        }
    }
}
```

### Understanding `readLine()`

- It reads the next line without including the line separator.
- It returns `null` when there are no more lines.
- The loop continues until the end of the file.

The code uses **try-with-resources**, which automatically closes the reader. You do not need to call `reader.close()` manually.

---

## 11. Try-with-resources and closing files

File objects such as readers, writers, and streams use system resources. They should be closed when finished.

A traditional approach uses `finally`:

```java
BufferedReader reader = null;

try {
    reader = Files.newBufferedReader(
        Path.of("student.txt"),
        StandardCharsets.UTF_8
    );

    System.out.println(reader.readLine());
} catch (IOException e) {
    System.out.println(e.getMessage());
} finally {
    if (reader != null) {
        try {
            reader.close();
        } catch (IOException e) {
            System.out.println("Could not close reader.");
        }
    }
}
```

This works, but it is verbose and easy to get wrong.

The recommended approach is:

```java
try (BufferedReader reader =
         Files.newBufferedReader(
             Path.of("student.txt"),
             StandardCharsets.UTF_8
         )) {

    System.out.println(reader.readLine());

} catch (IOException e) {
    System.out.println("File operation failed: " + e.getMessage());
}
```

The resource declared in the parentheses is closed automatically, even when an exception occurs.

Try-with-resources works with objects that implement `AutoCloseable` (including `Closeable`). You can declare multiple resources separated by semicolons:

```java
try (
    var reader = Files.newBufferedReader(Path.of("input.txt"), StandardCharsets.UTF_8);
    var writer = Files.newBufferedWriter(Path.of("output.txt"), StandardCharsets.UTF_8)
) {
    // Read from reader and write to writer.
}
```

Both resources are closed automatically. This example requires the named files and directories to be suitable for the operations; otherwise an `IOException` can occur.

---

## 12. `Scanner` for reading a file

`Scanner` can read tokens or lines from a file. It is familiar to students who already use `Scanner` for keyboard input.

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        try (Scanner scanner =
                 new Scanner(Path.of("numbers.txt"), StandardCharsets.UTF_8)) {

            while (scanner.hasNextInt()) {
                int number = scanner.nextInt();
                System.out.println(number);
            }

        } catch (IOException e) {
            System.out.println("Could not open file: " + e.getMessage());
        }
    }
}
```

If `numbers.txt` contains:

```text
10 20 30
40
50
```

Output:

```text
10
20
30
40
50
```

Use `Scanner` when token-based parsing is useful. For large files or simple line-by-line processing, buffered readers are often a better fit. Be aware that `Scanner` has methods such as `hasNextInt()` that help you check token types before reading them.

---

## 13. Byte streams versus character streams

Java has different APIs for binary data and text data. Choosing the correct kind is important.

### 13.1 Byte streams

Byte streams process raw bytes. They are appropriate for images, audio, PDFs, ZIP files, and other binary formats.

Important base classes:

- `InputStream`: reads bytes.
- `OutputStream`: writes bytes.

Common file stream classes:

- `FileInputStream`
- `FileOutputStream`
- `BufferedInputStream`
- `BufferedOutputStream`

### 13.2 Character streams

Character streams process text characters. Encoding is used to translate between bytes on disk and Java characters.

Important base classes:

- `Reader`: reads characters.
- `Writer`: writes characters.

Common classes include:

- `FileReader`
- `FileWriter`
- `BufferedReader`
- `BufferedWriter`

For predictable behavior across computers, explicitly specify UTF-8 when using APIs that allow a charset, such as `Files.newBufferedReader()` and `Files.newBufferedWriter()`. Older constructors of `FileReader` and `FileWriter` may use the platform's default charset; newer Java versions provide constructors that accept a charset.

### Quick comparison

| Feature | Byte streams | Character streams |
|---|---|---|
| Main unit | Byte | Character |
| Typical use | Images, PDFs, binary files | Text files |
| Base classes | `InputStream`, `OutputStream` | `Reader`, `Writer` |
| Encoding handled as text? | No | Yes, through decoding/encoding |
| Example | `FileInputStream` | `BufferedReader` |

Do not read a binary image using a text reader and expect the original bytes to remain intact.

---

## 14. Reading a file using `FileInputStream`

This example reads raw bytes. For demonstration, it prints each byte as a number.

```java
import java.io.FileInputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (FileInputStream input = new FileInputStream("data.bin")) {
            int value;

            while ((value = input.read()) != -1) {
                System.out.println(value);
            }

        } catch (IOException e) {
            System.out.println("Read failed: " + e.getMessage());
        }
    }
}
```

`read()` returns the next byte value as an integer from `0` to `255`, or `-1` when the end of the stream is reached. Using an `int` is important because `-1` is the end-of-stream marker.

This program is not meant to display text. If the file contains text, its bytes may look like numbers rather than readable letters.

---

## 15. Writing bytes using `FileOutputStream`

```java
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        byte[] data = {65, 66, 67, 10};

        try (FileOutputStream output = new FileOutputStream("data.bin")) {
            output.write(data);
            System.out.println("Bytes written.");
        } catch (IOException e) {
            System.out.println("Write failed: " + e.getMessage());
        }
    }
}
```

Output:

```text
Bytes written.
```

The file receives the four bytes `65`, `66`, `67`, and `10`. In ASCII-compatible encodings, the first three bytes correspond to `A`, `B`, and `C`; `10` is a line-feed byte.

By default, `new FileOutputStream("data.bin")` replaces the file's existing contents. To append, use the constructor with `true`:

```java
try (FileOutputStream output = new FileOutputStream("data.bin", true)) {
    output.write(new byte[] {68, 69});
}
```

This appends bytes `68` and `69`. Be careful: appending bytes is appropriate only when it makes sense for the format. Arbitrarily appending bytes to a PDF or image can corrupt the file.

---

## 16. Buffering streams for better performance

Reading or writing one byte at a time can lead to many operations. Buffered streams keep a block of data in memory and reduce the number of interactions with the underlying file.

```java
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (BufferedInputStream input =
                 new BufferedInputStream(new FileInputStream("data.bin"))) {

            int value;
            while ((value = input.read()) != -1) {
                // Process each byte.
            }

            System.out.println("Finished reading bytes.");
        } catch (IOException e) {
            System.out.println("Read failed: " + e.getMessage());
        }
    }
}
```

Use `BufferedOutputStream` in a similar way when writing raw bytes. For most everyday tasks, the `Files` methods are simpler, but understanding streams helps when working with large files or APIs that expect streams.

---

## 17. Copying a file

The modern `Files.copy()` method is convenient.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class Main {
    public static void main(String[] args) {
        Path source = Path.of("student.txt");
        Path destination = Path.of("student-backup.txt");

        try {
            Files.copy(source, destination);
            System.out.println("File copied.");
        } catch (IOException e) {
            System.out.println("Copy failed: " + e.getMessage());
        }
    }
}
```

By default, copying to a destination that already exists usually fails. If you intentionally want to replace it, use:

```java
Files.copy(
    source,
    destination,
    StandardCopyOption.REPLACE_EXISTING
);
```

`REPLACE_EXISTING` means the existing destination can be replaced. Use it carefully, because the previous destination contents may be lost.

`StandardCopyOption.COPY_ATTRIBUTES` can request that supported file attributes be copied too, but support depends on the filesystem and attributes involved.

---

## 18. Moving and renaming files

A move can also be used to rename a file.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path oldPath = Path.of("old-name.txt");
        Path newPath = Path.of("new-name.txt");

        try {
            Files.move(oldPath, newPath);
            System.out.println("File moved or renamed.");
        } catch (IOException e) {
            System.out.println("Move failed: " + e.getMessage());
        }
    }
}
```

If both paths are in the same directory, this commonly acts like a rename. If they are in different directories, it can move the file.

### Useful move options

- `REPLACE_EXISTING`: Replace a destination when supported by the operation.
- `ATOMIC_MOVE`: Request an atomic move when supported by the filesystem.

An atomic move is not guaranteed to work in every situation, especially across different filesystems. If atomic movement is required, handle the possibility that it is unsupported rather than assuming it will always succeed.

---

## 19. Deleting files

### 19.1 `delete()`

```java
Files.delete(Path.of("old.txt"));
```

It throws an exception if the target does not exist or cannot be deleted.

### 19.2 `deleteIfExists()`

```java
boolean deleted = Files.deleteIfExists(Path.of("old.txt"));
System.out.println(deleted);
```

It returns `true` if the path was deleted and `false` if it did not exist. Other failures, such as access problems, can still throw an exception.

Example with proper error handling:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        try {
            boolean deleted = Files.deleteIfExists(Path.of("old.txt"));

            if (deleted) {
                System.out.println("File deleted.");
            } else {
                System.out.println("File was not present.");
            }
        } catch (IOException e) {
            System.out.println("Delete failed: " + e.getMessage());
        }
    }
}
```

Deleting a non-empty directory with `Files.delete()` normally fails. To remove a directory tree, the program must delete its contents first. Recursive deletion should be used with extreme care because a wrong root path can destroy important data.

---

## 20. Listing files in a directory

### 20.1 Using `Files.list()`

`Files.list()` returns a stream of the entries directly inside a directory. It does not recursively visit all nested directories.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path directory = Path.of("data");

        try (var paths = Files.list(directory)) {
            paths.forEach(System.out::println);
        } catch (IOException e) {
            System.out.println("Could not list directory: " + e.getMessage());
        }
    }
}
```

The stream is closed automatically because it is inside try-with-resources. The order of the listed paths is not guaranteed.

### 20.2 List only regular files

```java
try (var paths = Files.list(Path.of("data"))) {
    paths.filter(Files::isRegularFile)
         .forEach(System.out::println);
} catch (IOException e) {
    System.out.println("Listing failed: " + e.getMessage());
}
```

The filter keeps paths that are regular files.

### 20.3 Sort the names

```java
try (var paths = Files.list(Path.of("data"))) {
    paths.map(path -> path.getFileName().toString())
         .sorted()
         .forEach(System.out::println);
} catch (IOException e) {
    System.out.println("Listing failed: " + e.getMessage());
}
```

This prints only the final names, in sorted order.

### 20.4 Recursively walk a directory

`Files.walk()` visits the directory tree, not just the immediate children.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        try (var paths = Files.walk(Path.of("project"))) {
            paths.filter(Files::isRegularFile)
                 .forEach(System.out::println);
        } catch (IOException e) {
            System.out.println("Could not walk directory: " + e.getMessage());
        }
    }
}
```

`Files.walk()` returns a stream that should be closed. For very large directory trees, process the stream rather than collecting every result into a large list unnecessarily.

### 20.5 `DirectoryStream`

`DirectoryStream` is another option for iterating through the direct entries of a directory:

```java
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path directory = Path.of("data");

        try (DirectoryStream<Path> entries =
                 Files.newDirectoryStream(directory, "*.txt")) {
            for (Path entry : entries) {
                System.out.println(entry.getFileName());
            }
        } catch (IOException e) {
            System.out.println("Could not list text files: " + e.getMessage());
        }
    }
}
```

The `"*.txt"` pattern filters the entries by name. Pattern behavior follows the path-matching rules of the API; it is not a full regular expression.

---

## 21. Searching text in a file

A common task is to find lines that contain a word.

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("notes.txt");
        String keyword = "Java";

        try (BufferedReader reader =
                 Files.newBufferedReader(path, StandardCharsets.UTF_8)) {

            String line;
            int lineNumber = 0;

            while ((line = reader.readLine()) != null) {
                lineNumber++;

                if (line.contains(keyword)) {
                    System.out.println(lineNumber + ": " + line);
                }
            }
        } catch (IOException e) {
            System.out.println("Search failed: " + e.getMessage());
        }
    }
}
```

If `notes.txt` contains:

```text
Java supports classes.
Python supports classes too.
Java supports interfaces.
```

Output:

```text
1: Java supports classes.
3: Java supports interfaces.
```

`String.contains()` is case-sensitive. If you need case-insensitive matching, use a suitable comparison or normalization strategy. For complex search patterns, regular expressions may be appropriate.

---

## 22. Practical program: count lines, words, and characters

This example counts lines, whitespace-separated words, and Java characters as returned by `String.length()`.

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("essay.txt");

        int lines = 0;
        int words = 0;
        long characters = 0;

        try (BufferedReader reader =
                 Files.newBufferedReader(path, StandardCharsets.UTF_8)) {

            String line;

            while ((line = reader.readLine()) != null) {
                lines++;
                characters += line.length();

                String trimmed = line.trim();
                if (!trimmed.isEmpty()) {
                    words += trimmed.split("\\s+").length;
                }
            }

            System.out.println("Lines: " + lines);
            System.out.println("Words: " + words);
            System.out.println("Characters (excluding line separators): " + characters);

        } catch (IOException e) {
            System.out.println("Could not process file: " + e.getMessage());
        }
    }
}
```

### Understanding the counting logic

- `lines++` increments the line count.
- `line.length()` counts UTF-16 code units, not necessarily user-perceived characters. Some Unicode symbols use more than one code unit.
- `trim()` removes leading and trailing characters considered whitespace by that method.
- `split("\\s+")` separates non-empty text using runs of whitespace.

This is a beginner-friendly word counter, not a full linguistic tokenizer. It excludes line separators from the character total and treats words as groups separated by whitespace.

---

## 23. Practical program: a simple notes writer

This program asks the user to enter a note and saves it in `notes.txt`.

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("notes.txt");

        try (Scanner keyboard = new Scanner(System.in)) {
            System.out.print("Enter your note: ");
            String note = keyboard.nextLine();

            Files.writeString(path, note + System.lineSeparator(),
                              StandardCharsets.UTF_8);

            System.out.println("Note saved to: " + path.toAbsolutePath());

        } catch (IOException e) {
            System.out.println("Could not save note: " + e.getMessage());
        }
    }
}
```

Sample run:

```text
Enter your note: Revise inheritance today
Note saved to: /your/working/directory/notes.txt
```

The exact absolute path depends on your computer.

This version replaces the previous file contents. To preserve previous notes and add the new note at the end, use `CREATE` and `APPEND` options as shown earlier.

---

## 24. Practical program: append to a log file

A log file records events that happen while a program runs.

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        Path log = Path.of("application.log");
        String entry = LocalDateTime.now() + " - Application started"
                     + System.lineSeparator();

        try {
            Files.writeString(
                log,
                entry,
                StandardCharsets.UTF_8,
                StandardOpenOption.CREATE,
                StandardOpenOption.APPEND
            );
            System.out.println("Log saved.");
        } catch (IOException e) {
            System.out.println("Could not save log: " + e.getMessage());
        }
    }
}
```

Each successful run adds a new entry rather than replacing the old ones. For a real application, consider Java's `java.util.logging` or a dedicated logging library for levels, formatting, rotation, and error handling.

---

## 25. Practical program: copy a file with a clear message

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class Main {
    public static void main(String[] args) {
        Path source = Path.of("notes.txt");
        Path backup = Path.of("backup", "notes.txt");

        try {
            if (!Files.isRegularFile(source)) {
                System.out.println("Source file does not exist or is not a regular file.");
                return;
            }

            Files.createDirectories(backup.getParent());
            Files.copy(source, backup, StandardCopyOption.REPLACE_EXISTING);

            System.out.println("Backup created at: " + backup.toAbsolutePath());

        } catch (IOException e) {
            System.out.println("Backup failed: " + e.getMessage());
        }
    }
}
```

This creates the `backup` directory if needed, then copies `notes.txt` into it. The `REPLACE_EXISTING` option allows the backup file to be overwritten.

---

## 26. Understanding file-related exceptions

File operations can fail for many reasons: a file may not exist, permissions may be insufficient, the disk may be unavailable, or a destination may already exist.

Common exception types include:

| Exception | Typical reason |
|---|---|
| `IOException` | General input/output failure |
| `NoSuchFileException` | A required path does not exist |
| `FileAlreadyExistsException` | An operation expected a new path, but it already exists |
| `AccessDeniedException` | Access was denied by the filesystem or operating system |
| `NotDirectoryException` | A path component expected to be a directory is not one |
| `DirectoryNotEmptyException` | An operation tried to delete a non-empty directory |

Many of these are subclasses of `IOException`, so catching `IOException` can handle them together. Catch a more specific exception first if you need a different response for that case.

Example:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        try {
            String content = Files.readString(Path.of("missing.txt"));
            System.out.println(content);
        } catch (NoSuchFileException e) {
            System.out.println("The requested file was not found.");
        } catch (IOException e) {
            System.out.println("Another file error occurred: " + e.getMessage());
        }
    }
}
```

Avoid silently ignoring an exception. If a save operation fails, the user should not be told that the data was saved successfully.

---

## 27. Safe path handling

Paths can come from user input, configuration files, or external data. Do not assume that a supplied filename is safe.

For example, an application may expect a user to choose a filename inside `uploads`, but a malicious value such as `../../important.txt` may attempt to point outside that directory.

A basic defensive pattern is to resolve the input against an approved base directory and normalize it:

```java
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path base = Path.of("uploads").toAbsolutePath().normalize();
        String suppliedName = "photo.png";

        Path target = base.resolve(suppliedName).normalize();

        if (!target.startsWith(base)) {
            throw new IllegalArgumentException("Path escapes the upload directory.");
        }

        System.out.println(target);
    }
}
```

This demonstrates a useful check, but it is not a complete security system for every filesystem. Symbolic links, race conditions, and platform-specific behavior can complicate path security. In a real application, validate filenames and permissions carefully, and do not let untrusted input choose arbitrary filesystem paths.

Also remember:

- Never assume a file is safe merely because its extension looks familiar.
- Avoid deleting or overwriting paths you have not validated.
- Do not hard-code passwords, API keys, or other secrets into plain-text files committed to a repository.
- Handle permissions and errors rather than assuming every operation will succeed.

---

## 28. Temporary files

Temporary files are useful for intermediate data that does not need a permanent, predictable name.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        try {
            Path temp = Files.createTempFile("java-course-", ".tmp");
            System.out.println("Temporary file: " + temp);
            Files.writeString(temp, "Temporary data");
        } catch (IOException e) {
            System.out.println("Could not create temporary file: " + e.getMessage());
        }
    }
}
```

The operating system or Java chooses a unique name in an appropriate temporary location. Temporary files are not guaranteed to be deleted automatically just because the program ends. Delete them when no longer needed, or use an appropriate cleanup strategy.

You can also create a temporary directory with `Files.createTempDirectory()`.

---

## 29. CSV files: a brief introduction

CSV stands for **Comma-Separated Values**. It is a common text format for tabular data.

Example:

```text
id,name,course
1,Aarav,Java
2,Meera,Python
```

A very simple file reader might use:

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        try {
            for (String line :
                    Files.readAllLines(Path.of("students.csv"), StandardCharsets.UTF_8)) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Could not read CSV: " + e.getMessage());
        }
    }
}
```

This reads and prints lines; it does not fully parse CSV. Real CSV data can contain quoted fields, commas inside quoted values, and escaped quotes. For complex or externally supplied CSV files, use a proper CSV parser rather than splitting every line on commas.

---

## 30. Advanced overview: `RandomAccessFile`

Most file APIs process content sequentially. `RandomAccessFile` also allows you to seek to a particular position in a file.

```java
import java.io.IOException;
import java.io.RandomAccessFile;

public class Main {
    public static void main(String[] args) {
        try (RandomAccessFile file = new RandomAccessFile("record.bin", "rw")) {
            file.writeInt(100);
            file.writeInt(200);

            file.seek(0);
            System.out.println(file.readInt());
            System.out.println(file.readInt());

        } catch (IOException e) {
            System.out.println("File operation failed: " + e.getMessage());
        }
    }
}
```

Output:

```text
100
200
```

`seek(0)` moves the file pointer to the beginning. `writeInt()` writes a four-byte integer in Java's defined binary format for this class; it does not write the text characters `"100"`. This API is useful for some fixed-record or binary-file tasks, but it is not necessary for most beginner text-file programs.

---

## 31. Common mistakes and how to fix them

**Mistake 1: Creating a `File` object and assuming the file exists.**

```java
File file = new File("notes.txt");
```

This only creates a Java object representing the path. Use `Files.createFile()` or a writing method to create the actual file.

**Mistake 2: Using the wrong working directory.**

A relative path is based on the current working directory. Print `System.getProperty("user.dir")` to inspect it.

**Mistake 3: Using a reader for binary data.**

Text readers decode bytes into characters. Use byte streams or a suitable byte-oriented `Files` method for binary files.

**Mistake 4: Forgetting to close a stream.**

Prefer try-with-resources.

**Mistake 5: Replacing a file when you meant to append.**

Use `StandardOpenOption.APPEND` along with `CREATE` when appropriate.

**Mistake 6: Loading a huge file completely into memory.**

Use `BufferedReader`, streams, or another incremental approach.

**Mistake 7: Ignoring the character encoding.**

Specify `StandardCharsets.UTF_8` where supported.

**Mistake 8: Assuming a path check guarantees a later operation.**

The filesystem can change between checking and using a path. Handle the exception from the actual operation too.

**Mistake 9: Deleting a directory without checking what it contains.**

Directory deletion and recursive cleanup can be destructive. Validate the target and understand the operation before running it.

**Mistake 10: Splitting CSV data on commas without considering quotes.**

Use a CSV parser for full CSV rules.

---

## 32. Quick comparison of the main APIs

| Task | Recommended starting point |
|---|---|
| Represent a path | `Path` |
| Check existence | `Files.exists()` |
| Create nested directories | `Files.createDirectories()` |
| Create a new empty file | `Files.createFile()` |
| Read a small text file | `Files.readString()` |
| Read all lines of a small file | `Files.readAllLines()` |
| Process a large text file line by line | `Files.newBufferedReader()` |
| Write a small text file | `Files.writeString()` |
| Append text | `Files.writeString()` with `CREATE` and `APPEND` |
| Copy a file | `Files.copy()` |
| Move or rename | `Files.move()` |
| Delete a path | `Files.delete()` or `Files.deleteIfExists()` |
| List immediate directory entries | `Files.list()` |
| Walk a directory tree | `Files.walk()` |
| Read binary data | `InputStream` or byte-oriented `Files` methods |
| Write binary data | `OutputStream` or byte-oriented `Files` methods |

For new applications, start with `Path`, `Files`, and try-with-resources. Use lower-level streams when you need more control or when an API specifically requires them.

---

## 33. Output-based questions

Try to predict each result before checking the answer.

### Question 1: Does constructing `File` create a file?

```java
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File file = new File("new.txt");
        System.out.println(file.exists());
    }
}
```

**Answer:** Usually `false` if `new.txt` did not already exist in the working directory. Constructing the object does not create the file. If the file already exists, it prints `true`.

### Question 2: What does `deleteIfExists()` return?

```java
boolean result = Files.deleteIfExists(Path.of("old.txt"));
System.out.println(result);
```

**Answer:** `true` if the path was deleted; `false` if it did not exist. An I/O failure can still throw an exception. The code needs the appropriate imports and exception handling.

### Question 3: What is printed when a file contains two lines?

```java
String content = Files.readString(Path.of("demo.txt"));
System.out.println(content);
```

Suppose `demo.txt` contains:

```text
Hello
Java
```

**Answer:** `Hello` and `Java` appear on separate lines, assuming the file contains that line separator and the read succeeds.

### Question 4: Does `Files.list()` include nested files?

**Answer:** No. It lists the entries directly inside the specified directory. Use `Files.walk()` to visit nested directories as well.

### Question 5: What does `read()` return at end-of-file?

**Answer:** For `InputStream` and its common subclasses, `read()` returns `-1` when no more bytes are available.

### Question 6: What happens if `Files.copy()` targets an existing file without a replacement option?

**Answer:** It normally throws `FileAlreadyExistsException`. Use `StandardCopyOption.REPLACE_EXISTING` only if replacing the destination is intended.

### Question 7: Why use try-with-resources?

**Answer:** It closes resources automatically, including when an exception occurs, reducing resource leaks and cleanup code.

---

## 34. Interview questions and answers

**1. What is file handling in Java?**

File handling is the process of creating, reading, writing, updating, copying, moving, and deleting files or directories using Java APIs.

**2. What is the difference between a file and a directory?**

A file stores data. A directory organizes files and other directories.

**3. What is the difference between `File` and `Path`?**

`File` is the older `java.io` representation of a pathname. `Path` belongs to `java.nio.file` and provides a modern path abstraction that works with the `Files` utility class.

**4. Does `new File("data.txt")` create a file?**

No. It creates a Java object representing a path. An operation such as `Files.createFile()` or writing to the path is needed to create the actual file.

**5. What is the difference between an absolute and a relative path?**

An absolute path identifies a location from a filesystem root. A relative path is resolved from a working directory or another base path.

**6. What is the difference between `Files.readString()` and `Files.readAllLines()`?**

`readString()` returns the entire content as one `String`. `readAllLines()` returns a list of lines. Both load the content into memory and are best for reasonably sized files.

**7. How do you append text to a file?**

Use `Files.writeString()` or `Files.write()` with `StandardOpenOption.APPEND`, usually alongside `StandardOpenOption.CREATE`.

**8. What is try-with-resources?**

It is a `try` statement that automatically closes declared resources that implement `AutoCloseable`.

**9. What is the difference between byte and character streams?**

Byte streams process raw bytes and are suitable for binary data. Character streams read or write text through character encoding and decoding.

**10. Why is buffering useful?**

Buffering reduces frequent underlying read/write operations and can improve performance, especially for sequential processing.

**11. What is the difference between `Files.list()` and `Files.walk()`?**

`Files.list()` visits only direct entries. `Files.walk()` visits entries through a directory tree.

**12. What does `Files.deleteIfExists()` do?**

It deletes a path if it exists and returns whether a deletion occurred. It can still throw an exception for other failures.

**13. What is `IOException`?**

It is a checked exception type used for many input/output failures. More specific file exceptions inherit from it.

**14. Why should a charset be specified when reading text?**

The charset determines how bytes are decoded into characters. Explicitly using UTF-8 helps the same file behave consistently across different systems.

**15. What is `StandardCopyOption.REPLACE_EXISTING`?**

It requests that an existing destination be replaced during a supported copy or move operation.

**16. Is a `.txt` extension proof that a file contains safe text?**

No. File extensions are just names and can be misleading. Applications should validate content according to their requirements.

**17. What is a temporary file?**

A temporary file is created for intermediate data. The application should have a cleanup plan rather than assuming the file will always be deleted automatically.

**18. When should you avoid `Files.readString()`?**

Avoid it for very large files that may not fit comfortably in memory. Process the file incrementally with a reader or stream instead.

---

## 35. Practice exercises

Try these without looking at the sample programs first.

1. Create a directory called `JavaPractice` and a file named `welcome.txt` inside it.
2. Write your name, college, and course to a text file.
3. Read a text file line by line and print each line with its line number.
4. Append a new entry to a file without deleting earlier entries.
5. Copy a file into a `backup` directory, creating the directory if needed.
6. Ask the user for a filename and print whether it exists, is a regular file, and is readable.
7. List only `.txt` files in a directory and print their sizes.
8. Search a file for a keyword and display all matching lines with line numbers.
9. Count lines, words, and characters in a text file.
10. Move a file to a different directory and handle the case where the destination already exists.
11. Create a temporary file, write a message, read it back, and delete it.
12. Read a binary file using a byte stream and copy its bytes to another file.
13. Build a small program that stores multiple student records in a text or CSV file. Clearly document the format you choose.
14. Build a notes program with options to add a note, view notes, and exit.
15. Improve the notes program so that invalid paths and file permission errors are reported clearly.

### Hints

- Use `Path.of()` to build paths.
- Use `Files.createDirectories()` when parent directories might be missing.
- Use `StandardCharsets.UTF_8` for text.
- Use try-with-resources for readers, writers, and streams.
- Use `CREATE` and `APPEND` for adding text.
- Use `Files.walk()` when you need nested entries.
- Handle `IOException` rather than assuming the operation succeeds.

---

## 36. Mini-project: Student Notes Manager

Build a small command-line application that stores notes in a file.

### Requirements

1. Display a menu:
   - Add a note
   - View all notes
   - Search notes
   - Exit
2. Save notes in `student-notes.txt`.
3. Append new notes rather than replacing existing notes.
4. Display a helpful message if the file does not exist yet.
5. Use UTF-8 for text.
6. Handle file errors using `try`/`catch`.
7. Close resources automatically with try-with-resources.

### Suggested structure

```text
StudentNotesManager/
├── Main.java
└── student-notes.txt
```

### Suggested design

You could create methods such as:

```java
static void addNote() { }
static void viewNotes() { }
static void searchNotes() { }
```

Each method should focus on one task. Keep menu handling separate from file operations where possible. This will make the project easier to understand and test.

### Extension challenges

- Add a date and time to every note.
- Add a delete-all-notes option with confirmation.
- Save notes in separate files by subject.
- Count how many notes exist.
- Search without considering letter case.

Be careful with a delete-all option: ask for confirmation and make sure the target is exactly the intended file.

---

## 37. Revision checklist

Before moving to the next chapter, make sure you can explain or perform each item.

- [ ] Explain file handling and persistence.
- [ ] Distinguish files, directories, absolute paths, and relative paths.
- [ ] Explain what `File` represents and why `Path`/`Files` are preferred for modern code.
- [ ] Check a path's existence, type, size, and metadata.
- [ ] Create files and nested directories.
- [ ] Read and write small text files.
- [ ] Append without replacing previous content.
- [ ] Read large text files line by line.
- [ ] Explain byte streams versus character streams.
- [ ] Use buffered streams and try-with-resources.
- [ ] Copy, move, rename, and delete paths.
- [ ] List direct directory entries and recursively walk directories.
- [ ] Handle `IOException` and common file exceptions.
- [ ] Explain why encoding, path validation, and safe deletion matter.
- [ ] Complete the Student Notes Manager mini-project.

---

## 38. Final summary

File handling lets Java programs preserve information beyond the lifetime of a running process. Java's older `File` class represents a pathname, while the modern `Path` and `Files` APIs provide convenient ways to work with files and directories.

For most beginner applications, use `Path` to represent locations, `Files` for common operations, an explicit charset such as UTF-8 for text, and try-with-resources for resources that must be closed. Use `readString()` and `writeString()` for small text files, buffered readers for line-by-line processing, and byte streams for binary content. Always handle I/O failures and be especially careful when overwriting or deleting data.

**Next chapter: Chapter 27 — Wrapper Classes.**
