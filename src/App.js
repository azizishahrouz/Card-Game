import { useEffect, useState } from "react";
import "./App.css";
import Singlecards from "./components/singlecards";

const cardimages = [
  { src: "/img/blue-robot-with-yellow.jpg", matched: false },
  { src: "/img/gamer-mascot-logo-white.jpg", matched: false },
  { src: "/img/kawaii-girl-anime-style.jpg", matched: false },
  { src: "/img/modern.jpg", matched: false },
  { src: "/img/neon-glowing-shield-with-box.jpg", matched: false },
  { src: "/img/vampire-gaming-masco.jpg", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState([0]);
  const [choiceone, setchoiceone] = useState(null);
  const [choicetwo, setchoicetwo] = useState(null);
  const [disabled, setdisabled] = useState(false);

  const shufflecards = () => {
    const shuffledcards = [...cardimages, ...cardimages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setchoiceone(null)
    setchoicetwo(null)
    setCards(shuffledcards);
    setTurn(0);
  };

  const handlechoice = (card) => {
    choiceone ? setchoicetwo(card) : setchoiceone(card);
  };

  useEffect(() => {
    if (choiceone && choicetwo) {
      setdisabled(true)
      if (choiceone.src === choicetwo.src) {
        setCards((prevcards) => {
          return prevcards.map((card) => {
            if (card.src === choiceone.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        restturn();
      } else {
        setTimeout(() => restturn(), 1000)
      }
    }
  }, [choiceone, choicetwo]);
  console.log(cards);

  const restturn = () => {
    setchoiceone(null);
    setchoicetwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setdisabled (false)
  };
  useEffect(() => {
   shufflecards()

 } , [])
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shufflecards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Singlecards key={card.id} card={card} handlechoice={handlechoice}
            flipped={card === choiceone || card === choicetwo || card.matched}
            disabled = {disabled}
          />
        ))}
      </div>
      <p>turns : { turn }</p>

    </div>
  );
}

export default App;
