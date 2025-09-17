
function Descripition({taskInfo}){

   // console.log(taskInfo)

    return(
        <div class='w-[300px] border p-5 m-3 rounded-lg'>
            <h1>Task:{taskInfo.text}</h1>
            <p>Tasks Descripiton</p>
            <div>
                <p>List name:{taskInfo.list}</p>
            </div>
            <div>
                <p>Due date:{taskInfo.dueDate}</p>
                <p>startDate:{taskInfo.dateAdded}</p>
            </div>
            <div>
                <p>Piority:{taskInfo.priority}</p>
                
            </div>
            <div></div>
        </div>
    )
}

export default Descripition