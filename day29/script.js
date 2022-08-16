const loveMe = document.querySelector('.loveMe')
const times = document.querySelector('#times')

let clickTime = 0
let timesClicked = 0

loveMe.addEventListener('click', (e) => { // could also use dblclick
    if(clickTime === 0) {
        clickTime = new Date().getTime()    
    } else {
        if((new Date().getTime() - clickTime) < 800) {
            createHeart(e)
            clickTime = 0
        } else {
            clickTime = new Date().getTime()
        }
    }
})

const createHeart = (e) => {
    const heart = document.createElement('i')
    heart.classList.add('fas')
    heart.classList.add('fa-heart')

    const x = e.clientX //x value where  mouse triggered event in current window
    const y = e.clientY

    leftOffset = e.target.offsetLeft //returns position of target element relative to the parent
    topOffset = e.target.offsetTop

    triggeredX = x - leftOffset
    triggeredY = y - topOffset

    heart.style.top = `${triggeredY}px`
    heart.style.left = `${triggeredX}px`
    loveMe.appendChild(heart)
    times.innerHTML = ++timesClicked
    
    setTimeout(() => heart.remove(), 1000)
}
