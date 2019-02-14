import React from 'react';
import ReactImage from "../../asset/react.png"

export default () => {
    const complex = <p><u>You</u> spin <b>me</b> right round.</p>
    const simple = <p> Hello world </p>
    return (
        <div className="exampleText"> 
            <h2>Fake Overlay</h2><br/>
            Title:
            <div className='title'>{simple} </div>
            <div><img className='image' src={ReactImage} alt="react" /></div>
        </div>
    )
}

    