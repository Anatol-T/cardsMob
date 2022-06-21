import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {PackType} from "../../dal/cardsPackApi";
import {useAppNavigation} from "../../navigation/navigationsTypes";

export const PackTable = () => {
  const navigation = useAppNavigation()
  const dispatch = useDispatch();
  const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.cardsPack.cardPacks)
  const sortPacks = useSelector<AppRootStateType, string>(state => state.cardsPack.sortPacks)
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

  const ToLearn = (packId: string) => {
    navigation.navigate('Learn', {packId})
  }
  const ToInfo = (packId: string) => {
    navigation.navigate('Cards', {packId})
  }
  return (
    <FlatList
      data={packs}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => {
        return (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Pack Name: </Text>
              <Text>{item.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Cards: </Text>
              <Text>{item.cardsCount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Updated: </Text>
              <Text>{item.created.slice(0, 10)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Created by: </Text>
              <Text>{item.user_name}</Text>
            </View>
            <View style={styles.buttonBlock}>
              <TouchableOpacity style={styles.button} onPress={()=>ToLearn(item._id)}>
                <Text>Learn</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>ToInfo(item._id)}>
                <Text>Info</Text>
              </TouchableOpacity>
            </View>
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
    paddingLeft: 5
  },
  row:{
    flexDirection: "row",
  },
  rowTitle:{
    width: 95
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
