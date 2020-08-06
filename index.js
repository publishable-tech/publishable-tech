#!/usr/bin/env node
/**
 * This script is the entry-point of the commandline interface.
 * It takes the provided arguments and calls the respective function with it
 *
 * This module does not resolve correctly: see {@link https://stackoverflow.com/questions/43403831/webpack-report-an-error-about-unexpected-character}
 * TODO: reloacate to another place or use `shebang-loader`
 * 
 * @arguments
 *    $1: the script to run
 *    $2: the path to the configuration file
 *
 * @example: `publishable build ./publishable.config.js`
 * @example: `publishable start ./publishable.config.js`
 *
 */

/**
 * The `dotenv`-documentation says:
 * "As early as possible in your application, require and configure dotenv."
 * 
 * We use environment variables to tell the difference between running the script locally
 * and when it is deployed. Because local paths are completely different.
 */
require('dotenv').config();
//console.log("__PUBLISHABLE_DEV__: ",process.env.__PUBLISHABLE_DEV__);

const path = require('path');


/**
 * the entry point of the `start`-mode.
 * During development, we use the source code from `src` because
 * we don't want to build the project after each change.
 * 
 * When not in "dev"-mode, we use the compiled sources from the `dist`-folder
 */
const start = require(`./${"development".localeCompare(process.env.__PUBLISHABLE_ENV__) == 0 ? "src" : "dist"}/start`).default;

// get the provided args
const [, , ...args] = process.argv;


/**
 * @addtopackage
 * 
 * Publishable provides an executable script at `./node-modules/@publishable/index.js`
 * Add a `script` to your `package.json` in which you call this script in NodeJs and pass
 * `start`: as an argument
 * 
 * ```json
 * "scripts": {
 *  "publishable": "node ./node-modules/publishable-tech/index.js start"
 * }
 * ```
 */
/**
 * The `COMMANDS` specify the valid options as the first argument ($1) passed to
 * `publishable` script.
 * 
 * Publishable supports differnt modes {@link about}. To start **Publishable** in a
 * mode, the user needs to pass the corresponding command.
 */
const COMMANDS = {
  /**
   * The `start` command runs **Publishable** in the live mode. It reflects
   * any change of the sources
   * 
   * @example `publishable start`
   */
  "START": "start"

};

/**
 * enable using await at top-level.
 * see: https://stackoverflow.com/questions/39679505/using-await-outside-of-an-async-function
 */
;(async () => {
  
  /**
   * load the configuration from `publishable.config.js`
   */ 
  const config = require(path.join(process.cwd(), 'publishable.config.js'));

  /**
   * Select the provided script
   */
  if (args.length > 0) {
    
    /**
     * Check the command passed by the user
     */
    if (COMMANDS.START.localeCompare(args[0]) == 0) {
      start({
        contentPath: config.contentPath, //"./example-data/content",
        sourcesPath: config.sourcesPath, //"./example-data/src",
        dataModule: config.dataModule, //"./example-data/src/app.js"
      });
    } else {
      console.log("Invalid command argument.")

    }
    
  } else {
    /**
     * If the user does not provide an argument, we look at the current folder for the configuration
     */
  }
  
})();