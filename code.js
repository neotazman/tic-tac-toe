// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.
const gameModel = { //the starting board
    gameBoard: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    //Turns
    playerOneTurn: true, //game starts on player one's turn
    playerTwoTurn: false,
    //Game Ending Values
    playerOneWin: false,
    playerTwoWin: false,
    draw: false,
    //Game Ending Marker// idk if this will be important, but it's good to have in case
    gameOver: false,
}

//HTML elements
const squares = document.querySelectorAll('td') //the array of all the clickable squares
const gameElement = document.getElementById('gameBoard') //the element that can be clicked
const winMessage = document.getElementById('winMessage') //the element that shows the winning message
const turnMarker = document.getElementById('turnMarker') //the element to show whose turn it is
const resetButton = document.getElementById('resetButton') //the button to reset the game
turnMarker.innerText="Player One's Turn" //starts the game on player one's turn

const checkDraw = () => { //checks if the game is over (the last time check win can be run is right before this function)
    let gameEnd = [] //one array to hold all gameboard values

    gameModel.gameBoard.forEach((row) => { //putting each value into one array
        row.forEach((value) => {
            gameEnd.push(value)
        })
    })
    if(!gameEnd.includes(0)) { //if a zero is in the gameboard, the game is not over
        gameModel.draw = true
        gameModel.gameOver = true
        winMessage.innerText = "The Game is a Draw"
    }
}

const handleSquareClick = (event) => { //function that runs whenever a square is clicked
    event.preventDefault();
    let theBoard = gameModel.gameBoard
    for(let i = 0; i < 3; i++) { //these loops are just ways to check which specific element is chosen
        for(let j = 0; j < 3; j++) {
            let currentSquare = document.getElementById(`row${i} box${j}`)//each square has it's own class with this format so it can reference the gameBoard more easily
            if(currentSquare === event.target && !currentSquare.classList.value && !gameModel.gameOver) { //checks that the element clicked is the right location in the data model and makes sure the code doesn't run if it's already been clicked or the game is over
                if(gameModel.playerOneTurn) {
                    currentSquare.classList.add('x')//adds a class of x for css purposes
                    theBoard[i][j] = 1
                    checkWin()
                    checkDraw()
                    gameModel.playerOneTurn = false
                    gameModel.playerTwoTurn = true
                    turnMarker.innerText = "Player Two's Turn"
                } else if(gameModel.playerTwoTurn) {
                    currentSquare.classList.add('o') //i tried to add the letter o as inner text, but it screwed up the whole table
                    theBoard[i][j] = 2
                    checkWin()
                    checkDraw()
                    gameModel.playerTwoTurn = false
                    gameModel.playerOneTurn = true
                    turnMarker.innerText="Player One's Turn"
                }
            }
        }
    }
    
}

const checkHorizontalWin = () => {
    let theBoard = gameModel.gameBoard //making the board its own variable and it might make it easier
    for(let row of theBoard) {
        if(row[0] === row[1] && row[1] === row[2]) { //if all three positions in the row are the same, it's a horizontal win (it should be noted that while this if statement runs when they're all 0s it only returns true if it's a 1 or a 2)
            if(row[0] === 1) { //if they're all 1s, player one wins
                gameModel.playerOneWin = true;
                gameModel.gameOver = true;
            } else if(row[0] === 2) { //all 2s means player two wins
                gameModel.playerTwoWin = true
                gameModel.gameOver = true
            }
        } 
    }
}

const checkVerticalWin = () => {
    let theBoard = gameModel.gameBoard
    for(let i = 0; i < 3; i++) {
        if(theBoard[0][i] === theBoard[1][i] && theBoard[1][i] === theBoard[2][i]) { //if the same index in each row are equal, it's a win
            if(theBoard[0][i] === 1) {
                gameModel.playerOneWin = true
                gameModel.gameOver = true
            } else if(theBoard[0][i] === 2) {
                gameModel.playerTwoWin = true
                gameModel.gameOver = true
            }
        }
    }
}

const checkDiagonalWin = () => {
    let theBoard = gameModel.gameBoard
    if(theBoard[0][0] === theBoard[1][1] && theBoard[1][1] === theBoard[2][2] || theBoard[0][2] === theBoard[1][1] && theBoard[1][1] === theBoard[2][0]) { //there's only two ways to win diagonally, so there doesn't need to be a loop to check the win
        if(theBoard[1][1] === 1) { //in a diagonal win, the center square will always be part of the win
            gameModel.playerOneWin = true
            gameModel.gameOver = true
        } else if(theBoard[1][1] === 2) {
            gameModel.playerTwoWin = true
            gameModel.gameOver = true
        }
    }
}

const checkWin = () => { //runs after every click (checks the data model, not the dom)
    checkHorizontalWin()
    checkVerticalWin()
    checkDiagonalWin()
    if(gameModel.gameOver) {
        if(gameModel.playerOneWin) {
            winMessage.innerText = 'Player One Wins!!!'
        } else if(gameModel.playerTwoWin) {
            winMessage.innerText = 'Player Two Wins!!!'
        }
    }
}

gameElement.addEventListener('click', handleSquareClick)
resetButton.addEventListener('click', (event) => {//made a single callback function for the reset button
    event.preventDefault()
    //clearing the squares
    squares.forEach((currentSquare) => {
        if(currentSquare.classList.value === 'x') {
            currentSquare.classList.remove('x')
        } else if(currentSquare.classList.value === 'o') {
            currentSquare.classList.remove('o')
        }
    })
    gameModel.gameBoard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    //reset the game values
    gameModel.playerOneTurn = true
    gameModel.playerTwoTurn = false
    gameModel.playerOneWin = false
    gameModel.playerTwoWin = false
    gameModel.draw = false
    gameModel.gameOver = false    
    //reset the display messages
    winMessage.innerText = ""
    turnMarker.innerText = "Player One's Turn"
})