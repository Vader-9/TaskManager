
function Descripition({taskInfo}){

    console.log(taskInfo)

    return(
        <div class='w-[300px] border p-5 m-3 rounded-lg'>
            <h1>Task:{taskInfo[0]}</h1>
            <p>Tasks Descripiton</p>
            <div>
                <p>List</p>
                <p>List name</p>
            </div>
            <div>
                <p>Due date:{taskInfo[3]}</p>
                <p>startDate:{taskInfo[2]}</p>
            </div>
            <div>
                <p>Piority:{taskInfo[1]}</p>
                
            </div>
            <div></div>
        </div>
    )
}

export default Descripition