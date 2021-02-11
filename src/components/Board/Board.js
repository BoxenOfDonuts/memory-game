import { useEffect, useState, useRef } from 'react';
import { useHttp } from '../hooks/http';
import Card from '../Card/Card';
import './Board.css'

const shuffle = (array) => {
  console.log('shufflin');
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const randomArray = (array, desiredLength) => {
  return shuffle(array).slice(0, desiredLength);
};

const Board = (props) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [isNewGame, setIsNewGame] = useState(false);
  const numberOfCards = 18;
  const prevClickedCards = useRef();

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
      setIsNewGame(false);
    };
    if (!isNewGame) return;
    console.log('is new game udpated');
    resetAll();
  }, [isNewGame]);

  const handleClick = (id) => {
    console.log(`handle click ${prevClickedCards.current}`);
    if (!prevClickedCards.current.includes(id)) {
      setClickedCards((prevState) => [...prevState, id]);
      setScore((prevScore) => prevScore + 1);
    } else {
      console.log('you lose!');
      setIsNewGame(true);
    }
  };

  return (
    <div className="board">
      <ScoreBoard score={score} highScore={highScore} />
      <GameBoard
        onCardClick={handleClick}
        isNewGame={isNewGame}
        clickedCards={clickedCards}
        numberOfCards={numberOfCards}
      />
    </div>
  );
};

const ScoreBoard = ({ score, highScore }) => {
  return (
    <div className="scoreboard">
      <h3>
        Score: {score} High Score: {highScore}
      </h3>
    </div>
  );
};

const GameBoard = ({ onCardClick, isNewGame, numberOfCards }) => {
  const [isLoading, fetchedData] = useHttp(null, [isNewGame]);
  const [gameCards, setGameCards] = useState(null);

  console.log(`loading ${isLoading}`);

  useEffect(() => {
    console.log('mounting!');
    if (fetchedData) {
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
    }
  }, [isLoading]);

  let content = <div className={'loading'}>Loading...</div>;

  if (!isLoading && !isNewGame && gameCards) {
    content = shuffle(gameCards);
  }

  return <div className="game-board">{content}</div>;
};

export default Board;
