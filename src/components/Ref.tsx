import { useState, useRef } from 'react';
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

export default function Stopwatch() {
  const [startTime, setStartTime] = useState<number>(0);
  const [now, setNow] = useState<number>(0);
  const intervalRef = useRef<any>();

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);

  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <View>
      <Text>Time passed: {secondsPassed.toFixed(3)}</Text>
      <Button onPress={handleStart} title='Start'/> 
      <Button onPress={handleStop} title='Stop'/>
    </View>
  );
}
