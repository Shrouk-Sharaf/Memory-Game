import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardPairs = [...emojis, ...emojis];
    
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false
      }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard.emoji === secondCard.emoji) {
        const newSolved = [...solved, firstId, secondId];
        setSolved(newSolved);
        setFlipped([]);
        if (newSolved.length === cards.length)  setGameWon(true);
      }
      else  setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      
      <div className="game-info">
        <p>Moves: {moves}</p>
        <button onClick={initializeGame}>New Game</button>
      </div>

      {gameWon && (
        <div className="win-message">
          <h2>You Won!</h2>
          <p>Completed in {moves} moves</p>
        </div>
      )}

      <div className="cards-container">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${
              flipped.includes(card.id) || solved.includes(card.id) ? 'flipped' : ''
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-front">
              {card.emoji}
            </div>
            <div className="card-back"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;