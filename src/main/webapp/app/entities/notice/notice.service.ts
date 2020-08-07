import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INotice } from 'app/shared/model/notice.model';

type EntityResponseType = HttpResponse<INotice>;
type EntityArrayResponseType = HttpResponse<INotice[]>;

@Injectable({ providedIn: 'root' })
export class NoticeService {
  public resourceUrl = SERVER_API_URL + 'api/notices';

  constructor(protected http: HttpClient) {}

  create(notice: INotice): Observable<EntityResponseType> {
    return this.http.post<INotice>(this.resourceUrl, notice, { observe: 'response' });
  }

  update(notice: INotice): Observable<EntityResponseType> {
    return this.http.put<INotice>(this.resourceUrl, notice, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INotice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INotice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
