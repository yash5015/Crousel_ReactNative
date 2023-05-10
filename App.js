import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Text,
} from 'react-native';
import React from 'react';
import CustomImageCarousalSquare from './src/components/CustomImageCarousalSquare';
import CustomImageCarousalLandscape from './src/components/CustomImageCarousalLandscape';
import Navigator from './src/components/Navigator';

const App = () => {
  const data = [
    {
      id: 1,
      image: require('./src/assets/image-product-1.jpg'),
    },
    {id: 2, image: require('./src/assets/image-product-2.jpg')},
    {id: 3, image: require('./src/assets/image-product-3.jpg')},
    {id: 4, image: require('./src/assets/image-product-4.jpg')},
    {id: 5, image: require('./src/assets/image-product-4.jpg')},
    {id: 6, image: require('./src/assets/image-product-4.jpg')},
    {id: 7, image: require('./src/assets/image-product-4.jpg')},
  ];
  const handleIndex = arrow => {
    // if (arrow === 'left') {
    // scrollViewRef.current.scrollTo({x: _offSet, y: 0});
    // console.log(index - 1);
    // } else if (arrow === 'right') {
    // scrollViewRef.current.scrollTo({x: _offSet, y: 0});
    // console.log(index + 1);
    // }
    console.log('pressed', arrow);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        <CustomImageCarousalSquare
          data={data}
          autoPlay={false}
          pagination={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  carouselContainer: {
    // marginBottom: 20,
  },
});
