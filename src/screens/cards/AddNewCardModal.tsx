import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {ModalFrame} from "../../components/ModalFrame";
import {useDispatch} from "react-redux";
import {addCardTC} from "../../bll/cardsReducer";

type PropsType = {
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
  packId: string
}

export const AddNewCardModal = ({modalVisible, setModalVisible, packId}: PropsType) => {
  const dispatch = useDispatch<any>();

  const [newCardQuestion, setNewCardQuestion] = useState<string>('');
  const [newCardAnswer, setNewCardAnswer] = useState<string>('');

  const setHandler = () => {
    dispatch(addCardTC(packId, newCardQuestion, newCardAnswer))
    cancelHandler()
  }
  const cancelHandler = () => {
    setModalVisible(!modalVisible)
    setNewCardQuestion('')
    setNewCardAnswer('')
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
          <Text>Question</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={'Question...'}
              value={newCardQuestion}
              onChangeText={setNewCardQuestion}
              multiline={true}
            />

          </View>
          <Text>Answer</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={'Answer...'}
              value={newCardAnswer}
              onChangeText={setNewCardAnswer}
              multiline={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={setHandler}
              style={styles.button}
            >
              <Text>Add</Text>
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
});

