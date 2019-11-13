import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingresso } from 'app/shared/model/ingresso.model';
import { IngressoService } from './ingresso.service';
import { IngressoComponent } from './ingresso.component';
import { IngressoDetailComponent } from './ingresso-detail.component';
import { IngressoUpdateComponent } from './ingresso-update.component';
import { IngressoDeletePopupComponent } from './ingresso-delete-dialog.component';
import { IIngresso } from 'app/shared/model/ingresso.model';

@Injectable({ providedIn: 'root' })
export class IngressoResolve implements Resolve<IIngresso> {
  constructor(private service: IngressoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIngresso> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((ingresso: HttpResponse<Ingresso>) => ingresso.body));
    }
    return of(new Ingresso());
  }
}

export const ingressoRoute: Routes = [
  {
    path: '',
    component: IngressoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Ingressos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: IngressoDetailComponent,
    resolve: {
      ingresso: IngressoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ingressos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: IngressoUpdateComponent,
    resolve: {
      ingresso: IngressoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ingressos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: IngressoUpdateComponent,
    resolve: {
      ingresso: IngressoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ingressos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ingressoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: IngressoDeletePopupComponent,
    resolve: {
      ingresso: IngressoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ingressos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
