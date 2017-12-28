import { Component, Inject, OnInit } from '@angular/core';

import { SERVER_ADDRESS } from '../config';
import { ImageLoaderService } from '../image-loader.service';
import { ImageInterface } from '../interfaces/image-interface';
import { GetImagesResponseInterface } from '../interfaces/get-images-response-interface';
import { ChangeImageResponseInterface } from '../interfaces/change-image-response-interface';

@Component({
  selector: 'app-delete-screen',
  templateUrl: './delete-screen.component.html',
  styleUrls: ['./delete-screen.component.less']
})
export class DeleteScreenComponent implements OnInit {
  images: Array<ImageInterface> = [];
  activeImage: ImageInterface;
  serverAddress = SERVER_ADDRESS;

  constructor(private imageLoaderService: ImageLoaderService, @Inject('Window') private window: Window) { }

  ngOnInit() {
    this.imageLoaderService.getImages(false).subscribe((serverData: GetImagesResponseInterface) => {
      this.images = serverData.data.uploaded_images;
    });
  }

  onRestoreClick() {
    this.imageLoaderService.changeImageStatus(this.activeImage.id, false, this.activeImage.original_name).subscribe(
      (serverResponse: ChangeImageResponseInterface) => {
        this.images = this.images.filter(image => image.id !== serverResponse.data.uploaded_image.id);
      },
      err => console.log(err)
    );
  }
}
