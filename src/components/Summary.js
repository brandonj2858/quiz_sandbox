import React, { useEffect, useState } from 'react';
import quizzes from '../data/quizzes';
import messages, { getMessage } from '../data/messages.js';

const Summary = (props) => {
  return (
    <div>
      You got <strong>{props.score}</strong> of{' '}
      <strong>{props.testLength}</strong> questions right.
      <br />
      <br />
      {getMessage()}
      <br />
      <br />
      This was attempt number <strong>{props.count}</strong>.
      <br />
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
