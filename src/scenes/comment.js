import React, {useState} from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommentFeed from '../components/CommentFeed';
import TopBarBack from '../components/TopBarBack';
import {type_color, type_id} from '../components/Constants';
import PollingPostBlock from '../components/PollingPostBlock';

function comment({navigation, route}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <TopBarBack
        navigation={navigation}
        type={route.params.postType}
        optionalTitle={'댓글'}
      />
      <View style={[styles.block, {marginTop: 15}]}>
        <PollingPostBlock
          postId={route.params.postId}
          postType={route.params.postType}
          timeBefore={route.params.timeBefore}
          userCount={route.params.userCount}
          storyText={route.params.storyText}
          selection={route.params.selection}
          voteActive={false}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: type_color.gray,
          borderRadius: 10,
        }}>
        <CommentFeed />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    marginHorizontal: 10,
    marginBottom: 15,
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: type_color.gray,
    borderRadius: 10,
  },
});

export default comment;
