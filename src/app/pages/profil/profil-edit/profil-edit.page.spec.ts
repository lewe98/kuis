import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilEditPage } from './profil-edit.page';

describe('ProfilEditPage', () => {
  let component: ProfilEditPage;
  let fixture: ComponentFixture<ProfilEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
