import React, {useEffect, useState} from 'react';
import {Frame} from "../components/Frame";
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from "react-native";
import {LearnProps} from "../navigation/navigationsTypes";
import {CardType} from "../dal/cardsApi";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {CardsGradeTC, clearCardsAC, learnCardsTC} from "../bll/cardsReducer";
import {Radio} from "../components/Radio";

const grades = ["Did not know", "Forgot", "A lot of thought", "Confused", "Knew the answer"];

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return {sum: newSum, id: newSum < rand ? i : acc.id}
    }
    , {sum: 0, id: -1});

  return cards[res.id + 1];
}

const initialState: CardType = {
  _id: "", cardsPack_id: "", user_id: "",
  answer: "", question: "", grade: 0,
  shots: 0, comments: "", type: "",
  rating: 0, more_id: "", created: "",
  updated: "", __v: 0, answerImg: "",
  answerVideo: "", questionImg: "", questionVideo: "",
}

export const Learn = ({route}: LearnProps) => {
  const packId = route.params.packId
  const dispatch = useDispatch<any>()
  const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
  const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.cardPacks.filter((p: any) => p._id === packId)[0]?.name)
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [rating, setRating] = useState("")
  const [card, setCard] = useState<CardType>(initialState);

  useEffect(() => {
    packId && dispatch(learnCardsTC(packId))
    return () => {
      dispatch(clearCardsAC())
    }
  }, [])

  useEffect(() => {
    if (cards.length > 0) setCard(getCard(cards));
  }, [cards])

  const onNext = () => {
    if (rating) {
      setIsChecked(false);
      setRating("")
      dispatch(CardsGradeTC(card._id, grades.findIndex(el => el === rating) + 1))
    }
  }

  return (
    <Frame>
      {loading
      ? <ActivityIndicator size={"large"}/>
      : <View>
          <Text style={styles.title}>Learn "{packName}"</Text>
          <View>
            <View style={styles.textBlock}>
              <Text><Text style={styles.boldText}>Question: </Text>{card.question}</Text>
            </View>
            {isChecked && (
              <>
                <View >
                  <Text style={styles.textBlock}><Text style={styles.boldText}>Answer: </Text>{card.answer}</Text>
                  <Text style={styles.boldText}>Rate yourself: </Text>
                  <View style={styles.radioBlock}>
                    <Radio
                    options={grades}
                    value={rating}
                    onChangeOption={setRating}
                  />
                  </View>
                </View>
              </>
            )}
          </View>
          <View style={styles.buttonBlock}>
            {
              isChecked
                ? <Pressable onPress={onNext} disabled={!rating} style={styles.button}>
                  <Text>Next</Text>
                  </Pressable>
                :
                <Pressable onPress={() => setIsChecked(true)} style={styles.button}>
                  <Text>Show answer</Text>
                </Pressable>
            }
          </View>
        </View>}
    </Frame>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5
  },
  buttonBlock: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 110,
    height: 27,
    backgroundColor: '#9890C7',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  textBlock: {
    marginVertical: 5
  },
  boldText: {
    fontWeight: "bold"
  },
  radioBlock: {
    marginLeft: 8,
    marginVertical: 5,
  },
});
