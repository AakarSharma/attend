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
import { FeedbackPage } from '../pages/feedback/feedback';
import { AttendanceChangePage } from '../pages/attendance-change/attendance-change';
import { AttendanceMarkPage } from '../pages/attendance-mark/attendance-mark';
import { AttendanceViewPage } from '../pages/attendance-view/attendance-view';
import { CourseTabsPage } from '../pages/course-tabs/course-tabs';
import { StudentTabsPage } from '../pages/student-tabs/student-tabs';
import { CreatePage } from '../pages/create/create';
import { DetailsPage } from '../pages/details/details';
import { EditPage } from '../pages/edit/edit';
import { ProfilePage } from '../pages/profile/profile';











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
    AttendanceViewPage,
    AttendanceChangePage,
    AttendanceMarkPage,
    CourseTabsPage,
    StudentTabsPage,
    CreatePage,
    DetailsPage,
    EditPage,
    ProfilePage

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
    AttendanceViewPage,
    AttendanceChangePage,
    AttendanceMarkPage,
    CourseTabsPage,
    StudentTabsPage,
    CreatePage,
    DetailsPage,
    EditPage,
    ProfilePage
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
