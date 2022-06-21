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
    console.log(cards)
  }, [cards])

  const onNext = () => {
    if (rating) {
      setIsChecked(false);
      setRating("")

      dispatch(CardsGradeTC(card._id, grades.findIndex(el => el === rating) + 1))
    }
  }

  const cancelHandler = () => {
    // navigate(PATH.PACKS, {replace: true})
  }
  return (
    <Frame>
      {loading
      ? <ActivityIndicator size={"large"}/>
      : <View>
          <Text>Learn "{packName}"</Text>
          <View>
            <View >
              <Text>Question: {card.question}</Text>
            </View>

            {isChecked && (
              <>
                <View >
                  <Text>Answer: {card.answer}</Text>
                  <Text>Rate yourself: </Text>
                  <Radio
                    options={grades}
                    value={rating}
                    onChangeOption={setRating}
                  />
                </View>


              </>
            )}
          </View>
          <View >
            <Pressable onPress={cancelHandler}>
              <Text>Cancel</Text>
            </Pressable>
            {
              isChecked
                ? <Pressable onPress={onNext} disabled={!rating}>
                  <Text>Next</Text>
                  </Pressable>
                :
                <Pressable onPress={() => setIsChecked(true)}>
                  <Text>Show answer</Text>
                </Pressable>
            }
          </View>
        </View>}
    </Frame>
  );
};

const styles = StyleSheet.create({

});
