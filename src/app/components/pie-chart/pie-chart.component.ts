import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
    // Quelle: https://valor-software.com/ng2-charts/

    // Pie
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
            backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
        },
    ];

    user: User;
    richtig = 0;
    falsch = 0;
    sumFragen = 0;
    counter = [];
    counterElem = 1;

    constructor(public authService: AuthService) {
        this.user = this.authService.getUser();

        this.sumFragen = this.user.historieLernmodus.length * 10;

        this.user.historieLernmodus.forEach(elem => {
            this.counter.push(this.counterElem);
            this.richtig += elem;
            this.counterElem++;
        });
        this.falsch = this.sumFragen - this.richtig;
        this.pieChartData.push(this.falsch, this.richtig);
    }

    ngOnInit() {
    }
}
