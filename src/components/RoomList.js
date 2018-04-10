import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
      if (this.state.rooms.length === 1) { this.props.setRoom(room) }
    });
  }

  createRoom(newRoomName) {
    if (!newRoomName) { return }
    this.roomsRef.push({
      name: newRoomName
    });
    this.setState({ newRoomName: '' });
  }

  handleNewChatRoomName(e) {
    this.setState({newRoomName: e.target.value});
  }

  render() {
    return (
      <section id="room-component">
        <section className="chatRoomList">
          {this.state.rooms.map( room =>
            <li key={room.key}>
              <button onClick={ () => this.props.setRoom(room) }>{room.name}</button>
            </li>
          )}
        </section>
        <form className="newRoomForm" onSubmit={ (e) => { e.preventDefault(); e.target.reset(); this.createRoom(this.state.newRoomName) } }>
          <input type="text" value={ this.state.newRoomName } onChange={ this.handleNewChatRoomName.bind(this) } placeholder="Create a Room" />
          <input type="submit" />
        </form>
      </section>
    )
  }
}

export default RoomList;
