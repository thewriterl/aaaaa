import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AaaaTestModule } from '../../../test.module';
import { UsuarioComponent } from 'app/entities/usuario/usuario.component';
import { UsuarioService } from 'app/entities/usuario/usuario.service';
import { Usuario } from 'app/shared/model/usuario.model';

describe('Component Tests', () => {
  describe('Usuario Management Component', () => {
    let comp: UsuarioComponent;
    let fixture: ComponentFixture<UsuarioComponent>;
    let service: UsuarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AaaaTestModule],
        declarations: [UsuarioComponent],
        providers: []
      })
        .overrideTemplate(UsuarioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UsuarioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UsuarioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Usuario(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.usuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
