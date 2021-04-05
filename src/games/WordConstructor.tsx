import React, { useEffect, useRef, useState } from 'react';
import { Game } from './game';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

interface IWord {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: string;
  id: string;
  image: string;
  page: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

interface IGame {
  data: Word[];
  // backToMenu: () => void;
}

interface Word {
  word: string;
  translateWord: string;
}

const wordsData = [
  { word: 'map', translateWord: 'карта', id: '1' },
  { word: 'away', translateWord: 'далеко', id: '5' },
  { word: 'juice', translateWord: 'сок', id: '2' },
  { word: 'car', translateWord: 'машина', id: '3' },
  { word: 'red', translateWord: 'красный', id: '4' },
];

// const getWords = async (complexity: number) => {
//   const url = `https://react-learnwords-example.herokuapp.com/words?group=${complexity}&page=1`;
//   const response = await fetch(url);
//   const parsedResponse: IWord[] = await response.json();
//   return parsedResponse;
// };

const WordConstructor = () => {
  const handle = useFullScreenHandle();
  const [isFullscreen, SetIsFullscreen] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([] as string[]);
  const correctAnswer = useRef([] as string[]);
  const inCorrectAnswer = useRef([] as string[]);
  const [inCorrectAnswers, setInCorrectAnswers] = useState([] as string[]);

  const stats = {
    correctAnswers: correctAnswer.current,
    inCorrectAnswers: inCorrectAnswer.current,
  };

  useEffect(() => {
    isFullscreen ? handle.enter() : handle.exit();
  }, [isFullscreen]);

  const backToMenu = () => {
    setIsGame(false);
  };

  const handleCorrectAnswer = (id: string) => {
    correctAnswer.current = [...correctAnswer.current, id];
    console.log(stats);
  };
  const handleInCorrectAnswer = (id: string) => {
    inCorrectAnswer.current = [...inCorrectAnswer.current, id];
  };
  //

  const startGame = () => {
    setIsGame(true);
    // const data = getWords(1).then((response) => {
    //   const arr: any = response.map(
    //     (item: { word: string; wordTranslate: string }) => {
    //       return {
    //         word: item.word,
    //         translateWord: item.wordTranslate,
    //       };
    //     }
    //   );
    //   setWords(arr);
    // });
    //
  };
  console.log(stats);
  useEffect(() => console.log('render'));
  return (
    <FullScreen handle={handle}>
      <div className="game">
        <div className="container">
          <button onClick={() => SetIsFullscreen(!isFullscreen)}>
            {isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          </button>

          {isGame ? (
            <Game
              data={wordsData}
              backToMenu={backToMenu}
              handleCorrectAnswer={handleCorrectAnswer}
              handleInCorrectAnswer={handleInCorrectAnswer}
            />
          ) : (
            <button onClick={startGame}>Start Game</button>
          )}
        </div>
      </div>
    </FullScreen>
  );
};

export { WordConstructor };
