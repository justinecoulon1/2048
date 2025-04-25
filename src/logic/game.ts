import {Board} from "./types";
import {getEmptyTilesIndexes} from "./tiles";

export function isGameEnded(board: Board): Boolean {
    if (getEmptyTilesIndexes(board).length !== 0) {
        return false;
    }
    const size = board.length;

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size - 1; col++) {
            if (board[row][col] === board[row][col + 1]) {
                return false;
            }
        }
    }

    for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col] === board[row + 1][col]) {
                return false;
            }
        }
    }

    return true;
}