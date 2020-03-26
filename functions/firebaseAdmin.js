const admin = require("firebase-admin")
const serviceAccount = require("./static/serviceAccountKey.json")

module.exports = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://content-deliver.firebaseio.com"
})