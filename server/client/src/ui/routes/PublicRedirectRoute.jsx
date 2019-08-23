import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import { updateAuthInfo } from '../../action';

class PublicRedirectRoute extends Component {
	constructor(props) {
		super(props);
		this.renderRoute = this.renderRoute.bind(this);
	}

	renderRoute() {
		const COMPONENT = this.props.component;
		if (this.props.loggedIn) {
			if (this.props.user.message_token && this.props.user.message_token !== '') {
				return <Redirect to="/main" />;
			} else {
				return <Redirect to='/allowpermission' />;
			}
		} else {
			return <COMPONENT />;
		}
	}

	render() {
		const { component, ...rest } = this.props;
		return (
			<Route {...rest} render={this.renderRoute} />
		);
	}
}


function mapStateToProps(state) {
	return {
		loggedIn: state.authState.loggedIn,
		user: state.authState.user,
	};
}

export default connect(
	mapStateToProps, 
	{
		updateAuthInfo,
	}
)(PublicRedirectRoute);
