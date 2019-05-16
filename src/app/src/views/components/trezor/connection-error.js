import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import { WarningShieldIcon } from 'selfkey-ui';
import { LWSButtonPrimary, LWSButtonSecondary } from '../lws-button';
const styles = theme => ({
	fullWidth: {
		width: '100%'
	}
});

export const TrezorConnectionError = withStyles(styles)(({ classes, onBack, onRetry }) => (
	<Grid container direction="column" justify="flex-start" alignItems="center" spacing={40}>
		<Grid item>
			<WarningShieldIcon />
		</Grid>
		<Grid item>
			<Typography variant="h1">Error: Can&#39;t Connect To Trezor</Typography>
		</Grid>
		<Grid item>
			<Typography variant="body1">
				To ensure a successful connection, please make sure your device is plugged in
				properly via USB. If you need more assistance, please contact help@selfkey.org
			</Typography>
		</Grid>
		<Grid item className={classes.fullWidth}>
			<Grid container direction="column" justify="flex-start" alignItems="stretch">
				<Grid item>
					<LWSButtonPrimary onClick={onRetry}>TRY AGAIN</LWSButtonPrimary>
				</Grid>
				<Grid item>
					<LWSButtonSecondary onClick={onBack}>BACK</LWSButtonSecondary>
				</Grid>
			</Grid>
		</Grid>
	</Grid>
));

export default TrezorConnectionError;
