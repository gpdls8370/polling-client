import React, {useCallback, useState} from 'react';
import RangeSliderRN from 'rn-range-slider';
import {View, Text, StyleSheet} from 'react-native';

import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';
import {type_color, type_font} from '../Constants';
import {useRecoilState} from 'recoil';
import {highState, lowState} from '../Atoms';

const RangeSlider = ({from, to, type}) => {
  const [low, setLow] = useRecoilState(lowState);
  const [high, setHigh] = useRecoilState(highState);

  const renderThumb = useCallback(() => <Thumb type={type} />, [type]);
  const renderRail = useCallback(() => <Rail />, []);

  const renderRailSelected = useCallback(
    () => <RailSelected type={type} />,
    [type],
  );

  const handleValueChange = useCallback(
    (newLow, newHigh) => {
      setLow(newLow);
      setHigh(newHigh);
    },
    [setLow, setHigh],
  );

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <View>
          <Text
            style={[
              {fontStyle: 'italic'},
              {
                textAlign: 'left',
                fontSize: 14,
                color: type_color.disablePressableButton,
              },
            ]}>
            Min
          </Text>
        </View>
        <View>
          <Text
            style={[
              {fontStyle: 'italic'},
              {
                textAlign: 'right',
                fontSize: 14,
                color: type_color.disablePressableButton,
              },
            ]}>
            Max
          </Text>
        </View>
      </View>
      <RangeSliderRN
        style={{marginBottom: 10}}
        min={from}
        max={to}
        low={low}
        high={high}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        onValueChanged={handleValueChange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    color: 'black',
    fontFamily: type_font.ggodic40,
  },
});

export default RangeSlider;
