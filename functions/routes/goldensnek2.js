const app = require('express')()

const correctPassword = 'zachisawesome123'
const style = `
    <style>
        * { 
            font-family: "Comic Sans MS";
        }
        body {
            padding-top: 30px;
        }
        .container {
            margin: auto;
            width: fit-content;
            text-align: center;
        }
        input, a {
            display: block;
        }
        input {
            text-align: center;
            margin: auto;
            margin-top: 10px;
        }
        .treasure-title {
            animation-name: spin;
            animation-duration: 6s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            width: fit-content;
        }
        @keyframes spin {
            from { transform: rotateY(0deg) }
            to { transform: rotateY(720deg) }
        }
    </style>`
const script = '<script>onEnter = e => { if (event.key === \'Enter\') location=\'/goldensnek2?password=\' + e.value }</script>'
const header = '<title>Golden Snek 2</title>'

app.get('/goldensnek2', async (req, res) => {

    const password = req.query.password

    if (password) {
        if (password === correctPassword) {
            res.send(`
                ${header}
                <h1 class="treasure-title">Zach Latta's Killer Chickpea Lunch</h1>
                <pre>
1. Crush 3 cloves of garlic, lightly fry in olive oil until fragrant
2. Strain can of chickpeas. Wash them with water through strainer. Put in pan you have garlic in
3. On medium heat fry chickpeas with garlic until golden brown on both sides. 
Pull out garlic if it starts to burn. Season everything with pepper to taste.
4. Turn off the heat. Add 2 handfuls of combined chopped parsley and mint on top of chickpeas. Stir until herbs wilt.
5. Plate inside nest of full fat, unsweetened Greek yogurt. Drizzle olive oil on top, sprinkle finishing salt on top to taste
6. Serve and enjoy!
                </pre>
                <span>Remember to follow @zachlattasuperawesomerecipes for more delicious meals!</span>
                ${style}
            `)
        } else {
            res.send(`
                ${header}
                <div class="container">
                    <h1>Your "password" is not correct!</h1>
                    <h1>How dare you try and steal the prized treasure!</h1>
                    <label>Super Secret Password (Epik Gamers Only!!!)</label>
                    <input onkeydown="onEnter(this)"></input>
                </div>
                ${style} ${script}
            `)
        }
    } else {
        res.send(`
            ${header}
            <div class="container">
                <h1 style="color:gold">Golden Snek 2: Valuable Treasure Boogaloo</h1>
                <a href="https://drive.google.com/uc?export=download&id=1p8fdR8bjJ9d1hdK8aLQTf4-GlIhwE0CY">Archive.zip</a>
                <label>Super Secret Password (Epik Gamers Only!!!)</label>
                <input onkeydown="onEnter(this)"></input>
            </div>
            ${style} ${script}
        `)
    }
    

})

module.exports = app
