/**
 * We use webpack and webpack-dev-server during the runtime of this script,
 * thus `npm i -S webpack webpack-dev-server html-webpack-plugin`
 * 
 * During development, we want to have Type-support: `npm i -D @types/webpack-dev-server`
 */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { isDevMode } from './utils';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


/**
 * The interface of the `start`-function.
 * TODO: `type` statements (`TypeAliases`) and `interface`s are not included.???
 */
type IStart = {
  /**
   * @start_parameters_content
   * The (relative to the current working directory) path to the user's MD(X)-content
   */
  contentPath: string;

  /**
   * @start_parameters_sources
   * The (relative to the current working directory) path to the user's source code
   */
  sourcesPath: string;

  /**
   * The (relative to the current working directory) path to a module that exports whatever
   * data the user wants to make available.
   */
  dataModule?: string;

};



/**
 * this relative path needs to be edited before published to NPM
 * only during development
 */
const aliasesResolver = isDevMode() ? require('../../publishable-app/aliases-resolver').default : undefined;

/**
 * The main entry function of the `start`-mode.
 */
export default async function start (props: IStart) {

  if (isDevMode()) {
    console.log("RUNNING IN DEV-MODE");
  }
  /**
   * Before starting the dev-server, use babel to transform all source files into docs/*.ts files
   * that expose the comments and the source code. Then, in the MDX, the user can import the
   * comments and the code-strings
   * 
   * Then the webpack server can watch these files
   */
  // TODO: Insert here!

  /**
   * see {@link https://webpack.js.org/api/node/}
   * see: {@link https://webpack.js.org/configuration/ | overview of Webpack configuration}
   * see example: {@link https://github.com/webpack/webpack-dev-server/blob/master/examples/api/simple/server.js}
   * 
   * TODO: include the docs (mdx) and the sources (not of the app but the user's)
   */
  const compiler = webpack({
    /**
     * mdx-js imports `fs` internally. But we don't need to work with it.
     * By setting node: `{fs: "empty"}`, you are telling webpack that when importing
     * fs an empty object should be returned. Remove that and it should work fine.
     * 
     * see: {@link https://webpack.js.org/configuration/node/#node}
     */
    node: {
      fs: 'empty'
    },
    
    /**
     * set the baseline for relative paths in this file
     */
    context: __dirname,

    /**
     * the development mode builds a source map to discover bugs easily.
     * Not optimized for speed, though
     * When setting mode to production, we get an app size of, 2.5MB instead of 7.1MB,
     * However, then we get a size warning when running `publishable`. 
     */
    mode:  'development', // isDevMode() ? 'development' : 'production',
        
    /**
     * we start with the pre-transpiled version of the `publishable-app`.
     * This is pure Javascript but contains placeholders. Even though it builds
     * upon React, we don't need React anymore when creating it. It is already
     * resolved
     */
    /**
     * we use a relative path to the local version.
     * for production, use a dependency instead.
     */
    entry: isDevMode() ? '../../publishable-app/dist/index.js' : './app/index.js',
    
    /**
     * TODO this is for the `build`-command
     * /
    output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'main.js',
      publicPath: '/',
    },*/
       
    /**
     * This is how we resolve the source-code modules
     */
    module: {
      rules: [
        /**
         * Load the mdx-files as raw (textual, utf-8) data.
         * Having the content loaded by webpack lets the webpack-dev-server to reload
         * changes
         */
        {
            test: /\.mdx?$/,
            include: [
                /**
                 * We expect the `contentPath` to point to the content relative to the current working
                 * directory
                 */
                path.resolve(process.cwd(), props.contentPath)
            ],
            /**
             * the MDX-loader {@link (https://www.npmjs.com/package/mdx-loader} seems to work with hooks. But the
             * `publishable-app` does not have any context anymore for it is transpiled
             * already.
             */
            //use: ['babel-loader', '@mdx-js/loader']
            /**
             * Thus, we load the raw text of these files and transform them
             * during runtime.
             */
            use: ['raw-loader']
        },
        /**
         * Load the source code to be documented.
         * Having the content loaded by webpack lets the webpack-dev-server to reload
         * changes
         */
        {
          /**
           * The supported source-code file extensions.
           */
          test: /\.(ts|js)x?$/,
          //exclude: path.resolve(__dirname, ".."),
          /**
           * We expect the `sourcesPath` to point to the content relative to the current working
           * directory
           */
          include: path.resolve(process.cwd(), props.sourcesPath), 
          use: [
            {
              /**
               * This loader transforms the source code into documentation data
               * TODO: we must NOT have the file-extension (`ts`) here, because it
               * changes from `ts` in `src` to `js` in `dist`
               * TODO: but without file-extension, it doesn't work
               */
              loader: isDevMode() ? path.resolve(__dirname, `./loader/index.ts`) : path.resolve(__dirname, `./loader/index.js`),
            },
            /**
             * The documentation consists of modules, too. We can load them with the 
             * default `babel-loader`. It uses the base babel-config 
             * 
             * The sources that are part of the main code get overwritten
             * TODO: rename the resulting sources?
             * 
             * TODO: this configuration should come from the user! because she
             * knows the best how to compile her sources
             */
            { 
              loader: 'babel-loader', 
              options: {
                presets: [
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
                ]
              }
              
            }
          ]
        },
        /**
         * Load the main program modules. This includes the transpiled `publishable-app`
         */
        {
          /**
           * This is the normal compilation of the app, but not of the user sources
           */
          test: /\.(ts|js)x?$/,
          /**
           * Don't compile third party components
           */
          exclude: isDevMode() ? /node_modules/ : undefined,
          /**
           * but when published, our sources are in `node_modules`, too ?!
           */
          include: isDevMode() ? undefined : path.resolve(__dirname), 
          use: [{
            /**
             * we use Babel to compile Typescript 
             */
            loader: 'babel-loader',
            options: {
              
              /**
               * `rootMode: "upward"` enables us to load the Babel-config from bottom
               * up to these local options.
               * 
               * If all of your build scripts run relative to your repository root, things should already work,
               * but if you are running your Babel compilation process from within a subpackage,
               * you need to tell Babel where to look for the config. There are a few ways to do that,
               * but the recommended way is the "rootMode" option with "upward", which will make Babel
               * search from the working directory upward looking for your babel.config.json file,
               * and will use its location as the "root" value.
               * 
               * see: {@link https://babeljs.io/docs/en/config-files}
               * 
               * TODO: if we wanted to use 
               */
              rootMode:  isDevMode() ? "upward" : undefined,
              plugins: [
                [
                  //isDevMode() ?
                    /**
                     * this is the local path during development
                     */
                    path.join(__dirname, './babel-wildcard'),
                    /**
                     * this is the path when published
                     */
                    //: './node_modules/publishable-tech/dist/babel-wildcard',
                  {
                    'exts': ["js", "jsx", "ts", "tsx", "md", "mdx", ""],
                    /**
                     * The `alias`-paths are injected in the code of `publishable-app/src`
                     * They further need to be relative paths seen from the current working directory
                     * 
                     * `"../publishable-tech"` is the path from `./publishable-app to the `cwd`
                     * because we're running the script from `./publishable-tech`
                     * 
                     * the path may be different when published in NPM
                     * TODO: calculate path from cwd instead
                     */
                    alias: {
                      __SOURCES__: path.join(isDevMode() ? "../publishable-tech" : "../../../", props.sourcesPath),
                      __CONTENT__: path.join(isDevMode() ? "../publishable-tech" : "../../../", props.contentPath)
                    },
                    /**
                     * don't transform the name cases of the modules
                     */
                    'noModifyCase': true
                  }
                ],
                [
                  "module-resolver",
                  isDevMode() ? aliasesResolver : undefined
                ]
              ]
            }
          }]
        },
        { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{ loader: 'url-loader', options: {limit: 8192} }]
        },   
        
      ]
    },

    /**
     * These are the extenstions we resolve
     */
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts"],
      /**
       * Aliases don't work with the wildcard. Thus, we include the commented source code
       * and the content through separate loaders.
       */
      alias: {
        /**
         * the `__DATA__` replacement points to a module that exports the custom user data
         */
        __DATA__: path.join("../../publishable-tech", props.dataModule ? props.dataModule : "")
      },
    },

    plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.join(__dirname, './assets/layout.html'),
          title: "Publishable",
        })
      ]
  });


  /**
   * see {@link https://webpack.js.org/configuration/dev-server/}
   */
  const devServerOptions = {
      open: false,
      stats: {
        colors: true,
      },
      before: (app: any) => {
          app.get('assets/*', (req: any, res: any) => {
            const filename = path.join(__dirname, '/', req.path);
            res.sendFile(filename);
          });
      }
    };
    const server = new WebpackDevServer(compiler, devServerOptions);
    
    await server.listen(8080, '127.0.0.1', () => {
      console.log('Starting server on http://localhost:8080');
    });
      
}