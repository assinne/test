import React from 'react';
import {Editor, EditorState, RichUtils, convertFromHTML, ContentState} from 'draft-js';

const textfield = () =>{
    return <input type="text"/>;
}; 

class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.inputText);
        this.inputText = props.inputText;

        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
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
        const content = this.inputText;
        if (content) {
            debugger;
            const blocksFromHTML = convertFromHTML(content);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            this.state = {
                editorState: EditorState.createWithContent(state),
            };
        }
        return (
            <div className = {`rich-text`}>
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                />
            </div>
        );
    }
};


export default RichTextEditor;