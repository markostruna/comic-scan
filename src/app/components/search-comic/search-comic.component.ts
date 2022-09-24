import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ComicResolved } from 'src/app/_models/comic-resolved.model';
import { ComicService } from 'src/app/_services/comic.service';
import { PublisherComponent } from '../publisher/publisher.component';

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

  @ViewChild('searchResults')
  searchResults!: PublisherComponent;

  comics: ComicResolved[] = [];

  form = this.fb.group({
    hero: [''],
    title: [''],
  });

  constructor(private comicService: ComicService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  searchComics() {
    this.comics = [];

    const selectedTitle = (this.form.get('title')?.value ?? '').toLowerCase();
    const selectedHero = (this.form.get('hero')?.value ?? '').toLowerCase();

    this.comicService.getPublishers('Publishers/', false).subscribe((data) => {

      const publishers = data;

      publishers.forEach((publisher) => {
        this.comicService.getComics('Publishers/' + publisher.name + '/', publisher.name, false).subscribe((data) => {

          data.forEach((comic) => {

            const hero2 = comic.hero2 ?? '';
            if (comic.hero.toLowerCase().indexOf(selectedHero) < 0 && hero2.toLowerCase().indexOf(selectedHero) < 0) {
              return;
            }

            const title2 = comic.title2 ?? '';
            if (comic.title.toLowerCase().indexOf(selectedTitle) < 0 && title2.toLowerCase().indexOf(selectedTitle) < 0) {
              return;
            }

            this.comics = this.comics.concat(comic);
          })
          this.searchResults.displayComics();

        })
      })
    })
  }
}
