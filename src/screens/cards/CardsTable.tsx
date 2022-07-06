import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {CardType} from "../../dal/cardsApi";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {DeleteCardModal} from "./DeleteCardModal";
import {UpdateCardModal} from "./UpdateCardModal";

export type PropsType = {
  packId: string
}

export const CardsTable = ({packId}:PropsType) => {
  const userId = useSelector<AppRootStateType, string>(state => state.profilePage._id);
  const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards);

  const [isShownDeleteModal, setIsShownDeleteModal] = useState<boolean>(false)
  const [isShownUpdateModal, setIsShownUpdateModal] = useState<boolean>(false)
  const [cardId, setCardId] = useState<string>('')

  const [updatedQuestion, setUpdatedQuestion] = useState<string>('');
  const [updatedAnswer, setUpdatedAnswer] = useState<string>('');

  const updateHandler = (id: string, question: string, answer: string) => {
    setUpdatedQuestion(question)
    setUpdatedAnswer(answer)
    setCardId(id)
    setIsShownUpdateModal(true)
  }

  const deleteHandler = (id: string) => {
    setCardId(id)
    setIsShownDeleteModal(true)
  }

  return (
    <>
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
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => updateHandler(item._id, item.question, item.answer)}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => deleteHandler(item._id)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
              : <></>
            }

          </View>
        )
      }}
    />
      <DeleteCardModal
        modalVisible={isShownDeleteModal}
        setModalVisible={setIsShownDeleteModal}
        cardId={cardId}
        packId={packId}
      />
      <UpdateCardModal
        modalVisible={isShownUpdateModal}
        setModalVisible={setIsShownUpdateModal}
        cardId={cardId}
        packId={packId}
        question={updatedQuestion}
        answer={updatedAnswer}/>
    </>
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

