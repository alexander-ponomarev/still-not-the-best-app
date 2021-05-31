import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit, OnDestroy {
  public queryShowsControl: FormControl = new FormControl('');

  private destroy$: Subject<void> = new Subject();

  constructor(private showsService: ShowsService) {}

  ngOnInit(): void {
    this.queryShowsControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query: string) => {
        this.showsService.requestShows(query);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
