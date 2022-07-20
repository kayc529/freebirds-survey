import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-do-survey',
  templateUrl: './do-survey.component.html',
  styleUrls: ['./do-survey.component.css'],
})
export class DoSurveyComponent implements OnInit {
  //testing survey as string
  survey: string;
  private surveyId: string = '';

  constructor(private route: ActivatedRoute) {
    this.survey = 'Do Your Survey!!!';

    //get surveyId from URL
    this.route.params.subscribe((params: Params) => {
      this.surveyId = params['id'];
      console.log('surveyId: ', this.surveyId);
    });
  }

  ngOnInit(): void {}

  submitSurveyResponse(): void {}
}
