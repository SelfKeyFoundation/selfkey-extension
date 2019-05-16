import React from 'react';
import { LedgerHelpStepsSection } from './help-steps-section';
import { HourGlassLargeIcon } from 'selfkey-ui';
import { Grid, Typography, withStyles } from '@material-ui/core';

import { LWSButtonSecondary } from '../lws-button';
const styles = theme => ({});

export const LedgerConnecting = withStyles(styles)(({ handleBack }) => (
	<Grid container direction="column" justify="flex-start" alignItems="center" spacing={40}>
		<Grid item>
			<HourGlassLargeIcon />
		</Grid>
		<Grid item>
			<Grid container direction="column" justify="center" alignItems="stretch" spacing={40}>
				<Grid item>
					<Typography variant="h1">Connecting To Ledger</Typography>
				</Grid>
				<Grid item>
					<Typography variant="body1">
						To ensure a successful connection, please check the following:
					</Typography>
				</Grid>
				<Grid item>
					<LedgerHelpStepsSection />
				</Grid>
				<Grid item>
					<LWSButtonSecondary onClick={handleBack}>Back</LWSButtonSecondary>
				</Grid>
			</Grid>
		</Grid>
	</Grid>
));

export default LedgerConnecting;
