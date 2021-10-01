// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.
const gameModel = { //the starting board
    gameBoard: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    playerOneTurn: true,
    playerTwoTurn: false,
    playerOneWin: false,
    playerTwoWin: false,
    draw: false,
}

const checkHorizontalWin = () => {
    let theBoard = gameModel.gameBoard //making the board its own variable and it might make it easier
    for(let row of theBoard) {
        if(row[0] === row[1] === row[2]) { //if all three positions in the row are the same, it's a horizontal win (it should be noted that while this if statement runs when they're all 0s it only returns true if it's a 1 or a 2)
            if(row[0] === 1) { //if they're all 1s, player one wins
                gameModel.playerOneWin = true;
                return true;
            } else if(row[0] === 2) { //all 2s means player two wins
                gameModel.playerTwoWin = true
                return true
            }
        } 
    }
    return false //if it runs the entire function and doesn't return true, it returns false
}

const checkVerticalWin = () => {
    let theBoard = gameModel.gameBoard
    for(let i = 0; i < 3; i++) {
        if(theBoard[0][i] === theBoard[1][i] === theBoard[2][i]) { //if the same index in each row are equal, it's a win
            if(theBoard[0][i] === 1) {
                gameModel.playerOneWin = true
                return true
            } else if(theBoard[0][i] === 2) {
                gameModel.playerTwoWin = true
                return true
            }
        }
    }
    return false
}

const checkDiagonalWin = () => {
    let theBoard = gameModel.gameBoard
    if(theBoard[0][0] === theBoard[1][1] === theBoard[2][2] || theBoard[0][2] === theBoard[1][1] === theBoard[2][0]) { //there's only two ways to win diagonally, so there doesn't need to be a loop to check the win
        if(theBoard[1][1] === 1) { //in a diagonal win, the center square will always be part of the win
            gameModel.playerOneWin = true
            return true
        } else if(theBoard[1][1] === 2) {
            gameModel.playerTwoWin = true
            return true
        }
    }
}

