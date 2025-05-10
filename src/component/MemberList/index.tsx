import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { styles } from './styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ButtonCustom } from '../ButtonCustom';
import { Member } from '../../interface/clubinterface';
import { getDummyProfile } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../redux-saga/rootReducer';
import { useSelector } from 'react-redux';

interface ClubCardProps {
    data: Member;
    SelectedValue: (item: any) => void;

}

const MemberList = ({ data, SelectedValue }: ClubCardProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const credentials = useSelector((state: RootState) => state.authReducer)


    const takeToProfile = () => {
        const isMyProfile = credentials?.userInfo?.id === data?.id

        if (!isMyProfile)
            return navigation.navigate('profile', { userId: data?.id , isBack: true,}, )

        return navigation.navigate('profiles', { screen: 'profile', isBack: true })
    }


    return (
        <View style={styles.container}>
            <Pressable onPress={takeToProfile} style={styles.imgContainerLeft}>
                <FastImage
                    style={styles.img}
                    source={data?.profilePicId ? { uri: data.profilePicId } : { uri: getDummyProfile(data?.name) }}
                />
            </Pressable>
            <Pressable onPress={takeToProfile}>
                <Text style={styles.txt}>{data.name}</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.detailstxt}>{data?.college}</Text>
                    <View style={styles.line}/>
                    <Text style={styles.detailstxt}>{data?.mutualClubs + " Clubs"}</Text>
                </View>

            </Pressable>
        </View>
    )
}


export default MemberList

//todo
// implement image 