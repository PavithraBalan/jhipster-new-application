import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterNewApplicationSharedModule } from 'app/shared/shared.module';
import { PetComponent } from './pet.component';
import { PetDetailComponent } from './pet-detail.component';
import { PetUpdateComponent } from './pet-update.component';
import { PetDeleteDialogComponent } from './pet-delete-dialog.component';
import { petRoute } from './pet.route';

@NgModule({
  imports: [JhipsterNewApplicationSharedModule, RouterModule.forChild(petRoute)],
  declarations: [PetComponent, PetDetailComponent, PetUpdateComponent, PetDeleteDialogComponent],
  entryComponents: [PetDeleteDialogComponent],
})
export class JhipsterNewApplicationPetModule {}
