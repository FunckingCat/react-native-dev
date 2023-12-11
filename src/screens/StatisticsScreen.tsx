import React, {Component} from 'react';
import {
	View, 
	Text, 
	StyleSheet,
} from 'react-native';

export default class extends Component {
	render(): JSX.Element {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Statistics Screen</Text>
		  	</View>
		  );
	}
}

const styles = StyleSheet.create({

});