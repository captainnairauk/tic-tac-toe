const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const isValidIndex = (index) => index >= 0 && index < 9;

  const getBoard = () => [...board];

  const placeMark = (index, mark) => {
    if (isValidIndex(index) && board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return {
    getBoard,
    placeMark,
    resetBoard,
  };
})();

const Player = (name, mark) => {
  let _name = name;
  let _mark = mark;

  const getName = () => _name;
  const getMark = () => _mark;

  return { getName, getMark };
};

const GameController = (() => {
  let currentPlayer;
  let gameActive = true;
  let player1;
  let player2;
  const winningPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal (top-left to bottom-right)
    [2, 4, 6], // Diagonal (top-right to bottom-left)
  ];

  // ... other private variables like win conditions, game state

  const switchTurns = () => {
    //Logic to switch between players
    //e.g, if current player is player 1, set to player 2, and vice versa
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWinCondition = () => {
    //Logic to check if the player has won
    // This would likely interact with gameboard object
    const board = GameBoard.getBoard();

    for(const pattern of winningPatterns){
        const [a,b,c] = pattern;
        if(board[a] !== '' && board[a] === board[b] && board[a] === board[c]){
            return true; //A win condition is met
        }
    }

    return false; //No win condition met
  };

  const checkDrawCondition = () => {
    //Logic to check for a draw
    const board = GameBoard.getBoard();
    return board.every(cell => cell !==''); //All cells are filled
  };

  const endGame = (message) => {
    gameActive = false;
    //Display win/draw message
  };

  const handlePlayerMove = (index) => {
    if (!gameActive) return;
    //Call GameBoard's method to place mark
    //Check for win/draw after move
    //If no win/draw, switch turns
  };

  const initializeGame = (p1, p2) => {
    //Set initial player, reset game board, set gameActive to true
    player1 = p1;
    player2 = p2;
    //Determine who goes first, e.g., randomly or always player1
    currentPlayer = player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  return {
    initialize: initializeGame,
    makeMove: handlePlayerMove,
    switchTurns,
    getCurrentPlayer,
    checkWinCondition
    //Expose other necessary public methods
  };
})();
