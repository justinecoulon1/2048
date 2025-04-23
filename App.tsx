import React from 'react';
import {createStaticNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./src/screen/home-screen";
import GameScreen from "./src/screen/game-screen";

const RootStack = createStackNavigator({
    screens: {
        Home: HomeScreen,
        Game: GameScreen
    },
});

const RootNavigation = createStaticNavigation(RootStack);

export default function App() {
    return (
        <RootNavigation/>
    );
}