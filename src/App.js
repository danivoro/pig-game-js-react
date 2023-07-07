import './App.css';
import React, { useState } from 'react';

/**  TODO: 
 -add win state
 -reset the game after game over */

function App() {
  const [lastRoll, setLastRoll] = useState("-");
  const [turnTotal, setTurnTotal] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [whoseTurnItIs, setTurn] = useState(1);
  const winThreshold = 20;

  function handleRollClicked(){
    const roll = generateDieRoll();
    setLastRoll(prevRoll => roll);
    if(roll === 1){
      setTurnTotal(0); 
      changePlayerTurn()
    }else{
      setTurnTotal((prevRoll) => prevRoll + roll);
    }
  }

  function handleStickClicked(){
    if(whoseTurnItIs === 1){
      setPlayer1Score((prevScore) => prevScore + turnTotal);
    }else{
      setPlayer2Score((prevScore) => prevScore + turnTotal);
    }
    changePlayerTurn();
    setTurnTotal(0);
    setLastRoll(0);
    resetGame();
  }

  function changePlayerTurn(){
    setTurn((currPlayer) => (currPlayer === 1 ? 2 : 1))
  }

  function generateDieRoll(){
    return pick([1,2,3,4,5,6]);
  }

  function classesForPlayersScoreSection(sectionPlayer){
    const classes = ['playerScore']
    if(sectionPlayer === whoseTurnItIs) classes.push('active')
    return classes.join(' ')
  }

  function classesForRestButton(){
    const classes = ['stickButton']
    if(isGameOver()) classes.push('gameOver')
    return classes.join(' ')
  }

  function isGameOver(){
    return (player1Score >= winThreshold || player2Score >= winThreshold)
  }

  function resetGame(){
    if (isGameOver()){
      setPlayer1Score(0)
      setPlayer2Score(0)
      setTurn(1)
    }  
  }

  function stickOrReset(){
    if(isGameOver()){
      return <span>RESET</span>
    }else{
      return <span>STICK</span>
    } 
  }



  return (
    <div className="App">
      <h1>Pig Game!</h1>
      { isGameOver() === true && <div className='gameOver'>GAME OVER!</div> }
      <div className='Scores'>
        <div className={classesForPlayersScoreSection(1)}>
          Player 1 Score: {player1Score} {whoseTurnItIs === 1 && <span>⭐</span>}
          </div>
        <div className={classesForPlayersScoreSection(2)}>  
          Player 2 Score: {player2Score} {whoseTurnItIs === 2  && <span>⭐</span>}
          </div>
      </div>
      <div className='buttomHalf'>
        <button onClick={handleRollClicked}>Roll!</button>
        <div className='lastRoll'>
          Last Roll: {lastRoll ? lastRoll : '-'}
        </div>
        <div className='turnTotal'>Turn total: {turnTotal}</div>
        <button className={classesForRestButton()} onClick={handleStickClicked}>
          {stickOrReset()}
        </button>
      </div>
    </div>
  );
}

function pick(inputArray){
  const ix = Math.floor(Math.random() * inputArray.length)
  return inputArray[ix];
}

export default App;
