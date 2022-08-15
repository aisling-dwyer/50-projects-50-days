const button = document.getElementById('button')
const toasts = document.getElementById('toasts')

const messages = [
    'Message One',
    'Message Two',
    'Message Three',
    'Message Four'
]

button.addEventListener('click', () => createNotification())

function createNotification() {
    const notif = document.createElement('div')
    notif.classList.add('toast')
    notif.innerText = getRandomMessage()

    //to add random message into the container
    toasts.appendChild(notif)

    // to make it disappear after a certain period of time
    setTimeout(() => {
        notif.remove()
    }, 3000)
}

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)]
}
