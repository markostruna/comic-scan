import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publisher } from 'src/app/_models/publisher.model';
import { BrowsingService } from 'src/app/_services/browsing.service';
import { HelperService } from 'src/app/_services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})

export class PublishersComponent implements OnInit {

  publishers: Publisher[] = [];

  constructor(
    private router: Router,
    private browsingService: BrowsingService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    console.log('Server: ', environment.server);
    this.browsingService.getPublishers(environment.server + 'Publishers/').subscribe((data) => {
      this.publishers = this.helperService.parsePublishers(data);
    });
  }

  openFolder(path: string, name: string): void {
    this.router.navigate(['/publishers/' + name]);
  }

  getBackgroundImage(path: string): object {

    if (!path) {
      return {};
    }

    let assetPath = '../../../assets/';

    if (environment.production) {
      assetPath = './assets/';
    }

    const publisherClass = this.helperService.createClassFromTitle(path) + '.jpg';

    const style: object = {
      'background-image': 'url("' + assetPath + publisherClass + '")'
    };

    return style;
  }
}
