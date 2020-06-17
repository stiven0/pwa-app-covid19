import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler,
         HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class InterceptorMainService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'applications/json'
        });

        const reqClone = req.clone({
            headers
        });

        return next.handle( reqClone ).pipe(
            catchError( this.manejarError )
        );
    }

    manejarError( error: HttpResponse<any> ) {
        console.log(error);
        if ( error instanceof HttpErrorResponse ) {
                return throwError( { errorPeticionRed: true } );
        }

        return throwError(error);
    }
}
