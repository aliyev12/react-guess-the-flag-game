import React from 'react';

const Score = ({correct, wrong, total, countries, allAnswers}) => {
  return (
    <div className="card text-white bg-dark my-5" style={{maxWidth: '18rem'}}>
      <div className="card-header text-center">Score</div>
      <div className="card-body d-flex">
        <div className="p-3 mr-2">
          <h5 className="card-title text-success">Correct</h5>
          <h4 className="card-text text-success text-center">
            <i className="fas fa-check mr-2" />{correct}
          </h4>
        </div>
        <div className="p-3">
          <h5 className="card-title text-danger">Wrong</h5>
          <h4 className="card-text text-danger text-center">
            <i className="fas fa-times mr-2" />{wrong}
          </h4>
        </div>
      </div>
      <div className="card-body pt-0 text-center  border-top border-light pt-3">
        <p>Answered: {total}</p>
        <p>Countries: {countries}</p>
      </div>
      <div
        style={{display: allAnswers.length > 0 ? 'block' : 'none'}}
        className="card-body pt-0 text-center  border-top border-light pt-3"
      >
        <p className="text-light">Past guesses:</p>
        {allAnswers.map (answer => (
          <p
            key={answer.countryName}
            className={answer.guessed ? 'text-success' : 'text-danger'}
          >
            <i
              className={
                answer.guessed ? 'fas fa-check mr-2' : 'fas fa-times mr-2'
              }
            />
            {' '}
            {answer.countryName}
          </p>
        ))}
      </div>
    </div>
  );
};

Score.defaultProps = {
  correct: 0,
  wrong: 0,
  total: 0,
};

export default Score;
