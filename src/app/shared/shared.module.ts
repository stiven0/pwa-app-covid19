import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '@angular-material/angular-material.module';
import { ChartsModule } from 'ng2-charts';

import { DialogGlobalComponent } from '@shared/dialog-global/dialog-global.component';
import { DialogStatsComponent } from '@shared/dialog-stats/dialog-stats.component';
import { ErrorRedComponent } from '@shared/error-red/error-red.component';
import { StatsPageComponent } from '@shared/stats-page/stats-page.component';
import { StatsComponent } from '@shared/stats/stats.component';
import { PipesModule } from '@shared/pipes/pipes.module';
import { RoutingSharedModule } from '@shared/routing.shared.module';


@NgModule({
    declarations: [
        DialogGlobalComponent,
        DialogStatsComponent,
        ErrorRedComponent,
        StatsPageComponent,
        StatsComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        ChartsModule,
        PipesModule,
        RoutingSharedModule
    ],
    exports: [
        DialogGlobalComponent,
        DialogStatsComponent,
        ErrorRedComponent,
        StatsPageComponent,
        StatsComponent,
        PipesModule
    ]

})


export class SharedModule {}
