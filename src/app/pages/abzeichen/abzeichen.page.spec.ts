import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AbzeichenPage} from './abzeichen.page';

describe('AbzeichenPage', () => {
    let component: AbzeichenPage;
    let fixture: ComponentFixture<AbzeichenPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AbzeichenPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(AbzeichenPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
