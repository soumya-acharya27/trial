import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../../theme";

export const  styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
    padding: hp(1),
    position:'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: theme.colors.bgColor,
  },
  rightIconsContainer: {
    marginRight: 0,
    width: wp(20), // Slightly wider to accommodate both icons
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  iconDivider: {
      width: wp(0.2),
      height: '100%',
      backgroundColor: theme.colors.gray,
  },
  left: {
    position:'absolute',
    left: wp(4),
  },
  postContainer: {
    backgroundColor:theme.colors.bgColor,
    padding: wp('3%'),
    marginHorizontal: wp(2),
    borderWidth: wp(0.2),
    borderColor:'#404040',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1'),
  },
  profilePic: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    marginRight: wp('1%'),
    resizeMode:'cover',
    backgroundColor: '#1A1A1A'
  },
  repostedImg: {
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: wp('3%'),
    marginRight: wp(2),
  },
  loadingImage: {
    backgroundColor: '#2A2A2A'
  },
  userName: {
    fontSize: wp('4%'),
    fontFamily: theme.fontFamily.medium,
    color:'white',
    width: wp(43),
  },
  repostTxt: {
    fontSize: wp('4%'),
    fontFamily: theme.fontFamily.medium,
    color:'white',
  },
  clubName: {
    fontSize: wp('3.5%'),
    color: theme.colors.gray,
    fontFamily: theme.fontFamily.regular,
    width: wp(43),
  },
  followButton: {
    marginLeft: 'auto',
    backgroundColor:theme.colors.orange,
    paddingVertical: hp('0.7'),
    width: wp(22),
    alignItems:'center',
    justifyContent:'center'
  },
  unFollowButton: {
    backgroundColor: '#818181'
  },
  followButtonText: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontFamily: theme.fontFamily.bold,
    textAlign:'center'
  },
  postImageContainer: {
    width: '100%',
    position: 'relative',
    // aspectRatio: 1,
    backgroundColor: '#1A1A1A'
  },
  postImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  videoContainer: {
    width: '100%',
    height: hp('25%'),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
  },
  videoText: {
    color: '#fff',
    fontSize: wp('4%'),
  },
  postDescription: {
    fontSize: wp('3.8%'),
    marginBottom: hp('1%'),
    color:'white',
    lineHeight: hp(2.2),
  },
  interactionContainer: {
    flexDirection: 'row',
    marginTop: hp('1%'),
    justifyContent:'space-between'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1%'), 
    borderColor:theme.colors.gray,
    borderWidth: wp(0.2),
    marginRight: wp(3),
     height: hp(3.2),
    paddingHorizontal: wp(1),
    borderRadius: wp(1),
    width: wp(15),
    justifyContent:'center',
  },
  iconText: {
    fontSize: wp('3.5%'),
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.gray,
  },
  saveIcon: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  interactionText: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  separator: {
    height : hp(0.2),
    marginVertical: hp(1),
    width:wp(92),
    alignSelf:'center'
  },
  plusContainer : {
    position:'absolute',
    bottom: hp(2),
    right: hp(2),
    backgroundColor:theme.colors.orange,
    height: hp(5),
    width: hp(5),
    borderRadius: hp(2.5),
    alignItems:'center',
    justifyContent:'center',
    zIndex: 10
  },
  plusTxt: {
    textAlign:'center',
    color:'white',
    fontSize: wp(7)
  },
  menuButton: {
    padding: wp(2),
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: wp(6)
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.bgColor,
    zIndex: 100,
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wp(80),
    height: '100%',
    backgroundColor: theme.colors.bgColor,
    paddingTop: hp(4),
    paddingHorizontal: wp(4),
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: wp(2),
  },
  menuContent: {
    marginTop: hp(4),
  },
  menuItem: {
    color: theme.colors.white,
    fontSize: wp(4),
    fontFamily: theme.fontFamily.medium,
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
  },
  alertBanner: {
    height: hp(4),
    alignItems:'center',
    justifyContent:'center',
    width: '95%',
    marginLeft: wp(2),
    backgroundColor:'#FFE28D',
    borderWidth: wp(0.2),
    borderColor:'#FFD65B',
    marginBottom: hp(2),
  },
  alertContent: {
    textAlign:'center',
    fontSize: wp(3.5),
    fontFamily: theme.fontFamily.medium,
    color:'black'
  },
  underline: {
    fontFamily: theme.fontFamily.bold,
     textDecorationLine: 'underline' 
  },
  repostHeader: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
  },
  repostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  repostText: {
    fontSize: wp(3.5),
    color: theme.colors.gray,
    fontFamily: theme.fontFamily.regular,
  },
  repostedPostContainer: {
    marginTop: hp(2),
    borderWidth: wp(0.2),
    borderColor: theme.colors.borderGray,
    padding: wp(3),
    backgroundColor: theme.colors.bgColor,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  statsText: {
    fontSize: wp(3.5),
    color: theme.colors.gray,
    fontFamily: theme.fontFamily.regular,
  },
  reppostContainer: {
    borderColor: theme.colors.orange,
    borderWidth: wp(0.25),
    flexDirection:'row',
    alignItems:'center',
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(2),
  },
  respostedTxt: {
    color: theme.colors.orange,
    fontFamily: theme.fontFamily.medium,
    fontSize: wp(3.8),
    marginLeft: wp(1)
  }
});