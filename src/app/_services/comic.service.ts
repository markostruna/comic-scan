import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comic, ComicResolved, Publisher, PublisherResolved } from '../_models/models';
import { BrowsingService } from './browsing.service';
import { HelperService } from './helper.service';
import { catchError, map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

export interface fieldTypes {
  number: number;
  string: number;
}

export interface field {
  name: string;
  regExp: string;
  type: number;
}

export interface fields {
  number: field;
  hero: field;
  collection: field;
  seqNumber: field;
  title: field;
  [key: string]: field
}

export interface filenameMatchConfig {
  regExp?: RegExp;
  fields: string[];
  fieldInfo?: field[];
}

@Injectable({
  providedIn: 'root'
})

export class ComicService {

  fieldTypes: fieldTypes = {
    number: 0,
    string: 1
  }

  fields: fields = {
    number: {
      regExp: '([1-9,0]+)',
      name: 'number',
      type: this.fieldTypes.number
    },
    hero: {
      regExp: '(.*)',
      name: 'hero',
      type: this.fieldTypes.string
    },
    collection: {
      regExp: '(.*)',
      name: 'collection',
      type: this.fieldTypes.string
    },
    seqNumber: {
      regExp: '([1-9,0]+)',
      name: 'seqNumber',
      type: this.fieldTypes.number
    },
    title: {
      regExp: '(.*)',
      name: 'title',
      type: this.fieldTypes.string
    },
    hero2: {
      regExp: '(.*)',
      name: 'hero2',
      type: this.fieldTypes.string
    },
    title2: {
      regExp: '(.*)',
      name: 'title2',
      type: this.fieldTypes.string
    },
  };

  filenameMatchConfigurations: filenameMatchConfig[] = [
    { fields: ['number', 'hero', 'collection', 'seqNumber', 'title'] },
    { fields: ['number', 'hero', 'title', 'hero2', 'title2'] },
    { fields: ['number', 'hero', 'collection', 'seqNumber'] },
    { fields: ['number', 'hero', 'seqNumber', 'title'] },
    { fields: ['hero', 'collection', 'seqNumber', 'title'] },
    { fields: ['number', 'hero', 'title'] },
    { fields: ['hero', 'collection', 'seqNumber'] },
    { fields: ['hero', 'seqNumber', 'title'] },
  ];

  constructor(private helperService: HelperService, private browsingService: BrowsingService, private storageService: StorageService) {
    this.storageService.loadData();
  }

  getPublishers(path: string, useCache: boolean = true):Observable<PublisherResolved[]> {
    console.log('getPublishers initiated. (path: ', path, ')');

    if (useCache && this.storageService.isPublishersCached() ) {
      return of(this.resolvePublishers(this.storageService.localData.publishers));
    }

    return this.browsingService.getPublishers(environment.server + path).pipe(
      map((data) => {
        const publishers = this.helperService.parsePublishers(data);
        this.storageService.savePublishers(publishers);
        return this.resolvePublishers(publishers);
      }),
      catchError((err) => {
        console.log('getPublishers error.');
        throw err;
      })
    );
  }

  getComics(path: string, publisher: string, useCache: boolean = true):Observable<ComicResolved[]> {
    console.log('getComics initiated. Path: (', path, '), Publisher: ', publisher, ')');

    if (useCache && this.storageService.isComicDataCached(publisher)) {
      return of(this.resolveComics(this.storageService.localData.comics[publisher], path));
    }

    return this.browsingService.getComics(environment.server + path).pipe(
      map((data) => {
        const comics = this.helperService.parseComics(data, path, publisher);
        this.storageService.saveComicData(publisher, comics);
        return this.resolveComics(comics, path);
      }),
      catchError((err) => {
        console.log('getComics error.');
        throw err;
      })
    );
  }

  private resolvePublishers(publishers: Publisher[]): PublisherResolved[] {
    let resolved: PublisherResolved[] = [];

    publishers.forEach((publisher) => {
      const resolvedPublisher = this.resolvePublisher(publisher)
      resolved.push(resolvedPublisher);
    });

    return resolved;
  }

  private resolvePublisher(publisher: Publisher): PublisherResolved {
    const resolved: PublisherResolved = {
      ...publisher,
      backgroundImageUrl: this.helperService.getPublisherBackgroundImageUrl(publisher)
    };

    return resolved;
  }

  private resolveComics(comics: Comic[], parentPath: string): ComicResolved[] {
    let resolved: ComicResolved[] = [];

    comics.forEach((comic) => {
      const resolvedComic = this.resolveComic(comic, parentPath);
      resolved.push(resolvedComic);
    });

    return resolved;
  }

  resolveComic(comic: Comic, parentPath: string): ComicResolved {

    const resolved: ComicResolved = {
      ...comic,
      thumbnailPath: environment.server + parentPath + 'Thumbnails/' + comic.originalFilename + '.jpg',
      coverPath: environment.server + parentPath + 'Covers/' + comic.originalFilename + '.jpg',
      currentBackgroundImage: '/assets/spinner.gif',
      backgroundImageUrl: 'url("/assets/spinner.gif")',
      class: 'thumb' + (comic.missing ? ' missing' : ''),
      loaded: false,
      number: undefined,
      seqNumber: undefined,
      title: '',
      collection: ' ',
      hero: 'MISSING'
    };

    for (const config of this.filenameMatchConfigurations) {

      if (config.regExp === undefined) {
        let regExp = '';
        config.fieldInfo = [];

        config.fields.forEach((field) => {
          const fieldInfo: field = this.fields[field];
          config.fieldInfo?.push(fieldInfo);

          if (regExp.length !== 0) {
            regExp += ' - ';
          }

          regExp += fieldInfo.regExp;
        });

        config.regExp = RegExp(regExp);
      }

      const tokens = comic.filename.match(config.regExp);

      if (tokens) {
        let index = 1;

        config.fieldInfo?.forEach((fieldInfo) => {

          const curToken = tokens[index];

          if (curToken == undefined) {
            resolved[fieldInfo.name] =  undefined;
            return;
          }

          resolved[fieldInfo.name]  = (fieldInfo.type === this.fieldTypes.number) ? +curToken : curToken;
          index++;
        });

        return resolved;
      }
    }

    resolved.title = comic.path;

    return resolved;
  }
}
