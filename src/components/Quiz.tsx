import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is phishing?",
    options: [
      "A type of fish",
      "A cybersecurity attack that uses disguised email as a weapon",
      "A method of encrypting data",
      "A secure way of sending emails"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "What is a strong password?",
    options: [
      "A word found in the dictionary",
      "Your birth date",
      "A combination of upper and lowercase letters, numbers, and symbols",
      "The name of your pet"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    text: "What is two-factor authentication?",
    options: [
      "Logging in twice",
      "Using two different passwords",
      "A security process that requires two different forms of identification",
      "Sharing your password with a friend"
    ],
    correctAnswer: 2
  }
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (selectedOption: number) => {
    setUserAnswers([...userAnswers, selectedOption]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return questions[index].correctAnswer === answer ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <p className="text-lg mb-4">You scored {score} out of {questions.length}!</p>
        <button
          onClick={resetQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cybersecurity Quiz</h2>
      <p className="text-lg mb-4">Question {currentQuestion + 1} of {questions.length}</p>
      <p className="text-lg mb-4">{question.text}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;