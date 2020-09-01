import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImpressPage } from './impress.page';

describe('ImpressPage', () => {
  let component: ImpressPage;
  let fixture: ComponentFixture<ImpressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImpressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
