import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CLOUD_NAME } from "react-native-dotenv";

const cld = new Cloudinary(
    { cloud: { cloudName: CLOUDINARY_CLOUD_NAME } }
)

export const cldImg = (src: string) => {
    if (src.startsWith('http')) {
        let arr: string[] = src.split("/");
        src = arr[arr.length - 1];
    }
    return cld.image(src);
};