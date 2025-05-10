import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../../theme';
import ImageIcon from '../../../../../assets/svg/gallery.svg';
import GifIcon from '../../../../../assets/svg/gif.svg';
import PollIcon from '../../../../../assets/svg/poll.svg';

interface BottomActionsProps {
  showPoll?: boolean;
  showImage?: boolean;
  onImagePress: () => void;
  onGifPress: () => void;
  onPollPress: () => void;
}

const BottomActions: React.FC<BottomActionsProps> = ({
  showPoll=false,
  showImage=false,
  onImagePress,
  onGifPress,
  onPollPress,
}) => {
  return (
    <View style={styles.container}>
      {showImage && <TouchableOpacity onPress={onImagePress} style={styles.iconButton}>
        <ImageIcon width={wp(6)} height={wp(6)} />
      </TouchableOpacity>}
      {/* <TouchableOpacity onPress={onGifPress} style={styles.iconButton}>
        <GifIcon width={wp(6)} height={wp(6)} />
      </TouchableOpacity> */}
      {showPoll && <TouchableOpacity onPress={onPollPress} style={styles.iconButton}>
        <PollIcon width={wp(6)} height={wp(6)} />
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray,
  },
  iconButton: {
    padding: wp(2),
    marginRight: wp(4),
  },
});

export default BottomActions; 