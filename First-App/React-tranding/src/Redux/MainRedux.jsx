import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByValue, InputValue } from './feature/Counter';

function MainRedux() {
  const [inputValue, setInputValue] = useState()
  let data = useSelector((state) => {
    return state.counterKey.count

  })
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(InputValue(inputValue))
  }
  const state = useSelector((state) => {
    return state.scoreKey.score
  })
  return (
    <div>
      <h1>Redux</h1>
      <button onClick={() => dispatch(increment())}>INC+</button>
      <h1>Counter : {data}</h1>
      <button onClick={() => dispatch(decrement())}>Dec--</button>
      <button onClick={() => dispatch(incrementByValue(100))}>Increment by value</button> <br /> <br />
      <input type="text" value={inputValue} onChange={(e) => setInputValue(+e.target.value)} /> <br /> <br />
      <button onClick={handleClick}>InputValue
        {inputValue}</button>
      <h1>Score : {state}</h1>
    </div>
  )
}
export default MainRedux
