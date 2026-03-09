1. What is the difference between var, let, and const?**

`var`: The old way. It can be changed and re-declared anywhere in the function, which can cause bugs.
`let`: The modern way. You can change the value later, but you can't re-declare it in the same block.
`const`: Short for "constant." Use this for values that should never change. Once you set it, you're stuck with it.

2. What is the spread operator (...)?
It’s a shortcut (three dots) used to "unpack" or copy elements from one array or object into another. For example, if you want to combine two lists into one big list without typing everything out, you use `...`.

3. What is the difference between map(), filter(), and forEach()?

`forEach()`: Just a simple loop to do something to every item (like printing names). It doesn't give you anything back.
`map()`: Loops through an array and creates a **brand new array** with modified items (like doubling all numbers).
`filter()`: Loops through and creates a **new array** containing only the items that pass a test (like only keeping "Open" issues).

4. What is an arrow function?
It’s a shorter, cleaner way to write functions using the `=>` symbol. It’s great for quick tasks and keeps the code from looking messy with too many `function` keywords.

5. What are template literals?
Instead of using regular quotes, you use backticks (```). They let you join strings and variables easily using `${variable}` without having to use a bunch of `+` signs. It also lets you write strings on multiple lines easily.


