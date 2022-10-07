import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import mainFeed from './mainFeed';
import testScene from './testScene';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="mainFeed"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="mainFeed" component={mainFeed} />
        <Stack.Screen name="test" component={testScene} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
