import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {Frame} from "../components/Frame";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";


export const Profile = () => {
  const dispatch = useDispatch<any>();
  const profileName = useSelector<AppRootStateType, string>(state => state.profilePage.name);
  const profileAvatar = useSelector<AppRootStateType, string>(state => state.profilePage.avatar);
  const profileEmail = useSelector<AppRootStateType, string>(state => state.profilePage.email);
  const packsNumber = useSelector<AppRootStateType, number>(state => state.profilePage.publicCardPacksCount);
  const error = useSelector<AppRootStateType, string | undefined>(state => state.profilePage.error);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);

  console.log(' q',profileAvatar)
  const noAvatar = require('./noAvatar.png')
  return (
    <Frame>
      <Text>Your profile</Text>
      <Image source={profileAvatar ? {uri: profileAvatar} :noAvatar} style={styles.avatar}/>
      <Text>{profileName}</Text>
      <Text>Email: {profileEmail}</Text>
      <Text>Your packs: {packsNumber} </Text>
    </Frame>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150
  }
});

