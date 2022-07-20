import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css'],
})
export class AddSurveyComponent implements OnInit {
  title: string;
  constructor(private route: ActivatedRoute) {
    this.title = route.snapshot.data['title'];
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

  addNewSurvey(): void {
    const title =
      (<HTMLInputElement>document.getElementById('title'))?.value || '';

    //check if the title is blank
    if (!title) {
      alert('Please enter a title');
      return;
    }

    const description =
      (<HTMLInputElement>document.getElementById('description'))?.value || '';
    const questionInputs = document.getElementsByClassName('question');
    const typeSelects = document.getElementsByClassName('type');
    let questions = [];

    //check if any question is blank
    //loop to create an array of question object
    for (let i = 0; i < questionInputs.length; i++) {
      let question = (<HTMLInputElement>questionInputs[i]).value;
      if (!question) {
        alert('You cannot leave a question blank!');
        return;
      }
      questions.push({ question });
    }

    //loop to add questionType to each question object
    for (let i = 0; i < typeSelects.length; i++) {
      questions[i] = {
        ...questions[i],
        questionType: (<HTMLInputElement>typeSelects[i]).value,
      };
    }

    const data = { title, description, questions };
    const url = '/survey/add';

    console.log(data);

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    //TODO
    //post to server
    //return to list when new survey is successfully created
    // fetch(url, options)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     window.location.href = '/survey';
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert('Something went wrong, failed to create survey!');
    //   });
  }
}
