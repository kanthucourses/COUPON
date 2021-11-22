import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestType } from '../models/requestType';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

 
  constructor(private http: HttpClient) { }

  Execute<T>(requestType: RequestType, relativeURL: string, data: any, headers?: HttpHeaders): Observable<T> {
    switch (requestType) {
      case RequestType.GET:
        return this.http.get<T>(relativeURL);
      case RequestType.POST:
        return this.http.post<T>(relativeURL, data, { headers });
      case RequestType.PUT:
        return this.http.put<T>(relativeURL, data, { headers });
      case RequestType.DELETE:
        return this.http.delete<T>(relativeURL);
    }
  }
}
