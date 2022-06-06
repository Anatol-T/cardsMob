import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {RootStackParamList, RootTabParamList, UseNavigationType} from "./src/navigation/navigationsTypes";
import {PacksList} from "./src/screens/PacksList";
import {Profile} from "./src/screens/Profile";
import {FontAwesome} from "@expo/vector-icons";
import {Login} from "./src/screens/Login";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const useAppNavigation = () => useNavigation<UseNavigationType>()

export default function App() {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
