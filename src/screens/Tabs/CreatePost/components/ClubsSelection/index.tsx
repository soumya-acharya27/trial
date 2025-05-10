import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Club, GetUserJoinedClubsResponse, GetUserJoinedClubsVariables } from '../../../../../interface/clubinterface';
import { GET_USER_JOINED_CLUBS } from '../../../../../graphql/clubs/clubsMutation';
import { RootState } from '../../../../../redux-saga/rootReducer';
import { styles } from './styles';
import { theme } from '../../../../../theme';
import { ButtonCustom } from '../../../../../component/ButtonCustom';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Close from "../../../../../assets/svg/Close.svg"
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ClubsPopupProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (club: Club) => void;
}

const ClubsPopup: React.FC<ClubsPopupProps> = ({ visible, onClose, onSelect }) => {
  const token = useSelector((state: RootState) => state.authReducer.accessToken);
  const userId = useSelector((state: RootState) => state.authReducer.userInfo.id)
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [fetchClubs, { data, loading, error }] = useLazyQuery<GetUserJoinedClubsResponse, GetUserJoinedClubsVariables>(
    GET_USER_JOINED_CLUBS,
    {
      fetchPolicy: 'network-only',
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const [clubs, setClubs] = useState<Club[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const limit = 20;

  useEffect(() => {
    if (visible) {
      fetchClubs({ variables: { limit, page: 1, userId } });
      setPage(1);
      setSelectedClub(null);
    }
  }, [visible, fetchClubs]);

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setClubs(data.getUserJoinedClubs.clubs);
      } else {
        setClubs((prevClubs) => [...prevClubs, ...data.getUserJoinedClubs.clubs]);
      }
      setHasMore(data.getUserJoinedClubs.hasMore);
    }
  }, [data, page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      fetchClubs({ variables: { limit, page: nextPage , userId } });
      setPage(nextPage);
    }
  };

  const handleSelectClub = (club: Club) => {
    setSelectedClub(club);
  };

  const handleJoinClubs = () => {
    onClose();
    navigation.navigate('clubs', { screen: 'clubs', })
  };

  const NoClubsMessage = () => (
    <View style={styles.noClubsContainer}>
      <Text style={styles.noClubsText}>Join some clubs before making a post</Text>
      <View style={styles.buttonContainer}>
        <ButtonCustom 
          title="Browse Clubs" 
          onPress={handleJoinClubs}
          width={wp(60)}
        />
      </View>
    </View>
  );

  const renderClub = ({ item, index }: { item: Club, index: number }) => (
    <View style={styles.clubItemContainer}>
      <FastImage 
        source={
          item.imageUrl 
            ? { 
                uri: item.imageUrl,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }
            : require("../../../../../assets/svg/image.png")
        }
        style={styles.clubImage}
        defaultSource={require("../../../../../assets/svg/image.png")}
      />      
      <Text style={styles.clubName}>{item.name}</Text>
      <View style={styles.memberCount}>
        <Text style={styles.memberCountText}>👥 20</Text>
      </View>
      <ButtonCustom 
        title={selectedClub?.id === item.id ? 'Selected' : 'Select'}
        onPress={() => handleSelectClub(item)}
        bgColor={selectedClub?.id === item.id  ? 'rgba(255, 255, 255, 0.1)': ''}
        width={'100%'}
        height={hp(4)}
      />
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Post</Text>
            <TouchableOpacity onPress={onClose}>
              <Close height={hp(2)} width={hp(2)} />
            </TouchableOpacity>
          </View>
          <Text style={styles.topTxt}>Select the club you want to post in</Text>
          <Text style={styles.selectionCount}>
            {selectedClub ? '1' : '0'}/1
          </Text>

          <View style={styles.clubsGrid}>
            {loading && page === 1 ? (
              <ActivityIndicator size="large" color={theme.colors.orange} />
            ) : error ? (
              <Text style={styles.errorText}>Error fetching clubs.</Text>
            ) : clubs.length === 0 ? (
              <NoClubsMessage />
            ) : (
              <FlatList
                data={clubs}
                renderItem={renderClub}
                keyExtractor={(item) => item.id}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                numColumns={2}
                columnWrapperStyle={styles.gridRow}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                  loading && page > 1 ? (
                    <ActivityIndicator size="small" color={theme.colors.orange} />
                  ) : null
                }
              />
            )}
          </View>
          {clubs.length > 0 && (
            <View style={{paddingLeft: wp(1), marginBottom: hp(2),}}>
              <ButtonCustom title='Post' disabled={!selectedClub} onPress={() => selectedClub && onSelect(selectedClub)}/>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ClubsPopup;
