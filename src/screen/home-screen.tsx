import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
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
        label: "8x8",
        value: 8
    },
    SIXTEEN: {
        label: "16x16",
        value: 16
    },
}


export default function HomeScreen({route}: { route: Route2048<'Home'> }) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    2048
                </Text>
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
        <Button color="#b88f63" title={sizeOption.label} onPress={() =>

            navigation.navigate({
                name: 'Game',
                params: {
                    size: sizeOption.value
                }
            })
        }></Button>
    )
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