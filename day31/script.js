const resultEl = document.getElementById('result')
const clipboardEl = document.getElementById('clipboard')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')



//object with keys that equal whatever these functions return
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) {
        return
    }

    //execCommand('copy') function deprecated so alternative function used to copy to clipboard
    
    let textToCopy = password
    if(navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Copied to Clipboard')
        })
    }
    //textarea.select()
    //document.execCommand('copy')
    //textarea.remove()
    //alert('Password copied to clipboard')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value // string parsed to a number
    const hasLower = lowercaseEl.checked // if tickbox has been ticked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})


function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if(typesCount === 0) {
        return ''
    }

    for(let i=0; i<length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97) /*any random number between 0 to 1 multiplied by 26 and rounded down to get a number between 1 and 26
    + 97 because the lower case letter asci codes start at 97 will generate a random lowercase letter*/
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65) /* where upper case letters start */
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48) /* where numbers start */
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)] /* can still be treated like an array even though it's a string*/
}