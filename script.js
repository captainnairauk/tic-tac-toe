const gameBoard = {
    grid: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    gameStarted: false,
    currentPlayer: 'X',
    movesMade: 0
};


gameBoard.grid[1][1] = 'X';
console.log(gameBoard.grid[1][1]);
