import React from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core';
import { CheckIcon, CheckEmptyIcon, EditTransparentIcon, AttributeAlertIcon } from 'selfkey-ui';
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
		padding: '0 0 30px',
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
	}
});

const getAttributeValue = attribute => {
	if (!attribute.value) return null;
	if (typeof attribute.value !== 'object') return attribute.value;
	return attribute.name || attribute.schema.title || attribute.url;
};

const renderAttributes = (
	requested,
	attributes,
	notAllowedAttributes,
	classes,
	disallowAttributeAction,
	editAction
) => {
	let attrs = requested.map(attr => {
		if (typeof attr !== 'object') {
			attr = { attribute: attr };
		}
		let found = _.find(attributes, { url: attr.id || attr.attribute }) || {};
		let merged = { ...attr, ...found };
		if (!merged.label && merged.schema && merged.schema.title) {
			merged.label = merged.schema.title;
		}
		return merged;
	});
	return attrs.map((attribute, index) => {
		const attributeValue = getAttributeValue(attribute);
		const notAllowed = notAllowedAttributes.includes(attribute.url);

		if (attributeValue) {
			return (
				<div key={index}>
					<div className={classes.attribute}>
						<span
							className={classes.clickable}
							onClick={() => disallowAttributeAction(attribute, !notAllowed)}
						>
							{notAllowed ? <CheckEmptyIcon /> : <CheckIcon />}
						</span>
						<dl>
							<dt>{attribute.label || attribute.schema.title}</dt>
							<dd>{attributeValue}</dd>
						</dl>
					</div>
				</div>
			);
		} else {
			return (
				<div key={index}>
					<div className={classes.attribute}>
						<AttributeAlertIcon />
						<dl>
							<dt>{attribute.label}</dt>
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
		requested,
		cancelAction,
		editAction,
		attributes,
		notAllowedAttributes = [],
		website,
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
			<div className={classes.form}>
				{renderAttributes(
					requested,
					attributes,
					notAllowedAttributes,
					classes,
					disallowAttributeAction,
					editAction
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
					<LWSButtonPrimary onClick={allowAction}>Allow</LWSButtonPrimary>
				</div>
			</div>
		</div>
	)
);

export default LWSRequiredInfo;
