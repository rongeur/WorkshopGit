import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {WelcomePage} from '../pages/welcome/welcome';
import {SongListPage} from '../pages/song-list/song-list';
import {MusersListPage} from '../pages/favorite-list/favorite-list';
import {LoginPage} from '../pages/login/login';
import {AboutPage} from '../pages/about/about';

import {SongService} from "../providers/song-service-rest";
import {UserService} from "../providers/user-service-rest";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    AboutPage,
    SongListPage,
    MusersListPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    AboutPage,
    SongListPage,
    MusersListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SongService,  
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
