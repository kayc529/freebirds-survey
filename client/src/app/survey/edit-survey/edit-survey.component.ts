import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Survey } from 'src/app/models/survey.model';
import { SurveyRepository } from 'src/app/models/survey.repository';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css'],
})
export class EditSurveyComponent implements OnInit {
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

  addQuestion(): void {
    //get the form element
    let newSurveyForm = document.getElementById('new-survey-form');
    //create a div container
    let questionContainer = document.createElement('div');

    //create labels
    let questionLabel = document.createElement('label');
    let typeLabel = document.createElement('label');
    questionLabel.innerHTML = 'Question';
    typeLabel.innerHTML = 'Question Type';

    //create quesiont input field
    let questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.classList.add('question');

    //create select and options
    let typeSelect = document.createElement('select');
    typeSelect.classList.add('type');

    let option1 = document.createElement('option');
    option1.value = 'TEXT';
    option1.text = 'Text';
    typeSelect.add(option1);
    let option2 = document.createElement('option');
    option2.value = 'T_F';
    option2.text = 'True or False';
    typeSelect.add(option2);
    let option3 = document.createElement('option');
    option3.value = 'OPTIONS';
    option3.text = 'Options';
    typeSelect.add(option3);
    let option4 = document.createElement('option');
    option4.value = 'CHECKBOX';
    option4.text = 'Checkbox';
    typeSelect.add(option4);

    //put question label and select into the div
    questionContainer.appendChild(questionLabel);
    questionContainer.appendChild(questionInput);
    questionContainer.appendChild(typeLabel);
    questionContainer.appendChild(typeSelect);

    //add the div element to the end of the form element
    newSurveyForm?.appendChild(questionContainer);
  }

  updateSurvey(): void {}
}
