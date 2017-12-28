import { ImageInterface } from './image-interface';

export interface ChangeImageResponseInterface {
  data: {
    uploaded_image: ImageInterface,
  };
  ok: string;
}
