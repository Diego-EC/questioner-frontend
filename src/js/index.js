//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
//https://medium.com/@officialrajdeepsingh/how-to-use-bootstrap-in-react-js-adf50165c7a1
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

//include your index.scss file into the bundle
import "../styles/index.scss";
import "../styles/image.scss";
import "../styles/badge.scss";
import "../styles/rich-text-editor.scss";
import "../styles/button.scss";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
