import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AartiReorderPage } from './aarti-reorder.page';

describe('AartiReorderPage', () => {
  let component: AartiReorderPage;
  let fixture: ComponentFixture<AartiReorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AartiReorderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AartiReorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
