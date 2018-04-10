import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
      activeMessageList: []
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      let message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateActiveMessageList(nextProps.activeRoom);
  }

  updateActiveMessageList(activeRoom) {
    if (!activeRoom) {return}
    this.setState({ activeMessageList: this.state.messages.filter( message => message.roomId === activeRoom.name ) });
  }

  createMessage(newMessage) {
    //console.log( this.state.newMessage );
    if (!this.props.activeRoom || !newMessage) { return }
    this.messagesRef.push({
      content: newMessage,
      username: this.props.activeUser.displayName,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.name
    }, () => {this.updateActiveMessageList(this.props.activeRoom) });
    /*console.log("createMessage");
    console.log( this.state.newMessage );*/
  }

  handleNewMessage(e) {
    this.setState({ newMessage: e.target.value });
    console.log( this.state.newMessage );
    //console.log( this.props.activeUser );
  }

  render() {
    return (
      <section className="listofMessages">
        <form className="newMessageForm" onSubmit={ (e) => { e.preventDefault(); e.target.reset(); this.createMessage(this.state.newMessage) } }>
          <input type="text" onChange={ (e) => this.handleNewMessage(e) } />
          <input type="submit" value="Send" />
        </form >
        <section>
          {this.state.activeMessageList.map( message =>
            <div className="messages">
              <li key={message.content}>{message.content}</li>
              <li key={message.username}>{message.username}</li>
              <li key={message.sentAt}>{message.sentAt}</li>
            </div>
          )}
        </section>
      </section>
    )
  }
}

export default MessageList;
