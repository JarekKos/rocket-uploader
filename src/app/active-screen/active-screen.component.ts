import { Component, Inject, OnInit } from '@angular/core';

import { ImageLoaderService } from '../image-loader.service';
import { ImageInterface } from '../interfaces/image-interface';
import { SERVER_ADDRESS } from '../config';
import { GetImagesResponseInterface } from '../interfaces/get-images-response-interface';
import { ChangeImageResponseInterface } from '../interfaces/change-image-response-interface';

@Component({
  selector: 'app-active-screen',
  templateUrl: './active-screen.component.html',
  styleUrls: ['./active-screen.component.less']
})
export class ActiveScreenComponent implements OnInit {

  images: Array<ImageInterface> = [];
  activeImage: ImageInterface;
  serverAddress = SERVER_ADDRESS;

  constructor(private imageLoaderService: ImageLoaderService, @Inject('Window') private window: Window) { }

  ngOnInit() {
    this.imageLoaderService.getImages().subscribe((serverData: GetImagesResponseInterface) => {
      this.images = serverData.data.uploaded_images;
    });
  }

  onDeleteClick() {
    this.imageLoaderService.changeImageStatus(this.activeImage.id,true, this.activeImage.original_name).subscribe(
      (serverResponse: ChangeImageResponseInterface) => {
         this.images = this.images.filter(image => image.id !== serverResponse.data.uploaded_image.id);
      },
      err => console.log(err)
    );
  }
}
