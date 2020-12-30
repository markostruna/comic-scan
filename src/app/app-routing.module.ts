import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicListComponent } from './components/comic-list/comic-list.component';
import { PublisherListComponent } from './components/publisher-list/publisher-list.component';
import { SearchComicComponent } from './components/search-comic/search-comic.component';

const routes: Routes = [
  { path: '', component: PublisherListComponent },
  { path: 'search', component: SearchComicComponent },
  { path: 'publisher', component: ComicListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
