import {Route} from "@react-navigation/routers/lib/typescript/src/types";


export type RootStackParamList = {
    Home: {};
    Game: { size: number };
};

export type Route2048<T extends keyof RootStackParamList> = Route<T, RootStackParamList[T]>