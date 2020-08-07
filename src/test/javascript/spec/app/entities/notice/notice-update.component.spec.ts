import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterNewApplicationTestModule } from '../../../test.module';
import { NoticeUpdateComponent } from 'app/entities/notice/notice-update.component';
import { NoticeService } from 'app/entities/notice/notice.service';
import { Notice } from 'app/shared/model/notice.model';

describe('Component Tests', () => {
  describe('Notice Management Update Component', () => {
    let comp: NoticeUpdateComponent;
    let fixture: ComponentFixture<NoticeUpdateComponent>;
    let service: NoticeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterNewApplicationTestModule],
        declarations: [NoticeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NoticeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NoticeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NoticeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Notice(123);
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
        const entity = new Notice();
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
