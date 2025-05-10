import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPORTED_POSTS } from '../../graphql/queries/getReportedPosts';
import { GetReportedPostsResponse, GetReportedPostsVariables, ReportedPost, Post } from '../../interface/clubinterface';
import { styles } from './styles';
import CommonHeader from '../../components/CommonHeader';
// import ReportedUsers from './components/ReportedUsers';
// import ReportedPosts from './components/ReportedPosts';
import EmptyState from './components/EmptyState';
import PostListRenderer from '../../component/PostListRenderer';
import { useLikePost } from '../../hooks/useLikePost';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-saga/rootReducer';
import { theme } from '../../theme';

type TabType = 'users' | 'posts';

const ITEMS_PER_PAGE = 20;

const Reports = () => {
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [hasReports, setHasReports] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { likePost } = useLikePost();
  const token = useSelector((state: RootState) => state.authReducer.accessToken)
  const { loading, error, fetchMore, refetch } = useQuery<GetReportedPostsResponse, GetReportedPostsVariables>(
    GET_REPORTED_POSTS,
    {
      variables: {
        input: {
          limit: ITEMS_PER_PAGE,
          page: 1,
        },
      },
      context: {
        headers: {
            authorization: `Bearer ${token}`,
        }
      }, 
      onCompleted: (data) => {
        setPosts(data.getReportedPosts.posts);
        setHasReports(data.getReportedPosts.posts.length > 0);
      },
      onError: (res) => {
        console.log("response is ", res)
      }
    }
  );

  const handleLoadMore = async () => {
    if (loading) return;

    try {
      const response = await fetchMore({
        variables: {
          input: {
            limit: ITEMS_PER_PAGE,
            page: Math.ceil(posts.length / ITEMS_PER_PAGE) + 1,
          },
        },
      });
      
      if (response.data.getReportedPosts.posts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...response.data.getReportedPosts.posts]);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };

  const refreshPosts = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Error refreshing posts:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderContent = () => {
    if (!hasReports && !loading) {
      return <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          {activeTab === 'users' ? 'No reported users' : 'No reported posts'}
        </Text>
      </View>;
    }

    return activeTab === 'users' ? <View><Text style={{color:'white', fontSize: 16, fontFamily: theme.fontFamily.regular, textAlign:'center', marginTop: 50}}>No Reported Users</Text></View> : (
      <PostListRenderer 
        posts={posts} 
        loadMorePosts={handleLoadMore} 
        loading={loading} 
        refreshPosts={refreshPosts} 
        refreshing={refreshing} 
        setPosts={setPosts}
      />
    );
  };
  

  return (
    <View style={styles.container}>
      <CommonHeader title="Reports" />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'users' && styles.activeTab]}
          onPress={() => setActiveTab('users')}
        >
          <Text style={[styles.tabText, activeTab === 'users' && styles.activeTabText]}>
            Users
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
          onPress={() => setActiveTab('posts')}
        >
          <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
            Posts
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
};

export default Reports; 