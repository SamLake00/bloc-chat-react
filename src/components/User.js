import React, {Component} from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
    console.log("signed out");
  }

  render() {
    return (
      <div className="User Signing">
        <button className="userSignIn" onClick= { () => this.signIn() }>Sign In</button>
        <button className="userSignOut" onClick= { () => this.signOut() }>Sign Out</button>
        <div>{this.props.user}</div>
      </div>

    )
  }
}

export default User;
