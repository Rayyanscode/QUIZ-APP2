
alert("Welcome to Quiz App");

let QuizQuestion = [
    {
        question: "Q1:what is the full form of html?",
        a: "hapom text marine language",
        b: "hapom text markup language",
        c: "hyper text markup language",
        d: "hyper text marine language",
        ans: "ans3"
    },
    {
        question: "Q2:what is the full form of JS?",
        a: "Javascript",
        b: "Javasource",
        c: "Javascripting",
        d: "Javascream",
        ans: "ans1"
    },
    {
        question: "Q3:what is the full form of Css?",
        a: "Cascading Source Sheet",
        b: "Cascading style Sheet",
        c: "Casa Source Sheet",
        d: "Casa style Sheet",
        ans: "ans2"
    },
    {
        question: "Q4:what is the full form of HTTP?",
        a: "Hyper text transfer product",
        b: "Hyper text test protocol",
        c: "hey text transfer language",
        d: "Hyper text transfer protocol",
        ans: "ans4"
    },
    {
        question: "Q5:React is a framework of..?",
        a: "JAvascript",
        b: "Python",
        c: "Ruby",
        d: "C#",
        ans: "ans1"
    },
]
let userName = document.getElementById('userName');
let showErr = document.getElementById('showErr')
let validUser = false;
function StartButtonHandler() {

    let reg = /([0-9a-zA-Z])/
    let a = userName.value;
    if (reg.test(a)) {
        console.log("matched")
        userName.classList.add('is-valid')
        userName.classList.remove('is-invalid')
        validUser = true;
        console.log(validUser);
    }
    else {
        console.log("Does not match")
        userName.classList.add('is-invalid')
        validUser = false;
    }

    if (validUser == true) {

        document.getElementById('usernameDiv').style.display = 'none'
        document.getElementById('quizDiv').style.display = 'block'
        document.getElementById('clockdiv').style.display = 'block'
        function getTimeRemaining(endtime) {
            const total = Date.parse(endtime) - Date.parse(new Date());
            const seconds = Math.floor((total / 1000) % 60);
            const minutes = Math.floor((total / 1000 / 60) % 60);

            return {
                total,
                minutes,
                seconds
            };
        }
        function initializeClock(id, endtime) {
            const clock = document.getElementById(id);
            const minutesSpan = clock.querySelector('.minutes');
            const secondsSpan = clock.querySelector('.seconds');

            function updateClock() {
                const t = getTimeRemaining(endtime);

                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                if (t.total <= 0) {
                    if (questionCount < QuizQuestion.length) {
                        showErr.innerHTML = `
                        <div class="card w-100 cardShadow">
                        <div class="card-body">
                        <h5 class="card-title">Better Luck Next time</h5>
                        <p class="card-text">Oooppss.. ${userName.value.toUpperCase()} You Are Failed to pick your quiz in desired time</p>
                        <a href="#" class="btn btn-primary" onclick="location.reload()">Try again</a>
                        </div>
                        </div>`
                        clearInterval(timeinterval);
                        document.getElementById('innerDiv').style.display = 'none'
                        // document.getElementById('clockdiv').style.display = 'none'
                    }
                }
            }

            updateClock();
            const timeinterval = setInterval(updateClock, 1000);
        }

        const deadline = new Date(Date.parse(new Date()) + 10 * 30 * 1000);
        initializeClock('clockdiv', deadline);
    }
}

let question = document.getElementById('question')
let option1 = document.getElementById('option1');
let option2 = document.getElementById('option2');
let option3 = document.getElementById('option3');
let option4 = document.getElementById('option4');
let answers = document.querySelectorAll('.answer')
let submit = document.getElementById('submit');
let showScore = document.getElementById('showScore');

let questionCount = 0;
let score = 0;
let loadQuestion = () => {
    let questionList = QuizQuestion[questionCount]
    question.innerText = questionList.question

    option1.innerText = QuizQuestion[questionCount].a
    option2.innerText = QuizQuestion[questionCount].b
    option3.innerText = QuizQuestion[questionCount].c
    option4.innerText = QuizQuestion[questionCount].d
}
loadQuestion();
const getCheckedAnswer = () => {
    let answer;

    answers.forEach(elem => {
        if (elem.checked) {
            answer = elem.id
            elem.checked = false
        }
    });
    return answer
}
submit.addEventListener("click", () => {
    const CheckedAnswer = getCheckedAnswer();
    console.log(CheckedAnswer);

    if (CheckedAnswer === QuizQuestion[questionCount].ans) {
        score++;
    };
    questionCount++;
    if (questionCount < QuizQuestion.length) {
        loadQuestion();
     }
    //  if (QuizQuestion.length===5) {
    //     showScore.innerHTML = `
    //     <div class="card w-100 cardShadow">
    //     <div class="card-body">
    //       <h5 class="card-title">Your Score:</h5>
    //       <p class="card-text">${userName.value.toUpperCase()} Your Score is <strong>${score} Out of ${QuizQuestion.length}&#128512;<strong></p>
    //       <a href="#" class="btn btn-primary" onclick="location.reload()">Try again</a>
    //     </div>
    //   </div>
    //     `
    //     document.getElementById('clockdiv').style.display = 'none';
    //     submit.style.display = 'none';
    //     showErr.style.display = 'none'
    // }
     else {
        showScore.innerHTML = `
        <div class="card w-100 cardShadow">
        <div class="card-body">
          <h5 class="card-title">Your Score:</h5>
          <p class="card-text">${userName.value.toUpperCase()} Your Score is <strong>${score} Out of ${QuizQuestion.length}&#128512;<strong></p>
          <a href="#" class="btn btn-primary" onclick="location.reload()">Try again</a>
        </div>
      </div>
        `
        document.getElementById('clockdiv').style.display = 'none';
        submit.style.display = 'none';
        showErr.style.display = 'none'
        hide.style.display="none"
    }
})

let startBtn = document.getElementById('startBtn')
startBtn.addEventListener("click", StartButtonHandler)



