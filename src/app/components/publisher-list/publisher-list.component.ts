import { Component, OnInit } from '@angular/core';
import { Publisher } from 'src/app/_models/publisher.model';
import { BrowsingService } from 'src/app/_services/browsing.service';
import { HelperService } from 'src/app/_services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css']
})

export class PublisherListComponent implements OnInit {

  publishers: Publisher[] = [];

  constructor(private browsingService: BrowsingService, private helperService: HelperService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.browsingService.getPublishers(environment.server + 'Publishers/').subscribe((data) => {
      this.publishers = this.helperService.parsePublishers(data);
    });
  }
}
