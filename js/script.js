const pvpBtn = document.querySelector('#btn-pvp');
const pveBtn = document.querySelector('#btn-pve');
const resetBtn = document.querySelector('#btn-reset');

const startGameModal = document.querySelector('#start-game')
const endGameModal = document.querySelector('#end-game__modal');
const form = document.querySelector('#form');
const boardGrid = document.querySelector('#game-grid');
const startBtnContainer = document.querySelector('#start-game__btn-container');
const boardContainer = document.querySelector('#game-container');
const scoreContainer = document.querySelector('#score-container')
const endGameInfo = document.querySelector('#end-game__info')

const displayController = (() => {
    
    // When button is clicked, start screen hides, game play screen appears
    pvpBtn.addEventListener('click', () => {
       startGameModal.style.display = 'none';
       game.start();
    });

    pveBtn.addEventListener('click', () => {
        startGameModal.style.display = 'none';
        game.start();
    });

    resetBtn.addEventListener('click', () => {
        endGameModal.close();
    })
});

const gameBoard = (() => {

    const board = [
        '', '', '', 
        '', '', '', 
        '', '', ''
    ];
    
    // Create tic tac toe grid, add event listener to click on cell only once
    const renderBoard = () => {
        boardGrid.innerText = '';
        board.forEach((square, index) => {
            const cell = document.createElement('div')
            cell.classList.add('cell');
            cell.setAttribute('data-index', index);
            cell.addEventListener('click', game.createMark, { once: true });
            boardGrid.appendChild(cell);
        })
    };

    const resetBoard = () => {
        board = [
            '', '', '', 
            '', '', '', 
            '', '', ''
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
    let currentPlayer = 'playerOne';
    let placeMark = 'cross';

    const createPlayer = (name, mark) => {
        return {
            name, 
            mark
        }
    };

    const start = () => {
        players = [
            createPlayer('playerOne', 'X'),
            createPlayer('playerTwo', 'O'),
        ]
        gameBoard.renderBoard();
    };

    function swapTurns() {
        placeMark = placeMark === 'cross' ? 'circle' : 'cross';
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

const checkScore = () => {
    const allCells = document.querySelectorAll('.cell');
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
            const playerOneAlert = document.createElement('p')
            playerOneAlert.innerText = 'Player One Wins'
            endGameInfo.appendChild(playerOneAlert);
            endGameModal.showModal();
            return
        }
    });

    winningCombos.forEach(array => {
        const playerTwoWins = array.every(cell => allCells[cell].firstChild?.classList.contains('circle'));

        if (playerTwoWins) {
            console.log('Player Two Wins');
            return
        }
    });

};

displayController();