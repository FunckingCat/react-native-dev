/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BreathPage from './src/pages/BreathPage';
import SettingsPage from './src/pages/SettingsPage';
import StatisticsPage from './src/pages/StatisticsPage';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Breath"
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: 90,
            paddingTop: 15
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Breath') {
              iconName = 'smileo';
            } else if (route.name === 'Settings') {
              iconName = 'setting';
            } else {
              iconName = 'barschart';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Settings" component={SettingsPage} />
        <Tab.Screen name="Breath" component={BreathPage} />
        <Tab.Screen name="Statistics" component={StatisticsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
