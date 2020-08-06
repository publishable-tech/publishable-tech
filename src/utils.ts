/**
 * Once you have installed @types/node in your project, you can tell TypeScript exactly
 * what variables are present in your process.env:
 * 
 * Taken from [this](https://stackoverflow.com/questions/45194598/using-process-env-in-typescript)
 */
/**
 * Note: If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 * 
 * ```ts
 * export {}
 * ```
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      __PUBLISHABLE_ENV__: 'development' | 'production' | undefined;
    }
  }
}

//
/**
 * Check whether the environment variable `process.env.__PUBLISHABLE_ENV__` contains the
 * string `development`. When it is any other string or undefined, we use the production mode.
 * 
 * @returns `true` when Publishable runs in development mode. 
 * 
 * TODO: explain development mode. We should provide a link here rather than the full
 * explanation
 */
export function isDevMode() {
    return "development".localeCompare(process.env.__PUBLISHABLE_ENV__) == 0;
}