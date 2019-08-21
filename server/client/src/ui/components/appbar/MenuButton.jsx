import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { openSideMenu } from '../../../action';

const MenuButton = ({openSideMenu}) => {
	return (
		<IconButton edge="start" color="inherit" aria-label="open drawer" onClick={openSideMenu}>
			<MenuIcon />
		</IconButton>
	);
};

export default connect(null, {openSideMenu})(MenuButton);
