import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class ItemComponent extends Component {
	static propTypes = {
		items: PropTypes.array.isRequired
	};

	render() {
		return (
			<View>
				{this.props.items.map((item, index) => {
					return (
						<View key={index}>
							<Text style={styles.itemtext}>{item.name}</Text>
			</View>
					);
				})}
			</View>
		);
	}
}
