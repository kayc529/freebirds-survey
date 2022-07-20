import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css'],
})
export class SurveyListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  deleteSurvey(surveyId: string): void {
    console.log('delete survey ', surveyId);
  }
}
