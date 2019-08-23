import React from 'react';
import { connect } from 'react-redux';
import { firebaseHelper } from '../../startup';
import { setProfileMessageToken } from '../../action';

const AllowPermissionPage = ({user, setProfileMessageToken}) => {

	return (
		<div>
			please allow permission to receive notification
			<button onClick={() => setProfileMessageToken(user.id)}>Allow</button>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user: state.authState.user,
	};
}

export default connect(mapStateToProps, {setProfileMessageToken})(AllowPermissionPage);
