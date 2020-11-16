import React from "react";

export const AlertInfoSnippetCode = props => {
	return (
		<div className="alert alert-info" role="alert">
			<h4 className="alert-heading">Share your code:</h4>
			<p>
				Do you know that every time you ask a question without providing all the necessary information, a kitten
				gets hit by a car? 😿😿😿<br></br>
				So, please, consider adding your app code in a{" "}
				<a href="https://youtu.be/7YBnd8zXhwI" target="_blank" rel="noreferrer">
					Gist
				</a>{" "}
				(or a similar tool) to help to the community understand the question, and earn good kitty karma points
				by the way 😻😻😻
			</p>
		</div>
	);
};