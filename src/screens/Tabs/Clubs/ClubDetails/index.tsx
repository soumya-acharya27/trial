import { View, Text, Pressable, SafeAreaView, FlatList, Image, BackHandler, ActivityIndicator, useWindowDimensions, PanResponder, Animated, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState, useRef, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { styles } from './styles'
// import Post from './Post'
import Events from './Event'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GetClubDetailsInput, GetClubDetailsResponse, GetClubMembersInput, GetClubMembersResponse, GetPostsInput, GetPostsResponse, Member as MemberInterface, Post } from '../../../../interface/clubinterface'
import { GET_CLUB_DETAILS, GET_CLUB_MEMBERS } from '../../../../graphql/clubs/clubsQuery'
import { RootState } from '../../../../redux-saga/rootReducer'
import { errorMessage, paginationLimit, showErrorToast } from '../../../../utils'
import Member from './Member'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { theme } from '../../../../theme'
import { GET_POSTS_MUTATION } from '../../../../graphql/user/userMutation'
import RenderPost from '../../Dashboard/components/PostCard'
import { useLikePost } from '../../../../hooks/useLikePost'
import PostListRenderer from '../../../../component/PostListRenderer'
import { useGetEvents } from '../../../../hooks/useGetEvents'
import FastImage from 'react-native-fast-image'
import BackIcon from '../../../../assets/svg/Back.svg'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import Tabs from '../../Profile/components/ProfileTabs'

const IMAGE_MAX_HEIGHT = hp(30);
const HEADER_HEIGHT = hp(12); // Not used for sticky anymore

const ClubDetails = () => {
    const route = useRoute()
    const { clubId } = route?.params as { clubId: string }
    const token = useSelector((state: RootState) => state.authReducer.accessToken)
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'posts', title: 'Posts' },
        { key: 'members', title: 'Members' },
        { key: 'events', title: 'Events' },
    ]);

    const { data, loading, error } = useQuery<GetClubDetailsResponse, { input: GetClubDetailsInput }>(
        GET_CLUB_DETAILS,
        {
            variables: { input: { id: clubId } },
            context: {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            }
        },
    );


      const location = useSelector((state: RootState) => state.clubReducer.location);
    const {
        data: eventsData,
        loading: eventsloading,
        error: eventsErro,
        page: eventPage,
        handleLoadMore,
    } = useGetEvents({
        token: token,
        regionId: null,
        type: "trending",
        clubId: clubId
    });

    const { data: clubMembers, loading: clubMembersLoading, error: clubMemberError } = useQuery<GetClubMembersResponse, { input: GetClubMembersInput }>(
        GET_CLUB_MEMBERS,
        {
            variables: { input: { clubId: clubId } },
            context: {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            }
        },
    );
    const {likePost} = useLikePost()
    const [getPosts, { data: postData, loading: postLoading, error: postError }] = useMutation<GetPostsResponse, { input: GetPostsInput }>(GET_POSTS_MUTATION, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
    });

    const [posts, setPosts] = useState<Post[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const fetchPosts = async () => {
                try {
                    let { data: newData } = await getPosts({
                        variables: {
                            input: {
                                limit: 10,
                                page: 1,
                                clubId: clubId
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

            fetchPosts();
        }, [getPosts])
    )


    const loadMorePosts = async () => {
        if (hasMore && !postLoading) {
            try {
                let { data: newData } = await getPosts({
                    variables: {
                        input: {
                            limit: 10,
                            page: Math.floor(posts.length / 10) + 1,
                            clubId: clubId
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
            }
        }
    };


    const [selectTab, setSelectTab] = useState('Posts')
    const currentTabRef = useRef('Posts')
    const tabs = ['Posts', 'Members', 'Events']

    const goBack = () => {
        // navigation.navigate('clubs')
        navigation.goBack()
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

    const dispatch = useDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const { name, category, description } = data?.getClubDetails ?? {}

    const PostsRoute = () => (
        <PostListRenderer posts={posts} loadMorePosts={loadMorePosts} loading={loading} setPosts={setPosts}/>
    );

    const MembersRoute = () => (
        clubMembersLoading ? (
            <ActivityIndicator style={{ marginTop: 20 }} size="large" color={"white"} />
        ) : (
            <Member members={clubMembers?.getClubMembers?.members ?? []} />
        )
    );

    const EventsRoute = () => (
        <Events events={eventsData?.getEvents?.events ?? []} page={eventPage} loading={eventsloading} handleLoadMore={handleLoadMore}/>
    );

    // const renderScene = SceneMap({
    //     posts: PostsRoute,
    //     members: MembersRoute,
    //     events: EventsRoute,
    // });

    // const renderTabBar = (props: any) => (
    //     <TabBar
    //         {...props}
    //         indicatorStyle={{ backgroundColor: theme.colors.orange }}
    //         style={{ backgroundColor: theme.colors.bgColor }}
    //         labelStyle={{ color: theme.colors.white, fontFamily: theme.fontFamily.regular }}
    //         activeColor={theme.colors.white}
    //         inactiveColor={theme.colors.gray}
    //     />
    // );


    // Update both state and ref when tab changes
    const updateTab = useCallback((newTab: string) => {
        setSelectTab(newTab);
        currentTabRef.current = newTab;
    }, []);


    // Animation for image height collapse
    const scrollY = useRef(new Animated.Value(0)).current;
    const imageHeight = scrollY.interpolate({
        inputRange: [0, IMAGE_MAX_HEIGHT],
        outputRange: [IMAGE_MAX_HEIGHT, 0],
        extrapolate: 'clamp',
    });

    // FastImage cache cleanup on unmount
    useEffect(() => {
        return () => {
            FastImage.clearMemoryCache();
            FastImage.clearDiskCache();
        };
    }, []);

    // Memoize heavy components
    const MemoizedPostListRenderer = React.useMemo(() => PostListRenderer, []);
    const MemoizedMember = React.useMemo(() => Member, []);
    const MemoizedEvents = React.useMemo(() => Events, []);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.bgColor }}>
            {/* Collapsing Image */}
            <Animated.ScrollView
                style={{ flex: 1 }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View style={{ height: imageHeight, width: '100%', overflow: 'hidden' }}>
                    <FastImage
                        style={styles.img}
                        resizeMode={FastImage.resizeMode.stretch}
                        source={
                            data?.getClubDetails?.imageUrl 
                                ? { 
                                    uri: data.getClubDetails.imageUrl,
                                    priority: FastImage.priority.normal,
                                    cache: FastImage.cacheControl.immutable,
                                }
                                : require('../../../../assets/png/defaultImage.png')
                        }
                        defaultSource={require('../../../../assets/png/defaultImage.png')}
                    />
                    <Pressable onPress={goBack} style={styles.backButton}>
                        <BackIcon width={wp(6)} height={wp(6)} color={theme.colors.white} />
                    </Pressable>
                </Animated.View>
                {/* Title & Description (now scrolls with content) */}
                <View style={{ paddingHorizontal: wp(3), paddingTop: hp(2) }}>
                    <Text style={styles.headerText}>{data?.getClubDetails?.name}</Text>
                    <Text style={styles.decText}>{data?.getClubDetails?.description}</Text>
                </View>
                {/* Tabs and tab content */}
                <View style={{ paddingHorizontal: wp(3) }}>
                    <Tabs
                        tabs={tabs}
                        activeTab={tabs.indexOf(selectTab)}
                        onTabPress={num => updateTab(tabs[num])}
                    />
                    <Animated.View
                        style={[
                            { flex: 1 },
                        ]}                    >
                        {selectTab === 'Members' && (
                            clubMembersLoading ? (
                                <ActivityIndicator style={{ marginTop: 20 }} size="large" color={"white"} />
                            ) : (clubMembers?.getClubMembers?.members?.length ?
                                <MemoizedMember members={clubMembers.getClubMembers.members} />
                                : <View style={{ alignItems: 'center', marginTop: 40 }}>
                                    <Text style={{ color: 'gray', fontSize: hp(2), fontFamily: theme.fontFamily.regular  }}>No members found.</Text>
                                </View>
                            )
                        )}
                        {selectTab === 'Posts' && (
                            loading ? (
                                <ActivityIndicator style={{ marginTop: 20 }} size="large" color={"white"} />
                            ) : (posts.length ?
                                <MemoizedPostListRenderer
                                    posts={posts}
                                    loadMorePosts={loadMorePosts}
                                    loading={loading}
                                    setPosts={setPosts}
                                    scrollEnabled={false}
                                />
                                : <View style={{ alignItems: 'center', marginTop: 40 }}>
                                    <Text style={{ color: 'gray', fontSize: hp(2), fontFamily: theme.fontFamily.regular  }}>No posts found.</Text>
                                </View>
                            )
                        )}
                        {selectTab === 'Events' && (
                            eventsloading ? (
                                <ActivityIndicator style={{ marginTop: 20 }} size="large" color={"white"} />
                            ) : (eventsData?.getEvents?.events?.length ?
                                <MemoizedEvents
                                    events={eventsData.getEvents.events}
                                    page={eventPage}
                                    loading={eventsloading}
                                    handleLoadMore={handleLoadMore}
                                />
                                : <View style={{ alignItems: 'center', marginTop: 40 }}>
                                    <Text style={{ color: 'gray', fontSize: hp(2), fontFamily: theme.fontFamily.regular }}>No events found.</Text>
                                </View>
                            )
                        )}
                    </Animated.View>
                </View>
            </Animated.ScrollView>
        </View>
    )

}


export default ClubDetails