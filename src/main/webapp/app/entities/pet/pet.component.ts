import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPet } from 'app/shared/model/pet.model';
import { PetService } from './pet.service';
import { PetDeleteDialogComponent } from './pet-delete-dialog.component';

@Component({
  selector: 'jhi-pet',
  templateUrl: './pet.component.html',
})
export class PetComponent implements OnInit, OnDestroy {
  pets?: IPet[];
  eventSubscriber?: Subscription;

  constructor(protected petService: PetService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.petService.query().subscribe((res: HttpResponse<IPet[]>) => (this.pets = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPet): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPets(): void {
    this.eventSubscriber = this.eventManager.subscribe('petListModification', () => this.loadAll());
  }

  delete(pet: IPet): void {
    const modalRef = this.modalService.open(PetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pet = pet;
  }
}
