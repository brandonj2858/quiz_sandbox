import ReactDOM from 'react-dom';
import Homepage from './components/Homepage';
import quizzes from './data/quizzes';
import React from 'react';
import './styles.css';

const App = () => {
  return (
    <div className="app">
      <Homepage />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
