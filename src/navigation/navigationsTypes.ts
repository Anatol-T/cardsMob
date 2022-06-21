import {NavigationProp, NavigatorScreenParams, useNavigation} from "@react-navigation/native";

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

export type UseNavigationType = NavigationProp<RootTabParamList & RootStackParamList>

export const useAppNavigation = () => useNavigation<UseNavigationType>()