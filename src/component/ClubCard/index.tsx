import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ButtonCustom } from '../ButtonCustom';
import { Club, JoinClubResponse } from '../../interface/clubinterface';
import useJoinClub from '../../hooks/useJoinClubHook';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-saga/rootReducer';

interface ClubCardProps {
    title: string;
    imageId: string;
    isJoined: boolean;
    setClubs: React.Dispatch<React.SetStateAction<Club[]>>
    data: Club
  }

const ClubCard = ({title, imageId, isJoined, setClubs, data}: ClubCardProps) => {
  const token = useSelector((state: RootState) => state.authReducer.accessToken)
  const {joinClub, joinClubLoading} = useJoinClub( {
    successCb: (successData: JoinClubResponse) => {
      setClubs(clubs => (clubs?.map(list => list?.id === data?.id ? {...list,isJoined: successData?.joinClub?.isJoined } : {...list})))
    },
    errorCb: () => {

    }
  })


  const joinCta = async () => {
    try{
      await joinClub({
        variables: {
          id: data?.id,
          isJoinining: !data?.isJoined, 
        },
      });
 
    }catch(err) {
      console.log("err joining club")
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </View>

      <Text numberOfLines={2} style={styles.txt}>{title}</Text>
      
      <View style={styles.btnContainer}>
        <ButtonCustom disabled={joinClubLoading} title={isJoined ? 'Joined' : 'Join'} onPress={joinCta} width={wp(30)}/>
      </View>
    </View>
  )
}


export default ClubCard