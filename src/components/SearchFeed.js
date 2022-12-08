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

function SearchFeed({navigation, searchWord}) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(100);
  const [loading, setLoading] = useState(false);

  const [pageMax, setPageMax] = useState();

  const onEndReached = () => {
    if (!loading && page < pageMax) {
      console.log('Paging (postLoad)' + (page + 1));
      GetData(page + 1);
    }
  };

  const GetData = async page_index => {
    setLoading(true);
    fetch(url.search, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchWord: searchWord,
        page_index: page_index,
      }),
    })
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
    setPage(0);
    GetData(0);
    setPageMax(100);
  }, [searchWord]);

  return (
    <View style={styles.block}>
      {posts.length == 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.alertText}>검색 결과가 없습니다</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.7}
          disableVirtualization={false}
          ListFooterComponent={
            loading && (
              <ActivityIndicator
                style={{alignItems: 'center', justifyContent: 'center'}}
              />
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
  },
});

export default SearchFeed;
