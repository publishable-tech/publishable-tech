/**
 * The developer should be able to start **Publishable** on her local
 * machine. 
 * 
 * Whenever the source code (because it includes the docs) or the
 * posts change, the React app should reflect these changes.
 * 
 * - transpile but not bundle the app's source code. this allows to use whatever
 *   code style or processor. The code imports the content (mdx, sources, comments) as placeholder
 * - the user provides the content, and can use the precompiled `app.js`. the user does not need to
 *   use React. She can edit the configuration to her convenience. To cater to the development of
 *   her Components to be used in the mdx-files.
 * 
 * 
 */

import start  from './start';

describe("The `start`-mode", () => {

    /**
     * In the `start`-command **Publishable** serves a React app on `localhost:{port}`.
     */
    it("serves a React app on localhost", async () => {
        
        //const result = await convert({path: path.join(__dirname, "../basic-example.tsx")});
        //start();
        expect(false).toBeTruthy();
        
    });

    /**
     * that shows
     * the current state of the documentation.
     */
    
});