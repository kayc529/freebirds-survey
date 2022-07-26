import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './survey.model';
import { SurveyResponse } from './surveyResponse.model';

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

  addSurvey(survey: Survey): Observable<any> {
    const url = this.baseUrl + '/api/v1/surveys/add';
    return this.http.post<Survey>(url, survey);
  }

  updateSurvey(survey: Survey): Observable<any> {
    const url = this.baseUrl + '/api/v1/surveys/edit/' + survey._id;
    return this.http.post<Survey>(url, survey);
  }

  deleteSurvey(surveyId: string): Observable<any> {
    const url = this.baseUrl + '/api/v1/surveys/delete/' + surveyId;
    return this.http.delete(url);
  }

  addSurveyResponse(response: SurveyResponse): Observable<any> {
    const url = this.baseUrl + '/api/v1/surveys/do-survey/' + response.surveyId;
    return this.http.post(url, response);
  }
}
