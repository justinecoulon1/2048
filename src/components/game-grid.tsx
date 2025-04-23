import {StyleSheet, Text, View} from "react-native";
import {Board} from "../logic/types";
import {getTileColor} from "../logic/tiles";

export default function GameGrid({board}: { board: Board }) {
    return (<View style={styles.grid}>
        {board.map((row, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
                {row.map((cell, colIndex) => (
                    <View
                        style={[styles.tile, {backgroundColor: getTileColor(cell)}]}
                        key={colIndex}>
                        <Text style={styles.tileText}>{cell !== 0 ? cell : ''}</Text>
                    </View>
                ))}
            </View>
        ))}
    </View>)
}

const styles = StyleSheet.create({
    grid: {
        backgroundColor: '#e9d8b3',
        padding: 8,
        borderRadius: 8,
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        gap: 8,
    },
    tile: {
        width: 70,
        height: 70,
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