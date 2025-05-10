import { View, Text, Pressable, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, Animated, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { useMutation } from '@apollo/client';
import { GET_POSTS_MUTATION } from '../../../graphql/user/userMutation';
import { GetPostsInput, GetPostsResponse, Post } from '../../../interface/clubinterface';
import { errorMessage, getDummyProfile, showErrorToast } from '../../../utils';
import { RootState } from '../../../redux-saga/rootReducer';
import Logo from "../../../assets/svg/peerhublog.svg"
import Search from "../../../assets/svg/search.svg"
import BurgerIcon from "../../../assets/svg/burgerIcon.svg"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SideMenu from './components/SideMenu';
import CustomPopup from '../../../component/CustomPopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_CREDENTIALS } from '../../../constants';
import PostListRenderer from '../../../component/PostListRenderer';
import { toggleShowBrowseModal, toggleShowVerifyModal } from '../../../redux-saga/club/clubAction';
import { logger } from '../../../utils/logger';

interface DashboardProps {
  navigation: NativeStackNavigationProp<any>;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const token = useSelector((state: RootState) => state.authReducer.accessToken)
  const user = useSelector((state: RootState) => state.authReducer)
  const { isCollegeVerified, profileUnderReview } = user?.userInfo
  const dispatch = useDispatch()


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp()
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  const checkForAccess = () => {
      if(!isCollegeVerified){
        dispatch(toggleShowVerifyModal(true))
        return true;
      }
      if(profileUnderReview) {
          dispatch(toggleShowBrowseModal(true))
          return true;
      }
      return false;
  }

  // State to hold posts data and hasMore flag
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showLogout, setShowLogout] = useState(false)

  const [getPosts, { data, loading: mutationLoading, error }] = useMutation<GetPostsResponse, { input: GetPostsInput }>(GET_POSTS_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-wp(100))).current;

  const handleVerify = () => {
    navigation.navigate('profileVerify', {step:2, goBack: () => navigation.goBack()})
  }

  const toggleMenu = (show: boolean) => {
    Animated.timing(slideAnim, {
      toValue: show ? 0 : -wp(100),
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsMenuOpen(show);
  };

  const logoutCta = async () => {
    await AsyncStorage.removeItem(STORAGE_CREDENTIALS)
    navigation.navigate('AuthNevigator')
  }

  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        // Only fetch posts if there are no posts in the feed or if refreshPosts param is true
        const shouldRefresh = navigation.getState().routes[navigation.getState().index]?.params?.refreshPosts;
        if (posts.length === 0 || shouldRefresh) {
          setLoading(true);
          try {
            let { data: newData } = await getPosts({
              variables: {
                input: {
                  limit: 10,
                  page: 1,
                },
              },
            });
            // Reset refreshPosts param so it doesn't refetch on next focus
            if (shouldRefresh) {
              navigation.setParams({ refreshPosts: false });
            }
            if (newData?.getPosts?.posts) {
              setPosts(newData.getPosts.posts);
              setHasMore(newData.getPosts.hasMore);
            }
          } catch (error) {
            console.error('Error loading posts:', error);
            showErrorToast(errorMessage);
          } finally {
            setLoading(false);
          }
        }
      };

      fetchPosts();
    }, [getPosts, posts.length, navigation])
  )


  const loadMorePosts = async () => {
    if (hasMore && !mutationLoading && data?.getPosts?.posts?.length > 0) {
      try {
        setLoading(true)
        let { data: newData } = await getPosts({
          variables: {
            input: {
              limit: 10,
              page: Math.floor(posts.length / 10) + 1,
            },
          },
        });

        if (newData?.getPosts?.posts) {
          setPosts((prevPosts) => [...prevPosts, ...newData.getPosts.posts]);
          setHasMore(newData.getPosts.hasMore);
        }
      } catch (error) {
        console.error('Error loading more posts:', error);
        showErrorToast(errorMessage);
      } finally {
        setLoading(false)
      }
    }
  };

  const refreshPosts = async () => {
    setRefreshing(true);
    try {
      const { data: refreshedData } = await getPosts({
        variables: {
          input: {
            limit: 10,
            page: 1,
          },
        },
      });

      if (refreshedData?.getPosts?.posts) {
        setPosts(refreshedData.getPosts.posts);
        setHasMore(refreshedData.getPosts.hasMore);
      }
    } catch (error) {
      console.error('Error refreshing posts:', error);
      showErrorToast(errorMessage);
    } finally {
      setRefreshing(false);
    }
  };

  const navigateToPost = () => {
    if(checkForAccess()) return;
    navigation.navigate('createPost', { type: 'POST' })
  }


  // FastImage cache cleanup on unmount
  useEffect(() => {
    return () => {
      FastImage.clearMemoryCache();
      FastImage.clearDiskCache();
    };
  }, []);

  // Memoize heavy components
  const MemoizedPostListRenderer = useMemo(() => PostListRenderer, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigateToPost()} style={styles.plusContainer}>
        <Text style={styles.plusTxt}>+</Text>
      </Pressable>

      <View style={styles.header}>
        <Pressable onPress={() =>navigation.navigate('profiles', { screen: 'profile' })}>
          <FastImage
            style={styles.profilePic}
            source={{ 
              uri: user?.userInfo?.profilePicId ?? getDummyProfile(user?.userInfo?.name) 
            }}
          />
        </Pressable>
        <View style={styles.logoContainer}>
          <Logo width={wp(30)} height={hp(4)} />
        </View>
        <TouchableOpacity
          style={[styles.menuButton, {marginRight: wp(4)}]}
          onPress={() => navigation.navigate('search', {type: 'POST'})}
        >
          <Search width={wp(6)} height={wp(6)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => toggleMenu(true)}
        >
          <BurgerIcon width={wp(6)} height={wp(6)} />
        </TouchableOpacity>
      </View>

      {(!isCollegeVerified || profileUnderReview) && (
        <View style={styles.alertBanner}>
          {!isCollegeVerified ? (
            <View style={{flexDirection:'row', }}>
            <Text style={styles.alertContent}>
              Get verified to interact with your Peers.{' '}
            </Text>
            <Pressable onPress={handleVerify}>
              <Text style={[styles.alertContent, styles.underline]}>
                Verify Now
              </Text>
            </Pressable>
          </View>
          ) : (
            <Text style={styles.alertContent}>Your profile will be verified within 24 hours</Text>
          )}
        </View>
      )}


      {isMenuOpen && (
        <SideMenu
          onClose={() => toggleMenu(false)}
          slideAnim={slideAnim}
          logoutCta={() => setShowLogout(true)}
        />
      )}

      <MemoizedPostListRenderer posts={posts} loadMorePosts={loadMorePosts} loading={loading} refreshPosts={refreshPosts} refreshing={refreshing} setPosts={setPosts} />

      <CustomPopup
        visible={showLogout}
        title="Are you sure you want to logout?"
        primaryText="Yes"
        secondaryText="No"
        onPrimaryCta={() => {
          setShowLogout(false);
          logoutCta()
        }}
        onSecondaryCta={() => setShowLogout(false)}
        onClose={() => setShowLogout(false)}
      />
    </View>
  );
};

export default Dashboard;