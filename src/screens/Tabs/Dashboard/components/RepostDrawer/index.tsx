import React from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../../../../../theme';
import Right from "../../../../../assets/svg/Right.svg"
import { useRepost } from '../../../../../hooks/useRepost';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux-saga/rootReducer';

interface RepostDrawerProps {
  visible: boolean;
  onClose: () => void;
  onRepost: () => void;
  onSpiceUp: () => void;
  postId: string;
  clubId: string;
  adjustRepost: () => void;
}

const RepostDrawer: React.FC<RepostDrawerProps> = ({
  visible,
  onClose,
  onRepost,
  onSpiceUp,
  postId,
  clubId,
  adjustRepost
}) => {
  const { repost, loading } = useRepost();
  const user = useSelector((state: RootState) => state.authReducer.userInfo);

  const handleRepost = async () => {
    try {
      await repost(clubId, postId);
      adjustRepost()
      onRepost();
      onClose();
    } catch (error) {
      console.error('Error in repost:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.boxer}/>
            <View style={styles.header}>
              <Text style={styles.title}>Repost with your </Text>
              <Text style={[styles.title, {color: theme.colors.orange}]}>Peers</Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.option, loading && styles.disabledOption]} 
              onPress={handleRepost}
              disabled={loading}
            >
              <Text style={[styles.optionText, loading && styles.disabledText]}>Repost</Text>
              {loading ? (
                <ActivityIndicator size="small" color={theme.colors.gray} />
              ) : (
                <Right height={hp(2)} width={hp(2)}/>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.option, {borderBottomWidth: 0}]} 
              onPress={onSpiceUp}
            >
              <Text style={[styles.optionText]}>Spice Up</Text>
              <Right height={hp(2)} width={hp(2)}/>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default RepostDrawer; 