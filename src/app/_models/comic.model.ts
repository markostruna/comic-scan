export interface Comic {
  id: string;
  missing: boolean;
  publisher?: string;
  number?: number;
  seqNumber?: number;
  title: string;
  hero: string;
  collection?: string;
//  comicTitle: string;
  filename: string;
  path: string;
//  imagePath1: string;
  thumbnailPath: string;
  comicImage: string;
  coverPath: string;
  hover?: boolean;
  currentBackgroundImage?: string;
}
