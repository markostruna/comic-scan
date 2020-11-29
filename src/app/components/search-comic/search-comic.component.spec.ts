import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComicComponent } from './search-comic.component';

describe('SearchComicComponent', () => {
  let component: SearchComicComponent;
  let fixture: ComponentFixture<SearchComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
