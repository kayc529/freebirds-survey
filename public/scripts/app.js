// IIFE -- Immediately Invoked Function Expression
(function () {
  function Start() {
    console.log('App Started...');
  }

  window.addEventListener('load', Start);
})();

//Add a question to the survey
function addQuestion() {
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
  newSurveyForm.appendChild(questionContainer);
}

//post new survey data to the server
const addNewSurvey = () => {
  const title = document.getElementById('title')?.value || '';

  //check if the title is blank
  if (!title) {
    alert('Please enter a title');
    return;
  }

  const description = document.getElementById('description')?.value || '';
  const questionInputs = document.getElementsByClassName('question');
  const typeSelects = document.getElementsByClassName('type');
  let questions = [];

  //check if any question is blank
  //loop to create an array of question object
  for (let i = 0; i < questionInputs.length; i++) {
    let question = questionInputs[i].value;
    if (!question) {
      alert('You cannot leave a question blank!');
      return;
    }
    questions.push({ question });
  }

  //loop to add questionType to each question object
  for (let i = 0; i < typeSelects.length; i++) {
    questions[i] = { ...questions[i], questionType: typeSelects[i].value };
  }

  const data = { title, description, questions };
  const url = '/survey/add';

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //post to server
  //return to list when new survey is successfully created
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      window.location.href = '/survey';
    })
    .catch((err) => {
      console.log(err);
      alert('Something went wrong, failed to create survey!');
    });
};

//post updated survey data to the server
function updateSurvey() {
  const title = document.getElementById('title')?.value || '';

  //check if the title is blank
  if (!title) {
    alert('Please enter a title');
    return;
  }

  const description = document.getElementById('description')?.value || '';
  const questionInputs = document.getElementsByClassName('question');
  const typeSelects = document.getElementsByClassName('type');
  let questions = [];

  //check if any question is blank
  //loop to create an array of question object
  for (let i = 0; i < questionInputs.length; i++) {
    let question = questionInputs[i].value;
    if (!question) {
      alert('You cannot leave a question blank!');
      return;
    }
    questions.push({ question });
  }

  //loop to add questionType to each question object
  for (let i = 0; i < typeSelects.length; i++) {
    questions[i] = { ...questions[i], questionType: typeSelects[i].value };
  }

  //get surveyId from URL
  const surveyId = document.URL.substring(document.URL.lastIndexOf('/') + 1);
  const data = { _id: surveyId, title, description, questions };
  const url = `/survey/edit/${surveyId}`;

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //post to server
  //return to list when survey is updated
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      window.location.href = '/survey';
      alert('Survey updated!');
    })
    .catch((err) => {
      console.log(err);
      alert('Something went wrong, failed to create survey!');
    });
}

//post survey response to server
function submitSurveyResponse() {
  //index of the current question
  let questionIndex = 0;
  //all the answers of this survey
  let answers = [];

  //loop through all the questions
  while (true) {
    //get all the answer elements of the current question
    let answerElements = document.getElementsByClassName(questionIndex);

    //no answer elements = no such question, end loop
    if (answerElements.length === 0) {
      break;
    }
    //get the question types
    const questionType = answerElements[0].classList.value.split(' ')[0];

    //get the answers depending on the question type
    switch (questionType) {
      case 'TEXT':
        answers.push(answerElements[0].value);
        break;
      case 'T_F':
        //check if true is selected
        answers.push(answerElements[0].checked);
        break;
      case 'OPTIONS':
        //get the value of the selected radio button
        for (let i = 0; i < answerElements.length; i++) {
          if (answerElements[i].checked) {
            answers.push(answerElements[i].value);
          }
        }
        break;
      case 'CHECKBOX':
        let checked = '';
        //put all the selected option values into a string
        for (let i = 0; i < answerElements.length; i++) {
          if (answerElements[i].checked) {
            checked += `${answerElements[i].value} `;
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
  const surveyId = document.URL.substring(document.URL.lastIndexOf('/') + 1);
  const data = { surveyId, answers };
  const url = `/survey/do-survey/${surveyId}`;

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //post to server
  //return to survey list when response is submitted
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      window.location.href = '/survey';
      alert('Response submitted!');
    })
    .catch((err) => {
      console.log(err);
      alert('Something went wrong, failed to submit response!');
    });
}
