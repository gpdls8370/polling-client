import React from 'react';
import {View, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigation_id} from './Constants';
import mainFeed from '../scenes/mainFeed';
import testScene from '../scenes/testScene';

function BottomBar() {}

const styles = StyleSheet.create({
  block: {
    height: 64,
    backgroundColor: 'red',
  },
});

export default BottomBar;
