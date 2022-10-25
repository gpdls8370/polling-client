import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {type_color} from './Constants';

function MakePollInputTag({selectedTag, onClickTagButton}) {
  const [searchTag, setSearchTag] = useState('');

  const DATA = ['동물', '일상', '로스트아크', 'KPOP', '웹툰']; //TODO 삭제

  const [tagList, setTagList] = useState(DATA);

  const onClickSearchButton = () => {
    //TODO 검색 및 태그 추천 기능 구현
  };

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.pressable, backgroundColor]}>
      <Text style={[styles.buttonText, textColor]}>{item}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor =
      item === selectedTag
        ? type_color.button_default
        : type_color.disablePressableButton;

    return (
      <Item
        item={item}
        onPress={() => onClickTagButton(item)}
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
          keyboardType="default"
        />
        <Pressable onPress={() => onClickSearchButton()} style={styles.button}>
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
        keyExtractor={(item, index) => item[index]}
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
    backgroundColor: type_color.makePoll,
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
