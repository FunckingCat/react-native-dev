import { useState, useEffect } from "react"
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

	const [timeLeft, setTimeLeft] = useState(60);
  
	useEffect(() => {

	  if (!timeLeft) return;
  
	  const intervalId = setInterval(() => {
		setTimeLeft(timeLeft - 1);
	  }, 1000);
  
	  return () => clearInterval(intervalId);

	}, [timeLeft]);
  
	return (
	  <View>
		<Text> Time left: {timeLeft}</Text>
	  </View>
	);
	
  };