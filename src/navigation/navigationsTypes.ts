import {NavigationProp, NavigatorScreenParams, useNavigation} from "@react-navigation/native";
import {NativeStackScreenProps} from "react-native-screens/native-stack";

export type RootTabParamList = {
  Profile: undefined
  Packs: NavigatorScreenParams<RootStackParamList>
  Login: undefined
};

export type RootStackParamList = {
  PacksMain: undefined
  Learn: {packId: string}
  Cards: {packId: string}
}

export type LearnProps = NativeStackScreenProps<RootStackParamList, 'Learn'>
export type CardsProps = NativeStackScreenProps<RootStackParamList, 'Cards'>

export type UseNavigationType = NavigationProp<RootTabParamList & RootStackParamList>

export const useAppNavigation = () => useNavigation<UseNavigationType>()