import { Project, ScriptTarget, ts, printNode } from "ts-morph";
const path = require('path')
const Comments = require('parse-comments');

/**
 * TODO: specifying the root directory of the project as `sourcesPath` does not work!
 */

/**
 * For discovery and testing, see {@link https://ts-ast-viewer.com/#}
 */
module.exports = function(content: any, map: any, meta: any) {
    
    /**
     * The path to the resource, relative to the current working directory
     */
    const relativePath = "./publishable-docs".concat(this.resource.replace(process.cwd(), ""));
    //console.log("LOAD: ",relativePath);



  /**
   * Set up the typescript project analyzer
   * See: {@link https://ts-morph.com/setup/ | ts-morph setup}
   */
  const pathToTsconfig = path.join(__dirname, "./tsconfig.json");
  const project = new Project({
    compilerOptions: {
        target: ScriptTarget.ES2020,
        tsConfigFilePath: pathToTsconfig,
        addFilesFromTsConfig: false,
        skipFileDependencyResolution: true,
    },
  });

  /**
   * The addFIlesFromTsconfig`-option does not work. 
   * We add the source files manually {@link https://ts-morph.com/setup/adding-source-files}
   */
  //project.addSourceFilesFromTsConfig(pathToTsconfig);
  /**
   * `.getFirstChild()` seems to be necessary since it is the source-file Node.
   */
  const sourceFile = project.createSourceFile(relativePath, content);

  /*if (relativePath.localeCompare("./publishable-docs/example-data/src/start.ts") == 0) {
    console.log(Object.keys(sourceFile))
    console.log(sourceFile.)

  }*/
  
  const sourceFileChild = sourceFile.getSourceFile();

  const data = {
    filename: relativePath,
    children: sourceFileChild.getStatements().filter(
        child => { 
            return child.getFullText().length > 0
        }
    ).map(
        child => Object.assign({
            raw: child.getFullText(),
            source: child.getText(),
            leadingComments: child.getLeadingCommentRanges().map(
                comment => {
                    const ast = new Comments().parse(comment.getText())
                    return ast.length > 0 ? ast[0] : undefined;
                }
            ).filter(comment => comment !== undefined),
            trailingComments: child.getTrailingCommentRanges().map(
                r => new Comments().parse(r.getText())
            ),
        })
    )
      
  }
  /*
  sourceFile.forEachChild(child => {
    
    console.log("child: ", child.getText());
    child
    child.getTrailingCommentRanges().forEach(
        r => {
            //console.log("TRAILING COMMENT: ",r.getText())
        }
    )
   
      /*const cmt = fullText.substring(comment.pos, comment.end);
  
      * /
  
   
  });*/


  //console.log(sourceFile.getChildren());
  //console.log(`found ${sourceFile.statements.length} statements`)

  /**
   * get all source files, see {@link https://ts-morph.com/navigation/getting-source-files} for 
   * how to get only test or non-test files
   * /
  //const sourceFile: any = project.getSourceFileOrThrow("publishable.config.js");

  //project.getRootDirectories();
  forEachComment(sourceFile._compilerNode, (fullText: string, comment: ts.CommentRange) => {
          
    const cmt = fullText.substring(comment.pos, comment.end);

    const ast = new Comments().parse(cmt);
    console.log("!!!", cmt, JSON.stringify(ast, null, 2));

  }, sourceFile)

  /*
  sourceFile.forEachChild((node: ts.Node) => {
      console.log("child: ", node.getChildren());

      
  });*/

  
    // ts-ignore
    this.callback(null, 
        `module.exports = ${JSON.stringify(data)}`, map, meta);
};

