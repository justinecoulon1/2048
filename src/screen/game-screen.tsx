import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector, GestureHandlerRootView,} from 'react-native-gesture-handler';
import GameGrid from "../components/game-grid";
import {initializeBoard, updateBoardHorizontally, updateBoardVertically} from "../logic/board";
import {Direction} from "../logic/types";
import {Route2048} from "./routes";

export default function GameScreen({route}: { route: Route2048<'Game'> }) {
    const boardSize = route.params.size ?? 4;
    const [board, setBoard] = useState(initializeBoard(boardSize));

    const resetBoard = () => {
        setBoard(initializeBoard(boardSize));
    };

    const pan = Gesture.Pan()
        .onEnd((event) => {
            const {translationX, translationY} = event;

            if (Math.abs(translationX) > Math.abs(translationY)) {
                if (translationX > 30) {
                    setBoard(updateBoardHorizontally(board, Direction.RIGHT));
                } else if (translationX < -30) {
                    setBoard(updateBoardHorizontally(board, Direction.LEFT));
                }
            } else {
                if (translationY > 30) {
                    setBoard(updateBoardVertically(board, Direction.DOWN));
                } else if (translationY < -30) {
                    setBoard(updateBoardVertically(board, Direction.UP));
                }
            }
        });


    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <GestureDetector gesture={pan}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            2048
                        </Text>
                        <Button color="#b88f63" title={"reset"} onPress={resetBoard}></Button>
                    </View>
                    <GameGrid board={board}/>
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
        flexDirection: "row",
        alignItems: 'center',
        padding: 32,
    },
    title: {
        padding: 32,
        fontSize: 38,
        fontWeight: 'bold',
        color: '#172036',
    },
});