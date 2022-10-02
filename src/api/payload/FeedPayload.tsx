import {Asset} from 'react-native-image-picker';

export class FeedPayload {
  image: Asset;
  caption: string;

  constructor(image: Asset, caption: string) {
    this.image = image;
    this.caption = caption.trim();
  }
}
