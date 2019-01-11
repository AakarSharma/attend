import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceViewPage } from './attendance-view';

@NgModule({
  declarations: [
    AttendanceViewPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceViewPage),
  ],
})
export class AttendanceViewPageModule {}
