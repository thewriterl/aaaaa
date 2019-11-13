import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AaaaSharedModule } from 'app/shared/shared.module';
import { IngressoComponent } from './ingresso.component';
import { IngressoDetailComponent } from './ingresso-detail.component';
import { IngressoUpdateComponent } from './ingresso-update.component';
import { IngressoDeletePopupComponent, IngressoDeleteDialogComponent } from './ingresso-delete-dialog.component';
import { ingressoRoute, ingressoPopupRoute } from './ingresso.route';

const ENTITY_STATES = [...ingressoRoute, ...ingressoPopupRoute];

@NgModule({
  imports: [AaaaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    IngressoComponent,
    IngressoDetailComponent,
    IngressoUpdateComponent,
    IngressoDeleteDialogComponent,
    IngressoDeletePopupComponent
  ],
  entryComponents: [IngressoDeleteDialogComponent]
})
export class AaaaIngressoModule {}
