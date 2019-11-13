import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIngresso } from 'app/shared/model/ingresso.model';
import { IngressoService } from './ingresso.service';

@Component({
  selector: 'jhi-ingresso-delete-dialog',
  templateUrl: './ingresso-delete-dialog.component.html'
})
export class IngressoDeleteDialogComponent {
  ingresso: IIngresso;

  constructor(protected ingressoService: IngressoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ingressoService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'ingressoListModification',
        content: 'Deleted an ingresso'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ingresso-delete-popup',
  template: ''
})
export class IngressoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ingresso }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(IngressoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ingresso = ingresso;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/ingresso', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/ingresso', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
