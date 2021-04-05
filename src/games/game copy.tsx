import React, { useEffect, useRef, useState } from 'react';
import './WordConstructor.css';

interface IGame {
  data: Word[];
  backToMenu: () => void;
  handleCorrectAnswer: (id: string) => void;
  handleInCorrectAnswer: (id: string) => void;
}

interface Word {
  word: string;
  translateWord: string;
  id: string;
}

interface ICell {
  value: string;
  key: number;
}

const createCells = (currentWord: Word) => {
  return currentWord.word.split('').map((__, index) => {
    return {
      value: '',
    };
  });
};

const createLetters = (currentWord: Word) => {
  return currentWord.word
    .split('')
    .sort(() => Math.random() - 0.5)
    .map((item, index) => {
      return {
        value: item,
      };
    });
};

const Game: React.FC<IGame> = ({
  data,
  backToMenu,
  handleCorrectAnswer,
  handleInCorrectAnswer,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = data[currentIndex];
  const [timer, setTimer] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);

  const letters = createLetters(currentWord);
  const cells = createCells(currentWord);

  const [answer, _setAnswer] = useState(cells);
  const [cellIndex, _setCellIndex] = useState(0);
  const [currentLetters, _setCurrentLetters] = useState(letters);

  const cellIndexRef = useRef(cellIndex);
  const setCellIndex = (index: number) => {
    cellIndexRef.current = index;
    _setCellIndex(index);
  };

  // =================================
  const answerRef = useRef(answer);
  const setAnswer = (
    prev: { value: string; key: number }[],
    key: { value: string; key: number }
  ) => {
    _setAnswer((prev) => {
      prev[cellIndexRef.current] = key;
      answerRef.current = prev;
      return prev;
    });
  };
  // =================================
  const currentLettersRef = useRef(currentLetters);
  // const setCurrentLetters = (
  //   prev: { value: string; key: number }[]

  // ) => {
  //   currentLettersRef.current = prev;
  //   _setCurrentLetters((prev) => {
  //     return prev.filter((el) => el !== key);
  //   });
  //   console.log(currentLettersRef, currentLetters);
  // };

  // =====================================

  const handleKey = (event: KeyboardEvent) => {
    const key = currentLetters.find((item) => item.value === event.key);

    if (key) {
      // setAnswer(answer, key);

      // _setCurrentLetters((prev) => {
      //   return prev.filter((el) => el !== key);
      // });
      // // setCurrentLetters(currentLetters, key);
      // setCellIndex(cellIndexRef.current + 1);
      addLetter(key);
      console.log(currentLetters, cellIndex, answer);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKey);

    return () => window.removeEventListener('keyup', handleKey);
  }, [currentIndex]);

  const addLetter = (item: { value: string }) => {
    _setAnswer((prev) => {
      prev[cellIndex] = item;
      return prev;
    });
    _setCurrentLetters((prev) => {
      return prev.filter((el) => el !== item);
    });
    console.log(currentLetters, currentLettersRef);

    // setCellIndex(cellIndex + 1);
    _setCellIndex(cellIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer >= 1) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
        setTimeout(() => setIsGameOver(true), 500);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const checkAnswer = () => {
    const _check = answer.map((i) => i.value).join('');
    if (_check === currentWord.word) {
      handleCorrectAnswer(currentWord.id);
      alert('goood');
      console.log(currentWord);
    } else {
      alert('bad');
      handleInCorrectAnswer(currentWord.id);
    }
    if (currentIndex < data.length - 1) {
      nextWord();
    }
  };

  const nextWord = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    reset();
  }, [currentIndex]);
  const reset = () => {
    _setAnswer(cells);
    setCellIndex(0);
    _setCurrentLetters(letters);
  };

  return (
    <>
      {!isGameOver ? (
        <>
          <div className="translate">
            <span>{currentWord.translateWord}</span>
          </div>

          <ul>
            {answer.map((item, index) => {
              return (
                <li className="cell" key={index * Math.random()}>
                  {item.value}
                </li>
              );
            })}
          </ul>

          <ul>
            {currentLetters.map((item, index) => {
              return (
                <li
                  className="letter"
                  onClick={() => addLetter(item)}
                  key={index * Math.random()}
                >
                  {item.value}
                </li>
              );
            })}
          </ul>

          <button onClick={reset}>Reset</button>
          <span>{timer}</span>
          <button onClick={checkAnswer}>Check Answer</button>
        </>
      ) : (
        <div className="game_over">
          <span> GAME OVER</span>
          {/* <span>You score: {score}</span> */}
          <button onClick={backToMenu}>Back to menu</button>
        </div>
      )}
    </>
  );
};

export { Game };
