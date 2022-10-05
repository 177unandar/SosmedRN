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
import { styles } from '../../styles/styles';
import { BottomNavigationProp } from '../../navigations/types.navigation';
import { useNavigation } from '@react-navigation/native';
import CommentSection from './CommentSection';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<BottomNavigationProp>();
  navigation.addListener('focus', () => {
    loadData(1);
  });
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
      <FlatList
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          loadMore();
        }}
        data={feeds}
        renderItem={({ item }) => <FeedCard feed={item} />}
        onRefresh={() => loadData(1)}
        refreshing={isRefreshing}
      />
      <CommentSection />
    </View>
  );
};

export default HomeScreen;
