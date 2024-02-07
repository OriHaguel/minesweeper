
let gLevel = {
    size: 4,
    Mine: 2
}
const MINES = '💣'
const FLAG = '🚩'


let gBoard = createBoard(gLevel.size)

function begginer() {
    gLevel.size = 4
    gLevel.Mine = 2
    gBoard = createBoard(gLevel.size)
    howManyMines(gLevel.Mine)
    renderBoard(gBoard)
}

function medium() {
    gLevel.size = 8
    gLevel.Mine = 14
    gBoard = createBoard(gLevel.size)
    howManyMines(gLevel.Mine)
    renderBoard(gBoard)
}

function expert() {
    gLevel.size = 12
    gLevel.Mine = 32
    gBoard = createBoard(gLevel.size)
    howManyMines(gLevel.Mine)
    renderBoard(gBoard)
}

function onInitGame() {
    // howManyMines(gLevel.Mine)
    renderBoard(gBoard)
    renderCountGamerNegs(gBoard)
    renderBoard(gBoard)
    console.log(gBoard)

}


function howManyMines(num) {
    for (var i = 0; i < num; i++) {
        addMine()
    }
}

function expandShown(board, elCell, i, j) {
    if (countMinesAroundCell(board, i, j) === 0) {

    }
}


function onCellClicked(elCell, i, j) {
var classesName = `cell-${i+1}-${j}`
var downCell = document.querySelector('.' + classesName)


if (elCell.classList[1] === `cell-${i}-${j}`) {
    downCell.innerText = gBoard[i+1][j].minesAroundCount
    downCell.style.color = 'rgb(121, 121, 255)'
    console.log(downCell.innerText)
}
   // console.log(gBoard[i][j])

//console.log(elCell.innerText)

    if (elCell.innerText !== MINES) {
        elCell.innerText = gBoard[i][j].minesAroundCount
        elCell.style.color = 'rgb(121, 121, 255)'

    }
    if (elCell.innerText === MINES) {
        elCell.style.color = 'blue'
    }

expandShown(gBoard, elCell, i, j)


}

function onCellMarked(event, i, j) {
    event.preventDefault(); // Prevent default context menu
    const cell = event.target

    if (cell.innerText === FLAG) {
        cell.innerText = ''
        gBoard[i][j].isMarked = false
    } else if (cell.innerText === '') {
        cell.innerText = FLAG
        gBoard[i][j].isMarked = true
        cell.style.color = 'red'
    }






    console.log(gBoard[i][j])
    console.log(cell, i, j);

}

//console.log(gBoard[1][1])



