import './Card.css';

const Card = ({ imageURL, cardName, id, onCardClick }) => {
  return (
    <figure className="game-card" onClick={() => onCardClick(id)}>
      <img src={imageURL} alt={cardName} />
    </figure>
  );
};

export default Card;
