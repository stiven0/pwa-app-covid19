import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MainService } from '@services/main.service';
import { PaisStats } from '@interface/paises';

@Component({
  selector: 'app-dialog-stats',
  templateUrl: './dialog-stats.component.html',
  styleUrls: ['./dialog-stats.component.css']
})
export class DialogStatsComponent implements OnInit {

  paisName: string;
  paisNameEsp: string;
  statsPais: PaisStats[];
  errorRed: boolean = false;

  constructor( @Inject(MAT_DIALOG_DATA) public data: MatDialog,
               private mainService: MainService ) {

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
      },
      error => {
        if (error.errorPeticionRed) { this.errorRed = true; }
      });
  }

}



