import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoPaisComponent } from './info-pais/info-pais.component';

const routes: Routes = [
    {
        path: 'data',
        component: InfoPaisComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})

export class RoutingMainModule {}
