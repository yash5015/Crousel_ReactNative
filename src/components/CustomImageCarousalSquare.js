import {
  StyleSheet,
  View,
  Image,
  Text,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  useAnimatedRef,
  event,
} from 'react-native-reanimated';
import Pagination from './Pagination';
import Navigator from './Navigator';
const {width, height} = Dimensions.get('window');
const ITEM_LENGTH = width / 2 + width * 0.2;

const CustomImageCarousal = ({data, autoPlay, pagination}) => {
  const scrollViewRef = useAnimatedRef(null);
  const interval = useRef();
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [newData] = useState([
    {key: 'spacer-left'},
    ...data,
    {key: 'spacer-right'},
  ]);
  const {width} = useWindowDimensions();
  const SIZE = width * 0.7;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);

  const offSet = useSharedValue(0);
  const curidxValue = useSharedValue(0);
  const [curidx, setCuridx] = useState(0);
  const [index, setIndex] = useState(0);
  const handleScrollIndex = event => {
    // console.log(
    //   'currentScreenIndex',
    //   parseInt(
    //     event.nativeEvent.contentOffset.x / Dimensions.get('window').width,
    //   ),
    // );
    curidxValue.value = parseInt(
      event.nativeEvent.contentOffset.x / Dimensions.get('window').width,
    );
    console.log(curidxValue.value);
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  // useEffect(() => {
  //   if (isAutoPlay === true) {
  //     let _offSet = offSet.value;
  //     interval.current = setInterval(() => {
  //       if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
  //         _offSet = 0;
  //       } else {
  //         _offSet = Math.floor(_offSet + SIZE);
  //       }
  //       scrollViewRef.current.scrollTo({x: _offSet, y: 0});
  //     }, 2000);
  //   } else {
  //     clearInterval(interval.current);
  //   }
  // }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);
  const [currentOffset, seCurrentOffset] = useState(offSet.value / ITEM_LENGTH);

  useEffect(() => {
    setIndex(Math.round(offSet.value / ITEM_LENGTH));
    // console.log('change', offSet.value / ITEM_LENGTH);
  }, [offSet.value, currentOffset]);

  const handleIndex = arrow => {
    let curoff = offSet.value;
    if (arrow === 'left') {
      scrollViewRef.current.scrollTo({x: curoff - ITEM_LENGTH, y: 0});
      offSet.value = curoff - ITEM_LENGTH;
      setIndex(Math.round(offSet.value / ITEM_LENGTH) + 1);
    } else if (arrow === 'right') {
      scrollViewRef.current.scrollTo({x: curoff + ITEM_LENGTH, y: 0});
      offSet.value = curoff + ITEM_LENGTH;
      setIndex(Math.round(offSet.value / ITEM_LENGTH) + 1);
    }
    console.log('parent index', Math.round(offSet.value / ITEM_LENGTH));
    // console.log('pressed', arrow);
  };
  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        // onScrollBeginDrag={() => {
        //   setIsAutoPlay(false);
        // }}
        onMomentumScrollEnd={e => {
          offSet.value = e.nativeEvent.contentOffset.x;
          // console.log(offSet.value);
          seCurrentOffset(offSet.value);
        }}
        scrollEventThrottle={16}
        decelerationRate={0}
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {newData.map((item, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const AnimatedStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
              [0.8, 1, 0.8],
            );
            return {
              transform: [{scale}],
            };
          });
          if (!item.image) {
            return <View style={{width: SPACER}} key={index} />;
          }
          return (
            <View style={{width: SIZE}} key={index}>
              <Animated.View style={[styles.imageContainer, AnimatedStyle]}>
                {/* <Image source={item.image} style={styles.image} /> */}

                <View style={styles.container}>
                  <View style={styles.card}>
                    <View style={styles.cardimage}>
                      <Image
                        source={require('../assets2/card4.png')}
                        style={styles.img}></Image>
                    </View>
                    <View style={styles.secondpart}>
                      <View style={styles.topteamtext}>
                        <Text style={styles.topText}>Top 1</Text>
                      </View>
                      <View style={styles.desc}>
                        <View style={styles.price}>
                          <Text style={styles.priceText}>Price:</Text>
                          <Text style={styles.priceMoney}>
                            200,000{'  '}
                            <Image
                              source={require('../assets2/coin.png')}
                              style={{height: 20, width: 20}}></Image>
                          </Text>
                        </View>
                        <View style={styles.player}>
                          <Text style={styles.playerText}>Player:</Text>
                          <Text style={styles.playerText}>135</Text>
                        </View>
                        <View style={styles.entryFee}>
                          <Text style={styles.entryText}>Entry Fee: </Text>
                          <Text style={styles.entryText}>104,000 </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      {/* {pagination && <Pagination data={data} x={x} size={SIZE} />} */}
      <Navigator button={handleIndex} curindex={index} Listsize={data.length} />
    </View>
  );
};

export default CustomImageCarousal;

// const styles = StyleSheet.create({
// imageContainer: {
//   borderRadius: 34,
//   overflow: 'hidden',
// },
// image: {
//   width: '100%',
//   height: undefined,
//   aspectRatio: 1,
// },
// });

const styles = StyleSheet.create({
  container: {
    width: ITEM_LENGTH,
    height: height / 2 + 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: '#2727f5',
    width: ITEM_LENGTH - 10,
    height: '80%',
    borderRadius: 20,
  },
  // activeIndex: {
  //   transform: [{scale: 1.1}],
  // },
  cardimage: {
    flex: 0.2,
    // backgroundColor: 'green',
    width: 200,
    height: 200,
    marginBottom: -30,
    alignSelf: 'center',
  },
  img: {
    position: 'absolute',
    top: -40,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  secondpart: {
    flex: 0.8,
    // backgroundColor: 'yellow',
  },
  topteam: {},
  topteamtext: {
    alignSelf: 'center',
    elevation: 10,
    paddingVertical: 10,
    paddingHorizontal: 46,
    borderRadius: 5,
    backgroundColor: '#181894E6',
    justifyContent: 'center',
  },
  topText: {
    // fontSize: 19,
    // fontWeight: 500,
    color: 'white',
    alignSelf: 'center',
  },
  desc: {
    height: '80%',
    justifyContent: 'space-around',
  },
  price: {
    alignSelf: 'center',
    elevation: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 5,
    width: '85%',
    backgroundColor: '#181894E6',
    justifyContent: 'center',
  },
  priceText: {
    // fontSize: 22,
    // fontWeight: 700,
    color: 'white',
    alignSelf: 'center',
  },
  priceMoney: {
    // fontSize: 30,
    // fontWeight: 800,
    color: 'white',
    alignSelf: 'center',
  },
  player: {
    alignSelf: 'center',
    elevation: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 5,
    width: '85%',
    backgroundColor: '#181894E6',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerText: {
    // fontSize: 18,
    // fontWeight: 500,
    color: 'white',
  },
  entryFee: {
    alignSelf: 'center',
    elevation: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    width: '85%',
    borderRadius: 5,
    backgroundColor: '#181894E6',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entryText: {
    // fontSize: 18,
    // fontWeight: 500,
    color: 'white',
  },
});
