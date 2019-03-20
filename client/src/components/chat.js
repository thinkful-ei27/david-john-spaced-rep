import React from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import openSocket from 'socket.io-client';
import {updateInput} from '../actions/chatbox'
import '../styles/chatbox.css'
const socket = openSocket('http://localhost:4010');


export class ChatBox extends React.Component {
  componentDidMount() {
    socket.on('I-logged', () => {
      console.log("server and client got a connection!")
    });
  }

  socketLogger() {
    socket.emit('logMe')
  }

  updateInput(input) {
    this.props.dispatch(updateInput(input))
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.inputWord)
  }


  render() {
    return (
      <div id='container'>
        <div id='outer-glow-box'>
          <div id='text-box'>
            <div class="message_holder"></div>
          </div>
          <form action="" method="POST" id="input-form" onSubmit={(e) => this.handleSubmit(e)}>
            <input type="text" class="message" placeholder="Your Message..." onChange={ (e) => this.updateInput(e.target.value)}/>
            <input type="submit" class="submit-button"/>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    inputWord: state.chatBox.inputWord
  };
};

export default requiresLogin()(connect(mapStateToProps)(ChatBox));
