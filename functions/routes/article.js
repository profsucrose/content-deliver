const app = require('express')()

app.get('/article/spice-and-metabolism', async (_req, res) => {
	return res.sendFile(__dirname + '/html/spiceMetabolism.html')
})

module.exports = app