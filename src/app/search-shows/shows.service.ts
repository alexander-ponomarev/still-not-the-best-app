import { Injectable } from '@angular/core';
import { BackendService } from '../backend.service';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

export interface IShow {
  name: string;
  actors: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private shows: Subject<IShow[]> = new Subject();

  constructor(private backendService: BackendService) {}

  public requestShows(query: string): void {
    if (!query || query.length === 0) {
      this.shows.next([]);
      return;
    }

    this.backendService
      .searchShows(query)
      .pipe(
        switchMap((shows) => {
          const showIds = shows.map((show) => show.show.id);
          const requests = showIds.map((showId) => this.backendService.getCastByShow(showId));

          return forkJoin(requests).pipe(withLatestFrom(of(shows)));
        }),
        map(([cast, shows]: [any, any]) => {
          const resultShows = [];
          shows.forEach(({ show }, i) => {
            resultShows[i] = { name: show.name, actors: [] };
            resultShows[i].actors = cast[i].map(({ person }) => person.name);
          });
          return resultShows;
        })
      )
      .subscribe((showsWithCast: IShow[]) => this.shows.next(showsWithCast));
  }

  public get shows$(): Observable<IShow[]> {
    return this.shows.asObservable();
  }
}
