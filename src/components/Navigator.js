import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
const {height, width} = Dimensions.get('window');
const Navigator = ({button, curindex, Listsize}) => {
  console.log('navigator', curindex);
  return (
    <View style={styles.arrowContainer}>
      {curindex >= 1 ? (
        <TouchableOpacity onPress={() => button('left')}>
          <Image
            source={require('../assets2/Leftarrow.png')}
            style={[styles.Larrow, styles.arrow]}></Image>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      {curindex < Listsize - 1 ? (
        <TouchableOpacity onPress={() => button('right')}>
          <Image
            source={require('../assets2/Rightarrow.png')}
            style={[styles.Rarrow, styles.arrow]}></Image>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  arrowContainer: {
    backgroundColor: 'yellow',
    position: 'absolute',
    // // bottom: 0,

    width: width / 2 + width * 0.44,
    // justifyContent: 'space-between',
    // alignSelf: 'center',
    // top: '50%',
    // flexDirection: 'row',
  },
  arrow: {width: 45, height: 45, zIndex: 2},
  Larrow: {
    position: 'absolute',
    left: 10,
    top: height / 4,
  },
  Rarrow: {
    position: 'absolute',
    right: -13,
    top: height / 4,
  },
});
