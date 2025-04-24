import {Board} from "./types";

const DEFAULT_COLOR = '#24140a';
const COLOR_BY_NUMBER: Record<number, string> = {
    0: '#f8f1e1',
    2: '#e0d0b0',
    4: '#d1b495',
    8: '#b88f63',
    16: '#9c7c51',
    32: '#8b6a3a',
    64: '#7a5725',
    128: '#6d4c1f',
    256: '#5b3f18',
    512: '#4a3314',
    1024: '#3d2b0f',
    2048: '#30200a',
}

export function getTileColor(value: number): string {
    return COLOR_BY_NUMBER[value] ?? DEFAULT_COLOR;
}

const DEFAULT_SIZE = 70;
const TILE_SIZE_BY_BOARD_SIZE: Record<number, number> = {
    4: 70,
    6: 40,
    8: 35,
}

export function getTileSize(boardSize: number): number {
    return TILE_SIZE_BY_BOARD_SIZE[boardSize] ?? DEFAULT_SIZE;
}

export function getEmptyTilesIndexes(board: Board) {
    const emptyTiles: [number, number][] = [];
    board.forEach((row, rowIndex) =>
        row.forEach((tile, colIndex) => {
            if (tile === 0) {
                emptyTiles.push([rowIndex, colIndex]);
            }
        })
    );
    return emptyTiles;
}


function getRandomTileValue() {
    return Math.random() < 0.5 ? 2 : 4;
}

export function addRandomTile(board: Board) {
    const emptyTilesIndexes = getEmptyTilesIndexes(board);
    const [randomTileRow, randomTileCol] = emptyTilesIndexes[Math.floor(Math.random() * emptyTilesIndexes.length)];
    const newTileValue = getRandomTileValue();

    return board.map((rowArr, i) =>
        rowArr.map((cell, j) => (i === randomTileRow && j === randomTileCol ? newTileValue : cell))
    );
}