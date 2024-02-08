
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
    renderCountGamerNegs(gBoard)
    renderBoard(gBoard)
}

function medium() {
    gLevel.size = 8
    gLevel.Mine = 14
    gBoard = createBoard(gLevel.size)
    howManyMines(gLevel.Mine)
    renderCountGamerNegs(gBoard)
    renderBoard(gBoard)
}

function expert() {
    gLevel.size = 12
    gLevel.Mine = 32

    gBoard = createBoard(gLevel.size)
    howManyMines(gLevel.Mine)
    renderCountGamerNegs(gBoard)
    renderBoard(gBoard)
}

function onInitGame() {
    // howManyMines(gLevel.Mine)
    renderBoard(gBoard)
    renderCountGamerNegs(gBoard)
    renderBoard(gBoard)
    // console.log(gBoard)

}


function howManyMines(num) {
    for (var i = 0; i < num; i++) {
        addMine()
    }
}

function expandShown(board, elCell, row, col) {

    const size = board.length

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < size && j >= 0 && j < size && !(i === row && j === col)) {

                var classesName = `cell-${i}-${j}`
                var downCell = document.querySelector('.' + classesName)
                
                if (elCell.innerText === MINES || elCell.innerText === FLAG) continue
                if (countMinesAroundCell(board, row, col) === 0) {
                    if (elCell.classList[1] === `cell-${row}-${col}`) {
                        // console.log(`cell-${row}-${col}`)
                        downCell.innerText = gBoard[i][j].minesAroundCount
                        // console.log(downCell.innerText)
                        downCell.style.color = 'rgb(121, 121, 255)'

                    }
                }
            }
        }
    }
}

function onCellClicked(elCell, i, j) {
    // var classesName = `cell-${i}-${j}`
    // var downCell = document.querySelector('.' + classesName)


    // if (elCell.classList[1] === `cell-${i}-${j}`) {
    //     downCell.innerText = gBoard[i][j].minesAroundCount
    //     downCell.style.color = 'rgb(121, 121, 255)'
    //     console.log(downCell.innerText)
    // }
    

    if (elCell.innerText === '0') return

    if (elCell.innerText === FLAG) {
        elCell.style.color = 'rgb(121, 121, 255)'
        return
    }
    

    if (elCell.innerText !== MINES) {
        elCell.innerText = gBoard[i][j].minesAroundCount
        elCell.style.color = 'rgb(121, 121, 255)'

    }
    if (elCell.innerText === MINES) {
        elCell.style.color = 'blue'
    }
expandShown(gBoard, elCell, i, j)
// console.log(elCell)



}

function onCellMarked(event, i, j) {
    event.preventDefault()
    const cell = event.target


    if (cell.innerText === FLAG && gBoard[i][j].isMarked === false) {
        cell.innerText = MINES
        gBoard[i][j].isMarked = false
    } else if (cell.innerText === FLAG) {
        cell.innerText = ''
        gBoard[i][j].isMarked = false
    } else if (cell.innerText === '') {
        cell.innerText = FLAG
        gBoard[i][j].isMarked = true
        cell.style.color = 'red'
    } else if (cell.innerText === MINES) {
        cell.innerText = FLAG
        gBoard[i][j].isMarked = false
    }






    // console.log(gBoard[i][j])
    // console.log(cell, i, j);

}





