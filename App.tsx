import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {Main} from "./src/screens/Main";
import {Provider} from "react-redux";
import {store} from "./src/bll/store";


export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
      <StatusBar style="auto"/>
      <Main/>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
