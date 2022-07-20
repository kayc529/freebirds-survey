import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyRepository } from 'src/app/models/survey.repository';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css'],
})
export class SurveyListComponent implements OnInit {
  constructor(private repository: SurveyRepository) {}

  ngOnInit(): void {}

  get surveys(): Survey[] {
    let s = this.repository.getSurveys();
    console.log(s);

    return s;
  }

  deleteSurvey(surveyId: string): void {
    console.log('delete survey ', surveyId);
  }
}