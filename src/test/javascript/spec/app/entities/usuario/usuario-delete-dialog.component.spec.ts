import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AaaaTestModule } from '../../../test.module';
import { UsuarioDeleteDialogComponent } from 'app/entities/usuario/usuario-delete-dialog.component';
import { UsuarioService } from 'app/entities/usuario/usuario.service';

describe('Component Tests', () => {
  describe('Usuario Management Delete Component', () => {
    let comp: UsuarioDeleteDialogComponent;
    let fixture: ComponentFixture<UsuarioDeleteDialogComponent>;
    let service: UsuarioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AaaaTestModule],
        declarations: [UsuarioDeleteDialogComponent]
      })
        .overrideTemplate(UsuarioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UsuarioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UsuarioService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
