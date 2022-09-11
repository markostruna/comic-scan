import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SearchComicComponent } from './components/search-comic/search-comic.component';
import { PublishersComponent } from './components/publishers/publishers.component';
import { MaterialModule } from './app-material/app-material.module';
import { PublisherComponent } from './components/publisher/publisher.component';
import { ComicDetailsDialogComponent } from './components/comic-details-dialog/comic-details-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InViewDirective } from './in-view.directive';

@NgModule({
  declarations: [
    AppComponent,
    SearchComicComponent,
    PublishersComponent,
    PublisherComponent,
    ComicDetailsDialogComponent,
    InViewDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
