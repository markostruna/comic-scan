import { Component, EventEmitter, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ComicResolved } from 'src/app/_models/models';
import { ComicService } from 'src/app/_services/comic.service';
import { ComicDetailsDialogComponent } from '../comic-details-dialog/comic-details-dialog.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})

export class PublisherComponent implements OnInit {

  @Input() comicsInput:ComicResolved[] = [];
  @Input() displayPublisher: boolean = false;

  environment = environment;
  submitter = new EventEmitter();

  im: Boolean[] = [];

  hover = false;

  comics: ComicResolved[] = [];
  displayedComics: ComicResolved[] = [];

  comicsPath = '';
  publisher = '';

  pageSize = 120;

  numPreloadedComics = this.pageSize;

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.publisher = this.route.snapshot?.params?.publisher;
    this.comicsPath = 'Publishers/' + this.route.snapshot?.params?.publisher + '/';

    if (this.comicsInput?.length > 0) {
      this.comics = this.comicsInput;
      this.displayedComics = this.comics.slice(0, this.numPreloadedComics);
    } else if (this.publisher != null) {
      this.loadData();
      this.submitter.emit(this.publisher);
    }
  }

  displayComics():void {
    this.comics = this.comicsInput;
    this.displayedComics = this.comics.slice(0, this.numPreloadedComics);
  }

  loadData(): void {

    this.comicService.getComics(this.comicsPath, this.publisher).subscribe((data) => {
      this.comics = data;
      this.displayedComics = this.comics.slice(0, this.numPreloadedComics);
    })
  }

  openDialog(item: ComicResolved): void {
    this.dialog.open(ComicDetailsDialogComponent, {
      data: {
        item
      }
    });
  }

  loaded = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {

    if (this.loaded) {
      return;
    }

    const numElementsPerRow = Math.floor(window.innerWidth / 164);
    const height = window.pageYOffset + window.innerHeight;

    const numElements = Math.ceil(height / 308) * numElementsPerRow + numElementsPerRow;

    if (numElements >= this.numPreloadedComics) {
      this.displayedComics = this.displayedComics.concat(this.comics.slice(this.numPreloadedComics, this.numPreloadedComics + this.pageSize));
      this.numPreloadedComics += this.pageSize;
    }

    if (this.numPreloadedComics >= this.comics.length) {
      this.loaded = true;
    }
  }
}
