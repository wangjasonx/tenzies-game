import { useState, useEffect} from 'react'
import Die from '../components/Die'
import Confetti from 'react-confetti'

function App() {
  const [die, setDie] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [counter, setCounter] = useState(0)
  const diceElements = die.map(dieObject => 
  <Die 
    key={dieObject.key}
    diceObject={dieObject}
    holdDie={holdDie}
  />)

  useEffect(() => {
    const allHeld = die.every(die => die.isHeld)
    const firstValue = die[0].value
    const allSameValue = die.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }

  }, [die])

  function randomDiceRoll() {
    return Math.floor(Math.random() * 6) + 1
  }

  function holdDie(index) {
    setDie(prevDieArray => {
      return (
        prevDieArray.map(currentDice => {
          return(
            currentDice.id === index ?
            {
              ...currentDice,
              isHeld: !currentDice.isHeld
            }
            :
            currentDice
          )
        })
      )
    })
  }

  function allNewDice() {
    const newDiceValues = Array.from({length: 10}, () => randomDiceRoll() )

    return (
      newDiceValues.map((values, index) => {
        return {
          key: index,
          id: index,
          value: values,
          isHeld: false
        }
      })
    )
  }

  function reRollDice() {
    if (!tenzies) {
      setDie(prevDieArray => {
        return (
          prevDieArray.map(currentDice => {
            return (
            currentDice.isHeld ? 
            currentDice 
            : 
            {...currentDice, value:randomDiceRoll()})
          })
        )
      })
      setCounter(prevCounter => prevCounter + 1)
    } else {
      setTenzies(false)
      setCounter(0)
      setDie(allNewDice())
    }
    
  }

  return (
    <main className="app">
      {
      tenzies 
      ? 
        <Confetti />
      : ""
      }
      <span># of Rolls: {counter}</span>
      <h1>Tenzies Game</h1>
      <p className="game-desc">
        Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-grid">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={reRollDice} submit="button">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App
