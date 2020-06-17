import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Paises } from '@interface/paises';
import { MainService } from '@services/main.service';
import { DialogGlobalComponent } from '@shared/dialog-global/dialog-global.component';
import { paises } from '@settings/paises-array';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  paisesResult: Paises[] = [];
  userSearch: FormControl;
  paisesArrayMenu: Paises[];

  private destroyed$ = new Subject();

  constructor( private mainService: MainService, public dialog: MatDialog ) {
    this.userSearch = new FormControl();
  }


  ngOnInit(): void {

    // identificar cualquier cambio en la propiedad userSearch
    this.userSearch.valueChanges
    .pipe( takeUntil( this.destroyed$ ) )
    .subscribe( value => paises.filter( pais => {

      if ( value.length < 2 ) {
            this.paisesResult = [];
            return;
      }

      if ( pais.nombreSP.toLowerCase().includes( value.toLowerCase() ) ) {

        if ( this.paisesResult.length === 0 ) {
             this.paisesResult.unshift(pais);

        } else {

           this.paisesResult = this.paisesResult
           .filter( pais2 => pais2.nombreSP.toLowerCase() !== pais.nombreSP.toLowerCase() );
           this.paisesResult.unshift( pais );

        }
      }
    }) );

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  // listener del click de las opciones de paises desplegables
  emitPais( namePaisApi: string, namePaisEsp: string) {
    this.mainService.pais.emit( { paisApi: namePaisApi, paisNameEsp: namePaisEsp } );
  }

  // listener del enter del input de busqueda
  enterInput( evento: KeyboardEvent ) {

    if ( !this.userSearch.value || this.userSearch.value.length <= 2 ) { return; }

    for ( const [index, pais] of paises.entries() ) {
          if ( pais.nombreSP.toLowerCase() === this.userSearch.value.toLowerCase() ) {
                this.mainService.pais.emit( { paisApi: pais.nombreAPI, paisNameEsp: pais.nombreSP} );
          }
    }
  }

  // abrir modal con informacion del virus a nivel global
  abrirInfoVirus() {
    this.dialog.open(DialogGlobalComponent, {
      width: '75%'
    });
  }

}
