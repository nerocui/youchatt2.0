import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { setContacts, setRequests, setThreads, logout } from '../../action';
import PublicRedirectRoute from './PublicRedirectRoute';
import ChatPage from '../pages/ChatPage';
import ContactsPage from '../pages/ContactsPage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import MomentsPage from '../pages/MomentsPage';
import ProfilePage from '../pages/ProfilePage';
import RequestsPage from '../pages/RequestsPage';
import SearchPage from '../pages/SearchPage';


class App extends React.Component {


	render() {
		return (
			<Router>
				<Switch>
					<PublicRedirectRoute exact path='/' component={LoginPage} />
					<Route exact path='/main' component={MainPage} />
				</Switch>
			</Router>
		);
	}
}


function mapDispatchToProps(dispatch) {
	return {
		setContacts: contacts => dispatch(setContacts(contacts)),
		setThreads: threads => dispatch(setThreads(threads)),
		setRequests: requests => dispatch(setRequests(requests)),
		logout: () => dispatch(logout()),
	};
}

export default connect(null, mapDispatchToProps)(App);
