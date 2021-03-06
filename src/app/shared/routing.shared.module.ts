import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsPageComponent } from '@shared/stats-page/stats-page.component';
import { StatsPageGuard } from '@guards/stats-page-guard.service';

const routes: Routes = [
    {
        path: 'stats',
        canActivate: [ StatsPageGuard],
        component: StatsPageComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})

export class RoutingSharedModule {}
