const app = require('express')()
const {readFileSync} = require('fs')

app.get('/infinite-jest', (_req, res) => {
    const infiniteJest = readFileSync('./static/infinite-jest.txt').toString()
    return res.send(`
        <script>
            infiniteJest = \`${infiniteJest}\`
            counter = 50
            onscroll = () => {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    document.querySelector('pre').innerText += infiniteJest.split('\\n').slice(counter, counter + 50).join('\\n')
                    counter += 50
                }
            }
        </script>
        <pre>${infiniteJest.split('\n').slice(0, 100).join('\n')}</pre>
    `)
})

module.exports = app