
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatsPageGuard implements CanActivate {

    constructor(
        private router: Router
    ) {}

    canActivate( activatedSnapshot: ActivatedRouteSnapshot ): Observable<boolean> | Promise<boolean> | boolean {


        if ( window.innerWidth >= 610 ) {
                this.router.navigateByUrl('/data');
                return false;
        }

        if ( !activatedSnapshot.queryParams['paisName'] ) {
                activatedSnapshot.queryParams = { paisName: 'Colombia' };
        }

        return true;
    }
}
