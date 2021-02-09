import { useEffect, useState } from 'react';
// import { useHttp } from './components/hooks/http';
import './App.css';
import Header from './components/Header/Header'

const data = {
  data: [
    {
      "id": 75889523,
      "name": "Archfiend Marmot of Nefariousness",
      "card_images": [
          {
              "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/75889523.jpg"
          }
      ],
    },
    {
      "id": 15150371,
      "name": "Archfiend Mirror",
      "card_images": [
          {
              "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/15150371.jpg"
          }
      ],
    },
    {
      "id": 46009906,
      "name": "Beast Fangs",
      "card_images": [
          {
              "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/46009906.jpg"
          }
      ],
    },
  ]
}

const Board = (props) => {
  // state here, scoreboard and the clicked item
  const [ score, setScore ] = useState(0);
  const [ highScore, setHighScore ] = useState(0);

  return (
    <div className="board">
      <ScoreBoard score={score} highScore={highScore}/>
      <GameBoard />
    </div>
  );
}

const ScoreBoard = ({ score, highScore }) => {
  return (
    <div className="scoreboard">
      <h3>Score: {score}</h3>
      <div className="score-divider">|</div>
      <h3> High Score: {highScore}</h3>
    </div>
  );
}

const GameBoard = (props) => {
  // const image = data.data[0].card_images[0].image_url_small
  // const name = data.data[0].name

  const cards = data.data.map((card) => {
    return <Card
      key={card.id}
      imageURL={card.card_images[0].image_url_small}
      cardName={card.name}
    />
  })

  return (
    <div className="game-board">
      {cards}
    </div>
  );
}

const Card = ({ imageURL, cardName }) => {

  return (
    <div className="game-card">
      <CardImage imageURL={imageURL} />
      <CardDescription name={cardName} alt={cardName}/>
    </div>
  );
}

const CardImage = ({ imageURL, alt }) => {
  return (
    <div className="card-image">
    <img src={imageURL} alt={alt}/>
    </div>
  );
}

const CardDescription = ({ name }) => {
  return (
    <div className="card-description">
      {name}
    </div>
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