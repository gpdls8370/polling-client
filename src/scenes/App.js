import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import mainFeed from './mainFeed';
import testScene from './testScene';
import makePoll from './makePoll';
import {navigation_id, type_color} from '../components/Constants';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import balanceFeed from './balanceFeed';
import battleFeed from './battleFeed';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {RecoilRoot} from 'recoil';
import login from './login';
import signUp from './signUp';

const Tab = createMaterialTopTabNavigator();
function feedTabs() {
  return (
    <Tab.Navigator
      initialRouteName={navigation_id.mainFeed}
      tabBarPosition={'bottom'}
      screenOptions={{
        swipeEnable: true,
        tabBarStyle: {backgroundColor: '#FAFAFA'},
        tabBarItemStyle: {
          flexDirection: 'row',
        },
        tabBarIndicatorStyle: {backgroundColor: 'gray', height: 3},
      }}>
      <Tab.Screen
        name={navigation_id.balanceFeed}
        component={balanceFeed}
        options={{
          tabBarLabel: '밸런스',
          tabBarLabelStyle: {
            marginTop: 7,
            fontSize: 19,
            fontFamily: 'BMJUA_ttf',
            color: type_color.balance,
          },
          tabBarIcon: () => (
            <Icon2 name="scale-balance" color={type_color.balance} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={navigation_id.mainFeed}
        component={mainFeed}
        options={{
          tabBarLabel: '폴링',
          tabBarLabelStyle: {
            marginTop: 7,
            fontSize: 19,
            fontFamily: 'BMJUA_ttf',
            color: type_color.polling,
          },
          tabBarIcon: () => (
            <Icon name="check-circle" color={type_color.polling} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={navigation_id.battleFeed}
        component={battleFeed}
        options={{
          tabBarLabel: '전쟁',
          tabBarLabelStyle: {
            marginTop: 7,
            fontSize: 19,
            fontFamily: 'BMJUA_ttf',
            color: type_color.battle,
          },
          tabBarIcon: () => (
            <Icon name="flag" color={type_color.battle} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={feedTabs}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={navigation_id.Feeds} component={feedTabs} />
          <Stack.Screen name="test" component={testScene} />
          <Stack.Screen name={navigation_id.login} component={login} />
          <Stack.Screen name={navigation_id.signup} component={signUp} />
          <Stack.Screen name={navigation_id.makePoll} component={makePoll} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
