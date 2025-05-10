import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from "../../../../../theme";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bgColor,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(4),
      paddingVertical: hp(2),
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    headerTitle: {
      marginLeft: wp(2),
      fontSize: wp(5),
      fontWeight: 'bold',
    },
    commentContainer: {
      flexDirection: 'row',
      paddingHorizontal: wp(4),
      paddingVertical: hp(1.5),
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    profileImage: {
      width: wp(10),
      height: wp(10),
      borderRadius: wp(5),
    },
    commentContent: {
      marginLeft: wp(3),
      flex: 1,
    },
    userName: {
      fontWeight: 'bold',
      fontSize: wp(4),
      marginBottom: hp(0.5),
    },
    commentText: {
      color: '#444',
      fontSize: wp(3.5),
      marginBottom: hp(1),
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: wp(4),
    },
    actionText: {
      marginLeft: wp(1),
      color: '#666',
      fontSize: wp(3.5),
    },
    replyInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(4),
      paddingVertical: hp(1.5),
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    replyInput: {
      flex: 1,
      height: hp(5),
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: wp(5),
      paddingHorizontal: wp(3),
    },
    sendButton: {
      marginLeft: wp(3),
    },
    sendIcon: {
      width: wp(6),
      height: wp(6),
    },
  });