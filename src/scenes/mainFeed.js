import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import Feed from '../components/Feed';
import {type_id} from "../components/Constants";

function mainFeed({navigation}) {
  return (
    <SafeAreaView style={styles.block}>
      <TopBar navigation={navigation} type={type_id.polling} />
      <Feed />
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default mainFeed;
