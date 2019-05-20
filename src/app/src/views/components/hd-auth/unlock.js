import React from 'react';
import { Typography, Grid, withStyles } from '@material-ui/core';
import { LWSButtonSecondary } from '../lws-button';
import { UnlockLargeIcon } from 'selfkey-ui';

const styles = theme => ({
	unlockIcon: {
		fontSize: '66px'
	},
	fullWidth: {
		width: '100%'
	}
});
export const HardwareWalletAuthUnlock = withStyles(styles)(({ classes, onBack, walletType }) => {
	const typeText = walletType.charAt(0).toUpperCase() + walletType.slice(1);
	return (
		<Grid container direction="column" justify="flex-start" alignItems="center" spacing={40}>
			<Grid item>
				<UnlockLargeIcon className={classes.unlockIcon} />
			</Grid>
			<Grid item>
				<Typography variant="h2">Please Unlock Your {typeText}</Typography>
			</Grid>
			<Grid item>
				<Typography variant="body1">
					You need to confirm this authentication on your {typeText} in order to proceed.
					Please unlock it with your PIN.
				</Typography>
			</Grid>
			<Grid item className={classes.fullWidth}>
				<LWSButtonSecondary onClick={onBack}>BACK</LWSButtonSecondary>
			</Grid>
		</Grid>
	);
});

export default HardwareWalletAuthUnlock;
