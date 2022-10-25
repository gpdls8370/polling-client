import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {type_id} from './Constants';

function MakePollSelection({type, data, onChangeData}) {
  const renderItem = ({
    item,
    index,
    drag,
    isActive,
  }: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[styles.inputView]}>
          <Image
            source={require('../../assets/images/list.png')}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder={display_text.hint}
            keyboardType="default"
            onChangeText={text => {
              onChangeData(
                data.map((d, i) =>
                  i === index
                    ? {
                        key: item.key,
                        label: text,
                      }
                    : d,
                ),
              );
            }}
          />
          {type === type_id.polling && index >= 2 ? (
            <Pressable
              style={styles.pressable}
              onPress={() => {
                onChangeData(data.filter(temp => temp.key !== item.key));
              }}>
              <Image
                source={require('../../assets/images/minus-circle.png')}
                style={styles.icon}
              />
            </Pressable>
          ) : null}
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.titleView}>
      <View>
        <Text style={styles.titleText}>{display_text.title}</Text>
      </View>
      <DraggableFlatList
        data={data}
        onDragEnd={({data}) => onChangeData(data)}
        keyExtractor={(item, index) => item.key}
        renderItem={renderItem}
      />
      {type === type_id.polling ? (
        <Pressable
          style={styles.pressable}
          onPress={() => {
            onChangeData(
              data.concat({
                key: `item-${data.length}`,
                label: String(''),
              }),
            );
          }}>
          <Image
            source={require('../../assets/images/plus-circle.png')}
            style={styles.icon}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  titleView: {
    padding: 15,
  },
  titleText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    fontSize: 20,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
  },
  inputView: {
    flexDirection: 'row',
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
  pressable: {
    paddingVertical: 6,
  },
  icon: {
    width: 28,
    height: 28,
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    marginTop: 10,
  },
});

const display_text = {
  title: '선택지 입력',
  hint: '내용',
};

export default MakePollSelection;
