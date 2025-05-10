import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from './styles';

interface ButtonCustomProps extends PressableProps {
    title:string;
    onPress: () => void;
    width?: number;
    height?: number;
    disabled?: boolean;
    reduceOpacityWhileDisabled?: boolean;
    bgColor?: string;
    textColor?: string;
}

export const ButtonCustom = ({title, onPress, width, height, disabled=false,reduceOpacityWhileDisabled=true, bgColor, textColor}: ButtonCustomProps) => {
  return (
    <View
        style={[styles.signupContainer, width ? {width: width} : {}, height ? {height:height} :{}, 
          {opacity: disabled && reduceOpacityWhileDisabled ? 0.5 : 1} , bgColor?.length ? {backgroundColor: bgColor} : {}, 

        ]}>
        <Pressable style={{height:'100%', justifyContent:'center'}} disabled={disabled} onPress={onPress}>
            <Text style={[styles.signupText, textColor?.length ? {color: textColor} : {}]}>{title}</Text>
        </Pressable>
    </View>
  )
}

export const ButtonSecondary =  ({title, onPress, width, disabled=false, reduceOpacityWhileDisabled=true, bgColor, textColor}: ButtonCustomProps) => {
  return (
    <View style={[styles.signupContainer, styles.secondaryBtn, width ? {width: width} : {}, {opacity: disabled && reduceOpacityWhileDisabled? 0.5 : 1}, bgColor?.length ? {backgroundColor: bgColor, borderColor: bgColor} : {}, ]}>
        <Pressable style={{height:'100%', justifyContent:'center'}}  disabled={disabled} onPress={onPress}>
            <Text style={[styles.signupText, styles.secondaryTxt, textColor?.length ? {color: textColor} : {}]}>{title}</Text>
        </Pressable>
    </View>
  )
}
