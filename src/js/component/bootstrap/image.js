import React from "react";
import PropTypes from "prop-types";
import { ModalImage } from "./modal-image";
import { Button } from "./button";
import * as Constant from "../../helpers/constants";

export const Image = props => {
	Image.propTypes = {
		id: PropTypes.number,
		src: PropTypes.string,
		isDeleteable: PropTypes.bool,
		onDeleteImage: PropTypes.func
	};
	const QUESTION_IMAGE_ENDPOINT = "question-image";

	function displayImage() {
		$("#" + props.id).modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function closeModal() {
		console.log("closeModal");
	}

	async function deleteImage() {
		props.onDeleteImage(props.id);
	}

	let buttonDeleteHTML = "";
	if (props.isDeleteable == true) {
		buttonDeleteHTML = <Button label={"Delete"} color={"danger"} onClick={deleteImage} />;
	}

	return (
		<div>
			<img className="img-fluid image" src={props.src} alt="image" onClick={displayImage} />
			<div className="text-right mt-1">{buttonDeleteHTML}</div>

			<ModalImage
				id={props.id.toString()}
				title={"Question Saved"}
				text={<img className="img-fluid" src={props.src} alt="image" />}
				close={closeModal}
				size={"xl"}
			/>
		</div>
	);
};

Image.defaultProps = {
	isDeleteable: false
};
