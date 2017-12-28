import { ImageInterface } from './image-interface';

export interface GetImagesResponseInterface {
  data: {
    uploaded_images: Array<ImageInterface>,
  };
  ok: string;
}
