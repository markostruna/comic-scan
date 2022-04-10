import { Injectable } from '@angular/core';
import { Comic } from '../_models/comic.model';
import { Publisher } from '../_models/publisher.model';

@Injectable({
  providedIn: 'root'
})

export class HelperService {

  constructor() { }

  parsePublishers(text: string): Publisher[] {

    const publishers: Publisher[] = [];

    if (text === undefined) {
      return publishers;
    }

    const arrayOfLines = text.match(/[^\r\n]+/g) ?? [];

    const regexFolders = /.*alt=\"\[DIR\]\".*<a href=\"(.*)\/\"\>.*\<\/a\>.*/;

    for (const line of arrayOfLines) {

      const found = line.match(regexFolders);

      if (found != null && found.length === 2) {

        const folder = decodeURI(found[1]).replace('%23', '#');

        publishers.push({
          path: 'Publishers/' + found[1] + '/',
          name: folder
        });
      }
    }

    return publishers;
  }

  parseComics(text: string, parentPath: string, publisher: string): Comic[] {

    const comics: Comic[] = [];

    if (text === undefined) {
      return comics;
    }

    // split input to single lines
    const arrayOfLines = text.match(/[^\r\n]+/g) ?? [];

    // const regexFiles = /.*alt=\".*[   |\[IMG\]].*\".*<a.*href=\"(.*)\">.*<\/a>.*<\/td>.*/;

    // parse server output and display only contents of current folder
    const regexFiles = /<tr><td.*><img.*alt=\"\[[   |IMG]+\]\".*<\/td><td><a.*href=\"(.*)\">.*<\/a>.*<\/td>.*<\/tr>/;

    // filename and extension
    const regexpFilename = /(.*)\.(.*)/;

    // number - hero - title
    const regexpNumberHeroTitle = /([1-9,0]+) - (.*) - (.*)/;

    const regexpNumberHeroNumberTitle = /([1-9,0]+) - (.*) #([1-9,0]+) - (.*)/;
    const regexpNumberHeroCollectionNumber = /([1-9,0]+) - (.*) ([Biblioteka|Superbook|'Kolekcionarsko Izdanje'|Extra]+) #([1-9,0]+)/;

    const regexpHeroCollectionNumberTitle = /(.*) - ([Extra]+) - ([1-9,0]+) - (.*)/;

    const regexpHeroDashNumberTitle = /(.*) - ([1-9,0]+) - (.*)/;
    const regexpHeroNumberTitle = /(.*) ([1-9,0]+) - (.*)/;

    const regexp01 = /(.*) - ([1-9,0]+) - (.*)/;
    const regexp02 = /(.*) - (.*) - ([1-9,0]+) - (.*)/;
    // const regexp02 = /(.*) - ([Biblioteka|Superbook|'Kolekcionarsko Izdanje'|Extra]+) - ([1-9,0]+) - (.*)/;
    const regexp021 = /(.*) - (.*) - ([1-9,0]+)/;
    // const regexp021 = /(.*) - ([Biblioteka|Superbook|'Kolekcionarsko Izdanje'|Extra]+) - ([1-9,0]+)/;
    const regexp03 = /([1-9,0]+) - (.*) - (.*)/;
    const regexp04 = /([1-9,0]+) - (.*) - ([1-9,0]+) - (.*)/;
    const regexp05 = /([1-9,0]+) - (.*) - (.*) - ([1-9,0]+) - (.*)/;
    const regexp051 = /([1-9,0]+) - (.*) - (.*) - ([1-9,0]+)/;

    let index = 0;

    for (const line of arrayOfLines) {

      let tokens = line.match(regexFiles);

      if (tokens === null || tokens.length !== 2) {
        continue;
      }

      const path = tokens[1];

      tokens = path.match(regexpFilename);

      if (tokens === null || tokens.length !== 3) {
        continue;
      }

      const originalFilename = (tokens[1]);
      const filename = decodeURI(tokens[1]).replace('%23', '#').replace('&amp;', '&');
      const extension = tokens[2];

      const newComic: Comic = {
//        comicTitle: '',
        filename,
        hero: 'MISSING',
//        imagePath: parentPath + 'covers/' + originalFilename + '.jpg',
        thumbnailPath: parentPath + 'Thumbnails/' + originalFilename + '.jpg',
        comicImage: extension === 'jpg' ?  (parentPath + path) : (parentPath + 'Thumbnails/' + originalFilename + '.jpg'),
        coverPath: parentPath + 'Covers/' + originalFilename + '.jpg',
        missing: extension === 'jpg',
        number: undefined,
        seqNumber: undefined,
        path: parentPath + path,
        title: 'MISSING ' + filename,
        collection: ' ',
        publisher,
        id: 'comic-' + (index++)
      };

      tokens = filename.match(regexp05);

      if (tokens) {

        newComic.number = (tokens[1] !== undefined) ? parseInt(tokens[1], 10) : undefined;
        newComic.hero = (tokens[2] !== undefined) ? tokens[2] : '';
        newComic.collection = (tokens[3] !== undefined) ? tokens[3] : '';
        newComic.seqNumber = (tokens[4] !== undefined) ? parseInt(tokens[4], 10) : undefined;
        newComic.title = (tokens[5] !== undefined) ? tokens[5] : '';

        comics.push(newComic);

        continue;
      }

      tokens = filename.match(regexp051);

      if (tokens) {

        newComic.number = (tokens[1] !== undefined) ? parseInt(tokens[1], 10) : undefined;
        newComic.hero = (tokens[2] !== undefined) ? tokens[2] : '';
        newComic.collection = (tokens[3] !== undefined) ? tokens[3] : '';
        newComic.seqNumber = (tokens[4] !== undefined) ? parseInt(tokens[4], 10) : undefined;
        newComic.title = ' ';

        comics.push(newComic);

        continue;
      }

      tokens = filename.match(regexp04);

      if (tokens) {

        newComic.number = (tokens[1] !== undefined) ? parseInt(tokens[1], 10) : undefined;
        newComic.hero = (tokens[2] !== undefined) ? tokens[2] : '';
        newComic.seqNumber = (tokens[3] !== undefined) ? parseInt(tokens[3], 10) : undefined;
        newComic.title = (tokens[4] !== undefined) ? tokens[4] : '';

        comics.push(newComic);

        continue;
      }

      tokens = filename.match(regexp02);

      if (tokens) {

        newComic.hero = (tokens[1] !== undefined) ? tokens[1] : '';
        newComic.collection = (tokens[2] !== undefined) ? tokens[2] : '';
        newComic.seqNumber = (tokens[3] !== undefined) ? parseInt(tokens[3], 10) : undefined;
        newComic.title = (tokens[4] !== undefined) ? tokens[4] : '';

        comics.push(newComic);

        continue;
      }

      tokens = filename.match(regexp03);

      if (tokens) {

        newComic.number = (tokens[1] !== undefined) ? parseInt(tokens[1], 10) : undefined;
        newComic.hero = (tokens[2] !== undefined) ? tokens[2] : '';
        newComic.title = (tokens[3] !== undefined) ? tokens[3] : '';

        comics.push(newComic);

        continue;
      }

      tokens = filename.match(regexp02);

      if (tokens) {

        newComic.hero = (tokens[1] !== undefined) ? tokens[1] : '';
        newComic.collection = (tokens[2] !== undefined) ? tokens[2] : '';
        newComic.seqNumber = (tokens[3] !== undefined) ? parseInt(tokens[3], 10) : undefined;
        newComic.title = (tokens[4] !== undefined) ? tokens[4] : '';

        comics.push(newComic);

        continue;
      }

      tokens = filename.match(regexp021);

      if (tokens) {

        newComic.hero = (tokens[1] !== undefined) ? tokens[1] : '';
        newComic.collection = (tokens[2] !== undefined) ? tokens[2] : '';
        newComic.seqNumber = (tokens[3] !== undefined) ? parseInt(tokens[3], 10) : undefined;
        newComic.title = ' ';

        comics.push(newComic);

        continue;
      }

      tokens = filename.match(regexp01);

      if (tokens) {

        newComic.hero = (tokens[1] !== undefined) ? tokens[1] : '';
        newComic.seqNumber = (tokens[2] !== undefined) ? parseInt(tokens[2], 10) : undefined;
        newComic.title = (tokens[3] !== undefined) ? tokens[3] : '';

        comics.push(newComic);

        continue;
      }

      // tokens = filename.match(regexp_number_hero_number_title);

      // if (tokens) {

      //   newComic.number = parseInt(tokens![1] || '0', 10);
      //   newComic.hero = tokens![2] || '';
      //   newComic.title = tokens![4] || '';

      //   comics.push(newComic);

      //   continue;
      // }

      // tokens = filename.match(regexp_number_hero_title);

      // if (tokens) {

      //   newComic.number = parseInt(tokens![1] || '0', 10);
      //   newComic.hero = tokens![2] || '';
      //   newComic.title = tokens![3] || '';

      //   comics.push(newComic);

      //   continue;
      // }

      // tokens = filename.match(regexp_number_hero_collection_number);

      // if (tokens) {

      //   newComic.number = parseInt(tokens![1] || '0', 10);
      //   newComic.hero = tokens![2] || '';
      //   newComic.title = '';
      //   newComic.collection = tokens![3] + ' ' + tokens![4];

      //   comics.push(newComic);

      //   continue;
      // }

      // tokens = filename.match(regexp_hero_collection_number_title);

      // if (tokens) {

      //   newComic.hero = tokens![1] || '';
      //   newComic.collection = tokens![2] || '';
      //   newComic.number = parseInt(tokens![3] || '0', 10);
      //   newComic.title = tokens![4] || '';

      //   comics.push(newComic);

      //   continue;
      // }

      // tokens = filename.match(regexp_hero_dash_number_title);

      // if (tokens) {

      //   newComic.hero = tokens![1] || '';
      //   newComic.number = parseInt(tokens![2] || '0', 10);
      //   newComic.title = tokens![3] || '';

      //   comics.push(newComic);

      //   continue;
      // }

      // tokens = filename.match(regexp_hero_number_title);

      // if (tokens) {

      //   newComic.hero = tokens![1] || '';
      //   newComic.number = parseInt(tokens![2] || '0', 10);
      //   newComic.title = tokens![3] || '';

      //   comics.push(newComic);

      //   continue;
      // }

      newComic.number = 0;
      newComic.hero = 'MISSING';
      newComic.title = filename;
      comics.push(newComic);

    }

    return comics;
  }

  createClassFromTitle(input: string): string {

    if (input === undefined) {
      return '';
    }

    return input.toLowerCase().replace(/ /g, '-').replace(/č/g, 'c').replace(/š/g, 's').replace(/ž/g, 'z');
  }
}
