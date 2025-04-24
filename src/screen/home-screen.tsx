import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Route2048} from "./routes";
import {use2048Navigation} from "../utils/navigation";

export type SizeOption = {
    label: string,
    value: number
}

export const SizeOptions: Record<string, SizeOption> = {
    FOUR: {
        label: "4x4",
        value: 4
    },
    EIGHT: {
        label: "6x6",
        value: 6
    },
    SIXTEEN: {
        label: "8x8",
        value: 8
    },
}


export default function HomeScreen({route}: { route: Route2048<'Home'> }) {
    return (
        <View style={styles.container}>
            <View style={styles.gameStartContainer}>
                {Object.values(SizeOptions).map(sizeOption =>
                    <StartGameButton key={sizeOption.label} sizeOption={sizeOption}/>
                )}
            </View>
        </View>
    );
}

function StartGameButton({sizeOption}: { sizeOption: SizeOption }) {
    const navigation = use2048Navigation<'Game'>();
    return (
        <TouchableOpacity style={styles.gameStartButtons} onPress={() =>
            navigation.navigate({
                name: 'Game',
                params: {
                    size: sizeOption.value
                }
            })
        }>
            <Text style={styles.gameStartButtonsText}>{sizeOption.label}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#f8f1e1',
        gap: 32,
    },
    gameStartContainer: {
        display: "flex",
        width: 200,
        gap: 30,
        flexDirection: "column",
    },
    gameStartButtons: {
        display: "flex",
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#b88f63",
        borderColor: "#f8f1e1",
        borderRadius: 8,
        borderWidth: 3,
    },
    gameStartButtonsText: {
        color: "#f8f1e1",
        fontWeight: "bold",
        fontSize: 28,
    }
});