import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'jhi-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit, OnDestroy {
  usuarios: IUsuario[];
  eventSubscriber: Subscription;

  constructor(protected usuarioService: UsuarioService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.usuarioService.query().subscribe((res: HttpResponse<IUsuario[]>) => {
      this.usuarios = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInUsuarios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUsuario) {
    return item.id;
  }

  registerChangeInUsuarios() {
    this.eventSubscriber = this.eventManager.subscribe('usuarioListModification', () => this.loadAll());
  }
}
