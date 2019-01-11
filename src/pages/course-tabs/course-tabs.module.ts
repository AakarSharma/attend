import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseTabsPage } from './course-tabs';

@NgModule({
  declarations: [
    CourseTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseTabsPage),
  ],
})
export class CourseTabsPageModule {}
