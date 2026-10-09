/**
 * The 51-chapter roadmap. Chapters appear on the site as soon as a matching
 * Markdown file (e.g. data/07-loops.md) exists. Everything else is shown as
 * "coming soon" on the home page.
 */

export type Part = { id: string; title: string; blurb: string; from: number; to: number };

export const PARTS: Part[] = [
  { id: "foundations", title: "Java Foundations", blurb: "Syntax, data, control flow and the building blocks of every program.", from: 1, to: 10 },
  { id: "oop", title: "Object-Oriented Programming", blurb: "The heart of Java: classes, objects, inheritance, polymorphism and design.", from: 11, to: 23 },
  { id: "core", title: "Core Java APIs", blurb: "Packages, exceptions, files, generics, enums and dates.", from: 24, to: 30 },
  { id: "collections", title: "Collections Framework", blurb: "Lists, sets, maps, queues and sorting.", from: 31, to: 36 },
  { id: "functional", title: "Functional Java", blurb: "Lambdas, functional interfaces, streams and Optional.", from: 37, to: 40 },
  { id: "advanced", title: "Concurrency & the JVM", blurb: "Threads, memory, garbage collection, reflection and modern Java.", from: 41, to: 46 },
  { id: "projects", title: "Projects & Practice", blurb: "Put it all together and prepare for interviews.", from: 47, to: 51 },
];

export type CurriculumEntry = { number: number; title: string; topics?: string[] };

export const INTERVIEW_PRACTICE = [
  "What is the difference between a class and an object?",
  "When would you choose an interface over an abstract class?",
  "How does HashMap find and store a value?",
  "What is the difference between == and equals()?",
  "Explain the Java thread lifecycle and the difference between start() and run().",
  "What is the difference between heap memory and stack memory?",
  "How does garbage collection work, and what can cause a memory leak?",
  "Solve a collection or string problem and explain its time complexity.",
] as const;

export const CURRICULUM: CurriculumEntry[] = [
  { number: 1, title: "Java Introduction" },
  { number: 2, title: "Setup & First Program" },
  { number: 3, title: "Variables & Data Types" },
  { number: 4, title: "Operators" },
  { number: 5, title: "Input / Output" },
  { number: 6, title: "Conditions" },
  { number: 7, title: "Loops" },
  { number: 8, title: "Methods" },
  { number: 9, title: "Arrays" },
  { number: 10, title: "Strings" },
  { number: 11, title: "OOP Fundamentals", topics: ["What is OOP?", "Why OOP?", "Procedural vs OOP", "Class", "Object", "State & Behavior", "Real-world modeling"] },
  { number: 12, title: "Classes & Objects", topics: ["Creating classes", "Creating objects", "Fields", "Methods", "Object references", "Multiple objects", "Memory understanding"] },
  { number: 13, title: "Constructors", topics: ["Default constructor", "Parameterized constructor", "Constructor overloading", "Constructor chaining", "this()", "Constructor vs method"] },
  { number: 14, title: "this & static", topics: ["this keyword", "this.field", "this.method()", "this()", "static variables", "static methods", "static blocks", "static vs instance"] },
  { number: 15, title: "Encapsulation", topics: ["What is encapsulation?", "Data hiding", "private", "getters/setters", "validation", "Real-world examples"] },
  { number: 16, title: "Inheritance", topics: ["Why inheritance?", "extends", "Parent/child", "Single inheritance", "Multilevel inheritance", "Hierarchical inheritance", "super", "Constructor inheritance", "Method inheritance"] },
  { number: 17, title: "Method Overloading", topics: ["What is overloading?", "Rules", "Parameters", "Return type", "Constructor overloading", "Compile-time polymorphism"] },
  { number: 18, title: "Method Overriding", topics: ["What is overriding?", "Rules", "@Override", "super", "Access modifiers", "Covariant return type", "Runtime polymorphism"] },
  { number: 19, title: "Polymorphism", topics: ["Compile-time polymorphism", "Runtime polymorphism", "Parent reference → child object", "Dynamic method dispatch", "Upcasting", "Downcasting", "instanceof"] },
  { number: 20, title: "Abstraction", topics: ["What is abstraction?", "Why abstraction?", "Abstract classes", "Abstract methods", "Concrete methods", "Constructors in abstract classes", "Real-world examples"] },
  { number: 21, title: "Interfaces", topics: ["What is an interface?", "implements", "Multiple interfaces", "default methods", "static methods", "private interface methods", "Interface vs abstract class"] },
  { number: 22, title: "OOP Relationships", topics: ["IS-A", "HAS-A", "Association", "Aggregation", "Composition", "Dependency"] },
  { number: 23, title: "OOP Design", topics: ["Coupling", "Cohesion", "SOLID basics", "Good class design", "Immutable objects", "Common OOP mistakes"] },
  { number: 24, title: "Packages & Access Modifiers" },
  { number: 25, title: "Exception Handling" },
  { number: 26, title: "File Handling" },
  { number: 27, title: "Wrapper Classes" },
  { number: 28, title: "Generics" },
  { number: 29, title: "Enums" },
  { number: 30, title: "Date & Time" },
  { number: 31, title: "Collections" },
  { number: 32, title: "List" },
  { number: 33, title: "Set" },
  { number: 34, title: "Map" },
  { number: 35, title: "Queue & Deque" },
  { number: 36, title: "Comparable & Comparator" },
  { number: 37, title: "Lambda Expressions" },
  { number: 38, title: "Functional Interfaces" },
  { number: 39, title: "Stream API" },
  { number: 40, title: "Optional" },
  { number: 41, title: "Multithreading" },
  { number: 42, title: "Concurrency" },
  { number: 43, title: "JVM / JDK / JRE" },
  { number: 44, title: "Memory & Garbage Collection" },
  { number: 45, title: "Multithreading Fundamentals" },
  { number: 46, title: "Modern Java Features" },
  { number: 47, title: "OOP Project 1" },
  { number: 48, title: "OOP Project 2" },
  { number: 49, title: "JVM Memory, Garbage Collection & Performance" },
  { number: 50, title: "Complete Java Roadmap" },
  { number: 51, title: "Java Interview & Practice" },
];

export function partForNumber(n: number): Part | undefined {
  return PARTS.find((p) => n >= p.from && n <= p.to);
}
