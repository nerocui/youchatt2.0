import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
	title: {
		flexGrow: 1,
	},
	grow: {
	  	flexGrow: 1,
	},
}));

export default function AppTopBar(props) {
	const classes = useStyles();
	return (
		<AppBar>
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="open drawer" onClick={props.openSideMenu}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					YouChat
				</Typography>
				<div className={classes.grow} />
				<IconButton color="inherit">
					<AddIcon />
				</IconButton>
				<Menu
					id="simple-menu"
					keepMounted
				>
					<MenuItem>New Chat</MenuItem>
					<MenuItem>Add New Contact</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}
