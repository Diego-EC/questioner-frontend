import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Login } from "./views/login";
import { Main } from "./views/main";
import { QuestionDetail } from "./views/question-detail";
import { CreateUser } from "./views/create-user";

import injectContext from "./store/app-context";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/main" component={Main} />
						<Route exact path="/create-user" component={CreateUser} />
						<Route exact path="/question-detail" component={QuestionDetail} />
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
