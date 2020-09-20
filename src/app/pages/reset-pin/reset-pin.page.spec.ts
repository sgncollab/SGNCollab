import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetPinPage } from './reset-pin.page';

describe('ResetPinPage', () => {
  let component: ResetPinPage;
  let fixture: ComponentFixture<ResetPinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
