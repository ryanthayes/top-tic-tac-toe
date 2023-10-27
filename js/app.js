// 1. Create a tic tac toe grid (3x3) 
// 2. Player chooses where to place mark
// 3. Computer chooses where to place mark
// 4. Neither can place mark in cell containing another mark
// 5. If player gets 3 same marks in a row, return they win

// if you only ever need ONE of something (gameBoard, displayController), use a module. 

// If you need multiples of something (players!), create them with factories.

const pvpBtn = document.querySelector('#btn-pvp');
const pveBtn = document.querySelector('#btn-pve');

const startModal = document.querySelector('#start__modal')
const form = document.querySelector("#form");
const board = document.querySelector('#board-grid');
const startBtnContainer = document.querySelector('#start__btn-container');
const boardContainer = document.querySelector('#board-container');
const scoreContainer = document.querySelector('#score-container')
const infoDisplay = document.querySelector("#score-player-one")

const displayController = (() => {
    
    pvpBtn.addEventListener('click', () => {
       startModal.style.display = 'none';
       game.start();
    });

    pveBtn.addEventListener('click', () => {
        startModal.style.display = 'none';
        game.start();
    });
});

const gameBoard = (() => {

    const boardArray = [
        "", "", "", 
        "", "", "", 
        "", "", ""
    ];
    
    const renderBoard = () => {
        board.innerText = "";
        boardArray.forEach((square, index) => {
            const cell = document.createElement('div')
            cell.classList.add('cell');
            cell.setAttribute('data-index', index);
            cell.addEventListener('click', game.createMark, { once: true });
            board.appendChild(cell);
        })
    };

    const resetBoard = () => {
        boardArray = [
            "", "", "", 
            "", "", "", 
            "", "", ""
        ];

    }

    // Allow other functions to access gameBoard
    const getGameBoard = () => gameBoard;
    
    return {
        renderBoard,
        resetBoard,
        getGameBoard,
    }

})();



const game = (() => {

    let players = [];
    let placeMark = "cross";

    const createPlayer = (name, mark) => {
        return {
            name, 
            mark
        }
    };

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

const checkScore = (board) => {
    const allCells = document.querySelectorAll(".cell");
    const winningCombos = [
        [0,1,2], 
        [3,4,5], 
        [6,7,8], 
        [0,3,6], 
        [1,4,7], 
        [2,5,8], 
        [0,4,8], 
        [2,4,6] 
    ];
    
    winningCombos.forEach(array => {
        const playerOneWins = array.every(cell => allCells[cell].firstChild?.classList.contains('cross'));

        if (playerOneWins) {
            alert('Player One Wins');
            return
        }
    });

    winningCombos.forEach(array => {
        const playerTwoWins = array.every(cell => allCells[cell].firstChild?.classList.contains('circle'));

        if (playerTwoWins) {
            alert('Player Two Wins');
            return
        }
    });

    winningCombos.forEach(array => {
        const playerOneWins = array.every(cell => allCells[cell].firstChild?.classList.contains('cross'));

        if (playerOneWins) {
            alert('Player One Wins');
            return
        }
    });


};

displayController();
