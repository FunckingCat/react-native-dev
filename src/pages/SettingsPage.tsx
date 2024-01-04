import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default () => {

	const lapsProgress = useSharedValue(4);
	const lapsMin = useSharedValue(0);
	const lapsMax = useSharedValue(10);

	const activeProgress = useSharedValue(60);
	const activeMin = useSharedValue(0);
	const activeMax = useSharedValue(120);

	const activeBreathProgress = useSharedValue(2);
	const activeBreathMin = useSharedValue(0);
	const activeBreathMax = useSharedValue(4);

	const inhaleProgress = useSharedValue(30);
	const inhaleMin = useSharedValue(0);
	const inhaleMax = useSharedValue(120);

	const exhaleProgress = useSharedValue(60);
	const exhaleMin = useSharedValue(0);
	const exhaleMax = useSharedValue(120);
  
	return (
		<>
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={styles.container}>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Laps ammount: {lapsProgress.value}</Text>
					<Slider
						style={styles.progress}
						progress={lapsProgress}
						minimumValue={lapsMin}
						maximumValue={lapsMax}
						/>
				</View>

				<View  style={styles.inputContainer}>
					<Text style={styles.label}>Active faze duration (seconds): {activeProgress.value}</Text>
					<Slider
						style={styles.progress}
						progress={activeProgress}
						minimumValue={activeMin}
						maximumValue={activeMax}
						/>
				</View>

				<View  style={styles.inputContainer}>
					<Text style={styles.label}>Active faze breath duration (seconds): {activeBreathProgress.value}</Text>
					<Slider
						style={styles.progress}
						progress={activeBreathProgress}
						minimumValue={activeBreathMin}
						maximumValue={activeBreathMax}
						/>
				</View>

				<View  style={styles.inputContainer}>
					<Text style={styles.label}>Inhale hold faze duration (seconds): {inhaleProgress.value}</Text>
					<Slider
						style={styles.progress}
						progress={inhaleProgress}
						minimumValue={inhaleMin}
						maximumValue={inhaleMax}
						/>
				</View>

				<View  style={styles.inputContainer}>
					<Text style={styles.label}>Exhale hold faze duration (seconds): {exhaleProgress.value}</Text>
					<Slider
						style={styles.progress}
						progress={exhaleProgress}
						minimumValue={exhaleMin}
						maximumValue={exhaleMax}
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
        </GestureHandlerRootView>
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
	  marginBottom: 18,
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
		padding: 20,
		borderRadius: 15
	},
	controlsContainer: {
		marginTop: 35,
		paddingHorizontal: 35,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	progress: {

	}
  });
  
