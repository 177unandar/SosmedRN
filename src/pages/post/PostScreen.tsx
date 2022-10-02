import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View} from 'react-native';
import {
  Asset,
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Button, Card, TextInput} from 'react-native-paper';
import {postFeed} from '../../api/feedApi';
import {FeedPayload} from '../../api/payload/FeedPayload';
import {BaseResponse} from '../../api/response/BaseResponse';
import {BottomNavigationProp} from '../../navigations/types.navigation';
import {accoutSlice} from '../../redux/AccountSlice';
import {feedSlice} from '../../redux/FeedSlice';
import {useAppDispatch} from '../../redux/hook';
import {snackbarSlice} from '../../redux/SnackbarSlice';
import {margins, styles} from '../../styles/styles';

const emptyImageUrl = 'https://via.placeholder.com/300?text=Take%20a%20picture';

const PostScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<BottomNavigationProp>();
  const [selectedImage, setSelectedImage] = React.useState<Asset | null>(null);
  const [caption, setCaption] = React.useState<string>('');
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const cameraOptions: CameraOptions = {
    mediaType: 'photo',
    saveToPhotos: true,
  };
  const takeFromCamera = async () => {
    const result: ImagePickerResponse = await launchCamera(cameraOptions);
    console.log(result);
    if (result!! && result.assets && result.assets?.length > 0) {
      setSelectedImage(result.assets[0]);
    }
  };
  const takeFromLibrary = async () => {
    const result: ImagePickerResponse = await launchImageLibrary(cameraOptions);
    console.log(result);
    if (result!! && result.assets && result.assets?.length > 0) {
      setSelectedImage(result.assets[0]);
    }
  };
  const isValidForm = (): boolean => {
    return selectedImage != null && caption.length > 0;
  };
  const resetForm = () => {
    setLoading(false);
    setSelectedImage(null);
    setCaption('');
  };
  const submitForm = async () => {
    if (selectedImage != null) {
      setLoading(true);
      let result = await dispatch(
        postFeed(new FeedPayload(selectedImage, caption)),
      );
      if (result.payload!!) {
        let response = result.payload as BaseResponse<string>;
        if (response.success) {
          dispatch(feedSlice.actions.clearFeeds);
          snackbarSlice.actions.info(response.data);
          navigation.navigate('Home');
          resetForm();
        } else {
          dispatch(snackbarSlice.actions.error(response.message));
          if (response.data === 'Unauthorize') {
            dispatch(accoutSlice.actions.updateUserState(null));
            navigation.navigate('Account');
          }
          setLoading(false);
        }
      } else {
        dispatch(
          snackbarSlice.actions.error(
            'Create new feed failed, please try again',
          ),
        );
        setLoading(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Card style={margins.b2}>
        <Card.Cover
          resizeMode="contain"
          source={{
            uri: selectedImage != null ? selectedImage.uri : emptyImageUrl,
          }}
        />
      </Card>
      <View style={{flexDirection: 'row'}}>
        <Button
          icon="camera"
          mode="contained"
          onPress={async () => await takeFromCamera()}>
          Camera
        </Button>
        <Button
          icon="folder"
          mode="contained"
          style={margins.l2}
          onPress={async () => await takeFromLibrary()}>
          Browse File
        </Button>
      </View>
      <TextInput
        label="Caption"
        mode="outlined"
        multiline={true}
        numberOfLines={5}
        style={margins.v2}
        value={caption}
        onChangeText={newValue => setCaption(newValue)}
      />
      <Button
        style={styles.componentStyle}
        mode="contained"
        disabled={!isValidForm()}
        loading={isLoading}
        onPress={async () => await submitForm()}>
        Submit
      </Button>
    </View>
  );
};

export default PostScreen;
