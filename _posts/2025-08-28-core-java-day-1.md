---
title: Core Java Day 1
date: 2025-08-28 10:00:00 +0530
categories:
  - Core Java
tags:
  - java
  - dsa
  - core
  - learn
youtubeId:
---
# Core Java Day 1

C:\Users\Yadnyesh Kolte\learn-java\src\Learn\corejava\Hello.java
```java
package Learn.corejava;

public class Hello {  
    public static void main(String[] args) {  
       System.out.println("Bruh!");  
    }  
}
```
**Output**
```
Bruh!
```

| Keyword / Parameter | Description                                                                                                                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public`            | This is an **access modifier**. It means the method is visible and can be called from anywhere in the application. The Java Virtual Machine (JVM) needs to call this method to start the program, so it must be public.                                             |
| `static`            | This keyword means the method belongs to the class itself, rather than to a specific object (instance) of the class. The JVM calls `main` **without creating an object** of your class first.                                                                       |
| `void`              | This is the **return type** of the method. `void` means that the `main` method does not return any value after it finishes execution.                                                                                                                               |
| `main`              | This is the **name of the method**. The JVM is specifically configured to look for a method named `main` as the starting point (entry point) of any Java program.                                                                                                   |
| `String[] args`     | This is the **parameter** to the `main` method. It's an array of `String` objects that lets you pass command-line arguments to your program when you run it. For example, if you run `java MyApp hello world`, the `args` array would contain `["hello", "world"]`. |

### Command line Argument
(Simply giving the input form the cmd)

```cmd
javac Learn/corejava/Hello.java 
java Learn.corejava.Hello hello world 123
```

1. It will compile in first statement, creating .class file
2. Run the class file with arguments (can run without giving argument too - it ignores)

```java
package Learn.corejava;
public class Hello {  
    public static void main(String[] args) {  
       System.out.println("Bruh!");
       // Print command line arguments
       if (args.length > 0) {
           System.out.println("Arguments received:");
           for (int i = 0; i < args.length; i++) {
               System.out.print("args[" + i + "] = " + args[i]);
           }
       } else {
           System.out.println("No arguments provided.");
       }
    }  
}
```
**Output**
```
Bruh! 
Arguments received: args[0] = hello args[1] = world args[2] = 123
```

## Theory 

`class` :- It is a template or a blueprint to create objects.
`object` :- It is an instance of the class.

1. Java is high level platform independent, object oriented programming, strongly typed programming language.
2. Java was created by James Gosling and his team in 1995 at Sum Microsystems.
3. jdk 1.0 is released at 1996
### Usage of the java

| Usage                  | Details                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| Desktop Application    | - Application which run locally<br>- Java SE                                                        |
| Web Application        | - Application which runs on server<br>- Java EE - Enterprise Edition<br>- servlets, jsp, spring     |
| Enterprise Application | - Ejb, Java EE<br>- It must be scalable, with more security and having high volume means more users |
| Mobile Application     | - Application which runs on the Electronic Devices<br>- Like Android Mobile Device<br>- Java ME     |
### Components of Java

`JDK` - Java Development Kit
`JRE` - [Java Runtime Environment](https://www.ibm.com/think/topics/jre)
`JVM` - Java Development Kit

And now, for the differences:

- JDK is the development platform, while JRE is for execution.
- JVM is the foundation, or the heart of the Java programming language, and ensures the program’s Java source code will be platform-agnostic.
- JVM is included in both JDK and JRE, Java programs won’t run without it.

<div align="center">
  <img src="https://www.ibm.com/content/dam/connectedassets-adobe-cms/worldwide-content/creative-assets/s-migr/ul/g/fb/0e/jvm-vs-jre-vs-jdk-body-image.component.xl.ts=1753202963802.png" 
       alt="JVM vs JRE vs JDK Architecture Diagram" 
       width="80%">
</div>
