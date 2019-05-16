import React from 'react';
import { Typography, withStyles, Grid } from '@material-ui/core';
import { HourGlassLargeIcon } from 'selfkey-ui';
import TrezorHelpStepsSection from './help-steps-section';
import { LWSButtonSecondary } from '../lws-button';

const styles = theme => ({
	fullWidth: {
		width: '100%'
	}
});

export const TrezorConnecting = withStyles(styles)(({ classes, onBack }) => (
	<Grid container direction="column" justify="flex-start" alignItems="center" spacing={40}>
		<Grid item>
			<HourGlassLargeIcon />
		</Grid>
		<Grid item>
			<Typography variant="h1">Connecting To Trezor</Typography>
		</Grid>
		<Grid item>
			<Typography variant="body1">
				To ensure a successful connection, please make sure your device is plugged in
				properly via USB.
			</Typography>
		</Grid>
		<Grid item>
			<TrezorHelpStepsSection />
		</Grid>
		<Grid item className={classes.fullWidth}>
			<LWSButtonSecondary onClick={onBack}>Back</LWSButtonSecondary>
		</Grid>
	</Grid>
));

export default TrezorConnecting;
