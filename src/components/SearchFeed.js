import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import PollingPost from './PollingPost';
import {type_id, url} from './Constants';
import BalancePost from './BalancePost';
import BattleBlock from './BattleBlock';

function SearchFeed({navigation, searchWord}) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(100);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [pageMax, setPageMax] = useState();

  const onEndReached = () => {
    if (!loading && page < pageMax) {
      console.log('Paging (postLoad)' + (page + 1));
      GetData(page + 1);
    }
  };

  const GetData = async page_index => {
    /*setLoading(true);
    fetch(url.postLoad + type + '/' + page_index)
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
      });*/
  };

  useEffect(() => {
    setPage(0);
    GetData(0);
  }, [searchWord]);

  return (
    <View style={styles.block}>
      <FlatList
        data={json.posts}
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
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

const json = {
  posts: [
    {
      postId: 'pid_27',
      postType: 'polling',
      posterImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: 'wfkNicOi9kfZ4teQ87AHR1ubwsF3',
      posterId: '쓰디쓴 카멜레온',
      timeBefore: 35886,
      userCount: 2,
      storyText: '오늘 저녁은?',
      selection: [
        {
          selectionId: 'sid_65',
          text: '피자',
          image: null,
        },
        {
          selectionId: 'sid_66',
          text: '치킨',
          image: null,
        },
      ],
      likes: 0,
      comments: 0,
    },
    {
      postId: 'pid_26',
      postType: 'polling',
      posterImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: 'abH8tyqoNnbCq5No7QvwHGpESAQ2',
      posterId: '성가신 알파카',
      timeBefore: 35911,
      userCount: 2,
      storyText: '블랙핑크 최애 멤버는?',
      selection: [
        {
          selectionId: 'sid_61',
          text: '제니',
          image: null,
        },
        {
          selectionId: 'sid_62',
          text: '리사',
          image: null,
        },
        {
          selectionId: 'sid_63',
          text: '지수',
          image: null,
        },
        {
          selectionId: 'sid_64',
          text: '로제',
          image: null,
        },
      ],
      likes: 0,
      comments: 0,
    },
    {
      postId: 'pid_24',
      postType: 'polling',
      posterImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: 'abH8tyqoNnbCq5No7QvwHGpESAQ2',
      posterId: '성가신 알파카',
      timeBefore: 35915,
      userCount: 1,
      storyText: '탕수육은?',
      selection: [
        {
          selectionId: 'sid_57',
          text: '찍먹',
          image: null,
        },
        {
          selectionId: 'sid_58',
          text: '부먹',
          image: null,
        },
      ],
      likes: 0,
      comments: 0,
    },
    {
      postId: 'pid_23',
      postType: 'polling',
      posterImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: 'M6ScmGf7jNgDCfCMdMWrtLnO2wg1',
      posterId: '희망찬 쥐',
      timeBefore: 36025,
      userCount: 2,
      storyText: '더 싫은 선생님 유형은?',
      selection: [
        {
          selectionId: 'sid_55',
          text: '진도 안 나가는 쌤',
          image: null,
        },
        {
          selectionId: 'sid_56',
          text: '수업 안 끝내주는 쌤',
          image: null,
        },
      ],
      likes: 0,
      comments: 0,
    },
    {
      postId: 'pid_22',
      postType: 'polling',
      posterImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: '0000000000000000000000000003',
      posterId: '아니꼬운 스컹크',
      timeBefore: 36381,
      userCount: 2,
      storyText: '펩시? 코카? 조용히 남기고 가자.',
      selection: [
        {
          selectionId: 'sid_53',
          text: '펩시',
          image: null,
        },
        {
          selectionId: 'sid_54',
          text: '코카',
          image: null,
        },
      ],
      likes: 0,
      comments: 2,
    },
    {
      postId: 'pid_21',
      postType: 'polling',
      posterImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: '0000000000000000000000000002',
      posterId: '귀여운 너구리',
      timeBefore: 36382,
      userCount: 5,
      storyText: '강아지냐, 고양이냐 그것이 문제로다!',
      selection: [
        {
          selectionId: 'sid_51',
          text: '강아지',
          image: null,
        },
        {
          selectionId: 'sid_52',
          text: '고양이',
          image: null,
        },
      ],
      likes: 0,
      comments: 4,
    },
  ],
};
export default SearchFeed;
