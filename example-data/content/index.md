# Publishable

**Do you write technical articles about Javascript and Typescript?** Like this one*.
Then, Publishable is for you.

Publishable lets you reference the actual source code and its comments in Markdown.

Do you write blog-posts about programming and software development?
Great! It means you're sharing your knowledge with fellow developers.

In your technical post, you'll want to include source code snippets.
And of course, you want your source code to work. But when you co-develop
your post and your code, your code is not yet finished when you start
writing it. And when the source code changes, the struggle of keeping
the snippets up-to-date starts.

But there's a way out.

*Note: this README was created with `Publishable`. You'll find the source file in the
`example-data` folder in this repository ([here](https://raw.githubusercontent.com/publishable-tech/publishable-tech/master/example-data/content/index.md))

---

Let's say, this is the source code of your `index.ts`:

```ts title=index.ts
/**
 * @helloTag
 * Call `sayHello` to greet a person by her name.
 */ 
function sayHello (name: string) {
    return `Hello ${name}!`
}
```

With **Publishable**, you can refer to your code in your article (in Markdown):

```markdown title=readme.md
Have a look at the source code:

<Source source="index" tag="helloTag"/>
<Comment source="index" tag="helloTag"/>
```

And this is the result:


```markdown title=readme.md
Have a look at the source code:

<Source source="index" tag="helloTag"/>
<Comment source="index" tag="helloTag"/>
```

Have a look at the source code:

<Source source="index" tag="helloTag"/>
<Comment source="index" tag="helloTag"/>


---


## Why Would I Want To Refer To Code And Comments?

When writing technical articles about Javascript and Typescript, you'll likely want to
show some code. But how does the code get there?

»_You copy it from your IDE and paste it into the draft of your post._«

<div style={{marginTop:"40px"}}/>

What do you do if the code changes? (And, it will change...)

»_You copy it from your IDE and paste it into the draft of your post. Again!_«

<div style={{marginTop:"40px"}}/>

Once you finish your technical article, you will have copied and pasted your source
code so many times it's going to be hard to tell whether all the code is up to date.
And it's even harder to tell whether your code and the post text are in sync.

When you refer to your code and your code-comments, you ensure your article 
contains the actual source code. The source code you wrote, tested and found
to work.

---

## Installation & Configuration

<Comment source="publishable.spec" tag="installpublishable" />

<Comment source="publishable.spec" tag="addtopackage"/>

<Comment source="publishable.spec" tag="configure_publishable" />

The configuration supports the following paths:

```ts
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

<Comment source="publishable.spec" tag="start_publishable" />

```ts title=index.ts lineNumbers=true
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

<Comment source="publishable.spec" tag="tags" />

For example, let's say you have the following source code:

```ts title=index.ts lineNumbers=true
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

```ts
function sayHello (name: string) {
    return `Hello ${name}!`
}
```

And when you use `<Comment source="index" tag="helloTag />`, it will show this:

---

Call `sayHello` to greet a person by her name.

---

`<Comment />` only includes the comment that has the specified tag. But your source
code block may have more than one comment. This way, you can control the parts
of your comments you include or exclude.

Once you finished writing your code and your article, click the `Export`-button you'll
find at the end of your article.

It resolves all the references and provides the resulting Markdown file.
You can use this file as a documentation on GitHub or import it on
any blogging platform.

---

Keeping source code snippets in your technical article up-to-date manually
is cumbersome and error-prone. Publishable lets you reference your source
code and its comments in Markdown. Whenever your source code changes,
it keeps your snippets synchronized.

<!--

All this ithe rest is a HTML comment. It does not appear in MD

**`inline`**

**_em_**

_ `inlineem`_

***

> this is a blockquote
over two lines

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |


[alpha](https://example.com "bravo")

![alpha](https://example.com/favicon.ico "bravo")

-->