import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../../../theme";


export const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:theme.colors.bgColor
    },
    imgContainer:{
        width:wp('100'),
        height:hp('30')
    },
    backButton: {
        position: 'absolute',
        top: hp(2),
        left: wp(2),
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        // backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    img: {
        height: '100%',
        width:'100%',
        backgroundColor:'#2A2A2A'
    },
    bottomContainer: {
        paddingTop: hp(2),
        paddingHorizontal: wp(3),
        flex: 1,
    },
    separator: {
        height : hp(0.2),
        marginVertical: hp(1),
        width:wp(92),
        alignSelf:'center'
    },
    headerText:{
        fontFamily:theme.fontFamily.boldSemi,
        fontSize:wp('5.5'),
        color:theme.colors.white
    },
    decText:{
        fontFamily:theme.fontFamily.regular,
        fontSize:wp('3.5'),
        color: theme.colors.gray,
        marginTop:hp('1'),
        letterSpacing:1,
    },
    tabText:{
        fontFamily:theme.fontFamily.regular,
        fontSize:wp('4'),
        color:theme.colors.gray,
    },
    selectTabText:{
        fontFamily:theme.fontFamily.medium,
        fontSize:wp('4'),
        color:theme.colors.white,
    
    },
    SelectContainer:{
        borderBottomColor:theme.colors.orange,
        borderBottomWidth:2,
        borderRadius:wp(1),
    },
    postContainer: {
        paddingVertical: hp(2),
        paddingBottom: hp(62),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(20)
    },
    emptyText: {
        color: theme.colors.white,
        fontSize: wp(4),
        fontFamily: theme.fontFamily.regular,
        textAlign: 'center'
    },
    tabView: {
        flex: 1,
        marginTop: hp(2),
    }
})