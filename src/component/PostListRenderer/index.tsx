import { View, Text, FlatList, ActivityIndicator, ViewToken, TouchableWithoutFeedback } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { Post } from '../../interface/clubinterface'
import RenderPost from '../../screens/Tabs/Dashboard/components/PostCard'
import { useLikePost } from '../../hooks/useLikePost'
import { styles } from './styles'
import { preloadImageBatch } from '../../utils'
import AlertModal from '../AlertModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux-saga/rootReducer'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { toggleShowBrowseModal, toggleShowVerifyModal } from '../../redux-saga/club/clubAction'
import ShimmerPost from '../ShimmerPost'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { theme } from '../../theme'

export interface PostListRendererProps {
    posts: Post[]
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
    refreshing?: boolean;
    refreshPosts?: () => Promise<void>
    loadMorePosts: () => Promise<void>
    loading: boolean;
    previewFlow?: boolean;
    scrollEnabled?: boolean;
}

const PostListRenderer = ({posts, previewFlow=false, setPosts, refreshing, refreshPosts, loadMorePosts, loading, scrollEnabled = true}: PostListRendererProps) => {
  useEffect(() => {
    if (posts?.length > 0) {
      preloadImageBatch(posts, 0);
    }
  }, [posts]);

  const user = useSelector((state: RootState) => state.authReducer)
  const { isCollegeVerified, profileUnderReview } = user?.userInfo
  const club = useSelector((state: RootState) => state.clubReducer)
  const {showBrowseModal, showVerifyModal} = club;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useDispatch()

  const [menuVisible, setMenuVisible] = useState('')
  
  const handleViewableItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const lastVisibleIndex = viewableItems[viewableItems.length - 1].index ?? 0;
      // Preload next batch of images
      preloadImageBatch(posts, lastVisibleIndex + 1);
    }
  }, [posts]);

  const renderFooter = () => {
    if (loading) {
      // Show shimmer effect only for initial loading (when there are no posts)
      if (posts.length === 0) {
        return (
          <View>
            <ShimmerPost />
            <ShimmerPost />
            <ShimmerPost />
          </View>
        );
      }
      // Show simple loader for pagination
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="white" />
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (menuVisible !== '') setMenuVisible('');
      }}
      accessible={false}
    >
    <View style={{ flex: 1 }}>
    <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={({ item }) => (
          <RenderPost menuVisible={menuVisible} setMenuVisible={setMenuVisible} previewFlow={previewFlow} item={item} setPosts={setPosts}/>
        )}
        refreshing={refreshing!==undefined ? refreshing : undefined}
        onRefresh={refreshPosts ? refreshPosts : undefined}
        keyExtractor={(item) => item.id}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        scrollEnabled={scrollEnabled}
        ListEmptyComponent={() => {
         if(loading)  return null
         return (
          <View style={{paddingHorizontal: 20, height:heightPercentageToDP(60), alignItems:'center' , justifyContent:'center'}}>
            <Text style={{textAlign:'center' , color:'white',fontFamily: theme.fontFamily.regular,fontSize: 16 }}>Looks empty here! Join a few clubs to see what everyone's posting.</Text>
          </View>
         )
        }}
        ListHeaderComponent={() => (
          <>
            {!isCollegeVerified && showVerifyModal && <AlertModal
              buttonText='Verify Now'
              onButtonPress={() => {navigation.navigate('profileVerify', {step:2,  goBack: () => navigation.goBack()}) ; dispatch(toggleShowVerifyModal(false))}}
              text='Not able to interact with your Peers?'
              visible={showVerifyModal}
              onClose={() => dispatch(toggleShowVerifyModal(false))}
            />}

            {profileUnderReview && showBrowseModal && <AlertModal
              buttonText='Browse Feed'
              onButtonPress={() => dispatch(toggleShowBrowseModal(false)) }
              text='Your profile will be verified within 24 hours'
              visible={showBrowseModal}
              onClose={() => dispatch(toggleShowBrowseModal(false))}
            />}
          </>
        )}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={100}
        removeClippedSubviews={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        updateCellsBatchingPeriod={50}
      />
      </View>
      </TouchableWithoutFeedback>
  )
}

export default memo(PostListRenderer);