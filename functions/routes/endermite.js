const app = require('express')()

const langMacros = require('../static/endermite/macros.json')

function checkCharSafe(char) {
    return char === ')'
        || char === '('
        || char === '{'
        || char === '}'
        || char === ' '
        || char === '='
        || char === '.'
}

function macro(program, keyword, keywordReplacement) {
    const programArr = program.split('')
    Array(program.length - 1).fill().map((_, i) => {
        if (Array(keyword.length - 1).fill().every((_, charIndex) => 
            program[i + charIndex] === keyword.charAt(charIndex)
            && (!i || checkCharSafe(program[i - 1]))
            && (i + keyword.length === program.length 
                || checkCharSafe(program[i + keyword.length]
            ))
        )) {
            programArr.splice(i, keyword.length, keywordReplacement)
        }
        return null
    })
    return programArr.join('')
}

function runMacros(programArr) {
    return programArr.filter(x => x).map(program => {
        let newLine = program
        for (macroKeyword in langMacros) {
            console.log(newLine, macroKeyword, langMacros[macroKeyword])
            newLine = macro(newLine, macroKeyword, langMacros[macroKeyword])
            console.log(newLine)
        }
        return newLine
    })
}

app.get('/eval', async (req, res) => {

    const output = {
        stdout: [],
        outputCommands: [],
        loadedModules: {
            local: [],
            external: []
        }
    }
 
    print = (x) => output.stdout.push(x)
    exec = (x) => output.outputCommands.push(x)
    load = (x) => x.substring(0, 4) === 'epm/' 
        ? output.loadedModules.external.push(x)
        : output.loadedModules.local.push(x)
    // console.log = () => { throw("console.log is not a function") }

    let program = 
        runMacros(Buffer.from(req.query.text, 'base64').toString().split('\n')).join('\n')
    
    console.log(program)
   //program = macro(program, 'func', 'function')

    try {
        
        eval(program)
        return res.send(JSON.stringify(output));

    } catch(error) {
        return res.send(String(error))
    }

})

module.exports = app