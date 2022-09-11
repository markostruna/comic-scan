import { Injectable } from '@angular/core';
import { Comic, Publisher } from 'src/app/_models/models';

export interface ComicData {
  [key: string]: Comic[];
}

export interface CacheData {
  publishers: Publisher[];
  comics: ComicData;
}

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  localData: CacheData = {
    publishers: [],
    comics: {}
  };

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public isPublishersCached() {
    return this.localData?.publishers?.length > 0;
  }

  public savePublishers(publishers: Publisher[]) {
    this.localData.publishers = [...publishers];

    this.saveData('publishers', JSON.stringify(this.localData.publishers));
  }

  public loadPublishers() {
    this.localData.publishers = JSON.parse(this.getData('publishers') as string);
  }

  public isComicDataCached(publisher: string) {
    if (this?.localData?.comics == null) {
      return false;
    }

    if (!(publisher in this.localData.comics)) {
      return false;
    }

    return true;
  }

  public saveComicData(publisher: string, comics: Comic[]) {

    if (this.localData?.comics == null) {
      this.localData.comics = {};
    }

    this.localData.comics[publisher] = [...comics];

    this.saveData('comics', JSON.stringify(this.localData.comics));
  }

  public loadComicData() {
    this.localData.comics = JSON.parse(this.getData('comics') as string);
  }

  public loadData() {
    this.loadPublishers();
    this.loadComicData();
  }
}
