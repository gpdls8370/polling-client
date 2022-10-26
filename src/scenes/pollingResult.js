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
  const [category, setCategory] = useState(categories.age);

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
          postId={route.params.postId}
          postType={route.params.postType}
          timeBefore={route.params.timeBefore}
          userCount={route.params.userCount}
          storyText={route.params.storyText}
          selection={route.params.selection}
          voteActive={false}
        />
      </View>
      <View style={styles.block}>
        <Text style={styles.text}>결과 상세 보기</Text>
        <View style={styles.buttonBlock}>
          <TouchableOpacity
            style={[
              styles.button,
              category == categories.age
                ? {
                    backgroundColor: type_color[route.params.postType],
                    opacity: 0.7,
                  }
                : null,
            ]}
            onPress={() => {
              setCategory(categories.age);
            }}>
            <Text style={styles.buttonText}>나이로</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              category == categories.gender
                ? {
                    backgroundColor: type_color[route.params.postType],
                    opacity: 0.7,
                  }
                : null,
            ]}
            onPress={() => {
              setCategory(categories.gender);
            }}>
            <Text style={styles.buttonText}>성별로</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity
            style={[
              styles.button,
              category == categories.job
                ? {
                    backgroundColor: type_color[route.params.contentType],
                    opacity: 0.7,
                  }
                : null,
            ]}
            onPress={() => {
              setCategory(categories.job);
            }}>
            <Text style={styles.buttonText}>직업으로</Text>
          </TouchableOpacity>*/}
          <TouchableOpacity
            style={[
              styles.button,
              category == categories.mbti
                ? {
                    backgroundColor: type_color[route.params.postType],
                    opacity: 0.7,
                  }
                : null,
            ]}
            onPress={() => {
              setCategory(categories.mbti);
            }}>
            <Text style={styles.buttonText}>MBTI로</Text>
          </TouchableOpacity>
        </View>
        {category == categories.age ? (
          <SelectAge type={type_id.polling} />
        ) : category == categories.gender ? (
          <SelectGender />
        ) : category == categories.job ? (
          <SelectJob />
        ) : category == categories.mbti ? (
          <SelectMbti type={type_id.polling} />
        ) : null}
      </View>
    </View>
  );
}

const categories = {
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
    paddingHorizontal: 42.5, //25.5
    marginBottom: 30,
  },
});

export default pollingResult;
