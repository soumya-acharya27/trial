import { View, Text, FlatList, ActivityIndicator, Image, Pressable } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Club, JoinClubResponse } from '../../../../../interface/clubinterface'
import useJoinClub from '../../../../../hooks/useJoinClubHook'
import ClubListCard from '../../../../../component/ClubListCard'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface ProfileClubsProps {
  initialLoading: boolean
  loading: boolean,
  loadMoreClubs: () => void,
  clubs: Club[],
  setClubs: React.Dispatch<React.SetStateAction<Club[]>>
  hasMore: boolean
}

const ProfileClubs = ({ initialLoading, loading, clubs, setClubs, loadMoreClubs, hasMore }: ProfileClubsProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      {initialLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          data={clubs}
          renderItem={({ item }) => {
            return (
              <>
                <ClubListCard
                    setClubs={setClubs}
                    data={item}
                    SelectedValue={(item) => navigation.navigate('clubdetails', {clubId: item?.id})}
                />
              </>
            )
          }}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreClubs}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            hasMore && loading ? (
              <ActivityIndicator size="small" color="black" />
            ) : null
          }
          contentContainerStyle={styles.postContainer}
          
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>

  )
}

export default ProfileClubs