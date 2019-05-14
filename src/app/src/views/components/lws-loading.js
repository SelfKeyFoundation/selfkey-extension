import React from 'react';
import { AnimatedLoadingIcon } from 'selfkey-ui';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
	loading: {
		minHeight: '300px',
		textAlign: 'center',
		lineHeight: '300px',
		'& svg circle': {
			fill: '#1CA9BA'
		}
	}
});

export const LWSLoading = withStyles(styles)(({ classes }) => (
	<div className={classes.loading}>
		<AnimatedLoadingIcon />
	</div>
));

export default LWSLoading;
