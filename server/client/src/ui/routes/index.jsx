import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { updateAuthInfo, setContacts, setRequests, setThreads, logout } from '../../action';
import PublicRedirectRoute from './PublicRedirectRoute';
import ChatPage from '../pages/ChatPage';
import ContactsPage from '../pages/ContactsPage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import MomentsPage from '../pages/MomentsPage';
import ProfilePage from '../pages/ProfilePage';
import RequestsPage from '../pages/RequestsPage';
import SearchPage from '../pages/SearchPage';
import PrivateRoute from "./PrivateRoute";


class App extends React.Component {


	render() {
		this.props.updateAuthInfo();
		return (
			<Router>
				<Switch>
					<PublicRedirectRoute exact path='/' component={LoginPage} />
					<PrivateRoute exact path='/main' component={MainPage} />
				</Switch>
			</Router>
		);
	}
}

export default connect(
	null,
	{
		updateAuthInfo,
		setContacts,
		setRequests,
		setRequests,
		logout,
	}
)(App);
