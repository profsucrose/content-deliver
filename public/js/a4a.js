const sizedImages = {}

function searchPainting() {
    

    const searchKey = document.querySelector('#search').value.toLowerCase()

    Array.from(document.querySelector('#paintings-container').children).forEach(paintingElement => {
      
        const paintingName = paintingElement.id
        const keep = shouldKeep(searchKey, paintingName)
        if (keep) {
            paintingElement.style.display = "inline-block"
        } else {
            paintingElement.style.display = "none"
        }

    })

}

function shouldKeep(searchKey, paintingName) {

    return paintingName.includes(searchKey)

}

function viewPainting(paintingId) {
    size = sizedImages[paintingId] ? '100px' : '700px'
    document.getElementById(paintingId).style.width = size
    document.getElementById(paintingId).style.height = size
    sizedImages[paintingId] = sizedImages[paintingId] ? false : true
}

addEventListener('DOMContentLoaded', () => {
    console.log('script loaded')
    paintings.forEach(painting => {
        document.querySelector('#paintings-container').innerHTML += `
            <img 
                class="painting" 
                src="static/a4a/${painting}.png" 
                id="${painting.toLowerCase()}" 
                onclick="viewPainting(this.id)"
            />
        `
    })
    
})
