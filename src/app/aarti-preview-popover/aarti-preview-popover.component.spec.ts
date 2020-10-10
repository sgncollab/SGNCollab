import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AartiPreviewPopoverComponent } from './aarti-preview-popover.component';

describe('AartiPreviewPopoverComponent', () => {
  let component: AartiPreviewPopoverComponent;
  let fixture: ComponentFixture<AartiPreviewPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AartiPreviewPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AartiPreviewPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
