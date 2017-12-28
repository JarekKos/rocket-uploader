import { Component, ViewChild } from '@angular/core';

import { ImageLoaderService } from '../image-loader.service';

@Component({
  selector: 'app-upload-screen',
  templateUrl: './upload-screen.component.html',
  styleUrls: ['./upload-screen.component.less']
})
export class UploadScreenComponent {

  @ViewChild('uploadFileField') fileInput;
  file = null;
  data = null;

  constructor(private imageLoaderService: ImageLoaderService) { }

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
    },
      err => console.log(err),
      );
  }
}
