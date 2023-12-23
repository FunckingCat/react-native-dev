import { useState } from "react"
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

export default function Counter() {
	const [count, setCount] = useState<number>(0);
	return (
	  <View style={styles.container}>
		<Text>useStae: {count}</Text>
		<Button onPress={() => setCount(0)} title="Сброс"/>
		<Button onPress={() => setCount(prevCount => prevCount - 1)} title="-"/>
		<Button onPress={() => setCount(prevCount => prevCount + 1)} title="+"/>
	  </View>
	);
  }


const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	}
});