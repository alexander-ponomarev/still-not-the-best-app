import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { IShow, ShowsService } from '../shows.service';

@Component({
  selector: 'shows',
  templateUrl: `./shows.component.html`,
  styleUrls: ['shows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowListComponent implements OnInit, OnDestroy {
  public shows$: Observable<IShow[]>;

  private destroy$: Subject<void> = new Subject();

  constructor(private showsService: ShowsService) {}

  ngOnInit(): void {
    this.shows$ = this.showsService.shows$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
