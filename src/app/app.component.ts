import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';


import { LoginPage } from '../pages/login/login';
import { CollegeTabsPage } from '../pages/college-tabs/college-tabs';
import { CourseTabsPage } from '../pages/course-tabs/course-tabs';
import { StudentTabsPage } from '../pages/student-tabs/student-tabs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth) {
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        var id = user.email;
        id = id.substring(0, id.indexOf('@'));
        if (id === "admin") {
          this.rootPage = CollegeTabsPage;
        }
        else if (id.length == 6) {
          this.rootPage = CourseTabsPage;
        } else if (id.length == 11) {
          this.rootPage = StudentTabsPage;
        }
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

