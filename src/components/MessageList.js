import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
      activeMessageList: this.props.activeMessageList
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
    this.props
  }

  componentWillReceiveProps(activeRoom) {
    if (!activeRoom) {return}
    this.setState({ activeMessageList: this.state.messages.filter( message => message.roomId === this.props.activeRoom ) });
  }

  createMessage(e) {
    this.roomsRef.push({
      content: this.state.newMessage,
      username: "samuel",
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomID: this.props.activeRoom
    });
  }

  handleNewMessage(e) {
    this.setState({ newMessage: e.target.value });
    //this.props.setMessageList( this.state.messages );
    //this.props.setMessageList( this.state.messages );
    /*this.props.setMessageList(this.state.messages);
    console.log( this.state.messages[1] );
    console.log( this.state.messages[1].content );
    console.log( this.state.messages[1].key );
    console.log( this.state.messages[1].username );
    console.log( this.state.messages[1].sentAt );
    console.log( this.state.messages[1].roomId );
    console.log( this.props.activeRoom );
    console.log( this.state.activeMessageList );
    console.log( this.state.messages );*/
  }

  /*setActiveMessageList() {
    this.setState({ activeMessageList: this.state.messages.filter( message => message.roomId === this.props.activeRoom ) });
    console.log( this.state.messages );
    console.log( '^ all messages');
    console.log( this.state.activeMessageList );
    console.log( '^ active messages' );
    console.log( this.props.activeRoom );
    console.log( '^ active room' );
  }*/

  render() {
    return (
      <section className="listofMessages">
        <form className="newMessageForm" onSubmit={ (e) => this.createMessage(e) } >
          <input type="text" onChange={ (e) => this.handleNewMessage(e) } />
          <input type="submit" value="Send" />
        </form>
        <section>
          {this.state.activeMessageList.map( (message, index) =>
            <div className="messages">
              <li>{message.content}</li>
              <li>{message.username}</li>
              <li>{message.sentAt}</li>
            </div>
          )}
        </section>
      </section>
    )
  }
}

export default MessageList;
