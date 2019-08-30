import React from 'react';
import { Page, List, ListItem, Link } from 'framework7-react';
import { connect } from 'react-redux';

const ContactsPage = ({requests}) => {
	const newCount = requests.filter(r => !r.read).length;
	const hasNew = newCount > 0;
	return (
		<Page>
			<List>
				<ListItem title="Friend Requests" badge={hasNew?newCount:0} link="/requests">
				</ListItem>
			</List>
		</Page>
	);
}

function mapStateToProps(state) {
	return {
		requests: state.requestState.requests,
	};
}

export default connect(mapStateToProps)(ContactsPage);
