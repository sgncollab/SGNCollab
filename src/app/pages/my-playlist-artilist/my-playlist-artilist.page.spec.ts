import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPlaylistArtilistPage } from './my-playlist-artilist.page';

describe('MyPlaylistArtilistPage', () => {
  let component: MyPlaylistArtilistPage;
  let fixture: ComponentFixture<MyPlaylistArtilistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPlaylistArtilistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPlaylistArtilistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
