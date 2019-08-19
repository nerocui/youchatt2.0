import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import { updateAuthInfo } from '../../action';

class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		this.renderRoute = this.renderRoute.bind(this);
	}

	componentDidMount() {
		this.props.updateAuthInfo();
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


function mapDispatchToProps(dispatch) {
	return {
		updateAuthInfo
	};
}

function mapStateToProps(state) {
	console.log('mapping state to props', state);
	return {
		loggedIn: state.auth.loggedIn
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
