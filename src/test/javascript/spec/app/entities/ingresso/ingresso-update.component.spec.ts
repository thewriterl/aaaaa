import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AaaaTestModule } from '../../../test.module';
import { IngressoUpdateComponent } from 'app/entities/ingresso/ingresso-update.component';
import { IngressoService } from 'app/entities/ingresso/ingresso.service';
import { Ingresso } from 'app/shared/model/ingresso.model';

describe('Component Tests', () => {
  describe('Ingresso Management Update Component', () => {
    let comp: IngressoUpdateComponent;
    let fixture: ComponentFixture<IngressoUpdateComponent>;
    let service: IngressoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AaaaTestModule],
        declarations: [IngressoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(IngressoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IngressoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IngressoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ingresso(123);
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
        const entity = new Ingresso();
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
