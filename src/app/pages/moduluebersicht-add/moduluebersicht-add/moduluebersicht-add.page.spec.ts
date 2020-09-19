import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModuluebersichtAddPage } from './moduluebersicht-add.page';

describe('ModuluebersichtAddPage', () => {
  let component: ModuluebersichtAddPage;
  let fixture: ComponentFixture<ModuluebersichtAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuluebersichtAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModuluebersichtAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
