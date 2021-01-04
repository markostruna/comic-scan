import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comic } from 'src/app/_models/comic.model';
import { BrowsingService } from 'src/app/_services/browsing.service';
import { HelperService } from 'src/app/_services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.css']
})

export class ComicListComponent implements OnInit {

  comics: Comic[] = [];

  path = '';
  publisher = "";

  constructor(
    private browsingService: BrowsingService,
    private route: ActivatedRoute,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.path = params['path'] || '';
      this.publisher = params['publisher'] || '';
    });

    this.loadData();
  }

  loadData(): void {
    this.browsingService.getComics(environment.server + this.path).subscribe((data) => {
      this.comics = this.helperService.parseComics(data, environment.server + this.path, this.publisher);
    });

  }
}
