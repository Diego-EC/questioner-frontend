import React from "react";
import PropTypes from "prop-types";
import { ModalImage } from "./modal-image";

export const Image = props => {
	Image.propTypes = {
		id: PropTypes.number,
		src: PropTypes.string
	};

	function displayImage() {
		console.log("displayImage");
		$("#" + props.id).modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function closeModal() {
		console.log("closeModal");
	}

	return (
		<div onClick={displayImage}>
			<img className="img-fluid" src={props.src} alt="image" />
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
