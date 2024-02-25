import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LottieView from 'lottie-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const App = () => {
  const giftRef = useRef();
  const confettiRef = useRef()
  const [show,setShow] = useState(true);
  const [animationEnd, setAnimationEnd] = useState(false);
  const bounceAnim = useSharedValue(0);

  useEffect(() => {
    if (animationEnd) {
      confettiRef?.current?.play()
      bounceAnim.value = withSpring(1, {damping: 10, stiffness: 120});
    }
  }, [animationEnd]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: bounceAnim.value * 100,
        },
      ],
    };
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
      {/* <Text>App</Text> */}
      <View style={{
        height:Dimensions.get("window").height/2.8,
        width:Dimensions.get("window").width,
        aspectRatio:1,
        position:"absolute",
        top:0
      }}>
         <LottieView
            style={{
              flex: 1,
              width:"100%",
              height:"100%"
            }}
            ref={confettiRef}
            loop
            source={require('./confetti.json')}
          />

      </View>
      <View
        style={{
          height: Dimensions.get("window").height/2,
          aspectRatio: 1,
          marginTop:50
        }}>
        <TouchableOpacity
          onPress={() => {
            setShow(false)

            giftRef.current.play();
            setShow(false)
          }}
          style={{
            flex: 1,
          }}>
          <LottieView
            style={{
              flex: 1,
            }}
            onAnimationFinish={() => {
              setAnimationEnd(true);
            }}
            ref={giftRef}
            loop={false}
            source={require('./lottie2.json')}
          />
        </TouchableOpacity>
      </View>
      {
        show && (
          <Text style={{
            color:"black",
            fontSize:25,
            position:"absolute",
            bottom:150
          }}>
            Click to get gift
          </Text>
        )
      }
      
      {animationEnd && (
        <Animated.Text
          
          style={[
            {
              color: 'black',
              fontSize: 25,
              position: 'absolute',
              top: Dimensions.get('window').width / 1.45,
            },
            animatedStyle,
          ]}>
          LOVE4ALL
        </Animated.Text>
      )}
    </View>
  );
};

export default App;
