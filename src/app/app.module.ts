import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { ActiveScreenComponent } from './active-screen/active-screen.component';
import { ImageLoaderService } from './image-loader.service';
import { HttpClientModule } from '@angular/common/http';
import { DeleteScreenComponent } from './delete-screen/delete-screen.component';
import { UploadScreenComponent } from './upload-screen/upload-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    ActiveScreenComponent,
    DeleteScreenComponent,
    UploadScreenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [
    ImageLoaderService,
    { provide: 'Window', useValue: window },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
