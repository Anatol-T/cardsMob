import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {CardType} from "../../dal/cardsApi";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";

export type PropsType = {
  cards: Array<CardType>
}

export const CardsTable = ({cards}: PropsType) => {
  const userId = useSelector<AppRootStateType, string>(state => state.profilePage._id);

  return (
    <FlatList
      data={cards}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => {
        return (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Question: </Text>
              <Text style={styles.rowBody}>{item.question}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Answer: </Text>
              <Text style={styles.rowBody}>{item.answer}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Updated: </Text>
              <Text style={styles.rowBody}>{item.created.slice(0, 10)}</Text>
            </View>
            {item.user_id === userId
              ? <View style={styles.buttonBlock}>
                <TouchableOpacity style={styles.button}>
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
              : <></>
            }

          </View>
        )
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: '#E6D4DE',
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 2,
    paddingVertical: 2,
    paddingLeft: 5,
  },
  row: {
    flexDirection: "row",
  },
  rowTitle: {
    width: '30%',
    fontWeight: "bold",
    fontSize: 12
  },
  rowBody: {
    width: '70%'
  },
  buttonBlock: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: '25%',
    backgroundColor: '#9890C7',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  }
});

