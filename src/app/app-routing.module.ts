import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublisherComponent } from './components/publisher/publisher.component';
import { PublishersComponent } from './components/publishers/publishers.component';
import { SearchComicComponent } from './components/search-comic/search-comic.component';

const routes: Routes = [
  { path: '', component: PublishersComponent },
  { path: 'search', component: SearchComicComponent },
  { path: 'publishers/:publisher', component: PublisherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
