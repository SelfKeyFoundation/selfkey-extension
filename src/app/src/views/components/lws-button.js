import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
	root: {
		webkitTransition: 'background .5s ease',
		transition: 'background .5s ease',
		height: '60px',
		boxSizing: 'border-box',
		borderRadius: '3px',
		fontSize: '16px',
		padding: '16px',
		textTransform: 'uppercase',
		fontWeight: 700,
		fontFamily: 'Lato, arial, sans-serif',
		letterSpacing: '0.6px',
		cursor: 'pointer'
	}
});

export const LWSButton = withStyles(styles)(({ classes, children, className, onClick }) => (
	<button className={`${classes.root} ${className}`} onClick={onClick}>
		{children}
	</button>
));

export default LWSButton;
