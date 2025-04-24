import React from 'react';
import {createStaticNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./src/screen/home-screen";
import GameScreen from "./src/screen/game-screen";

const RootStack = createStackNavigator({
    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                title: "2048",
                headerStyle: {backgroundColor: "#b88f63", height: 130,},
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold', color: "#faf7ef", fontSize: 40,
                    headerTitleJustify: 'center',
                },
            }
        },
        Game: {
            screen: GameScreen,
            options: {
                title: "Home",
                headerStyle: {backgroundColor: "#b88f63", height: 130,},
                headerTitleStyle: {fontWeight: 'bold', color: "#faf7ef", fontSize: 24,}, headerTintColor: '#faf7ef',
                headerTitleJustify: 'center',
            }
        },
    },
});

const RootNavigation = createStaticNavigation(RootStack);

export default function App() {
    return (
        <RootNavigation/>
    );
}