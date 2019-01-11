import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceMarkPage } from './attendance-mark';

@NgModule({
  declarations: [
    AttendanceMarkPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceMarkPage),
  ],
})
export class AttendanceMarkPageModule {}
