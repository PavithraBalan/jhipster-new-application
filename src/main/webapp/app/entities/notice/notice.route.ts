import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INotice, Notice } from 'app/shared/model/notice.model';
import { NoticeService } from './notice.service';
import { NoticeComponent } from './notice.component';
import { NoticeDetailComponent } from './notice-detail.component';
import { NoticeUpdateComponent } from './notice-update.component';

@Injectable({ providedIn: 'root' })
export class NoticeResolve implements Resolve<INotice> {
  constructor(private service: NoticeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INotice> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((notice: HttpResponse<Notice>) => {
          if (notice.body) {
            return of(notice.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Notice());
  }
}

export const noticeRoute: Routes = [
  {
    path: '',
    component: NoticeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterNewApplicationApp.notice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NoticeDetailComponent,
    resolve: {
      notice: NoticeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterNewApplicationApp.notice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NoticeUpdateComponent,
    resolve: {
      notice: NoticeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterNewApplicationApp.notice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NoticeUpdateComponent,
    resolve: {
      notice: NoticeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterNewApplicationApp.notice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
