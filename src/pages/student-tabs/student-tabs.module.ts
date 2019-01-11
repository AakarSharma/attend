import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentTabsPage } from './student-tabs';

@NgModule({
  declarations: [
    StudentTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentTabsPage),
  ],
})
export class StudentTabsPageModule {}
