import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackButton = ({to}) => {
	return (
		<Link style={{ textDecoration: 'none', color: 'inherit' }} to={to}>
			<IconButton
				edge='start'
				color="inherit"
				aria-label="go back"
			>
				<ArrowBackIcon />
			</IconButton>
		</Link>
	);
}

export default BackButton;
