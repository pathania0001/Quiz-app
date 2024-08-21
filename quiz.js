
import { STORE as store } from './store.js';

let topicstoReview = []; //topic with which user is not very friendly
let throughint = false;//this is used when any option is not clicked, now inside the if block it itself allow to make random numbers for further next questions 
let correctionNeeded = 0;//number of answers which are wrong and not clicked
let questionField = document.querySelector(".quizz-question");
let options = document.querySelectorAll(".option");
let codeSpace = document.querySelector(".code_container");
let continueButton = document.querySelector(".Continue");
let keyTopic = Object.keys(store.questions);
let topicQuestionIndex = Math.floor(Math.random() * 5);
let keyTopicIndex = Math.floor(Math.random() * 10);
let tracking = document.querySelectorAll(".numbers");// track of number of question which are attampted by user
let count = 0;
let isClicked = false;
let isCheched = false;
let counterdec = document.querySelector(".clock");
 //counter for 8 seconds
let counterDecrement = function() {
    let counter = 8;
    counterdec.innerHTML = counter;

    let interval = setInterval(() => {
        counter--;
        if (!isClicked && counter > 0) {
            counterdec.innerHTML = counter;
        } else {
           clearInterval(interval);
            if (!isClicked) {
              tracking[count - 1].style.backgroundColor = "#ffff00a6";
              if (!topicstoReview.includes(keyTopic[keyTopicIndex]))
                topicstoReview.push(keyTopic[keyTopicIndex]);
              correctionNeeded++;
                verifyQuestion({ target: null });
                throughint=true;
                continueButton.click(); 
            }
        }
    }, 1000);
    return;
}
// this  continueButtonPreWork function is used reset all the quiz content stuff after click on continueButton for next question 
const continueButtonPreWork = function(button) {
    questionField.innerHTML = "";
    options.forEach((option, index) => {
        option.innerHTML = "";
        option.style.backgroundColor = "transparent";
    });
    button.disabled = true;
    isCheched = false;
    options.forEach(opt => {
        opt.classList.remove('disabled');
    });
    codeSpace.innerHTML = "";
    console.log(topicstoReview);
    if (count == 10) {
        localStorage.setItem('topics', JSON.stringify(topicstoReview));
        localStorage.setItem('correctionNeeded', JSON.stringify(correctionNeeded));
        window.location.pathname = "/multi_links_window/result_page.html";
    }
    keyTopicIndex = Math.floor(Math.random() * 10);
    topicQuestionIndex = Math.floor(Math.random() * 5);
}

const displayQuizContent = function(button) {

    if (isCheched)
        continueButtonPreWork(button);
    count++;

    button.style.backgroundColor = "#176a1780";
    if(throughint)
    {
      if (count == 11) {
        localStorage.setItem('topics', JSON.stringify(topicstoReview));
        localStorage.setItem('correctionNeeded', JSON.stringify(correctionNeeded));
        window.location.pathname = "/multi_links_window/result_page.html";
        return
    }
      throughint=false;
      keyTopicIndex = Math.floor(Math.random() * 10);
      topicQuestionIndex = Math.floor(Math.random() * 5);
    }
    let topic = keyTopic[keyTopicIndex];
    let questionContent = store.questions[topic][topicQuestionIndex];
    questionField.innerHTML = questionContent.question;
    options.forEach((option, index) => {
        option.innerHTML = questionContent.answers[index];
    });
    let code = questionContent.code;
    if (code.length > 0)
        codeSpace.innerHTML = `<pre><code>${code}</code></pre>`;

    counterDecrement();
   
}
//verifiacation function used when one option is click and now want to check wether it is right or wrong
const verifyQuestion = function(option) {
    isClicked = true;
    if (option.target == null) 
    {
      continueButton.disabled=false;
      return ;
    }
        let selectedOption = option.target.innerHTML;
        let correctAnswer = store.questions[keyTopic[keyTopicIndex]][topicQuestionIndex].correctAnswer;

        if (selectedOption != correctAnswer) {
            option.target.style.backgroundColor = "#ee0c0cc9";  //red color on option which is selected and not correct as well
            tracking[count - 1].style.backgroundColor = "#ee0c0cc9";

            correctionNeeded++;
            if (!topicstoReview.includes(keyTopic[keyTopicIndex]))
                topicstoReview.push(keyTopic[keyTopicIndex]); //making track topics, with which user is not familiar or having weak confidance
            // console.log(topicstoReview);
            options.forEach((option) => {
                if (option.innerHTML === correctAnswer)
                    option.style.backgroundColor = "#419e45";  //making correct option green when wrong option is already selected
            });

        } else {
            option.target.style.backgroundColor = "#419e45";
            tracking[count - 1].style.backgroundColor = "green";  
        }

        options.forEach(opt => {
            opt.classList.add('disabled');// all buttons are disabled beacuse after click on one option other options must not clickable 
        });
        isCheched = true;//for making sure that option is clicked now proceed for the next by clicking on continue buttton
        continueButton.disabled = false;//making sure that all functiion through the continue button are ready to access
        continueButton.style.backgroundColor = "#176a17dc"; //background color of continue button after click on the options
    }


// Event listeners for options
options.forEach(option => {
    option.addEventListener("mouseenter", () => {
        option.style.backgroundColor = "#f4ebeb33";
    });

    option.addEventListener("click", (event) => verifyQuestion(event));

    option.addEventListener("mouseleave", () => {
        if (!isCheched)
            option.style.backgroundColor = "transparent";
    });
});

// Initial setup
displayQuizContent(continueButton);

continueButton.addEventListener("click", (event) => {
    isClicked = false;//for next step making sure any option is not clicked

    displayQuizContent(event.target);
});

