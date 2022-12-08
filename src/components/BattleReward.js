import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {Image} from 'react-native';
import {Text} from 'react-native';
import {type_color, type_font, url} from './Constants';

function BattleReward({postId}) {
  const [profileURL, setURL] = useState(null);
  const [prefix, setPrefix] = useState('');

  const GetData = () => {
    fetch(url.battleReward + postId)
      .then(res => res.json())
      .then(json => {
        setURL(json.profileImg);
        setPrefix(json.prefix);
        console.log(json);
      });
  };

  useEffect(() => {
    GetData();
  }, []); //갱신용

  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={require('../../assets/images/reward.jpg')}>
      <View style={styles.block}>
        <View style={styles.profileBlock}>
          <Text style={styles.rewardText}>승리 보상</Text>
          <Image source={{uri: profileURL}} style={styles.image} />
        </View>
        <View style={styles.profileBlock}>
          <Text style={styles.rewardText}>참여 보상</Text>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Text style={styles.prefixBox}> '{prefix}'</Text>
          </View>
        </View>
      </View>
      <Text style={styles.bottomText}>보상이 지급되었습니다</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  profileBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  image: {
    borderRadius: 10,
    width: 150,
    height: 150,
    borderWidth: 5,
    borderColor: 'gold',
  },
  rewardText: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: type_color.lightBackground,
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: type_font.ggodic60,
    color: 'black',
    marginVertical: 10,
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: type_font.ggodic60,
    color: 'black',
  },
  bottomText: {
    alignSelf: 'center',
    fontSize: 23,
    fontFamily: type_font.ggodic80,
    color: 'white',
    marginBottom: 50,
    elevation: 10,
  },
  prefixBox: {
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: 'silver',
    fontSize: Dimensions.get('window').width / 15,
    fontFamily: type_font.ggodic80,
    color: 'black',
    backgroundColor: type_color.lightGray,
  },
});

export default BattleReward;
