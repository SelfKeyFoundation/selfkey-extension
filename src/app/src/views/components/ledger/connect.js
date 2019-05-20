import React from 'react';
import { LedgerHelpStepsSection } from './help-steps-section';
import { Grid, withStyles } from '@material-ui/core';
import { LWSButtonPrimary } from '../lws-button';

const styles = theme => ({});

export const LedgerConnect = withStyles(styles)(({ onConnectClick }) => (
	<Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={24}>
		<LedgerHelpStepsSection />
		<Grid item>
			<LWSButtonPrimary onClick={onConnectClick}>CONNECT TO LEDGER</LWSButtonPrimary>
		</Grid>
	</Grid>
));

export default LedgerConnect;
