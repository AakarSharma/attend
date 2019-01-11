import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceChangePage } from './attendance-change';

@NgModule({
  declarations: [
    AttendanceChangePage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceChangePage),
  ],
})
export class AttendanceChangePageModule {}
