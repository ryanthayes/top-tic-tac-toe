// 1. Create a tic tac toe grid (3x3) 
// 2. Player chooses where to place mark
// 3. Computer chooses where to place mark
// 4. Neither can place mark in cell containing another mark
// 5. If player gets 3 same marks in a row, return they win

// if you only ever need ONE of something (gameBoard, displayController), use a module. 

// If you need multiples of something (players!), create them with factories.

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
            cell.addEventListener('click', () => {
                console.log("I am clicked!");
            })
            boardContainer.appendChild(cell);
        })
    };
   
    return {
        renderBoard,
    }

})();

gameBoard.renderBoard();

// const game = (() => {

//     const players = [];

// })();