import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { MainService } from '@services/main.service';
import { PaisStats } from '@interface/paises';


@Component({
  selector: 'app-dialog-stats',
  templateUrl: './dialog-stats.component.html',
  styleUrls: ['./dialog-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogStatsComponent implements OnInit {

  paisName: string;
  paisNameEsp: string;
  statsPais: PaisStats[];
  errorRed: boolean = false;

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

  constructor( @Inject(MAT_DIALOG_DATA) public data: MatDialog, private mainService: MainService,
               private cd: ChangeDetectorRef ) {

    this.paisName = this.data['paisApi'];
    this.paisNameEsp = this.data['paisEsp'];
  }

  ngOnInit(): void {

    this.getInfoStatsCountry();
  }

  getInfoStatsCountry() {
    const dateCurrent = new Date();
    const year = dateCurrent.getFullYear();
    const month = dateCurrent.getUTCMonth() + 1;
    const day = Number(String(dateCurrent).split(' ')[2]);

    if ( this.paisName.includes('Korea (South)') ) { this.paisName = 'korea-south'; }
    if ( this.paisName.includes('Syrian Arab Republic (Syria)') ) { this.paisName = 'syria'; }
    if ( this.paisName.includes('Venezuela (Bolivarian Republic)') ) { this.paisName = 'venezuela'; }
    if ( this.paisName.includes('Holy See (Vatican City State)') ) { this.paisName = 'vatican-city'; }

    this.mainService.getCountryStats( this.paisName, year, month, day ).subscribe(
      (paisArrayStats: PaisStats[]) => {
        if (this.errorRed) { this.errorRed = false; }

        this.statsPais = paisArrayStats;

        this.statsResult( this.statsPais );
      },
      error => {
        console.log(error);
        if (error.errorPeticionRed) { this.errorRed = true; }

        this.cd.markForCheck();
      });
  }

  // configuracion de estadisticas
  statsResult( stats: PaisStats[] ) {

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

                if ( this.lineChartLabels && this.lineChartLabels.includes('Enero') ) { continue; }
                this.lineChartLabels.push('Enero');


          } else if (data.Date.split('-')[1] === '02') {
                casosMesFebrero = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Febrero') ) { continue; }
                this.lineChartLabels.push('Febrero');


          } else if (data.Date.split('-')[1] === '03') {
                casosMesMarzo = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Marzo') ) { continue; }
                this.lineChartLabels.push('Marzo');


          } else if (data.Date.split('-')[1] === '04') {
                casosMesAbril = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Abril') ) { continue; }
                this.lineChartLabels.push('Abril');


          } else if (data.Date.split('-')[1] === '05') {
                casosMesMayo = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Mayo') ) { continue; }
                this.lineChartLabels.push('Mayo');


          } else if (data.Date.split('-')[1] === '06') {
                casosMesJunio = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Junio') ) { continue; }
                this.lineChartLabels.push('Junio');


          } else if (data.Date.split('-')[1] === '07') {
                casosMesJulio = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Julio') ) { continue; }
                this.lineChartLabels.push('Julio');


          } else if (data.Date.split('-')[1] === '08') {
                casosMesAgosto = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Agosto') ) { continue; }
                this.lineChartLabels.push('Agosto');


          } else if (data.Date.split('-')[1] === '09') {
                casosMesSeptiembre = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Septiembre') ) { continue; }
                this.lineChartLabels.push('Septiembre');


          } else if (data.Date.split('-')[1] === '10') {
                casosMesOctubre = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Octubre') ) { continue; }
                this.lineChartLabels.push('Octubre');


          } else if (data.Date.split('-')[1] === '11') {
                casosMesNoviembre = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Noviembre') ) { continue; }
                this.lineChartLabels.push('Noviembre');


          } else if (data.Date.split('-')[1] === '12') {
                casosMesDiciembre = data.Cases;

                if ( this.lineChartLabels && this.lineChartLabels.includes('Diciembre') ) { continue; }
                this.lineChartLabels.push('Diciembre');

          }

    }

    // agregamos la informacion de cada mes a la grafica de lineas
    this.lineChartData[0].data.push(casosMesEnero, casosMesFebrero, casosMesMarzo, casosMesAbril, casosMesMayo,
                                    casosMesJunio, casosMesJulio, casosMesAgosto, casosMesSeptiembre, casosMesNoviembre,
                                    casosMesDiciembre);

    this.cd.markForCheck();
   }


}



