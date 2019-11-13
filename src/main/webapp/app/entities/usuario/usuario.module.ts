import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AaaaSharedModule } from 'app/shared/shared.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioDetailComponent } from './usuario-detail.component';
import { UsuarioUpdateComponent } from './usuario-update.component';
import { UsuarioDeletePopupComponent, UsuarioDeleteDialogComponent } from './usuario-delete-dialog.component';
import { usuarioRoute, usuarioPopupRoute } from './usuario.route';

const ENTITY_STATES = [...usuarioRoute, ...usuarioPopupRoute];

@NgModule({
  imports: [AaaaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UsuarioComponent,
    UsuarioDetailComponent,
    UsuarioUpdateComponent,
    UsuarioDeleteDialogComponent,
    UsuarioDeletePopupComponent
  ],
  entryComponents: [UsuarioDeleteDialogComponent]
})
export class AaaaUsuarioModule {}
