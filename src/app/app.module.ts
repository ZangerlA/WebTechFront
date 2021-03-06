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
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from '@angular/material/select';
import { MediaSinglePopupAddMediaComponent } from './components/media-single-popup-add-media/media-single-popup-add-media.component';
import { WatchlistUserComponent } from './components/watchlist-user/watchlist-user.component';
import { WatchlistAllUsersComponent } from './components/watchlist-all-users/watchlist-all-users.component';



const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
        { path: 'Welcome', component: HomeWelcomeComponent, canActivate: [AuthGuard] },
        { path: 'Profil', component: HomeProfilComponent, canActivate: [AuthGuard] },
        { path: 'newMedia', component: HomeAddMediaComponent, canActivate: [AuthGuard] },
        { path: 'Movies', component: HomeMoviesComponent, canActivate: [AuthGuard] },
        { path: 'Anime', component: HomeAnimesComponent, canActivate: [AuthGuard] },
        { path: 'Games', component: HomeGamesComponent, canActivate: [AuthGuard] },
        { path: 'Series', component: HomeSeriesComponent, canActivate: [AuthGuard] },
        { path: 'Watchlist', component: WatchlistUserComponent, canActivate: [AuthGuard]},
        { path: 'UserWatchlists', component: WatchlistAllUsersComponent, canActivate: [AuthGuard]}
      ]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
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
    MediaSinglePopupAddMediaComponent,
    WatchlistUserComponent,
    WatchlistAllUsersComponent,

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
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
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
