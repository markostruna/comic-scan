import { Component, Input, OnInit } from '@angular/core';
import { BrowsingService } from 'src/app/_services/browsing.service';

export interface Publisher {
  name: string;
  path: string;
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

    this.browsingService.getFiles('Publishers/').subscribe((data) => {
      this.parsePublishers(data);
    });

  }

  parsePublishers(text: string): void {

    const arrayOfLines = text.match(/[^\r\n]+/g) ?? [];

    const regex = /.*alt=\"\[DIR\]\".*<a href=\"(.*)\/\"\>.*\<\/a\>.*/;

    for (const line of arrayOfLines) {

      const found = line.match(regex);

      if (found != null && found.length === 2) {
        const folder = decodeURI(found[1]).replace('%23', '#');
        console.log(folder);
        this.publishers.push({
          path: 'Publishers/' + found[1] + '/',
          name: folder
        });
      }
    }
  }
}
