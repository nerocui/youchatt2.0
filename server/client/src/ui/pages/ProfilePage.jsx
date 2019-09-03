import React from 'react';
import { connect } from 'react-redux';
import { Block, Page, Button } from 'framework7-react';
import { logout } from '../../action';

const ProfilePage = ({ user, loggedIn, logout }) => {
	console.log('user', user);
	return (
		!loggedIn || <Page className="page--profile__container">
			<div className="component--profile__container">
				<Block strong style={{marginTop:0}}>
					<img src={user.profile_pic} />
					<h3>{user.username}</h3>
					<h4>ID: {user.id}</h4><Button color="red" round onClick={logout}>Logout</Button>
				</Block>
			</div>
		</Page>
	);
}

function mapStateToProps(state) {
	return {
		user: state.authState.user,
		loggedIn: state.authState.loggedIn,
	};
}

export default connect(mapStateToProps, { logout })(ProfilePage);
