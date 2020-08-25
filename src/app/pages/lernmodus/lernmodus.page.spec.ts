import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {LernmodusPage} from './lernmodus.page';

describe('LernmodusPage', () => {
    let component: LernmodusPage;
    let fixture: ComponentFixture<LernmodusPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LernmodusPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(LernmodusPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
