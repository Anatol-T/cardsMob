import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, View, Text, TextInput} from "react-native";
import {ModalFrame} from "../../components/ModalFrame";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {setFilterAC} from "../../bll/cardsPackReducer";
import MultiSlider from '@ptomasroos/react-native-multi-slider';

type PropsType = {
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
}

export const FilterModal = ({modalVisible, setModalVisible}: PropsType) => {
  const dispatch = useDispatch<any>();
  const myPacks = useSelector<AppRootStateType, boolean>(state => state.cardsPack.myPacks);
  const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.packName)
  const maxCardsCount = useSelector<AppRootStateType, number>(state => state.cardsPack.maxCardsCount)
  const maxStore = useSelector<AppRootStateType, number>(state => state.cardsPack.max)
  const minStore = useSelector<AppRootStateType, number>(state => state.cardsPack.min)
  const [my, setMy] = useState(myPacks)
  const [search, setSearch] = useState(packName)
  const [max, setMax] = useState(maxStore)
  const [min, setMin] = useState(minStore)


  const setHandler = () => {
    setModalVisible(!modalVisible)
    dispatch(setFilterAC(my, search, min, max))
  }
  const cancelHandler = () => {
    setModalVisible(!modalVisible)
    setMy(myPacks)
    setSearch(packName)
    setMax(maxCardsCount)
    setMin(minStore)
  }
  
  const sliderHandler = (val: number[]) => {
    if (val[0] !== min) setMin(val[0])
    if (val[1] !== max) setMax(val[1])
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
          <View style={styles.checkBoxContainer}>
            <Pressable
              style={[styles.checkBox, my ? {backgroundColor: '#9890C7'} : {backgroundColor: '#E6D4DE'}]}
              onPress={() => {
                setMy(false)
              }}
            >
              <Text>All</Text>
            </Pressable>
            <Pressable
              style={[styles.checkBox, !my ? {backgroundColor: '#9890C7'} : {backgroundColor: '#E6D4DE'}]}
              onPress={() => {
                setMy(true)
              }}
            >
              <Text>My</Text>
            </Pressable>
          </View>
          <View style={styles.search}>
            <TextInput
              placeholder={'Search...'}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <View>
            <Text>{min}</Text>
            <MultiSlider
              values={[min, max]}
              max={maxCardsCount}
              onValuesChange={sliderHandler}
              sliderLength={200}
              allowOverlap={true}
            />
            <Text>{max}</Text>
          </View>
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
  checkBoxContainer: {
    flexDirection: "row",
  },
  checkBox: {
    width: 70,
    height: 35,
    backgroundColor: '#9890C7',
    alignItems: "center",
    justifyContent: "center"
  },
  search: {
    borderWidth: 2,
    borderColor: '#9890C7',
    borderRadius: 5,
    marginVertical: 15,
    width: 200
  },
});

