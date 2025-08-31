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

    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }

    return false;
  };

  const checkDrawCondition = () => {
    const board = GameBoard.getBoard();
    return board.every((cell) => cell !== "");
  };

  const endGame = (message) => {
    gameActive = false;
    DisplayController.updateMessage(message);
  };

  const handlePlayerMove = (index) => {
    if (!gameActive) return;

    const success = GameBoard.placeMark(index, currentPlayer.getMark());
    if (!success) return false;

    DisplayController.renderBoard(GameBoard.getBoard());

    if (checkWinCondition()) {
      endGame(`${currentPlayer.getName()} wins!`);
      return;
    }

    if (checkDrawCondition()) {
      endGame("It's a draw!");
      return;
    }

    switchTurns();
    DisplayController.updateMessage(`${currentPlayer.getName()}'s turn`);
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
    checkWinCondition,
    //Expose other necessary public methods
  };
})();

const DisplayController = (() => {
  const gameBoardElement = document.getElementById("gameboard"); // Assuming you have an element with id 'gameboard' in your HTML
  const messageElement = document.getElementById("message"); // Assuming an element for game messages

  // API to render the game board based on the Gameboard module's state
  const renderBoard = (boardState) => {
    gameBoardElement.innerHTML = ""; //Clear previous board
    boardState.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.dataset.index = index; //Store index for event handling
      cellElement.textContent = cell; //Display 'X', 'O', or empty
      gameBoardElement.appendChild(cellElement);
    });
  };

  //API to update game messages (e.g., current player, winner, draw)
  const updateMessage = (message) => {
    messageElement.textContent = message;
  };

  //API to add event listeners to the board cells
  const addCellClickListeners = (handlerFunction) => {
    gameBoardElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("cell")) {
        const index = parseInt(event.target.dataset.index);
        handlerFunction(index); //Call the handler provided by game logic
      }
    });
  };

  return { renderBoard, updateMessage, addCellClickListeners };
})();

const p1 = Player("Player 1", "X");
const p2 = Player("Player 2", "O");

function startGame() {
  GameController.initialize(p1, p2);
  DisplayController.renderBoard(GameBoard.getBoard());
  DisplayController.updateMessage(`${p1.getName()}'s turn`);
}

startGame();

DisplayController.addCellClickListeners((index) => {
  GameController.makeMove(index);
});

document.getElementById("restartBtn").addEventListener("click", () =>{
    startGame();
});
