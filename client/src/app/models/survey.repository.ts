import { Injectable } from '@angular/core';
import { StaticDataSource } from './static.datasource';
import { Survey } from './survey.model';

@Injectable()
export class SurveyRepository {
  private surveys: Survey[] = [];

  constructor(private dataSource: StaticDataSource) {
    dataSource.getSurveys().subscribe((data) => {
      this.surveys = data;
    });
  }

  getSurveys(): Survey[] {
    return this.surveys;
  }

  getSurvey(surveyId: string): Survey | undefined {
    return this.surveys.find((survey) => survey._id === surveyId);
  }
}
