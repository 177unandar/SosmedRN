import * as React from 'react';
import FeedCard from '../../components/FeedCard';
import { Feed } from '../../models/Feed';
import { ActivityIndicator } from 'react-native-paper';
import { FlatList, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchFeeds } from '../../api/feedApi';
import { feedSlice } from '../../redux/feed/FeedSlice';
import { BaseResponse } from '../../models/BaseResponse';
import { PaginationResponse } from '../../models/PaginationResponse';
import { Pagination } from '../../models/Pagination';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const feeds: Feed[] = useAppSelector((state) => state.feed.feeds);
  const pagination: Pagination | null = useAppSelector((state) => state.feed.pagination);

  const loadData = async (page: number) => {
    let response = await dispatch(fetchFeeds(page));
    let payload = response.payload as BaseResponse<PaginationResponse<Feed>>;
    dispatch(feedSlice.actions.updateFeeds(payload))
  }

  const loadMore = async () => {
    console.log("LOADMORE", pagination)
    if (pagination?.nextPage!!) {
      loadData(pagination.nextPage)
    }
  }

  React.useEffect(() => {
    if (!feeds.length)
      loadData(1);
  });
  return (
    <View>
      <FlatList
        onEndReachedThreshold={0.01}
        onEndReached={info => { loadMore() }}
        data={feeds}
        renderItem={({ item }) => <FeedCard feed={item} />} />
      {(pagination == null || pagination?.nextPage!!) &&
        <ActivityIndicator style={{ margin: 50 }} animating={true} color={'purple'} size={'large'} />
      }
    </View>
  );
};

export default HomeScreen;
