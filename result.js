//import {counted} from './quiz.js';
console.log("start");
const topicstoReview = JSON.parse(localStorage.getItem('topics'));
const correctionNeeded = parseInt(localStorage.getItem('correctionNeeded'), 10);
console.log(topicstoReview);
console.log(correctionNeeded);
const   wrongAnswers = Math.floor((correctionNeeded/10)*100);
const  correctAnswer = 100-wrongAnswers;


const result= document.querySelector(".actual_result");
result.innerHTML = `You got ${correctAnswer}% Correct`
if(correctAnswer<=50)
{
    result.style.color="red";
}
else if(correctAnswer===100)
{
    result.style.color="green";
}


let resultmessage = document.querySelector(".result_message");
let messagetopics = document.querySelector(".message_topics");

if (topicstoReview.length > 0) {
    resultmessage.innerHTML = `You may want to study up on the following categories:`;
    topicstoReview.forEach(topic => {
        let topicDiv = document.createElement("div"); // Create a new div for each topic
        topicDiv.className = "topics_style";
        topicDiv.innerHTML = topic;
        console.log(topicDiv);
        messagetopics.appendChild(topicDiv);
    });
} else {
    resultmessage.innerHTML = `You passed this one now check other questions also`;
}
