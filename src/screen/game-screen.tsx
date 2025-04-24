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

    const resetBoard = () => {
        setBoard(initializeBoard(boardSize));
        setGameEnded(false);
    };

    const pan = Gesture.Pan()
        .onEnd((event) => {
            const {translationX, translationY} = event;
            if (!gameEnded) {
                if (Math.abs(translationX) > Math.abs(translationY)) {
                    if (translationX > 30) {
                        console.log("right swipe")
                        console.log("initial board")
                        console.log(board)
                        setBoard(updateBoardHorizontally(board, Direction.RIGHT));
                        console.log("updated board")
                        console.log(board)
                        setGameEnded(isGameEnded(board))
                    } else if (translationX < -30) {
                        console.log("left swipe")
                        console.log("initial board")
                        console.log(board)
                        setBoard(updateBoardHorizontally(board, Direction.LEFT));
                        console.log("updated board")
                        console.log(board)
                        setGameEnded(isGameEnded(board))
                    }
                } else {
                    if (translationY > 30) {
                        console.log("down swipe")
                        console.log("initial board")
                        console.log(board)
                        setBoard(updateBoardVertically(board, Direction.DOWN));
                        console.log("updated board")
                        console.log(board)
                        setGameEnded(isGameEnded(board))

                    } else if (translationY < -30) {
                        console.log("bottom swipe")
                        console.log("initial board")
                        console.log(board)
                        setBoard(updateBoardVertically(board, Direction.UP));
                        console.log("updated board")
                        console.log(board)
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
                        {gameEnded && <Text style={styles.gameEndedText}>Game Ended!</Text>}
                        {!gameEnded && <Text style={styles.gameEndedText}></Text>}
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