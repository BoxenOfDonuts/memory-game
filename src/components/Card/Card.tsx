import './Card.css';

interface Props {
  imageURL: string;
  cardName: string;
  id: number;
  onCardClick: (id: number) => void;
}

const Card: React.FC<Props> = ({ imageURL, cardName, id, onCardClick }) => {
  return (
    <figure
      className="game-card" onClick={() => onCardClick(id)}>
      <img src={imageURL} alt={cardName} />
    </figure>
  );
};

export default Card;
