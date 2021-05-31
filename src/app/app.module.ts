import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShowListComponent } from './search-shows/shows-list/shows.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFormComponent } from './search-shows/search-form/search-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchShowsComponent } from './search-shows/search-shows.component';
import { AllShowsComponent } from './all-shows/all-shows.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: '',
    component: SearchShowsComponent
  },
  {
    path: 'all-shows',
    component: AllShowsComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule
  ],
  declarations: [AppComponent, ShowListComponent, SearchFormComponent, SearchShowsComponent, AllShowsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
