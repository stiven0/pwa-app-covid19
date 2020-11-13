import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { MainService } from '@services/main.service';
import { InfoPaisesGlobal } from '@interface/paises';

@Component({
  selector: 'app-dialog-global',
  templateUrl: './dialog-global.component.html',
  styleUrls: ['./dialog-global.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogGlobalComponent implements OnInit {

  infoVirusGlobal: InfoPaisesGlobal;
  errorRed: boolean = false;

  constructor( private main: MainService, private cd: ChangeDetectorRef ) { }

  ngOnInit(): void {

    this.main.getInfoVirusGlobal().subscribe(
      (info: InfoPaisesGlobal) => {
        if ( this.errorRed ) { this.errorRed = false; }

        this.infoVirusGlobal = info;

        this.cd.markForCheck();
      },
      error => {
        if (error.errorPeticionRed) { this.errorRed = true; }

        this.cd.markForCheck();

      });

  }

}
