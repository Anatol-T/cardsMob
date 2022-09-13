import {NavigationProp, NavigatorScreenParams, useNavigation} from "@react-navigation/native";
import {NativeStackScreenProps} from "react-native-screens/native-stack";

export type RootTabParamList = {
  Profile: undefined
  Packs: NavigatorScreenParams<RootStackParamListMain>
  Login: NavigatorScreenParams<RootStackParamListLogin>
};

export type RootStackParamListMain = {
  PacksMain: undefined
  Learn: {packId: string}
  Cards: {packId: string}
}

export type RootStackParamListLogin = {
  LoginMain: undefined
  Registration: undefined
}

export type LearnProps = NativeStackScreenProps<RootStackParamListMain, 'Learn'>
export type CardsProps = NativeStackScreenProps<RootStackParamListMain, 'Cards'>

export type UseNavigationType = NavigationProp<RootTabParamList >

export const useAppNavigation = () => useNavigation<UseNavigationType>()