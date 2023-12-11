import React, {Component} from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	View,
	Text,
	Button,
	StyleSheet,
} from 'react-native';

type RootStackParamList = {
	Profile: undefined,
	Statistics: undefined
};

type Props = {
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export default function(props: Props): JSX.Element {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style = {styles.header}>Pomadoro Screen</Text>
			<Button title="Go to Profile" onPress={() => props.navigation.navigate('Profile')}/>
			<Button title="Go to Statistics" onPress={() => props.navigation.navigate('Statistics')}/>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		fontSize: 30,
		marginBottom: 30
	}
});