import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { ImageLoaderService } from '../image-loader.service';
import { CacheService } from '../cache.service';
import { CACHE_KEY_ACTIVE_IMG } from '../config';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ImageInterface } from '../interfaces/image-interface';
import { GetImagesResponseInterface } from '../interfaces/get-images-response-interface';

@Component({
  selector: 'app-upload-screen',
  templateUrl: './upload-screen.component.html',
  styleUrls: ['./upload-screen.component.less']
})
export class UploadScreenComponent implements OnInit {

  @ViewChild('confirmationWindow') confirmationWindow: TemplateRef<any>;
  @ViewChild('uploadFileField') fileInput;
  file = null;
  data = null;
  dialogRef: MatDialogRef<TemplateRef<any>>;
  images: Array<ImageInterface> = [];

  constructor(
    private imageLoaderService: ImageLoaderService,
    private cacheService: CacheService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.cacheService.get(
      CACHE_KEY_ACTIVE_IMG,
      this.imageLoaderService.getImages()
    ).subscribe((serverData: GetImagesResponseInterface) => {
      this.images = serverData.data.uploaded_images;
    });
  }

  onAttachFile() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.file = fileBrowser.files[0];

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.data = reader.result;
      }, false);

      reader.readAsDataURL(this.file);
    }
  }

  onChooseFileClick(event) {
    event.preventDefault();
    this.fileInput.nativeElement.click();
  }

  onUploadClick() {
    this.imageLoaderService.uploadImage(this.file.name, this.data).subscribe(
    (response: {data: {uploaded_image: ImageInterface}}) => {
        this.data = null;
        this.file = null;
        this.images.unshift(response.data.uploaded_image);
        this.cacheService.get(
          response.data.uploaded_image.id + '-thumbnail',
          this.imageLoaderService.getImageThumbnail(response.data.uploaded_image.id, response.data.uploaded_image.original_name)
        ).subscribe();
        this.cacheService.clear(CACHE_KEY_ACTIVE_IMG);
        this.cacheService.set(CACHE_KEY_ACTIVE_IMG, {data: {uploaded_images: this.images}});
        this.dialogRef = this.dialog.open(this.confirmationWindow);
      },
      err => console.log(err),
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
