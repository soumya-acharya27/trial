import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../../../../theme";

export const styles = StyleSheet.create({
    container: {

    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        // padding: hp(1.5),
        paddingHorizontal: hp(1.5),
        paddingVertical: hp(0.2),
        borderRadius: wp(2.5),
        marginTop: hp(1)
      },
      image: {
        width: wp(25),
        height: wp(25),
        // borderRadius: wp(2.5),
        backgroundColor:'pink'
      },
      info: {
        flex: 1,
        marginLeft: wp(4),
        alignSelf:'flex-start',
        paddingTop: hp(0.5)
      },
      joinContainer: {
        width: wp(20),
      },
      dateContainer: {
        backgroundColor:'#f5f5f5',
        width: wp(30),
        height: hp(3),
        alignItems:'center',
        justifyContent:'center',
        borderRadius: wp(5),
        marginBottom: hp(0.5)
      },
      date: {
        fontSize: wp(3.5),
        color: theme.colors.orange,
        fontFamily: theme.fontFamily.regular,
        textAlign:'center'
      },
      clubName: {
        fontSize: wp(4.5),
        fontFamily: theme.fontFamily.medium,
        color: 'white',
        marginBottom: hp(0.5)
      },
      role: {
        fontSize: wp(3.5),
        color: '#666',
        fontFamily: theme.fontFamily.regular,
      },
      postContainer: {
        paddingVertical: hp(2),
        flexGrow:1
      }
})