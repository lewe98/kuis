import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrageComponent } from './frage.component';

describe('FrageComponent', () => {
  let component: FrageComponent;
  let fixture: ComponentFixture<FrageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
