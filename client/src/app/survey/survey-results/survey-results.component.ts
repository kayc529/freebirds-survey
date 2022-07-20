import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Survey } from 'src/app/models/survey.model';
import { SurveyRepository } from 'src/app/models/survey.repository';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css'],
})
export class SurveyResultsComponent implements OnInit {
  title: string;
  private surveyId: string = '';

  constructor(
    private route: ActivatedRoute,
    private repository: SurveyRepository
  ) {
    this.title = this.route.snapshot.data['title'];
    //get surveyId from URL
    this.route.params.subscribe((params: Params) => {
      this.surveyId = params['id'];
      console.log('surveyId: ', this.surveyId);
    });
  }

  get survey(): Survey | undefined {
    return this.repository.getSurvey(this.surveyId);
  }

  ngOnInit(): void {}
}
