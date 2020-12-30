import { Injectable } from '@angular/core';
import { Comic } from '../_models/comic.model';
import { Publisher } from '../_models/publisher.model';

@Injectable({
  providedIn: 'root'
})

export class HelperService {

  constructor() { }

  parsePublishers(text: string): Publisher[] {

    const publishers:Publisher[] = [];

    if (text === undefined) {
      return publishers;
    }

    const arrayOfLines = text.match(/[^\r\n]+/g) ?? [];

    const regex_folders = /.*alt=\"\[DIR\]\".*<a href=\"(.*)\/\"\>.*\<\/a\>.*/;

    for (const line of arrayOfLines) {

      const found = line.match(regex_folders);

      if (found != null && found.length === 2) {

        const folder = decodeURI(found[1]).replace('%23', '#');

        let classname = this.createClassFromTitle(folder);

        publishers.push({
          path: 'Publishers/' + found[1] + '/',
          name: folder
        });
      }
    }

    return publishers;
  }

  parseComics(text: string, parentPath: string): Comic[] {

    const comics:Comic[] = [];

    if (text === undefined) {
      return comics;
    }

    // split input to single lines
    const arrayOfLines = text.match(/[^\r\n]+/g) ?? [];

    //const regex_files = /.*alt=\".*[   |\[IMG\]].*\".*<a.*href=\"(.*)\">.*<\/a>.*<\/td>.*/;

    // parse server output and display only contents of current folder
    const regex_files = /<tr><td.*><img.*alt=\"\[[   |IMG]+\]\".*<\/td><td><a.*href=\"(.*)\">.*<\/a>.*<\/td>.*<\/tr>/;

    // filename and extension
    const regexp_filename = /(.*)\.(.*)/;

    // number - hero - title
    const regexp_number_hero_title = /([1-9,0]+) - (.*) - (.*)/;

    const regexp_number_hero_number_title = /([1-9,0]+) - (.*) #([1-9,0]+) - (.*)/;
    const regexp_number_hero_collection_number = /([1-9,0]+) - (.*) ([Biblioteka|Superbook|'Kolekcionarsko Izdanje'|Extra]+) #([1-9,0]+)/;

    const regexp_hero_dash_number_title = /(.*) - ([1-9,0]+) - (.*)/;
    const regexp_hero_number_title = /(.*) ([1-9,0]+) - (.*)/;

    for (const line of arrayOfLines) {

      let tokens = line.match(regex_files);

      if (tokens === null || tokens.length !== 2) {
        continue;
      }

      const path = tokens[1];

      tokens = path.match(regexp_filename);

      if (tokens === null || tokens.length !== 3) {
        continue;
      }

      const originalFilename = (tokens[1]);
      const filename = decodeURI(tokens[1]).replace('%23', '#');
      const extension = tokens[2];

      const newComic: Comic = {
        comicTitle: '',
        filename: filename,
        hero: '',
        imagePath: parentPath + 'covers/' + originalFilename + '.jpg',
        missing: extension === 'jpg',
        number: 0,
        path: path,
        title: '',
        collection: '',
        publisher: ''
      };

      tokens = filename.match(regexp_number_hero_number_title);

      if (tokens) {

        newComic.number = parseInt(tokens![1] || '0', 10);
        newComic.hero = tokens![2] || '';
        newComic.title = tokens![4] || '';

        comics.push(newComic);

        continue;
      }

      tokens = filename.match(regexp_number_hero_title);

      if (tokens) {

        newComic.number = parseInt(tokens![1] || '0', 10);
        newComic.hero = tokens![2] || '';
        newComic.title = tokens![3] || '';

        comics.push(newComic);

        continue;
      }

      tokens = filename.match(regexp_number_hero_collection_number);

      if (tokens) {

        newComic.number = parseInt(tokens![1] || '0', 10);
        newComic.hero = tokens![2] || '';
        newComic.title = '';
        newComic.collection = tokens![3] + ' ' + tokens![4];

        comics.push(newComic);

        continue;
      }

      tokens = filename.match(regexp_hero_dash_number_title);

      if (tokens) {

        newComic.hero = tokens![1] || '';
        newComic.number = parseInt(tokens![2] || '0', 10);
        newComic.title = tokens![3] || '';

        comics.push(newComic);

        continue;
      }

      tokens = filename.match(regexp_hero_number_title);

      if (tokens) {

        newComic.hero = tokens![1] || '';
        newComic.number = parseInt(tokens![2] || '0', 10);
        newComic.title = tokens![3] || '';

        comics.push(newComic);

        continue;
      }

      newComic.number = 0;
      newComic.hero = 'MISSING';
      newComic.title = filename;
      comics.push(newComic);

    }

    return comics;
  }

  createClassFromTitle(input: string):string {

    if (input === undefined) {
      return "";
    }

    return input.toLowerCase().replace(/ /g, '-').replace(/č/g, 'c').replace(/š/g, 's').replace(/ž/g, 'z');
  }
}
