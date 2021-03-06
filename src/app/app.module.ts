import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ActiveScreenComponent } from './active-screen/active-screen.component';
import { ImageLoaderService } from './image-loader.service';
import { HttpClientModule } from '@angular/common/http';
import { DeleteScreenComponent } from './delete-screen/delete-screen.component';
import { UploadScreenComponent } from './upload-screen/upload-screen.component';
import { CacheService } from './cache.service';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    ActiveScreenComponent,
    DeleteScreenComponent,
    UploadScreenComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    NoopAnimationsModule,
  ],
  providers: [
    ImageLoaderService,
    CacheService,
    { provide: 'Window', useValue: window },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
