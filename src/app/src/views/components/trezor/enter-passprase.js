import React from 'react';
import { withStyles, Grid, Typography, InputAdornment, Input } from '@material-ui/core';
import { LWSButtonPrimary, LWSButtonSecondary } from '../lws-button';
import { VisibilityOffIcon, VisibilityOnIcon } from 'selfkey-ui';
const styles = theme => ({
	fullWidth: { width: '100%' }
});

export const TrezorEnterPassprase = withStyles(styles)(
	({
		classes,
		onEnter,
		onBack,
		visibility = false,
		error = '',
		onPasspraseChange,
		onRePasspraseChange,
		onVisibility
	}) => (
		<Grid container direction="column" justify="flex-start" alignItems="center" spacing={40}>
			<Grid item>
				<Typography variant="h1">Please Enter Your Passphrase.</Typography>
			</Grid>
			<Grid item>
				<Typography variant="h3">Note that your passphrase is case-sensitive.</Typography>
			</Grid>
			<Grid item className={classes.fullWidth}>
				<Grid
					container
					direction="column"
					justify="flex-start"
					alignItems="stretch"
					spacing={8}
				>
					<Grid item>
						<Typography variant="overline" gutterBottom>
							PASSPHRASE
						</Typography>
					</Grid>
					<Grid item fullWidth>
						<Input
							fullWidth
							error={error !== ''}
							endAdornment={
								<InputAdornment position="start" className={classes.pointer}>
									<div onClick={onVisibility}>
										{visibility ? <VisibilityOffIcon /> : <VisibilityOnIcon />}
									</div>
								</InputAdornment>
							}
							type={visibility ? 'text' : 'password'}
							onChange={onPasspraseChange}
						/>
					</Grid>
				</Grid>
			</Grid>

			<Grid item className={classes.fullWidth}>
				<Grid
					container
					direction="column"
					justify="flex-start"
					alignItems="stretch"
					spacing={8}
				>
					<Grid item>
						<Typography variant="overline" gutterBottom>
							RECONFIRM PASSPHRASE
						</Typography>
					</Grid>
					<Grid item>
						<Input
							fullWidth
							error={error !== ''}
							endAdornment={
								<InputAdornment position="start" className={classes.pointer}>
									<div onClick={onVisibility}>
										{visibility ? <VisibilityOffIcon /> : <VisibilityOnIcon />}
									</div>
								</InputAdornment>
							}
							type={visibility ? 'text' : 'password'}
							onChange={onRePasspraseChange}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				{error !== '' && (
					<Typography variant="subtitle2" color="error" gutterBottom>
						{error}
					</Typography>
				)}
			</Grid>
			<Grid item className={classes.fullWidth}>
				<Grid container direction="column" justify="flex-start" alignItems="stretch">
					<Grid item>
						<LWSButtonPrimary onClick={onEnter}>ENTER</LWSButtonPrimary>
					</Grid>
					<Grid item>
						<LWSButtonSecondary onClick={onBack}>Back</LWSButtonSecondary>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
);

export default TrezorEnterPassprase;
