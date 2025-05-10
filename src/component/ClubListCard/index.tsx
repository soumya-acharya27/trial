import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ButtonCustom } from '../ButtonCustom';
import { Club, JoinClubResponse } from '../../interface/clubinterface';
import useJoinClub from '../../hooks/useJoinClubHook';
import FastImage from 'react-native-fast-image';

interface ClubCardProps {
  setClubs: React.Dispatch<React.SetStateAction<Club[]>>
  data:  Club;
  SelectedValue: (item: Club) => void;

}

const ClubListCard = ({ data ,SelectedValue, setClubs}: ClubCardProps) => {
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
    <Pressable  onPress={()=>{SelectedValue(data)}} style={styles.container}>
      <View style={styles.imgContainerLeft}>
        <FastImage
          style={styles.img}
          source={
            data?.imageUrl 
              ? { 
                uri: data.imageUrl,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }
              : require('../../assets/png/defaultImage.png')
          }
          defaultSource={require('../../assets/png/defaultImage.png')}
        />
      </View>

      <View style={styles.middleontainer}>
        <View>
          <Text numberOfLines={2} style={styles.txt}>{data.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
          {/* {data.profile.map((img: any, index: number) => {

            return (index + 1 <= 4 ?

              (<View style={styles.imgContainer}>
                <Image source={img} style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }} />
              </View>) :
              null
            )
          })}
          {data.profile.length >= 4 ? (
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginHorizontal: -8, // Overlapping effect
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: '#F5F5F5',
              backgroundColor: '#F5F5F5',
              alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
            }}>
              <Text style={{ color: '#000000' }}>{data.profile.length - 4 + " +"}</Text>
            </View>
          ) : null} */}

        </View>
      </View>

      <View style={styles.btnContainer}>
        <ButtonCustom disabled={joinClubLoading} bgColor={data?.isJoined ? '#DB0000': ''} title={data?.isJoined ? 'Leave' : 'Join'} onPress={joinCta} width={wp(20)} height={hp(4)} style={{backgroundColor:'red'}}/>
      </View>
    </Pressable>
  )
}


export default ClubListCard