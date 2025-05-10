import React, { useRef, useState } from "react";
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, View } from "react-native";
import { styles } from "./styles";

interface OtpProps {
  error?: boolean
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>
}

const OTPInput = ({otp, setOtp, error} : OtpProps) => {
  const inputs = useRef<any>([]);

  const handleChange = (text: string, index: number) => {
    text = text?.slice(-1)
    const newOtp = [...otp];
    if (text === "") {
        newOtp[index] = "";
        setOtp(newOtp);
  
        // Move to the previous field
        if (index > 0) {
          inputs.current[index - 1]?.focus();
        }
        return;
    } 
    newOtp[index] = text;

    setOtp(newOtp);

    // Move to the next input if text exists
    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };


  return (
    <View style={styles.container}>
      {otp.map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          style={[styles.input, otp[index] === '' ? {borderColor:'#626262'} : {}, error ? {borderColor:'#ff2121'}: {}]}
          value={otp[index]}
          onChangeText={(text) => handleChange(text, index)}
          keyboardType="numeric"
        />
      ))}
    </View>
  );
};


export default OTPInput;
