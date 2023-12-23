import { useState, useLayoutEffect } from "react"
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Button
  } from 'react-native';

export default function Timer() {

	const [timeLeft, setTimeLeft] = useState(0);
  
	useLayoutEffect(() => {
  
	  const intervalId = setInterval(() => {
		setTimeLeft(timeLeft + 1);
	  }, 1000);
  
	  return () => clearInterval(intervalId);

	}, [timeLeft]);
  
	return (
	  <View>
		<Text> Time left: {timeLeft}</Text>
	  </View>
	);
	
  };