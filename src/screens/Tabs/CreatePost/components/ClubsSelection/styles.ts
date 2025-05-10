import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from "../../../../../theme";


export const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: wp('100%'),
      height: hp('100%'),
      backgroundColor: theme.colors.bgColor,
      borderRadius: wp('2%'),
      padding: wp('4%'),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: wp(4),
  },
    headerTitle: {
      fontSize: wp('5%'),
      fontWeight: 'bold',
      color: '#fff',
    },
    closeButton: {
      fontSize: wp('5%'),
      color: theme.colors.gray,
    },
    clubItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: hp('2%'),
    },
    clubInfo: {
      flex: 1,
    },
    clubCategory: {
      fontSize: wp('3.5%'),
      color: theme.colors.gray,
      fontFamily: theme.fontFamily.regular
    },
    selectedClubCategory: {
        color: theme.colors.white,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
    },
    selectedClubItem: {
        backgroundColor: theme.colors.gray,
        borderColor: theme.colors.orange,
        borderWidth: 1,
      },
      postButton: {
        marginTop: 10,
        paddingVertical: 12,
        backgroundColor: theme.colors.orange,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
      },
      disabledPostButton: {
        backgroundColor: theme.colors.gray,
      },
      postButtonText: {
        color: theme.colors.white,
        fontSize: 16,
        fontWeight: 'bold',
      },

      selectionCount: {
        color: '#BEBAB9',
        fontSize: wp(4),
        textAlign: 'center',
        marginTop: hp(1),
        marginBottom: hp(2),
        fontFamily: theme.fontFamily.medium,
      },
    
      clubsGrid: {
        flex: 1,
        paddingHorizontal: wp(2),
      },
    
      gridRow: {
        justifyContent: 'space-between',
        marginBottom: hp(2),
      },
    
      clubItemContainer: {
        width: wp(43),
        backgroundColor: '#243139',
        // borderRadius: wp(2),
        paddingHorizontal: wp(3),
        paddingVertical: hp(2),
        alignItems: 'center',
      },
    
      clubImage: {
        width: wp(15),
        height: wp(15),
        borderRadius: wp(7.5),
        marginBottom: hp(1),
        backgroundColor:'powderblue'
      },
    
      clubName: {
        fontSize: wp(3.5),
        color: theme.colors.white,
        fontFamily: theme.fontFamily.medium,
        marginBottom: hp(0.5),
        textAlign: 'center',
      },
    
      memberCount: {
        marginBottom: hp(1),
      },
    
      memberCountText: {
        fontSize: wp(3),
        color: theme.colors.gray,
        fontFamily: theme.fontFamily.regular,
      },
    
      selectButton: {
        width: '100%',
        paddingVertical: hp(1),
        borderRadius: wp(1),
        borderWidth: wp(0.5),
        borderColor: theme.colors.orange,
        alignItems: 'center',
        backgroundColor: '#243139',
      },
    
      selectedButton: {
        backgroundColor: theme.colors.orange,
      },
      topTxt: {
        color: '#FFEEE6',
        fontSize: wp(4.5),
        fontFamily: theme.fontFamily.medium,
        textAlign:'center'
      },
    
      selectButtonText: {
        color: theme.colors.white,
        fontSize: wp(3.5),
        fontFamily: theme.fontFamily.medium,
      },
    
      selectedButtonText: {
        color: theme.colors.orange,
      },
      
    noClubsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp(2),
    },
    noClubsText: {
        color: 'white',
        fontSize: wp(4),
        textAlign: 'center',
        marginBottom: hp(3),
        fontFamily: theme.fontFamily.medium,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: wp(10),
    }
  });