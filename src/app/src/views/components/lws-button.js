import React from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';

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
	},

	buttonPrimary: {
		fontFamily: 'Lato, arial, sans-serif',
		color: '#fff',
		background: 'linear-gradient(0deg, #09A8BA 0%, #0ABBD0 100%)',
		border: 0,
		width: '100%',
		'&:hover': {
			background: 'linear-gradient(45deg, #09A8BA 0%, #0ABBD0 100%)'
		},
		'&:disabled': {
			opacity: 0.5
		}
	},

	buttonSecondary: {
		fontFamily: 'Lato, arial, sans-serif',
		marginTop: '30px',
		color: '#1CA9BA',
		background: '#202A33',
		border: '2px solid #1CA9BA',
		width: '100%',
		'&:hover': {
			background: '#293743'
		}
	},
	buttonTertiary: {
		height: '80px',
		padding: '10px',
		boxSizing: 'border-box',
		border: '1px solid #1D505F',
		borderRadius: '4px',
		background: '#293743',
		color: '#fff',
		fontSize: '16px',
		display: 'flex',
		alignItems: 'center',
		flexFlow: 'column',
		'&:hover': {
			cursor: 'pointer',
			background: '#374a5a'
		},
		'& svg': {
			padding: '0px 0px 10px 0px'
		},
		fontFamily: 'Lato, arial, sans-serif',
		fontWeight: 700,
		maxWidth: 'calc(33% - 15px)',
		width: '100%'
	},
	buttonTertiarySelected: {
		border: `2px solid #1CA9BA`
	}
});

export const LWSButton = withStyles(styles)(
	({ classes, children, className, onClick, disabled }) => (
		<button className={`${classes.root} ${className}`} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	)
);

export const LWSButtonTertiary = withStyles(styles)(
	({ classes, children, className, onClick, selected = false }) => (
		<button
			className={classNames(
				classes.buttonTertiary,
				selected ? classes.buttonTertiarySelected : null,
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
);

export const LWSButtonPrimary = withStyles(styles)(
	({ classes, children, className, disabled, onClick }) => (
		<LWSButton
			className={`${classes.buttonPrimary} ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</LWSButton>
	)
);

export const LWSButtonSecondary = withStyles(styles)(
	({ classes, children, className, onClick }) => (
		<LWSButton className={`${classes.buttonSecondary} ${className}`} onClick={onClick}>
			{children}
		</LWSButton>
	)
);

export default LWSButton;
