import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/app-context";
import ScrollToTop from "./component/scrollToTop";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { Login } from "./views/login";
import { Questions } from "./views/questions";
import { CreateUser } from "./views/create-user";
import { ForgotPassword } from "./views/forgot-password";
import { QuestionDetail } from "./views/question-detail";
import { ManageUsers } from "./views/manage-users";
import { AddQuestion } from "./views/add-question";
import { AddAnwser } from "./views/add-answer";
import { EditQuestion } from "./views/edit-question";

const Layout = () => {
	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/questions" component={Questions} />
						<Route exact path="/create-user" component={CreateUser} />
						<Route exact path="/forgot-password" component={ForgotPassword} />
						<Route exact path="/question-detail/:id" component={QuestionDetail} />
						<Route exact path="/manage-users" component={ManageUsers} />
						<Route exact path="/add-question" component={AddQuestion} />
						<Route exact path="/question-detail/:id/add-answer" component={AddAnwser} />
						<Route exact path="/question-detail/:id/edit-question" component={EditQuestion} />
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
