import React from 'react';

import db from '../db.json';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h1>
          Carregando...
        </h1>
      </Widget.Header>
      <Widget.Content>
        Loading
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, pos, total, onSubmit }) {
  const questionName = `question__${pos}`;

  return (
    <Widget>
      <Widget.Header>
        <h1>
          {`Pergunta ${pos + 1} de ${total}`}
        </h1>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >

          {question.alternatives.map((alt, index) => (
            <Widget.Topic
              as="label"
              htmlFor={index}
            >
              <input
                style={{ display: 'none' }}
                id={index}
                type="radio"
                name={questionName}
              />
              {alt}
            </Widget.Topic>
          ))}

          <Button type="submit">
            Confirmar
          </Button>

        </form>
      </Widget.Content>
    </Widget>
  );
}

const states = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [pos, setPos] = React.useState(0);
  const total = db.questions.length;
  const question = db.questions[pos];

  const [state, setScreenState] = React.useState(states.LOADING);

  React.useEffect(() => setTimeout(() => setScreenState(states.QUIZ), 1000), []);

  function handleSubmit() {
    const next = pos + 1;

    if (next < total) setPos(pos + 1);
    else setScreenState(states.RESULT);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {state === states.QUIZ
          && (
            <QuestionWidget
              question={question}
              pos={pos}
              total={total}
              onSubmit={handleSubmit}
            />
          )}

        {state === states.LOADING && <LoadingWidget />}

        {state === states.RESULT && <div>Você acertou X questões, parabens!</div>}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/iurinh" />
    </QuizBackground>
  );
}
