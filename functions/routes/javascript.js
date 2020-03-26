const app = require('express')()
const url = require('url')

app.get('/eval', async (req, res) => {

    const output = {
        stdout: [],
        outputCommands: []
    }
 
    print = (x) => output.stdout.push(x)
    exec = (x) => output.outputCommands.push(x)

    let program = Buffer.from(req.query.text, 'base64').toString().split('\n').join('\n')
    console.log(program)
    

    try {
        
        eval(program)
        return res.send(JSON.stringify(output));

    } catch(error) {
        return res.send(String(error))
    }

})

module.exports = app