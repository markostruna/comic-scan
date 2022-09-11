import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComicResolved } from 'src/app/_models/models';

export interface DialogData {
  item: ComicResolved;
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
