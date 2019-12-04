
import fs from "fs";
import { parse, parseExpression } from "@babel/parser";
import traverse from"@babel/traverse";
// const babelTypes = require("@babel/types");
import generator from '@babel/generator';

console.time('c0')
const sourceFile =  parse(fs.readFileSync('./code.ts').toString(), {
    sourceType: 'module',
    plugins: [
      'typescript',
      ['decorators', { decoratorsBeforeExport: true }],
      'classProperties',
     'classPrivateProperties'
    ]
})
fs.writeFileSync('ast.json', JSON.stringify(sourceFile));
traverse(sourceFile, {
    enter(path) {
        if (path.isIdentifier({ name: "n" })) {
          path.node.name = "x";
        }
        if (path.isTSDeclareMethod(path.node)) {
           console.log(path.node)
        }
        if (path.isTSDeclareMethod({ name: "Form" })) {
            path.node.name = "Form2";
        }
      }
})

const generteCode = generator(sourceFile, {
    retainLines: true,
    sourceMaps: false,
    decoratorsBeforeExport: true 
})

fs.writeFileSync('./out.ts', generteCode.code)

console.log(generteCode)
console.timeEnd('c0')