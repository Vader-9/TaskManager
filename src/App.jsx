import { useState } from 'react';
import Description from './Description/Descripition'
import Today from './Today/Today'
import MeNu from './Menu/Menu'

function App() {

  const [input, setInput] = useState('')
  const [addTasks, setAddTasks] = useState([])
  const [editTasks, setEditTasks] = useState('')
  // this is the to monitor the number of task for the day
  const [numberofTasks, setNumberofTasks] = useState(0)
  // this is to display the piority of task
  const [displayPriority, setDisplayPriority] = useState('')



  return (
    <div className='app'>
      <MeNu  numberofTasks ={numberofTasks} setDisplayPriority={setDisplayPriority}/>
      <Today input={input} setInput={setInput} addTasks={addTasks} setAddTasks={setAddTasks} editTasks={editTasks} setEditTasks={setEditTasks} numberofTasks={numberofTasks} setNumberofTasks={setNumberofTasks} displayPriority={displayPriority} />
      <Description />
    </div>
  )
}

export default App
