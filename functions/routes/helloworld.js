const app = require('express')()

app.get('/hello', (_req, res) => {
        return res.send('Hello world!')
})

module.exports = app