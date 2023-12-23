import { useState, useEffect, FunctionComponent, useCallback } from "react"
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

type VoidLambda = () => void;

type ChildProps = {
	updateOne: VoidLambda,
	updateTwo: VoidLambda
}

function Child(props: ChildProps) {
	useEffect(() => {
	  props.updateOne();
	}, [props.updateOne]);
  
	useEffect(() => {
	  props.updateTwo();
	}, [props.updateTwo]);
  
	return <View/>
  }

const Callback: FunctionComponent = () => {
	const [counter, setCounter] = useState(0);
	const [counterTwo, setCounterTwo] = useState(0);

	const updateOne = () => {
		console.log(
			"Я не мемоизирован"
		);
	};

	const updateTwo = useCallback(() => {
		console.log(
			"Я мемоизирован!"
		);
	}, [counter]);

	return (
		<View>
			<Button onPress={() => setCounter(counter + 1)} title="No memo" />
			<Button onPress={() => setCounterTwo(counterTwo + 1)} title="With memo"/>
			<Child updateOne ={updateOne} updateTwo ={updateTwo} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	}
});

export default Callback;
