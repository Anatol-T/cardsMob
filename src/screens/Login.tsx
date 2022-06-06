import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Frame} from "../components/Frame";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {loginTC, logoutTC} from "../bll/loginReducer";
import {setErrorAC} from "../bll/appReducer";
import Checkbox from 'expo-checkbox';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const loginStatus = useSelector<AppRootStateType, boolean>(state => state.login.status);
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
  const error = useSelector<AppRootStateType, string>(state => state.app.error);
  const name = useSelector<AppRootStateType, string>(state => state.profilePage.name);

  const dispatch = useDispatch<any>();

  const loginHandler = () => {
    dispatch(loginTC(email, password, rememberMe));
  };
  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  useEffect(() => {
    dispatch(setErrorAC(''))
  }, [])
  if (loginStatus) {
    return (
      <Frame>
        <Text>Welcome {name}</Text>
        <TouchableOpacity style={styles.button} onPress={logoutHandler}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </Frame>
    )
  }
  return (
    <>
      {loading && <ActivityIndicator/>}
      <Frame>
        <Text>Sign In</Text>
        {error ? <Text>{error}</Text> : <></>}
        <View style={styles.inputBox}>
          <Text>
            Email:
          </Text>
          <TextInput style={styles.input}
                     value={email}
                     onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputBox}>
          <Text>
            Password:
          </Text>
          <TextInput style={styles.input}
                     value={password}
                     onChangeText={setPassword}
          />
        </View>
        <View style={{...styles.inputBox, width: 150} }>
          <Checkbox
            style={{width: 25, height: 25}}
            value={rememberMe}
            onValueChange={(value) => setRememberMe(value)}
            color={'#9890C7'}
          />
          <Text>Remember me</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={loginHandler}>
          <Text>Login</Text>
        </TouchableOpacity>
      </Frame>
    </>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  input: {
    width: 180,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 2,
    borderColor: '#9890C7',
    borderWidth: 2,
    padding: 5
  },
  button: {
    height: 30,
    width: 100,
    backgroundColor: '#9890C7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  }
});

