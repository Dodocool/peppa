const questions = [
    {
        question: "En quelle année à été crée Peppa Pig",
        optionA: "2004",
        optionB: "2005",
        optionC: "2003",
        optionD: "2001",
        correctOption: "optionA"
    },

    {
        question: "Par qui a été créé Peppa Pig ",
        optionA: "Neville Astley et Mark Baker",
        optionB: "Steven Spielberg et Mark Zuckerberg",
        optionC: "Neville Baker et Mark Astley",
        optionD: "Personne, le dessin animé est une autobiographie de Peppa",
        correctOption: "optionA"
    },

    {
        question: "Comment s'appelle le doudou de Peppa ?",
        optionA: "Donald Trump",
        optionB: "Teddy",
        optionC: "Jérémy",
        optionD: "Doudou",
        correctOption: "optionB"
    },

    {
        question: "Comment s'appelle le doudou de George ?",
        optionA: "Teddy",
        optionB: "Jean",
        optionC: "Monsieur Dinosaure",
        optionD: "Mister Dinosaure",
        correctOption: "optionC"
    },

    {
        question: "Quel métier exerce le père de Peppa ?",
        optionA: "Boucher",
        optionB: "Ingénieur",
        optionC: "Chasseur",
        optionD: "Architecte",
        correctOption: "optionD"
    },

    {
        question: "Qui est la meilleure amie de Peppa",
        optionA: "Suzy Dog",
        optionB: "Suzy Rabbit",
        optionC: "Suzy Sheep",
        optionD: "Jean Dujardin",
        correctOption: "optionC"
    },

    {
        question: "Qui est le meilleur ami de George",
        optionA: "Danny Dog",
        optionB: "Richard Rabbit",
        optionC: "Richard Sheep",
        optionD: "Tom Cruise",
        correctOption: "optionB"
    },

    {
        question: "Que fait la mère de Peppa comme métier",
        optionA: "Elle joue sur son ordinateur",
        optionB: "Elle travaille sur son ordinateur",
        optionC: "Elle est babysitter",
        optionD: "Elle est bouchère",
        correctOption: "optionB"
    },

    {
        question: "Combien d'épisodes de Peppa Pig y a t'il en tout ?",
        optionA: "400",
        optionB: "200",
        optionC: "6 saisons",
        optionD: "300",
        correctOption: "optionD"
    },

    {
        question: "Quel type de fleur va devenir gigantesque dans l'episode des fleurs géantes?",
        optionA: "Tournesol",
        optionB: "Coquelicot",
        optionC: "Rose",
        optionD: "John Cena",
        correctOption: "optionA"
    },

    {
        question: "Quel âge a désormais peppa pig dans la vraie vie ?",
        optionA: "64 ans",
        optionB: "12 ans",
        optionC: "6 ans",
        optionD: "23 ans",
        correctOption: "optionD"
    },

    {
        question: "Quel est l'une des activités préférées de Peppa ?",
        optionA: "Manger du bacon",
        optionB: "Sauter sur de la terre",
        optionC: "Sauter dans la boue",
        optionD: "Se recueillir dans des boucheries",
        correctOption: "optionC"
    },


]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Tu ne connais pas Peppa Pig"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Très moyen, il faudrait regarder au moins 10 épisodes..."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Bravo, tu es un as"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}