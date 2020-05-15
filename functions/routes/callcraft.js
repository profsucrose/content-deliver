const app = require('express')()

app.get('/callcraft/ispatreon', async (_req, res) => {
	return handleOAuthRedirectRequest()
})

module.exports = app