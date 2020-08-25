import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ModuluebersichtPage} from './moduluebersicht.page';

describe('ModuluebersichtPage', () => {
    let component: ModuluebersichtPage;
    let fixture: ComponentFixture<ModuluebersichtPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModuluebersichtPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ModuluebersichtPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
