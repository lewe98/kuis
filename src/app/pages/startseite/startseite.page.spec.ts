import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {StartseitePage} from './startseite.page';

describe('StartseitePage', () => {
    let component: StartseitePage;
    let fixture: ComponentFixture<StartseitePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StartseitePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(StartseitePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
