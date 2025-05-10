import { View, Text } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import Person from "../../../../../assets/svg/user.svg"
import Bank from "../../../../../assets/svg/bank.svg"
import NoOfPost from "../../../../../assets/svg/noOfPosts.svg"
import { styles } from './styles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { ButtonCustom, ButtonSecondary } from '../../../../../component/ButtonCustom'
import { UserProfile } from '../../../../../interface'
import { getDummyProfile } from '../../../../../utils'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { User } from '../../../../../interface/signUpInterface'
import { useFollowUser } from '../../../../../hooks/useFollowUser'
import { useUnFollowUser } from '../../../../../hooks/useUnFollowUser'
import { RootState } from '../../../../../redux-saga/rootReducer'
import { useSelector } from 'react-redux'

interface ProfileContainerProps {
  isMyProfile: boolean;
  user: User | undefined
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>
  profilePicId: string | null;
  avatar: string | null;
  name: string;
  userName: string;
  college: string;
  bio: string;
  showVerify: boolean;
  noOfPosts: string;
}

const ProfileContainer = ({user, noOfPosts, setUserData, isMyProfile,profilePicId,showVerify, avatar, name, userName, college, bio}: ProfileContainerProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {followUser, loading: followLoading} = useFollowUser()
  const {removeFollower, loading: unFollowLoading} = useUnFollowUser()
  const myId = useSelector((state: RootState) => state.authReducer.userInfo.id)

  const followCta = async (follow: boolean) => {
    if(!user) return;

    if(follow) {    //unfollow flow
      try {
        const response = await removeFollower(user?.id, myId);
        if (response) {
          setUserData(prev => prev ? { ...prev, isFollowed: response?.isFollow } : prev);
        }
      } catch (error) {
        console.error("Failed to toggle follow status:", error);
      }
    } else {  //follow flow
      try {
        const response = await followUser(user?.id, true);
        if (response) {
          setUserData(prev => prev ? { ...prev, isFollowed: response?.isFollow } : prev);
        }
      } catch (error) {
        console.error("Failed to toggle follow status:", error);
      }
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <FastImage
          style={styles.img}
          source={{ uri: profilePicId ?? getDummyProfile(name) }}
        />

        <View style={[styles.userNameContainer, showVerify && {width:wp(42)}]}>
          <Text style={styles.boldText}>{name ?? ''}</Text>
          <Text style={styles.userNameText}>@{userName?? ''}</Text>
        </View>
        
        {showVerify && <View style={{marginTop: hp(2.3)}}>
          <ButtonCustom 
            title='Verify'
            onPress={() => navigation.navigate('profileVerify', {step:2, goBack: () => navigation.goBack()})}
            width={wp(20)}
            height={hp(3)}
          />
        </View>}
        

      </View>

      {!!noOfPosts?.length && <View style={styles.svgContainer}>
          <NoOfPost style={styles.svgMargin} height={hp(2)} width={hp(2)}/>
          <Text style={styles.txt}>{noOfPosts ?? '' } Posts</Text>
      </View>}

      {/* {!!location?.length && <View style={styles.svgContainer}>
          <Location style={styles.svgMargin} height={hp(2)} width={hp(2)}/>
          <Text style={styles.txt}>{location ?? ''}</Text>
      </View>} */}

      {!!college?.length && <View style={styles.svgContainer}>
          <Bank style={styles.svgMargin} height={hp(2)} width={hp(2)}/>
          <Text style={styles.txt}>{college ?? '' }</Text>
      </View>}

     {!!bio?.length &&  <View style={styles.svgContainer}>
          <Person style={styles.svgMargin} height={hp(2)} width={hp(2)}/>
          <Text numberOfLines={4} style={styles.txt}>{bio ?? ''}</Text>
      </View>}
      {!isMyProfile && user && <ButtonCustom bgColor={!user?.isFollowed ? '' : '#243139'} disabled={followLoading || unFollowLoading} title={user?.isFollowed ? 'Peer Down': 'Peer Up'} onPress={() => followCta(user?.isFollowed)}/>}
      {!isMyProfile && user && <ButtonSecondary bgColor='#243139' textColor='white' title={'Message'} onPress={() => navigation.navigate('message', { recipientId: user?.id })}/>}
    </View>
  )
}

export default ProfileContainer