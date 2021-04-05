import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Comic } from 'src/app/_models/comic.model';
import { ComicDetailsDialogComponent } from '../comic-details-dialog/comic-details-dialog.component';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {
  @Input() item:Comic = {
//    comicTitle: '',
    filename: '',
    hero: '',
    coverPath: '',
    thumbnailPath: '',
    missing: false,
    number: 0,
    path: '',
    title: '',
    collection: '',
    publisher: ''
  };

  hover = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getMissingClass(missing: boolean): string {

    if (missing === undefined) {
      return '';
    }

    return missing ? 'missing' : '';
  }

  getBackgroundImage(item: Comic) {

    let style: object = {};

    if (item.missing) {

      if (this.hover) {
        style = {
          'background-image': 'url("' + item.thumbnailPath + '")',
          'transition': 'border 0.2s ease, background-color 0.5s ease, all 0.3s ease',
          'border': '0px solid red'
  //        'background-image': 'linear-gradient(white, white), url("' + item.thumbnailPath + '")',
  //        'background-blend-mode': 'saturation'
        };
      } else {
        style = {
          'background-image': 'url("' + item.path + '")',
          'transition': 'border 0.2s ease, background-color 0.5s ease, all 0.3s ease',
  //        'background-image': 'linear-gradient(white, white), url("' + item.thumbnailPath + '")',
  //        'background-blend-mode': 'saturation'
          'border': '0px solid red'
        };
      }
    } else {
      style = {
        'background-image': 'url("' + item.thumbnailPath + '")',
        'border': '0px solid transparent'
      };
    }

    return style;
  }

  getClass(item: Comic): string {
    if (item.missing)
      return 'comic-missing-collection';

    return 'comic-collection';
  }

  getInfoClass(item: Comic): string {

    // if (item.missing)
    //   return 'comicinfo-missing';

    return '';
  }

  displayMissingBanner(item: Comic): boolean {

    if (item.collection !== ' ' && item.collection !== '')
      return false;

    return item.missing;
  }

  openDialog(item: Comic) {
    this.dialog.open(ComicDetailsDialogComponent, {
      data: {
        item: item
      }
    });
  }
}
