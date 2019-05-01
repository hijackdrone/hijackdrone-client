import React, { Component } from 'react';

type Props={
    socket: any,
    pw: string,
    onSubmit: (pw: string)=>any,
    changeState: (obj: any)=>any,
    found: boolean,
    roll: string,
    err: string,
}
type State={
    pw: string,
}
export default class Form extends Component<Props,State>{
    state: State={
        pw: '',
    }
    componentDidMount=()=>{
        this.setState({pw: ''});
    }
    findRoom = (pw: string)=>{
        if(this.props.pw !== this.state.pw)
            this.props.socket.emit('find room',[pw, this.props.roll]);
    }
    leaveRoom = (pw: string)=>{
        this.props.socket.emit('leave room',[pw,this.props.roll]);
        this.props.changeState({pw: '', found: false, connected: false, err: ''});
    }
    render(){
        return(
            <div>
                <form>
                    <input placeholder='type your room pw' value={this.state.pw}
                        onChange={(event)=>{
                            this.setState({pw: event.target.value});
                            this.props.changeState({err: ''});
                        }}/>
                </form>
            </div>
        )
    }
}