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
// for testing
    // board[0][0].isMine = true
    // board[1][1].isMine = true
    // board[2][2].isMine = true
    
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]

            var cellClass = getClassName({ i, j }) + ' '
            // cellClass += (currCell.type === WALL) ? 'wall' : 'floor'
            strHTML += `<td class="cell ${cellClass}" onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellMarked(event,${i},${j}); return false;">`

            if (currCell.isMine) {

                strHTML += MINES
            } else {
                strHTML += ''
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
function countNegsAroundCell(board, elCell, row, col) {
    const size = board.length;
    // let cell = '';
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < size && j >= 0 && j < size && !(i === row && j === col)) {
                if (!board[i][j].isMine) {
                    elCell.innerText = gBoard[i+1][j].minesAroundCount
                }
            }
        }
    }
    return elCell.innerText;
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
    // renderCell(emptyLocation, MINES)
}























function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
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

function formatDate(date, format) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZoneName: 'short'
    };
    return date.toLocaleDateString(undefined, options);
}

function uniqueArray(arr) {
    return arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
}

function qs(selector, parent = document) {
    return parent.querySelector(selector)
}

function qsa(selector, parent = document) {
    return [...parent.querySelectorAll(selector)]
}


function getClassName(location) {
    return `cell-${location.i}-${location.j}`
}