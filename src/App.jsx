import { useState, useEffect } from 'react'
import './App.css'
import Dice from './Dice'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
function App() {
  const [dices, setDices] = useState(allNewDice())
  const [tenzies,setTenzies]=useState(false)

  useEffect(()=>{
    const allHeldDices= dices.every(dice=>dice.isHeld)
    const firstValue=dices[0].value
    const allSameValues=dices.every(dice=>dice.value===firstValue)
    if(allHeldDices && allSameValues)
    {
      setTenzies(true)
      
    }
  },[dices])

  function generateNewDice()
  {
    return {
      id:nanoid(),
      value:Math.ceil(Math.random() * 6),
      isHeld:false
    }
  }
  function allNewDice()
  {
    let newDice = []
    for(let i = 0; i < 10; i++)
    {
      newDice.push(generateNewDice())
    }
    return newDice
  }

  function rollDice()
  {
    if(tenzies)
    {
      setTenzies(false)
      setDices(allNewDice())
      return
    }
    else
    {
      setDices(oldDice=>oldDice.map(dice=>{
      return dice.isHeld? dice: generateNewDice()
    }))}
  }
  
  function holdDice(id)
  {
    setDices(oldDice=>oldDice.map(dice=>{
      return dice.id===id?
       {...dice, isHeld:!dice.isHeld}: dice
    }))
  }

  const diceElements= dices.map(dice=>
  <Dice 
    key={dice.id} 
    value={dice.value}
     isHeld={dice.isHeld} 
     holdDice={()=>holdDice(dice.id)}
   />)
  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">
              Roll until all dice are the same.
              Click each die to freeze it at its 
              current value between rolls.</p>
      <div className='Dice--Container'>
        {diceElements}
      </div>
      <button className='roll--dice' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
