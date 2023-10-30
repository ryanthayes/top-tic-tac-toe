// 1. Create a tic tac toe grid (3x3) 
// 2. Player chooses where to place mark
// 3. Computer chooses where to place mark
// 4. Neither can place mark in cell containing another mark
// 5. If player gets 3 same marks in a row, return they win

// if you only ever need ONE of something (gameBoard, displayController), use a module. 

// If you need multiples of something (players!), create them with factories.

const allCells = document.querySelectorAll('.cell');
const gameInfo = document.querySelector('#game-info')
const endGameModal = document.querySelector('#end-game__modal');
const endGameInfo = document.querySelector("#end-game__info")
const gameBoard = document.querySelector('#game-board');


// Create array to hold board state
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const displayController = (() => {

    const startGameModal = document.querySelector('#start-game')
    const startBtnContainer = document.querySelector('#start-game__btn-container');

    const pvpBtn = document.querySelector('#btn-pvp');
    const pveBtn = document.querySelector('#btn-pve');
    const restartBtn = document.querySelector('#btn-restart');
    
    // When button is clicked, start screen hides, game play screen appears
    pvpBtn.addEventListener('click', () => {
       startGameModal.style.display = 'none';
       setBoard.renderBoard();
    });

    pveBtn.addEventListener('click', () => {
        alert(`Under Construction`);
    });

    restartBtn.addEventListener('click', () => {
        setBoard.resetBoard();
        endGameModal.close();
    })
    
    // Prevent ESC key from closing dialog modal
    endGameModal.addEventListener('cancel', (event) => {
        event.preventDefault();
    });

});

const setBoard = (() => {
    
    const renderBoard = () => {
        allCells.forEach((cell, index) => {
            cell.setAttribute('data-index', index);
            cell.addEventListener('click', () => {
                playRound.placeMark(index);
            })
        }) 
    };


    const resetBoard = () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        currentPlayer = playerOne;
        gameOver = false;
        allCells.forEach(cell => {
            cell.innerText = '';
        });
        endGameInfo.innerHTML = '';
    };
    
    return {
        renderBoard,
        resetBoard
    };

})();

const playerOne = 'X';
const playerTwo = 'O'
let currentPlayer = playerOne;
let gameOver = false;

const playRound = (() => {
    
    const createMark = () => {
        // Iterate over rows
        for (let row = 0; row < 3; row++) {
            // Iterate over columns
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === 'X') {
                    // Update cell class to include cross
                    allCells[(row * 3) + col].innerText = (playerOne);

                } else if (board[row][col] === 'O') {
                    // Update cell class to include circle
                    allCells[(row * 3) + col].innerText = (playerTwo);
                }
            }
        }
    }

    const swapTurns = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    // Create a function for placing markers
    const placeMark = (index) => {
        // Determine row and column index
        const col = index % 3;
        const row = (index - col) / 3;
        // Check if current cell is empty
        if (board[row][col] == 0 && gameOver === false) {
            board[row][col] = currentPlayer;
            createMark();
            checkForWinner();
            swapTurns();
        }
        return
    }

    return {
        placeMark,
    };

})();

const checkForWinner = () => {
    
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
    
    // check for rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== '') {
            const displayWinner = document.createElement('p')
            displayWinner.innerText = `${currentPlayer} Wins!`;
            endGameInfo.appendChild(displayWinner);
            endGameModal.showModal();
            gameOver = true;
            return
        }
    };
    // check for columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== '') {
            const displayWinner = document.createElement('p')
            displayWinner.innerText = `${currentPlayer} Wins!`;
            endGameInfo.appendChild(displayWinner);
            endGameModal.showModal();
            gameOver = true;
            return
        }
    };
    // check for diagonals
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== '') {
        const displayWinner = document.createElement('p')
        displayWinner.innerText = `${currentPlayer} Wins!`;
        endGameInfo.appendChild(displayWinner);
        endGameModal.showModal();
        gameOver = true;
        return
    };
    if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== '') {
        const displayWinner = document.createElement('p')
        displayWinner.innerText = `${currentPlayer} Wins!`;
        endGameInfo.appendChild(displayWinner);
        endGameModal.showModal();
        gameOver = true;
        return
    };

    // check for a tie
    // if all cells are filled and no winner
    var count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] != '') {
                count++;
            }
        }
    };
    if (count == 9) {
        const displayWinner = document.createElement('p')
        displayWinner.innerText = `DRAW!`;
        endGameInfo.appendChild(displayWinner);
        endGameModal.showModal();
        gameOver = true;
        return
    };
};

displayController();