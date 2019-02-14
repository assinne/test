import React from 'react';
import {Editor, EditorState, RichUtils, convertFromHTML,ContentState} from 'draft-js';

import {stateToHTML} from 'draft-js-export-html';

class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);

        const blocksFromHTML = convertFromHTML(props.inputText.outerHTML); 
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        this.state = {
            editorState: EditorState.createWithContent(state),
            htmlState: "Empty"
        };
        
        this.onChange = (editorState) => {
            this.state.htmlState = stateToHTML(editorState.getCurrentContent());
            return this.setState({editorState})
        };
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.firstTime = true;
        console.log(props.inputText);
    }

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