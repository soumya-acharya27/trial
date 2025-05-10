import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getTheme } from '../../../theme';

const theme = getTheme(wp, hp);

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bgColor
      },
      header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
        flexDirection:'row',
      },
      backContainer:{
        paddingTop:hp('1')
      },
      title: {
        fontSize: wp('5'),
        color: '#FFEEE6',
        // marginTop: wp('2'),
        marginLeft:wp('1'),
        fontFamily:theme.fontFamily.boldSemi
      },
      profilePic: {
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: wp('5%'),
        marginRight: wp('4%'),
        resizeMode:'cover',
        backgroundColor: '#1A1A1A'
      },
      subtitle: {
        fontSize: wp('5'),
        color: '#0B1E29',
        marginTop: 4,
        fontFamily:theme.fontFamily.medium
      },
      messageContainer: {
        flexDirection: 'row',
        marginVertical: wp('2'),
        marginHorizontal: wp('4'),
        alignItems: 'flex-end',
      },
      sender: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
      },
      receiver: {
        alignSelf: 'flex-start',
      },
      profileImage: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        marginRight: 8,
        backgroundColor:'powderblue'
      },
      messageBubble: {
        maxWidth: '75%',
        borderBottomLeftRadius:wp('3'),
        borderBottomRightRadius:wp('3'),
        borderTopRightRadius:wp('3'),
        backgroundColor: '#243139',
        paddingTop:hp('1'),
        paddingHorizontal:wp('3.5')
      },
      messageBubbleSender: {
        maxWidth: '75%',
        borderBottomLeftRadius:wp('3'),
        borderTopRightRadius:wp('3'),
        borderTopLeftRadius:wp('3'),
        backgroundColor: '#3E474C',
        paddingTop:hp('1'),
        paddingHorizontal:wp('3.5')
      },
      messageText: {
        fontSize:wp('4'),
        color: '#FFEEE6',
        fontFamily:theme.fontFamily.regular
      },
      messageTime: {
        fontSize:wp('2.5'),
        color: '#BEBAB9',
        fontFamily:theme.fontFamily.regular,
        paddingBottom:hp('1'),
        marginTop:hp('1'),
        textAlign: 'right',
      },
      messageTextSender: {
        fontSize:wp('4'),
        color: '#FFEEE6',
        fontFamily:theme.fontFamily.regular
      },
      messageTimeSender: {
        fontSize:wp('2.5'),
        color: '#BEBAB9',
        fontFamily:theme.fontFamily.regular,
        marginTop: wp('3'),
        textAlign: 'right',
        paddingBottom:hp('1')
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#243139',
        borderRadius: 25,
        margin: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'white',
        maxHeight: hp(12), // Maximum height before scrolling
        minHeight: hp(5), // Minimum height
    },
      sendButton: {
        padding: 10,
        borderRadius: 20,
      },
      sendButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
      iconButton: {
        padding: 8,
      },
      dateHeader: {
        paddingVertical: hp(1),
        paddingHorizontal: wp(4),
        backgroundColor: theme.colors.bgColor,
        alignItems: 'center',
        marginVertical: hp(1),
      },
      dateText: {
        fontSize: wp(3.5),
        fontFamily: theme.fontFamily.regular,
        color: theme.colors.gry,
      },
      loaderContainer: {
        paddingVertical: hp(2),
        alignItems: 'center',
      },
      messagesContainer: {
        paddingBottom: hp(2),
      },
})