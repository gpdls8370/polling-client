import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import PollingPost from './PollingPost';
import {type_color, type_font, type_id, url} from './Constants';
import BalancePost from './BalancePost';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';

function MyPollFeed({navigation, type}) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(100);
  const [loading, setLoading] = useState(false);
  const [pageMax, setPageMax] = useState();

  const [uuid] = useRecoilState(uuidState);

  const onEndReached = () => {
    if (!loading && page < pageMax) {
      console.log('Paging (postLoad)' + (page + 1));
      GetData(page + 1);
    }
  };

  const GetData = async page_index => {
    setLoading(true);
    fetch(url.myPolls + uuid + '/' + type + '/' + page_index)
      .then(res => res.json())
      .then(json => {
        if (page_index == 0) {
          setPosts(json.posts);
        } else {
          setPosts([...posts, ...json.posts]);
          setPage(page + 1);
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
    setPage(0);
    GetData(0);
  }, [type]);

  return (
    <View style={styles.block}>
      {!loading && posts.length == 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 60,
          }}>
          <Text style={[styles.alertText, {color: type_color.gray}]}>
            등록된 투표가 없습니다
          </Text>
          <Text style={styles.alertText}>투표를 만들어보세요!</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.7}
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
          renderItem={({item}) =>
            item.postType == type_id.polling ? (
              <PollingPost
                navigation={navigation}
                postType={item.postType}
                postId={item.postId}
                timeBefore={item.timeBefore}
                userCount={item.userCount}
                storyText={item.storyText}
                selection={item.selection}
                likes={item.likes}
                comments={item.comments}
                posterUuid={item.posterUuid}
              />
            ) : item.postType == type_id.balance ? (
              <BalancePost
                navigation={navigation}
                postType={item.postType}
                posterId={item.posterId}
                postId={item.postId}
                timeBefore={item.timeBefore}
                userCount={item.userCount}
                storyText={item.storyText}
                selection={item.selection}
                likes={item.likes}
                comments={item.comments}
                posterUuid={item.posterUuid}
              />
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  alertText: {
    fontSize: 20,
    fontFamily: type_font.ggodic80,
    color: type_color.balance,
    marginVertical: 5,
  },
});

export default MyPollFeed;
