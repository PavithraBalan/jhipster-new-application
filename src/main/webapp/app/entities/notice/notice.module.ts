import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterNewApplicationSharedModule } from 'app/shared/shared.module';
import { NoticeComponent } from './notice.component';
import { NoticeDetailComponent } from './notice-detail.component';
import { NoticeUpdateComponent } from './notice-update.component';
import { NoticeDeleteDialogComponent } from './notice-delete-dialog.component';
import { noticeRoute } from './notice.route';

@NgModule({
  imports: [JhipsterNewApplicationSharedModule, RouterModule.forChild(noticeRoute)],
  declarations: [NoticeComponent, NoticeDetailComponent, NoticeUpdateComponent, NoticeDeleteDialogComponent],
  entryComponents: [NoticeDeleteDialogComponent],
})
export class JhipsterNewApplicationNoticeModule {}
