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
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    e.target.reset();
  }

  handleNewChatRoomName(e) {
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    return (
      <section className="chatRooms">
        <section className="chatRoomList">
          {this.state.rooms.map( (room, index) =>
            <button key={room.name} onClick={ () => this.props.setRoom(room) }>{room.name}</button>
          )}
        </section>
        <form className="newRoomForm" onSubmit={ (e) => this.createRoom(e) } >
          <input type="text" onChange={ (e) => this.handleNewChatRoomName(e) } />
          <input type="submit" />
        </form>
      </section>
    )
  }
}

export default RoomList;
