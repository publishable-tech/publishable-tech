/**
 * We use the Javascript conifguration format because it allows us to
 * document it with **Publishable**.
 * 
 * see {@link https://babeljs.io/docs/en/configuration#javascript-configuration-files}
 */

/**
 * This Babel configuration applies to building the `publishable` package.
 */

/**
 * registers the different file extensions to be identified by Babel.
 * see  {@link https://babeljs.io/docs/en/babel-register}
 * 
 * In the `publishable`-project, we work with Typescript (`ts`) and Javascript (`js`) files.
 * 
 * The frontend (`publishable-app`) is developed in React and uses `tsx`. But the fronte 
 */
require("@babel/register")({
    extensions: ['.js', '.ts']
});

module.exports = function (api) {
    api.cache(true);
  
    const presets = [
        /**
         * Babel works based on plugins. You have plugins which convert arrow functions,
         * spread syntax etc. to the given environment. But to simplify things babel gathers
         * related plugins into  presets. The most popular preset is an “env” preset. It
         * contains all the features from the latest ECMAScript standard.
         * 
         * Along with the preset, you can pass some options. So let’s define that babel should transpile
         * code to node version 8. In order to do that we have to wrap the preset into an array
         * and as a second element pass the JSON object with `targets` property
         */
        [
            "@babel/preset-env", {
                targets: {"node": 8 }
            }
        ],
        /**
         * enable Babel to compile Typescript into Javascript
         */
        "@babel/preset-typescript",

        /**
         * We require this preset to work with MDX
         */
        "@babel/preset-react"
    ];
    const plugins = [
        
        /**
         *  this babel-plugin runs before the aliasing starts, 
         * TODO: do the replacement of the wildcard direclty here!
         * TODO: make it work that the plugin loads in the start.js, not here!
         * /
        ['./dist/babel-wildcard', {
            'exts': ["js", "jsx", "ts", "tsx", "md", "mdx", ""],
            alias: "../dist/mdx-react"
        }]
        /*"@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread",
        "babel-plugin-styled-components",
        */
    ];
  
    return {
      presets,
      plugins
    };
  }