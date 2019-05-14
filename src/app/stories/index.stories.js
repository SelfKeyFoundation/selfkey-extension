import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { SelfkeyDarkTheme, ShieldIcon, ProfileIcon } from 'selfkey-ui';

import {
	LWSAuthError,
	LWSButton,
	LWSButtonPrimary,
	LWSButtonSecondary,
	LWSButtonTertiary,
	LWSError,
	LWSLoading,
	LWSRequiredInfo,
	LWSSelectWallet,
	LWSSelfkeyIdError,
	LWSSuccess,
	LWSWalletConnectionError
} from '../src/views/components';

const WithTheme = ({ children }) => <SelfkeyDarkTheme>{children}</SelfkeyDarkTheme>;

storiesOf('Common', module)
	.add('Button', () => (
		<WithTheme>
			<br />
			<br />
			<LWSButtonPrimary onClick={action('Primary button clicked')}>
				Primary Button
			</LWSButtonPrimary>
			<br />
			<br />
			<LWSButtonSecondary onClick={action('Secondary button clicked')}>
				Secondary Button
			</LWSButtonSecondary>
			<br />
			<br />
			<LWSButton onClick={action('Generic button clicked')}>Generic Button</LWSButton>
			<br />
			<br />
			<LWSButtonTertiary onClick={action('tertialy button clicked')}>
				<ProfileIcon /> <span>Tertiary Button</span>
			</LWSButtonTertiary>
			<br />
			<br />
			<LWSButtonTertiary selected onClick={action('selected tertialy button clicked')}>
				<ProfileIcon /> <span>Selected Tertiary Button</span>
			</LWSButtonTertiary>
		</WithTheme>
	))
	.add('Error', () => (
		<WithTheme>
			<LWSError
				actionIcon={<ShieldIcon />}
				actionName="Generic Error"
				errorName={`Generic error name`}
				supportText="Generic error support name"
				actionButton={
					<LWSButtonSecondary onClick={action('generic error action')}>
						Generic Error Action
					</LWSButtonSecondary>
				}
			/>
		</WithTheme>
	))
	.add('Loading', () => (
		<WithTheme>
			<LWSLoading />
		</WithTheme>
	));

storiesOf('Auth', module)
	.add('Success', () => (
		<WithTheme>
			<LWSSuccess />
		</WithTheme>
	))
	.add('Error', () => (
		<WithTheme>
			<LWSAuthError
				website={{
					name: 'PaveziCoin',
					url: 'http://www.pavezicoin.org',
					termsUrl: 'http://www.pavezicoin.org/terms',
					policyUrl: 'http://www.pavezicoin.org/privacy'
				}}
				retryAction={action('retry clicked')}
			/>
		</WithTheme>
	));

storiesOf('Unlock', module)
	.add('SelectWallet', () => (
		<WithTheme>
			<LWSSelectWallet
				wallets={[
					{
						publicKey: '0x4184288c556524df9cb9e58b73265ee66dca4efe',
						unlocked: true,
						profile: 'local'
					},
					{
						publicKey: '0x4184288c556524df9cb9e58b73265ee66dca4ef2',
						unlocked: false,
						profile: 'local'
					}
				]}
				loginAction={action('login clicked')}
			/>
		</WithTheme>
	))
	.add('Id Error', () => (
		<WithTheme>
			<LWSSelfkeyIdError />
		</WithTheme>
	));

storiesOf('Attributes', module).add('Checklist', () => (
	<WithTheme>
		<LWSRequiredInfo
			requested={[
				{
					label: 'Name',
					key: 'first_name',
					attribute: 'http://platform.selfkey.org/schema/attribute/first-name.json'
				},
				{ label: 'Country', key: 'country' },
				{
					key: 'last_name',
					attribute: 'http://platform.selfkey.org/schema/attribute/last-name.json'
				},
				{
					label: 'Birth Day',
					key: 'birthdate',
					attribute: 'http://platform.selfkey.org/schema/attribute/birth-date.json'
				}
			]}
			attributes={[
				{
					url: 'http://platform.selfkey.org/schema/attribute/first-name.json',
					value: 'Test1',
					name: 'first_name',
					schema: {
						$id: 'http://platform.selfkey.org/schema/attribute/first-name.json',
						$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
						identityAttribute: true,
						identityAttributeRepository: 'http://platform.selfkey.org/repository.json',
						title: 'First Name',
						description: "An individual's first (given) name.",
						type: 'string'
					},
					id: 1
				},
				{
					url: 'http://platform.selfkey.org/schema/attribute/last-name.json',
					value: 'Test2',
					name: 'last_name',
					schema: {
						$id: 'http://platform.selfkey.org/schema/attribute/last-name.json',
						$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
						identityAttribute: true,
						identityAttributeRepository: 'http://platform.selfkey.org/repository.json',
						title: 'Last Name',
						description: "An individual's last (family) name.",
						type: 'string'
					},
					id: 2
				},
				{
					url: 'http://platform.selfkey.org/schema/attribute/birth-date.json',
					value: { day: 1, month: 2, year: 1991 },
					name: 'birthdate1',
					schema: {
						$id: 'http://platform.selfkey.org/schema/attribute/last-name.json',
						$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
						identityAttribute: true,
						identityAttributeRepository: 'http://platform.selfkey.org/repository.json',
						title: 'Birtdate',
						description: "An individual's last (family) name.",
						type: 'string'
					},
					id: 2
				}
			]}
			notAllowedAttributes={['http://platform.selfkey.org/schema/attribute/birth-date.json']}
			disallowAttributeAction={(attribute, disallow) => {
				alert(attribute.key + ' ' + disallow);
			}}
			website={{
				name: 'PaveziCoin',
				url: 'http://www.pavezicoin.org',
				termsUrl: 'http://www.pavezicoin.org/terms',
				policyUrl: 'http://www.pavezicoin.org/privacy'
			}}
		/>
	</WithTheme>
));

storiesOf('Wallet connection').add('Connection Error', () => (
	<WithTheme>
		<LWSWalletConnectionError
			downloadWalletAction={action('download wallet')}
			retryAction={action('retry connecting')}
		/>
	</WithTheme>
));
