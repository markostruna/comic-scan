import { Component, Input, OnInit } from '@angular/core';
import { BrowsingService } from 'src/app/_services/browsing.service';

export interface Publisher {
  name: string;
  path: string;
  class: string;
}

@Component({
  selector: 'app-search-comic',
  templateUrl: './search-comic.component.html',
  styleUrls: ['./search-comic.component.css']
})

export class SearchComicComponent implements OnInit {

  publishers: Publisher[] = [];

  constructor(private browsingService: BrowsingService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.browsingService.getPublishers('Publishers/').subscribe((data) => {
      this.parsePublishers(data);
    });

  }

  parsePublishers(text: string): void {

    const arrayOfLines = text.match(/[^\r\n]+/g) ?? [];

    const regexFolders = /.*alt=\"\[DIR\]\".*<a href=\"(.*)\/\"\>.*\<\/a\>.*/;
    const regexFiles = /.*alt=\".*   .*\".*<a.*href=\"(.*)\">.*<\/a>.*<\/td>.*/;

    for (const line of arrayOfLines) {

      const found = line.match(regexFolders);

      if (found != null && found.length === 2) {

        const folder = decodeURI(found[1]).replace('%23', '#');

        const classname = folder.toLowerCase().replace(/ /g, '-').replace(/č/g, 'c').replace(/š/g, 's').replace(/ž/g, 'z');

        this.publishers.push({
          path: 'Publishers/' + found[1] + '/',
          name: folder,
          class: classname
        });
      }
    }
  }
}
