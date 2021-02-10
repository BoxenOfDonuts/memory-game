import { useEffect, useRef, useState } from 'react';
import { useHttp } from './components/hooks/http';
import './App.css';
import Header from './components/Header/Header'

const shuffle = (array) => {
  console.log('shufflin')
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const randomStart = (totalLength, desiredLength) => {
  const start = Math.floor(Math.random() * (totalLength - desiredLength))
  const end  = start + desiredLength

  return [start, end]
}

const cardsToScreenSize = () => {
  const height = window.innerHeight;
  // < 400 is 1 card
  // < 565 is 2 cards
  // < 255 is 3
}

const Board = (props) => {
  const [ score, setScore ] = useState(0);
  const [ highScore, setHighScore ] = useState(0);
  const [ clickedCards, setClickedCards ] = useState([]);
  const [ isNewGame, setIsNewGame ] = useState(false);
  const numberOfCards = 18;
  const prevClickedCards = useRef();

  useEffect(() => {
    prevClickedCards.current = clickedCards
  });

  useEffect(() => {
    const resetAll = () => {
      if (score > highScore) {
        setHighScore(score)
      }
      setScore(0);
      setClickedCards([]);
      setIsNewGame(false);
    }
    if (!isNewGame) return;
    console.log('is new game udpated')
    resetAll();
  }, [isNewGame])


  const handleClick = (id) => {
    console.log(`handle click ${prevClickedCards.current}`)
    if (!prevClickedCards.current.includes(id)) {
      setClickedCards(prevState => [...prevState, id])
      setScore(prevScore => prevScore + 1)
    } else {
      console.log('you lose!')
      setIsNewGame(true); 
    }
  };

  const Thing = <button type='button' onClick={() => setIsNewGame(false)}>New Game?</button>

  return (
    <div className="board">
      <ScoreBoard
        score={score}
        highScore={highScore}
      />
      <GameBoard
        onCardClick={handleClick}
        isNewGame={isNewGame}
        clickedCards={clickedCards}
        numberOfCards={numberOfCards}
      />
      {/* {isNewGame && Thing} */}
    </div>
  );
}

const ScoreBoard = ({ score, highScore }) => {
  return (
    <div className="scoreboard">
      <h3>Score: {score} High Score: {highScore}</h3>
    </div>
  );
}

const GameBoard = ({ onCardClick, isNewGame, numberOfCards }) => {
  const [ isLoading, fetchedData ] = useHttp(null, [isNewGame]);
  const [ gameCards, setGameCards ] = useState(null)

  console.log(`loading ${isLoading}`)

  useEffect(() => {
    console.log('mounting!')
    if(fetchedData) {
      const [ start, end ] = randomStart(fetchedData.data.length, numberOfCards);
      setGameCards(fetchedData
                      .data
                      .slice(start,end)
                      .map((card) => {
                        return <Card
                          key={card.id}
                          imageURL={card.card_images[0].image_url_small}
                          cardName={card.name}
                          id={card.id}
                          onCardClick={onCardClick}
                        />
                      }));
      }
  }, [isLoading])

  let content =  <div>Loading...</div>;

  if (!isLoading && !isNewGame && gameCards) {
    content = shuffle(gameCards);
  }

  return (
    <div className="game-board">
      {content}
    </div>
  );
}

const Card = ({ imageURL, cardName, id, onCardClick }) => {

  return (
    <figure className='game-card' onClick={() => onCardClick(id)}>
      <img src={imageURL} alt={cardName}/>
      {/* <figcaption>{cardName}</figcaption> */}
    </figure>
  );
}

const App = () => {
  const mainTitle = 'Memory Game';

  useEffect(() => {
    //
  },[])
  

  return (
    <div className="main-app">
      <Header title={mainTitle}/>
      <Board />
    </div>
  );
}

export default App;