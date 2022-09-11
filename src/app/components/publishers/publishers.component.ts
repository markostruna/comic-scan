import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublisherResolved } from 'src/app/_models/models';
import { ComicService } from 'src/app/_services/comic.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})

export class PublishersComponent implements OnInit {

  submitter = new EventEmitter();

  publishersFolder = 'Publishers/';
  publishers: PublisherResolved[] = [];

  constructor(
    private router: Router,
    private comicService: ComicService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.submitter.emit();
  }

  loadData(): void {
    this.comicService.getPublishers(this.publishersFolder).subscribe((data) => {
      this.publishers = data;
    })
  }

  openFolder(path: string, name: string): void {
    console.log('Path: ', path, ' Name: ', name);
    this.router.navigate(['/publishers/' + name]);
  }
}
