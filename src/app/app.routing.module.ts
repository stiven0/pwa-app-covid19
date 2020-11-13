import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InfoPaisComponent } from '@main/info-pais/info-pais.component';
import { StatsPageComponent } from '@shared/stats-page/stats-page.component';
import { StatsPageGuard } from '@guards/stats-page-guard.service';


const routes: Routes = [
    { path: '',      pathMatch: 'full', redirectTo: 'data' },
    {
        path: 'data',
        loadChildren: () => import('@main/main.module').then(m => m.MainModule)
    },
    {
        path: 'stats',
        canActivate: [ StatsPageGuard ],
        loadChildren: () => import('@shared/shared.module').then(m => m.SharedModule)
    },
    { path: '**',    pathMatch: 'full', redirectTo: 'data' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
