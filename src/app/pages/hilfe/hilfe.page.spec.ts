import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HilfePage} from './hilfe.page';

describe('HilfePage', () => {
    let component: HilfePage;
    let fixture: ComponentFixture<HilfePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HilfePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(HilfePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
