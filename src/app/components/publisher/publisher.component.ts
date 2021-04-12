import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Comic } from 'src/app/_models/comic.model';
import { BrowsingService } from 'src/app/_services/browsing.service';
import { HelperService } from 'src/app/_services/helper.service';
import { environment } from 'src/environments/environment';
import { ComicDetailsDialogComponent } from '../comic-details-dialog/comic-details-dialog.component';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})

export class PublisherComponent implements OnInit {

  hover = false;

  comics: Comic[] = [];

  path = '';
  publisher = '';

  constructor(
    private browsingService: BrowsingService,
    private route: ActivatedRoute,
    private helperService: HelperService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.publisher = this.route.snapshot?.params?.publisher;
    this.path = 'Publishers/' + this.route.snapshot?.params?.publisher + '/';

    console.log('Publisher: ', this.publisher, ', path: ', this.path);

    // this.path = this.route.snapshot?.params?.publisherName;

    // this.route.queryParams.subscribe(params => {
    //   this.path = params['path'] || '';
    //   this.publisher = params['publisher'] || '';
    // });

    this.loadData();
  }

  loadData(): void {
    this.browsingService.getComics(environment.server + this.path).subscribe((data) => {
      this.comics = this.helperService.parseComics(data, environment.server + this.path, this.publisher);
    });

  }

  getMissingClass(missing: boolean): string {

    if (missing === undefined) {
      return '';
    }

    return missing ? 'missing' : '';
  }

  getBackgroundImage(item: Comic): object {

    let style: object = {};

    if (item.missing) {

      if (item.hover) {
        style = {
          'background-image': 'url("' + item.thumbnailPath + '")'
        };
      } else {
        style = {
          'background-image': 'url("' + item.path + '")'
        };
      }
    } else {
      style = {
        'background-image': 'url("' + item.thumbnailPath + '")'
      };
    }

    return style;
  }

  getClass(item: Comic): string {

    if (item.missing) {
      return 'comic-missing-collection';
    }

    return 'comic-collection';
  }

  getInfoClass(item: Comic): string {

    // if (item.missing)
    //   return 'comicinfo-missing';

    return '';
  }

  displayMissingBanner(item: Comic): boolean {

    if (item.collection !== ' ' && item.collection !== '') {
      return false;
    }

    return item.missing;
  }

  openDialog(item: Comic): void {
    this.dialog.open(ComicDetailsDialogComponent, {
      data: {
        item
      }
    });
  }
}
