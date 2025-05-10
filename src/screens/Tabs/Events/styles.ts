import { getTheme } from '../../../theme';
import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const theme = getTheme(wp, hp);

export const styles = StyleSheet.create({

    body: {
        height: hp('100'),
        backgroundColor: theme.colors.bgColor,
        flex: 1,
        paddingHorizontal: wp('2'),

    },
    nameText: {
        fontFamily: theme.fontFamily.boldSemi,
        fontSize: wp('4.8'),
        marginLeft: wp('2'),
        textAlignVertical:'center',
        color: 'white'
    },
    dropText: {
        fontFamily: theme.fontFamily.light,
        fontSize: wp('3'),
        marginLeft: wp('2'),
        marginRight: wp('2'),
        marginTop: hp(0.2),
        textAlignVertical:'center',
        color: 'white'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
    },
    titleContainer2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
    //   marginTop: hp(1),
      marginTop: hp(4)
    },
    innerContainer: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        width: '87%',
        alignItems: 'center',
        marginTop: hp(1),
    },
    SeeAllText: {
        fontFamily: theme.fontFamily.regular,
        fontSize: wp('3.5'),
        marginTop: hp(0.7),
        marginRight: wp(3),
        color: theme.colors.neworange,
    },
    treadingContainer:{
        marginTop:hp(1.5),
        marginLeft: wp(2)
    },
    dateContainer:{
        paddingHorizontal:wp('5'),
        paddingVertical:hp(1),
        backgroundColor:theme.colors.neworange,
        marginRight:wp(2)
    },
    titleDate: {
        fontSize: wp(4.2),
        fontFamily: theme.fontFamily.medium,
        color: 'white',
    },
    emptyContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    comingSoonTxt: {
        textAlign:'center',
        fontSize: wp(4.2),
        fontFamily: theme.fontFamily.medium,
        color:'white'
    }
})