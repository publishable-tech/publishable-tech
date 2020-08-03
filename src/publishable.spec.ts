
/**
 * @installpublishable
 * 
 * Add **Publishable** as a `devDependency` to the project that contains the source
 * code you'll want to write about.
 * 
 * ```bash
 * npm install --save-dev publishable-tech
 * ```
 */
describe("Install publishable", () => {
});


/**
 * @addtopackage
 * Publishable provides an executable script at `./node-modules/publishable-tech/index.js`
 * 
 * Add a `script` to your `package.json` in which you call this script in NodeJs and pass
 * `start` as an argument
 * 
 * ```json
 * "scripts": {
 *  "publishable": "node ./node-modules/publishable-tech/index.js start"
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
