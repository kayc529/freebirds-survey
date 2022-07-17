// IIFE -- Immediately Invoked Function Expression
(function () {
  function Start() {
    console.log('App Started...');

    let addQuestionButton = document.getElementById('add-question-btn');
    if (addQuestionButton) {
      addQuestionButton.addEventListener('click', () => {
        //get the form element
        //create a div element
        //put question label and select into the div
        //add the div element to the end of the form element
        console.log('hi');
      });
    } else {
      console.log(wtf);
    }
  }

  window.addEventListener('load', Start);
})();
