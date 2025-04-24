import {StyleSheet, Text, View} from "react-native";
import {Board} from "../logic/types";
import {getTileColor, getTileSize} from "../logic/tiles";

export default function GameGrid({board, boardSize}: { board: Board; boardSize: number }) {
    const tileSize = getTileSize(boardSize);

    return (<View style={[styles.grid, {gap: tileSize / 7, padding: tileSize / 7}]}>
        {board.map((row, rowIndex) => (
            <View style={[styles.row, {gap: tileSize / 7}]} key={rowIndex}>
                {row.map((cell, colIndex) => (
                    <View
                        style={[styles.tile, {
                            backgroundColor: getTileColor(cell),
                            width: tileSize,
                            height: tileSize
                        }]}
                        key={colIndex}>
                        <Text style={[styles.tileText, {fontSize: tileSize / 3}]}>{cell !== 0 ? cell : ''}</Text>
                    </View>
                ))}
            </View>
        ))}
    </View>)
}

const styles = StyleSheet.create({
    grid: {
        backgroundColor: '#e9d8b3',
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
    },
    tile: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    tileText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});