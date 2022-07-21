import { Injectable } from '@angular/core';
import { StaticDataSource } from './static.datasource';
import { Survey } from './survey.model';
import { SurveyResponse } from './surveyResponse.model';

@Injectable()
export class SurveyRepository {
  private surveys: Survey[] = [];
  private responses: SurveyResponse[] = [];

  constructor(private dataSource: StaticDataSource) {
    dataSource.getSurveys().subscribe((data) => {
      this.surveys = data;
    });
    dataSource.getSurveyReponses().subscribe((data) => {
      this.responses = data;
    });
  }

  getSurveys(): Survey[] {
    return this.surveys;
  }

  getSurvey(surveyId: string): Survey | undefined {
    return this.surveys.find((survey) => survey._id === surveyId);
  }

  getResponses(surveyId: string): SurveyResponse[] {
    return this.responses.filter((response) => {
      return response.surveyId === surveyId.trim();
    });
  }
}
