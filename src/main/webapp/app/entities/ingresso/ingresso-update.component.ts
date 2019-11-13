import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IIngresso, Ingresso } from 'app/shared/model/ingresso.model';
import { IngressoService } from './ingresso.service';

@Component({
  selector: 'jhi-ingresso-update',
  templateUrl: './ingresso-update.component.html'
})
export class IngressoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    codigoReferencia: []
  });

  constructor(protected ingressoService: IngressoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ingresso }) => {
      this.updateForm(ingresso);
    });
  }

  updateForm(ingresso: IIngresso) {
    this.editForm.patchValue({
      id: ingresso.id,
      codigoReferencia: ingresso.codigoReferencia
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ingresso = this.createFromForm();
    if (ingresso.id !== undefined) {
      this.subscribeToSaveResponse(this.ingressoService.update(ingresso));
    } else {
      this.subscribeToSaveResponse(this.ingressoService.create(ingresso));
    }
  }

  private createFromForm(): IIngresso {
    return {
      ...new Ingresso(),
      id: this.editForm.get(['id']).value,
      codigoReferencia: this.editForm.get(['codigoReferencia']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIngresso>>) {
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
