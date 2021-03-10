import { NewDetail } from './../models/new-detail.model';
import { Country } from './../models/country.model';
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewService {
    constructor(private _http: HttpClient) {

    }
    
    private apiUrl = "https://api.covid19api.com/";

    getAllStatusByCountry(selectedCountry: Country): Observable<NewDetail[]> {
        return this._http.get<NewDetail[]>(this.apiUrl + "country/" + selectedCountry.Slug);
    }

    getCountries(): Observable<Country[]> {
        return this._http.get<Country[]>(this.apiUrl + "countries")
        .pipe(
            catchError((error) => { return throwError(error); }));
      }
}