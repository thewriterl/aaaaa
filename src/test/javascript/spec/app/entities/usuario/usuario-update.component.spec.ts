import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AaaaTestModule } from '../../../test.module';
import { UsuarioUpdateComponent } from 'app/entities/usuario/usuario-update.component';
import { UsuarioService } from 'app/entities/usuario/usuario.service';
import { Usuario } from 'app/shared/model/usuario.model';

describe('Component Tests', () => {
  describe('Usuario Management Update Component', () => {
    let comp: UsuarioUpdateComponent;
    let fixture: ComponentFixture<UsuarioUpdateComponent>;
    let service: UsuarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AaaaTestModule],
        declarations: [UsuarioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UsuarioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UsuarioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UsuarioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Usuario(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Usuario();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
