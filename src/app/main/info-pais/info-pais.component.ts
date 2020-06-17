import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MainService } from '@services/main.service';
import { PaisAPI } from '@interface/paises';
import { DialogStatsComponent } from '@shared/dialog-stats/dialog-stats.component';


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

  constructor( private mainService: MainService, public dialog: MatDialog,
               private cd: ChangeDetectorRef  ) { }

  ngOnInit(): void {
    // console.log(navigator.userAgent);
    this.getPaisInfoVirus();

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

        // le decimos a angular que active el change detection
        this.cd.markForCheck();
      },
      error => {
        if (error.errorPeticionRed) { this.errorRed = true; }

        this.cd.markForCheck();
      });
  }

  openStats() {
    this.dialog.open(DialogStatsComponent, {
      width: '100%',
      data: { paisApi: this.pais.Country, paisEsp: this.paisNameEsp }
    });
  }

}
