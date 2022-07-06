import React, {useEffect, useState} from 'react';
import {ModalFrame} from "../../components/ModalFrame";
import {Modal, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useDispatch} from "react-redux";
import {updateCardTC} from "../../bll/cardsReducer";

type PropsType = {
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
  cardId: string
  packId: string
  question: string
  answer: string
}

export const UpdateCardModal = ({modalVisible, setModalVisible, cardId, packId, question, answer}: PropsType) => {
  const dispatch = useDispatch<any>();

  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newAnswer, setNewAnswer] = useState<string>('');

  useEffect(()=>{
    setNewQuestion(question)
    setNewAnswer(answer)
  }, [question, answer])

  const setHandler = () => {
    dispatch(updateCardTC(packId, cardId, newQuestion, newAnswer))
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
          <Text>Edit Question</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={'Question...'}
              value={newQuestion}
              onChangeText={setNewQuestion}
              multiline={true}
            />

          </View>
          <Text>Edit Answer</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={'Answer...'}
              value={newAnswer}
              onChangeText={setNewAnswer}
              multiline={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={setHandler}
              style={styles.button}
            >
              <Text>Update</Text>
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
