import React from "react";
import { Link, useParams } from "react-router-dom";

export const AddAnwser = () => {
	let { id } = useParams();

	return (
		<div>
			<h1 className="text-center">Add Anwser {id}</h1>
			<form action="">
				<div className="row justify-content-center">
					<div className="col" align="center">
						<Link to="/questions" className="btn btn-primary">
							OK
						</Link>
					</div>
					<div className="col" align="center">
						<Link to="/questions" className="btn btn-secondary">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
