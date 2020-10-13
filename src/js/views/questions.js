import React from "react";
import { Question } from "../component/question";

export const Questions = () => {
	return (
		<div>
			<h1 className="text-center">Main - Questions List</h1>
			<div className="container">
				<Question />
				<Question />
				<Question />
			</div>
		</div>
	);
};
