import "draft-js/dist/Draft.css";
import React, { useState, useEffect, useContext } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import { Context } from "../store/app-context";

export const RichTextEditorDos = () => {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

	return (
		<div>
			<Editor editorState={editorState} onEditorStateChange={setEditorState} />
			<p>{editorState}</p>
		</div>
	);
};
