
let gLevel = {
    size: 4,
    Mine: 2
}
const MINES = '💣'
let gBoard = createBoard(gLevel.size)





// LEVEL BUTTONS
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



function onCellClicked(elCell, i, j) {
    if (elCell.innerText !== MINES) {
        elCell.innerText = gBoard[i][j].minesAroundCount
    }

}






