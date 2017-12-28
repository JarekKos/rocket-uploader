import { Component, OnInit } from '@angular/core';
import { ImageLoaderService } from '../image-loader.service';

@Component({
  selector: 'app-active-screen',
  templateUrl: './active-screen.component.html',
  styleUrls: ['./active-screen.component.less']
})
export class ActiveScreenComponent implements OnInit {

  constructor(private imageLoaderService: ImageLoaderService) { }

  ngOnInit() {
    this.imageLoaderService.getImages().subscribe(data => console.log(data));
  }

}
