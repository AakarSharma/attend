import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollegeTabsPage } from './college-tabs';

@NgModule({
  declarations: [
    CollegeTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(CollegeTabsPage),
  ],
})
export class CollegeTabsPageModule {}
