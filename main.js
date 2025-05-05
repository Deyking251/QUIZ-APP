const questions = [
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            {text:"Vatican City",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"Sri Lanka",correct:false},
        ]
    },
    {
        question:"Which is the largest desert in the world?",
        answers:[
            {text:"Kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Sahara",correct:false},
            {text:"Antarctica",correct:true},
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers:[
            {text:"Asia",correct:false},
            {text:"Australia or Oceania",correct:true},
            {text:"Arctic",correct:false},
            {text:"Africa",correct:false},
        ]
    },
    {

        question:"Which is the largest ocean in the world?",
        answers:[
            {text:"Atlantic",correct:false},
            {text:"Indian",correct:false},
            {text:"Arctic",correct:false},
            {text:"Pacific",correct:true},
        ]
    },
    {
        question:"Which is the largest continent in the world?",
        answers:[
            {text:"Asia",correct:true},
            {text:"Africa",correct:false},
            {text:"North America",correct:false},
            {text:"South America",correct:false},
        ]
    },
    {
        question:"Which is the largest country in the world?",
        answers:[
            {text:"USA",correct:false},
            {text:"China",correct:false},
            {text:"Russia",correct:true},
            {text:"India",correct:false},
        ]
    },
    {
        question:"Which is the largest planet in the solar system?",
        answers:[
            {text:"Earth",correct:false},
            {text:"Mars",correct:false},
            {text:"Jupiter",correct:true},
            {text:"Saturn",correct:false},
        ]
    },
    {
        question:"Which is the largest land animal in the world?",
        answers:[
            {text:"Elephant",correct:true},
            {text:"Giraffe",correct:false},
            {text:"Hippopotamus",correct:false},
            {text:"Rhinoceros",correct:false},
        ]
    },
    {
        question:"Which is the largest bird in the world?",
        answers:[
            {text:"Ostrich",correct:true},
            {text:"Eagle",correct:false},
            {text:"Penguin",correct:false},
            {text:"Flamingo",correct:false},
        ]
    }
    
];

const question_element = document.getElementById("question");
const answer_buttons = document.getElementById("answer-buttons");
const next_button = document.getElementById("next-btn");

let current_question_index = 0;
let score = 0;

const showQuestion = () => {
    resetState();
    let current_question = questions[current_question_index];
    let question_no = current_question_index + 1;
    question_element.innerHTML = question_no + ". "+ current_question.question;

    const shuffledAnswers = current_question.answers
        .map(answer => ({ ...answer })) 
        .sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn", "btn-outline-primary", "btn-option");
        answer_buttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

const resetState =  () => {
    next_button.style.display = "none";
    while(answer_buttons.firstChild){
        answer_buttons.removeChild(answer_buttons.firstChild);
    }
}
const startQuiz = () => {
    current_question_index = 0;
    score = 0;
    next_button.innerHTML = "Next";
    showQuestion();
}

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answer_buttons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
            
        }
        button.disabled = true;
        next_button.style.display = "block";
    });
}
next_button.addEventListener("click", ()=>{
    if(current_question_index < questions.length)
    {
        handleNextButton();
    }else{
        startQuiz();
    }
})
const handleNextButton= () => {
    current_question_index++;
    if(current_question_index < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
const showScore = () => {
    resetState();
    question_element.innerHTML = ` Your scored ${score} out of the ${questions.length}!`;
    next_button.innerHTML = "Play Again";
    next_button.style.display = "block";
}
startQuiz();