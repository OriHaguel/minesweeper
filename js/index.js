
let gLevel = {
    size: 4,
    Mine: 2
}
let gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
const MINES = '💣'
const FLAG = '🚩'

function checkGameOver() {
    if ((gLevel.size ** 2) - gLevel.Mine === gGame.shownCount && gLevel.Mine === gGame.markedCount) {
        console.log('you won!!!')
        gGame.isOn = false
        
    }
}

let gBoard = createBoard(gLevel.size)

function begginer() {
    gGame.shownCount = 0
    gGame.markedCount = 0
    gLevel.size = 4
    gLevel.Mine = 2
    gBoard = createBoard(gLevel.size)
    howManyMines(gLevel.Mine)
    renderCountGamerNegs(gBoard)
    renderBoard(gBoard)
}

function medium() {
    gGame.shownCount = 0
    gGame.markedCount = 0
    gLevel.size = 8
    gLevel.Mine = 14
    gBoard = createBoard(gLevel.size)
    howManyMines(gLevel.Mine)
    renderCountGamerNegs(gBoard)
    renderBoard(gBoard)
}

function expert() {
    gGame.shownCount = 0
    gGame.markedCount = 0
    gLevel.size = 12
    gLevel.Mine = 32

    gBoard = createBoard(gLevel.size)
    howManyMines(gLevel.Mine)
    renderCountGamerNegs(gBoard)
    renderBoard(gBoard)
    // console.log(gLevel.size ** 2 - gLevel.Mine)

}

function onInitGame() {
    gGame.shownCount = 0
    gGame.markedCount = 0
    gLevel.size = 4
    gLevel.Mine = 2
    gBoard = createBoard(gLevel.size)
    howManyMines(gLevel.Mine)
    renderCountGamerNegs(gBoard)
    renderBoard(gBoard)
    
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
                        if (gBoard[i][j].isShown === false) {
                            gBoard[i][j].isShown = true
                            gGame.shownCount++
                        }


                    }
                }
            }
        }
    }
}

function onCellClicked(elCell, i, j) {

    if (elCell.innerText === '0') return

    if (elCell.innerText === FLAG) {
        elCell.style.color = 'rgb(121, 121, 255)'
        return
    }


    if (elCell.innerText !== MINES) {
        elCell.innerText = gBoard[i][j].minesAroundCount
        elCell.style.color = 'rgb(121, 121, 255)'
        if (gBoard[i][j].isShown === false) {
            gBoard[i][j].isShown = true
            gGame.shownCount++
        }


    }
    if (elCell.innerText === MINES) {
        elCell.style.color = 'blue'
        gBoard[i][j].isShown = true

    }








    expandShown(gBoard, elCell, i, j)
    // console.log(elCell)
    // console.log(gBoard)
    // console.log(gBoard[i][j])
    // console.log(gGame.shownCount, gLevel.Mine)
    checkGameOver()
}

function onCellMarked(event, i, j) {
    event.preventDefault()
    const cell = event.target

    if (cell.innerText === FLAG && gBoard[i][j].isMarked === true) {
        cell.innerText = MINES
        gBoard[i][j].isMarked = false
        cell.style.color = 'transparent'
    } else if (cell.innerText === FLAG) {
        cell.innerText = ''
        gBoard[i][j].isMarked = false

    } else if (cell.innerText === '') {
        cell.innerText = FLAG
        gBoard[i][j].isMarked = true
        cell.style.color = 'red'
    } else if (cell.innerText === MINES) {
        cell.innerText = FLAG
        gBoard[i][j].isMarked = true
        cell.style.color = 'red'
    }


  if (cell.innerText === FLAG && gBoard[i][j].isMarked === true && gBoard[i][j].isMine === true ) {
gGame.markedCount++
  }  else if(gBoard[i][j].isMine === true) {
    gGame.markedCount--
  }
    
    
    console.log(gGame.markedCount)
    // console.log(gBoard[i][j])
    //console.log(cell, i, j);
    checkGameOver()
}





