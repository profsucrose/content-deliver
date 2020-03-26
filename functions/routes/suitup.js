const app = require('express')()
const jimp = require('jimp')

const fullNameToImage = require('../static/suitup/nameToImage.json')
const styling = `
    .container {
        display: flex;
        width: 100vw;
        height: 100vh;
        align-items: center;
        justify-content: center;
    }

    a {
        cursor: pointer;
    }

    code {
        display: block;
        text-align: center;
        margin: 10px;
    }
    
    .control, button {
        width: 100%;
        margin: 5px;
    }

    button {
        font-weight: 600 !important;
        text-align: center !important;
    }

    input {
        text-align: center !important;
    }

    .inner {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    img {
        width: 400px;
    }

    .image-container {
        position: relative;
        display: flex;
        justify-content: center;
    }

    .click-to-download {
        position: absolute;
        text-align: center;
        bottom: 20;
        padding: 4px;
        border-radius: 5px;
        font-weight: 900;
        color: white;
        opacity: 0.9;
        font-family: Lato;
        bottom: 0;
    }
`
const header = `
    <title>Suitup</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
`

app.get('/hackclub/suitup', async (req, res) => {
    
    const { name } = req.query
    if (!name)
        return res.send(`
            ${header}
            <style>${styling}</style>
            <div class="container">
                <div class="inner">
                    <h1 class="title is-1">Suitup</h1>
                    <h1 class="title is-5">Profile picture generator for the global COVID-19 hackathon invasion</h1>
                    <div class="control">
                        <input class="input" type="text" placeholder="Full Slack Name (ex. 'zach latta')">
                    </div>
                    <button 
                        class="button"
                        onclick="location='/hackclub/suitup?name=' + document.querySelector('input').value"
                    >Generate Profile Image</button>
                </div>
            </div>
        `)
    else {
        if (fullNameToImage[name]) {
            const base64 = await generateImageBase64(name)
            return res.send(`
                ${header}
                <style>${styling}</style>
                <div class="container">
                    <div class="inner">
                        <h1 class="title is-4">Generated profile picture for <code>${name}</code></h1>
                        <a href="${base64}" download>
                            <div class="image-container">
                                <img src="${base64}" />
                                <span class="click-to-download">(Click to download)</span>
                            </div>
                        </a>
                    </div>
                </div>
            `)
        } else {
            return res.send(`
                ${header}
                <style>${styling}</style>
                <div class="container">
                    <h1 class="title is-4"><code>${name}</code> is not a member of the HackClub Slack with a profile picture.</h1>
                </div>
            `)
        }
        
    }
})

async function generateImageBase64(name) {
    profileImageURL = fullNameToImage[name]

    console.log(`Generating image for ${name}`)
    const profileImageUnresized = await jimp.read(profileImageURL)
    const profileImage = await profileImageUnresized.resize(1000, jimp.AUTO)
    const base = await jimp.read('./static/suitup/base.png')
    const overlay = await jimp.read('./static/suitup/overlay.png')
    const maskedBase = await base.composite(profileImage, 105, 105)
    const image = await maskedBase.composite(overlay, 0, 0)
    const base64 = await image.getBase64Async(jimp.MIME_JPEG)

    return base64

}

module.exports = app