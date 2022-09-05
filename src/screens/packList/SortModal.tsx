import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {ModalFrame} from "../../components/ModalFrame";
import {useDispatch, useSelector} from "react-redux";
import {Radio} from "../../components/Radio";
import {AppRootStateType} from "../../bll/store";

const sortOptions = ["Updated ascending", "Updated descending", "Cards count ascending", "Cards count descending"];
const sortOptionsCode = ["0updated", "1updated", "0cardsCount", "1cardsCount"]



type PropsType = {
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
}

export const SortModal = ({modalVisible, setModalVisible}: PropsType) => {
  const dispatch = useDispatch<any>();

  const [sortBy, setSortBy]= useState<string>("")

  const sortPacks = useSelector<AppRootStateType, string>(state => state.cardsPack.sortPacks)

  const arrayIndex = sortOptionsCode.findIndex(value => value === sortPacks)

  const setHandler = () => {
    //dispatch(addPackTC(newPackName, privateValue))
    //setNewPackName('')
    cancelHandler()
  }
  const cancelHandler = () => {
    setModalVisible(!modalVisible)
    setSortBy("")
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
          <Text>Sorted by {sortOptions[arrayIndex]}</Text>
          <Radio options={sortOptions} value={sortBy} onChangeOption={setSortBy}/>

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={setHandler}
              style={styles.button}
            >
              <Text>Apply</Text>
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
  input: {
    borderWidth: 2,
    borderColor: '#9890C7',
    borderRadius: 5,
    marginVertical: 15,
    width: 200
  },
  checkBoxContainer: {
    height: 40,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    width: 100
  },
});
