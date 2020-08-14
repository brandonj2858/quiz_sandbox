import React, { useEffect, useState } from 'react';
import quizzes from '../data/quizzes';
import messages, { getMessage } from '../data/messages.js';

const Summary = (props) => {
  return (
    <div>
      You Scored <strong>{props.score}</strong> of{' '}
      <strong>{props.testLength}</strong> questions right.
      <br />
      You've Taken this quiz {props.count} times.
      <br />
      {getMessage()}
      <br />
      <div className="button-container">
        <div onClick={props.nextTest} className="next-test">
          Next{' '}
        </div>

        <div className="retake-div" onClick={props.retake}>
          Retake
        </div>
      </div>
    </div>
  );
};

export default Summary;
