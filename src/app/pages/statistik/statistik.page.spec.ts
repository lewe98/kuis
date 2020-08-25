import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {StatistikPage} from './statistik.page';

describe('StatistikPage', () => {
    let component: StatistikPage;
    let fixture: ComponentFixture<StatistikPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatistikPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(StatistikPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
