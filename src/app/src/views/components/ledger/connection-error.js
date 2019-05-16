import React from 'react';
import { LWSButtonPrimary, LWSButtonSecondary } from '../lws-button';
import { WarningShieldIcon } from 'selfkey-ui';
import { LedgerHelpStepsErrorSection } from './help-steps-error-section';
import { Grid, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({});

export const LedgerConnectionError = withStyles(styles)(({ handleRetry, handleBack }) => (
	<Grid container direction="column" justify="flex-start" alignItems="center" spacing={40}>
		<Grid item>
			<WarningShieldIcon />
		</Grid>
		<Grid item>
			<Grid container direction="column" justify="center" alignItems="stretch" spacing={40}>
				<Grid item>
					<Typography variant="h1">Error: Can&#39;t Connect To Ledger</Typography>
				</Grid>
				<Grid item>
					<Typography variant="body1">
						To ensure a successful connection, please check following:
					</Typography>
				</Grid>
				<Grid item>
					<LedgerHelpStepsErrorSection />
				</Grid>
				<Grid item>
					<Grid container direction="column" justify="center" alignItems="stretch">
						<Grid item>
							<LWSButtonPrimary onClick={handleRetry}>TRY AGAIN</LWSButtonPrimary>
						</Grid>
						<Grid item>
							<LWSButtonSecondary onClick={handleBack}>BACK</LWSButtonSecondary>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	</Grid>
));

export default LedgerConnectionError;
