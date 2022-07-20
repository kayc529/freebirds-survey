import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Survey } from 'src/app/models/survey.model';
import { SurveyRepository } from 'src/app/models/survey.repository';

@Component({
  selector: 'app-do-survey',
  templateUrl: './do-survey.component.html',
  styleUrls: ['./do-survey.component.css'],
})
export class DoSurveyComponent implements OnInit {
  //testing survey as string
  private surveyId: string = '';

  constructor(
    private route: ActivatedRoute,
    private repository: SurveyRepository
  ) {
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

  submitSurveyResponse(): void {
    //index of the current question
    let questionIndex = 0;
    //all the answers of this survey
    let answers = [];

    //loop through all the questions
    while (true) {
      //get all the answer elements of the current question
      let answerElements = document.getElementsByClassName(questionIndex + '');

      console.log(answerElements);

      //no answer elements = no such question, end loop
      if (answerElements.length === 0) {
        break;
      }
      //get the question types
      const questionType = answerElements[0].classList.value.split(' ')[1];

      console.log('questionType: ', questionType);

      //get the answers depending on the question type
      switch (questionType) {
        case 'TEXT':
          answers.push((<HTMLInputElement>answerElements[0]).value);
          break;
        case 'T_F':
          //check if true is selected
          answers.push((<HTMLInputElement>answerElements[0]).checked);
          break;
        case 'OPTIONS':
          //get the value of the selected radio button
          for (let i = 0; i < answerElements.length; i++) {
            if ((<HTMLInputElement>answerElements[i]).checked) {
              answers.push((<HTMLInputElement>answerElements[i]).value);
            }
          }
          break;
        case 'CHECKBOX':
          let checked = '';
          //put all the selected option values into a string
          for (let i = 0; i < answerElements.length; i++) {
            if ((<HTMLInputElement>answerElements[i]).checked) {
              checked += `${(<HTMLInputElement>answerElements[i]).value} `;
            }
          }
          answers.push(checked);
          break;
        default:
          //if cannot get the question type, add blank answer to prevent shifting of answers
          answers.push('');
          break;
      }

      //to the next question
      questionIndex++;
    }

    //get surveyId from URL
    const data = { surveyId: this.surveyId, answers };
    console.log(data);
  }
}
