
/**
 * @installpublishable
 * 
 * Add **Publishable** as a `devDependency` to the project that contains the source
 * code you'll want to write about.
 * 
 * ```bash
 * npm install --save-dev @publishable/tech
 * ```
 */
describe("Install publishable", () => {
});


/**
 * @addtopackage
 * Publishable provides an executable script at `./node-modules/@publishable/tech/index.js`
 * 
 * Add a `script` to your `package.json` in which you call this script in NodeJs and pass
 * `start` as an argument
 * 
 * ```json
 * "scripts": {
 *  "publishable": "node ./node-modules/@publishable/tech/index.js start"
 * }
 * ```
 */
describe("Add publishable script", () => {
});

/**
 * @configure_publishable
 * Publishable looks for the `publishable.config.js` file in
 * the root directory of your project (in the same directory your
 * `package.json` is in).
 * 
 * ```js title=publishable.config.js
 * module.exports = {
 *   contentPath: "./example-data/content",
 *   sourcesPath: "./example-data/src",
 * }
 * ```
 * 
 */
describe("Configure publishable", () => {
});


/**
 * @start_publishable
 * Start **Publishable** during development with `npm run publishable`.
 * 
 * Publishable loads your content and your sources and starts on `localhost:8080`.
 * Publishable reloads automatically, Whenever you change your code or your content.
 * Thus, you can see any change directly.
 * 
 * Write your Javascript and Typescript code. Do it the way you like and the way you
 * usually write your code. Like this:
 * 
 * ```ts title=index.ts
 * function sayHello (name: string) {
 *   return `Hello ${name}!`
 * }
 * ```
 *  
 * If you want to refer to a piece of code, add a leading comment (starting with `/**`)
 * and specify an arbitrary tag (starting with an `@`-sign). Like this:
 * 
 */
describe("Start publishable", () => {
});

/**
 * @tags
 * 1. The `<Source />`-tag adds source code snippet.
 * 1. The `<Comment />`-tag adds a comment.
 * 
 * Both components take two properties:
 * - `source` specifies the source-file (without file extension) you want to add
 * a snippet or a comment from.
 * - `tag` specifies the snippet or comment to include
 * 
 * Of course, you can only place the `tag` into a comment. `<Source />` will include
 * the source code block the tagged comment refers to. Comments (starting with
 * `/**`) preceed code blocks they refer to.
 */
describe("Source Tag", () => {
});

/**
 * @sourcetag
 * The `<Source />`-tag takes 
 */
describe("Comment Tag", () => {
});


/**
 * @commenttag
 */
describe("Comment Tag", () => {
});