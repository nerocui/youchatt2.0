import React from 'react';
import { App, Popup, View, Statusbar } from 'framework7-react';
import routes from './routes';

const ThemedApp = () => {
	const appParam = {
		theme: 'auto',
		name: 'uChat',
		routes,
		id: 'com.uchat.nero',
		statusbar: {
			androidBackgroundColor: '#FFF',
			iosBackgroundColor: '#FFF'
		}
	};
	return (
		<App params={appParam}>
			<Statusbar />
			<View url="/" main className="safe-areas" masterDetailBreakpoint={800} />
		</App>
	);
}

export default ThemedApp;
