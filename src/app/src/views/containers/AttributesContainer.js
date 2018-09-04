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
	handleAllow = evt => {
		this.props.dispatch(attributesOperations.authWithAttrs());
	};
	handleCancel = evt => {
		this.props.dispatch(attributesOperations.clearAttributes());
	};
	render() {
		const { attributes, config, loading } = this.props;
		if (loading) return <LWSLoading />;
		return (
			<LWSRequiredInfo
				attributes={attributes}
				website={config.website}
				required={config.attributes}
				allowAction={this.handleAllow}
				cancelAction={this.handleCancel}
			/>
		);
	}
}

const ConnectedAttributesContainer = connect(state => ({
	attributes: attributesSelectors.getAttributes(state),
	config: appSelectors.getAppConfig(state),
	loading: attributesSelectors.getLoading(state)
}))(AttributesContainer);

export default ConnectedAttributesContainer;
