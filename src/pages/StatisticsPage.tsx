import { Text, StyleSheet, View } from "react-native";

export default () => {
	return <View style={styles.container}>
		<Text>Comming soon</Text>
	</View>;
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		height: "100%"
	}
});
