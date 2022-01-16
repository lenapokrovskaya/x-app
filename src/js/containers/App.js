import React, {Component} from 'react';
import { Header, Input, Button } from 'semantic-ui-react';
import { Student } from '/Users/Lena/Desktop/x-app/src/pages/Student/Student.jsx';
import AceEditor from "react-ace";
import { Routes, Route} from "react-router-dom";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-terminal";

import socket from '../socket';
// import { useEffect } from "react";


// function App() {
class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      value: '',
      connected: false,
      room: '---',
    };
  }

  handleChange(value) {
    socket.emit('CHANGE_CLIENT', {
      room: this.state.room,
      code: value,
    });
    this.setState({
      value
    });
  }

  componentDidMount() {
    socket.on('CHANGE_SERVER', value => {
      this.setState({
        value
      });
    });
  }

  connectRoom() {
    socket.emit('JOIN_ROOM', this.state.room);
    socket.join(this.input.value)
    this.setState({
      connected: true,
    });
  }

  render() {
  return (
    <div>
      <div className="header">
        <Header as='h1'>★X-app - {this.state.room}</Header>
        <Input onChange={e => this.setState({ room: e.target.value })} />
        <Button disabled={this.state.connected} onClick={this.connectRoom.bind(this)}>Connect</Button>
      </div>
      <div className="editor">
      <AceEditor
        mode="javascript"
        theme="terminal"
        name="editor"
        fontSize={14}
        showGutter={true}
        highlightActiveLine={true}
        editorProps={{ $blockScrolling: true }}
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      />
      </div>
    </div>
  );
  <Routes>
<Route path="student" element={<Student />} />
</Routes>
}
}

export default App;
