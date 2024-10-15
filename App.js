import React, {useState} from 'react';
import './App.css';

function App() {

  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  const question_list = [
    {
      question: "In CSS, which of these values CANNOT be used with the \"position\" property?",
      answers: [
        {
          id: 0,
          text: "static",
          isCorrect: false
        },
        {
          id: 1,
          text: "relative",
          isCorrect: false
        },
        {
          id: 2,
          text: "center",
          isCorrect: true
        },
        {
          id: 3,
          text: "absolute",
          isCorrect: false
        },
      ],
    },
    {
      question: "How long is an IPv6 address?",
      answers: [
        {
          id: 0,
          text: "128 bits",
          isCorrect: true
        },
        {
          id: 1,
          text: "64 bits",
          isCorrect: false
        },
        {
          id: 2,
          text: "128 bytes",
          isCorrect: false
        },
        {
          id: 3,
          text: "32 bits",
          isCorrect: false
        },
      ],
    },
    {
      question: "In the server hosting industry IaaS stands for...?",
      answers: [
        {
          id: 0,
          text: "Infrastructure as a Service",
          isCorrect: true
        },
        {
          id: 1,
          text: "Internet and a Server",
          isCorrect: false
        },
        {
          id: 2,
          text: "Internet as a Service",
          isCorrect: false
        },
        {
          id: 3,
          text: "Infrastructure as a Server",
          isCorrect: false
        },
      ],
    },
  ];

  const retakeQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
    setSelectedAnswer(null);
    setShowNextButton(false);
  }

  const optionClicked = (id,isCorrect) => {
    setSelectedAnswerId(id);
    if ( isCorrect) {
      setScore(score + 1);
    }
    setShowNextButton(true);
  }

    const handleNextQuestion = () => {
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < question_list.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setShowNextButton(false);
      } else {
        setFinalResults(true);
      }
    }
  return (
    <div className="App">
      <h1 class>Check your programming skills with the quiz</h1>


     {showFinalResults ?
     (<div className="final-res">
           <h1>Final Results</h1>
           <h2>
            {score} out of {question_list.length} questions are correct
           </h2>
           <button onClick={() => retakeQuiz()}>Restart Quiz</button>
        </div>
        ) : (
      <div className="ques-card">
          <h1 className="questions">Question {currentQuestion + 1} of {question_list.length}
          </h1>
          <hr />
          <h3 className="question-text">{question_list[currentQuestion].question}</h3>

          <ol>
            {question_list[currentQuestion].answers.map((option) => {
               let answerClass = "";
               
               if (selectedAnswerId !== null) {
                if(option.isCorrect){
                  answerClass = "correct-answer";
                } else if (option.id === selectedAnswerId){
                  answerClass = "wrong-answer";
                }
               }
              
              return (
                <li
                key={option.id}
                onClick={() => optionClicked(option.id,option.isCorrect)}
                className={answerClass}
              >
                {option.text}
                </li>
           );
           })}
          </ol>
          {showNextButton  && (
            <button className="next-btn" onClick={handleNextQuestion}>Next</button>
          )}

          <div className="progress-indicator">
            {question_list.map((_, index) => (
              <span
              key={index}
              className={`progress-circle ${
                index < currentQuestion ? "completed" :
              index === currentQuestion ? "current " : "not-completed"
            }`}
              >
                {index < currentQuestion ? "✔️" : "❌"}
              </span>
            ))}
          </div>
        </div>
        )}
      </div>
  );
}

export default App;
