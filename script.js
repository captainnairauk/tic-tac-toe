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
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
  ];

  const switchTurns = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWinCondition = () => {

    const board = GameBoard.getBoard();

    for(const pattern of winningPatterns){
        const [a,b,c] = pattern;
        if(board[a] !== '' && board[a] === board[b] && board[a] === board[c]){
            return true; 
        }
    }

    return false; 
  };

  const checkDrawCondition = () => {
    
    const board = GameBoard.getBoard();
    return board.every(cell => cell !==''); 
  };

  const endGame = (message) => {
    gameActive = false;
  };

  const handlePlayerMove = (index) => {
    if (!gameActive) return;
    const success = GameBoard.placeMark(index, currentPlayer.getMark());
    if(!success) return false;

    if(checkWinCondition()){
        endGame(`${currentPlayer.getName()} wins!`);
        return `${currentPlayer.getName()} wins!`;
    }

    if(checkDrawCondition()){
        endGame("It's a draw!");
        return "It's a draw!";
    }

    switchTurns();
    return true;
  };

  const initializeGame = (p1, p2) => {
    player1 = p1;
    player2 = p2;
    currentPlayer = player1;
    gameActive = true;
    GameBoard.resetBoard();
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

const DisplayController = (() => {

})();
