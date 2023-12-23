/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, createContext, useContext } from 'react';
import type {PropsWithChildren} from 'react';
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
import Counter from './src/components/Counter';
import Timer from './src/components/Timer';
import ThemeContext from './src/components/ThemeContext';
import ThemeConsumer from './src/components/ThemeConsumer';
import Reducer from './src/components/Reducer';
import Callback from './src/components/Callback';
import Memo from './src/components/Memo';
import Ref from './src/components/Ref';
import LayoutEffect from './src/components/LayoutEffect';

function App(): JSX.Element {

  return (
    <SafeAreaView>
      <ThemeContext.Provider value="dark">
        <View style={styles.container}>
          <Counter/>
          <Timer/>
          <ThemeConsumer/>
          <Reducer/>
          <Callback/>
          <Memo/>
          <Ref/>
          <LayoutEffect/>
        </View>
      </ThemeContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});

export default App;
