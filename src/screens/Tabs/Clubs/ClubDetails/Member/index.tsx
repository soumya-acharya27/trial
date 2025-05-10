import { View, Text, Pressable, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import MemberList from '../../../../../component/MemberList'
import { GetClubMembersResponse,  Member as MembersInterface } from '../../../../../interface/clubinterface'

interface MemberProps {
    members: MembersInterface[];
}

const Member = ({members}: MemberProps) => {

    const renderCard = useCallback(
        ({ item, index }: { item: MembersInterface, index: number }) => (
            <MemberList
                data={item}
                SelectedValue={(item) => {
                }} />
        ),
        [],
    );

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={members}
                keyExtractor={(item) => item?.id}
                renderItem={({ item, index }) => renderCard({ item, index })}
                contentContainerStyle={styles.containerStyle}
            />

        </View>
    )

}

export default Member
