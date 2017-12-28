import { Component, Inject, OnInit } from '@angular/core';

import { ImageLoaderService } from '../image-loader.service';
import { CacheService } from '../cache.service';
import { CACHE_KEY_ACTIVE_IMG, CACHE_KEY_DELETE_IMG, SERVER_ADDRESS } from '../config';
import { ImageInterface } from '../interfaces/image-interface';
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

  constructor(
    private imageLoaderService: ImageLoaderService,
    private cacheService: CacheService,
    @Inject('Window') private window: Window
  ) { }

  ngOnInit() {
    this.cacheService.get(
      CACHE_KEY_ACTIVE_IMG,
      this.imageLoaderService.getImages()
    ).subscribe((serverData: GetImagesResponseInterface) => {
      this.images = serverData.data.uploaded_images;
    });
  }

  onDeleteClick() {
    this.imageLoaderService.changeImageStatus(this.activeImage.id,true, this.activeImage.original_name).subscribe(
      (serverResponse: ChangeImageResponseInterface) => {
         this.images = this.images.filter(image => image.id !== serverResponse.data.uploaded_image.id);
         this.cacheService.set(CACHE_KEY_ACTIVE_IMG, {data: {uploaded_images: this.images}});
        this.cacheService.clear(CACHE_KEY_DELETE_IMG);
      },
      err => console.log(err)
    );
  }
}
