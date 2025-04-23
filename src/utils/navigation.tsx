import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../screen/routes";
import {useNavigation} from "@react-navigation/native";

export function use2048Navigation<T extends keyof RootStackParamList>() {
    type NavigationProp = StackNavigationProp<RootStackParamList, T>;
    return useNavigation<NavigationProp>()
}