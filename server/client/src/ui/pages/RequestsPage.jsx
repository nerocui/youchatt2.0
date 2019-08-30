import React from 'react';
import { Page, Navbar, ListItem } from 'framework7-react';
import { connect } from 'react-redux';
import FriendRequest from '../components/cards/FriendRequest';

const RequestsPage = ({requests}) => {
	return (
		<Page>
			<Navbar title="Friend Requests" backLink="Back"/>
			{requests.map(r => <FriendRequest key={r.id} {...r}/>)}
		</Page>
	);
}

function mapStateToProps(state) {
	return {
		requests: state.requestState.requests,
	};
}

export default connect(mapStateToProps)(RequestsPage);
