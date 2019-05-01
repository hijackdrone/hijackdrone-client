import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import Form from './Form';
import Controller from './Controller';

type State={
  endpoint: string,
  socket: any,
  pw: string,
  roll: string,
  connected: boolean,
  found: boolean,
  err: string,
}

class App extends Component<{},State> {
  state: State={
      endpoint: 'http://49.236.137.170:4001',
      socket: null,
      pw: '',
      roll: 'c',
      connected: false,
      found: false,
      err: '',
  };

  
  componentDidMount=()=>{
    const { endpoint } = this.state;
    this.socket = socketIOClient(endpoint);
    this.socket.on('found room',(pw: string)=>{
        // this.setState({found: true,pw});
        this.setState({found: true,pw});
    });
    this.socket.on('rejected room',(err: string)=>{
        this.setState({found: false, connected: false, err});
    });
    this.socket.on('connected',()=>{
        this.setState({connected: true});
    });
  }
  // types
  socket: any;
  
  componentWillUnmount=()=>{
    this.socket.emit('leave room',[this.state.pw, this.state.roll]);
    this.socket.disconnect();
  }

  render() {
    return (
      <div className="App">
        <Form
          socket={this.state.socket}
          pw={this.state.pw}
          onSubmit={(pw)=>this.setState({pw})}
          changeState={(state: any)=>this.setState(state)}
          found={this.state.found}
          roll={this.state.roll}
          err={this.state.err}
        />
        <Controller
        
        />
      </div>
    );
  }
}

export default App;
