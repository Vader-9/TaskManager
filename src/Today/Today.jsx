import { Plus, X, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// the add date function is still empty so we will need to do that later


function Today({ input, setInput, addTasks, setAddTasks }) {

    const [numberofTasks, setNumberofTasks] = useState(0)

    const [managePriority, setManagePriority] = useState(0)

    const [manageProgress, setManageProgress] = useState(0)

    const [startDate, setStartDate] = useState(new Date());

    // Tracks how many task is list for today
    useEffect(() => {
        setNumberofTasks(addTasks.length)
    }, [addTasks])

    // used to give the dates the right format
    const today = new Date();
    const yy = today.getFullYear().toString().slice(-2);
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yy}-${mm}-${dd}`;

    // more on the dates




    function addTask() {

        if (input !== '') {
            setAddTasks(prevaddTasks => [...prevaddTasks, { id: Date.now(), text: input, priority: 'omega', dateAdded: formatted, dueDate: '', list: '', note: [], progress: 'undone' }])
        } else {
            alert('Please enter a task')
        }
        setInput('')
        // setPrioritys('omega')
    }

    function removeTask(id) {

        setAddTasks(prevaddTasks => prevaddTasks.filter((task) => task.id !== id))
    }

    function editTask(id) { }

    function addpriority(id) {
        if (managePriority === 2) {
            setManagePriority(0)
        } else {
            setManagePriority(prev => prev + 1)
        }
        setAddTasks(prevaddTasks => prevaddTasks.map((task) => task.id === id ? { ...task, priority: managePriority === 0 ? 'omega' : managePriority === 1 ? 'alpha' : 'beta' } : task))

    }



    function addProgress(id) {

        if (manageProgress === 1) {
            setManageProgress(0)
        } else {
            setManageProgress(prev => prev + 1)
        }
        setAddTasks(prevaddTasks => prevaddTasks.map((task) => task.id === id ? { ...task, progress: manageProgress === 0 ? 'undone' : manageProgress === 1 ? 'inprogress' : manageProgress === 2 } : task))
    }

    function completed(id) {
        setAddTasks(prevaddTasks => prevaddTasks.map((task) => task.id === id ? { ...task, progress: 'completed' } : task))
    }// bugs to fixed but mostly done




    return (
        <div class='w-[600px] border p-5 m-3 rounded-lg'>
            <div class='flex justify-center border-b'> <h1>Today</h1>
                <h1>{numberofTasks}</h1></div>
            <div class='flex justify-left border-b p-[10px]'>
                <button onClick={addTask}><Plus /></button>
                <input placeholder='Add New Task' value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            {addTasks.map((task) => <div key={task.id} class=' justify-center gap-5
             border-b p-[10px]'>
                <div class='flex gap-20  '>
                    <div class='flex gap-2'>
                        <input type='checkbox' onClick={() => completed(task.id)} />
                        <h1 class='text-[20px]'>{task.text}</h1>
                    </div>
                    <button onClick={() => removeTask(task.id)}><X /></button>
                </div>
                <div class='flex gap-[10px]'>
                    <p>{task.dateAdded.toString()}</p>
                    <p>{task.dueDate}</p>
                    <p>{task.list}</p>
                    <button onClick={() => addpriority(task.id)}>{task.priority}</button>
                    <p onClick={() => addProgress(task.id)}>{task.progress}</p>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                    <button><Pencil /></button>
                </div>
                {console.log(task.list)}
            </div>)}
        </div>
    )
}

export default Today;