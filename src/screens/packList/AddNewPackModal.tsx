import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addPackTC} from "../../bll/cardsPackReducer";
import {Modal, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {ModalFrame} from "../../components/ModalFrame";
import Checkbox from "expo-checkbox";

type PropsType = {
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
}

export const AddNewPackModal = ({modalVisible, setModalVisible}: PropsType) => {
  const dispatch = useDispatch<any>();

  const [newPackName, setNewPackName] = useState<string>('');
  const [privateValue, setPrivateValue] = useState<boolean>(false);

  const setHandler = () => {
    dispatch(addPackTC(newPackName, privateValue))
    setNewPackName('')
    setPrivateValue(false)
    cancelHandler()
  }
  const cancelHandler = () => {
    setModalVisible(!modalVisible)
    setNewPackName('')
    setPrivateValue(false)
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
          <Text>Pack name</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={'Enter pack name'}
              value={newPackName}
              onChangeText={setNewPackName}
            />

          </View>
          <View style={styles.checkBoxContainer}>
            <Checkbox
              style={{width: 25, height: 25}}
              value={privateValue}
              onValueChange={(value) => setPrivateValue(value)}
              color={'#9890C7'}
            />
            <Text>Private</Text>
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
  checkBoxContainer: {
    height: 40,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    width: 100
  },
});