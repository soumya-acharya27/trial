import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styles } from './styles';
import { useBlockUser } from '../../../../hooks/useBlockUser';
import { Post } from '../../../../interface/clubinterface';

interface Props {
  visible: boolean;
  onClose: () => void;
  onOptionPress: (optionId: string) => void;
  userId: string;
  postId: string;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostOptionsMenu: React.FC<Props> = ({ 
  visible, 
  onClose, 
  onOptionPress,
  userId, 
  setPosts 
}) => {
  const { blockUser, loading } = useBlockUser();

  const options = [
    { id: 'reportPost', label: 'Report Post' },
    { id: 'blockUser', label: 'Block User', isDestructive: true },
  ];

  const handleOptionPress = async (id: string) => {
    if (id === 'blockUser') {
      try {
        const response = await blockUser(userId, true);
        if (response) {
          setPosts(prevPosts => prevPosts.filter(post => post.userId !== userId));
        }
      } catch (error) {
        console.error('Error blocking user:', error);
      }
      onClose();
    } else {
      onOptionPress(id);
    }
  };

  if (!visible) return null;

  return (
    <View 
      style={[
        styles.menuContainer,
        {
          position: 'absolute',
          top: hp(4),
          right: wp(2),
          zIndex: 999
        }
      ]}
    >
      {options.map((option, index) => (
        <Pressable
          key={option.id}
          style={[
            styles.menuItem,
            index === options.length - 1 && styles.lastItem
          ]}
          onPress={() => handleOptionPress(option.id)}
          disabled={loading}
        >
          <Text style={[
            styles.menuText,
            option.isDestructive && styles.blockText,
            loading && { opacity: 0.6 }
          ]}>
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default PostOptionsMenu; 