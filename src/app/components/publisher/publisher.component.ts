import { Component, HostListener, OnInit } from '@angular/core';
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
  comics2: Comic[] = [];

  path = '';
  publisher = '';

  numElements = 300;

  numX = Math.floor(window.innerWidth / 155);
  numY = Math.floor(window.innerHeight / 250);

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
      this.comics2 = this.comics.slice(0, this.numElements);
      // this.checkElements();
    });

  }

  // getMissingClass(missing: boolean): string {

  //   if (missing === undefined) {
  //     return '';
  //   }

  //   return missing ? 'missing' : '';
  // }

  loadImage(element: HTMLElement, item: Comic, url:string, path:string, hover?: boolean) {

    var img = new Image();

    img.onload = function() {
      if (item.hover === hover) {
        element.style.backgroundImage = url;
      }
    }

    img.src = path;
  }

  setBackgroundImage(item: Comic) {

    let url = '';
    let path = item.comicImage;

    if (item.hover) {
      path = item.thumbnailPath;
    }

    if (item.currentBackgroundImage === path) {
      return;
    }


    url = 'url("' + path + '")';

    const element = document.getElementById(item.id) as HTMLElement;

    if (!element) {
      return;
    }

    // const rect = element.getBoundingClientRect();
    // const topShown = rect.top >= -rect.height;
    // const bottomShown = rect.bottom <= (window.innerHeight + rect.height * 2);

    // if (topShown && bottomShown) {
      item.currentBackgroundImage = path;
      this.loadImage(element, item, url, path, item.hover);
    // } else {
    //   item.currentBackgroundImage = '';
    // }

    // return;
  }

  // getClass(item: Comic): string {

  //   if (item.missing) {
  //     return 'comic-missing-collection';
  //   }

  //   return 'comic-collection';
  // }

  // getInfoClass(item: Comic): string {

  //   // if (item.missing)
  //   //   return 'comicinfo-missing';

  //   return '';
  // }

  // displayMissingBanner(item: Comic): boolean {

  //   if (item.collection !== ' ' && item.collection !== '') {
  //     return false;
  //   }

  //   return item.missing;
  // }

  // koko(item: Comic): string {
  //   return JSON.stringify(item);
  // }

  openDialog(item: Comic): void {
    this.dialog.open(ComicDetailsDialogComponent, {
      data: {
        item
      }
    });
  }

  // checkElements() {

  //   const elements = document.getElementsByClassName('thumb') as HTMLCollectionOf<HTMLElement>;

  //   if (elements) {

  //     for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
  //       const element = elements.item(elementIndex);

  //       if (!element) {
  //         continue;
  //       }

  //       if (element.getAttribute('data-init') === 'true') {
  //         continue;
  //       }

  //       const rect = element.getBoundingClientRect();
  //       const topShown = rect.top >= -rect.height;
  //       const bottomShown = rect.bottom <= (window.innerHeight + rect.height * 2);

  //       if (topShown && bottomShown) {
  //         const dataSrc = element.getAttribute('data-src');
  //         if (dataSrc) {
  //           const item=element.getAttribute('data-item');
  //           let comic:Comic = {
  //             coverPath: '',
  //             filename: '',
  //             hero: '',
  //             missing: false,
  //             path: '',
  //             thumbnailPath: '',
  //             title: '',
  //             id: ''
  //           };
  //           if (item) {
  //             comic=JSON.parse(item);
  //           }
  //           if (comic !== undefined) {

  //             let url = '';
  //             let path = comic.path;

  //             if (!comic.missing || comic.missing && comic.hover) {
  //               path = comic.thumbnailPath;
  //             }

  //             url = 'url("' + path + '")';
  //             element.style.backgroundImage = url;
  //           }
  //         }
  //         element.setAttribute('data-init', 'true');
  //       }
  //     }
  //   }
  // }

  getBackgroundImage(item: Comic): string {

    let url = 'url("' + item.thumbnailPath + '")';

    if (item.missing && !item.hover) {
      url = 'url("' + item.path + '")';
    }

    return url;
  }

  getStyle(item: Comic): object {

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

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const pos=window.pageYOffset;
    let num = Math.floor(pos / 250 + this.numY) * this.numX + 300;
    if (num > this.numElements ) {
      if (num > this.comics.length) {
        num = this.comics.length;
      }
      this.comics2 = this.comics2.concat(this.comics.slice(this.numElements + 1, num));
      this.numElements = num;
    }

  }
}
