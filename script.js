const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const isValidIndex = (index) => index >=0 && index<9;

    const getBoard = () => [...board];

    const placeMark = (index, mark) => {
        if(isValidIndex(index) && board[index] === ""){
            board[index] = mark;
            return true;
        }
        return false;
    };  

    const resetBoard = () =>{
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return {
        getBoard,
        placeMark,
        resetBoard,
    };
    
})();
