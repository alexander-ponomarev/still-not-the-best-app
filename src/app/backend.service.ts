import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BackendService {
  constructor(private http: HttpClient) {}

  public getCastByShow(showId: string): Observable<any> {
    return this.http
      .get('https://api.tvmaze.com/shows/' + showId + '/cast')
      .pipe(catchError((err: HttpErrorResponse) => of([])));
  }

  public searchShows(name: string): Observable<any> {
    return this.http
      .get('https://api.tvmaze.com/search/shows?q=' + name)
      .pipe(catchError((err: HttpErrorResponse) => of([])));
  }
  public getAllShows(pageNum: string | number): Observable<any> {
    return this.http
      .get('https://api.tvmaze.com/shows?page=' + pageNum)
      .pipe(catchError((err: HttpErrorResponse) => of([])));
  }
}
