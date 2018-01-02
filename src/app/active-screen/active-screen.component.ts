import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

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

  @ViewChild('confirmationWindow') confirmationWindow: TemplateRef<any>;
  @ViewChild('anchor') downloadFileAnchor: ElementRef;

  images: Array<ImageInterface> = [];
  activeImage: ImageInterface;
  serverAddress = SERVER_ADDRESS;
  dialogRef: MatDialogRef<TemplateRef<any>>;
  downloadInProgress: boolean;

  constructor(
    private imageLoaderService: ImageLoaderService,
    private cacheService: CacheService,
    private dialog: MatDialog,
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
    const config: MatDialogConfig = new MatDialogConfig();
    config.disableClose = true;
    this.dialogRef = this.dialog.open(this.confirmationWindow, config);
  }

  onDownloadClick(imageId, imageName, ev: Event) {
    ev.preventDefault();
    if (!this.downloadInProgress) {
      this.downloadInProgress = true;
      this.cacheService.get(
        imageId,
        this.imageLoaderService.getImage(imageId, imageName)
      ).subscribe(data => {
        const blob = new Blob([data], { type: 'image/*' });
        const url = window.URL.createObjectURL(blob);
        this.downloadFileAnchor.nativeElement.href = url;
        this.downloadFileAnchor.nativeElement.download = imageName;
        this.downloadFileAnchor.nativeElement.click();
        this.downloadInProgress = false;
        this.activeImage = null;
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  confirmDeletion() {
    this.imageLoaderService.changeImageStatus(this.activeImage.id, true, this.activeImage.original_name).subscribe(
      (serverResponse: ChangeImageResponseInterface) => {
         this.images = this.images.filter(image => image.id !== serverResponse.data.uploaded_image.id);
         this.cacheService.set(CACHE_KEY_ACTIVE_IMG, {data: {uploaded_images: this.images}});
         this.cacheService.clear(CACHE_KEY_DELETE_IMG);
         this.activeImage = null;
         this.dialogRef.close();
      },
      err => console.log(err)
    );
  }
}
