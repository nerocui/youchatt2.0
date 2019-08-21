import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import ContactsOutlined from '@material-ui/icons/ContactsOutlined';
import ImageOutlined from '@material-ui/icons/ImageOutlined';
import StarBorder from '@material-ui/icons/StarBorder';
import PersonOutline from '@material-ui/icons/PersonOutline';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import NotificationIconOutline from '@material-ui/icons/NotificationImportantOutlined';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
	list: {
	  width: 250,
	},
	fullList: {
	  width: 'auto',
	},
});

const devide = 3;

const sideBarConfig = [
	{
		label: 'Contact List',
		route: '/contacts',
		Icon: ContactsOutlined
	},
	{
		label: 'Moments',
		route: '/moments',
		Icon: ImageOutlined
	},
	{
		label: 'Saved Messages',
		route: '/savedmessages',
		Icon: StarBorder
	},
	{
		label: 'Profile',
		route: '/me',
		Icon: PersonOutline
	},
	{
		label: 'Settings',
		route: '/settings',
		Icon: SettingsOutlined
	},
];

const requestConfig = {
	label: 'Requests',
	route: '/requests',
	Icon: NotificationIconOutline
};

const StyledBadge = withStyles(theme => ({
	badge: {
	  top: '50%',
	  right: '-1rem',
	},
}))(Badge);

function ListItemLink({label, route, Icon}) {
	return (
		<Link to={route} style={{ textDecoration: 'none', color: 'inherit' }}>
			<ListItem button key={label}>
				<ListItemIcon><Icon /></ListItemIcon>
				<ListItemText primary={label} />
			</ListItem>
		</Link>
	);
}
 
export default function SideMenu({open, requests = 0, closeSideBar}) {
	const classes = useStyles();
	const sideList = () => (
		<div
		  className={classes.list}
		  role="presentation"
		  onClick={closeSideBar}
		  onKeyDown={closeSideBar}
		>
		  <List>
			{sideBarConfig.slice(0, devide).map(props => (
				<ListItemLink {...props}/>
			))}
			<StyledBadge color="secondary" badgeContent={requests} invisible={requests===0}>
				<ListItemLink {...requestConfig}/>
			</StyledBadge>
		  </List>
		  <Divider />
		  <List>
		  	{sideBarConfig.slice(devide, ).map(props => (
				<ListItemLink {...props}/>
			))}
		  </List>
		</div>
	);
	 return (
		<SwipeableDrawer
			open={open}
			onClose={closeSideBar}
			onOpen={closeSideBar}
		>
			{sideList()}
		</SwipeableDrawer>
	 );
 }
