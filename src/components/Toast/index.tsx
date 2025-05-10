import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onHide?: () => void;
}

// Create a single instance to track active toast
let activeToast: any = null;

const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onHide,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const toastRef = useRef<any>(null);

  useEffect(() => {
    toastRef.current = {
      translateY,
      opacity,
      hideToast,
    };
  }, []);

  useEffect(() => {
    if (visible) {
      if (activeToast && activeToast !== toastRef.current) {
        activeToast.hideToast();
      }
      
      activeToast = toastRef.current;

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => {
        clearTimeout(timer);
        if (activeToast === toastRef.current) {
          activeToast = null;
        }
      };
    }
  }, [visible, message]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onHide) {
        onHide();
      }
      if (activeToast === toastRef.current) {
        activeToast = null;
      }
    });
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      default:
        return '#2196F3';
    }
  };

  const getTextColorr = () => {
    switch(type) {
      case 'success':
        return '#005C25';
      case 'error':
        return '#FFFFFF';
      default:
        return '#FFFFF';
    }
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
          backgroundColor: getBackgroundColor(),
          marginTop: insets.top + hp(4),
        },
      ]}
    >
      <Text style={[styles.message,{ color: getTextColorr()}]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    maxWidth: wp(90),
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  message: {
    color: '#FFFFFF',
    fontSize: wp(3.2),
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Toast; 