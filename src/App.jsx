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
  // this is to serch for task
  const [search, setSearch] = useState('')
  // this if for Description of an individual task
  const [taskInfo, setTaskInfo] = useState('')
  const [taskInfoText, setTaskInfoText] = useState('')



  return (
    <div className='app'>
      <MeNu  numberofTasks ={numberofTasks} setDisplayPriority={setDisplayPriority} search={search} setSearch={setSearch}/>
      <Today input={input} setInput={setInput} addTasks={addTasks} setAddTasks={setAddTasks} editTasks={editTasks} setEditTasks={setEditTasks} numberofTasks={numberofTasks} setNumberofTasks={setNumberofTasks} displayPriority={displayPriority} search={search} setSearch={setSearch} setTaskInfo={setTaskInfo} />
      <Description taskInfo={taskInfo} />
    </div>
  )
}

export default App
