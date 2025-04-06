import "./Singlecards.css";

export default function singlecard({ card, handlechoice, flipped, disabled }) {
  const handleclick = () => {
    if (!disabled) {
      handlechoice(card);
    }
  };
  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />

        <img
          className="back"
          src="img/empty-game-card.jpg"
          alt="card back"
          onClick={handleclick}
        />
      </div>
    </div>
  );
}
