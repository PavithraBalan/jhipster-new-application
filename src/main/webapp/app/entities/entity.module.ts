import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.JhipsterNewApplicationProductModule),
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.JhipsterNewApplicationAuthorModule),
      },
      {
        path: 'notice',
        loadChildren: () => import('./notice/notice.module').then(m => m.JhipsterNewApplicationNoticeModule),
      },
      {
        path: 'owner',
        loadChildren: () => import('./owner/owner.module').then(m => m.JhipsterNewApplicationOwnerModule),
      },
      {
        path: 'pet',
        loadChildren: () => import('./pet/pet.module').then(m => m.JhipsterNewApplicationPetModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JhipsterNewApplicationEntityModule {}
