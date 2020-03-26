require('dotenv').config()

const functions = require('firebase-functions')
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')

const app = express()
app.use(express.static('static'))
app.use(favicon(path.join(__dirname, 'static', 'icons', 'goldensnek.ico')))

const cors = require('cors')({ origin: true })
app.use(cors)

app.use(
    require('./routes/bots/skype/mc-query'),
    require('./routes/truthordare'),
    require('./routes/infinite-jest'),
    require('./routes/javascript'),
    require('./routes/goldensnek2'),
    require('./routes/suitup')
)

exports.api = functions.https.onRequest(app)