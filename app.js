const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")

const startCells = [
    "", "", "", "", "", "", "", "", ""
]

let turn = "circle"
infoDisplay.textContent = "Circle's turn first"

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })
}

createBoard();

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(turn)
    e.target.append(goDisplay)
    turn = turn === "circle" ? "cross" : "circle"
    style = turn === "circle" ? "color: orange;" : "color: green;";
    infoDisplay.setAttribute("style", style);
    infoDisplay.textContent = turn + "'s turn."
    e.target.removeEventListener("click", addGo)
    checkScore()
}

const allSquares = document.querySelectorAll(".square")
const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

function isCircleWinner() {
    for (var i = 0; i < winningCombos.length; i++) {
        const circleWins = winningCombos[i].every(cell => 
            allSquares[cell].firstChild?.classList.contains('circle'))
        if (circleWins) {
            return true;
        }
    }
    return false;
}

function isCrossWinner() {
    for (var i = 0; i < winningCombos.length; i++) {
        const crossWins = winningCombos[i].every(cell => 
            allSquares[cell].firstChild?.classList.contains('cross'))
        if (crossWins) {
            return true;
        }
    }
    return false;
}

function checkScore() {
    const circleWins = isCircleWinner();
    if (circleWins) {
        infoDisplay.setAttribute("style", "color: brown;");
        infoDisplay.textContent = "Yay!!! Circle Wins!!!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        return
    } 

    const crossWins = isCrossWinner();
    if (crossWins) {
        infoDisplay.setAttribute("style", "color: brown;");
        infoDisplay.textContent = "Yay!!! Cross Wins!!!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        return
    } 

    let draw = true;
    for (let i = 0; i < allSquares.length; i++) {
        if (!allSquares[i].hasChildNodes()) {
            draw = false;
            break;
        }
    }
    if (draw) {
        infoDisplay.setAttribute("style", "color: blue;");
        infoDisplay.textContent = "Uh Oh!! Match Draw!!!"
    }           
}

const restart = () => {
    location.reload();
}

restartBtn.addEventListener('click', restart);
