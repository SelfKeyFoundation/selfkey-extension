import React from 'react';
import { TrezorHelpStepsSection } from './help-steps-section';
import { Grid, withStyles } from '@material-ui/core';
import { LWSButtonPrimary } from '../lws-button';

const styles = theme => ({});

export const TrezorConnect = withStyles(styles)(({ onConnectClick }) => (
	<Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={24}>
		<TrezorHelpStepsSection />
		<Grid item>
			<LWSButtonPrimary onClick={onConnectClick}>CONNECT TO TREZOR</LWSButtonPrimary>
		</Grid>
	</Grid>
));

export default TrezorConnect;
