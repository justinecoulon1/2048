import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector, GestureHandlerRootView,} from 'react-native-gesture-handler';
import GameGrid from "../components/game-grid";
import {initializeBoard, updateBoardHorizontally, updateBoardVertically} from "../logic/board";
import {Direction} from "../logic/types";
import {Route2048} from "./routes";
import {isGameEnded} from "../logic/game";

export default function GameScreen({route}: { route: Route2048<'Game'> }) {
    const boardSize = route.params.size ?? 4;
    const [board, setBoard] = useState(initializeBoard(boardSize));
    const [gameEnded, setGameEnded] = useState(isGameEnded(board));
    const [biggestTile, setBiggestTile] = useState<number | undefined>(undefined);

    const resetBoard = () => {
        setBoard(initializeBoard(boardSize));
        setGameEnded(false);
        setBiggestTile(undefined);
    };

    const handleSetBiggestTile = (tile: number) => {
        console.log(tile)
        setBiggestTile(tile);
    }

    const pan = Gesture.Pan()
        .onEnd((event) => {
            const {translationX, translationY} = event;
            if (!gameEnded) {
                if (Math.abs(translationX) > Math.abs(translationY)) {
                    if (translationX > 30) {
                        setBoard(updateBoardHorizontally(board, Direction.RIGHT, handleSetBiggestTile, biggestTile));
                        setGameEnded(isGameEnded(board))
                    } else if (translationX < -30) {
                        setBoard(updateBoardHorizontally(board, Direction.LEFT, handleSetBiggestTile, biggestTile));
                        setGameEnded(isGameEnded(board))
                    }
                } else {
                    if (translationY > 30) {
                        setBoard(updateBoardVertically(board, Direction.DOWN, handleSetBiggestTile, biggestTile));
                        setGameEnded(isGameEnded(board))

                    } else if (translationY < -30) {
                        setBoard(updateBoardVertically(board, Direction.UP, handleSetBiggestTile, biggestTile));
                        setGameEnded(isGameEnded(board))
                    }
                }
            }
        });

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <GestureDetector gesture={pan}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Button color="#b88f63" title={"reset"} onPress={resetBoard}></Button>
                        {gameEnded ?
                            <Text style={styles.gameEndedText}>Game Ended! Score: {biggestTile}</Text>
                            :
                            <Text style={styles.gameEndedText}>Score: {biggestTile}</Text>}
                    </View>
                    <GameGrid board={board} boardSize={boardSize}/>
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8f1e1',
        gap: 32,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        padding: 32,
    },
    title: {
        display: "flex",
        padding: 32,
        fontSize: 38,
        fontWeight: 'bold',
        color: '#172036',
    },
    gameEndedText: {
        fontSize: 38,
        fontWeight: 'bold',
    }
});