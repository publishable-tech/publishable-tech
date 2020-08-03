module.exports = {
    /**
     * This is a node project
     */
    testEnvironment: 'node',

    /**
     * Test cases must end with `.spec.ts` or with `.spec.js` or `.test.ts` or `.test.js`
     * @example output.spec.ts
     */
    testRegex: "((\\.|/*.)(spec|test))\\.(ts|js)?$",

    /**
     * Ensure to test only src and not other folders
     */
    roots: [
      "src"
    ]
  };