import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INotice } from 'app/shared/model/notice.model';
import { NoticeService } from './notice.service';
import { NoticeDeleteDialogComponent } from './notice-delete-dialog.component';

@Component({
  selector: 'jhi-notice',
  templateUrl: './notice.component.html',
})
export class NoticeComponent implements OnInit, OnDestroy {
  notices?: INotice[];
  eventSubscriber?: Subscription;

  constructor(protected noticeService: NoticeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.noticeService.query().subscribe((res: HttpResponse<INotice[]>) => (this.notices = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNotices();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INotice): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNotices(): void {
    this.eventSubscriber = this.eventManager.subscribe('noticeListModification', () => this.loadAll());
  }

  delete(notice: INotice): void {
    const modalRef = this.modalService.open(NoticeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.notice = notice;
  }
}
