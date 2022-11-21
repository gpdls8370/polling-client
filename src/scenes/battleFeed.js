import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import TopBar from '../components/TopBar';
import Feed from '../components/Feed';
import {type_id} from '../components/Constants';

function battleFeed({navigation}) {
  return (
    <SafeAreaView style={styles.block}>
      <TopBar navigation={navigation} type={type_id.battle} />
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginHorizontal: 7,
          marginBottom: 10,
          paddingBottom: 20,
          borderWidth: 1,
          borderRadius: 20,
          backgroundColor: 'white',
        }}>
        <Feed navigation={navigation} type={type_id.battle} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default battleFeed;
