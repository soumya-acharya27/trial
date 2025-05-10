import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ShimmerPost = () => {
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2A2A2A', '#3A3A3A'],
  });

  const shimmerColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.1)'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View style={[styles.profilePic, { backgroundColor }]} />
        <View style={styles.headerContent}>
          <Animated.View style={[styles.name, { backgroundColor }]} />
          <Animated.View style={[styles.time, { backgroundColor }]} />
        </View>
      </View>
      <View style={styles.content}>
        <Animated.View style={[styles.text, { backgroundColor }]} />
        <Animated.View style={[styles.text, { backgroundColor }]} />
        <Animated.View style={[styles.text, { backgroundColor }]} />
      </View>
      <View style={styles.footer}>
        <Animated.View style={[styles.action, { backgroundColor }]} />
        <Animated.View style={[styles.action, { backgroundColor }]} />
      </View>
      <Animated.View
        style={[
          styles.shimmer,
          {
            backgroundColor: shimmerColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    padding: wp(4),
    marginBottom: hp(2),
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  profilePic: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
  },
  headerContent: {
    marginLeft: wp(3),
    flex: 1,
  },
  name: {
    width: wp(30),
    height: hp(2),
    borderRadius: 4,
    marginBottom: hp(0.5),
  },
  time: {
    width: wp(20),
    height: hp(1.5),
    borderRadius: 4,
  },
  content: {
    marginBottom: hp(4),
  },
  text: {
    width: '100%',
    height: hp(1.5),
    borderRadius: 4,
    marginBottom: hp(3),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    width: wp(20),
    height: hp(2),
    borderRadius: 4,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ShimmerPost; 