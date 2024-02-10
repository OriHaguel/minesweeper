'use strict'
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
let isFirstClick = true
let lifeCounter
let safeClicksLeft = 3

function checkGameOver() {
    if ((gLevel.size ** 2) - gLevel.Mine === gGame.shownCount && gLevel.Mine === gGame.markedCount) {
        document.querySelector('.modal').style.display = 'block'
        document.querySelector('.restart-btn').innerText = '😎'
        gGame.isOn = false
        stopTime()
    }
}
let gBoard = createBoard(gLevel.size)

function begginer() {
    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gLevel.size = 4
    gLevel.Mine = 2
    gBoard = createBoard(gLevel.size)
    renderBoard(gBoard)
    isFirstClick = true
    lifeCounter = 2
    document.querySelector('.restart-btn').innerText = '😀'
    document.querySelector('.life').innerText = `life left: ${lifeCounter}`
      safeClicksLeft = 3
    document.querySelector('.safe-click').innerText = `safe clicks left: ${safeClicksLeft}`
    stopTime()
}

function medium() {
    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gLevel.size = 8
    gLevel.Mine = 14
    gBoard = createBoard(gLevel.size)
    renderBoard(gBoard)
    isFirstClick = true
    lifeCounter = 3
    document.querySelector('.restart-btn').innerText = '😀'
    document.querySelector('.life').innerText = `life left: ${lifeCounter}`
      safeClicksLeft = 3
    document.querySelector('.safe-click').innerText = `safe clicks left: ${safeClicksLeft}`
    stopTime()
}

function expert() {
    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gLevel.size = 12
    gLevel.Mine = 32
    gBoard = createBoard(gLevel.size)
    renderBoard(gBoard)
    isFirstClick = true
    lifeCounter = 3
    document.querySelector('.restart-btn').innerText = '😀'
    document.querySelector('.life').innerText = `life left: ${lifeCounter}`
      safeClicksLeft = 3
    document.querySelector('.safe-click').innerText = `safe clicks left: ${safeClicksLeft}`
    stopTime()
}

function onInitGame() {

    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gLevel.size = 4
    gLevel.Mine = 2
    gBoard = createBoard(gLevel.size)
    renderBoard(gBoard)
    isFirstClick = true
    lifeCounter = 2
    document.querySelector('.restart-btn').innerText = '😀'
    document.querySelector('.life').innerText = `life left: ${lifeCounter}`
    safeClicksLeft = 3
    document.querySelector('.safe-click').innerText = `safe clicks left: ${safeClicksLeft}`
    
    stopTime()
    console.log('gBoard', gBoard)
}

function howManyMines(num, clickedRow, clickedCol) {
    let minesPlaced = 0;
    while (minesPlaced < num) {
        const i = getRandomIntInclusive(0, gLevel.size - 1);
        const j = getRandomIntInclusive(0, gLevel.size - 1);

        if (!(i === clickedRow && j === clickedCol) && !isNeighbor(clickedRow, clickedCol, i, j) && !gBoard[i][j].isMine) {
            gBoard[i][j].isMine = true;
            minesPlaced++;
        }
    }
}

function isNeighbor(clickedRow, clickedCol, row, col) {

    return Math.abs(clickedRow - row) <= 1 && Math.abs(clickedCol - col) <= 1;
}

function placeMinesAndCountNeighbors(clickedRow, clickedCol) {

    howManyMines(gLevel.Mine, clickedRow, clickedCol);
    renderCountGamerNegs(gBoard);
}

function expandShown(board, elCell, row, col) {

    const size = board.length

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < size && j >= 0 && j < size) {

                var classesName = `cell-${i}-${j}`
                var downCell = document.querySelector('.' + classesName)

                if (elCell.innerText === MINES || elCell.innerText === FLAG) continue
                if (countMinesAroundCell(board, row, col) === 0) {
                    if (elCell.classList[1] === `cell-${row}-${col}`) {
                        downCell.innerText = gBoard[i][j].minesAroundCount
                        downCell.style.color = 'rgb(121, 121, 255)'
                        downCell.style.opacity = '100'

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

    if (!gGame.isOn) return

    if (isFirstClick) {
        placeMinesAndCountNeighbors(i, j);
        timer();
        renderBoard(gBoard)
        isFirstClick = false;
    }

    if (elCell.innerText === '0') return

    if (elCell.innerText === FLAG) {
        elCell.style.color = 'rgb(121, 121, 255)'
        elCell.style.opacity = '100'

        return
    }

    if (elCell.innerText !== MINES) {
        elCell.innerText = gBoard[i][j].minesAroundCount
        elCell.style.color = 'rgb(121, 121, 255)'
        elCell.style.opacity = '100'
        if (gBoard[i][j].isShown === false) {
            gBoard[i][j].isShown = true
            gGame.shownCount++
        }
    }

    if (elCell.innerText === MINES) {
        lifeCounter--
        document.querySelector('.life').innerText = `life left: ${lifeCounter}`
        elCell.style.color = 'blue'
        elCell.style.opacity = '100'
        gBoard[i][j].isShown = true
        document.querySelector('.restart-btn').innerText = '😵'
        setTimeout(() => {
            if (lifeCounter !== 0) {
                document.querySelector('.restart-btn').innerText = '😀'
            }

        }, 1000);
        if (lifeCounter === 0) {
            gGame.isOn = false
            isLost()
            stopTime()
            console.log('you lost')
        }
    }


    expandShown(gBoard, elCell, i, j)
    checkGameOver()
}

function onCellMarked(event, i, j) {
    event.preventDefault()
    const cell = event.target
    if (!gGame.isOn) return

    if (cell.innerText === FLAG && gBoard[i][j].isMarked === true && gBoard[i][j].isMine === true) {
        cell.innerText = MINES
        gBoard[i][j].isMarked = false
        cell.style.color = 'transparent'
        cell.style.opacity = '100'

    } else if (cell.innerText === FLAG) {
        cell.innerText = ''
        gBoard[i][j].isMarked = false

    } else if (cell.innerText === '') {
        cell.innerText = FLAG
        gBoard[i][j].isMarked = true
        cell.style.color = 'red'
        cell.style.opacity = '100'
    } else if (cell.innerText === MINES) {
        cell.innerText = FLAG
        gBoard[i][j].isMarked = true
        cell.style.color = 'red'
        cell.style.opacity = '100'
    }

    if (cell.innerText === FLAG && gBoard[i][j].isMarked === true && gBoard[i][j].isMine === true) {
        gGame.markedCount++

    } else if (gBoard[i][j].isMine === true) {
        gGame.markedCount--
    }

    checkGameOver()
}

function isLost() {
    document.querySelectorAll('.cell').forEach(function (cell) {
        cell.style.color = 'rgb(121, 121, 255)'
        cell.style.opacity = '100'
    })
    document.querySelector('.restart-btn').innerText = '😵'

}

function safeClicks() {
    let emptyIdx = []

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine === false && gBoard[i][j].isShown === false && !isFirstClick) {
                emptyIdx.push({ i, j })
            }
        }
    }
    if (emptyIdx.length === 0) return null

    const random = getRandomIntInclusive(0, emptyIdx.length - 1)

if (safeClicksLeft === 0) return
    const currCell = document.querySelector(`.cell-${emptyIdx[random].i}-${emptyIdx[random].j}`)
    currCell.innerText = gBoard[emptyIdx[random].i][emptyIdx[random].j].minesAroundCount
    currCell.style.backgroundColor = 'red'
    currCell.style.opacity = '100'
    
    setTimeout(() => {
        currCell.style.backgroundColor = 'transparent'
        currCell.style.opacity = '0'
    }, 1000);
    
    
    gBoard[emptyIdx[random].i][emptyIdx[random].j].isShown = true
    gGame.shownCount++
    safeClicksLeft--
    document.querySelector('.safe-click').innerText = `safe clicks left: ${safeClicksLeft}`


}


