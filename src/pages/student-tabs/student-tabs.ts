import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { FeedbackPage } from '../feedback/feedback';
import { AttendanceViewPage } from '../attendance-view/attendance-view';

@IonicPage()
@Component({
  selector: 'page-student-tabs',
  templateUrl: 'student-tabs.html',
})
export class StudentTabsPage {
  tab1Root = AttendanceViewPage;
  tab2Root = FeedbackPage;
  loaded: boolean = false;
  tabIndex: number = 0;

  constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {
  }

  ionViewWillEnter() {
  }

  private getAnimationDirection(index: number): string {
    var currentIndex = this.tabIndex;

    this.tabIndex = index;

    switch (true) {
      case (currentIndex < index):
        return ('left');
      case (currentIndex > index):
        return ('right');
    }
  }

  public transition(e: any): void {
    let options: NativeTransitionOptions = {
      direction: this.getAnimationDirection(e.index),
      duration: 250,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 20,
      androiddelay: 0,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 48
    };

    if (!this.loaded) {
      this.loaded = true;
      return;
    }

    this.nativePageTransitions.slide(options);
  }
}

