import React, {useEffect, useState} from 'react';
import {Frame} from "../components/Frame";
import {ActivityIndicator, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {registerTC, setRegister} from "../bll/registerReducer";
import {setErrorAC} from "../bll/appReducer";
import {useAppNavigation} from "../navigation/navigationsTypes";

const {width} = Dimensions.get('screen')

export const Registration = () => {
  const navigation = useAppNavigation()

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
  const error = useSelector<AppRootStateType, string>(state => state.app.error)
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    return () => {
      dispatch(setRegister(false));
      dispatch(setErrorAC(''))
    }
  }, [])

  useEffect(()=>{
    if (isRegistered) navigation.goBack()
  }, [isRegistered])

  const onClickHandler = () => {
    if (password.length < 8) {
      dispatch(setErrorAC('Password too short'))
    } else if (password !== confirmPassword) {
      dispatch(setErrorAC('Password and confirmation password do not match'))
    } else {
      dispatch(registerTC(email, password))
    }
  }

  return (
    <Frame>
      <Text style={styles.titleMain}>Sign up</Text>
      {loading && <ActivityIndicator/>}
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
      <View style={styles.inputBox}>
        <Text>
          Confirm password:
        </Text>
        <TextInput style={styles.input}
                   value={confirmPassword}
                   onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onClickHandler}>
        <Text>Register</Text>
      </TouchableOpacity>
    </Frame>
  );
};

const styles = StyleSheet.create({
  titleMain: {
    fontSize: 22,
    fontWeight: "bold",
  },
  inputBox: {
    height: 40,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  input: {
    width: width * 0.45,
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

