import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicDetailsDialogComponent } from './comic-details-dialog.component';

describe('ComicDetailsDialogComponent', () => {
  let component: ComicDetailsDialogComponent;
  let fixture: ComponentFixture<ComicDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
