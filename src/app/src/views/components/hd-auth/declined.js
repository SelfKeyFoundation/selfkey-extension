import React from 'react';
import { Typography, Grid, withStyles } from '@material-ui/core';
import { WarningShieldIcon } from 'selfkey-ui';
import { LWSButtonSecondary } from '../lws-button';

const styles = theme => ({
	fullWidth: {
		width: '100%'
	}
});

export const HardwareWalletAuthDeclined = withStyles(styles)(({ classes, walletType, onOk }) => {
	const typeText = walletType.charAt(0).toUpperCase() + walletType.slice(1);
	return (
		<Grid container direction="column" justify="flex-start" alignItems="center" spacing={40}>
			<Grid item>
				<WarningShieldIcon />
			</Grid>
			<Grid item>
				<Typography variant="h1">Declined Authentication</Typography>
			</Grid>
			<Grid item>
				<Typography variant="body1">
					You declined this authentication on your {typeText} device
				</Typography>
			</Grid>
			<Grid item className={classes.fullWidth}>
				<LWSButtonSecondary onClick={onOk}>OK</LWSButtonSecondary>
			</Grid>
		</Grid>
	);
});

export default HardwareWalletAuthDeclined;
