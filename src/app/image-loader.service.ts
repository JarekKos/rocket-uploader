import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SERVER_ADDRESS } from './config';

@Injectable()
export class ImageLoaderService {

  constructor(private http: HttpClient) { }

  getImages(getActiveImages: boolean = true) {
    const status = getActiveImages ? 'active' : 'deleted';
    const queryString = `status=${status}&order_by=created_at`;

    return this.http.get(`${SERVER_ADDRESS}/api/v1/uploaded-images?${queryString}`);
  }

}
