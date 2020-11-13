import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsPageComponent } from '@shared/stats-page/stats-page.component';

const routes: Routes = [
    {
        path: 'stats',
        component: StatsPageComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})

export class RoutingSharedModule {}
