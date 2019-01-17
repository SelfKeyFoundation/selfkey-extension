import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LWSRequiredInfo, LWSLoading } from 'selfkey-ui';
import { attributesSelectors, attributesOperations } from '../../state/attributes';
import { appSelectors } from '../../state/app';
class AttributesContainer extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		if (!this.props.attributes || !this.props.attributes.length) {
			dispatch(attributesOperations.loadAttributes());
		}
	}
	handleAuth = evt => {
		this.props.dispatch(attributesOperations.authWithAttrs());
	};
	handleDisallow = (attribute, disallow) => {
		console.log('handleDisallow', attribute, disallow);
		this.props.dispatch(attributesOperations.disallowAttributes(attribute.url, disallow));
	};
	handleCancel = evt => {
		this.props.dispatch(attributesOperations.clearAttributes());
	};
	render() {
		const { attributes, config, loading, disallowed } = this.props;
		if (loading) return <LWSLoading />;
		return (
			<LWSRequiredInfo
				attributes={attributes}
				notAllowedAttributes={disallowed}
				website={config.website}
				requested={config.attributes}
				allowAction={this.handleAuth}
				cancelAction={this.handleCancel}
				disallowAttributeAction={this.handleDisallow}
			/>
		);
	}
}

const ConnectedAttributesContainer = connect(state => ({
	attributes: attributesSelectors.getAttributes(state),
	config: appSelectors.getAppConfig(state),
	loading: attributesSelectors.getLoading(state),
	disallowed: attributesSelectors.getDisallowed(state)
}))(AttributesContainer);

export default ConnectedAttributesContainer;
