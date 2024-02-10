'use strict'
function createBoard(size) {
    let board = []
    for (let i = 0; i < size; i++) {
        board[i] = []
        for (let j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }

        }

    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]

            var cellClass = getClassName({ i, j }) + ' '

            strHTML += `<td class="cell ${cellClass}" onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellMarked(event,${i},${j}); return false;"> `

            if (currCell.isMine) {
                strHTML += MINES
            }

            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function renderCountGamerNegs(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine) continue
            board[i][j].minesAroundCount = countMinesAroundCell(board, i, j)
        }
    }
}

function countMinesAroundCell(board, row, col) {
    const size = board.length;
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < size && j >= 0 && j < size && !(i === row && j === col)) {
                if (board[i][j].isMine) {
                    count++
                }
            }
        }
    }
    return count;
}

function getEmpIdx(board) {
    let emptyIdx = []

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine === false) {
                emptyIdx.push({ i, j })
            }
        }
    }
    if (emptyIdx.length === 0) return null

    const random = getRandomIntInclusive(0, emptyIdx.length - 1)
    return emptyIdx[random]
}

function addMine() {
    const emptyLocation = getEmpIdx(gBoard)
    if (!emptyLocation) return

    gBoard[emptyLocation.i][emptyLocation.j].isMine = true

}

function getClassName(location) {
    return `cell-${location.i}-${location.j}`
}
let seconds = 0
let milliseconds = 0
let intervalId

function timeIncrease() {
    milliseconds += 10
    if (milliseconds === 1000) {
        milliseconds -= 1000
        seconds++
    }
    updateH1()
}

function timer() {
    intervalId = setInterval(timeIncrease, 10)

}

function stopTime() {
    clearInterval(intervalId)
    seconds = 0
    milliseconds = 0
}

function updateH1() {
    let elH1 = document.querySelector('h1')
    elH1.innerText = `time:${seconds}:${milliseconds}`
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}



