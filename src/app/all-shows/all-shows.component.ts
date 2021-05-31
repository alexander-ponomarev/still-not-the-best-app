import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BackendService } from '../backend.service';

interface IServerResponse {
  items: string[];
  total: number;
}

@Component({
  selector: 'app-all-shows',
  templateUrl: './all-shows.component.html',
  styleUrls: ['./all-shows.component.scss']
})
export class AllShowsComponent implements OnInit {
  public shows$: Observable<any[]>;
  public pageNumber: number = 1;
  /* hardcoded because

  * 1) api doesn't return total amount of shows
  * 2) don't want to build a complex solution to calculate

  * for demo purposes it's completely fine
  * */
  public totalShows = 55500;
  public itemsPerPage = 250;
  public areShowsLoading = false;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.updatePage(1);
  }

  public updatePage(page: number): void {
    this.areShowsLoading = true;

    this.shows$ = this.requestShows$(page).pipe(
      tap((res) => {
        this.totalShows = res.total;
        this.pageNumber = page;
        this.areShowsLoading = false;
      }),
      map((res) => res.items)
    );
  }

  private requestShows$(page: number): Observable<IServerResponse> {
    return this.backendService.getAllShows(page).pipe(
      map((result) => ({
        items: result,
        /* this is also not fine cuz it takes value from the class scope
         * only for demo purpose, ofc it shouldn't be done in this way */
        total: this.totalShows
      }))
    );
  }
}
