import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOwner } from 'app/shared/model/owner.model';
import { OwnerService } from './owner.service';
import { OwnerDeleteDialogComponent } from './owner-delete-dialog.component';

@Component({
  selector: 'jhi-owner',
  templateUrl: './owner.component.html',
})
export class OwnerComponent implements OnInit, OnDestroy {
  owners?: IOwner[];
  eventSubscriber?: Subscription;

  constructor(protected ownerService: OwnerService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.ownerService.query().subscribe((res: HttpResponse<IOwner[]>) => (this.owners = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOwners();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOwner): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOwners(): void {
    this.eventSubscriber = this.eventManager.subscribe('ownerListModification', () => this.loadAll());
  }

  delete(owner: IOwner): void {
    const modalRef = this.modalService.open(OwnerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.owner = owner;
  }
}
