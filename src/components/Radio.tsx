import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";

type PropsType = {
  options: string[]
  value: string
  onChangeOption: (value: string) => void
}

export const Radio = ({options, value, onChangeOption}: PropsType) => {
  return (
    <View>
      {options.map((el) => (
        <Pressable key={el} style={styles.radioItem} onPress={() => onChangeOption(el)}>
          <View style={styles.radioCircleOuter}>
            {value === el
              ?<View style={styles.radioCircleInner}/>
              : <></>}
          </View>
          <Text> {el}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioItem: {
    flexDirection: "row",
    marginVertical: 2
  },
  radioCircleOuter: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#334a82',
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#334a82',
  }
});

