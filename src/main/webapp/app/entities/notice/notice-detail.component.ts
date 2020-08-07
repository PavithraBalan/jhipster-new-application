import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INotice } from 'app/shared/model/notice.model';

@Component({
  selector: 'jhi-notice-detail',
  templateUrl: './notice-detail.component.html',
})
export class NoticeDetailComponent implements OnInit {
  notice: INotice | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notice }) => (this.notice = notice));
  }

  previousState(): void {
    window.history.back();
  }
}
