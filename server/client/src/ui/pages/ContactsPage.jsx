import React from 'react';
import { Page, List, ListItem, Link } from 'framework7-react';
import { connect } from 'react-redux';

const ContactsPage = ({requests, contacts}) => {
	const newCount = requests.filter(r => !r.read).length;
	const hasNew = newCount > 0;
	return (
		<Page>
			<List>
				<ListItem title="Friend Requests" badge={hasNew?newCount:0} link="/requests">
				</ListItem>
				<List>
					{contacts.map(c => {
						return (
							<ListItem key={c.id} title={c.username} >
								<img slot="media" src={c.profile_pic} width="44" />
							</ListItem>
						);
					})}
				</List>
				
			</List>
		</Page>
	);
}

function mapStateToProps(state) {
	return {
		requests: state.requestState.requests,
		contacts: state.contactState.contacts,
	};
}

export default connect(mapStateToProps)(ContactsPage);
