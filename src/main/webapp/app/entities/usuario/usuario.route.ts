import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';
import { UsuarioComponent } from './usuario.component';
import { UsuarioDetailComponent } from './usuario-detail.component';
import { UsuarioUpdateComponent } from './usuario-update.component';
import { UsuarioDeletePopupComponent } from './usuario-delete-dialog.component';
import { IUsuario } from 'app/shared/model/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioResolve implements Resolve<IUsuario> {
  constructor(private service: UsuarioService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUsuario> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((usuario: HttpResponse<Usuario>) => usuario.body));
    }
    return of(new Usuario());
  }
}

export const usuarioRoute: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Usuarios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UsuarioDetailComponent,
    resolve: {
      usuario: UsuarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Usuarios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UsuarioUpdateComponent,
    resolve: {
      usuario: UsuarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Usuarios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UsuarioUpdateComponent,
    resolve: {
      usuario: UsuarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Usuarios'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const usuarioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UsuarioDeletePopupComponent,
    resolve: {
      usuario: UsuarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Usuarios'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
