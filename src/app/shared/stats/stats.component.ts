import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { PaisStats } from '@interface/paises';
import { MainService } from '@services/main.service';
import { stat } from 'fs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, DoCheck {

  @Input() paisName: string;
  @Input() paisNameEsp: string;
  @Input() statsPais: PaisStats[];
  @Input() errorRed: boolean = false;

  modal: boolean;

  // chartsjs
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Casos confirmados' }
  ];
  lineChartLabels: Label[] = [];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  constructor(
      private mainService: MainService,
      private router: Router
  ) { }

  ngOnInit(): void {

    if ( this.router.url.includes('/data')  ) {
        this.modal = true;

        if ( this.statsPais && this.statsPais.length > 0 ) {
                  this.statsResult( this.statsPais );
        }

    } else if ( this.router.url.includes('/stats') ) {

            this.modal = false;

            if ( this.statsPais && this.statsPais.length > 0 ) {
                  this.statsResult( this.statsPais );
            }

    }

  }

  ngDoCheck() {
        if ( !this.modal ) {
                  this.lineChartData[0].data = [];
                  this.statsResult( this.statsPais );
        }

  }

  atras() {
        this.router.navigateByUrl('/data');
  }


  // configuracion de estadisticas
  statsResult( stats: PaisStats[] ) {

    if ( !stats ) {
            return;
    }

    if ( stats[0]?.Country && !this.errorRed ) {
          this.mainService.saveCountryStorage( stats[0].Country );
    }

    let casosMesEnero: number = 0;
    let casosMesFebrero: number = 0;
    let casosMesMarzo: number = 0 ;
    let casosMesAbril: number = 0;
    let casosMesMayo: number = 0;
    let casosMesJunio: number = 0;
    let casosMesJulio: number = 0;
    let casosMesAgosto: number = 0;
    let casosMesSeptiembre: number = 0;
    let casosMesOctubre: number = 0;
    let casosMesNoviembre: number = 0;
    let casosMesDiciembre: number = 0;

    for ( const data of stats ) {

          if (data.Date.split('-')[1] === '01') {
                casosMesEnero = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Ene') ) { continue; }
                this.lineChartLabels.push('Ene');


          } else if (data.Date.split('-')[1] === '02') {
                casosMesFebrero = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Feb') ) { continue; }
                this.lineChartLabels.push('Feb');


          } else if (data.Date.split('-')[1] === '03') {
                casosMesMarzo = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Mar') ) { continue; }
                this.lineChartLabels.push('Mar');


          } else if (data.Date.split('-')[1] === '04') {
                casosMesAbril = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Abr') ) { continue; }
                this.lineChartLabels.push('Abr');


          } else if (data.Date.split('-')[1] === '05') {
                casosMesMayo = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('May') ) { continue; }
                this.lineChartLabels.push('May');


          } else if (data.Date.split('-')[1] === '06') {
                casosMesJunio = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Jun') ) { continue; }
                this.lineChartLabels.push('Jun');


          } else if (data.Date.split('-')[1] === '07') {
                casosMesJulio = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Jul') ) { continue; }
                this.lineChartLabels.push('Jul');


          } else if (data.Date.split('-')[1] === '08') {
                casosMesAgosto = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Ago') ) { continue; }
                this.lineChartLabels.push('Ago');


          } else if (data.Date.split('-')[1] === '09') {
                casosMesSeptiembre = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Sep') ) { continue; }
                this.lineChartLabels.push('Sep');


          } else if (data.Date.split('-')[1] === '10') {
                casosMesOctubre = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Oct') ) { continue; }
                this.lineChartLabels.push('Oct');


          } else if (data.Date.split('-')[1] === '11') {
                casosMesNoviembre = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Nov') ) { continue; }
                this.lineChartLabels.push('Nov');


          } else if (data.Date.split('-')[1] === '12') {
                casosMesDiciembre = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Dic') ) { continue; }
                this.lineChartLabels.push('Dic');

          }

    }

    // agregamos la informacion de cada mes a la grafica de lineas
    this.lineChartData[0].data.push(
                                    casosMesEnero,   casosMesFebrero,   casosMesMarzo,
                                    casosMesAbril,   casosMesMayo,      casosMesJunio,
                                    casosMesJulio,   casosMesAgosto,    casosMesSeptiembre,
                                    casosMesOctubre, casosMesNoviembre, casosMesDiciembre
                                    );
  }


}
