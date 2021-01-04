import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SearchComicComponent } from './components/search-comic/search-comic.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { PublisherListComponent } from './components/publisher-list/publisher-list.component';
import { MaterialModule } from './app-material/app-material.module';
import { ComicListComponent } from './components/comic-list/comic-list.component';
import { ComicComponent } from './components/comic/comic.component';
import { ComicDetailsDialogComponent } from './components/comic-details-dialog/comic-details-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    SearchComicComponent,
    PublisherComponent,
    PublisherListComponent,
    ComicListComponent,
    ComicComponent,
    ComicDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
