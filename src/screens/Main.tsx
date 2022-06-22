import React, {useEffect} from 'react';
import {StatusBar} from "expo-status-bar";
import {FontAwesome} from "@expo/vector-icons";
import {PacksList} from "./packList/PacksList";
import {Profile} from "./Profile";
import {Login} from "./Login";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList, RootTabParamList} from "../navigation/navigationsTypes";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {initializeAppTC} from "../bll/appReducer";
import {ActivityIndicator} from "react-native";
import {Learn} from "./Learn";
import {Cards} from "./cards/Cards";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'PacksMain'} component={PacksList} options={{headerShown: false}}/>
      <Stack.Screen name={"Cards"} component={Cards}/>
      <Stack.Screen name={"Learn"} component={Learn}/>
    </Stack.Navigator>
  )
}


export const Main = () => {
  const dispatch = useDispatch<any>();
  const loginStatus = useSelector<AppRootStateType, boolean>(state => state.login.status);

  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [dispatch])

  useEffect(()=>{
    console.log(isInitialized)
  })

  const display = loginStatus ? "flex" : "none"

  if (!isInitialized) {
    return <ActivityIndicator/>
  }
  return (
    <NavigationContainer>
      <StatusBar style="auto"/>
      <Tab.Navigator initialRouteName={'Login'}  screenOptions={({route}) => {
        let iconName: string
        if (route.name === 'Profile') iconName = 'user'
        if (route.name === 'Packs') iconName = 'th-list'
        if (route.name === 'Login') iconName = 'key'

        return {
          headerShown: false,
          tabBarIcon: ({focused}) => <FontAwesome name={iconName as any} size={24} color={focused ? 'red' : 'black'}/>
        }
      }}>
        <Tab.Screen name="Packs"  component={RootStackNavigation}/>
        <Tab.Screen name="Profile" component={Profile}/>
        <Tab.Screen name="Login" component={Login} options={{tabBarStyle: {display: display}}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

