import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterNewApplicationTestModule } from '../../../test.module';
import { OwnerComponent } from 'app/entities/owner/owner.component';
import { OwnerService } from 'app/entities/owner/owner.service';
import { Owner } from 'app/shared/model/owner.model';

describe('Component Tests', () => {
  describe('Owner Management Component', () => {
    let comp: OwnerComponent;
    let fixture: ComponentFixture<OwnerComponent>;
    let service: OwnerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterNewApplicationTestModule],
        declarations: [OwnerComponent],
      })
        .overrideTemplate(OwnerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OwnerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OwnerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Owner(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.owners && comp.owners[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
