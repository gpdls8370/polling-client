import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {type_color, url} from './Constants';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import {showNetworkError} from './ToastManager';

function MakePollInputTag({
  type,
  selectedTag,
  onClickTagButton,
  contextString,
}) {
  const [uuid] = useRecoilState(uuidState);
  const [searchTag, setSearchTag] = useState('');

  useEffect(() => {
    searchTagPost('');
  }, []);

  const searchTagPost = tag => {
    return fetch(url.searchTag, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        tag: tag,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(function (data) {
        setTagList(data.tagList);
        console.log(data.tagList);
      })
      .catch(function (error) {
        showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const recommendTagPost = data => {
    return fetch(url.recommendTag, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        poll_name: data,
      }), // body data type must match "Content-Type" header
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(function (data) {
        setTagList(data.tagList);
        console.log(data.tagList);
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const [tagList, setTagList] = useState(null);

  const onClickSearchButton = () => {
    if (searchTag.length > 0) {
      searchTagPost(searchTag);
    } else {
      recommendTagPost(contextString);
    }
  };

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.pressable, backgroundColor]}>
      <Text style={[styles.buttonText, textColor]}>{item.tag}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor =
      item.tagId === selectedTag
        ? type_color.button_default
        : type_color.disablePressableButton;

    return (
      <Item
        item={item}
        onPress={() => onClickTagButton(item.tagId)}
        backgroundColor={{backgroundColor}}
        textColor={'white'}
      />
    );
  };

  return (
    <View style={styles.titleView}>
      <Text style={styles.titleText}>{display_text.title}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          returnKeyType={'search'}
          onChangeText={text => setSearchTag(text)}
          onSubmitEditing={() => onClickSearchButton()}
          placeholder={display_text.hint}
          placeholderTextColor={type_color.gray}
          keyboardType="default"
        />
        <Pressable
          onPress={() => onClickSearchButton()}
          style={[styles.button, {backgroundColor: type_color[type]}]}>
          <Text style={styles.buttonText}>
            {searchTag.length > 0
              ? display_text.search
              : display_text.recommend_button}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={tagList}
        renderItem={renderItem}
        keyExtractor={item => item.tagId}
        extraData={selectedTag}
        style={styles.pressableView}
        horizontal={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleView: {
    padding: 15,
  },
  inputView: {
    flexDirection: 'row',
  },
  pressableView: {
    marginTop: 10,
    marginBottom: 7,
    flexDirection: 'row',
  },
  titleText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    fontSize: 20,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
  },
  input: {
    flexDirection: 'row',
    flex: 1,
    textAlign: 'left',
    textAlignVertical: 'top',
    multiline: true,
    width: 'auto',
    height: 45,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#B1B1B1',
    padding: 15,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontFamily: 'BMJUA_ttf',
    color: 'white',
  },
  button: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    height: 35,
    width: 95,
    borderRadius: 10,
    marginStart: 13,
    paddingHorizontal: 9,
    paddingVertical: 8,
    elevation: 2,
  },
  pressable: {
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginRight: 21,
    elevation: 2,
    backgroundColor: type_color.disablePressableButton,
  },
});

const display_text = {
  title: '주제 태그 입력',
  hint: '직접 검색',
  recommend_button: '태그 추천',
  search: '검색',
};

export default MakePollInputTag;
