const app = require('express')()
const truths = require('../static/truthordare.json').truths

app.get('/truthordare/truth', (_res, req) => {
    req.send(truths[Math.floor(Math.random() * truths.length)])
})

module.exports = app