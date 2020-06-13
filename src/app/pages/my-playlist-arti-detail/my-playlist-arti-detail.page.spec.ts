import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPlaylistArtiDetailPage } from './my-playlist-arti-detail.page';

describe('MyPlaylistArtiDetailPage', () => {
  let component: MyPlaylistArtiDetailPage;
  let fixture: ComponentFixture<MyPlaylistArtiDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPlaylistArtiDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPlaylistArtiDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
