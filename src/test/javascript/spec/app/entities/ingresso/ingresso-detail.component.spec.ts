import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AaaaTestModule } from '../../../test.module';
import { IngressoDetailComponent } from 'app/entities/ingresso/ingresso-detail.component';
import { Ingresso } from 'app/shared/model/ingresso.model';

describe('Component Tests', () => {
  describe('Ingresso Management Detail Component', () => {
    let comp: IngressoDetailComponent;
    let fixture: ComponentFixture<IngressoDetailComponent>;
    const route = ({ data: of({ ingresso: new Ingresso(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AaaaTestModule],
        declarations: [IngressoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(IngressoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IngressoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ingresso).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
