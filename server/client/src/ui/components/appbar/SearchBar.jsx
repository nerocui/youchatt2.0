import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import BackButton from './BackButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { searchContacts } from '../../../action';


const useStyles = makeStyles(theme => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		marginRight: 0,
		width: '100%',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 1),
		width: theme.spacing(7),
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}));

function SearchBar({searchContacts}) {
	const classes = useStyles();

	const [email, setEmail] = React.useState('');

	function onChange(e) {
		setEmail(e.target.value);
	}

	function onSubmit(e) {
		e.preventDefault();
		searchContacts(email);
		setEmail('');
	}

	return (
		<AppBar>
			<Toolbar>
				<BackButton to='/main' />
				<div className={classes.search}>
					<form onSubmit={onSubmit}>
						<InputBase
							placeholder="Search For User"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
							value={email}
							onChange={e => onChange(e)}
						/>
					</form>
				</div>
				<div>
					<IconButton
						aria-label="search"
						color="inherit"
						onClick={onSubmit}
					>
						<SearchIcon />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default connect(null, {searchContacts})(SearchBar);
