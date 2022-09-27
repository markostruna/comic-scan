import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
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

  publishers: string[] = [''];
  heroes: string[] = [''];
  collections: string[] = [''];

  comics: ComicResolved[] = [];
  allComics: ComicResolved[] = [];

  form = this.fb.group({
    hero: [''],
    title: [''],
    publisher: [''],
    collection: [''],
    availibility: ['All']
  });

  constructor(private comicService: ComicService, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.comicService.getPublishers('Publishers/', false).subscribe((data) => {
      const publishers = data;

      publishers.forEach((publisher) => {
        this.publishers = this.publishers.concat(publisher.name);
        this.publishers = this.publishers.sort();

        this.comicService.getComics('Publishers/' + publisher.name + '/', publisher.name, false).subscribe((data) => {
          this.allComics = this.allComics.concat(data);

          data.forEach((comic) => {

            if (comic.hero != null && !this.heroes.includes(comic.hero)) {
              this.heroes.push(comic.hero);
              this.heroes = this.heroes.sort();
            }

            if (comic.hero2 != null && !this.heroes.includes(comic.hero2)) {
              this.heroes.push(comic.hero2);
              this.heroes = this.heroes.sort();
            }

            if (comic.collection != null && !this.collections.includes(comic.collection)) {
              this.collections.push(comic.collection);
              this.collections = this.collections.sort();
            }

          })
        })
      })
    })
  }

  searchComics() {
    this.comics = [];

    const selectedTitle = (this.form.get('title')?.value ?? '').toLowerCase();
    const selectedHero = (this.form.get('hero')?.value ?? '').toLowerCase();
    const selectedPublisher = (this.form.get('publisher')?.value ?? '').toLowerCase();
    const selectedCollection = (this.form.get('collection')?.value ?? '').toLowerCase();
    const selectedAvailibility = (this.form.get('availibility')?.value ?? 'All').toLowerCase();

    this.allComics.forEach((comic) => {

      const hero2 = comic.hero2 ?? '';
      if (comic.hero.toLowerCase().indexOf(selectedHero) < 0 && hero2.toLowerCase().indexOf(selectedHero) < 0) {
        return;
      }

      const title2 = comic.title2 ?? '';
      if (comic.title.toLowerCase().indexOf(selectedTitle) < 0 && title2.toLowerCase().indexOf(selectedTitle) < 0) {
        return;
      }

      if (comic.publisher.toLowerCase().indexOf(selectedPublisher) < 0) {
        return;
      }

      const collection = comic.collection ?? '';
      if (collection?.toLowerCase()?.indexOf(selectedCollection) < 0) {
        return;
      }

      if (selectedAvailibility === 'available' && comic.missing === true) {
        return;
      }

      if (selectedAvailibility === 'missing' && comic.missing !== true) {
        return;
      }

      this.comics.push(comic);
    });

    this.searchResults.displayComics();

    // this.comicService.getPublishers('Publishers/', false).subscribe((data) => {

    //   const publishers = data;

    //   publishers.forEach((publisher) => {
    //     this.comicService.getComics('Publishers/' + publisher.name + '/', publisher.name, false).subscribe((data) => {

    //       data.forEach((comic) => {

    //         const hero2 = comic.hero2 ?? '';
    //         if (comic.hero.toLowerCase().indexOf(selectedHero) < 0 && hero2.toLowerCase().indexOf(selectedHero) < 0) {
    //           return;
    //         }

    //         const title2 = comic.title2 ?? '';
    //         if (comic.title.toLowerCase().indexOf(selectedTitle) < 0 && title2.toLowerCase().indexOf(selectedTitle) < 0) {
    //           return;
    //         }

    //         if (comic.publisher.toLowerCase().indexOf(selectedPublisher) < 0) {
    //           return;
    //         }

    //         this.comics = this.comics.concat(comic);
    //       })
    //       this.searchResults.displayComics();

    //     })
    //   })
    // })
  }
}
