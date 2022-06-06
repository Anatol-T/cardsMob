import React from 'react';
import {StatusBar} from "expo-status-bar";
import {FontAwesome} from "@expo/vector-icons";
import {PacksList} from "./PacksList";
import {Profile} from "./Profile";
import {Login} from "./Login";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList, RootTabParamList} from "../navigation/navigationsTypes";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

export const Main = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto"/>
      <Tab.Navigator initialRouteName={'Profile'} screenOptions={({route}) => {
        let iconName: string
        if (route.name === 'Profile') iconName = 'user'
        if (route.name === 'Packs') iconName = 'th-list'
        if (route.name === 'Login') iconName = 'key'

        return {
          headerShown: false,
          tabBarIcon: ({focused}) => <FontAwesome name={iconName as any} size={24} color={focused ? 'red' : 'black'}/>
        }
      }}>
        <Tab.Screen name="Packs" component={PacksList}/>
        <Tab.Screen name="Profile" component={Profile}/>
        <Tab.Screen name="Login" component={Login}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

