import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
          transition={{ delay: 0, duration: 0.5 }}
        >
          <Widget.Header>
            <h1>Titulo Alura Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(e) => {
              e.preventDefault();
              console.log('SUBMISSAO');

              router.push(`/quiz?name?${name}`);
            }}
            >
              <Input
                name="nomeUsuario"
                placeholder="Coloque seu nome"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Button
                type="submit"
                disabled={!name.length}
              >
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Widget.Content>
            <h1>Quiz</h1>
            {db.external.map((ext) => {
              const [projeto, usuario] = ext.substr(ext.indexOf('//') + 2).split('.');
              return (
                <Widget.Topic as={Link} key={`${usuario}___${projeto}`} href={`/quiz/${usuario}___${projeto}`}>{`${usuario}/${projeto}`}</Widget.Topic>
              );
            })}
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.section}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
          transition={{ delay: 0, duration: 0.5 }}
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/iurinh" />
    </QuizBackground>
  );
}
