import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles';
import { clubCategories } from '../../redux-saga/club/clubModel';

interface ClubCardProps {
  data: clubCategories;
  title: string;
  categoryChange: (data: clubCategories) => void;
  selectedTab: clubCategories;
}

const ClubTab = ({ title, data, categoryChange, selectedTab }: ClubCardProps) => {
  const isSelected = selectedTab?.slug === title
  return (
    <View style={[styles.container]} >
      <Pressable onPress={() => {
        categoryChange(data)
      }} >
        <View style={isSelected ? styles.SelectContainer : styles.normalContainer}>
          <Text style={[styles.normalText]}>{data?.slug}</Text>
        </View>
      </Pressable>
    </View>
  )
}


export default ClubTab