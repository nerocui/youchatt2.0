import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuButton from './MenuButton';
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

function MenuItemLink({to, onClick, label}) {
	return <MenuItem onClick={onClick}><Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>{label}</Link></MenuItem>;
}

export default function AppTopBar(props) {
	const classes = useStyles();
	const [addButtonAnchorEl, setAnchorAddButton] = React.useState(null);

	function handleAddButtonClick(event) {
		setAnchorAddButton(event.currentTarget);
	}

	function handleAddMenuClose() {
		setAnchorAddButton(null);
	}
	console.log('rerendered');
	return (
		<AppBar>
			<Toolbar>
				<MenuButton />
				<Typography variant="h6" className={classes.title}>
					YouChat
				</Typography>
				<div className={classes.grow} />
				<IconButton color="inherit" onClick={handleAddButtonClick}>
					<AddIcon />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={addButtonAnchorEl}
					keepMounted
					open={Boolean(addButtonAnchorEl)}
					onClose={handleAddMenuClose}
				>
					<MenuItem onClick={handleAddMenuClose}>New Chat</MenuItem>
					<MenuItemLink onClick={handleAddMenuClose} to='/search' label='Add New Contact'  />
				</Menu>
			</Toolbar>
		</AppBar>
	);
}
