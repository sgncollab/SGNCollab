import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchPlaylistAartilistPage } from './search-playlist-aartilist.page';

describe('SearchPlaylistAartilistPage', () => {
  let component: SearchPlaylistAartilistPage;
  let fixture: ComponentFixture<SearchPlaylistAartilistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPlaylistAartilistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPlaylistAartilistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
