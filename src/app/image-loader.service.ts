import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SERVER_ADDRESS } from './config';

@Injectable()
export class ImageLoaderService {

  constructor(private http: HttpClient) { }

  getImages(getActiveImages: boolean = true) {
    const status = getActiveImages ? 'active' : 'deleted';
    const queryString = `status=${status}&order_by=created_at`;

    return this.http.get(`${SERVER_ADDRESS}/api/v1/uploaded-images?${queryString}`);
  }

  changeImageStatus(id: string, deleteImage: boolean, name: string) {
    const data = {
      status: deleteImage ? 'deleted' : 'active',
      original_name: name,
    };

    return this.http.put(`${SERVER_ADDRESS}/api/v1/uploaded-images/${id}`, data);
  }

}
