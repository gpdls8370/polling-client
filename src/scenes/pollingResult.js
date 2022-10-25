import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBar from '../components/TopBar';
import {type_color, type_font, type_id} from '../components/Constants';

import PollingPostBlock from '../components/PollingPostBlock';
import SelectAge from '../components/ResultCategory/SelectAge';
import SelectGender from '../components/ResultCategory/SelectGender';
import SelectJob from '../components/ResultCategory/SelectJob';
import SelectMbti from '../components/ResultCategory/SelectMbti';

function pollingResult({navigation, route}) {
  const [category, setCategory] = useState(categorys.age);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <TopBar navigation={navigation} type={type_id.polling} />
      <View style={styles.block}>
        <PollingPostBlock
          contentType={route.params.contentType}
          time={route.params.time}
          count={route.params.count}
          storyText={route.params.storyText}
          selectText={route.params.selectText}
          voteActive={false}
        />
      </View>
      <View style={styles.block}>
        <Text style={styles.text}>결과 상세 보기</Text>
        <View style={styles.buttonBlock}>
          <TouchableOpacity
            style={[
              styles.button,
              category == categorys.age
                ? {
                    backgroundColor: type_color[route.params.contentType],
                    opacity: 0.7,
                  }
                : null,
            ]}
            onPress={() => {
              setCategory(categorys.age);
            }}>
            <Text style={styles.buttonText}>나이로</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              category == categorys.gender
                ? {
                    backgroundColor: type_color[route.params.contentType],
                    opacity: 0.7,
                  }
                : null,
            ]}
            onPress={() => {
              setCategory(categorys.gender);
            }}>
            <Text style={styles.buttonText}>성별로</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              category == categorys.job
                ? {
                    backgroundColor: type_color[route.params.contentType],
                    opacity: 0.7,
                  }
                : null,
            ]}
            onPress={() => {
              setCategory(categorys.job);
            }}>
            <Text style={styles.buttonText}>직업으로</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              category == categorys.mbti
                ? {
                    backgroundColor: type_color[route.params.contentType],
                    opacity: 0.7,
                  }
                : null,
            ]}
            onPress={() => {
              setCategory(categorys.mbti);
            }}>
            <Text style={styles.buttonText}>MBTI로</Text>
          </TouchableOpacity>
        </View>
        {category == categorys.age ? (
          <SelectAge type={type_id.polling} />
        ) : category == categorys.gender ? (
          <SelectGender />
        ) : category == categorys.job ? (
          <SelectJob />
        ) : category == categorys.mbti ? (
          <SelectMbti />
        ) : null}
      </View>
    </View>
  );
}

const categorys = {
  age: 'age',
  gender: 'gender',
  job: 'job',
  mbti: 'mbti',
};

const styles = StyleSheet.create({
  block: {
    marginHorizontal: 10,
    marginTop: 15,
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: type_color.gray,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: type_font.ggodic80,
    color: 'black',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: type_font.ggodic60,
    color: 'black',
  },
  buttonBlock: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: -10,
  },
  button: {
    backgroundColor: '#F3F2F2',
    paddingVertical: 10,
    paddingHorizontal: 25.5,
    marginBottom: 30,
  },
});

export default pollingResult;
