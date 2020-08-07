import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterNewApplicationTestModule } from '../../../test.module';
import { NoticeDetailComponent } from 'app/entities/notice/notice-detail.component';
import { Notice } from 'app/shared/model/notice.model';

describe('Component Tests', () => {
  describe('Notice Management Detail Component', () => {
    let comp: NoticeDetailComponent;
    let fixture: ComponentFixture<NoticeDetailComponent>;
    const route = ({ data: of({ notice: new Notice(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterNewApplicationTestModule],
        declarations: [NoticeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NoticeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NoticeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load notice on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.notice).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
