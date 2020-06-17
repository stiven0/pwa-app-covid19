import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaisAPI, InfoPaisesGlobal, PaisStats } from '@interface/paises';


@Injectable({
    providedIn: 'root'
})

export class MainService {

    pais: EventEmitter<{ paisApi: string, paisNameEsp: string }> = new EventEmitter();
    private urlAPI: string = 'https://api.covid19api.com/';

    constructor( private http: HttpClient) {}

    getInfoVirusGlobal(): Observable<InfoPaisesGlobal> {
        return this.http.get( `${this.urlAPI}summary` )
                   .pipe(
                       map( (response: { Global: InfoPaisesGlobal, Countries: PaisAPI[] }) => response.Global )
                    );
    }


    getInfoVirusCountry(namePais: string): Observable<PaisAPI[]> {
        return this.http.get( `${this.urlAPI}summary` )
                 .pipe(
                    map( (response: { Global: {}, Countries: PaisAPI[] }) => {
                            return response.Countries.filter(
                                    (pais: PaisAPI) => pais.Country.toLowerCase() === namePais.toLowerCase()
                                    );
                    })
                 );

    }

    getCountryStats( pais: string, year: number, month: number, day: number ): Observable<PaisStats[]> {
        const urlStatsCountry = `total/country/${pais}/status/confirmed?from=2020-03-01T00:00:00Z&to=${year}-${month}-${day}T00:00:00Z`;

        return this.http.get<PaisStats[]>(`${ this.urlAPI }${ urlStatsCountry }`);
    }


}
