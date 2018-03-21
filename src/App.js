import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import { Route, Link } from 'react-router-dom';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCx9MRw-wpfMpL_l6dKKaMrtcscMdqy3VA",
    authDomain: "bloc-chats-f3d50.firebaseapp.com",
    databaseURL: "https://bloc-chats-f3d50.firebaseio.com",
    projectId: "bloc-chats-f3d50",
    storageBucket: "bloc-chats-f3d50.appspot.com",
    messagingSenderId: "1007671940121"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null,
      messages: [],
      activeMessageList: []
    }
  }

  setRoom(room) {
    this.setState({ activeRoom: room });
    console.log( this.state.activeRoom );
    this.setState({ activeMessageList: this.state.messages.filter( message => message.roomId === this.state.activeRoom ) });
    console.log( this.state.activeMessageList );
  }

  setMessageList(messages) {
    this.setState({ messages: messages });
    console.log( this.state.messages );
    console.log( '^ set all messages' );
  }

  render() {
    return (
      <section className="App">
        <RoomList firebase={firebase} activeRoom = { this.state.activeRoom } messages = { this.state.messages }  setRoom = { (room) => this.setRoom(room) } />
        <MessageList firebase={firebase} activeRoom = { this.state.activeRoom } activeMessageList = { this.state.activeMessageList } setMessageList = { (messages) => this.setMessageList(messages)} />
      </section>
    );
  }
}

export default App;
