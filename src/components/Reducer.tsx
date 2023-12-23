import { useReducer, FunctionComponent } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Button,
	TextInput
  } from 'react-native';

  enum CountActionKind {
	INCREASE = 'INCREASE',
	DECREASE = 'DECREASE',
  }
  
  interface CountAction {
	type: CountActionKind;
	payload: number;
  }
  
  interface CountState {
	count: number;
  }
  
  function counterReducer(state: CountState, action: CountAction) {
	const { type, payload } = action;
	switch (type) {
	  case CountActionKind.INCREASE:
		return {
		  ...state,
		  count: state.count + payload,
		};
	  case CountActionKind.DECREASE:
		return {
		  ...state,
		  count: state.count - payload,
		};
	  default:
		return state;
	}
  }
  
const Counter: FunctionComponent = () => {
	const [state, dispatch] = useReducer(counterReducer, { count: 0 });
	return (
	  <View style={styles.container}>
		<Text>useReducer: {state.count}</Text>
		<Button onPress={() => dispatch({ type: CountActionKind.DECREASE, payload: 5 })} title='-'/>
		<Button onPress={() => dispatch({ type: CountActionKind.INCREASE, payload: 5 })} title='+'/>
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

export default Counter;