import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/_models/comic.model';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {
  @Input() item:Comic = {
    comicTitle: '',
    filename: '',
    hero: '',
    imagePath: '',
    missing: false,
    number: 0,
    path: '',
    title: '',
    collection: '',
    publisher: ''
  };

  constructor() { }

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
      style = {
        'background-image': 'linear-gradient(white, white), url("' + item.imagePath + '")'
      };
    } else {
      style = {
        'background-image': 'url("' + item.imagePath + '")'
      };
    }

    return style;
  }
}
