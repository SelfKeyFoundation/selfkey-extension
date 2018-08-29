import React, { Component } from 'react';
import { connect } from 'react-redux';

class AttributesContainer extends Component {
	render() {
		return <div>Attributes</div>;
	}
}

const ConnectedAttributesContainer = connect()(AttributesContainer);

export default ConnectedAttributesContainer;
