import React from 'react';
import {Editor, EditorState, RichUtils, convertFromHTML} from 'draft-js';

import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';

import htmlToDraft from 'html-to-draftjs';

const textfield = () =>{
    return <input type="text"/>;
}; 

class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);

        const blocksFromHTML = convertFromHTML(props.inputText); // Not working ?? Nothing online :(
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        this.state = {
            editorState: EditorState.createWithContent(state),
            htmlState: "Empty"
        };

        //second try
        // const blocksFromHtml = htmlToDraft(props.inputText);
        // const { contentBlocks, entityMap } = blocksFromHtml;
        // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

        // this.state = {
        //     editorState: EditorState.createWithContent(stateFromHTML(contentState)),
        //     htmlState: "Empty"
        // };
        
        // First try
        // this.state = {
        //     editorState: EditorState.createWithContent(stateFromHTML(props.inputText)),
        //     htmlState: "Empty"
        // };
        
        this.onChange = (editorState) => {
            this.state.htmlState = stateToHTML(editorState.getCurrentContent());
            return this.setState({editorState})
        };
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.firstTime = true;
        console.log(props.inputText);
    }

    // componentDidMount() {
    //     const content = this.inputText;
    //     if (content && this.firstTime) {
    //         const blocksFromHTML = convertFromHTML(content); // Not working ?? Nothing online :(
    //         const state = ContentState.createFromBlockArray(
    //             blocksFromHTML.contentBlocks,
    //             blocksFromHTML.entityMap
    //         );
    //         this.state = {
    //             editorState: EditorState.createWithContent(state),
    //             htmlState: "Empty"
    //         };
    //         this.firstTime = false;
    //         this.forceUpdate();
    //     }
    // }


    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    render() {
       
        return (
            <div className = {`rich-text`}>
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                />
                <input type="hidden" className="draftHTML" value={this.state.htmlState}></input>
            </div>
        );
    }
};


export default RichTextEditor;