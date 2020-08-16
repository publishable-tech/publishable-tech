module.exports = {
    contentPath: "./example-data/content",
    /**
     * TODO: using `.` as the `sourcesPath` does not work?! because it contains a lot of unloadable files,
     * especially in node_modules. But also .gitignore, an the .mdx-files?!
     */
    sourcesPath: "./example-data/src",
}