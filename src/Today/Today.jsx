import { Plus, Trash2, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Today({ input, setInput, addTasks, setAddTasks, setNumberofTasks, numberofTasks, displayPriority, search, setTaskInfo, folders, activeFolder, }) {
    const [editId, setEditId] = useState(null);
    const [managePriority, setManagePriority] = useState(0);
    const [manageProgress, setManageProgress] = useState(0);
    //    const [startDate, setStartDate] = useState(new Date());
    const [completedTask, setCompletedTask] = useState(false);
    //  console.log(folders[activeFolder].name)
    // Tracks how many tasks exist
    useEffect(() => {
        setNumberofTasks(addTasks.length);
    }, [addTasks, setNumberofTasks]);

    // Format today's date
    const today = new Date();
    const yy = today.getFullYear().toString().slice(-2);
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yy}-${mm}-${dd}`;



    function addTask() {
        if (input !== '') {
            if (editId) {
                // update existing task
                setAddTasks(prev =>
                    prev.map(task =>
                        task.id === editId ? { ...task, text: input } : task
                    )
                );
                setEditId(null);
            } else {
                // add new task
                setAddTasks(prev => [
                    ...prev,
                    {
                        id: Date.now(),
                        text: input,
                        priority: 'omega',
                        dateAdded: formatted,
                        dueDate: 'set-deadline',
                        list: folders[activeFolder].name,
                        progress: 'undone'
                    }
                ]);
            }
        } else {
            alert('Please enter a task');
        }
        setInput('');
    }




    function removeTask(id) {
        setAddTasks(prev => prev.filter(task => task.id !== id));
    }

    function editTask(id) {
        const taskToEdit = addTasks.find(task => task.id === id);
        if (taskToEdit) {
            setInput(taskToEdit.text);
            setEditId(id);
        }
    }

    function addpriority(id) {
        if (managePriority === 2) {
            setManagePriority(0);
        } else {
            setManagePriority(prev => prev + 1);
        }
        setAddTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, priority: managePriority === 0 ? 'omega' : managePriority === 1 ? 'alpha' : 'beta' }
                    : task
            )
        );
    }

    function addProgress(id) {
        if (manageProgress === 1) {
            setManageProgress(0);
        } else {
            setManageProgress(prev => prev + 1);
        }
        setAddTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, progress: manageProgress === 0 ? 'undone' : manageProgress === 1 ? 'inprogress' : 'beta' }
                    : task
            )
        );
    }

    function completed(id) {
        setAddTasks(prev =>
            prev.map(task => (task.id === id ? { ...task, progress: 'completed' } : task))
        );
    }


    const folderName = folders[activeFolder].name
    console.log(folderName)

    //  this is for the priority filter and search filter
    const priorityData = displayPriority
        ? addTasks.filter((task) => task.priority === displayPriority)
        : search
            ? addTasks.filter((task) =>
                task.text.toLowerCase().includes(search.toLowerCase())
            )
            : activeFolder
                ? addTasks.filter((task) => task.list === folderName)
                : addTasks;







    return (
        <div className="w-[600px] border p-5 m-3 rounded-lg">
            <div className="flex justify-center border-b">
                <h1>{activeFolder ? folderName : 'General list'}</h1>
                <h1>{numberofTasks < 1 ? '' : addTasks.length}</h1>
            </div>
            <div className="flex justify-left border-b p-[10px]">
                <button onClick={addTask}><Plus /></button>
                <input
                    placeholder="Add New Task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>


            {priorityData.map((task) => (
                <div key={task.id} class="justify-center gap-5 border-b p-[10px]" id={completedTask ? 'done' : ''} onClick={() =>
                    setTaskInfo({
                        text: task.text,
                        priority: task.priority,
                        dateAdded: task.dateAdded.toString(),
                        dueDate: task.dueDate,
                        list: folderName
                    }) // still some bugs to fix
                }
                >
                    <div className="flex gap-20">
                        <div className="flex gap-2">
                            <input type="checkbox" onClick={() => completed(task.id)} />
                            <h1 className="text-[20px]">{task.text}</h1>
                        </div>
                        <button onClick={() => removeTask(task.id)}><Trash2 /></button>
                    </div>
                    <div className="flex gap-[10px]">
                        <p>{task.dateAdded.toString()}</p>
                        <p>{task.dueDate}</p>
                        <p>{task.list}</p>
                        <p
                            onClick={task.progress === 'completed' || displayPriority ? undefined : () => addpriority(task.id)}
                            style={{
                                cursor: task.progress !== 'completed' ? 'pointer' : 'not-allowed',
                                color: task.progress !== 'completed' ? 'black' : 'grey'
                            }}
                        >
                            {task.priority}
                        </p>
                        <p
                            onClick={task.progress === 'completed' ? undefined : () => addProgress(task.id)}
                            style={{
                                cursor: task.progress === 'completed' ? 'not-allowed' : 'pointer',
                                color: task.progress === 'completed' ? 'gray' : 'black'
                            }}
                        >
                            {task.progress}
                        </p>


                        <DatePicker
                            selected={task.dueDate && task.dueDate !== 'set-deadline' ? new Date(task.dueDate) : null}
                            onChange={(date) =>
                                setAddTasks(prev =>
                                    prev.map(t =>
                                        t.id === task.id
                                            ? { ...t, dueDate: date.toISOString() }
                                            : t
                                    )
                                )
                            }
                            placeholderText="Set deadline"
                            dateFormat="yy-MM-dd"   // ✅ same format as dateAdded (yy-mm-dd)
                        />



                        <button onClick={task.progress === 'completed' ? undefined : () => editTask(task.id)}><Pencil /></button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Today;
