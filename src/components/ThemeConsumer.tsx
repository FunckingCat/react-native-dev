import { useState, useEffect, useContext } from "react"
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
import ThemeContext from "./ThemeContext";

export default function ThemeConsumer() {

	const theme = useContext(ThemeContext);
  
	return (
	  <View>
		<Text> Theme: {theme}</Text>
	  </View>
	);
	
  };