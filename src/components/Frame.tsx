import {StyleSheet, View} from "react-native";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';

type PropsType = {
  children: React.ReactNode
}
export const Frame = (props: PropsType) => {
  return (
    <LinearGradient  colors={['#E6D4DE' , '#9890C7']} style={styles.wrapper}>
      <View style={styles.frame}>
        {props.children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  frame: {
    backgroundColor: '#F9F9FE',
    width: '90%',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});