// 1. Create a tic tac toe grid (3x3) 
// 2. Player chooses where to place mark
// 3. Computer chooses where to place mark
// 4. Neither can place mark in cell containing another mark
// 5. If player gets 3 same marks in a row, return they win

// if you only ever need ONE of something (gameBoard, displayController), use a module. 

// If you need multiples of something (players!), create them with factories.

const infoDisplay = document.querySelector("#score-player-one")

const gameBoard = (() => {
    
    const boardContainer = document.querySelector('#board');
    const board = [
        "", "", "", 
        "", "", "", 
        "", "", ""];
    
    const renderBoard = () => {
        boardContainer.innerText = "";
        board.forEach((square, index) => {
            const cell = document.createElement('div')
            cell.classList.add('cell');
            cell.setAttribute('data-index', index);
            cell.addEventListener('click', game.createMark, { once: true });
            boardContainer.appendChild(cell);
        })
    };

    return {
        renderBoard,
    }

})();

const createPlayer = (name, mark) => {
    return {
        name, 
        mark
    }
};

const game = (() => {

    let players = [];
    let placeMark = "cross";

    const form = document.querySelector("#form");

    const start = () => {
        players = [
            createPlayer("player1", "X"),
            createPlayer("player2", "O"),
        ]
        gameBoard.renderBoard();
    };

    function swapTurns() {
        placeMark = placeMark === "cross" ? "circle" : "cross";
    };

    const createMark = e => {
        const cell = e.target;
        const mark = document.createElement('div');
        mark.classList.add(placeMark);
        cell.append(mark);
        swapTurns();
        checkScore();
    }
    return {
        start,
        createMark
    };

})();

game.start();
