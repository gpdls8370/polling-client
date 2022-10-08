import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import mainFeed from './mainFeed';
import testScene from './testScene';
import makePoll from "./makePoll";
import {navigation_id} from "../components/Constants";

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={navigation_id.mainFeed}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={navigation_id.mainFeed} component={mainFeed} />
        <Stack.Screen name="test" component={testScene} />
        <Stack.Screen name={navigation_id.makePoll} component={makePoll} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
