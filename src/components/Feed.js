import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  View,
} from 'react-native';
import PollingPost from './PollingPost';
import {type_id, url} from './Constants';
import BalancePost from './BalancePost';
import BattleBlock from './BattleBlock';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import {
  balanceRefreshState,
  battlesRefreshState,
  pollingRefreshState,
} from './Atoms';

function Feed({navigation, type}) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(100);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [uuid] = useRecoilState(uuidState);
  const [pollingRefresh] = useRecoilState(pollingRefreshState);
  const [balanceRefresh] = useRecoilState(balanceRefreshState);
  const [battlesRefresh] = useRecoilState(battlesRefreshState);
  const [pageMax, setPageMax] = useState();

  const getRefreshData = async () => {
    console.log('Refreshing (postLoad)' + type);
    setPosts([]);
    setRefreshing(true);
    setPage(0);
    setPageMax(100);
    await GetData(0);
    setRefreshing(false);
  };

  const onEndReached = () => {
    if (!loading && page < pageMax) {
      console.log('Paging (postLoad)' + type + (page + 1));
      GetData(page + 1);
    }
  };

  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };

  const GetData = async page_index => {
    setLoading(true);
    fetch(url.postLoad + uuid + '/' + type + '/' + page_index)
      .then(res => res.json())
      .then(json => {
        if (page_index == 0) {
          setPosts(json.posts);
        } else {
          setPosts([...posts, ...json.posts]);
          setPage(page + 1);
          //setPosts(posts.concat(json.posts));
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('last page');
        setPageMax(page);
      });
  };

  useEffect(() => {
    if (uuid != null && type == type_id.polling) {
      onRefresh();
    }
  }, [pollingRefresh, uuid]);

  useEffect(() => {
    if (uuid != null && type == type_id.balance) {
      onRefresh();
    }
  }, [balanceRefresh, uuid]);

  useEffect(() => {
    if (uuid != null && type == type_id.battle) {
      onRefresh();
    }
  }, [battlesRefresh, uuid]);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <View style={styles.block}>
      <FlatList
        data={posts}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        disableVirtualization={false}
        ListFooterComponent={
          loading && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator />
            </View>
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
              posterUuid={item.posterUuid}
            />
          ) : type == type_id.balance ? (
            <BalancePost
              navigation={navigation}
              postType={type}
              posterId={item.posterId}
              posterImage={item.posterImage}
              postId={item.postId}
              timeBefore={item.timeBefore}
              userCount={item.userCount}
              storyText={item.storyText}
              selection={item.selection}
              likes={item.likes}
              comments={item.comments}
              posterUuid={item.posterUuid}
            />
          ) : type == type_id.battle ? (
            <BattleBlock
              navigation={navigation}
              postId={item.postId}
              timeLeft={item.timeLeft}
              userCount={item.userCount}
              textA={item.textA}
              textB={item.textB}
            />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    marginTop: 15,
  },
});

export default Feed;
