import { Comic } from "./comic.model";

export interface ComicResolved extends Comic {
  number?: number;
  seqNumber?: number;
  title: string;
  hero: string;
  collection?: string;
  thumbnailPath: string;
  currentBackgroundImage: string;
  coverPath: string;
  backgroundImageUrl: string;
  class: string;
  loaded: boolean;
  [key: string]: any;
}
