import { useState, useMemo } from "react"
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

type Func = (n: number) => number;

const sum: Func = n => {
	console.log("Sum call");
	return n + n
 };

const MemoComponent = () => {
  const [num, setNum] = useState(1);
  const [isGreen, setIsGreen] = useState(true);
  const result = useMemo(() => sum(num), [num]);
 
 return (
    <View style = {styles.container}>
      <Button 
	  	onPress={() => setIsGreen(!isGreen)}
		title="Change color"
      />
      <Text style = {isGreen ? styles.green : styles.red}>
        Sum {result}
      </Text>
      <Button onPress={() => setNum(num + 1)} title="+"/>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	green: {
		color: "green"
	},
	red: {
		color: "red"
	}
});

export default MemoComponent;