import { useState } from 'react';
import Description from './Description/Descripition'
import Today from './Today/Today'
import Menu from './Menu/Menu'

function App() {

  const [input, setInput] = useState('')
  const [addTasks, setAddTasks] = useState([])
  const [editTasks, setEditTasks] = useState('')
  

  return (
    <div className='app'>
      <Menu />
      <Today  input={input} setInput={setInput} addTasks={addTasks} setAddTasks={setAddTasks} editTasks={editTasks} setEditTasks={setEditTasks}/>
      <Description />
    </div>
  )
}

export default App
