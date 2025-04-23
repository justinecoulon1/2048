import {Board, Direction} from "./types";
import {addRandomTile} from "./tiles";

export function initializeBoard(boardSize: number): Board {
    return [
        [0, 2, 4, 8],
        [128, 64, 32, 16],
        [256, 1024, 2048, 4096],
        [0, 0, 0, 0],
    ];
}

export function updateBoardHorizontally(board: Board, direction: Direction): Board {
    let boardSize;

    const updatedBoard = board.map(row => {
        boardSize = row.length;
        let newRow = row.filter(tile => tile !== 0);

        if (direction === Direction.RIGHT) {
            for (let i = newRow.length - 1; i > 0; i--) {
                if (newRow[i] === newRow[i - 1]) {
                    newRow[i] *= 2;
                    newRow[i - 1] = 0;
                }
            }

            newRow = newRow.filter((tile) => tile !== 0);
            while (newRow.length < boardSize) {
                newRow.unshift(0);
            }
            return newRow;
        }
        if (direction === Direction.LEFT) {
            for (let i = 0; i < newRow.length - 1; i++) {
                if (newRow[i] === newRow[i + 1]) {
                    newRow[i] *= 2;
                    newRow[i + 1] = 0;
                }
            }

            newRow = newRow.filter((tile) => tile !== 0);
            while (newRow.length < boardSize) {
                newRow.push(0);
            }
            return newRow;
        }
        return [];
    });

    return addRandomTile(updatedBoard);
}

export function updateBoardVertically(board: Board, direction: Direction): Board {
    const boardSize = board.length;
    const updatedBoard = Array.from({length: boardSize}, () => Array(boardSize).fill(0));

    for (let col = 0; col < boardSize; col++) {
        const column = [];

        if (direction === Direction.UP) {
            for (let row = 0; row < boardSize; row++) {
                if (board[row][col] !== 0) {
                    column.push(board[row][col]);
                }
            }
        } else if (direction === Direction.DOWN) {
            for (let row = boardSize - 1; row >= 0; row--) {
                if (board[row][col] !== 0) {
                    column.push(board[row][col]);
                }
            }
        }

        for (let i = 0; i < column.length - 1; i++) {
            if (column[i] === column[i + 1]) {
                column[i] *= 2;
                column[i + 1] = 0;
            }
        }

        const merged = column.filter(n => n !== 0);

        if (direction === Direction.UP) {
            for (let row = 0; row < boardSize; row++) {
                updatedBoard[row][col] = merged[row] || 0;
            }
        } else if (direction === Direction.DOWN) {
            for (let row = boardSize - 1, i = 0; row >= 0; row--, i++) {
                updatedBoard[row][col] = merged[i] || 0;
            }
        }
    }
    return addRandomTile(updatedBoard);
}