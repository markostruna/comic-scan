import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/_services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})

export class PublisherComponent implements OnInit {
  @Input() name = '';
  @Input() path = '';

  constructor(private router: Router, private helper: HelperService) { }

  ngOnInit(): void {
  }

  openFolder(path: string, name: string) {
    this.router.navigate(['/publisher'], { queryParams: { path: path, publisher: name }})
  }

  getBackgroundImage(path: string) {

    if (!path) {
      return '';
    }

    let assetPath = "../../../assets/";

    if (environment.production) {
      assetPath = "./assets/";
    }

    const publisherClass = this.helper.createClassFromTitle(path) + '.jpg';

    const style: object = {
      'background-image': 'url("' + assetPath + publisherClass + '")'
    };

    return style;
  }
}
