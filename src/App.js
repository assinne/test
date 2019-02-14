import React, { Component } from 'react';
import './app.css';
import RichText from './textfield/Draft';
import ExampleText from './prework/ExampleText';
import Button from './button/Button';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = { username: null, title:null };
        this.handleClick;
    }

    componentDidMount() {
        fetch('/api/getUsername')
        .then(res => res.json())
        .then(user => this.setState({ username: user.username }));

        this.state.title = document.querySelector(".title p"); // Bad code time saving
    }

    handleClick() {
        const savedValue = document.querySelector(".draftHTML").value;
        console.log(savedValue);
        const newElement = document.createElement("div");

        newElement.setAttribute("class", "title");
        newElement.innerHTML = savedValue;
        //newElement.getElementsByClassName("title").style.marginTop = "1";
        const current = document.querySelector(".title");
        current.parentNode.replaceChild(newElement, current);
    }

    render() {
        const { username, title } = this.state;
        return (
            <div>
                {username ? <h1 className="header">{`Hello ${username}`}</h1> : <h1 className="header">Loading.. please wait!</h1>}
                <br/>
                <p className="intructions">(Use ctrl+b or ctrl+u)</p>{title ? <RichText inputText={title}/>: <div className=".header">Please wait</div>}<Button updateText={this.handleClick}/>
                <br/>
                <ExampleText/>
            </div>
        );
    }
}

// const buttonFunc = value => {
//     console.log("I am clicked");
// }