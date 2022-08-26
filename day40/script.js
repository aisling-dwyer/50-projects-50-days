const boxesContainer = document.getElementById('boxes')
const btn = document.getElementById('btn')

btn.addEventListener('click', () => boxesContainer.classList.toggle('big'))

function createBoxes() {
    //creating 4 x 4 boxes
    for(let i=0; i < 4; i++) {
        for(let j=0; j < 4; j++) {
            const box = document.createElement('div')
            box.classList.add('box')
            box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px` //camelCase rather than usual css style
            boxesContainer.appendChild(box)
        }
    }
}

createBoxes()