import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


export default () => {

	const [circleCount, setCircleCount] = useState('3');
	const [breathDuration, setBreathDuration] = useState('5');
  
	const saveSettings = () => {
	  console.log('Настройки сохранены:', { circleCount, breathDuration });
	};
  
	return (
		<>
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Laps ammount:</Text>
					<TextInput
					style={styles.input}
					value={circleCount}
					onChangeText={(text) => setCircleCount(text)}
					keyboardType="numeric"
					/>
				</View>

				<View  style={styles.inputContainer}>
					<Text style={styles.label}>Active faze duration (seconds):</Text>
					<TextInput
					style={styles.input}
					value={breathDuration}
					onChangeText={(text) => setBreathDuration(text)}
					keyboardType="numeric"
					/>
				</View>
		
				<View style = {styles.controlsContainer}>
					<TouchableOpacity onPress={() => {}}>
						<Icon name={'reload1'} size={30} color={'#293133'} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {}}>
						<Icon name={'save'} size={30} color={'#293133'} />
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  padding: 16,
	  justifyContent: 'center',
	},
	label: {
	  fontSize: 16,
	  marginBottom: 8,
	},
	input: {
	  height: 40,
	  borderColor: 'gray',
	  borderWidth: 1,
	  marginBottom: 16,
	  padding: 8,
	},
	inputContainer: {
		marginVertical: 10,
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 15
	},
	controlsContainer: {
		marginTop: 35,
		paddingHorizontal: 35,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
  });
  
