import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {type_color, type_font, type_id} from '../components/Constants';
import MyPollFeed from '../components/MyPollFeed';
import Icon from 'react-native-vector-icons/Feather';
import TopBarBack from '../components/TopBarBack';
import MyVotedFeed from '../components/MyVotedFeed';

function myVotedPolls({navigation}) {
  const [type, setType] = useState(type_id.polling);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <TopBarBack
        navigation={navigation}
        type={type}
        optionalTitle={'내가 참여한 투표'}
        setType={setType}
      />

      <View style={styles.block}>
        <MyVotedFeed navigation={navigation} type={type} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 15,
  },
  typeBlock: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  typeText: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 13,
    marginHorizontal: 8,
    fontSize: 20,
    fontFamily: type_font.ggodic80,
    backgroundColor: type_color.disablePressableButton,
    color: 'white',
  },
});

export default myVotedPolls;
