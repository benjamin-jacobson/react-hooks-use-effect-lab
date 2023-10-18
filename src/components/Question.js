import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  function timerFunction(){
    const newTime = timeRemaining - 1
    
    if (newTime >0) {
      setTimeRemaining(newTime)
    } else {
      console.log("out of time")
      setTimeRemaining(10)
      onAnswered(false)
    }

  }

    // this code is without a cleanup function BJJ
  // useEffect(
  //   // 1st arg: side effect (callback function)
  //   () => {
  //     console.log("useffeectBen")
  //     setTimeout(() => timerFunction(), 1000);
  //     // 2nd arg: dependencies array
  //   }
  // );


  useEffect(() => {
    const timerID = setInterval(() => {
      timerFunction();
    }, 1000);

    // returning a cleanup function
    return function cleanup() {
      clearInterval(timerID);
    };
  });



  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
