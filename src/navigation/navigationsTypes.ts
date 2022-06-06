import {NavigationProp, NavigatorScreenParams, useNavigation} from "@react-navigation/native";

export type RootTabParamList = {
  Profile: undefined
  Packs: undefined
  Login: undefined
};

export type RootStackParamList = {
  Stack1: undefined
  Stack2: undefined
  Stack3: {
    id: number
  }
}

export type UseNavigationType = NavigationProp<RootTabParamList>

export const useAppNavigation = () => useNavigation<UseNavigationType>()