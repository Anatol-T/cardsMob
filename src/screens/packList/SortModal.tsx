import React, {useEffect, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {ModalFrame} from "../../components/ModalFrame";
import {useDispatch, useSelector} from "react-redux";
import {Radio} from "../../components/Radio";
import {AppRootStateType} from "../../bll/store";
import {sortPacksAC} from "../../bll/cardsPackReducer";

const sortOptions = ["Updated ascending", "Updated descending", "Cards count ascending", "Cards count descending"];
const sortOptionsCode = ["0updated", "1updated", "0cardsCount", "1cardsCount"]


type PropsType = {
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
}

export const SortModal = ({modalVisible, setModalVisible}: PropsType) => {
  const dispatch = useDispatch<any>();

  const sortPacks = useSelector<AppRootStateType, string>(state => state.cardsPack.sortPacks)

  let arrayIndex = sortOptionsCode.findIndex(value => value === sortPacks)

  const [sortBy, setSortBy] = useState<string>(sortOptions[arrayIndex])

  useEffect(() => {
    arrayIndex = sortOptionsCode.findIndex(value => value === sortPacks)
    setSortBy(sortOptions[arrayIndex])
  }, [sortPacks])

  const setHandler = () => {
    const arrIndex = sortOptions.findIndex(value => value === sortBy)
    setModalVisible(!modalVisible)
    dispatch(sortPacksAC(sortOptionsCode[arrIndex]))
  }
  const cancelHandler = () => {
    setModalVisible(!modalVisible)
    setSortBy(sortOptions[arrayIndex])
  }

  return (
    <Modal animationType="fade"
           statusBarTranslucent={true}
           transparent={true}
           visible={modalVisible}
           onRequestClose={() => {
             setModalVisible(!modalVisible)
           }}
    >
      <ModalFrame>
        <View style={styles.container}>
          <Text style={styles.title}>Sorted by {sortOptions[arrayIndex]}</Text>
          <Radio options={sortOptions} value={sortBy} onChangeOption={setSortBy}/>

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={setHandler}
              style={styles.button}
            >
              <Text>Set</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={cancelHandler}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </ModalFrame>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    width: 230,
  },
  button: {
    backgroundColor: '#9890C7',
    width: 100,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
});
