import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AartiListPage } from './aarti-list.page';

describe('AartiListPage', () => {
  let component: AartiListPage;
  let fixture: ComponentFixture<AartiListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AartiListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AartiListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
