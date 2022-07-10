import React from 'react';
import {ModalFrame} from "../../components/ModalFrame";
import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {useDispatch} from "react-redux";
import {deletePackTC} from "../../bll/cardsPackReducer";

type PropsType = {
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
  packId: string
}

export const DeletePackModal = ({modalVisible, setModalVisible, packId}: PropsType) => {
  const dispatch = useDispatch<any>();

  const setHandler = () => {
    dispatch(deletePackTC(packId))
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
          <Text>Do you really want to remove Pack?</Text>
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