import { Component, TemplateRef, ViewChild } from '@angular/core';

import { ImageLoaderService } from '../image-loader.service';
import { CacheService } from '../cache.service';
import { CACHE_KEY_ACTIVE_IMG } from '../config';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-upload-screen',
  templateUrl: './upload-screen.component.html',
  styleUrls: ['./upload-screen.component.less']
})
export class UploadScreenComponent {

  @ViewChild('confirmationWindow') confirmationWindow: TemplateRef<any>;
  @ViewChild('uploadFileField') fileInput;
  file = null;
  data = null;
  dialogRef: MatDialogRef<TemplateRef<any>>;

  constructor(
    private imageLoaderService: ImageLoaderService,
    private cacheService: CacheService,
    private dialog: MatDialog,
  ) { }

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
    () => {
      this.data = null;
      this.file = null;
      this.cacheService.clear(CACHE_KEY_ACTIVE_IMG);
      this.dialogRef = this.dialog.open(this.confirmationWindow);
    },
      err => console.log(err),
      );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
