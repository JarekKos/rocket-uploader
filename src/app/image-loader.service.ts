import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SERVER_ADDRESS } from './config';
import { RequestOptions } from '@angular/http';

@Injectable()
export class ImageLoaderService {

  constructor(private http: HttpClient) { }

  getImages(getActiveImages: boolean = true) {
    const status = getActiveImages ? 'active' : 'deleted';
    const queryString = `status=${status}&order_by=created_at`;

    return this.http.get(`${SERVER_ADDRESS}/api/v1/uploaded-images?${queryString}`);
  }

  getImage(imageId, imageName) {
    return this.http.get(`${SERVER_ADDRESS}/image/${imageId}/${imageName}`, {
      responseType: 'blob'
    });
  }

  getImageThumbnail(imageId, imageName) {
    return this.http.get(`${SERVER_ADDRESS}/thumbnail/${imageId}/${imageName}`, {
      responseType: 'blob'
    });
  }

  changeImageStatus(id: string, deleteImage: boolean, name: string) {
    const data = {
      status: deleteImage ? 'deleted' : 'active',
      original_name: name,
    };

    return this.http.put(`${SERVER_ADDRESS}/api/v1/uploaded-images/${id}`, data);
  }

  uploadImage(name: string, encodedImg: string) {
    const data = {
      original_name: name,
      image: encodedImg.split(',')[1],
    };

    return this.http.post(`${SERVER_ADDRESS}/api/v1/uploaded-images`, data);
  }

}
