# Publishable

**Do you write technical articles about Javascript and Typescript?** Like this one*.
Then, Publishable is for you.

Publishable lets you reference the actual source code and its comments in Markdown.

*Note: this README was created with `Publishable`. You'll find the source file in the
`example-data` folder in this repository ([here](https://raw.githubusercontent.com/publishable-tech/publishable-tech/master/example-data/content/index.md))

---

Let's say, this is the source code of your `index.ts`:

```
/**
 * @helloTag
 * Call `sayHello` to greet a person by her name.
 */ 
function sayHello (name: string) {
    return `Hello ${name}!`
}

```


With **Publishable**, you can refer to your code in your article (in Markdown):

```
Have a look at the source code:

<Source source="index" tag="helloTag"/>
<Comment source="index" tag="helloTag"/>

```


And this is the result:

---

Have a look at the source code:


```
function sayHello(name) {
  return `Hello ${name}!`;
}
```


Call `sayHello` to greet a person by her name.

---

## Why Would I Want To Refer To Code And Comments?

When writing technical articles about Javascript and Typescript, you'll likely want to
show some code. But how does the code get there?

»_You copy it from your IDE and paste it into the draft of your post._«



What do you do if the code changes? (And, it will change...)

»_You copy it from your IDE and paste it into the draft of your post. Again!_«



Once you finish your technical article, you will have copied and pasted your source
code so many times it's going to be hard to tell whether all the code is up to date.
And it's even harder to tell whether your code and the post text are in sync.

When you refer to your code and your code-comments, you ensure your article
contains the actual soruce code. The source code you wrote, tested, and found
to work.

---

## Installation & Configuration

Add **Publishable** as a `devDependency` to the project that contains the source
code you'll want to write about.

```
npm install --save-dev publishable-tech

```


Publishable provides an executable script at `./node-modules/@publishable/tech/index.js`

Add a `script` to your `package.json` in which you call this script in NodeJs and pass
`start` as an argument

```
"scripts": {
 "publishable": "node ./node_modules/publishable-tech/index.js start"
}

```


Publishable looks for the `publishable.config.js` file in
the root directory of your project (in the same directory your
`package.json` is in).

```
module.exports = {
  contentPath: "./example-data/content",
  sourcesPath: "./example-data/src",
}

```


The configuration supports the following paths:

```
type IPublishableConfig = {
  /**
   * The `contentPath` is the (relative to the current working directory)
   * path to the user's MD-content-folder
   */
  contentPath: string;

  /**
   * The `sourcesPath` is the (relative to the current working directory)
   * path to the user's source code folder
   */
  sourcesPath: string;
};

```


---

## Use

Start **Publishable** during development with `npm run publishable`.

Publishable loads your content and your sources and starts on `localhost:8080`.
Publishable reloads automatically, Whenever you change your code or your content.
Thus, you can see any change directly.

Write your Javascript and Typescript code. Do it the way you like and the way you
usually write your code. Like this:

```
function sayHello (name: string) {
  return `Hello ${name}!`
}

```


If you want to refer to a piece of code, add a leading comment (starting with `/**`)
and specify an arbitrary tag (starting with an `@`-sign). Like this:

```
/**
 * @helloTag
 * Call `sayHello` to greet a person by her name.
 */ 
function sayHello (name: string) {
    return `Hello ${name}!`
}

```


Add a markdown (`.md`)-file to the folder you specified as the `contentPath`
in the `publishable.config.js`.

You can use the normal Markdown syntax. And you can use two special tags:


1. The `<Source />`-tag adds source code snippet.
1. The `<Comment />`-tag adds a comment.

Both components take two properties:


- `source` specifies the source-file (without file extension) you want to add
a snippet or a comment from.
- `tag` specifies the snippet or comment to include

Of course, you can only place the `tag` into a comment. `<Source />` will include
the source code block the tagged comment refers to. Comments (starting with
`/**`) preceed code blocks they refer to.

For example, let's say you have the following source code:

```
function sayGoodbye(name: string) {
    return `Good bye ${name}!`
}
/**
 * @helloTag
 * Call `sayHello` to greet a person by her name.
 */ 
/**
 * Another comment on `sayHello`
 */ 
function sayHello (name: string) {
    return `Hello ${name}!`
}

```


When you use `<Source source="index" tag="helloTag />` in your `.md`-file, it
will show the following:

```
function sayHello (name: string) {
    return `Hello ${name}!`
}

```


And when you use `<Comment source="index" tag="helloTag />`, it will show this:

---

Call `sayHello` to greet a person by her name.

---

`<Comment />` only includes the comment that has the specified tag. But your source
code block may have more than one comments. This way, you can control the parts
of your comments you include or exclude.

Once you finished writing your code and your article, click the `Export`-button you'll
find at the end of your article.

It resolves all the references and provides the resulting Markdown file.
You can use this file as a documentation on GitHub or import it on
any blogging platform.

---
