import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Frame} from "../../components/Frame";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {addPackTC, changeCurrentPageAC, fetchPacksListsTC} from "../../bll/cardsPackReducer";
import {setErrorAC} from "../../bll/appReducer";
import {PackTable} from "./PackTable";
import {Pagination} from "../../components/Pagination";
import {FilterModal} from "./FilterModal";
import {AddNewCardModal} from "../cards/AddNewCardModal";
import {AddNewPackModal} from "./AddNewPackModal";


const {height} = Dimensions.get('screen')

export const PacksList = () => {

  const dispatch = useDispatch<any>();
  const error = useSelector<AppRootStateType, string>(state => state.app.error);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
  const max = useSelector<AppRootStateType, number>(state => state.cardsPack.max)
  const min = useSelector<AppRootStateType, number>(state => state.cardsPack.min)
  const page = useSelector<AppRootStateType, number>(state => state.cardsPack.page)
  const pageCount = useSelector<AppRootStateType, number>(state => state.cardsPack.pageCount)
  const myPacks = useSelector<AppRootStateType, boolean>(state => state.cardsPack.myPacks)
  const sortPacks = useSelector<AppRootStateType, string>(state => state.cardsPack.sortPacks)
  const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.cardsPack.cardPacksTotalCount)
  const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.packName)

  const [isModalAdd, setIsModalAdd] = useState<boolean>(false)

  const [filterModalVisible, setFilterModalVisible]= useState(false)

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchPacksListsTC())
    }
  }, [page, pageCount, myPacks, sortPacks, packName, max, min])

  useEffect(() => {
    return () => {
      if (error.length > 0) dispatch(setErrorAC(''))
    }
  })

  const onChangedPage = (newPage: number) => {
    if (isLoading) return
    if (newPage !== page) dispatch(changeCurrentPageAC(newPage))
  }

  if (!isLoggedIn) {
    return <></>
  }
  return (
    <Frame>
      <View style={styles.page}>
        <Text style={styles.title}>Packs lists</Text>
        <View style={styles.filterBlock}>
          <TouchableOpacity style={styles.filterSection} onPress={()=> setFilterModalVisible(true)}>
            <Text>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterSection} onPress={()=>setIsModalAdd(true)}>
            <Text>Add pack</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainBlock}>
          {isLoading ?
            <ActivityIndicator size="large" color="#9890C7" style={styles.spinner}/>
            : <PackTable/>}
        </View>
        <View style={styles.paginationBlock}>
          <Pagination totalCount={cardPacksTotalCount}
                      pageSize={pageCount}
                      currentPage={page}
                      onChangedPage={onChangedPage}/>
        </View>
      </View>
      <FilterModal modalVisible={filterModalVisible} setModalVisible={setFilterModalVisible}/>
      <AddNewPackModal modalVisible={isModalAdd} setModalVisible={setIsModalAdd}/>
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