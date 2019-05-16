import React from 'react';
import { Typography, Grid, withStyles } from '@material-ui/core';
import { HourGlassLargeIcon } from 'selfkey-ui';
import { LWSButtonSecondary } from '../lws-button';

const styles = theme => ({
	fullWidth: {
		width: '100%'
	}
});

export const HardwareWalletAuthTimer = withStyles(styles)(({ classes, onBack, walletType }) => {
	const typeText = walletType.charAt(0).toUpperCase() + walletType.slice(1);
	return (
		<Grid container direction="column" justify="flex-start" alignItems="center" spacing={40}>
			<Grid item>
				<HourGlassLargeIcon />
			</Grid>
			<Grid item>
				<Typography variant="h2">Confirm Authentication on {typeText}</Typography>
			</Grid>
			<Grid item>
				<Typography variant="body1">
					You have 30 seconds to confirm this authentication on {typeText} or it will time
					out and automatically cancel.
				</Typography>
			</Grid>
			<Grid item className={classes.fullWidth}>
				<LWSButtonSecondary onClick={onBack}>BACK</LWSButtonSecondary>
			</Grid>
		</Grid>
	);
});

export default HardwareWalletAuthTimer;
