import { View, Text, TextInput, Animated, TextInputProps } from 'react-native'
import React, { useRef, useState } from 'react'
import { styles } from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


interface TextInputCustomProps extends TextInputProps {
  value: string;
  label: string;
  changeText: (text: string) => void;
  Right?: React.ComponentType,
  showError?: boolean;
  errorTxt?: string
  width?: number
}

const TextInputCustom = ({ label, value, changeText, width, Right, showError, errorTxt, ...restProps }: TextInputCustomProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <View style={[styles.container, width ? { width: width } : {}]}>
      {label && <Text style={[styles.labelTxt]}>{label}</Text>}
      <TextInput
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={changeText}
        style={[styles.txtInput, width ? { width: width } : {}, isFocused ? {} : { borderColor: '#717171' }]}
        placeholderTextColor={"#717171"}
        {...restProps}
      />
      <View style={styles.errorContainer}>
        {showError && <Text style={styles.errorTxt}>{errorTxt}</Text>}
      </View>
      {Right && <View style={styles.rightIcon}>
        <Right />
      </View>}
    </View>
  )
}

export default TextInputCustom

export const TextInputSecondary = ({ label, value, changeText, width, Right,showError, errorMsg, errorTxt, ...restProps }: TextInputCustomProps & { errorMsg?: string; showError?: boolean }) => {

  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  //if needed user isFocused to change borderColor when on focus

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput onFocus={handleFocus} onBlur={handleBlur} onChangeText={changeText} value={value} style={[styles.input, showError && { borderColor: 'red' }]} {...restProps} />
      {showError && <Text style={{ color: 'red', }}>{errorMsg}</Text>}
      {Right && <View style={styles.rightIconSecondary}>
        <Right />
      </View>}
    </View>
  )
}


//work on error part after talkin to ux designer