import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AaaaTestModule } from '../../../test.module';
import { UsuarioDetailComponent } from 'app/entities/usuario/usuario-detail.component';
import { Usuario } from 'app/shared/model/usuario.model';

describe('Component Tests', () => {
  describe('Usuario Management Detail Component', () => {
    let comp: UsuarioDetailComponent;
    let fixture: ComponentFixture<UsuarioDetailComponent>;
    const route = ({ data: of({ usuario: new Usuario(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AaaaTestModule],
        declarations: [UsuarioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UsuarioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UsuarioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.usuario).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
