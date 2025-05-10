import React, { useState, useEffect } from 'react';
import { View, FlatList, BackHandler } from 'react-native';
import { styles } from './styles';
import CommonHeader from '../../components/CommonHeader';
import PostCard from '../Tabs/Dashboard/components/PostCard';
import { useMutation, useQuery } from '@apollo/client';
import {  GET_SAVED_POSTS_QUERY } from '../../graphql/post/postMutation';
import { GetSavedPostsInput, GetSavedPostsResponse } from '../../interface/postinterface';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-saga/rootReducer';
import { useLikePost } from '../../hooks/useLikePost';
import PostListRenderer from '../../component/PostListRenderer';
import { Post } from '../../interface/clubinterface';
import { errorMessage, showErrorToast } from '../../utils';
import { useNavigation } from '@react-navigation/native';

const SavedPosts = () => {
  const token = useSelector((state: RootState) => state.authReducer.accessToken);
  const {likePost} = useLikePost()
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading: queryLoading, error, fetchMore } = useQuery<GetSavedPostsResponse, { input: GetSavedPostsInput }>(
    GET_SAVED_POSTS_QUERY,
    {
        fetchPolicy: 'network-only', // Ensures fresh data for pagination
        variables: {
          input: {
              page:1,
              limit: 20,
              userPostsOnly: true,
          }
        },
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        },
        onCompleted: (res) => {
          setPosts((prevPosts) => [...prevPosts, ...res.getSavedPosts.posts]);
          setHasMore(res.getSavedPosts.hasMore);
        }
    }
);    

const loadMorePosts = async () => {
  if (data?.getSavedPosts.hasMore) {
    let { data: newData } = await fetchMore({
          variables: {input: {
            limit: 29,
            page: Math.floor(posts.length / 10) + 1,
          }, },
          updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                  getSavedPosts: {
                      hasMore: fetchMoreResult.getSavedPosts.hasMore,
                      posts: [...prev.getSavedPosts.posts, ...fetchMoreResult.getSavedPosts.posts],
                  }
              };
          },
      });
      if (newData?.getSavedPosts?.posts) {
        setPosts((prevPosts) => [...prevPosts, ...newData.getSavedPosts.posts]);
        setHasMore(newData.getSavedPosts.hasMore);
      }
  }
};

  const refreshPosts = async () => {
    setRefreshing(true);
    try {
      const { data: refreshedData } = await fetchMore({
        variables: {
          input: {
            limit: 29,
            page: 1,
          },
        },
      });

      if (refreshedData?.getSavedPosts?.posts) {
        setPosts(refreshedData.getSavedPosts.posts);
        setHasMore(refreshedData.getSavedPosts.hasMore);
      }
    } catch (error) {
      console.error('Error refreshing posts:', error);
      showErrorToast(errorMessage);
    } finally {
      setRefreshing(false);
    }
  };

const navigation = useNavigation();
useEffect(() => {
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    () => {
      navigation.goBack();
      return true;
    }
  );
  return () => backHandler.remove();
}, []);

return (
    <View style={styles.container}>
      <CommonHeader title="Saved Posts" />
      <PostListRenderer posts={posts} loadMorePosts={loadMorePosts} loading={queryLoading} refreshPosts={refreshPosts} refreshing={refreshing} setPosts={setPosts}/>
      
    </View>
  );
};

export default SavedPosts; 