import React from 'react';
import { Page, LoginScreenTitle, Botton, Button } from 'framework7-react';
import Iframe from 'react-iframe';

const LoginPage = () => {
	return (
		<Page noToolbar noNavbar noSwipeback loginScreen>
			{/* <Iframe url='/auth/google'/> */}
			<Button raised large fill>Login With Google</Button>
		</Page>
	);
}

export default LoginPage;
