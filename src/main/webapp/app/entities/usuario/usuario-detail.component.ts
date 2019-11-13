import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuario } from 'app/shared/model/usuario.model';

@Component({
  selector: 'jhi-usuario-detail',
  templateUrl: './usuario-detail.component.html'
})
export class UsuarioDetailComponent implements OnInit {
  usuario: IUsuario;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ usuario }) => {
      this.usuario = usuario;
    });
  }

  previousState() {
    window.history.back();
  }
}
