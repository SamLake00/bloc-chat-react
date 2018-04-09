import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

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
      activeUser: []
    }
  }

  setRoom(room) {
    this.setState({ activeRoom: room });
    console.log( this.state.activeRoom );
  }

  setUser(user) {
    this.setState({ activeUser: user });
    //console.log( this.state.activeUser );
  }

  render() {
    return (
      <div className="App">
      <aside className="rooms">
        <RoomList firebase={firebase} activeRoom = { this.state.activeRoom } setRoom = {this.setRoom.bind(this) } />
      </aside>
      <section className="everything else">
        <MessageList firebase={firebase} activeRoom = { this.state.activeRoom } activeUser = { this.state.activeUser } />
        <User firebase={firebase} setUser = { (user) => this.setUser(user) }/>
      </section>
      </div>
    );
  }
}

export default App;
