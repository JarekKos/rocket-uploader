import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageLoaderService {

  URL = 'http://team-rocket.dreamela.com'

  constructor(private http: HttpClient) { }

  getImages() {
    return this.http.get(`${this.URL}/api/v1/uploaded-images`);
  }

}
