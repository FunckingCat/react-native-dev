import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { View, StyleSheet, Button, TouchableHighlight, TouchableOpacity, Text } from "react-native";
import CircularProgress, { CircularProgressBase, ProgressRef } from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/AntDesign';
import Sound from 'react-native-sound';

const metronom = require('../../resourses/one_hit_metronom.mp3');

type PhazeName = 'active' | 'exhalationHold' | 'inhalationHold';

type Phaze = {
	name: PhazeName,
	nextPhaze: PhazeName,
	duration: number[]
}

type State = {
	playbackStatus: 'play' | 'pause'
	lap: number
	phase: Phaze
}

type Action = {
	type: 'reset' | 'playbackStatus' | 'phazeComplete'
	value: State
};

type SessionSetting = {
    lapsCount: number;
    phazes: Phaze[];
}

type ProgressBarProps = {
	value: number,
	maxValue: number,
	duration: number
}

const sessionSettings: SessionSetting = {
	lapsCount: 3,
	phazes: [
		{
			name: 'active',
			nextPhaze: 'exhalationHold',
			duration: [10, 10, 10]
		},
		{
			name: 'exhalationHold',
			nextPhaze: 'inhalationHold',
			duration: [20, 60, 90]
		},
		{
			name: 'inhalationHold',
			nextPhaze: 'active',
			duration: [5, 5, 5]
		}
	]
}

const initialState: State = {
	playbackStatus: 'pause',
	phase: sessionSettings.phazes[0],
	lap: 0
}

const playSound = (sound: any) => {
	const whoosh = new Sound(sound, (error) => {
		if (error) {
		  console.log('failed to load the sound', error);
		  return;
		}
		console.log('duration in seconds: ' + whoosh.getDuration() + ' number of channels: ' + whoosh.getNumberOfChannels());
	  
		whoosh.play((success) => {
		  if (success) {
			console.log('successfully finished playing');
		  } else {
			console.log('playback failed due to audio decoding errors');
		  }
		});
	  });
}

const reducer = (state: State, action: Action): State => {
	const { type, value } = action;
	console.log("ACTION: ", type, value);
	switch (type) {
	  case 'playbackStatus':
		return { ...state, playbackStatus: value.playbackStatus }
	case "phazeComplete":
		const nextPhaze = sessionSettings.phazes.filter(phaze => phaze.name === value.phase.nextPhaze)[0]
		return { ...state, phase: nextPhaze}
	case "reset":
		return initialState;
	default:
		return state;
	}
};

export default () => {

	const progressRef = useRef<ProgressRef>(null);

	const [store, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		progressRef.current?.pause()
	}, []);

	const reset = () => {
		dispatch({type: 'reset', value: {...store}})
		progressRef.current?.pause()
	}

	const play = () => {
		dispatch({type: 'playbackStatus', value: {...store, playbackStatus: 'play' }})
		progressRef.current?.play()
	}

	const pause = () => {
		dispatch({type: 'playbackStatus', value: {...store, playbackStatus: 'pause' }})
		progressRef.current?.pause()
	}

	const phazeComplete = () => {
		dispatch({type: 'phazeComplete', value: {...store}})
		progressRef.current?.reAnimate();
	}

	const progressProps: ProgressBarProps = {
		value: store.phase.duration[store.lap],
		maxValue: store.phase.duration[store.lap],
		duration: store.phase.duration[store.lap] * 1000
	}

	console.log(store.phase.duration[store.lap], " PBP: ", progressProps)

	return <View style = {styles.container}>
		<View style = {styles.reloadContainer}>
			<TouchableOpacity onPress={reset}>
				<Icon name={'reload1'} size={30} color={'#293133'} />
			</TouchableOpacity>
		</View>
		<CircularProgress
			ref={progressRef}
			value={progressProps.value}
			maxValue={progressProps.maxValue}
			duration={progressProps.duration}
			onAnimationComplete={phazeComplete}
			radius={150}
			activeStrokeColor={'#293133'}
			inActiveStrokeColor={'#A5A5A5'}
			/>
		<View style = {styles.playContainer}>
			{
				store.playbackStatus === 'pause'
					?	<TouchableOpacity onPress={play}>
							<Icon name={'caretright'} size={40} color={'#293133'} />
						</TouchableOpacity>
					:	<TouchableOpacity onPress={pause}>
							<Icon name={'pause'} size={40} color={'#293133'} />
						</TouchableOpacity>
			}
		</View>
		<View></View>
	</View>;
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 20,
		height: "100%"
	},
	reloadContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	playContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	}
});
