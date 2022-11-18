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
import BattlePost from './BattlePost';

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
      ) : type !== type_id.battle ? (
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
            ) : null
          }
        />
      ) : (
        /*<FlatList
          data={battle}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.7}
          ListFooterComponent={
            loading && (
              <ActivityIndicator
                style={{alignItems: 'center', justifyContent: 'center'}}
              />
            )
          }
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({item}) => (
            <BattlePost
              navigation={navigation}
              postId={item.postId}
              timeLeft={item.timeLeft}
              userCount={item.userCount}
              selection={item.selection}
            />
          )}
        />*/
        <BattlePost
          navigation={navigation}
          postId={battle[0].postId}
          timeLeft={battle[0].timeLeft}
          userCount={battle[0].userCount}
          selection={battle[0].selection}
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

const battle = [
  {
    postId: 1,
    timeLeft: 52,
    userCount: 252,
    selection: [{text: '부먹'}, {text: '찍먹'}], //선택지 내용
  },
  {
    postId: 2,
    timeLeft: 60,
    userCount: 375,
    selection: [{text: '버스'}, {text: '전철'}], //선택지 내용
  },
  {
    postId: 3,
    timeLeft: 26,
    userCount: 183,
    selection: [{text: '민초파'}, {text: '반민초파'}], //선택지 내용
  },
];

export default Feed;
