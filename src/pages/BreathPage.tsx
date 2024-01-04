import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { View, StyleSheet, Button, TouchableHighlight, TouchableOpacity, Text } from "react-native";
import CircularProgress, { CircularProgressBase, ProgressRef } from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/AntDesign';
import Sound from 'react-native-sound';

const metronom = require('../../resourses/one_hit_metronom.mp3');
const gong = require('../../resourses/gong.mp3');

type PlaybackStatus = 'play' | 'pause';

type PhazeName = 'Active' | 'Exhalation hold' | 'Inhalation hold';

type Phaze = {
	name: PhazeName,
	hint: string,
	nextPhaze: PhazeName,
	duration: number[]
}

type State = {
	playbackStatus: PlaybackStatus
	lap: number
	phase: Phaze
	timeLeft: number
}

type Action = {
	type: 'reset'| 'phazeComplete' | 'tick' | 'playbackStatus'
	value: State
};

type SessionSetting = {
    lapsCount: number;
    phazes: Phaze[];
}

const sessionSettings: SessionSetting = {
	lapsCount: 4,
	phazes: [
		{
			name: 'Active',
			hint: 'Inhale and exhale in a given rhythm',
			nextPhaze: 'Exhalation hold',
			duration: [10, 10, 10, 10]
		},
		{
			name: 'Exhalation hold',
			hint: 'Hold your breath as you exhale',
			nextPhaze: 'Inhalation hold',
			duration: [10, 15, 25, 30]
		},
		{
			name: 'Inhalation hold',
			hint: 'Hold your breath as you inhale',
			nextPhaze: 'Active',
			duration: [5, 8, 10, 12]
		}
	]
}

const initialState: State = {
	playbackStatus: 'pause',
	phase: sessionSettings.phazes[0],
	lap: 0,
	timeLeft: sessionSettings.phazes[0].duration[0]
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

const getIconName = (key: number, lap: number) => {
	if (key === lap) return 'smile-circle';
	if (key < lap) return 'meho';
	return 'meh';
}

const reducer = (state: State, action: Action): State => {
	const { type, value } = action;
	console.log("ACTION: ", type, value);
	switch (type) {
	case 'playbackStatus':
		return {...state, playbackStatus: value.playbackStatus}
	case 'tick':
		return { ...state, timeLeft: state.timeLeft - 1}
	case "phazeComplete":
		const nextPhaze = sessionSettings.phazes.filter(phaze => phaze.name === value.phase.nextPhaze)[0];
		const lap = nextPhaze.name === 'Active' ? state.lap + 1 : state.lap;
		if (lap === sessionSettings.lapsCount) {
			return initialState;
		}
		return { ...state, phase: nextPhaze, timeLeft: nextPhaze.duration[state.lap], lap: lap}
	case "reset":
		return initialState;
	default:
		return state;
	}
};

export default () => {

	const [store, dispatch] = useReducer(reducer, initialState);

	const play = () => {
		dispatch({type: 'playbackStatus', value: {...store, playbackStatus: 'play'}})
	}

	const pause = () => {
		dispatch({type: 'playbackStatus', value: {...store, playbackStatus: 'pause'}})
	}

	const reset = () => {
		dispatch({type: 'reset', value: {...store}})
	}

	const phazeComplete = () => {
		dispatch({type: 'phazeComplete', value: store})
	}

	useEffect(() => {
  
	  const intervalId = setInterval(() => {
		if (store.playbackStatus === 'pause') {
			return;
		} else if (store.timeLeft === 0) {
			playSound(gong);
			phazeComplete();
		} else {
			store.timeLeft % 2 === 0 && store.phase.name === 'Active' && playSound(metronom);
			dispatch({type: 'tick', value: store})
		};
	  }, 1000);
  
	  return () => clearInterval(intervalId);

	});

	return <View style = {styles.container}>
		<View style = {styles.reloadContainer}>
			<TouchableOpacity onPress={reset}>
				<Icon name={'reload1'} size={30} color={'#293133'} />
			</TouchableOpacity>
			<TouchableOpacity onPress={phazeComplete}>
				<Icon name={'forward'} size={30} color={'#293133'} />
			</TouchableOpacity>
		</View>
		<View style = {styles.progressContainer}>
			<View style = {styles.textContainer}>
				<Text style = {styles.phazeName}>{store.phase.name}</Text>
				<Text style = {styles.phazeHint}>{store.phase.hint}</Text>
			</View>
			<CircularProgress
				value={((store.phase.duration[store.lap] - store.timeLeft) / store.phase.duration[store.lap]) * 100}
				progressFormatter={(value: number) => {'worklet'; return store.timeLeft}}
				maxValue={100}
				duration={1000}
				radius={150}
				activeStrokeColor={'#293133'}
				inActiveStrokeColor={'#A5A5A5'}
				/>
			<View style = {styles.lapsContainer}>
				{
					Array.from(Array(sessionSettings.lapsCount).keys())
						.map((item, index) => <Icon key={index} name={getIconName(index, store.lap)} size={20} color={'#293133'} />)
				}
			</View>
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
		justifyContent: "space-between",
	},
	textContainer: {
		marginBottom: 20,
	},
	phazeName: {
		textAlign: 'center',
		fontSize: 35
	},
	phazeHint: {
		textAlign: 'center',
		fontSize: 20	},
	playContainer: {
		marginTop: 20
	},
	progressContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100%"
	},
	lapsContainer: {
		marginTop: 20,
		width: 100,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
});
