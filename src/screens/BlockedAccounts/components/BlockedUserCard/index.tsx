import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { BlockedUserDetails } from '../../../../interface/clubinterface';
import { useBlockUser } from '../../../../hooks/useBlockUser';
import { getDummyProfile } from '../../../../utils';

interface Props {
  user: BlockedUserDetails;
  onUnblock: () => void;
}

const BlockedUserCard: React.FC<Props> = ({ user, onUnblock }) => {
  const { blockUser, loading } = useBlockUser();

  const handleUnblock = async () => {
    try {
      const response = await blockUser(user.id, false);
      if (response) {
        onUnblock();
      }
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {user.profilePicId ? (
          <Image source={{ uri: user.profilePicId }} style={styles.avatar} />
        ) : (
          <Image source={{ uri: getDummyProfile(user.name) }} style={styles.avatar} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.userName}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.unblockButton, loading && styles.disabledButton]} 
        onPress={handleUnblock}
        disabled={loading}
      >
        <Text style={styles.unblockText}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlockedUserCard; 