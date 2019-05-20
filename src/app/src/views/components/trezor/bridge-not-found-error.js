import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { LWSButtonPrimary, LWSButtonSecondary } from '../lws-button';
import { TrezorBridgeIcon } from 'selfkey-ui';

const styles = theme => ({
	body: {
		textAlign: 'center'
	}
});

export const TrezorBridgeNotFoundError = withStyles(styles)(({ classes, onRetry, onBack }) => (
	<Grid container direction="column" justify="flex-start" alignItems="center" spacing={40}>
		<Grid item>
			<TrezorBridgeIcon />
		</Grid>
		<Grid item className={classes.body}>
			<Grid container direction="column" justify="center" alignItems="stretch" spacing={24}>
				<Grid item>
					<Typography variant="h1">Please Install Trezor Bridge</Typography>
				</Grid>
				<Grid item>
					<Typography variant="body1">
						Trezor Bridge is required so that the SelfKey Identity Wallet can
						communicate with your device. It is an official application released by the
						Trezor team available to download below. Please restart the application
						after installation.
					</Typography>
				</Grid>
				<Grid item>
					<Grid
						container
						direction="row"
						justify="space-around"
						alignItems="center"
						spacing={8}
					>
						<Grid item>
							<br />
							<br />
							<Typography variant="h3">URL:</Typography>
							<Typography variant="subtitle1">
								https://wallet.trezor.io/#/bridge
							</Typography>
						</Grid>
						<Grid item>
							<LWSButtonSecondary
								onClick={e => {
									window.open('https://wallet.trezor.io/#/bridge');
								}}
							>
								Download
							</LWSButtonSecondary>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
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
		</Grid>
	</Grid>
));

export default TrezorBridgeNotFoundError;
