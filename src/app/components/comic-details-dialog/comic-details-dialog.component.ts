import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comic } from 'src/app/_models/comic.model';

export interface DialogData {
  item: Comic;
}

@Component({
  selector: 'app-comic-details-dialog',
  templateUrl: './comic-details-dialog.component.html',
  styleUrls: ['./comic-details-dialog.component.css']
})

export class ComicDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
}
