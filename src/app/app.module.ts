import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2'; // using angular2 for firebase
import { AngularFireAuthModule } from 'angularfire2/auth';  // importing auth module of angularfire2
import { AngularFireDatabaseModule } from 'angularfire2/database'; // importing database module of angularfire2
import { AngularFireStorageModule } from 'angularfire2/storage'; // importing storage module of angularfire2
import { HttpClientModule } from '@angular/common/http';
import { HeaderColor } from '@ionic-native/header-color';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';


import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CollegeTabsPage } from '../pages/college-tabs/college-tabs';
import { CollegeHomePage } from '../pages/college-home/college-home';
import { AttendanceViewPage } from '../pages/attendance-view/attendance-view';
import { FeedbackPage } from '../pages/feedback/feedback';




var firebaseAuth = {
  apiKey: "AIzaSyAF9hlsirzvI894mS9b2AYQiiGZRgcp4lA",
  authDomain: "attend-dfc7c.firebaseapp.com",
  databaseURL: "https://attend-dfc7c.firebaseio.com",
  projectId: "attend-dfc7c",
  storageBucket: "attend-dfc7c.appspot.com",
  messagingSenderId: "819430918325"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CollegeTabsPage,
    CollegeHomePage,
    FeedbackPage,
    AttendanceViewPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseAuth),  // app initilise with the firebase key
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,

    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CollegeTabsPage,
    CollegeHomePage,
    FeedbackPage,
    AttendanceViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HeaderColor,
    NativePageTransitions,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
