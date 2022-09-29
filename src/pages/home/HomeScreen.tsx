import * as React from 'react';
import FeedCard from '../../components/FeedCard';
import {BaseResponse} from '../../models/BaseResponse';
import {Pagination} from '../../models/Pagination';
import {Feed} from '../../models/Feed';
import {getFeeds} from '../../api/feedApi';
import {ActivityIndicator} from 'react-native-paper';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

const HomeScreen = () => {
  let loading: boolean = true;
  const loadData = async (page: number = 1) => {
    let response: BaseResponse<Pagination<Feed>> = await getFeeds(page);
    console.log('response', response);
    loading = false;
    console.log('loading', loading);
  };

  React.useEffect(() => {
    // setState('loading', true);
    loadData(1);
    // setState
  });
  return (
    <View>
      <ActivityIndicator
        animating={true}
        color={'purple'}
        size={'large'}
        style={{margin: 30}}
      />
      <FeedCard />
    </View>
  );
};

export default HomeScreen;
