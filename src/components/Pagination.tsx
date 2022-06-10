import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {useDispatch} from "react-redux";
import {setLoadingAC} from "../bll/appReducer";

type PropsType = {
  totalCount: number
  pageSize: number
  currentPage: number
  onChangedPage: (n: number) => void
}

export const Pagination = ({totalCount, pageSize, currentPage, onChangedPage}: PropsType) => {
  const dispatch = useDispatch();
  const pageCounts = totalCount ? Math.ceil(totalCount / pageSize) : 1;
  const pages = [];
  const step = pageCounts > 200 ? 50 : 10;
  const isStep = pageCounts > 4;

  let pageLimit = 4;
  let startPage = currentPage - pageLimit / 2;
  let endPage = currentPage + pageLimit / 2;

  if (startPage < 1) {
    startPage = 1;
    endPage = pageLimit + 1;
  }
  if (endPage > pageCounts) {
    endPage = pageCounts;
    startPage = pageCounts - pageLimit < 1 ? 1 : pageCounts - pageLimit;
  }
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const pageList = pages.map(n => {
    const onClickGetByPage = () => onChangedPage(n);
    //const onClickGetByPage = () => !isLoading && onChangedPage(n);

    return (
      <TouchableOpacity
        style={styles.pageButton}
        key={n}
            //className={currentPage === n ? `${newActiveClass} ${styles.currentPage}` : `${newActiveClass} ${styles.page}`}
            onPress={onClickGetByPage}>
        <Text style={currentPage === n ? styles.currentPage : styles.otherPages}>{n}</Text>
            </TouchableOpacity>
    );
  })


  //Functions Buttons
  const firstPageHandler = () => onChangedPage(1);
  const lastPageHandler = () => onChangedPage(pageCounts);
  const upPageHandler = () => {
    (currentPage + step) > pageCounts
      ? onChangedPage(pageCounts)
      : onChangedPage(currentPage + step)
  };
  const downPageHandler = () => {
    (currentPage - step) < 0
      ? onChangedPage(1)
      : onChangedPage(currentPage - step)
  };

  return (
    <View style={styles.wrapper}>
      <Text>{'< '}</Text>
      {currentPage > 3 ? <TouchableOpacity  onPress={firstPageHandler}><Text>1</Text></TouchableOpacity> : <></>}
      {currentPage > 3 ? <TouchableOpacity  onPress={downPageHandler}><Text>{' ... '}</Text></TouchableOpacity> : <></>}

      {pageList}

      {currentPage < pageCounts - 3 ?
        <TouchableOpacity  onPress={upPageHandler}><Text> ... </Text></TouchableOpacity> : <></>}
      {endPage === pageCounts ? <></> :
        <TouchableOpacity  onPress={lastPageHandler}><Text>{pageCounts}</Text></TouchableOpacity>}
      <Text>{' >'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row"
  },
  pageButton: {
    paddingHorizontal: 2
  },
  currentPage: {
    color: '#e589c2',
  },
  otherPages: {

  }
});