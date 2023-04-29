const $grid = document.querySelector('#grid');

let score = 0;

// array 4x4 of all cells with 0 value
const grid = [0, 0,];

const start = () => {
    const rows = $grid.children;

    // get two randon numbers between 0 and 3
    const randomRow1 = Math.floor(Math.random() * 4);
    const randomRow2 = Math.floor(Math.random() * 4);

    // get two random numbers between 0 and 3
    const randomCell1 = Math.floor(Math.random() * 4);
    const randomCell2 = Math.floor(Math.random() * 4);

    rows[randomRow1].children[randomCell1].innerHTML = '2';
    rows[randomRow2].children[randomCell2].innerHTML = '2';
};

const moveDown = () => {
    // move alll cells down

    const rows = $grid.children;

    for (let i = rows.length - 2; i >= 0; i--) {
        const row = rows[i];

        for (let j = 0; j < row.children.length; j++) {
            const cell = row.children[j];

            // move cell down if it is not empty
            if (cell.innerHTML !== '0') {
                const nextRow = findValidCellVertical('down', rows, i, j);

                if (nextRow) {
                    if (nextRow.innerHTML === '0') {
                        nextRow.innerHTML = cell.innerHTML;
                        cell.innerHTML = '0';
                    } else {
                        combineCells(nextRow, cell);
                    }
                }
            }
        }
    }

    addNewToken();
}

const moveUp = () => {
    const rows = $grid.children;

    for (let i = 0; i <= rows.length - 1; i++) {
        const row = rows[i];

        for (let j = 0; j < row.children.length; j++) {
            const cell = row.children[j];

            // move cell down if it is not empty
            if (cell.innerHTML !== '0') {
                const nextRow = findValidCellVertical('up', rows, i, j);

                if (nextRow) {
                    if (nextRow.innerHTML === '0') {
                        nextRow.innerHTML = cell.innerHTML;
                        cell.innerHTML = '0';
                    } else {
                        combineCells(nextRow, cell);
                    }
                }
            }
        }
    }

    addNewToken();
}

const moveRight = () => {
    const rows = $grid.children;

    for (let i = 0; i <= rows.length - 1; i++) {
        const row = rows[i];
        
        for (let j = 0; j < row.children.length; j++) {
            const cell = row.children[j];
            const nextCol = findValidCellHorizontal('right', row, i, j); 
            
            if (nextCol) {
                if (nextCol.innerHTML === '0') {
                    nextCol.innerHTML = cell.innerHTML;
                    cell.innerHTML = '0';
                } else {
                    combineCells(nextCol, cell);
                }
            }
        }
    }

 //   addNewToken();
}

const findValidCellHorizontal = (direction, row, rowIndex, colIndex) => {
    let startPoint = direction === 'left' ? 0 : row.children.length - 1;
    let index = direction === 'left' ? 0 : row.children.length - 1;

    let nextCell = row.children[startPoint];
    let validCell = false;

    const cell = row.children[colIndex];

    if (direction == 'left') {
        
    } else {
        while (!validCell && index > colIndex) {
            if (nextCell.innerHTML === '0' || nextCell.innerHTML === cell.innerHTML) {
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
            if (nextRow.innerHTML === '0' || nextRow.innerHTML === cell.innerHTML) {
                validCell = true;
            } else {
                index++;
                nextRow = rows[index].children[colIndex];
            }
        }
    } else {
        while (!validCell && index > rowIndex) {
            if (nextRow.innerHTML === '0' || nextRow.innerHTML === cell.innerHTML) {
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
        cell.innerHTML = '0';

        score += parseInt(nextRow.innerHTML);
    }
}

const addNewToken = () => {
    let emptyCell = false;
    const rows = $grid.children;

    while (!emptyCell) {
        // add new cell with value 2 or 4
        const randomRow = Math.floor(Math.random() * 4);
        const randomCell = Math.floor(Math.random() * 4);

        const cell = rows[randomRow].children[randomCell];

        if (cell.innerHTML === '0') {
            cell.innerHTML = '2';
            emptyCell = true;
        }
    }
}

addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowUp":
            moveUp();
            break; 
        case "ArrowRight":
            moveRight();
        default:
            break;
    }
});

// start();
