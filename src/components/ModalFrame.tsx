import {StyleSheet, View} from "react-native";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';

type PropsType = {
  children: React.ReactNode
}
export const ModalFrame = (props: PropsType) => {
  return (
    <LinearGradient  colors={['rgba(217,217,217,0.9)' , 'rgba(101,101,101,0.9)']} style={styles.wrapper}>
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
    //paddingVertical: 20,

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