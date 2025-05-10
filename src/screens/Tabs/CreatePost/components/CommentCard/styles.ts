import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../../theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: hp(2),
  },
  mainComment: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
  },
  avatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginRight: wp(3),
  },
  contentContainer: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  username: {
    fontSize: wp(3.8),
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.white,
    marginRight: wp(2),
  },
  time: {
    fontSize: wp(3.2),
    color: theme.colors.gray,
    fontFamily: theme.fontFamily.regular,
  },
  commentText: {
    fontSize: wp(3.5),
    color: theme.colors.white,
    fontFamily: theme.fontFamily.regular,
    marginBottom: hp(1),
    lineHeight: hp(2.2),
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  actionText: {
    fontSize: wp(3.2),
    color: theme.colors.gray,
    fontFamily: theme.fontFamily.regular,
  },
  repliesSection: {
    marginLeft: wp(13),
    marginTop: hp(1),
  },
  replyContainer: {
    marginTop: hp(1),
  },
  replyContent: {
    flexDirection: 'row',
    paddingRight: wp(4),
  },
  replyAvatar: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    marginRight: wp(3),
  },
  replyTextContainer: {
    flex: 1,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  showRepliesButton: {
    paddingVertical: hp(1),
  },
  showRepliesText: {
    fontSize: wp(3.2),
    color: theme.colors.orange,
    fontFamily: theme.fontFamily.medium,
  },

  pollContainer: {
    marginTop: hp(1),
    padding: wp(3),
    backgroundColor: '#243139',
    marginBottom: hp(1),
  },
  pollQuestion: {
    fontSize: wp(4),
    fontFamily: theme.fontFamily.regular,
    marginVertical: hp(1),
    color: 'white',
  },
  pollOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#0B1E29',
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(2),
    borderWidth: 1,
    borderColor: '#BEBAB9',
    marginBottom: hp(0.8),
  },
  selectedOption: {
    backgroundColor: '#122E3E',
  },
  optionText: {
    fontSize: wp(4),
    color: '#333',
  },
  pollOptionText: {
    marginLeft: 'auto',
    color: '#fff',
    fontFamily: theme.fontFamily.regular,
    fontSize: wp(4),
  },
  voteButton: {
    marginTop: hp(1),
    paddingVertical: hp(1),
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: wp(2),
  },
  pollOptionVotes: {
    color: '#fff',
    fontFamily: theme.fontFamily.regular,
    fontSize: wp(4),
  },
  showMoreTxt: {
    color: theme.colors.orange,
    fontFamily: theme.fontFamily.regular,
    fontSize: wp(3.2),
    marginTop: hp(1),
  }
}); 