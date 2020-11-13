import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ActivatedRoute, Router } from '@angular/router';

import { MainService } from '@services/main.service';
import { PaisStats } from '@interface/paises';
import { paises } from '@settings/paises-array';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsPageComponent implements OnInit, OnDestroy {

  paisName: string;
  paisNameEsp: string;
  statsPais: PaisStats[];
  errorRed: boolean = false;
  nameCountries = paises;

  private destroyed$ = new Subject();

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
    private activated: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

      this.mainService.pais
      .pipe( takeUntil( this.destroyed$ ) )
      .subscribe( data => this.router.navigate( ['/stats'], { queryParams: { paisName: data.paisApi } } ));

      this.activated.queryParams.subscribe( async query =>  {
            if ( window.innerWidth <= 760 ) {
                  this.paisName = query.paisName;

                  const response = await this.verifyCountryName( query.paisName );
                  if ( !response ) {
                       this.paisName = 'Colombia';
                  }

                  this.getInfoStatsCountry();

            }
      });


  }

  ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
  }

  getInfoStatsCountry() {
    const dateCurrent = new Date();
    const year = dateCurrent.getFullYear();
    const month = dateCurrent.getUTCMonth() + 1;
    const day = Number(String(dateCurrent).split(' ')[2]);

    if ( this.statsPais && this.statsPais.length ) {
          this.statsPais = [];
          this.lineChartData[0].data = [];
    }

    if ( this.paisName.includes('Korea (South)') ) { this.paisName = 'korea-south'; }
    if ( this.paisName.includes('Syrian Arab Republic (Syria)') ) { this.paisName = 'syria'; }
    if ( this.paisName.includes('Venezuela (Bolivarian Republic)') ) { this.paisName = 'venezuela'; }
    if ( this.paisName.includes('Holy See (Vatican City State)') ) { this.paisName = 'vatican-city'; }

    this.mainService.getCountryStats( this.paisName, year, month, day ).subscribe(
      (paisArrayStats: PaisStats[]) => {

        if (this.errorRed) { this.errorRed = false; }

        this.statsPais = paisArrayStats;

        this.cd.markForCheck();

      },
      error => {
        if (error.errorPeticionRed) { this.errorRed = true; }

        this.cd.markForCheck();

      });
  }

  verifyCountryName( name: string ): Promise<boolean> {

    return new Promise( resolve => {

      this.nameCountries.forEach( (country) => {

        if ( name.toLocaleLowerCase() === country.nombreAPI.toLocaleLowerCase() ) {
              // this.paisNameEsp = country.nombreSP;
              resolve(true);
        }

      });

      resolve(false);

    });

  }



}
