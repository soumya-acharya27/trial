import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getTheme } from '../../../../../theme';
const theme = getTheme(wp, hp);

export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: theme.colors.bgColor,
        paddingHorizontal: wp(4),
        paddingBottom: hp(2),
    },
    banner: {
        marginTop: hp(4),
        backgroundColor:'#AEFFC5',
        paddingVertical: hp(1),
        width:'100%'
    },
    bannerTxt: {
        color: '#005C25',
        fontSize: wp(3.2),
        textAlign:'center',
        fontFamily: theme.fontFamily.medium
    },
    ticket: {
        backgroundColor: theme.colors.bgColor,
        alignItems: "center",
        width: "100%",
        alignSelf: "center",
        borderColor: "#A0A0A0",
        borderWidth: wp(0.5),
        marginTop: hp(2)
    },
    eventInfo: {
        flexDirection: "row",
        backgroundColor: "#243139",
        padding: hp(1),
        paddingVertical: hp(2),
        width: "100%",
        alignItems: "center",
      },
      eventImage: {
        width: wp(20),
        height: hp(9),
        marginRight: wp(3),
        backgroundColor:'powderblue'
      },
      eventDetails: {
        flex: 1,
      },
      eventName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
      },
      infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
      },
      infoText: {
        fontSize: 14,
        color: "#B0BEC5",
        marginLeft: 6,
      },
      image: {
        backgroundColor: "#FFF",
        width: wp(50),
        height: wp(50),
      },
      qrContainer: {
        marginVertical: hp(7),
        paddingHorizontal: wp(10),
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height: hp(20),
      },

})