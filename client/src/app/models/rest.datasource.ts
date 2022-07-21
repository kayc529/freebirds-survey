import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './survey.model';

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable()
export class RestDataSource {
  baseUrl: string;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}`;
    } else {
      this.baseUrl = '';
    }
  }

  getSurveys(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/v1/surveys');
  }

  getSurveyReponses(): Observable<any> {
    return this.http.get<Survey[]>(this.baseUrl + '/api/v1/surveys/results');
  }
}
