import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBarBack from '../components/TopBarBack';
import {
  selection,
  type_color,
  type_font,
  type_id,
} from '../components/Constants';

import PollingPostBlock from '../components/PollingPostBlock';
import SelectAge from '../components/ResultCategory/SelectAge';
import SelectGender from '../components/ResultCategory/SelectGender';
import SelectMbti from '../components/ResultCategory/SelectMbti';

function pollingResult({navigation, route}) {
  const [initResult, setInit] = useState(null);
  const [category, setCategory] = useState(categories.age);

  return (
    <>
      <TopBarBack navigation={navigation} type={type_id.polling} />
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={[styles.block, {marginTop: 15}]}>
          <PollingPostBlock
            postId={route.params.postId}
            postType={route.params.postType}
            timeBefore={route.params.timeBefore}
            userCount={route.params.userCount}
            storyText={route.params.storyText}
            selection={route.params.selection}
            voteActive={false}
            initResult={initResult}
            showImage={false}
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
            <SelectAge
              type={type_id.polling}
              postId={route.params.postId}
              setInitresult={setInit}
            />
          ) : category == categories.gender ? (
            <SelectGender
              type={type_id.polling}
              postId={route.params.postId}
              setInitresult={setInit}
            />
          ) : category == categories.mbti ? (
            <SelectMbti
              type={type_id.polling}
              postId={route.params.postId}
              setInitresult={setInit}
            />
          ) : null}
        </View>
      </ScrollView>
    </>
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
    marginBottom: 15,
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
    marginRight: -10,
  },
  button: {
    backgroundColor: '#F3F2F2',
    paddingVertical: 10,
    flex: 1 / 3,
    //paddingHorizontal: Dimensions.get('window').width / 10.23, //25.5
    marginBottom: 30,
    alignItems: 'center',
  },
});

export default pollingResult;
