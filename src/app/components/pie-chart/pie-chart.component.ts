import {Component, OnDestroy} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth/auth.service';
import {StatistikService} from '../../services/statistik/statistik.service';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnDestroy {
    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'right',
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    return ctx.chart.data.labels[ctx.dataIndex];
                },
            },
        }
    };
    public pieChartLabels: Label[] = [['Falsch'], ['Richtig']];
    public pieChartData: number[] = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
        {
            backgroundColor: ['rgba(193, 60, 60, 1)', 'rgba(18, 179, 154, 1)'],
        },
    ];

    user: User;
    richtig = 0;
    falsch = 0;
    sumFragen = 0;
    counter = [];
    counterElem = 1;
    sekunden = 0;
    minuten = 0;
    stunden = 0;
    tage = 0;


    /**
     * Prepare user for Statistik/Pie-Chart
     * @param authService to get the current user
     * @param statservice to get needed arrays - !!!must be private!!!
     */
    constructor(public authService: AuthService,
                private statservice: StatistikService) {
        this.user = this.authService.getUser();
        this.statservice.freiermodusanzahl = [];
        this.statservice.freiermodusname = [];
        this.statservice.lernmodushistorie = [];
        for (let i = 0; i < this.user.historieFreiermodusAnzahl.length; i++) {
            this.statservice.freiermodusanzahl.unshift(this.user.historieFreiermodusAnzahl[i]);
            this.statservice.freiermodusname.unshift(this.user.historieFreiermodusName[i]);
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.user.historieLernmodus.length; i++) {
            this.statservice.lernmodushistorie.unshift(this.user.historieLernmodus[i]);
        }


        this.tage = Math.floor(this.user.gesamtzeit / (3600 * 24));
        this.stunden = Math.floor(this.user.gesamtzeit % (3600 * 24) / 3600);
        this.user.gesamtzeit %= 3600;
        this.minuten = Math.floor(this.user.gesamtzeit / 60);
        this.sekunden = this.user.gesamtzeit % 60;

        this.sumFragen = this.user.historieLernmodus.length * 10;

        this.user.historieLernmodus.forEach(elem => {
            this.counter.push(this.counterElem);
            this.richtig += elem;
            this.counterElem++;
        });
        this.falsch = this.sumFragen - this.richtig;
        this.pieChartData.push(this.falsch, this.richtig);
    }

    ngOnDestroy() {
        this.statservice.freiermodusanzahl = [];
        this.statservice.freiermodusname = [];
        this.statservice.lernmodushistorie = [];
    }
}
