import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Modal, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {ModalFrame} from "../../components/ModalFrame";
import {deleteCardTC} from "../../bll/cardsReducer";
import {AppRootStateType} from "../../bll/store";

type PropsType = {
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
  cardId: string
  packId: string
}

export const DeleteCardModal = ({modalVisible, setModalVisible, cardId, packId}: PropsType) => {
  const dispatch = useDispatch<any>();

  const setHandler = () => {
    dispatch(deleteCardTC(packId, cardId))
    cancelHandler()
  }
  const cancelHandler = () => {
    setModalVisible(!modalVisible)
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
          <Text>Do you really want to remove Card?</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={setHandler}
              style={styles.button}
            >
              <Text>Yes</Text>
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
});

