import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AngularMaterialModule } from '@angular-material/angular-material.module';
import { ChartsModule } from 'ng2-charts';

import { DialogGlobalComponent } from '@shared/dialog-global/dialog-global.component';
import { DialogStatsComponent } from '@shared/dialog-stats/dialog-stats.component';
import { ErrorRedComponent } from './error-red/error-red.component';


@NgModule({
    declarations: [
        DialogGlobalComponent,
        DialogStatsComponent,
        ErrorRedComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        ChartsModule
    ],
    exports: [
        DialogGlobalComponent,
        DialogStatsComponent,
        ErrorRedComponent
    ],
    entryComponents: [
        DialogGlobalComponent,
        DialogStatsComponent
    ]

})


export class SharedModule {}