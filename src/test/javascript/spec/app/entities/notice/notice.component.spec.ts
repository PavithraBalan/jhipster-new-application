import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterNewApplicationTestModule } from '../../../test.module';
import { NoticeComponent } from 'app/entities/notice/notice.component';
import { NoticeService } from 'app/entities/notice/notice.service';
import { Notice } from 'app/shared/model/notice.model';

describe('Component Tests', () => {
  describe('Notice Management Component', () => {
    let comp: NoticeComponent;
    let fixture: ComponentFixture<NoticeComponent>;
    let service: NoticeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterNewApplicationTestModule],
        declarations: [NoticeComponent],
      })
        .overrideTemplate(NoticeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NoticeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NoticeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Notice(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.notices && comp.notices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
