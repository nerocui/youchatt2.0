import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopAppBar from './AppBar';
import PrivateRoute from '../../routes/PrivateRoute';
import PublicRedirectRoute from '../../routes/PublicRedirectRoute';

class DynamicAppBar extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<PublicRedirectRoute exact path='/' component={TopAppBar} />
					<PrivateRoute exact path='/main' component={TopAppBar} />
					<PrivateRoute exact path='/contacts' component={TopAppBar} />
					<PrivateRoute exact path='/search' component={TopAppBar} />
					<PrivateRoute exact path='/requests' component={TopAppBar} />
					<PrivateRoute exact path='/thread' component={TopAppBar} />
				</Switch>
			</Router>
		);
	}
}

export default DynamicAppBar;
