import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PomadoroScreen from './src/screens/PomadoroScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import StatisticsScreen from './src/screens/StatisticsScreen'
import NotificationsScreen from './src/screens/NotificationsScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const NativeStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="Pomadoro" component={PomadoroScreen} />
    <Stack.Screen name="Statistics" component={StatisticsScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

const AnotherStackScreen = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="Pomadoro" component={PomadoroScreen} />
    <NativeStack.Screen name="Statistics" component={StatisticsScreen} />
    <NativeStack.Screen name="Profile" component={ProfileScreen} />
    <NativeStack.Screen name="Notifications" component={NotificationsScreen} />
  </NativeStack.Navigator>
);

const TabStackScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Notifications" component={NotificationsScreen} />
  </Tab.Navigator>
);

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="NativeHome" component={AnotherStackScreen} />
        <Drawer.Screen name="Settings" component={TabStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
