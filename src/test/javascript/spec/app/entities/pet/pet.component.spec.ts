import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterNewApplicationTestModule } from '../../../test.module';
import { PetComponent } from 'app/entities/pet/pet.component';
import { PetService } from 'app/entities/pet/pet.service';
import { Pet } from 'app/shared/model/pet.model';

describe('Component Tests', () => {
  describe('Pet Management Component', () => {
    let comp: PetComponent;
    let fixture: ComponentFixture<PetComponent>;
    let service: PetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterNewApplicationTestModule],
        declarations: [PetComponent],
      })
        .overrideTemplate(PetComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PetComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PetService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Pet(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pets && comp.pets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
