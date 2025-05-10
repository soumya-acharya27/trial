import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles';


interface ClubGroupProps {
  data: any;
  setSelectedGroupTeb: React.Dispatch<React.SetStateAction<string>>;
  selectedGroupTab: string;
  SelectedValue: (item: any) => void;
}

const ClubGroup = ({ data, setSelectedGroupTeb, selectedGroupTab }: ClubGroupProps) => {

    const [selectedTab,setSelectedTeb]=useState('');

  return (
    <View style={[styles.container]} >
      <Pressable onPress={() => {
        setSelectedGroupTeb(data.name)
        setSelectedTeb(data.name)
       // selectName = data.name
      }} >
        <Text style={[styles.normalText,selectedTab==selectedGroupTab ? styles.SelectText : {}]}>{data.name}</Text>
      </Pressable>
    </View>
  )
}


export default ClubGroup