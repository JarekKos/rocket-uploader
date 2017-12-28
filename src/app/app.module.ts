import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ActiveScreenComponent } from './active-screen/active-screen.component';
import { ImageLoaderService } from './image-loader.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ActiveScreenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [ImageLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
