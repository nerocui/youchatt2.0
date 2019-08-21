import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import { updateAuthInfo } from '../../action';

class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		this.renderRoute = this.renderRoute.bind(this);
	}
	
	renderRoute() {
		const COMPONENT = this.props.component;
		if (this.props.loggedIn) {
			return <COMPONENT />;
		} else {
			return <Redirect to="/" />;
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
		loggedIn: state.authState.loggedIn
	};
}

export default connect(
	mapStateToProps,
	{
		updateAuthInfo
	}
)(PrivateRoute);
