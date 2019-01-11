import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollegeHomePage } from './college-home';

@NgModule({
  declarations: [
    CollegeHomePage,
  ],
  imports: [
    IonicPageModule.forChild(CollegeHomePage),
  ],
})
export class CollegeHomePageModule {}
