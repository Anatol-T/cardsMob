import React, {useEffect, useState} from 'react';
import {Frame} from "../../components/Frame";
import {ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, View} from "react-native";
import {CardsProps} from "../../navigation/navigationsTypes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {CardType} from "../../dal/cardsApi";
import {addCardTC, changeCurrentPageCardsAC, fetchCardsTC, setPageCountCardsAC} from "../../bll/cardsReducer";
import {Pagination} from "../../components/Pagination";
import {PackTable} from "../packList/PackTable";
import {CardsTable} from "./CardsTable";

const {height} = Dimensions.get('screen')

export const Cards = ({route}: CardsProps) => {
  const myId = useSelector<AppRootStateType, string>(state => state.profilePage._id);
  const userId = useSelector<AppRootStateType, string>(state => state.cards.packUserId);
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
  const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.packName);
  const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);
  const pageCount = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
  const page = useSelector<AppRootStateType, number>(state => state.cards.page)
  const cardQuestion = useSelector<AppRootStateType, string>(state => state.cards.cardQuestion)
  const cardAnswer = useSelector<AppRootStateType, string>(state => state.cards.cardAnswer)
  const sortCards = useSelector<AppRootStateType, string>(state => state.cards.sortCards)
  const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
  const packId = route.params.packId
  const dispatch = useDispatch<any>()

  const currId = packId ? packId : ''

  const [newCardQuestion, setNewCardQuestion] = useState<string>('');
  const [newCardAnswer, setNewCardAnswer] = useState<string>('');
  const [isModalAdd, setIsModalAdd] = useState<boolean>(false)
  const showModal = () => setIsModalAdd(true);
  const closeModal = () => setIsModalAdd(false);

  useEffect(() => {
    if (packId) {
      dispatch(fetchCardsTC(packId))
    }
  }, [page, cardQuestion, cardAnswer, sortCards])

  if (!isLoggedIn) {
    //return <Navigate to={PATH.LOGIN}/>
  }

  const onChangedPage = (newPage: number) => {
    if (newPage !== page) dispatch(changeCurrentPageCardsAC(newPage))
  }

  const addCard = () => {
    dispatch(addCardTC(currId, newCardQuestion, newCardAnswer))
    setNewCardQuestion('')
    setNewCardAnswer('')
    closeModal()
  }

  return (
    <Frame>
      <View style={styles.page}>
        <Text style={styles.title}>{packName}</Text>

        <View style={styles.filterBlock}>
          {
            myId === userId
              ? <Pressable onPress={showModal}><Text>Add new card</Text></Pressable>
              : <></>
          }
        </View>
        <View style={styles.mainBlock}>
          {isLoading ?
            <ActivityIndicator size="large" color="#9890C7" style={styles.spinner}/>
            : <CardsTable/>}
        </View>
        {/*<CardsTable cards={cards}/>*/}
        <View style={styles.paginationBlock}>
          <Pagination totalCount={cardsTotalCount}
                      pageSize={pageCount}
                      currentPage={page}
                      onChangedPage={onChangedPage}/>
        </View>
      </View>
    </Frame>
  );
};

const styles = StyleSheet.create({
  page: {
    height: height * 0.75,
    justifyContent: "space-around",
    width: '100%'
  },
  title: {
    flex: 2,
    textAlign: 'center',
    fontSize: 18,
    color: '#e589c2',
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 5,
  },
  filterBlock: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterSection:{
    width: '45%',
    backgroundColor: '#9890C7',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  mainBlock: {
    flex: 32,
  },
  paginationBlock: {
    flex: 2,
    marginTop: 5,
  },
  spinner: {
    marginTop: 25
  }
});