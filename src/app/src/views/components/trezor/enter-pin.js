import React from 'react';
import {
	withStyles,
	Grid,
	Typography,
	Button,
	Paper,
	InputAdornment,
	Input
} from '@material-ui/core';
import { ClearIcon } from 'selfkey-ui';
import { LWSButtonPrimary, LWSButtonSecondary } from '../lws-button';

const boxComponentStyles = theme => ({
	square: {
		height: '50px !important',
		width: '50px !important',
		minWidth: '50px !important',
		cursor: 'pointer'
	},

	dot: {
		content: '',
		borderRadius: '100%',
		background: '#fff',
		width: '8px',
		height: '8px'
	}
});

const BoxComponent = withStyles(boxComponentStyles)(props => {
	return (
		<Paper className={props.classes.square} onClick={props.onClick}>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				style={{ minHeight: '100%' }}
			>
				<Grid item>
					<div className={props.classes.dot} />
				</Grid>
			</Grid>
		</Paper>
	);
});

const styles = theme => ({
	clearButton: {
		cursor: 'pointer'
	},
	fullWidth: {
		width: '100%'
	}
});

export const TrezorEnterPin = withStyles(styles)(
	({ classes, onPinClick, onClear, onEnter, onBack, pin, error = '' }) => (
		<Grid container direction="column" justify="center" alignItems="center" spacing={40}>
			<Grid item>
				<Typography variant="h1">Please Enter Your PIN.</Typography>
			</Grid>
			<Grid item>
				<Typography variant="h3">Look at the device for the number positions.</Typography>
			</Grid>
			<Grid item>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={24}
				>
					<Grid item>
						<Grid
							container
							direction="row"
							justify="center"
							alignItems="center"
							spacing={24}
						>
							<Grid item>
								<Button component={BoxComponent} onClick={e => onPinClick(7)} />
							</Grid>
							<Grid item>
								<Button component={BoxComponent} onClick={e => onPinClick(8)} />
							</Grid>
							<Grid item>
								<Button component={BoxComponent} onClick={e => onPinClick(9)} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid
							container
							direction="row"
							justify="center"
							alignItems="center"
							spacing={24}
						>
							<Grid item>
								<Button component={BoxComponent} onClick={e => onPinClick(4)} />
							</Grid>
							<Grid item>
								<Button component={BoxComponent} onClick={e => onPinClick(5)} />
							</Grid>
							<Grid item>
								<Button component={BoxComponent} onClick={e => onPinClick(6)} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid
							container
							direction="row"
							justify="center"
							alignItems="center"
							spacing={24}
						>
							<Grid item>
								<Button component={BoxComponent} onClick={e => onPinClick(1)} />
							</Grid>
							<Grid item>
								<Button component={BoxComponent} onClick={e => onPinClick(2)} />
							</Grid>
							<Grid item>
								<Button component={BoxComponent} onClick={e => onPinClick(3)} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item className={classes.fullWidth}>
				<Input
					type="password"
					disabled
					value={pin}
					fullWidth
					error={error !== ''}
					endAdornment={
						<InputAdornment position="start">
							<div onClick={onClear} className={classes.clearButton}>
								<ClearIcon />
							</div>
						</InputAdornment>
					}
				/>
				{error !== '' && (
					<Typography variant="subtitle2" color="error" gutterBottom>
						{error}
					</Typography>
				)}
			</Grid>
			<Grid item className={classes.fullWidth}>
				<Grid container direction="column" justify="flex-start" alignItems="stretch">
					<Grid item>
						<LWSButtonPrimary onClick={onEnter}>ENTER</LWSButtonPrimary>
					</Grid>
					<Grid item>
						<LWSButtonSecondary onClick={onBack}>BACK</LWSButtonSecondary>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
);

export default TrezorEnterPin;
