import React from 'react';
import { withStyles, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import {
	CheckIcon,
	CheckEmptyIcon,
	EditTransparentIcon,
	AttributeAlertIcon,
	error
} from 'selfkey-ui';
import { LWSButtonPrimary, LWSButtonSecondary } from './lws-button';

const styles = theme => ({
	form: {
		minHeight: '300px'
	},
	requiredInfo: {
		'& a': {
			color: '#23E6FE',
			textDecoration: 'none',
			'&:hover': {
				textDecoration: 'underline'
			}
		},
		fontFamily: 'Lato, arial, sans-serif'
	},

	areaTitle: {
		textAlign: 'center',
		'& h4': {
			fontSize: '16px',
			fontWeight: 'normal',
			padding: '0 0 40px',
			margin: '0',
			lineHeight: '22px',
			textAlign: 'left',
			color: '#FFF'
		}
	},

	attribute: {
		display: 'flex',
		flexDirection: 'row',
		padding: '0 0 30px 0',
		color: '#FFF',
		'& svg': {
			flex: '20px'
		},
		'& dl': {
			display: 'flex',
			justifyContent: 'space-between',
			width: '100%',
			margin: '0 0 0 15px',
			'& dd': {
				color: '#93B0C1',
				wordBreak: 'break-word',
				textAlign: 'right'
			}
		}
	},

	did: {
		width: '100%',
		padding: '0 0 30px 0',
		boxSizing: 'border-box',
		color: '#FFF',
		'& dd': {
			color: '#93B0C1',
			wordBreak: 'break-word',
			marginTop: '10px',
			fontSize: '11px'
		}
	},

	didRequired: {
		textAlign: 'center',
		color: error,
		fontWeight: 700,
		padding: '0px 33px 0'
	},

	clickable: {
		cursor: 'pointer'
	},

	waringMessage: {
		color: '#FFA700',
		fontSize: '13px',
		marginTop: '-20px',
		padding: '0 0 20px 35px'
	},

	formSubmitColumn: {
		flexDirection: 'row',
		display: 'flex',
		justifyContent: 'space-between',
		'& button': {
			maxWidth: '215px',
			marginTop: '0px',
			fontWeight: 700
		}
	},

	tocMessage: {
		background: '#293743',
		padding: '20px',
		fontSize: '12px',
		lineHeight: '15px',
		fontStyle: 'italic',
		fontFamily: 'Lato, arial, sans-serif',
		margin: '30px 0 45px',
		color: '#FFF'
	},

	edit: {
		cursor: 'pointer'
	},
	radioGroup: {
		backgroundColor: 'transparent',
		marginBottom: 0,
		paddingTop: '10px',
		'& > label': {
			marginRight: '0px !important'
		}
	},
	formControlLabel: {
		'& span': {
			fontSize: '14px',
			lineHeight: '17px'
		}
	},
	required: {
		color: error
	}
});

const getAttributeValue = ({ value, name }) => {
	if (!value) return null;
	if (typeof value !== 'object') return value;
	return name;
};

const canSubmit = ({ did, didRequired, attributes = [], notAllowedAttributes = [] }) => {
	if (didRequired && !did) {
		return false;
	}

	return attributes.reduce((allowed, curr) => {
		if (!allowed || !curr.required) return allowed;
		if (!curr.options || !curr.options.length) return false;
		return !notAllowedAttributes.includes(curr.uiId);
	}, true);
};

const renderAttributes = (
	attributes,
	notAllowedAttributes,
	classes,
	disallowAttributeAction,
	editAction,
	onOptionSelected
) => {
	return attributes.map(attribute => {
		let { title, uiId, options, selected = 0, required } = attribute;
		options = options || [];
		const notAllowed = notAllowedAttributes.includes(uiId);

		if (options.length === 1) {
			return (
				<div key={uiId}>
					<div className={classes.attribute}>
						<span
							className={classes.clickable}
							onClick={() => disallowAttributeAction(attribute, !notAllowed)}
						>
							{notAllowed ? <CheckEmptyIcon /> : <CheckIcon />}
						</span>
						<dl>
							<dt>
								{title}
								{required ? (
									<span className={notAllowed ? classes.required : null}>
										{' '}
										(required)
									</span>
								) : (
									''
								)}
							</dt>
							<dd>{getAttributeValue(options[0])}</dd>
						</dl>
					</div>
				</div>
			);
		} else if (options.length > 1) {
			return (
				<div key={uiId}>
					<div className={classes.attribute}>
						<span
							className={classes.clickable}
							onClick={() => disallowAttributeAction(attribute, !notAllowed)}
						>
							{notAllowed ? <CheckEmptyIcon /> : <CheckIcon />}
						</span>
						<dl>
							<dt>
								{title}
								{required ? (
									<span className={notAllowed ? classes.required : null}>
										{' '}
										(required)
									</span>
								) : (
									''
								)}
							</dt>
							<dd>
								<RadioGroup
									className={classes.radioGroup}
									value={selected}
									onChange={evt => onOptionSelected(uiId, +evt.target.value)}
								>
									{options.map((opt, indx) => (
										<FormControlLabel
											key={indx}
											value={indx}
											control={<Radio />}
											label={opt.name}
											className={classes.formControlLabel}
										/>
									))}
								</RadioGroup>
							</dd>
						</dl>
					</div>
				</div>
			);
		} else {
			return (
				<div key={uiId}>
					<div className={classes.attribute}>
						<AttributeAlertIcon />
						<dl>
							<dt>
								{title}
								{required ? (
									<span className={classes.required}> (required)</span>
								) : (
									''
								)}
							</dt>
							{editAction ? (
								<dd>
									<a onClick={editAction} className={classes.edit}>
										<EditTransparentIcon />
									</a>
								</dd>
							) : null}
						</dl>
					</div>
					<div className={classes.waringMessage}>Please update your missing details.</div>
				</div>
			);
		}
	});
};

export const LWSRequiredInfo = withStyles(styles)(
	({
		classes,
		allowAction,
		didRequired,
		did,
		cancelAction,
		editAction,
		attributes,
		notAllowedAttributes = [],
		website,
		onOptionSelected = () => {},
		disallowAttributeAction = () => {}
	}) => (
		<div className={classes.requiredInfo}>
			<div className={classes.areaTitle}>
				<h4>
					<a href={website.url} target="_blank" rel="noopener noreferrer">
						<strong>{website.name}</strong>
					</a>{' '}
					would like to access this information:
				</h4>
			</div>
			{didRequired && !did ? (
				<div className={classes.didRequired}>
					Selfkey DID required for this website. Please create it in Selfkey Identity
					Wallet.
				</div>
			) : (
				''
			)}
			{didRequired && did ? (
				<dl className={classes.did}>
					<dt>DID</dt>
					<dd>{did}</dd>
				</dl>
			) : (
				''
			)}
			<div className={classes.form}>
				{renderAttributes(
					attributes,
					notAllowedAttributes,
					classes,
					disallowAttributeAction,
					editAction,
					onOptionSelected
				)}

				<div className={classes.tocMessage}>
					By clicking &quot;Allow&quot;, your information listed above will be used by{' '}
					<a href={website.url} target="_blank" rel="noopener noreferrer">
						{website.name}
					</a>{' '}
					with respect to their{' '}
					<a href={website.termsUrl} target="_blank" rel="noopener noreferrer">
						Terms of Service
					</a>{' '}
					and{' '}
					<a href={website.policyUrl} target="_blank" rel="noopener noreferrer">
						Privacy Policy
					</a>
					.
				</div>
				<div className={classes.formSubmitColumn}>
					<LWSButtonSecondary onClick={cancelAction}>Cancel</LWSButtonSecondary>
					<LWSButtonPrimary
						onClick={allowAction}
						disabled={
							!canSubmit({ did, didRequired, attributes, notAllowedAttributes })
						}
					>
						Allow
					</LWSButtonPrimary>
				</div>
			</div>
		</div>
	)
);

export default LWSRequiredInfo;
