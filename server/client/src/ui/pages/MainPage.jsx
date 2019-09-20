import React from 'react';
import LoginPage from './LoginPage';
import { connect } from 'react-redux';
import ThreadsPage from './ThreadsPage';
import ContactsPage from './ContactsPage';
import MomentsPage from './MomentsPage';
import ProfilePage from './ProfilePage';
import { requestsChangeHandler, contactsChangeHandler } from '../../action';
import { db } from '../../startup';
import { DB_CONFIG } from '../../config/app';
import { refreshAll } from '../../utils/notification/handler';
import { Page, Popup, Navbar, NavLeft, NavTitle, Tab, Tabs, Toolbar, NavTitleLarge, NavRight, Link, Searchbar, Icon } from 'framework7-react';


class MainPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.handleObservers();
		window.addEventListener('focus', () => {
			if (this.props.user && this.props.user.id) {
				refreshAll(this.props.user.id)
			}
		});
	}

	async handleObservers() {
		try {
			const Requests = await db.getSchema().table(DB_CONFIG.REQUEST_DB_NAME);
			const Contacts = await db.getSchema().table(DB_CONFIG.USER_DB_NAME);
			const requestsQuery = await db.select().from(Requests).where(Requests.to_user_id.eq(this.props.user.id));
			const contactsQuery = await db.select().from(Contacts);
			db.observe(requestsQuery, this.props.requestsChangeHandler);
			db.observe(contactsQuery, this.props.contactsChangeHandler);
		} catch(e) {
			console.log(e);
		}
	}

	render() {
		return (
			<Page pageContent={false}>
				<Navbar sliding={false}>
					<NavRight>
						<Link href='/search' panelOpen="left" iconIos="f7:add" iconAurora="f7:add" iconMd="material:add"></Link>
					</NavRight>
					<NavTitle>uChat</NavTitle>
				</Navbar>
				<Toolbar bottom tabbar>
					<Link tabLink="#threadspage" tabLinkActive>Chats</Link>
					<Link tabLink="#contactspage">Friends</Link>
					<Link tabLink="#momentspage">Moments</Link>
					<Link tabLink="#profilepage">Me</Link>
				</Toolbar>
				<Tabs swipeable>
					<Tab className="page-content" tabActive id="threadspage">
						<ThreadsPage />
					</Tab>
					<Tab className="page-content" id="contactspage">
						<ContactsPage />
					</Tab>
					<Tab className="page-content" id="momentspage">
						<MomentsPage />
					</Tab>
					<Tab className="page-content" id="profilepage">
						<ProfilePage />
					</Tab>
				</Tabs>
				<Popup opened={!this.props.loggedIn}>
					<LoginPage />
				</Popup>
			</Page>
		);
	};
} 

function mapStateToProps(state) {
	return {
		user: state.authState.user,
		loggedIn: state.authState.loggedIn,
	};
}

export default connect(mapStateToProps, { requestsChangeHandler, contactsChangeHandler })(MainPage);
