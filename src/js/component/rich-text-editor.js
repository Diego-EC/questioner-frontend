import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export const RichTextEditor = props => {
	RichTextEditor.propTypes = {
		isReadOnly: PropTypes.bool,
		onEditorStateChange: PropTypes.func,
		description: PropTypes.string
	};

	const [editorState, setEditorState] = useState(
		EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft("<p></p>")))
	);

	useEffect(() => {
		if (props.description) {
			setEditorState(
				EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(props.description)))
			);
		}
	}, [props.description]);

	const handleEditorChange = state => {
		if (props.isReadOnly === false) {
			let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
			props.onEditorStateChange(currentContentAsHTML);
			setEditorState(state);
		}
	};

	let toolbarHTML = [];
	if (props.isReadOnly === false) {
		toolbarHTML = [
			"inline",
			"blockType",
			"fontSize",
			"fontFamily",
			"list",
			"textAlign",
			"colorPicker",
			"link",
			"remove",
			"history"
		];
	}

	return (
		<div className="">
			<Editor
				editorState={editorState}
				onEditorStateChange={handleEditorChange}
				wrapperClassName="wrapper-class"
				editorClassName="editor-class"
				toolbarClassName="toolbar-class"
				toolbar={{
					options: toolbarHTML
				}}
				placeholder="The description goes here..."
			/>
		</div>
	);
};
RichTextEditor.defaultProps = {
	isReadOnly: false
};
