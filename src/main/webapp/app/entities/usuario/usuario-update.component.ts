import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IUsuario, Usuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'jhi-usuario-update',
  templateUrl: './usuario-update.component.html'
})
export class UsuarioUpdateComponent implements OnInit {
  isSaving: boolean;
  dataNascimentoDp: any;

  editForm = this.fb.group({
    id: [],
    nome: [],
    dataNascimento: [],
    cpf: [],
    rg: []
  });

  constructor(protected usuarioService: UsuarioService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ usuario }) => {
      this.updateForm(usuario);
    });
  }

  updateForm(usuario: IUsuario) {
    this.editForm.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      dataNascimento: usuario.dataNascimento,
      cpf: usuario.cpf,
      rg: usuario.rg
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const usuario = this.createFromForm();
    if (usuario.id !== undefined) {
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    } else {
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }
  }

  private createFromForm(): IUsuario {
    return {
      ...new Usuario(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      dataNascimento: this.editForm.get(['dataNascimento']).value,
      cpf: this.editForm.get(['cpf']).value,
      rg: this.editForm.get(['rg']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
