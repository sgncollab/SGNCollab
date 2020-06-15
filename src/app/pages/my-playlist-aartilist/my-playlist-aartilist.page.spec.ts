import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPlaylistAartilistPage } from './my-playlist-aartilist.page';

describe('MyPlaylistAartilistPage', () => {
  let component: MyPlaylistAartilistPage;
  let fixture: ComponentFixture<MyPlaylistAartilistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPlaylistAartilistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPlaylistAartilistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
