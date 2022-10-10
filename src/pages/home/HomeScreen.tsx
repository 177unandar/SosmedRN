import * as React from 'react';
import FeedCard from './FeedCard';
import { Feed } from '../../models/Feed';
import { FlatList, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchFeeds } from '../../api/feedApi';
import { feedSlice } from '../../redux/FeedSlice';
import { BaseResponse } from '../../api/response/BaseResponse';
import { PaginationResponse } from '../../api/response/PaginationResponse';
import { Pagination } from '../../models/Pagination';
import { margins, styles } from '../../styles/styles';
import { BottomNavigationProp } from '../../utils/types/navigation.types';
import { useNavigation } from '@react-navigation/native';
import CommentSection from './CommentSection';
import { ActivityIndicator, Button, Headline, Text } from 'react-native-paper';
import { User } from '../../models/User';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<BottomNavigationProp>();
  navigation.addListener('focus', () => {
    loadData(1);
  });
  const user: User | null = useAppSelector(state => state.account.user);
  const feeds: Feed[] = useAppSelector(state => state.feed.feeds);
  const pagination: Pagination | null = useAppSelector(
    state => state.feed.pagination,
  );
  const isRefreshing: boolean = useAppSelector(
    state => state.feed.isRefreshing,
  );
  const loadData = async (page: number) => {
    if (page === 1) {
      dispatch(feedSlice.actions.setRefreshing(true));
    }
    let response = await dispatch(fetchFeeds(page));
    let payload = response.payload as BaseResponse<PaginationResponse<Feed>>;
    dispatch(feedSlice.actions.updateFeeds(payload));
  };

  const loadMore = async () => {
    if (pagination?.nextPage!!) {
      loadData(pagination.nextPage);
    }
  };

  return (
    <View style={styles.container}>
      {feeds.length == 0 && isRefreshing &&
        <ActivityIndicator style={margins.v3} size="large" animating={true} />
      }
      {feeds.length == 0 && !isRefreshing &&
        <View style={[styles.centerChilds, { height: '100%' }]}>
          <Headline>No Feeds yet</Headline>
          {user != null &&
            <Button style={margins.t4} mode='text' onPress={() => navigation.navigate('Post')}>Create First Feed</Button>
          }
          {user == null &&
            <View style={margins.t4}>
              <Button mode='text' onPress={() => navigation.navigate('Account')}>Login</Button>
              <Text>to create first feed</Text>
            </View>
          }
        </View>
      }
      {feeds.length > 0 &&
        <FlatList
          onEndReachedThreshold={0.01}
          onEndReached={() => {
            loadMore();
          }}
          data={feeds}
          renderItem={({ item, index }) => <FeedCard feed={item} isLoading={(index == (feeds.length - 1) && pagination?.nextPage != null)} />}
          onRefresh={() => loadData(1)}
          refreshing={isRefreshing}
        />
      }
      <CommentSection />
    </View>
  );
};

export default HomeScreen;
