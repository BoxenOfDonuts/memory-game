import React, { useEffect, useState, useRef } from 'react';
import { useHttp } from '../hooks/http';
import Card from '../Card/Card';
import './Board.css'

type Cards = Readonly<any[]>

interface scoreBoardProps {
  score: number;
  highScore: Number
}
interface gameBoardProps {
  onCardClick: (id: number) => void
  newGameCount: number;
  numberOfCards: number
}

const shuffle = (array: Cards) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const randomArray = (array: Cards, desiredLength: number) => {
  return shuffle(array).slice(0, desiredLength);
};

const Board = () => {
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [clickedCards, setClickedCards] = useState<Cards>([]);
  const [newGameCount, setNewGameCount] = useState<number>(0);
  const numberOfCards: number = 18;
  const prevClickedCards = useRef(clickedCards);

  useEffect(() => {
    prevClickedCards.current = clickedCards;
  });

  useEffect(() => {
    const resetAll = () => {
      if (score > highScore) {
        setHighScore(score);
      }
      setScore(0);
      setClickedCards([]);
    };
    resetAll();
  }, [newGameCount]);

  const handleClick = (id: number) => {
    if (!prevClickedCards.current.includes(id)) {
      setClickedCards((prevState) => [...prevState, id]);
      setScore((prevScore) => prevScore + 1);
    } else {
      console.log('you lose!');
      setNewGameCount((prevState) => prevState + 1 );
    }
  };

  return (
    <div className="board">
      <ScoreBoard
        score={score}
        highScore={highScore}
      />
      <GameBoard
        onCardClick={handleClick}
        newGameCount={newGameCount}
        numberOfCards={numberOfCards}
      />
    </div>
  );
};

const ScoreBoard: React.FC<scoreBoardProps> = ({ score, highScore }) => {
  return (
    <div className="scoreboard">
      <h3>
        Score: {score} High Score: {highScore}
      </h3>
    </div>
  );
};

const GameBoard: React.FC<gameBoardProps> = ({ onCardClick, newGameCount, numberOfCards }) => {
  const [isLoading, fetchedData] = useHttp('https://db.ygoprodeck.com/api/v7/cardinfo.php?cardsetocg=Vol.1', []);
  const [gameCards, setGameCards] = useState<null|JSX.Element[]>(null);

  useEffect(() => {
    if (fetchedData && !isLoading) {
      const cards = randomArray(fetchedData.data, numberOfCards);
      setGameCards(
        cards.map((card) => {
          return (
            <Card
              key={card.id}
              imageURL={card.card_images[0].image_url_small}
              cardName={card.name}
              id={card.id}
              onCardClick={onCardClick}
            />
          );
        })
      );
    } else if (isLoading){
      setGameCards(null)
    }
  }, [isLoading, newGameCount]);

  let content: JSX.Element|JSX.Element[] = <div className='loading'>Loading...</div>;

  if (!isLoading && gameCards) {
    content = shuffle(gameCards);
  }

  return <div className="game-board">{content}</div>;
};

export default Board;
