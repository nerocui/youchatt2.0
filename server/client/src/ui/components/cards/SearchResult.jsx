import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
	card: {
	  display: 'flex',
	  padding: '1rem',
	  height: '10rem',
	},
	details: {
	  display: 'flex',
	  flexDirection: 'column',
	  flexGrow: 1,
	},
	cover: {
		height: '9rem',
		width: '9rem',
	},
  }));

const SearchResult = ({email, first_name, last_name, profile_pic, onClick}) => {
	const classes = useStyles();
  	const theme = useTheme();
	return (
		<Card className={classes.card}>
			<div className={classes.details}>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{`${first_name} ${last_name}`}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{email}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
						size="small"
						color="primary"
						onClick={onClick}
					>
						Send Friend Request
					</Button>
				</CardActions>
			</div>
			<CardMedia
				className={classes.cover}
				image={profile_pic}
			/>
		</Card>
	);
}

export default SearchResult;
