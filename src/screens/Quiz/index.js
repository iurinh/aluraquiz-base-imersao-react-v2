import React from 'react';

// import db from '../../../db.json';
import AlternativesForm from '../../components/AlternativeForm';
import BackLinkArrow from '../../components/BackLinkArrow';
import Button from '../../components/Button';
import GitHubCorner from '../../components/GitHubCorner';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import Widget from '../../components/Widget';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        <h1>
          Carregando...
        </h1>
      </Widget.Header>
      <Widget.Content>
        <p>
          {`Voce acertou
          ${results.filter((result) => !!result).length}
          perguntas`}
        </p>
        <ul>
          {results.map((result, i) => (
            <li key={`result__${result}`}>
              {`#0${i + 1} Resultado:`}
              {result ? 'Acertou' : 'Errou'}
            </li>
          ))}

        </ul>
      </Widget.Content>
    </Widget>
  );
}

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

function QuestionWidget({
  question, pos, total, onSubmit, addResult,
}) {
  const [selected, setSelected] = React.useState();
  const questionName = `question__${pos}`;
  const isCorreto = selected === question.answer;
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const hasAlternativeSelected = selected !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorreto);
              setIsQuestionSubmited(false);
              setSelected();
              onSubmit();
            }, 3000);
          }}
        >

          {question.alternatives.map((alt, index) => {
            const id = `alternativa__${index}`;
            const alternativeStatus = isCorreto ? 'SUCCESS' : 'ERROR';
            const isSelected = selected === index;

            return (
              <Widget.Topic
                as="label"
                key={id}
                htmlFor={id}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={id}
                  type="radio"
                  name={questionName}
                  onChange={() => setSelected(index)}
                />
                {alt}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorreto && <p>Você acertou</p>}
          {isQuestionSubmited && !isCorreto && <p>Você errou</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const states = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [pos, setPos] = React.useState(0);
  const total = externalQuestions.length;
  const question = externalQuestions[pos];

  const [state, setScreenState] = React.useState(states.LOADING);

  const [results, setResults] = React.useState([]);

  const bg = externalBg;

  React.useEffect(() => setTimeout(() => setScreenState(states.QUIZ), 1000), []);

  function addResult(result) {
    setResults([...results, result]);
  }

  function handleSubmit() {
    const next = pos + 1;

    if (next < total) setPos(next);
    else setScreenState(states.RESULT);
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />

        {state === states.QUIZ
          && (
            <QuestionWidget
              question={question}
              pos={pos}
              total={total}
              onSubmit={handleSubmit}
              addResult={addResult}
            />
          )}

        {state === states.LOADING && <LoadingWidget />}

        {state === states.RESULT && <ResultWidget results={results} />}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/iurinh" />
    </QuizBackground>
  );
}
