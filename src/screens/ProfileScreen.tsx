import React, {Component} from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	View,
	Text,
	Button,
	StyleSheet,
} from 'react-native';

type RootStackParamList = {
	Notifications: undefined
};

type Props = {
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export default function(props: Props): JSX.Element {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style = {styles.header}>Profile Screen</Text>
			<Button title="Go to notifications" onPress={() => props.navigation.navigate('Notifications')}/>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		fontSize: 30,
		marginBottom: 30
	}
});