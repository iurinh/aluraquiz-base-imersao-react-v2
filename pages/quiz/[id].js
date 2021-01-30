import React from 'react';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  // console.log('Info', context.query.id);
  const [usuario, projeto] = context.query.id.split('___');

  const dbExterno = await fetch(`https://${projeto}.${usuario}.vercel.app/api/db`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
      throw new Error('Falha em pegar os dados');
    })
    .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
    .catch((err) => {
      console.error(err);
    });

  // console.log('dbExterno', dbExterno);

  return {
    props: {
      dbExterno,
    }, // will be passed to the page component as props
  };
}
