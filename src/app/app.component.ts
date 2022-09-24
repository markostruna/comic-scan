import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublisherComponent } from './components/publisher/publisher.component';
import { PublishersComponent } from './components/publishers/publishers.component';
import { ComicService } from './_services/comic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  publishersComp!: PublishersComponent;
  publisherComp!: PublisherComponent;

  comp!: PublisherComponent | PublishersComponent;

  title = 'Comic collection';
  value = 'Clear me';
  publisher?: string = '';

  subscriptions: Subscription[] = [];

  constructor(public cdr: ChangeDetectorRef, private comicService: ComicService) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  subscribeToEvent(component: any) {

    if (component instanceof PublishersComponent) {
      const child: PublishersComponent = component;

      // this.subscriptions.push(child.submitter.subscribe((publisher: string) => {
        this.publisher = undefined;
      // }));

      this.comp = component;
      this.cdr.detectChanges();

      return;
    }

    if (component instanceof PublisherComponent) {
      const child: PublisherComponent = component;

      this.subscriptions.push(child.submitter.subscribe((publisher: string) => {
        this.publisher = publisher;
      }));

      this.comp = component;
      this.cdr.detectChanges();

      return;
    }

  }

  unsubscribeEvent(component: PublishersComponent) {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  loadData(): void {
    this.comicService.getPublishers('Publishers/', false).subscribe((data) => {
      const publishers = data;

      publishers.forEach((publisher) => {
        this.comicService.getComics('Publishers/' + publisher.name + '/', publisher.name, false).subscribe((data) => {
        })
      })
    })
  }

  refresh () {
    this.loadData();
  }
}
