import { View, Text, TextInput, Animated, TextInputProps } from 'react-native'
import React, { useRef, useState } from 'react'
import { styles } from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import SearchIcon from "../../assets/svg/search.svg"


interface SearchProps extends TextInputProps{
    value: string;
    changeText: (text: string) => void;
}

const Search = ({value, changeText, ...restProps} : SearchProps) => {

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={changeText}
        style={styles.txtInput}
        placeholder='Enter your search'
        {...restProps}
      />
      <View style={styles.leftIcon}>
        <SearchIcon height={hp(2)} width={hp(2)}/>
      </View>
    </View>
  )
}

export default Search