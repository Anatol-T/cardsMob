import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Frame} from "../../components/Frame";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {addPackTC, changeCurrentPageAC, fetchPacksListsTC, setPageCountAC} from "../../bll/cardsPackReducer";
import {setErrorAC} from "../../bll/appReducer";
import {PackTable} from "./PackTable";

export const PacksList = () => {
  const dispatch = useDispatch<any>();
  const error = useSelector<AppRootStateType, string>(state => state.app.error);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
  const debouncingFlag = useSelector<AppRootStateType, object>(state => state.cardsPack.debouncingFlag)
  //const max = useSelector<AppRootStateType, number>(state => state.cardsPack.max)
  const page = useSelector<AppRootStateType, number>(state => state.cardsPack.page)
  const pageCount = useSelector<AppRootStateType, number>(state => state.cardsPack.pageCount)
  const myPacks = useSelector<AppRootStateType, boolean>(state => state.cardsPack.myPacks)
  const sortPacks = useSelector<AppRootStateType, string>(state => state.cardsPack.sortPacks)
  const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.cardsPack.cardPacksTotalCount)
  const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.packName)

  const [newPackName, setNewPackName] = useState<string>('');
  const [privateValue, setPrivateValue] = useState<boolean>(false);
  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchPacksListsTC())
    }
  }, [page, pageCount, myPacks, sortPacks, packName, debouncingFlag])

  useEffect(() => {
    return () => {
      if (error.length > 0) dispatch(setErrorAC(''))
    }
  })


  const pageSizeHandler = (value: number) => {
    if (!isLoading) dispatch(setPageCountAC(value))
  }
  const onChangedPage = (newPage: number) => {
    if (isLoading) return
    if (newPage !== page) dispatch(changeCurrentPageAC(newPage))
  }
  const addPack = () => {
    dispatch(addPackTC(newPackName, privateValue))
    setNewPackName('')
    setPrivateValue(false)
    //closeModal()
  }

  if (!isLoggedIn) {
    //return <Navigate to={PATH.LOGIN}/>
  }
  return (
    <Frame>
      <View style={styles.page}>
        <Text style={styles.title}>Packs lists</Text>
        <View style={styles.filterBlock}>
          <TouchableOpacity style={styles.filterSection}>
            <Text>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterSection}>
            <Text>Add pack</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainBlock}>
          <PackTable/>
        </View>
        <View style={styles.paginationBlock}><Text>Pagination</Text></View>
      </View>
    </Frame>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '95%',
    justifyContent: "space-between"
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#e589c2',
    fontWeight: "900",
    letterSpacing: 2
  },
  filterBlock: {
    flex: 1,
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
    flex: 17,
  },
  paginationBlock: {
    flex: 1,
    backgroundColor: 'red'
  },
});