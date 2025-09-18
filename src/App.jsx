import { useState } from 'react';
import Description from './Description/Descripition'
import Today from './Today/Today'
import MeNu from './Menu/Menu'

function App() {

  // for the adding input
  const [input, setInput] = useState('')
  //  for the list added
  const [addTasks, setAddTasks] = useState([])
  // for editing of task
  const [editTasks, setEditTasks] = useState('')
  // this is the to monitor the number of task for the day
  const [numberofTasks, setNumberofTasks] = useState(0)
  // this is to display the piority of task
  const [displayPriority, setDisplayPriority] = useState('')
  // this is to serch for task
  const [search, setSearch] = useState('')
  // this if for Description of an individual task
  const [taskInfo, setTaskInfo] = useState([])
  // for displayFolder
  const [activeFolder, setActiveFolder] = useState(0);
  // to create folders
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: 'General list',
      task: [addTasks],
    },
  ]);

  return (
    <div className='app'>
      
    <MeNu addTasks={addTasks} numberofTasks={numberofTasks} setDisplayPriority={setDisplayPriority} search={search} setSearch={setSearch} folders={folders} setFolders={setFolders} activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
  
    <Today input={input} setInput={setInput} addTasks={addTasks} setAddTasks={setAddTasks} editTasks={editTasks} setEditTasks={setEditTasks} numberofTasks={numberofTasks} setNumberofTasks={setNumberofTasks} displayPriority={displayPriority} search={search} setSearch={setSearch} setTaskInfo={setTaskInfo} folders={folders} activeFolder={activeFolder} />
  
    <Description taskInfo={taskInfo} />
  
    </div>
  )
}

export default App
