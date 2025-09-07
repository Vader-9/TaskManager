import { Plus, X,Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';

// the add date function is still empty so we will need to do that later


function Today({input, setInput, addTasks, setAddTasks}){

    const [numberofTasks, setNumberofTasks] = useState(0)

// Tracks homany task is list for today
    useEffect(()=>{
        setNumberofTasks(addTasks.length)
    },[addTasks])
   
// used to give the dates the right format
const today = new Date();
const yy = today.getFullYear().toString().slice(-2); 
const mm = String(today.getMonth() + 1).padStart(2, '0'); 
const dd = String(today.getDate()).padStart(2, '0');      
const formatted = `${yy}-${mm}-${dd}`; 


const [managePriority, setManagePriority] = useState(0)

    function addTask(){
       
        if(input!==''){
            setAddTasks(prevaddTasks=>[...prevaddTasks, {id:Date.now(), text:input, priority:'omega', dateAdded:formatted,dueDate:'', list:'', note:[], progress:'undone'}])
        } else{
            alert('Please enter a task')
        }
        setInput('')
       // setPrioritys('omega')
    }

    function removeTask(id){
        
        setAddTasks(prevaddTasks=>prevaddTasks.filter((task)=> task.id !== id))
    }

    function editTask(){}

    function addpriority(id){
        if(managePriority===2){
            setManagePriority(0)
        } else  {
        setManagePriority(prev=> prev+1)
        }
        setAddTasks(prevaddTasks => prevaddTasks.map((task) => task.id === id ?   {...task, priority:managePriority === 0 ? 'omega' : managePriority === 1 ? 'alpha':'beta' } : task))
         // almost done coming back the beat bug is still there
    }

    function addProgress(id){
        setAddTasks(prevaddTasks => prevaddTasks.map((task) => task.id === id ?    {...task, progress:task.progress === 'undone' ? 'inprogress' : 'Completed' } : task)) // almost done coming back the  bug is still there
    }

    



    return(
        <div class='w-[600px] border p-5 m-3 rounded-lg'>
            <div class='flex justify-center border-b'> <h1>Today</h1>
            <h1>{numberofTasks}</h1></div>
            <div class='flex justify-center border-b'>
            <button onClick={addTask}><Plus /></button>
            <input placeholder='Add New Task' value={input} onChange={(e)=>setInput(e.target.value)}/>
            </div>
            {addTasks.map((task)=><div key={task.id} class=' justify-center gap-5
             border-b'>
                <div class='flex gap-20 p-3 '>
                    <div class='flex'>
                        <input type='checkbox'  />
                        <p>{task.text}</p>
                    </div>
                    <button onClick={()=>removeTask(task.id)}><X /></button>
                </div>
                <div class='flex gap-2'>
                    <p>{task.dateAdded.toString()}</p>
                    <p>{task.dueDate}</p>
                    <p>{task.list}</p>
                    <button onClick={()=>addpriority(task.id)}>{task.priority}</button>
                    <p onClick={()=>addProgress(task.id)}>{task.progress}</p>
                    <button><Pencil /></button>
                </div>
                {console.log(task.list)}
            </div>)}
        </div>
    )
}

export default Today;