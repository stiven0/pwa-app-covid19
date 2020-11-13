import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
    { path: '',      pathMatch: 'full', redirectTo: 'data' },
    {
        path: 'data',
        loadChildren: () => import('@main/main.module').then(m => m.MainModule)
    },
    {
        path: 'stats',
        loadChildren: () => import('@shared/shared.module').then(m => m.SharedModule)
    },
    { path: '**',    pathMatch: 'full', redirectTo: 'data' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
