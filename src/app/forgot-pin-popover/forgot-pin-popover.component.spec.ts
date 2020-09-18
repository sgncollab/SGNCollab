import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForgotPinPopoverComponent } from './forgot-pin-popover.component';

describe('ForgotPinPopoverComponent', () => {
  let component: ForgotPinPopoverComponent;
  let fixture: ComponentFixture<ForgotPinPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPinPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPinPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
