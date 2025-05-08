'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import "./Test.css";

interface Answer {
  id: string;
  answer: string;
  flag: boolean;
}

interface Question {
  number: string;
  question: string;
  answers: Answer[];
  img?: string;
}

const TOTAL_QUESTIONS: number = 50;

export default function Test() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [usedIndexes, setUsedIndexes] = useState<Set<number>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    fetch("/questions.json")
      .then(res => res.json())
      .then((data: Question[]) => {
        setQuestions(data);
      });
  }, []);

  const startTest = (): void => {
    if (questions.length === 0) return;
    const index = getRandomIndex();
    setUsedIndexes(new Set([index]));
    setCurrentIndex(index);
    setCurrentQuestion(questions[index]);
    setCorrectCount(0);
    setIncorrectCount(0);
    setSelectedAnswer(null);
  };

  const getRandomIndex = (): number => {
    let index: number;
    do {
      index = Math.floor(Math.random() * questions.length);
    } while (usedIndexes.has(index));
    return index;
  };

  const handleAnswerClick = (id: string): void => {
    if (selectedAnswer) return; // prevent multiple answers
    setSelectedAnswer(id);
    const isCorrect = currentQuestion?.answers.find(a => a.id === id)?.flag;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
    }
  };

  const nextQuestion = (): void => {
    if (usedIndexes.size >= TOTAL_QUESTIONS) return;
    const index = getRandomIndex();
    const newSet = new Set(usedIndexes);
    newSet.add(index);
    setUsedIndexes(newSet);
    setCurrentIndex(index);
    setCurrentQuestion(questions[index]);
    setSelectedAnswer(null);
  };

  return (
    <div className="container">
      <div className="test-panel">
        <div className="panel-title">General Knowledge</div>
        <div className="panel-top">
          <div className="panel-top-left">
            <div className="top-left-total subtitle">
              Total: <span className="total-amount subtitle">{usedIndexes.size}</span>
            </div>
            <div className="top-left-current subtitle">
              <div className="top-left-error subtitle red">Errors: <span className="errors-amount subtitle red">{incorrectCount}</span></div>
              <div className="top-left-correct subtitle green">Correct: <span className="correct-amount subtitle green">{correctCount}</span></div>
            </div>
          </div>
          <div className="panel-top-btn-wrap">
            <button className="top-btn" onClick={startTest}>START TEST</button>
          </div>
        </div>

        {currentQuestion && (
          <div className="panel-content">
            <div className="question-wrap">
              <div className="panel-question">
                <div className="question-number subtitle">{currentQuestion.number}</div>
                <div className="question-body subtitle">{currentQuestion.question}</div>
              </div>
              <ul className="panel-answers">
                {currentQuestion.answers.map((ans) => {
                  const isCorrect = ans.flag;
                  const isSelected = selectedAnswer === ans.id;
                  let className = "panel-answer";
                  if (selectedAnswer) {
                    if (isSelected && isCorrect) className += " correct";
                    else if (isSelected && !isCorrect) className += " incorrect";
                    else if (isCorrect) className += " correct";
                  }
                  return (
                    <li className={className} key={ans.id} onClick={() => handleAnswerClick(ans.id)}>
                      <div className="answer-mark">{ans.id.toUpperCase()}</div>
                      <div className="answer-body">{ans.answer}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            {currentQuestion.img && (
              <div className="answer-img">
                <Image
                  src={currentQuestion.img}
                  alt="Answer illustration"
                  width={400}
                  height={300}
                  layout="responsive"
                />
              </div>
            )}
          </div>
        )}

        {currentQuestion && usedIndexes.size < TOTAL_QUESTIONS && (
          <button className="next" onClick={nextQuestion}>NEXT</button>
        )}

        {usedIndexes.size >= TOTAL_QUESTIONS && (
          <div className={`finale-massage ${incorrectCount >= 10 ? 'red' : 'green'}`}>
            {incorrectCount >= 10 ? 'You failed the test. Try again.' : 'Congratulations, you passed the test!'}
          </div>
        )}
      </div>
    </div>
  );
}