import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MainService } from '@services/main.service';
import { PaisAPI } from '@interface/paises';
import { DialogStatsComponent } from '@shared/dialog-stats/dialog-stats.component';
import { verifyCountryName } from '@settings/paises-array';


@Component({
  selector: 'app-info-pais',
  templateUrl: './info-pais.component.html',
  styleUrls: ['./info-pais.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPaisComponent implements OnInit, OnDestroy {

  pais: PaisAPI;
  paisNameEsp: string = 'Colombia';
  errorRed: boolean = false;

  private destroyed$ = new Subject();

  constructor(  private mainService: MainService,
                public  dialog: MatDialog,
                private cd: ChangeDetectorRef,
                private router: Router ) { }

  async ngOnInit() {

    if ( localStorage.getItem('country') && localStorage.getItem('country') !== null ) {
          const country = localStorage.getItem('country');
          (this.paisNameEsp as any) = await verifyCountryName( country );
          this.getPaisInfoVirus( country );

    } else {
        this.getPaisInfoVirus();
    }



    // suscripcion a evento originado en el buscador
    this.mainService.pais
    .pipe( takeUntil(this.destroyed$) )
    .subscribe( ({ paisApi, paisNameEsp }) => {
      this.paisNameEsp = paisNameEsp;

      this.getPaisInfoVirus( paisApi );
    });

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getPaisInfoVirus( paisReceived: string = 'Colombia' ) {

    if ( this.pais && this.pais.Country === paisReceived ) { return; }

    this.mainService.getInfoVirusCountry( paisReceived ).subscribe(
      (country: PaisAPI[]) => {

        if (this.errorRed) { this.errorRed = false; }

        this.pais = country[0];
        this.mainService.saveCountryStorage( this.pais.Country );


        // le decimos a angular que active el change detection
        this.cd.markForCheck();
      },
      error => {
        if (error.errorPeticionRed) { this.errorRed = true; }

        this.cd.markForCheck();
      });
  }

  openStats() {

    if ( window.innerWidth <= 610) {
          this.router.navigate( ['/stats'], { queryParams: { paisName: this.pais.Country } } );
          return;
    }


    this.dialog.open(DialogStatsComponent, {
      width: '100%',
      data: { paisApi: this.pais.Country, paisEsp: this.paisNameEsp }
    });
  }



}
