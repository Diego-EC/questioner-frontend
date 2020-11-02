import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/app-context";
import ScrollToTop from "./component/scrollToTop";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { Login } from "./views/login";
import { CreateUser } from "./views/create-user";
import { ForgotPassword } from "./views/forgot-password";
import { AuthRequired } from "./component/auth-required";

const Layout = () => {
	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/create-user" component={CreateUser} />
						<Route exact path="/forgot-password" component={ForgotPassword} />
						<Route path="/" component={AuthRequired} />
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
