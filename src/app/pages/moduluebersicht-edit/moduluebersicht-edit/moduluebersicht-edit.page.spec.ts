import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModuluebersichtEditPage } from './moduluebersicht-edit.page';

describe('ModuluebersichtEditPage', () => {
  let component: ModuluebersichtEditPage;
  let fixture: ComponentFixture<ModuluebersichtEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuluebersichtEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModuluebersichtEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
