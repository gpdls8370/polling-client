import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import PollingPost from './PollingPost';
import {type_id, url} from './Constants';
import BalancePost from './BalancePost';
import BattleBlock from './BattleBlock';

function Feed({navigation, type}) {
  const [postJson, setPostJson] = useState({posts: []});
  const [page, setPage] = useState(0);
  const pageCount = 3;

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const feedLoading = async () => {
    if (page < pageCount) {
      console.log('Paging (postLoad)' + type);
      setLoading(true);
      await GetData(page);
      setLoading(false);
    }
  };

  const getRefreshData = async () => {
    console.log('Refreshing (postLoad)');
    setRefreshing(true);
    setPage(0);
    await feedLoading();
    setRefreshing(false);
  };

  const onEndReached = () => {
    if (!loading) {
      console.log('pageUp');
      setPage(page + 1);
      feedLoading();
    }
  };

  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };

  const GetData = async page_index => {
    console.log(page_index);
    fetch(url.postLoad + type + '/' + page_index)
      .then(res => res.json())
      .then(json => {
        setPostJson(json);
      });
  };

  useEffect(() => {
    onRefresh();
  }, [type]);

  return (
    <SafeAreaView style={styles.block}>
      {loading == true ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={postJson.posts}
          onEndReached={onEndReached}
          //onEndReachedThreshold={0.7}
          ListFooterComponent={
            loading && (
              <ActivityIndicator
                style={{alignItems: 'center', justifyContent: 'center'}}
              />
            )
          }
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({item}) =>
            type == type_id.polling ? (
              <PollingPost
                navigation={navigation}
                postType={type}
                postId={item.postId}
                timeBefore={item.timeBefore}
                userCount={item.userCount}
                storyText={item.storyText}
                selection={item.selection}
                likes={item.likes}
                comments={item.comments}
              />
            ) : type == type_id.balance ? (
              <BalancePost
                navigation={navigation}
                postType={type}
                posterId={item.posterId}
                postId={item.postId}
                timeBefore={item.timeBefore}
                userCount={item.userCount}
                storyText={item.storyText}
                selection={item.selection}
                likes={item.likes}
                comments={item.comments}
              />
            ) : type == type_id.battle ? (
              <BattleBlock
                navigation={navigation}
                postId={item.postId}
                timeLeft={item.timeLeft}
                userCount={item.userCount}
                selection={item.selection}
              />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Feed;
