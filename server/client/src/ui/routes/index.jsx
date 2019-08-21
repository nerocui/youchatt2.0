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
import DynamicAppBar from '../components/appbar/DynamicAppBar';
import SideMenu from '../components/sidemenu/SideMenu';
import Paper from '@material-ui/core/Paper';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sideBarOpen: false,
		}
		this.openSideBar = this.openSideBar.bind(this);
		this.closeSideBar = this.closeSideBar.bind(this);
	}

	openSideBar() {
		this.setState({sideBarOpen: true});
	}

	closeSideBar() {
		this.setState({sideBarOpen: false});
	}

	render() {
		this.props.updateAuthInfo();
		return (
			<Router>
				<div>
					<DynamicAppBar />
					<SideMenu open={this.state.sideBarOpen} closeSideBar={this.closeSideBar} />
					<Paper className="page--container">
						<Switch>
							<PublicRedirectRoute exact path='/' component={LoginPage} />
							<PrivateRoute exact path='/main' component={MainPage} />
							<PrivateRoute exact path='/contacts' component={ContactsPage} />
							<PrivateRoute exact path='/search' component={SearchPage} />
							<PrivateRoute exact path='/requests' component={RequestsPage} />
							<PrivateRoute exact path='/thread' component={ChatPage} />
						</Switch>
					</Paper>
				</div>
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
