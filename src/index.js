const $grid = document.querySelector('#grid');

let score = 0;
let win = false;
let gameOver = false;
const $score = document.querySelector('#score');

// array 4x4 of all cells with 0 value
const grid = [0, 0,];

const start = () => {
    addNewToken();
    addNewToken();
};

const moveDown = () => {
    // move alll cells down

    const rows = $grid.children;
    let thereIsAMove = false;

    for (let i = rows.length - 2; i >= 0; i--) {
        const row = rows[i];

        for (let j = 0; j < row.children.length; j++) {
            const cell = row.children[j];

            // move cell down if it is not empty
            if (cell.innerHTML !== '') {
                const nextRow = findValidCellVertical('down', rows, i, j);

                if (nextRow) {
                    if (nextRow.innerHTML === '') {
                        nextRow.innerHTML = cell.innerHTML;
                        cell.innerHTML = '';
                    } else {
                        combineCells(nextRow, cell);
                    }
                    thereIsAMove = true;
                }
            }
        }
    }

    if (thereIsAMove) addNewToken();
}

const moveUp = () => {
    const rows = $grid.children;
    let thereIsAMove = false;

    for (let i = 0; i <= rows.length - 1; i++) {
        const row = rows[i];

        for (let j = 0; j < row.children.length; j++) {
            const cell = row.children[j];

            // move cell down if it is not empty
            if (cell.innerHTML !== '') {
                const nextRow = findValidCellVertical('up', rows, i, j);

                if (nextRow) {
                    if (nextRow.innerHTML === '') {
                        nextRow.innerHTML = cell.innerHTML;
                        cell.innerHTML = '';
                    } else {
                        combineCells(nextRow, cell);
                    }
                    thereIsAMove = true;
                }
            }
        }
    }

    if (thereIsAMove) addNewToken();
}

const moveRight = () => {
    const rows = $grid.children;
    let thereIsAMove = false;

    for (let i = 0; i <= rows.length - 1; i++) {
        const row = rows[i];
        
        for (let j = 0; j < row.children.length; j++) {
            const cell = row.children[j];
            const nextCol = findValidCellHorizontal('right', row, i, j); 
            
            if (nextCol) {
                if (nextCol.innerHTML === '') {
                    nextCol.innerHTML = cell.innerHTML;
                    cell.innerHTML = '';
                } else {
                    combineCells(nextCol, cell);
                }
                thereIsAMove = true;
            }
        }
    }

    if (thereIsAMove) addNewToken();
}

const moveLeft = () => {
    const rows = $grid.children;
    let thereIsAMove = false;

    for (let i = 0; i <= rows.length - 1; i++) {
        const row = rows[i];
        
        for (let j = row.children.length - 1; j >= 0; j--) {
            const cell = row.children[j];
            const nextCol = findValidCellHorizontal('left', row, i, j); 
            
            if (nextCol) {
                if (nextCol.innerHTML === '') {
                    nextCol.innerHTML = cell.innerHTML;
                    cell.innerHTML = '';
                } else {
                    combineCells(nextCol, cell);
                }
                thereIsAMove = true;
            }
        }
    }

    if (thereIsAMove) addNewToken();
}

const findValidCellHorizontal = (direction, row, rowIndex, colIndex) => {
    let startPoint = direction === 'left' ? 0 : row.children.length - 1;
    let index = direction === 'left' ? 0 : row.children.length - 1;

    let nextCell = row.children[startPoint];
    let validCell = false;

    const cell = row.children[colIndex];

    if (direction == 'left') {
        while (!validCell && index < colIndex) {
            if (nextCell.innerHTML === '' || nextCell.innerHTML === cell.innerHTML) {
                validCell = true;
            } else {
                index++;
                nextCell = row.children[index];
            }
        }
    } else {
        while (!validCell && index > colIndex) {
            if (nextCell.innerHTML === '' || nextCell.innerHTML === cell.innerHTML) {
                validCell = true;
            } else {
                index--;
                nextCell = row.children[index];
            }
        }
    }

    return validCell ? nextCell : false;
}

const findValidCellVertical = (direction, rows, rowIndex, colIndex) => {
    let startPoint = direction === 'up' ? 0 : rows.length - 1;
    let index = direction === 'up' ? 0 : rows.length - 1;

    let nextRow = rows[startPoint].children[colIndex];
    let validCell = false;

    const cell = rows[rowIndex].children[colIndex];

    if (direction == 'up') {
        while (!validCell && index < rowIndex) {
            if (nextRow.innerHTML === '' || nextRow.innerHTML === cell.innerHTML) {
                validCell = true;
            } else {
                index++;
                nextRow = rows[index].children[colIndex];
            }
        }
    } else {
        while (!validCell && index > rowIndex) {
            if (nextRow.innerHTML === '' || nextRow.innerHTML === cell.innerHTML) {
                validCell = true;
            } else {
                index--;
                nextRow = rows[index].children[colIndex];
            }
        }
    }


    return validCell ? nextRow : false;
}

const combineCells = (nextRow, cell) => {
    if (nextRow.innerHTML === cell.innerHTML) {
        nextRow.innerHTML = parseInt(nextRow.innerHTML) + parseInt(cell.innerHTML);
        cell.innerHTML = '';

        score += parseInt(nextRow.innerHTML);
        $score.innerHTML = `${score}`;
    }
}

const getEmptyCells = () => {
    const emptyCells = [];

    for (let i = 0; i < $grid.children.length; i++) {
        const row = $grid.children[i];

        for (let j = 0; j < row.children.length; j++) {
            const cell = row.children[j];

            if (cell.innerHTML === '') {
                emptyCells.push(cell);
            }
        }
    }

    return emptyCells;
}

const addNewToken = () => {
    // save all empty cells
    const emptyCells = getEmptyCells();

    // add new token to random empty cell
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.innerHTML = '2';
    }
}

const checkGameOver = () => {
    // check if there are any empty cells
    const emptyCells = getEmptyCells();

    if (emptyCells.length === 0) {
        alert('Game Over');
        gameOver = true;
    }
}

const checkWin = () => {
    if (score >= 2048) {
        alert('You Win!');
        win = true;
    }
}

addEventListener('keydown', (event) => {
    if (gameOver || win) return;

    switch (event.key) {
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowUp":
            moveUp();
            break; 
        case "ArrowRight":
            console.log('right');
            moveRight();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        default:
            break;
    }

    checkGameOver();
    checkWin();
});

start();
