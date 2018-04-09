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
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    return (
      <section className="chatRooms">
        <section className="chatRoomList">
          {this.state.rooms.map( (room, index) =>
            <button key={room.name} onClick={ () => this.props.setRoom(room.name) }>{room.name}</button>
          )}
        </section>
        <form className="newRoomForm" onSubmit={ (e) => { e.preventDefault(); e.target.reset(); this.createRoom(this.state.newRoomName) } }>
          <input type="text" onChange={ (e) => this.handleNewChatRoomName(e) } />
          <input type="submit" />
        </form>
      </section>
    )
  }
}

export default RoomList;
