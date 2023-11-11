import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import Todo from "./Todo";
import {AppLoading} from "expo";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlarmClock from "react-native-alarm-clock";
// import ReactNativeAN from 'react-native-alarm-notification';
import moment from 'moment';
import { createAlarm } from 'react-native-simple-alarm';

const seed = () => {
  const one = Math.floor((Math.random() * 100) / 3.92);
  const two = Math.floor((Math.random() * 100) / 3.92);
  const three = Math.floor((Math.random() * 100) / 3.92);
  const four = Math.floor((Math.random() * 100) / 3.92);
  const five = Math.floor((Math.random() * 100) / 3.92);
  const six = Math.floor((Math.random() * 100) / 3.92);
  const seven = Math.floor((Math.random() * 100) / 3.92);
  const eight = Math.floor((Math.random() * 100) / 3.92);
  const nine = Math.floor((Math.random() * 100) / 3.92);
  const ten = Math.floor((Math.random() * 100) / 3.92);
  const eleven = Math.floor((Math.random() * 100) / 3.92);
  const twelve = Math.floor((Math.random() * 100) / 3.92);
  const thirteen = Math.floor((Math.random() * 100) / 3.92);
  const fourteen = Math.floor((Math.random() * 100) / 3.92);
  const fifteen = Math.floor((Math.random() * 100) / 3.92);
  const sixteen = Math.floor((Math.random() * 100) / 3.92);
  return [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen
  ];
}

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    toDos:{},
    newToDo:"",
    loadedToDos:false
  }
  
  componentDidMount = () => {
    this._loadToDos();
    // this._alarm();
  }

  render() {
    const {newToDo,loadedToDos,toDos} = this.state;
    if(!loadedToDos){
      return <AppLoading/>
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Made by Sieun.Kim</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controllNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
            underlineColorAndroid={"transparent"}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(toDo => {
              return <Todo key={toDo.id} {...toDo} deleteToDo={this._deleteToDo}></Todo>
            })}
          </ScrollView>
        </View>
      </View>
    );
  }

  _controllNewToDo = text => {
    this.setState({
      newToDo:text
    })
  }

  _loadToDos = async () => {
    this.setState({
      loadedToDos:true
    })

    const initArr = [
      'PC, ERP, DRM 등 로그인에 필요한 비밀번호를 부착했나요?',
      '퇴근 시 중요정보(매출 및 개인정보)를 책상위에 방치했나요?',
      '퇴근 시 개인 서랍장을 시건했나요?',
      '퇴근 시 PC 종료를 했나요?'
    ]
    const ID1 = uuidv4({ random: seed() });
    const ID2 = uuidv4({ random: seed() });
    const ID3 = uuidv4({ random: seed() });
    const ID4 = uuidv4({ random: seed() });
    const initToDoObj = {
      [ID1]:{
        id:ID1,
        isCompleted:false,
        text: initArr[0],
        createdAt:Date.now()
      },
      [ID2]:{
        id:ID2,
        isCompleted:false,
        text: initArr[1],
        createdAt:Date.now()
      },
      [ID3]:{
        id:ID3,
        isCompleted:false,
        text: initArr[2],
        createdAt:Date.now()
      },
      [ID4]:{
        id:ID4,
        isCompleted:false,
        text: initArr[3],
        createdAt:Date.now()
      },
    }

    try {
      let list = {};
      list = await AsyncStorage.getItem('todoList');
      // web에서는 Object.keys가 있는 구문을
      // android에서는 if와 else문만, Object.keys는 읽을 수 없음
      // if (list !== null && Object.keys(list).length > 2) {
      if (list != null) {
        this.setState({
          toDos:JSON.parse(list)
        })
      }
      // else if(initToDoObj !== null && Object.keys(list).length < 3) {
      else {
        this.setState({
          toDos: {...initToDoObj},
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  _addToDo = () => {
    const {newToDo} = this.state;
    if(newToDo != ""){
      this.setState({
        newToDo:""
      })
      this.setState(prevState => {
        const ID = uuidv4({ random: seed() });
        const newToDoObj = {
          [ID]:{
            id:ID,
            isCompleted:false,
            text:newToDo,
            createdAt:Date.now()
          }
        }
        console.log(newToDoObj)
        const newState = {
          ...prevState,
          newToDo:"",
          toDos:{
            ...prevState.toDos,
            ...newToDoObj
          }
        }
        
        AsyncStorage.setItem('todoList', JSON.stringify(newState.toDos));

        return {...newState}
      })
    }
  }

  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        toDos
      }

      AsyncStorage.setItem('todoList', JSON.stringify(newState.toDos));

      return {...newState}
    })
  }

  _alarm = async () => {
    try {
      await createAlarm({
          active: false,
          date: moment().format(),
          message: 'message',
          snooze: 1,
        });
    } catch (e) {}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});