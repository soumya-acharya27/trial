import { View, Text, Pressable, ActivityIndicator, BackHandler, FlatList, useWindowDimensions, PanResponder, Animated, Keyboard } from 'react-native'
import React, { useCallback, useEffect, useState, useRef, memo } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { styles } from './styles'
import Back from "../../../assets/svg/Back.svg"
import Logout from "../../../assets/svg/logout.svg"
import Edit from "../../../assets/svg/edit.svg"
import Chat from "../../../assets/svg/chatIcon.svg"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ProfileContainer from './components/ProfileContainer'
import Tabs from './components/ProfileTabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_CREDENTIALS } from '../../../constants'
import CustomPopup from '../../../component/CustomPopup'
import { RootState } from '../../../redux-saga/rootReducer'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_USER_INFO, VALIDATE_USERNAME } from '../../../graphql/auth/authQuery'
import { GET_USERDETAILS } from '../../../graphql/user/userQuery'
import { GetUserInfoResponse, GetUserInfoVariables, GetUserProfileResult, GetUserProfileVariables, User } from '../../../interface/signUpInterface'
import ProfileClubs from './components/ProfileClubs'
import { Club, GetLikedPostsResponse, GetPostsInput, GetPostsResponse, GetUserJoinedClubsResponse, GetUserJoinedClubsVariables, Post } from '../../../interface/clubinterface'
import { GET_USER_JOINED_CLUBS } from '../../../graphql/clubs/clubsMutation'
import RenderPost from '../Dashboard/components/PostCard'
import { useLikePost } from '../../../hooks/useLikePost'
import { GET_LIKED_POSTS, GET_POSTS_MUTATION } from '../../../graphql/user/userMutation'
import { errorMessage, showErrorToast } from '../../../utils'
import PostListRenderer from '../../../component/PostListRenderer'
import { useFollowUser } from '../../../hooks/useFollowUser'
import { useUnFollowUser } from '../../../hooks/useUnFollowUser'
import { ButtonCustom } from '../../../component/ButtonCustom'
import { GET_USER_COMMENTS } from '../../../graphql/post/postQuery'
import { GetUserCommentsResponse, GetUserCommentsInput, Comment } from '../../../interface/postinterface'
import CommentCard from '../CreatePost/components/CommentCard'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { theme } from '../../../theme'
import FastImage from 'react-native-fast-image'

const Profile = () => {
  const credentials = useSelector((state: RootState) => state.authReducer)
  const [activeTab, setActiveTab] = useState(0)
  const [showLogout, setShowLogout] = useState(false)
  const tabs = ["Posts", "Comments", "Likes", "Clubs"];
  const [userData, setUserData] = useState<User | undefined>(undefined)
  const [noOfPosts, setNoOfPosts] = useState<string>('')
  const { isCollegeVerified, profileUnderReview } = credentials?.userInfo

  const [clubs, setClubs] = useState<Club[]>([]);
  const [clubsPage, setClubsPage] = useState(1);
  const [clubsHasMore, setClubsHasMore] = useState(true);
  const [clubsInitialLoading, setClubsInitialLoading] = useState(true)

  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [likedPosts, setLikedPosts] = useState<Post[]>([])
  const [hasMoreLikedPosts, setHasMoreLikedPosts] = useState(true)

  const { likePost } = useLikePost()
  const [getPosts, { data: postData, loading: postLoading, error: postError }] = useMutation<GetPostsResponse, { input: GetPostsInput }>(GET_POSTS_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${credentials?.accessToken}`,
      }
    },
  });

  const [fetchLikedPosts, { loading: likeLoading, error: likedError, data: likePostData }] = useLazyQuery<GetLikedPostsResponse, { input: GetPostsInput }>(GET_LIKED_POSTS, {
    context: {
      headers: {
        authorization: `Bearer ${credentials?.accessToken}`,
      }
    },
    fetchPolicy: 'cache-and-network',
  });

  const route = useRoute()
  const { userId = '', isBack = false } = route?.params as { userId?: string, isBack?: boolean, } ?? {}
  const currentUserId = userId?.length ? userId : credentials?.id
  const [getUserProfile, { loading, }] = useLazyQuery<GetUserProfileResult, GetUserProfileVariables>(GET_USERDETAILS, {
    context: {
      headers: {
        authorization: `Bearer ${credentials?.accessToken}`,
      }
    },
    fetchPolicy: 'cache-and-network',
  });

  const fetchPosts = async () => {
    try {
      let { data: newData } = await getPosts({
        variables: {
          input: {
            limit: 10,
            page: 1,
            userId: currentUserId,
            userPostsOnly: true,
          },
        },
      });
      // newData = mockProfile
      if (newData?.getPosts?.posts) {
        setPosts(newData.getPosts.posts);
        setHasMore(newData.getPosts.hasMore);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      showErrorToast(errorMessage);
    }
  };

  const getLikedPosts = async () => {
    try {
      let { data: newData } = await fetchLikedPosts({
        variables: {
          input: {
            limit: 10,
            page: 1,
            userId: currentUserId,
            userPostsOnly: true,
          },
        },
      });
      if (newData?.getLikedPosts?.posts) {
        setLikedPosts(newData.getLikedPosts.posts);
        setHasMoreLikedPosts(newData.getLikedPosts.hasMore);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      showErrorToast(errorMessage);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
      getLikedPosts()
    }, [currentUserId, getPosts])
  );

  const [fetchClubs, { loading: clubsLoading, data }] = useLazyQuery<
    GetUserJoinedClubsResponse,
    GetUserJoinedClubsVariables
  >(GET_USER_JOINED_CLUBS, {
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: `Bearer ${credentials?.accessToken}`,
      }
    },
    onCompleted: (data) => {
      const newClubs = data.getUserJoinedClubs.clubs;
      setClubs((prevClubs) => [...prevClubs, ...newClubs]);
      setClubsHasMore(data.getUserJoinedClubs.hasMore);
      if (clubsPage === 1) setClubsInitialLoading(false);

    },
    onError: (err) => {
      if (clubsPage === 1) {
        setClubsInitialLoading(false);
        setClubsHasMore(false)
      }
    },

  });


  const loadMoreClubs = () => {
    if (clubsHasMore && !clubsLoading) {
      fetchClubs({
        variables: {
          limit: 20,
          page: clubsPage + 1,
          userId: currentUserId
        },
      });
      setClubsPage((prevPage) => prevPage + 1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setClubsInitialLoading(true);
      setClubsPage(1);
      setClubs([])
      fetchClubs({
        variables: {
          limit: 20,
          page: 1,
          userId: currentUserId || undefined
        }
      });
    }, [currentUserId])
  );


  const [fetchUserInfo, { loading: fetchUserInfoLoading }] = useLazyQuery<GetUserInfoResponse, GetUserInfoVariables>(
    GET_USER_INFO,
    {
      context: {
        headers: {
          authorization: `Bearer ${credentials?.accessToken}`,
        }
      },
      fetchPolicy: 'cache-and-network', // Adjust fetch policy as needed
    }
  );

  const userProfileLoading = fetchUserInfoLoading || loading

  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const isMyProfile = userId === credentials?.id || userId === '';
  const goBack = () => {
    if (isBack) return navigation.goBack()
    navigation.navigate('dashboard', { screen: 'listing', })
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        goBack()
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {

      const fetchData = async () => {
        try {
          let response

          // if (isMyProfile) {
          //   console.log("userdata2 if", { isMyProfile })
          //   response = await getUserProfile()
          //   console.log("response is ", response)
          //   console.log("userdata", { response })
          //   setUserData(response?.data?.getUserProfile?.user ?? undefined)
          // } else {
          //   console.log("userdata2 else", { isMyProfile })
          //   // response = await fetchUserInfo({
          //   //   variables: {
          //   //     userId: userId
          //   //   }
          //   // })
            response = await fetchUserInfo({
              context: {
                headers: {
                  authorization: `Bearer ${credentials?.accessToken}`,
                }
              },
              variables: { userId: currentUserId }
            });
            setUserData(response?.data?.getUserInfo?.user ? { ...response?.data?.getUserInfo?.user, isFollowed: response?.data?.getUserInfo?.isFollowed } : undefined)
            setNoOfPosts(response?.data?.getUserInfo?.totalPostCount?.toString() ?? '')
          // }

        } catch (err) {
        }
      }
      fetchData()
    }, [currentUserId])
  )

  const loadMorePosts = async () => {
    if (hasMore && !postLoading) {
      try {
        let { data: newData } = await getPosts({
          variables: {
            input: {
              limit: 10,
              page: Math.floor(posts.length / 10) + 1,
              userId: currentUserId,
              userPostsOnly: true,
            },
          },
        });

        if (newData?.getPosts?.posts) {
          setPosts(prevPosts => {
            const newPosts = [...prevPosts, ...newData.getPosts.posts];
            return newPosts;
          });
          setHasMore(newData.getPosts.hasMore);
        }
      } catch (error) {
        console.error('Error loading more posts:', error);
        showErrorToast(errorMessage);
      }
    }
  };

  const loadMoreLikedPosts = async () => {
    if (hasMoreLikedPosts && !likeLoading) {
      try {
        let { data: newData } = await fetchLikedPosts({
          variables: {
            input: {
              limit: 10,
              page: Math.floor(posts.length / 10) + 1,
              userId: currentUserId,
              userPostsOnly: true,
            },
          },
        });

        if (newData?.getLikedPosts?.posts) {
          setLikedPosts((prevPosts) => [...prevPosts, ...newData.getLikedPosts.posts]);
          setHasMoreLikedPosts(newData.getLikedPosts.hasMore);
        }
      } catch (error) {
        console.error('Error loading more posts:', error);
        showErrorToast(errorMessage);
      }
    }
  };


  const editCta = () => {
    navigation.navigate('ProfileEdit', { userData })
  }

  const logoutCta = async () => {
    await AsyncStorage.removeItem(STORAGE_CREDENTIALS);
    setPosts([]);
    setLikedPosts([]);
    setClubs([]);
    navigation.navigate('AuthNevigator');
  };

  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);

  const [fetchComments, { loading: commentsLoading }] = useLazyQuery<GetUserCommentsResponse, { input: GetUserCommentsInput }>(
    GET_USER_COMMENTS,
    {
      fetchPolicy: 'network-only',
      context: {
        headers: {
          authorization: `Bearer ${credentials?.accessToken}`,
        }
      },
      onCompleted: (data) => {
        const { comments: newComments, hasMore } = data?.getUserComments || {};
        setComments((prev) => [...prev, ...newComments || []]);
        setHasMore(hasMore);
      },
      onError: (error) => {
        console.error('comments Error fetching user comments:', error);
        setHasMore(false);
      },
    }
  );

  // Initial fetch when component mounts or userData changes
  useFocusEffect(
    useCallback(() => {
      if (currentUserId) {
        setComments([]);
        setPage(1);
        setHasMore(true);
        fetchComments({
          variables: {
            input: {
              userId: currentUserId,
              limit: 25,
              page: 1,
            },
          },
        });
      }
    }, [currentUserId])
  )

  const loadMoreComments = () => {
    if (!commentsLoading && hasMore && userData?.id) {
      fetchComments({
        variables: {
          input: {
            userId: currentUserId,
            limit: 25,
            page: page + 1,
          },
        },
      });
      setPage(prev => prev + 1);
    }
  };

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posts', title: 'Posts' },
    { key: 'comments', title: 'Comments' },
    { key: 'likes', title: 'Likes' },
    { key: 'clubs', title: 'Clubs' },
  ]);

  const PostsRoute = () => (
    posts.length === 0 && !postLoading ? (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have not made any posts yet</Text>
        {isMyProfile && (isCollegeVerified && !profileUnderReview) && (
          <ButtonCustom
            title='Post Now'
            onPress={() => navigation.navigate('CreatePost')}
            width={wp(25)}
          />
        )}
      </View>
    ) : (
      <PostListRenderer
        posts={posts}
        loadMorePosts={loadMorePosts}
        loading={postLoading}
        setPosts={setPosts}
        key="profile-posts"
      />
    )
  );

  const CommentsRoute = () => (
    comments.length === 0 && !commentsLoading ? (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have not made any comments yet</Text>
      </View>
    ) : (
      <FlatList
        contentContainerStyle={{ marginTop: hp(1) }}
        data={comments}
        renderItem={({ item }) => (
          <CommentCard
            hideReply
            postId={item?.replayTo || ''}
            comment={item}
            setComments={setComments}
          />
        )}
        keyExtractor={(item) => item?.id}
        onEndReached={loadMoreComments}
        onEndReachedThreshold={0.5}
        ListFooterComponent={commentsLoading ? (
          <ActivityIndicator
            style={{ alignSelf: 'center', marginTop: hp(20) }}
            size="large"
            color="black"
          />
        ) : null}
      />
    )
  );

  const LikesRoute = () => (
    likedPosts.length === 0 && !likeLoading ? (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have not liked any post yet</Text>
      </View>
    ) : (
      <PostListRenderer posts={likedPosts} loadMorePosts={loadMoreLikedPosts} loading={likeLoading} setPosts={setLikedPosts} />
    )
  );

  const ClubsRoute = () => (
    clubs.length === 0 && !clubsLoading && !clubsInitialLoading ? (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have not joined any club yet</Text>
        <ButtonCustom
          title='Explore Clubs'
          onPress={() => navigation.navigate('clubs', { screen: 'clubs', })}
          width={wp(30)}
        />
      </View>
    ) : (
      <ProfileClubs
        hasMore={clubsHasMore}
        loading={clubsLoading}
        initialLoading={clubsInitialLoading}
        clubs={clubs}
        setClubs={setClubs}
        loadMoreClubs={loadMoreClubs}
      />
    )
  );

  // FastImage cache cleanup on unmount
  useEffect(() => {
    return () => {
      FastImage.clearMemoryCache();
      FastImage.clearDiskCache();
    };
  }, []);

  // Memoize heavy components
  const MemoizedPostListRenderer = React.useMemo(() => PostListRenderer, []);
  const MemoizedProfileClubs = React.useMemo(() => ProfileClubs, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={goBack}>
          <Back height={hp(3)} width={hp(3)} />
        </Pressable>
        <Text style={[styles.boldTxt, styles.marginLeft, { flex: 1 }]}>{isMyProfile ? 'My Profile' : "Profile Info"}</Text>

        {isMyProfile && !loading && <View style={styles.rightContainer}>
          <Pressable onPress={editCta}>
            <Edit height={hp(5)} width={hp(5)} />
          </Pressable>

          <Pressable onPress={() => setShowLogout(true)}>
            <Logout height={hp(5)} width={hp(5)} />
          </Pressable>
        </View>}
      </View>
      {
        loading ? <ActivityIndicator color="white" size="large" style={{ marginTop: 20 }} /> :
          (
            <>
              <ProfileContainer
                user={userData}
                setUserData={setUserData}
                noOfPosts={noOfPosts ?? ''}
                name={userData?.name ?? ''}
                avatar={userData?.avatar ?? null}
                bio={userData?.bio ?? ''}
                college={userData?.college ?? ''}
                profilePicId={userData?.profilePicId ?? null}
                userName={userData?.userName ?? ''}
                showVerify={isMyProfile && !isCollegeVerified}
                isMyProfile={isMyProfile} />

              <View style={styles.tabContainer}>
                <View style={{ marginTop: hp(1), flex: 1 }}>
                  <Tabs 
                    tabs={tabs} 
                    activeTab={activeTab} 
                    onTabPress={(num: number) => {
                      if (num === 2) {
                        getLikedPosts()
                      }
                      setActiveTab(num)
                    }} 
                  />

                  <Animated.View 
                    style={[
                      styles.tabContainer,
                    ]}
                  >
                    {activeTab === 0 && (
                      <View style={{ flex: 1 }}>
                        {posts.length === 0 && !postLoading ? (
                          <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>You have not made any posts yet</Text>
                            {isMyProfile && (isCollegeVerified && !profileUnderReview) && (
                              <ButtonCustom
                                title='Post Now'
                                onPress={() => navigation.navigate('CreatePost')}
                                width={wp(25)}
                              />
                            )}
                          </View>
                        ) : (
                          <MemoizedPostListRenderer 
                            posts={posts} 
                            loadMorePosts={loadMorePosts} 
                            loading={postLoading} 
                            setPosts={setPosts}
                            scrollEnabled={true}
                          />
                        )}
                      </View>
                    )}
                    {activeTab === 1 && (
                      <View style={{ flex: 1 }}>
                        {comments.length === 0 && !commentsLoading ? (
                          <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>You have not made any comments yet</Text>
                          </View>
                        ) : (
                          <FlatList
                            contentContainerStyle={{ marginTop: hp(1) }}
                            data={comments}
                            renderItem={({ item }) => (
                              <CommentCard
                                hideReply
                                postId={item?.replayTo || ''}
                                comment={item}
                                setComments={setComments}
                              />
                            )}
                            keyExtractor={(item) => item?.id}
                            onEndReached={loadMoreComments}
                            onEndReachedThreshold={0.5}
                            scrollEnabled={true}
                            ListFooterComponent={commentsLoading ? (
                              <ActivityIndicator
                                style={{ alignSelf: 'center', marginTop: hp(20) }}
                                size="large"
                                color="black"
                              />
                            ) : null}
                          />
                        )}
                      </View>
                    )}
                    {activeTab === 2 && (
                      <View style={{ flex: 1 }}>
                        {likedPosts.length === 0 && !likeLoading ? (
                          <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>You have not liked any post yet</Text>
                          </View>
                        ) : (
                          <MemoizedPostListRenderer 
                            posts={likedPosts} 
                            loadMorePosts={loadMoreLikedPosts} 
                            loading={likeLoading} 
                            setPosts={setLikedPosts}
                            scrollEnabled={true}
                          />
                        )}
                      </View>
                    )}
                    {activeTab === 3 && (
                      <View style={{ flex: 1 }}>
                        {clubs.length === 0 && !clubsLoading && !clubsInitialLoading ? (
                          <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>You have not joined any club yet</Text>
                            <ButtonCustom
                              title='Explore Clubs'
                              onPress={() => navigation.navigate('clubs', { screen: 'clubs', })}
                              width={wp(30)}
                            />
                          </View>
                        ) : (
                          <MemoizedProfileClubs
                            hasMore={clubsHasMore}
                            loading={clubsLoading}
                            initialLoading={clubsInitialLoading}
                            clubs={clubs}
                            setClubs={setClubs}
                            loadMoreClubs={loadMoreClubs}
                          />
                        )}
                      </View>
                    )}
                  </Animated.View>
                </View>
              </View>

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
            </>
          )
      }
    </View >
  )
}

export default Profile