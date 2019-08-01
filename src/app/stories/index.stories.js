import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { ShieldIcon, ProfileIcon } from 'selfkey-ui';

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
	LWSSelfkeyDIDError,
	LWSSuccess,
	LWSWalletConnectionError,
	LedgerHelpStepsSection,
	LedgerHelpStepsErrorSection,
	LedgerConnect,
	LedgerConnecting,
	LedgerConnectionError,
	TrezorHelpStepsSection,
	TrezorConnect,
	TrezorConnecting,
	TrezorBridgeNotFoundError,
	TrezorConnectionError,
	TrezorEnterPassprase,
	TrezorEnterPin,
	HardwareWalletAuthDeclined,
	HardwareWalletAuthError,
	HardwareWalletAuthUnlock,
	HardwareWalletAuthTimer,
	HardwareWalletAuthTimeout
} from '../src/views/components';

storiesOf('Common', module)
	.add('Button', () => (
		<div>
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
		</div>
	))
	.add('Error', () => (
		<div>
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
		</div>
	))
	.add('Loading', () => (
		<div>
			<LWSLoading />
		</div>
	));

storiesOf('Auth', module)
	.add('Success', () => (
		<div>
			<LWSSuccess />
		</div>
	))
	.add('Error', () => (
		<div>
			<LWSAuthError
				website={{
					name: 'PaveziCoin',
					url: 'http://www.pavezicoin.org',
					termsUrl: 'http://www.pavezicoin.org/terms',
					policyUrl: 'http://www.pavezicoin.org/privacy'
				}}
				retryAction={action('retry clicked')}
			/>
		</div>
	));

storiesOf('Unlock', module)
	.add('SelectWallet', () => (
		<div>
			<LWSSelectWallet
				wallets={[
					{
						publicKey: '0x4184288c556524df9cb9e58b73265ee66dca4efe',
						unlocked: true,
						name: 'test1',
						profile: 'local'
					},
					{
						publicKey: '0x4184288c556524df9cb9e58b73265ee66dca4ef2',
						unlocked: false,
						profile: 'local'
					}
				]}
				loginAction={action('login clicked')}
				onLedgerConnect={action('ledger connect clicked')}
				onTrezorConnect={action('trezor connect clicked')}
			/>
		</div>
	))
	.add('Id Error', () => (
		<div>
			<LWSSelfkeyIdError />
		</div>
	))
	.add('DID Error', () => (
		<div>
			<LWSSelfkeyDIDError />
		</div>
	));

storiesOf('Ledger', module)
	.add('Help Steps section', () => (
		<div>
			<LedgerHelpStepsSection />
		</div>
	))
	.add('Help Steps section error', () => (
		<div>
			<LedgerHelpStepsErrorSection />
		</div>
	))
	.add('Connect', () => (
		<div>
			<LedgerConnect onConnectClick={action('ledger connect click')} />
		</div>
	))
	.add('Connecting', () => (
		<div>
			<LedgerConnecting handleBack={action('ledger connecting back click')} />
		</div>
	))
	.add('Connection Error', () => (
		<div>
			<LedgerConnectionError
				handleRetry={action('ledger connection error retry click')}
				handleBack={action('ledger connection error back click')}
			/>
		</div>
	));

storiesOf('Trezor', module)
	.add('Help Steps section', () => (
		<div>
			<TrezorHelpStepsSection />
		</div>
	))
	.add('Connect', () => (
		<div>
			<TrezorConnect onConnectClick={action('trezor connect click')} />
		</div>
	))
	.add('Connection error', () => (
		<div>
			<TrezorConnectionError
				onRetry={action('trezor connection error retry')}
				onBack={action('trezor connection error back')}
			/>
		</div>
	))
	.add('Connecting', () => (
		<div>
			<TrezorConnecting onBack={action('trezor connecting back')} />
		</div>
	))
	.add('Bridge not found error', () => (
		<div>
			<TrezorBridgeNotFoundError
				onRetry={action('trezor bridge retry')}
				onBack={action('trezor bridge back')}
			/>
		</div>
	));

storiesOf('Trezor/Enter Pin')
	.add('default', () => (
		<div>
			<TrezorEnterPin
				onEnter={action('trezor pin enter')}
				onBack={action('trezor pin back')}
				onPinClick={action('trezor pin click')}
				onClear={action('trezor pin clear')}
			/>
		</div>
	))
	.add('value', () => (
		<div>
			<TrezorEnterPin
				onEnter={action('trezor pin enter')}
				onBack={action('trezor pin back')}
				onPinClick={action('trezor pin click')}
				onClear={action('trezor pin clear')}
				pin="12324"
			/>
		</div>
	))

	.add('error', () => (
		<div>
			<TrezorEnterPin
				onEnter={action('trezor pin enter')}
				onBack={action('trezor pin back')}
				onPinClick={action('trezor pin click')}
				onClear={action('trezor pin clear')}
				error="Super Error"
			/>
		</div>
	));

storiesOf('Trezor/Enter Password')
	.add('default', () => (
		<div>
			<TrezorEnterPassprase
				onEnter={action('trezor passprasse enter')}
				onBack={action('trezor passprasse back')}
				onPasspraseChange={action('trezor passprasse change')}
				onRePasspraseChange={action('trezor passprasse repeat change')}
				onVisibility={action('trezor passprasse visibility change')}
			/>
		</div>
	))
	.add('visibility', () => (
		<div>
			<TrezorEnterPassprase
				onEnter={action('trezor passprasse enter')}
				onBack={action('trezor passprasse back')}
				onPasspraseChange={action('trezor passprasse change')}
				onRePasspraseChange={action('trezor passprasse repeat change')}
				onVisibility={action('trezor passprasse visibility change')}
				visibility={true}
			/>
		</div>
	))
	.add('error', () => (
		<div>
			<TrezorEnterPassprase
				onEnter={action('trezor passprasse enter')}
				onBack={action('trezor passprasse back')}
				onPasspraseChange={action('trezor passprasse change')}
				onRePasspraseChange={action('trezor passprasse repeat change')}
				onVisibility={action('trezor passprasse visibility change')}
				error="Super Error"
			/>
		</div>
	));

storiesOf('HD Auth/Ledger', module)
	.add('declined ', () => (
		<div>
			<HardwareWalletAuthDeclined
				walletType="ledger"
				onOk={action('hd auth ledger declined ok')}
			/>
		</div>
	))
	.add('error ', () => (
		<div>
			<HardwareWalletAuthError
				walletType="ledger"
				onBack={action('hd auth ledger error back')}
			/>
		</div>
	))
	.add('unlock ', () => (
		<div>
			<HardwareWalletAuthUnlock
				walletType="ledger"
				onBack={action('hd auth ledger unlock back')}
			/>
		</div>
	))
	.add('timer ', () => (
		<div>
			<HardwareWalletAuthTimer
				walletType="ledger"
				onBack={action('hd auth ledger timer back')}
			/>
		</div>
	))
	.add('timeout ', () => (
		<div>
			<HardwareWalletAuthTimeout
				walletType="ledger"
				onBack={action('hd auth ledger timeout back')}
			/>
		</div>
	));

storiesOf('HD Auth/Trezor', module)
	.add('declined ', () => (
		<div>
			<HardwareWalletAuthDeclined
				walletType="trezor"
				onOk={action('hd auth trezor declined ok')}
			/>
		</div>
	))
	.add('error ', () => (
		<div>
			<HardwareWalletAuthError
				walletType="trezor"
				onBack={action('hd auth trezor error back')}
			/>
		</div>
	))
	.add('unlock ', () => (
		<div>
			<HardwareWalletAuthUnlock
				walletType="trezor"
				onBack={action('hd auth trezor unlock back')}
			/>
		</div>
	))
	.add('timer ', () => (
		<div>
			<HardwareWalletAuthTimer
				walletType="trezor"
				onBack={action('hd auth trezor trezor back')}
			/>
		</div>
	))
	.add('timeout ', () => (
		<div>
			<HardwareWalletAuthTimeout
				walletType="trezor"
				onBack={action('hd auth trezor timeout back')}
			/>
		</div>
	));

storiesOf('Attributes', module)
	.add('Checklist', () => (
		<div>
			<LWSRequiredInfo
				attributes={[
					{
						uiId: '1',
						schemaId: 'http://platform.selfkey.org/schema/attribute/first-name.json',
						options: [
							{ id: 1, value: 'Test1', name: 'First Name 1' },
							{ id: 4, value: 'Test12', name: 'First Name 2' }
						],
						title: 'Name',
						schema: {
							$id: 'http://platform.selfkey.org/schema/attribute/first-name.json',
							$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
							identityAttribute: true,
							identityAttributeRepository:
								'http://platform.selfkey.org/repository.json',
							title: 'First Name',
							description: "An individual's first (given) name.",
							type: 'string'
						},
						id: 'first_name'
					},
					{
						uiId: '2',
						schemaId: 'http://platform.selfkey.org/schema/attribute/last-name.json',
						options: [
							{ id: 2, value: 'Test2', name: 'Last namee 1' },
							{ id: 5, value: 'Test22', name: 'Last namee 2' }
						],
						selected: 1,
						title: 'Last Name',
						schema: {
							$id: 'http://platform.selfkey.org/schema/attribute/last-name.json',
							$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
							identityAttribute: true,
							identityAttributeRepository:
								'http://platform.selfkey.org/repository.json',
							title: 'Last Name',
							description: "An individual's last (family) name.",
							type: 'string'
						},
						id: 'last_name'
					},
					{
						uiId: '3',
						schemaId: 'http://platform.selfkey.org/schema/attribute/birth-date.json',
						options: [
							{ id: 3, value: { day: 1, month: 2, year: 1991 }, name: 'Birth Date' }
						],
						title: 'Birth Day',
						schema: {
							$id: 'http://platform.selfkey.org/schema/attribute/la˝st-name.json',
							$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
							identityAttribute: true,
							identityAttributeRepository:
								'http://platform.selfkey.org/repository.json',
							title: 'Birtdate',
							description: "An individual's last (family) name.",
							type: 'string'
						},
						id: 'birthdate'
					}
				]}
				notAllowedAttributes={[
					'http://platform.selfkey.org/schema/attribute/birth-date.json'
				]}
				disallowAttributeAction={(attribute, disallow) => {
					alert(attribute.key + ' ' + disallow);
				}}
				onOptionSelected={action('attribute option selected')}
				website={{
					name: 'PaveziCoin',
					url: 'http://www.pavezicoin.org',
					termsUrl: 'http://www.pavezicoin.org/terms',
					policyUrl: 'http://www.pavezicoin.org/privacy'
				}}
			/>
		</div>
	))
	.add('Checklist DID required', () => (
		<div>
			<LWSRequiredInfo
				didRequired={true}
				did="did:selfkey:test-did-here"
				attributes={[
					{
						uiId: '1',
						schemaId: 'http://platform.selfkey.org/schema/attribute/first-name.json',
						options: [
							{ id: 1, value: 'Test1', name: 'First Name 1' },
							{ id: 4, value: 'Test12', name: 'First Name 2' }
						],
						title: 'Name',
						schema: {
							$id: 'http://platform.selfkey.org/schema/attribute/first-name.json',
							$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
							identityAttribute: true,
							identityAttributeRepository:
								'http://platform.selfkey.org/repository.json',
							title: 'First Name',
							description: "An individual's first (given) name.",
							type: 'string'
						},
						id: 'first_name'
					},
					{
						uiId: '2',
						schemaId: 'http://platform.selfkey.org/schema/attribute/last-name.json',
						options: [
							{ id: 2, value: 'Test2', name: 'Last namee 1' },
							{ id: 5, value: 'Test22', name: 'Last namee 2' }
						],
						selected: 1,
						title: 'Last Name',
						schema: {
							$id: 'http://platform.selfkey.org/schema/attribute/last-name.json',
							$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
							identityAttribute: true,
							identityAttributeRepository:
								'http://platform.selfkey.org/repository.json',
							title: 'Last Name',
							description: "An individual's last (family) name.",
							type: 'string'
						},
						id: 'last_name'
					},
					{
						uiId: '3',
						schemaId: 'http://platform.selfkey.org/schema/attribute/birth-date.json',
						options: [
							{ id: 3, value: { day: 1, month: 2, year: 1991 }, name: 'Birth Date' }
						],
						title: 'Birth Day',
						schema: {
							$id: 'http://platform.selfkey.org/schema/attribute/la˝st-name.json',
							$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
							identityAttribute: true,
							identityAttributeRepository:
								'http://platform.selfkey.org/repository.json',
							title: 'Birtdate',
							description: "An individual's last (family) name.",
							type: 'string'
						},
						id: 'birthdate'
					}
				]}
				notAllowedAttributes={[
					'http://platform.selfkey.org/schema/attribute/birth-date.json'
				]}
				disallowAttributeAction={(attribute, disallow) => {
					alert(attribute.key + ' ' + disallow);
				}}
				onOptionSelected={action('attribute option selected')}
				website={{
					name: 'PaveziCoin',
					url: 'http://www.pavezicoin.org',
					termsUrl: 'http://www.pavezicoin.org/terms',
					policyUrl: 'http://www.pavezicoin.org/privacy'
				}}
			/>
		</div>
	))
	.add('Checklist DID required error', () => (
		<div>
			<LWSRequiredInfo
				didRequired={true}
				attributes={[
					{
						uiId: '1',
						schemaId: 'http://platform.selfkey.org/schema/attribute/first-name.json',
						options: [
							{ id: 1, value: 'Test1', name: 'First Name 1' },
							{ id: 4, value: 'Test12', name: 'First Name 2' }
						],
						title: 'Name',
						schema: {
							$id: 'http://platform.selfkey.org/schema/attribute/first-name.json',
							$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
							identityAttribute: true,
							identityAttributeRepository:
								'http://platform.selfkey.org/repository.json',
							title: 'First Name',
							description: "An individual's first (given) name.",
							type: 'string'
						},
						id: 'first_name'
					},
					{
						uiId: '2',
						schemaId: 'http://platform.selfkey.org/schema/attribute/last-name.json',
						options: [
							{ id: 2, value: 'Test2', name: 'Last namee 1' },
							{ id: 5, value: 'Test22', name: 'Last namee 2' }
						],
						selected: 1,
						title: 'Last Name',
						schema: {
							$id: 'http://platform.selfkey.org/schema/attribute/last-name.json',
							$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
							identityAttribute: true,
							identityAttributeRepository:
								'http://platform.selfkey.org/repository.json',
							title: 'Last Name',
							description: "An individual's last (family) name.",
							type: 'string'
						},
						id: 'last_name'
					},
					{
						uiId: '3',
						schemaId: 'http://platform.selfkey.org/schema/attribute/birth-date.json',
						options: [
							{ id: 3, value: { day: 1, month: 2, year: 1991 }, name: 'Birth Date' }
						],
						title: 'Birth Day',
						schema: {
							$id: 'http://platform.selfkey.org/schema/attribute/la˝st-name.json',
							$schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
							identityAttribute: true,
							identityAttributeRepository:
								'http://platform.selfkey.org/repository.json',
							title: 'Birtdate',
							description: "An individual's last (family) name.",
							type: 'string'
						},
						id: 'birthdate'
					}
				]}
				notAllowedAttributes={[
					'http://platform.selfkey.org/schema/attribute/birth-date.json'
				]}
				disallowAttributeAction={(attribute, disallow) => {
					alert(attribute.key + ' ' + disallow);
				}}
				onOptionSelected={action('attribute option selected')}
				website={{
					name: 'PaveziCoin',
					url: 'http://www.pavezicoin.org',
					termsUrl: 'http://www.pavezicoin.org/terms',
					policyUrl: 'http://www.pavezicoin.org/privacy'
				}}
			/>
		</div>
	));

storiesOf('Wallet connection').add('Connection Error', () => (
	<div>
		<LWSWalletConnectionError
			downloadWalletAction={action('download wallet')}
			retryAction={action('retry connecting')}
		/>
	</div>
));
