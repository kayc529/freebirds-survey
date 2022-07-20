import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { Observable, from } from 'rxjs';

@Injectable()
export class StaticDataSource {
  private surveys: Survey[] = dummySurveys;

  getSurveys(): Observable<Survey[]> {
    return from([this.surveys]);
  }
}

const dummySurveys: Survey[] = [
  {
    _id: 's111',
    title: 'First survey',
    description: 'This is my first survey',
    questions: [
      {
        question: 'Question 1',
        questionType: 'CHECKBOX',
      },
      {
        question: 'Question 2',
        questionType: 'OPTIONS',
      },
      {
        question: 'Question 3',
        questionType: 'T_F',
      },
      {
        question: 'Question 4',
        questionType: 'TEXT',
      },
    ],
  },
  {
    _id: 's112',
    title: 'Second survey',
    description: 'This is my second survey',
    questions: [
      {
        question: 'Question 1',
        questionType: 'CHECKBOX',
      },
      {
        question: 'Question 2',
        questionType: 'OPTIONS',
      },
      {
        question: 'Question 3',
        questionType: 'T_F',
      },
      {
        question: 'Question 4',
        questionType: 'TEXT',
      },
    ],
  },
  {
    _id: 's113',
    title: 'Third survey',
    description: 'This is my third survey',
    questions: [
      {
        question: 'Question 1',
        questionType: 'CHECKBOX',
      },
      {
        question: 'Question 2',
        questionType: 'OPTIONS',
      },
      {
        question: 'Question 3',
        questionType: 'T_F',
      },
      {
        question: 'Question 4',
        questionType: 'TEXT',
      },
    ],
  },
];
