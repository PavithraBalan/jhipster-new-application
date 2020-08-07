import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INotice } from 'app/shared/model/notice.model';
import { NoticeService } from './notice.service';

@Component({
  templateUrl: './notice-delete-dialog.component.html',
})
export class NoticeDeleteDialogComponent {
  notice?: INotice;

  constructor(protected noticeService: NoticeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.noticeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('noticeListModification');
      this.activeModal.close();
    });
  }
}
