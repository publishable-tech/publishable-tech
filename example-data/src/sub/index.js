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

const path = require('path');

/**
 * the entry point of the `start`-mode.
 * Does not work with the `dist`-version 
 */
const start = require('./src/start').default;

// get the provided args
const [, , ...args] = process.argv;

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
   * Select the provided script
   */
  if (args.length > 0) {
    /**
     * TODO: load the configuration from the provided path
     */

    // @ref commandswitch
    /**
     * Check the command passed by the user
     */
    if (COMMANDS.START.localeCompare(args[0]) == 0) {
      start({
        contentPath: "./example-data/content",
        sourcesPath: "./example-data/src",
        dataModule: "./example-data/src/app.js"
      });
    } else {
      console.log("Invalid command argument.")

    }
    // @endref commandswitch
    
  } else {
    /**
     * If the user does not provide an argument, we look at the current folder for the configuration
     */
  }
  
})();