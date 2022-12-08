import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {type_color, type_font} from '../components/Constants';
import Icon from 'react-native-vector-icons/Feather';
import SearchFeed from '../components/SearchFeed';
import {showToast, toastType} from '../components/ToastManager';

function search({navigation}) {
  const [text, setText] = useState('');
  const [searchWord, setSearchWord] = useState('');

  function onPressEnter() {
    var pattern = /\s/g;
    if (text != '') {
      if (text.match(pattern)) {
        showToast(toastType.error, '공백은 입력할 수 없습니다.');
      } else {
        setSearchWord(text);
      }
    }
  }

  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <View style={styles.block}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 8,
            marginTop: 30,
            marginBottom: 20,
          }}>
          <View style={styles.writeBlock}>
            <Icon name={'search'} size={23} color={'black'} />
            <TextInput
              style={styles.textBox}
              placeholder="투표 내용 검색"
              onChangeText={newText => setText(newText)}
              defaultValue={text}
              returnKeyType={'search'}
              onSubmitEditing={onPressEnter}
              placeholderTextColor={type_color.gray}
            />
          </View>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cancleText}>취소</Text>
          </TouchableOpacity>
        </View>
        {searchWord == '' ? (
          <View style={styles.feedBlock}>
            <Text style={styles.alertText}>전체 투표 중에 검색합니다</Text>
          </View>
        ) : (
          <SearchFeed navigation={navigation} searchWord={searchWord} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  writeBlock: {
    flex: 1,
    flexDirection: 'row',
    height: 35,
    borderRadius: 15,
    marginRight: 5,
    paddingHorizontal: 5,
    backgroundColor: type_color.lightBackground,
    alignItems: 'center',
  },
  textBox: {
    paddingVertical: 5,
    marginLeft: 5,
    fontSize: 16,
    color: type_color.gray,
    fontStyle: type_font.ggodic60,
  },
  uploadButton: {
    height: 34,
    width: 50,
    borderRadius: 15,
    backgroundColor: type_color.lightBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancleText: {
    fontSize: 16,
    fontFamily: type_font.ggodic60,
    color: 'black',
  },
  feedBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    fontSize: 20,
    fontFamily: type_font.ggodic80,
    color: type_color.disablePressableButton,
  },
});

export default search;
