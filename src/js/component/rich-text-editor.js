import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import PropTypes from "prop-types";

export const RichTextEditor = props => {
	RichTextEditor.propTypes = {
		isReadOnly: PropTypes.bool,
		onEditorStateChange: PropTypes.func,
		description: PropTypes.string
	};

	const [editorState, setEditorState] = useState(
		EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML("<p>My initial content.</p>")))
	);

	useEffect(() => {
		if (props.description) {
			setEditorState(
				EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(props.description)))
			);
		}
	}, [props.description]);

	const handleEditorChange = state => {
		let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
		props.onEditorStateChange(currentContentAsHTML);
		setEditorState(state);
	};

	/*const convertContentToHTML = () => {};

	const convertContentFromHTML = () => {
		let currentContentAsText = convertFromHTML("<p>My initial content.</p>");
		console.log(currentContentAsText);
		setEditorState(currentContentAsText);
		console.log(editorState);
	};*/

	return (
		<div className="App">
			<header className="App-header">Rich Text Editor</header>
			<Editor
				editorState={editorState}
				onEditorStateChange={handleEditorChange}
				wrapperClassName="wrapper-class"
				editorClassName="editor-class"
				toolbarClassName="toolbar-class"
				readOnly={props.isReadOnly}
			/>
		</div>
	);
};
RichTextEditor.defaultProps = {
	isReadOnly: false
};
