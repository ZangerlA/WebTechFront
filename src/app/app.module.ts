import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlexLayoutModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/authconfig.interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { NavbarHeaderComponent } from './components/navigation-toolbar/navbar-header.component';
import { NavbarBodyComponent } from './components/navigation-sidebar/navbar-body.component';
import { HomeWelcomeComponent } from './components/home-welcome/home-welcome.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule} from '@angular/material/list';
import { HomeMoviesComponent } from './components/home-movies/home-movies.component';
import { HomeAnimesComponent } from './components/home-animes/home-animes.component';
import { HomeGamesComponent } from './components/home-games/home-games.component';
import { HomeSeriesComponent } from './components/home-series/home-series.component';
import { MediaSingleComponent } from './components/media-single/media-single.component';
import { ToggleService} from './services/toggle.service';
import { HomeAddMediaComponent } from './components/home-add-media/home-add-media.component';
import { MatOptionModule } from '@angular/material/core';
import { HomeProfilComponent } from './components/home-profil/home-profil.component';
import { MediaSinglePopupComponent } from './components/media-single-popup/media-single-popup.component';
import {MatTabsModule} from "@angular/material/tabs";

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
        { path: 'Profil', component:HomeProfilComponent},
        { path: 'newMedia', component: HomeAddMediaComponent },
        { path: 'Movies', component: HomeMoviesComponent, children: [
            { path: 'singleMovie', component: MediaSingleComponent }
          ]},
        { path: 'Anime', component: HomeWelcomeComponent, children: [
            { path: 'singleAnime', component: HomeWelcomeComponent }
          ]},
        { path: 'Games', component: HomeWelcomeComponent, children: [
            { path: 'singleGame', component: HomeWelcomeComponent }
          ]},
        { path: 'Series', component: HomeWelcomeComponent, children: [
            { path: 'singleSerie', component: HomeWelcomeComponent }
          ]},
        {path: 'Movies', component: HomeMoviesComponent, children: [
            {path: 'singleMovie', component: MediaSingleComponent}
          ]},
        {path: 'Anime', component: HomeWelcomeComponent, children: [
            {path: 'singleAnime', component: HomeWelcomeComponent}
          ]},
        {path: 'Games', component: HomeWelcomeComponent, children: [
            {path: 'singleGame', component: HomeWelcomeComponent}
          ]},
        {path: 'Series', component: HomeWelcomeComponent, children: [
            {path: 'singleSerie', component: HomeWelcomeComponent}
        ]},
      ] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'nav', component: NavbarBodyComponent }
  ];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarHeaderComponent,
    NavbarBodyComponent,
    HomeWelcomeComponent,
    HomeMoviesComponent,
    HomeAnimesComponent,
    HomeGamesComponent,
    HomeSeriesComponent,
    MediaSingleComponent,
    HomeAddMediaComponent,
    HomeProfilComponent,
    MediaSinglePopupComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatListModule,
    MatOptionModule,
    MatTabsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ToggleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
