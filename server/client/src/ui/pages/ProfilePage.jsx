import React from 'react';
import { connect } from 'react-redux';

const ProfilePage = () => {
	return (
		<div>
			Profile Page
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user: state.authState.user,
		loggedIn: state.authState.loggedIn,
	};
}

export default connect(mapStateToProps)(ProfilePage);
