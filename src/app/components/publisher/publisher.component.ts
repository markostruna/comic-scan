import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/_services/helper.service';

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

  openFolder(path: string) {
    this.router.navigate(['/publisher'], { queryParams: { path: path }})
  }

  getBackgroundImage(path: string) {

    if (!path) {
      return '';
    }

    const publisherClass = this.helper.createClassFromTitle(path);

    const style: object = {
      'background-image': '../../../assets/' + publisherClass
    };

    return style;
  }
}
