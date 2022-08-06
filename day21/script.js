const fill = document.querySelector('.fill')
const empties = document.querySelectorAll('.empty')

fill.addEventListener('dragstart', dragStart)
fill.addEventListener('dragend', dragEnd)

for(const empty of empties){
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

//apply to full box
function dragStart() {
    this.className += ' hold' //will append new class, not replace
    setTimeout(() => this.className = 'invisible', 0)

}

function dragEnd() {
    this.className = 'fill'
}

//apply to empty boxes
function dragOver(e) {
    e.preventDefault() //necessary as default action is to reset the current drag operation to "none"
}

function dragEnter(e) {
    e.preventDefault() //necessary as default action is to reject immediate user selcetion as potential target element
    this.classNme += ' hovered'
}

function dragLeave() {
    this.className = 'empty'
}

function dragDrop() {
    this.className = 'empty'
    this.append(fill)
}