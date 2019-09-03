import MainPage from './pages/MainPage';
import ThreadsPage from './pages/ThreadsPage';
import ContactsPage from './pages/ContactsPage';
import MomentsPage from './pages/MomentsPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import RequestsPage from './pages/RequestsPage';

const routes = [
	{
		path: '/',
		component: MainPage,
	},
	{
		path: '/search',
		component: SearchPage,
	},
	{
		path: '/requests',
		component: RequestsPage,
	},
];

export default routes;
