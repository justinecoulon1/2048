import {Board} from "./types";
import {getEmptyTilesIndexes} from "./tiles";

export function isGameEnded(board: Board): Boolean {
    const emptyTiles = getEmptyTilesIndexes(board);
    return emptyTiles.length === 0;
}