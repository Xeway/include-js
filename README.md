# Include.js

A simple JavaScript library that allows you to include external HTML files.
This works exactly like [EJS](https://ejs.co/#docs) (for my Node.js fellas) or [Jinja](https://jinja.palletsprojects.com/en/3.1.x/templates/#include) (for Python lovers), except that you don't have to set up a complicated server to make it work.

## How to use it

First, import the necessary file in the `head` tag:
```HTML
<script src="https://raw.githubusercontent.com/Xeway/includejs/main/include.js" defer></script>
```

After that, insert an HTML file (wherever you want in your code):
```HTML
<include src="<your_file>.html">
```
Aaaaand that's it 😉

You can also make your HTML files more customizable by *injecting* variables. For instance:
```HTML
<include src="<your_file>.html" message="Hello world!">
```
In `<your_file>.html`, you can use the variable `message` by using the following syntax:
```HTML
<$ message $>
```
This will render `message`'s value: `Hello world!`.

## Why this is useful ?

Because there's sometimes redundant code that you have to write in every HTML file you create (generally it's a footer/header).
So it's way simpler and more maintainable to store a same code in 1 file and just including it in all your other files by using 1 line.

## Issues

> The library doesn't work, the console throws me the error <span style="color: red;">`CORS request not HTTP`</span>.

↳ This is because Include.js makes requests to get your HTML files you want to include, and it's not allowed by browsers to request to internal files for security reasons. To make it work, you'll have to run your website on localhost (when developing) by using something like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and if your website is already on production, you just have to make your HTML files public.