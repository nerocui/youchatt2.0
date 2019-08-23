import React from 'react';
import { Switch } from "react-router-dom";
import TopAppBar from './AppBar';
import SearchBar from './SearchBar';
import PrivateRoute from '../../routes/PrivateRoute';
import PublicRedirectRoute from '../../routes/PublicRedirectRoute';

class DynamicAppBar extends React.Component {
	render() {
		console.log('getting new route');
		return (
			<Switch>
				<PublicRedirectRoute exact path='/' component={TopAppBar} />
				<PrivateRoute exact path='/allowpermission' component={TopAppBar} />
				<PrivateRoute exact path='/main' component={TopAppBar} />
				<PrivateRoute exact path='/contacts' component={TopAppBar} />
				<PrivateRoute exact path='/search' component={SearchBar} />
				<PrivateRoute exact path='/requests' component={TopAppBar} />
				<PrivateRoute exact path='/thread' component={TopAppBar} />
			</Switch>
		);
	}
}

export default DynamicAppBar;
