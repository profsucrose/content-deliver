const app = require('express')()
const { GoogleSpreadsheet } = require('google-spreadsheet')

const DESKTOP_BIRD_GOOGLESHEET_ID = '1bEsRnQyGT4YeIBmCPUjLqkI8GUIFRYhpEvTp8DkCVFI'
const SERVICE_ACCOUNT = require('../static/googleServiceAccount.json')
 
const doc = new GoogleSpreadsheet(DESKTOP_BIRD_GOOGLESHEET_ID)
 
doc.useServiceAccountAuth({
	client_email: SERVICE_ACCOUNT.client_email,
	private_key: SERVICE_ACCOUNT.private_key,
})

app.get('/desktopbird/getdeliverable', async (_req, res) => {
	await doc.loadInfo()
	const sheet = doc.sheetsByIndex[0]
	const rows = await sheet.getRows()
	const deliverables = rows.filter(row => row["Letter Content"] && row["Deliverable"])
	const message = deliverables[ Math.floor(Math.random() * deliverables.length) ]["Letter Content"]

	return res.send(message)
})

module.exports = app